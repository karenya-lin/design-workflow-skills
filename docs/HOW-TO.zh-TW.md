# 使用方式 · 快捷索引

[繁體中文](HOW-TO.zh-TW.md) · [English](HOW-TO.en.md) · [Français](HOW-TO.fr.md) · [日本語](HOW-TO.ja.md)

## 開始／設定／結束

| 我想做什麼 | 快捷入口 |
|---|---|
| 安裝並第一次使用 skill | [新手開始](BEGINNER.zh-TW.md) |
| 選 skill，或多個一起使用 | [所有 skill 圖解](SKILL-MAP.md) |
| 看每一步的圖 | [README 截圖索引](../README.zh-TW.md#step-by-step-pictures) |
| 看 UI Inspect 影片 | [繁中影片](videos/inspector-zh-TW.webm) · [文字版與限制](videos/README.md) |
| 理解帳號連接與授權 | [白話資安說明](../SECURITY.md) |
| 在自己的 AI 環境驗證 | [測試與人工驗收](TESTING.md) |
| 設定自訂檢查 script／組合流程 | [使用與組合](USAGE.zh-TW.md) |

在下載的工具包資料夾執行：

```sh
py -3 scripts/settings.py --workspace "你的專案完整路徑" --language zh-TW
py -3 ui-element-inspector/scripts/preview_server.py --port 你選定且未占用的埠號
```

將佔位文字換成實際路徑／數字。macOS/Linux 通常改用 `python3`。打開 server 印出的本機網址，不要為了騰出 port 而關閉別人的程序。

## 語言怎麼選

UI Inspect 與 RWD 介面提供 **自動、繁體中文、English、Français、日本語**。第一次開啟時，語言選單與步驟會短暫發亮；可以選語言或按「知道了」關閉。減少動態效果模式只顯示靜態標示。同一頁面重新開啟不再提示；重新載入是新的一次。沒有偷偷保存偏好。

手動選擇優先。自動模式先採用 AI 明確帶入的偏好，否則看網頁語言、再看瀏覽器語言；沒有支援的偏好時用英文。內建工作區的示範 iframe 跟隨外框語言，不會自動翻譯你的真實網站。

本機網址可加 `?lang=zh-TW`、`?lang=en`、`?lang=fr` 或 `?lang=ja`。AI 啟動時可用 `?aiLang=fr` 並保持自動。獨立且經核准的注入方式，可在載入 `inspector.js` **之前**設定 `window.DesignWorkflowInspectorOptions = {language: 'auto', aiLanguage: 'fr'}`。工具無法偷讀另一個 AI app 的偏好。

Python 設定選單目前是中英介面；其中「AI 回覆語言」也可填 `auto`、`fr`、`ja`。個別 skill 完整教學／圖／影片為中英版；法文、日文提供 Inspector 操作介面與快速開始頁，尚不是完整手冊翻譯。切換語言不改你的需求文字、程式識別名稱或既有可編輯報告。

## 三步操作

1. **選元素：**開啟 UI Inspect，Hover 畫面或 DOM 樹可預覽名稱，點一下選取；箭頭展開容器。
2. **確認範圍：**選同 class、標籤或明確元件標記，瀏覽匹配並勾選例外。只代表目前頁面的 DOM，不是全專案的程式碼搜尋。
3. **寫需求：**輸入想改什麼，確認資料後一起複製到 AI 對話。關閉工具才恢復原網頁按鈕操作。

## 鍵盤與截圖快捷鍵

| 快捷鍵／控制 | 用途與限制 |
|---|---|
| Tab／Shift+Tab | 切換控制；Enter／Space 啟動已聚焦的控制 |
| 步驟列上的 ←／→、Home／End | 切換工具分類 |
| DOM 列上的 ↑／↓ | 在可見圖層間移動焦點 |
| DOM 列上的 →／← | 展開／進入子層，或收合／回父層 |
| 範圍的「上一個／下一個」 | 捲動到對應匹配元素 |
| Escape | 截圖模式回編輯；其他情況關閉 Inspector。RWD 設定中則關閉說明浮層 |
| 複製修改需求 | 一起複製元素、範圍、例外與需求；拒絕時用選取文字搭配 Ctrl+C／Cmd+C |
| 截圖 → 準備截圖 → 保留框線，隱藏面板 | 顯示清楚的修改單和選取框；需先填寫需求 |
| PrtSc／Print Screen | 依 Windows 設定擷取或開啟剪取工具；**先準備修改單，再按鍵** |
| Win+Shift+S | 手動啟動 Windows 區域剪取 |
| Shift+Cmd+4 | 手動啟動 macOS 區域截圖 |

想用面板上的 Windows 原生按鈕，需另外選擇啟用：

```sh
py -3 ui-element-inspector/scripts/preview_server.py --port 你選定且未占用的埠號 --enable-snipping --enable-printscreen
```

兩者預設關閉，必須由你點按鈕。Print Screen 只送固定按鍵，不讀剪貼簿；成功送出請求不等於截圖或貼上完成。截圖要一起包含目標、完整需求與例外，長內容請分張或附完整複製文字。分享前檢查私密資料。窄螢幕會上下堆疊，需要單張清楚截圖時建議放大桌面視窗。

結束按關閉／Escape；自己啟動的預覽 server 在原終端按 Ctrl+C 停止。連線、發布、push 與 routine 仍須獨立確認；routine 先手動跑，再驗第一次真正排程與送達結果。

[Minimum install & optional companions / 最小安裝與選用搭配](../README.md#minimum-install-and-optional-companions) · [繁體中文](../README.zh-TW.md#最小安裝與建議搭配)
