# 作者的 UX 準則檢查 / The author's UX principles checked here

這份清單是 Karenya Lin 自己的 UI/UX 判斷，`ui-design-review` 在設計還原之外額外檢查這些項目。每一項都是「通常建議」，不是絕對規則：設計真的只能那樣做時可以保留，但要寫成明確的例外、說明原因，並在同一個產品裡保持一致。審查者不能默默放過，也不能替使用者決定例外。

This list is Karenya Lin's own UI/UX judgement, and `ui-design-review` checks it on top of design fidelity. Every item is a recommendation, not an absolute: when a design can only work one way, it may stay that way, but the exception is written down with its reason and kept consistent across the product. The reviewer never waives an item silently and never decides an exception for the person.

回報格式沿用 SKILL.md 的規則：每個發現帶穩定編號（下方的 KUX 編號）、位置、觀察到的證據、影響與建議修正。沒有瀏覽器畫面就標未驗，不推測版面。

Findings follow the SKILL.md rules: a stable ID (the KUX ids below), location, observed evidence, impact and a proposed correction. Without browser evidence, mark layout items unverified instead of guessing.

## KUX-01 相關內容上下排，依 F 形閱讀 / Related content stacks vertically, reading in an F

**檢查什麼。** 桌機寬度下，標題與內容、標籤與數值、圖與它的說明這類相關的一對，是否被拉成左右兩欄。特別注意容器寬度是 100%，或用較大的百分比把兩邊撐開的情況：眼睛要橫越整個寬度再折回來，兩件事的關聯就接不起來。

**What to check.** At desktop widths, whether a related pair (a title and its content, a label and its value, a figure and its explanation) is spread into a left and a right column. Watch for containers at 100% width, or percentage widths that pull the two sides apart: the eye has to cross the full width and come back, and the connection between the two never forms.

**怎麼判斷。** 相關的東西傾向上下排。外層容器若是寫死的固定寬度、沒有太長，而且兩者中間的間隔在 40px 以內，還算可讀，但仍然不建議。標題和內容通常要靠近，讓人一眼看出它們是一組。

**How to judge.** Related things lean towards stacking. When the outer container has a fixed width that is not too long, and the gap between the two sits within about 40px, it still reads, but it is still not recommended. A title and its content belong close together, so a reader sees them as one unit.

**怎麼回報。** 「此 UI 把相關的標題與內容左右分開，建議改成上下排列。」附位置、截圖與量到的容器寬度和間隔。

**How to report.** "This UI spreads a related title and its content left and right; suggest stacking them vertically." Attach the location, a capture, and the measured container width and gap.

**例外。** 工具列、資料表格的欄位、以並列比較為目的的畫面，本來就是左右排。設計上真的只能左右時可以保留，寫成例外並說明原因。

**Exceptions.** Toolbars, table columns and side-by-side comparisons are horizontal by nature. When a design can only be horizontal, keep it, and record the exception with its reason.

