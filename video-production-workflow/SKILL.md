---
name: video-production-workflow
description: Produce or resume films and narrative videos through canonical source prose, a shooting script, shot breakdowns, character and location references, continuous four-panel storyboards, independent frames, audio, motion pilots, and final audiovisual review. Use across filming, animation, illustration, or mixed-media projects for end-to-end preparation, material readiness, production recovery, and handoff. Permissions, tools, budgets, and review decisions remain project-specific.
---

# Video Production Workflow

Turn a story into a reviewable film by maintaining explicit relationships between source passages, characters, locations, actions, sound, and actual generated outputs. Favor the smallest complete motion pilot that can resolve a production question, then expand using what the pilot demonstrates.

Apply the method to filmed, animated, illustrated, or mixed-media work. Use the project's selected acquisition route: shooting, licensed footage, existing assets, or authorized generation. A new generation workflow is not required merely because the skill describes generated-frame records; bind actual footage, takes, and original-frame evidence where those serve the project instead.

For a short bilingual entry point, read [references/quickstart.md](references/quickstart.md). For record fields, shot requirements, source credits, and durable handoffs, read [references/production-records.md](references/production-records.md) when preparing or updating those records.

## Establish the project contract

Read the latest human instructions, repository instructions, `PLAN.md`, `HANDOFF.md`, the accepted-asset index, and the execution state before acting. Resolve the current owner, authoritative source revision, active outputs, and concrete next action. Fetch and inspect remote changes when the project uses Git; preserve other writers' work and follow the project's commit and publication permissions.

If these records are missing, recover from existing receipts and source files and create a minimal entry point. Do not recreate a complete planning system before doing useful work. A receipt, queued job, running process, checked candidate, human approval, training selection, and accepted film are different states.

Record the current project rules rather than importing rules from another film:

- Required creative direction, approved designs, review stages, and delivery formats.
- Tool and runtime choices, media rights, model licenses, allowed execution locations, and costs.
- Attempt limits, repair policy, call spacing, resource thresholds, and shared-resource ownership.
- Any active schedule's identifier, cadence, destination, and notification policy.

This skill does not grant external messaging, paid work, installation, model downloads, training, publication, or schedule creation. Use permissions already given for the task. Do not add confirmation requests or global gates beyond the human's actual requirements.

## Keep three connected texts

Maintain separate artifacts with passage and revision links:

1. **Canonical prose:** the authoritative events, identities, chronology, rules, dialogue, and consequences. It can be a novel, a short story, or another agreed narrative source.
2. **Shooting script:** scenes and true sublocations, atmosphere, action, expressions, dialogue, narration, character states, and camera proposals. Preserve the causal chain and the source's actual scope.
3. **Shot breakdown:** executable shots, entrances and exits, start and end states, framing, movement, sound events, duration evidence, asset bindings, and unresolved dependencies.

Write the shooting script in the requested language with varied rhythms, concrete sensory details, and occasional rhetorical structure or imagery. Keep it understandable aloud and practical to stage. Rich language must not introduce new events, powers, injuries, relationships, or exact ages. Label added performance and camera choices as production proposals. Keep direct quotations verbatim unless adaptation has been authorized, and distinguish adapted dialogue from source dialogue and narration.

Check passage coverage and transitions. Chapter counts, scene counts, and shot counts establish structure; they do not demonstrate that every required passage, argument, emotional turn, or consequence has been adapted. Reuse existing coverage supplements and close their real gaps rather than making overlapping inventories.

### When using a real story

Maintain a source register containing its formal title, author or attribution, specific version or translation, a concise synopsis, the passage used, its original wording, and a primary-source citation. Record rights and attribution requirements for that version. A traditional story may have a recent translation or illustration with separate rights.

Explain how the selected passage affects the film's causal logic. Adapting a real story requires its events or rules to fit the screenplay; changing only a fabricated title to a real title does not establish that fit. Clearly identify invented stories as fictional. Never fabricate an author, source quotation, publication history, or citation to legitimize an invented title.

Prepare accurate source credits for the film's introduction, description, or credits as requested by the project. Verify primary sources and actual rights before using their text or media; search results and unattributed summaries are leads, not provenance.

## Separate people, scale, states, and places

Use one stable character ID across periods of the same person. Maintain three distinct tables:

- **Character identity and appearance:** face, hair, eyes, identifying details, and the exact approved reference version.
- **Height and scale:** sourced measurements or explicitly labeled production proposals, with shared scene objects used for scale. Leave unknown measurements unknown.
- **Story states:** age or life period, clothing, rank or role, injuries, prop possession, emotional context, and the transitions that create or end those states.

A clothing variant is not automatically a story period. An approved face is not automatically an approved costume, injury state, turnaround, training set, or film shot. A candidate for one age cannot silently stand in for another. Reuse materials within their approved scope; do not require a separate full character library for every expression or anonymous background person.

