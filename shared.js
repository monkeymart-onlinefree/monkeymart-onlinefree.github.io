// ============ SHARED CORE (used by every page) ============
const GB = (function(){

  let ALL_GAMES = null;
  let CATEGORIES = null;

  // ROOT_PREFIX lets this same shared.js work both at site root (index.html, category.html, etc.)
  // and two levels deep inside /game/<slug>/index.html. Set window.GB_ROOT_PREFIX = '../../'
  // in pages that live inside game/<slug>/ before loading shared.js.
  const ROOT_PREFIX = (typeof window !== 'undefined' && window.GB_ROOT_PREFIX) ? window.GB_ROOT_PREFIX : '';

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

  // Resolve data path relative to page location (works at root and inside game/<slug>/)
  function dataUrl(name){ return ROOT_PREFIX + 'data/' + name; }

  async function loadData(){
    if(ALL_GAMES && CATEGORIES) return {games:ALL_GAMES, categories:CATEGORIES};
    const [gRes, cRes] = await Promise.all([
      fetch(dataUrl('games.json')),
      fetch(dataUrl('categories.json'))
    ]);
    ALL_GAMES = await gRes.json();
    CATEGORIES = await cRes.json();

    // img/ban/url are 100% derivable from slug (verified across all games), so they're
    // not stored in the JSON file to keep it small. Reconstruct them once here.
    for(const g of ALL_GAMES){
      g.img = `https://img.gamepix.com/games/${g.slug}/icon/${g.slug}.png?w=105`;
      g.ban = `https://img.gamepix.com/games/${g.slug}/cover/${g.slug}.png?w=320`;
      g.url = `https://play.gamepix.com/${g.slug}/embed?sid=1`;
    }

    return {games:ALL_GAMES, categories:CATEGORIES};
  }

  function getById(id){
    return ALL_GAMES.find(g=>g.id === id);
  }

  function getBySlug(slug){
    return ALL_GAMES.find(g=>g.slug === slug);
  }

  function topCategories(n){
    return Object.entries(CATEGORIES).sort((a,b)=>b[1]-a[1]).slice(0,n);
  }

  // ---- URL helpers ----
  function qs(name){
    return new URLSearchParams(window.location.search).get(name);
  }
  function gameUrlFor(game){
    // Accepts either a game object or a raw slug string
    const slug = (game && typeof game === 'object') ? game.slug : game;
    return ROOT_PREFIX + 'game/' + encodeURIComponent(slug) + '/';
  }
  function categoryUrlFor(cat){ return ROOT_PREFIX + 'category.html?c=' + encodeURIComponent(cat); }
  function searchUrlFor(q){ return ROOT_PREFIX + 'search.html?q=' + encodeURIComponent(q); }

  // ---- Card builder (shared across homepage/category/search/related) ----
  function buildCardEl(game, opts){
    opts = opts || {};
    const card = document.createElement('a');
    card.className = 'card';
    card.href = gameUrlFor(game);
    if(opts.delay!==undefined) card.style.animationDelay = opts.delay + 's';

    const qualityPct = Math.round((game.q || 0) * 100);
    let badgesHtml = '';
    if(opts.badge === 'top') badgesHtml += '<span class="badge badge-top">★ Top</span>';
    if(opts.badge === 'new') badgesHtml += '<span class="badge badge-new">New</span>';
    if(opts.badge === 'hot' || (!opts.badge && game.q > 0.45)) badgesHtml += '<span class="badge badge-hot">Hot</span>';

    card.innerHTML = `
      <div class="card-thumb-wrap">
        <img class="card-thumb" src="${escapeHtml(game.ban)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(game.img)}'">
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
    card.href = gameUrlFor(game);
    card.innerHTML = `
      <img src="${escapeHtml(game.ban || game.img)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(game.img)}'">
      <div class="banner-card-overlay"><span class="banner-card-title">${escapeHtml(game.t)}</span></div>
    `;
    return card;
  }

  function buildPlayNextItemEl(game){
    const item = document.createElement('a');
    item.className = 'playnext-item';
    item.href = gameUrlFor(game);
    item.innerHTML = `
      <img src="${escapeHtml(game.img)}" alt="${escapeHtml(game.t)}" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(game.ban)}'">
      <div class="playnext-info">
        <span class="pn-title">${escapeHtml(game.t)}</span>
        <span class="pn-cat">${escapeHtml(capitalize(game.c))}</span>
      </div>
    `;
    return item;
  }

  // ---- Topbar right-side icons (Friends / My games / Notifications / Log in) ----
  // Appends the CrazyGames-style icon buttons after whatever is already in #topbarRight
  // (e.g. the game counter), rather than replacing it.
  function buildTopbarRight(){
    const el = document.getElementById('topbarRight');
    if(!el) return;
    const extra = document.createElement('div');
    extra.className = 'topbar-right-icons';
    extra.innerHTML = `
      <button class="tb-icon-btn tb-text-btn" title="Friends">
        <svg viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.67 0-8 1.34-8 4v3h9.5v-3c0-1.06.34-2.6 1.5-3.9-.75-.1-1.4-.1-3-.1zM16 13c-.29 0-.62.02-.97.05C16.19 14.35 17 15.9 17 17v3h7v-3c0-2.66-5.33-4-8-4z" fill="currentColor"/></svg>
        <span>Friends</span>
      </button>
      <button class="tb-icon-btn tb-text-btn" title="My games">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>
        <span>My games</span>
      </button>
      <button class="tb-icon-btn" title="Notifications">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 2a6 6 0 0 0-6 6v3.09c0 .58-.2 1.14-.57 1.59L4 15h16l-1.43-2.32a2.5 2.5 0 0 1-.57-1.59V8a6 6 0 0 0-6-6zM9.5 18a2.5 2.5 0 0 0 5 0h-5z" fill="currentColor"/></svg>
      </button>
      <button class="pill-btn primary" id="loginBtn">Log in</button>
    `;
    el.appendChild(extra);
  }

  // ---- Sidebar builder (shared) ----
  function buildSidebar(activeCat){
    const sidebar = document.getElementById('sidebar');
    if(!sidebar) return;

    const primaryLinks = [
      {href:ROOT_PREFIX+'index.html', ic:'🏠', label:'Home', match:'home'},
      {href:ROOT_PREFIX+'category.html?c=arcade', ic:'👾', label:'Arcade', match:'x'},
      {href:ROOT_PREFIX+'all.html?sort=quality', ic:'⭐', label:'Top Rated', match:'top'},
      {href:ROOT_PREFIX+'all.html?sort=new', ic:'🆕', label:'New Games', match:'new'},
    ];

    let html = `
      <a class="sidebar-logo" href="${ROOT_PREFIX}index.html">
        <img class="sidebar-logo-icon" src="${ROOT_PREFIX}assets/logo-icon.png" alt="">
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
            <a class="suggest-item" href="${gameUrlFor(g)}">
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

  // ---- Ad-blocker detection ----
  // Creates a hidden bait element styled like a typical ad unit. If an ad blocker
  // hides/removes it (as most extensions do based on class/id name patterns),
  // we detect the missing dimensions and show the overlay.
  function detectAdBlock(onDetected){
    const bait = document.createElement('div');
    bait.className = 'adsbox ad-banner ads advertisement';
    bait.style.cssText = 'width:1px;height:1px;position:absolute;left:-9999px;top:-9999px;';
    bait.innerHTML = '&nbsp;';
    document.body.appendChild(bait);

    setTimeout(()=>{
      const blocked = (
        bait.offsetParent === null ||
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        window.getComputedStyle(bait).display === 'none' ||
        window.getComputedStyle(bait).visibility === 'hidden'
      );
      document.body.removeChild(bait);
      if(blocked && typeof onDetected === 'function') onDetected();
    }, 120);
  }

  // Wires up the standard adblock-overlay markup (see game page) with a Refresh button.
  function initAdblockOverlay(){
    const overlay = document.getElementById('adblockOverlay');
    if(!overlay) return;
    detectAdBlock(()=>{
      overlay.classList.add('show');
    });
    const refreshBtn = document.getElementById('adblockRefreshBtn');
    refreshBtn && refreshBtn.addEventListener('click', ()=> window.location.reload());
  }

  return {
    loadData, getById, getBySlug, topCategories, emojiFor, capitalize, escapeHtml, shuffle,
    qs, gameUrlFor, categoryUrlFor, searchUrlFor,
    buildCardEl, buildBannerCardEl, buildPlayNextItemEl,
    buildSidebar, buildTopbarRight, initTopbarSearch, initMobileSidebar, setGameCounter,
    detectAdBlock, initAdblockOverlay,
    rootPrefix: ROOT_PREFIX,
    get games(){ return ALL_GAMES; },
    get categories(){ return CATEGORIES; }
  };
})();
