---
name: work-sync-daily
description: Reconcile a day's work against optional selected Calendar, Jira and user-provided records; preview gaps before any approved updates.
---

# Daily work reconciliation

Read [optional profile](../optional-skill-profile/SKILL.md) and display preferences
before accessing sources. If unavailable, use session-only settings and say so.
Offer Calendar opt-in or skip; independently ask for Gmail/Jira/session access if
needed. Check the connector's current identity against the selected account. No
account guessing, automatic account switch, or storing passwords/tokens in settings.

Resolve the date in the chosen timezone. Limit reads to selected calendars, projects,
time window and exclusions. Start with event titles/times and inspect descriptions
only where needed. Do not read mail just because a Google account is connected.
Existing provider OAuth may be broader; adhere to the narrower task selection.

Match explicit issue IDs first, then cautiously compare activity evidence. Calendar
presence/duration does not establish completed work or time worked. Identify missing
progress, unmatched records, uncertain overlaps and duplicate candidates. Unknown
source is unknown, not permission to fabricate evidence or create a duplicate.

Default result is a read-only gap report with a proposed change table:
target ID, before/after, evidence, proposed action and duplicate check. No changes
without approval of the exact batch. Confirm identity/access again before approved
calendar/Jira writes; do not change title/time/attendees or other records incidentally.
Updates to recurring events require an explicit instance/series choice. Preserve
existing content, use idempotent markers, and read back each result. Uncertain outcome:
read/reconcile before retry, never blindly create another item.

Email/Chat sends, future scheduling and Git push each require separate scope and
approval. Do not save standing approvals in the profile. On disconnect stop source
reads; explain provider-side OAuth revocation separately. Report matched/gaps/changed/
unverified counts and evidence. Persist only approved summaries, not full inbox data.

繁中：預設只對帳與列缺口；Google 日曆不等於 Gmail 權限，寫 Jira、改日曆與寄送
分別確認。更新先查重、保留既有內容，結果不確定就先讀回，不盲目重送。

## Illustrated quickstart / 圖解開始

[Step 1 → 2 → 3, copyable prompts and limits / 三步圖解、可貼提示與限制](references/quickstart.md). The diagram is instructional, not evidence of execution.
