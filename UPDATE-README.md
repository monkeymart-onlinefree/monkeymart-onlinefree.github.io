# CalcPro updated website — 24 September 2026

## Delivered
- All 245 original archive files retained; calculator URLs retained.
- 212 mapped pages have linked Home / Main category / Subcategory / Tool breadcrumbs and matching BreadcrumbList data.
- 10 main categories and 39 static subcategory pages match the supplied spreadsheet.
- Category lists, counts, homepage cards, mobile menu, search categories and sitemaps updated.
- Tags open complete subcategory listings; category search works locally with no server API.
- Shared small-screen, table-scroll, focus, reduced-motion and print styles added.
- Result-table CSV download and print/PDF buttons added where applicable.
- Amortization: full schedules, yearly view, dated monthly/yearly extras, up to ten one-time payments, payoff date, totals and savings.
- Loan: full schedule instead of 24 rows, numerically stable payment formula.
- Interest: annual deposits, contribution timing, additional months and closed-form calculation.

## Verification and remaining work
- 11,438 local links checked; zero missing targets.
- 212 spreadsheet memberships and breadcrumbs verified; all 39 subcategory memberships verified.
- 512 mathematical assertions and 15 UI-handler assertions passed for changed finance calculators.
- 214 inline scripts and shared JavaScript files passed syntax compilation.
- Full desktop/mobile visual tests could not run: Chromium was unavailable and browser downloads failed. Responsive styling is implemented, but visual correctness is not certified.
- Numerical correctness of every pre-existing calculator was NOT revalidated.
- Every mapped page is covered in REFERENCE-REVIEW.md. This is an input/feature inventory, not complete feature parity. Remaining examples include advanced mortgage costs/extras, loan bond/deferred modes, and pediatric BMI percentiles. Automated candidate differences require manual confirmation.
- Live site speed was not benchmarked against Calculator.net. The small local benchmark in UPDATE-QA.json is calculation-only and is not a browser speed claim.

## Use
Extract the entire ZIP. Open index.html or use OPEN-CALCPRO.bat. Upload the whole extracted folder to your static host, preserving its directory structure. Do not upload only the calculator HTML files: the shared assets are required.

Before public deployment, run `python configure-domain.py https://your-real-domain.com` for sitemap/robots configuration. The original hostname template remains until you configure it.

## Reference files
- CATEGORY-MAPPING.csv: current route/category/subcategory mapping.
- REFERENCE-REVIEW.md: page-by-page source links, scope and remaining differences.
- FORMULA-UPDATE-NOTES.md: implemented changes for the three revised calculators.
- UPDATE-QA.json: machine-readable verification summary.
- Original formula workbooks and prior reports are retained as historical source files. They predate the changes above; use these update notes for the revised calculators.
