---
name: uiux-runtime-audit
description: Audit a running or inspectable interface for reachability, state clarity, mobile behavior, accessibility and privacy risks, separating observed evidence from unverified behavior. Use when a running interface needs UX, accessibility or privacy evidence rather than a design review.
---

# UI/UX runtime audit / UIUX 執行期檢查

Use this skill when the question is whether an interface is actually usable, not only whether it matches a design.

Audit the highest-risk interaction path first. Check, when in scope:
- primary actions are reachable and clickable;
- overlays, sticky bars and z-index do not cover controls;
- mobile layout, safe areas, keyboard opening and overflow;
- loading, offline, queued, partial, success and failure states are distinguishable;
- keyboard reachability, focus visibility, labels and dialog behavior;
- touch targets and hover-only interactions;
- private information is not unnecessarily exposed at a glance.

If browser or runtime access is unavailable, perform a source-only review and explicitly leave visual/interaction behavior unverified. Lint, typecheck and build results do not prove usability.

Do not claim WCAG, privacy, security or legal compliance from this skill alone.

## Public-safety boundary

Use synthetic or approved test data. Never capture or publish passwords, tokens, payment data, private messages, personal records, production session identifiers or confidential screenshots. Redact URLs and account identifiers in public examples.

Do not execute production JavaScript, submit forms, send analytics events or mutate records unless the specific run has authorized that action.

Follow [public-skill sanitization](../docs/PUBLIC-SKILL-SANITIZATION.md).

## Expected output

Each finding should include:
- stable finding ID;
- page/state/viewport;
- observed evidence;
- impact;
- proposed correction;
- verified / inferred / unverified status.

繁中：這個 skill 看的是「真的能不能用」，不是只比設計稿。沒有 browser/runtime 證據就標未驗，不把 lint/build 冒充互動驗收；測試資料要去識別化，不公開真實帳號、支付或私人畫面。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
