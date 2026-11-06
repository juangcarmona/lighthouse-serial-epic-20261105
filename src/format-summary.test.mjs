import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "./summary.mjs";
import { formatSummary } from "./format-summary.mjs";

test("formats the real empty summary", () => {
  assert.equal(formatSummary(summarize([])), "0 checks: 0 passed, 0 failed, 0 unavailable");
});

test("formats the real mixed summary including unknown observations", () => {
  const checks = ["passed", "failed", "unavailable", "unknown"].map(status => ({ status }));
  assert.equal(formatSummary(summarize(checks)), "4 checks: 1 passed, 1 failed, 2 unavailable");
});

test("preserves distinct counts in their specified order", () => {
  assert.equal(
    formatSummary({ total: 10, passed: 2, failed: 3, unavailable: 5 }),
    "10 checks: 2 passed, 3 failed, 5 unavailable"
  );
});

test("renders multi-digit category counts without truncation", () => {
  assert.equal(
    formatSummary({ total: 136, passed: 12, failed: 23, unavailable: 101 }),
    "136 checks: 12 passed, 23 failed, 101 unavailable"
  );
});

test("keeps fixed wording for a single real check", () => {
  assert.equal(
    formatSummary(summarize([{ status: "passed" }])),
    "1 checks: 1 passed, 0 failed, 0 unavailable"
  );
});

test("preserves frozen input across repeated and interleaved calls", () => {
  const summary = Object.freeze({ total: 10, passed: 2, failed: 3, unavailable: 5 });
  const snapshot = structuredClone(summary);
  const expected = "10 checks: 2 passed, 3 failed, 5 unavailable";
  assert.equal(formatSummary(summary), expected);
  assert.equal(formatSummary(summarize([])), "0 checks: 0 passed, 0 failed, 0 unavailable");
  assert.equal(formatSummary(summary), expected);
  assert.deepEqual(summary, snapshot);
  assert.equal(Object.isFrozen(summary), true);
});

test("reads current counts rather than retaining previous results", () => {
  const summary = { total: 1, passed: 1, failed: 0, unavailable: 0 };
  assert.equal(formatSummary(summary), "1 checks: 1 passed, 0 failed, 0 unavailable");
  summary.passed = 0;
  summary.failed = 1;
  assert.equal(formatSummary(summary), "1 checks: 0 passed, 1 failed, 0 unavailable");
});
