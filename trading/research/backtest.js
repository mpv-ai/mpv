#!/usr/bin/env node
// Strategy research: backtests candidate setups on Robinhood bars saved in
// trading/research/data. Daily rules use 2016-2021 as the in-sample period
// and 2022 onward as out-of-sample. Intraday rules use the QQQ 10-minute bars
// (about 8 months, the depth Robinhood keeps). Every trade pays slippage per side.
//
//   node trading/research/backtest.js            # all strategies, text table
//   node trading/research/backtest.js --json     # same, as JSON

const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, 'data');
const SPLIT = '2022-01-01';
const SLIP = { QQQ: 0.0002, SPY: 0.0002, TQQQ: 0.0005 }; // per side

function load(file) {
  const [head, ...lines] = fs.readFileSync(path.join(DATA, file), 'utf8').trim().split('\n');
  const keys = head.split(',');
  return lines.map(l => {
    const v = l.split(',');
    const o = {};
    keys.forEach((k, i) => (o[k] = i === 0 ? v[i] : +v[i]));
    return o;
  });
}

// ---------- indicators ----------
const sma = (a, n, i) => (i < n - 1 ? NaN : a.slice(i - n + 1, i + 1).reduce((s, x) => s + x, 0) / n);
function rsi(closes, n) {
  const out = new Array(closes.length).fill(NaN);
  let g = 0, l = 0;
  for (let i = 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    const up = Math.max(d, 0), dn = Math.max(-d, 0);
    if (i <= n) { g += up / n; l += dn / n; if (i === n) out[i] = 100 - 100 / (1 + g / (l || 1e-9)); continue; }
    g = (g * (n - 1) + up) / n; l = (l * (n - 1) + dn) / n;
    out[i] = 100 - 100 / (1 + g / (l || 1e-9));
  }
  return out;
}

// ---------- stats ----------
function stats(trades, days) {
  // trades: [{date, ret}] with ret as a fraction of capital (net of slippage)
  const n = trades.length;
  if (!n) return { n: 0 };
  const wins = trades.filter(t => t.ret > 0), losses = trades.filter(t => t.ret <= 0);
  let eq = 1, peak = 1, mdd = 0;
  for (const t of trades) { eq *= 1 + t.ret; peak = Math.max(peak, eq); mdd = Math.min(mdd, eq / peak - 1); }
  const years = days / 252;
  const mean = trades.reduce((s, t) => s + t.ret, 0) / n;
  const sd = Math.sqrt(trades.reduce((s, t) => s + (t.ret - mean) ** 2, 0) / Math.max(n - 1, 1));
  return {
    n,
    winRate: wins.length / n,
    avgWin: wins.length ? wins.reduce((s, t) => s + t.ret, 0) / wins.length : 0,
    avgLoss: losses.length ? losses.reduce((s, t) => s + t.ret, 0) / losses.length : 0,
    expectancy: mean,
    tStat: sd ? (mean / sd) * Math.sqrt(n) : 0,
    totalReturn: eq - 1,
    cagr: years > 0 ? eq ** (1 / years) - 1 : NaN,
    maxDrawdown: mdd,
    perYear: n / years,
  };
}

function split(trades, bars) {
  const is = trades.filter(t => t.date < SPLIT), oos = trades.filter(t => t.date >= SPLIT);
  const isDays = bars.filter(b => b.date < SPLIT).length, oosDays = bars.filter(b => b.date >= SPLIT).length;
  return { inSample: stats(is, isDays), outOfSample: stats(oos, oosDays), all: stats(trades, bars.length) };
}

// ---------- daily strategies (signal on QQQ, trade QQQ or TQQQ) ----------
function aligned(signalSym, tradeSym) {
  const s = load(`${signalSym}_1d.csv`), t = load(`${tradeSym}_1d.csv`);
  const tm = new Map(t.map(b => [b.date, b]));
  return s.filter(b => tm.has(b.date)).map(b => ({ ...b, t: tm.get(b.date) }));
}

// Generic swing engine: enter at today's close when enter(i) is true, exit at the
// close on the first later day where exit(i, entryIdx) is true, or after maxHold days.
function swing(bars, tradeSym, enter, exit, maxHold = 10) {
  const slip = SLIP[tradeSym];
  const trades = [];
  for (let i = 0; i < bars.length - 1; i++) {
    if (!enter(i)) continue;
    const e = i;
    let x = i + 1;
    while (x < bars.length - 1 && !exit(x, e) && x - e < maxHold) x++;
    trades.push({ date: bars[e].date, ret: (bars[x].t.close * (1 - slip)) / (bars[e].t.close * (1 + slip)) - 1, hold: x - e });
    i = x; // one position at a time
  }
  return trades;
}

