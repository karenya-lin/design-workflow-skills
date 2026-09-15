/* BEGIN GENERATED LOCALES */
/* Local UI strings only. No storage, network, page-text scraping or account access. */
(() => {
  'use strict';
  if(window.DesignWorkflowLocale)return;
  const catalog = {"元素選取層。移動滑鼠選取，Escape 關閉。Element picker; Escape closes.": ["Element picker; Escape closes.", "Sélecteur d’élément ; Échap ferme.", "要素を選択。Esc で閉じる。"], "元素指認工具 / Inspector controls": ["Inspector controls", "Outils d’inspection", "インスペクター操作"], "DOM 結構 / DOM structure": ["DOM structure", "Structure DOM", "DOM 構造"], "移到要描述的元素 / Hover a page element": ["Hover a page element", "Survolez un élément", "ページの要素にカーソルを合わせる"], "例外：哪些不要修改？ / Exclude instances": ["Exclude instances", "Éléments à exclure", "変更しない要素"], "給 AI 的資料（可編輯，分享前刪除私密資訊）": ["AI context (editable; remove private information)", "Contexte pour l’IA (modifiable ; retirez les données privées)", "AI に渡す情報（編集可・個人情報を除く）"], "你想怎麼改？ / Your requested change": ["Your requested change", "Modification souhaitée", "変更したい内容"], "例如：這個按鈕改成橘色，不改其他按鈕。": ["Example: make this button orange; leave the others unchanged.", "Exemple : passer ce bouton en orange, sans modifier les autres.", "例：このボタンだけオレンジ色にし、ほかは変更しない。"], "手動複製完整修改單 / Manual copy": ["Manual copy", "Copie manuelle", "手動コピー"], "工具分類 / Tool categories": ["Tool categories", "Catégories d’outils", "ツールの分類"], "① 選元素": ["① Select", "① Sélection", "① 選択"], "② 確認範圍": ["② Scope", "② Périmètre", "② 範囲"], "③ 寫需求": ["③ Request", "③ Demande", "③ 変更内容"], "截圖": ["Screenshot", "Capture", "スクリーンショット"], "Step 1 · 點畫面或圖層選取；Hover 只預覽。": ["Step 1 · Click the page or a layer; hover only previews.", "Étape 1 · Cliquez sur la page ou un calque ; le survol donne un aperçu.", "Step 1 · ページかレイヤーをクリックして選択。ホバーはプレビューのみ。"], "Step 2 · 找出同類，勾選不想修改的例外。": ["Step 2 · Find matches and exclude those to leave unchanged.", "Étape 2 · Repérez les correspondances et cochez les exceptions.", "Step 2 · 一致する要素を確認し、変更しない要素を除外。"], "Step 3 · 寫下修改需求，複製後貼給 AI。": ["Step 3 · Describe the change, copy, then paste into your AI chat.", "Étape 3 · Décrivez, copiez, puis collez dans votre conversation IA.", "Step 3 · 変更内容を入力し、コピーして AI に貼り付ける。"], "下一步：確認範圍 →": ["Next: check scope →", "Suivant : périmètre →", "次へ：範囲を確認 →"], "← 回到選元素": ["← Select element", "← Sélectionner", "← 要素を選択"], "下一步：寫需求 →": ["Next: write request →", "Suivant : demande →", "次へ：変更内容 →"], "← 回到確認範圍": ["← Check scope", "← Périmètre", "← 範囲を確認"], "尚未選取：請先點一個元素 / Select an element first": ["Select an element first", "Sélectionnez d’abord un élément", "最初に要素を選択"], "已選取 / Selected: ": ["Selected: ", "Sélection : ", "選択中："], "頁面圖層": ["Page layers", "Calques de la page", "ページのレイヤー"], "容器與排版資訊 / Layout details": ["Layout details", "Détails de mise en page", "レイアウトの詳細"], "比對方式 / Match by": ["Match by", "Critère de correspondance", "一致条件"], "紫框＝目前頁面匹配，並非全專案影響分析。class／標籤相同不一定是同元件。": ["Purple outlines are matches on this page, not a project-wide impact analysis. A shared class or tag does not prove a shared component.", "Les cadres violets indiquent les correspondances de cette page, pas de tout le projet. Même classe ou balise ne signifie pas même composant.", "紫枠は現在のページ内の一致です。プロジェクト全体への影響ではありません。同じ class やタグでも同一コンポーネントとは限りません。"], "檢查給 AI 的資料 / Review context": ["Review AI context", "Vérifier le contexte IA", "AI に渡す情報を確認"], "「元素位置」是 CSS selector，不是元件名或檔名。複製修改需求可一起帶上範圍與例外。": ["A selector locates a DOM element, not a component or source file. Copy request includes scope and exceptions.", "Un sélecteur localise un élément DOM, pas un fichier source. La copie inclut le périmètre et les exceptions.", "セレクターは DOM 要素の位置であり、ファイル名ではありません。変更内容のコピーには範囲と除外が含まれます。"], "選用 · 截圖畫記 / Screenshot": ["Optional · Screenshot", "Facultatif · Capture", "任意 · スクリーンショット"], "先選元素，再準備截圖。可保留框線、隱藏面板，再剪取與畫記；不會讀取或上傳圖片。": ["Select an element and prepare the screenshot. Keep outlines and the change brief visible. No image is read or uploaded.", "Sélectionnez un élément puis préparez la capture. Gardez les cadres et la demande visibles. Aucune image n’est lue ni envoyée.", "要素を選んで撮影準備。枠線と変更内容を表示します。画像の読み取りやアップロードはしません。"], "操作提示與安全 / Help & privacy": ["Help & privacy", "Aide et confidentialité", "ヘルプとプライバシー"], "① Select → ② Check scope → ③ Write and copy. Click selects; Hover previews. 紫框：同類；灰虛線：例外；黃框：選取。只讀 DOM，不讀輸入值、Cookie 或 React 內部資料，不自動上傳。Esc 關閉。": ["① Select → ② Scope → ③ Write and copy. Click selects; hover previews. Purple: matches, gray: exceptions, yellow: selection. Reads DOM only, not field values, cookies or React internals. No upload. Esc closes.", "① Sélection → ② Périmètre → ③ Rédiger et copier. Violet : correspondances, gris : exceptions, jaune : sélection. Lecture du DOM uniquement, sans valeurs de champs, cookies ni données internes React. Aucun envoi. Échap ferme.", "① 選択 → ② 範囲 → ③ 入力・コピー。紫：一致、灰：除外、黄：選択。DOM のみ参照し、入力値・Cookie・React 内部情報は読みません。アップロードなし。Esc で閉じる。"], "按鈕 Button": ["Button", "Bouton", "ボタン"], "連結 Link": ["Link", "Lien", "リンク"], "導覽 Navigation": ["Navigation", "Navigation", "ナビゲーション"], "輸入欄位 Input": ["Input", "Champ", "入力欄"], "圖片 Image": ["Image", "Image", "画像"], "表單 Form": ["Form", "Formulaire", "フォーム"], "區塊 Section": ["Section", "Section", "セクション"], "主要內容 Main": ["Main content", "Contenu principal", "メインコンテンツ"], "頁首 Header": ["Header", "En-tête", "ヘッダー"], "頁尾 Footer": ["Footer", "Pied de page", "フッター"], "排版容器 Layout container": ["Layout container", "Conteneur de mise en page", "レイアウトコンテナ"], "元素 Element": ["Element", "Élément", "要素"], " (明確標記 / explicit attribute)": [" (explicit attribute)", " (attribut explicite)", "（明示的な属性）"], "未知 / Unknown; no component annotation": ["Unknown; no component annotation", "Inconnu ; aucune annotation de composant", "不明：コンポーネントの注釈なし"], "需求 / Requested change: \n": ["Requested change: ", "Modification souhaitée : ", "変更内容："], "只改此範圍；先從 source 確認對應元件。Selector 是當下 DOM 定位，不是原始碼檔名。": ["Change only this scope. Check source to identify the component; the selector is a DOM location, not a source filename.", "Modifiez uniquement ce périmètre. Vérifiez le code pour identifier le composant ; le sélecteur n’est pas un nom de fichier.", "この範囲のみ変更。ソースでコンポーネントを確認してください。セレクターはファイル名ではありません。"], "\n此節點內部不可由本工具辨識 / Inner content not inspected.": ["Inner content not inspected.", "Contenu interne non inspecté.", "内部コンテンツは未確認です。"], "同元件標記": ["Same component annotation", "Même annotation de composant", "同じコンポーネント注釈"], "元件標記": ["Component annotation", "Annotation de composant", "コンポーネント注釈"], "同 class .": ["Same class .", "Même classe .", "同じ class ."], "同標籤 ": ["Same tag ", "Même balise ", "同じタグ "], "HTML 標籤（不代表同元件）": ["HTML tag (not necessarily the same component)", "Balise HTML (pas forcément le même composant)", "HTML タグ（同一コンポーネントとは限らない）"], "清除同類框線": ["Clear match outlines", "Effacer les correspondances", "一致の枠線を消す"], "目前頁面匹配數量 / Match counts: ": ["Page match count: ", "Nombre de correspondances : ", "ページ内の一致数："], "HTML 標籤，不等於同 React 元件": ["HTML tag, not necessarily the same React component", "Balise HTML, pas forcément le même composant React", "HTML タグ。同一 React コンポーネントとは限らない"], "整個頁面 / Page": ["Page", "Page", "ページ全体"], "主要內容 / Main": ["Main", "Principal", "メイン"], "頁首 / Header": ["Header", "En-tête", "ヘッダー"], "頁尾 / Footer": ["Footer", "Pied de page", "フッター"], "導覽 / Navigation": ["Navigation", "Navigation", "ナビゲーション"], "區塊 / Section": ["Section", "Section", "セクション"], "內容卡 / Article": ["Article", "Article", "記事・カード"], "按鈕 / Button": ["Button", "Bouton", "ボタン"], "連結 / Link": ["Link", "Lien", "リンク"], "容器 / Container": ["Container", "Conteneur", "コンテナ"], "主標題 / Heading": ["Heading", "Titre principal", "見出し"], "次標題 / Heading": ["Subheading", "Sous-titre", "小見出し"], "段落 / Paragraph": ["Paragraph", "Paragraphe", "段落"], "輸入欄位 / Input": ["Input", "Champ", "入力欄"], "圖片 / Image": ["Image", "Image", "画像"], "表單 / Form": ["Form", "Formulaire", "フォーム"], "清單 / List": ["List", "Liste", "リスト"], "清單項目 / Item": ["Item", "Élément de liste", "リスト項目"], "展開／收合 ": ["Expand/collapse ", "Déplier/replier ", "展開／折りたたむ "], "元素 / Element": ["Element", "Élément", "要素"], "此層只顯示前 100 個 / First 100 children": ["First 100 children only", "100 premiers enfants seulement", "先頭 100 個の子要素のみ表示"], "已攔截這次點選；可複製或選父層 / Selection held": ["Selection held; page click intercepted", "Sélection conservée ; clic intercepté", "選択を保持。ページ本来のクリックは停止"], "已複製。下一步：切到 AI 對話，貼上並送出。 / Copied: paste into your AI chat. 分享前確認無私密資訊。": ["Copied. Next: paste into your AI chat. Review for private information before sharing.", "Copié. Collez dans votre conversation IA. Vérifiez les données privées avant de partager.", "コピーしました。AI の会話に貼り付けてください。共有前に個人情報を確認。"], "自動複製不可用；文字已選取，請 Ctrl+C / Cmd+C。": ["Automatic copy unavailable. Text selected: press Ctrl+C / Cmd+C.", "Copie automatique indisponible. Texte sélectionné : Ctrl+C / Cmd+C.", "自動コピー不可。選択された文字を Ctrl+C / Cmd+C でコピー。"], "↑ 上一個": ["↑ Previous", "↑ Précédent", "↑ 前へ"], "↓ 下一個": ["↓ Next", "↓ Suivant", "↓ 次へ"], "更新圖層": ["Refresh layers", "Actualiser", "レイヤー更新"], "收合面板": ["Collapse", "Réduire", "折りたたむ"], "詳情 / Details": ["Details", "Détails", "詳細"], "關閉 ×": ["Close ×", "Fermer ×", "閉じる ×"], "面板換邊": ["Switch side", "Changer de côté", "左右を切り替え"], "複製元素位置": ["Copy selector", "Copier le sélecteur", "位置をコピー"], "\n目前頁面比對 / Match: ": ["Page match: ", "Correspondance : ", "ページ内の一致："], "\n原匹配總數: ": ["Original match count: ", "Nombre initial : ", "最初の一致数："], "；本清單最多 200，不代表全部 source 使用位置。\n要修改 / Include:\n": ["; list capped at 200, not all source usages. Include:", "; liste limitée à 200, pas tous les usages du code. Inclure :", "。一覧は最大 200 件で、ソース全体ではありません。変更対象："], "\n例外不修改 / Exclude:\n": ["Exclude:", "Exclure :", "除外："], "無 / None": ["None", "Aucun", "なし"], "\n使用者需求 / User request: ": ["User request: ", "Demande : ", "ユーザーの要望："], "複製修改需求": ["Copy change request", "Copier la demande", "変更内容をコピー"], "準備截圖": ["Prepare screenshot", "Préparer la capture", "撮影準備"], "保留框線，隱藏面板": ["Keep outlines, hide tools", "Garder les cadres, masquer les outils", "枠線を残してツールを隠す"], "開啟 Windows 剪取工具": ["Open Windows Snipping Tool", "Ouvrir l’Outil Capture Windows", "Windows 切り取りツールを開く"], "元素已移除；請重新選取 / Element removed; select again": ["Element removed; select again", "Élément supprimé ; sélectionnez à nouveau", "要素が削除されました。再選択してください"], "100% 原尺寸": ["100% actual size", "100 % taille réelle", "100% 実寸"], " · 排版預覽，尚未人工驗收 / Layout preview, not a PASS result": [" · Layout preview, not a PASS result", " · Aperçu, pas un résultat de validation", " · レイアウトプレビュー。合格判定ではありません"], "請先確認授權、資料及分析門檻 / Confirm the safety gates first": ["Confirm scope, data and analytics gates first", "Vérifiez d’abord le périmètre, les données et l’analytique", "先に権限・データ・分析の送信停止を確認"], "已要求載入，請確認畫面；不代表成功或通過 / Load requested; verify the frame": ["Load requested; verify the frame, not yet a success result", "Chargement demandé ; vérifiez le cadre, sans présumer du résultat", "読み込みを要求しました。成功かどうか画面で確認"], "只接受無帳密、query 或 fragment 的本機 HTTP 網址 / Local HTTP URL only, no credentials, query or fragment": ["Local HTTP URL only; no credentials, query or fragment", "URL HTTP locale uniquement ; sans identifiants, requête ni fragment", "ローカル HTTP URL のみ。認証情報・クエリ・フラグメント不可"], "重新開啟指認 / Restart": ["Restart inspector", "Relancer l’inspection", "再度開く"], "點畫面或圖層名稱定位，箭頭展開子層。 / Click a layer name to select; arrows expand": ["Click a layer name to select; arrows expand", "Cliquez sur un nom ; les flèches déplient", "名前をクリックして選択。矢印で展開"], "腳本被阻擋；不修改 CSP。 / Script blocked; do not weaken CSP": ["Script blocked; do not weaken CSP", "Script bloqué ; ne réduisez pas la CSP", "スクリプトがブロックされました。CSP は緩和しません"], "不同來源不可讀 DOM；請在該專案另行批准開發接線。不繞過瀏覽器限制。 / Cross-origin DOM unavailable": ["Cross-origin DOM unavailable. Use an approved integration; do not bypass browser restrictions.", "DOM inter-origines inaccessible. Utilisez une intégration autorisée, sans contourner le navigateur.", "別オリジンの DOM は参照できません。許可済みの方法を使い、制限は回避しません。"], "預覽已換頁，請重新開啟指認 / Preview navigated; activate inspector again": ["Preview navigated; activate inspector again", "Page changée ; relancez l’inspection", "ページが変わりました。再度開いてください"], "已固定 / Selected": ["Selected", "Sélection", "選択中"], "請修改此元素 / Please update this element:": ["Please update this element:", "Veuillez modifier cet élément :", "この要素を変更してください："], "目前頁面共 {0} 個匹配；清單仍存在 {1} 個，排除 {2} 個。位置 {3} / {4}。紫框最多 200 個，隱藏項目不畫框。": ["Page matches: {0}; still present: {1}; excluded: {2}. Position {3} / {4}. Up to 200 outlines; hidden elements are not outlined.", "Correspondances : {0} ; présentes : {1} ; exclues : {2}. Position {3} / {4}. 200 cadres maximum ; éléments masqués sans cadre.", "一致：{0} 件、現存：{1} 件、除外：{2} 件。位置 {3} / {4}。枠線は最大 200 件。非表示要素には枠線なし。"], "不修改 {0}: {1}": ["Exclude {0}: {1}", "Exclure {0} : {1}", "除外 {0}：{1}"], "未選": ["Not selected", "Non sélectionné", "未選択"], "適合畫面 {0}%": ["Fit {0}%", "Ajuster {0} %", "画面に合わせる {0}%"], "選擇截圖方式。修改單保留選取位置、例外與你輸入的需求；截圖前請檢查可讀性及私密資訊。": ["Choose a capture method. The brief keeps selection, exceptions and your request. Check readability and privacy first.", "Choisissez une méthode. La fiche conserve sélection, exceptions et demande. Vérifiez lisibilité et confidentialité.", "撮影方法を選択。選択位置・除外・変更内容を保持します。読みやすさと個人情報を確認。"], "請先填寫修改需求，再準備截圖。": ["Write the requested change before preparing a screenshot.", "Rédigez la demande avant de préparer la capture.", "撮影の前に変更内容を入力してください。"], "截圖修改單 / Screenshot brief": ["Screenshot brief", "Fiche de capture", "撮影用変更メモ"], "選取目標與修改需求 / Change brief": ["Selected target & change request", "Cible et modification souhaitée", "選択対象と変更内容"], "黃框＝選取；紫框＝同類；灰虛線＝例外。": ["Yellow: selected. Purple: matches. Dashed gray: excluded.", "Jaune : sélection. Violet : correspondances. Gris pointillé : exclusions.", "黄：選択。紫：一致。灰色の破線：除外。"], "比對規則與不修改的例外 / Match and exclusions": ["Match rule and excluded elements", "Règle et éléments exclus", "一致条件と変更しない要素"], "請一起截取目標與修改單。若文字太小，改用 100% 顯示；長文請分張截取或搭配複製文字，不要只截到一部分。": ["Capture the target and brief together. Use 100% if text is small. For long content, take multiple captures or copy the full text; do not omit hidden lines.", "Capturez la cible et la fiche ensemble. Passez à 100 % si nécessaire. Pour un texte long, utilisez plusieurs captures ou copiez le texte complet.", "対象とメモを一緒に撮影。文字が小さければ 100% に。長文は複数枚に分けるか全文コピーを添付し、見切れを確認。"], "Print Screen 的行為由 Windows 設定決定；也可手動按 PrtSc、Win+Shift+S，Mac 使用 Shift+Cmd+4。": ["Print Screen follows Windows settings. You can also press PrtSc or Win+Shift+S manually; on Mac use Shift+Cmd+4.", "Print Screen dépend des paramètres Windows. Raccourcis : PrtSc, Win+Shift+S ; sur Mac : Shift+Cmd+4.", "Print Screen は Windows の設定に従います。手動なら PrtSc、Win+Shift+S、Mac は Shift+Cmd+4。"], "返回編輯 / Back to edit": ["Back to edit", "Revenir à l’édition", "編集に戻る"], "已送出本機請求，不代表截圖或貼上已完成。請自行確認並貼給 AI。": ["Local request sent, not proof of capture or paste. Verify and paste into your AI chat yourself.", "Demande locale envoyée, sans preuve de capture ni de collage. Vérifiez puis collez dans l’IA.", "ローカル操作を要求しました。撮影・貼り付け完了の証拠ではありません。確認して AI に貼り付けてください。"], "未啟用原生操作；請手動按 PrtSc 或 Win+Shift+S。可選擇以 --enable-printscreen 或 --enable-snipping 啟動本機 helper。": ["Native action unavailable. Press PrtSc or Win+Shift+S manually, or opt in with --enable-printscreen / --enable-snipping when starting the local helper.", "Action native indisponible. Utilisez PrtSc ou Win+Shift+S, ou activez --enable-printscreen / --enable-snipping au lancement du serveur local.", "ネイティブ操作は未有効。PrtSc または Win+Shift+S を押すか、ローカル helper に --enable-printscreen / --enable-snipping を指定。"], "語言 / Language": ["Language", "Langue", "言語"], "自動 / Auto": ["Auto", "Automatique", "自動"], "RWD 排版預覽 / Responsive layout preview": ["Responsive layout preview", "Aperçu adaptatif", "レスポンシブ・プレビュー"], "視覺工作區 / Visual workspace": ["Visual workspace", "Espace visuel", "ビジュアル作業エリア"], "預覽畫布 / Preview canvas": ["Preview canvas", "Zone d’aperçu", "プレビュー画面"], "本機預覽 · 不自動上傳": ["Local preview · no automatic upload", "Aperçu local · aucun envoi automatique", "ローカルプレビュー・自動アップロードなし"], "排版預覽區 / Preview area": ["Preview area", "Zone d’aperçu", "プレビュー領域"], "核准的本機排版預覽 / Approved local layout preview": ["Approved local layout preview", "Aperçu local autorisé", "許可されたローカルプレビュー"], "選取": ["Selected", "Sélection", "選択中"], "同類": ["Matches", "Correspondances", "一致"], "例外": ["Excluded", "Exclusions", "除外"], "縮放預覽 ≠ 真機測試": ["Scaled preview ≠ real-device test", "Aperçu réduit ≠ test sur appareil", "縮小表示 ≠ 実機テスト"], "預覽外側工具面板 / External inspector panel": ["External inspector panel", "Panneau d’inspection externe", "外側の操作パネル"], "· 展開／收合": ["· Expand / collapse", "· Déplier / replier", "· 展開／折りたたむ"], "RWD 尺寸工具列，可左右捲動 / Scrollable size controls": ["Scrollable size controls", "Contrôles de taille défilants", "横スクロールできるサイズ設定"], "版型": ["Preset", "Format", "プリセット"], "版型 / Preset": ["Preset", "Format", "プリセット"], "通用 / Generic": ["Generic", "Générique", "標準"], "常用手機 / Mobile · 390 × 844": ["Mobile · 390 × 844", "Mobile · 390 × 844", "スマートフォン · 390 × 844"], "窄螢幕 / Narrow · 320 × 568": ["Narrow · 320 × 568", "Étroit · 320 × 568", "狭い画面 · 320 × 568"], "平板 / Tablet · 768 × 1024": ["Tablet · 768 × 1024", "Tablette · 768 × 1024", "タブレット · 768 × 1024"], "桌機 / Desktop · 1280 × 800": ["Desktop · 1280 × 800", "Ordinateur · 1280 × 800", "デスクトップ · 1280 × 800"], "自訂 / Custom": ["Custom", "Personnalisé", "カスタム"], "寬": ["Width", "Largeur", "幅"], "寬 / Width": ["Width", "Largeur", "幅"], "高": ["Height", "Hauteur", "高さ"], "高 / Height": ["Height", "Hauteur", "高さ"], "套用尺寸 / Apply": ["Apply", "Appliquer", "適用"], "套用": ["Apply", "Appliquer", "適用"], "橫直切換 / Rotate": ["Rotate", "Pivoter", "回転"], "⇄ 橫直": ["⇄ Rotate", "⇄ Pivoter", "⇄ 縦横切替"], "只縮放顯示，不改測試 CSS 尺寸 / Display scale only": ["Display scale only; CSS test dimensions unchanged", "Échelle d’affichage seule ; dimensions CSS inchangées", "表示倍率のみ。テストの CSS サイズは変更しません"], "適合畫面": ["Fit", "Ajuster", "画面に合わせる"], "說明／設定": ["Help / settings", "Aide / réglages", "ヘルプ／設定"], "選寬度，看文字換行、卡片排列與按鈕是否被切掉。這是桌面瀏覽器中的排版視窗，不是真機模擬。": ["Choose a width and inspect wrapping, cards and clipping. This is a desktop layout viewport, not device emulation.", "Choisissez une largeur et vérifiez les retours à la ligne, cartes et coupures. Ce n’est pas une émulation d’appareil.", "幅を選び、折り返し・カード・見切れを確認。デスクトップ上の表示領域であり、実機エミュレーションではありません。"], "工具列空間不足時可左右捲動，或用 Tab 移到下一個控制。Esc 可關閉這個說明面板。": ["Scroll the toolbar horizontally or use Tab. Escape closes these settings.", "Faites défiler la barre ou utilisez Tab. Échap ferme ces réglages.", "ツールバーは横スクロールか Tab で移動。Esc で設定を閉じます。"], "換成自己的本機預覽 / Use your local preview": ["Use your local preview", "Utiliser votre aperçu local", "自分のローカルプレビューを使う"], "先確認測試資料及分析停送。localhost 也可能連到真實後端；本工具不會替你阻擋網站分析或交易。": ["Check test data and analytics blocking first. Localhost can still contact real backends; this tool does not block analytics or transactions.", "Vérifiez les données de test et le blocage analytique. Localhost peut contacter un vrai serveur ; cet outil ne bloque ni analyse ni transaction.", "テストデータと分析送信停止を確認。localhost でも本番サーバーに接続し得ます。このツールは分析や取引を遮断しません。"], "本機網址 / Local URL": ["Local URL", "URL locale", "ローカル URL"], "載入已核准預覽 / Load approved preview": ["Load approved preview", "Charger l’aperçu autorisé", "許可済みプレビューを開く"], "回示範頁 / Demo": ["Demo", "Démo", "デモに戻る"], "我已確認測試授權、資料與分析停送 / Scope, data and analytics gates checked": ["Scope, data and analytics gates checked", "Périmètre, données et analyse vérifiés", "権限・データ・分析送信停止を確認済み"], "僅接受 localhost 或 127.0.0.1 的 HTTP 網址。網站若禁止嵌入，不降低 CSP 或繞過限制；改用瀏覽器 DevTools。不同 port 的頁面不能由外框讀取 DOM。": ["Only localhost/127.0.0.1 HTTP URLs. Respect embedding restrictions; use DevTools instead of weakening CSP. Different ports cannot share DOM access.", "URL HTTP localhost/127.0.0.1 uniquement. Respectez les restrictions d’intégration ; utilisez DevTools sans réduire la CSP. Pas d’accès DOM entre ports différents.", "localhost/127.0.0.1 の HTTP URL のみ。埋め込み制限を回避せず DevTools を使用。異なるポートの DOM は参照できません。"], "怎麼檢查？尺寸準確嗎？ / How to check and limitations": ["How to check and limitations", "Méthode et limites", "確認方法と制限"], "先看 320、390、768、1280，再輸入你的斷點前後寬度。每個寬度檢查：橫向溢出、文字截斷、選單、表單及鍵盤焦點。預覽不會自動宣告通過。": ["Start at 320, 390, 768 and 1280, then test around your breakpoints. Check overflow, clipped text, menus, forms and keyboard focus. No automatic PASS.", "Commencez à 320, 390, 768 et 1280, puis près de vos points de rupture. Vérifiez débordements, textes, menus, formulaires et focus. Aucun PASS automatique.", "320・390・768・1280 から始め、ブレークポイント前後を確認。はみ出し・文字・メニュー・フォーム・キーボードフォーカスを検証。自動の合格判定なし。"], "尺寸單位是 CSS px。機型為近似排版參考，不會改 User-Agent、DPR、觸控、瀏覽器引擎或安全區。手機瀏覽器工具列、縮放和系統顯示設定會改變實際可視範圍。最新機型資料核對日：2026-09-15。": ["Units: CSS px. Models are approximate layout references; no changes to User-Agent, DPR, touch, engine or safe areas. Browser chrome and system settings affect the viewport. Model reference date: 2026-09-15.", "Unités : CSS px. Modèles approximatifs, sans changement d’agent, DPR, tactile, moteur ni zones sûres. L’interface du navigateur et les réglages influencent l’affichage. Référence : 2026-09-15.", "単位は CSS px。機種はレイアウトの近似値。UA・DPR・タッチ・エンジン・セーフエリアは変更しません。ブラウザーや端末の設定で表示領域が変わります。参照日：2026-09-15。"], "工作區填滿目前視窗，工具內容在各自區域內捲動。「適合畫面」將完整預覽視窗縮小顯示，不改實際 CSS 寬高；「100%」檢查原尺寸細節，必要時在預覽區捲動。長頁內容仍在網站視窗內捲動。": ["The workspace fills your window; sections scroll independently. Fit scales the preview without changing CSS dimensions. Use 100% for detail and scroll as needed.", "L’espace remplit la fenêtre ; chaque zone défile séparément. Ajuster réduit l’aperçu sans changer les dimensions CSS. Utilisez 100 % pour les détails.", "ウィンドウ全体を使用し、各領域でスクロールします。縮小表示でも CSS サイズは不変。詳細は 100% で確認。"], "UI Inspect · 圖層指認": ["UI Inspect · Layers", "UI Inspect · Calques", "UI Inspect · レイヤー"], "先按 UI Inspect → ① 選元素 → ② 確認範圍 → ③ 寫需求與複製。可先展開 RWD 選尺寸。 / Open UI Inspect, then follow steps 1–3.": ["Open UI Inspect → ① Select → ② Scope → ③ Request and copy. Expand RWD to choose dimensions.", "Ouvrez UI Inspect → ① Sélection → ② Périmètre → ③ Demande et copie. Dépliez RWD pour les dimensions.", "UI Inspect → ① 選択 → ② 範囲 → ③ 変更内容とコピー。RWD を展開してサイズ選択。"], "UI 元素指認 · 安全示範頁": ["UI Inspect · Synthetic demo", "UI Inspect · Démo fictive", "UI Inspect · サンプルデモ"], "指給 AI 看，從這裡開始。": ["Point it out. Start here.", "Montrez-le. Commencez ici.", "指して伝える。ここから始めよう。"], "這是沒有分析、帳號或遠端資料的示範頁。開啟工具後，移到卡片或按鈕上，看名稱、容器與間距，再點選複製。": ["A demo without analytics, accounts or remote data. Open the tool, hover over a card or button, then click to select and copy.", "Démo sans analyse, compte ni données distantes. Ouvrez l’outil, survolez une carte ou un bouton, puis sélectionnez et copiez.", "分析・アカウント・外部データのないデモ。ツールを開き、カードやボタンにホバーしてから選択・コピー。"], "開啟元素指認": ["Open inspector", "Ouvrir l’inspecteur", "インスペクターを開く"], "Step 1 點元素 → Step 2 確認同類與例外 → Step 3 填需求並複製給 AI。Hover 只看名稱；點一下才選取。截圖是選用功能。": ["Step 1 Select → Step 2 Matches and exceptions → Step 3 Write and copy for AI. Hover previews; click selects. Screenshots are optional.", "Étape 1 Sélection → Étape 2 Correspondances et exceptions → Étape 3 Rédiger et copier. Survol : aperçu ; clic : sélection. Capture facultative.", "Step 1 選択 → Step 2 一致と除外 → Step 3 入力して AI にコピー。ホバーはプレビュー、クリックは選択。撮影は任意。"], "示範卡片": ["Demo cards", "Cartes de démonstration", "デモカード"], "晨光卡片": ["Morning card", "Carte Aurore", "朝のカード"], "用這張卡練習：我要改卡片間距，但不要改整頁。": ["Practice: change card spacing without changing the whole page.", "Exercice : modifier l’espacement des cartes, pas toute la page.", "練習：ページ全体ではなく、カードの間隔だけ変える。"], "查看詳情": ["View details", "Voir les détails", "詳細を見る"], "森林卡片": ["Forest card", "Carte Forêt", "森のカード"], "同一個 class 可以有多個元素，selector 仍須唯一。": ["Several elements can share a class; a precise selector still matters.", "Plusieurs éléments partagent une classe ; un sélecteur précis reste utile.", "同じ class を持つ要素は複数あります。正確なセレクターが重要です。"], "沙丘卡片": ["Dune card", "Carte Dune", "砂丘のカード"], "沒有標記的 React 元件名不會憑空猜測。": ["React component names without annotations are not guessed.", "Les noms de composants React sans annotation ne sont pas devinés.", "注釈のない React コンポーネント名は推測しません。"], "假資料測試欄位（工具不讀取 value）": ["Synthetic test field (value is not read)", "Champ fictif (valeur non lue)", "テスト用の架空入力欄（値は読み取りません）"], "關閉工具後，頁面按鈕恢復正常。這不是對任意網站的安全隔離保證，只在已授權的本機預覽使用。": ["Close the tool to restore page actions. This is not a security sandbox for arbitrary websites. Use only authorized local previews.", "Fermez l’outil pour rétablir les actions. Ce n’est pas un bac à sable de sécurité. Utilisez un aperçu local autorisé.", "閉じるとページ操作が戻ります。任意のサイトの安全性を保証するものではありません。許可されたローカルプレビューのみ使用。"], "Apple · 8 款": ["Apple · 8 models", "Apple · 8 modèles", "Apple · 8 機種"], "iPhone 18 Pro · 約 402 × 874": ["iPhone 18 Pro · approx. 402 × 874", "iPhone 18 Pro · env. 402 × 874", "iPhone 18 Pro · 約 402 × 874"], "iPhone 18 Pro Max · 約 440 × 956": ["iPhone 18 Pro Max · approx. 440 × 956", "iPhone 18 Pro Max · env. 440 × 956", "iPhone 18 Pro Max · 約 440 × 956"], "iPhone Duo 外螢幕 / Cover · 約 466 × 678": ["iPhone Duo Cover · approx. 466 × 678", "iPhone Duo Écran externe · env. 466 × 678", "iPhone Duo 外側画面 · 約 466 × 678"], "iPhone Duo 展開 / Inner · 約 890 × 626": ["iPhone Duo Inner · approx. 890 × 626", "iPhone Duo Écran interne · env. 890 × 626", "iPhone Duo 内側画面 · 約 890 × 626"], "iPhone Air · 約 420 × 912": ["iPhone Air · approx. 420 × 912", "iPhone Air · env. 420 × 912", "iPhone Air · 約 420 × 912"], "iPhone 17 · 約 402 × 874": ["iPhone 17 · approx. 402 × 874", "iPhone 17 · env. 402 × 874", "iPhone 17 · 約 402 × 874"], "iPhone 17 Pro · 約 402 × 874": ["iPhone 17 Pro · approx. 402 × 874", "iPhone 17 Pro · env. 402 × 874", "iPhone 17 Pro · 約 402 × 874"], "iPhone 17 Pro Max · 約 440 × 956": ["iPhone 17 Pro Max · approx. 440 × 956", "iPhone 17 Pro Max · env. 440 × 956", "iPhone 17 Pro Max · 約 440 × 956"], "iPhone 16 · 約 393 × 852": ["iPhone 16 · approx. 393 × 852", "iPhone 16 · env. 393 × 852", "iPhone 16 · 約 393 × 852"], "Samsung · 8 款": ["Samsung · 8 models", "Samsung · 8 modèles", "Samsung · 8 機種"], "Galaxy S26 · 約 360 × 780": ["Galaxy S26 · approx. 360 × 780", "Galaxy S26 · env. 360 × 780", "Galaxy S26 · 約 360 × 780"], "Galaxy S26+ · 約 411 × 891": ["Galaxy S26+ · approx. 411 × 891", "Galaxy S26+ · env. 411 × 891", "Galaxy S26+ · 約 411 × 891"], "Galaxy S26 Ultra · 約 411 × 891": ["Galaxy S26 Ultra · approx. 411 × 891", "Galaxy S26 Ultra · env. 411 × 891", "Galaxy S26 Ultra · 約 411 × 891"], "Galaxy S25 · 約 360 × 780": ["Galaxy S25 · approx. 360 × 780", "Galaxy S25 · env. 360 × 780", "Galaxy S25 · 約 360 × 780"], "Galaxy S25+ · 約 411 × 891": ["Galaxy S25+ · approx. 411 × 891", "Galaxy S25+ · env. 411 × 891", "Galaxy S25+ · 約 411 × 891"], "Galaxy S25 Ultra · 約 411 × 891": ["Galaxy S25 Ultra · approx. 411 × 891", "Galaxy S25 Ultra · env. 411 × 891", "Galaxy S25 Ultra · 約 411 × 891"], "Galaxy Z Fold7 外螢幕 / Cover · 約 360 × 840": ["Galaxy Z Fold7 Cover · approx. 360 × 840", "Galaxy Z Fold7 Écran externe · env. 360 × 840", "Galaxy Z Fold7 外側画面 · 約 360 × 840"], "Galaxy Z Fold7 展開 / Inner · 約 750 × 832": ["Galaxy Z Fold7 Inner · approx. 750 × 832", "Galaxy Z Fold7 Écran interne · env. 750 × 832", "Galaxy Z Fold7 内側画面 · 約 750 × 832"], "Galaxy Z Flip7 主螢幕 / Main · 約 360 × 840": ["Galaxy Z Flip7 Main · approx. 360 × 840", "Galaxy Z Flip7 Écran principal · env. 360 × 840", "Galaxy Z Flip7 メイン画面 · 約 360 × 840"], "Google Pixel · 8 款": ["Google Pixel · 8 models", "Google Pixel · 8 modèles", "Google Pixel · 8 機種"], "Pixel 11 · 約 411 × 923": ["Pixel 11 · approx. 411 × 923", "Pixel 11 · env. 411 × 923", "Pixel 11 · 約 411 × 923"], "Pixel 11 Pro · 約 410 × 914": ["Pixel 11 Pro · approx. 410 × 914", "Pixel 11 Pro · env. 410 × 914", "Pixel 11 Pro · 約 410 × 914"], "Pixel 11 Pro XL · 約 448 × 997": ["Pixel 11 Pro XL · approx. 448 × 997", "Pixel 11 Pro XL · env. 448 × 997", "Pixel 11 Pro XL · 約 448 × 997"], "Pixel 11 Pro Fold 外螢幕 / Cover · 約 411 × 892": ["Pixel 11 Pro Fold Cover · approx. 411 × 892", "Pixel 11 Pro Fold Écran externe · env. 411 × 892", "Pixel 11 Pro Fold 外側画面 · 約 411 × 892"], "Pixel 11 Pro Fold 展開 / Inner · 約 791 × 820": ["Pixel 11 Pro Fold Inner · approx. 791 × 820", "Pixel 11 Pro Fold Écran interne · env. 791 × 820", "Pixel 11 Pro Fold 内側画面 · 約 791 × 820"], "Pixel 10 · 約 411 × 923": ["Pixel 10 · approx. 411 × 923", "Pixel 10 · env. 411 × 923", "Pixel 10 · 約 411 × 923"], "Pixel 10 Pro · 約 410 × 914": ["Pixel 10 Pro · approx. 410 × 914", "Pixel 10 Pro · env. 410 × 914", "Pixel 10 Pro · 約 410 × 914"], "Pixel 10 Pro XL · 約 448 × 997": ["Pixel 10 Pro XL · approx. 448 × 997", "Pixel 10 Pro XL · env. 448 × 997", "Pixel 10 Pro XL · 約 448 × 997"], "Pixel 9a · 約 411 × 923": ["Pixel 9a · approx. 411 × 923", "Pixel 9a · env. 411 × 923", "Pixel 9a · 約 411 × 923"], "頁面按鈕觸發：{0} 次": ["Page actions: {0}", "Actions de la page : {0}", "ページの操作回数：{0}"], "先選語言，再依 ① ② ③ 操作。": ["Choose a language, then follow ① ② ③.", "Choisissez une langue, puis suivez ① ② ③.", "言語を選び、① ② ③ の順に操作。"], "知道了 / Got it": ["Got it", "Compris", "わかりました"], "瀏覽器未允許自動複製。完整內容已選取，請按 Ctrl+C（Mac：Cmd+C），再貼給 AI；需求沒有遺失。": ["The browser did not allow automatic copy. All text is selected: press Ctrl+C (Mac: Cmd+C), then paste into AI. Your request is still here.", "Le navigateur a refusé la copie automatique. Tout le texte est sélectionné : appuyez sur Ctrl+C (Mac : Cmd+C), puis collez-le dans votre IA. Votre demande est conservée.", "ブラウザーが自動コピーを許可しませんでした。全文を選択済みです。Ctrl+C（Mac：Cmd+C）を押して AI に貼り付けてください。入力内容は保持されています。"], "常用手機 / Mobile": ["Mobile", "Mobile", "スマートフォン"], "窄螢幕 / Narrow": ["Narrow", "Étroit", "狭い画面"], "平板 / Tablet": ["Tablet", "Tablette", "タブレット"], "桌機 / Desktop": ["Desktop", "Ordinateur", "デスクトップ"], "iPhone 18 Pro": ["iPhone 18 Pro", "iPhone 18 Pro", "iPhone 18 Pro"], "iPhone 18 Pro Max": ["iPhone 18 Pro Max", "iPhone 18 Pro Max", "iPhone 18 Pro Max"], "iPhone Duo 外螢幕 / Cover": ["iPhone Duo Cover", "iPhone Duo Écran externe", "iPhone Duo 外側画面"], "iPhone Duo 展開 / Inner": ["iPhone Duo Inner", "iPhone Duo Écran interne", "iPhone Duo 内側画面"], "iPhone Air": ["iPhone Air", "iPhone Air", "iPhone Air"], "iPhone 17": ["iPhone 17", "iPhone 17", "iPhone 17"], "iPhone 17 Pro": ["iPhone 17 Pro", "iPhone 17 Pro", "iPhone 17 Pro"], "iPhone 17 Pro Max": ["iPhone 17 Pro Max", "iPhone 17 Pro Max", "iPhone 17 Pro Max"], "iPhone 16": ["iPhone 16", "iPhone 16", "iPhone 16"], "Galaxy S26": ["Galaxy S26", "Galaxy S26", "Galaxy S26"], "Galaxy S26+": ["Galaxy S26+", "Galaxy S26+", "Galaxy S26+"], "Galaxy S26 Ultra": ["Galaxy S26 Ultra", "Galaxy S26 Ultra", "Galaxy S26 Ultra"], "Galaxy S25": ["Galaxy S25", "Galaxy S25", "Galaxy S25"], "Galaxy S25+": ["Galaxy S25+", "Galaxy S25+", "Galaxy S25+"], "Galaxy S25 Ultra": ["Galaxy S25 Ultra", "Galaxy S25 Ultra", "Galaxy S25 Ultra"], "Galaxy Z Fold7 外螢幕 / Cover": ["Galaxy Z Fold7 Cover", "Galaxy Z Fold7 Écran externe", "Galaxy Z Fold7 外側画面"], "Galaxy Z Fold7 展開 / Inner": ["Galaxy Z Fold7 Inner", "Galaxy Z Fold7 Écran interne", "Galaxy Z Fold7 内側画面"], "Galaxy Z Flip7 主螢幕 / Main": ["Galaxy Z Flip7 Main", "Galaxy Z Flip7 Écran principal", "Galaxy Z Flip7 メイン画面"], "Pixel 11": ["Pixel 11", "Pixel 11", "Pixel 11"], "Pixel 11 Pro": ["Pixel 11 Pro", "Pixel 11 Pro", "Pixel 11 Pro"], "Pixel 11 Pro XL": ["Pixel 11 Pro XL", "Pixel 11 Pro XL", "Pixel 11 Pro XL"], "Pixel 11 Pro Fold 外螢幕 / Cover": ["Pixel 11 Pro Fold Cover", "Pixel 11 Pro Fold Écran externe", "Pixel 11 Pro Fold 外側画面"], "Pixel 11 Pro Fold 展開 / Inner": ["Pixel 11 Pro Fold Inner", "Pixel 11 Pro Fold Écran interne", "Pixel 11 Pro Fold 内側画面"], "Pixel 10": ["Pixel 10", "Pixel 10", "Pixel 10"], "Pixel 10 Pro": ["Pixel 10 Pro", "Pixel 10 Pro", "Pixel 10 Pro"], "Pixel 10 Pro XL": ["Pixel 10 Pro XL", "Pixel 10 Pro XL", "Pixel 10 Pro XL"], "Pixel 9a": ["Pixel 9a", "Pixel 9a", "Pixel 9a"], "品牌 / Brand": ["Brand", "Marque", "ブランド"], "全部 / All": ["All", "Toutes", "すべて"], "機型 / Model": ["Model", "Modèle", "機種"], "選擇機型 / Choose a model": ["Choose a model", "Choisir un modèle", "機種を選択"], "RWD 尺寸設定 / Responsive size settings": ["Responsive size settings", "Dimensions de l’aperçu", "表示サイズ設定"], "機型立即切換；自訂尺寸離開欄位或按 Enter 更新。": ["Models apply immediately. For custom sizes, leave the field or press Enter.", "Le modèle s’applique immédiatement. Pour une taille personnalisée, quittez le champ ou appuyez sur Entrée.", "機種はすぐ反映。カスタムサイズは入力欄を離れるか Enter で更新。"], "先選品牌縮小清單，再選機型。可用 Tab 與方向鍵操作；Esc 關閉說明。": ["Filter by brand, then choose a model. Use Tab and arrow keys; Esc closes help.", "Filtrez par marque, puis choisissez un modèle. Utilisez Tab et les flèches ; Échap ferme l’aide.", "ブランドで絞り込み、機種を選択。Tab と矢印キーで操作、Esc で説明を閉じます。"], "黃框指出你要修改的元素，讓 AI 看懂位置；不是另一個檢查步驟。": ["The yellow outline shows AI which element to change. It is not another check.", "Le contour jaune indique à l’IA l’élément à modifier. Ce n’est pas une vérification supplémentaire.", "黄色の枠は変更したい要素を AI に示します。追加の確認手順ではありません。"], "移到左側預覽即可指認；點一下選取。也可用鍵盤啟用按鈕。": ["Hover the left preview to inspect; click to select. The activation button also supports keyboard use.", "Survolez l’aperçu à gauche pour inspecter ; cliquez pour sélectionner. Le bouton permet aussi l’activation au clavier.", "左のプレビューにカーソルを合わせて確認、クリックで選択。キーボード用の開始ボタンも使えます。"]};
  const normalize=value=>{
    const code=String(value||'').toLowerCase();
    if(code.startsWith('zh'))return 'zh-TW';
    if(code.startsWith('fr'))return 'fr';
    if(code.startsWith('ja'))return 'ja';
    if(code.startsWith('en'))return 'en';
    return null;
  };
  const query=new URLSearchParams(location.search);
  const options=window.DesignWorkflowInspectorOptions||{};
  const baseLanguage=document.documentElement.lang;
  let choice=options.language||query.get('lang')||'auto';
  let inherited=null;
  try { if(parent!==window)inherited=parent.DesignWorkflowLocale; } catch { /* Same origin only. */ }
  function current(){return normalize(choice)||(inherited?.current())||normalize(options.aiLanguage||query.get('aiLang'))||normalize(baseLanguage)||normalize(navigator.language)||'en';}
  const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const patterns=Object.entries(catalog).filter(([key])=>/\{\d+\}/.test(key)).map(([key,values])=>({
    key,values,expression:new RegExp('^'+key.split(/\{\d+\}/).map(escape).join('(.*?)')+'$','s')
  }));
  const fragments=Object.keys(catalog).filter(key=>!key.includes('{0}')).sort((a,b)=>b.length-a.length);
  const fragmentPattern=new RegExp(fragments.map(escape).join('|'),'g');
  function translate(text){
    const lang=current();if(lang==='zh-TW')return text;
    const index={en:0,fr:1,ja:2}[lang];
    if(catalog[text])return catalog[text][index];
    for(const p of patterns){const match=text.match(p.expression);if(match)return p.values[index].replace(/\{(\d+)\}/g,(_,n)=>match[Number(n)+1]);}
    // Only caller-provided tool strings are translated. Never run this over a user's page.
    return text.replace(fragmentPattern,key=>catalog[key][index]);
  }
  const bindings=new Set();
  function bind(root){
    const memory=new WeakMap();let pending=false,dead=false;
    function render(){
      pending=false;if(dead)return;
      const documentForRoot=root.ownerDocument||root;
      const walker=documentForRoot.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())){
        const element=node.nodeType===3?node.parentElement:node;
        if(!element||element.closest('script,style,[data-no-translate],.tree-name small,.label')||(node.nodeType===3&&element.closest('textarea')))continue;
        let record=memory.get(node);if(!record){record={};memory.set(node,record);}
        const keys=node.nodeType===3?['text']:['aria-label','title','placeholder','label'];
        for(const key of keys){
          const value=key==='text'?node.nodeValue:node.getAttribute(key);if(value===null)continue;
          const old=record[key];const source=old&&value===old.output?old.source:value;
          const output=translate(source);record[key]={source,output};
          if(value!==output){if(key==='text')node.nodeValue=output;else node.setAttribute(key,output);}
        }
      }
    }
    const observer=new MutationObserver(()=>{if(!pending&&!dead){pending=true;queueMicrotask(render);}});
    observer.observe(root,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','label']});
    bindings.add(render);render();
    return ()=>{dead=true;observer.disconnect();bindings.delete(render);};
  }
  function setLanguage(value){
    choice=value==='auto'?'auto':normalize(value)||'auto';
    bindings.forEach(render=>render());
    window.dispatchEvent(new CustomEvent('workflow:language',{detail:current()}));
  }
  window.DesignWorkflowLocale={current,translate,bind,setLanguage,get choice(){return choice;}};
  if(inherited)parent.addEventListener('workflow:language',()=>setLanguage('auto'));
})();

