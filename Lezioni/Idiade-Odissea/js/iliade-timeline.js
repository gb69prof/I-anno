'use strict';
/* Un viaggio narrativo in dieci tappe. Citazioni brevi tratte dall'Iliade
   di Omero nella traduzione di Vincenzo Monti (1825), Wikisource.
   I numeri dei versi sono quelli della traduzione di Monti, se indicati;
   qui preferiamo il libro e il rimando al testo integrale per evitare
   di confondere la numerazione della versione italiana con quella greca. */
(() => {
  const events = [
    {title:"L’ira di Achille",book:"I",theme:"IRA",symbol:"Fuoco dell’ira",type:"flame",
     summary:"Il poema si apre nel decimo anno della guerra. Omero invoca la Musa e annuncia il tema: l’ira di Achille, un sentimento che porterà lutti agli Achei e sconvolgerà il destino degli eroi.",
     verse:"Cantami, o Diva, del Pelíde Achille\nL’ira funesta",thought:"La prima parola tematica è l’ira, non la vittoria. Le conseguenze di una passione individuale coinvolgono un intero popolo.",
     question:"Perché un poema di guerra comincia da un sentimento?",paragraph:"p1"},
    {title:"L’offesa di Agamennone",book:"I",theme:"ONORE",symbol:"Due lance incrociate",type:"spears",
     summary:"Apollo scatena una pestilenza. Agamennone restituisce Criseide, ma pretende in cambio Briseide, il premio di Achille. Davanti all’esercito, il guerriero interpreta il gesto come un’umiliazione del proprio valore.",
     verse:"E a me medesmo di rapir minacci\nDe’ miei sudori bellicosi il frutto",
     thought:"Nel mondo eroico il premio è il segno pubblico della timé, cioè del riconoscimento del proprio valore.",
     question:"Achille difende un principio di giustizia, il proprio prestigio o entrambi?",paragraph:"p5"},
    {title:"Il ritiro dalle battaglie",book:"I",theme:"RIFIUTO",symbol:"Elmo abbandonato",type:"helmet",
     summary:"Trattenuto da Atena, Achille rinuncia a colpire Agamennone e smette di combattere. Chiede a Teti di ottenere da Zeus il successo dei Troiani, perché gli Achei comprendano la gravità dell’offesa ricevuta.",
     verse:"Agamennón mi disonora; il meglio\nDe’ miei premii rapisce",
     thought:"Per rivendicare il proprio onore, Achille accetta di esporre i compagni alla sconfitta.",
     question:"È possibile difendere la propria dignità senza fare del male agli altri?",paragraph:"p6"},
    {title:"Ettore e Andromaca",book:"VI",theme:"AFFETTI",symbol:"La famiglia e le mura di Troia",type:"family",
     summary:"Ettore rivede Andromaca e il piccolo Astianatte alle porte di Troia. La moglie lo supplica di restare; Ettore teme il futuro della famiglia ma sente il dovere di difendere la città.",
     verse:"Or mi resti tu solo, Ettore caro,\nTu padre mio, tu madre, tu fratello",
     thought:"La guerra interrompe la vita domestica: Ettore è insieme guerriero, marito e padre.",
     question:"Il dovere verso la città deve prevalere su quello verso la propria famiglia?",paragraph:"p8"},
    {title:"L’ambasceria nella tenda",book:"IX",theme:"DESTINO",symbol:"Due strade del destino",type:"roads",
     summary:"Odisseo, Fenice e Aiace offrono ad Achille doni e riconciliazione. L’eroe rifiuta e mette in dubbio il senso della gloria: restare a Troia significa morire giovane e diventare immortale nel canto; tornare in patria significa vivere più a lungo.",
     verse:"Meco io porto (la Dea madre mel dice)\nDoppio fato di morte.",
     thought:"Achille si interroga sul valore della fama quando il suo prezzo è la vita stessa.",
     question:"Che cosa rende davvero degna di essere vissuta una vita?",paragraph:"p10"},
    {title:"Patroclo indossa le armi",book:"XVI",theme:"AMICIZIA",symbol:"Armatura di Achille",type:"armor",
     summary:"Gli Achei arretrano fino alle navi. Patroclo chiede di combattere con le armi di Achille e alla testa dei Mirmidoni. L’amico accetta, ma gli ordina di limitarsi a respingere i Troiani.",
     verse:"Ch’io, delle tue coperto armi le spalle,\nM’appresenti al nemico",
     thought:"Patroclo vuole aiutare i compagni, ma la sua iniziativa lo espone a un pericolo crescente.",
     question:"Quale differenza c’è tra coraggio e imprudenza?",paragraph:"p11"},
    {title:"La morte di Patroclo",book:"XVI",theme:"PERDITA",symbol:"Scudo spezzato",type:"broken",
     summary:"Patroclo insegue i Troiani oltre il limite fissato. Apollo lo indebolisce, Euforbo lo ferisce ed Ettore lo uccide. Prima di morire, Patroclo preannuncia la fine di Ettore per mano di Achille.",
     verse:"Risonò nel cadere, ed un gran lutto\nPer l’esercito achivo si diffuse.",
     thought:"L’ira legata all’onore cede il passo a un dolore personale che scatenerà una nuova violenza.",
     question:"Quali responsabilità ha Achille nella sorte di Patroclo?",paragraph:"p12"},
    {title:"Lo scudo di Achille",book:"XVIII",theme:"VITA",symbol:"Scudo cosmico di Efesto",type:"cosmos",
     summary:"Achille decide di tornare a combattere. Teti chiede a Efesto nuove armi. Sullo scudo il dio raffigura il cielo e la terra, città in guerra e in pace, lavori, danze e il ciclo della vita.",
     verse:"Ivi ei fece la terra, il mare, il cielo\nE il Sole infaticabile",
     thought:"L’eroe si prepara a uccidere, ma porta con sé un’immagine di tutto ciò che merita di vivere.",
     question:"Perché descrivere la pace proprio nel momento in cui Achille sceglie la vendetta?",paragraph:"p14"},
    {title:"Il duello con Ettore",book:"XXII",theme:"CORAGGIO",symbol:"Le lance davanti alle mura",type:"duel",
     summary:"Achille insegue Ettore intorno alle mura. Ingannato da Atena, il principe di Troia affronta il duello e viene ucciso. Achille ne oltraggia il corpo: il vincitore ha superato il limite della pietà.",
     verse:"Ma non fia per questo\nChe da codardo io cada",
     thought:"Ettore sa di essere vicino alla morte, ma vuole scegliere come affrontarla.",
     question:"La vittoria militare coincide sempre con la grandezza morale?",paragraph:"p16"},
    {title:"Priamo davanti ad Achille",book:"XXIV",theme:"PIETÀ",symbol:"Due mani che si incontrano",type:"hands",
     summary:"Il vecchio Priamo entra nella tenda di Achille per chiedere il corpo del figlio. Gli ricorda suo padre: i due piangono insieme. Achille restituisce Ettore e accorda una tregua. L’Iliade termina con i funerali di Ettore, non con la caduta di Troia.",
     verse:"Divino Achille, ti rammenta il padre,\nIl padre tuo da ria vecchiezza oppresso",
     thought:"Il nemico diventa nuovamente una persona: il dolore condiviso interrompe per un momento la spirale dell’ira.",
     question:"Achille è più grande quando uccide Ettore o quando lo restituisce al padre?",paragraph:"p18"}
  ];
  const shape={
    flame:'<path d="M110 218 C48 181 78 124 112 82 C110 135 153 117 154 55 C225 141 207 203 165 220 C170 184 151 161 141 154 C143 188 117 190 110 218Z" fill="#b16b40" stroke="#7f4a30" stroke-width="5"/><path d="M138 215 C118 189 137 176 146 159 C169 186 165 207 153 218Z" fill="#efc786"/>',
    spears:'<path d="M63 222 L212 78 M68 71 L211 223" stroke="#254b57" stroke-width="12" stroke-linecap="round"/><path d="M222 67 L196 77 L210 92Z M58 59 L76 86 L91 72Z" fill="#bd864b" stroke="#956a38" stroke-width="3"/><path d="M79 206 L94 220 M190 211 L205 194" stroke="#bd864b" stroke-width="10" stroke-linecap="round"/>',
    helmet:'<path d="M82 189V136a58 58 0 0 1 116 0v41h-35v34h-55v-25Z" fill="#a27745" stroke="#244652" stroke-width="6"/><path d="M141 71C132 45 144 37 166 31 C167 60 188 65 192 90" stroke="#a24a36" stroke-width="13" fill="none"/><path d="M86 161h108 M116 185h45" stroke="#f2d5a5" stroke-width="5"/><path d="M50 232 Q140 213 230 232" fill="none" stroke="#b8a183" stroke-width="5"/>',
    family:'<path d="M38 206 L38 128 L69 110 L69 206 M211 206 L211 100 L239 124 L239 206" stroke="#ad9168" stroke-width="9" fill="none"/><circle cx="112" cy="117" r="20" fill="#bd864b"/><circle cx="172" cy="117" r="20" fill="#24505c"/><circle cx="143" cy="167" r="13" fill="#b16b40"/><path d="M75 218 Q77 155 112 150 Q135 150 139 181 M208 218 Q205 153 172 150 Q147 150 146 182 M123 216 Q125 180 143 180 Q162 180 163 216" stroke="#244652" stroke-width="13" stroke-linecap="round" fill="none"/>',
    roads:'<path d="M141 228V155L92 102 M141 155L191 100" stroke="#254b57" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M92 105l-4-30 M91 103l-30-4 M192 101l1-30 M193 102l31 1" stroke="#b88648" stroke-width="10" stroke-linecap="round"/><circle cx="140" cy="123" r="14" fill="#bd864b"/><path d="M60 244H219" stroke="#b6a68d" stroke-width="5"/>',
    armor:'<path d="M104 73 L127 89H156L179 73L215 104L188 137L174 123V217H110V123L96 137L67 104Z" fill="#b4854c" stroke="#244652" stroke-width="6"/><path d="M132 102 L142 118 L152 102 M141 130V205 M115 147h53 M115 174h53" stroke="#f3d8a8" stroke-width="5" fill="none"/><path d="M126 70l15-20 17 20" stroke="#a24a36" stroke-width="10" stroke-linecap="round" fill="none"/>',
    broken:'<path d="M142 50L218 80V151C216 198 174 223 142 239 C107 224 70 195 67 151V80Z" fill="#b4854c" stroke="#254b57" stroke-width="7"/><path d="M155 69L120 132 154 151 115 226" stroke="#f5e8d1" stroke-width="10" stroke-linejoin="round" fill="none"/><path d="M91 176L115 166 M168 109l29 7" stroke="#254b57" stroke-width="6"/>',
    cosmos:'<circle cx="142" cy="143" r="91" fill="#214955" stroke="#b98744" stroke-width="7"/><circle cx="142" cy="143" r="69" fill="none" stroke="#d4b075" stroke-width="2"/><circle cx="142" cy="143" r="44" fill="none" stroke="#d4b075" stroke-width="2"/><circle cx="142" cy="143" r="19" fill="#e5bb70"/><circle cx="86" cy="126" r="9" fill="#d9d1bf"/><circle cx="199" cy="110" r="11" fill="#bc7046"/><circle cx="145" cy="214" r="6" fill="#f2ebce"/><path d="M142 30V45 M142 241V255 M29 143H45 M239 143h16" stroke="#a47a41" stroke-width="7"/>',
    duel:'<path d="M58 228V127H87V96h30v132 M174 228V96h29v31h24v101 M115 228V165H170V228" fill="none" stroke="#bca68a" stroke-width="10"/><path d="M74 55L212 212 M214 55L74 212" stroke="#264a57" stroke-width="10"/><path d="M64 44L76 79L95 61Z M222 44L209 80L191 60Z" fill="#b98649"/><circle cx="143" cy="139" r="16" fill="#e1bf88"/>',
    hands:'<path d="M35 169C63 149 92 150 110 165L141 191L123 212Q108 216 94 207L58 199L36 212" fill="#b78758" stroke="#7d5e43" stroke-width="5"/><path d="M245 165C219 145 197 146 176 159L147 184Q138 194 148 203Q157 210 166 202L180 191 L195 211 Q208 217 222 205L245 211" fill="#dec4a0" stroke="#7d5e43" stroke-width="5"/><path d="M116 194L141 174L165 185" fill="none" stroke="#eadbc2" stroke-width="6"/><path d="M140 95v36 M108 112l-17-16 M174 112l17-16" stroke="#b68a53" stroke-width="7" stroke-linecap="round"/>'
  };
  const $=id=>document.getElementById(id);
  const rail=$('iliade-steps'),title=$('iliade-event-title'),count=$('iliade-count'),
        topic=$('iliade-theme'),summary=$('iliade-summary'),verse=$('iliade-verse'),
        thought=$('iliade-thought'),question=$('iliade-question'),image=$('iliade-art'),
        imgCaption=$('iliade-art-caption'),source=$('iliade-source'),read=$('iliade-read'),
        progress=$('iliade-progress'),prev=$('iliade-prev'),next=$('iliade-next'),
        stage=$('iliade-stage');
  if(!rail||!title)return;
  let current=0;
  const steps=events.map((event,index)=>{
    const button=document.createElement('button');
    button.type='button';button.className='iliade-step';
    button.setAttribute('aria-label','Tappa '+(index+1)+': '+event.title);
    button.innerHTML='<span class="iliade-step-number">'+String(index+1).padStart(2,'0')+'</span><span class="iliade-step-name"></span>';
    button.querySelector('.iliade-step-name').textContent=event.title;
    button.addEventListener('click',()=>show(index));
    rail.append(button);return button;
  });
  function show(index,{focus=false}={}){
    current=Math.min(events.length-1,Math.max(0,index));
    const e=events[current];count.textContent='TAPPA '+String(current+1).padStart(2,'0')+' / 10 · LIBRO '+e.book;
    title.textContent=e.title;topic.textContent=e.theme;summary.textContent=e.summary;
    verse.textContent=e.verse;thought.textContent=e.thought;question.textContent=e.question;
    const url='https://it.wikisource.org/wiki/Iliade_(Monti)/Libro_'+e.book;
    source.href=url;source.textContent='Leggi il libro '+e.book+' su Wikisource ↗';
    read.href='iliade.html#'+e.paragraph;
    image.setAttribute('aria-label','Illustrazione simbolica: '+e.symbol);
    image.innerHTML='<defs><pattern id="iliade-hatch" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 12L12 0" stroke="#bba585" stroke-width=".5" opacity=".45"/></pattern></defs><rect x="0" y="0" width="284" height="284" rx="142" fill="url(#iliade-hatch)"/><circle cx="142" cy="142" r="125" fill="none" stroke="#c3ad87" stroke-width="1.5"/><circle cx="142" cy="142" r="111" fill="none" stroke="#d9c8aa" stroke-width="1"/>'+shape[e.type];
    imgCaption.textContent=e.symbol+' · Illustrazione originale stilizzata';
    progress.style.width=((current+1)/events.length*100)+'%';
    progress.setAttribute('aria-valuenow',String(current+1));
    steps.forEach((b,i)=>{if(i===current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    prev.disabled=current===0;next.disabled=current===events.length-1;
    next.textContent=current===events.length-1?'Fine del percorso':'Tappa successiva →';
    if(focus){title.setAttribute('tabindex','-1');title.focus({preventScroll:true});stage.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});}
  }
  prev.addEventListener('click',()=>show(current-1,{focus:true}));
  next.addEventListener('click',()=>show(current+1,{focus:true}));
  rail.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const dir=e.key==='ArrowRight'?1:-1;show(current+dir);steps[current].focus();}
    if(e.key==='Home'){e.preventDefault();show(0);steps[current].focus();}
    if(e.key==='End'){e.preventDefault();show(events.length-1);steps[current].focus();}
  });
  show(0);
})();
