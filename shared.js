// ============ SHARED CORE (used by every page) ============
const GB = (function(){

  let ALL_GAMES = null;
  let CATEGORIES = null;

  const EMOJI_MAP = {
    arcade:'👾',puzzle:'🧩',casual:'🎈',adventure:'🗺️',action:'💥','hyper-casual':'⚡',
    animal:'🐾',shooter:'🎯',platformer:'🏃',sports:'⚽','match-3':'💎',ball:'🏀',
    brain:'🧠',monster:'👹',board:'♟️',memory:'🃏',coloring:'🎨','dress-up':'👗',
    racing:'🏎️',clicker:'🖱️',runner:'🏃‍♂️',strategy:'♟️',math:'🔢',car:'🚗',
    simulation:'🛠️','games-for-girls':'💅','two-player':'👥','jigsaw-puzzles':'🧩',
    zombie:'🧟',christmas:'🎄',fighting:'🥊','2048':'🔢',block:'🧱',addictive:'🔥',
    battle:'⚔️','first-person-shooter':'🎯',trivia:'❓',educational:'📚',skill:'🎯',fun:'😄'
  };

  function emojiFor(cat){ return EMOJI_MAP[cat] || '🎮'; }

  function capitalize(s){
    return (s||'').split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  }

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  // Resolve data path relative to page location (works for /game.html and /category.html at root)
  function dataUrl(name){ return 'data/' + name; }

  async function loadData(){
    if(ALL_GAMES && CATEGORIES) return {games:ALL_GAMES, categories:CATEGORIES};
    const [gRes, cRes] = await Promise.all([
      fetch(dataUrl('games.json')),
      fetch(dataUrl('categories.json'))
    ]);
    ALL_GAMES = await gRes.json();
    CATEGORIES = await cRes.json();
    return {games:ALL_GAMES, categories:CATEGORIES};
  }

  function getById(id){
    return ALL_GAMES.find(g=>g.id === id);
  }

  function topCategories(n){
    return Object.entries(CATEGORIES).sort((a,b)=>b[1]-a[1]).slice(0,n);
  }

  // ---- URL helpers ----
  function qs(name){
    return new URLSearchParams(window.location.search).get(name);
  }
  function gameUrlFor(id){ return 'game.html?id=' + encodeURIComponent(id); }
  function categoryUrlFor(cat){ return 'category.html?c=' + encodeURIComponent(cat); }
  function searchUrlFor(q){ return 'search.html?q=' + encodeURIComponent(q); }

  // ---- Card builder (shared across homepage/category/search/related) ----
  function buildCardEl(game, opts){
    opts = opts || {};
    const card = document.createElement('a');
    card.className = 'card';
    card.href = gameUrlFor(game.id);
    if(opts.delay!==undefined) card.style.animationDelay = opts.delay + 's';

    const qualityPct = Math.round((game.q || 0) * 100);
    let badgesHtml = '';
    if(opts.badge === 'top') badgesHtml += '<span class="badge badge-top">★ Top</span>';
    if(opts.badge === 'new') badgesHtml += '<span class="badge badge-new">New</span>';
    if(opts.badge === 'hot' || (!opts.badge && game.q > 0.45)) badgesHtml += '<span class="badge badge-hot">Hot</span>';

    card.innerHTML = `
      <div class="card-thumb-wrap">
        <img class="card-thumb" src="${escapeHtml(game.img)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(game.ban)}'">
        <div class="card-badges">${badgesHtml}</div>
        <span class="card-quality">★ ${qualityPct}</span>
        <div class="card-play-overlay"><div class="play-circle">▶</div></div>
      </div>
      <div class="card-info">
        <p class="card-title">${escapeHtml(game.t)}</p>
        <p class="card-cat">${escapeHtml(capitalize(game.c))}</p>
      </div>
    `;
    return card;
  }

  function buildBannerCardEl(game){
    const card = document.createElement('a');
    card.className = 'banner-card';
    card.href = gameUrlFor(game.id);
    card.innerHTML = `
      <img src="${escapeHtml(game.ban || game.img)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(game.img)}'">
      <div class="banner-card-overlay"><span class="banner-card-title">${escapeHtml(game.t)}</span></div>
    `;
    return card;
  }

  function buildPlayNextItemEl(game){
    const item = document.createElement('a');
    item.className = 'playnext-item';
    item.href = gameUrlFor(game.id);
    item.innerHTML = `
      <img src="${escapeHtml(game.img)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(game.ban)}'">
      <div class="playnext-info">
        <span class="pn-title">${escapeHtml(game.t)}</span>
        <span class="pn-cat">${escapeHtml(capitalize(game.c))}</span>
      </div>
    `;
    return item;
  }

  // ---- Sidebar builder (shared) ----
  function buildSidebar(activeCat){
    const sidebar = document.getElementById('sidebar');
    if(!sidebar) return;

    const primaryLinks = [
      {href:'index.html', ic:'🏠', label:'Home', match:'home'},
      {href:'category.html?c=arcade', ic:'👾', label:'Arcade', match:'x'},
      {href:'all.html?sort=quality', ic:'⭐', label:'Top Rated', match:'top'},
      {href:'all.html?sort=new', ic:'🆕', label:'New Games', match:'new'},
    ];

    let html = `
      <a class="sidebar-logo" href="index.html">
        <span class="sidebar-logo-mark">🕹️</span>
        <span class="sidebar-logo-text">Game<span class="burst">Burst</span></span>
      </a>
      <div class="sidebar-section">
    `;
    primaryLinks.forEach(l=>{
      html += `<a class="side-link" href="${l.href}"><span class="ic">${l.ic}</span><span>${l.label}</span></a>`;
    });
    html += `</div><div class="sidebar-divider"></div>`;
    html += `<div class="sidebar-section"><div class="sidebar-section-label">Categories</div>`;

    topCategories(25).forEach(([cat])=>{
      const isActive = activeCat === cat;
      html += `<a class="side-link${isActive?' active':''}" href="${categoryUrlFor(cat)}"><span class="ic">${emojiFor(cat)}</span><span>${capitalize(cat)}</span></a>`;
    });
    html += `</div>`;

    sidebar.innerHTML = html;
  }

  // ---- Topbar search (shared) ----
  function initTopbarSearch(){
    const input = document.getElementById('globalSearch');
    const suggestBox = document.getElementById('searchSuggest');
    if(!input) return;

    let debounce;
    input.addEventListener('input', ()=>{
      clearTimeout(debounce);
      const val = input.value.trim();
      if(!val){ suggestBox.classList.remove('open'); suggestBox.innerHTML=''; return; }
      debounce = setTimeout(()=>{
        const q = val.toLowerCase();
        const results = ALL_GAMES.filter(g=>g.t.toLowerCase().includes(q)).slice(0,8);
        if(results.length===0){
          suggestBox.innerHTML = '<div class="suggest-item">No games found</div>';
        } else {
          suggestBox.innerHTML = results.map(g=>`
            <a class="suggest-item" href="${gameUrlFor(g.id)}">
              <img src="${escapeHtml(g.img)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(g.ban)}'">
              <span>${escapeHtml(g.t)} <span class="cat">${escapeHtml(capitalize(g.c))}</span></span>
            </a>
          `).join('');
        }
        suggestBox.classList.add('open');
      }, 150);
    });

    input.addEventListener('keydown', e=>{
      if(e.key === 'Enter' && input.value.trim()){
        window.location.href = searchUrlFor(input.value.trim());
      }
    });

    document.addEventListener('click', e=>{
      if(!e.target.closest('.topbar-search')) suggestBox.classList.remove('open');
    });
  }

  // ---- Mobile sidebar toggle (shared) ----
  function initMobileSidebar(){
    const btn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if(!btn || !sidebar) return;
    btn.addEventListener('click', ()=>{
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
    overlay && overlay.addEventListener('click', ()=>{
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  function setGameCounter(){
    const el = document.getElementById('gameCounter');
    if(el) el.textContent = ALL_GAMES.length.toLocaleString();
  }

  return {
    loadData, getById, topCategories, emojiFor, capitalize, escapeHtml, shuffle,
    qs, gameUrlFor, categoryUrlFor, searchUrlFor,
    buildCardEl, buildBannerCardEl, buildPlayNextItemEl,
    buildSidebar, initTopbarSearch, initMobileSidebar, setGameCounter,
    get games(){ return ALL_GAMES; },
    get categories(){ return CATEGORIES; }
  };
})();
