(() => {
  'use strict';
  const input=document.getElementById('cp-filter');
  if(input){
    const cards=[...document.querySelectorAll('#cp-category-grid>.card')];
    const status=document.getElementById('cp-filter-status');
    const records=cards.map(card=>({card,text:card.textContent.toLowerCase()}));
    function filter(){const q=input.value.trim().toLowerCase();let count=0;for(const r of records){r.card.hidden=!r.text.includes(q);if(!r.card.hidden)count++}status.textContent=count+' of '+cards.length+' tools'+(count?'':' — try another search.');}
    input.addEventListener('input',filter);filter();
  }
  const cat=document.body.dataset.cpCategory;
  if(cat)document.querySelectorAll('[data-cp-section]').forEach(a=>{if(a.dataset.cpSection===cat)a.setAttribute('aria-current','page')});
  document.querySelectorAll('[data-cp-print]').forEach(button=>button.addEventListener('click',()=>window.print()));
  const calculate=document.querySelector('main #calculate');
  if(calculate)document.querySelector('main')?.addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.matches('input[type=number],input[type=date],input[type=month]')){event.preventDefault();calculate.click();}});
  // Keep wide result tables accessible without stretching the whole page.
  document.querySelectorAll('main table').forEach(table=>{
    if(table.querySelector('tbody[id]')){
      const button=document.createElement('button');button.type='button';button.className='cp-export-table';button.textContent='Download table CSV';
      const status=document.createElement('span');status.className='cp-export-status';status.setAttribute('role','status');
      const actions=document.createElement('div');actions.className='cp-tool-actions';actions.append(button,status);table.parentElement.insertBefore(actions,table);
      button.addEventListener('click',()=>{
        const rows=[...table.rows].filter(row=>!row.hidden);
        if(!table.querySelector('tbody tr')){status.textContent='Calculate a result first.';return;}
        const quote=text=>'"'+text.replace(/"/g,'""')+'"';
        const csv=rows.map(row=>[...row.cells].map(cell=>{let value=cell.textContent.trim();if(/^[=+@]/.test(value)||(/^[-]/.test(value)&&!/^-[\d.,\s$%]+$/.test(value)))value="'"+value;return quote(value)}).join(',')).join('\r\n');
        const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));
        const a=document.createElement('a');a.href=url;a.download=(document.querySelector('h1')?.textContent||'calculator').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-table.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='CSV downloaded.';
      });
    }
    const parent=table.parentElement;
    if(parent.classList.contains('cp-table-scroll')||['auto','scroll'].includes(getComputedStyle(parent).overflowX))return;
    const wrap=document.createElement('div');wrap.className='cp-table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',table.caption?.textContent||'Scrollable calculator table');parent.insertBefore(wrap,table);wrap.appendChild(table);
  });
})();
