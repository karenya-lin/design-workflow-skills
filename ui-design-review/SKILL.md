---
name: ui-design-review
description: Compare an implemented UI with an approved design and separate visual discrepancies from functional defects before scoped fixes.
---

# UI design review / 設計還原審查

Use [optional profile](../optional-skill-profile/SKILL.md) when available. Establish
the approved reference, actual implementation revision, page/state/viewport scope
and relevant local tokens. Do not substitute an old screenshot for the current app.

Capture comparable design and implementation states with allowed tooling. Obey
analytics/privacy gates before executing website JavaScript. If browser access is
blocked, provide a source-only review and explicitly leave visual behavior unverified.

Separate visual findings (spacing, typography, geometry, color, hierarchy) from
functional findings (focus, interactions, state transitions). Each item needs a stable
ID, location, observed evidence, impact and proposed correction. No invented pixel
measurements, compliance scores or unanimous agent verdicts.

Reuse components/tokens; list shared usage before changing a common style. Obtain
approval for design changes, preserve accepted trade-offs, and fix only the selected
scope. Repeat the smallest relevant comparison/test. Separate fixed, remaining,
inferred and unverified findings. Additional reviewer agents are optional and require
available authorized delegation; do not manufacture review receipts.

繁中：對照同狀態、同尺寸的設計與實作，把視覺與功能問題分開。
變更先定範圍；沒有瀏覽器證據就標未驗，不以靜態檢查冒充完整驗收。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