function dailyStrategies() {
  const out = {};
  for (const tradeSym of ['QQQ', 'TQQQ']) {
    const b = aligned('QQQ', tradeSym);
    const c = b.map(x => x.close);
    const r2 = rsi(c, 2);
    const s200 = c.map((_, i) => sma(c, 200, i));
    const s5 = c.map((_, i) => sma(c, 5, i));
    const ibs = b.map(x => (x.close - x.low) / ((x.high - x.low) || 1e-9));
    const slip = SLIP[tradeSym];

    out[`RSI2<10 above 200d, exit close>5d SMA [${tradeSym}]`] = split(
      swing(b, tradeSym, i => c[i] > s200[i] && r2[i] < 10, x => c[x] > s5[x]), b);
    out[`IBS<0.2 above 200d, exit next close [${tradeSym}]`] = split(
      swing(b, tradeSym, i => c[i] > s200[i] && ibs[i] < 0.2, () => true, 1), b);
    out[`3 down closes above 200d, exit close>5d SMA [${tradeSym}]`] = split(
      swing(b, tradeSym, i => i > 3 && c[i] > s200[i] && c[i] < c[i - 1] && c[i - 1] < c[i - 2] && c[i - 2] < c[i - 3], x => c[x] > s5[x]), b);

    // Overnight: buy close, sell next open. Intraday: buy open, sell close.
    const on = [], id = [];
    for (let i = 0; i < b.length - 1; i++) {
      on.push({ date: b[i].date, ret: (b[i + 1].t.open * (1 - slip)) / (b[i].t.close * (1 + slip)) - 1 });
      id.push({ date: b[i + 1].date, ret: (b[i + 1].t.close * (1 - slip)) / (b[i + 1].t.open * (1 + slip)) - 1 });
    }
    out[`Overnight close->open, every day [${tradeSym}]`] = split(on, b);
    out[`Intraday open->close, every day [${tradeSym}]`] = split(id, b);

    // Trend: hold while QQQ closed above its 200d SMA, re-check daily (cash otherwise, 0%).
    const tr = [];
    for (let i = 200; i < b.length - 1; i++) {
      if (c[i] > s200[i]) tr.push({ date: b[i + 1].date, ret: b[i + 1].t.close / b[i].t.close - 1 });
      // slippage charged on each switch
      if ((c[i] > s200[i]) !== (c[i - 1] > s200[i - 1])) tr.push({ date: b[i + 1].date, ret: -slip });
    }
    out[`Trend: hold while QQQ > 200d SMA [${tradeSym}]`] = split(tr, b);

    const bh = b.slice(1).map((x, i) => ({ date: x.date, ret: x.t.close / b[i].t.close - 1 }));
    out[`Buy and hold (benchmark) [${tradeSym}]`] = split(bh, b);
  }
  return out;
}

// ---------- intraday strategies on QQQ 10-minute bars ----------
function intradayDays() {
  const bars = load('QQQ_10m.csv');
  const byDay = new Map();
  for (const b of bars) {
    const d = b.ts.slice(0, 10);
    if (!byDay.has(d)) byDay.set(d, []);
    byDay.get(d).push(b);
  }
  // keep full sessions only (39 ten-minute bars; half days dropped)
  return [...byDay.entries()].filter(([, v]) => v.length >= 38).map(([date, v]) => ({ date, bars: v }));
}

// Opening-range breakout. orBars = number of 10-min bars in the range (3 = 30 min).
// side: 'long', 'short' or 'both'. targetR: take profit at this multiple of risk, or null to hold to the close.
function orb(days, { orBars = 3, side = 'both', targetR = null, lev = 1, cutoff = 30 }) {
  const slip = lev === 1 ? SLIP.QQQ : SLIP.TQQQ;
  const trades = [];
  for (const { date, bars } of days) {
    const or = bars.slice(0, orBars);
    const hi = Math.max(...or.map(b => b.high)), lo = Math.min(...or.map(b => b.low));
    const risk = hi - lo;
    let pos = null;
    for (let k = orBars; k < bars.length; k++) {
      const b = bars[k];
      const last = k === bars.length - 1;
      if (!pos) {
        if (k >= cutoff) break; // no entries after bar index cutoff (30 = 14:30)
        if ((side === 'long' || side === 'both') && b.high > hi) pos = { dir: 1, entry: Math.max(hi, b.open), stop: lo };
        else if ((side === 'short' || side === 'both') && b.low < lo) pos = { dir: -1, entry: Math.min(lo, b.open), stop: hi };
        if (pos) pos.target = targetR ? pos.entry + pos.dir * targetR * risk : null;
        if (!pos) continue;
        // a bar that triggers and also hits the stop: assume the stop (conservative)
      }
      let exit = null;
      if (pos.dir === 1 ? b.low <= pos.stop : b.high >= pos.stop) exit = pos.dir === 1 ? Math.min(pos.stop, b.open) : Math.max(pos.stop, b.open);
      else if (pos.target && (pos.dir === 1 ? b.high >= pos.target : b.low <= pos.target)) exit = pos.target;
      else if (last) exit = b.close;
      if (exit != null) {
        const raw = pos.dir * (exit / pos.entry - 1);
        trades.push({ date, ret: lev * raw - 2 * slip });
        break;
      }
    }
  }
  return trades;
}

