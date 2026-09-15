/* Local UI strings only. No storage, network, page-text scraping or account access. */
(() => {
  'use strict';
  if(window.DesignWorkflowLocale)return;
  const catalog = /* LOCALE_CATALOG */ {};
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
