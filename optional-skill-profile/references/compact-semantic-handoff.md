# AI-to-AI compact semantic contract

Use this only for **internal Skill-to-Skill / agent-to-agent handoff**. Human-facing answers stay readable natural language.

The goal is to avoid repeating whole prompts, project history and known rules every time a specialist hands work to another specialist.

## Compact v1

Use these fields only when they are non-empty:

- `intent`: what kind of work this is, for example `review`, `build`, `audit`, `sync`, `report`, `research`.
- `scope`: the smallest useful target, such as `home.mobile`, `figma.checkout`, `issue:123`.
- `facts`: established facts that must not be re-decided.
- `constraints`: hard boundaries already decided by the user/project.
- `unresolved`: words, references, relations or intent that still need interpretation.
- `evidence`: source IDs, file/line references, hashes or check IDs that support the handoff.
- `state`: one of `ready`, `partial`, `pass`, `fail`, `blocked`, `not_run`.
- `next`: the next bounded action or owner.

Optional when needed:
- `owner`
- `rev`: source revision/hash
- `raw`: only the minimum original wording needed to preserve nuance or resolve ambiguity.

### Plain-text form

Prefer compact key/value lines when the host does not require JSON:

```text
intent=review
scope=home.mobile
constraints=no-prod,no-push
facts=locale:zh-TW; target:save-button
unresolved=empty-state-copy
evidence=src/ui/save.tsx#L20-L44
state=partial
next=copy-review
```

### Structured-output form

When the host/API supports a schema, use the equivalent structured object. Do not repeat format instructions in every prompt when the schema already enforces them.

```json
{
  "intent": "review",
  "scope": "home.mobile",
  "constraints": ["no-prod", "no-push"],
  "facts": ["locale:zh-TW", "target:save-button"],
  "unresolved": ["empty-state-copy"],
  "evidence": ["src/ui/save.tsx#L20-L44"],
  "state": "partial",
  "next": "copy-review"
}
```

## Token-saving rules

1. **Do not resend known context.** Send IDs, revisions and only the facts changed or needed by the next step.
2. **Omit empty/default fields.** A missing optional field is cheaper than `[]`, `null` or explanatory prose.
3. **Prefer stable enums over repeated sentences.** Example: `state=blocked` plus one blocker is better than restating the whole workflow.
4. **Keep raw text only where meaning would be lost.** Preserve the user's exact wording for ambiguity, legal/safety constraints, acceptance criteria, quotations or decisions whose nuance matters.
5. **Facts are not guesses.** If a statement still needs interpretation, put it in `unresolved` instead of promoting it to `facts`.
6. **Do not compress evidence away.** Token saving must not remove the source/revision/check needed to verify the claim.
7. **No one-letter codes.** `intent` is preferable to `i`; opaque abbreviations save little and increase decoding/error risk.
8. **Do not re-encode human-facing final answers.** The compact contract is transport, not presentation.
9. **Do not duplicate a shared rulebook.** Refer to the project/Skill rule source by name/version/hash when possible.
10. **Expand only on demand.** If the next agent needs detail, it reads the cited source/reference rather than receiving the whole source pre-emptively.

## Semantic prefilter pattern

When natural language is part of the handoff, separate:

- `facts`: deterministic known values
- `signals`: hints that must not be treated as decisions
- `relations`: condition, sequence, negation, dependency, prerequisite
- `unresolved`: missing referents or intent still requiring interpretation

Only unresolved meaning should be sent to an expensive semantic judgement step when the host workflow supports that pattern.

## When not to compact

Do not compact away:

- the user's exact approval/rejection/constraint when the wording changes execution rights,
- security/auth/privacy instructions,
- legal text or licence terms,
- destructive-action confirmation,
- disputed interpretation,
- evidence needed for review,
- final human-facing explanations.

## Why this can reduce token use

This contract saves tokens mainly by reducing **repeated context and repeated format instructions**, not by inventing cryptic abbreviations.

It works best when:
- several Skills or agents hand off the same task,
- the same project rules would otherwise be restated each turn,
- only a small subset of a long source is relevant,
- a structured schema can replace repeated prose about output format.

It does **not** promise a fixed percentage reduction. Measure before/after prompt and handoff sizes on representative tasks.
