const {chromium}=require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'msedge'});
 const page=await b.newPage({viewport:{width:1600,height:1100}});
 const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');
 const report=[];
 for(const path of ['returns','refunds','coupons']){
  await page.goto('http://127.0.0.1:5188/mypage/'+path);await page.evaluate(()=>document.fonts.ready);
  const {root}=await cdp.send('DOM.getDocument');
  const {nodeIds}=await cdp.send('DOM.querySelectorAll',{nodeId:root.nodeId,selector:'.mp-noto-kr p, .mp-noto-kr h2'});
  const families=new Set();
  for(const nodeId of nodeIds){const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});for(const f of fonts){if(f.glyphCount){families.add(f.familyName);assert.match(f.familyName,/Noto Sans KR/);assert.equal(f.isCustomFont,true);}}}
  const styles=await page.locator('.mp-noto-kr').evaluateAll(roots=>roots.flatMap(root=>[root,...root.querySelectorAll('*')]).filter(e=>e.textContent.trim()&&getComputedStyle(e).display!=='none').map(e=>({family:getComputedStyle(e).fontFamily,weight:getComputedStyle(e).fontWeight})));
  styles.forEach(s=>assert.equal(s.family,'"Noto Sans KR", sans-serif'));
  const sources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('noto-sans-kr')).map(e=>e.name.split('/').pop()));
  report.push({path,computedFamilies:[...new Set(styles.map(s=>s.family))],weights:[...new Set(styles.map(s=>s.weight))],renderedFonts:[...families],sources});
  for(const width of [1024,390]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('.mp-noto-kr').evaluate(e=>getComputedStyle(e).fontFamily),'"Noto Sans KR", sans-serif');}
  await page.setViewportSize({width:1600,height:1100});
 }
 console.log(JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
