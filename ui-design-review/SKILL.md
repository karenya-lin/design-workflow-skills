---
name: ui-design-review
description: Compare implemented UI with an approved design and separate visual from functional defects. Use for design-vs-implementation review; not for accessibility-only audits or element identification.
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

Beyond fidelity, check the author's own UX principles in
[references/ux-principles.md](references/ux-principles.md): related content stacks
vertically for F-pattern reading, with no wide left-right spreads of a title and its
content; the positive action sits on the right; verification, password and sign-in
rules; card form error-proofing when a card form is in scope; a shared component
where markup repeats; variables or tokens for colour, spacing and type. Report each
finding with its KUX id. These are recommendations, not absolutes: an exception is
recorded with its reason and kept consistent, never waived silently.

繁中：對照同狀態、同尺寸的設計與實作，把視覺與功能問題分開。
變更先定範圍；沒有瀏覽器證據就標未驗，不以靜態檢查冒充完整驗收。
另依 references/ux-principles.md 檢查作者的 UX 準則：相關內容上下排、正向按鈕在右邊、
驗證碼與密碼訊息、信用卡表單防呆、重複標記做成元件、顏色與間距走變數與 token。
每項回報帶 KUX 編號。這些是通常建議，例外要寫明原因並保持一致。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
