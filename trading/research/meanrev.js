#!/usr/bin/env node
// Robustness check for the short-term mean-reversion setups that passed
// backtest.js: a parameter grid across four index/3x-ETF pairs, split into
// in-sample (2016-2021) and out-of-sample (2022 on), plus an equal-weight
// portfolio of the four sleeves marked to market daily.
//
//   node trading/research/meanrev.js

const { load, sma, rsi, stats, SPLIT } = require('./backtest');

const PAIRS = [['SPY', 'UPRO'], ['QQQ', 'TQQQ'], ['IWM', 'TNA'], ['SOXX', 'SOXL']];
const SLIP3X = 0.0005;

function series(sig, trd) {
  const s = load(`${sig}_1d.csv`), t = new Map(load(`${trd}_1d.csv`).map(b => [b.date, b]));
  const b = s.filter(x => t.has(x.date)).map(x => ({ ...x, t: t.get(x.date) }));
  const c = b.map(x => x.close);
  return { b, c, r2: rsi(c, 2), s200: c.map((_, i) => sma(c, 200, i)), s5: c.map((_, i) => sma(c, 5, i)) };
}

// Returns per-trade results and a daily in-position flag (for the portfolio).
function run(S, rule, maxHold = 10, stopPct = null) {
  const { b, c, r2, s200, s5 } = S;
  const enter = i => {
    if (!(c[i] > s200[i])) return false;
    if (rule.kind === 'rsi') return r2[i] < rule.th;
    return i >= rule.n && Array.from({ length: rule.n }, (_, k) => c[i - k] < c[i - k - 1]).every(Boolean);
  };
  const exit = x => (rule.exit === 'sma5' ? c[x] > s5[x] : r2[x] > 70);
  const trades = [], held = new Array(b.length).fill(false);
  for (let i = 200; i < b.length - 1; i++) {
    if (!enter(i)) continue;
    let x = i + 1;
    while (x < b.length - 1 && !exit(x) && x - i < maxHold && !(stopPct && b[x].t.close / b[i].t.close - 1 <= -stopPct)) x++;
    for (let k = i + 1; k <= x; k++) held[k] = true;
    trades.push({ date: b[i].date, ret: (b[x].t.close * (1 - SLIP3X)) / (b[i].t.close * (1 + SLIP3X)) - 1, entry: i, exitIdx: x });
    i = x;
  }
  return { trades, held };
}

const pct = x => `${(x * 100).toFixed(2)}%`.padStart(8);
const RULES = [];
for (const th of [5, 10, 15, 20]) for (const exit of ['sma5', 'rsi70']) RULES.push({ kind: 'rsi', th, exit, name: `RSI2<${th} exit ${exit}` });
for (const n of [2, 3, 4]) for (const exit of ['sma5', 'rsi70']) RULES.push({ kind: 'down', n, exit, name: `${n} down closes exit ${exit}` });

console.log('Per-trade expectancy on the 3x ETF, in-sample | out-of-sample (n, win%, exp, t)\n');
console.log(`${'rule'.padEnd(26)}${PAIRS.map(p => p[1].padEnd(44)).join('')}`);
const S = Object.fromEntries(PAIRS.map(([s, t]) => [t, series(s, t)]));
for (const rule of RULES) {
  let line = rule.name.padEnd(26);
  for (const [, t] of PAIRS) {
    const { trades } = run(S[t], rule);
    const a = stats(trades.filter(x => x.date < SPLIT), 1), o = stats(trades.filter(x => x.date >= SPLIT), 1);
    const f = z => (z.n ? `${String(z.n).padStart(3)} ${pct(z.winRate)} ${pct(z.expectancy)} ${z.tStat.toFixed(1).padStart(4)}` : '  0').padEnd(22);
    line += f(a) + f(o);
  }
  console.log(line);
}

// Portfolio: four equal sleeves, each in its 3x ETF only while its signal holds,
// otherwise in cash at 0%. Rule: RSI2 < 10, exit on a close above the 5-day SMA.
const rule = { kind: 'rsi', th: 10, exit: 'sma5' };
const dates = S.TQQQ.b.map(x => x.date);
const daily = dates.map(() => 0);
const tradesAll = [];
for (const [, t] of PAIRS) {
  const s = S[t];
  const idx = new Map(s.b.map((x, i) => [x.date, i]));
  const { trades, held } = run(s, rule);
  tradesAll.push(...trades.map(x => ({ ...x, sym: t })));
  dates.forEach((d, j) => {
    const i = idx.get(d);
    if (i == null || !held[i]) return;
    let r = s.b[i].t.close / s.b[i - 1].t.close - 1;
    if (!held[i - 1]) r -= SLIP3X; // entry day
    if (i + 1 >= held.length || !held[i + 1]) r -= SLIP3X; // exit day
    daily[j] += r / PAIRS.length;
  });
}
for (const [label, lo, hi] of [['2016-2021', '0000', SPLIT], ['2022-2026', SPLIT, '9999']]) {
  const days = dates.map((d, j) => ({ date: d, ret: daily[j] })).filter(x => x.date >= lo && x.date < hi && x.date >= dates[200]);
  const st = stats(days, days.length);
  const tr = tradesAll.filter(x => x.date >= lo && x.date < hi);
  const inMkt = days.filter(x => x.ret !== 0).length / days.length;
  console.log(`\nPortfolio (4 sleeves, RSI2<10, exit close>5d SMA) ${label}: CAGR ${pct(st.cagr)}, max drawdown ${pct(st.maxDrawdown)}, total ${pct(st.totalReturn)}, ` +
    `${tr.length} trades (${(tr.length / (days.length / 252)).toFixed(0)}/yr), win ${pct(tr.filter(x => x.ret > 0).length / tr.length)}, days with a position ${pct(inMkt)}`);
}
const recent = tradesAll.filter(x => x.date >= '2026-01-01').sort((a, b) => (a.date < b.date ? -1 : 1));
console.log(`\n2026 trades:\n${recent.map(x => `  ${x.date} ${x.sym.padEnd(5)} ${pct(x.ret)} held ${x.exitIdx - x.entry}d`).join('\n')}`);
