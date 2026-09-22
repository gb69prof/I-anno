/* Stable option IDs are independent of their shuffled display positions. */
(function(root){
'use strict';
function shuffle(values,random=Math.random){const a=values.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function differentOrder(ids,previous,random=Math.random){let a=shuffle(ids,random);if(a.length>1&&previous&&a.join('|')===previous.join('|'))a.push(a.shift());return a;}
function prepare(questions,previous,random=Math.random){
 const order=differentOrder(questions.map(q=>q.id),previous?.order,random);
 const targets=shuffle(questions.map((_,i)=>i%3),random);const options={};
 const attempt=order.map((id,i)=>{const q=questions.find(q=>q.id===id);const old=previous?.options?.[id];let ids=shuffle(q.options.map(o=>o.id),random);const ci=ids.indexOf(q.correctId);[ids[ci],ids[targets[i]]]=[ids[targets[i]],ids[ci]];
 if(old&&ids.join('|')===old.join('|')){const wrong=ids.map((_,j)=>j).filter(j=>j!==targets[i]);[ids[wrong[0]],ids[wrong[1]]]=[ids[wrong[1]],ids[wrong[0]]];}
 options[id]=ids;return {...q,options:ids.map(id=>q.options.find(o=>o.id===id))};});
 return {questions:attempt,layout:{order,options}};
}
function score(questions,answers){const errors=questions.filter(q=>answers[q.id]!==q.correctId);const correct=questions.length-errors.length;return {total:questions.length,correct,wrong:errors.length,percent:correct/questions.length*100,grade:correct/questions.length*10,errors};}
const api={shuffle,differentOrder,prepare,score};root.QuizCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
