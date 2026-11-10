# RTL rules: mirror, keep, partial / 轉、不轉、部分轉

Source: a production EN/AR e-commerce site of a very large Middle East retailer,
compared screen by screen in both languages (home, product detail, quantity picker,
cart, phone login, email login, validation error). "Observed" means the reference
does it; "Recommended" means general RTL practice where the reference showed nothing.

Contents: 1 Mirror · 2 Keep · 3 Partial · 4 Numbers, prices, time · 5 Implementation · 6 QA checklist · 7 Bidi test strings

## 1. Mirror / 要轉

| Element | LTR (EN) | RTL (AR) | Status |
|---|---|---|---|
| Page direction | `dir="ltr"` | `dir="rtl"` on `<html>` | Observed |
| Header | logo left · search middle · flag, account, cart right | logo right · search middle · flag, account, cart left | Observed |
| Top tabs (delivery modes) | 1 2 3 4 from the left | 1 2 3 4 from the right | Observed |
| Main nav categories | first item left | first item right; icon of "all categories" on the right | Observed |
| Breadcrumb | `Home › Cart` | `الرئيسية ‹ العربة` (order and chevron flip) | Observed |
| Two-column layout | content left, summary right | content right, summary left | Observed |
| Section header row | title left · "See all" right | title right · "See all" left | Observed |
| Text alignment | left | right (`text-align: start`) | Observed |
| Form label + required mark | `Phone Number*` left-aligned | `رقم الهاتف*` right-aligned; `*` stays after the text, so it shows on its left | Observed |
| Search field | brand mark + placeholder left, magnifier right | brand mark + placeholder right, magnifier left | Observed |
| Quantity stepper | `−  2⌄  +` | `+  2⌄  −` (minus on the right = start) | Observed |
| Checkbox rows | label left, checkbox far right | label right, checkbox far left | Observed |
| Progress / threshold bar | start left, goal right, fills → | start right, goal left, fills ← | Observed |
| Discount badge on product image | top-left corner | top-right corner | Observed |
| Back button on full-screen flows | top-left, `‹` | top-right, `›` | Observed |
| Carousel / auto-scroll strip | arrow on left, scrolls → | arrow on right, scrolls ← | Observed |
| Bulleted list | bullet left of text | bullet right of text | Observed |
| Error line under a field | `(!)` icon left, text left | `(!)` icon right, text right | Observed |
| Drawers, side sheets, toasts anchored to a side | from inline-start or end | same logical side, so physically opposite | Recommended |
| Asymmetric padding, shadows offset in x, one-side border radius | as designed | mirrored via logical properties | Recommended |

Directional icons that mirror (they point "forward/back" in reading order): back,
next, chevron left/right, breadcrumb separator, carousel arrows, "send", "reply",
"undo/redo" arrows, text-indent, list-with-bullets, progress "start" arrow.

## 2. Keep / 不轉

| Element | Why | Status |
|---|---|---|
| Logo, including a logo that already contains Arabic and Latin text | brand asset | Observed |
| Product photos, packaging, illustrations, background tile art | real-world images; flipping makes text on packs unreadable | Observed (art keeps orientation; only the tile order runs RTL) |
| Digits order, decimal point, thousands comma (`50,000`) | numbers are read LTR in Arabic too | Observed |
| Western digits 0-9 | reference never switches to Eastern Arabic ٠-٩ | Observed |
| Phone numbers, OTP, card numbers, order IDs, SKUs, promo codes (`SAVE15`), emails, URLs | identifiers; reordering corrupts them | Observed (phone, email) / Recommended (others) |
| Vertical chevrons: accordion `⌃`, dropdown `⌄`, accordion `+` | vertical meaning has no reading direction | Observed |
| Magnifier, share, trash, plus, minus, cart, user, info `(i)` | symmetric or non-directional | Observed |
| Vehicle/object icons (van, scooter, truck, lightning) | the reference keeps them unmirrored | Observed - project may decide otherwise |
| Media controls (play, fast-forward on a video timeline) | they describe tape direction, not reading direction | Recommended |
| Clock hands, check marks | physical conventions | Recommended |
| Country flags | national symbols | Observed |

## 3. Partial / 部分轉

Container mirrors, inner content keeps its own direction.

