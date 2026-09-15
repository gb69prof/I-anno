const timelineText = {
  meso1: 'Crescita di grandi città nella Mesopotamia meridionale: fase di Uruk.',
  meso2: 'Compaiono le prime forme di scrittura che porteranno alla cuneiforme.',
  meso3: 'L’impero accadico estende un solo potere su molte città mesopotamiche.',
  meso4: 'Hammurabi regna a Babilonia e lega il suo nome a una celebre raccolta di leggi.',
  meso5: 'L’Impero assiro raggiunge una grande espansione nel Vicino Oriente.',
  meso6: 'Babilonia viene conquistata dai Persiani: si chiude una lunga fase della storia mesopotamica.',
  egy1: 'Unificazione dell’Alto e del Basso Egitto; inizio dell’età dinastica.',
  egy2: 'Antico Regno: fase delle grandi piramidi e forte potere centrale.',
  egy3: 'Medio Regno: nuova fase di unità, sviluppo e controllo del territorio.',
  egy4: 'Nuovo Regno: l’Egitto raggiunge la sua massima espansione politica e militare.',
  egy5: 'Alessandro Magno conquista l’Egitto e apre l’età ellenistica.',
  egy6: 'L’Egitto entra nell’orbita romana, dopo l’età di Cesare.'
};

document.querySelectorAll('.time-node').forEach(btn => {
  btn.addEventListener('click', () => {
    const isEgypt = btn.dataset.time.startsWith('egy');
    const box = document.getElementById(isEgypt ? 'egyTimelineText' : 'mesoTimelineText');
    const track = btn.closest('.timeline-track');
    track.querySelectorAll('.time-node').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    box.textContent = timelineText[btn.dataset.time];
  });
});

