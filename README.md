# GameBurst 🎮 — CrazyGames-style Website

A full multi-page free-games website (13,485 games), styled like CrazyGames: dark navy/purple theme, left icon sidebar, top search bar, homepage sections, category pages, and a single-game player page with an iframe, "Play Next" sidebar, and related games.

## Pages
- `index.html` — Homepage: banner strip, Featured, New, and per-category rows
- `game.html?id=...` — Single game player page (big iframe + sidebar "Play Next" + related games)
- `category.html?c=puzzle` — All games in one category
- `all.html?sort=quality` or `?sort=new` — Browse all games with category chip filters
- `search.html?q=...` — Search results page
- `style.css` — All styling (dark navy/purple CrazyGames-style theme)
- `shared.js` — Shared logic: sidebar, search, card rendering (used by every page)
- `data/games.json` — Your game data (unchanged, same as before)
- `data/categories.json` — Category counts (unchanged, same as before)

## How to upload to GitHub Pages

1. Go to **github.com** → click **+** → **New repository**. Name it (e.g. `gameburst`), set **Public**, click **Create repository**.
2. On the repo page click **"uploading an existing file"** (or Add file → Upload files).
3. Drag and drop **all files in this folder** — `index.html`, `game.html`, `category.html`, `all.html`, `search.html`, `style.css`, `shared.js`, and the whole `data` folder (keep it named `data`).
4. Click **"Commit changes"**.
5. Go to **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder: **/ (root)** → **Save**.
6. Wait 1–2 minutes — your live link will appear, e.g. `https://yourusername.github.io/gameburst/`

Everything is already wired: clicking any game card takes you to its player page and loads the embed URL automatically.

## Updating games later
Only replace `data/games.json` (and `data/categories.json` if categories change) with an updated export in the same format — nothing else needs to change.
