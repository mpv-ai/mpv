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
- **Midday (12:45 PM):** SOXS was **stopped out**.
  - **The stop:** it broke in the 10:45 AM bar (open $45.82, low $45.42). It was recorded at the $45.50 stop for a loss of **($41.14)**, about (0.41)% of the book.
  - **What happened:** semis reversed hard. SOXL went from $95.6 at 9:55 to $104.4. SOXL's 5-min close above $102.50 at 10:55 would have invalidated the trade anyway.
  - **SOXS add:** the 9:55 bar closed at $48.21, above the $48.05 trigger, but no cycle check saw it. Under the no-hindsight rule there was no add, which avoided about $40 more loss.
  - **TMF:** TLT closed a 5-min bar at $80.53 at 10:35, but no cycle check saw it either. It then fell below the $80.25 cancel line, and TLT is $80.05 now. Plan cancelled, no entry.
  - **Book:** all cash, $9,938.40. The day is at (0.41)%, far from the 4% stop.

### Day 3 score (Thu Oct 15): **(0.41)%**, ($41.14), gap to 1.5% = (1.91) pts, NOT ACHIEVED

- **Benchmarks:**
  - SPY +0.28% (769.60 to 771.72).
  - SOXS +2.6% (42.52 to 43.61), but only after a round trip: it peaked at $48.37 and fell to $44.60.
  - Plan 1's open-to-close: from the $47.92 entry to $43.61 is (9.0)%. The stop held the loss to (5.1)%.
- **Trades:** 1, with 0 wins and 1 loss (SOXS stopped at $45.50). The TMF plan was cancelled and the SOXL reversal plan was vetoed.
- **What went wrong:**
  - The trade bought SOXS 25 minutes into a move that was already +12.7% on day 2 and +10.5% at the open of day 3.
  - Semis bottomed at 9:55 and reversed. The vetoed SOXL long would have won: its trigger fired at 10:55 at $103.25, and SOXL reached $104.95 and was $107.5 at the close. But it was vetoed at 1:1 reward-to-risk and would not have been seen until 12:45 anyway.
- **Lesson:**
  - Do not chase a second-day gap in a 3x ETF after it has already moved more than 10%. On day 3 the edge is in waiting for the first 30 minutes to set the range, then trading the break or the failure.
  - Cycle-only checks keep missing intraday triggers: days 2 and 3 both had triggers fire between checks. Add a 10:30 check, or drop trigger-based plans.
- **Running total, 3 days:** (0.62)%. Book $9,938.40. 0 of 3 days at 1.5%.

## 2026-10-16 (day 4) plan

The market at 9:50 (monthly options expiration, OpEx): semis gave back about half of Thursday's squeeze. SOXL (6.0)%, SOXS +6.0%, QQQ (0.8)% and below its VWAP, SPY and IWM flat, TLT flat. Today's 5-min ATR is about 2.45 for SOXL and 1.0 for SOXS.

- **Kalshi:** no trade.
  - The only macro market inside the 7-day window is jobless claims for Oct 22. It has single-digit open interest and spreads up to 68 points.
  - The S&P and Nasdaq daily ladders track the live index, so there is no edge.
- **No entry at 10:00.** A half-size entry now would be a chase: SOXL moved more than 12% Thursday and has now gapped 6% the other way. It also sits at its VWAP, mid-range.
- **Opening range (OR):** taken from the 9:30–10:00 bars and locked at the 10:30 check. Provisional: SOXL high 102.90, low 98.85; SOXS high 47.17.
- **Checks:** 10:30 (new) and 12:45. Entries at the ask seen at a check, never at a past bar's price. The first plan to trigger cancels the other. No new entries after 12:45. Everything closes at the 3:50 cycle.
- **Plan A, SOXL long on an opening-range breakout** (risk manager: changes required).
  - **Trigger:** the last completed SOXL 5-min bar closes above the OR high, and QQQ is above its session VWAP.
  - **Stop:** OR low minus $0.15.
  - **Entry cap:** the ask must leave the stop no more than $5.00 below it (provisionally an ask of $103.70 or less). The entry-to-stop distance must also be at least $3.70.
  - **Shares:** $90 ÷ the entry-to-stop distance, capped at 24.
  - **Target:** entry plus 1.5 times the risk.
  - **Invalidated:** if a SOXL 5-min close falls below its VWAP, or QQQ trades below its session low as of entry.
- **Plan B, SOXS long on a SOXL opening-range breakdown** (risk manager: approved).
  - **Trigger:** the last SOXL 5-min bar closes below the OR low, QQQ is below its VWAP, and the SOXS ask is at most the SOXS OR high plus $0.50 (provisionally 47.67).
  - **Size:** 40 SOXS (about $1,900, 19%).
  - **Stop:** entry minus $2.00 (risk $80). **Target:** entry plus $3.00 (1.5:1).
  - **Invalidated:** if a SOXL 5-min close is above its VWAP or above the OR midpoint (provisionally 100.88).
