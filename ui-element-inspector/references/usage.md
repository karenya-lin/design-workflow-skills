# Using the UI element inspector / 使用 UI 元素指認

[圖解操作 / Visual walkthrough](../../docs/VISUAL-GUIDE.md)

## English

### Recommended: tools outside the preview

From the toolkit checkout, start the foreground helper on an explicitly chosen free
port (example 4321; it never kills an occupied port):

```sh
python ui-element-inspector/scripts/preview_server.py --port 4321
```

On Windows use `py -3`. Open `http://127.0.0.1:4321/rwd-preview.html`, then click
**UI Inspect**. The website is on the left; its DOM structure and
change form are in the right sidebar. Narrow screens place tools below the preview.
Hover a tree row to preview its cyan outline. Click its name to select; the separate arrow expands children. Selection preserves the panel position.
The tree excludes script/style/meta/link nodes, shows at most 100 children per level,
and is a DOM outline, not a React component hierarchy. Refresh it after page changes.

Choose matching component annotation/class/tag to highlight current-page instances.
The count includes hidden DOM matches; only visible boxes are drawn. Up/down controls
scroll to instances. Open **例外 / Exclude instances** and check items that must stay
unchanged (gray dashed outlines). At most 200 matches enter the batch; never assume a
truncated list includes all uses in the source project. An HTML tag match does not
prove common React identity. Type your change and **複製修改需求 / Copy change request**
to combine element context, included selectors, exclusions and the request. Inspect
the text for private identifiers before sharing. If clipboard permission is denied,
a separate selected text box allows manual copying without overwriting your draft.

For RWD, choose a model-inspired CSS preset, enter custom dimensions, or rotate.
See [preset sources and limitations](rwd-presets.md). Cross-origin previews, including
different ports, cannot expose DOM to this sidebar. They require separately approved
project integration; do not proxy around restrictions or weaken CSP.

### Optional Windows Snipping Tool button

```sh
py -3 ui-element-inspector/scripts/preview_server.py --port 4321 --enable-snipping
```

This opt-in permits **準備截圖 → 開啟 Windows 剪取工具** to launch the installed
Snipping Tool via a validated loopback request. In the native app choose New, capture,
annotate, and paste to AI yourself. Launch does not prove a screenshot was captured.
The helper never reads images/clipboard, uploads, runs arbitrary commands, registers
protocols or installs a background service. It remains in your terminal; Ctrl+C
stops it. Without the flag/helper or supported installed app, use Win+Shift+S.
No native launch is performed by the automated Python tests.

Invoke the skill naturally:

> Use ui-element-inspector on my existing local preview. I don't know what this
> container/button is named. First inspect the project and propose a temporary
> development-only activation. Don't edit the design or deploy anything.

For a standalone demo, open `assets/demo.html` from this skill folder in Chrome/Edge
and click **開啟元素指認**. Keep `inspector.js` next to it. No server, account or port
is needed for this file-based demo. Do not paste unknown scripts into DevTools;
review this bundle and let the agent explain the exact activation in your own app.

### Controls

| Control | Result |
|---|---|
| Hover | Cyan outline and name; a held selection stays unchanged |
| Click | Hold selection, highlight matching instances and open details |
| 詳情 / Details | Open the panel from the small dock |
| 收合面板 | Hide details while preserving the selected outlines |
| Parent breadcrumb | Select an ancestor and see its layout/dimensions |
| 面板換邊 | Move panel to the opposite side if it covers the target |
| 複製元素位置 | Copy a current DOM selector |
| 複製修改需求 | Copy the report after editing/redacting it in the text field |
| 準備截圖 | Show shortcut instructions, then hide panel and keep outlines |
| Escape | Restore screenshot panel, or close the tool if panel is already visible |

The displayed selector is unique for the selected DOM snapshot (unique id/test ID,
otherwise a structural path). It can become stale after routing/reordering.
CSS-module classes are actual CSS class names, not necessarily meaningful component
names. `data-ui-name`/`data-component` annotations are provided labels, not proof of
source ownership. Canvas content, iframe internals, pseudo-elements and shadow-root
internals are not inspected. Only the host/canvas/frame element may be identified.
Computed layout is not a diagram of all CSS constraints or a React component tree.
Fullscreen/native top-layer dialogs may cover the overlay; exit that mode and use
an ordinary preview state. The tool does not bypass browser-owned UI boundaries.

### Clipboard and screenshots

