# Design

## Context

See proposal.md for motivation. The current checkout exports `summarize(checks)` with four numeric counts and maps unknown statuses to unavailable. The repository uses ESM and Node's built-in test runner. The host supplies the source revision; this worker does not independently authenticate GitHub authority or acceptance.

Issue #21 requires authenticated A acceptance and current-history inclusion before implementation. The correction context supplies host provenance for PR #22, acceptance workflow `42140729235` and squash commit `a5541fe979bda3439e0eaa2521d34ed27a0a38ee` as the epic base. The host must authenticate and revalidate these facts; this worker does not substitute local checks or historical planning checkboxes for those receipts.

## Goals / Non-Goals

**Goals:** Preserve the accepted four-count interface and exact output, with isolated deterministic formatting and real-composition tests.

**Non-Goals:** Reclassification, input repair, localization, pluralization, printing, persistence, dependency changes, or implementing any part of slice A. Invalid-input behavior is not newly specified.

## Decisions

- Use one named ESM export in `src/format-summary.mjs`, returning a template literal in total/passed/failed/unavailable order. Recomputing counts would duplicate A's responsibility; a formatting library is unnecessary.
- Add adjacent Node tests importing both real modules. Empty and four-status inventories assert exact strings; unequal counts detect swapped fields; frozen summary objects and repeated calls detect mutation and state leakage. Mocks would miss interface drift.
- Keep the summarizer and its tests unchanged. Source presence demonstrates the interface, but does not establish A acceptance or history inclusion; do not replace the required receipts with local tests.

## Risks / Trade-offs

- [Stale prerequisite authority] → The trusted host revalidates supplied A acceptance and inclusion provenance before execution and publication.
- [Exact-string drift] → Assert punctuation, spacing and zero-count text, including singular totals without pluralization.
- [Local checks mistaken for delivery acceptance] → Retain local receipts separately from later clean-candidate checks, native CI, B current-head acceptance and merge receipts.

## Migration Plan

After the host authenticates A acceptance and inclusion in the supplied epic base, implement the two additive files and run all declared checks against that base. No data migration is required. Rollback removes only the formatter and its tests. Publication and merge remain host/reviewer responsibilities.
