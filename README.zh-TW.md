# Design Workflow Skills — 可自訂設計工作流程包

12 個通用 skills，支援首次選填設定、執行前顯示設定，以及單項／分階段／整批檢查。
這份通用包不含作者私人設定；安裝不會自動連接帳號或建立排程。

[English](README.md) · [繁中使用方法](docs/USAGE.zh-TW.md) ·
[資安規則](SECURITY.md) · [MIT 授權](LICENSE)

## 新手從這裡開始

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
| 設計 | `variant-review-loop`、`figma-write` |
| 檢查 | `uiux-checks`、`states-preview-loop`、`ui-design-review`、`a11y-review` |
| 修補 | `audit-fix-loop-no-preview` |
| 工作整理 | `work-sync-daily`、`work-report-weekly`、`content-pipeline-dashboard` |

將以上 12 個含 SKILL.md 的資料夾保留為同層，安裝到所用 agent 支援的 skills 目錄。
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
