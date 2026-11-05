# Consumer contract

This repository qualifies serial epic delivery through a source-pinned Lighthouse harness. Its small reporting module summarizes supplied check observations. An unavailable observation must never count as passed. Changes must preserve the existing ProductShape and ArcShape scaffolds, repository guidance and custom Git hook configuration.

The provider scaffolds are retained for ownership checks; they are not adopted product or architecture authorities. This contract records the scope of this technical consumer. Installation, issue delivery, merge, package upgrade and rollback each need their own evidence.

The `tools/` utility is a consumer-owned customization retained before native workflow adoption and package upgrade.

The owner explicitly selects epic reconciliation and each child implementation. After regenerating workflows through the source SDK installer, run `node scripts/hold-parent-implementation.mjs` to apply this fixture's single router extension: `LIGHTHOUSE_AUTO_IMPLEMENT: false`. This prevents direct parent implementation before epic selection; all other generated router bytes remain provider-owned. Automation variables remain disabled during setup, and the final accepted source pin is installed before native delivery.
