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
- **Midday (12:46 PM):** TQQQ **stopped out**. The stop broke in the 11:25 AM bar (low $77.76). Recorded at $77.89 for a loss of **($20.46)**, about (0.20)% of the book. TQQQ later recovered to $78.75. The 1.2% stop on a 3x ETF was inside normal noise, as the risk manager warned. The book is now all cash; plan 3 (MS) is still evaluated at 3:33 PM.
- **3:34 PM:** plan 3 (MS overnight) **skipped**. MS was $187.17, below the $190.02 trigger, and GS was $897.60, below $905: the GS read-through faded instead of holding. The book goes into CPI flat.

### Day 1 score (Tue Oct 13): **(0.20)%**, ($20.46), gap to 1.5% = (1.70) pts, NOT ACHIEVED

- **Benchmarks:** SPY (0.02)%; buy-and-hold TQQQ (1.24)% (79.61 to 78.62).
- **Trades:** 1, with 0 wins and 1 loss (TQQQ stop). Plans skipped: GS (volume rule) and MS (triggers not met).
- **Lesson:** a 1.2% stop on a 3x ETF fits inside one normal 5-minute swing. Future TQQQ/SOXL stops should be set from recent volatility (about 2 times the 5-minute average true range) with the share count cut to keep the same dollar risk. The alternative is the unleveraged ETF with a tighter stop.
- **Book:** $9,979.54, flat in cash into Wednesday's 8:30 AM CPI and the MS/BAC earnings.

## 2026-10-14 (day 2) plan

The market at 9:49: hot CPI (core +0.3%) was gapped down and then bought back. SPY (0.28)%, QQQ (0.50)%. Semis are the weak group (SOXL (6.0)%, cause unknown). Bonds are bouncing.

- **Kalshi:** no trade. The October FOMC hike contract already went from 15% to about 42%, in line with FedWatch.
- **Plan 1, SOXS opening-range breakdown:** **pending trigger.** After 10:00, a 5-min close with SOXS above $40.31 and SOXL below $117.88. Buy 61 SOXS at about $40.35. Stop $39.00 (about $82 risk), target $42.40, exit 3:45 PM. Cancel if SOXL gets back above $120.90.
- **Plan 2, TQQQ CPI gap-fill:** **pending trigger, lower conviction,** and only if Plan 1 has not triggered. A 5-min close with QQQ above $740.50 and TLT at or above $77.90. Buy 32 TQQQ at about $77.85. Stop $76.55 (about $42 risk), target $79.60, exit 3:45 PM.
- **Plan 3, bonds:** stay out. TBT fails the liquidity rule, and the tape disagrees with the idea.
- Stops are now set from volatility (about 2x today's 5-min range), per the day-1 lesson.
- **10:21 AM trigger check:** neither plan triggered. SOXS 5-min closes stayed between $40.09 and $40.22 (needed above $40.31), and SOXL held above $117.88. QQQ faded to about $736 (Plan 2 needed above $740.50). No entry. The midday cycle re-checks until 12:00.
- **Midday (12:45 PM):** no open positions. Plans 1 and 2 expired untriggered at their 12:00 cutoff. Flat for the rest of the day.

### Day 2 score (Wed Oct 14): **0.00%**, $0.00, gap to 1.5% = (1.50) pts, NOT ACHIEVED

- **Benchmarks:** SPY (1.14)% (778.01 to 769.13); TQQQ (5.94)%; SOXS +12.7% (37.42 to 42.18).
- **Trades:** 0. Both plans expired untriggered at noon.
- **Missed opportunity, recorded honestly:** Plan 1's thesis (semis weak after hot CPI, buy SOXS) was right. SOXS closed at $42.18, just short of the $42.40 target. But the opening-range trigger (a 5-min close above $40.31 before noon) never fired; the breakdown came in the afternoon. A counterfactual fill at $40.35 would have made about +$112 (+1.1%) at the close. Treat that figure as a hypothesis, not a result.
- **Lesson:** a correct thesis plus too strict a trigger window means a missed trade. Next time, keep a breakdown trigger active until 2:30 PM, or enter half size at the open when the thesis is strong and the stop is volatility-based.
- **Running total, 2 days:** (0.20)%. Book $9,979.54. 0 of 2 days at 1.5%.

## 2026-10-15 (day 3) plan

The market at 9:50: semis are breaking down for a second day. TSM is (4.7)% after beating EPS estimates, SOXL is (10.7)%, and SOXS is +10.5%. SPY is (0.42)% and QQQ (1.36)%, while IWM is flat. Bonds are up: TLT +2.0% and TMF +5.9%. Today's 5-min ATR is about 4x Wednesday's.

- **Kalshi:** no trade.
  - The October FOMC hike contract has repriced to 0.27/0.28, down from about 42% on day 2.
  - It settles Oct 28, which is outside the 7-day window, and no live FedWatch figure was available to confirm a view.
- **Plan 1, SOXS:** **entered at half size.**
  - 17 shares at the $47.92 ask (9:52:49 AM), $815 (8.2% of the book).
  - The plan price was $47.02 at 9:50, so the fill paid $0.90 more.
  - **Stop:** $45.50, just under the $45.575 opening-range low. It was raised from the planned $44.20 to keep reward-to-risk at about 1.5:1 after the price moved. Risk is about $41.
  - **Target:** $51.50. **Time exit:** at the 3:50 PM cycle.
  - **Invalidated:** if SOXL makes a 5-min close above $102.50.
  - **Add:** 14 more shares, only if a cycle check shows a SOXS 5-min close above $48.05. Maximum entry $48.60. The stop on all shares stays at $45.50.
- **Plan 2, TMF:** **pending, changed per the risk manager.**
  - **Trigger:** TLT makes a 5-min close above $80.50, seen at the midday check.
  - **Entry:** 50 shares, not 87, at the ask then.
  - **Stop:** entry minus $0.70 (about 2x the ATR, not the $0.40 first proposed). Risk is about $35.
  - **Target:** entry plus $1.40. **Exit:** 3:50 PM.
  - **Cancel:** if TLT is below $80.25.
- **Plan 3, SOXL reversal long:** **vetoed.**
  - The reward-to-risk was 1:1.
  - Its trigger was the same level that invalidates Plan 1, so it would have flipped short to long on the signal that the first thesis failed.
- **Process notes from the risk manager:**
  - Stops and triggers are checked only at cycle times (9:50, 12:45 and 3:50).
  - When a price jumps past a stop, record the fill at the lower of the stop and the open of the first bar that breaks it, not the stop minus $0.01.
  - Never enter at a past trigger bar's price. Enter at the ask seen at the check, and only if the condition still holds.