- **Risk:** each plan risks $80–90 (about 0.9%). A gap through a stop between checks could reach about $210, still within the $398 daily stop. Nothing watches the book from 12:45 to 3:50.
- **10:30 check:** no trigger.
  - **Opening range locked (9:30–10:00):** SOXL high 102.90, low 98.55, midpoint 100.72. SOXS high 47.26, so Plan B's ask cap is 47.76.
  - **Prices at the check:** the last SOXL 5-min close was 100.81, inside the range. SOXL bid/ask 101.02/101.05 at 10:30:50. QQQ 720.50, below its VWAP.
  - **Plan A** needs a SOXL close above 102.90 with QQQ above its VWAP. **Plan B** needs a close below 98.55. Both stay pending until the 12:45 check, with the Plan A stop now at 98.40.
- **Midday (12:45):** no trigger. The last SOXL 5-min close was 100.51, still inside the 98.55–102.90 range, while QQQ slid to 716 (about (1.6)%). Plans A and B expire. The book stays flat for the day.

### Day 4 score (Fri Oct 16): **0.00%**, $0.00, gap to 1.5% = (1.50) pts, NOT ACHIEVED

- **Benchmarks:** SPY (1.17)% (771.79 to 762.74). SOXL (12.6)% (107.35 to 93.85). SOXS +12.7% (43.64 to 49.18).
- **Trades:** none. Neither plan triggered at the 10:30 or 12:45 checks.
- **Missed opportunity, recorded honestly:**
  - Plan B's thesis was right. The 3x chip ETF broke below its 98.55 opening-range low after the 12:45 cutoff and fell to 93.85.
  - A SOXS entry at the 47.76 ask cap would have been worth about +$56 (+0.6%) at the close.
  - That figure is a counterfactual, not a result.
- **Lesson:** on days 2, 3 and 4, valid triggers fired between scheduled checks. Fixed check times are now the binding problem; the trade ideas are not.
  - **Option 1:** leave a resting stop-entry order in place instead of checking at fixed times. That cannot be done in the paper engine without tick data.
  - **Option 2:** add 11:30, 13:30 and 14:30 checks and keep the window open until 14:30.
  - Adopt option 2 from Monday, if the user agrees.
- **Running total, 4 days:** (0.62)%. Book $9,938.40. 0 of 4 days at 1.5%. SPY over the same 4 days: about (2.0)% (compounding (0.02), (1.14), +0.28 and (1.17)).

## 2026-10-19 (day 5) plan

The market at 9:50: semis gapped up about 10% after Friday's (12.6)% and are rotating at VWAP mid-range. SOXL +9.6%, SMH +2.5%, QQQ +1.3%, SPY +0.5%. I found no catalyst for the move; the FOMC quiet period is on, and TXN and LRCX report Wednesday.

- **Kalshi:** no trade.
  - Jobless claims for Oct 22: only the ≥205k and ≥210k strikes are liquid.
  - A Columbus Day-week seasonal dip makes the market's roughly 197k median plausible, so the edge is under 5 points.
- **New entry method (day-2 to day-4 lesson):** a two-sided bracket of buy-stop entries. The first fill cancels the other leg. Entries rest until 14:30, and everything closes at the 15:50 cycle.
- **Paper fills:** the later of the trigger and the open of the first 1-min bar that crosses it. No fill if that open is above the cap.
- **Checks:** 10:15, 10:30, 10:45, 11:00, 11:30, 12:00, 12:45, 13:30, 14:30 and 15:50.
- **Leg A, SOXL buy-stop** (risk manager: approved for paper):
  - Trigger 104.07 (OR high 103.97 + 0.10), cap 104.40.
  - Stop 100.67 (2x ATR of 1.70). Target fill + 1.5R.
  - Paper size: 23 shares ($2,401, 24.2%), risk $86 at the cap.
- **Leg B, SOXS buy-stop** (approved):
  - Trigger 45.26 (OR high 45.16 + 0.10), cap 45.45.
  - Stop 43.42 (2x ATR of 0.92). Target fill + 1.5R.
  - Paper size: 44 shares ($2,000, 20.1%), risk $89 at the cap.
- **Invalidation at checks:**
  - A filled leg exits on a 5-min close back through its OR midpoint (SOXL 102.74, SOXS 44.50).
  - The levels were taken at 9:52, before the final 9:55 bar. Any OR extension after that is ignored, so the levels stay as stated.
- **Live:** the same bracket was sent to the user for a yes: 9 SOXL and 18 SOXS, about $34 and $37 of risk.
- **10:15 check:** **Leg B filled.** 44 SOXS at the $45.26 trigger. The stop was crossed in the 9:55 bar, which opened at 45.12 and reached a high of 46.05. Leg A (SOXL) was cancelled.
  - Since the fill: SOXS high 46.77, low 45.31. The last close was 45.33 (SOXL 101.12).
  - The stop at 43.42, the 48.02 target and the 44.50 invalidation level were all untouched, so the position is held.
  - Live: the user had not said yes, so no live orders were placed.