**依據。** F 形才是讓人在寬螢幕上找得到兩件事之間關聯的路。Z 形要眼睛橫越整個寬度再折回來，眼動研究發現那樣掃視沒有效率。見 [畫面怎麼被閱讀](https://karenyalin.com/zh/blog/ux-principles-i-keep) / [How a screen gets read](https://karenyalin.com/en/blog/ux-principles-i-keep)。

## KUX-02 正向按鈕在右邊 / The positive action sits on the right

**檢查什麼。** 兩個答案的對話框、通知、表單頁尾。由左到右的版面裡，往前走的按鈕（確認、送出、同意）是否在右邊，而且就是填色的主要按鈕。

**What to check.** Dialogs, notices and form footers with two answers. In a left-to-right layout, whether the button that goes forward (confirm, submit, agree) sits on the right and is also the filled primary button.

**逐項。** 句子和按鈕的順序一致，先是問題，再是往前走的選擇。填色的按鈕就是最後一顆按鈕。Tab 鍵照畫面上的順序走訪按鈕，DOM 順序和視覺順序一致。兩個答案都看得到，拒絕不藏成一個小連結。破壞性的動作預設永遠不放在最後一個位置。

**Item by item.** The sentence and the buttons read in the same order: the question first, then the way forward. The filled button and the last button are the same button. Tab visits the buttons in the order they appear, so DOM order matches visual order. Both answers stay visible, and the decline is never hidden behind a small link. A destructive action never takes the last position by default.

**怎麼回報。** 「正向按鈕在左邊，建議移到右邊，讓句子與按鈕的順序一致。」

**How to report.** "The positive button sits on the left; suggest moving it to the right so the sentence and the buttons read in the same order."

**例外。** 老系統或既有平台慣例明確要求正向在左（例如沿用多年的桌面軟體排列，或從舊系統延伸出來的畫面）時可以保留，寫成既有取捨，並在整個產品裡保持同一種順序。由右到左的語言鏡射整個版面。

**Exceptions.** A legacy system or an established platform convention that places the positive action on the left (long-standing desktop software, or screens extended from an older system) may keep it, recorded as an accepted trade-off and kept to one order across the product. Right-to-left languages mirror the whole layout.

**依據。** [為什麼正向按鈕放右邊](https://karenyalin.com/zh/blog/positive-action-on-the-right) / [Why the positive button goes on the right](https://karenyalin.com/en/blog/positive-action-on-the-right)。

## KUX-03 驗證碼對話框 / Verification code dialogs

**檢查什麼。** 一次性驗證碼的對話框是否照這個順序。清楚的標題說這一步是做什麼。副標題說驗證碼寄到哪裡，而且把那個信箱或號碼遮掉一部分。輸入欄能一次貼上整組驗證碼並分配到每一格，最後一碼進來就驗證。最後一行說什麼時候可以重送，並且倒數給人看。

**What to check.** Whether a one-time code dialog keeps this order: a clear title that says what the step is for; a subtitle that says where the code went, with part of that address masked; a field that accepts the whole code in one paste, spreads it across the boxes and verifies on the last digit; a last line that says when the code can be sent again, counting down so the person can see the button coming back.

**怎麼回報。** 指出缺少的那一部分，例如「貼上整組驗證碼只填入第一格，建議接受整組貼上並在最後一碼驗證」。

**How to report.** Name the missing part, for example "Pasting the whole code fills only the first box; suggest accepting the whole paste and verifying on the last digit."

**例外。** 用連結而非驗證碼完成驗證的信件，不需要輸入格的檢查。

**Exceptions.** An email that verifies through a link instead of a code needs no input-field check.

**依據。** [說清楚寄到哪裡、整組驗證碼一次貼上、說清楚什麼時候可以重送](https://karenyalin.com/zh/blog/ux-principles-i-keep) / [Say where the code went, paste the whole code, say when it can be sent again](https://karenyalin.com/en/blog/ux-principles-i-keep)。

## KUX-04 密碼與登入訊息 / Passwords and the sign-in message

**檢查什麼。** 原本的密碼永遠不顯示。更改密碼時先要舊密碼再要新密碼，兩者在送出時一起檢查，表單不提前透露舊密碼對不對。註冊與登入失敗的訊息只說帳號或密碼有誤，不說是哪一個。

**What to check.** The original password is never shown. A change-password form asks for the old password first and then the new one, checks them together on submit, and gives no early sign of whether the old password is correct. A failed sign-up or sign-in says the account or the password is wrong and stops there, never naming which.

**怎麼回報。** 「登入失敗訊息指出是密碼錯誤，建議改成帳號或密碼有誤，不透露是哪一個。」

**How to report.** "The sign-in error says the password is wrong; suggest 'account or password is incorrect', without naming which."

**例外。** 沒有。這幾條來自資安訓練，放寬就等於把資訊交給猜測帳號的人。

**Exceptions.** None. These come from security training, and relaxing them hands information to whoever is probing accounts.

**依據。** [密碼與登入時的訊息](https://karenyalin.com/zh/blog/ux-principles-i-keep) / [Passwords and the sign-in message](https://karenyalin.com/en/blog/ux-principles-i-keep)。

## KUX-05 信用卡表單防呆 / Card payment form error-proofing

**檢查什麼。** 審查範圍裡有信用卡表單時才檢查。安全碼永遠不儲存，顯示卡號最多露出前六碼和末四碼，能用託管欄位就讓卡號不經過自己的頁面。九道防呆機制：正確的鍵盤與自動填入、4-4-4-4 分組、從前幾碼判斷卡別、Luhn 檢查、照卡面的有效期限、標出位置的安全碼提示、離開欄位才驗證、一次點擊只扣一次款、扣款前的確認。可以的話優先提供 Apple Pay、Google Pay 或 Payment Request API。

**What to check.** Only when the reviewed scope contains a card form. The security code is never stored, a displayed number shows at most the first six and last four digits, and a hosted field keeps the number off the page where possible. Nine error-proofing mechanisms: keyboard and autofill, 4-4-4-4 grouping, brand from the first digits, a Luhn check, expiry as printed, a placed security-code hint, validation on leaving the field, one tap one charge, and a confirmation before the charge. Offer Apple Pay, Google Pay or the Payment Request API where possible.

**怎麼回報。** 列出缺少的機制，一項一條。

**How to report.** List the missing mechanisms, one line each.

**依據。** [信用卡表單的防呆](https://karenyalin.com/zh/blog/card-payment-form-error-proofing) / [Card payment form error-proofing](https://karenyalin.com/en/blog/card-payment-form-error-proofing)。

## KUX-06 該做元件就做元件 / Shared components where markup repeats

**檢查什麼。** 同一個樣式或行為的東西，是否用好幾份各自的標記與樣式做出來，或者專案裡已經有元件卻沒有使用。

**What to check.** Whether the same pattern is built several times from separate markup and styles, and whether a component the project already has was left unused.

**怎麼回報。** 列出重複的實例與位置，建議用一個元件統一管理。已有元件的，建議改用該元件。

**How to report.** List the repeated instances and their locations, and propose one component that manages them; where a component exists, propose using it.

**例外。** 只出現一次、往後也不會重複的畫面可以不做元件，但要說明它是一次性的。

**Exceptions.** A screen that appears once and will not recur may stay without a component, with a note that it is a one-off.

## KUX-07 變數與色彩 token / Variables and colour tokens

**檢查什麼。** 顏色、間距、字級是否引用共用的變數或 token。寫死的值是否重複了既有的 token。

**What to check.** Whether colour, spacing and type sizes reference shared variables or tokens, and whether hard-coded values duplicate a token that already exists.

**怎麼回報。** 列出可以改成變數的值與對應的 token。沒有對應 token 的，建議新增一個 token，不要再寫一個例外值。

**How to report.** List the values that can become variables and the token each maps to; where no token exists, propose adding one instead of another one-off value.

**例外。** 設計上需要的例外，標成明確的例外：寫出名稱與原因。除此之外盡可能用統一的變數管理，不讓例外越積越多。

**Exceptions.** An exception the design needs is marked as an explicit exception, with its name and reason. Everything else is managed through shared variables as far as possible, so exceptions do not accumulate.

## 一覽 / At a glance

| 編號 / ID | 檢查項目 | Check |
|---|---|---|
| KUX-01 | 相關內容上下排，不用大比例寬度左右拉開 | Related content stacks vertically, no wide left-right spreads |
| KUX-02 | 正向按鈕在右邊，填色與位置一致 | Positive action on the right, fill and position agree |
| KUX-03 | 驗證碼對話框：標題、遮罩的寄送位置、整組貼上、重送倒數 | Verification dialog: title, masked destination, whole-code paste, resend countdown |
| KUX-04 | 密碼不顯示、舊密碼先問送出才驗、登入訊息不說是哪個錯 | Password never shown, old first and checked on submit, vague sign-in message |
| KUX-05 | 信用卡表單：PCI 限制與九道防呆 | Card form: PCI limits and nine error-proofing mechanisms |
| KUX-06 | 重複的標記做成元件統一管理 | Repeated markup becomes a shared component |
| KUX-07 | 顏色、間距、字級走變數與 token，例外要標明 | Colour, spacing and type through variables and tokens, exceptions marked |

[回到 skill 規則 / Skill instructions](../SKILL.md) · [圖解開始 / Quickstart](quickstart.md)
