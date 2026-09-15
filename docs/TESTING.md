# Testing / 測試方式

From the toolkit checkout, Python 3.11+ (standard library only):

```sh
python -m unittest discover -s tests -v
```

On Windows use `py -3` instead of `python`; on macOS/Linux use `python3` if needed.
Tests create temporary synthetic profiles/workspaces, never use your real accounts.

| Coverage | Automated evidence |
|---|---|
| Profile helper | Save/read/reset, workspace isolation, schema checks, locks and stale revisions |
| Runner | No-execution plans, exact config approval, sequential failure stopping, timeout and errors |
| Multi-skill selection | Ordered phases and deduplication, external declarations, unknown/colliding references |
| Settings menu | Cancel, edit/save/reopen, conflicting writes, source disconnect preferences, no command execution |
| End-to-end local flow | Scripted menu input → saved preferences/pipeline → reopen → runner skill plan |
| Bundle | Skill discovery headers, documentation links, installed skill relative references |

These tests do not call an AI service, install external skills, connect OAuth,
send email, start a website, stop a real process or push Git. A valid skill format
does not prove an agent follows every instruction in every host or model.

## Manual acceptance for your environment

1. In an isolated project, confirm your agent can find the installed skills and
   report their actual source paths. Avoid old versions with the same name.
2. Ask for `uiux-checks` plus `ui-design-review` and `a11y-review` on one synthetic
   component. Confirm one profile preflight and no overlapping edits.
3. Add a missing external skill. It should be reported unavailable, not installed
   silently and not reported PASS. Try conflicting scopes (read-only versus edits):
   the agent must preserve the read-only boundary until you explicitly change it.
4. With an approved local preview and privacy gates satisfied, verify actual states,
   keyboard/focus and screenshots. Source-only analysis must remain marked as such.
5. If connecting a source, verify the actual account and selected scope. Confirm
   Calendar does not imply Gmail and saved settings do not authorize writes.

Record agent/host version, skill source revision, scope, result and evidence. Do not
publish private profiles, account logs or production data. Repeat affected checks
after modifying instructions, helpers, integrations or the project baseline.

For `ui-element-inspector`, additionally use its synthetic demo in a permitted local
browser preview: hover and hold a card action, verify its action count stays zero,
copy a unique selector, select the parent grid, inspect the password fixture without
copying its value, enter/leave screenshot mode, scroll/resize, remove the selected
node, activate twice, then close and verify the original button works. Check both
clipboard success and permission-denied fallback. Record actual browser evidence;
the Python tests and JavaScript syntax checks alone do not prove these interactions.
Do not automatically read the user's system clipboard or launch OS screenshot tools
as part of an unattended regression test.

Accessibility and security results must be separate. This bundle does not validate
PCI DSS compliance; see [security scope](../SECURITY.md).

## Optional browser smoke check

With an explicitly approved free port 4321, start
`python ui-element-inspector/scripts/preview_server.py --port 4321` in one terminal.
With an already installed, approved Playwright CLI in another terminal, run:

```sh
playwright-cli -s=skills-smoke open http://127.0.0.1:4321/rwd-preview.html
playwright-cli -s=skills-smoke run-code --filename tests/browser/inspector-smoke.js
playwright-cli -s=skills-smoke close
```

Inspect the returned `failed` count; a CLI process exit code alone is not PASS.
This synthetic smoke script checks external-panel separation, DOM navigation,
matching, exception copying and cleanup. Clipboard writes are mocked; it never
reads the native clipboard or launches Snipping Tool. It doesn't install browser
dependencies. Stop the foreground server with Ctrl+C when finished.

Earlier 2026-09-15 snapshot (before categories/continuous hover/compact RWD): 43 Python tests passed; three browser scripts checked
15 base interactions, 29 RWD/group/privacy behaviors, and 13 external-panel/DOM/batch
behaviors (57 passed). Sampled keyboard selection, Escape, visible focus, accessible
control names and five opaque text color pairs were also checked. Minimum sampled
text contrast was 11.95:1. These are scoped checks, not full WCAG or PCI validation.
Native helper accepted one explicit Windows launch request (HTTP 200); screenshot
capture, annotation, actual paste and assistive-technology output remain unverified.

