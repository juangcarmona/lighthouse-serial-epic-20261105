# Observation Summary

## Purpose

Provide complete counts of supplied observations so consumers can distinguish passed, failed and unavailable evidence without inferring missing categories.

## ADDED Requirements

### Requirement: Complete count result
The summary SHALL return exactly the numeric properties `total`, `passed`, `failed` and `unavailable`. Total MUST equal the supplied inventory length and MUST equal the sum of the three category counts.

#### Scenario: Empty inventory
- **WHEN** the supplied inventory is empty
- **THEN** all four counts are zero

#### Scenario: Homogeneous inventories
- **WHEN** the inventory contains only passed, only failed or only unavailable observations
- **THEN** the corresponding category equals total and the other categories are zero

#### Scenario: Mixed inventory
- **WHEN** the inventory contains two passed observations, one failed observation and three observations with other statuses
- **THEN** the result is total 6, passed 2, failed 1 and unavailable 3

### Requirement: Exact status classification
Only status values strictly equal to `passed` SHALL count as passed, and only values strictly equal to `failed` SHALL count as failed. Every other status value, including an absent status on an observation object, MUST count only as unavailable.

#### Scenario: Unknown never passes
- **WHEN** one observation has status `passed` and another has status `unknown`
- **THEN** total is 2, passed is 1, failed is 0 and unavailable is 1

#### Scenario: No normalization or coercion
- **WHEN** observation objects have case-varied or whitespace-padded statuses, non-string status values or no status property
- **THEN** each observation counts only as unavailable

### Requirement: Side-effect-free summary
Summarizing an inventory SHALL leave the inventory and its observation objects unchanged. Each call MUST return independent counts based only on its supplied inventory.

#### Scenario: Repeated calls with immutable input
- **WHEN** an immutable inventory is summarized and a later call summarizes an empty inventory
- **THEN** the first call succeeds without changing its input and the later call returns four zeros