const quizData = {
  mesopotamia: {
    title: 'Test finale · Mesopotamia',
    questions: [
      {q:'Che cosa significa il nome “Mesopotamia”?', a:['Terra compresa fra due grandi fiumi','Terra collocata oltre un grande deserto','Terra affacciata su un grande mare'], c:0, recovery:'Mesopotamia deriva dal greco e significa “terra fra i fiumi”: i due fiumi sono il Tigri e l’Eufrate.'},
      {q:'Quali fiumi attraversano la Mesopotamia?', a:['Il Tigri e l’Eufrate','Il Nilo e il Giordano','L’Indo e il Gange'], c:0, recovery:'La Mesopotamia si sviluppa soprattutto nella pianura attraversata da Tigri ed Eufrate, nell’area dell’attuale Iraq.'},
      {q:'Perché l’irrigazione favorì forme di organizzazione collettiva?', a:['Canali e argini richiedevano lavoro coordinato','Le piene rendevano inutile ogni lavoro comune','I deserti fornivano direttamente acqua ai campi'], c:0, recovery:'Per usare stabilmente l’acqua occorreva costruire e mantenere canali e argini. Erano lavori troppo grandi per una sola famiglia e richiedevano coordinamento.'},
      {q:'Che cosa rese possibile il surplus agricolo?', a:['Mantenere persone dedicate a lavori diversi','Abbandonare progressivamente tutti i villaggi','Rendere superflua ogni forma di amministrazione'], c:0, recovery:'Il surplus è la produzione che supera il consumo immediato. Permette a una parte della popolazione di diventare artigiana, mercante, sacerdote, soldato o scriba.'},
      {q:'Che cos’era una città-Stato mesopotamica?', a:['Una città autonoma con il territorio circostante','Una provincia dipendente sempre dallo stesso impero','Un villaggio privo di istituzioni e autorità proprie'], c:0, recovery:'Le prime città mesopotamiche erano spesso centri politici autonomi: governavano la città e il territorio agricolo circostante.'},
      {q:'A che cosa servì spesso la scrittura nelle sue prime fasi?', a:['A registrare merci, razioni, tributi e scambi','A sostituire completamente il commercio fra città','A decorare soltanto templi e palazzi reali'], c:0, recovery:'La scrittura nacque anche da necessità amministrative: contare prodotti, registrare tributi e conservare informazioni in una società complessa.'},
      {q:'Che cos’era la ziggurat?', a:['Un grande edificio templare costruito a terrazze','Una fortificazione militare scavata sotto terra','Un canale artificiale riservato alla navigazione'], c:0, recovery:'La ziggurat era un grande complesso templare sopraelevato a terrazze. Il tempio aveva anche un ruolo economico e amministrativo.'},
      {q:'Perché Hammurabi è ricordato nella storia?', a:['Per una celebre raccolta di norme giuridiche','Per l’invenzione del primo alfabeto fonetico','Per la costruzione delle piramidi monumentali'], c:0, recovery:'Hammurabi, re di Babilonia nel XVIII secolo a.C., è legato a una celebre raccolta di leggi incisa su una stele.'},
      {q:'Quale conseguenza ebbe la posizione aperta della pianura mesopotamica?', a:['Favorì commerci ma anche conflitti e invasioni','Impedì quasi del tutto contatti con altri popoli','Rese impossibile la formazione di grandi regni'], c:0, recovery:'La pianura mesopotamica era facilmente percorribile: questo facilitò gli scambi, ma espose anche le città a migrazioni, guerre e conquiste.'},
      {q:'Quale sequenza descrive meglio la nascita di una società complessa?', a:['Irrigazione, surplus, amministrazione, potere, scrittura','Scrittura, deserto, nomadismo, isolamento, villaggio','Invasione, allevamento, mare, piramidi, democrazia'], c:0, recovery:'Il filo logico della lezione è: gestione dell’acqua → maggiore produzione → surplus → amministrazione → potere organizzato → bisogno di registrare informazioni.'}
    ]
  },
  egitto: {
    title: 'Test finale · Egitto',
    questions: [
      {q:'Quale funzione ebbe il Nilo nella civiltà egizia?', a:['Sostenne agricoltura e collegamenti lungo la valle','Separò completamente le regioni del nord e del sud','Impedì lo sviluppo di un’amministrazione centrale'], c:0, recovery:'Il Nilo forniva acqua e limo fertile ed era anche una grande via di comunicazione: per questo univa economicamente e politicamente la valle.'},
      {q:'Dove si trovava l’Alto Egitto?', a:['A sud, nella parte a monte del Nilo','A nord, nella regione del grande delta','A ovest, oltre il deserto del Sahara'], c:0, recovery:'“Alto” e “Basso” seguono il corso del fiume: l’Alto Egitto è a sud, a monte; il Basso Egitto è a nord, verso la foce.'},
      {q:'Quando avvenne circa l’unificazione dell’Egitto?', a:['Intorno al 3100 a.C., legata a Narmer','Intorno al 1200 a.C., legata a Hammurabi','Intorno al 500 a.C., legata agli Assiri'], c:0, recovery:'L’unificazione dell’Alto e del Basso Egitto viene collocata intorno al 3100 a.C. e la tradizione la collega al sovrano Narmer.'},
      {q:'Che cosa caratterizzava il potere del faraone?', a:['Univa autorità politica e funzione religiosa','Riguardava soltanto il comando degli eserciti','Dipendeva sempre dalle singole città autonome'], c:0, recovery:'Il faraone non era soltanto un capo politico: il suo potere aveva anche un carattere sacro e garantiva simbolicamente l’ordine del regno.'},
      {q:'Quale scrittura è associata all’antico Egitto?', a:['La scrittura geroglifica e forme più rapide','La scrittura cuneiforme su tavolette d’argilla','L’alfabeto latino inciso su lastre di marmo'], c:0, recovery:'I geroglifici sono la forma più nota della scrittura egizia. Esistevano anche scritture più rapide usate nell’amministrazione quotidiana.'},
      {q:'Che cosa mostrano anche le grandi piramidi sul piano politico?', a:['La capacità dello Stato di mobilitare molte risorse','L’assenza di un potere capace di coordinare lavori','La dipendenza dell’Egitto dalle città mesopotamiche'], c:0, recovery:'Le piramidi non sono solo tombe: la loro costruzione richiedeva pianificazione, tecnici, approvvigionamenti e una forte capacità di mobilitazione dello Stato.'},
      {q:'A quale convinzione era collegata la mummificazione?', a:['Alla continuazione dell’esistenza dopo la morte','Alla necessità di preparare i soldati alla guerra','Alla volontà di conservare soltanto opere d’arte'], c:0, recovery:'Gli Egizi credevano che la morte fosse un passaggio verso un’altra esistenza. La conservazione del corpo aveva quindi un significato religioso.'},
      {q:'Perché le piene del Nilo erano importanti per l’agricoltura?', a:['Depositavano limo fertile sui terreni coltivabili','Trasformavano stabilmente la valle in un deserto','Eliminavano ogni necessità di coltivare i campi'], c:0, recovery:'Le piene annuali lasciavano sui campi limo ricco di sostanze fertili. Questo sosteneva una produzione agricola abbondante lungo la valle.'},
      {q:'Quale ruolo ebbero i deserti che circondavano la valle?', a:['Costituirono ostacoli naturali a molte invasioni','Resero impossibile ogni contatto con altri territori','Fornirono direttamente i raccolti più importanti'], c:0, recovery:'I deserti non isolarono completamente l’Egitto, ma costituirono barriere naturali che limitarono molte vie d’invasione.'},
      {q:'Quale differenza politica distingue soprattutto l’Egitto dalla prima Mesopotamia?', a:['L’Egitto formò presto uno Stato territoriale unitario','L’Egitto rimase sempre diviso in città-Stato autonome','L’Egitto non sviluppò mai funzionari né amministrazione'], c:0, recovery:'Mentre la prima Mesopotamia fu caratterizzata da molte città-Stato, l’Egitto raggiunse presto l’unificazione politica di un vasto territorio sotto il faraone.'}
    ]
  }
};

