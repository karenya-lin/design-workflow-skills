# Release status / 交付與測試狀態

Updated 2026-09-15. Available instructions are not a guarantee of every AI host, account or browser working. No skill grants account access by installation.

更新日期：2026-09-15。文件可使用不代表所有 AI、帳號與瀏覽器都已實測；安裝不等於授權。

| Skill | Verified scope / 已驗範圍 | Still testing / 待驗範圍 |
|---|---|---|
| ui-element-inspector | Local synthetic Chromium workflow: hover/tree, external panel, RWD, matches, numbered navigation, exclusions, request/copy feedback, four languages / 本機假資料主要流程 | Real projects, other browser engines, native screenshot/paste, assistive technology / 真實專案、其他瀏覽器、原生截圖貼上、輔助科技 |
| optional-skill-profile | Python settings save/reset, conflicts, optional prompts / 設定儲存、重設、衝突與選填 | Every AI host's repeated invocation / 各 AI 多次啟動 |
| uiux-checks | Runner plans, stage composition and deduplication / runner 計畫、階段組合去重 | Real multi-skill end-to-end runs / 真實多 skill 全流程 |
| states-preview-loop | Instructions, portable guide and links / 文件與可攜圖解 | Project servers and actual state sweeps / 專案 server 與完整狀態巡查 |
| ui-design-review | Instructions and illustrated guide / 文件圖解 | Real design-to-implementation reviews / 真實設計對照 |
| a11y-review | Instructions and illustrated guide / 文件圖解 | Assistive technology and project audits; no WCAG/PCI certification / 輔助科技與專案驗收，不提供合規認證 |
| audit-fix-loop-no-preview | Instructions and illustrated guide / 文件圖解 | Project-specific repair and regression / 個別專案修補回歸 |
| variant-review-loop | Instructions and illustrated guide / 文件圖解 | Real design variants and user approval / 真實方案及使用者決策 |
| figma-write | Instructions and illustrated guide / 文件圖解 | Authorized Figma writes / 實際授權寫入 |
| figma-workflow-rebrand | Manifest coverage checker: 12 Node tests / 清單覆蓋檢查器 12 測試 | Actual Figma visual/prototype fidelity / 實際視覺及 prototype 一致性 |
| multi-session-protocol | Instructions and illustrated guide / 文件圖解 | Cross-host handoff and concurrent writers / 跨機交接與並行寫入 |
| content-pipeline-dashboard | Instructions and illustrated guide / 文件圖解 | Real content publication and source connections / 真實發布與來源連接 |
| work-sync-daily | Instructions and illustrated guide / 文件圖解 | Google/Jira OAuth, reconciliation and scheduled runs / 授權、對帳與排程 |
| work-report-weekly | Instructions and illustrated guide / 文件圖解 | Real reports and delivery; user must trial-run routines / 真實週報寄送，routine 必須自行跑一次 |

## Not released / 未交付功能

- Chrome/Edge/Firefox DevTools extension: development only, not a verified installable release. Console/Network integration is not part of the released Skill.
- DevTools 擴充套件仍開發中，尚未完成安裝及主要流程驗收；Skill 不提供 F12 Console/Network 即時資料。
- Automatic AI sending and automatic GitHub error uploads are not enabled. Review and copy locally, then choose where to paste. No private screenshot or log is uploaded automatically.
- 不自動傳送 AI，也不自動上傳 GitHub 錯誤；先在本機審閱、複製，再自行貼上，不自動送出私密截圖或 log。

## Evidence / 驗證依據

[Test commands and limitations](TESTING.md): 80 inspector checks, 101 language/capture checks and 47 Python tests passed on the local synthetic fixture. Browser copy tests mock writes; the separately documented real Clipboard API write resolved, but pasting into AI was not verified. Native capture launches remain mocked. CSS variable references are candidates, not proof of the winning cascade.

[測試指令與限制](TESTING.md)：80 項 Inspector、101 項語言／截圖、47 項 Python 通過。瀏覽器套件使用假資料與模擬剪貼簿；另有真實 Clipboard API 寫入成功紀錄，但未驗貼進 AI。原生截圖測試為 mock；CSS 引用不等於最終生效樣式。
