const {chromium}=require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:1080}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5174/ONGYEOL/');
const click=name=>page.getByRole('button',{name,exact:true}).click();
await click('AI 상담 열기');await click('문의하기');await click('스킨가이드');await click('스킨 가이드 시작하기');
const next=page.getByRole('button',{name:'다음 추천제품'}),prev=page.getByRole('button',{name:'이전 추천제품'});
const step=page.locator('.ongyeol-chat-products-step');
const back=()=>page.locator('.ongyeol-inquiry:visible .ongyeol-inquiry-back').click();
const fixed=()=>page.evaluate(()=>['.ongyeol-chat-products-actions','.ongyeol-chat-products-navigation','.ongyeol-chat-products .ongyeol-inquiry-composer'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
for(const label of ['주름·탄력','저자극·진정','수분·보습','모공·피지','피부톤·기미·잡티']){
await click(label);await click('내 피부에 필요한 성분 확인하기');await click('온결 추천 제품 확인하기');
await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(200);
if(label==='주름·탄력'){
const m=await page.evaluate(()=>{const e=document.querySelector('.ongyeol-chat-products-english'),d=document.querySelector('.ongyeol-chat-products-description'),p=document.querySelector('#ai-consultation');const er=e.getBoundingClientRect(),dr=d.getBoundingClientRect(),pr=p.getBoundingClientRect();return {white:getComputedStyle(e).whiteSpace,size:getComputedStyle(e).fontSize,height:er.height,gap:dr.y+parseFloat(getComputedStyle(d).paddingTop)-er.bottom,within:er.x>=pr.x&&er.right<=pr.right};});
assert.equal(m.white,'nowrap');assert.equal(m.size,'16px');assert.ok(m.height<30);assert.equal(m.gap,15);assert.ok(m.within);console.log(JSON.stringify(m));await page.locator('#ai-consultation').screenshot({path:'.browser-verify-tmp/wrinkle-ampoule-one-line.png'});
}
const initial=await fixed();
await next.evaluate(el=>{el.click();el.click();el.click();});
await page.waitForTimeout(50);
const exit=await page.locator('.ongyeol-chat-products-motion').evaluate(el=>el.getAnimations().map(a=>a.effect.getKeyframes()));assert.equal(exit[0][1].transform,'translateX(-14px)');
await page.waitForTimeout(300);assert.match(await step.innerText(),/02/);assert.deepEqual(await fixed(),initial);
await next.click();await page.waitForTimeout(320);assert.match(await step.innerText(),/03/);
assert.equal(await page.getByRole('button',{name:'다음 추천제품',includeHidden:true}).isVisible(),false);
const button=await page.getByRole('button',{name:'다른 고민 둘러보기'}).boundingBox();const composer=await page.locator('.ongyeol-chat-products .ongyeol-inquiry-composer').boundingBox();assert.ok(button.y+button.height<composer.y);
await prev.click();await page.waitForTimeout(50);const reverse=await page.locator('.ongyeol-chat-products-motion').evaluate(el=>el.getAnimations()[0].effect.getKeyframes());assert.equal(reverse[1].transform,'translateX(14px)');
await page.waitForTimeout(300);assert.match(await step.innerText(),/02/);assert.deepEqual(await fixed(),initial);
await prev.click();await back();await page.waitForTimeout(350);assert.equal(await page.locator('.ongyeol-chat-products').count(),0);
await click('온결 추천 제품 확인하기');assert.match(await step.innerText(),/01/);
await page.emulateMedia({reducedMotion:'reduce'});await next.click();await page.waitForTimeout(30);assert.match(await step.innerText(),/02/);assert.equal(await page.locator('.ongyeol-chat-products-motion').evaluate(el=>el.getAnimations().length),0);await page.emulateMedia({reducedMotion:'no-preference'});
await next.click();await page.waitForTimeout(320);await page.locator('#ai-consultation').screenshot({path:`.browser-verify-tmp/motion-${label}.png`});await click('다른 고민 둘러보기');
}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: five concerns, forward/reverse direction, rapid clicks, fixed controls, back cancellation, reentry, reduced motion, input clearance');
})().catch(e=>{console.error(e);process.exit(1)});

