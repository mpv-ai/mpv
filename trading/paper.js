#!/usr/bin/env node
"use strict";

// MPV paper-trading book. Pure bookkeeping: no network, no brokerage calls.
//
//   node trading/paper.js positions             cash and open positions
//   node trading/paper.js trade '<json>'        validate and record a trade
//   node trading/paper.js value <prices.json>   mark to market, append to history.json
//
// Kalshi contracts are asset "event", symbol "<MARKET TICKER> YES|NO", priced in
// dollars (0.01-0.99). Each contract pays $1 if its side wins. Record the
// outcome with action "settle" at price 1 (won) or 0 (lost).

const fs = require("node:fs");
const path = require("node:path");

const DIR = __dirname;
const MULT = { stock: 1, etf: 1, crypto: 1, option: 100, event: 1 };
const ACTIONS = ["buy", "sell", "expire", "settle"];

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8"));
}

function save(name, data) {
  fs.writeFileSync(path.join(DIR, name), JSON.stringify(data, null, 2) + "\n");
}

// Option symbol: "AAPL 2027-01-15 C 200"
function parseOption(symbol) {
  const m = String(symbol).match(/^([A-Z.]+) (\d{4}-\d{2}-\d{2}) ([CP]) (\d+(?:\.\d+)?)$/);
  if (!m) return null;
  return { underlying: m[1], expiry: m[2], type: m[3] === "C" ? "call" : "put", strike: Number(m[4]) };
}

// Kalshi contract symbol: "KXFEDDECISION-26OCT-H0 YES"
function parseEvent(symbol) {
  const m = String(symbol).match(/^([A-Z0-9][A-Z0-9.-]*) (YES|NO)$/);
  return m ? { market: m[1], side: m[2] } : null;
}

// Replays the ledger. qty is signed: negative is a short option.
function book(policy, ledger) {
  let cash = policy.startingCash;
  const pos = {};
  for (const t of ledger) {
    const key = t.symbol;
    const p = (pos[key] ||= { symbol: key, asset: t.asset, qty: 0, cost: 0 });
    const signed = t.action === "buy" ? t.qty : -t.qty;
    if (t.action === "expire") {
      // Worthless expiry: drop the contracts at zero.
      p.qty = 0;
      p.cost = 0;
    } else {
      cash -= signed * t.price * MULT[t.asset] + (t.fee || 0);
      if (p.qty === 0 || Math.sign(p.qty) === Math.sign(signed)) {
        p.cost += signed * t.price * MULT[t.asset];
      } else {
        p.cost *= (p.qty + signed) / p.qty;
      }
      p.qty += signed;
    }
    if (Math.abs(p.qty) < 1e-9) delete pos[key];
  }
  return { cash, positions: pos };
}

