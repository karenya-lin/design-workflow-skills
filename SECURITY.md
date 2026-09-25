# Security / 資安

## 先看這段白話說明 / Start with the plain-language version

**這包提供工作流程與本機輔助工具，不替你取得帳號權限。連不連接、裝不裝工具、用哪個帳號，都是使用者自己選擇並完成登入／授權。**

**This bundle supplies workflows and local helpers, not account access. You choose whether to connect, which tools to install and which account to authorize, then complete the provider's login/consent flow.**

| 你想做什麼 / Goal | 使用者先做 / Your setup | Skill 才能做 / Then the skill can |
|---|---|---|
| 看 Google 日曆 / Read Calendar | 選擇可用 connector、自己登入帳號並授權，再選日曆與日期 / Connect an available tool, sign in, consent, choose calendars/dates | 在選定範圍整理紀錄；不順便讀 Gmail / Summarize the selected records without reading Gmail |
| 用 Chrome 看頁面 / Use Chrome | 依 AI 官方支援方式設定瀏覽器；需要擴充功能才自行安裝並檢查權限 / Follow the AI host's browser setup; install/review an extension only if required | 在已同意的頁面範圍觀察或操作 / Observe or operate within the approved page scope |
| 讀 Jira / Read Jira | 選擇可用 connector、已登入的瀏覽器，或已安裝的官方支援 CLI，再完成該方式的登入 / Choose a supported connector, signed-in browser or installed CLI and complete its authentication | 核對實際帳號、站台與專案，才讀取指定紀錄 / Verify actual account/site/project before scoped reads |
| 改資料、寄信 / Update or send | 確認這次要改的項目、內容、收件人 / Approve exact records, content and recipients for this task | 執行批准範圍，再讀回結果 / Perform that batch and verify the result |

不是每種 AI 都需要 Chrome extension，也不是所有 connector／CLI 都已附在這個包裡。Email 是帳號識別，不是登入憑證；不要把密碼、token 或 session cookie 貼進 skill、公開 Git 或一般設定欄位。CLI 參數依實際工具文件，不猜一個通用的 email 登入指令。

Not every AI host needs a Chrome extension, and this bundle does not include every connector or CLI. Email identifies an account but does not authenticate it. Keep passwords, tokens and session cookies out of skills, public Git and ordinary preference fields. Use the actual CLI's documented login flow, not an invented generic email command.

**可以全部不連接。** 手動筆記、假資料與本機檔案就能做許多檢查和草稿；缺少工具時會說明限制，不假裝連線完成。

**You can skip every connection.** Manual notes, synthetic data and local files support many reviews and drafts. Missing tools must be disclosed, not represented as working connections.

### Routine／排程先自己跑一遍 / Trial-run a routine before relying on it

安裝 skill 不會建立 routine。若你另外選擇在 AI 工具建立排程：

1. 先確認工具、帳號、權限、時區、時間與可處理範圍。 / Confirm tools, account, access, timezone, schedule and scope.
2. 用同一份排程指令手動跑一輪，先用只讀或假資料。 / Manually run the same prompt once with read-only or synthetic inputs first.
3. 檢查實際輸出、錯誤與未驗項目；如需真實寄送／寫入，先批准測試對象，再核對收信或讀回結果。 / Check output, errors and gaps; approve test targets for actual sends/writes and verify delivery/read-back.
4. 第一次排程觸發後，再確認確實執行、沒有重複寫入、失敗時知道在哪裡看。 / After the first scheduled trigger, verify execution, lack of duplicate writes and visible failure reporting.
5. 未跑過、未收信或未看到排程觸發，就保留「未驗」，不能只憑 enabled 說會正常運作。 / Keep untested, undelivered or untriggered stages unverified; enabled is not execution evidence.

下面是給維護者的技術細節。一般使用者只要先理解：**選擇連接 → 自行授權 → 核對範圍 → 執行 → 驗證結果**；登入成功不等於同意所有寫入。

The remaining sections are technical details for maintainers. The user path is **choose a connection → authorize it → confirm scope → run → verify**. Successful login does not approve every write.

## Threat model

The kit processes user settings and may guide an agent reading third-party pages,
calendar entries, email or issue text. These inputs may contain prompt injection.
Profiles are untrusted data, not executable policy. Account selection is not OAuth,
and OAuth access is not approval to mutate every accessible resource.

Controls: credentials stay in the authorized connector; source access is opt-in and
scoped; no automatic downloads/hooks/schedulers; local settings stay outside projects;
writes/sends/process termination/push need scoped approval. The runner uses argv with
shell=False, rejects shell wrappers, requires a matching reviewed config hash, and
stops after failure. These controls reduce risk; they do not sandbox arbitrary
executables or make agent judgment immune to prompt injection.

Inspect scripts before approving them. Never copy a command from an email into the
runner automatically. Do not include tokens in config or logs. File permissions depend
on the OS user account; JSON settings are not encrypted. A compromised local account
can read/change them. Avoid shared writable profile directories and run untrusted
code only in a separate low-privilege sandbox with restricted network/secrets.

