---
name: states-preview-loop
description: Create a local UI-state preview and compare screenshots across requested viewports. Use for normal, loading, empty and error states; not for source-only review or production monitoring.
---

# States preview loop

Before starting, read [optional profile](../optional-skill-profile/SKILL.md), load
and display saved settings. If that sibling is unavailable, explain and use only
session-local settings. Never borrow personal/company defaults from other files.

## State preview

Read the actual component, usage, styles and tests. Reuse project tokens and fixtures.
Display normal/loading/empty/error, relevant count/text boundaries and supported
locales/directions in one local preview. Use synthetic content, not production data.
Agree on output location and viewports; proposed sizes are choices, not rigid rules.
Do not change production behavior just to make screenshots easier.

## Port selection and occupied Node processes

Require a user-selected port before starting a server. On first selection explain:
“If this port is occupied, I will identify the process. Reusing the port may require
stopping that Node process and will interrupt its current service; I will confirm
the exact process before stopping it.” Save the chosen port if requested.

Inspect the current listener's PID, executable, start time, command and owning
workspace using permitted OS read-only tools; redact secrets from command output.
No listener: start only the intended server, bound to loopback, then verify its URL.
Existing matching preview: reuse it if suitable. Other Node listener: show PID,
project/service and impact, then ask “stop this process and reuse port, choose another
port, or cancel?”. A saved port is not a permanent kill authorization.

Only after approval for that exact process, recheck PID/start time/executable/port
to avoid PID reuse, request graceful termination, and verify the listener is gone.
If graceful termination fails, get explicit approval before force-stopping that
same PID. Never kill all node processes, a whole unverified process tree, every
listener, or a service whose owner cannot be established. Non-Node/unknown/system
service: do not stop automatically; offer a different user-selected port.
If identity changes, stop and re-inspect. No platform capability means report blocked.

Record only the preview process started this run for later cleanup. Do not claim
server success from process launch alone: verify HTTP status and expected content.

## Evidence

Use permitted browser tools only after project analytics/privacy test gates pass.
Capture the requested state/viewport matrix and compare before/after. Static HTML
is not proof of real component behavior; label synthetic previews vs actual app.
No visual change can be correct (e.g. a hidden state fix); report what was actually
verified instead of inventing a visible difference. Include URL, files, screenshots,
checked coverage and unverified interactions. Do not mutate Git without approval.

繁中：先指定 port；被占用時辨識 Node 程序並提示影響，取得對該 PID 的批准後才停止。
不殺未知服務或全部 node。截圖必須標明實際頁面或合成 preview，以及未驗的操作。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
