# Design Workflow Skills

**Release status:** [What is verified and what is still testing, for every skill](docs/RELEASE-STATUS.md). UI Inspect's main local workflow is tested. DevTools extensions are not released.

## Who does what? Start with the AI-assisted skill

**Too many wrapper divs?** UI Inspect now offers Simplified / Full DOM views and a copyable structure-review request. It folds tool rows without modifying page nodes. [Four illustrated steps](ui-element-inspector/references/dom-structure.md).

**The skill does not send requests to AI automatically.** You review the context, click **Copy change request**, and paste it into the AI conversation you choose.

| Step | You | AI / tool |
|---|---|---|
| Start | Tell your AI: “Use ui-element-inspector on this project. Reuse my running local server and its port.” | AI checks project rules and the actual URL, then proposes/sets up authorized temporary development-only inspection. The host must support the needed file/browser operations. |
| Select | Hover to see names; click the page or DOM tree. | Tool highlights the element and current-page matches. No guessed source filenames or React state. |
| Scope | Click numbered ticks to locate #1, #2, etc.; exclude items to keep. | “Matches” lists the current group; “To copy” shows included items only. Numbers stay tied to that group until it is rebuilt. |
| Request | Write “Make #3 orange, keep #2.” Review, copy, paste into your AI chat. | Tool copies selectors, scope, exceptions and your words. **You choose the destination.** |
| Implement | Ask the AI to make the reviewed change. | AI locates the actual source, edits within scope and verifies. The inspector itself does not edit your project. |
| Finish | Close the inspector. | AI removes temporary project integration and verifies it is excluded from production. Existing servers are not killed. |

**Already running localhost?** Reuse it; a different-port iframe can preview but cannot read its DOM. Ask the AI for authorized project integration. The bundled `rwd-preview.html` demonstrates the tool; it is not a universal URL inspector.

**Online URL?** The current skill overlay is limited to local/file pages. The separately planned Chrome/Edge/Firefox DevTools extension will offer direct inspection after per-page approval. **That extension remains under development and is not included as a verified release.** Both approaches will be retained; this delivery prioritizes the skill.

CSS variable output lists `var(--name)` reference candidates in readable matching declarations. It can miss inherited/nested/inaccessible styles and cannot prove the winning cascade. Arbitrary custom-property values, React state and network payloads are not collected.

[Illustrated walkthrough](docs/VISUAL-GUIDE.md) · [Precise activation and limitations](ui-element-inspector/references/usage.md)


Current interaction: hover the preview to open Inspect; click to select. [Updated RWD and hover screenshots](docs/VISUAL-GUIDE.md). Videos below show the earlier controls.

## How to use · quick links

### Minimum install and optional companions