- **11:30 check:** SOXS **exited because the trade was invalidated**. Sold 44 at the $43.79 bid for a loss of **($64.68)**, about (0.65)% of the book.
  - The 11:05 bar closed at 44.35, below the 44.50 midpoint of the opening range.
  - The stop at 43.42 was not hit (the low was 43.47). The 11:00 check came five minutes before the invalidation printed.
- **The bracket was a whipsaw.** The breakdown leg filled at 9:55 and then failed. SOXL went on to break its opening-range high at 11:20 and reached 104.66.
  - Leg A had been cancelled under the rule that the first fill cancels the other leg, so the reversal was not caught.
  - Lesson: after a failed first leg, the opposite breakout is often the real move. Consider re-arming the opposite leg once at half risk after an invalidation exit, if it is still before 14:30.

### Day 5 score (Mon Oct 19): **(0.65)%**, ($64.68), gap to 1.5% = (2.15) pts, NOT ACHIEVED

- **Benchmarks:** SPY +0.52% (763.25 to 767.23). SOXL +6.6% (93.67 to 99.88). SOXS (6.6)%.
- **Trades:** 1, with 0 wins and 1 loss. SOXS was bought at the 45.26 stop entry and exited at 43.79 when the trade was invalidated.
- **Chop, recorded honestly:** semis moved through the range both ways.
  - SOXL broke above its 103.97 opening-range high at 11:20, reached about 104.7, then faded to 99.9 by the close. Leg A would have been stopped or faded too.
  - SOXS closed at 45.98, above our entry. Holding through the invalidation to the stop would have made about +$32.
  - The opening-range bracket has no edge on a two-way day after a 10% gap.
- **Lesson:**
  - Skip opening-range brackets on gap days of more than 5% in 3x ETFs. Those ranges are wide, and both sides get run.
  - Use the invalidation rule only once at least 30 minutes have passed since entry. Noise invalidated this trade, not a change in the thesis.
- **Running total, 5 days:** (1.26)%. Book $9,873.72. 0 of 5 days at 1.5%. SPY over the same days is about (1.5)%.

## 2026-10-20 (day 6) plan

The market at 9:50 (Robinhood quotes at 9:49:55 and 9:50:36 ET):
- SOXL gapped (4.2)% at the open: 94.51 against a 98.65 close. It is now 92.72, (6.0)%.
- SOXS +6.0% at 49.44. QQQ (0.7)%, SPY flat.
- TLT +0.8% and TMF +2.5%, so the tape is risk-off.
- Semis are in a two-week downtrend: SOXL went from 164 on Oct 6 to 93.
- NFLX reports after today's close. TXN and LRCX report Wednesday after the close.

**Kalshi:** no trade. In the NFLX earnings-mention markets, "Hollywood" looks about 11 points cheap on 4 past calls, too small a sample. "Partnership" fails the spread and open-interest tests.

**One-sided entry only: Leg B, a SOXS buy-stop that trades with the trend.**
- Leg A (SOXL reversal) is dropped. The opening range spans about 5%, twice day 5's, and the risk manager flagged that both sides would get run. The trader also preferred Leg B if only one side was traded.
- The gap was measured on SOXL open vs prior close: 4.2%, under the 5% rule.

**SOXS (Leg B) order:**
- **Trigger and cap:** trigger 50.22, the opening-range (OR) high of 50.115 + 0.10. Cap 50.45. Source: Robinhood 1-min and 5-min bars, 9:30–9:49.
- **Stop:** 47.94, which is 2x the 1.14 5-min ATR and below the 48.14 OR low.
- **Target:** fill + 1.5R, which is 53.64 from a fill at the trigger.
- **Size:** 35 shares. Cost $1,766 (17.9% of the book). Risk $87.85 at the cap.
- **Thesis:** a new session low after the pullback to VWAP resumes the downtrend. The risk-off tape supports it.

**Exit rules:**
- **Invalidation:** applies only from 30 minutes after the fill. Exit at a check that sees a 5-min SOXS close below the 49.13 OR midpoint, or a SOXL close above 93.45.
- **Re-arm (day-5 rule):** after an invalidation exit only, before 14:30. One SOXL buy-stop at 95.64, cap 96.00, stop 90.84, 8 shares, about $41 risk.
- **Expiry and time exit:** the entry expires at 14:30. Any position is flat at 15:50.
- **Checks:** 10:15, 10:30, 11:00, 11:30, 12:45, 13:30, 14:30 and 15:50.

**Live:** sent to the user for a yes. 15 SOXS, stop-limit at 50.22 with a 50.45 limit, stop 47.94, risk $37.65.

### Day 6 score (Tue Oct 20): **0.00%**, $0.00, gap to 1.5% = (1.50) pts, NOT ACHIEVED

- **Benchmarks:** SPY +0.24% (766.48 to 768.35). SOXL +0.1% (98.65 to 98.76) after a 91.35 low. SOXS (0.1)%.
- **Trades:** none. The SOXS buy-stop at 50.22 never triggered: SOXS peaked at 50.115 in the opening range and then fell.
- **Counterfactual, recorded honestly:** the dropped Leg A (SOXL breakout above 95.54) would have filled near 95.64. It would have been about +$53 at the close (17 shares), though it would not have reached the 102.84 target.
  - This is the second day running that the opposite leg was the right one, after day 5.
  - Dropping a leg on a judgement call (a wide range) cost money today. Calling the direction in advance has not worked: 0 for 2 on direction this week.
