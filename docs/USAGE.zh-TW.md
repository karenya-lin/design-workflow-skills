# 使用方法

新手先看[入門教學](BEGINNER.zh-TW.md)。
在工具包執行 `py -3 scripts/settings.py --workspace <專案路徑>` 可開啟編號設定選單。
macOS／Linux 改用 `python3`。可選偏好、階段、多個 skills、外部 skill 名稱與指令參數，
不必手改 JSON。偏好與流程各自確認前後差異並儲存；畫面顯示的
`*.review.local.json` 可作為 runner 的 `--config`。
選單不改第三方 skill 的設定，也不連接帳號。安裝時請將 13 個 skill 資料夾維持同層。

多 skill 合用請讀[組合規則](../optional-skill-profile/references/composition.md)。
設定可加選填 `external_skills` 清單，支援 `vendor:skill` 名稱；宣告不等於已安裝或相容。
可重複 `--phase` 依序組合階段；指令 ID 與 skill 名稱依第一次出現去重。
Runner 先跑指令、AI 工作另列計畫，不能交錯「AI 修補→重驗」。有變更時請分次執行。

## 安裝與觸發

把 13 個含 SKILL.md 的資料夾保留同層，放到 agent 已設定的 skills 目錄。
若已有同名私人 skill，不要直接覆蓋；使用另一個 agent profile／安裝環境，或先比較後
明確遷移。runner、測試與文件留在這份 checkout，私人設定不得複製回來。

可以這樣說：
- 「用 states-preview-loop 看這個元件，先問我要用哪個 port。」
- 「用 uiux-checks 檢查這頁，只看無障礙和手機排版。」
- 「用 work-report-weekly，只讀我選的日曆，不讀 Gmail，先給草稿。」
- 「把已保存的 port 改成 4321，其他設定保留。」

Skill 主體為英文並附繁中摘要，agent 依使用者語言回覆。首次詢問是由載入 skill 的
agent 執行，不是常駐程式。缺少連接工具會回報，不自動安裝或繞過封鎖。
安裝不會自動新增排程。

## 建議階段

| 階段 | 目的 | 適合的 skills／檢查 |
|---|---|---|
| start | 設定、範圍、owner | profile、多 session 協作 |
| design | 選方案、更新設計稿 | variants、Figma |
| review | 檢查當前實作 | 品質總表、states、設計比對、a11y |
| fix | 修已核准問題 | 靜態 audit/fix、需要的 lint/types/tests |
| pre-delivery | 交付前驗證 | 必要 build/tests、未完人工驗證 |
| report | 彙整工作或內容 | 依需求選日報／週報／內容進度 |

階段可以改，不是每次都必跑。小改動不自動擴成全站掃描，無關的報告 skill 不必執行。

## 一支 runner，自訂 script 清單

將 `review.example.json` 複製到專案／公開包外的私人位置。範例只測這份 skill 包，
不是網站 QA；用範例時 workspace 指向本包，測自己的專案時則改成實際工具指令。
執行檔用本機存在的 python／py 或絕對路徑，使用 py 時在 -m 前加 -3。

每項 check 指定 argv 陣列與 timeout，各 phase 組合 check IDs 與 skill 名稱。
Node 專案可指定 node 執行檔與專案內 ESLint CLI；先讀 package 設定，不猜檔案路徑。
Windows 的 npm.cmd／.bat 和 shell wrapper 不接受，請用 node 加實際 JS CLI。
不要改用 cmd /c 繞過。**這不是 sandbox**，被批准的程式仍有你的系統權限與環境變數。
執行前需讀指令及對應 script，不把憑證放在 argv。

```text
python scripts/review.py --config PRIVATE_CONFIG --workspace PROJECT --phase review
python scripts/review.py --config PRIVATE_CONFIG --workspace PROJECT --check lint --check types
python scripts/review.py --config PRIVATE_CONFIG --workspace PROJECT --all
```

以上只顯示計畫。確認精確項目、workspace、程式與來源後，加上：

```text
--execute --approve-config 計畫顯示的SHA256
```

設定內容有變會拒絕舊 SHA。注意：此 SHA 不涵蓋指向的 script 內容，因此 script 差異
也必須檢查。網頁／郵件／ticket 提供的命令不能自動變成已批准命令。

依序執行，任一 FAIL／ERROR／TIMEOUT 就停，後面標 NOT_RUN。exit 0 只代表所選指令
成功，或產生計畫成功，不代表 AI review 完成。原始 stdout/stderr 預設不留，避免記錄
私人資料；診斷時在本機另行核准私人 log。timeout 只保證處理直接啟動的程序，不一定
清掉所有子程序；檢查不要啟動常駐 server，必要時人工核對自己啟動的程序。

需要一次跑多個 AI skills 時，把 skill_plan 交 agent：「依序執行適用的 skills，遵守
確認 gate，逐項回報證據，不能執行的保留 NOT_RUN。」runner 不會自行呼叫 AI CLI。

## Port 與帳號

使用者指定 port，可選擇記住。若被占用，先顯示 PID／程序／影響範圍；批准後再次
核對身分，先正常停止。強制停止需另確認，不殺未知服務，不一次 kill 全部 node。

Google Calendar 預設關閉，啟用後選帳號、日曆與日期範圍，先唯讀。Gmail 另外選，
每次重新核對登入身分。停用會停止讀取；要完全撤銷 OAuth，還需到供應商撤銷授權。
寄信／寫 Jira／改日曆／push 逐項批准，不能保存成永久寫入許可。

## 測試範圍

`python -m unittest discover -s tests -v` 只在暫存目錄使用合成資料測本機設定與 runner。
不代表 OAuth、收信、瀏覽器、停止真實程序或螢幕閱讀器已驗，也不代表法律合規。
不要上傳私人 profiles、logs、客戶範例或未去敏截圖。
