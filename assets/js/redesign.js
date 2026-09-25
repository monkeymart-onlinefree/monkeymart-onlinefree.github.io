
(()=>{'use strict';
const numberFrom=(v)=>{if(v==null)return null;const s=String(v).replace(/,/g,'').replace(/[^0-9+\-.eE]/g,'');if(!s||s==='-'||s==='.')return null;const n=Number(s);return Number.isFinite(n)?n:null};
const labelFor=(el,i)=>{let label='';if(el.id){const l=document.querySelector(`label[for="${CSS.escape(el.id)}"]`);if(l)label=l.textContent.trim()}if(!label)label=el.getAttribute('aria-label')||el.dataset.label||el.closest('.field,.stat,.result,.output,.row')?.querySelector('label,span,small,strong')?.textContent.trim()||`Value ${i+1}`;return label.replace(/\s+/g,' ').slice(0,34)};
function collect(card){
  const main=card.closest('main')||document;let result=[];
  const selectors=['.result-hero .big','.stat b','.stats b','.result b','.result strong','.output b','.output strong','[id*="result"]','[id*="total"]','[id*="monthly"]','[id*="payment"]'];
  const seen=new Set();
  main.querySelectorAll(selectors.join(',')).forEach((el,i)=>{if(seen.has(el)||card.contains(el))return;seen.add(el);const n=numberFrom(el.textContent);if(n!==null&&Math.abs(n)<1e18)result.push({label:labelFor(el,i),value:n,kind:'result'})});
  if(result.length<2){
    main.querySelectorAll('input[type="number"],input[type="range"]').forEach((el,i)=>{if(card.contains(el)||seen.has(el))return;const n=numberFrom(el.value);if(n!==null&&Math.abs(n)<1e18)result.push({label:labelFor(el,i),value:n,kind:'input'})});
  }
  return result.filter((x,i,a)=>i===a.findIndex(y=>y.label===x.label&&y.value===x.value)).slice(0,6)
}
function draw(card){
  const canvas=card.querySelector('canvas'),flow=card.querySelector('.cp-flow'),wrap=card.querySelector('.cp-chart-wrap'),badge=card.querySelector('.cp-chart-badge');if(!canvas)return;
  const data=collect(card);if(data.length<2){wrap.style.display='none';flow.style.display='flex';badge.textContent='Method flow';return}else{wrap.style.display='block';flow.style.display='none';badge.textContent=data.some(x=>x.kind==='result')?'Live result view':'Live input view'}
  const rect=wrap.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=Math.max(280,rect.width),h=Math.max(220,rect.height);canvas.width=w*dpr;canvas.height=h*dpr;const c=canvas.getContext('2d');c.scale(dpr,dpr);c.clearRect(0,0,w,h);
  const pad={l:54,r:18,t:25,b:72},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b,max=Math.max(...data.map(x=>Math.abs(x.value)),1);const gap=Math.max(10,cw/(data.length*5)),bw=Math.max(22,(cw-gap*(data.length+1))/data.length);
  c.strokeStyle='#dce9f5';c.lineWidth=1;c.fillStyle='#7890a8';c.font='11px system-ui';c.textAlign='right';for(let k=0;k<=4;k++){const y=pad.t+ch-(ch*k/4);c.beginPath();c.moveTo(pad.l,y);c.lineTo(w-pad.r,y);c.stroke();const val=max*k/4;c.fillText(format(val),pad.l-7,y+4)}
  data.forEach((x,i)=>{const bh=Math.max(3,Math.abs(x.value)/max*ch),x0=pad.l+gap+i*(bw+gap),y0=pad.t+ch-bh;const g=c.createLinearGradient(0,y0,0,pad.t+ch);g.addColorStop(0,i%2?'#6558f5':'#22b7e9');g.addColorStop(1,'#1477ff');roundRect(c,x0,y0,bw,bh,8);c.fillStyle=g;c.fill();c.fillStyle='#21405f';c.font='600 11px system-ui';c.textAlign='center';c.fillText(format(x.value),x0+bw/2,Math.max(14,y0-7));c.save();c.translate(x0+bw/2,pad.t+ch+13);c.rotate(-.35);c.fillStyle='#647b91';c.font='10px system-ui';c.textAlign='right';c.fillText(x.label.slice(0,24),0,0);c.restore()})
}
function roundRect(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function format(v){const a=Math.abs(v);if(a>=1e9)return (v/1e9).toFixed(1)+'B';if(a>=1e6)return (v/1e6).toFixed(1)+'M';if(a>=1e3)return (v/1e3).toFixed(1)+'K';if(a>=100)return v.toFixed(0);if(a>=1)return v.toFixed(2).replace(/\.00$/,'');return v.toPrecision(3)}
const cards=[...document.querySelectorAll('[data-cp-auto-chart]')];let t;const redraw=()=>{clearTimeout(t);t=setTimeout(()=>cards.forEach(draw),80)};cards.forEach(draw);document.addEventListener('input',redraw,true);document.addEventListener('change',redraw,true);document.addEventListener('click',e=>{if(e.target.closest('button,.btn'))setTimeout(redraw,120)},true);window.addEventListener('resize',redraw);
})();