At scene and storyboard-panel level, bind the character ID and relevant state to the exact reference path or URI, version, SHA-256, and approval scope. Where no suitable approved reference exists, record `null` and the affected dependency. Do not invent a measurement or approval to fill a table. Keep offscreen, remembered, mentioned, documentary, and physically present people distinct.

For every required view, keep its own original file and receipt. Record the requested dimensions, actual decoded dimensions, whether the result is native or upscaled, and the face or body region's effective pixel dimensions and share of the image. A large canvas with a small face may still lack usable facial detail. A whole character board does not replace the required single-view originals. Use the project's targets; do not invent universal resolution or occupancy thresholds.

If the selected generator cannot guarantee the requested native size, state that limitation and mark an under-target result honestly. Never label an upscale as a native original or claim the requested size from the prompt alone. When dimensions or effective detail miss the target, rerender only within current project authorization and attempt accounting. After two unsuccessful attempts using the same method, diagnose and change the strategy before any further permitted attempt; do not loop blindly or assume the skill grants another call.

Inventory locations by reusable space and true sublocation, not only screenplay scene numbers. Separate architecture, entrances, exits, furniture, routes, and fixed props from shot-specific weather, lighting, color, and effects. A location design can support several scenes while each scene retains its own continuity state.

Track props before, during, and after an action only where the story requires those states. Check shared scale and contact: grasp, weight support, clearance, release, and placement. Do not generate unused variations to make an inventory look complete.

## Establish space before cutting closer

At every new scene and every true new sublocation, first plan a distinct wide establishing shot, independently before the four-panel sequence. Do not assume panel A automatically serves as that establishment. Show all people physically present at that moment and make entrances, exits, fixed reference objects, body directions, gaze, adjacent people, and invariant spatial relationships readable. Mentioned or remembered people do not join the wide shot unless the narrative actually puts them there.

Use the established layout to define the action axis and later camera positions. Distinguish world directions and fixed regions from camera-relative screen left and right. A reverse angle changes projection; it does not move actors to new places or mirror their handedness. If an axis change is needed, motivate it through an observable camera or character move or a new establishing view.

For every move, preserve the start position, route, end position, body facing, gaze target, and contact state. The next shot starts from that resulting state. Do not reset positions at each cut. Unknown dimensions or coordinates remain proposals until a usable layout or shared-scale image verifies them.

## Build temporal four-panel boards and native frames

Plan four-panel groups as consecutive character beats, with a clear start, change, and consequence. Use multiple groups for a long scene when needed. Do not squeeze several incompatible contact actions into a single supposed starting pose, or invent extra events solely to fill four slots.

For each panel, describe:

- The canonical passage and official scene, beat, or shot that it serves.
- Characters, period, clothes, injury and emotion state, exact reference bindings, and props.
- Scene geometry, placement, start and end states, action, expressions, and gaze.
- Framing, camera angle and height, fixed or moving camera, focus target or change, spatial axis, and editorial purpose. Do not invent lens millimeters where none have been chosen.
- Dialogue or narration, sound sources, and timing evidence or an explicit pending value.

A four-camera empty-location comparison is spatial evidence, not a temporal character storyboard. Four seeds are not four consecutive beats. Cropping or enlarging a collage panel does not produce an independent native frame. Generate the required independent original frames with their own real receipts, then verify identity, state, space, and action continuity against the board.

Index gaps carefully: an unbound panel does not prove there is no image. Search the existing manifest, execution receipt, and original output before declaring a material missing. Retain old outputs and failed attempts. Use the project's original-purpose accounting; boards, frames, repairs, and retries must not acquire new quotas by changing identifiers.

## Move from readiness to actual production

Use a material-readiness table with source, required purpose, existing output, SHA, visual or listening evidence, approval scope, actual gap, and next owner. Distinguish body, scene, prop, shot effect, audio, and model requirements. Review the relevant pixels, not only filenames or output counts.

For repeated file checks, use [scripts/inspect_assets.py](scripts/inspect_assets.py) with an external manifest instead of repeatedly loading a large ledger into context. The standard-library script summarizes local file existence, SHA-256, and actual PNG IHDR dimensions. Relative asset paths resolve from the manifest's directory. It refuses environment files and remote paths, prints no asset contents, and never modifies source files. Output defaults to compact JSON on stdout; `--output` creates a new report exclusively. Keep private manifests and reports outside the public skill bundle.

Run `python scripts/inspect_assets.py --help` for usage. Exit `0` means only the basic requested file checks were met, `1` means asset findings or unverified formats, and `2` means an input/report error. Unknown formats are not passes. Native/upscaled provenance requires its receipt; image dimensions cannot prove it. Effective face/body coverage, visual quality, source adoption, and human approval still require their own evidence.

Pick one or two shots that can become a meaningful limited motion pilot. Complete their necessary characters, locations, states, native frames, dialogue, sound, and tool checks, then execute. A missing character for another scene, a full-film matrix, all turnarounds, or optional model retraining must not become a global starting gate. Preserve any genuinely required adapter or workflow dependency based on evidence.

