---
name: sprint
description: Run a cycle of the Sprint PAPER book (aggressive, 1.5% daily stretch goal, $10,000 simulated). "open" plans and enters trades after the open, "midday" manages them, "close" exits time-stopped trades, marks the book and scores the day. Paper only; never touches the live account.
---

The Sprint book lives in `trading/books/sprint/`. Every engine command takes `PAPER_BOOK=trading/books/sprint` in front, for example `PAPER_BOOK=trading/books/sprint node trading/paper.js positions`. Paper fills are at the ask (buys) and bid (sells), using quotes you fetched yourself.

## open (about 9:45 AM ET)

1. Read the policy, the positions and the last entry in `reviews.md`. If the drawdown halt is hit, stop and tell the user.
2. In parallel, launch:
   - `sprint-trader`, with the book state and today's catalysts;
   - `prediction-analyst`, for Kalshi events resolving within about 7 days, at an edge of 5 points or more and within the sprint event caps.
3. Send the combined plans to `risk-manager`. Tell it to check them against `trading/books/sprint/policy.json`, and pass `PAPER_BOOK` for its dry run.
4. Record the approved entries with `paper.js trade`, each with a thesis that includes the stop, target and time exit. Write the plan to `reviews.md`.

## midday (about 12:45 PM ET)

Quote every open position. Exit any that hit their stop or target, or whose thesis is invalidated. If the book is down 4% or more on the day, close or hold, but open nothing new.

## close (about 3:50 PM ET)

1. Exit everything whose time exit is today. Overnight holds need a stated reason.
2. Write `trading/books/sprint/prices.json` (`date`, plus a price per held symbol and SPY). Then run `PAPER_BOOK=trading/books/sprint node trading/paper.js value trading/books/sprint/prices.json`.
3. Rebuild the dashboard (`node trading/dashboard/build.js --html <scratchpad>/atlas-insight.html`).
4. Add today's score to `reviews.md`: return, P&L, gap to 1.5%, trades, wins and losses, and the lesson. Commit the `trading/books/sprint/` files and push.
5. Report to the user in two or three lines. After 20 trading days, run the full evaluation listed in `reviews.md`.

## Never

- Never place real orders, and never call Robinhood order tools. This book is paper only.
- Never relax limits, or size up, to hit 1.5%. Report missed days as they are.
