"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { book, validate, value, parseOption } = require("../trading/paper.js");

const policy = { startingCash: 100000, noMargin: true, noNakedShortOptions: true };
const t = (o) => ({ date: "2026-10-12", thesis: "test", ...o });

test("buy and partial sell keep cash and cost basis right", () => {
  const ledger = [
    t({ action: "buy", asset: "etf", symbol: "VTI", qty: 100, price: 300 }),
    t({ action: "sell", asset: "etf", symbol: "VTI", qty: 40, price: 310 }),
  ];
  const b = book(policy, ledger);
  assert.equal(b.cash, 100000 - 30000 + 12400);
  assert.equal(b.positions.VTI.qty, 60);
  assert.equal(b.positions.VTI.cost, 18000);
});

test("rejects overspending, shorting stock, and missing thesis", () => {
  assert.match(validate(policy, [], t({ action: "buy", asset: "stock", symbol: "AAPL", qty: 1000, price: 200 })).join(), /not enough cash/);
  assert.match(validate(policy, [], t({ action: "sell", asset: "stock", symbol: "AAPL", qty: 1, price: 200 })).join(), /no shorting/);
  assert.match(validate(policy, [], { date: "2026-10-12", action: "buy", asset: "etf", symbol: "VTI", qty: 1, price: 1 }).join(), /thesis/);
});

test("covered call needs 100 shares per contract", () => {
  const call = t({ action: "sell", asset: "option", symbol: "AAPL 2027-01-15 C 250", qty: 1, price: 5 });
  assert.match(validate(policy, [], call).join(), /need 100 shares/);
  const shares = [t({ action: "buy", asset: "stock", symbol: "AAPL", qty: 100, price: 200 })];
  assert.deepEqual(validate(policy, shares, call), []);
});

test("cash-secured put reserves strike times 100", () => {
  const put = (qty) => t({ action: "sell", asset: "option", symbol: "KO 2027-01-15 P 60", qty, price: 2 });
  assert.deepEqual(validate(policy, [], put(10)), []);
  assert.match(validate(policy, [], put(20)).join(), /cash-secured puts need/);
});

test("expire closes an option at zero", () => {
  const ledger = [
    t({ action: "buy", asset: "option", symbol: "SPY 2026-12-18 P 500", qty: 2, price: 3 }),
    t({ action: "expire", asset: "option", symbol: "SPY 2026-12-18 P 500", qty: 2 }),
  ];
  assert.deepEqual(validate(policy, ledger.slice(0, 1), ledger[1]), []);
  const b = book(policy, ledger);
  assert.equal(b.cash, 100000 - 600);
  assert.deepEqual(b.positions, {});
});

test("value marks positions and needs every price", () => {
  const ledger = [t({ action: "buy", asset: "crypto", symbol: "BTC", qty: 0.05, price: 100000 })];
  const v = value(policy, ledger, { BTC: 110000 });
  assert.equal(Math.round(v.total), 100500);
  assert.throws(() => value(policy, ledger, {}), /missing prices/);
  assert.deepEqual(parseOption("AAPL 2027-01-15 C 200"), { underlying: "AAPL", expiry: "2027-01-15", type: "call", strike: 200 });
});