// Intraday momentum (Gao, Han, Li, Zhou 2018): the return from the prior close to
// 10:00 predicts the last half hour. Trade 15:30 -> 16:00 in that direction.
function lastHalfHour(days, dailyClose, { lev = 1, longOnly = false }) {
  const slip = lev === 1 ? SLIP.QQQ : SLIP.TQQQ;
  const trades = [];
  for (const { date, bars } of days) {
    const pc = dailyClose.get(date);
    if (!pc) continue;
    const firstHalf = bars[2].close / pc - 1;
    const e = bars[bars.length - 3].close, x = bars[bars.length - 1].close; // 15:30 -> 16:00
    const dir = firstHalf > 0 ? 1 : -1;
    if (longOnly && dir < 0) continue;
    trades.push({ date, ret: lev * dir * (x / e - 1) - 2 * slip });
  }
  return trades;
}

function intradayStrategies() {
  const days = intradayDays();
  const daily = load('QQQ_1d.csv');
  const prevClose = new Map();
  for (let i = 1; i < daily.length; i++) prevClose.set(daily[i].date, daily[i - 1].close);
  const n = days.length;
  const out = {};
  const add = (name, t) => (out[name] = { all: stats(t, n) });
  add('ORB 30m both sides, 1.5R target (current sprint rule, 3x)', orb(days, { side: 'both', targetR: 1.5, lev: 3 }));
  add('ORB 30m both sides, hold to close (3x)', orb(days, { side: 'both', lev: 3 }));
  add('ORB 30m long only, hold to close (3x)', orb(days, { side: 'long', lev: 3 }));
  add('ORB 30m short only, hold to close (3x)', orb(days, { side: 'short', lev: 3 }));
  add('ORB 60m both sides, hold to close (3x)', orb(days, { orBars: 6, side: 'both', lev: 3 }));
  add('ORB 10m both sides, hold to close (3x)', orb(days, { orBars: 1, side: 'both', lev: 3 }));
  add('Last half hour follows first half hour (3x)', lastHalfHour(days, prevClose, { lev: 3 }));
  add('Last half hour, long only (3x)', lastHalfHour(days, prevClose, { lev: 3, longOnly: true }));
  return { days: n, from: days[0].date, to: days[n - 1].date, results: out };
}

// ---------- report ----------
const pct = x => (x == null || Number.isNaN(x) ? '   n/a' : `${(x * 100).toFixed(2)}%`.padStart(8));
function row(name, s) {
  if (!s || !s.n) return `${name.padEnd(62)}  no trades`;
  return `${name.padEnd(62)} ${String(s.n).padStart(5)} ${pct(s.winRate)} ${pct(s.avgWin)} ${pct(s.avgLoss)} ${pct(s.expectancy)} ${s.tStat.toFixed(2).padStart(6)} ${pct(s.cagr)} ${pct(s.maxDrawdown)}`;
}

module.exports = { load, sma, rsi, stats, SLIP, SPLIT };
if (require.main === module) main();

function main() {
const daily = dailyStrategies();
const intraday = intradayStrategies();
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ daily, intraday }, null, 2));
} else {
  const hdr = `${'strategy'.padEnd(62)} ${'n'.padStart(5)} ${'win%'.padStart(8)} ${'avgWin'.padStart(8)} ${'avgLoss'.padStart(8)} ${'exp/tr'.padStart(8)} ${'t'.padStart(6)} ${'CAGR'.padStart(8)} ${'maxDD'.padStart(8)}`;
  for (const per of ['inSample', 'outOfSample']) {
    console.log(`\nDAILY, ${per === 'inSample' ? '2016-2021 (in-sample)' : '2022-2026 (out-of-sample)'}\n${hdr}`);
    for (const [k, v] of Object.entries(daily)) console.log(row(k, v[per]));
  }
  console.log(`\nINTRADAY QQQ 10-min, ${intraday.from} to ${intraday.to} (${intraday.days} days; CAGR annualised from this window)\n${hdr}`);
  for (const [k, v] of Object.entries(intraday.results)) console.log(row(k, v.all));
}
}
