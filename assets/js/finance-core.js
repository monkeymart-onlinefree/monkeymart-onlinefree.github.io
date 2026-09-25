/* Pure fixed-rate monthly-loan calculations. No intermediate cent rounding. */
((root)=>{
  'use strict';
  function payment(principal,rate,months){
    if(![principal,rate,months].every(Number.isFinite)||principal<=0||rate<0||!Number.isInteger(months)||months<1||months>12000)throw Error('Enter a positive amount, a non-negative rate, and a term of 1–12,000 whole months.');
    const pay=rate===0?principal/months:principal*rate/(-Math.expm1(-months*Math.log1p(rate)));
    if(!Number.isFinite(pay))throw Error('The amount or interest rate is too large.');
    return pay;
  }
  function schedule(principal,rate,months,extras={}){
    const required=payment(principal,rate,months),rows=[];let balance=principal,totalInterest=0;
    for(let month=1;month<=months&&balance>0;month++){
      const interest=balance*rate;
      let extra=0;
      if(month>=(extras.monthlyStart||1))extra+=extras.monthly||0;
      if(month>=(extras.yearlyStart||12)&&(month-(extras.yearlyStart||12))%12===0)extra+=extras.yearly||0;
      extra+=(extras.oneTime||{})[month]||0;
      if(!Number.isFinite(extra)||extra<0)throw Error('Extra payments must be finite and non-negative.');
      const principalPaid=month===months?balance:Math.min(balance,required-interest+extra);
      if(!(principalPaid>0))throw Error('The payment cannot reduce the loan balance at this rate.');
      balance=Math.max(0,balance-principalPaid);
      if(balance<Math.max(1,principal)*1e-12)balance=0;
      totalInterest+=interest;
      rows.push({month,payment:principalPaid+interest,interest,principal:principalPaid,balance});
    }
    return {required,rows,months:rows.length,interest:totalInterest,total:principal+totalInterest};
  }
  function growth({initial,monthly,yearly=0,annual,frequency,months,beginning=false}){
    if(![initial,monthly,yearly,annual,frequency,months].every(Number.isFinite)||initial<0||monthly<0||yearly<0||annual<=-1||frequency<=0||!Number.isInteger(months)||months<0||months>12000)throw Error('Enter valid amounts and a duration of 0–12,000 months.');
    const logMonthly=Math.log1p(annual/frequency)*frequency/12;
    const factor=Math.exp(logMonthly),series=(log,n)=>Math.abs(log)<1e-15?n:Math.expm1(n*log)/Math.expm1(log);
    const yearlyCount=beginning?Math.ceil(months/12):Math.floor(months/12);
    const annualBalance=yearlyCount?yearly*series(logMonthly*12,yearlyCount)*Math.exp(logMonthly*(months-12*yearlyCount+(beginning?12:0))):0;
    const balance=initial*Math.exp(logMonthly*months)+monthly*series(logMonthly,months)*(beginning?factor:1)+annualBalance;
    if(!Number.isFinite(balance))throw Error('The projected value is too large. Reduce the rate, amount or duration.');
    const principal=initial+monthly*months+yearly*yearlyCount;
    return {balance,principal,interest:balance-principal,effective:Math.expm1(logMonthly*12)};
  }
  root.CalcProFinance={payment,schedule,growth};
  if(typeof module==='object'&&module.exports)module.exports=root.CalcProFinance;
})(typeof window==='undefined'?globalThis:window);