Install only what your task needs; all 14 skills are not mandatory. Use the [folder-copy installation guide](docs/BEGINNER.en.md#1-download-and-install), preserving each selected skill's bundled references, scripts and assets.

| Goal | Primary skill | Add only if needed |
|---|---|---|
| Point at an unnamed UI element | `ui-element-inspector` | `optional-skill-profile` for reusable project settings |
| Compare implementation with an approved design | `ui-design-review` | `a11y-review` for a dedicated accessibility pass; `states-preview-loop` for state/viewport evidence |
| Run a broad UI quality sweep | `uiux-checks` | Only the specialist checks selected for this task |
| Make one targeted Figma edit | `figma-write` | An authorized Figma connector/tool with the required capability |
| Rebrand a whole Figma workflow | `figma-workflow-rebrand` | `figma-write` only when an operation needs its targeted-edit guidance |
| Coordinate parallel agents | `multi-session-protocol` | `optional-skill-profile` if shared settings are useful |
| Reconcile today's work | `work-sync-daily` | Only the approved Calendar/Jira/source connectors |
| Draft a weekly report | `work-report-weekly` | Optional selected Calendar/source access |
| Reconcile content status | `content-pipeline-dashboard` | Only the approved content sources |

**Do not install `uiux-checks` plus every specialist by default.** Use one primary skill, then add only the checks the task actually requires.

Python 3.11+ is needed for Python settings/profile helpers and the runner. Node.js (tested with Node 22) is needed only when running the rebrand coverage checker. Neither runtime is a skill or an account authorization.

## Why this bundle is intentionally lean at runtime

This repo is designed around a few common Agent Skill failure modes, not around making every skill bigger.

OpenAI's current skill guidance emphasizes two things that matter here: the **name/description are the routing contract**, and detailed procedures should use **progressive disclosure** through `references/`, `scripts/` and `assets/` instead of flooding the initial context. See [Build skills](https://developers.openai.com/plugins/build/skills) and [Skills](https://developers.openai.com/plugins/concepts/skills).

| Common pain point | What this repo does |
|---|---|
| A vague skill triggers on the wrong task | Every skill description now says what it is for and, where overlap is likely, what it is **not** for. |
| Too many installed skills compete for attention | The README recommends the smallest useful install set instead of all 14 by default. Coordinator skills do not require every specialist. |
| A giant `SKILL.md` consumes context before the work starts | Long operational detail is kept in on-demand references. The two largest skills, `figma-workflow-rebrand` and `ui-element-inspector`, use short routing/safety files plus execution runbooks. |
| Users cannot tell a Skill from a connector, hook or account login | Skills define workflow. Connectors/tools provide live access, authentication and controlled actions. Installing this repo never logs into an account or creates a background schedule. |
| A skill says “done” without proving what ran | Each workflow separates verified evidence, untested behavior and blocked/missing capability. The runner keeps AI steps as `NOT_RUN` until an agent actually performs them. |
| Copying a public skill hides security assumptions | Third-party skills are not bundled. Review `SKILL.md`, scripts and requested permissions before installation; see [SECURITY.md](SECURITY.md) and [THIRD_PARTY.md](THIRD_PARTY.md). |

This is also why **“more skills” is not a goal**. Add a new skill only when it has a distinct trigger, input contract or success criterion. Otherwise extend an existing specialist or reference file.

### Human-readable outside, compact semantics inside

Human-facing instructions and final answers stay readable. **AI-to-AI / Skill-to-Skill handoffs may use a compact semantic envelope** so the same project history and rules are not rewritten every turn.

Example:

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

The shared [compact semantic contract](optional-skill-profile/references/compact-semantic-handoff.md) uses stable fields such as `intent`, `scope`, `facts`, `constraints`, `unresolved`, `evidence`, `state` and `next`. Empty/default fields are omitted. Exact raw wording is preserved only when nuance, authority, safety, legal terms or acceptance criteria would be lost.

This is meant to reduce **repeated input context and repeated formatting instructions**. It is not a promise of a fixed percentage of token savings; measure representative before/after handoffs.

### Skill, project rule, hook or connector?

| If you need… | Put it here |
|---|---|
| A repeatable workflow that should load only for matching tasks | **Skill** |
| A rule that should apply to nearly every task in one project | The host's project-instruction file, such as **AGENTS.md / CLAUDE.md** |
| A deterministic action that must fire on a specific host event | A host-supported **hook/automation**, not a prose-only skill |
| Live account data, authentication or controlled external actions | An authorized **connector / MCP tool**; the Skill only explains the workflow around it |

Host products differ in discovery, hooks and connector support. A portable `SKILL.md` does not mean every host provides identical runtime features.



| English | 繁體中文 | Français | 日本語 |
|---|---|---|---|
| [Start & shortcuts](docs/HOW-TO.en.md) | [啟動與快捷鍵](docs/HOW-TO.zh-TW.md) | [Démarrer et raccourcis](docs/HOW-TO.fr.md) | [使い方・ショートカット](docs/HOW-TO.ja.md) |

[Install](docs/BEGINNER.en.md) · [Settings & custom scripts](docs/USAGE.en.md) · [Every step below](#step-by-step-pictures) · [Keyboard / Print Screen](docs/HOW-TO.en.md#keyboard-and-screenshot-shortcuts)

[![Watch the English walkthrough](docs/images/inspector-04-capture-en.png)](docs/videos/inspector-en.webm)

**[▶ Watch video · 23 seconds](docs/videos/inspector-en.webm)** · [English video](docs/videos/inspector-en.webm) · [繁中影片](docs/videos/inspector-zh-TW.webm) · [Transcript / 文字步驟](docs/videos/README.md)

Actual local demo, silent video. Clipboard is mocked; native capture is not invoked. Download the WebM if GitHub does not play it. French/Japanese cover the inspector and quick-start pages; full skill guides and videos are EN/ZH.



[14 個 skills 完整圖解 / All 14 skill guides](docs/SKILL-MAP.md) · [UI Inspect 畫面 / Screenshots](docs/VISUAL-GUIDE.md)


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
| [ui-design-review](ui-design-review/references/quickstart.md) | Separate visual differences from functional problems to prioritize corrections. Reusing components and tokens reduces unintended inconsistency across screens. Also checks the author's own UX principles: related content stacked vertically, the positive action on the right, verification and password rules, shared components and tokens ([checklist](ui-design-review/references/ux-principles.md)). |
| [a11y-review](a11y-review/references/quickstart.md) | Find keyboard, focus and labeling barriers early so more people can use the interface. Separating tested and untested results prevents scans from being mistaken for complete conformance evidence. |
| [uiux-checks](uiux-checks/references/quickstart.md) | Coordinate several checks without repeating the same setup and evidence gathering. Scope selection keeps small changes from turning into unnecessary whole-site audits. |
| [audit-fix-loop-no-preview](audit-fix-loop-no-preview/references/quickstart.md) | Continue source-backed triage and safe fixes when a browser is unavailable. Explicit visual and interaction gaps make later handoff clearer without falsely marking completion. |
| [variant-review-loop](variant-review-loop/references/quickstart.md) | Stable IDs and side-by-side visuals make each alternative easy to reference. Recording tradeoffs and decisions reduces confusion when revisiting earlier directions. |
| [figma-write](figma-write/references/quickstart.md) | Inspect containers and variables before editing to preserve design-system consistency. Small changes followed by property and screenshot checks help catch sizing or binding errors early. |
| [figma-workflow-rebrand](figma-workflow-rebrand/references/quickstart.md) | Map the new brand across the complete frame set while preserving workflow and design details. Track screens, states and links individually to reduce missed overlays and partial rebrands. |
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

## Included: 14 skills

- `optional-skill-profile`: optional onboarding, local persistence, preview and editing.
- `ui-element-inspector`: hover to identify DOM elements/parent containers and copy context for AI.
- `states-preview-loop`: UI states and a user-selected preview port.
- `work-report-weekly`: source-backed weekly drafts with optional Calendar input.
- `work-sync-daily`: read-only reconciliation, with separately approved writes.
- `variant-review-loop`: stable design IDs and recorded convergence decisions.
- `multi-session-protocol`: acknowledged ownership and handoffs.
- `figma-write`: inspected token/layout changes and read-back evidence.
- `figma-workflow-rebrand`: adapt complete frame sets while preserving the source and tracking states and prototype links.
- `ui-design-review`: design/implementation comparison, the author's UX principles (KUX-01 to KUX-07) and scoped corrections.
- `a11y-review`: technical accessibility evidence; no unverified legal tables.
- `uiux-checks`: configurable overall quality review.
- `audit-fix-loop-no-preview`: source-backed triage and approved fixes.
- `content-pipeline-dashboard`: content ID/locale progress reconciliation.

This repository ships fourteen sibling skill directories, but **you do not need to install all fourteen**. Keep the checkout intact for documentation and tests, then copy only the skill directories required by your task, preserving each selected skill's own `references/`, `scripts/` and `assets/`.

`optional-skill-profile` is optional. Skills that can use it must fall back to session-only behavior when it is absent and say so. The profile helper requires Python 3.11+, standard library only. There is no hook, background service, OAuth implementation or automatic scheduler in this package. The agent asks the questions; the helper only stores validated preferences.

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

<a id="step-by-step-pictures"></a>

## Step-by-step pictures

Click a skill below to jump; expand its gallery and click a picture for full size. UI Inspect images are actual local UI captures. Other skills show locally rendered **instructional examples**, not live AI/service execution.

[a11y-review](#guide-a11y-review) · [audit-fix-loop-no-preview](#guide-audit-fix-loop-no-preview) · [content-pipeline-dashboard](#guide-content-pipeline-dashboard) · [figma-workflow-rebrand](#guide-figma-workflow-rebrand) · [figma-write](#guide-figma-write) · [multi-session-protocol](#guide-multi-session-protocol) · [optional-skill-profile](#guide-optional-skill-profile) · [states-preview-loop](#guide-states-preview-loop) · [ui-design-review](#guide-ui-design-review) · [ui-element-inspector](#guide-ui-element-inspector) · [uiux-checks](#guide-uiux-checks) · [variant-review-loop](#guide-variant-review-loop) · [work-report-weekly](#guide-work-report-weekly) · [work-sync-daily](#guide-work-sync-daily)

<a id="guide-a11y-review"></a>

<details>
<summary>a11y-review · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](a11y-review/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![a11y-review Step 1 en](a11y-review/references/screenshots/step-01-en.png)](a11y-review/references/screenshots/step-01-en.png) | [![a11y-review Step 2 en](a11y-review/references/screenshots/step-02-en.png)](a11y-review/references/screenshots/step-02-en.png) | [![a11y-review Step 3 en](a11y-review/references/screenshots/step-03-en.png)](a11y-review/references/screenshots/step-03-en.png) |

</details>

<a id="guide-audit-fix-loop-no-preview"></a>

<details>
<summary>audit-fix-loop-no-preview · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](audit-fix-loop-no-preview/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![audit-fix-loop-no-preview Step 1 en](audit-fix-loop-no-preview/references/screenshots/step-01-en.png)](audit-fix-loop-no-preview/references/screenshots/step-01-en.png) | [![audit-fix-loop-no-preview Step 2 en](audit-fix-loop-no-preview/references/screenshots/step-02-en.png)](audit-fix-loop-no-preview/references/screenshots/step-02-en.png) | [![audit-fix-loop-no-preview Step 3 en](audit-fix-loop-no-preview/references/screenshots/step-03-en.png)](audit-fix-loop-no-preview/references/screenshots/step-03-en.png) |

</details>

<a id="guide-content-pipeline-dashboard"></a>

<details>
<summary>content-pipeline-dashboard · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](content-pipeline-dashboard/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![content-pipeline-dashboard Step 1 en](content-pipeline-dashboard/references/screenshots/step-01-en.png)](content-pipeline-dashboard/references/screenshots/step-01-en.png) | [![content-pipeline-dashboard Step 2 en](content-pipeline-dashboard/references/screenshots/step-02-en.png)](content-pipeline-dashboard/references/screenshots/step-02-en.png) | [![content-pipeline-dashboard Step 3 en](content-pipeline-dashboard/references/screenshots/step-03-en.png)](content-pipeline-dashboard/references/screenshots/step-03-en.png) |

