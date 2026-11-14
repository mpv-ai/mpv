"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const edition = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "edition.json"), "utf8")
);

const STORY_FIELDS = [
  "id", "lead", "section", "kicker", "hed", "dek", "date",
  "source", "url", "also", "owner", "action", "grafs",
];

test("edition has its top-level fields", () => {
  for (const key of ["volume", "number", "city", "date", "editionLabel", "tape", "deskNote", "comingUp", "sections", "stories"]) {
    assert.ok(key in edition, `missing ${key}`);
  }
  assert.ok(Number.isInteger(edition.number));
  for (const key of ["source", "updated", "line"]) assert.equal(typeof edition.tape[key], "string");
  assert.equal(edition.sections[0], "All");
});

test("exactly one lead story", () => {
  assert.equal(edition.stories.filter((s) => s.lead === true).length, 1);
});

test("story ids are unique and route-safe", () => {
  const seen = new Set();
  for (const s of edition.stories) {
    assert.match(s.id, /^[a-z0-9-]+$/i, `bad id ${s.id}`);
    assert.ok(!seen.has(s.id), `duplicate id ${s.id}`);
    seen.add(s.id);
  }
});

test("every story has the full schema and a listed section", () => {
  for (const s of edition.stories) {
    for (const f of STORY_FIELDS) assert.ok(f in s, `${s.id} missing ${f}`);
    assert.ok(edition.sections.includes(s.section) && s.section !== "All", `${s.id} has unlisted section ${s.section}`);
    assert.ok(Array.isArray(s.grafs) && s.grafs.length > 0, `${s.id} has no grafs`);
    assert.ok(Array.isArray(s.also), `${s.id} also must be a list`);
    assert.match(s.url, /^https?:\/\//, `${s.id} url`);
  }
});
