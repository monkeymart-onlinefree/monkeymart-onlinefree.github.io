const PAGE_SIZE=48;
let ALL=[],CATS={},cat='all',query='',sort='quality',visible=PAGE_SIZE;
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);

function normGame(g){
  const title=g.title??g.t??'Game';
  const category=g.category??g.c??'games';
  const image=g.image??g.img??g.banner_image??g.ban??'';
  const banner=g.banner_image??g.ban??g.img??g.image??'';
  const quality=Number(g.quality_score??g.q??0);
  const date=g.date_published??g.date??'';
  const url=g.url??g.iframe??g.embed??'';
  return {...g,title,category,image,banner,quality,date,url,slug:slug(title)};
}
function slug(s){return String(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'game'}
function esc(s){const d=document.createElement('div');d.textContent=s??'';return d.innerHTML}
function cap(s){return String(s||'').replace(/[-_]+/g,' ').replace(/\b\w/g,x=>x.toUpperCase())}
function jsq(s){return JSON.stringify(String(s??''))}

async function init(){
  try{
    const [gamesRes,catsRes]=await Promise.all([fetch('/data/games.json',{cache:'no-store'}),fetch('/data/categories.json',{cache:'no-store'})]);
    if(!gamesRes.ok)throw new Error('games.json HTTP '+gamesRes.status);
    ALL=(await gamesRes.json()).map(normGame);
    CATS=await catsRes.json();
  }catch(e){console.error(e);showError('Game data could not be loaded.');return}
  buildNavigation();renderHero();renderSections();render();bind();
}
function showError(t){const e=$('#emptyState');if(e){e.hidden=false;e.querySelector('span').textContent=t}}
function buildNavigation(){
  const entries=Object.entries(CATS).sort((a,b)=>Number(b[1])-Number(a[1]));
  const strip=$('#catStrip');
  if(strip)strip.innerHTML='<button class="cat-pill active" data-cat="all">All</button>'+entries.slice(0,24).map(([c])=>`<button class="cat-pill" data-cat="${esc(c)}">${esc(cap(c))}</button>`).join('');
  const side=$('#sideCategories');
  if(side)side.innerHTML=entries.map(([c])=>`<button class="side-link" data-cat="${esc(c)}" onclick="selectCategory(${jsq(c)})"><span class="side-icon ico-grid"></span><span>${esc(cap(c))}</span></button>`).join('');
  if($('#sideHome'))$('#sideHome').innerHTML='<span class="side-icon ico-home"></span><span>Home</span>';
  if($('#sideNew'))$('#sideNew').innerHTML='<span class="side-icon ico-star"></span><span>New Games</span>';
  if($('#sidePopular'))$('#sidePopular').innerHTML='<span class="side-icon ico-fire"></span><span>Popular</span>';
  if($('#sideRated'))$('#sideRated').innerHTML='<span class="side-icon ico-star"></span><span>Top Rated</span>';
  if($('#sideRecent'))$('#sideRecent').innerHTML='<span class="side-icon ico-clock"></span><span>Recently Played</span>';
  if(strip)strip.onclick=e=>{const b=e.target.closest('[data-cat]');if(b)selectCategory(b.dataset.cat)};
}
function bind(){
  const input=$('#searchInput');
  if(input){input.addEventListener('input',onSearch);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();closeSearch();render();jumpSection('all-games')}});input.addEventListener('focus',()=>{if(query)renderSearchResults(query)})}
  $('#clearSearch')?.addEventListener('click',()=>{if(input)input.value='';query='';$('#clearSearch').classList.remove('show');closeSearch();render()});
  $('#sortSelect')?.addEventListener('change',e=>{sort=e.target.value;visible=PAGE_SIZE;render()});
  $('#loadMoreBtn')?.addEventListener('click',()=>{visible+=PAGE_SIZE;render()});
  $('#mobileMenu')?.addEventListener('click',()=>$('#sidebar')?.classList.toggle('open'));
  $('#mobileSearch')?.addEventListener('click',()=>{$('.search-wrap')?.classList.toggle('mobile-open');input?.focus()});
  document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))closeSearch()});
}
function onSearch(e){query=e.target.value.trim();visible=PAGE_SIZE;$('#clearSearch')?.classList.toggle('show',!!query);if(query)renderSearchResults(query);else closeSearch();render()}
function searchMatches(q){const n=q.toLowerCase();return ALL.filter(g=>g.title.toLowerCase().includes(n)||g.category.toLowerCase().includes(n)||g.slug.includes(slug(q)))}
function renderSearchResults(q){
  let box=$('#searchResults');
  if(!box){const wrap=$('.search-wrap');if(!wrap)return;box=document.createElement('div');box.id='searchResults';box.className='search-results';wrap.appendChild(box)}
  const n=q.toLowerCase();
  const cats=Object.entries(CATS).filter(([c])=>c.toLowerCase().includes(n)).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const games=searchMatches(q).slice(0,8);
  box.innerHTML=[
    ...cats.map(([c,count])=>`<a class="search-result search-category-result" href="#" onclick="selectCategory(${jsq(c)});closeSearch();return false"><span class="search-tag-icon"></span><div><strong>${esc(cap(c))} Games</strong><small>${Number(count).toLocaleString()}</small></div></a>`),
    ...games.map(g=>`<a class="search-result" href="/games/${encodeURIComponent(g.slug)}/"><img src="${esc(g.image)}" alt=""><div><strong>${esc(g.title)}</strong><small>${esc(cap(g.category))}</small></div></a>`),
    `<a class="search-all" href="#" onclick="closeSearch();jumpSection('all-games');return false">Search All <span>→</span></a>`
  ].join('');
  box.classList.add('show');
}
function closeSearch(){$('#searchResults')?.classList.remove('show')}
function filtered(){
  let a=ALL.filter(g=>cat==='all'||g.category===cat);
  if(query)a=searchMatches(query).filter(g=>cat==='all'||g.category===cat);
  if(sort==='az')a.sort((x,y)=>x.title.localeCompare(y.title));
  else if(sort==='za')a.sort((x,y)=>y.title.localeCompare(x.title));
  else if(sort==='new')a.sort((x,y)=>new Date(y.date||0)-new Date(x.date||0));
  else a.sort((x,y)=>y.quality-x.quality);
  return a;
}
function card(g){return `<article class="game-card" onclick="openGame(${jsq(g.slug)})"><div class="thumb"><img src="${esc(g.image||g.banner)}" alt="${esc(g.title)}" loading="lazy" onerror="this.src='${esc(g.banner)}'"><div class="play-overlay"><span class="play-button"></span></div></div><div class="game-info"><p class="game-title">${esc(g.title)}</p><div class="game-cat">${esc(cap(g.category))}</div></div></article>`}
function render(){
  const a=filtered();
  if($('#sectionTitle'))$('#sectionTitle').textContent=query?`Search results for "${$('#searchInput')?.value||query}"`:cat==='all'?'All Games':cap(cat)+' Games';
  if($('#sectionSubtitle'))$('#sectionSubtitle').textContent=`${a.length.toLocaleString()} games`;
  if($('#gamesGrid'))$('#gamesGrid').innerHTML=a.slice(0,visible).map(card).join('');
  if($('#emptyState'))$('#emptyState').hidden=!!a.length;
  if($('#loadMoreBtn'))$('#loadMoreBtn').hidden=visible>=a.length;
}
function renderSections(){
  const p=[...ALL].sort((a,b)=>b.quality-a.quality).slice(0,6);
  const n=[...ALL].sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,6);
  if($('#popularGrid'))$('#popularGrid').innerHTML=p.map(card).join('');
  if($('#newGrid'))$('#newGrid').innerHTML=n.map(card).join('');
}
function renderHero(){
  const g=[...ALL].sort((a,b)=>b.quality-a.quality)[0];if(!g)return;
  const hi=$('.hero-image');if(hi)hi.style.backgroundImage=`url("${g.banner||g.image}")`;
  if($('#heroTitle'))$('#heroTitle').textContent=g.title;
  if($('#heroCategory'))$('#heroCategory').textContent=cap(g.category||'Featured');
  if($('#heroDescription'))$('#heroDescription').textContent=(g.description||g.d||`Play ${g.title} online for free.`).toString().slice(0,190);
  $('#heroPlay')?.addEventListener('click',()=>openGame(g.slug));
}
function selectCategory(x){cat=x;query='';visible=PAGE_SIZE;if($('#searchInput'))$('#searchInput').value='';$('#clearSearch')?.classList.remove('show');$$('.cat-pill').forEach(b=>b.classList.toggle('active',b.dataset.cat===x));$$('.side-link[data-cat]').forEach(b=>b.classList.toggle('active',b.dataset.cat===x));closeSearch();render();jumpSection('all-games')}
function setSpecial(t){cat='all';sort=t==='new'?'new':'quality';if($('#sortSelect'))$('#sortSelect').value=sort;query='';if($('#searchInput'))$('#searchInput').value='';closeSearch();visible=PAGE_SIZE;render();jumpSection('all-games')}
function showRecent(){const ids=JSON.parse(localStorage.getItem('gameburst_recent')||'[]');const a=ids.map(id=>ALL.find(g=>g.slug===id)).filter(Boolean);if($('#sectionTitle'))$('#sectionTitle').textContent='Recently Played';if($('#sectionSubtitle'))$('#sectionSubtitle').textContent=`${a.length} games`;if($('#gamesGrid'))$('#gamesGrid').innerHTML=a.map(card).join('');if($('#loadMoreBtn'))$('#loadMoreBtn').hidden=true;jumpSection('all-games')}
function openGame(slugValue){const r=JSON.parse(localStorage.getItem('gameburst_recent')||'[]');localStorage.setItem('gameburst_recent',JSON.stringify([slugValue,...r.filter(x=>x!==slugValue)].slice(0,12)));location.href=`/games/${encodeURIComponent(slugValue)}/`}
function jumpSection(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})}
function resetHome(){cat='all';query='';sort='quality';visible=PAGE_SIZE;if($('#searchInput'))$('#searchInput').value='';$('#clearSearch')?.classList.remove('show');renderSections();render();window.scrollTo({top:0,behavior:'smooth'})}
init();