- **Lesson:** keep running brackets with both legs on gap days under 5%, sized so that combined risk stays at about $90.
- **Running total, 6 days:** (1.26)%. Book $9,873.72. 0 of 6 days at 1.5%. SPY over the same days is about (1.3)%.

## 2026-10-21 (day 7) plan

At 9:48:58 ET (Robinhood quotes):
- SOXL gapped +5.6% at the open (103.00 against a 97.55 close) and faded to 99.33. Skipped under the 5% gap rule.
- QQQ +0.64% (722.6, low 719.72). TQQQ 71.85, SQQQ 36.90. SPY +0.27%.
- TSLA, META, TXN, LRCX and IBM report after today's close.

Kalshi: no trade. Jobless claims ≥200k is priced 0.51/0.52 against our estimate of about 50%. The TSLA Megapack 3 and META mention markets have edges under 5 points or no transcript history.

**Bracket: two independent legs.** Each fills at most once; filling one does not cancel the other. The risk manager approved both legs.

**Opening range (provisional, 9:30–9:48):**
- TQQQ: high 72.00, low 71.02, midpoint 71.51.
- SQQQ: high 37.34, low 36.82, midpoint 37.08.
- If the range extends before 10:00, recompute at the 10:15 check:
  - trigger = range high + 0.05
  - cap = trigger + 0.20 (TQQQ) or + 0.11 (SQQQ)
  - stop = trigger − 0.75 (TQQQ) or − 0.39 (SQQQ)
  - shares = the lower of $45 ÷ (cap − stop) and 25% of the book ÷ cap

**Leg A: TQQQ buy-stop (long).**
- Entry: trigger 72.05, cap 72.25.
- Stop 71.30 (2x ATR of 0.358). Target: fill + 1.5R, which is 73.18 from a fill at the trigger.
- Size: 34 shares ($2,457, 24.9%). Risk $32.30.
- Thesis: QQQ holds its gap ahead of the mega-cap reports. A new session high resumes the up move.
- Invalidation: 30 minutes or more after the fill, a 5-min close below 71.51.

**Leg B: SQQQ buy-stop (long SQQQ, betting QQQ falls).**
- Entry: trigger 37.39, cap 37.50.
- Stop 37.00. Target: fill + 1.5R, which is 37.98 from a fill at the trigger.
- Size: 65 shares ($2,438, 24.7%). Risk $32.50.
- Thesis: the gap fails while semis fade. A new SQQQ high confirms it.
- Invalidation: 30 minutes or more after the fill, a 5-min close below 37.08.

**Totals and timing:**
- Combined risk is about $65.
- Entries expire at 14:30. Everything is flat at 15:50.
- Checks: 10:15, 10:30, 11:00, 11:30, 12:45, 13:30, 14:30 and 15:50.
- Live, sent for the user's yes: 21 TQQQ and 39 SQQQ, with combined risk of $39.45.
- **10:15 check:**
  - **Opening range locked (9:30–9:59):** TQQQ high 72.03, low 71.02. SQQQ high 37.48, low 36.80.
  - **Recomputed levels:** TQQQ trigger 72.08, cap 72.28, stop 71.33, 34 shares. SQQQ trigger 37.53, cap 37.64, stop 37.14, 65 shares.
  - **Leg A filled and stopped.** The 10:00 bar reached 72.14, so TQQQ filled at 72.08. The 10:10 bar fell to 71.115, so it was stopped at 71.33. Loss **($25.50)**.
  - That is the noise stop-out the risk manager flagged.
  - **Leg B is still pending.** SQQQ's high since 10:00 is 37.29, below the 37.53 trigger.
  - **Live:** no yes from the user, so nothing was placed.
- **2:30 check:** the SQQQ buy-stop expired unfilled. The high since 10:00 was 37.29, below the 37.53 trigger. The book is flat in cash.

### Day 7 score (Wed Oct 21): **(0.26)%**, ($25.50), gap to 1.5% = (1.76) pts, NOT ACHIEVED

- **Benchmarks:** SPY +0.63% (769.05 to 773.86), TQQQ +3.7% (70.41 to 72.99).
- **Trades:** 1 trade, 1 loss. TQQQ filled at 72.08 and was stopped at 71.33 within 10 minutes. SQQQ never triggered.
- **What went wrong:** the direction was right but the stop was too tight. TQQQ closed at 72.99, above both the entry and nearly the 73.21 target. With a stop below the 71.02 opening-range low, the trade would have made about +$31.
  - This is the third time in 7 days that a stop of about 1% on a 3x ETF was hit by normal noise.
- **Lesson:** cap the position, not the stop. On 3x ETFs, put the stop beyond the opposite side of the opening range, and when that makes the dollar risk too large, cut the share count. Never accept a stop inside the range.
- **Running total after 7 days:** (1.52)%. Book $9,848.22. 0 of 7 days at 1.5%. SPY over the same days is about (0.7)%. The book now trails the market.

