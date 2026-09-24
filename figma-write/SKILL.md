---
name: figma-write
description: Modify specific Figma layouts or tokens after inspecting design context and verify read-back. Use for targeted Figma edits; not for whole-workflow rebrands or broad visual review.
---

# Figma write / Figma 寫入

Read [optional profile](../optional-skill-profile/SKILL.md) if available. Read the
installed Figma tool's required instructions before tool calls; discover actual
capabilities instead of assuming a fixed MCP identifier or stale API shape.

Identify exact file/nodes and editing permission. Inspect parent layout, sizing,
clipping, variables, variants and styles. Establish whether code or the design system
is authoritative for this task. Missing token mapping is a decision, not permission
to overwrite a brand collection or use a similar color without disclosure.

Reuse variables/styles/components. Choose Auto Layout for flow-based layouts and
absolute positioning only when the design requires it. Clipping follows intentional
masking/viewport behavior, not an unconditional global preference. Preserve current
geometry when converting. Do not detach library instances without scoped approval.

Probe a small representative change, read back its properties and inspect a screenshot
before batching. Check sizing, wrapping, text styles and variable binding against the
requested design. Static representations of motion are labeled static, not equivalent
animation. Report exact nodes changed and verification gaps. No private file links,
client tokens or source images go into public examples.

繁中：先讀節點與設計系統，確認真值來源，再小批寫入並讀回驗證。
Auto Layout／裁切依設計用途決定，不硬套品牌色或特定專案的尺寸表。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
