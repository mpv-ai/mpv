#!/usr/bin/env node
"use strict";

// Builds the ATLAS Insight snapshot from verified records and, optionally, a
// standalone dashboard with the snapshot inlined.
//
//   node trading/dashboard/build.js                 writes snapshot.json next to index.html
//   node trading/dashboard/build.js --html <file>   also writes a standalone HTML snapshot
//
// Live account values come from trading/live/navs.json (kept out of git).

const fs = require("node:fs");
const path = require("node:path");
const perf = require("../perf.js");
const paper = require("../paper.js");

const ROOT = path.join(__dirname, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const round = (x, d = 2) => (x === null || x === undefined ? null : Number(x.toFixed(d)));
const checks = [];
function check(name, ok, detail) {
  checks.push({ name, ok: !!ok, detail });
}

// Live book (real money).
function liveBook() {
  if (!exists("live/navs.json")) return { available: false, reason: "trading/live/navs.json not found" };
  const navs = read("live/navs.json");
  const ledger = read("live/ledger.json");
  const snaps = navs.snapshots;
  const days = [];
  for (let i = 1; i < snaps.length; i++) {
    const b = snaps[i - 1], e = snaps[i];
    const flows = navs.flows.filter((f) => f.date === e.date).reduce((n, f) => n + f.amount, 0);
    const pnl = perf.netPnl(b.nav, e.nav, flows);
    const ret = flows ? null : perf.simpleReturn(b.nav, e.nav);
    // Bridge: realized on today's closes plus the change in unrealized P&L.
    const fills = ledger.filter((t) => t.date === e.date);
    let realized = 0;
    for (const t of fills) {
      if (t.side === "sell") {
        const lot = b.positions.find((p) => p.symbol === t.symbol);
        const basis = lot ? (lot.costBasis * t.quantity) / lot.quantity : 0;
        realized += t.quantity * t.price - t.fees - basis;
      }
    }
    const unrealB = b.positions.reduce((n, p) => n + p.quantity * p.mark - p.costBasis, 0);
    const unrealE = e.positions.reduce((n, p) => n + p.quantity * p.mark - p.costBasis, 0);
    const residual = pnl - (realized + (unrealE - unrealB));
    check(`Live ${e.date}: NAV movement equals realized plus unrealized change`, Math.abs(residual) < 0.01, `residual ${residual.toFixed(4)}`);
    const navParts = e.cash + e.positions.reduce((n, p) => n + p.quantity * p.mark, 0);
    check(`Live ${e.date}: cash plus positions equals NAV`, Math.abs(navParts - e.nav) < 0.01, `${navParts.toFixed(2)} vs ${e.nav}`);
    days.push({
      date: e.date, scope: "Live", kind: e.kind, begin: b.nav, end: e.nav, flows, pnl: round(pnl), ret,
      realized: round(realized), unrealizedChange: round(unrealE - unrealB), residual: round(residual, 4),
      goal: perf.goal({ ret, begin: b.nav, pnl, hasFlows: !!flows, final: e.kind === "close" }),
      complete: e.kind === "close", partialInception: false,
    });
  }
  const last = snaps[snaps.length - 1];
  const idx = perf.wealthIndex(days.map((d) => d.ret ?? 0));
  const trades = ledger.map((t) => ({
    scope: "Live", date: t.date, symbol: t.symbol, side: t.side, quantity: t.quantity, price: t.price,
    fees: t.fees, value: round(t.quantity * t.price - (t.side === "sell" ? t.fees : -t.fees)),
    status: "Filled", orderId: t.orderId, note: t.note,
  }));
  return {
    available: true, mode: "LIVE", scope: navs.scope, inception: navs.inception, inceptionNote: navs.inceptionNote,
    nav: last.nav, cash: last.cash, unsettledCash: last.unsettledCash ?? 0, freeCash: last.buyingPower ?? last.cash,
    reserved: last.reservedForOrders ?? 0, positions: last.positions, asOfUtc: last.retrievedUtc, source: last.source,
    valuation: last.valuation, days, index: idx, drawdown: perf.drawdown(idx), trades,
    deployment: perf.deployment(last.positions.reduce((n, p) => n + p.costBasis, 0), last.reservedForOrders ?? 0, last.buyingPower ?? last.cash),
  };
}

// Paper books (simulated). dir is relative to trading/.
function paperBook(dir = "", label = "Paper") {
  const f = (n) => path.join(dir, n);
  const policy = read(f("policy.json"));
  const target = policy.dailyTarget ?? perf.DAILY_TARGET;
  const ledger = read(f("ledger.json"));
  const history = read(f("history.json"));
  if (!history.length) {
    return { available: false, mode: "PAPER", label, target, reason: `${label} book has no marked days yet (starts ${policy.evaluation?.start ?? "soon"})` };
  }
  const prices = exists(f("prices.json")) ? read(f("prices.json")) : read("prices.json");
  const v = paper.value(policy, ledger, prices);
  check(`${label}: latest marked total matches history`, Math.abs(v.total - history[history.length - 1].total) < 0.01, `${v.total.toFixed(2)} vs ${history[history.length - 1].total}`);
  const series = [{ date: "inception", total: policy.startingCash }, ...history];
  const days = [];
  for (let i = 1; i < series.length; i++) {
    const b = series[i - 1], e = series[i];
    const ret = perf.simpleReturn(b.total, e.total);
    const pnl = perf.netPnl(b.total, e.total);
    // The first day is a partial inception day unless the book started trading at that day's open.
    const partial = i === 1 && policy.evaluation?.start !== e.date;
    days.push({
      date: e.date, scope: label, kind: e.provisional ? "intraday" : "close", begin: b.total, end: e.total, flows: 0,
      pnl: round(pnl), ret, realized: null, unrealizedChange: null, residual: null,
      splitNote: "The paper engine does not split realized and unrealized P&L.",
      goal: partial
        ? { ...perf.goal({ ret, begin: b.total, pnl, target }), status: "PARTIAL DAY (inception)" }
        : perf.goal({ ret, begin: b.total, pnl, final: !e.provisional, target }),
      complete: !e.provisional && !partial, partialInception: partial,
    });
  }
  const idx = perf.wealthIndex(days.map((d) => d.ret));
  const spy0 = history[0].benchmarkPrice, spyN = history[history.length - 1].benchmarkPrice;
  const rows = v.rows.map((r) => ({ ...r, unrealized: round(r.unrealized), marketValue: round(r.marketValue), cost: round(r.cost), pct: round(r.pct, 2) }));
  const trades = ledger.map((t) => {
    const mark = prices[t.symbol];
    return {
      scope: label, date: t.date, symbol: t.symbol, side: t.action, quantity: t.qty, price: t.price, fees: t.fee || 0,
      value: round(t.qty * t.price * (t.asset === "option" ? 100 : 1)), status: "Filled (paper)", mark: mark ?? null,
      thesis: t.thesis, by: t.by,
    };
  });
  return {
    limits: label === "Sprint"
      ? [["Max position", policy.maxPositionPct + "%"], ["Max crypto", policy.maxCryptoPct + "%"], ["Options premium (trade / total)", policy.maxOptionsPremiumPerTradePct + "% / " + policy.maxOptionsPremiumPct + "%"], ["Max events", policy.maxEventPct + "%"], ["Daily loss stop", policy.dailyLossStopPct + "%"], ["Drawdown halt", policy.drawdownHaltPct + "%"]]
      : [["Max single stock", policy.maxPositionPct + "%"], ["Max crypto", policy.maxCryptoPct + "%"], ["Max event contracts", policy.maxEventPct + "%"], ["Min free cash", policy.minCashPct + "%"]],
    available: true, mode: "PAPER", label, target, startingCash: policy.startingCash, nav: round(v.total), cash: round(v.cash),
    positions: rows, asOf: prices.source, days, index: idx, drawdown: perf.drawdown(idx), trades,
    benchmark: { symbol: policy.benchmark, from: spy0, to: spyN, ret: perf.simpleReturn(spy0, spyN) },
    inceptionReturn: perf.simpleReturn(policy.startingCash, v.total),
    deployment: perf.deployment(rows.reduce((n, r) => n + r.cost, 0), 0, v.cash),
  };
}

function build() {
  const live = liveBook();
  const pap = paperBook();
  const sprint = paperBook("books/sprint", "Sprint");
  for (const [bk, dflt] of [[live, perf.DAILY_TARGET], [pap, pap.target], [sprint, sprint.target]]) for (const d of bk.days || []) {
    if (d.ret !== null) {
      const g = d.goal, tg = (bk.target ?? dflt) * 100;
      check(`${d.scope} ${d.date}: gap equals return less ${tg} points`, Math.abs(g.gapPP - (d.ret * 100 - tg)) < 1e-9, "");
    }
  }
  check("Compounding check: 1.02^7 - 1 = 14.8686%", Math.abs(perf.targetIndex(7) / 100 - 1 - 0.148686) < 1e-6, "");
  return {
    schema: "atlas-insight/1",
    renderedUtc: new Date().toISOString(),
    reportingDay: "America/New_York midnight to midnight",
    target: { daily: perf.DAILY_TARGET, note: "Stretch objective supplied by the owner. A hypothetical path, not a forecast." },
    live: { ...live, target: perf.DAILY_TARGET }, paper: pap, sprint, checks,
    sources: [
      { id: "robinhood.portfolio", scope: "Live", detail: live.source, asOfUtc: live.asOfUtc },
      { id: "robinhood.orders", scope: "Live", detail: "get_equity_orders, filled executions with fees", asOfUtc: live.asOfUtc },
      { id: "paper.prices", scope: "Paper", detail: pap.asOf, asOfUtc: null },
      { id: "paper.ledger", scope: "Paper", detail: "trading/ledger.json via paper.js", asOfUtc: null },
    ],
  };
}

const snap = build();
const failed = snap.checks.filter((c) => !c.ok);
fs.writeFileSync(path.join(__dirname, "snapshot.json"), JSON.stringify(snap, null, 2));
const i = process.argv.indexOf("--html");
if (i > 0) {
  const tpl = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  const data = JSON.stringify(snap).replace(/</g, "\\u003c");
  fs.writeFileSync(process.argv[i + 1], tpl.replace("/*SNAPSHOT*/null", data));
}
console.log(`${snap.checks.length} checks, ${failed.length} failed`);
for (const c of failed) console.log(`FAIL ${c.name}: ${c.detail}`);
process.exit(failed.length ? 1 : 0);