## 2026-10-22 (day 8) plan

At 9:50 ET (Robinhood quotes 9:49:33 and 9:50:23):
- Index ETFs: TQQQ gapped (4.78)% (69.14 against a 72.61 close) and SQQQ +4.80%. QQQ (1.7)%, SPY (0.9)%, TLT +1.2%.
- Earnings reactions: META (6.5)% and LRCX (8.6)% after their reports. TSLA (0.7)%, TXN flat.
- SOXL gapped (12.2)%, so it is skipped under the 5% gap rule.

**Kalshi:** see the GDP entry below.

**Two-leg bracket, legs independent.** The risk manager approved both legs. The SQQQ stop at 38.02 sits below the SQQQ opening-range low of 38.07.

**Opening range (provisional, 9:30–9:49):**
- TQQQ: high 69.44, low 68.575, midpoint 69.01.
- SQQQ: high 38.52, low 38.07, midpoint 38.30.
- If the range extends before 10:00, recompute at the 10:15 check using the day-8 formula: stops go beyond the opposite side of the range, and shares are cut rather than the stop tightened.

**Leg A: TQQQ buy-stop.**
- Entry: trigger 69.49, cap 69.69.
- Stop 68.475 (range low − 0.10). Target fill + 1.5R.
- Size: 35 shares, risk $42.53.
- Thesis: QQQ washes out after the gap down and squeezes back up.
- Invalidation: from 30 minutes after the fill, a 5-min close below 69.01.

**Leg B: SQQQ buy-stop.**
- Entry: trigger 38.57, cap 38.68.
- Stop 38.02 (range low − 0.05). Target fill + 1.5R.
- Size: 63 shares, risk $41.58.
- Thesis: risk-off after the earnings reports; the gap down continues.
- Invalidation: from 30 minutes after the fill, a 5-min close below 38.30.

**Totals and schedule:**
- Combined risk is about $84.
- Entries expire at 14:30. Flat by 15:50.
- Checks: 10:15, 10:30, 11:00, 11:30, 12:45, 13:30, 14:30.

**Live:** sent to the user for a yes. 16 TQQQ and 30 SQQQ, combined risk $39.24.
- **Kalshi (filled later):** bought **86 KXGDP-26OCT30-T3.5 YES** (Q3 GDP above 3.5%). 46 at 0.27 and 40 at 0.29, $24.02 in total (0.24% of the book).
  - Our probability is 35–38%, which is about 8 points of edge.
  - It settles on the BEA print on Oct 29. Max loss is $24.02, max gain $61.98.
  - Cancel the idea if GDPNow prints 3.1% or lower before then.
  - The FOMC hike contract (3–4 points of edge) and core PCE (6-point spread) did not qualify.
- **10:15 check:**
  - **Opening range locked (9:30–9:59):**
    - TQQQ: high 69.505, low 68.553, midpoint 69.03.
    - SQQQ: high 38.52, low 38.042, midpoint 38.28.
  - **Levels recomputed from the locked range:**
    - TQQQ: trigger 69.555, cap 69.755, stop 68.45, 34 shares (risk about $38).
    - SQQQ: trigger 38.57, cap 38.68, stop 37.99, 63 shares.
  - **Leg A filled:** 34 TQQQ at 69.56 in the 10:00 bar (high 69.65).
    - Since the fill: low 68.68, which is above the 68.45 stop. Last close 68.715.
    - Invalidation can apply from 10:31.
  - **Leg B:** still pending. SQQQ's high since 10:00 is 38.46.
  - **Live:** the user has not said yes, so nothing was placed.
- **10:30 check:**
  - **Leg A stopped out.** TQQQ broke its 68.45 stop in the 10:20 bar (low 68.26), for a loss of **($37.74)**. The stop was beyond the opening range, so this was a genuine failure of the thesis, not noise.
  - **Leg B filled.** 63 SQQQ at 38.57 in the same 10:20 bar. Since then the low is 38.59 and the last close 38.805. The stop is 37.99 and the target 39.44. Invalidation can apply from 10:50.
- **1:30 check:** SQQQ hit its **target**. The 12:45 bar reached 39.525, so the position was sold at 39.44 for a gain of **+$54.81** (1.5R).
  - Day total: SQQQ +$54.81, TQQQ −$37.74, net **+$17.07**.
  - This is the first winning trade of the sprint.
  - With stops placed beyond the range, the bracket worked: the losing leg was cut, and the winning leg had room to reach its target.

### Day 8 score (Thu Oct 22): **+0.17%**, +$16.27, gap to 1.5% = (1.33) pts, NOT ACHIEVED

**P&L breakdown:**
- SQQQ: +$54.81 at the target.
- TQQQ: ($37.74) when its stop was hit.
- GDP YES: ($0.80) marked to market at the 0.27 bid.

**Benchmarks:**
- SPY (1.20)%, from 773.09 to 763.80.
- TQQQ (8.5)%.
- SQQQ +8.6%.

**Trades:** 2 closed, with 1 win and 1 loss. This is the first win of the sprint, and the first green day.

