# Design Workflow Skills

Configurable skills for design reviews, UI quality checks and work coordination.
Installing this package does not connect accounts or create automatic schedules.
The original package
is offered under MIT; third-party exclusions are documented separately. This does
not grant rights to company/customer material, none of which should be added here.

[繁體中文](README.zh-TW.md) · [English usage](docs/USAGE.en.md) ·
[Security / 資安](SECURITY.md) · [License](LICENSE)

## Start here

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

## Included: 12 skills

- `optional-skill-profile`: optional onboarding, local persistence, preview and editing.
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

Install these twelve sibling directories together into the skill directory supported
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
