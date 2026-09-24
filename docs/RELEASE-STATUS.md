# Release status / 交付與測試狀態

Updated 2026-09-23. Available instructions are not a guarantee of every AI host, account or browser working. No skill grants account access by installation.

更新日期：2026-09-23。文件可使用不代表所有 AI、帳號與瀏覽器都已實測；安裝不等於授權。

| Skill | Verified scope / 已驗範圍 | Still testing / 待驗範圍 |
|---|---|---|
| ui-element-inspector | Local synthetic Chromium workflow: hover/tree, simplified wrapper groups, structure review, external panel, RWD, matches, numbered navigation, exclusions, request/copy feedback, four languages / 本機假資料主要流程 | Real projects, other browser engines, native screenshot/paste, assistive technology / 真實專案、其他瀏覽器、原生截圖貼上、輔助科技 |
| optional-skill-profile | Python settings save/reset, conflicts, optional prompts / 設定儲存、重設、衝突與選填 | Every AI host's repeated invocation / 各 AI 多次啟動 |
| uiux-checks | Runner plans, stage composition and deduplication / runner 計畫、階段組合去重 | Real multi-skill end-to-end runs / 真實多 skill 全流程 |
| states-preview-loop | Instructions, portable guide and links / 文件與可攜圖解 | Project servers and actual state sweeps / 專案 server 與完整狀態巡查 |
| ui-design-review | Instructions, illustrated guide and the author's UX principles checklist KUX-01 to KUX-07 (added 2026-09-15) / 文件圖解與作者 UX 準則清單 KUX-01 至 KUX-07 | Real design-to-implementation reviews / 真實設計對照 |
| a11y-review | Instructions and illustrated guide / 文件圖解 | Assistive technology and project audits; no WCAG/PCI certification / 輔助科技與專案驗收，不提供合規認證 |
| audit-fix-loop-no-preview | Instructions and illustrated guide / 文件圖解 | Project-specific repair and regression / 個別專案修補回歸 |
| variant-review-loop | Instructions and illustrated guide / 文件圖解 | Real design variants and user approval / 真實方案及使用者決策 |
| figma-write | Instructions and illustrated guide / 文件圖解 | Authorized Figma writes / 實際授權寫入 |
| figma-workflow-rebrand | Manifest coverage checker: 12 Node tests / 清單覆蓋檢查器 12 測試 | Actual Figma visual/prototype fidelity / 實際視覺及 prototype 一致性 |
| multi-session-protocol | Instructions and illustrated guide / 文件圖解 | Cross-host handoff and concurrent writers / 跨機交接與並行寫入 |
| content-pipeline-dashboard | Instructions and illustrated guide / 文件圖解 | Real content publication and source connections / 真實發布與來源連接 |
| work-sync-daily | Instructions and illustrated guide / 文件圖解 | Google/Jira OAuth, reconciliation and scheduled runs / 授權、對帳與排程 |
| work-report-weekly | Instructions and illustrated guide / 文件圖解 | Real reports and delivery; user must trial-run routines / 真實週報寄送，routine 必須自行跑一次 |
| ai-workflow-orchestrator | Instructions, bilingual quickstart, workflow diagram and public-sanitization boundary / 文件、雙語 quickstart、流程圖與公開去識別化邊界 | Real multi-agent routing and calibrated semantic fallback / 真實多 agent routing 與校準後 semantic fallback |
| state-drift-review | Instructions, drift taxonomy, bilingual quickstart and workflow diagram / 文件、drift taxonomy、雙語 quickstart 與流程圖 | Real cross-system repairs and read-back / 真實跨系統修復與 read-back |
| uiux-runtime-audit | Instructions, bilingual quickstart, runtime/privacy limits and workflow diagram / 文件、雙語 quickstart、執行期／隱私邊界與流程圖 | Real project/browser/assistive-technology audits / 真實專案、瀏覽器與輔助科技驗收 |
| reliable-delivery | Instructions, bilingual quickstart, acceptance/handoff receipt and workflow diagram / 文件、雙語 quickstart、驗收／交接 receipt 與流程圖 | Real cross-host continuation and integration / 真實跨機接續與整合 |


## Not released / 未交付功能

- Chrome/Edge/Firefox DevTools extension: development only, not a verified installable release. Console/Network integration is not part of the released Skill.
- DevTools 擴充套件仍開發中，尚未完成安裝及主要流程驗收；Skill 不提供 F12 Console/Network 即時資料。
- Automatic AI sending and automatic GitHub error uploads are not enabled. Review and copy locally, then choose where to paste. No private screenshot or log is uploaded automatically.
- 不自動傳送 AI，也不自動上傳 GitHub 錯誤；先在本機審閱、複製，再自行貼上，不自動送出私密截圖或 log。

## Compatibility and token claims / 相容性與省 token 的主張範圍

- Skills are vendor-neutral Markdown. Codex, Claude Code, Gemini, Grok and other agents can follow them where the host loads the skill and has the required capabilities. Native discovery and installation are not claimed for every host; manual load, paste or import is the compatibility path.
- The token-efficiency mechanisms in the README are design properties of the skills as written. No percentage of tokens saved has been measured in this repository, and none is claimed.
- Skill 是不綁廠商的 Markdown。Codex、Claude Code、Gemini、Grok 與其他 agent 在能載入 skill 且具備所需能力的環境下都能照著做。不主張每個環境都有原生發現與安裝，手動載入、貼上或匯入是相容方式。
- README 裡的省 token 做法是 skill 本身的設計，這個 repo 沒有量過節省百分比，也不主張。

## Evidence / 驗證依據

[Test commands and limitations](TESTING.md): 106 inspector checks, 154 language/capture checks and 47 Python tests passed on the local synthetic fixture. Includes larger icon targets and headers across four languages and six viewport sizes. Browser copy tests mock writes; the separately documented real Clipboard API write resolved, but pasting into AI was not verified. Native capture launches remain mocked. CSS variable references are candidates, not proof of the winning cascade.

[測試指令與限制](TESTING.md)：106 項 Inspector、154 項語言／截圖、47 項 Python 通過，包含四語言、六種視窗尺寸的大圖示點擊範圍及標頭排版。瀏覽器套件使用假資料與模擬剪貼簿；另有真實 Clipboard API 寫入成功紀錄，但未驗貼進 AI。原生截圖測試為 mock；CSS 引用不等於最終生效樣式。
