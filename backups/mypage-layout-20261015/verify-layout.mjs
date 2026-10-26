import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
const output=resolve('backups/mypage-layout-20261015')
mkdirSync(output,{recursive:true})
const origin='http://127.0.0.1:5192'
const target=await(await fetch('http://127.0.0.1:9246/json/new?about:blank',{method:'PUT'})).json()
const ws=new WebSocket(target.webSocketDebuggerUrl)
await new Promise(r=>ws.addEventListener('open',r,{once:true}))
let seq=0
const pending=new Map(),errors=[],report=[]
ws.onmessage=e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params)}
async function call(method,params={}){const id=++seq,p=new Promise(r=>pending.set(id,r));ws.send(JSON.stringify({id,method,params}));const m=await p;if(m.error)throw Error(JSON.stringify(m.error));return m.result}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function until(expression){for(let i=0;i<100;i++){try{if(await ev(expression))return}catch{}await new Promise(r=>setTimeout(r,100))}throw Error(expression)}
await call('Runtime.enable')
await call('Page.enable')
await call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false})
const paths=['/mypage','/mypage/orders','/mypage/returns','/mypage/refunds','/mypage/addresses','/mypage/addresses/populated','/mypage/addresses/new','/mypage/coupons','/mypage/account','/mypage/account/email','/mypage/account/password','/mypage/account/password-help','/mypage/skin','/mypage/skin/settings']
let baseline
for(const path of paths){
 await call('Page.navigate',{url:origin+path})
 await until("document.readyState==='complete' && !!document.querySelector('.ongyeol-mypage-layout-columns')")
 await ev('document.fonts.ready.then(()=>true)')
 const geometry=await ev("(()=>{const side=document.querySelector('.ongyeol-mypage-menu'),r=side.getBoundingClientRect(),s=getComputedStyle(side);const grid=document.querySelector('.ongyeol-mypage-layout-columns'),c=grid.children[1].getBoundingClientRect(),container=document.querySelector('.ongyeol-mypage-layout').getBoundingClientRect();return {viewport:innerWidth,clientWidth:document.documentElement.clientWidth,sidebarX:r.x,sidebarY:r.y,sidebarWidth:r.width,sidebarHeight:r.height,contentX:c.x,contentY:c.y,gap:c.x-r.right,containerWidth:container.width,padding:s.padding,border:s.borderTopWidth,radius:s.borderTopLeftRadius,shrink:s.flexShrink,position:s.position};})()")
 report.push({path,...geometry})
 baseline??=JSON.stringify(geometry)
 if(JSON.stringify(geometry)!==baseline)throw Error('Mismatch '+path+' '+JSON.stringify(geometry))
 const result=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true})
 writeFileSync(resolve(output,path.replaceAll('/','_')+'.png'),Buffer.from(result.data,'base64'))
}
const sidebarPaths=['/mypage/orders','/mypage/returns','/mypage/refunds','/mypage/addresses','/mypage/coupons','/mypage/account','/mypage/skin']
for(const path of sidebarPaths){
 await call('Page.navigate',{url:origin+'/mypage'})
 await until("location.pathname==='/mypage' && document.readyState==='complete' && !!document.querySelector('.ongyeol-mypage-menu a')")
 await ev('document.querySelector('+JSON.stringify('.ongyeol-mypage-menu a[href="'+path+'"]')+').click()')
 await until("location.pathname==="+JSON.stringify(path)+" && !!document.querySelector('[data-figma-frame]')")
}
writeFileSync(resolve(output,'geometry.json'),JSON.stringify({viewport:[1920,1080],report,sidebarPaths,errors},null,2))
console.log(JSON.stringify({screens:report.length,geometry:report[0],errors:errors.length}))
await call('Page.close');ws.close()