Use the shot's seventeen requirements in the records reference to map requested behavior to actual tool support. Classify each applicable requirement as demonstrated, configured but untested, post-production, unsupported, or pending. Mark genuinely unnecessary items `NOT_REQUIRED` or `NOT_APPLICABLE` with the source-based reason, such as no dialogue or no effects; do not invent missing assets for them. These fields describe the shot's actual needs, not seventeen new global starting gates. A saved workflow or node list does not demonstrate motion, lip synchronization, contact, focus control, or character continuity.

Measure duration from real speech and performance. Animate the required character actions; do not meet character screen-time requirements by holding or moving a still image. Use still-image camera moves only for shots where that treatment is actually appropriate and authorized.

## Use tools and resources deliberately

Prefer the project's existing programs, models, and runtime when they can do the job. Confirm code, weights, reference-media, and necessary runtime rights at the level relevant to the intended use. Installation or a directory's existence is not proof of a working engine, compatible license, or successful output. Do not blindly install a wrapper or download models. Do not read `.env` or credential files or pass private assets to a service without the relevant permission.

Inspect the real prompt and workflow before submission. Reused templates may inject a conflicting visual style, load unrelated configuration or secret files, apply an incompatible adapter, create a second retry, or overwrite an output. Use a scoped copy and the project's safe execution entry point. Preserve originals and make each output traceable to its actual job and purpose.

After a reboot, inspect the existing executor, service state, last start or stop request, queued work, logs, and receipts. An unavailable service may simply have been stopped normally. Diagnose the actual state before restarting anything, and never revive a job whose result already exists.

For shared compute, follow the existing lock or lease protocol, current handoff, resource checks, and queue state. One coordinator owns the lease and submissions; release after the bounded batch and respect waiting owners. Queued, acquired, service started, inference started, and output completed need separate evidence. On the first encounter with another owner's active lease, preserve your request and receipts and immediately choose independent authorized work that produces a real missing asset or closes a substantive gap. Do not wait for a second unchanged check to do useful work. Do not overwrite active leases, create a competing scheduler, or restart another owner's executor.

Parallel agents may work only with user or applicable project authorization. Assign disjoint file scopes and concrete outputs. Keep shared ledgers, compute control, and submissions under one current writer. Delegate research, inventory, script ranges, reference review, and sound sourcing where independent; do not let agents duplicate generation.

For authorized collaboration across separate sessions, agree on a regular communication interval and an urgent-contact exception. Persist session identities, exclusive paths, priorities, last exchange, and acknowledgement separately from mere message delivery. Consolidate substantive outputs and blockers at the agreed interval; contact sooner for resource conflicts, overwrite risk, tool failures, or dependencies that would interrupt active production. Continue independent work while awaiting a reply, and use the existing coordinator rather than creating another scheduler.

## Sound, subtitles, and human review

Use licensed sound libraries or authorized synthesis. Verify the specific sound file and its license, attribution, and redistribution limits. A library's general label does not establish the rights of every upload. Voice references require the necessary rights; using the same voice means preserving its actual reference and engine settings rather than designing a new voice for each sentence.

Record exact dialogue, pronunciation guidance where needed, selected voice, output duration, and actual listening feedback. Audio metrics do not count as a listening pass. Keep dialogue, effects, music, and subtitles on a shared timebase with separate tracks. For effects, record source object, action strength, distance, screen direction, start, peak, and end; align them to the real video.

Review each limited pilot for recognizable people, correct period and state, body and prop scale, space and axis, action and contact, motion quality, supported camera behavior, dialogue and lip timing, intelligible mix, effect alignment, subtitles, and narrative intent. Human review occurs at the project's agreed stages. A human approval applies to the shown version and scope, not every later derivative.

Expand after the pilot resolves its intended questions. Final acceptance covers the complete chosen narrative, all actual video and audio, subtitles, credits, continuity, export integrity, and the human's requested audiovisual review. Do not label the film complete because an inventory or generation queue is complete.

## Resume reliably and avoid stalled loops

After each meaningful unit and each scheduled check, update the execution state, accepted index where warranted, and the next action in the project's durable records. Record receipts before considering a retry. Preserve history rather than replacing failures with a new ID.

Even a quiet scheduled run must persist its checked time, actual state, evidence, blocker if any, next action, and owner. Repeated unchanged checks are not production progress. If the same result or blocker occurs twice without improvement, investigate its cause, change strategy or choose an independent authorized task, and update the active schedule's task instructions when a schedule actually exists. Keep its current identifier, cadence, destination, and ownership unless the human changes them. Never create a schedule just because this skill was loaded.

Notify for a reviewable result, substantive failure, material change, or a human decision the evidence genuinely requires. Use the host's quiet-run format, such as `DONT_NOTIFY`, when nothing actionable changed. Quiet output does not excuse skipping durable state or an available productive action.

Handoff with the authoritative revision, actual output locations and hashes, viewing or listening results, accepted scopes, unresolved dependencies, active jobs and ownership, and one concrete next action. Report images, audio, motion clips, and training results separately. Keep planning and documentation counts out of film-completion claims.
