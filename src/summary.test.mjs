import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "./summary.mjs";
test("summarizes an empty inventory", () => assert.deepEqual(summarize([]), { total: 0, passed: 0, failed: 0, unavailable: 0 }));
test("does not count unavailable evidence as passed", () => assert.deepEqual(summarize([{ status: "passed" }, { status: "unknown" }]), { total: 2, passed: 1, failed: 0, unavailable: 1 }));

for (const [status, category] of [["passed", "passed"], ["failed", "failed"], ["unknown", "unavailable"]]) {
  test(`summarizes a ${category}-only inventory`, () => {
    const expected = { total: 3, passed: 0, failed: 0, unavailable: 0 };
    expected[category] = 3;
    assert.deepEqual(summarize([{ status }, { status }, { status }]), expected);
  });
}

test("partitions a mixed inventory into exactly four counts", () => {
  const checks = ["passed", "unknown", "failed", "passed", "unavailable", "skipped"].map(status => ({ status }));
  assert.deepEqual(summarize(checks), { total: 6, passed: 2, failed: 1, unavailable: 3 });
});

test("does not normalize or coerce status values", () => {
  const statuses = ["Passed", "PASSED", " passed", "passed ", "Failed", "FAILED", " failed", "failed ", "", null, undefined, false, 0, {}, ["passed"]];
  const checks = [...statuses.map(status => ({ status })), {}];
  assert.deepEqual(summarize(checks), { total: checks.length, passed: 0, failed: 0, unavailable: checks.length });
});

test("preserves the partition across all short status combinations", () => {
  const statuses = ["passed", "failed", "unknown", undefined];
  for (let length = 0; length <= 4; length += 1) {
    for (let combination = 0; combination < statuses.length ** length; combination += 1) {
      const checks = Array.from({ length }, (_, index) => ({ status: statuses[Math.floor(combination / statuses.length ** index) % statuses.length] }));
      const result = summarize(checks);
      const label = `length ${length}, combination ${combination}`;
      assert.deepEqual(Object.keys(result).sort(), ["failed", "passed", "total", "unavailable"], label);
      assert.equal(result.total, length, label);
      assert.equal(result.passed, checks.filter(check => check.status === "passed").length, label);
      assert.equal(result.failed, checks.filter(check => check.status === "failed").length, label);
      assert.equal(result.unavailable, checks.filter(check => check.status !== "passed" && check.status !== "failed").length, label);
      assert.equal(result.passed + result.failed + result.unavailable, result.total, label);
    }
  }
});

test("does not mutate inputs or share results between calls", () => {
  const checks = Object.freeze([Object.freeze({ status: "passed" }), Object.freeze({ status: "failed" }), Object.freeze({ status: "unknown" })]);
  const snapshot = structuredClone(checks);
  const first = summarize(checks);
  assert.deepEqual(first, { total: 3, passed: 1, failed: 1, unavailable: 1 });
  assert.deepEqual(checks, snapshot);
  first.passed = 99;
  assert.deepEqual(summarize(checks), { total: 3, passed: 1, failed: 1, unavailable: 1 });
  assert.deepEqual(summarize([]), { total: 0, passed: 0, failed: 0, unavailable: 0 });
});
