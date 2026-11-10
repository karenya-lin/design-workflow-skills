---
name: rtl-arabic-ui
description: Arabic/RTL UI rules from a large Middle East retail deployment - what to mirror, keep or partially mirror, with phone, price, time and icon examples. Use when designing, building or reviewing Arabic or RTL screens, EN/AR bilingual flows, or GCC phone inputs.
---

# RTL Arabic UI rules / 阿拉伯文 RTL 介面規則

Read [optional profile](../optional-skill-profile/SKILL.md) when available.

These rules come from a production bilingual (English / Arabic) e-commerce site run
by a very large local Middle East retailer: home, product detail, cart, login
(phone and email). They describe what that site does on purpose, plus the bidi bugs
it shows when direction is set wrong, so a new RTL screen can match a proven market
convention instead of guessing.

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
| Page grid, header order, nav order, tab order | Logos (incl. bilingual logo), photos, illustrations, packaging | Phone field: prefix moves to the right, digits stay LTR |
| Text alignment to start (right), labels, `*` after label | Digits 0-9 order; Western digits stay Western | Price `AED 122.56`: unit stays together, its slot moves |
| Breadcrumb order + separator `›` → `‹` | Phone, OTP, card, order ID, SKU, promo code, email, URL | Time ranges: Arabic AM/PM `ص`/`م`, start time on the right |
| Back / next / carousel arrows, carousel direction | Vertical chevrons (expand ⌃ / dropdown ⌄) | `22%` in Arabic text renders `%22` - accepted |
| Progress bar fills right → left | Search magnifier, share, trash, plus/minus, cart glyph | English brand/product names inside Arabic: isolated |
| Stepper order `+ 2 −` (minus on the right) | Vehicle and object icons in the reference (truck, scooter) | Email field: right-aligned, value typed LTR |
| Checkbox/toggle at the end (left), badge on image corner flips | Media play/pause direction | Error line: icon on the right, example number LTR |

## Phone numbers in one glance / 電話速查

| | English (LTR) | Arabic (RTL) - reference spec |
|---|---|---|
| Visual | `[flag] +971  501234567` | `501234567  971+ [flag]` |
| Prefix side | left | right (start) |
| `+` | before code | renders after code (`971+`) - natural bidi of an un-isolated `+971` in RTL; the reference keeps it |
| Digits | never reversed | never reversed: `501234567`, not `765432105` |
| Stored / sent | `+971501234567` (E.164) | identical - direction is presentation only |

Full rules, the `+971` alternative, validation per country and error copy:
[references/phone-numbers.md](references/phone-numbers.md).

## Boundaries / 邊界

- These are a market reference convention, not a standard. If the project owner or
  brand book says otherwise (for example `+971` instead of `971+`), the owner wins;
  record the decision.
- Eastern Arabic digits (٠١٢٣) are **not** used in the reference UI; switch only on
  explicit request.
- Do not claim Arabic copy is correct without a native reviewer; flag untranslated
  English words in Arabic UI as copy gaps.
- Screenshots of the reference site are not bundled; examples are reconstructed with
  neutral placeholders.

Start here: [quickstart](references/quickstart.md).
