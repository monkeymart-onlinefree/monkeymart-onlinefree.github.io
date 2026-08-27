const PAGE_SIZE=48;let ALL=[],CATS={},cat="all",query="",sort="quality",visible=PAGE_SIZE,searchTimer;
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const icon=t=>`<span class="side-icon ico-${t}" aria-hidden="true"></span>`;
async function init(){
  try{ALL=await(await fetch("data/games.json",{cache:"no-store"})).json();CATS=await(await fetch("data/categories.json",{cache:"no-store"})).json()}
  catch(e){console.error("Game data failed:",e);showEmpty("Game data could not be loaded.")}
  buildNavigation();renderHero();renderSections();bind();readQuery();render();
}
function buildNavigation(){
  const entries=Object.entries(CATS).sort((a,b)=>b[1]-a[1]);
  $("#catStrip").innerHTML=`<button class="cat-pill active" data-cat="all">All</button>`+
    entries.slice(0,24).map(([c])=>`<button class="cat-pill" data-cat="${esc(c)}">${esc(cap(c))}</button>`).join("");
  $("#sideCategories").innerHTML=entries.map(([c,n])=>`<button class="side-link" data-cat="${esc(c)}" onclick="selectCategory(${JSON.stringify(c)})">${icon("grid")}<span>${esc(cap(c))}</span></button>`).join("");
  $("#sideHome").innerHTML=icon("home")+"<span>Home</span>";
  $("#sideNew").innerHTML=icon("star")+"<span>New Games</span>";
  $("#sidePopular").innerHTML=icon("fire")+"<span>Popular</span>";
  $("#sideRated").innerHTML=icon("star")+"<span>Top Rated</span>";
  $("#sideRecent").innerHTML=icon("clock")+"<span>Recently Played</span>";
  $("#catStrip").onclick=e=>{const b=e.target.closest("[data-cat]");if(b)selectCategory(b.dataset.cat)};
}
function bind(){
  const input=$("#searchInput");
  input.addEventListener("input",onSearch);
  input.addEventListener("change",onSearch);
  input.addEventListener("keyup",e=>{if(e.key==="Enter"){e.preventDefault();query=input.value.trim();visible=PAGE_SIZE;closeSearchResults();render();jumpSection("all-games")}});
  input.addEventListener("focus",()=>{if(input.value.trim())renderSearchResults(input.value)});
  $("#clearSearch").onclick=()=>{input.value="";query="";visible=PAGE_SIZE;$("#clearSearch").classList.remove("show");closeSearchResults();setURL();render()};
  $("#sortSelect").onchange=e=>{sort=e.target.value;visible=PAGE_SIZE;render()};
  $("#loadMoreBtn").onclick=()=>{visible+=PAGE_SIZE;render()};
  $("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
  $("#mobileSearch").onclick=()=>{$(".search-wrap").classList.toggle("mobile-open");input.focus()};
  document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))closeSearchResults()});
}
function onSearch(e){
  query=e.target.value.trim();visible=PAGE_SIZE;$("#clearSearch").classList.toggle("show",!!query);
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>{setURL();render();if(query)renderSearchResults(query);else closeSearchResults()},80);
}
function readQuery(){const p=new URLSearchParams(location.search);const q=p.get("q");if(q){query=q;$("#searchInput").value=q;$("#clearSearch").classList.add("show")}}
function setURL(){const u=new URL(location.href);if(query)u.searchParams.set("q",query);else u.searchParams.delete("q");history.replaceState({}, "", u)}
function normalized(s){return String(s||"").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g," ").replace(/\s+/g," ").trim()}
function filtered(){
  let a=ALL.filter(g=>cat==="all"||g.category===cat);
  if(query){const q=normalized(query);a=a.filter(g=>normalized(g.title).includes(q)||normalized(g.namespace).includes(q)||normalized(g.category).includes(q))}
  if(sort==="az")a.sort((x,y)=>String(x.title).localeCompare(String(y.title)));
  else if(sort==="za")a.sort((x,y)=>String(y.title).localeCompare(String(x.title)));
  else if(sort==="new")a.sort((x,y)=>new Date(y.date_published||0)-new Date(x.date_published||0));
  else a.sort((x,y)=>Number(y.quality_score||0)-Number(x.quality_score||0));
  return a;
}
function render(){
  const a=filtered();
  $("#sectionTitle").textContent=query?`Search results for "${query}"`:cat==="all"?"All Games":cap(cat)+" Games";
  $("#sectionSubtitle").textContent=`${a.length.toLocaleString()} games`;
  $("#gamesGrid").innerHTML=a.slice(0,visible).map(card).join("");
  $("#emptyState").hidden=!!a.length;
  $("#loadMoreBtn").hidden=visible>=a.length;
}
function renderSearchResults(q){
  const n=normalized(q),results=ALL.filter(g=>normalized(g.title).includes(n)||normalized(g.namespace).includes(n)||normalized(g.category).includes(n)).slice(0,7);
  if(!results.length){$("#searchResults").innerHTML=`<div class="search-footer">No matching games. Press Enter to see the full results.</div>`;$("#searchResults").classList.add("show");return}
  $("#searchResults").innerHTML=results.map(g=>`<a class="search-result" href="games/${encodeURIComponent(g.namespace||slug(g.title))}/"><img src="${esc(g.banner_image||g.image)}" alt=""><div><div class="search-result-title">${esc(g.title)}</div><div class="search-result-cat">${esc(cap(g.category))}</div></div></a>`).join("")+`<div class="search-footer">Showing ${results.length} matches · Press Enter for all results</div>`;
  $("#searchResults").classList.add("show");
}
function closeSearchResults(){$("#searchResults").classList.remove("show")}
function renderHero(){
  const g=[...ALL].sort((a,b)=>Number(b.quality_score||0)-Number(a.quality_score||0))[0];if(!g)return;
  $(".hero-image").style.backgroundImage=`url("${esc(g.banner_image||g.image)}")`;
  $("#heroTitle").textContent=g.title;$("#heroCategory").textContent=cap(g.category||"Featured");
  $("#heroDescription").textContent=(g.description||`Play ${g.title} online in your browser.`).slice(0,190);
  $("#heroPlay").onclick=()=>openGame(g.namespace||slug(g.title));
}
function renderSections(){
  const p=[...ALL].sort((a,b)=>Number(b.quality_score||0)-Number(a.quality_score||0)).slice(0,6);
  const n=[...ALL].sort((a,b)=>new Date(b.date_published||0)-new Date(a.date_published||0)).slice(0,6);
  $("#popularGrid").innerHTML=p.map(card).join("");$("#newGrid").innerHTML=n.map(card).join("");
}
function card(g){const ns=g.namespace||slug(g.title);return `<article class="game-card" onclick="openGame(${JSON.stringify(ns)})"><div class="thumb"><img src="${esc(g.banner_image||g.image)}" alt="${esc(g.title)}" loading="lazy" onerror="this.src='${esc(g.image||"")}'"><div class="play-overlay"><span class="play-button" aria-hidden="true"></span></div></div><div class="game-info"><p class="game-title">${esc(g.title)}</p><div class="game-cat">${esc(cap(g.category))}</div></div></article>`}
function openGame(ns){const r=JSON.parse(localStorage.getItem("gameburst_recent")||"[]");localStorage.setItem("gameburst_recent",JSON.stringify([ns,...r.filter(x=>x!==ns)].slice(0,12)));location.href=`games/${encodeURIComponent(ns)}/`}
function selectCategory(x){cat=x;query="";$("#searchInput").value="";$("#clearSearch").classList.remove("show");visible=PAGE_SIZE;$$(".cat-pill").forEach(b=>b.classList.toggle("active",b.dataset.cat===x));$$(".side-link[data-cat]").forEach(b=>b.classList.toggle("active",b.dataset.cat===x));setURL();closeSearchResults();render();jumpSection("all-games")}
function setSpecial(t){cat="all";sort=t==="new"?"new":"quality";$("#sortSelect").value=sort;query="";$("#searchInput").value="";$("#clearSearch").classList.remove("show");visible=PAGE_SIZE;setURL();render();jumpSection("all-games")}
function showRecent(){const ids=JSON.parse(localStorage.getItem("gameburst_recent")||"[]");const a=ids.map(ns=>ALL.find(g=>(g.namespace||slug(g.title))===ns)).filter(Boolean);$("#sectionTitle").textContent="Recently Played";$("#sectionSubtitle").textContent=`${a.length} games`;$("#gamesGrid").innerHTML=a.map(card).join("");$("#loadMoreBtn").hidden=true;$("#emptyState").hidden=!!a.length;jumpSection("all-games")}
function jumpSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}
function resetHome(){cat="all";query="";sort="quality";visible=PAGE_SIZE;$("#searchInput").value="";$("#clearSearch").classList.remove("show");setURL();renderSections();render();window.scrollTo({top:0,behavior:"smooth"})}
function showEmpty(t){$("#gamesGrid").innerHTML="";$("#emptyState").hidden=false;$("#emptyState").querySelector("span").textContent=t}
function cap(s){return String(s||"").replace(/[-_]+/g," ").replace(/\b\w/g,x=>x.toUpperCase())}
function slug(s){return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function esc(s){const d=document.createElement("div");d.textContent=s??"";return d.innerHTML}
init();