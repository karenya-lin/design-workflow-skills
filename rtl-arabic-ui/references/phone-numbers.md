# Phone numbers in RTL / RTL 電話號碼

Phone fields are where RTL goes wrong most often: the field mirrors, the number must
not. This file records the reference spec (a very large Middle East retailer's
EN/AR login), the alternative, validation and copy.

## 1. Anatomy / 結構

A phone field has four parts. Only the order of the parts changes; parts 3 and 4
never change their inner direction.

| # | Part | EN (LTR) | AR (RTL) |
|---|---|---|---|
| 1 | Label + required mark | `Phone Number*` above, left | `رقم الهاتف*` above, right |
| 2 | Country flag | far left | far right |
| 3 | Country code | `+971` | `971+` (see section 2) |
| 4 | National number | `501234567`, typed left → right | `501234567`, typed left → right, block sits left of the code |
| - | Error line | `(!) Invalid phone number format...` left | `(!)` on the right, Arabic text right-aligned |
| - | Continue button | disabled until valid | same |

Visual, side by side (`|` is the input border):

```
EN  | 🇦🇪 +971   501234567                         |
AR  |                         501234567   971+ 🇦🇪 |
```

Rules that never bend:
- Digits are never reversed. `501234567` must not appear as `765432105`.
- Spaces or grouping you add for readability stay in LTR order (`50 123 4567`).
- The value submitted and stored is identical in both languages, E.164:
  `+971501234567`. Direction is presentation only.

## 2. The `+` sign: two conventions / 加號位置

**Reference spec (default for this skill): `971+` in Arabic.**
The reference renders the code as plain text inside the RTL field without isolating
it. By the Unicode bidi algorithm, a leading `+` before digits in an RTL paragraph
resolves to the paragraph direction, so `+971` displays as `971+`. The reference
keeps this in production on both the empty field and the error state, so Arabic
users of that market see it every day.

To reproduce it, render the code in the RTL flow with no `dir="ltr"` / `<bdi>`:

```html
<span class="phone-code">+971</span>   <!-- inside dir="rtl": shows 971+ -->
```

**Alternative: `+971` in Arabic.** Some brand books and many international apps
isolate the code as LTR so it reads `+971` everywhere:

```html
<bdi dir="ltr" class="phone-code">+971</bdi>
```

Choose one per product and record it; do not mix both in one flow. If the owner has
not decided, use the reference spec and list the choice as an open decision.

## 3. Implementation / 實作

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

## 4. Validation and examples / 驗證與範例

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

## 5. Error copy / 錯誤文案

| EN | AR (as used by the reference) |
|---|---|
| Invalid phone number format. Please use the correct format (501234567). | صيغة رقم الهاتف غير صحيحة. يرجى استخدام الصيغة الصحيحة (501234567). |

- The example number inside the Arabic sentence stays LTR digits; parentheses are
  mirrored by bidi automatically - do not type them reversed.
- Error icon sits at the start (right) of the line in AR.
- Change the example per selected country (`512345678` for +966, and so on).

## 6. Switching phone ↔ email / 切換電話與 email

The login offers "Login with email" under the phone field and "Login with phone" under
the email field. In AR:
- Icon on the right of the button label.
- Translate the method word too. The reference shows
  `تسجيل الدخول باستخدام email` / `... phone` with English words left in; treat that as
  a copy gap, not a rule. Prefer `البريد الإلكتروني` / `رقم الهاتف`.
- Email value is LTR; placeholder `you@example.com` is right-aligned with the field.

## 7. Phone QA / 電話驗收

- [ ] AR: flag and code on the right, number to their left, digits not reversed.
- [ ] `+` position matches the chosen convention (`971+` reference / `+971` alternative) on every screen, including error and OTP-resend screens.
- [ ] Typing, deleting, caret arrows and paste behave LTR inside the number.
- [ ] Leading `0`, spaces and Eastern Arabic digits are normalized.
- [ ] Error state: label and border red, icon on the right, example matches country.
- [ ] Submitted value is E.164 in both languages.
- [ ] Screen reader announces the label, the country code and the number digit groups.
