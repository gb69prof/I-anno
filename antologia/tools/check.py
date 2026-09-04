#!/usr/bin/env python3
"""Verify content coverage, local links/anchors, assets and the offline inventory."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from PIL import Image
import json,re,hashlib,sys
root=Path(__file__).resolve().parents[1]
errors=[];checks=0
class Page(HTMLParser):
 def __init__(self,path):super().__init__();self.path=path;self.ids=set();self.links=[];self.imgs=[];self.h1=0;self.pids=set();self.feed(path.read_text())
 def handle_starttag(self,tag,attrs):
  global checks
  a=dict(attrs)
  if 'id'in a:
   if a['id']in self.ids:errors.append(f'Duplicate id {self.path}:{a["id"]}')
   self.ids.add(a['id'])
  if 'data-pid'in a:
   if a['data-pid']in self.pids:errors.append(f'Duplicate highlight id {self.path}')
   self.pids.add(a['data-pid'])
  if tag=='h1':self.h1+=1
  for key in ['href','src','data-image-open']:
   if a.get(key):self.links.append(a[key])
  if tag=='img':
   self.imgs.append(a)
   if 'alt'not in a:errors.append(f'Missing alt {self.path}')
   if not a.get('src')and a.get('id')!='large-image':errors.append(f'Missing image source {self.path}')
  if tag=='html'and a.get('lang')!='it':errors.append(f'Missing lang {self.path}')
  if tag=='input'and a.get('type')not in ['radio','checkbox','hidden'] and not a.get('id'):errors.append(f'Unlabelled input {self.path}')
pages={p.resolve():Page(p) for p in root.rglob('*.html') if 'docs'not in p.relative_to(root).parts}
for path,page in pages.items():
 if page.h1!=1:errors.append(f'Expected one h1 {path}')
 for link in page.links:
  parts=urlsplit(link)
  if parts.scheme or parts.netloc:continue
  target=(path.parent/unquote(parts.path or path.name)).resolve()
  if parts.path.endswith('/'):target=target/'index.html'
  checks+=1
  if not target.exists():errors.append(f'Broken link {path.relative_to(root)} -> {link}')
  if parts.fragment and target in pages and unquote(parts.fragment)not in pages[target].ids:errors.append(f'Broken anchor {path.relative_to(root)} -> {link}')
data=[json.loads(p.read_text()) for p in sorted((root/'contenuti').glob('*.json'))];by={d['id']:d for d in data}
expected=['01-racconto','02-mito','03-limite','04-edipo','05-antigone','06-paride','07-achille','08-iliade','09-odissea','10-raccontare','c1-comunicare','c2-giudicare','c3-dissentire','c4-conflitto','c5-identita']
if sorted(by)!=sorted(expected):errors.append('Lesson inventory mismatch')
counts=[]
for d in data:
 id=d['id'];ids={b['id']for b in d['blocks']};checks+=1
 assert len(d['quiz'])==5 and len(d['map']['branches'])==3
 assert len(d['goals'])==3 and len(d['essentials'])==5 and len(d['questions'])==3
 words=len(re.sub('<[^>]*>',' ',''.join(b['html']for b in d['blocks'])).split());summary=len(d['summary'].split())
 if words<700 or summary<120 or summary>185:errors.append(f'Content length {id}: {words}/{summary}')
 for q in d['quiz']:
  if len(q['options'])!=3 or q['answer']not in [0,1,2] or q['anchor']not in ids:errors.append(f'Quiz contract {id}')
  r=q['recovery']
  if len(r['options'])!=3 or r['answer']not in [0,1,2] or r['question']==q['question']:errors.append(f'Recovery contract {id}')
 if len({q['answer']for q in d['quiz']})<3:errors.append(f'Unbalanced quiz {id}')
 if any(not s['url'].startswith('https://') for s in d['sources']):errors.append(f'Source URL {id}')
 target=by[d['bridge']['target']]
 if target['area']==d['area'] or d['bridge']['anchor']not in {b['id']for b in target['blocks']}:errors.append(f'Bridge {id}')
 if not pages[(root/'lezioni'/f'{id}.html').resolve()].pids:errors.append(f'No highlight targets {id}')
 counts.append({'id':id,'words':words,'summary_words':summary,'quiz':5,'recoveries':5,'map_nodes':7})
image_hash=[]
for id in expected:
 p=root/'assets/images'/f'{id}.webp'
 with Image.open(p)as im:im.verify()
 image_hash.append(hashlib.sha256(p.read_bytes()).hexdigest())
if len(set(image_hash))!=15:errors.append('Illustrations must be distinct')
for id in ['00-percorso']+expected:
 svg=root/'assets/mappe'/f'{id}.svg';png=svg.with_suffix('.png')
 if not svg.exists()or not png.exists():errors.append(f'Missing map {id}')
 with Image.open(png)as im:
  if im.size!=(1440,1120):errors.append(f'Map dimensions {id}')
manifest=json.loads((root/'manifest.webmanifest').read_text())
assert manifest['scope']=='./'and manifest['start_url']=='./index.html'
for icon in manifest['icons']:
 with Image.open(root/icon['src'])as im:assert str(im.width)+'x'+str(im.height)==icon['sizes']
sw=(root/'sw.js').read_text();cached=json.loads(re.search(r'const FILES = (\[.*?\]);',sw,re.S).group(1))
for p in list((root/'assets').rglob('*'))+list(pages):
 if p.is_file()and './'+p.relative_to(root).as_posix()not in cached:errors.append(f'Not cached: {p}')
for entry in cached:
 p=root/entry
 if not p.exists():errors.append(f'Cache missing {entry}')
result={'status':'PASS'if not errors else 'FAIL','html_pages':len(pages),'local_references_checked':checks,'lessons':len(data),'illustrations':len(image_hash),'maps_svg':16,'maps_png':16,'quiz_questions':75,'recovery_questions':75,'cache_entries':len(cached),'errors':errors,'content':counts}
(root/'docs/static-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in result.items()if k!='content'},ensure_ascii=False,indent=2));sys.exit(bool(errors))
