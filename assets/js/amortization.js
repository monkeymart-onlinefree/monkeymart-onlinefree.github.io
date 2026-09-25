(()=>{
 'use strict';
 const $=id=>document.getElementById(id),value=id=>Number($(id).value),money=n=>n.toLocaleString('en-US',{style:'currency',currency:'USD'});
 let result=null,start=null;
 const monthIndex=s=>{if(!/^\d{4}-\d{2}$/.test(s))throw Error('Select a valid payment month.');const [y,m]=s.split('-').map(Number);if(m<1||m>12||y<1900||y>9999)throw Error('Payment dates must be between 1900 and 9999.');return y*12+m-1;};
 const dateLabel=i=>{const y=Math.floor(i/12),m=i%12;return new Intl.DateTimeFormat('en-US',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(y,m,1)));};
 function render(){if(!result)return;let rows=result.rows;
  if($('scheduleView').value==='yearly'){
   const groups=new Map();for(const r of rows){const y=Math.floor((start+r.month-1)/12);let g=groups.get(y);if(!g){g={month:y,payment:0,interest:0,principal:0,balance:0};groups.set(y,g);}g.payment+=r.payment;g.interest+=r.interest;g.principal+=r.principal;g.balance=r.balance;}rows=[...groups.values()];
  }
  const yearly=$('scheduleView').value==='yearly';$('periodHeading').textContent=yearly?'Year':'Payment month';
  $('scheduleBody').innerHTML=rows.map(r=>`<tr><td>${yearly?r.month:dateLabel(start+r.month-1)}</td><td>${money(r.payment)}</td><td>${money(r.interest)}</td><td>${money(r.principal)}</td><td>${money(r.balance)}</td></tr>`).join('');
 }
 function calculate(){try{
  for(const id of ['amount','rate','years','extra','termMonths','yearlyExtra'])if(!$(id).value.trim()||!Number.isFinite(value(id)))throw Error('Complete all amount, rate and term fields with finite numbers.');
  const p=value('amount'),r=value('rate')/1200,n=Math.round(value('years')*12+value('termMonths'));start=monthIndex($('firstPayment').value);
  if(value('years')<0||value('termMonths')<0||!Number.isInteger(value('termMonths'))||value('extra')<0||value('yearlyExtra')<0)throw Error('Years, additional months and extra payments cannot be negative. Additional months must be whole numbers.');
  const monthlyStart=monthIndex($('monthlyStart').value)-start+1,yearlyStart=monthIndex($('yearlyStart').value)-start+1;
  if((value('extra')>0&&monthlyStart<1)||(value('yearlyExtra')>0&&yearlyStart<1))throw Error('Extra payments cannot begin before the first payment month.');
  const oneTime={};document.querySelectorAll('.cp-one-time-row').forEach(row=>{const amount=Number(row.querySelector('input[type=number]').value);if(!Number.isFinite(amount)||amount<0)throw Error('Enter a valid one-time payment.');if(amount){const m=monthIndex(row.querySelector('input[type=month]').value)-start+1;if(m<1||m>n)throw Error('One-time payments must fall within the loan term.');oneTime[m]=(oneTime[m]||0)+amount;}});
  result=CalcProFinance.schedule(p,r,n,{monthly:value('extra'),monthlyStart,yearly:value('yearlyExtra'),yearlyStart,oneTime});const normal=CalcProFinance.schedule(p,r,n);
  $('payment').textContent=money(result.required);$('payoff').textContent=`Payoff in ${result.months} months · ${dateLabel(start+result.months-1)}`;$('interest').textContent=money(result.interest);$('saved').textContent=money(Math.max(0,normal.interest-result.interest));$('totalPaid').textContent=money(result.total);$('monthsSaved').textContent=String(n-result.months);$('error').textContent='';render();
 }catch(e){$('error').textContent=e.message;result=null;$('scheduleBody').innerHTML='';for(const id of ['payment','payoff','interest','saved','totalPaid','monthsSaved'])$(id).textContent='—';}}
 let serial=0;
 function addOneTime(){if(document.querySelectorAll('.cp-one-time-row').length>=10)return;const i=++serial,row=document.createElement('div');row.className='cp-one-time-row';row.innerHTML=`<div class="field"><label for="oneAmount${i}">One-time amount ($)</label><input id="oneAmount${i}" type="number" value="0" min="0" step="0.01"></div><div class="field"><label for="oneDate${i}">Payment month</label><input id="oneDate${i}" type="month"></div><button type="button" class="cp-small-action">Remove</button>`;row.querySelector('input[type=month]').value=$('firstPayment').value;row.querySelector('button').onclick=()=>{row.remove();$('addOneTime').disabled=false;};$('oneTimePayments').appendChild(row);$('addOneTime').disabled=document.querySelectorAll('.cp-one-time-row').length>=10;}
 const now=new Date(),next=new Date(now.getFullYear(),now.getMonth()+1,1),format=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
 $('firstPayment').value=format(next);$('monthlyStart').value=format(next);$('yearlyStart').value=format(new Date(next.getFullYear(),next.getMonth()+11,1));
 $('calculate').onclick=calculate;$('clear').onclick=()=>location.reload();$('scheduleView').onchange=render;$('addOneTime').onclick=addOneTime;addOneTime();calculate();
})();
