from pathlib import Path
import json,re,html,hashlib
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1]
def write(path,text):
 p=R/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text,encoding='utf-8')
def esc(s):return html.escape(s,quote=True)
config=[
 ('peleo-teti','antefatto','Il matrimonio di Peleo e Teti',10,'matrimonio-teti-peleo','Una festa, una profezia e la nascita della discordia.'),
 ('gara-dee','antefatto','La gara tra le dee',9,'pomo-discordia','Una scelta divina diventa un conflitto umano.'),
 ('atridi','antefatto','La dinastia di Agamennone – Gli Atridi',8,'dinastia-agamennone','Le colpe e le vendette che attraversano una famiglia.'),
 ('scelta-achille','antefatto','La scelta di Achille',7,'scelta-achille','Una vita lunga o una gloria che sopravvive alla morte?'),
 ('guerra-troia','fatto','La guerra di Troia',5,'guerra-troia','L’intero ciclo: le cause, l’assedio e la caduta della città.'),
 ('iliade','fatto','L’Iliade',6,'iliade','L’ira di Achille, il dolore e il riconoscimento dell’altro.'),
 ('menelao-elena','ritorni','Il ritorno di Menelao ed Elena',4,'ritorni','Il lungo viaggio e la possibilità di ricostruire la casa.'),
 ('agamennone','ritorni','Il ritorno di Agamennone',3,'ritorni','Un vincitore che trova la sconfitta nella propria casa.'),
 ('diomede-arpi','ritorni','Il ritorno di Diomede e la fondazione di Arpi',2,'ritorni','Dalla guerra di Troia alla memoria del territorio foggiano.'),
 ('odissea','ritorni','L’Odissea',1,'odissea','Tornare a Itaca, ritrovare la propria identità.'),
 ('hybris-nemesi','hybris-nemesi','Hybris e Nemesi',0,'hybris-nemesi','Il limite e la misura: una chiave per interrogare i miti.')]
sections={'antefatto':('01','Antefatto','Prima della guerra: scelte, promesse e legami che preparano il conflitto.'),'fatto':('02','Fatto','La guerra intera e il poema che ne racconta soltanto una parte.'),'ritorni':('03','Ritorni','Dopo la vittoria, il viaggio verso casa e le sue conseguenze.'),'hybris-nemesi':('↗','Hybris e Nemesi','Una chiave di lettura trasversale, da mettere alla prova in ogni mito.')}
sources=json.loads((R/'data/sources/drive.json').read_text())
lessons=[]
for slug,section,title,idx,img,desc in config:
 src=sources[idx];text=src['text'].lstrip('\ufeff').replace('\r\n','\n').strip()
 # Only structural whitespace is normalized; every non-whitespace character remains.
 parts=re.split(r'\n\s*\n',text)
 # Separate duplicated source headings glued to prose, preserving their text.
 parts2=[]
 for p in parts:
  if p.endswith(parts[0]) and p!=parts[0]:parts2.extend([p[:-len(parts[0])],parts[0]])
  else:parts2.append(p)
 lessons.append(dict(slug=slug,section=section,title=title,image=img,description=desc,source=src,parts=parts2,path=f'{section}/{slug}.html'))
def nav(prefix):
 return '<a class="skip" href="#contenuto">Vai al contenuto</a><header class="mast"><a class="brand" href="'+prefix+'index.html">gbprof <span>MITOLOGIA · I ANNO</span></a><nav aria-label="Navigazione principale"><a href="'+prefix+'index.html">Home modulo</a>'+''.join(f'<a href="{prefix}{k}/index.html">{v[1]}</a>' for k,v in sections.items())+'<a href="/\u0023lezioni">Home generale ↗</a></nav></header>'
def page(title,body,prefix='',slug=''):
 return f'''<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#153c4b"><meta name="description" content="Iliade e Odissea: undici lezioni di mitologia con vocabolari, test e recupero degli errori."><title>{esc(title)} · gbprof</title><link rel="manifest" href="{prefix}manifest.webmanifest"><link rel="icon" href="{prefix}assets/icons/icon-192.png"><link rel="apple-touch-icon" href="{prefix}assets/icons/icon-192.png"><link rel="stylesheet" href="{prefix}css/style.css"><script src="{prefix}js/quiz-core.js" defer></script><script src="{prefix}js/app.js" defer></script></head><body data-root="{prefix}" data-lesson="{slug}">{nav(prefix)}<main id="contenuto">{body}</main><footer class="footer"><p>gbprof · Iliade e Odissea · I anno</p><div class="footer-tools"><button id="install" hidden>Installa l’app</button><span id="offline-status" role="status">Preparazione della lettura offline…</span><button id="cache-retry" hidden>Riprova download offline</button></div><details><summary>Installazione e dati sul dispositivo</summary><p>Su iPad: apri in Safari, tocca Condividi e scegli “Aggiungi alla schermata Home”. Lezioni, immagini e test sono disponibili senza rete quando compare “Modulo pronto offline”. I test non richiedono un account e non inviano risultati: l’ordine del tentativo precedente è conservato solo in questo browser.</p></details><a href="/\u0023lezioni">Torna alle lezioni di gbprof.it ↗</a></footer></body></html>'''
