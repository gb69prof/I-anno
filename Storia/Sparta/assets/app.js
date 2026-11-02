/* Sparta — gbprof. Verifica completamente locale, senza invio dei dati. */
'use strict';
const $=(id)=>document.getElementById(id);
const escapeHTML=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const glossary = [
 ['Agoghé','Sistema pubblico di educazione e addestramento dei giovani Spartiati, iniziato intorno ai sette anni.'],
 ['Apella','Assemblea degli Spartiati cittadini adulti, con almeno trent’anni e pieni diritti.'],
 ['Diarchia','Forma di governo in cui sono presenti due re contemporaneamente.'],
 ['Dori','Gruppi greci cui la tradizione collega le origini storiche degli Spartiati.'],
 ['Efori','Cinque magistrati eletti annualmente, con compiti di controllo e amministrazione.'],
 ['Falange','Formazione di opliti in ranghi serrati, basata sulla cooperazione tra guerrieri.'],
 ['Gherusia','Consiglio di 28 anziani oltre i sessant’anni, ai quali si aggiungevano i due re.'],
 ['Homoioi','«Uguali»: nome con cui gli Spartiati cittadini descrivevano il proprio gruppo.'],
 ['Iloti','Popolazioni in condizione servile, legate al lavoro agricolo in Laconia e Messenia.'],
 ['Krypteia','Pratica di resistenza e clandestinità dei giovani, descritta da fonti antiche controverse.'],
 ['Laconia','Regione del Peloponneso nella quale si trovava Sparta. Da qui l’aggettivo «laconico».'],
 ['Licurgo','Legislatore cui la tradizione attribuiva le principali leggi spartane; figura storicamente incerta.'],
 ['Messenia','Regione a ovest del Taigeto conquistata e dominata da Sparta.'],
 ['Oplita','Soldato greco di fanteria pesante, equipaggiato con scudo e lancia.'],
 ['Perieci','Comunità di uomini liberi sotto il dominio spartano, senza diritti politici a Sparta.'],
 ['Polis','Città-Stato greca: comunità politica con territorio, leggi e istituzioni proprie.'],
 ['Sissizi','Pasti comuni degli Spartiati adulti, legati alla vita collettiva e alla cittadinanza.'],
 ['Spartiati','Gruppo dei cittadini spartani con pieni diritti politici e obblighi militari.'],
 ['Taigeto','Massiccio montuoso del Peloponneso, vicino a Sparta.'],
 ['Termopili','Passaggio tra montagna e mare dove nel 480 a.C. i Greci affrontarono i Persiani.'],
 ['Tirteo','Poeta legato a Sparta che celebrò il coraggio e la disciplina dei guerrieri.'],
 ['Alcmane','Poeta della tradizione corale spartana, legato a canti e rituali.']
];
function renderGlossary(search=''){
 let needle=search.trim().toLocaleLowerCase('it');
 let filtered=glossary.filter(([a,b])=>(a+' '+b).toLocaleLowerCase('it').includes(needle));
 $('glossary').innerHTML=filtered.map(([a,b])=>`<div><dt>${escapeHTML(a)}</dt><dd>${escapeHTML(b)}</dd></div>`).join('');
 $('gloss-empty').hidden=filtered.length!==0;
}
renderGlossary(); $('gloss-search').addEventListener('input',e=>renderGlossary(e.target.value));

