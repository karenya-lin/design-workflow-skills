# Phone numbers in RTL / RTL 電話號碼

Phone fields are where RTL goes wrong most often. This file records the reference
spec (a very large Middle East retailer's EN/AR login), validation and copy.

**Single source of truth.** The reference differs from what AI assistants and most
international sites recommend (they isolate the code so it reads `+971` in Arabic).
Follow the reference, not them. Do not "fix" `971+` back to `+971`.

## 1. The rule in three lines / 三句規則

1. **The frame flips: two segments swap sides.** Segment A = country (flag + code),
   segment B = national number. EN: `[A][B]`. AR: `[B][A]`.
2. **The `+` flips.** Inside segment A the `+` moves to the other side of the code
   and the flag moves to the outer edge: EN `🇦🇪 +971`, AR `971+ 🇦🇪`.
3. **The digits never flip.** `971` stays `971`, `501234567` stays `501234567`, in
   both segments.

| What | Flips? | EN (LTR) | AR (RTL) |
|---|---|---|---|
| Frame: segment order | Yes | `[🇦🇪 +971] [501234567]` | `[501234567] [971+ 🇦🇪]` |
| Segment A: flag position | Yes | flag on the left | flag on the right |
| Segment A: `+` position | **Yes** | `+971` | `971+` |
| Segment A: code digits | No | `971` | `971` (not `179`) |
| Segment B: number digits | No | `501234567` | `501234567` (not `765432105`) |
| Label `*` | follows text end | `Phone Number*` | `رقم الهاتف*` |
| Stored / sent value | No | `+971501234567` | `+971501234567` |

## 2. Examples / 範例

Visual, side by side (`|` is the input border):

```
EN  | 🇦🇪 +971   501234567                         |
AR  |                         501234567   971+ 🇦🇪 |
```

Per country (synthetic numbers):

| Country | EN shows | AR shows | Stored (E.164) |
|---|---|---|---|
| UAE | `🇦🇪 +971  501234567` | `501234567  971+ 🇦🇪` | `+971501234567` |
| Saudi Arabia | `🇸🇦 +966  512345678` | `512345678  966+ 🇸🇦` | `+966512345678` |
| Kuwait | `🇰🇼 +965  51234567` | `51234567  965+ 🇰🇼` | `+96551234567` |
| Qatar | `🇶🇦 +974  33123456` | `33123456  974+ 🇶🇦` | `+97433123456` |
| Bahrain | `🇧🇭 +973  36123456` | `36123456  973+ 🇧🇭` | `+97336123456` |
| Oman | `🇴🇲 +968  92123456` | `92123456  968+ 🇴🇲` | `+96892123456` |

Wrong in AR, and why:

| Shown in AR | Problem |
|---|---|
| `501234567  +971 🇦🇪` | `+` did not flip: code was isolated as LTR (common AI / international-site advice) |
| `🇦🇪 971+  501234567` | frame did not flip: segments still in EN order |
| `765432105  971+ 🇦🇪` | number digits reversed |
| `501234567  179+ 🇦🇪` | code digits reversed |
| `501234567  🇦🇪 971+` | flag not on the outer edge of segment A |
| `971+501234567` in the database | display string stored instead of E.164 |

Same rule wherever a phone number is shown in Arabic, not only in the input:
OTP screen, profile, order summary, error copy. Example: the Arabic sentence "code
sent to" followed by logical `+971 501234567` renders the number part as
`501234567 971+`, number on the left, code with `+` on the right.

## 3. How the reference produces `971+` / 參考網站怎麼做出 `971+`

The reference renders the code as plain text inside the RTL flow, with no isolation.
By the Unicode bidi algorithm a leading `+` before digits in an RTL run takes the
paragraph direction, so logical `+971` displays as `971+` while `971` keeps its order.
The reference shows this on the empty field, filled field and error state.

```html
<span class="phone-code">+971</span>          <!-- inside dir="rtl": shows 971+  (correct) -->
<bdi dir="ltr" class="phone-code">+971</bdi>  <!-- shows +971 in AR  (do not use) -->
```

Keep the logical string `+971` in code and data; let the RTL flow do the flip. Never
hard-code a reversed string such as `"971+"`, because it would also show reversed in
the English UI.

## 4. Implementation / 實作

```html
<label for="phone">رقم الهاتف*</label>
<div class="phone-field">               <!-- inherits dir="rtl" -->
  <button class="phone-country" aria-label="رمز الدولة">
    <img src="flag-ae.svg" alt=""> <span class="phone-code">+971</span>
  </button>
  <input id="phone" type="tel" dir="ltr" inputmode="tel"
         autocomplete="tel-national" placeholder="501234567">
</div>
```

- `type="tel"` + `inputmode="tel"` opens the phone keypad; `dir="ltr"` keeps digits,
  caret movement and paste in LTR order.
- The country button is a separate element, so the flag/code group sits at the
  start (right) automatically in RTL.
- Normalize before validation: strip spaces, dashes and a leading trunk `0`
  (`0501234567` → `501234567`); convert Eastern Arabic digits typed from an Arabic
  keyboard (`٥٠١٢٣٤٥٦٧`) to `501234567`.
- Validate with a maintained library (for example libphonenumber) rather than
  hand-written lengths; numbering plans change.

## 5. Validation and examples / 驗證與範例

Lengths below are national significant numbers for mobiles, as a starting point.
Confirm against the current numbering plan or the library before shipping.

| Country | Code | Mobile pattern | Example (synthetic) | Source |
|---|---|---|---|---|
| UAE | +971 | 9 digits, starts with `5` | `501234567` | Reference error copy uses this example |
| Saudi Arabia | +966 | 9 digits, starts with `5` | `512345678` | General numbering plan |
| Kuwait | +965 | 8 digits | `51234567` | General numbering plan |
| Qatar | +974 | 8 digits | `33123456` | General numbering plan |
| Bahrain | +973 | 8 digits | `36123456` | General numbering plan |
| Oman | +968 | 8 digits | `92123456` | General numbering plan |

Reference behaviour seen on screen:
- Empty field: code and flag shown, Continue disabled.
- Valid UAE mobile typed: Continue enabled.
- `+971` with `123456789` (does not start with `5`): field border and label turn
  red, error line appears, Continue disabled.

Use synthetic numbers such as `501234567` in designs and docs, never a real person's
number.

## 6. Error copy / 錯誤文案

| EN | AR (as used by the reference) |
|---|---|
| Invalid phone number format. Please use the correct format (501234567). | صيغة رقم الهاتف غير صحيحة. يرجى استخدام الصيغة الصحيحة (501234567). |

- The example number inside the Arabic sentence stays LTR digits; parentheses are
  mirrored by bidi automatically - do not type them reversed.
- Error icon sits at the start (right) of the line in AR.
- Change the example per selected country (`512345678` for +966, and so on).

## 7. Switching phone ↔ email / 切換電話與 email

The login offers "Login with email" under the phone field and "Login with phone" under
the email field. In AR:
- Icon on the right of the button label.
- Translate the method word too. The reference shows
  `تسجيل الدخول باستخدام email` / `... phone` with English words left in; treat that as
  a copy gap, not a rule. Prefer `البريد الإلكتروني` / `رقم الهاتف`.
- Email value is LTR; placeholder `you@example.com` is right-aligned with the field.

## 8. Phone QA / 電話驗收

- [ ] AR: flag and code on the right, number to their left, digits not reversed.
- [ ] AR shows `971+` (the `+` flipped, digits not) on every screen: empty, filled, error, OTP, profile, order summary.
- [ ] Frame flipped: number segment on the left, country segment (code + flag) on the right, flag at the outer edge.
- [ ] Typing, deleting, caret arrows and paste behave LTR inside the number.
- [ ] Leading `0`, spaces and Eastern Arabic digits are normalized.
- [ ] Error state: label and border red, icon on the right, example matches country.
- [ ] Submitted value is E.164 in both languages.
- [ ] Screen reader announces the label, the country code and the number digit groups.
