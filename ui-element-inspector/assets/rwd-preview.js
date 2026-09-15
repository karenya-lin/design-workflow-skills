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
  const rail=document.createElement('nav');rail.className='match-rail';rail.hidden=true;
  rail.setAttribute('aria-label','同類定位 / Match positions');
  document.querySelector('.preview-area').append(rail);
  const railMode=document.createElement('select');railMode.setAttribute('aria-label','定位清單 / Position list');
  for(const [value,text] of [['all','同類 / Matches'],['copy','本次 / To copy']]){const option=document.createElement('option');option.value=value;option.textContent=text;railMode.append(option);}
  const markers=document.createElement('div');markers.className='match-markers';rail.append(railMode,markers);
  function filterMarkers(){[...markers.children].forEach(button=>{button.hidden=railMode.value==='copy'&&button.classList.contains('excluded');});}
  railMode.addEventListener('change',filterMarkers);
  const matchDock=document.querySelector('[data-inspector-dock]');
  // A held selection starts inspection; hovering and tree disclosure are previews only.
  matchDock.addEventListener('inspector:selected',()=>{document.querySelector('.rwd-controls').open=false;});
  matchDock.addEventListener('inspector:matches',event=>{
    const {items,current}=event.detail;rail.hidden=!items.length;
    if(markers.children.length!==items.length){
      markers.replaceChildren(...items.map(item=>{
        const button=document.createElement('button');button.type='button';button.dataset.matchIndex=String(item.index);const number=document.createElement('span');number.textContent=String(item.index+1);button.append(number);
        button.addEventListener('click',()=>matchDock.querySelector('[data-inspector-external]')?.dispatchEvent(new CustomEvent('inspector:visit',{detail:{index:item.index}})));
        return button;
      }));
    }
    items.forEach((item,index)=>{
      const button=markers.children[index];button.disabled=!item.available;
      button.setAttribute('aria-current',String(index===current));button.classList.toggle('excluded',item.excluded);
      button.title=`#${index+1} · ${item.name}`+(item.excluded?' · '+locale.translate('例外 / Excluded'):'');
      button.setAttribute('aria-label',button.title);
    });
    railMode.options[1].disabled=!items.some(item=>!item.excluded);
    if(railMode.options[1].disabled)railMode.value='all';
    filterMarkers();
  });
  matchDock.addEventListener('inspector:closed',()=>{rail.hidden=true;markers.replaceChildren();});
  // Leave space for the DOM tree on initial narrow/short windows; settings remain expandable.
  if(innerHeight<500||innerWidth<=700)document.querySelector('.rwd-controls').open=false;
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
  const brand=$('brand');
  brand.addEventListener('change',()=>{
    const current=preset.selectedOptions[0];
    [...preset.querySelectorAll('optgroup')].forEach((group,index)=>{
      group.hidden=brand.value!=='all'&&brand.value!==String(index);
      group.disabled=group.hidden;
    });
    if(current?.parentElement.hidden)preset.value='';
  });
  preset.addEventListener('change', () => {
    if (!preset.value) return;
    if (preset.value === 'custom') { width.focus(); return; }
    [width.value, height.value] = (preset.selectedOptions[0].dataset.size || preset.value).split(','); apply();
  });
  for (const input of [width,height]) {
    input.addEventListener('input', () => { preset.value = 'custom'; brand.value='all'; [...preset.querySelectorAll('optgroup')].forEach(group=>{group.hidden=false;group.disabled=false;}); });
    input.addEventListener('change', apply);
  }
  $('rotate').addEventListener('click', () => {
    if (!$('sizes').reportValidity()) return;
    [width.value,height.value] = [height.value,width.value]; brand.value='all'; brand.dispatchEvent(new Event('change')); preset.value = 'custom'; apply();
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
  let inspectorLoading=false, inspectorRequested=false;
  function startInspector(){
    inspectorRequested=true;
    if(inspectorLoading)return;
    try {
      const doc=frame.contentDocument;
      if(!doc || new URL(frame.src).origin!==location.origin) throw new Error('Cross origin');
      if(frame.contentWindow.DesignWorkflowInspector)return;
      if(doc.readyState!=='complete')return;
      inspectorLoading=true;
      const script=doc.createElement('script'); script.src=new URL('inspector.js',location.href).href;
      script.onload=()=>{inspectorLoading=false;script.remove();$('inspect-status').hidden=true;$('inspect').hidden=true;$('inspect').textContent='重新開啟指認 / Restart';$('inspect-status').textContent='點畫面或圖層名稱定位，箭頭展開子層。 / Click a layer name to select; arrows expand';};
      script.onerror=()=>{inspectorLoading=false;script.remove();$('inspect-status').hidden=false;$('inspect-status').textContent='腳本被阻擋；不修改 CSP。 / Script blocked; do not weaken CSP';};
      doc.head.append(script);
    } catch { $('inspect-status').hidden=false;$('inspect-status').textContent='不同來源不可讀 DOM；請在該專案另行批准開發接線。不繞過瀏覽器限制。 / Cross-origin DOM unavailable'; }
  }
  $('inspect').addEventListener('click',startInspector);
  stage.addEventListener('pointerenter',startInspector);
  document.querySelector('[data-inspector-dock]').addEventListener('inspector:closed',()=>{inspectorRequested=false;$('inspect').hidden=false;});
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
    rail.hidden=true;markers.replaceChildren();
    $('inspect').hidden=false;
    document.querySelector('[data-inspector-dock]').replaceChildren();
    $('inspect-status').hidden=false;
    inspectorLoading=false;
    $('inspect-status').textContent='移到左側預覽即可指認；點一下選取。也可用鍵盤啟用按鈕。';
    if(inspectorRequested||stage.matches(':hover'))startInspector();
  });
  apply();
})();
