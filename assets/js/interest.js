(()=>{
 'use strict';const $=id=>document.getElementById(id),v=id=>Number($(id).value),money=n=>n.toLocaleString('en-US',{style:'currency',currency:'USD'});
 function calculate(){try{
  for(const id of ['initial','monthly','annualContribution','rate','freq','years','extraMonths','tax','inflation'])if(!$(id).value.trim()||!Number.isFinite(v(id)))throw Error('Complete every field with a finite number.');
  const months=Math.round(v('years')*12+v('extraMonths')),tax=v('tax')/100,infl=v('inflation')/100;
  if(v('years')<0||v('extraMonths')<0||!Number.isInteger(v('extraMonths'))||tax<0||tax>1||infl<0)throw Error('Check the duration, tax rate (0–100%) and inflation rate.');
  const r=CalcProFinance.growth({initial:v('initial'),monthly:v('monthly'),yearly:v('annualContribution'),annual:v('rate')/100,frequency:v('freq'),months,beginning:$('contributionTiming').value==='beginning'}),afterTax=r.balance-Math.max(0,r.interest)*tax,real=afterTax/Math.pow(1+infl,months/12);
  $('ending').textContent=money(r.balance);$('principal').textContent=money(r.principal);$('interest').textContent=money(r.interest);$('afterTax').textContent=money(afterTax);$('real').textContent=money(real);$('effective').textContent=`Effective annual rate ≈ ${(r.effective*100).toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3})}%`;$('error').textContent='';
 }catch(e){$('error').textContent=e.message;for(const id of ['ending','principal','interest','afterTax','real','effective'])$(id).textContent='—';}}
 $('calculate').onclick=calculate;$('clear').onclick=()=>location.reload();calculate();
})();
