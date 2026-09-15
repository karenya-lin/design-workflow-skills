# Coverage manifest

Keep this task-local JSON beside the working notes, outside the reusable skill. It may contain private node IDs. Populate the source inventory from the actual design before editing. Never generate the expected inventory solely from the finished output.

The read-only checker validates declared screen/state coverage and internal navigation mapping. It does not access Figma, discover nodes, inspect screenshots, verify review claims, or audit all prototype action types.

## Schema

- `version`: `1`.
- `variants`: nonempty unique strings for each requested target combination, such as `brand-b/en/light`.
- `sourceFrames`: nonempty unique source screen/state IDs. Names and other metadata may live in separate task notes.
- `sourceEdges`: objects with unique `id`, `from` and `to` source frame IDs. Record each internal navigation branch separately, even when endpoints repeat.
- `excludedFrames`, `excludedEdges`: arrays of `{id, reason}`. Use only scope-approved exclusions. Excluded frames cannot have retained incident edges.
- `frames`: one `{source, variant, target, checks}` for every included source frame and variant. Destination IDs must be unique and separate from all original frame IDs. `checks` contains `visual`, `content`, `structure`, each set to `passed`, `pending` or `failed` after actual inspection.
- `edges`: one `{source, variant, from, to, status}` for every included source edge and variant. `from` and `to` are mapped destination frame IDs. `status` is `passed`, `pending` or `failed`, reflecting actual interaction review.

If a variant intentionally needs different units, split it into a separate manifest with its own approved inventory. Do not silently waive coverage. Track nested interaction IDs, external URLs, conditions, overlay settings, back/close actions and other non-navigation behavior separately in the task notes.

Minimal fictional example, deliberately pending until reviewed:

```json
{
  "version": 1,
  "variants": ["brand-b/en"],
  "sourceFrames": ["source-list", "source-detail"],
  "sourceEdges": [{"id": "open-detail", "from": "source-list", "to": "source-detail"}],
  "excludedFrames": [],
  "excludedEdges": [],
  "frames": [
    {"source": "source-list", "variant": "brand-b/en", "target": "target-list", "checks": {"visual": "pending", "content": "pending", "structure": "pending"}},
    {"source": "source-detail", "variant": "brand-b/en", "target": "target-detail", "checks": {"visual": "pending", "content": "pending", "structure": "pending"}}
  ],
  "edges": [{"source": "open-detail", "variant": "brand-b/en", "from": "target-list", "to": "target-detail", "status": "pending"}]
}
```

Run `node <skill-directory>/scripts/check-coverage.mjs <manifest.json>`.
Exit `0` means the declared coverage and recorded checks pass. Exit `1` means incomplete or inconsistent data, including pending checks. Exit `2` means an unreadable file or invalid JSON. The command performs no writes or network requests.

Before saying the rebrand is complete, also review inventory completeness, shared dependency isolation, live prototype behavior and the requested exports. Passing this checker alone is insufficient.
