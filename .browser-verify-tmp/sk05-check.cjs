const { chromium } = require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/ONGYEOL/');
  await page.getByRole('button', {name:'AI 상담 열기',exact:true}).click();
  await page.getByRole('button', {name:'문의하기',exact:true}).click();
  await page.getByRole('button', {name:'스킨가이드',exact:true}).click();
  await page.getByRole('button', {name:'스킨 가이드 시작하기',exact:true}).click();
  const choose = name => page.getByRole('button', {name,exact:true}).click();
  const ingredients = () => choose('내 피부에 필요한 성분 확인하기');
  const products = () => choose('온결 추천 제품 확인하기');
  const back = () => page.locator('.ongyeol-inquiry:visible .ongyeol-inquiry-back').click();
  await choose('주름·탄력');
  assert.match(await page.locator('.ongyeol-chat-skin-guide-type-detail-copy').innerText(), /주름·탄력/);
  await ingredients(); await products();
  const article = page.locator('.ongyeol-chat-products-content');
  const previous = page.getByRole('button',{name:'이전 추천제품',includeHidden:true});
  const next = page.getByRole('button',{name:'다음 추천제품',includeHidden:true});
  const measurements = [];
  for (let i=0;i<3;i++) {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.querySelectorAll('.ongyeol-chat-products img')].every(img=>img.complete&&img.naturalWidth>0));
    assert.match(await article.innerText(), new RegExp(`STEP  0${i+1}`));
    assert.equal(await previous.isVisible(),i>0);
    assert.equal(await next.isVisible(),i<2);
    assert.equal(await page.getByRole('button',{name:'제품 보러가기',exact:true}).isDisabled(),true);
    const geometry = await page.evaluate(() => {
      const rect = selector => {const r=document.querySelector(selector).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
      const panel=rect('#ai-consultation'),button=rect('.ongyeol-ai-chat-button');
      return {panel,gap:button.y-panel.bottom,composer:rect('.ongyeol-chat-products .ongyeol-inquiry-composer'),images:[...document.querySelectorAll('.ongyeol-chat-products-image img')].map(img=>({width:img.width,height:img.height,left:img.offsetLeft,top:img.offsetTop})),name:document.querySelector('.ongyeol-chat-products-names h2').textContent};
    });
    assert.equal(geometry.gap,30); assert.equal(geometry.panel.width,420); assert.equal(geometry.panel.height,760);
    assert.equal(geometry.composer.y-geometry.panel.y,646);
    assert.equal(geometry.composer.width,377);
    await page.locator('#ai-consultation').screenshot({path:`.browser-verify-tmp/sk05-step-${i+1}.png`});
    measurements.push(geometry);
    if(i<2) await next.click();
  }
  assert.deepEqual(measurements.map(m=>m.name),['백목이 수분 농축 앰플, 50ml','PDRN 로즈 밸런싱 크림','PDRN 리페어 로즈 아이크림']);
  await previous.click(); assert.match(await article.innerText(), /STEP  02/);
  await choose('AI 상담 닫기'); await page.waitForTimeout(300); await choose('AI 상담 열기');
  assert.match(await article.innerText(), /STEP  02/);
  await back(); assert.ok(await page.locator('.ongyeol-chat-skin-guide-recommendation').isVisible());
  await products(); assert.match(await article.innerText(), /STEP  01/);
  await back(); await back();
  assert.match(await page.locator('.ongyeol-chat-skin-guide-type-detail-copy').innerText(), /주름·탄력/);
  await back(); assert.equal(await page.getByRole('button',{name:'주름·탄력',exact:true}).getAttribute('aria-pressed'),'true');
  for(const label of ['저자극·진정','수분·보습','모공·피지','피부톤·기미·잡티']) {
    await choose(label); await ingredients();
    assert.equal(await page.getByRole('button',{name:'온결 추천 제품 확인하기',exact:true}).isDisabled(),true);
    assert.equal(await page.locator('.ongyeol-chat-products').count(),0);
    await back(); await back();
  }
  await choose('주름·탄력'); await ingredients(); await products(); assert.match(await article.innerText(),/STEP  01/);
  await page.setViewportSize({width:834,height:1194});
  await page.waitForTimeout(300);
  assert.equal(await page.locator('#ai-consultation').evaluate(el=>el.getBoundingClientRect().width),420);
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  assert.ok(await page.locator('#ai-consultation').isHidden());
  assert.deepEqual(errors,[]);
  // Exercise the same shared component with real confirmed data sliced to 1/2
  // products, without adding unconfirmed concern data to the application.
  for (const count of [1,2]) {
    await page.evaluate(async count => {
      const React = await import('/ONGYEOL/node_modules/.vite/deps/react.js');
      const client = await import('/ONGYEOL/node_modules/.vite/deps/react-dom_client.js');
      const {default: Screen} = await import('/ONGYEOL/src/components/AIchat/SK05Recommend.jsx');
      const {skinGuideData} = await import('/ONGYEOL/src/components/AIchat/skinGuideData.js');
      window.sk05TestRoot?.unmount();
      const host=document.createElement('div');host.className='ongyeol-consultation is-visible';host.id='sk05-test';document.body.append(host);
      window.sk05TestRoot=client.default.createRoot(host);
      window.sk05TestRoot.render(React.default.createElement(Screen,{products:skinGuideData.combination.products.slice(0,count),onBack:()=>{}}));
    },count);
    const test=page.locator('#sk05-test').last();
    await test.locator('.ongyeol-chat-products-step').waitFor();
    assert.equal(await test.getByRole('button',{name:'이전 추천제품',includeHidden:true}).isVisible(),false);
    assert.equal(await test.getByRole('button',{name:'다음 추천제품',includeHidden:true}).isVisible(),count>1);
    if(count===2){await test.getByRole('button',{name:'다음 추천제품'}).click();assert.match(await test.innerText(),/STEP  02/);assert.equal(await test.getByRole('button',{name:'다음 추천제품',includeHidden:true}).isVisible(),false);}
  }
  fs.writeFileSync('.browser-verify-tmp/sk05-results.json',JSON.stringify({passed:true,checks:'flow, order, navigation boundaries, back, reentry, close/reopen, other concerns, geometry, images, Escape',measurements,errors},null,2));
  console.log('PASS: flow, all steps, navigation, reset, other concerns, geometry, images, close/reopen; no browser errors');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
