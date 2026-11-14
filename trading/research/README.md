# Strategy research (Oct 25, 2026)

Data: Robinhood bars saved in `data/`. Daily bars run from 2016 to Oct 23, 2026. QQQ 10-minute bars cover Feb 19 to Oct 23, 2026; that is as far back as Robinhood keeps real intraday bars. Every trade is charged slippage per side: 0.02% on index ETFs and 0.05% on 3x ETFs.

- `node trading/research/backtest.js` tests every candidate setup.
- `node trading/research/meanrev.js` runs the robustness grid and the portfolio for the setup that passed.
- `node trading/research/signals.js` shows today's signal for each sleeve.

## What failed

Opening-range breakout, the rule used in sprint days 5 to 9, loses over 169 days of QQQ data at 3x leverage. It loses in every variant tested:

| Variant | Trades | Win rate | Return per trade | t-stat |
|---|---|---|---|---|
| Current sprint rule | 169 | 46% | −0.17% | −1.2 |
| Long only | 119 | 50% | −0.06% | — |
| Short only | 101 | 40% | −0.29% | — |
| 60-minute range | 158 | — | −0.07% | — |
| 10-minute range | 172 | — | −0.24% | — |

The other intraday rules also had no edge:

- **Intraday momentum** (the last half hour follows the first half hour): −0.06% per trade.
- **Open-to-close** and **close-to-open**, trading every day: no edge after 2022.

The 9-day paper record (1 win in 7 trades) was not bad luck. The method has no edge.

## What works: buy a short dip in an uptrend, hold 1 to 10 days

**Rule:**

- **Entry:** the index (SPY, QQQ, IWM or SOXX) closes above its 200-day SMA, and its 2-day RSI is below 10. Buy that index's 3x ETF (UPRO, TQQQ, TNA or SOXL) at the close.
- **Exit:** the first close above the 5-day SMA, or the close 10 trading days after entry.

This is the Connors RSI(2) pullback rule. It was published years ago, so these results do not come from fitting the rule to this data.

| Out-of-sample, 2022 to 2026, per trade on the 3x ETF | Trades | Win rate | Return per trade | t-stat |
|---|---|---|---|---|
| UPRO | 45 | 76% | +1.74% | 3.1 |
| TQQQ | 43 | 72% | +1.91% | 2.6 |
| TNA | 34 | 71% | +1.63% | 1.9 |
| SOXL | 33 | 64% | +2.99% | 1.8 |

**Robustness:** I tried 14 variants: RSI below 5, 10, 15 or 20; 2, 3 or 4 down closes; and two exits. Almost every variant on SPY, QQQ and SOXX is positive both in-sample (2016 to 2021) and out-of-sample. Small changes to the rule don't break it. TNA in-sample is the weak spot.

**Portfolio:** four equal sleeves, each in cash when it has no signal.

| Period | CAGR | Max drawdown | Trades per year | Win rate | Days in the market |
|---|---|---|---|---|---|
| 2016 to 2021 | 7.2% | −38.6% | 33 | 64% | 24% |
| 2022 to 2026 | 17.8% | −14.3% | 32 | 71% | 22% |

**Things that made it worse:**

- A close-based stop at −10% or −15%. Mean reversion needs room, and stops cut the trades that recover.
- A 5-day maximum hold instead of 10 days.

**Risks:**

- The worst single portfolio day was −13%, in March 2020.
- The 2016 to 2021 drawdown reached −38.6%.
- The single worst trade was SOXL −27.6% in Oct 2026.
- The edge is about +0.07% a day on average across the book. It is nowhere near 1.5% a day; no tested rule comes close to that.

**Execution notes:**

- Signals are checked about 3:50 PM ET using the live price. Orders are fractional market buys or sells in regular hours.
- The backtest fills at the official close, so real fills at 3:55 will differ slightly.
- In a cash account each sleeve buys with settled cash. Sale proceeds settle the next day.
