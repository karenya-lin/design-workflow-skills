# 前端與 UI/UX 新手入門

[圖解操作 / Visual walkthrough](VISUAL-GUIDE.md)

[English](BEGINNER.en.md) · [首頁](../README.zh-TW.md) · [進階用法](USAGE.zh-TW.md)

## 先知道這套工具是什麼

**Skill 是給 AI 的工作說明書，不是網站、UI 元件庫或自動通過的測試。**
你需要能讀本機檔案與 skills 的 AI 工具，例如 Codex 或 Claude Code。
這套工具協助設計比較、前端狀態檢查、無障礙與交接；實作網站時仍使用
你的專案與已安裝的前端 skill。只安裝本套不會建立網站或連接 Google。

| 想做的事 | 需要準備 |
|---|---|
| 請 AI 用 skill 協助檢查 | AI 工具、本套 skills、你的設計或專案 |
| 開設定選單／跑 review runner | 再準備 Python 3.11 以上；不需額外 pip 套件 |
| 修改既有前端網站 | 專案要求的 Node／套件管理器，依該專案 README |
| Figma 或日曆資料 | 另外確認對應工具與帳號授權；可先跳過 |

程式碼免費採 MIT，但你使用的 AI 服務或第三方連線可能有自己的費用。
如果只想用對話、不存設定、不跑 Python 檢查，可以先不安裝 Python。
請 AI 說明它使用的是本輪設定，不要假裝已經永久記住。

## 1. 取得與安裝

在 GitHub 按 **Code → Download ZIP**，解壓縮保留整個資料夾即可；
有 Git 的人也可執行：

```sh
git clone https://github.com/karenya-lin/design-workflow-skills.git
cd design-workflow-skills
```

這個資料夾是工具包，不是你的網站。不要把整套放進網站的 `src`、`public`
或公開下載目錄。先讀 [資安說明](../SECURITY.md)，再選擇 skill 安裝範圍：

| 工具 | 只給單一專案使用 | 給本機多個專案使用 |
|---|---|---|
| Codex | 專案內 `.agents/skills/` | 使用者家目錄 `.agents/skills/` |
| Claude Code | 專案內 `.claude/skills/` | 使用者家目錄 `.claude/skills/` |

