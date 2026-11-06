# Design

## Context

See proposal.md for motivation. The current synchronous `summarize(checks)` function accepts an array of observation objects and returns two counts. This slice may change only the summary, adjacent tests and its own OpenSpec artifacts.

## Goals / Non-Goals

**Goals:** Keep the function pure and partition every supplied observation exactly once while returning exactly four numeric properties.

**Non-Goals:** Formatting (slice B), malformed-input validation, status normalization, evidence collection, provider configuration and delivery automation.

## Decisions

- Use a single pass with strict equality for `passed` and `failed`, and an otherwise-unavailable branch. Repeated filters would work but repeat traversal; subtracting known counts would be less explicit about classification.
- Initialize a fresh result with total from the inventory length and three zero counters. Do not mutate observations or the inventory, add metadata or retain cross-call state.
- Keep the existing input contract: arrays of observation objects. Missing or non-string status values on an object are unavailable; null observations and non-array inputs are not newly supported.
- Keep original empty and unknown regression cases, updating only their expected result shape. Add homogeneous and mixed cases, exact-match boundaries, exhaustive short combinations, and frozen-input/repeated-call coverage.

## Risks / Trade-offs

- [Exact-object consumers see a wider shape] → Mark the result change as breaking and assert exactly four properties in regression tests.
- [Unrecognized statuses might be normalized into success] → Test case variants, whitespace, missing status and non-string values as unavailable.
- [Later delivery evidence is not yet available] → Report workspace checks separately from host verification, owner acceptance and merge/inclusion.

## Migration Plan

Deliver the plan, function and updated tests in one implementation PR. The host validates the candidate before publication; owner acceptance and inclusion follow separately. Any rollback is an explicitly authorized follow-up, not part of this slice.