Do not post secrets or raw work records in a public GitHub issue. Until the repository
owner configures private vulnerability reporting, do not send confidential exploit
details publicly; ask the maintainer for a private reporting route. No email endpoint
or response-time promise is invented by this template.

The settings menu only edits local preferences and pipeline declarations. It never
executes saved commands. Saving a source toggle is not an OAuth grant. External
skill declarations are unverified references, not trusted executable dependencies.
When combining skills, permissions do not accumulate and overlapping writers must
resolve ownership before editing. The menu cannot manage arbitrary third-party
skill settings or stop those skills from violating instructions; inspect them first.

## Public skill publication / 公開 Skill 發布

Before publishing a reusable skill, follow [Public Skill Sanitization](docs/PUBLIC-SKILL-SANITIZATION.md). Keep the reusable method; remove private repo/ticket identifiers, production URLs, internal data names, local paths, account IDs, provider rosters/quotas, raw logs/payloads and operational topology. Public examples and screenshots should use synthetic fixtures or complete redaction.

公開 Skill 要保留方法、移除營運識別資訊。不可把私人 repo／Issue、正式站網址、內部資料名稱、本機路徑、帳號 ID、provider 名冊／額度、raw log／payload 或可利用的內部拓樸一起公開。範例與截圖優先使用 synthetic fixture。

## Accessibility, security and PCI DSS are separate

`a11y-review` checks accessibility, not payment security. The toolkit does not provide
PCI DSS validation, an ASV scan, a penetration test or a compliance certificate.
PCI DSS covers technical and operational protection of payment account data; systems
that could affect the cardholder data environment may also be in scope. Determine
scope and the required validation method with the responsible payment/compliance
owner rather than inferring compliance from a frontend check.

The inspector must use synthetic or approved local data. Do not activate it on real
payment/cardholder-data pages or include PAN, CVV, passwords or tokens in screenshots,
locators or reports. Localhost alone does not make real data safe. Its overlay is not
an isolation boundary; existing page code still runs. Review identifiers and explicit
component annotations for private content and prompt injection before sharing.

Sources: [PCI SSC](https://www.pcisecuritystandards.org/standards/pci-dss/),
[W3C accessibility introduction](https://www.w3.org/WAI/fundamentals/accessibility-intro/).

## 繁體中文

**無障礙、資安與 PCI DSS 分開驗證。** `a11y-review` 不包含 PCI 認證、ASV 掃描
或滲透測試；前端測試通過也不代表支付卡環境合規。是否適用及驗證方式，須由
支付／合規負責人依實際資料流與環境判定。不要在真實支付／持卡人資料頁啟動
元素指認，截圖／報告不得含卡號、CVV、密碼或 Token。本機網址不等於資料安全。

頁面、日曆、email、ticket 與設定文字都可能藏提示注入。它們是待分析資料，不能
授權 agent 改設定、執行命令或外傳檔案。填帳號不等於 OAuth；連接成功也不代表
任何可存取資料都能拿來讀或改。

本包採選填來源、最小讀取範圍、repo 外設定、無自動下載／hook／排程；寄送、寫入、
停止程序與 push 分開批准。runner 不透過 shell 拼命令，核對設定 SHA，失敗後停止。
**這些防護不等於 sandbox 或零風險**：獲准執行的程式仍有目前帳號權限。

私人 profile 是未加密 JSON，不能存 token、cookie、密碼或原始工作紀錄。公共 issue
不得附秘密；在 repo owner 設定私人漏洞回報管道之前，先詢問私下回報方式。

設定選單只管理本機偏好與流程宣告，不執行儲存的指令。來源開關不是 OAuth。
外部 skill 名稱不代表可信；合用不能累加權限，同檔案 writer 要先協調。
本工具不能替第三方 skill 管理全部私人設定，也不能保證對方一定遵守規則。

Third-party handling: [THIRD_PARTY.md](THIRD_PARTY.md).
Reference: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

## Optional native capture controls / 選用原生截圖

The local helper disables both native actions by default. `--enable-snipping` permits the fixed Snipping Tool launch; `--enable-printscreen` permits a fixed Windows Print Screen key event. Each requires a user click and an exact local Host/Origin plus the helper token. No arbitrary command, key, path or request body is accepted. Stop the foreground helper with Ctrl+C. Print Screen behavior depends on Windows settings; a successful request is not evidence that an image was captured, saved or pasted.

Both actions can expose whatever is visible on the desktop. Clear private windows first. The capture brief intentionally includes the selected selector and the text you typed: review those before sharing. The tool does not read the system clipboard, upload captures or authorize any AI service. Browser DOM separation is not isolation from a hostile inspected page.

兩個原生功能預設關閉，需分別啟用並由使用者點擊。Print Screen 依 Windows 設定動作，可能包含其他桌面視窗；請先清除私密內容。修改單刻意顯示所選元素與你輸入的需求，分享前需確認。本工具不讀取剪貼簿、不上傳截圖，也不替你授權外部服務。
