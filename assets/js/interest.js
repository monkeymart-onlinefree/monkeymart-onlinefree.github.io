(()=>{
 'use strict';const $=id=>document.getElementById(id),v=id=>Number($(id).value),money=n=>n.toLocaleString('en-US',{style:'currency',currency:'USD'});
 function updateBreakdown(initial, principal, interest, balance){
  const contrib = Math.max(0, principal - initial);
  const total = Math.max(balance, principal + interest, 1);
  const initialPct = balance > 0 ? (initial / total) * 100 : 0;
  const contribPct = balance > 0 ? (contrib / total) * 100 : 0;
  const interestPct = balance > 0 ? (interest / total) * 100 : 0;
  const donut = $('compoundDonut');
  if (donut) {
    donut.style.setProperty('--compound-initial', `${initialPct}%`);
    donut.style.setProperty('--compound-contrib', `${contribPct}%`);
    donut.style.setProperty('--compound-interest', `${interestPct}%`);
  }
  $('donutTotal').textContent = money(balance);
  $('initialShare').textContent = money(initial);
  $('contribShare').textContent = money(contrib);
  $('interestShare').textContent = money(interest);
 }
 function calculate(){try{
  for(const id of ['initial','monthly','annualContribution','rate','freq','years','extraMonths','tax','inflation'])if(!$(id).value.trim()||!Number.isFinite(v(id)))throw Error('Complete every field with a finite number.');
  const months=Math.round(v('years')*12+v('extraMonths')),tax=v('tax')/100,infl=v('inflation')/100;
  if(v('years')<0||v('extraMonths')<0||!Number.isInteger(v('extraMonths'))||tax<0||tax>1||infl<0)throw Error('Check the duration, tax rate (0–100%) and inflation rate.');
  const r=CalcProFinance.growth({initial:v('initial'),monthly:v('monthly'),yearly:v('annualContribution'),annual:v('rate')/100,frequency:v('freq'),months,beginning:$('contributionTiming').value==='beginning'}),afterTax=r.balance-Math.max(0,r.interest)*tax,real=afterTax/Math.pow(1+infl,months/12);
  const initialAmount = Math.max(0, v('initial'));
  $('ending').textContent=money(r.balance);$('principal').textContent=money(r.principal);$('interest').textContent=money(r.interest);$('afterTax').textContent=money(afterTax);$('real').textContent=money(real);$('effective').textContent=`Effective annual rate ≈ ${(r.effective*100).toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}%`;$('error').textContent='';
  updateBreakdown(initialAmount, r.principal, r.interest, r.balance);
 }catch(e){$('error').textContent=e.message;for(const id of ['ending','principal','interest','afterTax','real','effective'])$(id).textContent='—';const donut=$('compoundDonut');if(donut){donut.style.setProperty('--compound-initial','0%');donut.style.setProperty('--compound-contrib','0%');donut.style.setProperty('--compound-interest','100%');}if($('donutTotal'))$('donutTotal').textContent='$0';if($('initialShare'))$('initialShare').textContent='$0.00';if($('contribShare'))$('contribShare').textContent='$0.00';if($('interestShare'))$('interestShare').textContent='$0.00';}}
 $('calculate').onclick=calculate;$('clear').onclick=()=>location.reload();calculate();
})();
