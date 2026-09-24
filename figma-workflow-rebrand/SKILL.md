---
name: figma-workflow-rebrand
description: Rebrand a whole Figma workflow while preserving source, states, components and prototype behavior. Use for multi-frame white-label or brand migration; not for one isolated edit or generic UI review.
---

# Figma Workflow Rebrand

Produce a separately editable target-brand workflow, with coverage of every agreed screen and state. Preserve the original design and its private project material.

繁中：將整套畫面與流程套用新品牌，保留原稿、元件與互動。涵蓋各種狀態、語系及 RTL，依專案選用。

Read the sibling [optional profile](../optional-skill-profile/SKILL.md) if available and reuse an existing preflight for the same run. Without it, use session-only settings and explain that they are not saved. Keep brand assets, node inventories and scenario data task-local, outside the public bundle. Do not add unsupported fields to the shared profile schema.

Read [the bilingual quickstart](references/quickstart.md) when explaining usage or onboarding a user. Its diagram explains the process and is not an execution screenshot. During execution, load supporting references only when their procedures are needed.

## 1. Establish the rebrand contract

Read the source design and its applicable project instructions before proposing changes. Load the installed Figma tool skill required by the actual operation. Use the current connector's documented capabilities, not assumed API access.

Collect or derive a compact task-local profile:

| Field | Record |
| --- | --- |
| Source | Figma file, pages/sections, starting points, included workflows |
| Destination | Approved new file or separate page, target brand, editable delivery |
| Brand system | Approved logo assets, semantic color roles, typography, icons, imagery, modes |
| Content | Replacement names, domains, terminology, scenario entities and approved sample data |
| Preservation | Third-party marks, legal text, functional behavior, layout details to keep |
| Variants | Requested brand/language/device/mode combinations, including RTL if applicable |
| Outputs | Figma links, optional exports, formats, actual export scale, destination and access |

Ask only for missing decisions that materially affect the result. A missing logo or font is not permission to invent an official asset. Keep unresolved choices visible in the task notes.

Do not assume a particular industry, RFQ, fixed screen count, two languages, one primary color, universal button height, or mandatory image watermark. Those belong in the project profile when requested.

## 2. Inventory the complete workflow

Enumerate every in-scope page and section. Read all available chunks of the design tree. Include nested screens, overlays, hidden states, error/empty/loading/success states, component variants and responsive layouts that belong to the workflow.

Separate actual screen/state units from decorative layout frames. Record each included unit by stable node ID and meaningful name. Record exclusions with a reason agreed in the scope. Do not silently skip locked, hidden or inaccessible nodes. Inaccessible source material means inventory coverage is incomplete.

Capture before-change screenshots and structural observations. Inventory:

- Flow starting points and interaction source nodes, including nested buttons.
- Navigation destinations, overlays, back/close actions, external links and scrolling behavior.
- Conditional actions, variables and interactive component transitions where present.
- Dependencies on shared components, styles, variable collections and remote libraries.
- Brand references in visible text, hidden layers, component properties, images, names and URLs.

Use `references/coverage-manifest.md` to track the screen and internal navigation mapping. The checker is a bookkeeping aid. It cannot discover omitted Figma nodes or inspect visual quality.

## 3. Isolate the target without changing the source

Use the approved destination. If no destination was authorized, request that choice before creating or modifying a Figma file.

Record source-to-target IDs as units are copied. Preserve editability. Inspect component and variable dependencies before replacing anything: duplicated screens may still share source components and styles.

Use target-local overrides, isolated brand collections or approved target component copies as appropriate. Do not change shared definitions that alter the source or other brands. Do not detach every instance or flatten whole screens to simplify replacement. If safe isolation is unavailable, stop the affected write and explain the dependency.

Keep project profiles, original exports and private customer assets outside a generic skill package. Creating a generic skill does not authorize making the original repository public, copying its Git history, or publishing its contents.

## 4. Map the brand by meaning

Define an explicit mapping from source roles to target roles. Include primary/secondary actions, surfaces, text, borders, focus, interaction states and relevant charts. Preserve success, warning and error meaning and any intentional data-series distinctions.

