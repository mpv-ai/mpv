"use strict";

// ATLAS Insight calculation layer. One place for every return, goal and risk
// figure so the dashboard, CSV exports and reports always agree.
// Inputs are plain numbers in dollars; returns are decimals (0.02 = 2%).

const DAILY_TARGET = 0.02;

// Simple return for a period with no external flows.
function simpleReturn(begin, end) {
  if (!(begin > 0)) return null; // UNVERIFIED: no valid denominator
  return (end - begin) / begin;
}

// Time-weighted return. segments: [{ begin, end }] valued immediately
// before and after each external flow, in order. [R1]
function twr(segments) {
  if (!segments.length) return null;
  let growth = 1;
  for (const s of segments) {
    const r = simpleReturn(s.begin, s.end);
    if (r === null) return null;
    growth *= 1 + r;
  }
  return growth - 1;
}

// Modified Dietz approximation. flows: [{ amount, weight }] where weight is
// the fraction of the period the flow was invested. [R1]
function modifiedDietz(begin, end, flows) {
  const net = flows.reduce((n, f) => n + f.amount, 0);
  const denom = begin + flows.reduce((n, f) => n + f.amount * f.weight, 0);
  if (!(denom > 0)) return null;
  return (end - begin - net) / denom;
}

// Net P&L for a period: ending NAV less beginning NAV less net external flows.
function netPnl(begin, end, flows = 0) {
  return end - begin - flows;
}

// Daily goal comparison. status: provisional intraday or final reconciled day.
function goal({ ret, begin, pnl, hasFlows = false, final = false, verified = true }) {
  if (ret === null || ret === undefined || !verified) {
    return { status: "UNVERIFIED", gapPP: null, attainmentPct: null, targetDollars: null, surplus: null, needed: null };
  }
  const gapPP = (ret - DAILY_TARGET) * 100;
  const attainmentPct = (ret / DAILY_TARGET) * 100; // not capped, can be negative
  const out = { gapPP, attainmentPct, targetDollars: null, surplus: null, needed: null, targetIsReferenceOnly: hasFlows };
  if (begin > 0) {
    out.targetDollars = begin * DAILY_TARGET;
    if (!hasFlows) {
      out.surplus = pnl - out.targetDollars;
      out.needed = Math.max(0, out.targetDollars - pnl);
    }
  }
  const hit = ret >= DAILY_TARGET;
  out.status = final ? (hit ? "ACHIEVED" : "NOT ACHIEVED") : hit ? "ABOVE TARGET NOW" : "BELOW TARGET NOW";
  return out;
}

// Flow-neutral wealth index starting at 100, and the hypothetical 2% path.
function wealthIndex(dailyReturns) {
  const out = [100];
  for (const r of dailyReturns) out.push(out[out.length - 1] * (1 + r));
  return out;
}

function targetIndex(days) {
  return 100 * Math.pow(1 + DAILY_TARGET, days);
}

// Drawdown from the high-water mark of a wealth index.
function drawdown(index) {
  let peak = -Infinity;
  let max = 0;
  let current = 0;
  for (const v of index) {
    peak = Math.max(peak, v);
    current = peak > 0 ? v / peak - 1 : 0;
    max = Math.min(max, current);
  }
  return { current, max };
}

// Cost-based deployment. P = position cost, O = order reservations, F = free cash.
function deployment(P, O, F) {
  const D = P + O + F;
  if (!(D > 0)) return { filled: null, committed: null };
  return { filled: P / D, committed: (P + O) / D };
}

// Profit factor: positive realized P&L over absolute negative realized P&L.
function profitFactor(realized) {
  const wins = realized.filter((x) => x > 0).reduce((a, b) => a + b, 0);
  const losses = Math.abs(realized.filter((x) => x < 0).reduce((a, b) => a + b, 0));
  return losses === 0 ? null : wins / losses; // null renders as N/A
}

module.exports = {
  DAILY_TARGET, simpleReturn, twr, modifiedDietz, netPnl, goal,
  wealthIndex, targetIndex, drawdown, deployment, profitFactor,
};
