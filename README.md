# CalcPro — Free Online Calculators

A static, GitHub Pages–friendly calculator site with **185+ tools** across Math, Finance, Health, Geometry, Science, Conversion, Time & Date, Education, Construction and Everyday categories.

## Features
- Light theme UI with dark-mode toggle
- Search, category filter and popular-search chips
- Per-calculator page: formula, worked example, how-to-use steps, FAQs, tips and related tools
- Copy result, copy share link, reset form
- Recently used calculators (stored in the browser only)
- Deep links: every calculator has its own `#id` URL
- No build step, no dependencies, no tracking

## Static pages
Every calculator has its own page at `calculators/<id>.html` with a **450+ word guide** (what it is, what it is used for, step-by-step use, formula, worked example, mistakes, limitations), FAQ schema for search engines, related tools and its own title/meta description. Regenerate them after editing the catalog:

```bash
node build.js   # writes calculators/*.html, sitemap.xml, calculators.json
```

## Files
| File | Purpose |
| --- | --- |
| `index.html` | Page shell and layout |
| `styles.css` | Light/dark theme and all components |
| `app.js` | Calculator catalog + UI logic (exports `calculators` for tests) |
| `test.js` | Node assertions for the catalog and formulas |
| `build.js` | Generates the per-calculator pages and sitemap |
| `calculators/` | 185 generated static calculator pages |

## Validation
```bash
node --check app.js
node test.js
```
The suite checks the catalog size, unique IDs, **unique titles (no duplicate tools)**, formula results and invalid-input handling.

## Deploy to GitHub Pages
1. Run `node build.js`, then push `index.html`, `styles.css`, `app.js`, `build.js`, `test.js`, `sitemap.xml`, `.nojekyll`, `README.md` and the whole `calculators/` folder to the `main` branch root.
2. Repository → **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

```bash
git init
git add .
git commit -m "CalcPro: 185 calculators, premium theme, static pages"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Adding a calculator
Append one object to the `calculators` array in `app.js`:

```js
{id:'unique-id',title:'Tool Name',category:'Math',icon:'🔢',
 description:'One-line description.',
 fields:[['a','First value','number']],
 run:v=>({value:v.a*2,detail:'Optional explanation.'})}
```
Duplicate IDs and duplicate titles are filtered out automatically, so the catalog stays clean.

Health and financial outputs are estimates and should be checked against professional guidance when decisions matter.
