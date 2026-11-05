# Proposal

## Why

Callers cannot distinguish failed observations from other non-passing statuses in the current summary. Issue #15 supplies the four-count contract needed by serial epic slice A.

## What Changes

- Return exactly `total`, `passed`, `failed` and `unavailable` counts.
- Match passed and failed statuses strictly; classify every other supplied status as unavailable.
- Preserve empty-inventory and unknown-never-passes coverage; add failed-only, mixed-status and category-sum boundaries.

## Capabilities

### New Capabilities

- `observation-summary`: Exclusive status counts for supplied observation inventories.

### Modified Capabilities

None. `openspec list --specs` found no existing specifications.

## Impact

Only `src/summary.mjs`, `src/summary.test.mjs` and this issue's planning artifacts change. The returned object gains two fields; exact-shape consumers must account for them. No dependencies, providers, workflows or slice-B formatter are changed. Native CI and separate owner acceptance remain required before releasing B.
