# Spec Delta

## Purpose

Provide complete, mutually exclusive status counts for supplied observation inventories so unavailable evidence never appears as passed.

## ADDED Requirements

### Requirement: Exact four-count summary
The summary SHALL return exactly `total`, `passed`, `failed` and `unavailable` counts for an array of supplied observation objects. Total SHALL equal the inventory length, and passed plus failed plus unavailable SHALL equal total.

#### Scenario: Empty inventory
- **WHEN** the supplied inventory is empty
- **THEN** the result is exactly `{ total: 0, passed: 0, failed: 0, unavailable: 0 }`

#### Scenario: Mixed inventory
- **WHEN** the supplied statuses are `passed`, `failed`, `unknown` and `unavailable`
- **THEN** the result is exactly `{ total: 4, passed: 1, failed: 1, unavailable: 2 }`
- **AND** the category counts sum to total

### Requirement: Strict exclusive status classification
Each supplied observation SHALL count as passed only when its status strictly equals the string `passed`, or failed only when its status strictly equals the string `failed`. Every other supplied status value, including an absent status, SHALL count only as unavailable.

#### Scenario: Failed-only inventory
- **WHEN** two supplied observations both have status `failed`
- **THEN** the result is exactly `{ total: 2, passed: 0, failed: 2, unavailable: 0 }`

#### Scenario: Unknown evidence never passes
- **WHEN** the supplied statuses are `passed` and `unknown`
- **THEN** the result is exactly `{ total: 2, passed: 1, failed: 0, unavailable: 1 }`

#### Scenario: Other status boundaries
- **WHEN** an observation has a missing status, null, undefined, a boolean, a number, an object, a boxed string, a differently cased string or a whitespace-padded status
- **THEN** that observation contributes one to unavailable and zero to passed and failed

### Requirement: Preserve supplied observations
Summary calculation SHALL leave the supplied inventory and its observations unchanged.

#### Scenario: Reusable inventory
- **WHEN** a supplied inventory is summarized repeatedly
- **THEN** each result has the same counts and the original observations remain unchanged