function validate(policy, ledger, t) {
  const errors = [];
  if (!ACTIONS.includes(t.action)) errors.push(`action must be one of ${ACTIONS.join(", ")}`);
  if (!(t.asset in MULT)) errors.push(`asset must be one of ${Object.keys(MULT).join(", ")}`);
  if (!t.symbol) errors.push("symbol is required");
  if (!(t.qty > 0)) errors.push("qty must be positive");
  if (t.action !== "expire" && !(t.price >= 0)) errors.push("price is required");
  if (!t.date || !/^\d{4}-\d{2}-\d{2}/.test(t.date)) errors.push("date must be ISO (YYYY-MM-DD)");
  if (!t.thesis) errors.push("thesis is required: say why");
  if (t.asset === "stock" || t.asset === "etf" || t.asset === "option") {
    if (t.asset !== "option" && !Number.isInteger(t.qty)) errors.push("stock and ETF quantities are whole shares");
  }
  const opt = t.asset === "option" ? parseOption(t.symbol) : null;
  if (t.asset === "option" && !opt) errors.push('option symbol must look like "AAPL 2027-01-15 C 200"');
  if (t.asset === "option" && !Number.isInteger(t.qty)) errors.push("option quantity is whole contracts");
  if (errors.length) return errors;

  const before = book(policy, ledger);
  const held = before.positions[t.symbol]?.qty || 0;
  if (t.asset === "event") {
    if (!parseEvent(t.symbol)) errors.push('event symbol must look like "KXFEDDECISION-26OCT-H0 YES"');
    if (!Number.isInteger(t.qty)) errors.push("event quantity is whole contracts");
    if (t.action === "settle") {
      if (t.price !== 0 && t.price !== 1) errors.push("settle price is 1 (won) or 0 (lost)");
    } else if (t.action === "expire") {
      errors.push("use settle, not expire, for event contracts");
    } else if (!(t.price > 0 && t.price < 1)) {
      errors.push("event price is in dollars, between 0.01 and 0.99");
    }
  } else if (t.action === "settle") {
    errors.push("settle is only for event contracts");
  }
  if (errors.length) return errors;

  if (t.action === "settle" && Math.abs(t.qty - held) > 1e-9) errors.push(`settle must close all ${held} ${t.symbol}`);
  if (t.action === "expire" && held === 0) errors.push(`no open ${t.symbol} to expire`);
  if (t.action === "sell" && t.asset !== "option" && t.qty > held + 1e-9) {
    errors.push(`cannot sell ${t.qty} ${t.symbol}: only ${held} held (no shorting)`);
  }

  const after = book(policy, [...ledger, t]);
  if (policy.noMargin && after.cash < -1e-6) {
    errors.push(`not enough cash: would leave ${after.cash.toFixed(2)}`);
  }

  // Short options must be covered by shares (calls) or reserved cash (puts).
  if (policy.noNakedShortOptions) {
    let reserved = 0;
    for (const p of Object.values(after.positions)) {
      if (p.asset !== "option" || p.qty >= 0) continue;
      const o = parseOption(p.symbol);
      if (o.type === "call") {
        const shares = after.positions[o.underlying]?.qty || 0;
        const shortCalls = Object.values(after.positions)
          .filter((q) => q.asset === "option" && q.qty < 0 && parseOption(q.symbol).type === "call" && parseOption(q.symbol).underlying === o.underlying)
          .reduce((n, q) => n - q.qty, 0);
        if (shortCalls * 100 > shares) errors.push(`short ${o.underlying} calls need ${shortCalls * 100} shares, have ${shares}`);
      } else {
        reserved += -p.qty * o.strike * 100;
      }
    }
    if (reserved > after.cash + 1e-6) {
      errors.push(`cash-secured puts need ${reserved.toFixed(2)} cash, would have ${after.cash.toFixed(2)}`);
    }
  }
  // Event contracts at cost stay under maxEventPct of the book at cost.
  if (policy.maxEventPct != null && t.asset === "event" && t.action === "buy") {
    const all = Object.values(after.positions);
    const atCost = after.cash + all.reduce((n, p) => n + p.cost, 0);
    const events = all.filter((p) => p.asset === "event").reduce((n, p) => n + p.cost, 0);
    if (events > (atCost * policy.maxEventPct) / 100 + 1e-6) {
      errors.push(`event contracts would be ${events.toFixed(2)}, over ${policy.maxEventPct}% of the book`);
    }
  }
  return [...new Set(errors)];
}

function value(policy, ledger, prices) {
  const { cash, positions } = book(policy, ledger);
  const missing = Object.keys(positions).filter((s) => !(s in prices));
  if (missing.length) throw new Error(`missing prices for: ${missing.join(", ")}`);
  const rows = Object.values(positions).map((p) => {
    const mv = p.qty * prices[p.symbol] * MULT[p.asset];
    return { ...p, price: prices[p.symbol], marketValue: mv, unrealized: mv - p.cost };
  });
  const total = cash + rows.reduce((n, r) => n + r.marketValue, 0);
  for (const r of rows) r.pct = (100 * r.marketValue) / total;
  return { cash, total, rows };
}

function main(argv) {
  const [cmd, arg] = argv;
  const policy = load("policy.json");
  const ledger = load("ledger.json");
  if (cmd === "positions") {
    console.log(JSON.stringify(book(policy, ledger), null, 2));
  } else if (cmd === "trade") {
    const t = JSON.parse(arg);
    const errors = validate(policy, ledger, t);
    if (errors.length) {
      console.error("REJECTED\n- " + errors.join("\n- "));
      process.exit(1);
    }
    ledger.push(t);
    save("ledger.json", ledger);
    console.log(`RECORDED ${t.action} ${t.qty} ${t.symbol}${t.price != null ? " @ " + t.price : ""}`);
  } else if (cmd === "value") {
    const prices = JSON.parse(fs.readFileSync(arg, "utf8"));
    const v = value(policy, ledger, prices);
    const history = load("history.json");
    history.push({
      date: prices.date || new Date().toISOString().slice(0, 10),
      total: Number(v.total.toFixed(2)),
      cash: Number(v.cash.toFixed(2)),
      benchmarkPrice: prices[policy.benchmark] ?? null,
    });
    save("history.json", history);
    console.log(JSON.stringify(v, null, 2));
  } else {
    console.error("usage: paper.js positions | trade '<json>' | value <prices.json>");
    process.exit(2);
  }
}

if (require.main === module) main(process.argv.slice(2));

module.exports = { book, validate, value, parseOption, parseEvent };
