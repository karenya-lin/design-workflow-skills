# Design Workflow Skills — 可自訂設計工作流程包

[13 個 skills 完整圖解 / All 13 skill guides](docs/SKILL-MAP.md) · [UI Inspect 畫面 / Screenshots](docs/VISUAL-GUIDE.md)

![點選、確認範圍與複製 / Point, scope and copy](docs/images/inspector-02-scope.png)

13 個通用 skills，支援首次選填設定、執行前顯示設定，以及單項／分階段／整批檢查。
這份通用包不含作者私人設定；安裝不會自動連接帳號或建立排程。

[English](README.md) · [繁中使用方法](docs/USAGE.zh-TW.md) ·
[資安規則](SECURITY.md) · [MIT 授權](LICENSE)

## 每個 skill 的兩句優點與完整教學

每篇都有：適用專案與階段、開始準備、Step 1／2／3、結束交接、自訂／optional 及中英可貼提示。點名稱進入獨立圖解，安裝到 AI 的 skill 資料夾後，`references/quickstart.md` 與流程圖也會一起保留。

| Skill / 圖解 | 兩句優點 |
|---|---|
| [optional-skill-profile](optional-skill-profile/references/quickstart.md) | 不用每次重複交代專案偏好，開始前仍能檢查與修改。個人設定留在專案外，降低誤把帳號或私人資訊公開的風險。 |
| [states-preview-loop](states-preview-loop/references/quickstart.md) | 把正常、空白、載入與錯誤狀態放在同一份檢查流程，較不容易漏掉邊界。明確確認 port 與程序，可減少誤停其他開發服務的風險。 |
| [ui-element-inspector](ui-element-inspector/references/quickstart.md) | 直接點畫面就能取得元素位置與容器，不必先學會寫 selector。把同類位置、例外和修改需求一起複製，讓交辦範圍更清楚。 |
| [ui-design-review](ui-design-review/references/quickstart.md) | 把視覺差異和功能問題分開，能更快決定先修哪裡。沿用既有元件和 token，減少修一處卻讓其他畫面變樣的風險。 |
| [a11y-review](a11y-review/references/quickstart.md) | 提早找出鍵盤、焦點與標籤問題，讓更多人能使用介面。把實測與未驗分開，避免把掃描結果誤當完整合規證明。 |
| [uiux-checks](uiux-checks/references/quickstart.md) | 用一個協調流程串起多個檢查，避免相同設定與測試重複處理。依需求選範圍，讓小修改不必每次都變成整站重驗。 |
| [audit-fix-loop-no-preview](audit-fix-loop-no-preview/references/quickstart.md) | 沒有瀏覽器時也能整理來源證據，繼續處理可安全修的問題。把待驗的視覺與互動明列出來，方便之後接手而不誤判完成。 |
| [variant-review-loop](variant-review-loop/references/quickstart.md) | 穩定編號加上並列圖像，能清楚知道正在討論哪個方案。保留取捨與決策理由，減少反覆改回舊方向的混亂。 |
| [figma-write](figma-write/references/quickstart.md) | 先了解容器和變數再修改，較能保留既有設計系統的一致性。小批修改後讀回屬性與畫面，可提早發現尺寸或綁定錯誤。 |
| [multi-session-protocol](multi-session-protocol/references/quickstart.md) | 精確劃分 owner 與檔案範圍，減少互相覆蓋工作的機會。交接附版本和驗證結果，讓接收者不必靠猜測理解進度。 |
| [content-pipeline-dashboard](content-pipeline-dashboard/references/quickstart.md) | 把稿件、圖片和語系進度放在同一張表，較容易看出阻擋點。區分草稿、已審與已公開，減少把私人交付誤當網站上線。 |
| [work-sync-daily](work-sync-daily/references/quickstart.md) | 先只讀對帳，能看出遺漏與重複，而不立即改動原始紀錄。用明確 before／after 表格批准更新，讓同步結果更可追蹤。 |
| [work-report-weekly](work-report-weekly/references/quickstart.md) | 依完成證據整理一週成果，減少從零回想與重寫的負擔。先交草稿再決定寄送，可降低未確認內容或收件對象就外傳的風險。 |