## 繁體中文

元素指認另驗 Hover、選取不觸發原按鈕、父容器、精簡工具列／收合、複製與拒絕時
的替代操作、鍵盤、手機重排、截圖模式、重複開啟與關閉後恢復。原生剪貼簿及系統
截圖若未實測須另列，不能拿 mock 通過代替。無障礙與資安結果分開，本包不提供 PCI DSS 合規驗證。

在工具包執行 `py -3 -m unittest discover -s tests -v`（Windows）。
測試使用暫存的假資料，涵蓋設定讀寫／重設、鎖與版本衝突、取消不寫入、
多階段去重、外部 skill 宣告，以及「選單輸入→儲存→重開→runner 計畫」整段操作。
另檢查 skill 結構、文件連結與複製安裝後的 skill 相對引用。

這些測試不登入帳號、不寄信、不啟動網站、不 kill、不 push；也不是完整 AI 行為認證。
使用者環境仍要人工驗證：實際找到的 skill 版本、共用一次設定確認、檔案 owner、
缺少外部 skill 時不自動安裝、規則衝突時不擴張權限。瀏覽器／OAuth 需要另行安全驗收。
測試紀錄請分清「已測」「來源推論」「未驗」，不要把私人紀錄放公開 GitHub。

## Earlier compact inspector snapshot (2026-09-15)

Current redesigned public browser smoke: 46 PASS, 0 FAIL. Includes numbered Step 1/2/3 navigation, selection prerequisites, preserved requests/exclusions on Back, one-row categories, full-viewport layout beyond 600px, fixed copy actions while context scrolls, visible unsafe-load feedback, explicit close controls in short windows, collapsible RWD controls, device presets, layer hover, stable selection, keyboard navigation, matching/exclusions/copy and cleanup.

A separate local flow check passed at 320×600, 390×844, 768×1024, 1280×900, 1920×1080 and 640×300. It checked document overflow, viewport-filling height, visible step navigation, reachable Copy and the settings URL field bounds. This does not mean all content is visible simultaneously at every size. See [the NN/g-based review and limitations](INSPECTOR-UX-REVIEW.md).

Current Python suite: 44 PASS, including a distribution check for all 13 portable bilingual lifecycle guides and SVG diagrams. All 13 diagrams were rendered and visually inspected; text bounds stayed inside their SVG canvases. The diagrams are instructional, not evidence of 13 AI workflows being executed. Account connections, OAuth, real deliveries and scheduled routine execution are not tested by these checks. Users must trial-run routines as described in [plain-language security](../SECURITY.md).

CSS samples are approximate, not real-device verification. Native clipboard is mocked and Snipping Tool is not launched. Earlier screenshot/contrast checks above are historical, not a full re-audit of this layout. These results do not certify NN/g, WCAG or PCI compliance.

## Four-language visual delivery (2026-09-15)

- Python suite: 47 PASS. Includes opt-in Print Screen request guards, 14 portable skill guides and 84 step images, local documentation links, and generated locale asset consistency.
- Public inspector smoke: 46 PASS. Locale/capture suite: 72 PASS, including four languages across six viewport sizes, first-use guidance, reduced motion, selection/request/exclusion preservation, readable capture brief, 100% preview and helper-unavailable fallback.
- Figma rebrand coverage checker: 12 Node tests PASS. This is manifest bookkeeping, not a Figma visual or prototype test.
- All 84 step images were visually reviewed: six actual synthetic inspector captures and 78 rendered instructional examples. Examples are not evidence that an AI ran the corresponding workflow or connected an account.
- Both published WebM videos played locally without media errors: English 23 seconds, Traditional Chinese 20.12 seconds, 1440×900. Start/middle/end frames were visually inspected. They are silent tutorials; clipboard success is mocked and native capture buttons are not invoked.

Run the extra synthetic browser suite against the same local asset server used above:

```sh
playwright-cli -s=skills-smoke run-code --filename tests/browser/locales-capture.js
node --test figma-workflow-rebrand/scripts/check-coverage.test.mjs
```

