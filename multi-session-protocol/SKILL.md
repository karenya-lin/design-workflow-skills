---
name: multi-session-protocol
description: Coordinate multiple agents sharing files or resources through explicit ownership, handoffs and bounded changes. Use when parallel agents could collide; not for a single-agent task.
---

# Shared-work coordination / 多工作階段協作

Read [optional profile](../optional-skill-profile/SKILL.md) if available. Identify the
real workspace and current owners before writing. Announce base revision, exact
allowed paths, excluded paths, dependencies and verification responsibility.

Messages are coordination, NOT atomic locks. Use an available shared lock/ownership
record and wait for explicit acknowledgment where work overlaps. No response is not
a release. A same-machine session list cannot prove another machine is idle. Do not
invent unavailable messaging tools or spawn new sessions without authorization.

One owner per overlapping writable resource, including index, branch integration,
shared document ranges, Figma nodes, ports and foreground UI. Do not acquire ownership
by writing first. New overlap: pause that part and negotiate; continue independent
authorized work. Disagreement: present alternatives and wait for a decision.

Preserve dirty files and untracked work. No automatic stash/reset/force push or
process termination. A proposed handoff is not an accepted handoff. On completion,
send exact changed scope, base/result revision, test evidence and release status.
Receiver checks the actual diff and relevant evidence, avoiding unnecessary full QA
repeats. Record partial/blocked/unverified states separately. Do not promise that
this protocol enforces global exclusivity when the platform cannot enforce it.

繁中：先宣告精確範圍並取得 ACK，再動共用檔；訊息不等於真正鎖。
跨機狀態不可猜測，交付必須附差異與驗證，不能搶 index 或覆蓋別人的工作。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