Copy uses `navigator.clipboard.writeText` on a user click. Permissions or browser
security may block it; the report is then selected for manual Ctrl+C/Cmd+C.
It never reads the clipboard. See [MDN's clipboard requirements](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText).

Screenshot mode does not capture anything itself. Press **Win+Shift+S**, select the
area, open the capture in your system screenshot editor to draw/add text, and paste
the annotated image into the AI conversation. Keep unrelated windows and private
values out of the capture. The website cannot confirm whether you captured or sent it.
Native Windows integration requires additional app/protocol support; do not register
a custom protocol or install a background service merely to enable this skill.
See [Microsoft's Snipping Tool protocol](https://learn.microsoft.com/en-us/windows/apps/develop/launch/launch-snipping-tool).

### Safety and cleanup

Inspection has no network calls, persistence, analytics or AI-service connection. The optional native-launch button makes explicit same-origin requests to the local helper only.
It does not read field values, cookies, page URLs, full text or React private state.
Identifiers and annotations can still contain private information: review before copy.
Shadow DOM separates tool styles; it is not a security sandbox against the inspected
page. Existing page scripts may observe events or DOM changes. Use only approved
local data, satisfy analytics gates first, and don't test production transactions.

An agent can use the same audited file with an authorized injection tool or the
project's development-only entrypoint. No universal framework integration is bundled.
For production the artifact must be absent, not merely visually hidden. Closing
removes its DOM, event listeners, observer and pending animation frame. Reloading
also removes a tool-only injection. Temporary app source changes need explicit cleanup.

## 繁體中文

### 推薦：左邊預覽，右邊工作面板

在工具包資料夾執行上方指令，指定自己同意且未占用的 port。Windows 用 `py -3`。
打開本機 `/rwd-preview.html`，按「開啟 DOM 樹與指認」。工具不蓋住預覽；手機寬度時
移到下方。可點 DOM 樹名稱或畫面元素，展開容器看子層。這是實際 DOM，不是 React 元件樹。
每層最多 100 個子項，結構改變後可按「更新 DOM 樹」。

點父層或選「同 class／同元件標記／同標籤」後，紫框標示目前頁面的匹配，並顯示總數。
用「↑ 上一個／↓ 下一個」移到個別位置。展開「例外」勾選不要修改的項目，會改成灰色虛線。
隱藏元素仍算 DOM 匹配，但不畫框；清單上限 200 個，不可當成全專案所有使用位置。
輸入「你想怎麼改？」再按「複製修改需求」，元素資訊、要改的清單、例外及需求會一起複製。
權限拒絕時會出現獨立的手動複製欄，不覆蓋你原本的需求稿。

「元素位置」就是網頁裡的定位地址，技術名稱 CSS selector，不是元件名或檔名。
「準備截圖」本身不截圖、不上傳；若以上方 `--enable-snipping` 選擇啟用本機支援，
可再按「開啟 Windows 剪取工具」，在原生程式按「新增」剪取及畫記。未啟用則用 Win+Shift+S。
不安裝常駐服務、不讀你的截圖或剪貼簿；終端機按 Ctrl+C 即停止本機支援。

RWD 設定在右側面板最上方，可收合為摘要；可選三品牌各八款機型、自訂寬高與橫直切換。它只改 CSS 排版視窗，不是真機 Safari／Android；
詳見上方尺寸說明。不同 port 的網站只能預覽，不能由右側直接讀 DOM，不繞過瀏覽器限制。

可以直接對 AI 說：

> 使用 ui-element-inspector。我不知道這個容器／按鈕叫什麼，請在已有的本機預覽
> 開啟指認工具。先讀專案，列出暫時開發模式的啟用方式，不改設計、不部署。

先體驗：以 Chrome／Edge 開本 skill 的 `assets/demo.html`，按「開啟元素指認」。
`inspector.js` 要保持在同一資料夾。示範頁不用帳號、不用啟動 server。

Hover 顯示青色框與名稱；點選後的黃框和需求保持不變，仍能 Hover 別處。
點選自動標亮同類；不用切換選取模式。可收合面板保留選取；獨立浮動模式另可面板換邊。
「複製元素位置」給精確定位；「複製修改需求」附容器、尺寸、間距與需求欄，可先刪掉私密資訊。
選單沒有自動修改網頁功能，複製之後由你告訴 AI 想改什麼。

元素名稱包含實際 tag、id、class。React 元件名只在明確提供 `data-ui-name` 或
`data-component` 時顯示為標記，否則是未知；仍需回 source 找檔案。
Canvas、iframe、shadow root 內部與 CSS 偽元素不能靠此工具指認。
頁面換路由、排序或重建後，請重新選取，不沿用可能過時的 selector。

「準備截圖」先顯示說明，再隱藏面板、保留框線。按 **Win+Shift+S** 剪取，
在系統工具畫記／加文字後自行貼給 AI。Mac 用 Shift+Cmd+4。
Esc 回面板，再 Esc 關閉。未開啟本機支援時，網頁按鈕不能直接叫起 Windows 原生剪取程式，也不會
讀取截圖或確認傳送。若剪貼簿權限不允許，改 Ctrl+C／Cmd+C 複製已選取的文字。

只在已授權的本機預覽開啟；不讀欄位 value、Cookie、URL、整頁內容或 React 內部狀態，
不保存或上傳。但 class／id 本身也可能私密，分享前仍要核對。
選取遮罩不能阻止原網站所有 global listeners、計時器或分析，不是隔離環境。
關閉後移除 overlay 與監聽；若 AI 曾加暫時 source 接線，也要清掉，不能進正式發布。


分類列 / Categories: ① 選元素 → ② 確認範圍 → ③ 寫需求（截圖為選用）。單列左右滑動，一次顯示一組功能；左右方向鍵切換分類，Home/End 到首尾。圖層箭頭只展開，名稱才選取。

The single-row category strip scrolls horizontally and displays one functional group at a time. Left/Right switches categories; Home/End goes to first/last. Layer arrows expand; names select. The workspace fills the viewport without a fixed height cap. The DOM tree and step content scroll separately; step navigation and primary actions stay visible. Fit changes display scale only, not CSS viewport dimensions.

## Three visible steps / 三步操作

1. Click a page element or layer name, then Next: confirm scope. Hover only previews. / 點元素或圖層名稱，再按下一步確認範圍。
2. Review purple matches, navigate and exclude exceptions, then Next: write request. / 確認紫框與例外，再按下一步寫需求。
3. Type the change, review context, copy, and paste into AI yourself. / 填需求、檢查資料、複製並自行貼給 AI。

Back keeps request and exception state. Step tabs remain available while scrolling. Empty selection disables Next with a visible explanation. / 返回不清空需求與例外；捲動時仍可找到步驟列。未選元素時會說明為何不能下一步。
