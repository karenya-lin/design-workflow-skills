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
    @media(max-height:500px) { .panel-header { padding:0 8px; }.panel-heading { display:none; }.controls { width:100%;justify-content:flex-end; }.categories { padding:3px 8px; }.help { display:none; }.step-footer { padding:5px 10px; }.view-body { padding:6px 10px; }.selection-hint { padding:4px 10px;min-height:24px; }.status { padding:4px 10px;min-height:24px;max-height:42px; }.layers-body { display:block; }.tree { height:30dvh; } }
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
  dock.setAttribute('role', 'toolbar');
  dock.setAttribute('aria-label', '元素指認工具 / Inspector controls');
  panel.setAttribute('aria-label', 'UI element inspector');
  const panelHeading=make('div','panel-heading');
  panelHeading.append(make('h2','','UI Inspect'),make('span','local-badge','LOCAL'));
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
    const tab=button(categories,text,()=>activateTab(i));tab.id='inspector-tab-'+i;
    tab.setAttribute('role','tab');tab.setAttribute('aria-controls',views[i].id);
    tab.setAttribute('aria-selected',String(i===0));tab.tabIndex=i===0?0:-1;
    tab.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?3:(i+(event.key==='ArrowRight'?1:3))%4;
      activateTab(next);tabs[next].focus();
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
  const help=make('details','help');help.append(make('summary','','操作提示與安全 / Help & privacy'),make('p','muted','① Select → ② Check scope → ③ Write and copy. Click selects; Hover previews. 紫框：同類；灰虛線：例外；黃框：選取。只讀 DOM，不讀輸入值、Cookie 或 React 內部資料，不自動上傳。Esc 關閉。'));
  panel.append(panelHeader,categories,selectionHint,...views,status,help);
  shadow.append(shield, ...outlines, hoverOutline, label, panel, dock);
  document.documentElement.append(host);
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
      externalShadow.append(externalStyle, panel, dock);
      mount.append(externalHost); panel.hidden = false; dock.hidden = true;
    }
  } catch { /* Cross-origin embedding never permits DOM access. */ }
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
    const component = name ? short(name) + ' (明確標記 / explicit attribute)' : '未知 / Unknown; no component annotation';
    info.textContent = `${frozen ? '已固定 / Selected' : 'Hover'} · ${kind}\n${identity(selected)}\n`
      + `Component: ${component}\n${details.display} · ${details.position} · ${details.size}\n`
      + `padding: ${details.padding}\nmargin: ${details.margin}\ngap: ${details.gap}`;
    const ancestors = parents(selected);
    report.value = `請修改此元素 / Please update this element:\nSelector: ${path}\n`
      + `DOM: ${identity(selected)}\nComponent: ${component}\n`
      + `Layout: ${details.display}; position: ${details.position}; size: ${details.size}\n`
      + `Padding: ${details.padding}; margin: ${details.margin}; gap: ${details.gap}\n`
      + `Flex direction: ${details.direction}; grid columns: ${details.columns}\n`
      + `Parents: ${ancestors.slice(1).map(identity).join(' ← ')}\n`
      + `Viewport: ${innerWidth} × ${innerHeight}\n`
      + '需求 / Requested change: \n'
      + '只改此範圍；先從 source 確認對應元件。Selector 是當下 DOM 定位，不是原始碼檔名。';
    if (['iframe', 'canvas'].includes(tag(selected))) report.value += '\n此節點內部不可由本工具辨識 / Inner content not inspected.';
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
    try {
      if (!navigator.clipboard || !isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (!dead) status.textContent = '已複製。下一步：切到 AI 對話，貼上並送出。 / Copied: paste into your AI chat. 分享前確認無私密資訊。';
    } catch {
      if (dead) return;
      manualCopy.hidden=false; manualCopy.value = text;
      manualCopy.focus(); manualCopy.select();
      status.textContent = '自動複製不可用；文字已選取，請 Ctrl+C / Cmd+C。';
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
  const shot = button(bodies[3], '準備截圖', () => {
    if (!selected) return;
    frozen = true;
    status.textContent = '這裡不會自動截圖或上傳。按下方隱藏面板後，用 Win+Shift+S（Mac: Shift+Cmd+4）剪取、畫記，再自行貼給 AI。Esc 恢復面板。';
    screenshotHelp.hidden = false;
  });
  const screenshotHelp = make('div', 'actions');
  screenshotHelp.hidden = true;
  button(screenshotHelp, '保留框線，隱藏面板', () => {
    screenshotHelp.hidden = true;
    screenshotMode = true;
    panel.hidden = true;
    dock.hidden = true;
    shield.focus({ preventScroll: true });
  });
  button(screenshotHelp, '開啟 Windows 剪取工具', async () => {
    try {
      const response=await fetch('/_inspector/capabilities',{cache:'no-store',redirect:'error',credentials:'omit'});
      if(!response.ok) throw new Error('Helper unavailable');
      const capability=await response.json();
      if(!capability.snipping || typeof capability.token!=='string') throw new Error('Not enabled');
      const launched=await fetch('/_inspector/snipping',{method:'POST',redirect:'error',credentials:'omit',headers:{'X-Inspector-Token':capability.token}});
      if(!launched.ok) throw new Error('Launch failed');
      if(dead)return;
      status.textContent='已送出本機開啟請求；在剪取工具按「新增」選區。截圖與貼給 AI 由你操作，本工具不讀取圖片。';
    } catch {
      if(!dead) status.textContent='未啟用或無法開啟本機工具。可用 Win+Shift+S；選用支援需執行 preview_server.py --port 指定埠 --enable-snipping。';
    }
  });
  bodies[3].append(screenshotHelp);
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
      if (screenshotMode) { screenshotMode = false; panel.hidden = false; dock.hidden = true; activateTab(3);shot.focus(); }
      else stop();
    } else if (!event.composedPath().includes(host) && ['Enter', ' '].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      pickGroup(document.activeElement);
    }
  }, true);
  if(externalHost) on(externalHost,'keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();stop();}
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
