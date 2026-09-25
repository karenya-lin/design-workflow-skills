---
name: reliable-delivery
description: Keep a bounded task moving through its original acceptance criteria across interruptions or handoffs, with explicit checkpoints, targeted verification and truthful completion status. Use when a task must survive interruptions or handoffs without losing its acceptance criteria.
---

# Reliable delivery / 可靠交付

Use this skill for interrupted, long-running or multi-agent work where a checkpoint must not be mistaken for completion.

Before continuing:
1. restate the original bounded deliverable and acceptance criteria;
2. identify the current revision, owner and remaining work;
3. inspect actual artifacts/diffs/evidence;
4. continue only the missing authorized scope;
5. run the smallest relevant verification;
6. hand off with an exact receipt.

A plan, acknowledgement, claim, process start or partial patch is not completion. A task remains partial until its acceptance criteria are met or a concrete blocker is documented.

Do not auto-resume an active worker, steal ownership, force-reset shared work, self-approve as an independent reviewer, or hide failed validation. Batch related work only when scopes and ownership are compatible.

## Public-safety boundary

Checkpoints and examples must be safe to publish. Replace private repository names, branch names, ticket numbers, file paths, people, provider names, URLs and account identifiers with neutral placeholders where they are not essential to the reusable method.

Never publish raw logs or receipts that may contain secrets, customer/work data, private prompts or internal topology.

Follow [public-skill sanitization](../docs/PUBLIC-SKILL-SANITIZATION.md).

## Expected handoff receipt

Include:
- task and acceptance criteria;
- owner and bounded scope;
- base/result revision;
- changed artifacts;
- validation actually run;
- completed, remaining and blocked items;
- release/publish status;
- next owner action, if any.

繁中：目標是讓「有進度」不會被誤寫成「完成」。每次交接都要帶原驗收條件、版本、變更、實際 QA、剩餘工作與 blocker。公開 receipt 必須去識別化，不放私人 repo、Issue、路徑、log 或帳號資訊。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
