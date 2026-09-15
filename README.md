# Design Workflow Skills

[13 個 skills 完整圖解 / All 13 skill guides](docs/SKILL-MAP.md) · [UI Inspect 畫面 / Screenshots](docs/VISUAL-GUIDE.md)

![點選、確認範圍與複製 / Point, scope and copy](docs/images/inspector-02-scope.png)

Configurable skills for design reviews, UI quality checks and work coordination.
Installing this package does not connect accounts or create automatic schedules.
The original package
is offered under MIT; third-party exclusions are documented separately. This does
not grant rights to company/customer material, none of which should be added here.

[繁體中文](README.zh-TW.md) · [English usage](docs/USAGE.en.md) ·
[Security / 資安](SECURITY.md) · [License](LICENSE)

## Every skill: two benefits and a complete walkthrough

Each guide covers project types, lifecycle stages, preparation, Step 1/2/3, finish/handoff, customization/optional choices and copyable English/Traditional Chinese prompts. Click a name for its illustrated guide. The skill-local `references/quickstart.md` and diagram also survive copy installation.

| Skill / Guide | Two benefits |
|---|---|
| [optional-skill-profile](optional-skill-profile/references/quickstart.md) | Avoid repeating project preferences while keeping them reviewable before each run. Keeping personal settings outside the project reduces accidental public disclosure. |
| [states-preview-loop](states-preview-loop/references/quickstart.md) | Check normal, empty, loading and error states in one workflow to reduce omissions. Explicit port and process checks reduce the risk of interrupting another development service. |
| [ui-element-inspector](ui-element-inspector/references/quickstart.md) | Point at the page to identify an element and its containers without writing a selector. Copy matches, exceptions and the requested change together for a clearer handoff. |
| [ui-design-review](ui-design-review/references/quickstart.md) | Separate visual differences from functional problems to prioritize corrections. Reusing components and tokens reduces unintended inconsistency across screens. |
| [a11y-review](a11y-review/references/quickstart.md) | Find keyboard, focus and labeling barriers early so more people can use the interface. Separating tested and untested results prevents scans from being mistaken for complete conformance evidence. |
| [uiux-checks](uiux-checks/references/quickstart.md) | Coordinate several checks without repeating the same setup and evidence gathering. Scope selection keeps small changes from turning into unnecessary whole-site audits. |
| [audit-fix-loop-no-preview](audit-fix-loop-no-preview/references/quickstart.md) | Continue source-backed triage and safe fixes when a browser is unavailable. Explicit visual and interaction gaps make later handoff clearer without falsely marking completion. |
| [variant-review-loop](variant-review-loop/references/quickstart.md) | Stable IDs and side-by-side visuals make each alternative easy to reference. Recording tradeoffs and decisions reduces confusion when revisiting earlier directions. |
| [figma-write](figma-write/references/quickstart.md) | Inspect containers and variables before editing to preserve design-system consistency. Small changes followed by property and screenshot checks help catch sizing or binding errors early. |
| [multi-session-protocol](multi-session-protocol/references/quickstart.md) | Explicit owners and file scopes reduce accidental work overwrites. Revision and verification receipts make handoffs easier to assess without guessing progress. |
| [content-pipeline-dashboard](content-pipeline-dashboard/references/quickstart.md) | Put drafts, media and locale progress in one matrix to spot blockers. Separating draft, reviewed and public states prevents private delivery from being mistaken for publication. |
| [work-sync-daily](work-sync-daily/references/quickstart.md) | Read-only reconciliation reveals gaps and duplicates before changing records. Explicit before/after approvals make updates easier to trace. |
| [work-report-weekly](work-report-weekly/references/quickstart.md) | Draft a week’s outcomes from evidence instead of reconstructing everything from memory. Reviewing the draft before sending reduces the risk of sharing unconfirmed content or using the wrong recipient. |

## Start here

**You choose the connections.** Skills describe the method; they do not log you into Google, Jira or Chrome. You install any required host tools, sign in and choose access scopes yourself. An email preference is not authentication. If you choose a routine, manually trial-run it and verify the first scheduled execution and any actual delivery. See the [plain-language connection examples](SECURITY.md).

