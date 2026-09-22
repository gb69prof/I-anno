from pathlib import Path
import json,re
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote
R=Path(__file__).resolve().parents[1]
cat=json.loads((R/'data/catalog.json').read_text());sources=json.loads((R/'data/sources/drive.json').read_text());source_by_title={s['title']:s for s in sources}
indices=[10,9,8,7,5,6,4,3,2,1,0];total=0;longest=0;minimum_ratio=1
for l,idx in zip(cat,indices):
 soup=BeautifulSoup((R/l['path']).read_text(),'html.parser')
 actual=soup.select_one('.reading').get_text();expected=sources[idx]['text']
 normalize=lambda s:re.sub(r'\s','',s.lstrip('\ufeff'))
 assert normalize(actual)==normalize(expected),('source mismatch',l['slug'])
 assert soup.select_one('#vocabolario')
 data=json.loads((R/f'data/tests/{l["slug"]}.json').read_text());qs=data['questions'];assert len(qs)>=10
 assert len({q['id'] for q in qs})==len(qs)
 for q in qs:
  total+=1;opts=q['options'];assert len(opts)==3
  assert len({o['text'] for o in opts})==3
  assert sum(o['id']==q['correctId'] for o in opts)==1
  lengths=[len(o['text']) for o in opts];assert max(lengths)/min(lengths)<=1.5
  correct=next(o for o in opts if o['id']==q['correctId'])
  longest+=len(correct['text'])==max(lengths)
  assert len(q['recovery'].split())>=25
  target=soup.select_one(q['reference']);assert target,(l['slug'],q['reference'])
  assert normalize(target.get_text())==normalize(q['sourceQuote'])
for p in R.rglob('*.html'):
 soup=BeautifulSoup(p.read_text(),'html.parser')
 ids=[x['id'] for x in soup.select('[id]')];assert len(ids)==len(set(ids)),('duplicate IDs',p)
 for x in soup.select('[href],[src]'):
  url=x.get('href',x.get('src'));u=urlsplit(url)
  if u.scheme or u.netloc or u.path.startswith('/'):continue
  dest=(p.parent/unquote(u.path)).resolve() if u.path else p.resolve()
  if dest.is_dir():dest=dest/'index.html'
  assert dest.exists(),('broken link',p,url)
  if u.fragment:
   target=BeautifulSoup(dest.read_text(),'html.parser').find(id=u.fragment)
   assert target,('broken anchor',p,url)
 for img in soup.select('img'):assert img.get('alt')
manifest=json.loads((R/'manifest.webmanifest').read_text());assert manifest['scope']=='./'
print(json.dumps({'lessons':len(cat),'questions':total,'texts_exact_except_whitespace':True,'links_and_anchors':'passed','correct_is_longest':longest,'max_option_length_ratio':1.5},indent=2))