| Element | RTL rendering | Rule |
|---|---|---|
| Phone input | `[ 501234567     971+ 🇦🇪 ]` | prefix group at start (right); digits LTR. See [phone-numbers.md](phone-numbers.md) |
| Email input | placeholder `you@example.com` right-aligned | box and placeholder align right; typed value is LTR (`dir="ltr"` on the value or `dir="auto"`) |
| Price in a sentence or summary | `AED 122.56` | currency + amount is one LTR unit; only its slot in the row moves |
| Price on a card | big `49`, small `.98` and `AED` stacked | same composition as EN; card content is right-aligned |
| Strikethrough old price | `AED 63.98` under the new price | same as EN, aligned to start |
| Percent in Arabic text | logical `خصم 22%` shows as `%22 خصم` | accepted bidi result in the reference; do not "fix" by hand-reversing |
| Count inside Arabic sentence | `ابحث بين أكثر من +50,000 منتج` | number kept as is; let bidi place it |
| Duration | `27 دقيقة`, `60 دقيقة` | number + Arabic unit; never `mins 27` |
| Time and range | `اليوم 6:30 م - 8:30 م` | Western digits, Arabic `ص` (AM) / `م` (PM), earlier time on the right |
| Relative day | `غداً 10:00 ص`, `اليوم 6:30 م` | Arabic word for today/tomorrow |
| Product name | translated: `زبادي يوناني أصلي، 1 كغ` | translate names and units (`كغ`, `غرام`); keep brand Latin only if the brand has no Arabic form |
| English brand inside Arabic text | `من <bdi>Brand</bdi>` | wrap in `<bdi>` or `dir="auto"` so punctuation does not jump |
| Truncated text | ellipsis on the left end of Arabic | English strings in an Arabic page need `dir="auto"` or the `...` lands at the wrong end |

## 4. Numbers, prices, time / 數字、金額、時間

- Digits: Western (0-9) everywhere in the reference, including Arabic pages.
  In code, force it: `new Intl.NumberFormat('ar-AE-u-nu-latn')`,
  `new Intl.DateTimeFormat('ar-AE-u-nu-latn', {...})`.
- Currency: Latin ISO code `AED` / `SAR`, written before the amount as a unit
  (`AED 24.99`). On cards the code can sit small next to the amount. Do not split
  code and amount across bidi runs.
- Decimal separator `.`; thousands separator `,`.
- Percent: let the bidi algorithm place `%`; do not type a reversed string.
- Unit price: `AED 43.09 per Kg` in EN; translate the unit word in AR.
- Dates: `Nov 07` style dates are localized to Arabic month names in AR; digits stay Western.

## 5. Implementation / 實作

HTML
- `<html lang="ar" dir="rtl">` derived from the UI language. A country selector
  must not set direction.
- `<bdi>` around user names, brand names, product names that may be Latin.
- `dir="ltr"` on values that are identifiers: phone digits, OTP boxes, card number,
  email value, URL, promo code. Keep `text-align` from the page if the design
  wants them right-aligned (email field in the reference).

CSS
- Logical properties only: `margin-inline-start`, `padding-inline-end`,
  `inset-inline-start`, `border-start-start-radius`, `text-align: start`.
- Flex/grid rows follow `dir` automatically; do not add `flex-direction: row-reverse`
  for RTL (it double-flips when someone later fixes `dir`).
- Directional icon class, applied only to icons from list 1:
  `:dir(rtl) .icon--directional { transform: scaleX(-1); }`
  (or `[dir="rtl"] .icon--directional` for older browsers).
- Transforms and animations with x-offsets (slide-in, carousel) need an RTL sign flip.

Design files (Figma or similar)
- Keep separate EN and AR frames for each state; RTL is not one global toggle.
- Directional icons: keep a mirrored variant instead of rotating instances by hand.
- Annotate Partial elements (phone, email, price) on the AR frame so developers do
  not mirror their contents.

## 6. QA checklist / 驗收清單

Run every item on the EN and the AR version of the same state.

- [ ] `dir` follows the language: AR page is `rtl`, EN page is `ltr`, for every market.
- [ ] Header, nav, tabs, breadcrumb, two-column layout mirrored.
- [ ] Every directional icon mirrored; no non-directional icon mirrored.
- [ ] Logos, photos, flags not mirrored.
- [ ] Phone: prefix on the right, digits not reversed, stored value E.164.
- [ ] Email, OTP, promo code, order ID typed and displayed LTR.
- [ ] Prices `AED 0.00` stay one unit; totals align to start of their column.
- [ ] Times use `ص`/`م`, earlier time on the right in a range.
- [ ] No untranslated English words inside Arabic buttons or headings (copy gap list).
- [ ] Error, empty, disabled, loading and truncated states checked in AR.
- [ ] Ellipsis on the correct end for Arabic and for Latin strings in Arabic pages.
- [ ] Keyboard focus order and screen-reader reading order follow RTL.
- [ ] Report lists what was not run (device, browser, screen reader).

## 7. Bidi test strings / 測試字串

Paste these into the AR build; each one has a known correct rendering.

| Input (logical) | Must render in RTL as |
|---|---|
| `اليوم 6:30 م - 8:30 م` | earlier time rightmost, digits intact |
| `ابحث بين أكثر من +50,000 منتج` | `+50,000` intact between Arabic words |
| `خصم 22%` | `%22 خصم` (reference behaviour) |
| `AED 122.56` inside Arabic sentence | `AED 122.56` intact as a unit |
| `من <bdi>Brand Name</bdi>` | `Brand Name` intact, Arabic `من` on its right |
| phone `501234567` with code `+971` | `501234567  971+` with flag at far right |
| email `user@example.com` in a `dir="ltr"` value | `user@example.com` intact |
| Latin product name longer than the line, with `dir="auto"` | ellipsis at the right end of the Latin text |
