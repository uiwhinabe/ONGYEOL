const { chromium } = require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  const page = await browser.newPage({viewport:{width:1440,height:1080}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5174/ONGYEOL/');
  const click=name=>page.getByRole('button',{name,exact:true}).click();
  const back=()=>page.locator('.ongyeol-inquiry:visible .ongyeol-inquiry-back').click();
  const article=page.locator('.ongyeol-chat-products-content');
  const prev=page.getByRole('button',{name:'이전 추천제품',includeHidden:true});
  const next=page.getByRole('button',{name:'다음 추천제품',includeHidden:true});
  await click('AI 상담 열기');await click('문의하기');await click('스킨가이드');await click('스킨 가이드 시작하기');
  const data = await page.evaluate(async()=> {
    const {skinGuideData}=await import('/ONGYEOL/src/components/AIchat/skinGuideData.js');return skinGuideData;
  });
  const results=[];
  for(const [label,id] of [['저자극·진정','oily'],['주름·탄력','combination'],['저자극·진정','oily']]) {
    await click(label);
    assert.match(await page.locator('.ongyeol-chat-skin-guide-type-detail-copy').innerText(), new RegExp(label));
    await click('내 피부에 필요한 성분 확인하기');await click('온결 추천 제품 확인하기');
    for(let step=0;step<3;step++) {
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForFunction(()=>[...document.querySelectorAll('.ongyeol-chat-products img')].every(i=>i.complete&&i.naturalWidth>0));
      assert.equal(await article.locator('h2').innerText(),data[id].products[step].name);
      assert.equal(await article.locator('.ongyeol-chat-products-english').innerText(),data[id].products[step].englishName);
      assert.equal(await article.locator('.ongyeol-chat-products-step').innerText(),`STEP  0${step+1}`);
      assert.equal(await prev.isVisible(),step>0);assert.equal(await next.isVisible(),step<2);
      assert.equal(await page.getByRole('button',{name:'제품 보러가기',exact:true}).isDisabled(),true);
      const geometry=await page.evaluate(()=> {
        const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
        const panel=rect('#ai-consultation');
        return {panel,gap:rect('.ongyeol-ai-chat-button').y-panel.bottom,composer:rect('.ongyeol-chat-products .ongyeol-inquiry-composer'),article:rect('.ongyeol-chat-products-content'),images:[...document.querySelectorAll('.ongyeol-chat-products-image img')].map(i=>({loaded:i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height}))};
      });
      assert.equal(geometry.panel.width,420);assert.equal(geometry.panel.height,760);assert.equal(geometry.gap,30);
      assert.equal(geometry.composer.y-geometry.panel.y,646);assert.equal(geometry.composer.width,377);
      assert.equal(geometry.article.y-geometry.panel.y,data[id].products[step].contentTop??170);
      await page.locator('#ai-consultation').screenshot({path:`.browser-verify-tmp/${id}-step-${step+1}.png`});
      results.push({id,step:step+1,...geometry});
      if(step<2)await next.click();
    }
    await prev.click();assert.match(await article.innerText(),/STEP  02/);
    await prev.click();assert.match(await article.innerText(),/STEP  01/);
    const before=await article.boundingBox();
    await next.click();await prev.click();assert.deepEqual(await article.boundingBox(),before);
    await click('AI 상담 닫기');await page.waitForTimeout(300);await click('AI 상담 열기');
    assert.match(await article.innerText(),/STEP  01/);
    await next.click();await back();
    assert.match(await page.locator('.ongyeol-chat-skin-guide-recommendation-copy').innerText(),new RegExp(id==='oily'?'예민해진':'주름과 탄력'));
    await click('온결 추천 제품 확인하기');assert.match(await article.innerText(),/STEP  01/);
    await back();await back();await back();
    assert.equal(await page.getByRole('button',{name:label,exact:true}).getAttribute('aria-pressed'),'true');
  }
  for(const label of ['수분·보습','모공·피지','피부톤·기미·잡티']) {
    await click(label);await click('내 피부에 필요한 성분 확인하기');
    assert.equal(await page.getByRole('button',{name:'온결 추천 제품 확인하기',exact:true}).isDisabled(),true);
    assert.equal(await page.locator('.ongyeol-chat-products').count(),0);await back();await back();
  }
  await click('저자극·진정');await click('내 피부에 필요한 성분 확인하기');await click('온결 추천 제품 확인하기');
  for(const [width,height] of [[834,1194],[390,1000]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(300);
    const m=await page.evaluate(()=>{const p=document.querySelector('#ai-consultation').getBoundingClientRect(),b=document.querySelector('.ongyeol-ai-chat-button').getBoundingClientRect();return {x:p.x,width:p.width,height:p.height,gap:b.y-p.bottom};});
    assert.equal(m.width,420);assert.equal(m.height,760);assert.equal(m.gap,30);
    // Existing AIConsultation.css keeps a 24px right offset below 834px.
    assert.equal(m.x,width-420-24);
  }
  assert.deepEqual(errors,[]);
  fs.writeFileSync('.browser-verify-tmp/calm-results.json',JSON.stringify({passed:true,results,errors},null,2));
  await browser.close();console.log('PASS: 3 calm steps, wrinkle regression, alternating concerns, reentry, back, arrows, images, 30px gap, responsive positioning, remaining concerns; no browser errors');
})().catch(e=>{console.error(e);process.exit(1)});