**What worked:**
- The two-sided bracket with stops placed beyond the opening range.
- The legs were independent, so the losing leg was cut at about 1R and the winning leg reached 1.5R.
- Net reward-to-risk on the day was about 1.45 to 1.

**What to improve:**
- SQQQ ran to 39.60 by the close, so a trailing exit would have captured more after the target.
- Consider selling half at 1.5R and trailing the rest with the stop at break-even. Test this in paper only.

**Running total after 8 days:** (1.36)%, book $9,864.49. Days at 1.5%: 0 of 8. SPY over the same period: about (1.8)%. The book is now ahead of SPY again.

## 2026-10-23 (day 9) plan

**Market at 9:49 ET** (Robinhood quotes 9:49:04):
- TQQQ gapped (1.19)% at the open (65.63 against a 66.42 close). Last 66.28.
- SQQQ gapped +1.19% (40.07). Last 39.70.
- QQQ flat, SPY (0.47)%.
- Both gaps are under 5%, so the bracket is allowed.

**Kalshi:** HOLD the GDP YES position, marked at 0.28/0.29. GDPNow was 3.5% on Oct 20 and updates next on Oct 27. Exit if it prints 3.1% or lower. No new trade: Oct 29 claims are illiquid, and FOMC hike odds of 0.07/0.08 match FedWatch at about 7%.

**Method:** day-8 bracket with stops beyond the opening range. **New on paper:** exit half at 1.5R, then move the stop on the rest to break-even and hold it to 15:50. The risk manager approved both legs.

**Opening range** (provisional 9:30–9:48):
- TQQQ: high 66.445, low 65.37, midpoint 65.91.
- SQQQ: high 40.228, low 39.59, midpoint 39.91.
- Lock the range at 10:00 and recompute the levels with the day-8 formula.

**Leg A, TQQQ buy-stop:**
- Trigger 66.50, cap 66.70.
- Stop 65.27.
- Size: 31 shares, risk $44.33 at the cap.
- Target 1.5R: sell 15 there, run 16 with the stop at break-even.
- Invalidation: from 30 minutes after the fill until the target, exit on a 5-min close below 65.91.

**Leg B, SQQQ buy-stop:**
- Trigger 40.28, cap 40.39.
- Stop 39.54.
- Size: 52 shares, risk $44.20.
- Target 1.5R: sell 26 there, run 26 with the stop at break-even.
- Invalidation: from 30 minutes after the fill, exit on a 5-min close below 39.91.

**Totals and schedule:**
- Legs are independent. Combined risk about $88.5.
- Entries expire at 14:30. Flat by 15:50 (Friday, no weekend hold).
- Checks: 10:15, 10:30, 11:00, 11:30, 12:45, 13:30, 14:30.

**Live:** sent to the user for a yes. 14 TQQQ and 23 SQQQ, combined risk $39.57.
- **10:15 check:**
  - **Opening range locked (9:30–9:59):** TQQQ high 66.64, low 65.37, midpoint 66.00. SQQQ high 40.228, low 39.48, midpoint 39.85.
  - **Recomputed levels:**
    - TQQQ: trigger 66.69, cap 66.89, stop 65.27, **27 shares** (cut from 31, because the range widened), target 68.82. Sell 13 at the target and run 14 at break-even.
    - SQQQ: trigger 40.28, cap 40.39, stop 39.43, **46 shares**, target 41.555. Sell 23 at the target and run 23.
  - **Leg A filled:** 27 TQQQ at 66.69 in the 10:00 bar (high 66.775). Since the fill the low is 66.30 and the last price 66.62.
  - **Leg B:** pending. SQQQ's high since 10:00 is 39.675.
  - **Live:** the user has not said yes, so nothing was placed.

- 14:30 check: TQQQ held (low 66.43, never closed below 66.00 mid; target 68.82 not reached). SQQQ buy-stop 40.28 expired unfilled (high since midday 39.60). TQQQ rides to 15:50 flatten.

### Day 9 score (Fri Oct 23): **(0.11)%**, ($10.48), gap to 1.5% = (1.61) pts, NOT ACHIEVED
- Trades: 1 closed. TQQQ 27 @ 66.69, time exit @ 66.27 (bid), ($11.34). SQQQ leg never triggered and expired at 14:30. Kalshi GDP >3.5% YES 86 marked at the 0.28 bid (+$0.06).
- Wins/losses: 0 / 1 (a small time-exit loss, not a stop).
- Half-out test: untested. TQQQ peaked about 67.30 and never neared the 68.82 target.
- Lesson: a range day. The OR break held but never extended, so the bracket bled a little to the time exit. Low-range days give back small amounts; that is the cost of the method, not a reason to change it.
**Running total after 9 days:** (1.46)%, book $9,854.01. Days at 1.5%: 0 of 9. SPY over the same period: about (2.3)%. The book is still ahead of SPY.

