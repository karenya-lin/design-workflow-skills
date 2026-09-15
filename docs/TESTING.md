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

## 繁體中文

在工具包執行 `py -3 -m unittest discover -s tests -v`（Windows）。
測試使用暫存的假資料，涵蓋設定讀寫／重設、鎖與版本衝突、取消不寫入、
多階段去重、外部 skill 宣告，以及「選單輸入→儲存→重開→runner 計畫」整段操作。
另檢查 skill 結構、文件連結與複製安裝後的 skill 相對引用。

這些測試不登入帳號、不寄信、不啟動網站、不 kill、不 push；也不是完整 AI 行為認證。
使用者環境仍要人工驗證：實際找到的 skill 版本、共用一次設定確認、檔案 owner、
缺少外部 skill 時不自動安裝、規則衝突時不擴張權限。瀏覽器／OAuth 需要另行安全驗收。
測試紀錄請分清「已測」「來源推論」「未驗」，不要把私人紀錄放公開 GitHub。
