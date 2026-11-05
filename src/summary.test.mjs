import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "./summary.mjs";

function assertSummary(checks, expected) {
  const result = summarize(checks);
  assert.deepEqual(result, expected);
  assert.equal(result.passed + result.failed + result.unavailable, result.total);
}

test("summarizes an empty inventory", () => {
  assertSummary([], { total: 0, passed: 0, failed: 0, unavailable: 0 });
});

test("does not count unavailable evidence as passed", () => {
  assertSummary([{ status: "passed" }, { status: "unknown" }], {
    total: 2, passed: 1, failed: 0, unavailable: 1
  });
});

test("summarizes only failed observations", () => {
  assertSummary([{ status: "failed" }, { status: "failed" }], {
    total: 2, passed: 0, failed: 2, unavailable: 0
  });
});

test("summarizes only passed observations", () => {
  assertSummary([{ status: "passed" }, { status: "passed" }], {
    total: 2, passed: 2, failed: 0, unavailable: 0
  });
});

test("counts mixed statuses in exclusive categories", () => {
  const checks = ["passed", "failed", "unknown", "unavailable", "passed", "failed"]
    .map(status => ({ status }));
  assertSummary(checks, { total: 6, passed: 2, failed: 2, unavailable: 2 });
});

const otherStatuses = [
  ["unknown", "unknown"], ["unavailable", "unavailable"], ["empty string", ""],
  ["uppercase passed", "PASSED"], ["uppercase failed", "FAILED"],
  ["padded passed", " passed"], ["padded failed", "failed "],
  ["null", null], ["undefined", undefined], ["true", true], ["false", false],
  ["zero", 0], ["one", 1], ["object", {}], ["array", []],
  ["boxed passed", new String("passed")], ["boxed failed", new String("failed")]
];

for (const [label, status] of otherStatuses) {
  test(`classifies ${label} status only as unavailable`, () => {
    assertSummary([{ status }], { total: 1, passed: 0, failed: 0, unavailable: 1 });
  });
}

test("classifies an absent status as unavailable", () => {
  assertSummary([{}], { total: 1, passed: 0, failed: 0, unavailable: 1 });
});

test("preserves observations and returns independent results", () => {
  const checks = Object.freeze([
    Object.freeze({ status: "passed" }), Object.freeze({ status: "failed" }),
    Object.freeze({ status: "unknown" }), Object.freeze({})
  ]);
  const before = structuredClone(checks);
  const expected = { total: 4, passed: 1, failed: 1, unavailable: 2 };
  assertSummary(checks, expected);
  const result = summarize(checks);
  result.passed = 100;
  assertSummary(checks, expected);
  assert.deepEqual(checks, before);
});
