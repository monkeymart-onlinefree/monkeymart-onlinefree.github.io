# CalcPro Final Website Project

This package consolidates all 22 completed CalcPro batches into one directory-style website.

## What is included
- 216 unique source pages from the master project
- Homepage
- 8 category pages
- All Calculators directory
- Live client-side search page
- HTML sitemap and XML sitemap template
- robots.txt
- Shared `assets/css/global.css` and `assets/js/global.js`
- `MASTER-LIST.csv` and `MASTER-LIST.md`
- `QA-REPORT.md`
- `404.html`

## URL structure
Calculator pages use directory routes, for example:
`/mortgage-calculator/index.html` → public URL `/mortgage-calculator/`.

## Final domain setup
The calculator pages use origin-relative canonicals, so no domain edit is needed there.
XML sitemaps require absolute URLs. Before production deployment run:

`python configure-domain.py https://your-real-domain.com`

This updates `sitemap.xml` and `robots.txt` only.

## Notes
- Two batch-level demo `index.html` files were deliberately excluded.
- One slug was normalized to the master list: `permutation-and-combination-calculator`.
- Calculator-specific inline CSS/JS was retained to preserve each page's unique 3D identity and tested behavior; a shared global layer was added for site-wide navigation/accessibility behavior.
