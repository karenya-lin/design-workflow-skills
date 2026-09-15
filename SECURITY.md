# Security / 資安

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

## 繁體中文

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
