(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const scriptEl = document.currentScript || [...document.scripts].find(s=>s.src&&s.src.includes('assets/js/global.js'));
  const siteRoot = scriptEl ? new URL('../../', scriptEl.src) : new URL('./', location.href);
  const searchIndexUrl = scriptEl ? new URL('search-index.js', scriptEl.src).href : new URL('assets/js/search-index.js', siteRoot).href;
  const toUrl = p => {
    if(!p) return siteRoot.href;
    if(/^(?:[a-z]+:|#)/i.test(p)) return p;
    let v=p.startsWith('/') ? p.slice(1) : p; if(v===''||v.endsWith('/')) v+='index.html'; return new URL(v, siteRoot).href;
  };
  const norm=s=>(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9%+.-]+/g,' ').trim();
  let data=Array.isArray(window.CALCPRO_SEARCH_INDEX)?window.CALCPRO_SEARCH_INDEX:[];
  let searchLoadPromise=null;
  const api={data,search,score,norm,ensureData,toUrl,siteRoot:siteRoot.href};
  window.CalcProSearch=api;
  const categoryInitial=c=>({Finance:'F','Health & Fitness':'H','Math & Statistics':'M','Date & Time':'D','Engineering & Construction':'E','Conversion & Web':'C',Education:'A','Other Tools':'O'}[c]||'C');
  function refreshData(){data=Array.isArray(window.CALCPRO_SEARCH_INDEX)?window.CALCPRO_SEARCH_INDEX:[];api.data=data;return data}
  function ensureData(){
    if(data.length)return Promise.resolve(data);
    if(searchLoadPromise)return searchLoadPromise;
    searchLoadPromise=new Promise((resolve,reject)=>{
      const existing=document.querySelector('script[data-cp-search-index]')||[...document.scripts].find(s=>s.src&&s.src.includes('search-index.js'));
      if(existing){
        if(window.CALCPRO_SEARCH_INDEX){resolve(refreshData());return}
        existing.addEventListener('load',()=>resolve(refreshData()),{once:true});existing.addEventListener('error',reject,{once:true});return;
      }
      const s=document.createElement('script');s.src=searchIndexUrl;s.defer=true;s.dataset.cpSearchIndex='1';s.onload=()=>resolve(refreshData());s.onerror=()=>reject(new Error('Search index failed to load'));document.head.appendChild(s);
    });
    return searchLoadPromise;
  }
  function score(item,q){
    const query=norm(q);if(!query)return 0;
    const terms=query.split(/\s+/).filter(Boolean),title=norm(item.title),slug=norm(item.slug.replace(/-/g,' ')),cat=norm(item.category+' '+(item.subcategory||'')),desc=norm(item.description),all=`${title} ${slug} ${cat} ${desc}`;
    let s=0;if(title===query)s+=240;else if(title.startsWith(query))s+=140;else if(title.includes(query))s+=95;if(slug===query)s+=160;else if(slug.startsWith(query))s+=100;else if(slug.includes(query))s+=70;if(cat.includes(query))s+=26;if(desc.includes(query))s+=16;
    let hits=0;for(const t of terms){if(title.includes(t)){s+=34;hits++}else if(slug.includes(t)){s+=25;hits++}else if(cat.includes(t)){s+=12;hits++}else if(desc.includes(t)){s+=5;hits++}}if(hits===terms.length)s+=45;return s;
  }
  function search(q,limit=8,category=''){if(!norm(q))return [];return data.map(x=>({x,s:score(x,q)})).filter(r=>r.s>0&&(!category||r.x.category===category)).sort((a,b)=>b.s-a.s||a.x.title.localeCompare(b.x.title)).slice(0,limit).map(r=>r.x)}
  if(!document.querySelector('.cp-skip')){const a=document.createElement('a');a.className='cp-skip';a.href=document.getElementById('calculator')?'#calculator':'#main';a.textContent=document.getElementById('calculator')?'Skip to calculator':'Skip to main content';document.body.prepend(a)}
  document.querySelectorAll('[data-cp-section]').forEach(a=>{try{const here=new URL(location.href),target=new URL(a.href);if(here.protocol===target.protocol&&here.href.startsWith(target.href))a.setAttribute('aria-current','page')}catch{}});
  const toggle=document.querySelector('.cp-menu-toggle'),panel=document.querySelector('.cp-mobile-panel');if(toggle&&panel){toggle.addEventListener('click',()=>{const open=panel.hasAttribute('hidden');panel.toggleAttribute('hidden',!open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu')})}
  function wireSearch(form,input,results){
    if(!form||!input)return;let active=-1,links=[],renderToken=0;
    function close(){if(results){results.hidden=true;results.innerHTML=''}input.setAttribute('aria-expanded','false');active=-1;links=[]}
    async function render(){
      const token=++renderToken,q=input.value.trim();if(!q){close();return}
      if(results){results.hidden=false;results.innerHTML='<div class="cp-search-empty">Searching…</div>'}input.setAttribute('aria-expanded','true');
      try{await ensureData()}catch{if(results)results.innerHTML='<div class="cp-search-empty">Search suggestions are unavailable. Press Enter for the full search page.</div>';return}
      if(token!==renderToken)return;const found=search(q,8);if(!results)return;results.innerHTML='';
      if(!found.length){const e=document.createElement('div');e.className='cp-search-empty';e.textContent='No close match. Press Enter to search the full directory.';results.appendChild(e)}else found.forEach(it=>{const a=document.createElement('a');a.className='cp-search-option';a.href=toUrl(it.url);a.setAttribute('role','option');a.innerHTML=`<span class="cp-search-badge">${categoryInitial(it.category)}</span><span class="cp-search-copy"><span class="cp-search-title"></span><span class="cp-search-meta"></span></span><span class="cp-search-go">→</span>`;a.querySelector('.cp-search-title').textContent=it.title;a.querySelector('.cp-search-meta').textContent=it.category+(it.description?` · ${it.description}`:'');results.appendChild(a)});
      results.hidden=false;links=[...results.querySelectorAll('.cp-search-option')];active=-1;
    }
    input.addEventListener('input',render);input.addEventListener('focus',()=>{ensureData().catch(()=>{});if(input.value.trim())render()});input.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&links.length){e.preventDefault();active=(active+1)%links.length;links.forEach((x,i)=>x.classList.toggle('is-active',i===active));links[active].scrollIntoView({block:'nearest'})}else if(e.key==='ArrowUp'&&links.length){e.preventDefault();active=(active-1+links.length)%links.length;links.forEach((x,i)=>x.classList.toggle('is-active',i===active));links[active].scrollIntoView({block:'nearest'})}else if(e.key==='Enter'&&active>=0&&links[active]){e.preventDefault();location.href=links[active].href}else if(e.key==='Escape'){close();input.blur()}});document.addEventListener('click',e=>{if(!form.contains(e.target))close()})
  }
  document.querySelectorAll('.cp-header-search,.cp-home-autocomplete').forEach(f=>wireSearch(f,f.querySelector('.cp-search-input'),f.querySelector('.cp-search-results')));
  document.addEventListener('keydown',e=>{const tag=(e.target&&e.target.tagName||'').toLowerCase(),typing=['input','textarea','select'].includes(tag)||e.target?.isContentEditable;if((e.key==='/'&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();const inp=document.querySelector('.cp-search-input');if(inp){inp.focus();inp.select();ensureData().catch(()=>{})}else location.href=toUrl('/search/')}if(e.key==='Escape'&&panel&&!panel.hasAttribute('hidden')){panel.hidden=true;toggle?.setAttribute('aria-expanded','false')}});
})();
