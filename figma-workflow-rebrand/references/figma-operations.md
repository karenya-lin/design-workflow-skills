# Figma operation reference

Use this reference when performing the Figma edits. It describes conditional checks, not a requirement to use raw Plugin API calls. Read the installed connector's skill and documentation first. Read-only access supports inventory and planning only.

## Text and assets

Load the fonts needed for a text edit through the supported interface. Mixed-style text requires checking its font ranges. After changing text or fonts, inspect line breaks, clipping and auto-layout dimensions. Avoid compensating for unavailable fonts by silently choosing another family. See [Figma's text editing guidance](https://developers.figma.com/docs/plugins/working-with-text/).

Inspect the visible bounds of a logo inside its container as well as the container dimensions. Maintain its aspect ratio. Imported SVGs, flattened vectors and image fills can render differently, so compare the result. Flatten only a specific asset when justified and approved, with an editable source retained.

## Variables, styles and modes

Inspect bindings before changing paint values. A role can be controlled by a variable or style rather than a literal color. Choose a destination-owned binding and check the applicable modes. In the Plugin API, paint-variable binding uses helpers such as `setBoundVariableForPaint` and assignment of the resulting paint. Read the actual API contract before using it. See [Figma variables](https://developers.figma.com/docs/plugins/working-with-variables/).

Read back opacity, gradients and effects after assignment. Do not erase all fills or effects just to replace one brand color. Consider surrounding layers, masks and blend modes when diagnosing an unexpected background.

## Geometry and hierarchy

Inspect constraints and auto-layout before resizing. Container resizing and proportional rescaling serve different purposes. Choose the operation based on whether contents should reflow or scale. Neither is universally correct.

Read coordinates relative to the correct parent. Compare absolute bounds where available and render the full unit after hierarchy changes. Hidden or clipped nodes can have unavailable render bounds, which alone does not mean the node is missing. Confirm enumeration capabilities for hidden instance children before declaring an inventory complete.

## Prototype mapping

Store mappings for nested interaction nodes as well as screen units. Reactions include interaction triggers and their behavior. Where a Plugin API manifest uses dynamic-page access, the documented update method is `setReactionsAsync`. Follow the current connector's corresponding supported operation. See [Figma reactions](https://developers.figma.com/docs/plugins/api/properties/nodes-reactions/).

Do not remap only the first navigation destination. Check action lists, conditional branches, overlays, interactive components, flow starting points and external references. Preserve intentional non-navigation actions such as close and back. The bundled coverage checker covers declared internal screen edges only, so inspect these other behaviors separately.

## Readback, exports and recovery

After a write completes, read fresh properties and request a fresh render. If the output appears stale, inspect the live state before repeating writes. Keep batch boundaries and destination IDs for resumability.

Request an explicit export format and scale supported by the actual tool. Figma export settings distinguish image, SVG and PDF outputs and relevant sizing options. See [Figma ExportSettings](https://developers.figma.com/docs/plugins/api/ExportSettings/). Inspect output dimensions and appearance, and report unavailable export capabilities instead of simulating them.

Use the connector's supported asset transfer mechanism. Avoid putting large binary payloads into chat or uploading private assets to an unrelated service. Export delivery permissions are separate from design-edit permissions.
