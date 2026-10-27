import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
const origin = 'http://127.0.0.1:5190'
const output = resolve('backups/mypage-before-desktop-20261014/coupon-query')
mkdirSync(output, { recursive: true })
const target = await (await fetch('http://127.0.0.1:9244/json/new?about:blank', { method: 'PUT' })).json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(r => ws.addEventListener('open', r, { once: true }))
let seq = 0
const pending = new Map(), errors = [], checks = []
ws.onmessage = e => { const m=JSON.parse(e.data); if(pending.has(m.id)){ pending.get(m.id)(m); pending.delete(m.id) } if(m.method==='Runtime.exceptionThrown') errors.push(m.params); if(m.method==='Runtime.consoleAPICalled' && m.params.type==='error') errors.push(m.params.args) }
async function call(method, params={}) { const id=++seq, p=new Promise(r=>pending.set(id,r)); ws.send(JSON.stringify({id,method,params})); const m=await p; if(m.error)throw Error(JSON.stringify(m.error)); return m.result }
async function ev(expression) { const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true}); if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value }
async function until(expression) { for(let i=0;i<80;i++){try{if(await ev(expression))return}catch{} await new Promise(r=>setTimeout(r,100))} throw Error(expression) }
async function assert(name, expression) { if(!await ev(expression))throw Error(name); checks.push(name) }
async function click(selector) { await ev('document.querySelector('+JSON.stringify(selector)+').click()') }
async function fill(name,value) { await ev(`(()=>{const input=document.querySelector('input[name="${name}"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,${JSON.stringify(value)});input.dispatchEvent(new Event('input',{bubbles:true}));})()`) }
async function screenshot(name) { const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true}); writeFileSync(resolve(output,name+'.png'),Buffer.from(r.data,'base64')) }
async function geometry() {
 return ev(`['23547','24087','23562','23568','23570','23572','23574','23576','23580','23586','23591','23597','23600'].map(id=>{
  const e=document.querySelector('[data-node-id="2275:'+id+'"]'); const r=e.getBoundingClientRect(); const s=getComputedStyle(e);
  return {id,rect:[r.x,r.y,r.width,r.height],fontSize:s.fontSize,color:s.color,background:s.backgroundColor,borderRadius:s.borderRadius};
 })`)
}
await call('Runtime.enable')
await call('Page.enable')
await call('Emulation.setDeviceMetricsOverride',{width:1920,height:1767,deviceScaleFactor:1,mobile:false})

let clockId
async function setClock(instant, reload = true) {
 if(clockId) await call('Page.removeScriptToEvaluateOnNewDocument',{identifier:clockId})
 const source = "const RealDate = Date; globalThis.Date = class extends RealDate { constructor(...args) { if(args.length) super(...args); else super(" + JSON.stringify(instant) + "); } static now() { return new RealDate(" + JSON.stringify(instant) + ").getTime(); } };"
 clockId = (await call('Page.addScriptToEvaluateOnNewDocument',{source})).identifier
 if(reload){
  await call('Page.navigate',{url:origin+'/mypage/coupons'})
  await until("document.readyState==='complete' && !!document.querySelector('input[name=startDate]') && Date.now() === " + new Date(instant).getTime())
 }
}
if(!process.argv.includes('--baseline')) await setClock('2026-10-14T03:00:00Z', false)

