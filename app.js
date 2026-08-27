// ============ STATE ============
let ALL_GAMES = [];
let CATEGORIES = {};
let currentCategory = 'all';
let currentQuery = '';
let currentSort = 'quality';
let visibleCount = 48;
const PAGE_SIZE = 48;

const COLOR_ACCENTS = ['c0','c1','c2','c3','c4','c5'];

// ============ DOM ============
const $grid = document.getElementById('gamesGrid');
const $searchInput = document.getElementById('searchInput');
const $clearSearch = document.getElementById('clearSearch');
const $catStrip = document.getElementById('catStrip');
const $sectionTitle = document.getElementById('sectionTitle');
const $sortSelect = document.getElementById('sortSelect');
const $loadMoreBtn = document.getElementById('loadMoreBtn');
const $emptyState = document.getElementById('emptyState');
const $hero = document.getElementById('hero');
const $heroChips = document.getElementById('heroChips');
const $marqueeTrack = document.getElementById('marqueeTrack');
const $gameCountBadge = document.getElementById('gameCountBadge');
const $footerCount = document.getElementById('footerCount');

// modal
const $modalOverlay = document.getElementById('modalOverlay');
const $gameFrame = document.getElementById('gameFrame');
const $modalTitle = document.getElementById('modalTitle');
const $modalLoader = document.getElementById('modalLoader');
const $closeModalBtn = document.getElementById('closeModalBtn');
const $fullscreenBtn = document.getElementById('fullscreenBtn');