## 新手從這裡開始

**連不連接，由你決定。** Skill 提供方法，不會替你登入 Google、Jira 或 Chrome；需要工具才由你安裝、登入並選擇授權範圍。填 email 不等於登入成功。若你選用 routine，先手動跑一遍，再驗證第一次排程執行及實際收件。看[白話連線與授權例子](SECURITY.md)，不必先理解後面的技術術語。

[前端／UIUX 新手教學](docs/BEGINNER.zh-TW.md)：安裝、第一個任務、可複製提問、
常見建置方法與疑難排解，另有 [English](docs/BEGINNER.en.md)。

在工具包資料夾執行快捷設定選單（Python 3.11+，Windows）：

```powershell
py -3 scripts/settings.py --workspace "你的專案完整路徑"
```

macOS／Linux 通常改用 `python3`。編號選項可改偏好、port、選擇性資料來源、
每階段的多個 skills 與自訂檢查指令。儲存前顯示差異，輸入 YES 才寫入。
檔案保存在專案外；選單不會自動跑檢查、連線、kill 或 push。

[多 skill 合用規則](optional-skill-profile/references/composition.md)：共用一次設定確認，
只有一位協調者，明確分配檔案範圍與驗收。宣告外部 skill 不等於安裝或通過安全審查。
Runner 可重複 `--phase`，依選取順序去重。先跑指令、AI 計畫另列，不自動交錯修補與重驗。

| 階段 | Skills |
|---|---|
| 開始 | `optional-skill-profile`、`multi-session-protocol` |
| 指認元素 | `ui-element-inspector`：Hover 看名稱／父容器，點選複製給 AI |
| 設計 | `variant-review-loop`、`figma-write` |
| 檢查 | `uiux-checks`、`states-preview-loop`、`ui-design-review`、`a11y-review` |
| 修補 | `audit-fix-loop-no-preview` |
| 工作整理 | `work-sync-daily`、`work-report-weekly`、`content-pipeline-dashboard` |

將以上 13 個含 SKILL.md 的資料夾保留為同層，安裝到所用 agent 支援的 skills 目錄。
首次使用會詢問是否選填、是否保存。之後每次跑之前會顯示目前設定；可說
「修改設定」「改 port」「切換帳號」「停用日曆」「這次不用」或「重設」。

個人 profile 存在作業系統使用者設定目錄、repo 外，不回寫 SKILL.md。可不保存，
不保存就不能保證下一個 session 記得。選填 email 不代表完成 OAuth，日曆連接也
不代表允許讀 Gmail、寄信、寫 Jira、改日曆或 push；這些分開決定。

## 一支 script 組合多項檢查

`scripts/review.py` 讀你自訂的 JSON，支援 `--phase`、多個 `--check` 或 `--all`。
預設只顯示計畫。看過指令、工作目錄與設定 SHA256 後，加入
`--execute --approve-config SHA256` 才執行；任一失敗就停止後續命令。

**指令測試與 AI 審查不同**：runner 可執行 lint／單元測試等，但不會自己召喚 AI、
連接 Google、開 browser 或讀 Figma。它列出的 skill 清單仍是 NOT_RUN，須交 agent
實際依序執行並回報證據，不能用程式 exit 0 冒充整體 review 完成。

## 取得套件

```sh
git clone https://github.com/karenya-lin/design-workflow-skills.git
cd design-workflow-skills
```

安裝或執行前先看[使用方法](docs/USAGE.zh-TW.md)。若已有同名私人 skill，先比較，不直接覆蓋。

這是 MIT 開源套件；不附第三方 Nielsen skill，不附 TWG，也不提供客戶素材權利。
Nielsen 的來源／MIT 條件及 TWG 排除理由見 [第三方聲明](THIRD_PARTY.md)。

## 測試

`py -3 -m unittest discover -s tests -v` 使用暫存假資料，不連帳號、不啟動網站。
[測試範圍與人工驗收](docs/TESTING.md) 明列尚須由使用者環境確認的 AI／瀏覽器／OAuth 行為。
