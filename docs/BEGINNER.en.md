# Getting started for frontend and UI/UX beginners

[圖解操作 / Visual walkthrough](VISUAL-GUIDE.md)

[繁體中文](BEGINNER.zh-TW.md) · [Home](../README.md) · [Advanced usage](USAGE.en.md)

## What this package does

**A skill is a set of instructions for an AI agent, not a website, UI library or
automatically passing test.** Use a compatible agent with local file access, such
as Codex or Claude Code. This package helps review designs, frontend states,
accessibility and handoffs. Build your site using its existing framework and an
available implementation skill. Installing this bundle creates no site or connection.

| Goal | Requirements |
|---|---|
| Ask an agent to apply skills | Compatible AI tool, these skills, your design or project |
| Use the settings menu or review runner | Python 3.11+; no additional pip dependencies |
| Work on an existing frontend | Its required Node/package manager versions, from its README |
| Access Figma or Calendar | Separately available tools and scoped account authorization; optional |

The current toolkit is source-available and free to use, modify and embed, including in commercial work, but the skill pack itself may not be resold under the MIT + Commons Clause terms. Earlier MIT-only revisions keep their original license. AI services and connectors may have their own pricing.
You can start without Python when using instructions only: ask the agent to use
session-only preferences and not claim durable saving.

## 1. Download and install

Use **Code → Download ZIP** on GitHub, extract it and keep the entire folder. Or:

```sh
git clone https://github.com/karenya-lin/design-workflow-skills.git
cd design-workflow-skills
```

This is your toolkit folder, not your website. Do not put the bundle in the site's
`src`, `public` or public download directory. Read [security](../SECURITY.md) first.

| Agent | One project | Personal, across local projects |
|---|---|---|
| Codex | Project `.agents/skills/` | Home directory `.agents/skills/` |
| Claude Code | Project `.claude/skills/` | Home directory `.claude/skills/` |

These are local discovery locations from the official documentation. Cloud sessions
may not have access to local folders. Sources: [Codex](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills).

Choose the skill folders needed for your task from the **14 available skills** and copy them into
your chosen directory, keeping them as siblings so their relative references work:

```text
.agents/skills/                 ← use .claude/skills/ for Claude Code
  optional-skill-profile/
    SKILL.md
    references/
    scripts/
  uiux-checks/
    SKILL.md
  a11y-review/
  ...remaining skills
```

Keep docs, root-level scripts and tests in the original toolkit checkout for the
guides, settings menu, runner and tests; they do not need installation as skills.
**Never overwrite existing same-name skills blindly.** Compare, back up and agree
on migration first, including collisions between personal and project installations.
Start a new agent conversation and ask it to list the names and actual source paths
it found so you can distinguish this bundle from older copies.

If installation feels unfamiliar, ask your agent:

> Read this bundle's README and SECURITY first. I use [Codex / Claude Code] and want
> [project / personal] installation. List source and destination folders and all name
> conflicts. Do not overwrite existing files. After my confirmation, copy the selected
> skill folders, check SKILL.md and relative references, and explain how to
> invoke them in a new conversation.

## 2. One script opens the settings menu

Open a terminal in the **toolkit folder**. Windows PowerShell:

```powershell
py -3 scripts/settings.py --workspace "YOUR_PROJECT_FULL_PATH"
```

macOS/Linux:

```sh
python3 scripts/settings.py --workspace "/path/to/your-project"
```

Replace the quoted value with an existing project directory, not a URL or file.
The workspace is the root of the work; different paths have separate settings.
Add `--profile design` or `--profile frontend` to keep distinct profiles for one
workspace. Add `--language en` for the English menu or press 9 inside the menu.

```text
1 Edit preferences       Language, timezone, port, source preferences
2 Edit pipeline          Add phases, select multiple skills, manage commands
3 Show settings          Check before saving
4 Save preferences       Review differences; type YES to write
5 Save pipeline          Separately review differences; type YES to write
6 Reset preferences      Pending until saved
7 Reset pipeline         Pending until saved
8 Disconnect all sources Pending until saved with 4; revoke OAuth separately
9 Switch menu language
0 Exit                   Discard unsaved changes
```

Preferences and pipelines are **saved separately**, not in a shared transaction.
The menu displays their actual paths under your personal config directory outside
the workspace. Do not commit them. Email/calendar IDs are masked in preference
summaries; other labels and command paths may still be private. Files are plain JSON,
not a credential vault. Never enter tokens, passwords, cookies or raw work records.

Start with `language=en` and a preview port such as `4321`; other fields are optional.
A port identifies a local service endpoint. Saving it does not start a server or
stop an occupying process. Stopping an existing Node process requires the agent to
identify the process, explain impact and request specific confirmation first.

