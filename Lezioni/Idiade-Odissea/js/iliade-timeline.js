'use strict';
/* Atlante narrativo: otto tappe, otto mappe concettuali e otto mini-test.
   Contenuti separati in data/iliade-otto-tappe.json e disponibili offline. */
(() => {
  const $ = id => document.getElementById(id);
  const rail = $('iliade-steps');
  if (!rail) return;
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
  const nodes = {
    title:$('iliade-event-title'),count:$('iliade-count'),theme:$('iliade-theme'),
    summary:$('iliade-summary'),story:$('iliade-story'),readingTitle:$('iliade-reading-title'),extraSources:$('iliade-extra-sources'),verse:$('iliade-verse'),
    thought:$('iliade-thought'),question:$('iliade-question'),
    art:$('iliade-art'),photo:$('iliade-photo'),caption:$('iliade-art-caption'),
    credit:$('iliade-photo-credit'),source:$('iliade-source'),read:$('iliade-read'),
    mapRoot:$('iliade-map-root'),mapNodes:$('iliade-map-nodes'),
    mapTakeaway:$('iliade-map-takeaway'),quiz:$('iliade-mini-form'),
    progress:$('iliade-progress'),prev:$('iliade-prev'),next:$('iliade-next'),
    stage:$('iliade-stage')
  };
  const make = (tag,cls,text) => {
    const element=document.createElement(tag);
    if(cls)element.className=cls;
    if(text!==undefined)element.textContent=text;
    return element;
  };
  const formatNumber = n => String(n).padStart(2,'0');
  let current=0, events=[], buttons=[];
  function paintStory(e){
    nodes.readingTitle.textContent='Il racconto · '+e.title;
    nodes.story.replaceChildren();
    e.paragraphs.forEach((text,index)=>{
      const section=make('section','iliade-story-section');
      section.append(
        make('h3',null,formatNumber(index+1)+' · '+(e.paragraphTitles?.[index]||'La vicenda')),
        make('p',null,text)
      );
      nodes.story.append(section);
    });
  }
  function paintMap(e){
    nodes.mapRoot.textContent=e.map.center;
    nodes.mapNodes.replaceChildren();
    e.map.nodes.forEach(([label,detail])=>{
      const item=make('div','iliade-map-node');
      item.append(make('strong',null,label),make('p',null,detail));
      nodes.mapNodes.append(item);
    });
    nodes.mapTakeaway.textContent=e.map.takeaway;
  }
  function paintQuiz(e){
    const form=nodes.quiz;
    form.replaceChildren();
    e.quiz.forEach((item,index)=>{
      const [prompt,options]=item;
      const field=make('fieldset','iliade-quiz-field');
      const legend=make('legend',null,(index+1)+'. '+prompt);
      field.append(legend);
      options.forEach((choice,i)=>{
        const label=make('label','iliade-quiz-option');
        const radio=make('input');
        radio.type='radio';
        radio.name='iliade-q-'+index;
        radio.value=String(i);
        radio.required=true;
        label.append(radio,make('span',null,choice));
        field.append(label);
      });
      form.append(field);
    });
    const actions=make('div','iliade-quiz-actions');
    const submit=make('button',null,'Correggi le '+e.quiz.length+' risposte');
    submit.type='submit';
    actions.append(submit);
    form.append(actions);
    const result=make('div','iliade-quiz-result');
    result.setAttribute('role','status');
    result.setAttribute('aria-live','polite');
    form.append(result);
    form.onsubmit=event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      let correct=0;
      const fields=[...form.querySelectorAll('fieldset')];
      e.quiz.forEach((item,i)=>{
        const [,options,answer,explanation]=item;
        const chosen=Number(form.querySelector('input[name="iliade-q-'+i+'"]:checked').value);
        const ok=chosen===answer;
        if(ok)correct++;
        fields[i].classList.add(ok?'iliade-answer-correct':'iliade-answer-wrong');
        const feedback=make('p','iliade-quiz-feedback',(ok?'Corretto. ':'Da rivedere. Risposta corretta: '+options[answer]+'. ')+explanation);
        fields[i].append(feedback);
      });
      form.querySelectorAll('input').forEach(input=>input.disabled=true);
      submit.hidden=true;
      result.replaceChildren(make('strong',null,'Risultato: '+correct+' su '+e.quiz.length+' risposte corrette.'));
      const retry=make('button','secondary','Riprova questa tappa');
      retry.type='button';
      retry.addEventListener('click',()=>{paintQuiz(e);nodes.quiz.querySelector('legend')?.focus();});
      result.append(retry);
      result.scrollIntoView({behavior:'auto',block:'nearest'});
    };
  }
  function paintArt(e,index){
    nodes.art.setAttribute('aria-label','Simbolo della tappa: '+e.symbol);
    nodes.art.innerHTML='<defs><pattern id="iliade-hatch" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 12L12 0" stroke="#bba585" stroke-width=".5" opacity=".45"/></pattern></defs><rect width="284" height="284" rx="142" fill="url(#iliade-hatch)"/><circle cx="142" cy="142" r="125" fill="none" stroke="#c3ad87" stroke-width="1.5"/><circle cx="142" cy="142" r="111" fill="none" stroke="#d9c8aa" stroke-width="1"/>'+(shape[e.type]||shape.cosmos);
    nodes.photo.hidden=true;
    nodes.photo.removeAttribute('src');
    nodes.photo.alt='Illustrazione originale in stile fumetto: '+e.title;
    nodes.caption.textContent='Illustrazione a fumetti · '+e.title;
    // Queste tavole sono originali, non riproduzioni dei dipinti storici.
    nodes.credit.hidden=true;
    nodes.credit.removeAttribute('href');
    nodes.photo.onload=()=>{if(current===index)nodes.photo.hidden=false;};
    nodes.photo.onerror=()=>{nodes.photo.hidden=true;nodes.caption.textContent='Simbolo grafico: '+e.symbol;};
    nodes.photo.src='../assets/images/iliade-otto-fumetto/tappa-'+formatNumber(index+1)+'.webp';
  }
  function show(index,{focus=false}={}){
    current=Math.max(0,Math.min(events.length-1,index));
    const e=events[current];
    nodes.count.textContent='TAPPA '+formatNumber(current+1)+' / '+formatNumber(events.length)+' · '+(e.bookLabel||'LIBRO '+e.book);
    nodes.title.textContent=e.title;
    nodes.theme.textContent=e.theme;
    nodes.summary.replaceChildren(make('p',null,e.summary||e.paragraphs[0]));
    paintStory(e);
    nodes.verse.textContent=e.verse;
    nodes.thought.textContent=e.thought;
    nodes.question.textContent=e.question;
    nodes.source.href='https://it.wikisource.org/wiki/Iliade_(Monti)/Libro_'+e.book;
    nodes.source.textContent='Testo originale: libro '+e.book+' ↗';
    nodes.extraSources.replaceChildren();
    (e.sourceBooks||[e.book]).filter(book=>book!==e.book).forEach(book=>{
      const a=make('a',null,'Libro '+book+' ↗');
      a.href='https://it.wikisource.org/wiki/Iliade_(Monti)/Libro_'+book;
      a.target='_blank';a.rel='noopener noreferrer';
      nodes.extraSources.append(a);
    });
    nodes.read.href='iliade.html#'+e.read;
    nodes.read.textContent='Torna alla lezione sull’Iliade ↗';
    paintArt(e,current);
    paintMap(e);
    paintQuiz(e);
    nodes.progress.style.width=((current+1)/events.length*100)+'%';
    buttons.forEach((button,i)=>{
      if(i===current)button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    nodes.prev.disabled=current===0;
    nodes.next.disabled=current===events.length-1;
    nodes.next.textContent=current===events.length-1?'Fine del percorso':'Tappa successiva →';
    if(focus){
      nodes.title.setAttribute('tabindex','-1');
      nodes.title.focus({preventScroll:true});
      const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      nodes.stage.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    }
  }
  function start(data){
    if(!Array.isArray(data.events)||data.events.length!==8)throw Error('Le tappe non sono complete');
    events=data.events;
    buttons=events.map((e,i)=>{
      const button=make('button','iliade-step');
      button.type='button';
      button.setAttribute('aria-label','Tappa '+(i+1)+': '+e.title);
      button.append(make('span','iliade-step-number',formatNumber(i+1)),make('span','iliade-step-name',e.title));
      button.addEventListener('click',()=>show(i,{focus:true}));
      rail.append(button);
      return button;
    });
    nodes.prev.addEventListener('click',()=>show(current-1,{focus:true}));
    nodes.next.addEventListener('click',()=>show(current+1,{focus:true}));
    rail.addEventListener('keydown',event=>{
      if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){
        event.preventDefault();
        const index=event.key==='Home'?0:event.key==='End'?events.length-1:current+(event.key==='ArrowRight'?1:-1);
        show(index);buttons[current].focus();
      }
    });
    show(0);
  }
  fetch('../data/iliade-otto-tappe.json').then(response=>{
    if(!response.ok)throw Error('Dati non disponibili');
    return response.json();
  }).then(start).catch(()=>{
    rail.replaceChildren(make('p',null,'Il percorso interattivo non è disponibile. La lezione integrale rimane leggibile.'));
  });
})();