await call('Page.navigate',{url:origin+'/mypage/coupons'})
await until("document.readyState==='complete' && !!document.querySelector('[data-node-id=\"2275:23547\"]')")
await ev('document.fonts.ready.then(()=>true)')
if(process.argv.includes('--baseline')){
 writeFileSync(resolve(output,'baseline.json'),JSON.stringify(await geometry(),null,2))
 await screenshot('before')
 console.log('Coupon design baseline captured')
} else {
 const before=JSON.parse(readFileSync(resolve(output,'baseline.json'),'utf8')), after=await geometry()
 const diffs=after.filter((item,index)=>JSON.stringify(item)!==JSON.stringify(before[index]))
 writeFileSync(resolve(output,'geometry.json'),JSON.stringify({before,after,diffs},null,2))
 console.log(JSON.stringify({geometryDifferences:diffs}))
 await screenshot('after')

 if(diffs.length)throw Error('Coupon layout changed')
 checks.push('Existing layout, dimensions, typography, colors and radii unchanged at 13 measured nodes')
 await assert('Initial list and coupon count are both three', "document.querySelectorAll('[data-coupon-id]').length===3 && document.querySelector('[data-node-id=\"2275:24092\"]').textContent.trim()==='3장'")
 await assert('Original row text and validity labels preserved; no issued dates exposed in rows', "[...document.querySelectorAll('[data-coupon-id]')].every(e=>e.textContent.includes('온결 신규 회원가입 쿠폰') && e.textContent.includes('30,000원 이상 구매 시') && e.textContent.includes('발급일로부터 30일') && !e.textContent.includes('2026-'))")
 await assert('No status tabs added', "document.querySelectorAll('[role=tab]').length===0 && !document.body.innerText.includes('사용 완료') && !document.body.innerText.includes('기간 만료')")
 const periods=[['23568','2026-10-14',0],['23570','2026-10-08',0],['23572','2026-09-14',0],['23574','2026-07-14',3],['23576','2025-10-14',3]]
 for(const [node,start,count] of periods){
  await click('[data-node-id="2275:'+node+'"]')
  await assert('Period '+node+' sets one selected button and correct inclusive range', "document.querySelectorAll('button[aria-pressed=true]').length===1 && document.querySelector('[data-node-id=\"2275:"+node+"\"]').getAttribute('aria-pressed')==='true' && document.querySelector('input[name=startDate]').value==='"+start+"' && document.querySelector('input[name=endDate]').value==='2026-10-14'")
  await click('[data-node-id="2275:23591"]')
  await assert('Period '+node+' query filters rows and summary count', "document.querySelectorAll('[data-coupon-id]').length==="+count+" && document.querySelector('[data-node-id=\"2275:24092\"]').textContent.trim()==='"+count+"장'")
 }
 await fill('startDate','2026-09-03')
 await fill('endDate','2026-09-03')
 await assert('Editing dates resets preset and does not query before submit', "document.querySelectorAll('button[aria-pressed=true]').length===0 && document.querySelectorAll('[data-coupon-id]').length===3")
 await click('[data-node-id="2275:23591"]')
 await assert('Issued date, not expiry date, is filtered and boundaries are included', "document.querySelectorAll('[data-coupon-id]').length===1 && document.querySelector('[data-coupon-id]').dataset.couponId==='figma-coupon-1' && document.querySelector('[data-node-id=\"2275:24092\"]').textContent.trim()==='1장'")
 await fill('startDate','2026-09-04')
 await fill('endDate','2026-09-09')
 await click('[data-node-id="2275:23591"]')
 await assert('Partial range selects the middle coupon', "document.querySelectorAll('[data-coupon-id]').length===1 && document.querySelector('[data-coupon-id]').dataset.couponId==='figma-coupon-2'")
 await fill('startDate','2026-09-03')
 await fill('endDate','2026-09-06')
 await click('[data-node-id="2275:23591"]')
 await assert('Both range endpoints included with count two', "document.querySelectorAll('[data-coupon-id]').length===2 && document.querySelector('[data-node-id=\"2275:24092\"]').textContent.trim()==='2장'")
 await fill('startDate','2026-09-11')
 await fill('endDate','2026-09-30')
 await click('[data-node-id="2275:23591"]')
 await assert('Empty query keeps table headings, displays empty message and zero count', "document.querySelectorAll('[data-coupon-id]').length===0 && document.querySelector('[role=status]').textContent==='조회 내역이 없습니다.' && !!document.querySelector('[data-node-id=\"2275:23600\"]') && document.querySelector('[data-node-id=\"2275:24092\"]').textContent.trim()==='0장'")
 await screenshot('empty')
 await fill('startDate','2026-02-30')
 await click('[data-node-id="2275:23591"]')
 await assert('Invalid calendar date rejected without changing previous results', "!!document.querySelector('input[name=startDate]').validationMessage && document.querySelector('[data-node-id=\"2275:23547\"]').dataset.appliedStart==='2026-09-11'")
 await fill('startDate','2026-10-01')
 await fill('endDate','2026-09-30')
 await click('[data-node-id="2275:23591"]')
 await assert('Reversed date range rejected', "!!document.querySelector('input[name=endDate]').validationMessage")
 await fill('startDate','')
 await click('[data-node-id="2275:23591"]')
 await assert('Empty date rejected', "!!document.querySelector('input[name=startDate]').validationMessage")
 await click('[data-node-id="2275:23582"]')
 await assert('Start calendar icon focuses start date field', "document.activeElement.name==='startDate'")
 await click('[data-node-id="2275:23589"]')
 await assert('End calendar icon focuses end date field', "document.activeElement.name==='endDate'")
 await setClock('2026-03-31T03:00:00Z')
 await click('[data-node-id="2275:23572"]')
 await assert('One-month range clamps March 31 to February 28', "document.querySelector('input[name=startDate]').value==='2026-02-28'")
 await setClock('2028-02-29T03:00:00Z')
 await click('[data-node-id="2275:23576"]')
 await assert('One-year range clamps leap day to February 28', "document.querySelector('input[name=startDate]').value==='2027-02-28'")
 await setClock('2026-10-13T17:00:00Z')
 await click('[data-node-id="2275:23568"]')
 await assert('Today follows Asia/Seoul rather than UTC', "document.querySelector('input[name=startDate]').value==='2026-10-14'")
 await call('Page.reload')
 await until("document.readyState==='complete' && !!document.querySelector('input[name=startDate]')")
 await assert('Refresh restores fixture range and three rows without storage', "document.querySelector('input[name=startDate]').value==='2026-09-03' && document.querySelectorAll('[data-coupon-id]').length===3")
 await assert('All original SVGs loaded locally with nonzero size', "[...document.querySelectorAll('main img')].every(img=>img.complete && img.naturalWidth>0 && img.getBoundingClientRect().width>0 && !img.src.includes('figma.com'))")
 writeFileSync(resolve(output,'results.json'),JSON.stringify({checks,errors,geometryDifferences:diffs},null,2))
 console.log(JSON.stringify({passed:checks.length,errors:errors.length}))
 if(errors.length)process.exitCode=1

}
await call('Page.close')
ws.close()
