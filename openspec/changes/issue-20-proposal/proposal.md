# Proposal

## Why

The observation summary exposes total and passed counts but leaves failures and unavailable observations implicit. Slice A makes all supplied observations accountable without requiring a formatter.

## What Changes

- **BREAKING**: Extend the summary result from two properties to exactly `total`, `passed`, `failed` and `unavailable`.
- Recognize only exact `passed` and `failed` statuses; classify every other status as unavailable.
- Preserve empty-inventory and unknown-never-passes behavior, with homogeneous, mixed and partition regression tests.

## Capabilities

### New Capabilities

- `observation-summary`: Partition supplied observations into passed, failed and unavailable counts alongside the total.

### Modified Capabilities

None. The OpenSpec capability inventory is empty.

## Impact

Only `src/summary.mjs`, its adjacent tests and this issue's planning artifacts change. No dependencies, formatter, validation layer, services or provider scaffolds are added. Independent host checks, native CI, current-head owner acceptance and merge/inclusion receipts remain separate delivery requirements.
