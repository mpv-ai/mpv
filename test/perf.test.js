"use strict";

// Validation cases from the ATLAS Insight specification, section 12.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const p = require("../trading/perf.js");

const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

test("no-flow case: $1,000 to $1,015", () => {
  const ret = p.simpleReturn(1000, 1015);
  const pnl = p.netPnl(1000, 1015);
  const g = p.goal({ ret, begin: 1000, pnl });
  close(pnl, 15);
  close(ret, 0.015);
  close(g.targetDollars, 20);
  close(g.gapPP, -0.5);
  close(g.surplus, -5);
  close(g.needed, 5);
  close(g.attainmentPct, 75);
  assert.equal(g.status, "BELOW TARGET NOW");
  assert.equal(p.goal({ ret, begin: 1000, pnl, final: true }).status, "NOT ACHIEVED");
});

test("external-flow case: a $200 deposit is not profit", () => {
  const pnl = p.netPnl(1000, 1222.1, 200);
  close(pnl, 22.1);
  const r = p.twr([{ begin: 1000, end: 1010 }, { begin: 1210, end: 1222.1 }]);
  close(r, 0.0201, 1e-4);
  const g = p.goal({ ret: r, begin: 1000, pnl, hasFlows: true });
  assert.equal(g.surplus, null); // dollar target is reference-only with flows
  assert.equal(g.targetIsReferenceOnly, true);
});

test("compounding case: seven 2% days is 14.8686%, not 14%", () => {
  close(p.targetIndex(7) / 100 - 1, 0.148686, 1e-6);
  const idx = p.wealthIndex(Array(7).fill(0.02));
  close(idx[7], p.targetIndex(7));
});

test("attainment is not capped and can be negative", () => {
  close(p.goal({ ret: 0.05, begin: 100, pnl: 5 }).attainmentPct, 250);
  close(p.goal({ ret: -0.01, begin: 100, pnl: -1 }).attainmentPct, -50);
  assert.equal(p.goal({ ret: null }).status, "UNVERIFIED");
  assert.equal(p.simpleReturn(0, 10), null);
});

test("drawdown uses the high-water mark", () => {
  const d = p.drawdown([100, 110, 99, 105]);
  close(d.max, -0.1);
  close(d.current, 105 / 110 - 1);
});

test("deployment and profit factor edge cases", () => {
  assert.deepEqual(p.deployment(0, 0, 0), { filled: null, committed: null });
  const d = p.deployment(50, 25, 25);
  close(d.filled, 0.5);
  close(d.committed, 0.75);
  assert.equal(p.profitFactor([10, 5]), null);
  close(p.profitFactor([10, -5]), 2);
  close(p.modifiedDietz(1000, 1222.1, [{ amount: 200, weight: 0.5 }]), 22.1 / 1100);
});