// ============ INIT ============
async function init(){
  try{
    const [gamesRes, catsRes] = await Promise.all([
      fetch('data/games.json'),
      fetch('data/categories.json')
    ]);
    ALL_GAMES = await gamesRes.json();
    CATEGORIES = await catsRes.json();
  }catch(e){
    $grid.innerHTML = '<p style="padding:40px;color:#8b84ab;">Could not load game data. Make sure data/games.json is present.</p>';
    console.error(e);
    return;
  }

  $gameCountBadge.textContent = ALL_GAMES.length.toLocaleString();
  $footerCount.textContent = ALL_GAMES.length.toLocaleString();

  buildCategoryStrip();
  buildHeroChips();
  buildMarquee();
  render();

  $searchInput.addEventListener('input', onSearchInput);
  $clearSearch.addEventListener('click', ()=>{ $searchInput.value=''; onSearchInput(); $searchInput.focus(); });
  $sortSelect.addEventListener('change', e=>{ currentSort = e.target.value; visibleCount = PAGE_SIZE; render(); });
  $loadMoreBtn.addEventListener('click', ()=>{ visibleCount += PAGE_SIZE; render(true); });

  $closeModalBtn.addEventListener('click', closeModal);
  $modalOverlay.addEventListener('click', e=>{ if(e.target===$modalOverlay) closeModal(); });
  $fullscreenBtn.addEventListener('click', ()=>{
    if($gameFrame.requestFullscreen) $gameFrame.requestFullscreen();
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
}

// ============ CATEGORY STRIP ============
function buildCategoryStrip(){
  const topCats = Object.entries(CATEGORIES).sort((a,b)=>b[1]-a[1]).slice(0,18);
  const frag = document.createDocumentFragment();

  const allPill = document.createElement('button');
  allPill.className = 'cat-pill active';
  allPill.textContent = `🎲 All Games`;
  allPill.dataset.cat = 'all';
  allPill.addEventListener('click', ()=>selectCategory('all'));
  frag.appendChild(allPill);

  const emojiMap = {arcade:'👾',puzzle:'🧩',casual:'🎈',adventure:'🗺️',action:'💥','hyper-casual':'⚡',animal:'🐾',shooter:'🎯',platformer:'🏃',sports:'⚽','match-3':'💎',ball:'🏀',brain:'🧠',monster:'👹',board:'♟️',memory:'🧠',coloring:'🎨','dress-up':'👗',racing:'🏎️',clicker:'🖱️',runner:'🏃‍♂️',strategy:'♟️',math:'🔢',car:'🚗',simulation:'🛠️',zombie:'🧟',fighting:'🥊'};

  topCats.forEach(([cat,count])=>{
    const pill = document.createElement('button');
    pill.className = 'cat-pill';
    pill.dataset.cat = cat;
    const emoji = emojiMap[cat] || '🎮';
    pill.textContent = `${emoji} ${capitalize(cat)}`;
    pill.addEventListener('click', ()=>selectCategory(cat));
    frag.appendChild(pill);
  });

  $catStrip.appendChild(frag);
}

function selectCategory(cat){
  currentCategory = cat;
  visibleCount = PAGE_SIZE;
  document.querySelectorAll('.cat-pill').forEach(p=>{
    p.classList.toggle('active', p.dataset.cat === cat);
  });
  hideHeroIfNeeded();
  render();
  document.querySelector('.results-bar').scrollIntoView({behavior:'smooth', block:'start'});
}

// ============ HERO CHIPS ============
function buildHeroChips(){
  const picks = ['arcade','puzzle','racing','shooter','coloring','2048','fighting'];
  const frag = document.createDocumentFragment();
  picks.forEach(cat=>{
    if(!CATEGORIES[cat]) return;
    const chip = document.createElement('button');
    chip.className = 'hero-chip';
    chip.textContent = capitalize(cat);
    chip.addEventListener('click', ()=>selectCategory(cat));
    frag.appendChild(chip);
  });
  $heroChips.appendChild(frag);
}

// ============ MARQUEE ============
function buildMarquee(){
  const sample = shuffle([...ALL_GAMES]).slice(0, 24).map(g=>g.t);
  const doubled = [...sample, ...sample];
  $marqueeTrack.innerHTML = doubled.map(t=>`<span>${escapeHtml(t)}</span>`).join('');
}

// ============ SEARCH ============
let searchDebounce;
function onSearchInput(){
  clearTimeout(searchDebounce);
  const val = $searchInput.value;
  $clearSearch.classList.toggle('show', val.length>0);
  searchDebounce = setTimeout(()=>{
    currentQuery = val.trim().toLowerCase();
    visibleCount = PAGE_SIZE;
    hideHeroIfNeeded();
    render();
  }, 180);
}

function hideHeroIfNeeded(){
  const active = currentQuery.length>0 || currentCategory!=='all';
  $hero.style.display = active ? 'none' : '';
}

// ============ FILTER + SORT ============
function getFiltered(){
  let list = ALL_GAMES;
  if(currentCategory !== 'all'){
    list = list.filter(g=>g.c === currentCategory);
  }
  if(currentQuery){
    list = list.filter(g=>
      g.t.toLowerCase().includes(currentQuery) ||
      g.c.toLowerCase().includes(currentQuery)
    );
  }
  const sorted = list.slice();
  if(currentSort === 'quality'){
    sorted.sort((a,b)=>b.q - a.q);
  } else if(currentSort === 'az'){
    sorted.sort((a,b)=>a.t.localeCompare(b.t));
  } else if(currentSort === 'za'){
    sorted.sort((a,b)=>b.t.localeCompare(a.t));
  }
  return sorted;
}

// ============ RENDER ============
function render(appendOnly){
  const filtered = getFiltered();

  // section title
  if(currentQuery){
    $sectionTitle.textContent = `🔎 Results for "${$searchInput.value.trim()}" (${filtered.length.toLocaleString()})`;
  } else if(currentCategory !== 'all'){
    $sectionTitle.textContent = `${capitalize(currentCategory)} Games (${filtered.length.toLocaleString()})`;
  } else {
    $sectionTitle.textContent = '🔥 Trending Now';
  }

  if(filtered.length === 0){
    $grid.innerHTML = '';
    $emptyState.hidden = false;
    $loadMoreBtn.hidden = true;
    return;
  }
  $emptyState.hidden = true;

  const slice = filtered.slice(0, visibleCount);

  if(!appendOnly){
    $grid.innerHTML = '';
  }

  const startIdx = appendOnly ? $grid.children.length : 0;
  const frag = document.createDocumentFragment();

  for(let i=startIdx; i<slice.length; i++){
    frag.appendChild(buildCard(slice[i], i));
  }
  $grid.appendChild(frag);

  $loadMoreBtn.hidden = visibleCount >= filtered.length;
}

function buildCard(game, i){
  const card = document.createElement('div');
  card.className = `card ${COLOR_ACCENTS[i % COLOR_ACCENTS.length]}`;
  card.style.animationDelay = (Math.min(i%PAGE_SIZE,24) * 0.02) + 's';

  const qualityPct = Math.round((game.q || 0) * 100);
  const isHot = game.q > 0.4;

  card.innerHTML = `
    <div class="card-thumb-wrap">
      <img class="card-thumb" src="${escapeHtml(game.img)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.src='${escapeHtml(game.ban)}'">
      ${isHot ? '<span class="card-badge">Hot</span>' : ''}
      <span class="card-quality">★ ${qualityPct}</span>
      <div class="card-play-overlay"><div class="play-btn-circle">▶</div></div>
    </div>
    <div class="card-info">
      <p class="card-title">${escapeHtml(game.t)}</p>
      <p class="card-cat">${escapeHtml(capitalize(game.c))}</p>
    </div>
  `;
  card.addEventListener('click', ()=>openModal(game));
  return card;
}

// ============ MODAL ============
function openModal(game){
  $modalTitle.textContent = game.t;
  $modalLoader.style.display = 'flex';
  $gameFrame.src = game.url;
  $modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  $gameFrame.onload = ()=>{ $modalLoader.style.display = 'none'; };
}

function closeModal(){
  $modalOverlay.classList.remove('open');
  $gameFrame.src = 'about:blank';
  document.body.style.overflow = '';
}

// ============ HELPERS ============
function resetHome(){
  currentCategory = 'all';
  currentQuery = '';
  currentSort = 'quality';
  visibleCount = PAGE_SIZE;
  $searchInput.value = '';
  $clearSearch.classList.remove('show');
  $sortSelect.value = 'quality';
  document.querySelectorAll('.cat-pill').forEach(p=>p.classList.toggle('active', p.dataset.cat==='all'));
  $hero.style.display = '';
  render();
  window.scrollTo({top:0, behavior:'smooth'});
}

function capitalize(s){
  return (s||'').split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}

init();
