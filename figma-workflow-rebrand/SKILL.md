---
name: figma-workflow-rebrand
description: Rebrand a whole Figma workflow while preserving source, states, components and prototype behavior. Use for multi-frame white-label or brand migration; not for one isolated edit or generic UI review.
---

# Figma Workflow Rebrand

Rebrand a complete Figma workflow into a separately editable target while preserving the source design, interaction behavior and private project material.

繁中：整套 Figma 流程換品牌，保留原稿、狀態、元件與互動；單一局部修改請改用 `figma-write`。

## Load only what the task needs

- For onboarding/explanation: read [quickstart](references/quickstart.md).
- For actual multi-frame execution: read [execution runbook](references/execution-runbook.md).
- Before Figma writes: read [Figma operations](references/figma-operations.md).
- When tracking screen/link coverage: use [coverage manifest](references/coverage-manifest.md).
- Read the sibling [optional profile](../optional-skill-profile/SKILL.md) only if shared preferences are relevant and available.

Do not bulk-load every reference. Reuse an existing preflight for the same run.

## Required inputs

Resolve or record only what materially affects the result:

- source file/pages/workflows,
- approved target destination,
- target brand assets and semantic roles,
- content/terminology/sample-data replacements,
- what must be preserved,
- requested language/device/mode/RTL variants,
- requested outputs or exports.

A missing logo, font or destination is not permission to invent an official asset or overwrite the source.

## Workflow

1. **Contract** — confirm source, destination, brand mapping, scope and preservation rules.
2. **Inventory** — enumerate every in-scope screen/state/overlay/variant and stable node ID.
3. **Isolate** — copy or override into a target that cannot silently mutate the source/shared brand.
4. **Map by meaning** — replace semantic roles, content and assets; preserve status meaning and interaction intent.
5. **Pilot** — test representative difficult units before expanding.
6. **Batch** — process bounded groups, recording completed node IDs and rereading destination state before retries.
7. **Verify** — inspect visual/content/structure coverage and walk prototype branches with supported tools.
8. **Deliver** — report target links, counts/exclusions, changed roles, checks, unresolved items and requested exports.

## Hard boundaries

- Never mutate the source or another brand through shared component/style/variable definitions.
- Do not detach/flatten everything merely to make replacement easier.
- Do not invent official brand assets, legal text or customer data.
- Do not assume a fixed industry, screen count, language count, primary color or watermark rule.
- One writer owns overlapping Figma nodes at a time.
- A coverage checker does not prove visual quality or prototype behavior.
- Screenshots do not prove interactions work.
- Do not guess token/quota limits; report observed limits.
- Do not bypass service limits by switching accounts.
- Export only when requested; never delete previous deliveries as cleanup.
- Explicit user stop/budget/permission constraints take priority.

## Completion evidence

A complete run distinguishes:

- verified screens/states,
- verified interactions,
- untested behavior,
- exclusions and why,
- source-preservation status,
- actual exports and their scale/format when requested.

Do not label AI inspection as human acceptance.
