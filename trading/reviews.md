# Review log

Each review records the targets it traded to, so the next one checks against them rather than the defaults in `policy.json`.

## 2026-10-11 (opening build)

- **Targets:** us_equity 45, intl_equity 15, bonds 25, crypto 3, cash 5, satellite 7.
- **Why:** bonds +5 / US equity −5 vs policy. The 10-year is 5.24% (a real yield of about 2.8%) and the S&P 500 is at records, so the extra return from stocks over bonds is thin.
- **Funds:** VTI, VXUS, BND, SGOV. Crypto is BTC/ETH 70/30.
- **Trades:** bought 118 VTI, 176 VXUS, 355 BND, 49 SGOV, 0.024818 BTC, 0.349795 ETH. All filled at the ask, a deliberately conservative choice.
- **Book after:** $99,943.80. Cash is $6,969.51 (7.0%) plus SGOV at 4.9%.
- **Open items for next review:**
  - The satellite sleeve is 0% against a 7% target. That is an accepted exception for the opening build; pick names next review.
  - Avoid mega-cap US tech for satellites, or count look-through: VTI already holds about 2.5–3% each in NVDA, MSFT and AAPL.
  - Rates risk: a 100bp rise in yields costs about 1.5% of the book through BND. In an inflation-driven regime, stocks and bonds can fall together.
  - No options yet. Covered calls need 100 shares per contract, and only VTI qualifies (118 shares).
