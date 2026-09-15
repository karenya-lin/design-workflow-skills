/* Synthetic local checks. Native capture and clipboard are mocked, never read. */
async(page)=>{
  const results=[];const check=(name,pass)=>results.push({name,pass:!!pass});
  await page.route('**/*',r=>r.continue());
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:4321/rwd-preview.html?lang=en');
  await page.locator('#preset').selectOption('1280,800');
  if(await page.locator('#inspect').isVisible())await page.locator('#inspect').click();
  const panel=page.locator('[data-inspector-external]');await panel.locator('.tree').waitFor();
  check('first use highlights language',await panel.locator('select.first-use').count()===1);
  check('English first step',await panel.getByRole('tab',{name:'① Select',exact:true}).isVisible());
  await panel.getByRole('button',{name:'Expand/collapse section.grid',exact:true}).click();
  await panel.locator('.tree-name').filter({hasText:'article.card'}).first().click();
  await panel.getByRole('tab',{name:/② Scope/}).click();
  await panel.getByRole('button',{name:'Same class .card',exact:true}).click();
  await panel.locator('.exception-details > summary').click();
  await panel.getByRole('checkbox').nth(1).check();
  await panel.getByRole('tab',{name:'③ Request',exact:true}).click();
  const request=panel.locator('#inspector-view-2 label textarea').first();
  const text='Make included cards orange. Keep the second unchanged. <script>not executable</script>';
  await request.fill(text);
  for(const [locale,name] of [['fr','③ Demande'],['ja','③ 変更内容'],['zh-TW','③ 寫需求'],['en','③ Request']]){
    await panel.locator('select').selectOption(locale);
    await panel.getByRole('tab',{name,exact:true}).waitFor();
    check(locale+' preserves request and selection',(await request.inputValue())===text&&(await panel.locator('.selection-hint').textContent()).includes('article.card'));
    check(locale+' preserves exclusions',await panel.locator('.exceptions input').nth(1).isChecked());
  }
  check('language choice dismisses hint',!await panel.locator('.welcome').isVisible());
  await panel.getByRole('tab',{name:'Screenshot',exact:true}).click();
  const card=panel.locator('.capture-card');await card.waitFor();
  check('screenshot opens brief directly without preparation buttons',await panel.getByRole('button',{name:'Prepare screenshot',exact:true}).count()===0&&await panel.getByRole('button',{name:'Keep outlines, hide tools',exact:true}).count()===0);
  check('capture includes exact user text',(await card.locator('.capture-request').textContent())===text);
  check('capture request is text, not executable HTML',await card.locator('.capture-request script').count()===0);
  check('capture has selection and exclusion',(await card.locator('.capture-selector').textContent()).includes('article:nth-of-type(1)')&&(await card.locator('.capture-scope').textContent()).includes('article:nth-of-type(2)'));
  check('request is readable font',await card.locator('.capture-request').evaluate(n=>parseFloat(getComputedStyle(n).fontSize)>=16));
  check('capture uses actual CSS scale',await page.locator('#preview').evaluate(n=>getComputedStyle(n).transform==='matrix(1, 0, 0, 1, 0, 0)'));
  check('target remains outlined',await page.frameLocator('#preview').locator('[data-workflow-inspector] .selected').isVisible());
  await page.route('**/_inspector/capabilities',r=>r.fulfill({json:{snipping:false,printscreen:false,token:null}}));
  await card.getByRole('button',{name:'Print Screen',exact:true}).click();
  await card.getByText(/Native action unavailable/).waitFor();
  check('missing helper explains manual fallback',true);
  await card.getByRole('button',{name:'Back to edit',exact:true}).click();
  check('back restores panel and preserves request',await panel.locator('.panel').isVisible()&&(await request.inputValue())===text);
  check('back to edit opens Request and focuses it',await panel.getByRole('tab',{name:'③ Request',exact:true}).getAttribute('aria-selected')==='true'&&await request.evaluate(n=>n.getRootNode().activeElement===n));
  await request.fill('');
  await panel.getByRole('tab',{name:'Screenshot',exact:true}).click();
  check('empty request stays in editor with explanation',!await card.isVisible()&&await request.evaluate(n=>n.getRootNode().activeElement===n));
  await request.fill(text);
  await panel.getByRole('tab',{name:'Screenshot',exact:true}).focus();await panel.getByRole('tab',{name:'Screenshot',exact:true}).press('Enter');
  check('keyboard opens screenshot brief directly',await card.isVisible());
  await card.press('Escape');
  check('Escape returns to editable request',await request.isVisible()&&await request.inputValue()===text);
  await page.emulateMedia({reducedMotion:'reduce'});
  await panel.locator('select').evaluate(n=>n.classList.add('first-use'));
  check('reduced motion stops animation',await panel.locator('select').evaluate(n=>getComputedStyle(n).animationName==='none'));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await panel.getByRole('button',{name:'Close ×',exact:true}).click();
  if(await page.locator('#inspect').isVisible())await page.locator('#inspect').click();await panel.locator('.tree').waitFor();
  check('reopen does not repeat onboarding',!await panel.locator('.welcome').isVisible());
  for(const [width,height] of [[320,600],[390,844],[768,1024],[1280,900],[1920,1080],[640,300]]){
    await page.setViewportSize({width,height});
    for(const lang of ['en','zh-TW','fr','ja']){
      await panel.locator('select').selectOption(lang);
      check(`${lang} ${width}x${height} language reachable`,await panel.locator('select').isVisible());
      check(`${lang} ${width}x${height} no document overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      check(`${lang} ${width}x${height} RWD controls fit without horizontal scrolling`,await page.locator('.toolbar').evaluate(n=>n.scrollWidth<=n.clientWidth));
      check(`${lang} ${width}x${height} header fits with labelled 44px icon controls`,await panel.locator('.panel-header').evaluate(n=>{
        const controls=[...n.querySelectorAll('.controls button')].filter(b=>!b.hidden);
        return n.scrollWidth<=n.clientWidth&&controls.length===3&&controls.every(b=>{
          const box=b.getBoundingClientRect(),svg=b.querySelector('svg');
          return box.width===44&&box.height===44&&svg?.getBoundingClientRect().width===22&&svg.getAttribute('aria-hidden')==='true'&&b.title===b.getAttribute('aria-label')&&b.title.length>0;
        });
      }));
    }
  }
  await page.goto('http://127.0.0.1:4321/rwd-preview.html?aiLang=ja');
  check('AI language passed explicitly',await page.evaluate(()=>DesignWorkflowLocale.current()==='ja'));
  await page.goto('http://127.0.0.1:4321/rwd-preview.html?lang=fr&aiLang=ja');
  check('explicit user choice wins',await page.evaluate(()=>DesignWorkflowLocale.current()==='fr'));
  await page.goto('http://127.0.0.1:4321/rwd-preview.html?lang=auto');
  check('default follows browser, English fallback',await page.evaluate(()=>DesignWorkflowLocale.current()===(navigator.language.startsWith('zh')?'zh-TW':navigator.language.startsWith('fr')?'fr':navigator.language.startsWith('ja')?'ja':'en')));
  return {results,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length};
}
