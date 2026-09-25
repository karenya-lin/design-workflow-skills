# Public commit identity / 公開 commit 身分

This repository is public. Git keeps an author and a committer email on every commit, and both are visible to anyone who clones or browses the history. File contents can be scrubbed; commit metadata is a separate surface and needs its own rule.

這個 repo 是公開的。Git 在每個 commit 上都記著作者和提交者的信箱，任何人 clone 或瀏覽歷史都看得到。檔案內容可以清理，commit 的中繼資料是另一個外露面，要有自己的規則。

## The rule / 規則

- Every commit that reaches this repository uses the owner's GitHub noreply address as both author and committer: `99601006+karenya-lin@users.noreply.github.com`, name `Karenya Lin`.
- No personal address, work address or connector default identity.
- 進到這個 repo 的每個 commit，作者和提交者都用擁有者的 GitHub noreply 信箱，名字 `Karenya Lin`。不用個人信箱、公司信箱，也不用 connector 的預設身分。

## Turn the guard on / 開啟守門

Once per clone:

```sh
git config core.hooksPath .githooks
git config user.name "Karenya Lin"
git config user.email "99601006+karenya-lin@users.noreply.github.com"
```

`.githooks/pre-commit` refuses a commit made with any other identity. `.githooks/pre-push` scans every commit a push would publish and refuses the push if one of them carries another address, which catches commits made before the hook was on or on another machine. Neither hook rewrites anything. `SKIP_IDENTITY_GUARD=1` skips them, and only the owner decides that.

`.githooks/pre-commit` 會拒絕用其他身分做的 commit。`.githooks/pre-push` 會掃描這次 push 會公開的每個 commit，只要有一個帶著別的信箱就拒絕，這能抓到守門開啟前或在別台機器做的 commit。兩個 hook 都不會改寫任何東西。`SKIP_IDENTITY_GUARD=1` 可以略過，只有擁有者能決定。

## Tools that cannot set the identity / 無法設定身分的工具

A hosted connector that commits on the owner's behalf may write its own default email and offer no way to change it. Such a tool must not publish commits to this repository. Prepare the change with it, then commit and push from a clone where the identity above is set and the hooks are on.

代替擁有者提交的雲端 connector 可能寫入它自己的預設信箱，而且無法更改。這種工具不能直接對這個 repo 發布 commit。用它準備變更，再從已設定上述身分、已開啟 hook 的 clone 提交與推送。

## Commits GitHub makes for you / GitHub 代你產生的 commit

Merging a pull request on github.com, squashing it, pressing "Update branch" or editing a file in the web editor creates a commit on GitHub's servers. No local hook runs there. The author email of that commit comes from the account's email settings: with "Keep my email addresses private" off, GitHub writes the account's primary address, which is how two web merges leaked the personal address on 2026-09-24. Keep that setting on, together with "Block command line pushes that expose my email", so web operations use the noreply address and a push whose newest commit carries a private address is refused by GitHub itself. The hooks below and that setting cover different paths; the repository needs both.

在 github.com 上合併 PR、squash、按「Update branch」或用網頁編輯器改檔案，commit 是在 GitHub 伺服器上產生的，本機 hook 管不到。那個 commit 的作者信箱來自帳號的 Email 設定：「Keep my email addresses private」關著時，GitHub 會寫入帳號的主要信箱，2026-09-24 的兩次網頁合併就是這樣把個人信箱寫進去的。這個設定要保持開啟，並同時勾「Block command line pushes that expose my email」，網頁操作就會用 noreply，最新 commit 帶私人信箱的 push 也會被 GitHub 拒絕。hook 與帳號設定守的是不同的路，兩個都要。

## History / 紀錄

- 2026-09-23: an audit found a personal address in the author and committer metadata of the reachable history, while file contents were clean.
- 2026-09-24: the reachable history of `main`, `dev` and the open work branches was rewritten to the noreply address, preserving trees, messages, names, dates and parent order. Copies held elsewhere, such as forks or caches, cannot be recalled by a rewrite; this rule and these hooks stop a recurrence.
- 2026-09-25: the rewrite was pushed and verified from a fresh clone (zero personal addresses on every branch). GitHub still holds the pre-rewrite commits behind the merged pull requests' `refs/pull/*/head` and by direct SHA until GitHub Support purges them, which the owner requests. The account's email privacy settings were turned on the same day. The hooks gained their executable bit so that Linux and macOS clones run them too.
