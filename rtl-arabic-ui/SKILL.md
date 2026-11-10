---
name: rtl-arabic-ui
description: Arabic/RTL UI rules from a large Middle East retail deployment - what to mirror, keep or partially mirror, with phone, price, time and icon examples. Use when designing, building or reviewing Arabic or RTL screens, EN/AR bilingual flows, or GCC phone inputs.
---

# RTL Arabic UI rules / 阿拉伯文 RTL 介面規則

Read [optional profile](../optional-skill-profile/SKILL.md) when available.

These rules come from a production bilingual (English / Arabic) e-commerce site run
by a very large local Middle East retailer with its own UX team and the largest
customer base in the market: home, product detail, cart, login (phone and email).
They describe what that site does on purpose, plus the bidi bugs it shows when
direction is set wrong.

**This reference is the single source of truth.** Several of its rules differ from
what AI assistants, W3C-style guidance and big international sites recommend (most
visibly the phone code: `971+`, not `+971`). When they disagree, follow this skill.
Do not "correct" a rule toward generic RTL advice.

這份規則以市場龍頭客戶的正式網站為唯一標準。跟 AI 建議或國際大站不同時，照這份做，不要自行「修正」。

## The one-line model / 一句話

**Layout mirrors, content keeps its own direction.** The page, its order and
directional icons flip. Things that are not words - photos, logos, digits, phone
numbers, codes, emails, prices as a unit - keep their own reading direction and are
isolated so the surrounding Arabic cannot reorder them.

版面整個翻、內容各自保持原方向：照片、logo、數字、電話、代碼、email、金額不翻，
而且要隔離（isolate），避免被周圍阿拉伯文重新排序。

## Workflow / 流程

1. **Direction comes from the language, never the market.** `ar` → `dir="rtl"`;
   `en` → `dir="ltr"`, even for a UAE/KSA storefront. Setting RTL on an English page
   is the most common bug (see [examples](references/examples.md), anti-pattern A).
2. **Classify every element** of the screen as Mirror / Keep / Partial using
   [references/rules.md](references/rules.md). Write the table before changing
   anything; ambiguous items go to the owner, not to a guess.
3. **Phone, OTP, email, card and code fields** follow
   [references/phone-numbers.md](references/phone-numbers.md). This is where most
   RTL defects hide.
4. **Implement with logical properties and isolation**, not hand-written
   `row-reverse` or right-floats (implementation section of `rules.md`).
5. **Verify side by side**: the same screen in EN (LTR) and AR (RTL), every state
   (empty, filled, error, disabled, loading, truncated). Use the QA checklist and the
   bidi test strings in `rules.md`. Report what was checked and what was not run.

## Quick reference / 速查

| Mirror 轉 | Keep 不轉 | Partial 部分轉 |
|---|---|---|
| Page grid, header order, nav order, tab order | Logos (incl. bilingual logo), photos, illustrations, packaging | Phone field: frame and `+` flip (`971+`), digits stay LTR |
| Text alignment to start (right), labels, `*` after label | Digits 0-9 order; Western digits stay Western | Price `AED 122.56`: unit stays together, its slot moves |
| Breadcrumb order + separator `›` → `‹` | Phone, OTP, card, order ID, SKU, promo code, email, URL | Time ranges: Arabic AM/PM `ص`/`م`, start time on the right |
| Back / next / carousel arrows, carousel direction | Vertical chevrons (expand ⌃ / dropdown ⌄) | `22%` in Arabic text renders `%22` - accepted |
| Progress bar fills right → left | Search magnifier, share, trash, plus/minus, cart glyph | English brand/product names inside Arabic: isolated |
| Stepper order `+ 2 −` (minus on the right) | Vehicle and object icons in the reference (truck, scooter) | Email field: right-aligned, value typed LTR |
| Checkbox/toggle at the end (left), badge on image corner flips | Media play/pause direction | Error line: icon on the right, example number LTR |

## Phone numbers in one glance / 電話速查

| | English (LTR) | Arabic (RTL) - reference spec |
|---|---|---|
| Visual | `[🇦🇪 +971] [501234567]` | `[501234567] [971+ 🇦🇪]` |
| Frame: two segments (country / number) | country left, number right | **flips**: number left, country right |
| Flag inside the country segment | left of the code | **flips**: right of the code (outer edge) |
| `+` | before the code: `+971` | **flips**: after the code: `971+` |
| Digits | `971`, `501234567` | **never flip**: `971`, `501234567` (not `179`, not `765432105`) |
| Stored / sent | `+971501234567` (E.164) | identical - direction is presentation only |

Examples: KSA `512345678  966+ 🇸🇦`, Kuwait `51234567  965+ 🇰🇼`, Qatar `33123456  974+ 🇶🇦`.
Wrong: `501234567  +971 🇦🇪` (the `+` did not flip - what AI usually suggests).

Per-country table, wrong-vs-right examples, implementation, validation and error copy:
[references/phone-numbers.md](references/phone-numbers.md).

## Boundaries / 邊界

- The reference wins over generic RTL advice. If you find a case the reference does
  not cover, list it as an open question instead of filling it from AI or other sites.
- Eastern Arabic digits (٠١٢٣) are **not** used in the reference UI; switch only on
  explicit request.
- Do not claim Arabic copy is correct without a native reviewer; flag untranslated
  English words in Arabic UI as copy gaps.
- Screenshots of the reference site are not bundled; examples are reconstructed with
  neutral placeholders.

Start here: [quickstart](references/quickstart.md).
