const {chromium}=require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const a=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'msedge'});const p=await b.newPage();
 await p.goto('http://127.0.0.1:5188/mypage/returns');
 for(const width of [320,375,390,414,768,1024,1440,1600]){
  await p.setViewportSize({width,height:1100});await p.evaluate(()=>document.fonts.ready);
  const results=await p.locator('[role=tab]').evaluateAll(es=>es.map(e=>{const p=e.querySelector('p'),r=p.getBoundingClientRect(),t=e.getBoundingClientRect(),u=e.lastElementChild.getBoundingClientRect();return {inside:r.left>=t.left&&r.right<=t.right+1&&r.bottom<=u.top+1,noOverflow:p.scrollWidth<=p.clientWidth+1,font:getComputedStyle(p).fontFamily,size:getComputedStyle(p).fontSize}}));
  results.forEach(r=>{a.ok(r.inside,JSON.stringify({width,r}));a.ok(r.noOverflow);a.equal(r.font,'"Noto Sans KR", sans-serif');a.equal(r.size,width<768?'14px':'16px')});
  const box=await p.locator('[role=tablist]').boundingBox();const panel=await p.locator('[role=tabpanel]').boundingBox();a.ok(panel.y>=box.y+box.height);
  if(width<1433)a.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page overflow at '+width);
  await p.locator('[role=tab]').nth(1).click();a.equal(await p.locator('[role=tab]').nth(1).getAttribute('aria-selected'),'true');
 }
 console.log('PASS: 8 widths, text contained, growing tab row, no responsive horizontal scroll, original typography/selection');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