function shuffleArray(items){
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function safeRead(key, fallback=null){
  try{
    const value=localStorage.getItem(key);
    return value===null?fallback:JSON.parse(value);
  }catch(e){return fallback;}
}

function safeWrite(key, value){
  try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}
}

function ensureDifferentSequence(items, previousSignature, getId){
  let shuffled=shuffleArray(items);
  let signature=shuffled.map(getId).join('|');
  // Con 10 domande / 3 alternative è rarissimo ottenere lo stesso ordine,
  // ma lo impediamo esplicitamente per garantire un test diverso a ogni ricarica.
  if(items.length>1 && signature===previousSignature){
    shuffled=[...shuffled.slice(1),shuffled[0]];
    signature=shuffled.map(getId).join('|');
  }
  return {items:shuffled,signature};
}

function shuffleQuestion(question, quizKey){
  const storageKey=`civilta-fluviali-${quizKey}-answers-order`;
  const previousOrders=safeRead(storageKey,{}) || {};
  const choices=question.a.map((text,i)=>({text, correct:i===question.c, originalIndex:i}));
  const previousSignature=previousOrders[question.id] || '';
  const shuffled=ensureDifferentSequence(choices,previousSignature,c=>c.originalIndex);
  previousOrders[question.id]=shuffled.signature;
  safeWrite(storageKey,previousOrders);
  return {...question,choices:shuffled.items};
}

