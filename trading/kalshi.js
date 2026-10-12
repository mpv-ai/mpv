#!/usr/bin/env node
"use strict";

// Read-only Kalshi market data for the paper book. Public endpoints only:
// no API key, no account, no orders.
//
//   node trading/kalshi.js quote <TICKER> [...]   bid/ask for both sides
//   node trading/kalshi.js series <SERIES>        open markets in a series
//   node trading/kalshi.js mark <prices.json>     add bid marks for held contracts
//   node trading/kalshi.js settled                held contracts whose market settled

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { book, parseEvent } = require("./paper.js");

const BASE = "https://api.elections.kalshi.com/trade-api/v2";

function get(urlPath) {
  // curl honours the environment's proxy and CA bundle.
  let out;
  try {
    out = execFileSync("curl", ["-sS", "-f", "-m", "20", BASE + urlPath], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    const why = String(e.stderr || e.message).trim();
    throw new Error(`Kalshi request failed (${why}). If this is a 403, allow api.elections.kalshi.com in the environment's network settings.`);
  }
  return JSON.parse(out);
}

// Kalshi reports prices as *_dollars strings, or as integer cents on older payloads.
function dollars(m, field) {
  if (m[field + "_dollars"] != null) return Number(m[field + "_dollars"]);
  if (m[field] != null) return m[field] / 100;
  return null;
}

function quote(ticker) {
  const m = get(`/markets/${encodeURIComponent(ticker)}`).market;
  return {
    ticker: m.ticker,
    title: m.title,
    status: m.status,
    result: m.result || null,
    closeTime: m.close_time,
    yes: { bid: dollars(m, "yes_bid"), ask: dollars(m, "yes_ask") },
    no: { bid: dollars(m, "no_bid"), ask: dollars(m, "no_ask") },
    last: dollars(m, "last_price"),
    volume: m.volume ?? null,
    openInterest: m.open_interest ?? null,
    rules: m.rules_primary || null,
  };
}

function held() {
  const dir = __dirname;
  const policy = JSON.parse(fs.readFileSync(path.join(dir, "policy.json"), "utf8"));
  const ledger = JSON.parse(fs.readFileSync(path.join(dir, "ledger.json"), "utf8"));
  return Object.values(book(policy, ledger).positions).filter((p) => p.asset === "event");
}

function main([cmd, ...args]) {
  if (cmd === "quote") {
    console.log(JSON.stringify(args.map(quote), null, 2));
  } else if (cmd === "series") {
    const r = get(`/markets?status=open&limit=200&series_ticker=${encodeURIComponent(args[0])}`);
    for (const m of r.markets) {
      console.log(`${m.ticker} | YES ${dollars(m, "yes_bid")}/${dollars(m, "yes_ask")} | closes ${m.close_time} | ${m.title}`);
    }
  } else if (cmd === "mark") {
    const file = args[0];
    const prices = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const p of held()) {
      const { market, side } = parseEvent(p.symbol);
      const q = quote(market);
      // Mark at the bid of the held side: what the paper book could sell for now.
      const mark = q.result ? (q.result.toUpperCase() === side ? 1 : 0) : q[side.toLowerCase()].bid;
      prices[p.symbol] = mark;
      console.error(`${p.symbol}: ${mark}${q.result ? " (settled " + q.result + ")" : " (bid)"}`);
    }
    fs.writeFileSync(file, JSON.stringify(prices, null, 2) + "\n");
  } else if (cmd === "settled") {
    for (const p of held()) {
      const { market, side } = parseEvent(p.symbol);
      const q = quote(market);
      if (q.result) {
        const price = q.result.toUpperCase() === side ? 1 : 0;
        console.log(JSON.stringify({ action: "settle", asset: "event", symbol: p.symbol, qty: p.qty, price }));
      }
    }
  } else {
    console.error("usage: kalshi.js quote <TICKER>... | series <SERIES> | mark <prices.json> | settled");
    process.exit(2);
  }
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
