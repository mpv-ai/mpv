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

## 2026-10-11 (second review: satellites and Kalshi)

- **Targets:** unchanged at 45/15/25/3/5/7. Core and crypto were set hours earlier and haven't drifted, so the strategist and crypto analyst were not re-run.
- **Satellites:** bought 8 CB, 4 GD and 13 COP at the ask.
  - **Chubb (CB):** underwriting discipline, about 12x core EPS, buybacks. Fair value $330–385. Kill if there are reserve charges two quarters running or the ex-cat combined ratio goes above 88%.
  - **General Dynamics (GD):** a half position. Record backlog, and the stock is at the low end of its 19–22x range. Add 4 shares after the Oct 30 report if guidance holds.
  - **ConocoPhillips (COP):** a half position. Low-cost E&P, a $7B FCF step-up by 2029, and an inflation hedge. Add only below about $120.
  - **Passed:** Duke (DUK) is a HOLD because it adds rate risk on top of BND; buy below about $105. Pepsi (PEP) was the runner-up, but has an unexplained Robinhood "CC0" flag.
- **Kalshi:** no trade. The Fed, CPI and jobs markets are deep and priced within about 2 points of the analyst's own estimates.
- **Options:** none. No position is big enough to cover a call, and cash-secured puts would need $13k or more.
- **Risk manager:** minCashPct applies to free cash alone, not including SGOV. Sold 9 SGOV to keep free cash at or above 2%.
- **Book after:** $99,933.20. Free cash is $2,065.63 (2.07%), SGOV is 4.0%, and satellites are 5.8%.
- **Open items:**
  - The GD add (about $1,330) must be funded from SGOV or a VTI trim, not from free cash.
  - With both adds done, the satellite sleeve is about 8.9%. Size the adds so it stays nearer 7%.
  - Earnings: CB on Oct 20, GD on Oct 30, COP on Nov 5. TRV on Oct 16 is an early read on commercial insurance pricing.
