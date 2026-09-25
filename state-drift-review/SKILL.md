---
name: state-drift-review
description: Diagnose disagreements between an authoritative source and its mirrors, indexes, dashboards or runtime status before proposing the smallest safe repair. Use when a dashboard, index, mirror or status disagrees with its source of truth.
---

# State drift review / 狀態漂移檢查

Use this skill when two places claim different status for the same work, deployment, record or runtime state.

Start read-only. For each disputed field:
1. identify the narrowest authoritative source;
2. read the mirror or derived view;
3. compare stable IDs, revisions, timestamps and status semantics;
4. classify the drift;
5. propose the smallest repair at the bridge or mirror layer;
6. verify by reading back the affected state.

Useful drift classes include:
- stale mirror;
- missing mirror;
- duplicate mirror;
- wrong status mapping;
- false healthy / false down;
- orphan reference;
- partial state shown as complete.

Do not "repair" an authoritative source merely to make a dashboard look consistent. Do not assume a heartbeat proves every dependency is healthy. Do not infer completion from a plan, acknowledgement or queued job.

## Public-safety boundary

Public examples must use placeholders such as `canonical_source`, `mirror_view`, `record_id` and `revision`. Never include private URLs, collection names, internal hostnames, ticket numbers, account IDs, exact production topology, raw payloads or credentials.

If a repair would mutate a real system, require the task's normal scoped authorization first. This skill itself grants no write access.

Follow [public-skill sanitization](../docs/PUBLIC-SKILL-SANITIZATION.md).

## Expected output

Return:
- disputed field/state;
- authoritative source;
- mirror/source compared;
- observed mismatch;
- drift class;
- smallest proposed repair;
- read-back evidence or unverified blocker.

繁中：先找真正的 source of truth，再比 mirror / dashboard / index。不要為了讓畫面一致反過來改 canonical source，也不要把 queued、ACK 或 heartbeat 當成完成證據。公開版只使用抽象 placeholder，不公開內部拓樸與識別資訊。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