</details>

<a id="guide-figma-workflow-rebrand"></a>

<details>
<summary>figma-workflow-rebrand · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](figma-workflow-rebrand/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![figma-workflow-rebrand Step 1 en](figma-workflow-rebrand/references/screenshots/step-01-en.png)](figma-workflow-rebrand/references/screenshots/step-01-en.png) | [![figma-workflow-rebrand Step 2 en](figma-workflow-rebrand/references/screenshots/step-02-en.png)](figma-workflow-rebrand/references/screenshots/step-02-en.png) | [![figma-workflow-rebrand Step 3 en](figma-workflow-rebrand/references/screenshots/step-03-en.png)](figma-workflow-rebrand/references/screenshots/step-03-en.png) |

</details>

<a id="guide-figma-write"></a>

<details>
<summary>figma-write · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](figma-write/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![figma-write Step 1 en](figma-write/references/screenshots/step-01-en.png)](figma-write/references/screenshots/step-01-en.png) | [![figma-write Step 2 en](figma-write/references/screenshots/step-02-en.png)](figma-write/references/screenshots/step-02-en.png) | [![figma-write Step 3 en](figma-write/references/screenshots/step-03-en.png)](figma-write/references/screenshots/step-03-en.png) |

</details>

<a id="guide-multi-session-protocol"></a>

