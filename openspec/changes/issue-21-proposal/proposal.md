# Proposal

## Why

Consumers need a stable delivery-text representation of the four-count summary supplied by slice A. Slice B adds that representation without changing classification or introducing side effects.

## What Changes

- Add a pure `formatSummary(summary)` export with the exact total, passed, failed and unavailable wording requested in issue #21.
- Add tests composing the real summarizer and formatter for empty and mixed inventories, plus distinct-count and immutable-input boundaries.
- Do not change the summarizer, dependencies, provider scaffolds or delivery configuration.
- Implementation remains gated on authenticated slice A acceptance and current epic-history inclusion. The supplied context has neither receipt; source presence alone is insufficient.

## Capabilities

### New Capabilities

- `summary-delivery-text`: Stable, side-effect-free text for a four-count check summary.

### Modified Capabilities

None. `openspec list --specs` returned no archived specifications. Slice A's pending `observation-summary` change remains untouched.

## Impact

Planned code is limited to `src/format-summary.mjs` and `src/format-summary.test.mjs`. The API consumes the existing numeric `total`, `passed`, `failed` and `unavailable` properties. No I/O, dependency changes or migration are needed. This blocked candidate contains planning artifacts only.