// I numeri degli argomenti corrispondono alle ancore della lezione. Ogni errore ha un recupero specifico.
const QUESTIONS=[
 {type:'K',topic:'Territorio',link:'geografia',text:'Dove si trovava la città di Sparta?',choices:['Nell’Attica, vicino alla città di Atene.','Nella Laconia, nel sud del Peloponneso.','Nella Ionia, sulle coste dell’Asia Minore.'],correct:1,why:'Sparta era in Laconia, nel sud del Peloponneso, vicino al fiume Eurota.',recover:'Apri mentalmente la carta della Grecia: scendi nel Peloponneso, raggiungi la Laconia e immagina Sparta ai piedi del Taigeto.'},
 {type:'K',topic:'Territorio',link:'geografia',text:'Che cosa era una polis nel mondo greco?',choices:['Una città-Stato con proprie leggi e istituzioni.','Un vasto impero diviso in province governate.','Una fortezza agricola senza governo autonomo.'],correct:0,why:'La polis era una comunità politica autonoma, con leggi, istituzioni e territorio.',recover:'La polis è più di un agglomerato di case: è una comunità che decide con proprie leggi come vivere e governarsi.'},
 {type:'K',topic:'Territorio',link:'geografia',text:'Quale regione sottomise Sparta oltre la Laconia?',choices:['La Beozia, a nord della città di Atene.','L’Attica, territorio della città di Atene.','La Messenia, a ovest del grande Taigeto.'],correct:2,why:'Sparta conquistò la Messenia, a ovest del Taigeto.',recover:'Memorizza il rapporto fra luoghi: Laconia = area di Sparta; Messenia = regione conquistata e sfruttata.'},
 {type:'K',topic:'Società',link:'societa',text:'Chi erano gli Spartiati?',choices:['Braccianti agricoli privi di libertà personale.','Cittadini guerrieri con pieni diritti politici.','Artigiani liberi esclusi dai diritti politici.'],correct:1,why:'Gli Spartiati formavano il gruppo dei cittadini con pieni diritti politici.',recover:'Non confondere i gruppi: Spartiati = cittadini e soldati; Perieci = liberi senza potere politico; Iloti = servi agricoli.'},
 {type:'K',topic:'Società',link:'societa',text:'Quale descrizione identifica i Perieci?',choices:['Erano liberi ma senza voto nel governo spartano.','Erano schiavi assegnati al lavoro nei campi.','Erano cittadini che eleggevano i due sovrani.'],correct:0,why:'I Perieci erano liberi e attivi in vari mestieri, ma senza cittadinanza politica spartana.',recover:'I Perieci abitavano comunità dipendenti da Sparta. Potevano possedere beni e combattere, ma non governare Sparta.'},
 {type:'K',topic:'Società',link:'societa',text:'Quale compito caratterizzava soprattutto gli Iloti?',choices:['Guidare le assemblee e approvare nuove leggi.','Comandare la falange durante le guerre greche.','Coltivare le terre in condizione di servitù.'],correct:2,why:'Gli Iloti lavoravano soprattutto la terra in condizioni di servitù.',recover:'Gli Iloti coltivavano i campi e consegnavano parte del raccolto. Proprio questo sosteneva la vita degli Spartiati.'},
 {type:'K',topic:'Educazione',link:'educazione',text:'A quale età iniziava l’educazione pubblica dei ragazzi Spartiati?',choices:['All’incirca sette anni, ancora nell’infanzia.','All’incirca dodici anni, già da adolescenti.','All’incirca venti anni, da giovani soldati.'],correct:0,why:'La formazione pubblica iniziava normalmente intorno ai sette anni.',recover:'Associa il numero sette all’inizio dell’agoghé; venti alla vita militare adulta; trenta alla partecipazione politica.'},
 {type:'K',topic:'Educazione',link:'educazione',text:'Come si chiamava il percorso educativo degli Spartiati?',choices:['Gherusia, consiglio riservato agli anziani.','Agoghé, educazione collettiva dei giovani.','Apella, assemblea dei cittadini adulti.'],correct:1,why:'Il nome tradizionale dell’educazione pubblica spartana è agoghé.',recover:'Agoghé riguarda i ragazzi; Gherusia riguarda gli anziani; Apella riguarda i cittadini adulti.'},
 {type:'K',topic:'Donne',link:'donne',text:'Quale possibilità avevano le donne delle famiglie spartiati?',choices:['Potevano votare nell’Apella dei cittadini.','Potevano comandare tutti i reparti militari.','Potevano possedere e amministrare beni.'],correct:2,why:'Le donne spartiati potevano possedere e gestire beni, senza avere diritti politici.',recover:'Distingui autonomia economica e diritti politici: una donna spartiate poteva avere proprietà, ma non votare nell’Apella.'},
 {type:'K',topic:'Esercito',link:'esercito',text:'Quali armi caratterizzavano l’oplita greco?',choices:['Scudo rotondo e lancia per combattere a piedi.','Arco composito e frecce per colpire lontano.','Carro da guerra e frusta per guidare cavalli.'],correct:0,why:'L’oplita combatteva a piedi con grande scudo e lancia.',recover:'Immagina la prima fila della falange: grandi scudi rotondi che si affiancano e lance proiettate in avanti.'},
 {type:'K',topic:'Politica',link:'politica',text:'Quanti re governavano contemporaneamente Sparta?',choices:['Tre re eletti dai soldati ogni cinque anni.','Due re di famiglie ereditarie differenti.','Un solo re scelto fra tutti gli anziani.'],correct:1,why:'Sparta era una diarchia con due famiglie regali.',recover:'Diarchia significa “due poteri regali”: Sparta aveva due re con importanti funzioni militari e religiose.'},
 {type:'K',topic:'Politica',link:'politica',text:'Da chi era composta la Gherusia?',choices:['Da trenta giovani soldati scelti ogni anno.','Da cinque magistrati eletti dai cittadini.','Da ventotto anziani insieme ai due re.'],correct:2,why:'La Gherusia comprendeva 28 anziani oltre i 60 anni e i due re.',recover:'Ricorda il calcolo: 28 anziani + 2 re = 30 componenti della Gherusia.'},
 {type:'C',topic:'Società',link:'societa',text:'Perché gli Spartiati si chiamavano homoioi, «uguali»?',choices:['Perché nessun abitante poteva possedere beni.','Perché condividevano diritti e doveri di gruppo.','Perché gli Iloti potevano eleggere i sovrani.'],correct:1,why:'L’uguaglianza riguardava gli Spartiati cittadini, non tutte le persone soggette a Sparta.',recover:'Homoioi significa “uguali” nel gruppo privilegiato: la città nel complesso rimaneva profondamente disuguale.'},
 {type:'C',topic:'Dominio',link:'sistema',text:'In che modo il lavoro degli Iloti sosteneva gli Spartiati?',choices:['Offriva il sostentamento per dedicarsi alle armi.','Permetteva a tutti di votare nelle assemblee.','Eliminava del tutto i conflitti nella regione.'],correct:0,why:'Il lavoro agricolo degli Iloti permetteva ai cittadini di dedicare tempo alla preparazione militare.',recover:'Segui il rapporto causa-effetto: Iloti coltivano → Spartiati ricevono sostentamento → possono allenarsi.'},
 {type:'C',topic:'Esercito',link:'esercito',text:'Perché la fuga di un oplita poteva danneggiare la falange?',choices:['Perché le lance degli altri diventavano corte.','Perché scompariva ogni comando dei due re.','Perché lasciava un varco fra gli scudi vicini.'],correct:2,why:'La fuga di uno indeboliva la protezione collettiva e poteva aprire un varco.',recover:'Pensa a una fila di scudi: togli uno scudo e il compagno al suo fianco resta più esposto.'},
 {type:'C',topic:'Educazione',link:'educazione',text:'Perché i ragazzi spartiati vivevano e si allenavano insieme?',choices:['Per farli diventare mercanti capaci di trattare.','Per abituarli alla disciplina e alla cooperazione.','Per impedire ogni partecipazione alla vita religiosa.'],correct:1,why:'La vita collettiva doveva formare persone pronte a obbedire e cooperare.',recover:'L’agoghé costruiva legami e abitudini comuni: il gruppo veniva prima delle preferenze individuali.'},
 {type:'C',topic:'Donne',link:'donne',text:'Quale affermazione sulle donne spartane è corretta?',choices:['Avevano più autonomia, ma non votavano nell’Apella.','Avevano diritto di voto, ma non possedevano beni.','Avevano meno libertà delle donne in ogni polis.'],correct:0,why:'Le donne spartiati potevano avere beni e maggiore libertà di movimento, ma non partecipavano alla politica.',recover:'Quando studi le donne spartiati separa tre aspetti: esercizio fisico, gestione dei beni, esclusione dalla politica.'},
 {type:'C',topic:'Politica',link:'politica',text:'Quale rapporto esisteva tra Apella ed Efori?',choices:['Gli Efori sceglievano ogni anno tutti i re.','L’Apella sostituiva i sovrani dopo ogni guerra.','L’Apella eleggeva ogni anno i cinque Efori.'],correct:2,why:'Gli Efori erano magistrati eletti annualmente dall’assemblea dei cittadini.',recover:'Apella = assemblea dei cittadini. Efori = cinque magistrati annuali eletti anche per vigilare sul potere.'},
 {type:'C',topic:'Cultura',link:'cultura',text:'Perché musica e danza erano importanti nell’educazione?',choices:['Servivano soltanto a distrarre i soldati adulti.','Favorivano ritmo, tradizioni e coesione del gruppo.','Sostituivano del tutto la preparazione fisica.'],correct:1,why:'Musica e danza avevano ruoli culturali, religiosi e comunitari.',recover:'Sparta non fu solo armi: il canto univa le persone e tramandava feste, memoria e valori comuni.'},
 {type:'C',topic:'Dominio',link:'sistema',text:'Perché la superiorità militare aiutava a mantenere il dominio?',choices:['Permetteva di controllare le popolazioni sottomesse.','Rendeva uguali tutti gli abitanti della Laconia.','Faceva cessare per sempre le rivolte degli Iloti.'],correct:0,why:'La forza militare serviva anche a reprimere eventuali resistenze degli Iloti.',recover:'L’esercito difendeva Sparta dai nemici esterni e aiutava a controllare le popolazioni assoggettate.'},
 {type:'C',topic:'Termopili',link:'termopili',text:'Perché il passo delle Termopili favoriva la difesa greca?',choices:['Il mare impediva a ogni nave persiana di muoversi.','Le montagne nascondevano intere città fortificate.','Lo spazio stretto limitava il vantaggio numerico.'],correct:2,why:'Nel passo stretto non potevano avanzare contemporaneamente tutti i soldati persiani.',recover:'Un passaggio stretto può ridurre il vantaggio di un esercito enorme: contano terreno e formazione.'},
 {type:'C',topic:'Termopili',link:'termopili',text:'Perché è scorretto dire che alle Termopili c’erano solo trecento?',choices:['Perché erano presenti solo soldati persiani.','Perché combatterono anche molti alleati greci.','Perché Leonida aveva già lasciato la Grecia.'],correct:1,why:'I 300 Spartiati di Leonida combatterono insieme a migliaia di alleati greci.',recover:'Il numero 300 indica gli Spartiati del contingente di Leonida; non rappresenta tutti i difensori greci.'},
 {type:'C',topic:'Fonti',link:'intervista',text:'Come bisogna leggere la scena dell’uccisione dell’Ilota?',choices:['Come episodio immaginato a partire da fonti discusse.','Come cronaca precisa registrata da un testimone.','Come evento ripreso in una fotografia originale.'],correct:0,why:'La krypteia è oggetto di discussione; il dialogo nel bosco è un episodio inventato.',recover:'La narrazione può essere plausibile e intensa, ma non diventa automaticamente una fonte: distingui “attestato” e “immaginato”.'},
 {type:'C',topic:'Fonti',link:'intervista',text:'Che cosa possiamo dedurre da sole ferite alla schiena?',choices:['Che il soldato è sicuramente morto mentre fuggiva.','Che il soldato ha certamente tradito la sua città.','Che da sole non provano la fuga del guerriero.'],correct:2,why:'Le ferite alla schiena non sono una prova certa di fuga né di una procedura funeraria codificata.',recover:'Il “giudizio delle ferite” è una scena del racconto, non una regola storica accertata: il punto di vista del vecchio non è una fonte infallibile.'}
];

