const { chromium } = require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  for (const [width, height] of [[1440,1080],[834,1194],[390,844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://127.0.0.1:5173');
    await page.evaluate(() => document.fonts.ready);
    const trigger = page.locator('.ongyeol-ai-chat-button');
    const panel = page.locator('#ai-consultation');
    await page.locator('#search-trigger').click();
    await trigger.click();
    await page.waitForTimeout(300);
    assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
    assert.equal(await trigger.getAttribute('aria-label'), 'AI 상담 닫기');
    assert.equal(await page.locator('#search-trigger').getAttribute('aria-expanded'), 'false');
    const measure = () => page.evaluate(() => {
      const rect = (selector) => { const r=document.querySelector(selector).getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right }; };
      return { panel:rect('#ai-consultation'),button:rect('.ongyeol-ai-chat-button'),visual:rect('.ongyeol-ai-chat-visual'),font:getComputedStyle(document.querySelector('.ongyeol-consultation-copy')).fontSize,images:[...document.querySelectorAll('#ai-consultation img')].map(i=>({loaded:i.complete&&i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height})) };
    });
    const before = await measure();
    assert.equal(before.panel.width,420); assert.equal(before.panel.height,760);
    assert.equal(before.button.width,60); assert.equal(before.button.height,60);
    assert.equal(before.visual.width,60); assert.equal(before.font,'14px');
    assert.ok(before.images.every(i=>i.loaded));
    // Leave the panel and trigger to verify pointer leave does not close it.
    await page.mouse.move(0,height-1);
    await page.evaluate(() => scrollTo(0,document.body.scrollHeight));
    await page.waitForTimeout(300);
    const after = await measure();
    assert.deepEqual(before.panel,after.panel);
    assert.equal(await trigger.getAttribute('aria-expanded'),'true');
    if(width===1440) await page.screenshot({path:'verification/chat-desktop.png'});
    await trigger.click();
    assert.equal(await panel.getAttribute('inert'),'');
    await page.waitForTimeout(300);
    assert.ok(await panel.isHidden());
    assert.equal(await trigger.getAttribute('aria-label'),'AI 상담 열기');
    assert.ok(await trigger.evaluate(el=>el===document.activeElement));
    await trigger.click(); await page.waitForTimeout(300);
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    assert.ok(await panel.isHidden());
    assert.ok(await trigger.evaluate(el=>el===document.activeElement));
    results.push({viewport:[width,height],...before});
    await page.close();
  }
  console.log(JSON.stringify(results,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
