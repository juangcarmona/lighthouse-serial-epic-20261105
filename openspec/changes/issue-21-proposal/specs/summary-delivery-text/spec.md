# Summary Delivery Text

## Purpose

Provide a stable delivery-text representation of complete check counts without changing the underlying summary or performing delivery I/O.

## ADDED Requirements

### Requirement: Exact four-count delivery text
Formatting a four-count summary SHALL return exactly `<total> checks: <passed> passed, <failed> failed, <unavailable> unavailable`, substituting the supplied numeric counts without reclassification, pluralization or additional whitespace.

#### Scenario: Empty real inventory
- **WHEN** the real summarizer processes an empty inventory and its result is formatted
- **THEN** the text is exactly `0 checks: 0 passed, 0 failed, 0 unavailable`

#### Scenario: Mixed real inventory
- **WHEN** the real summarizer processes one observation each with status passed, failed, unavailable and unknown, and its result is formatted
- **THEN** the text is exactly `4 checks: 1 passed, 1 failed, 2 unavailable`

#### Scenario: Distinct category counts
- **WHEN** a summary has total 10, passed 2, failed 3 and unavailable 5
- **THEN** the text is exactly `10 checks: 2 passed, 3 failed, 5 unavailable`

#### Scenario: Single check retains fixed wording
- **WHEN** a summary has total 1, passed 1, failed 0 and unavailable 0
- **THEN** the text is exactly `1 checks: 1 passed, 0 failed, 0 unavailable`

### Requirement: Side-effect-free formatting
Formatting SHALL depend only on the supplied summary, leave it unchanged and perform no I/O. Repeated calls with the same counts MUST return the same string independently of previous calls.

#### Scenario: Frozen summary and repeated calls
- **WHEN** a frozen four-count summary is formatted before and after formatting a different summary
- **THEN** both calls for the first summary succeed, return identical text and leave all input properties unchanged
