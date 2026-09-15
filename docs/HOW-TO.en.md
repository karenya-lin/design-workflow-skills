# How to use · shortcuts

Selecting an element on the page or in the DOM tree automatically collapses RWD settings. Hovering does not. Reopen the RWD row whenever you need to change dimensions; selection and your request stay intact.

**Icon controls:** ↻ refreshes the layer tree (not the page), − collapses the panel, × closes it, and ⇄ swaps width and height. Click the right chevron on the RWD row to expand/collapse settings. Hover an icon for its name, or reach it with Tab and activate with Enter/Space. Toolbar buttons have 44px targets and 22px icons. Steps, language, exclusions and Copy request keep their text. [Updated pictures](VISUAL-GUIDE.md#larger-icon-controls).

**Current controls:** the default language option reads **Language** (automatic detection). The standalone demo button opens the external-panel workspace. In Scope, use numbered ticks to visit matches, choose **To copy** to see included items, and open the amber **Exclude instances** control to keep exceptions unchanged. [Verification status](RELEASE-STATUS.md).

[English](HOW-TO.en.md) · [繁體中文](HOW-TO.zh-TW.md) · [Français](HOW-TO.fr.md) · [日本語](HOW-TO.ja.md)

## Start / configure / finish

| I want to… | Shortcut |
|---|---|
| Install and try my first skill | [Beginner setup](BEGINNER.en.md) |
| Choose a skill or combine several | [All skill guides](SKILL-MAP.md) |
| See every step | [README screenshot index](../README.md#step-by-step-pictures) |
| Watch UI Inspect | [English video](videos/inspector-en.webm) · [Transcript](videos/README.md) |
| Review connections and permissions | [Plain-language security](../SECURITY.md) |
| Verify in my own host | [Tests and manual acceptance](TESTING.md) |
| Configure a custom review script | [Runner and composition](USAGE.en.md) |

From the downloaded repository:

```sh
python scripts/settings.py --workspace "YOUR_PROJECT_FULL_PATH" --language en
python ui-element-inspector/scripts/preview_server.py --port YOUR_CHOSEN_FREE_PORT
```

Windows: replace `python` with `py -3`; replace the uppercase placeholders with your own values. Open the loopback URL printed by the preview server. Do not stop somebody else's process to free a port.

## Language

UI Inspect and RWD controls offer **Auto, English, Traditional Chinese, French and Japanese**. On first activation the language selector and numbered steps briefly glow; dismiss the hint or choose a language. Reduced-motion users get a static highlight. Reopening in the same page session does not repeat onboarding; reloading starts a fresh session. No preference is silently persisted.

An explicit selection wins. Auto uses a language explicitly passed by the AI, otherwise the page language, then the browser language; an unsupported or absent preference falls back to English. In the included workspace the frame follows the outer tool's language. It does not translate your real website.

For a local workspace URL append `?lang=en`, `?lang=zh-TW`, `?lang=fr` or `?lang=ja`. An AI launcher can instead pass `?aiLang=fr` with Auto selected. For a separately approved script injection, set `window.DesignWorkflowInspectorOptions = {language: 'auto', aiLanguage: 'fr'}` **before** loading `inspector.js`. The tool cannot read another AI app's private settings.

The Python settings menu is English/Traditional Chinese; its **response language preference** also accepts `auto`, `fr` and `ja` for the agent. Full per-skill guides/screenshots/videos are English and Traditional Chinese. French/Japanese have localized inspector controls and this quick-start page, not translated full skill manuals. User text, source identifiers and existing editable reports are not rewritten when switching languages.

## Three steps

1. **Select:** open UI Inspect. Hover the page or DOM tree to preview; click to select. Arrows expand containers.
2. **Scope:** choose the same class, tag or explicit component annotation. Browse matches and mark exceptions. These are current-page DOM matches, not a project-wide code search.
3. **Request:** type the change, review context, then copy it into your AI conversation. Closing restores normal page interaction.

## Keyboard and screenshot shortcuts

| Shortcut / control | Action and limit |
|---|---|
| Tab / Shift+Tab | Move between controls; Enter/Space activates a focused control |
| ← / →, Home / End on step tabs | Change the active tool category |
| ↑ / ↓ on DOM rows | Move focus through visible layer names |
| → / ← on DOM rows | Expand/enter children or collapse/go to parent |
| Previous / Next buttons in Scope | Scroll to a matching page element |
| Escape | Leave screenshot mode; otherwise close the inspector. In RWD settings, close that popover |
| Copy change request | Copy locator, scope, exceptions and typed request; if denied, use selected text with Ctrl+C / Cmd+C |
| Screenshot → change brief opens directly | Show a readable change brief beside the outlined target. A request must be entered first |
| PrtSc / Print Screen | Windows behavior depends on your OS settings; prepare the brief **before** pressing the key |
| Win+Shift+S | Open Windows capture selection manually |
| Shift+Cmd+4 | macOS capture selection manually |

Optional Windows buttons require a separately enabled local helper:

```sh
py -3 ui-element-inspector/scripts/preview_server.py --port YOUR_CHOSEN_FREE_PORT --enable-snipping --enable-printscreen
```

Both native actions are **off by default** and require an explicit button click. Print Screen sends only that fixed key; it does not read the clipboard. A successful request is not proof of a saved screenshot or successful paste. Keep the selected outline, full request and exceptions readable. Capture multiple images or attach copied text for long content. Review private data before sharing. In a narrow window the tools stack below the preview; use a larger desktop window for a single readable capture.

Finish with Close/Escape. Stop only the preview server you started with Ctrl+C in its terminal. Connections, publishing, Git push and routines need their own scope; trial-run a routine and verify its first actual scheduled execution and delivery.

[Minimum install & optional companions / 最小安裝與選用搭配](../README.md#minimum-install-and-optional-companions) · [繁體中文](../README.zh-TW.md#最小安裝與建議搭配)

## Port

The port is not fixed: provide your own, or ask the AI to choose an available one and report the actual URL. `--port` must contain that explicit number. Reuse an existing approved preview; never kill someone else’s process to free a port.


In the approved same-origin workspace, hover the preview to open the inspector and DOM tree automatically. No Start/Resume click is needed. Hovering another element keeps your selection and request; click to change the selection. Narrow windows initially collapse RWD settings; expand the RWD summary when needed.
