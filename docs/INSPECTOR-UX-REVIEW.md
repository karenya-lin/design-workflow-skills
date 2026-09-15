# Inspector UX review / 操作與 RWD 檢查

Scope: local synthetic demo, external inspector, three-step flow. This is an internal heuristic review using NN/g's published principles, not an official NN/g skill, endorsement, certification, or user study.

範圍：本機假資料示範、外側面板及三步流程。這是依公開原則進行的內部檢查，不是 NN/g 官方 skill、認證或使用者研究。

Reference: [NN/g usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/), [recognition and recall](https://www.nngroup.com/articles/recognition-and-recall/).

| Principle / 原則 | Observed friction / 問題 | Change / 修正 |
|---|---|---|
| Status / 狀態 | Next action unclear / 不知道下一步 | Numbered steps, selected target, explicit copy follow-up / 編號、目標、複製後提示 |
| Recognition / 辨識 | Users must remember the sequence / 要記順序 | Contextual instructions and Next buttons / 當步說明與下一步 |
| Control / 掌控 | Returning could feel like restarting / 返回像重來 | Back preserves request and exceptions / 返回保留內容 |
| Prevention / 預防 | Empty selection provides no useful context / 未選取 | Next disabled with explanation / 停用並說明 |
| Minimalism / 精簡 | RWD settings compete with preview / 占預覽空間 | Collapsible sidebar settings, one-row steps / 收合設定、單列步驟 |
| Help / 協助 | Technical text alone is hard to follow / 純文字難懂 | Matching screenshot guide and UI labels / 同順序圖解 |

## Verification / 驗證

- Public browser smoke covers selection, tree hover, stable tree position, matching/exclusions, three-step navigation, preserved input, copy feedback, keyboard controls, layout presets and cleanup.
- Six redesigned viewport runs: 320×600, 390×844, 768×1024, 1280×900, 1920×1080 and 640×300 CSS px. The three-step route completed, the workspace filled the viewport without a 600px cap, the document had no horizontal overflow, copy controls were reachable, and the settings URL field remained within the viewport.
- Fixed viewport dimensions are not real-device or browser zoom tests. Fit mode may make text small; use 100% to inspect detail. Narrow screens stack preview and tools and require internal scrolling.
- 原生剪貼簿在自動測試中使用 mock。未驗真機、輔助科技、實際截圖畫記／貼上；不宣稱完整 WCAG、PCI 或全站通過。

See [visual walkthrough](VISUAL-GUIDE.md) and [test instructions](TESTING.md).