def card(l,prefix=''):
 return f'<article class="lesson-card"><a href="{prefix}{l["path"]}"><img src="{prefix}assets/images/{l["image"]}.webp" alt="{esc(l["title"])}: illustrazione della lezione" width="1448" height="1086" loading="lazy"><div class="card-copy"><h3>{esc(l["title"])}</h3><p>{l["description"]}</p><span>Leggi e mettiti alla prova ↗</span></div></a></article>'
body='<section class="hero"><div><p class="eyebrow">IL MONDO GRECO · MODULO DI MITOLOGIA</p><h1>Iliade<br><em>e Odissea.</em></h1><p class="lead">Scelte, guerra, ritorni.<br>Undici lezioni per entrare nel mondo degli eroi e interrogare il limite umano.</p><a class="button" href="#percorso">Esplora il percorso ↓</a></div><figure><img src="assets/images/odissea.webp" alt="Odisseo guarda il mare e le terre del suo viaggio" width="1448" height="1086"><figcaption>Non soltanto imprese. Modi diversi di essere uomini.</figcaption></figure></section><section class="map" id="percorso"><p class="eyebrow">LA MAPPA DEL MODULO</p><h2>Ogni lezione, una porta aperta.</h2><p>Puoi seguire il filo del racconto oppure scegliere da dove cominciare.</p><div class="timeline">'
for k in ['antefatto','fatto','ritorni']:
 n,t,d=sections[k];body+=f'<section class="map-step"><a href="{k}/index.html"><span class="number">{n}</span><h3>{t} <span aria-hidden="true">→</span></h3></a><p>{d}</p><ol>'+''.join(f'<li><a href="{l["path"]}">{esc(l["title"])}</a></li>' for l in lessons if l['section']==k)+'</ol></section>'
body+='</div><aside class="lens"><div><p class="eyebrow">LA CHIAVE TRASVERSALE</p><h3><a href="hybris-nemesi/index.html">Hybris e Nemesi ↗</a></h3><p>Non una quarta fase della storia: una lente per leggere scelte, eccessi e conseguenze.</p></div><a class="button light" href="hybris-nemesi/hybris-nemesi.html">Apri la lezione</a></aside></section>'
body+='<section class="catalog"><p class="eyebrow">LEGGERE · COMPRENDERE · RITORNARE AL TESTO</p><h2>Tutte le lezioni</h2><div class="cards">'+''.join(card(l) for l in lessons)+'</div></section>'
write('index.html',page('Iliade e Odissea',body))
for k,(n,t,d) in sections.items():
 body=f'<section class="section-title {"dark" if k=="hybris-nemesi" else ""}"><p class="eyebrow">{n} / {"CHIAVE INTERPRETATIVA" if k=="hybris-nemesi" else "IL PERCORSO"}</p><h1>{t}</h1><p class="lead">{d}</p></section>'
 if k=='fatto':body+='<aside class="distinction"><p><strong>Guerra di Troia:</strong> l’intero ciclo del conflitto.</p><p><strong>Iliade:</strong> un breve periodo dell’ultimo anno della guerra.</p></aside>'
 body+='<div class="cards section-cards">'+''.join(card(l,'../') for l in lessons if l['section']==k)+'</div>'
 write(f'{k}/index.html',page(t,body,'../'))
