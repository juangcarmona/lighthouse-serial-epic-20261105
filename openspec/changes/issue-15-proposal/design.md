# Design

## Context

See proposal.md for motivation. The existing pure summary function accepts an array of observation objects and strictly matches `status`. Node's built-in tests and the repository verification script already cover the module. This design makes the classification boundary explicit without adding input validation.

## Goals / Non-Goals

**Goals:** Preserve strict classification and provide an exact four-field result whose categories sum to the inventory length.

**Non-Goals:** Malformed inventories, null observation objects, sparse arrays, status normalization, formatting, provider changes and slice-B implementation.

## Decisions

- Count in one traversal with mutually exclusive branches for `status === "passed"`, `status === "failed"`, and the fallback. This avoids repeated filtering and makes one-category-per-observation visible. Status coercion or case folding would violate the accepted boundary.
- Return a fresh object with four zero-initialized counts and the supplied inventory length. Do not mutate input observations. Preserve the existing supported array-of-objects boundary rather than introducing validation errors or broadening malformed-input behavior.
- Retain both original behavioral tests with updated exact objects. Add failed-only, mixed and individual other-status cases plus category-sum assertions; test missing status and non-string values without treating null observation objects as supported.

## Risks / Trade-offs

- [Exact-object consumers see additional fields] → Document the new shape and assert it directly in tests; downstream slice B remains separate.
- [Permissive matching could misclassify unavailable evidence] → Test case, whitespace, primitive and boxed-string boundaries using strict equality.
- [Local verification cannot supply native CI or owner acceptance] → Record these as later requirements, never as completed implementation checks.

## Migration Plan

Deliver planning, implementation and tests together on the host-published PR. Run the required installation, repository verification and strict OpenSpec validation, plus declared native repository checks locally. The host independently verifies the candidate; native CI and owner acceptance precede B release. Rollback, if needed, is a separately authorized revert of this bounded change.