Native Print Screen capture/paste, assistive-technology output, real-device rendering, account/OAuth flows and all AI-host combinations remain unverified. French/Japanese cover the UI and quickstart indexes; full per-skill manuals, screenshots and videos are EN/ZH. These checks do not certify WCAG or PCI compliance.

繁中：本輪 47 個 Python、46 個基本瀏覽器、72 個語言／截圖、12 個 Node 測試通過。84 張圖與兩支影片已檢視；非 UI Inspect 圖為教學示範，不是各工作流程執行證據。原生截圖貼上、輔助科技與真機仍待使用者環境驗收。

## Clipboard owner-window fix (2026-09-15)

Reproduced with the actual Chromium Clipboard API and synthetic text: clicking the external panel called the iframe clipboard and rejected with `NotAllowedError: Document is not focused`. After switching to `panel.ownerDocument.defaultView.navigator.clipboard`, the same click invoked the outer document and its write promise resolved. No system clipboard contents were read; paste into an AI chat remains unverified.

Updated inspector smoke: 52 PASS, including owner-window routing, iframe denial, outer denial with complete manual selection, retained request/exclusions, unavailable API and retry recovery. The public smoke still mocks writes; it is distinct from the actual API experiment above. Python suite: 47 PASS. No permissions-policy changes, clipboard reads or native screenshot checks were made by this fix.

繁中：已用真實 Clipboard API 重現 iframe 未取得焦點的失敗，改用面板所屬視窗後寫入成功。未讀剪貼簿、未驗實際貼到 AI。52 個瀏覽器回歸與 47 個 Python 測試通過，拒絕時完整內容可手動複製。


## Automatic hover and simplified controls (2026-09-15)

66 inspector smoke checks and 101 locale/capture checks PASS. Includes hover activation without a launch click, delayed iframe load, one panel after loading, hover without replacing selection, reopen after close, initial narrow-window DOM space, brand/model filtering, immediate sizes, invalid size preservation and direct Screenshot entry. Four languages were checked at six viewport sizes. Python suite: 47 PASS. These are local synthetic browser and unit checks, not real-device, native screenshot/paste or accessibility certification. Earlier videos show the former RWD/Prepare controls; follow the current how-to pages and updated visual guide.
# Current scope and panel regression (2026-09-15)

80 inspector checks, 101 locale/capture checks and 47 Python tests PASS. New checks cover standalone demo navigation into the external workspace, visible Language label, prominent exclusions, CSS shorthand references, numbered selection, match/copy-only ticks, stable exclusion numbers, success-only copy notifications and empty-list cleanup. EN/ZH synthetic screenshots were inspected. These results supersede earlier counts below for the same suites.

Real Clipboard API write was also repeated in the visible local workspace and resolved, preserving the user's request and report. No clipboard read or AI paste was performed. Browser suite writes and OS capture launches are mocked. Chrome/Edge/Firefox DevTools extension work is excluded from this release. See [per-skill verification status](RELEASE-STATUS.md).

繁中：80 項指認、101 項語言／截圖、47 項 Python 通過。中英畫面已檢視。本機可見面板的真實剪貼簿寫入也成功，未讀剪貼簿、未驗貼給 AI。擴充套件未納入本次交付，其餘待驗項目逐 skill 列於狀態表。

## Larger icon controls (2026-09-15)

86 inspector checks, 125 locale/capture checks and 47 Python tests PASS. This supersedes the earlier 80/101 counts. Added DOM chevron survival after toggles, native RWD disclosure geometry, 44px rotate target, refresh/collapse/reopen behavior and labelled 44px header actions without overflow across four languages and six viewport sizes. Desktop EN/ZH and narrow EN screenshots were visually inspected. No dependencies added. Native capture, assistive technology, Firefox/Edge and real-device acceptance remain unverified.

繁中：86 項指認、125 項語言／截圖、47 項 Python 通過。新增圖示大小、展開／收合、更新圖層、四語言六尺寸標頭檢查，中英桌機及窄螢幕圖片已目視檢查；未新增依賴。原生截圖、輔助科技、Firefox／Edge 與真機仍待驗。