const state={phase:'normal',questions:[],answers:{},orders:{},pos:0,original:null,retry:null};
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function begin(phase='normal'){
 if(phase==='normal'){state.phase='normal';state.questions=QUESTIONS.map((_,i)=>i);state.original=null;state.retry=null}
 else{state.phase='retry';state.questions=state.original.wrong;}
 state.answers={};state.orders={};state.pos=0;
 state.questions.forEach(i=>state.orders[i]=shuffle([0,1,2]));
 $('quiz-app').hidden=false;$('quiz-report').hidden=true;$('quiz-start').hidden=true;
 renderQuestion(); $('quiz-app').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderQuestion(){
 const index=state.questions[state.pos],q=QUESTIONS[index];
 $('quiz-step').textContent=`Domanda ${state.pos+1} di ${state.questions.length}`;
 const done=Object.keys(state.answers).length;
 $('quiz-counter').textContent=`${done} risposte date`;
 $('quiz-bar').style.width=`${Math.round((state.pos+1)/state.questions.length*100)}%`;
 $('question-container').innerHTML=`<div class="question-card"><span class="question-type">${q.type==='K'?'Conoscenze':'Comprensione'} · ${escapeHTML(q.topic)}</span><h3>${escapeHTML(q.text)}</h3><div class="choices" role="radiogroup" aria-label="Scegli una risposta">${state.orders[index].map((j,k)=>`<label><input type="radio" name="answer" value="${j}" ${state.answers[index]===j?'checked':''}><span><b>${String.fromCharCode(65+k)}.</b> ${escapeHTML(q.choices[j])}</span></label>`).join('')}</div></div>`;
 $('question-container').querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{state.answers[index]=Number(el.value);$('quiz-counter').textContent=`${Object.keys(state.answers).length} risposte date`;if(state.pos===state.questions.length-1){const pending=state.questions.filter(i=>state.answers[i]===undefined).length;$('quiz-submit').textContent=pending?`Consegna (${pending} non risposte)`:'Consegna la verifica';}}));
 $('quiz-back').disabled=state.pos===0;
 const last=state.pos===state.questions.length-1;
 $('quiz-next').hidden=last;$('quiz-submit').hidden=!last;
 const pending=state.questions.filter(i=>state.answers[i]===undefined).length;
 $('quiz-submit').textContent=pending?`Consegna (${pending} non risposte)`:'Consegna la verifica';
}
function assess(indices,answers){
 const wrong=indices.filter(i=>answers[i]!==QUESTIONS[i].correct);
 const correct=indices.length-wrong.length;
 return {wrong,correct,total:indices.length,percent:Math.round(correct/indices.length*100)};
}
function judgement(score){
 if(score>=9)return['Ottimo','Conosci bene la struttura di Sparta e sai interpretarne i collegamenti.'];
 if(score>=8)return['Molto buono','Hai una conoscenza solida; ripassa soltanto alcuni dettagli.'];
 if(score>=7)return['Buono','Hai capito le idee centrali; consolida i punti segnalati.'];
 if(score>=6)return['Sufficiente','Possiedi le conoscenze essenziali, ma alcune relazioni vanno chiarite.'];
 if(score>=4)return['Parziale','Occorre ripassare con attenzione le differenze e le cause.'];
 return['Da recuperare','Rileggi i saperi irrinunciabili e affronta i piccoli recuperi proposti.'];
}
function finish(){
 const result=assess(state.questions,state.answers);
 if(state.phase==='normal'){state.original={...result,answers:{...state.answers}};state.retry=null;}
 else{state.retry=result;}
 $('quiz-app').hidden=true;renderReport();$('quiz-report').hidden=false;
 $('quiz-report').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderReport(){
 const r=state.original;
 const grade=Math.max(1,Math.round(10*r.correct/r.total*10)/10);
 const [label,comment]=judgement(grade);
 const nametext=$('student-name').value.trim()||'Studente (anonimo)';
 let known=QUESTIONS.map((q,i)=>({q,i})).filter(x=>x.q.type==='K').map(x=>x.i);
 let understood=QUESTIONS.map((q,i)=>({q,i})).filter(x=>x.q.type==='C').map(x=>x.i);
 let k=assess(known,r.answers),c=assess(understood,r.answers);
 let topics=[...new Set(r.wrong.map(i=>QUESTIONS[i].topic))];
 let recoveries=r.wrong.map(i=>{
  const q=QUESTIONS[i],user=r.answers[i];
  return `<article class="recovery-card"><h4>Domanda ${i+1} · ${escapeHTML(q.topic)}</h4><p><b>${escapeHTML(q.text)}</b></p><p>Risposta data: ${user===undefined?'<em>non data</em>':escapeHTML(q.choices[user])}</p><p class="answer">Risposta corretta: ${escapeHTML(q.choices[q.correct])}</p><p>${escapeHTML(q.why)}</p><div class="mini-lesson"><strong>Mini-lezione di recupero</strong><p>${escapeHTML(q.recover)}</p><a href="#${q.link}">Rileggi il paragrafo collegato ↑</a></div></article>`;
 }).join('');
 const retryHTML=state.retry?`<p class="judgement"><strong>Recupero formativo:</strong> ${state.retry.correct} risposte corrette su ${state.retry.total} errori riproposti. Il voto iniziale rimane invariato.</p>`:'';
 const report=$('quiz-report');
 report.innerHTML=`<div class="report-header"><h3>Il tuo report di apprendimento</h3><p>${escapeHTML(nametext)} · ${new Date().toLocaleDateString('it-IT')} · prima verifica ${r.correct}/${r.total}</p></div><div class="report-metrics"><div><b>${grade.toFixed(1).replace('.',',')}/10</b><span>Voto</span></div><div><b>${k.correct}/12</b><span>Conoscenze</span></div><div><b>${c.correct}/12</b><span>Comprensione</span></div></div><div class="judgement"><strong>Giudizio: ${label}.</strong> ${comment}${topics.length?`<p><b>Da recuperare:</b> ${topics.map(escapeHTML).join(', ')}.</p>`:'<p>Non risultano errori: padroneggi tutti i nuclei della lezione.</p>'}</div>${retryHTML}<h3>${r.wrong.length?'I tuoi recuperi personalizzati':'Tutte le risposte sono corrette!'}</h3>${r.wrong.length?`<p>Per ogni risposta errata trovi una spiegazione breve e il collegamento al punto della lezione.</p><div class="recovery-list">${recoveries}</div>`:'<p>Puoi rileggere l’intervista per allenarti a distinguere fatti e interpretazione.</p>'}<div class="report-actions"><button type="button" class="small-btn" id="export-report">Salva report (.txt)</button><button type="button" class="small-btn ghost" id="print-report">Stampa report / PDF</button>${r.wrong.length?'<button type="button" class="small-btn primary" id="retry-errors">Riprova soltanto gli errori</button>':''}<button type="button" class="small-btn ghost" id="restart-quiz">Rifai l’intero test</button></div><p class="report-note">Criterio trasparente: ogni risposta corretta vale un punto; il voto è ${r.correct}/${r.total} × 10 (minimo visualizzato 1), arrotondato a un decimale. Il recupero non modifica il voto della prima prova. I dati non vengono inviati online.</p>`;
 $('export-report').addEventListener('click',()=>downloadReport(nametext,grade,label,k,c,r));
 $('print-report').addEventListener('click',()=>{document.body.classList.add('only-report');const f=()=>document.body.classList.remove('only-report');window.addEventListener('afterprint',f,{once:true});window.print();setTimeout(f,2500)});
 $('restart-quiz').addEventListener('click',()=>begin('normal'));
 if(r.wrong.length)$('retry-errors').addEventListener('click',()=>begin('retry'));
}
function downloadReport(name,grade,label,k,c,r){
 const lines=[`SPARTA — REPORT DI APPRENDIMENTO`,`Studente: ${name}`,`Data: ${new Date().toLocaleDateString('it-IT')}`,`Voto: ${grade.toFixed(1).replace('.',',')}/10 · ${label}`,`Conoscenze: ${k.correct}/12 · Comprensione: ${c.correct}/12`,`Risposte corrette: ${r.correct}/${r.total}`,'','RISPOSTE DA RECUPERARE'];
 r.wrong.forEach(i=>{let q=QUESTIONS[i];lines.push('',`Domanda ${i+1}: ${q.text}`,`Risposta data: ${r.answers[i]===undefined?'[non data]':q.choices[r.answers[i]]}`,`Risposta corretta: ${q.choices[q.correct]}`,`Spiegazione: ${q.why}`,`Mini-lezione: ${q.recover}`)});
 if(!r.wrong.length)lines.push('Nessuna risposta errata.');
 if(state.retry)lines.push('',`Recupero formativo: ${state.retry.correct}/${state.retry.total} (non modifica il voto).`);
 lines.push('','Report prodotto localmente: non sono stati trasmessi dati a un server.');
 const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
 const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=`report-sparta-${new Date().toISOString().slice(0,10)}.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);
}
$('start-quiz').addEventListener('click',()=>begin('normal'));
$('quiz-back').addEventListener('click',()=>{if(state.pos>0){state.pos--;renderQuestion()}});
$('quiz-next').addEventListener('click',()=>{if(state.pos<state.questions.length-1){state.pos++;renderQuestion()}});
$('quiz-submit').addEventListener('click',()=>finish());
$('toggle-gap').addEventListener('click',()=>{
 let el=$('toggle-gap'),lost=el.getAttribute('aria-pressed')!=='true';
 el.setAttribute('aria-pressed',lost);document.querySelector('.shield-row .breakable').classList.toggle('lost',lost);
 el.textContent=lost?'Ricompone la falange':'Mostra la fuga di un oplita';
 $('gap-description').textContent=lost?'Si apre un varco: i vicini perdono parte della protezione e la formazione si indebolisce.':'Gli scudi sono vicini: ogni guerriero conta sui compagni.';
});
$('expand-interview').addEventListener('click',()=>document.querySelectorAll('.interview-chapter').forEach(d=>d.open=true));
$('collapse-interview').addEventListener('click',()=>document.querySelectorAll('.interview-chapter').forEach(d=>d.open=false));
const checks=[...document.querySelectorAll('.essential-list input')];checks.forEach(x=>x.addEventListener('change',()=>{$('check-progress').textContent=`${checks.filter(c=>c.checked).length} di ${checks.length} punti ripassati.`}));
const observers=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.sidebar a').forEach(x=>x.classList.toggle('active',x.hash==='#'+e.target.id))}})},{rootMargin:'-15% 0px -70% 0px'});
document.querySelectorAll('.lesson-body > section[id]').forEach(s=>observers.observe(s));