let allGames = [];

async function initHomePage() {
  const statusEl = document.getElementById('status-msg');
  
  try {
    let res = await fetch('./data/games.json');
    if (!res.ok) res = await fetch('./games.json');

    if (!res.ok) {
      throw new Error("data/games.json file nahi mili.");
    }

    let data = await res.json();
    allGames = Array.isArray(data) ? data : (data.games || data.items || []);

    if (allGames.length === 0) {
      if (statusEl) statusEl.innerHTML = '<p style="color:red;">games.json khali hai.</p>';
      return;
    }

    if (statusEl) statusEl.style.display = 'none';
    renderGrid(allGames);

  } catch (err) {
    console.error("Error:", err);
    if (statusEl) {
      statusEl.innerHTML = `<p style="color:#ef4444;">Error: ${err.message}</p>`;
    }
  }
}

function renderGrid(gamesList) {
  const gridEl = document.getElementById('games-grid');
  if (!gridEl) return;

  gridEl.innerHTML = gamesList.slice(0, 60).map(game => {
    const title = game.title || game.name || (game.slug ? game.slug.replace(/-/g, ' ') : 'Game');
    const slug = game.slug || game.id || title.toLowerCase().replace(/\s+/g, '-');
    
    // 1. JSON me se Image path nikalna
    let rawThumb = game.thumb || game.thumbnail || game.img || game.image || game.icon || game.cover || game.image_url || '';

    let imageSrc = '';

    if (rawThumb) {
      if (rawThumb.startsWith('http') || rawThumb.startsWith('/') || rawThumb.startsWith('./')) {
        imageSrc = rawThumb;
      } else if (rawThumb.startsWith('assets/')) {
        imageSrc = `./${rawThumb}`;
      } else {
        // Agar sirf image ka naam likha ho to assets/ folder me search karein
        imageSrc = `./assets/${rawThumb}`;
      }
    } else {
      // Agar JSON me image key hi na ho
      imageSrc = `./assets/${slug}.png`;
    }

    return `
      <a href="game.html?game=${slug}" class="game-card">
        <img src="${imageSrc}" 
             alt="${title}" 
             onerror="this.onerror=null; this.src='https://via.placeholder.com/150/1e293b/38bdf8?text=${encodeURIComponent(title)}';">
        <p class="card-title">${title}</p>
      </a>
    `;
  }).join('');
}
}

function filterGames() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = allGames.filter(g => {
    const title = (g.title || g.name || g.slug || '').toLowerCase();
    return title.includes(query);
  });
  renderGrid(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('games-grid')) {
    initHomePage();
  }
});