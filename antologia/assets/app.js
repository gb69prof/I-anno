(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const catalog=window.ANTOLOGIA_CATALOG||[], data=window.LESSON||null;
  const root=document.body.dataset.root||'./';
  const prefix='gbprof-antologia-v1:';
  const stateKey=data?`lesson:${data.id}`:null;
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(prefix+key))??fallback}catch{return fallback}};
  let storageError=false;
  const write=(key,value)=>{try{localStorage.setItem(prefix+key,JSON.stringify(value));return true}catch{if(!storageError){storageError=true;toast('Il browser non riesce a salvare. Esporta gli appunti prima di chiudere.')}return false}};
  const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=t=>String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it');
  const href=(id,anchor='')=>`${root}lezioni/${encodeURIComponent(id)}.html${anchor?'#'+encodeURIComponent(anchor):''}`;
  let toastTimer;
  function toast(message){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.append(t)}t.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{t.textContent=''},4500)}
  function download(name,text,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.hidden=true;document.body.append(a);a.click();setTimeout(()=>a.remove(),1000);setTimeout(()=>URL.revokeObjectURL(url),60000);toast('Il file degli appunti è pronto. Controlla i download del browser.')}
  function openDialog(dialog){if(!dialog)return;dialog.showModal();const c=$('[data-close]',dialog);if(c)c.focus()}
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));
  const indexDialog=$('#index-dialog');
  function populateIndex(query=''){
    const host=$('#index-results');if(!host)return;
    const q=normalize(query.trim());
    if(!q){host.innerHTML=(data?`<h3>In questa lezione</h3><div class="index-links">${data.blocks.map(b=>`<a href="#${esc(b.id)}" data-local-anchor="${esc(b.id)}">${esc(b.title)}</a>`).join('')}<a href="#laboratorio" data-local-anchor="laboratorio">Laboratorio grafico</a><a href="#fonti" data-local-anchor="fonti">Fonti</a></div>`:'')+['Antologia','Cittadinanza'].map(area=>`<h3>${area}</h3><div class="index-links">${catalog.filter(l=>l.area===area).map(l=>`<a href="${href(l.id)}"${data?.id===l.id?' aria-current="page"':''}>${esc(l.number)} · ${esc(l.title)}</a>`).join('')}</div>`).join('');}
    else {const results=catalog.filter(l=>normalize(`${l.title} ${l.searchText}`).includes(q));host.innerHTML=`<p role="status">${results.length} ${results.length===1?'lezione trovata':'lezioni trovate'}</p><div class="search-results">${results.map(l=>{const text=l.searchText||'',at=normalize(text).indexOf(q);const snippet=text.slice(Math.max(0,at-65),Math.max(0,at-65)+200);return `<a href="${href(l.id)}"><strong>${esc(l.area)} · ${esc(l.title)}</strong><small>${esc(snippet)}…</small></a>`}).join('')}</div>`;}
    $$('[data-local-anchor]',host).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();indexDialog.close();goAnchor(a.dataset.localAnchor)}));
  }
  $$('[data-open-index]').forEach(b=>b.addEventListener('click',()=>{populateIndex();$('#course-search').value='';openDialog(indexDialog);$('#course-search').focus()}));
  $('#course-search')?.addEventListener('input',e=>populateIndex(e.target.value));
  let mapScale=100;
  const mapDialog=$('#map-dialog');
  function showImage(src,title,isMap){const img=$('#large-image');img.src=src;img.alt=title;$('#map-title').textContent=title;mapScale=100;img.style.width='100%';$('#zoom-level').textContent='100%';$('#download-image').href=src;$('#download-image').setAttribute('download',src.split('/').pop());const png=$('#download-png');png.hidden=!isMap;if(isMap)png.href=src.replace(/\.svg$/,'.png');openDialog(mapDialog)}
  $$('[data-image-open]').forEach(b=>b.addEventListener('click',()=>showImage(b.dataset.imageOpen,b.dataset.imageTitle,b.dataset.imageOpen.endsWith('.svg'))));
  $$('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.zoom;mapScale=v==='fit'?100:Math.max(50,Math.min(300,mapScale+Number(v)));$('#large-image').style.width=mapScale+'%';$('#zoom-level').textContent=mapScale+'%'}));
  $$('[data-print]').forEach(b=>b.addEventListener('click',()=>window.print()));
  $$('[data-install]').forEach(b=>b.addEventListener('click',()=>openDialog($('#install-dialog'))));
  const resume=read('last',null);if(resume&&catalog.some(l=>l.id===resume)){const b=$('#resume');if(b){b.hidden=false;b.href=href(resume)+'?resume=1';b.textContent='Riprendi la lettura'}}
  $$('[data-progress-id]').forEach(el=>{const st=read('lesson:'+el.dataset.progressId,{});el.textContent=st.completed?'Completata':st.max?`${Math.round(st.max)}% letto`:'Apri la lezione'});
  const currentReturn=new URLSearchParams(location.search).get('return');
  if(data&&currentReturn&&catalog.some(l=>l.id===currentReturn)){const ret=$('#return-link');ret.hidden=false;ret.href=href(currentReturn)+'?resume=1';ret.textContent='Torna alla lezione da cui sei arrivato'}
  $$('[data-bridge]').forEach(a=>{const u=new URL(a.href);if(data)u.searchParams.set('return',data.id);a.href=u.href});
  let lessonState=data?read(stateKey,{notes:'',highlights:[],quotes:[],attempts:[],scroll:0,max:0,completed:false}):null;
  function save(){if(data)write(stateKey,lessonState)}
  const article=$('.lesson-article');
  function setPanel(panel){document.body.dataset.panel=panel;$('#visual-panel').hidden=panel==='notes';$('#notes-panel').hidden=panel!=='notes';$$('[data-panel-button]').forEach(b=>{const mobile=b.classList.contains('mobile-panel');b.setAttribute('aria-pressed',String(b.dataset.panelButton===(panel==='read'&&!mobile?'visual':panel)));if(mobile)b.textContent=b.dataset.panelButton===panel?'Lezione':b.dataset.panelButton==='visual'?'Osserva':'Appunti'});}
  function goAnchor(id){if(!article)return;setPanel('read');const el=document.getElementById(id);if(el){article.scrollTop+=el.getBoundingClientRect().top-article.getBoundingClientRect().top-20;el.setAttribute('tabindex','-1');el.focus({preventScroll:true});history.replaceState(null,'','#'+encodeURIComponent(id));}}
  if(data){
    lessonState={notes:'',highlights:[],quotes:[],attempts:[],scroll:0,max:0,completed:false,...lessonState};write('last',data.id);
    const font=read('font',1);document.documentElement.style.setProperty('--scale',font);
    $$('[data-font]').forEach(b=>b.addEventListener('click',()=>{let n=Math.max(.9,Math.min(1.8,Number(read('font',1))+Number(b.dataset.font)));n=Math.round(n*100)/100;write('font',n);document.documentElement.style.setProperty('--scale',n);$('#font-value').textContent=Math.round(n*100)+'%'}));
    $('#font-value').textContent=Math.round(font*100)+'%';$('#font-trigger').addEventListener('click',()=>openDialog($('#font-dialog')));
    $$('[data-panel-button]').forEach(b=>b.addEventListener('click',()=>{const p=b.dataset.panelButton;const chosen=b.classList.contains('mobile-panel')&&document.body.dataset.panel===p?'read':p;setPanel(chosen)}));
    setPanel('read');
    const notes=$('#notes');notes.value=lessonState.notes;let noteTimer;
    notes.addEventListener('input',()=>{lessonState.notes=notes.value;$('#notes-status').textContent='Salvataggio…';clearTimeout(noteTimer);noteTimer=setTimeout(()=>{$('#notes-status').textContent=write(stateKey,lessonState)?'Appunti salvati su questo dispositivo':'Salvataggio non riuscito: esporta gli appunti'},250)});
    function paintQuotes(){const host=$('#saved-quotes');host.innerHTML=lessonState.quotes.length?lessonState.quotes.map(q=>`<p class="note-quote">${esc(q)}</p>`).join(''):'<p class="small">Seleziona un passaggio della lezione e aggiungilo agli appunti.</p>';$('#highlight-count').textContent=lessonState.highlights.length;}
    function addQuote(t){if(!t.trim())return;if(!lessonState.quotes.includes(t)){lessonState.quotes.push(t);lessonState.notes+=(lessonState.notes.trim()?'\n\n':'')+`«${t}»\n— ${data.title}`;notes.value=lessonState.notes;save();paintQuotes()}toast('Passaggio aggiunto agli appunti')}
    $('#paste-highlights').addEventListener('click',()=>{lessonState.highlights.forEach(h=>addQuote(h.text));if(!lessonState.highlights.length)toast('Non ci sono ancora evidenziazioni')});
    $('#export-notes').addEventListener('click',()=>download(`appunti-${data.id}.txt`,`${data.area} — ${data.title}\n\n${notes.value}`));
    $('#export-all-notes')?.addEventListener('click',exportAllNotes);
    let selectionParts=[];
    const tools=$('#selection-tools');
    function captureSelection(){const sel=window.getSelection();if(!sel||sel.isCollapsed||!sel.rangeCount){tools.hidden=true;return}const range=sel.getRangeAt(0);if(!article.contains(range.commonAncestorContainer)){tools.hidden=true;return}const parts=[];$$('[data-pid]',article).forEach(p=>{if(!range.intersectsNode(p))return;const text=p.textContent;if(!text.trim())return;const startRange=document.createRange();startRange.selectNodeContents(p);let start=0,end=text.length;try{if(p.contains(range.startContainer)){startRange.setEnd(range.startContainer,range.startOffset);start=startRange.toString().length}if(p.contains(range.endContainer)){startRange.selectNodeContents(p);startRange.setEnd(range.endContainer,range.endOffset);end=startRange.toString().length}}catch{return}if(end>start)parts.push({pid:p.dataset.pid,start,end,text:text.slice(start,end)})});selectionParts=parts;tools.hidden=!parts.length;}
    document.addEventListener('selectionchange',()=>setTimeout(captureSelection,80));article.addEventListener('pointerup',()=>setTimeout(captureSelection,100));
    $$('button',tools).forEach(b=>b.addEventListener('pointerdown',e=>e.preventDefault()));
    function restoreHighlights(){
      $$('mark[data-highlight]',article).forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));article.normalize();
      const groups={};lessonState.highlights.forEach(h=>(groups[h.pid]??=[]).push(h));
      Object.entries(groups).forEach(([pid,hs])=>{const p=$(`[data-pid="${pid}"]`,article);if(!p)return;let ranges=hs.filter(h=>p.textContent.slice(h.start,h.end)===h.text).map(h=>[h.start,h.end]).sort((a,b)=>a[0]-b[0]);const merged=[];ranges.forEach(r=>{const prev=merged.at(-1);if(prev&&r[0]<=prev[1])prev[1]=Math.max(prev[1],r[1]);else merged.push(r)});for(const [start,end] of merged.reverse()){const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);const nodes=[];let n,pos=0;while((n=walker.nextNode())){nodes.push({n,start:pos,end:pos+n.length});pos+=n.length}for(const a of nodes.reverse()){const from=Math.max(0,start-a.start),to=Math.min(a.n.length,end-a.start);if(to<=from)continue;const r=document.createRange();r.setStart(a.n,from);r.setEnd(a.n,to);const mark=document.createElement('mark');mark.dataset.highlight='';r.surroundContents(mark)}}});
    }
    $('#highlight-selection').addEventListener('click',()=>{selectionParts.forEach(p=>{if(!lessonState.highlights.some(h=>h.pid===p.pid&&h.start===p.start&&h.end===p.end))lessonState.highlights.push(p)});save();window.getSelection().removeAllRanges();restoreHighlights();paintQuotes();tools.hidden=true;toast('Evidenziazione salvata')});
    $('#add-selection').addEventListener('click',()=>{selectionParts.forEach(p=>addQuote(p.text));tools.hidden=true;window.getSelection().removeAllRanges()});
    $('#clear-highlights').addEventListener('click',()=>confirmLocal('Cancellare le evidenziazioni di questa lezione?',()=>{lessonState.highlights=[];save();restoreHighlights();paintQuotes();toast('Evidenziazioni cancellate')}));
    $('#clear-notes').addEventListener('click',()=>confirmLocal('Cancellare gli appunti di questa lezione?',()=>{lessonState.notes='';lessonState.quotes=[];notes.value='';save();paintQuotes();toast('Appunti cancellati')}));
    restoreHighlights();paintQuotes();
    function progress(){const total=article.scrollHeight-article.clientHeight;const percent=total>1?Math.min(100,article.scrollTop/total*100):100;lessonState.scroll=article.scrollTop;lessonState.max=Math.max(lessonState.max,percent);$('#reading-progress').value=percent;$('#progress-label').textContent=Math.round(percent)+'%';}
    let scrollTimer;article.addEventListener('scroll',()=>{progress();clearTimeout(scrollTimer);scrollTimer=setTimeout(save,180)},{passive:true});
    requestAnimationFrame(()=>{if(location.hash){goAnchor(decodeURIComponent(location.hash.slice(1)))}else{article.scrollTop=lessonState.scroll||0}progress()});
    const complete=$('#complete-lesson');function syncComplete(){complete.textContent=lessonState.completed?'Lezione completata ✓':'Segna come completata';complete.setAttribute('aria-pressed',String(lessonState.completed))}syncComplete();complete.addEventListener('click',()=>{lessonState.completed=!lessonState.completed;save();syncComplete()});
    window.addEventListener('pagehide',()=>{lessonState.notes=notes.value;progress();save()});
    $('#ripassa').addEventListener('click',()=>{if(!$('#learning-content').hasChildNodes())renderLearning('essentials');openDialog($('#learning-dialog'))});
    $$('[data-learning]').forEach(b=>b.addEventListener('click',()=>renderLearning(b.dataset.learning)));
    $$('a[href^="#"]',article).forEach(a=>a.addEventListener('click',e=>{const id=decodeURIComponent(a.hash.slice(1));if(document.getElementById(id)){e.preventDefault();goAnchor(id)}}));
  }
  function exportAllNotes(){const out=catalog.map(l=>{const s=read('lesson:'+l.id,{});return s.notes?`${l.area} — ${l.title}\n${s.notes}`:''}).filter(Boolean).join('\n\n--------------------\n\n');download('appunti-antologia-completi.txt',out||'Nessun appunto salvato.');}
  $$('[data-export-all]').forEach(b=>b.addEventListener('click',exportAllNotes));
  let confirmedAction=null;
  function confirmLocal(text,action){$('#confirm-text').textContent=text;confirmedAction=action;openDialog($('#confirm-dialog'))}
  $('#confirm-yes')?.addEventListener('click',()=>{$('#confirm-dialog').close();if(confirmedAction)confirmedAction();confirmedAction=null});
  $$('[data-reset]').forEach(b=>b.addEventListener('click',()=>confirmLocal('Cancellare appunti, evidenziazioni, avanzamento e verifiche dell’antologia su questo dispositivo? Esporta prima gli appunti che vuoi conservare.',()=>{Object.keys(localStorage).filter(k=>k.startsWith(prefix)).forEach(k=>localStorage.removeItem(k));location.reload()})));
  function renderLearning(tab){
    $$('[data-learning]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.learning===tab)));const host=$('#learning-content');
    if(tab==='essentials')host.innerHTML=`<h3>La lezione in breve</h3><p>${esc(data.summary)}</p><h3>Saperi irrinunciabili</h3><ul>${data.essentials.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`;
    if(tab==='vocab')host.innerHTML=`<dl class="vocab">${data.vocabulary.map(v=>`<div><dt>${esc(v[0])}</dt><dd>${esc(v[1])}</dd></div>`).join('')}</dl>`;
    if(tab==='test')renderQuiz();
  }
  function renderQuiz(only=null){
    const host=$('#learning-content'),selected=only||data.quiz.map((_,i)=>i);const prev=lessonState.attempts.at(-1);
    host.innerHTML=`<h3>${only?'Riprendi i nessi da chiarire':'Verifica la comprensione'}</h3><p>Leggi le alternative e scegli. Dopo la correzione trovi spiegazioni e recupero per i punti da chiarire.</p>${prev?`<details class="attempt-history"><summary>Tentativi precedenti (${lessonState.attempts.length})</summary><ol>${lessonState.attempts.map(a=>`<li>${new Date(a.date).toLocaleString('it-IT')} · ${a.correct} ${a.correct===1?'nesso riconosciuto':'nessi riconosciuti'} su ${a.ids.length}</li>`).join('')}</ol></details>`:''}<form id="quiz-form">${selected.map(i=>{const q=data.quiz[i];return `<fieldset class="quiz-question" data-question="${i}"><legend>${i+1}. ${esc(q.question)}</legend>${q.options.map((o,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}" required><span>${esc(o)}</span></label>`).join('')}<div class="quiz-feedback" id="feedback-${i}"></div></fieldset>`}).join('')}<button class="gold" type="submit">Correggi la verifica</button></form><div id="quiz-result" role="status"></div>`;
    $('#quiz-form').addEventListener('submit',e=>{e.preventDefault();const answers=selected.map(i=>Number($(`input[name="q${i}"]:checked`,e.target).value));const wrong=[];selected.forEach((i,k)=>{const q=data.quiz[i],correct=answers[k]===q.answer;if(!correct)wrong.push(i);const h=$('#feedback-'+i);h.innerHTML=`<div class="feedback"><strong class="${correct?'success':'error'}">${correct?'Corretto.':'Da chiarire.'}</strong><p>${esc(q.explanation)}</p>${correct?'':`<a href="#${esc(q.anchor)}" data-recovery-link="${esc(q.anchor)}">Rileggi il passaggio della lezione</a><div class="recovery"><h4>Un altro passo</h4><p>${esc(q.recovery.text)}</p><p><strong>${esc(q.recovery.question)}</strong></p>${q.recovery.options.map((o,j)=>`<label class="quiz-option"><input type="radio" name="r${i}" value="${j}"><span>${esc(o)}</span></label>`).join('')}<button type="button" data-check-recovery="${i}">Controlla il recupero</button><p id="recovery-feedback-${i}" role="status"></p></div>`}</div>`;});
      lessonState.attempts.push({date:new Date().toISOString(),ids:selected,answers,correct:selected.length-wrong.length,wrong,recoveries:{}});save();
      $('#quiz-result').innerHTML=`<p><strong>${selected.length-wrong.length} ${selected.length-wrong.length===1?'nesso riconosciuto':'nessi riconosciuti'} su ${selected.length}.</strong> ${wrong.length?'Rileggi le spiegazioni dei punti da chiarire.':'Hai riconosciuto tutti i nessi della verifica.'}</p>${wrong.length?'<button id="retry-errors" type="button">Riprova soltanto gli errori</button>':''}<button id="retry-all" type="button">Nuovo tentativo completo</button>`;
      $('button[type=submit]',e.target).disabled=true;$$('input[name^=q]',e.target).forEach(i=>i.disabled=true);
      $$('[data-recovery-link]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();$('#learning-dialog').close();goAnchor(a.dataset.recoveryLink)}));
      $$('[data-check-recovery]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.checkRecovery),chosen=$(`input[name="r${i}"]:checked`),feedback=$('#recovery-feedback-'+i);if(!chosen){feedback.textContent='Scegli prima una risposta.';return}const q=data.quiz[i],ok=Number(chosen.value)===q.recovery.answer;feedback.textContent=ok?'Il nesso è stato chiarito. '+q.explanation:'Riprova: '+q.recovery.text;feedback.className=ok?'success':'error';const a=lessonState.attempts.at(-1);a.recoveries[i]??=[];a.recoveries[i].push({answer:Number(chosen.value),correct:ok});save()}));
      $('#retry-errors')?.addEventListener('click',()=>renderQuiz(wrong));$('#retry-all').addEventListener('click',()=>renderQuiz());
    });
  }
  const status=$('#offline-status');
  if('serviceWorker'in navigator&&location.protocol!=='file:'){
    navigator.serviceWorker.register(root+'sw.js',{scope:root}).then(reg=>{
      function update(){if(reg.waiting&&navigator.serviceWorker.controller){$('#update-banner').hidden=false;$('#update-now').onclick=()=>{if(data)save();reg.waiting.postMessage({type:'SKIP_WAITING'})}}}update();reg.addEventListener('updatefound',()=>reg.installing?.addEventListener('statechange',update));
      navigator.serviceWorker.ready.then(()=>{if(status)status.textContent='Contenuti pronti anche offline';});
      let refreshing=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!refreshing&&!$('#update-banner').hidden){refreshing=true;location.reload()}});
    }).catch(()=>{if(status)status.textContent='Copia offline non pronta: verifica la connessione';});
  }else if(status)status.textContent='Per installare e usare offline, apri la PWA da un sito HTTPS.';
  window.addEventListener('offline',()=>toast('Connessione assente: continui a usare i contenuti scaricati.'));
})();