New to frontend or UI/UX? Follow the [beginner walkthrough](docs/BEGINNER.en.md)
for installation, a first review, copyable prompts and common setup problems.

Open the interactive settings menu from this checkout (Python 3.11+):

```sh
python scripts/settings.py --workspace "YOUR_PROJECT_FULL_PATH" --language en
```

Windows: use `py -3` instead of `python`; macOS/Linux commonly use `python3`.
Choose preferences, ports, optional sources, multiple skills per phase and custom
commands through numbered options. Review changes and type YES to save. Files stay
outside the workspace; the menu never runs checks or connects accounts.

Combine this bundle with other installed skills using the
[composition contract](optional-skill-profile/references/composition.md): one
coordinator, shared preflight, explicit ownership and separate evidence per step.
External skill declarations do not install or certify those skills.

## Included: 13 skills

- `optional-skill-profile`: optional onboarding, local persistence, preview and editing.
- `ui-element-inspector`: hover to identify DOM elements/parent containers and copy context for AI.
- `states-preview-loop`: UI states and a user-selected preview port.
- `work-report-weekly`: source-backed weekly drafts with optional Calendar input.
- `work-sync-daily`: read-only reconciliation, with separately approved writes.
- `variant-review-loop`: stable design IDs and recorded convergence decisions.
- `multi-session-protocol`: acknowledged ownership and handoffs.
- `figma-write`: inspected token/layout changes and read-back evidence.
- `ui-design-review`: design/implementation comparison and scoped corrections.
- `a11y-review`: technical accessibility evidence; no unverified legal tables.
- `uiux-checks`: configurable overall quality review.
- `audit-fix-loop-no-preview`: source-backed triage and approved fixes.
- `content-pipeline-dashboard`: content ID/locale progress reconciliation.

Install these thirteen sibling directories together into the skill directory supported
by your agent. The profile helper requires Python 3.11+, standard library only.
The other skills explicitly read the sibling profile skill. If it is missing,
they operate without persistence and explain that limitation. There is no hook,
background service, OAuth implementation, or automatic scheduler in this package.
The agent asks the questions; the helper only stores validated preferences.

No third-party skill is bundled. See [THIRD_PARTY.md](THIRD_PARTY.md).

## Get the package

```sh
git clone https://github.com/karenya-lin/design-workflow-skills.git
cd design-workflow-skills
```

Read the [usage guide](docs/USAGE.en.md) before installing skills or running checks.
Do not overwrite existing private skills with the same names without reviewing them.

## Unified or individual checks

The standard-library `scripts/review.py` accepts a user-owned JSON config. Choose
one or more `--phase` options, repeat `--check`, or use `--all`. It defaults to a no-execution plan.
After reviewing commands and workspace, use `--execute --approve-config SHA256`.
The hash detects config changes; it is not a sandbox or proof that commands are safe.
AI skill steps stay NOT_RUN until an agent actually performs and verifies them.
Commands run first; the AI skill queue is separate, not interleaved with commands.
See `review.composition.example.json` for a multi-skill plan with an external placeholder.

## Private settings

Settings are created only after the user agrees to local saving. Their default
location is the operating system's per-user configuration directory, outside the
workspace, partitioned by resolved workspace path and a user-chosen profile name.
They are plain JSON, not an encrypted credential vault. Local file permissions
inherit the user's account protections (POSIX files additionally use mode 0600).
Do not store tokens, passwords, cookies, raw work records or email messages there.
An entered email is an identity preference, not proof of a live connection.

Source text is never interpreted as shell code. Settings do not grant permission
to send messages, change records, stop processes or push Git. Google credentials
stay with an authorized connector/OAuth provider. Disconnecting in these skills
disables reads; revoke OAuth separately in the provider to remove remote access.

## Verification

Run `python -m unittest discover -s tests -v`. Tests use temporary directories and
synthetic data. They do not connect accounts, stop processes or access a website.
Agent/browser/OAuth behavior still requires a separately authorized integration test.
See [testing and manual acceptance](docs/TESTING.md).