## 3. Start with one small task

Don't know what a UI part is called? Start with
[ui-element-inspector](../ui-element-inspector/references/usage.md). Its local demo
lets you hover, select a parent container and copy a locator report without opening
DevTools. Screenshot mode keeps outlines while you use the system capture shortcut.

Open your **website project** in your agent and paste:

> Use uiux-checks, ui-design-review and a11y-review, first verifying that all three
> skills are readable. I am a frontend/UIUX beginner. Review only [page/component]
> against [reference file/image]. Read project README, AGENTS.md and relevant code;
> do not edit yet. Share one settings preflight. Plan desktop/mobile, button states,
> form errors and keyboard checks. Separate evidenced findings from untested items,
> explain why they matter, then let me select fixes. Do not run production JavaScript
> without an authorized safe preview and analytics-pollution prevention.

Expect a scope, methods, findings, evidence and untested items, not “all good”.
If the reference lacks hover or error states, the agent should ask or list the gap.

## 4. Common setup and workflows

| Stage | Suggested skills | Inputs and outputs |
|---|---|---|
| Start an existing app | Existing build recipe + states-preview-loop | README and port; launch instructions and preview states |
| Design only | variant-review-loop, ui-design-review | Goal and reference; differences and directions, not claimed implementation |
| Implement frontend | Your installed implementation skill, then ui-design-review | Exact component scope; changes and design comparison |
| Mobile and interaction | states-preview-loop, a11y-review | Safe preview; state, keyboard and viewport evidence |
| Fix approved findings | audit-fix-loop-no-preview | Selected issue IDs; narrow changes and regression |
| Before delivery | uiux-checks + project checks | Actual lint/types/tests/build results and remaining risk |
| Weekly notes | work-report-weekly | Manual notes or optional authorized sources; a draft, not a sent email |

Start with two to four relevant skills, not every skill. Lint checks code rules,
type checks validate types, and build checks compilation. None proves that buttons work.

For an unfamiliar app, ask:

> Read this project's README, package.json, lockfile and configuration. Explain its
> framework, package manager, required Node version and install/start/verify commands.
> Mark missing information. Do not upgrade dependencies or delete lockfiles. Present
> commands and affected files for confirmation before installing or starting. Do not
> deploy or push in this task.

The skills bundle itself has no `npm run dev`. Do not initialize React or install
website dependencies here just to use the skills.

## 5. Combine skills and generate a plan

Read the [composition contract](../optional-skill-profile/references/composition.md).
External skills own their settings. This menu manages references/order and this
bundle's shared preferences, not arbitrary third-party settings or guaranteed compatibility.

Try a plan with no executable checks (Windows; use `python3` elsewhere):

```powershell
py -3 scripts/review.py --config review.example.json --workspace . --phase review
```

Here `.` means the toolkit directory for practice. `NOT_RUN` is expected: AI checks
have not run. For your website, replace workspace with its path and config with the
menu's displayed `default.review.local.json`. Repeat phases in the desired order:

```powershell
py -3 scripts/review.py --config review.composition.example.json --workspace . --phase visual-review --phase accessibility --phase summary
```

`your-frontend-skill` in the example is a placeholder, not a downloadable dependency.
Declare a real installed external skill in the menu, then select it in a phase.
For executable checks, read [advanced usage](USAGE.en.md), inspect scripts and approve
the current config hash. The runner does not launch AI or interleave fixes and tests.
After a fix, run affected verification separately; do not reuse the pre-fix PASS.

## Troubleshooting

| Symptom | Next step |
|---|---|
| Skill missing | Check folder depth/name, collisions and actual loaded source; start a new conversation |
| Python missing | Check Python 3.11+: `py -3 --version` on Windows or `python3 --version` elsewhere |
| Settings forgotten | Did you save with 4/5 and YES? Did workspace/profile change? |
| Conflict or lock | Another session may be writing; preserve files and reload, never remove its lock |
| Command rejected | Shell wrappers are refused; find the real executable/script, do not bypass with cmd |
| No checks selected | AI-only plans are valid, but not evidence of passing tests |
| Calendar enabled but unreadable | A preference is not a connection; verify tools, actual identity and authorization |
| Reset everything | Select 6 and 7, then save each with 4 and 5; revoke OAuth separately |

## Optional coverage checker / 選用清單檢查

The Figma rebrand coverage checker uses Node.js (tested with Node 22), with no npm packages. Node is not required to read the skill instructions.

Figma 換品牌清單檢查器使用 Node.js（Node 22 已測），不需 npm 套件；僅閱讀 skill 流程不需 Node。