## Weekly rulebook review (Fri Oct 23, after day 9)
Closed paper trades: 7. Wins 1, losses 6 (14%). Net ($146.05).
| Setup | Trades | W/L | Avg win | Avg loss | Net |
|---|---|---|---|---|---|
| VWAP reclaim (TQQQ, day 1) | 1 | 0/1 | n/a | (20.46) | (20.46) |
| Breakdown continuation (SOXS, day 3) | 1 | 0/1 | n/a | (41.14) | (41.14) |
| OR bracket, long leg (TQQQ) | 3 | 0/3 | n/a | (24.86) | (74.58) |
| OR bracket, inverse leg (SOXS/SQQQ) | 2 | 1/1 | 54.81 | (64.68) | (9.87) |
| Kalshi GDP (open) | 1 | open | | | +0.06 mark |
Live day-trade sleeve: 0 fills (no package approved).
**Verdict: no setup has a positive paper result, and none has more than 3 trades. No rulebook is drafted (Option A not offered).** Option B (one daily package, explicit yes) continues. Re-run this review after the 20-day evaluation (about Nov 9) with the OR bracket as the only candidate.

## Day 10 plan (Mon Oct 26), OR bracket (the evaluation continues; backtest says this method has no edge, see trading/research/README.md)
- OR locked on 9:30-9:59. TQQQ H 67.729 / L 66.61 / mid 67.17. SQQQ H 39.51 / L 38.82 / mid 39.165. No gap of 5% or more.
- Leg A TQQQ: trigger 67.78, cap 67.98, stop 66.51, **30 shares** (risk $43.80 at cap), target fill + 1.5R (sell 15, run 15 at break-even). Invalidation 30+ min after the fill: 5-min close below 67.17.
- Leg B SQQQ: trigger 39.56, cap 39.67, stop 38.77, **50 shares** (risk $45.00 at cap), target fill + 1.5R (sell 25, run 25 at break-even). Invalidation: 5-min close below 39.165.
- Entries expire 14:30; flat by 15:50. Kalshi GDP YES 86 held to the Oct 29 print (exit if GDPNow 3.1% or lower on Oct 27).
- Live: no package sent; the user was asked to choose between the dip-buy rule and the intraday packages.

- **Leg A filled (10:30 check):** 30 TQQQ at 67.78 in the 10:15 bar. Stop 66.51, target 69.69 (sell 15), invalidation from 10:45 on a 5-min close below 67.17. Leg B (SQQQ 39.56) not triggered; SQQQ high since 10:00 is 39.48.

- 14:30 check: SQQQ buy-stop 39.56 expired unfilled (high since 10:00 about 39.48). TQQQ 30 @ 67.78 held, last about 68.84 (range since 13:30 68.44-69.09); rides to the 15:50 time exit.

