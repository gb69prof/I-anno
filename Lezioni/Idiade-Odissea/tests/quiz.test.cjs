const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');const core=require('../js/quiz-core.js');const dir=path.join(__dirname,'../data/tests');let attempts=0;
for(const file of fs.readdirSync(dir)){const {questions}=JSON.parse(fs.readFileSync(path.join(dir,file)));let previous;
 for(let t=0;t<1000;t++){const next=core.prepare(questions,previous);const counts=[0,0,0];if(previous)assert.notDeepEqual(next.layout.order,previous.order);
 for(const q of next.questions){assert.equal(q.options.length,3);assert.equal(new Set(q.options.map(o=>o.id)).size,3);if(previous)assert.notDeepEqual(next.layout.options[q.id],previous.options[q.id]);counts[q.options.findIndex(o=>o.id===q.correctId)]++;}
 assert(Math.max(...counts)-Math.min(...counts)<=1);previous=next.layout;attempts++;
 }
 for(const mode of ['all','none','mixed']){const answers={};questions.forEach((q,i)=>answers[q.id]=(mode==='all'||mode==='mixed'&&i%2===0)?q.correctId:q.options.find(o=>o.id!==q.correctId).id);const result=core.score(questions,answers);const expected=mode==='all'?questions.length:mode==='none'?0:Math.ceil(questions.length/2);assert.equal(result.correct,expected);assert.equal(result.wrong,questions.length-expected);assert.equal(result.percent,100*expected/questions.length);assert.equal(result.grade,10*expected/questions.length);assert.equal(result.errors.length,result.wrong);}
 // Deterministic RNG exercises the collision fallback.
 const one=core.prepare(questions,null,()=>0);const two=core.prepare(questions,one.layout,()=>0);assert.notDeepEqual(one.layout.order,two.layout.order);questions.forEach(q=>assert.notDeepEqual(one.layout.options[q.id],two.layout.options[q.id]));
}
console.log('Passed:',attempts,'randomized attempts; 33 scoring scenarios; collision fallbacks.');
