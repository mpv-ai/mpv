# Sprint book log

An aggressive **paper** book ($10,000 simulated). It is testing the user's goal of 1.5% a day, which compounds to about 42x over 252 trading days. No strategy is known to sustain that, so the purpose of this book is to measure the attempt honestly.

**Evaluation:** after 20 trading days, starting 2026-10-13, compare it against SPY, buy-and-hold TQQQ and the long-term paper book. The measures:

- average and median daily return;
- share of days at 1.5% or more;
- maximum drawdown;
- worst day;
- days stopped out.

## 2026-10-13 (day 1) plan

- **Kalshi:** no trade. CPI markets priced near fair; the best lean (headline below 0.6%, about 7 points) rested on an unverified consensus.
- **Plan 1, TQQQ:** **entered**. 31 shares at the $78.55 ask (9:52 AM), $2,435 (24.4%), which is about 73% effective Nasdaq exposure. Stop $77.90 (risk about $20), target $80.20, exit at the 3:50 PM close cycle.
- **Plan 2, GS post-earnings breakout:** **dropped**. Average volume is 2.0M shares a day against the policy's 5M minimum.
- **Plan 3, MS overnight into CPI and MS earnings:** **pending, changed per risk manager.** Evaluate at 3:33 PM:
  - only if MS is above $190.02, GS is at or above $905, TQQQ is flat or being closed, and the day is not at the 4% stop;
  - 5 shares, not 10, because a CPI-plus-earnings gap makes the $180 stop unreliable overnight;
  - time exit 11:00 AM Wednesday.
- **Known gaps:**
  - Stops are checked only at the 12:45 and 3:50 cycles, against intraday lows, and filled at the bid.
  - paper.js does not enforce the position cap or the daily stop; the risk manager checks them by hand.
