/* gbprof · Civiltà fluviali: motore del laboratorio
   Funziona senza account; percorso e note salvati solo nel browser locale. */
'use strict';
const KEY='gbprof-civilta-fluviali-lab-v1';
const blank=()=>({version:1,decisions:{},completed:{},notes:'',examAnswers:{},examSubmitted:false,examOrder:[],optionOrder:{}});
const el=id=>document.getElementById(id);
const show=(id,yes)=>{el(id).hidden=!yes;};
const txt=(id,s)=>{el(id).textContent=String(s);};
function retrieve(){
 try{
  const x=JSON.parse(localStorage.getItem(KEY)||'null');
  if(x&&x.version===1&&x.decisions&&x.completed)return Object.assign(blank(),x);
 }catch(e){}
 return blank();
}
let state=retrieve(),current=0;
function save(){
 try{localStorage.setItem(KEY,JSON.stringify(state));txt('saveState','Salvato su questo dispositivo');}
 catch(e){txt('saveState','Salvataggio non disponibile: esporta il percorso');}
}
const completeCount=()=>LAB_STAGES.filter((_,i)=>state.completed[i]===true).length;
const allDone=()=>completeCount()===LAB_STAGES.length;
function progress(){
 const n=completeCount();
 txt('progressText',n+' tappe concluse su '+LAB_STAGES.length);
 txt('knowledgeState',n+'/'+LAB_STAGES.length);
 el('progressFill').style.width=(n/LAB_STAGES.length*100)+'%';
 el('progressBar').setAttribute('aria-valuenow',String(n));
}
function nav(){
 const root=el('stageNav');root.replaceChildren();
 LAB_STAGES.forEach((s,i)=>{
  const li=document.createElement('li'),b=document.createElement('button');
  b.type='button';b.className='stage-tab'+(current===i?' is-active':'')+(state.completed[i]?' is-done':'');
  if(current===i)b.setAttribute('aria-current','step');
  const n=document.createElement('span');n.className='number';n.textContent=state.completed[i]?'✓':String(i+1).padStart(2,'0');
  const label=document.createElement('span');label.textContent=s.short;
  b.append(n,label);b.addEventListener('click',()=>render(i));li.append(b);root.append(li);
 });
 const li=document.createElement('li'),b=document.createElement('button');
 b.type='button';b.className='stage-tab'+(current===7?' is-active':'');b.disabled=!allDone();
 const n=document.createElement('span');n.className='number';n.textContent='★';
 const label=document.createElement('span');label.textContent='Verifica finale';
 b.append(n,label);b.addEventListener('click',()=>render(7));li.append(b);root.append(li);
}
function radioList(root,name,labels,selected,disabled,change){
 root.replaceChildren();
 labels.forEach((label,i)=>{
  const item=document.createElement('label');item.className='choice';
  const input=document.createElement('input');input.type='radio';input.name=name;input.value=String(i);
  input.checked=selected===i;input.disabled=disabled;
  input.addEventListener('change',()=>change(i));
  const span=document.createElement('span');span.textContent=label;
  item.append(input,span);root.append(item);
 });
}
function getRadio(root){const x=root.querySelector('input:checked');return x?Number(x.value):null;}
function scene(i){
 const egypt=(i===4||i===5);
 txt('sceneEra',egypt?'Egitto · IV–III millennio a.C.':i===6?'Due civiltà · a confronto':'Mesopotamia · IV millennio a.C.');
 txt('worldLabel',egypt?'Valle del Nilo':i===6?'Due storie fluviali':i>=2?'Verso la città':'Villaggio e campi');
 const d=state.decisions[1];
 el('worldChannels').setAttribute('opacity',i===0?'.05':d===1?'.30':'.9');
 el('worldFields').setAttribute('opacity',i===0?'.15':i>=2?'.96':'.65');
 el('worldHouses').setAttribute('opacity',i>0?'.95':'.5');
 el('worldCity').setAttribute('opacity',i>=2&&!egypt&&i!==6?'.98':i===6?'.65':'.02');
 el('worldArchive').setAttribute('opacity',i>=3&&!egypt?'.95':'.02');
 txt('waterState',egypt?'Piene stagionali':d===0?'Canali condivisi':d===1?'Canali diseguali':i>=1?'Acqua da gestire':'Risorsa da conoscere');
 txt('settlementState',i===5?'Regno in formazione':i===6?'Due civiltà':i>=2?'Città in crescita':'Villaggio');
}
function carryOver(i){
 if(i===1&&state.decisions[0]===1)return 'La tua comunità vive lontano dal fiume: l’accesso all’acqua è diventato più difficile.';
 if(i===2&&state.decisions[1]===0)return 'Grazie al lavoro comune sui canali puoi ora confrontarti con la distribuzione delle eccedenze.';
 if(i===2&&state.decisions[1]===1)return 'I canali sono diseguali: la comunità deve ancora accordarsi su come usare e distribuire le risorse.';
 if(i===2&&state.decisions[1]===2)return 'Un capo controlla l’accesso all’acqua: chi controllerà adesso anche le riserve alimentari?';
 if(i===3&&state.decisions[2]===0)return 'I magazzini comuni sono cresciuti; le scorte e le distribuzioni diventano difficili da ricordare.';
 if(i===3&&state.decisions[2]===1)return 'Gli scambi sono aumentati: è sempre più difficile ricordare entrate e uscite di merci.';
 if(i===3&&state.decisions[2]===2)return 'Anche senza grandi riserve comuni occorre ricordare quantità e distribuzioni.';
 if(i===5&&state.decisions[4]===0)return 'Le comunità conoscono il ritmo delle piene. Ma organizzare campi non equivale a governare territori.';
 if(i===5&&state.decisions[4]===1)return 'I collegamenti rimangono difficili. Nella valle nascono questioni di controllo e potere.';
 if(i===6&&state.decisions[5]===1)return 'Hai immaginato la conquista come soluzione politica: ora confrontala con le prove storiche.';
 return '';
}
function renderMap(s){
 const root=el('stageMap');root.replaceChildren();
 if(!s.map){root.hidden=true;return;}root.hidden=false;
 const f=document.createElement('figure');f.style.margin=0;
 const img=document.createElement('img');img.src='../assets/'+s.map;img.loading='lazy';img.alt='Cartina della lezione: '+s.short;
 const cap=document.createElement('figcaption');cap.textContent=s.mapCaption;
 f.append(img,cap);root.append(f);
}
function render(i){
 current=i===7&&allDone()?7:Math.max(0,Math.min(i,LAB_STAGES.length-1));
 progress();nav();
 if(current===7){show('storyCard',false);show('finalPanel',true);renderExam();return;}
 show('finalPanel',false);show('storyCard',true);
 const s=LAB_STAGES[current],d=state.decisions[current],hasDecision=Number.isInteger(d);
 txt('stageEpoch',s.epoch);txt('stageCount',String(current+1).padStart(2,'0')+' / 07');
 txt('stageTitle',s.title);txt('stageLead',s.lead+(carryOver(current)?' '+carryOver(current):''));
 txt('questionTitle',s.problem);txt('questionBody',s.scenario);
 txt('stageMark',state.completed[current]?'Conoscenza verificata':'Simulazione');
 renderMap(s);scene(current);
 radioList(el('choices'),'decision-'+current,s.choices.map(x=>x[0]),hasDecision?d:null,hasDecision,()=>{el('decideBtn').disabled=false;});
 el('decideBtn').disabled=!hasDecision;show('decideBtn',!hasDecision);
 show('outcome',false);show('historyPanel',false);show('knowledgePanel',false);show('knowledgeFeedback',false);
 el('prevBtn').disabled=current===0;
 el('nextBtn').disabled=!state.completed[current];
 txt('nextBtn',current===6?'Vai alla verifica finale →':'Continua il viaggio →');
 if(hasDecision)resolve(false);
}
function resolve(focus){
 const s=LAB_STAGES[current],d=state.decisions[current];if(!Number.isInteger(d)||!s.choices[d])return;
 show('outcome',true);show('historyPanel',true);show('knowledgePanel',true);
 const choice=s.choices[d];
 txt('outcomeTitle',choice[1]);txt('outcomeText',choice[2]);txt('outcomeBridge',choice[3]);
 const b=document.createElement('button');b.type='button';b.className='text-button';b.textContent='Esplora un’altra decisione';
 b.style.display='block';b.style.marginTop='12px';
 b.addEventListener('click',()=>{
  delete state.decisions[current];delete state.completed[current];state.examSubmitted=false;
  state.examAnswers={};save();render(current);el('questionTitle').scrollIntoView({block:'center'});
 });el('outcomeBridge').append(b);
 txt('historySummary',s.history);txt('historyLimit',s.limit);
 const facts=el('historyFacts');facts.replaceChildren();
 s.facts.forEach(f=>{const li=document.createElement('li');li.textContent=f;facts.append(li);});
 const sources=el('historySources');sources.replaceChildren();
 s.sources.forEach(k=>{
  const source=LAB_SOURCES[k];if(!source)return;
  const a=document.createElement('a');a.href=source[1];a.textContent=source[0]+' ↗';
  a.target='_blank';a.rel='noopener noreferrer';sources.append(a);
 });
 txt('knowledgeQuestion',s.check[0]);
 radioList(el('knowledgeChoices'),'knowledge-'+current,s.check[1],state.completed[current]?s.check[2]:null,Boolean(state.completed[current]),()=>el('checkBtn').disabled=false);
 show('checkBtn',!state.completed[current]);el('checkBtn').disabled=true;
 if(state.completed[current]){
  const fb=el('knowledgeFeedback');fb.className='feedback success';fb.textContent='✓ Conoscenza verificata. '+s.check[3];fb.hidden=false;
  el('nextBtn').disabled=false;
 }
 scene(current);if(focus)el('outcome').focus();
}
function decide(){
 if(current>=7||Number.isInteger(state.decisions[current]))return;
 const n=getRadio(el('choices'));if(n===null||n<0||n>=3)return;
 state.decisions[current]=n;save();render(current);el('outcome').focus();
}
function verify(){
 const selected=getRadio(el('knowledgeChoices'));if(selected===null)return;
 const s=LAB_STAGES[current],correct=selected===s.check[2],fb=el('knowledgeFeedback');
 fb.className='feedback'+(correct?' success':'');
 fb.textContent=correct?'✓ Corretta! '+s.check[3]:'Non ancora: rileggi «Storia documentata» e riprova. '+s.check[3];
 fb.hidden=false;fb.scrollIntoView({block:'nearest'});
 if(correct){
  state.completed[current]=true;save();progress();nav();
  el('knowledgeChoices').querySelectorAll('input').forEach(x=>x.disabled=true);
  show('checkBtn',false);el('nextBtn').disabled=false;txt('stageMark','Conoscenza verificata');
 }
}
function shuffle(a){const arr=a.slice();for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function ensureExam(){
 if(!Array.isArray(state.examOrder)||state.examOrder.length!==LAB_EXAM.length||new Set(state.examOrder).size!==LAB_EXAM.length){
  state.examOrder=shuffle(LAB_EXAM.map((_,i)=>i));state.optionOrder={};
  LAB_EXAM.forEach((_,i)=>state.optionOrder[i]=shuffle([0,1,2]));save();
 }
}
function countAnswers(){return LAB_EXAM.filter((_,i)=>Number.isInteger(state.examAnswers[i])).length;}
function controls(){
 txt('examCounter',countAnswers()+' risposte su '+LAB_EXAM.length);
 el('submitQuizBtn').disabled=countAnswers()!==LAB_EXAM.length||state.examSubmitted;
}
function renderExam(){
 ensureExam();
 const root=el('examQuestions');root.replaceChildren();
 state.examOrder.forEach((index,pos)=>{
  const q=LAB_EXAM[index];if(!q)return;
  const item=document.createElement('article');item.className='exam-item';
  const kind=document.createElement('span');kind.className='type';kind.textContent=q[0];
  const title=document.createElement('h4');title.textContent=(pos+1)+'. '+q[1];item.append(kind,title);
  const field=document.createElement('fieldset');field.className='choices choices-compact';
  const legend=document.createElement('legend');legend.className='sr-only';legend.textContent=q[1];field.append(legend);
  const choiceOrder=state.optionOrder[index]||[0,1,2];
  choiceOrder.forEach(opt=>{
   const label=document.createElement('label');label.className='choice';
   const input=document.createElement('input');input.type='radio';input.name='exam-'+index;input.value=String(opt);
   input.checked=state.examAnswers[index]===opt;input.disabled=state.examSubmitted;
   const span=document.createElement('span');span.textContent=q[2][opt];label.append(input,span);field.append(label);
   input.addEventListener('change',()=>{state.examAnswers[index]=opt;save();controls();});
  });item.append(field);
  if(state.examSubmitted){
   const correct=state.examAnswers[index]===q[3];item.classList.add(correct?'is-right':'is-wrong');
   const feedback=document.createElement('p');feedback.className='exam-feedback';feedback.textContent=(correct?'✓ Corretta. ':'✗ Da rivedere. ')+q[4];item.append(feedback);
  }
  root.append(item);
 });
 controls();show('submitQuizBtn',!state.examSubmitted);
 show('examResult',state.examSubmitted);
 if(state.examSubmitted)showGrade();
}
function showGrade(){
 const score=LAB_EXAM.filter((q,i)=>state.examAnswers[i]===q[3]).length;
 const div=el('examResult');div.replaceChildren();
 const card=document.createElement('div');card.className='grade';
 const big=document.createElement('strong');big.textContent=score+'/'+LAB_EXAM.length;
 const p=document.createElement('p');
 p.textContent=score>=10?'Conoscenze solide: sai collocare e spiegare i fenomeni.':score>=7?'Buona base: ripassa le domande segnate.':'Torna alla lezione: ripassa cartine, cronologia, istituzioni e fonti.';
 const detail=document.createElement('p');detail.className='detail';
 detail.textContent='1 punto per risposta corretta, 0 per risposta errata. Le decisioni simulate non danno punti.';
 card.append(big,p,detail);div.append(card);
}
function resetExam(){
 state.examAnswers={};state.examOrder=[];state.optionOrder={};state.examSubmitted=false;
 save();renderExam();
}
function submitExam(){
 if(countAnswers()!==LAB_EXAM.length)return;
 state.examSubmitted=true;save();renderExam();el('examResult').scrollIntoView({block:'nearest'});
}
function reportText(){
 const rows=['GBPROF · DUE FIUMI, DUE CIVILTÀ','Laboratorio interattivo — resoconto','Data: '+new Date().toLocaleDateString('it-IT'),'',
  'ATTENZIONE: le decisioni sono simulazioni, non episodi documentati.',''];
 LAB_STAGES.forEach((s,i)=>{
  const d=state.decisions[i];
  rows.push((i+1)+'. '+s.title,'Decisione simulata: '+(Number.isInteger(d)?s.choices[d][0]:'non effettuata'),
   'Conoscenza verificata: '+(state.completed[i]?'sì':'no'),'Sapere storico: '+s.facts[0],'');
 });
 if(state.examSubmitted){
  const score=LAB_EXAM.filter((q,i)=>state.examAnswers[i]===q[3]).length;
  rows.push('VERIFICA FINALE: '+score+'/'+LAB_EXAM.length);
  LAB_EXAM.forEach((q,i)=>rows.push((state.examAnswers[i]===q[3]?'[OK] ':'[DA RIVEDERE] ')+q[1]+' — '+q[4]));
 }
 rows.push('','TACCUINO DELLO STORICO',state.notes||'(nessuna annotazione)','',
  'TRE DOMANDE DI SINTESI (da discutere con il docente):',
  '1. Perché il fiume non basta a spiegare la nascita dello Stato?',
  '2. In che cosa differivano Mesopotamia ed Egitto per organizzazione politica?',
  '3. Quali prove ti permettono di distinguere una scena simulata da un fatto documentato?',
  '','Fonti: Metropolitan Museum of Art, British Museum, Ministero egiziano delle Antichità.',
  'Nessun dato è inviato a server esterni.');
 return rows.join('\n');
}
function download(){
 const data=new Blob([reportText()],{type:'text/plain;charset=utf-8'});
 const url=URL.createObjectURL(data),a=document.createElement('a');
 a.href=url;a.download='gbprof-civilta-fluviali-percorso.txt';document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function notebook(){
 const dialog=el('notebookDialog'),textarea=el('notebookText');
 textarea.value=state.notes||'';
 textarea.addEventListener('input',()=>{state.notes=textarea.value;save();txt('noteSaved','Note conservate su questo dispositivo');});
 el('openNotebook').addEventListener('click',()=>{if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');});
 el('closeNotebook').addEventListener('click',()=>{if(dialog.close)dialog.close();else dialog.removeAttribute('open');});
}
function init(){
 el('decideBtn').addEventListener('click',decide);
 el('checkBtn').addEventListener('click',verify);
 el('prevBtn').addEventListener('click',()=>render(current-1));
 el('nextBtn').addEventListener('click',()=>render(current+1));
 el('resetQuizBtn').addEventListener('click',resetExam);
 el('submitQuizBtn').addEventListener('click',submitExam);
 el('exportBtn').addEventListener('click',download);
 el('printBtn').addEventListener('click',()=>window.print());
 el('restartBtn').addEventListener('click',()=>{
  if(window.confirm('Vuoi cancellare scelte, note e risultati salvati su questo dispositivo?')){
   state=blank();save();el('notebookText').value='';render(0);el('laboratorio').scrollIntoView({block:'start'});
  }
 });
 notebook();render(0);
}
document.addEventListener('DOMContentLoaded',init);
