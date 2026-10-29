# Live ETF account

This is **real money**, in the Robinhood account nicknamed "Agentic" (••3612). It is kept separate from the paper portfolio in `trading/`.

- `policy.json` holds the budget, the allowed symbols and the rules. Every order is previewed first and then needs the user's explicit yes in chat.
- `ledger.json` records each filled order: date, side, symbol, quantity, price and order id.

The user unblocked `place_equity_order` and `cancel_equity_order` in `.claude/settings.json` (commit 1789577). Options, crypto and every other account-changing tool remain blocked.

## Plan approved 2026-10-11 (option 3)

1. Sell all 50 MAGS (average cost $60.61). This realizes a gain of about $670.
2. Buy, at limit prices taken from live quotes:

| Symbol | Shares | Share of account |
|---|---|---|
| VTI | 5 | ~48% |
| VXUS | 8 | ~17% |
| BND | 16 | ~28% |
| SGOV | 2 | ~5% |

The buys cost about $3,921 at Sunday-night prices, which leaves about $79 plus the MAGS proceeds as cash.

Timing: Monday Oct 12 after the 9:30 AM ET open. Each order is placed only after the user approves it.
