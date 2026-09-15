(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const locale=window.DesignWorkflowLocale;
  locale.bind(document.documentElement);
  document.documentElement.lang=locale.current();
  window.addEventListener('workflow:language',()=>{document.documentElement.lang=locale.current();});
  const width = $('width'), height = $('height'), preset = $('preset');
  const frame = $('preview'), result = $('result');
  const stage=document.querySelector('.stage'), shell=document.querySelector('.preview-shell');
  // Start compact in short windows; the user can still expand settings explicitly.
  if(innerHeight<500)document.querySelector('.rwd-controls').open=false;
  let fit=true;
  function fitPreview() {
    const css=getComputedStyle(stage);
    const availableWidth=stage.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight);
    const availableHeight=stage.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom);
    const scale=fit?Math.max(.01,Math.min(1,availableWidth/frame.clientWidth,availableHeight/frame.clientHeight)):1;
    frame.style.transform=`scale(${scale})`;
    shell.style.width=frame.clientWidth*scale+'px';shell.style.height=frame.clientHeight*scale+'px';
    $('fit').textContent=fit?`適合畫面 ${Math.round(scale*100)}%`:'100% 原尺寸';
    $('fit').setAttribute('aria-pressed',String(fit));
  }
  function setStatus(text) {
    result.textContent=text; result.title=text;
    const feedback=$('rwd-feedback');
    feedback.textContent=text.includes('CSS px')?'':text;
    feedback.hidden=!feedback.textContent;
  }
  function apply() {
    if (!$('sizes').reportValidity()) return;
    $('size-summary').textContent=width.valueAsNumber+' × '+height.valueAsNumber;
    frame.style.width = width.valueAsNumber + 'px';
    frame.style.height = height.valueAsNumber + 'px';
    setStatus(`${width.valueAsNumber} × ${height.valueAsNumber} CSS px`);
    result.title+=' · 排版預覽，尚未人工驗收 / Layout preview, not a PASS result';
    fitPreview();
  }
  $('sizes').addEventListener('submit', event => { event.preventDefault(); apply(); });
  $('fit').addEventListener('click',()=>{fit=!fit;fitPreview();});
  new ResizeObserver(fitPreview).observe(stage);
  preset.addEventListener('change', () => {
    if (preset.value === 'custom') { width.focus(); return; }
    [width.value, height.value] = (preset.selectedOptions[0].dataset.size || preset.value).split(','); apply();
  });
  for (const input of [width,height]) input.addEventListener('input', () => { preset.value = 'custom'; });
  $('rotate').addEventListener('click', () => {
    if (!$('sizes').reportValidity()) return;
    [width.value,height.value] = [height.value,width.value]; preset.value = 'custom'; apply();
  });
  $('load').addEventListener('click', () => {
    if (!$('approved').checked) { setStatus('請先確認授權、資料及分析門檻 / Confirm the safety gates first'); return; }
    try {
      const url = new URL($('url').value);
      if (url.protocol !== 'http:' || !['localhost','127.0.0.1'].includes(url.hostname) || url.username || url.password || url.search || url.hash) throw new Error('Not permitted');
      if (url.origin === location.origin && url.pathname === location.pathname) throw new Error('Recursive preview');
      frame.src = url.href;
      setStatus('已要求載入，請確認畫面；不代表成功或通過 / Load requested; verify the frame');
    } catch { setStatus('只接受無帳密、query 或 fragment 的本機 HTTP 網址 / Local HTTP URL only, no credentials, query or fragment'); }
  });
  $('more').addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();$('more').open=false;$('more').querySelector('summary').focus();}
  });
  $('url').addEventListener('input', () => { $('approved').checked = false; });
  $('demo').addEventListener('click', () => { frame.src = 'demo.html'; $('approved').checked = false; apply(); });
  $('inspect').addEventListener('click',()=>{
    try {
      const doc=frame.contentDocument;
      if(!doc || new URL(frame.src).origin!==location.origin) throw new Error('Cross origin');
      if(frame.contentWindow.DesignWorkflowInspector) frame.contentWindow.DesignWorkflowInspector.stop();
      const script=doc.createElement('script'); script.src=new URL('inspector.js',location.href).href;
      script.onload=()=>{script.remove();$('inspect-status').hidden=true;$('inspect').hidden=true;$('inspect').textContent='重新開啟指認 / Restart';$('inspect-status').textContent='點畫面或圖層名稱定位，箭頭展開子層。 / Click a layer name to select; arrows expand';};
      script.onerror=()=>{script.remove();$('inspect-status').hidden=false;$('inspect-status').textContent='腳本被阻擋；不修改 CSP。 / Script blocked; do not weaken CSP';};
      doc.head.append(script);
    } catch { $('inspect-status').hidden=false;$('inspect-status').textContent='不同來源不可讀 DOM；請在該專案另行批准開發接線。不繞過瀏覽器限制。 / Cross-origin DOM unavailable'; }
  });
  document.querySelector('[data-inspector-dock]').addEventListener('inspector:closed',()=>{$('inspect').hidden=false;});
  document.querySelector('[data-inspector-dock]').addEventListener('inspector:capture',event=>{
    // Readable capture: actual CSS scale, centered on the selected element.
    fit=false;fitPreview();
    requestAnimationFrame(()=>{
      const rect=event.detail.rect;
      stage.scrollLeft=Math.max(0,rect.x+rect.width/2-stage.clientWidth/2);
      stage.scrollTop=Math.max(0,rect.y+rect.height/2-stage.clientHeight/2);
    });
  });
  frame.addEventListener('load',()=>{
    $('inspect').hidden=false;
    document.querySelector('[data-inspector-dock]').replaceChildren();
    $('inspect-status').hidden=false;
    $('inspect-status').textContent='預覽已換頁，請重新開啟指認 / Preview navigated; activate inspector again';
  });
  apply();
})();
