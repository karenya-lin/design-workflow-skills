---
name: audit-fix-loop-no-preview
description: Triage source-backed defects and apply approved scoped fixes when visual preview is unavailable, leaving runtime claims unverified.
---

# Static audit and fix / 靜態稽核與修補

Read [optional profile](../optional-skill-profile/SKILL.md) if available. Read project
rules and target implementation. Fix the base version and allowed files; respect
other owners. Static mode never bypasses blocked browser access.

Assign permanent issue IDs with location, exact source evidence, impact and suggested
fix. Distinguish a reproduced defect from a suspicious pattern requiring runtime
verification. Do not estimate a health percentage without a defined denominator.

Show findings and obtain the desired correction scope. For common files, inspect
callers and explain affected views. Reuse existing utilities/tokens/tests. Avoid
opportunistic redesign, changing unrelated configuration or deleting unknown files.

Run necessary existing tests/lint/types for the changed behavior. Build only when
needed and safe for the current environment. Do not assume a successful HTTP response
proves interaction behavior. Record visual, RWD, keyboard and analytics gaps honestly.
Stop repeated failed retries to diagnose rather than endlessly rerunning the suite.

Return changed scope, exact checks and remaining issues. Commit/push/deploy and version
bump follow the actual project's rules and task authorization, not this skill alone.

繁中：靜態發現先分實證與疑點，使用者選擇範圍後才修。
只跑必要驗證，不刪未知檔、不把無預覽當作 UI 已通過。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