<details>
<summary>multi-session-protocol · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](multi-session-protocol/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![multi-session-protocol Step 1 en](multi-session-protocol/references/screenshots/step-01-en.png)](multi-session-protocol/references/screenshots/step-01-en.png) | [![multi-session-protocol Step 2 en](multi-session-protocol/references/screenshots/step-02-en.png)](multi-session-protocol/references/screenshots/step-02-en.png) | [![multi-session-protocol Step 3 en](multi-session-protocol/references/screenshots/step-03-en.png)](multi-session-protocol/references/screenshots/step-03-en.png) |

</details>

<a id="guide-optional-skill-profile"></a>

<details>
<summary>optional-skill-profile · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](optional-skill-profile/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![optional-skill-profile Step 1 en](optional-skill-profile/references/screenshots/step-01-en.png)](optional-skill-profile/references/screenshots/step-01-en.png) | [![optional-skill-profile Step 2 en](optional-skill-profile/references/screenshots/step-02-en.png)](optional-skill-profile/references/screenshots/step-02-en.png) | [![optional-skill-profile Step 3 en](optional-skill-profile/references/screenshots/step-03-en.png)](optional-skill-profile/references/screenshots/step-03-en.png) |

</details>

<a id="guide-states-preview-loop"></a>

<details>
<summary>states-preview-loop · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](states-preview-loop/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![states-preview-loop Step 1 en](states-preview-loop/references/screenshots/step-01-en.png)](states-preview-loop/references/screenshots/step-01-en.png) | [![states-preview-loop Step 2 en](states-preview-loop/references/screenshots/step-02-en.png)](states-preview-loop/references/screenshots/step-02-en.png) | [![states-preview-loop Step 3 en](states-preview-loop/references/screenshots/step-03-en.png)](states-preview-loop/references/screenshots/step-03-en.png) |

