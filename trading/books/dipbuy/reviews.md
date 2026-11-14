# Dip-buy paper book

Rule: see policy.json and trading/research/README.md. $3,000 book, about $750 per sleeve, four sleeves (UPRO, TQQQ, TNA, SOXL). Checked daily at about 3:50 PM ET.

## Fri Oct 30, 2026: first signals
- SPY RSI(2) 9.4 above its 200d -> bought 5 UPRO @ 141.32 ($706.60). Exit on an SPY close above its 5d SMA, or by Nov 13.
- QQQ RSI(2) 8.5 above its 200d -> bought 12 TQQQ @ 62.10 ($745.20). Exit on a QQQ close above its 5d SMA, or by Nov 13.
- IWM RSI(2) 30.8: no entry. SOXX below its 200d: no entry.
- Live: the user was offered the same trade at midday and did not reply, so nothing was placed.

## Mon Nov 2: hold both
- SPY 753.59 (5d SMA 764.13, RSI2 7.5) and QQQ 682.68 (5d SMA 707.08, RSI2 5.7) stayed below their 5-day SMAs, so no exit. Day 1 of 10.
- Marks at the bid: UPRO 139.95 (cost 141.32), TQQQ 59.87 (cost 62.10). Open loss about $33.
- QQQ is now only 0.4% above its 200-day SMA (679.82); a close below it does not force an exit under the rule, but blocks new TQQQ entries.
- IWM RSI2 42: no entry. SOXX below its 200d: no entry.

## Tue Nov 3: hold both (day 2 of 10)
- SPY 754.70 below its 5d SMA 760.84; QQQ 686.40 below its 5d SMA 699.79. No exit.
- Marks at the bid: UPRO 140.53 (cost 141.32), TQQQ 60.79 (cost 62.10). Open loss about $20.
- No new entries (RSI2 all above 30).

## Wed Nov 4: UPRO exit, TQQQ hold (day 3 of 10)
- SPY 767.33 above its 5d SMA 759.77 -> **sold 5 UPRO @ 147.56, +$31.20 (+4.4%)**, held 3 days. First closed trade: 1 win.
- QQQ 692.26 just under its 5d SMA 692.89 -> hold TQQQ (bid 62.31 vs cost 62.10, +$2.52).
- No new entries. SOXX still below its 200d.

## Thu Nov 5: hold TQQQ (day 4 of 10); no new entries
- Sharp selloff: SPY (4.1)%, QQQ (5.9)%. QQQ 651.35 closed below its 200d SMA (680.73) and its 5d SMA, so TQQQ stays (the rule exits only on a close above the 5d SMA or at 10 days; no stop). Bid 51.27 vs cost 62.10: open loss ($129.96).
- SPY RSI2 17.4 (needs < 10): no UPRO entry. IWM and SOXX are below their 200d SMAs.
- Data fix: SOXX split 3-for-1 (Nov 5 adjusted prior close 150.14 vs 450.41); research/data/SOXX_1d.csv history divided by 3.
- This is the rule's known risk: no stop, 3x leverage. Backtest worst trade (27.6)%; this one is (17.4)% so far.

## Fri Nov 6: hold TQQQ (day 5 of 10); no new entries
- QQQ 657.59 still below its 5d SMA (672.59) and its 200d (680.89). Hold TQQQ: bid 52.55 vs cost 62.10, open loss ($114.60).
- No entries: SPY RSI2 30, others below their 200d. Time exit for TQQQ: Nov 13 if no rebound.

## Mon Nov 9: TQQQ exit; book flat
- Broad rebound: QQQ 680.88 (+3.8%) closed above its 5d SMA 672.25 -> **sold 12 TQQQ @ 58.09, ($48.12) (-6.5%)**, held 6 days. It had been down (17)% at the Nov 5 low; the rule's "no stop" let it recover most of that.
- No new entries: every index is in its exit zone (RSI2 70+). QQQ (200d 681.18) and SOXX are below their 200d SMAs.
- Record: 2 closed trades, 1 win, 1 loss, net ($16.92). Book $2,983.08 all cash (start $3,000, (0.56)%).

## Tue Nov 10: flat, no entries
- No signals: RSI2 56-65 on all four indexes. QQQ (200d 681.41) and SOXX remain below their 200d SMAs. Book $2,983.08 cash.

## Wed Nov 11: flat, no entries
- Strong up day (QQQ +2.5%, SOXX +6.3%). RSI2 74-89 everywhere: no signals. QQQ is back above its 200d SMA (681.72); SOXX still below. Book $2,983.08 cash.

## Thu Nov 12: flat, no entries
- No signals. SPY/QQQ RSI2 63-68; IWM (2)% today, RSI2 32.8, now just below its 200d (279.34); SOXX below its 200d. Book $2,983.08 cash.

## Fri Nov 13: flat, no entries
- Mild pullback; RSI2 25-37, none below 10. Only SPY is above its 200d; QQQ (682.24), IWM and SOXX are below. Book $2,983.08 cash.
