# GameBurst 🎮

A free browser-games arcade website — 13,485 games, searchable, filterable by category, playable instantly in a popup.

## Files
- `index.html` — main page
- `style.css` — all styling
- `app.js` — search, filters, grid rendering, game modal
- `data/games.json` — all 13,485 games (auto-generated from your spreadsheet)
- `data/categories.json` — category list with counts

## How to put this on GitHub Pages (step by step)

1. Go to **github.com** → click **+** (top right) → **New repository**.
   - Name it anything, e.g. `gameburst`
   - Set it to **Public**
   - Click **Create repository**

2. On the new repo page, click **"uploading an existing file"** (or "Add file" → "Upload files").

3. Drag and drop **all the files in this folder** (`index.html`, `style.css`, `app.js`, and the whole `data` folder) into the upload box.
   - Make sure `data/games.json` and `data/categories.json` end up inside a folder called `data` in the repo — GitHub's uploader preserves folder structure if you drag the `data` folder itself.

4. Scroll down, click **"Commit changes"**.

5. Go to repo **Settings** → **Pages** (left sidebar).
   - Under "Build and deployment" → Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Click **Save**

6. Wait 1–2 minutes. GitHub will give you a live link like:
   `https://yourusername.github.io/gameburst/`

That's it — your site is live! All 13,485 game URLs are already wired up and will open automatically in the popup player when clicked, no extra work needed.

## Updating with new games later
Just re-generate `data/games.json` from your updated spreadsheet in the same format and re-upload it — the site will pick up new games automatically.
