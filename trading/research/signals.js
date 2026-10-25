#!/usr/bin/env node
// Today's state of the dip-buy rule for each sleeve: QQQ-style index above its
// 200-day SMA and RSI(2) below 10 -> buy the 3x ETF at the close; exit at the
// first close above the 5-day SMA, or after 10 trading days.
// Usage: node trading/research/signals.js [prices.json with live index prices]
const fs = require('fs');
const { load, sma, rsi } = require('./backtest');
const PAIRS = [['SPY', 'UPRO'], ['QQQ', 'TQQQ'], ['IWM', 'TNA'], ['SOXX', 'SOXL']];
const live = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : {};
for (const [sig, trd] of PAIRS) {
  const c = load(`${sig}_1d.csv`).map(b => b.close);
  if (live[sig]) c.push(live[sig]); // treat the live print as today's close
  const i = c.length - 1;
  const r = rsi(c, 2)[i], s200 = sma(c, 200, i), s5 = sma(c, 5, i);
  const up = c[i] > s200;
  console.log(`${sig.padEnd(5)}->${trd.padEnd(5)} close ${c[i].toFixed(2)}  200d ${s200.toFixed(2)} ${up ? 'UP  ' : 'DOWN'}  RSI2 ${r.toFixed(1).padStart(5)}  5d ${s5.toFixed(2)}  ` +
    (up && r < 10 ? 'BUY at close' : c[i] > s5 ? 'exit zone (above 5d)' : 'no entry'));
}