Use approved assets at their correct proportions and clear space. Preserve third-party marks unless their replacement is specifically authorized. Inspect image fills and vector logos as well as text layers. Search by context and role, not a global color hue or ambiguous layer name.

Maintain a small scenario sheet so names, amounts, dates, products and confirmation details agree across a journey. Recompute totals when sample values change. Localize terminology, text expansion and reading direction when requested. Do not mirror logos, numerals or every icon indiscriminately for RTL.

Retain the original hierarchy, spacing, animation and interaction details unless a requested brand requirement needs adaptation. Use the target project's actual tokens and accessibility requirements. Flag substantive redesign choices for confirmation.

## 5. Run a representative pilot, then batches

Read `references/figma-operations.md` before Figma writes. Choose representative units that exercise the real difficulties, such as a dense screen, overlay, reusable component and alternate state or locale. Apply the mapping and inspect fresh renders and property readbacks.

Resolve clipping, font substitution, variable binding and component propagation issues before expanding to the rest. If the profile is clear and the pilot fits it, continue without asking approval for every frame. Ask when the pilot reveals a new design tradeoff or scope change.

Process bounded batches. Record completed node IDs after each batch so an interrupted run can resume without duplicating targets. Coordinate a single writer for overlapping Figma nodes. Before retrying a failed write, read the actual destination state.

### Completion and resource use

Complete the agreed screens, states and links within the user's explicit scope and budget. If no budget was specified, do not invent a token or tool-call ceiling, reduce the task to a sample, or skip required review merely to conserve resources. A pilot is an intermediate step unless the user requested a pilot-only delivery.

Reduce repeated work: retain the inspected inventory and brand mapping, request only the needed node data, batch related operations within the tool's actual capabilities, and reuse checks only while their inputs remain unchanged. Recheck affected units after edits. Give compact progress updates rather than repeating full inventories. Continue with the next batch when scope, authorization and dependencies remain valid.

Distinguish model context/token limits from connector quotas and rate limits. Describe an observed error or host-reported limit instead of guessing a remaining allowance. At an actual limit, or before a known context boundary, save task-local progress: source/destination references, completed and remaining node IDs, check status, unresolved writes and the next operation. Resume by reading that record and checking destination changes before writing. Do not retry indefinitely or switch accounts/services to bypass limits. Report partial work as partial. User stop requests, explicit budgets and existing permission or dependency blockers still take precedence.

## 6. Preserve and test the workflow

Rewire copied interactions using the full source-to-target mapping, including nested interaction nodes and overlays. Confirm destinations remain within the intended target variant or an explicitly approved external destination. A target-brand button must not accidentally return to an old-brand screen.

Compare triggers, actions, transitions, overlay settings, scroll/fixed behavior, variables and component state changes with the source. Retain intentional exceptions in the task notes. Do not infer working behavior from screenshots alone.

Walk the prototype's starting points and branches with the supported tools. If playback or a particular interaction cannot be tested, report it as pending. A coverage checker pass does not replace this walk-through.

## 7. Review all units and deliver

Review every target screen/state, not only the pilot or cover frame:

- **Visual:** brand assets, hierarchy, alignment, contrast, clipping, overflow, modes, language fit and RTL details.
- **Content:** coherent scenario values, terminology, translated copy and approved third-party exceptions.
- **Structure:** expected units and variants exist, hidden residue is handled, editable dependencies are isolated, interactions point to the correct targets.

Search for old-brand residue using a task-specific list. Review matches in context before changing them. Separate clear defects from optional stylistic refinements.

If using the manifest, run:

```sh
node <skill-directory>/scripts/check-coverage.mjs <task-manifest.json>
```

Only export when requested. Export from the reviewed target nodes into a new task/version directory. Record node IDs, variants, dimensions, actual format/scale and file hashes. Inspect the exported images too. Do not substitute an upscaled screenshot for a higher-resolution native export or delete previous deliveries as cleanup.

Hand off the target Figma links, coverage counts and exclusions, changed brand roles, source-preservation status, completed checks, unresolved items and requested exports. State any untested behavior plainly. Do not label AI inspection as human acceptance.
