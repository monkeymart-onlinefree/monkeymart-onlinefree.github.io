
(() => {
  document.documentElement.classList.add('js');
  document.querySelectorAll('.site-search').forEach(el=>{
    el.setAttribute('role','link'); el.setAttribute('aria-label','Search CalcPro calculators');
  });
  // Add a keyboard-accessible skip link without altering calculator logic.
  if(!document.querySelector('.cp-skip')){
    const a=document.createElement('a'); a.className='cp-skip'; a.href='#calculator'; a.textContent='Skip to calculator';
    if(!document.getElementById('calculator')) a.href='#main';
    document.body.prepend(a);
  }
})();
