# Responsive presets / RWD 版型

Use `assets/rwd-preview.html` for an external sidebar and a separately sized iframe.
Select width/height or type integers from 240 to 3840 CSS pixels. Rotate swaps them.
This does not emulate a phone, User-Agent, DPR, touch, safe areas or Safari engine.
Check browser chrome, zoom, font scaling, keyboard and actual devices separately.

Reference models checked 2026-09-15. These are approximate layout samples, **not
measured browser viewports**. Physical resolution cannot alone establish CSS viewport.

Apple, Samsung and Google each provide 8 distinct models; foldable display states are extra options, not extra models.

These ratios are explicit layout assumptions, NOT measured DPR. Manufacturer sources establish physical resolution only. Browser bars, scaling, OS settings and orientation change actual CSS viewports. No hinge, fold posture or Safari emulation is provided.

| Model / State | CSS sample | Physical pixels ÷ assumed scale | Source |
|---|---|---|---|
| iPhone 18 Pro | 402 × 874 | 1206 × 2622 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-18-pro/specs/) |
| iPhone 18 Pro Max | 440 × 956 | 1320 × 2868 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-18-pro/specs/) |
| iPhone Duo 外螢幕 / Cover | 466 × 678 | 1398 × 2034 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-duo/specs/) |
| iPhone Duo 展開 / Inner | 890 × 626 | 2670 × 1878 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-duo/specs/) |
| iPhone Air | 420 × 912 | 1260 × 2736 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-air/specs/) |
| iPhone 17 | 402 × 874 | 1206 × 2622 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-17/specs/) |
| iPhone 17 Pro | 402 × 874 | 1206 × 2622 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-17-pro/specs/) |
| iPhone 17 Pro Max | 440 × 956 | 1320 × 2868 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-17-pro/specs/) |
| iPhone 16 | 393 × 852 | 1179 × 2556 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.apple.com/iphone-16/specs/) |
| Galaxy S26 | 360 × 780 | 1080 × 2340 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_1Q_Interim_Report.pdf) |
| Galaxy S26+ | 411 × 891 | 1440 × 3120 ÷ 3.5 (assumed) | [官方硬體規格 / Specs](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_1Q_Interim_Report.pdf) |
| Galaxy S26 Ultra | 411 × 891 | 1440 × 3120 ÷ 3.5 (assumed) | [官方硬體規格 / Specs](https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_1Q_Interim_Report.pdf) |
| Galaxy S25 | 360 × 780 | 1080 × 2340 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.samsung.com/uk/support/mobile-devices/what-are-the-differences-between-the-galaxy-s25-ultra-s25-plus-and-s25/) |
| Galaxy S25+ | 411 × 891 | 1440 × 3120 ÷ 3.5 (assumed) | [官方硬體規格 / Specs](https://www.samsung.com/uk/support/mobile-devices/what-are-the-differences-between-the-galaxy-s25-ultra-s25-plus-and-s25/) |
| Galaxy S25 Ultra | 411 × 891 | 1440 × 3120 ÷ 3.5 (assumed) | [官方硬體規格 / Specs](https://www.samsung.com/uk/support/mobile-devices/what-are-the-differences-between-the-galaxy-s25-ultra-s25-plus-and-s25/) |
| Galaxy Z Fold7 外螢幕 / Cover | 360 × 840 | 1080 × 2520 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.samsung.com/sa_en/support/mobile-devices/what-is-the-display-size-resolution-of-galaxy-flip-7-galaxy-fold-7/) |
| Galaxy Z Fold7 展開 / Inner | 750 × 832 | 1968 × 2184 ÷ 2.625 (assumed) | [官方硬體規格 / Specs](https://www.samsung.com/sa_en/support/mobile-devices/what-is-the-display-size-resolution-of-galaxy-flip-7-galaxy-fold-7/) |
| Galaxy Z Flip7 主螢幕 / Main | 360 × 840 | 1080 × 2520 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://www.samsung.com/sa_en/support/mobile-devices/what-is-the-display-size-resolution-of-galaxy-flip-7-galaxy-fold-7/) |
| Pixel 11 | 411 × 923 | 1080 × 2424 ÷ 2.625 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 11 Pro | 410 × 914 | 1280 × 2856 ÷ 3.125 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 11 Pro XL | 448 × 997 | 1344 × 2992 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 11 Pro Fold 外螢幕 / Cover | 411 × 892 | 1080 × 2342 ÷ 2.625 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 11 Pro Fold 展開 / Inner | 791 × 820 | 2076 × 2152 ÷ 2.625 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 10 | 411 × 923 | 1080 × 2424 ÷ 2.625 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 10 Pro | 410 × 914 | 1280 × 2856 ÷ 3.125 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 10 Pro XL | 448 × 997 | 1344 × 2992 ÷ 3 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |
| Pixel 9a | 411 × 923 | 1080 × 2424 ÷ 2.625 (assumed) | [官方硬體規格 / Specs](https://support.google.com/pixelphone/answer/7158570?hl=en) |

繁中：選項是「以機型為參考的近似 CSS 排版尺寸」，不是實測真機值。
可輸入自己量到的寬高；建議另外測斷點前後 1px、橫向、文字放大與長文案。
只切寬度不代表 RWD 已通過。外框過窄時可捲動預覽區，不能把外框捲動當成網站溢出。
同源 demo 可用外側 DOM 面板；不同來源（包括不同 port）只能看排版，不能讀 DOM。
若目標禁止 iframe，保留限制並用該專案核准的瀏覽器工具，不能代理或降低 CSP 繞過。
