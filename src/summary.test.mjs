import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "./summary.mjs";
test("summarizes an empty inventory", () => assert.deepEqual(summarize([]), { total: 0, passed: 0 }));
test("does not count unavailable evidence as passed", () => assert.deepEqual(summarize([{ status: "passed" }, { status: "unknown" }]), { total: 2, passed: 1 }));