/* END GENERATED LOCALES */
/* Local DOM inspection. Optional click-only loopback native launcher; no telemetry or clipboard reads. */
(() => {
  'use strict';
  const KEY = 'DesignWorkflowInspector';
  const local = location.protocol === 'file:' ||
    ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  if (!local) {
    console.warn('UI inspector: use an authorized localhost/file preview. Remote pages are not enabled.');
    return;
  }
  if (window[KEY]) {
    if (window[KEY].version === '1.0.0') window[KEY].stop();
    else { console.warn('UI inspector namespace is already in use.'); return; }
  }
  const previousFocus = document.activeElement;
  const locale=window.DesignWorkflowLocale;
  const host = document.createElement('div');
  host.setAttribute('data-workflow-inspector', '');
  host.style.cssText = 'all:initial!important;position:fixed!important;inset:0!important;z-index:2147483647!important;pointer-events:none!important;';
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = `
    :host { color-scheme:light; --paper:#fff;--soft:#f5f7f9;--ink:#20313f;--muted:#526475;--line:#d5dde3;--accent:#0f766e;--accent-soft:#e8f5f1;--focus:#b45309; }
    * { box-sizing:border-box; } [hidden] { display:none!important; }
    .shield { position:fixed;inset:0;pointer-events:auto;cursor:crosshair; }
    .outline { position:fixed;pointer-events:none;border:2px solid #60a5fa;background:#60a5fa09; }
    .selected { z-index:1;border-color:#fbbf24;background:#fbbf2412; }
    .match { border-color:#a855f7;background:#a855f70c; }
    .match.excluded { border-color:#64748b;border-style:dashed;background:transparent; }
    .hover-target { z-index:2;border-color:#0891b2;background:#22d3ee10; }
    .label { z-index:3;position:fixed;pointer-events:none;background:#fbbf24;color:#111827;font:700 12px/1.4 system-ui;padding:4px 7px;border-radius:4px;max-width:calc(100vw - 16px);overflow:hidden;white-space:nowrap;text-overflow:ellipsis; }
    .panel { pointer-events:auto;position:fixed;right:16px;bottom:16px;width:min(400px,calc(100vw - 32px));height:calc(100dvh - 32px);max-height:calc(100dvh - 32px);display:flex;flex-direction:column;overflow:hidden;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:14px;box-shadow:0 12px 40px #20313f26;font:13px/1.5 system-ui,sans-serif; }
    .panel.left { right:auto;left:16px; }
    .panel-header { display:flex;align-items:center;justify-content:space-between;gap:8px;flex:none;padding:10px 12px;border-bottom:1px solid var(--line); }
    .panel-heading { display:flex;gap:7px;align-items:center;white-space:nowrap; }
    h2 { font-size:15px;letter-spacing:-.4px;margin:0; } p { margin:8px 0; }
    .local-badge { font-size:9px;letter-spacing:.8px;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:2px 5px;border-radius:4px; }
    .muted { color:var(--muted);font-size:11px;line-height:1.65; }
    .status { flex:none;margin:0;padding:7px 12px;background:#fff7df;color:#754600;font-size:11px;max-height:74px;overflow:auto;border-top:1px solid #ead8ae; }
    .status { min-height:32px; } .status:empty { visibility:hidden; }
    button { font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:7px;padding:7px 10px;min-height:34px;cursor:pointer; }
    button:hover { background:var(--soft);border-color:#94a3b8; }
    button:focus-visible,textarea:focus-visible,summary:focus-visible,[role=tabpanel]:focus-visible { outline:3px solid var(--focus);outline-offset:-3px; }
    button:disabled { color:#657584;background:#edf1f4;border-color:#d5dde3;cursor:not-allowed; }
    button.primary { color:#fff;background:var(--accent);border-color:var(--accent);font-weight:650; }
    button.primary:hover { background:#115e59; } button.primary:disabled { background:#edf1f4;color:#657584;border-color:#d5dde3; }
    button.text-button { border:0;padding:0;color:var(--muted);font-size:11px;min-height:26px; }
    .actions,.chain { display:flex;flex-wrap:wrap;gap:6px;margin:8px 0; }
    .controls { display:flex;flex-wrap:nowrap;gap:2px;margin:0;overflow-x:auto; }
    .controls button { flex:none;padding:4px 5px;min-height:28px;font-size:10px;border-color:transparent;color:var(--muted); }
    .categories { flex:none;display:flex;flex-wrap:nowrap;gap:3px;overflow-x:auto;scrollbar-width:thin;padding:8px 10px;margin:0;background:var(--paper);border-bottom:1px solid var(--line); }
    .categories button { flex:1 0 auto;white-space:nowrap;font-size:12px;padding:7px 6px;border-color:transparent; }
    .categories button[aria-selected="true"] { background:var(--accent-soft);color:#115e59;border-color:#b8dbd2;font-weight:700; }
    .selection-hint { flex:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink);background:var(--soft);font:11px/1.5 ui-monospace,monospace;min-height:32px;margin:0;padding:8px 12px;border-bottom:1px solid var(--line); }
    .step-view { display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden; }
    .view-body { flex:1;min-height:0;overflow:auto;padding:10px 12px;overscroll-behavior:contain; }
    .step-hint { font-size:11px;color:var(--muted);margin:0 0 10px; }
    .section-heading { display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;font-weight:600;color:var(--muted);margin:6px 0; }
    .section-heading span { font-size:9px;letter-spacing:1px;color:#607382; }
    .layers-body { display:flex;flex-direction:column; }
    .layers-body .step-hint,.section-heading,.element-details { flex:none; }
    .tree { flex:1;min-height:96px;overflow:auto;border:1px solid var(--line);padding:5px;border-radius:8px;background:#fafbfc;scrollbar-width:thin; }
    .tree-row { display:flex;align-items:center;gap:2px;margin:1px 0;border-radius:5px; }
    .tree-row:hover { background:#e8f2f6; }
    .tree-row.current { background:var(--accent-soft);box-shadow:inset 3px 0 var(--accent); }
    .tree .tree-toggle { width:26px;min-width:26px;min-height:30px;padding:3px;border:0;background:transparent;color:var(--muted); }
    .tree .tree-name { flex:1;min-width:0;text-align:left;border:0;background:transparent;padding:5px;font-size:12px; }
    .tree-name small { display:block;color:#627486;font:10px/1.4 ui-monospace,monospace;overflow:hidden;text-overflow:ellipsis; }
    .tree-children { padding-left:11px;border-left:1px solid var(--line);margin-left:12px; }
    .tree button { max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
    summary { cursor:pointer;font-size:11px;color:var(--muted);padding:8px 0; }
    .element-details { margin-top:6px;max-height:42%;overflow:auto; }
    .chain button { max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px; }
    .step-footer { flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;background:var(--paper);border-top:1px solid var(--line); }
    .step-footer:empty { display:none; }.step-footer>button:only-child { width:100%; }.step-footer button { font-size:12px; }
    .step-footer .actions { width:100%;margin:0; }.step-footer .primary { flex:1; }
    .scope-summary { background:var(--accent-soft);color:#115e59;border:1px solid #b8dbd2;border-radius:9px;padding:12px;font-size:12px;margin-top:0; }
    .match-navigation { display:grid;grid-template-columns:1fr 1fr; }
    .match-methods button { font-size:11px;background:var(--soft); }
    .exception-details { border-top:1px solid var(--line);margin-top:12px; }
    .exceptions { max-height:220px;overflow:auto; }
    .exceptions label { display:flex;gap:8px;align-items:start;overflow-wrap:anywhere;padding:7px;margin:0;border-bottom:1px solid var(--line);font-size:11px; }
    .exceptions input { accent-color:var(--accent);width:16px;height:16px;flex:none; }
    pre { margin:8px 0;white-space:pre-wrap;overflow-wrap:anywhere;font:11px/1.6 ui-monospace,monospace; }
    textarea { display:block;resize:vertical;width:100%;height:136px;background:#f8fafb;color:var(--ink);border:1px solid #bac8d3;border-radius:8px;padding:10px;font:12px/1.6 ui-monospace,monospace; }
    textarea::placeholder { color:#607382; }.report-details { border-top:1px solid var(--line);margin-top:14px; }.report-details label { font-size:10px;color:var(--muted);margin-top:0; }
    label { display:block;margin-top:8px;font-size:12px; } label textarea { margin-top:6px; }
    .help { flex:none;border-top:1px solid var(--line);padding:0 12px;background:#fafbfc;max-height:110px;overflow:auto; }.help summary { font-size:10px; }.help p { margin-top:0; }
    .dock { position:fixed;right:12px;bottom:12px;pointer-events:auto;display:flex;gap:6px;padding:6px;background:var(--paper);border:1px solid var(--line);border-radius:10px;max-width:calc(100vw - 24px);font:13px/1.5 system-ui; }
    .capture-card { pointer-events:auto;background:#fff;color:#172b3a;border:3px solid #b45309;border-radius:10px;padding:18px;font:16px/1.6 system-ui;overflow:auto;overflow-wrap:anywhere;max-height:100%; }
    .capture-card h2 { font-size:20px; }.capture-card pre { font:14px/1.6 ui-monospace,monospace; }.capture-request { white-space:pre-wrap;font-weight:650; }.capture-card:not(.external) { position:fixed;right:12px;bottom:12px;width:min(420px,calc(100vw - 24px));max-height:48dvh; }
    @media(max-height:500px) { .panel-header { padding:0 8px; }.panel-heading h2,.panel-heading .local-badge { display:none; }.controls { width:100%;justify-content:flex-end; }.categories { padding:3px 8px; }.help { display:none; }.step-footer { padding:5px 10px; }.view-body { padding:6px 10px; }.selection-hint { padding:4px 10px;min-height:24px; }.status { padding:4px 10px;min-height:24px;max-height:42px; }.layers-body { display:block; }.tree { height:30dvh; } }
    @media(prefers-reduced-motion:reduce) { * { scroll-behavior:auto; } }
  `;
  shadow.append(style);
  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  const shield = make('div', 'shield');
  shield.tabIndex = 0;
  shield.setAttribute('aria-label', '元素選取層。移動滑鼠選取，Escape 關閉。Element picker; Escape closes.');
  const outlines = Array.from({ length: 4 }, (_, i) => make('div', 'outline' + (i === 0 ? ' selected' : '')));
  const label = make('div', 'label');
  const hoverOutline=make('div','outline hover-target');
  const panel = make('section', 'panel');
  panel.hidden = true;
  const dock = make('div', 'dock');
  const captureCard = make('section','capture-card');captureCard.hidden=true;
  captureCard.setAttribute('aria-label','截圖修改單 / Screenshot brief');
  dock.setAttribute('role', 'toolbar');
  dock.setAttribute('aria-label', '元素指認工具 / Inspector controls');
  panel.setAttribute('aria-label', 'UI element inspector');
  const panelHeading=make('div','panel-heading');
  panelHeading.append(make('h2','','UI Inspect'),make('span','local-badge','LOCAL'));
  const language=make('select');language.setAttribute('aria-label','語言 / Language');
  language.style.cssText='font:11px system-ui;max-width:100px;min-height:28px;background:#fff;color:#20313f;border:1px solid #bac8d3;border-radius:5px';
  [['auto','自動 / Auto'],['zh-TW','繁體中文'],['en','English'],['fr','Français'],['ja','日本語']].forEach(([value,text])=>{const option=make('option','',text);option.value=value;language.append(option);});
  language.value=locale?.choice||'auto';
  language.addEventListener('change',()=>{
    try{if(parent!==window&&parent.DesignWorkflowLocale){parent.DesignWorkflowLocale.setLanguage(language.value);}else locale?.setLanguage(language.value);}catch{locale?.setLanguage(language.value);}
    dismissWelcome();
  });
  panelHeading.append(language);
  const controls = make('div', 'actions controls');
  const tree = make('div', 'tree');
  tree.setAttribute('aria-label', 'DOM 結構 / DOM structure');
  const info = make('pre', '', '移到要描述的元素 / Hover a page element');
  const chain = make('div', 'chain');
  const related = make('div', 'actions');
  const relatedStatus = make('p', 'muted');
  const navigation = make('div', 'actions');
  relatedStatus.setAttribute('role', 'status');
  const exceptionDetails = make('details');
  exceptionDetails.append(make('summary', '', '例外：哪些不要修改？ / Exclude instances'));
  const exceptionList = make('div', 'exceptions');
  exceptionDetails.append(exceptionList);
  const fieldLabel = make('label', '', '給 AI 的資料（可編輯，分享前刪除私密資訊）');
  const report = make('textarea');
  report.setAttribute('aria-label', 'AI locator report');
  report.spellcheck = false;
  fieldLabel.append(report);
  const requestLabel = make('label', '', '你想怎麼改？ / Your requested change');
  const request = make('textarea');
  request.setAttribute('aria-label', '你想怎麼改？ / Your requested change');
  request.placeholder = '例如：這個按鈕改成橘色，不改其他按鈕。';
  request.style.height = '72px';
  requestLabel.append(request);
  const copyControls = make('div', 'actions');
  const status = make('p', 'status');
  status.setAttribute('role', 'status');
  const manualCopy=make('textarea'); manualCopy.hidden=true; manualCopy.readOnly=true;
  manualCopy.setAttribute('aria-label','手動複製完整修改單 / Manual copy');
  const categories=make('div','categories');categories.setAttribute('role','tablist');
  categories.setAttribute('aria-label','工具分類 / Tool categories');
  const views=Array.from({length:4},(_,i)=>{
    const view=make('section','step-view');view.id='inspector-view-'+i;view.setAttribute('role','tabpanel');
    view.setAttribute('aria-labelledby','inspector-tab-'+i);view.tabIndex=0;view.hidden=i!==0;return view;
  });
  const bodies=views.map(view=>{const body=make('div','view-body');view.append(body);return body;});
  const footers=views.map(view=>{const footer=make('div','step-footer');view.append(footer);return footer;});
  const tabNames=['① 選元素','② 確認範圍','③ 寫需求','截圖'];
  const tabs=tabNames.map((text,i)=>{
    const tab=button(categories,text,()=>i===3?prepareCapture():activateTab(i));tab.id='inspector-tab-'+i;
    tab.setAttribute('role','tab');tab.setAttribute('aria-controls',views[i].id);
    tab.setAttribute('aria-selected',String(i===0));tab.tabIndex=i===0?0:-1;
    tab.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?3:(i+(event.key==='ArrowRight'?1:3))%4;
      if(next===3)prepareCapture();else{activateTab(next);tabs[next].focus();}
    });return tab;
  });
  function activateTab(index){
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;views[i].hidden=i!==index;});
  }
  const stepHints=[
    'Step 1 · 點畫面或圖層選取；Hover 只預覽。',
    'Step 2 · 找出同類，勾選不想修改的例外。',
    'Step 3 · 寫下修改需求，複製後貼給 AI。'
  ];
  bodies.slice(0,3).forEach((view,i)=>view.append(make('p','step-hint',stepHints[i])));
  const nextScope=button(footers[0],'下一步：確認範圍 →',()=>goStep(1));nextScope.classList.add('primary');
  const scopeActions=footers[1];
  button(scopeActions,'← 回到選元素',()=>goStep(0));
  const nextWrite=button(scopeActions,'下一步：寫需求 →',()=>goStep(2));nextWrite.classList.add('primary');
  button(bodies[2],'← 回到確認範圍',()=>goStep(1)).classList.add('text-button');
  const selectionHint=make('p','selection-hint','尚未選取：請先點一個元素 / Select an element first');
  selectionHint.setAttribute('role','status');
  function goStep(index){activateTab(index);tabs[index].focus({preventScroll:true});tabs[index].scrollIntoView({block:'nearest',inline:'nearest'});}
  function updateSteps(){
    const ready=!!selected?.isConnected;
    nextScope.disabled=!ready;nextWrite.disabled=!ready;
    const text=ready?'已選取 / Selected: '+identity(selected):'尚未選取：請先點一個元素 / Select an element first';
    if(selectionHint.textContent!==text)selectionHint.textContent=text;
    selectionHint.title=text;
  }
  const layerHeading=make('div','section-heading');layerHeading.append(make('strong','','頁面圖層'),make('span','','DOM TREE'));
  const elementDetails=make('details','element-details');
  elementDetails.append(make('summary','','容器與排版資訊 / Layout details'),info,chain);
  bodies[0].classList.add('layers-body');
  bodies[0].append(layerHeading,tree,elementDetails);
  relatedStatus.classList.add('scope-summary');
  related.classList.add('match-methods');navigation.classList.add('match-navigation');
  exceptionDetails.classList.add('exception-details');
  bodies[1].append(relatedStatus,navigation,make('p','section-heading','比對方式 / Match by'),related,exceptionDetails,
    make('p','muted','紫框＝目前頁面匹配，並非全專案影響分析。class／標籤相同不一定是同元件。'));
  const reportDetails=make('details','report-details');reportDetails.open=true;
  reportDetails.append(make('summary','','檢查給 AI 的資料 / Review context'),fieldLabel);
  bodies[2].append(requestLabel,reportDetails,manualCopy,
    make('p','muted','「元素位置」是 CSS selector，不是元件名或檔名。複製修改需求可一起帶上範圍與例外。'));
  footers[2].append(copyControls);
  bodies[3].append(make('p','step-hint','選用 · 截圖畫記 / Screenshot'),make('p','muted','先選元素，再準備截圖。可保留框線、隱藏面板，再剪取與畫記；不會讀取或上傳圖片。'));
  const panelHeader=make('div','panel-header');panelHeader.append(panelHeading,controls);
  const welcome=make('div','welcome');
  welcome.style.cssText='padding:7px 12px;background:#e8f5f1;color:#115e59;font-size:11px;display:flex;align-items:center;gap:8px;flex:none';
  welcome.append(make('span','','先選語言，再依 ① ② ③ 操作。'));
  function dismissWelcome(){welcome.hidden=true;language.classList.remove('first-use');categories.classList.remove('first-use');}
  button(welcome,'知道了 / Got it',dismissWelcome);
  // Page-session only. No persistent settings are written without asking.
  const firstUse=!window.DesignWorkflowInspectorOnboarded;
  window.DesignWorkflowInspectorOnboarded=true;
  welcome.hidden=!firstUse;
  if(firstUse){language.classList.add('first-use');categories.classList.add('first-use');}
  style.textContent+='\n@keyframes guide-glow{50%{box-shadow:0 0 0 4px #0f766e40}} .first-use{outline:2px solid #0f766e;outline-offset:-2px;animation:guide-glow 1.6s ease-in-out 3}.categories.first-use{animation-delay:1s}@media(prefers-reduced-motion:reduce){.first-use{animation:none}}';
  const help=make('details','help');help.append(make('summary','','操作提示與安全 / Help & privacy'),make('p','muted','① Select → ② Check scope → ③ Write and copy. Click selects; Hover previews. 紫框：同類；灰虛線：例外；黃框：選取。只讀 DOM，不讀輸入值、Cookie 或 React 內部資料，不自動上傳。Esc 關閉。'));
  panel.append(panelHeader,welcome,categories,selectionHint,...views,status,help);
  shadow.append(shield, ...outlines, hoverOutline, label, panel, dock,captureCard);
  document.documentElement.append(host);
  const unbindLocale=[];
  let externalHost = null;
  try {
    const mount = window.parent !== window && window.parent.document.querySelector('[data-inspector-dock]');
    if (mount) {
      externalHost = make('div');
      externalHost.setAttribute('data-inspector-external', '');
      const externalShadow = externalHost.attachShadow({mode:'open'});
      externalShadow.append(style.cloneNode(true));
      const externalStyle = make('style');
      externalStyle.textContent = ':host{display:flex;flex:1;min-height:0;height:100%}.panel,.panel.left{position:static;width:100%;height:100%;max-height:100%;box-shadow:none;border-radius:0;border:0}.dock{position:static;max-width:100%;flex-wrap:wrap;align-self:flex-start}';
      captureCard.classList.add('external');
      externalShadow.append(externalStyle, panel, dock,captureCard);
      unbindLocale.push(locale?.bind(externalShadow));
      mount.append(externalHost); panel.hidden = false; dock.hidden = true;
    }
  } catch { /* Cross-origin embedding never permits DOM access. */ }
  unbindLocale.push(locale?.bind(shadow));
  let selected = null;
  let hovered = null;
  const treeRows = new Map();
  let frozen = false;
  let screenshotMode = false;
  let frame = 0;
  let pointer = null;
  let dead = false;
  let matches = [];
  let matchBoxes = [];
  let matchIndex = -1;
  let matchQuery = '';
  let totalMatches = 0;
  const exceptions = new Set();
  const listeners = [];
  function on(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    listeners.push(() => target.removeEventListener(event, handler, options));
  }
  function button(parent, text, handler) {
    const node = make('button', '', text);
    node.type = 'button';
    node.addEventListener('click', handler);
    parent.append(node);
    return node;
  }
  const short = (value, length = 120) => String(value || '').replace(/[\r\n\t]/g, ' ').slice(0, length);
  const tag = node => node.localName || 'element';
  function identity(node) {
    const classes = [...node.classList].slice(0, 4).map(value => '.' + short(value, 40)).join('');
    return tag(node) + (node.id ? '#' + short(node.id, 60) : classes);
  }
  function selector(node) {
    if (node.id) {
      const candidate = '#' + CSS.escape(node.id);
      if (document.querySelectorAll(candidate).length === 1) return candidate;
    }
    const testId = node.getAttribute('data-testid');
    if (testId) {
      const candidate = '[data-testid="' + CSS.escape(testId) + '"]';
      if (document.querySelectorAll(candidate).length === 1) return candidate;
    }
    const parts = [];
    let current = node;
    while (current && current !== document.documentElement) {
      const siblings = current.parentElement ? [...current.parentElement.children].filter(el => tag(el) === tag(current)) : [current];
      parts.unshift(CSS.escape(tag(current)) + ':nth-of-type(' + (siblings.indexOf(current) + 1) + ')');
      current = current.parentElement;
    }
    return 'html' + (parts.length ? ' > ' + parts.join(' > ') : '');
  }
  function parents(node, count = 6) {
    const result = [];
    while (node && result.length < count) { result.push(node); node = node.parentElement; }
    return result;
  }
  function layout(node) {
    const css = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return { display: css.display, position: css.position,
      size: Math.round(rect.width) + ' × ' + Math.round(rect.height) + ' px',
      gap: css.gap, padding: css.padding, margin: css.margin,
      direction: css.flexDirection, columns: css.gridTemplateColumns };
  }
  function draw() {
    matchBoxes.forEach((box, index) => {
      const node = matches[index];
      box.classList.toggle('excluded', exceptions.has(node));
      box.hidden = !node || !node.isConnected || node.getClientRects().length === 0;
      if (box.hidden) return;
      const rect = node.getBoundingClientRect();
      Object.assign(box.style, { left: rect.left + 'px', top: rect.top + 'px', width: rect.width + 'px', height: rect.height + 'px' });
    });
    const nodes = selected && selected.isConnected ? parents(selected, 4) : [];
    outlines.forEach((box, index) => {
      const node = nodes[index];
      box.hidden = !node;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      Object.assign(box.style, { left: rect.left + 'px', top: rect.top + 'px',
        width: rect.width + 'px', height: rect.height + 'px' });
    });
    const hoverNode=hovered && hovered.isConnected && !screenshotMode ? hovered : null;
    hoverOutline.hidden=!hoverNode || hoverNode===selected;
    if(!hoverOutline.hidden){
      const r=hoverNode.getBoundingClientRect();
      Object.assign(hoverOutline.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
    }
    const named=hoverNode || (nodes.length ? selected : null);
    label.hidden = !named;
    if (named) {
      const rect = named.getBoundingClientRect();
      label.textContent = (hoverNode && hoverNode!==selected ? 'Hover · ' : '') + identity(named);
      label.style.left = Math.max(8, Math.min(rect.left, innerWidth - 160)) + 'px';
      label.style.top = Math.max(4, Math.min(rect.top - 28, innerHeight - 30)) + 'px';
    }
  }
  function describe() {
    if (!selected || !selected.isConnected) return;
    const details = layout(selected);
    const name = selected.getAttribute('data-ui-name') || selected.getAttribute('data-component');
    const kinds = { button: '按鈕 Button', a: '連結 Link', nav: '導覽 Navigation',
      input: '輸入欄位 Input', img: '圖片 Image', form: '表單 Form', section: '區塊 Section',
      main: '主要內容 Main', header: '頁首 Header', footer: '頁尾 Footer' };
    const kind = kinds[tag(selected)] || (['flex', 'grid', 'inline-flex', 'inline-grid'].includes(details.display)
      ? '排版容器 Layout container' : '元素 Element');
    const path = selector(selected);
    const component = name ? short(name) + locale.translate(' (明確標記 / explicit attribute)') : locale.translate('未知 / Unknown; no component annotation');
    info.textContent = `${frozen ? '已固定 / Selected' : 'Hover'} · ${kind}\n${identity(selected)}\n`
      + `Component: ${component}\n${details.display} · ${details.position} · ${details.size}\n`
      + `padding: ${details.padding}\nmargin: ${details.margin}\ngap: ${details.gap}`;
    const ancestors = parents(selected);
    report.value = locale.translate('請修改此元素 / Please update this element:')+`\nSelector: ${path}\n`
      + `DOM: ${identity(selected)}\nComponent: ${component}\n`
      + `Layout: ${details.display}; position: ${details.position}; size: ${details.size}\n`
      + `Padding: ${details.padding}; margin: ${details.margin}; gap: ${details.gap}\n`
      + `Flex direction: ${details.direction}; grid columns: ${details.columns}\n`
      + `Parents: ${ancestors.slice(1).map(identity).join(' ← ')}\n`
      + `Viewport: ${innerWidth} × ${innerHeight}\n`
      + locale.translate('需求 / Requested change: \n')
      + locale.translate('只改此範圍；先從 source 確認對應元件。Selector 是當下 DOM 定位，不是原始碼檔名。');
    if (['iframe', 'canvas'].includes(tag(selected))) report.value += '\n'+locale.translate('\n此節點內部不可由本工具辨識 / Inner content not inspected.');
    chain.replaceChildren();
    ancestors.forEach((node, index) => button(chain, (index ? '↑ ' : '● ') + identity(node), () => pickGroup(node)));
    related.replaceChildren();
    if (name) {
      const attr = selected.hasAttribute('data-ui-name') ? 'data-ui-name' : 'data-component';
      button(related, '同元件標記', () => highlight('[' + attr + '="' + CSS.escape(name) + '"]', '元件標記'));
    }
    [...selected.classList].slice(0, 4).forEach(value => button(related, '同 class .' + short(value, 30), () => highlight('.' + CSS.escape(value), 'class')));
    button(related, '同標籤 ' + tag(selected), () => highlight(CSS.escape(tag(selected)), 'HTML 標籤（不代表同元件）'));
    button(related, '清除同類框線', clearMatches);
    copyName.disabled = false;
    copyReport.disabled = false;
    shot.disabled = false;
  }
  function clearMatches() {
    matchBoxes.forEach(box => box.remove());
    matchBoxes = []; matches = []; matchIndex = -1;
    matchQuery = ''; totalMatches = 0; exceptions.clear(); exceptionList.replaceChildren();
    relatedStatus.textContent = '';tabs[1].textContent=tabNames[1];
  }
  function matchSummary() {
    tabs[1].textContent=tabNames[1]+' ('+totalMatches+')';
    const alive = matches.filter(node => node.isConnected);
    relatedStatus.textContent = `目前頁面共 ${totalMatches} 個匹配；清單仍存在 ${alive.length} 個，排除 ${alive.filter(n=>exceptions.has(n)).length} 個。位置 ${matchIndex < 0 ? '未選' : matchIndex+1} / ${matches.length}。紫框最多 200 個，隱藏項目不畫框。`;
  }
  function visitMatch(direction) {
    if (!matches.some(node=>node.isConnected)) return;
    do { matchIndex = (matchIndex + direction + matches.length) % matches.length; } while (!matches[matchIndex].isConnected);
    matches[matchIndex].scrollIntoView({block:'center',behavior:'instant'});
    pick(matches[matchIndex],true); matchSummary();
  }
  function highlight(query, method) {
    clearMatches();
    const all = [...document.querySelectorAll(query)].filter(node => node !== host && !host.contains(node));
    matchQuery = query; totalMatches = all.length;
    matches = all.slice(0, 200);
    matchIndex=matches.indexOf(selected);
    matchBoxes = matches.map(() => {
      const box = make('div', 'outline match');
      shadow.insertBefore(box, label); return box;
    });
    matches.forEach((node,index)=>{
      const row=make('label'); const checkbox=make('input'); checkbox.type='checkbox';
      checkbox.addEventListener('change',()=>{
        if(checkbox.checked) exceptions.add(node); else exceptions.delete(node);
        matchSummary(); draw();
      });
      row.append(checkbox, make('span','',`不修改 ${index+1}: ${identity(node)}`)); exceptionList.append(row);
    });
    relatedStatus.setAttribute('aria-label', '目前頁面匹配數量 / Match counts: ' + method);
    matchSummary();
    draw();
  }
  function pickGroup(node) {
    pick(node,true);
    const attr = node.hasAttribute('data-ui-name') ? 'data-ui-name' : 'data-component';
    const name = node.getAttribute(attr);
    if(name) highlight('['+attr+'="'+CSS.escape(name)+'"]','元件標記');
    else if(node.classList.length) highlight('.'+CSS.escape(node.classList[0]),'class');
    else highlight(CSS.escape(tag(node)),'HTML 標籤，不等於同 React 元件');
  }
  function syncTree(reveal=false) {
    if(reveal && selected){
      const path=parents(selected,100).reverse();
      path.forEach(node=>{const entry=treeRows.get(node);if(entry && node!==selected)entry.expand(true);});
    }
    treeRows.forEach((entry,node)=>{
      entry.row.classList.toggle('current',node===selected);
      entry.name.setAttribute('aria-pressed',String(node===selected));
    });
  }
  function renderTree() {
    tree.replaceChildren();treeRows.clear();
    const kinds={body:'整個頁面 / Page',main:'主要內容 / Main',header:'頁首 / Header',footer:'頁尾 / Footer',nav:'導覽 / Navigation',section:'區塊 / Section',article:'內容卡 / Article',button:'按鈕 / Button',a:'連結 / Link',div:'容器 / Container',h1:'主標題 / Heading',h2:'次標題 / Heading',p:'段落 / Paragraph',input:'輸入欄位 / Input',img:'圖片 / Image',form:'表單 / Form',ul:'清單 / List',li:'清單項目 / Item'};
    function branch(node,container,parentEntry=null) {
      const item=make('div');const row=make('div','tree-row');
      const nodes=[...node.children].filter(n=>n!==host&&!['script','style','link','meta'].includes(tag(n)));
      const children=make('div','tree-children');children.hidden=true;
      const toggle=button(row,nodes.length?'▸':'·',()=>entry.expand(children.hidden));
      toggle.className='tree-toggle';toggle.disabled=!nodes.length;
      toggle.setAttribute('aria-label','展開／收合 '+identity(node));
      if(nodes.length)toggle.setAttribute('aria-expanded','false');
      const name=button(row,'',()=>{
        if(!node.isConnected){renderTree();return;}
        hovered=null;const rect=node.getBoundingClientRect();
        window.scrollBy({top:rect.top+rect.height/2-innerHeight/2,behavior:'instant'});pickGroup(node);
      });
      name.className='tree-name';name.title=identity(node);
      name.append(make('span','',kinds[tag(node)]||'元素 / Element'),make('small','',identity(node)));
      name.setAttribute('aria-pressed',String(node===selected));
      let built=false;
      const entry={row,name,parentEntry,expand(open){
        if(!nodes.length)return;
        if(open&&!built){built=true;nodes.slice(0,100).forEach(n=>branch(n,children,entry));
          if(nodes.length>100)children.append(make('p','','此層只顯示前 100 個 / First 100 children'));}
        children.hidden=!open;toggle.textContent=open?'▾':'▸';toggle.setAttribute('aria-expanded',String(open));
      }};
      const previewLayer=()=>{pointer=null;hovered=node.isConnected?node:null;draw();};
      const leaveLayer=()=>{if(hovered===node){hovered=null;draw();}};
      row.addEventListener('pointerenter',previewLayer);
      row.addEventListener('pointerleave',leaveLayer);
      name.addEventListener('focus',previewLayer);
      name.addEventListener('blur',leaveLayer);
      row.addEventListener('keydown',event=>{
        if(!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(event.key))return;
        event.preventDefault();
        const visible=[...tree.querySelectorAll('.tree-name')].filter(n=>n.getClientRects().length);
        const index=visible.indexOf(name);
        if(event.key==='ArrowDown')visible[Math.min(index+1,visible.length-1)]?.focus();
        if(event.key==='ArrowUp')visible[Math.max(0,index-1)]?.focus();
        if(event.key==='ArrowRight'){entry.expand(true);children.querySelector('.tree-name')?.focus();}
        if(event.key==='ArrowLeft'){if(!children.hidden)entry.expand(false);else parentEntry?.name.focus();}
      });
      item.append(row,children);container.append(item);treeRows.set(node,entry);
      return entry;
    }
    branch(document.body,tree).expand(true);
    treeRows.forEach((entry,node)=>{if(tag(node)==='main')entry.expand(true);});
    syncTree(true);
  }
  function pick(node, lock) {
    if (!(node instanceof Element) || node === host || host.contains(node)) return;
    if (node.getRootNode() !== document) return; // Do not walk framework/shadow internals.
    selected = node;
    frozen = lock;
    if (lock) {
      panel.hidden = false;
      dock.hidden = true;
      // Keep panel position stable when changing targets; reposition only with the explicit control.
    }
    status.textContent = lock ? '已攔截這次點選；可複製或選父層 / Selection held' : '';
    updateSteps();
    syncTree(lock);
    describe();
    draw();
  }
  function hit(x, y) {
    return document.elementsFromPoint(x, y).find(node => node !== host && !host.contains(node));
  }
  function schedule() {
    if (frame || dead) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!screenshotMode && pointer) hovered=hit(pointer.x,pointer.y);
      draw();
    });
  }
  async function copy(text) {
    manualCopy.hidden = true;
    // The panel can be adopted into the outer workspace document. The click and
    // focus belong there, not to the inspected iframe where this script runs.
    const copyWindow = panel.ownerDocument.defaultView;
    try {
      if (!copyWindow?.navigator.clipboard || !copyWindow.isSecureContext) throw new Error('Clipboard unavailable');
      await copyWindow.navigator.clipboard.writeText(text);
      if (!dead) status.textContent = '已複製。下一步：切到 AI 對話，貼上並送出。 / Copied: paste into your AI chat. 分享前確認無私密資訊。';
    } catch {
      if (dead) return;
      manualCopy.hidden=false; manualCopy.value = text;
      manualCopy.focus(); manualCopy.select();
      manualCopy.scrollIntoView({block:'nearest'});
      status.textContent = '瀏覽器未允許自動複製。完整內容已選取，請按 Ctrl+C（Mac：Cmd+C），再貼給 AI；需求沒有遺失。';
    }
  }
  button(navigation, '↑ 上一個', () => visitMatch(-1));
  button(navigation, '↓ 下一個', () => visitMatch(1));
  button(controls, '更新圖層', renderTree);
  button(controls, '收合面板', () => {
    panel.hidden = true; dock.hidden = false;
    dock.querySelector('button').focus({ preventScroll: true });
  });
  const expand = button(dock, '詳情 / Details', () => {
    panel.hidden = false; dock.hidden = true;
    controls.querySelector('button').focus({ preventScroll: true });
  });
  expand.setAttribute('aria-expanded', 'false');
  button(dock, '關閉 ×', stop);
  const swapPanel=button(controls, '面板換邊', () => panel.classList.toggle('left'));
  swapPanel.hidden=!!externalHost; // External controls use the workspace layout, not overlay positioning.
  button(controls, '關閉 ×', stop);
  const copyName = button(copyControls, '複製元素位置', () => selected && copy(selector(selected)));
  function modificationText() {
    const alive=matches.filter(node=>node.isConnected);
    const scope = matchQuery ? '\n目前頁面比對 / Match: '+matchQuery+'\n原匹配總數: '+totalMatches+'；本清單最多 200，不代表全部 source 使用位置。\n要修改 / Include:\n'
      + alive.filter(n=>!exceptions.has(n)).map(n=>selector(n)).join('\n')+'\n例外不修改 / Exclude:\n'
      + (alive.filter(n=>exceptions.has(n)).map(n=>selector(n)).join('\n')||'無 / None') : '';
    return report.value+scope+(request.value.trim()?'\n使用者需求 / User request: '+request.value.trim():'');
  }
  const copyReport = button(copyControls, '複製修改需求', () => selected && copy(modificationText()));
  copyReport.classList.add('primary');
  const shot = tabs[3];
  function restoreCapture(){screenshotMode=false;captureCard.hidden=true;panel.hidden=false;dock.hidden=true;activateTab(2);request.focus();draw();}
  function prepareCapture(){
    if(!selected?.isConnected){goStep(0);return false;}
    if(!request.value.trim()){activateTab(2);request.focus();status.textContent='請先填寫修改需求，再準備截圖。';return false;}
    frozen=true;screenshotMode=true;hovered=null;pointer=null;panel.hidden=true;dock.hidden=true;
    externalHost?.dispatchEvent(new CustomEvent('inspector:capture',{bubbles:true,composed:true,detail:{rect:selected.getBoundingClientRect().toJSON()}}));
    captureCard.replaceChildren(make('h2','','選取目標與修改需求 / Change brief'),
      make('p','','黃框指出你要修改的元素，讓 AI 看懂位置；不是另一個檢查步驟。'),
      make('pre','capture-selector',selector(selected)),
      make('p','capture-request',request.value.trim()));
    captureCard.querySelector('.capture-request').setAttribute('data-no-translate','');
    captureCard.querySelector('.capture-selector').setAttribute('data-no-translate','');
    const excluded=matches.filter(node=>node.isConnected&&exceptions.has(node));
    const scope=make('pre','capture-scope',matchQuery+'\n'+excluded.map(selector).join('\n'));
    scope.setAttribute('data-no-translate','');
    captureCard.append(make('strong','','比對規則與不修改的例外 / Match and exclusions'),scope,
      make('p','muted','請一起截取目標與修改單。若文字太小，改用 100% 顯示；長文請分張截取或搭配複製文字，不要只截到一部分。'),
      make('p','muted','Print Screen 的行為由 Windows 設定決定；也可手動按 PrtSc、Win+Shift+S，Mac 使用 Shift+Cmd+4。'));
    button(captureCard,'返回編輯 / Back to edit',restoreCapture);
    button(captureCard,'Print Screen',()=>nativeCapture('printscreen'));
    button(captureCard,'開啟 Windows 剪取工具',()=>nativeCapture('snipping'));
    captureCard.hidden=false;captureCard.tabIndex=-1;draw();captureCard.focus({preventScroll:true});return true;
  }
  async function nativeCapture(action){
    if(!screenshotMode&&!prepareCapture())return;
    try {
      const response=await fetch('/_inspector/capabilities',{cache:'no-store',redirect:'error',credentials:'omit'});
      if(!response.ok) throw new Error('Helper unavailable');
      const capability=await response.json();
      if(!capability[action] || typeof capability.token!=='string') throw new Error('Not enabled');
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      const launched=await fetch('/_inspector/'+action,{method:'POST',redirect:'error',credentials:'omit',headers:{'X-Inspector-Token':capability.token}});
      if(!launched.ok) throw new Error('Launch failed');
      if(dead)return;
      captureCard.append(make('p','muted','已送出本機請求，不代表截圖或貼上已完成。請自行確認並貼給 AI。'));
    } catch {
      if(!dead) captureCard.append(make('p','muted','未啟用原生操作；請手動按 PrtSc 或 Win+Shift+S。可選擇以 --enable-printscreen 或 --enable-snipping 啟動本機 helper。'));
    }
  }
  [copyName, copyReport, shot].forEach(node => { node.disabled = true; });
  on(shield, 'pointermove', event => {
    pointer = { x: event.clientX, y: event.clientY }; schedule();
  });
  on(shield,'pointerleave',()=>{hovered=null;pointer=null;draw();});
  on(shield, 'pointerdown', event => {
    event.preventDefault(); event.stopImmediatePropagation();
    if (!screenshotMode) { const node=hit(event.clientX,event.clientY);if(node)pickGroup(node); }
  });
  for (const event of ['click', 'dblclick', 'contextmenu']) on(shield, event, e => {
    e.preventDefault(); e.stopImmediatePropagation();
  });
  on(document, 'keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopImmediatePropagation();
      if (screenshotMode) { restoreCapture(); }
      else stop();
    } else if (!event.composedPath().includes(host) && ['Enter', ' '].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      pickGroup(document.activeElement);
    }
  }, true);
  if(externalHost) on(externalHost,'keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();if(screenshotMode)restoreCapture();else stop();}
  });
  on(window, 'scroll', schedule, true);
  on(window, 'resize', () => { if (selected) describe(); schedule(); });
  const observer = new MutationObserver(() => {
    if (selected && !selected.isConnected) {
      selected = null; frozen = false;updateSteps();
      info.textContent = '元素已移除；請重新選取 / Element removed; select again';
      report.value = ''; chain.replaceChildren();
      [copyName, copyReport, shot].forEach(node => { node.disabled = true; });
      draw();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  function stop() {
    if (dead) return;
    dead = true;
    observer.disconnect();
    unbindLocale.forEach(unbind=>unbind?.());
    listeners.forEach(remove => remove());
    cancelAnimationFrame(frame);
    host.remove();
    if(externalHost){externalHost.dispatchEvent(new CustomEvent('inspector:closed',{bubbles:true,composed:true}));externalHost.remove();}
    delete window[KEY];
    if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === 'function') previousFocus.focus({ preventScroll: true });
  }
  window[KEY] = { version: '1.0.0', stop };
  updateSteps();
  renderTree();
  draw();
  shield.focus({ preventScroll: true });
})();
