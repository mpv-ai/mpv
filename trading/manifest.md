# Policy manifest (v1, effective 2026-10-12)

This is what the CIO cycle loads first. If it conflicts with an agent prompt, it wins. Changes need the user's explicit approval and a new version line.

## Books

| Book | Mode | Venue | Authority |
|---|---|---|---|
| Live ETF account | LIVE, real money | Robinhood "Agentic" cash account ••3612 | ETFs only (buy VTI, VXUS, BND, SGOV; also sell MAGS). Limit orders. Budget $4,000. **The user's explicit yes on every order.** No standing approval. |
| Paper portfolio | PAPER | Simulated $100,000 (`trading/paper.js`) | Stocks, ETFs, options, crypto and Kalshi events, within `trading/policy.json`. |
| Kalshi / prediction markets | PAPER only | Public Kalshi data (`trading/kalshi.js`) | No live account. Robinhood's prediction markets have no connector tools. |

## Limits (sources)

- **Live:** `trading/live/policy.json`.
- **Paper:**
  - `trading/policy.json`: max 8% in a single stock, 5% crypto, 5% option premium, 2% events (0.5% per market); free cash at least 2%; no margin; no naked short options.
- **Event entry:**
  - edge of at least 8 points after the spread;
  - resolves within 90 days;
  - never both sides of a market.
- **Review targets:** `trading/reviews.md`, latest entry.

## Blocked actions (`.claude/settings.json`)

All Robinhood option and crypto orders, exercises, watchlist, alert and scan changes. `place_equity_order` and `cancel_equity_order` were unblocked by the user in commit 1789577.

## Goals

- **Stretch:** 2% net daily return, tracked by ATLAS Insight for each book. It is not a quota and never a reason to raise risk.
- **Benchmarks:** the paper portfolio against SPY over the same snapshots; the live account against its target ETF mix.

## Gaps against the owner's ATLAS specs

- No live prediction-market account (Kalshi, Polymarket US, Novig): weather trades are paper only.
- NWS data hosts are blocked by the network policy. Allow `api.weather.gov` and `forecast.weather.gov` for primary weather data.
- There is no background server, so the dashboard is a snapshot rebuilt each cycle, not a live feed.
- Forecast scoring (Brier score, calibration) starts once paper weather contracts settle. The sample size is 0 today.
