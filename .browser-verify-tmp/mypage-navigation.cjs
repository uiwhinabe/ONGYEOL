const { chromium } = require('C:/Users/mbc/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1600,height:1100}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let documents=0; page.on('request',r=>{if(r.isNavigationRequest()&&r.frame()===page.mainFrame()) documents++});
 await page.goto('http://127.0.0.1:5188/mypage');
 await page.evaluate(()=>{window.__documentMarker='retained';window.__menuNode=document.querySelector('.ongyeol-mypage-menu')});
 const menu=page.locator('.ongyeol-mypage-menu');
 const initial=await menu.boundingBox();
 for(const path of ['orders','returns','refunds','addresses','skin','coupons','account']){
   const index=['orders','returns','refunds','addresses','skin','coupons','account'].indexOf(path);
   await menu.locator('button').nth(index).click();
   await page.waitForURL('**/mypage/'+path);
   await page.locator('.mp-menu-selected').waitFor();
   assert.equal(await page.locator('.mp-menu-selected').count(),1);
   const box=await menu.boundingBox();assert.equal(box.x,initial.x);assert.equal(box.y,initial.y);assert.equal(box.width,initial.width);
 }
 const input=page.locator('input[name="previewEmail"]');await input.fill('unfinished@');
 await menu.locator('button').nth(0).click();await menu.locator('button').nth(6).click();assert.equal(await input.inputValue(),'unfinished@');
 await page.locator('button.mp-view-155').click();
 await page.locator('input[name="newPassword"]').fill('DraftPass1!');
 await menu.locator('button').nth(0).click();await menu.locator('button').nth(6).click();await page.locator('button.mp-view-155').click();
 assert.equal(await page.locator('input[name="newPassword"]').inputValue(),'DraftPass1!');
 await page.goBack();await page.waitForURL('**/mypage/account');
 assert.equal(await page.evaluate(()=>window.__documentMarker),'retained');
 assert.equal(await page.evaluate(()=>window.__menuNode===document.querySelector('.ongyeol-mypage-menu')),true);
 assert.equal(documents,1);
 await menu.locator('button').nth(5).click();
 await page.locator('input[name="startDate"]').fill('2026-09-01');
 await page.locator('main form').evaluate(form=>form.requestSubmit());
 await menu.locator('button').nth(0).click();await menu.locator('button').nth(5).click();
 assert.equal(await page.locator('input[name="startDate"]').inputValue(),'2026-09-01');
 await menu.locator('button').nth(3).click();
 await page.locator('button.mp-view-85').click();
 const dialog=page.getByRole('dialog');
 for(const [name,value] of Object.entries({label:'Home',recipient:'Tester',postcode:'12345',address:'Seoul Test 1',mobile:'01012345678'})) await dialog.locator('input[name="'+name+'"]').fill(value);
 await dialog.evaluate(form=>form.requestSubmit());
 await page.waitForURL('**/mypage/addresses');
 await menu.locator('button').nth(0).click();await menu.locator('button').nth(3).click();
 assert.equal(await page.locator('.mp-address-dialog').count(),0);
 await page.waitForFunction(()=>document.querySelector('main')?.innerText.includes('Tester'));
 assert.ok((await page.locator('main').innerText()).includes('Tester'));
 assert.equal(documents,1);
 for (const width of [1024,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('http://127.0.0.1:5188/mypage');
  await menu.locator('button').nth(6).click();await page.waitForURL('**/mypage/account');
  await page.locator('.mp-account-tablet').waitFor();
  assert.equal(await page.locator('.mp-account-tablet').count(),1);
 }
 assert.deepEqual(errors,[]);console.log('PASS: 7 menus, stable sidebar geometry/node, no document reload, email/password drafts, history, tablet/mobile, no runtime errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