for i,l in enumerate(lessons):
 parts=l['parts'];body=f'<div class="breadcrumb"><a href="../index.html">Modulo</a> / <a href="index.html">{sections[l["section"]][1]}</a></div><header class="lesson-head"><p class="eyebrow">LEZIONE {i+1:02d} / 11</p><h1>{esc(l["title"])}</h1><p>{l["description"]}</p><div class="reading-tools"><a href="#test">Vai al test ↓</a><a href="#vocabolario">Vocabolario ↓</a><button id="text-size" aria-pressed="false">Testo più grande</button></div></header><figure class="lesson-image"><a href="../assets/images/{l["image"]}.webp" target="_blank" rel="noopener" aria-label="Apri l’immagine ingrandita"><img src="../assets/images/{l["image"]}.webp" alt="{esc(l["title"])}: {"schema illustrato dei tre ritorni" if l["image"]=="ritorni" else "immagine di riferimento dal materiale didattico"}" width="1448" height="1086"></a><figcaption>Tocca l’immagine per ingrandirla.</figcaption></figure>'
 if l['slug']=='diomede-arpi':body+='<aside class="route-note">Troia → Grecia → Adriatico → Daunia → Arpi → territorio foggiano</aside>'
 body+='<article class="reading" aria-label="Testo integrale della lezione">'
 for j,p in enumerate(parts):
  if j==0:body+=f'<p class="source-title" id="p{j}">{esc(p)}</p>'
  elif p=='VOCABOLARIO ESSENZIALE':body+=f'<h2 id="vocabolario"><span id="p{j}"></span>VOCABOLARIO ESSENZIALE</h2>'
  elif p in ['Il mito','Personaggi principali','Perché questo mito è importante',parts[0]]:body+=f'<h2 id="p{j}">{esc(p)}</h2>'
  else:body+=f'<p id="p{j}">{esc(p).replace(chr(10),"<br>")}</p>'
 body+='</article><section id="test" class="quiz" aria-labelledby="test-title"><p class="eyebrow">COMPRENDERE IL TESTO</p><h2 id="test-title">Mettiti alla prova.</h2><div id="quiz-content"><p>Una domanda alla volta, tre alternative. Correzione e recupero alla fine. A ogni avvio cambiano l’ordine delle domande e quello delle risposte.</p><button id="start-test">Inizia il test</button></div><noscript>Attiva JavaScript per svolgere il test interattivo. Il testo della lezione rimane interamente leggibile.</noscript></section><nav class="lesson-navigation" aria-label="Navigazione fra lezioni">'
 if i:body+=f'<a href="../{lessons[i-1]["path"]}">← Precedente: {esc(lessons[i-1]["title"])}</a>'
 body+='<a href="index.html">Indice della sezione</a>'
 if i<len(lessons)-1:body+=f'<a href="../{lessons[i+1]["path"]}">Successiva: {esc(lessons[i+1]["title"])} →</a>'
 body+='</nav>'
 write(l['path'],page(l['title'],body,'../',l['slug']))
write('data/catalog.json',json.dumps([{k:v for k,v in l.items() if k not in ['parts','source']} for l in lessons],ensure_ascii=False,indent=2))
write('data/paragraphs.json',json.dumps({l['slug']:l['parts'] for l in lessons},ensure_ascii=False,indent=2))
write('offline.html',page('Senza connessione','<section class="section-title"><h1>Sei senza connessione.</h1><p>Se il download del modulo è terminato, puoi continuare a leggere e svolgere i test.</p><a class="button" href="index.html">Apri il modulo</a><p>Se una pagina manca, torna online e attendi “Modulo pronto offline”.</p></section>'))
write('manifest.webmanifest',json.dumps({'id':'./','name':'Iliade e Odissea – I anno','short_name':'Iliade e Odissea','lang':'it','start_url':'./index.html','scope':'./','display':'standalone','background_color':'#f6f1e7','theme_color':'#153c4b','icons':[{'src':f'assets/icons/icon-{n}.png','sizes':f'{n}x{n}','type':'image/png','purpose':'any'} for n in [192,512]]+[{'src':'assets/icons/maskable-512.png','sizes':'512x512','type':'image/png','purpose':'maskable'}]},ensure_ascii=False,indent=2))
for n in [192,512]:
 im=Image.new('RGB',(n,n),'#153c4b');d=ImageDraw.Draw(im);w=n/512;d.ellipse((n*.15,n*.15,n*.85,n*.85),outline='#c5a36b',width=max(2,int(6*w)));d.polygon([(n*.29,n*.67),(n*.73,n*.67),(n*.65,n*.77),(n*.37,n*.77)],fill='#f6f1e7');d.line((n*.51,n*.25,n*.51,n*.67),fill='#c5a36b',width=max(2,int(7*w)));d.polygon([(n*.49,n*.29),(n*.3,n*.61),(n*.49,n*.61)],fill='#f6f1e7');d.polygon([(n*.54,n*.35),(n*.72,n*.61),(n*.54,n*.61)],fill='#c5a36b');im.save(R/f'assets/icons/icon-{n}.png')
 if n==512:im.save(R/'assets/icons/maskable-512.png')
print('Built',len(lessons),'complete lessons')
