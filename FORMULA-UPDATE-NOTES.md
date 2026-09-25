# Formula update notes

The uploaded CONTENT-FORMULA-MAP workbook is preserved as an original reference; these notes supersede it only for the following three tools.

## Amortization
The required payment is P*r / (1-(1+r)^(-n)), computed with log1p/expm1 for numerical stability. At zero rate it is P/n. Monthly interest is opening balance*r. Scheduled and extra payments reduce the balance, capped at the amount owed. Extra monthly payments start at the selected month; yearly extras recur every 12 months from their selected month; one-time amounts are combined if they share a month. Dates label regular monthly payments and do not introduce daily accrual. Internal amounts are unrounded; display amounts are rounded to cents. The final payment clears the residual balance. Fees, penalties and irregular-day interest are excluded. Term range: 1–12,000 whole months. The yearly table groups by calendar year.

## Loan
The original fixed-rate monthly-payment model remains. Payment calculation now uses the stable expression above. The full amortization table is rendered, replacing the old first-24-payment limit. Range: 1–12,000 months. No deferred-payment, bond or non-monthly mode was added.

## Interest
Monthly growth factor g=(1+annualNominalRate/compoundingFrequency)^(compoundingFrequency/12). Monthly deposits use the geometric-series future value; beginning-period deposits receive one additional monthly growth factor. Yearly deposits occur at 12-month intervals. Beginning deposits occur at month 0, 12, 24… within a positive term, and end deposits at 12, 24, 36…. A zero-month term adds no deposits. Additional months are included in both growth and inflation adjustment. Tax remains a one-time estimate on positive total interest; it is not annual tax drag. Terms range from 0 to 12,000 months. Negative nominal rates greater than -100% remain supported. The original effective-monthly approximation for non-monthly compounding remains explicit.

Validation: 512 mathematical assertions across zero/near-zero/negative growth, timing, partial years, early payoff, oversized extras, principal reconciliation and invalid ranges; 15 minimal-DOM interface assertions. These are not browser layout tests.