路徑依官方本機 skills 文件整理；雲端環境不一定讀得到本機資料夾。
來源：[Codex](https://learn.chatgpt.com/docs/build-skills)、
[Claude Code](https://code.claude.com/docs/en/skills)。

將首頁列出的 **13 個 skill 資料夾**複製到所選目錄，
維持同層關係，讓相互引用可讀。例如：

```text
.agents/skills/                 ← Claude Code 則用 .claude/skills/
  optional-skill-profile/
    SKILL.md
    references/
    scripts/
  uiux-checks/
    SKILL.md
  a11y-review/
  ...其餘本套 skills
```

docs、根目錄 scripts 與 tests 留在原工具包，用來讀教學、開設定選單、執行 runner 與測試。
不用將它們安裝到 skills 目錄。**不要直接覆蓋已存在的
同名 skill**。先比對、備份與明確決定如何移轉，也要注意個人與專案目錄的同名版本。
安裝後重新開一個 AI 對話，要求它列出找到的名稱與來源檔案，確認不是讀到舊版。

不會複製時可把以下要求交給 AI：

> 請先讀 design-workflow-skills 的 README 與 SECURITY。我使用［Codex／Claude Code］，
> 要安裝到［此專案／個人］範圍。先列出來源、目的資料夾與同名衝突，
> 不覆蓋任何已有檔案。得到我的確認再複製 13 個 skill 資料夾。
> 完成後檢查 SKILL.md 及相對引用可讀，告訴我怎麼在新對話觸發。

## 2. 一個快捷 Script 開設定選單

在**工具包資料夾**開啟 Terminal／終端機。Windows PowerShell：

```powershell
py -3 scripts/settings.py --workspace "你的專案完整路徑"
```

macOS／Linux：

```sh
python3 scripts/settings.py --workspace "/path/to/your-project"
```

引號內必須換成已存在的專案資料夾，不是 Figma 網址或單一檔案。
`workspace` 就是此次工作根目錄。路徑不同代表另一組獨立設定。
想同專案有兩組偏好，加 `--profile design` 或 `--profile frontend`。
英文選單加 `--language en`；選單內也可按 9 切換語言。

```text
1 修改偏好             語言、時區、port、資料來源等
2 修改 skills／檢查流程 新增階段、選擇多個 skills、管理指令
3 顯示設定             儲存前再核對
4 儲存偏好             顯示差異，輸入 YES 才寫入
5 儲存流程             獨立顯示差異，輸入 YES 才寫入
6 重設偏好             先放入待儲存變更
7 重設流程             先放入待儲存變更
8 停用所有來源         選 4 後才保存，OAuth 要另行撤銷
9 切換選單語言
0 離開                 放棄未儲存變更
```

偏好與流程**分開儲存**，不會因其中一個存檔就保存另一個。
選單顯示真正的存檔路徑；檔案位於專案外的個人設定目錄，不能推上 Git。
Email／日曆 ID 會在偏好摘要遮蔽，其餘個人欄位及指令路徑仍可能私密。
這是純文字 JSON，不是密碼保管庫；不要填 Token、密碼、Cookie 或真實工作紀錄。

第一次可只設 `language=zh-TW`、預覽 port（例如 `4321`），其餘留空。
port 是本機預覽服務的入口號碼，不是密碼。設定號碼不會啟動服務，也不會
自動停止佔用它的程序。AI 若要停止既有 Node 程序，必須先告訴你是哪個與影響。

## 3. 先做一個小任務

不知道畫面上的東西叫什麼？先用
[ui-element-inspector](../ui-element-inspector/references/usage.md)。
開本機示範頁，Hover 看名稱／父容器，點選固定後複製給 AI，不用先學 DevTools。
截圖模式保留框線，再用系統快捷鍵剪取、畫記後貼給 AI。

在你的**網站專案**開 AI 對話，貼上：

> 請使用 uiux-checks、ui-design-review 與 a11y-review，先確認三個 skill 都可讀。
> 我是前端／UIUX 新手。這次只檢查［頁面或元件］，參考設計是［附圖或檔案］。
> 先讀專案 README、AGENTS.md 與相關元件，不改檔案。共用一次設定確認，
> 列出桌機／手機、按鈕狀態、表單錯誤提示與鍵盤操作的檢查計畫。
> 有證據的問題與未驗證項目分開，解釋原因，再讓我選擇修正範圍。
> 未有安全預覽與分析事件防污染措施前，不執行正式站 JavaScript。

預期產物是「範圍、檢查方法、發現的問題、證據、未驗項目」，不是一句「全部 OK」。
設計稿缺少 hover 或 error 狀態時，AI 應列成待確認，不要假裝設計已經指定。

## 4. 常見建置與使用方式

| 階段 | 建議技能 | 你要提供／會得到什麼 |
|---|---|---|
| 已有網站，要啟動 | 專案既有建置流程 + states-preview-loop | README、port；啟動方法與預覽狀態 |
| 只有設計稿 | variant-review-loop、ui-design-review | 目標與參考圖；差異與設計方向，不假稱已實作 |
| 要做成前端 | 你已安裝的實作 skill，再用 ui-design-review | 精確元件範圍；修改與設計比對 |
| 檢查互動與手機 | states-preview-loop、a11y-review | 安全預覽；狀態／鍵盤／畫面證據 |
| 修正已確認問題 | audit-fix-loop-no-preview | 核准的問題 ID；窄範圍修改與必要回歸 |
| 交付前 | uiux-checks + 專案必要測試 | 實際 lint／types／tests／build 結果與剩餘風險 |
| 整理工作紀錄 | work-report-weekly | 手動筆記或選擇性授權來源；草稿，不直接寄出 |

不要把所有 skill 每次全開。選 2–4 個與任務相關的先做即可。
「lint」檢查程式規則；「types」檢查型別；「build」確認可建置；
這些都不代表按鈕真的可用，仍需要適當的互動檢查。

建置前可貼：

> 先讀此專案的 README、package.json、lockfile 與設定檔，告訴我框架、
> 正確套件管理器、Node 版本要求、安裝／啟動／驗證指令各做什麼。
> 缺少的資訊請標明，不自動升級依賴或清除 lockfile。
> 請列出指令與會改動的檔案，讓我確認後才安裝或啟動。這次不要部署或 push。

本工具包本身沒有 `npm run dev`。別為了用 skills 在這裡初始化 React 或安裝網站依賴。

## 5. 多 skill 與 runner

完整規則見 [多 skill 合用](../optional-skill-profile/references/composition.md)。
外部 skill 的實際設定仍由它自己管理；本選單管理的是引用名稱、順序與本套共享偏好，
不保證任何第三方 skill 都相容。

先用不含指令的範例產生計畫：

```powershell
py -3 scripts/review.py --config review.example.json --workspace . --phase review
```

這裡的 `.` 是目前工具包目錄，僅供練習。計畫內 `NOT_RUN` 是正確結果，表示沒有執行 AI 檢查。
實際檢查你的網站時，把 workspace 換成網站路徑，把 config 換成選單顯示的
`default.review.local.json`。可以重複 `--phase` 指定順序：

```powershell
py -3 scripts/review.py --config review.composition.example.json --workspace . --phase visual-review --phase accessibility --phase summary
```

範例的 `your-frontend-skill` 只是占位名稱，不是可直接安裝的套件。
在選單先宣告你真正有的外部 skill，再編輯階段選擇它。
要跑指令，請看[進階用法](USAGE.zh-TW.md)：先核對來源，再批准當次設定 hash。
Runner 只會跑核准指令，不會自動召喚 AI 或交錯「修補→重驗」。
修正後請另跑一次必要驗證，不能沿用修正前的 PASS。

## 遇到問題

| 情況 | 下一步 |
|---|---|
| 找不到 skill | 核對目錄層級／名稱、同名衝突與 AI 實際列出的來源，重開對話 |
| 找不到 Python | 確認有 Python 3.11+；Windows 試 `py -3 --version`，Mac/Linux 試 `python3 --version` |
| 設定沒有記住 | 是否按 4／5 並輸入 YES？是否換了 workspace 或 profile？ |
| 設定衝突／lock | 另一個工作可能在寫；保留檔案，重新讀取，不刪別人的 lock |
| 指令被拒絕 | runner 禁止 shell 包裝；請 AI 查實際執行檔與 script，不改用 cmd 繞過 |
| 沒有任何 checks | AI 計畫可不含可執行指令；不代表已測試通過 |
| 日曆開關已選卻不能讀 | 開關只是偏好，仍需可用連線、實際帳號及範圍授權 |
| 想重設全部 | 選 6、7，再各自 4、5 確認；OAuth 另行撤銷 |

更多選項：[English / 繁中使用說明](USAGE.zh-TW.md)。
