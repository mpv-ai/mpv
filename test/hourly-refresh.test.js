"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const swJs = fs.readFileSync(path.join(root, "sw.js"), "utf8");

function sameEdition(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

test("REFRESH_MS is exactly 3600000", () => {
  const m = appJs.match(/const\s+REFRESH_MS\s*=\s*([^;]+);/);
  assert.ok(m, "REFRESH_MS must be declared");
  const value = Function(`"use strict"; return (${m[1]});`)();
  assert.equal(value, 3600000);
  assert.equal(value, 60 * 60 * 1000);
});

test("app.js edition fetch uses cache: 'no-store'", () => {
  assert.match(appJs, /fetch\(\s*["']\.\/edition\.json["']\s*,\s*\{\s*cache:\s*["']no-store["']\s*\}/);
});

test("app.js listens for visibilitychange and pageshow", () => {
  assert.match(appJs, /addEventListener\(\s*["']visibilitychange["']/);
  assert.match(appJs, /visibilityState\s*===\s*["']visible["']/);
  assert.match(appJs, /addEventListener\(\s*["']pageshow["']/);
});

test("sw.js uses network-first for edition.json", () => {
  const start = swJs.indexOf('endsWith("edition.json")');
  assert.ok(start >= 0, "must special-case pathname ending with edition.json");
  const rest = swJs.slice(start);
  const fetchAt = rest.indexOf("fetch(");
  const matchAt = rest.indexOf("caches.match");
  assert.ok(fetchAt >= 0, "edition.json branch must fetch");
  assert.ok(matchAt >= 0, "edition.json branch must fall back to caches.match");
  assert.ok(fetchAt < matchAt, "fetch must run before caches.match for edition.json");
  assert.match(rest.slice(0, matchAt), /cache:\s*["']no-store["']/);
});

test("CACHE name was bumped off mpv-vol1-no1-20260820", () => {
  const m = swJs.match(/const\s+CACHE\s*=\s*["']([^"']+)["']/);
  assert.ok(m, "CACHE must be declared");
  assert.notEqual(m[1], "mpv-vol1-no1-20260820");
  assert.match(m[1], /hourly/);
  assert.match(m[1], /20260825/);
});

test("unchanged JSON does not apply", () => {
  const current = { volume: 1, number: 1, stories: [{ id: "rillet" }] };
  const incoming = JSON.parse(JSON.stringify(current));
  assert.equal(sameEdition(current, incoming), true);

  const changed = { volume: 1, number: 2, stories: [{ id: "rillet" }] };
  assert.equal(sameEdition(current, changed), false);

  let applied = 0;
  function apply(edition, data) {
    if (edition && sameEdition(edition, data)) return false;
    applied += 1;
    return true;
  }
  apply(current, incoming);
  assert.equal(applied, 0, "identical payload must not re-apply");
  apply(current, changed);
  assert.equal(applied, 1, "changed payload must apply");
});

test("app.js skips re-render when edition is unchanged", () => {
  assert.match(appJs, /function\s+sameEdition\s*\(/);
  assert.match(appJs, /if\s*\(\s*edition\s*&&\s*sameEdition\(\s*edition\s*,\s*data\s*\)\s*\)\s*return/);
});

test("failed refresh after boot does not show the error sheet", () => {
  const fnIdx = appJs.indexOf("function loadEdition");
  assert.ok(fnIdx >= 0, "loadEdition must exist");
  const fn = appJs.slice(fnIdx, fnIdx + 700);
  assert.match(fn, /if\s*\(\s*!booted\s*\)/);
  assert.match(fn, /The edition could not be set\./);
  const errorIdx = fn.indexOf("The edition could not be set.");
  const guardIdx = fn.indexOf("if (!booted)");
  assert.ok(guardIdx >= 0 && guardIdx < errorIdx, "error sheet only when not yet booted");
});