class Quiz {
  constructor(key, mount){
    this.key=key; this.mount=mount; this.resetData(); this.render();
  }
  resetData(){
    const source=quizData[this.key].questions.map((q,i)=>({...q,id:`${this.key}-${i}`}));
    const orderKey=`civilta-fluviali-${this.key}-questions-order`;
    const previousOrder=safeRead(orderKey,'') || '';
    const shuffledQuestions=ensureDifferentSequence(source,previousOrder,q=>q.id);
    safeWrite(orderKey,shuffledQuestions.signature);
    this.data={
      ...quizData[this.key],
      questions:shuffledQuestions.items.map(q=>shuffleQuestion(q,this.key))
    };
    this.index=0; this.answers=Array(this.data.questions.length).fill(null); this.finished=false;
  }
  render(){
    if(this.finished) return this.renderReport();
    const q=this.data.questions[this.index]; const selected=this.answers[this.index];
    this.mount.innerHTML=`<div class="quiz-shell">
      <div class="quiz-head"><div><div class="eyebrow" style="color:#8bd0e5;margin:0">10 domande · 1 punto ciascuna</div><h3>${this.data.title}</h3></div><div class="quiz-progress">${this.index+1} / ${this.data.questions.length}</div></div>
      <div class="quiz-body"><div class="question-number">Domanda ${this.index+1}</div><div class="question-text">${q.q}</div>
      <div class="answers">${q.choices.map((c,i)=>`<button class="answer ${selected===i?'selected':''}" data-answer="${i}" aria-pressed="${selected===i}">${String.fromCharCode(65+i)}. ${c.text}</button>`).join('')}</div>
      <div class="quiz-actions"><button class="prev-btn" ${this.index===0?'disabled':''}>← Indietro</button><div class="quiz-dots">${this.answers.map((a,i)=>`<i class="quiz-dot ${a!==null?'done':''}" title="Domanda ${i+1}"></i>`).join('')}</div><button class="next-btn" ${selected===null?'disabled':''}>${this.index===this.data.questions.length-1?'Consegna test':'Avanti →'}</button></div></div></div>`;
    this.mount.querySelectorAll('.answer').forEach(btn=>btn.addEventListener('click',()=>{this.answers[this.index]=Number(btn.dataset.answer);this.render();}));
    this.mount.querySelector('.prev-btn').addEventListener('click',()=>{if(this.index>0){this.index--;this.render();}});
    this.mount.querySelector('.next-btn').addEventListener('click',()=>{if(this.answers[this.index]===null)return;if(this.index<this.data.questions.length-1){this.index++;this.render();}else{this.finished=true;this.render();}});
  }
  renderReport(){
    const results=this.data.questions.map((q,i)=>({q,selected:this.answers[i],ok:q.choices[this.answers[i]]?.correct}));
    const correct=results.filter(r=>r.ok).length, wrong=results.length-correct, grade=correct;
    const label=grade===10?'Eccellente':grade===9?'Ottimo':grade===8?'Buono':grade===7?'Discreto':grade===6?'Sufficiente':'Da recuperare';
    const recovery=results.filter(r=>!r.ok).map((r,idx)=>{
      const correctChoice=r.q.choices.find(c=>c.correct)?.text;
      const chosen=r.q.choices[r.selected]?.text || 'Nessuna risposta';
      return `<article class="recovery-item"><h4>Recupero ${idx+1} · ${r.q.q}</h4><p><strong>Hai scelto:</strong> ${chosen}</p><p class="correct">Risposta corretta: ${correctChoice}</p><p>${r.q.recovery}</p></article>`;
    }).join('');
    this.mount.innerHTML=`<div class="quiz-shell"><div class="quiz-head"><div><div class="eyebrow" style="color:#8bd0e5;margin:0">Report finale</div><h3>${this.data.title}</h3></div><div class="quiz-progress">Completato</div></div>
    <div class="report"><div class="score-card"><div class="score-circle">${grade}/10</div><div><h3>${label}</h3><p>Ogni risposta corretta vale 1 punto. Il punteggio coincide con il voto in decimi.</p></div></div>
    <div class="report-grid"><div class="metric"><span>Risposte corrette</span><b>${correct}</b></div><div class="metric"><span>Risposte errate</span><b>${wrong}</b></div><div class="metric"><span>Voto</span><b>${grade}/10</b></div></div>
    <section class="recovery"><h3>${wrong?`Lezioni di recupero (${wrong})`:'Nessun recupero necessario'}</h3>${wrong?recovery:'<p>Hai risposto correttamente a tutte le domande. Il quadro essenziale della lezione è acquisito.</p>'}</section>
    <div class="report-actions"><button class="print-btn">Stampa / salva report</button><button class="retry-btn">Rifai il test</button></div></div></div>`;
    try{localStorage.setItem(`civilta-fluviali-${this.key}-ultimo`,JSON.stringify({date:new Date().toISOString(),score:grade,correct,wrong}));}catch(e){}
    this.mount.querySelector('.print-btn').addEventListener('click',()=>window.print());
    this.mount.querySelector('.retry-btn').addEventListener('click',()=>{this.resetData();this.render();this.mount.scrollIntoView({behavior:'smooth',block:'start'});});
  }
}

const quizzes={
  mesopotamia:new Quiz('mesopotamia',document.getElementById('quiz-mesopotamia')),
  egitto:new Quiz('egitto',document.getElementById('quiz-egitto'))
};

document.querySelectorAll('.quiz-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.quiz-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false');});
  document.querySelectorAll('.quiz-panel').forEach(p=>p.classList.remove('active'));
  tab.classList.add('active');tab.setAttribute('aria-selected','true');
  document.querySelector(`[data-panel="${tab.dataset.quiz}"]`).classList.add('active');
}));

document.querySelectorAll('a[href="#test-mesopotamia"],a[href="#test-egitto"]').forEach(link=>link.addEventListener('click',()=>{
  const key=link.getAttribute('href').includes('egitto')?'egitto':'mesopotamia';
  const tab=document.querySelector(`.quiz-tab[data-quiz="${key}"]`); if(tab) tab.click();
}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

let deferredPrompt; const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false;});
installBtn.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true;});
window.addEventListener('appinstalled',()=>{installBtn.hidden=true;deferredPrompt=null;});

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
