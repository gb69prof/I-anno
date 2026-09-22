from pathlib import Path
import json
R=Path(__file__).resolve().parents[1];paras=json.loads((R/'data/paragraphs.json').read_text());banks={};slug=None
for line in (R/'tools/questions.txt').read_text().splitlines():
 if not line.strip():continue
 if line.startswith('['):slug=line[1:-1];banks[slug]=[];continue
 fields=line.split('|');assert len(fields)==6,(slug,fields)
 question,a,b,c,needle,recovery=fields
 found=[i for i,p in enumerate(paras[slug]) if needle.casefold() in p.casefold()]
 assert found,(slug,needle)
 n=len(banks[slug])+1
 options=[{'id':'correct','text':a},{'id':'d1','text':b},{'id':'d2','text':c}]
 offset=(n-1)%3;options=options[offset:]+options[:offset]
 banks[slug].append({'id':f'{slug}-{n:02d}','question':question,'options':options,'correctId':'correct','explanation':a,'recovery':recovery,'reference':f'#p{found[0]}','sourceQuote':paras[slug][found[0]]})
for slug,questions in banks.items():
 (R/f'data/tests/{slug}.json').write_text(json.dumps({'lesson':slug,'questions':questions},ensure_ascii=False,indent=2))
 print(slug,len(questions))
print('TOTAL',sum(map(len,banks.values())))
