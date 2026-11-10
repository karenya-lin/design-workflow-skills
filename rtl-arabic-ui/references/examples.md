# Examples: correct and broken / 正例與反例

All strings are reconstructed with neutral placeholders (`Brand`, `Partner Bank`).
The broken cases were observed on the reference production site itself, which is why
they are worth remembering: even a mature RTL site regresses when direction is set
in the wrong place.

## Correct: same screen in both languages / 正例

### Cart summary row

| EN (LTR) | AR (RTL) |
|---|---|
| `Subtotal ............... AED 122.56` | `AED 122.56 ............... المجموع الفرعي` |
| `[Checkout]` button full width | `[إتمام الشراء]` full width |
| `Scheduled Delivery (2 items)` / `Today, 6:30 PM - 8:30 PM` | `التوصيل المجدول (2 منتجات)` / `اليوم، 6:30 م - 8:30 م` |
| Threshold bar: `Start ●━━━━ Min. AED 50.00 ━━━ ○ Free delivery AED 150.00` | `AED 150.00 مجاني توصيل ○ ━━━ AED 50.00 الحد الأدنى ━━━━● ابدأ` (fills from the right) |
| Stepper `− 2⌄ +` on the right of the row | stepper `+ 2⌄ −` on the left of the row |
| Badge `22% off` on the image's top-left | badge `%22 خصم` on the image's top-right |

### Header

| EN | AR |
|---|---|
| `[logo] [Today 6:30 PM ▾ Area] [🔍 Search 50,000+ items] [flag] [Login & Register] [🛒 2]` | `[🛒 2] [تسجيل الدخول] [flag] [ابحث بين أكثر من +50,000 منتج 🔍] [Area ▾ اليوم 6:30 م] [logo]` |

The logo is the same image in both. The magnifier glyph is not mirrored; only its
position moves to the left end of the field.

### Phone login

| EN | AR |
|---|---|
| `Log In or Sign Up` | `تسجيل الدخول أو إنشاء حساب` |
| `Phone Number*` | `رقم الهاتف*` |
| `| 🇦🇪 +971  501234567 |` | `| 501234567  971+ 🇦🇪 |` |
| `[Continue]` | `[استمرار]` |
| `──── or ────` | `──── أو ────` |
| `[✉ Login with email]` | `[تسجيل الدخول باستخدام البريد الإلكتروني ✉]` |

## Broken: anti-patterns / 反例

### A. English page rendered RTL (direction taken from the market) / 英文頁被設成 RTL

Cause: `dir="rtl"` was set by country (UAE) instead of language (`en`).
Every mixed-script string reorders.

| Intended (EN) | What shipped | Why |
|---|---|---|
| `Search 50,000+ items` | `items +50,000 Search` | words laid out right to left, number moved |
| `6 PM - 8 PM` | `PM - 8 PM 6` | leading digit pushed to the end |
| `More From Brand` | `Brand More From` | word order reversed |
| `60 mins` | `mins 60` | number and unit swapped |
| `OFF 22%` | `off 22%` with `%` drifting | neutral `%` resolved to RTL |
| `This product features... ` bullet | text right-aligned, bullet on the right, `...The fat content` | ellipsis and bullet on the wrong end |
| `Product Name Spread, 580g` + share icon | `580g` collides with the share icon | icon slot mirrored, text not |

Fix: `dir` from the UI language. A UAE customer reading English gets LTR.

### B. Latin text inside an Arabic page without isolation / 阿拉伯頁中的英文沒隔離

| Intended | What shipped | Fix |
|---|---|---|
| `20% off up to AED 100 with Partner Bank cards` (promo strip on AR home) | `Off up to AED 100 with Partner Bank Cards 20%` - the `20%` jumped to the end | translate, or wrap the English sentence in `<bdi>` / `dir="auto"` |
| `Brand 85 inch 4K UHD Smart TV...` (2-line clamp) | `...UHD Smart TV` with the ellipsis at the start | `dir="auto"` on product titles |
| `Deals of the day` / `See All` | English headings left in an Arabic page | translate; English UI words in AR are copy gaps |

### C. Untranslated method words / 方式名稱沒翻

`تسجيل الدخول باستخدام email` and `... phone` read as half-translated. Use
`البريد الإلكتروني` and `رقم الهاتف`.

### D. Things that look wrong but are correct / 看起來怪但正確

| Rendering in AR | Why it is right |
|---|---|
| `%22 خصم` | logical `خصم 22%`; bidi places `%` on the left |
| `971+` | logical `+971` in an RTL run (reference convention; see phone-numbers.md) |
| `AED 122.56` with Latin letters on an Arabic page | currency code is an ISO identifier kept as one LTR unit |
| Western digits `6:30` next to Arabic `م` | the reference never uses Eastern Arabic digits |
| Packaging photo shows Latin text in its original orientation | photos are not mirrored |
