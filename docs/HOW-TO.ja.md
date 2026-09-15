# 使い方 · ショートカット

[日本語](HOW-TO.ja.md) · [English](HOW-TO.en.md) · [繁體中文](HOW-TO.zh-TW.md) · [Français](HOW-TO.fr.md)

UI Inspect と RWD の操作画面は日本語に対応しています。各 skill の完全な手順書・画像・動画は英語と繁体字中国語です。このページは日本語のクイックスタートであり、全手順書の翻訳ではありません。

| やりたいこと | 入口 |
|---|---|
| インストール | [英語の初心者ガイド](BEGINNER.en.md) |
| skill を選ぶ | [skill 一覧](SKILL-MAP.md) |
| 各ステップの画像を見る | [英語の画像一覧](../README.md#step-by-step-pictures) |
| 動画を見る | [英語のデモ動画](videos/inspector-en.webm) · [文字版と制限](videos/README.md) |
| 権限を確認する | [セキュリティ説明](../SECURITY.md) |

## 始める

ダウンロードしたリポジトリで Python 3.11 以降を使用します。

```sh
python ui-element-inspector/scripts/preview_server.py --port YOUR_FREE_PORT
python scripts/settings.py --workspace "YOUR_PROJECT_FULL_PATH" --language en
```

大文字の部分を自分の未使用ポート番号・パスに置き換えます。Windows は `py -3` を使用。表示されたローカル URL に `?lang=ja` を付けて開きます。Python の設定画面は英語／繁体字ですが、AI の返答言語には `ja` を指定できます。

初回は言語選択が短時間光ります。「日本語」か「自動」を選んでください。優先順位は手動指定 → AI が渡した設定 → ページ言語 → ブラウザー → 英語です。他の AI アプリの内部設定は読み取れません。起動側から `?aiLang=ja` を渡せます。無断で設定を保存しません。「動きを減らす」設定では静的な枠線のみ表示します。

## ① 選択 → ② 範囲 → ③ 変更内容

1. UI Inspect を開き、ページや DOM ツリーにカーソルを合わせて確認。名前をクリックすると選択され、矢印でコンテナが展開します。
2. 同じ class・タグ・明示的な注釈の要素を確認。「前へ／次へ」で移動し、変更しない要素を除外。現在のページ内の一致であり、プロジェクト全体の検索ではありません。
3. 変更したい内容を入力し、情報を確認して AI にコピー。言語を変えても入力した要望や識別名は自動翻訳しません。

## ショートカット

| キー／操作 | 動作 |
|---|---|
| Tab／Shift+Tab | フォーカス移動。Enter／Space で操作 |
| タブ上の ←／→、Home／End | ツール分類を切り替え |
| DOM 上の ↑／↓ | 表示されているレイヤー間を移動 |
| DOM 上の →／← | 展開・子へ／折りたたむ・親へ |
| Esc | 撮影モードから戻る。それ以外は Inspector を閉じる。RWD 設定内では設定を閉じる |
| Ctrl+C／Cmd+C | 自動コピーが拒否された場合、選択済み文字をコピー |
| PrtSc／Print Screen | 変更メモを準備してから使用。Windows の設定に従う |
| Win+Shift+S | Windows の範囲指定撮影 |
| Shift+Cmd+4 | macOS の範囲指定撮影 |

撮影は、変更内容を入力 → スクリーンショット → 撮影準備 → 枠線を残す、の順です。対象と読める変更メモを一緒に撮影。長文は複数枚か全文コピーを添えて、共有前に個人情報を確認してください。

Windows のボタンは helper 起動時の `--enable-snipping`／`--enable-printscreen` で個別に有効化します。既定は無効。クリップボードは読みません。要求の受付は撮影・貼り付け完了の証拠ではありません。終了時は自分が起動したサーバーだけ Ctrl+C で停止。routine は手動試行と初回の実行・送達を別々に確認してください。

[Minimum install & optional companions / 最小安裝與選用搭配](../README.md#minimum-install-and-optional-companions) · [繁體中文](../README.zh-TW.md#最小安裝與建議搭配)