### Day 10 score (Mon Oct 26): **+0.23%**, +$22.80, gap to 1.5% = (1.27) pts, NOT ACHIEVED
- Trades: 1 closed. TQQQ 30 @ 67.78 (10:15 breakout), time exit @ 68.54 (bid), +$22.80. SQQQ leg never triggered. Kalshi GDP YES 86 at the 0.28 bid (unchanged).
- Wins/losses: 1 / 0. Half-out test: untested (high 69.33 vs target 69.69).
- Lesson: a trend day for QQQ; the long leg worked but the 1.5R target sat just above the high. One good day does not change the 169-day backtest (−0.17% per trade).
- Dip-buy shadow check at 3:51 PM: no RSI(2)<10 signal on SPY, QQQ, IWM or SOXX (all RSI2 above 55 after today's rally).
**Running total after 10 days:** (1.23)%, book $9,876.81. Days at 1.5%: 0 of 10. SPY over the same period: about (1.7)%.

## Day 11 plan (Tue Oct 27), OR bracket (evaluation continues; backtest says no edge)
- OR locked on 9:30-9:59. TQQQ H 70.18 / L 69.065 / mid 69.62. SQQQ H 38.06 / L 37.425 / mid 37.74. Gap about +1% on TQQQ, so both legs are allowed.
- Leg A TQQQ: trigger 70.23, cap 70.43, stop 68.965, **30 shares** (risk $43.95 at cap), target fill + 1.5R (sell 15, run 15 at break-even). Invalidation 30+ min after the fill on a 5-min close below 69.62.
- Leg B SQQQ: trigger 38.11, cap 38.22, stop 37.375, **53 shares** (risk $44.79 at cap), target fill + 1.5R (sell 26, run 27 at break-even). Invalidation on a 5-min close below 37.74.
- Entries expire 14:30; flat by 15:50. Kalshi GDP YES 86: GDPNow Oct 27 update not out at 10:00; re-check at 13:30 (exit at the bid if 3.1% or lower).

- **Leg B filled (10:30 check):** 53 SQQQ at 38.11 in the 10:10 bar. Stop 37.375, target 39.21 (sell 26), invalidation from 10:40 on a 5-min close below 37.74 (the 10:25 bar closed 37.73, inside the 30-minute grace). Leg A (TQQQ 70.23) not triggered; high since 10:00 69.64.

- **11:00 check:** SQQQ invalidated, sold 53 at 37.635 (10:40 bar close below 37.74), ($25.18). TQQQ leg A filled 30 at 70.23 in the 10:50 bar; stop 68.965, target 72.13 (sell 15), invalidation from 11:20 on a 5-min close below 69.62.

### Day 11 score (Tue Oct 27): **+0.02%**, +$2.35, gap to 1.5% = (1.48) pts, NOT ACHIEVED
- Trades: 2 closed. SQQQ 53 @ 38.11, invalidated @ 37.635, ($25.18). TQQQ 30 @ 70.23, time exit @ 71.09 (bid), +$25.80. Kalshi GDP YES 86 marked 0.30 (+$1.72). GDPNow: no Oct 27 update found; last 3.5% (Oct 20), so the GDP bet is held to the Oct 29 print.
- Wins/losses: 1 / 1. Half-out test: untested (TQQQ high 71.525 vs target 72.13).
- Lesson: the invalidation rule earned its keep (saved about $13 versus the stop). Targets at 1.5R have not been reached in 3 days; the backtest's hold-to-close version did no better, so no change.
- Dip-buy shadow check: no signal; all four indexes are in the exit zone after a 2-day rally. (signals.js data ends Oct 23; refresh the daily bars before any live use.)
**Running total after 11 days:** (1.21)%, book $9,879.16. Days at 1.5%: 0 of 11. SPY over the same period: about (1.0)%.

## Day 12 plan (Wed Oct 28), OR bracket (evaluation continues; backtest says no edge)
- OR locked on 9:30-9:59. TQQQ H 72.06 / L 70.76 / mid 71.41. SQQQ H 37.09 / L 36.42 / mid 36.755. Gaps are small, so both legs are allowed.
- Leg A TQQQ: trigger 72.11, cap 72.31, stop 70.66, **27 shares** (risk $44.55 at cap), target fill + 1.5R (sell 13, run 14 at break-even). Invalidation 30+ min after the fill on a 5-min close below 71.41.
- Leg B SQQQ: trigger 37.14, cap 37.25, stop 36.37, **51 shares** (risk $44.88 at cap), target fill + 1.5R (sell 25, run 26 at break-even). Invalidation on a 5-min close below 36.755.
- **Event risk: FOMC decision at 2:00 PM ET, press conference 2:30.** Rules unchanged (entries expire 14:30, flat 15:50), but a stop can gap through on the announcement; the 3x ETFs can move 2-4% in minutes. Recorded fills will use the bar open when a stop is gapped.
- Kalshi GDP YES 86 held to the Oct 29 8:30 AM BEA advance estimate (last GDPNow 3.5%).

- 14:30 check: both entries expired unfilled. TQQQ high 72.06 at 9:30, never 72.11 after (FOMC spike 71.79); SQQQ high 37.09 at 9:45, 37.03 after. A flat day, no trades.

### Day 12 score (Wed Oct 28): **(0.05)%**, ($5.16), gap to 1.5% = (1.55) pts, NOT ACHIEVED
- Trades: 0. Both bracket entries expired unfilled; the opening range held all day through the FOMC decision. Kalshi GDP YES 86 marked down to the 0.24 bid (from 0.30), ($5.16).
- Lesson: a no-trade day is a correct outcome for a breakout rule on a range day.
- Dip-buy shadow check (daily data refreshed through Oct 27): no signal; RSI2 84 to 95 on all four indexes after a 3-day rally.
**Running total after 12 days:** (1.26)%, book $9,874.00. Days at 1.5%: 0 of 12. SPY over the same period: about (0.8)%.

- **Oct 29 8:30 AM:** BEA Q3 advance GDP 3.4% (consensus 3.2%, GDPNow 3.5%). KXGDP-26OCT30-T3.5 YES settled at $0; loss $24.02 (about $20.64 of it already marked down).

## Day 13 plan (Thu Oct 29), OR bracket (evaluation continues; backtest says no edge)
- OR locked on 9:30-9:59 (wide, after the GDP print and a gap down of about 2.5%, under the 5% limit). TQQQ H 69.73 / L 68.13 / mid 68.93. SQQQ H 38.40 / L 37.60 / mid 38.00.
- Leg A TQQQ: trigger 69.78, cap 69.98, stop 68.03, **23 shares** (risk $44.85 at cap), target fill + 1.5R (sell 11, run 12 at break-even). Invalidation 30+ min after the fill on a 5-min close below 68.93.
- Leg B SQQQ: trigger 38.45, cap 38.56, stop 37.55, **44 shares** (risk $44.44 at cap), target fill + 1.5R (sell 22, run 22 at break-even). Invalidation on a 5-min close below 38.00.
- Entries expire 14:30; flat by 15:50. No event positions open.

- **Midday:** TQQQ leg A filled 23 at 69.78 in the 11:30 bar (high 70.06). Since then low 68.95, last about 69.26; no stop, no 5-min close below 68.93. SQQQ not triggered (high 37.99).

- **1:30 check:** TQQQ invalidated, sold 23 at 68.77 (13:10 bar close below 68.93), ($23.23). SQQQ still not triggered (high 38.095).

- 14:30 check: SQQQ buy-stop 38.45 expired unfilled (high since 13:30 about 38.30). Book is flat.
