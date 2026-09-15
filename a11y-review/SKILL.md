---
name: a11y-review
description: Review accessibility with explicit test scope and evidence, separating automated findings, manual checks and unverified behavior.
---

# Accessibility review / 無障礙審查

Read [optional profile](../optional-skill-profile/SKILL.md) when available. This public
edition contains a technical workflow, not jurisdiction-specific legal advice or
copied legal tables. Agree on target standard, page/state sample and testing tools.

Read the relevant current normative sources for criterion-specific claims:
https://www.w3.org/TR/WCAG22/ and https://www.w3.org/WAI/ARIA/apg/.
If unavailable, label criterion/version mappings unverified instead of inventing them.

Start with semantics/headings, names/labels, alt and form/error structure. If permitted
runtime testing is available, check keyboard reachability/order, visible focus,
dialogs, zoom/reflow, contrast, target sizes, reduced motion and state announcements.
Record method and value; screenshot appearance alone does not prove accessible names,
screen-reader output or operability. Ask for assistive-technology verification where
the required device/tool is unavailable.

Use only approved audit commands. Inspect existing config before suggesting tools;
do not install dependencies into a project as a side effect of review. Automated
violations are findings to interpret, not a conformance certificate. Do not suppress
failing contrast because a brand prefers that color; report the failure and any
documented exception without relabeling it PASS.

Report observed/measured, source-inferred and not-tested results, mapped to stable
issue IDs and user impact. Include sample coverage and checks passed. Never claim
the entire site conforms from a template sample or scan. Legal profiles require a
separate dated primary-source review before use.

繁中：以證據區分實測、推論與未驗；掃描通過不等於全站符合標準。
不附未核實法規表，不因品牌偏好把不合格項目改標通過。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