</details>

<a id="guide-ui-design-review"></a>

<details>
<summary>ui-design-review · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](ui-design-review/references/quickstart.md) · [UX principles checked here](ui-design-review/references/ux-principles.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![ui-design-review Step 1 en](ui-design-review/references/screenshots/step-01-en.png)](ui-design-review/references/screenshots/step-01-en.png) | [![ui-design-review Step 2 en](ui-design-review/references/screenshots/step-02-en.png)](ui-design-review/references/screenshots/step-02-en.png) | [![ui-design-review Step 3 en](ui-design-review/references/screenshots/step-03-en.png)](ui-design-review/references/screenshots/step-03-en.png) |

</details>

<a id="guide-ui-element-inspector"></a>

<details>
<summary>ui-element-inspector · Actual UI captures · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](ui-element-inspector/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![ui-element-inspector Step 1 en](ui-element-inspector/references/screenshots/step-01-en.png)](ui-element-inspector/references/screenshots/step-01-en.png) | [![ui-element-inspector Step 2 en](ui-element-inspector/references/screenshots/step-02-en.png)](ui-element-inspector/references/screenshots/step-02-en.png) | [![ui-element-inspector Step 3 en](ui-element-inspector/references/screenshots/step-03-en.png)](ui-element-inspector/references/screenshots/step-03-en.png) |

</details>

<a id="guide-uiux-checks"></a>

<details>
<summary>uiux-checks · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](uiux-checks/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![uiux-checks Step 1 en](uiux-checks/references/screenshots/step-01-en.png)](uiux-checks/references/screenshots/step-01-en.png) | [![uiux-checks Step 2 en](uiux-checks/references/screenshots/step-02-en.png)](uiux-checks/references/screenshots/step-02-en.png) | [![uiux-checks Step 3 en](uiux-checks/references/screenshots/step-03-en.png)](uiux-checks/references/screenshots/step-03-en.png) |

</details>

<a id="guide-variant-review-loop"></a>

<details>
<summary>variant-review-loop · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](variant-review-loop/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![variant-review-loop Step 1 en](variant-review-loop/references/screenshots/step-01-en.png)](variant-review-loop/references/screenshots/step-01-en.png) | [![variant-review-loop Step 2 en](variant-review-loop/references/screenshots/step-02-en.png)](variant-review-loop/references/screenshots/step-02-en.png) | [![variant-review-loop Step 3 en](variant-review-loop/references/screenshots/step-03-en.png)](variant-review-loop/references/screenshots/step-03-en.png) |

</details>

<a id="guide-work-report-weekly"></a>

<details>
<summary>work-report-weekly · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](work-report-weekly/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![work-report-weekly Step 1 en](work-report-weekly/references/screenshots/step-01-en.png)](work-report-weekly/references/screenshots/step-01-en.png) | [![work-report-weekly Step 2 en](work-report-weekly/references/screenshots/step-02-en.png)](work-report-weekly/references/screenshots/step-02-en.png) | [![work-report-weekly Step 3 en](work-report-weekly/references/screenshots/step-03-en.png)](work-report-weekly/references/screenshots/step-03-en.png) |

</details>

<a id="guide-work-sync-daily"></a>

<details>
<summary>work-sync-daily · Instructional examples · Step 1 → 2 → 3</summary>

[Complete how-to, options and finish](work-sync-daily/references/quickstart.md)

| Step 1 | Step 2 | Step 3 |
|---|---|---|
| [![work-sync-daily Step 1 en](work-sync-daily/references/screenshots/step-01-en.png)](work-sync-daily/references/screenshots/step-01-en.png) | [![work-sync-daily Step 2 en](work-sync-daily/references/screenshots/step-02-en.png)](work-sync-daily/references/screenshots/step-02-en.png) | [![work-sync-daily Step 3 en](work-sync-daily/references/screenshots/step-03-en.png)](work-sync-daily/references/screenshots/step-03-en.png) |

</details>
