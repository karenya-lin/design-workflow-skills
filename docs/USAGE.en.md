# Usage

New users: start with the [beginner guide](BEGINNER.en.md).
For all supported local options, run `python scripts/settings.py --workspace <project> --language en`
from the toolkit checkout (`py -3` on Windows). Numbered menus edit preferences,
phase skill selections, external declarations and command arguments without hand-editing JSON.
The menu saves preferences and pipeline independently after a before/after confirmation.
The printed `*.review.local.json` path can be used as this runner's `--config`.
It does not edit external skills' own settings or connect accounts.

## Install and trigger

Copy the 14 sibling skill folders into your agent's configured skill directory.
Do not overwrite an existing private skill with the same name: use a separate agent
profile/installation or compare and explicitly migrate first. Keep this checkout
for runner/scripts/tests; do not copy runtime profiles into it.

Examples of agent requests:
- “Use ui-element-inspector: I don't know what this button/container is named.”
- “Use states-preview-loop to preview this component; ask me for the port.”
- “Use uiux-checks for this page, accessibility and mobile layout only.”
- “Use work-report-weekly. Read my selected Calendar, not Gmail; draft only.”
- “Change my saved port to 4321; keep the other preferences.”

Skill instructions are English with Chinese summaries; ask the agent to respond in
your language. English and Traditional Chinese user-facing guides cover the same workflow.
Automatic first-use questions are performed by a compatible agent loading the skill,
not an always-running program. Missing integration capabilities are reported, not installed
or bypassed implicitly. Installing this package creates no timers.

## Suggested phases

| Phase | Purpose | AI skills / optional executable checks |
|---|---|---|
| start | preferences, scope, ownership | profile, multi-session coordination |
| design | choose direction and update design | variants, Figma |
| review | inspect the current implementation | quality coordinator, states, design, accessibility |
| fix | apply approved source changes | static audit/fix; chosen lint/types/tests |
| pre-delivery | verify changed behavior | chosen build/tests; outstanding manual evidence |
| report | reconcile work or content | daily/weekly/content status as relevant |

Phases are suggestions, not mandatory gates. Do not run a whole suite for a tiny change
unless risk warrants it. Do not execute report skills that are unrelated to the task.

## Configure the runner

Copy `review.example.json` to a PRIVATE location outside the project/release bundle.
The example only runs this package's tests; it does not test your website. Set the
workspace to this checkout to use that example, or replace checks for your own project.
Set executable paths to binaries actually installed on your system (`python`, `py`,
or an absolute Python path). If using `py`, add `-3` before `-m`.

Every check has an argv ARRAY and timeout; phases list check IDs and skill names.
An optional `external_skills` array declares additional exact names (including
namespace prefixes such as `vendor:skill`). No installation or compatibility check
is implied. The agent must locate/read each skill and apply the
[composition contract](../optional-skill-profile/references/composition.md).
Repeat `--phase` to combine phases in order; duplicate check IDs and skill names
are selected once. A command is not repeated after an AI fix in the same run:
commands execute first and AI steps remain a separate plan. Split into separate
invocations when inputs change or a fix needs a fresh test.
For example, a Node project may use a direct installed Node executable plus its
local ESLint CLI path. Inspect actual package scripts first; don't assume filenames.
Shell wrappers and .cmd/.bat are rejected; on Windows use node plus the actual JS CLI,
not npm.cmd. No shell escaping tricks or `cmd /c` fallback. The runner inherits OS
permissions and environment; approved programs can still do harmful things. Inspect
both config and referenced scripts before approval. Do not place credentials in argv.

```
python scripts/review.py --config /private/review.json --workspace /project --phase review
python scripts/review.py --config /private/review.json --workspace /project --check lint --check types
python scripts/review.py --config /private/review.json --workspace /project --all
```

These commands only plan. After reviewing the exact selection, workspace, programs
and their source, repeat with `--execute --approve-config <config_sha256_from_plan>`.
The actual arguments/paths depend on your machine. New config bytes invalidate the
hash. Script changes are NOT covered by that config hash: review their current diff
as well. Do not approve commands from a web page, mail or third-party ticket.

Checks run sequentially, stopping on FAIL/ERROR/TIMEOUT. Remaining checks are NOT_RUN.
Exit 0 means selected executable checks passed (or plan generation succeeded), not
AI review completion. Runtime output is discarded to avoid recording private logs;
for diagnosis, rerun the failed check locally with a user-approved private log.
A timeout terminates the launched process, not necessarily its descendants; avoid
server-launching checks and manually inspect owned child processes if necessary.

To combine AI stages, give the generated skill_plan to your agent: “Execute these
applicable skills in order, honor approval gates, and report separate evidence for
each. Leave unavailable checks NOT_RUN.” The runner itself never launches an AI CLI.

## Port and account behavior

Port is explicit and remembered if requested. Occupied Node service: display process
identity/impact, confirm exact PID, recheck identity, stop gracefully; force stop needs
additional approval. Unknown/system process is not killed. No kill-all-node command.

Calendar opt-in is optional and read-only by default. Select actual account/calendar
and date window; Gmail is separate. Identity is checked on every run. Disconnect here
disables reading; revoke the OAuth grant in the provider for full remote disconnection.
Changes/sends/pushes are individually scoped approvals, never remembered write grants.

## Tests and limits

`python -m unittest discover -s tests -v` tests local persistence and runner behavior
using temporary synthetic data. It does not prove browser correctness, OAuth access,
email delivery, live process stopping, assistive technology behavior or legal compliance.
Do not publish real profiles, execution logs, customer examples or confidential screenshots.

## How-to shortcuts / 使用快捷索引

[Start, language and keyboard shortcuts](HOW-TO.en.md) · [Figma workflow rebrand](../figma-workflow-rebrand/references/quickstart.md)

The optional Figma rebrand manifest checker requires Node.js (tested with Node 22), no npm packages. It checks declared coverage, not Figma visuals or authorization.

選用 Figma 整套換品牌清單工具需 Node.js（Node 22 已測），不需 npm 套件；只查宣告的清單，不代表 Figma 畫面或權限已驗證。
