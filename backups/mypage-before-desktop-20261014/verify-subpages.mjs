import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const origin = process.argv[2] || 'http://127.0.0.1:5184'
const debugOrigin = 'http://127.0.0.1:9240'
const output = resolve('backups/mypage-before-desktop-20261014/subpages')
mkdirSync(output, { recursive: true })
const target = await (await fetch(debugOrigin + '/json/new?about:blank', { method: 'PUT' })).json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(r => ws.addEventListener('open', r, { once: true }))
let next = 0
const pending = new Map()
const errors = []
ws.addEventListener('message', e => {
  const message = JSON.parse(e.data)
  if (pending.has(message.id)) {
    pending.get(message.id)(message)
    pending.delete(message.id)
  }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails)
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args)
})
async function call(method, params = {}) {
  const id = ++next
  const response = new Promise(r => pending.set(id, r))
  ws.send(JSON.stringify({ id, method, params }))
  const message = await response
  if (message.error) throw new Error(JSON.stringify(message.error))
  return message.result
}
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}
async function until(expression) {
  for (let i = 0; i < 100; i++) {
    try { if (await evaluate(expression)) return } catch {}
    await new Promise(r => setTimeout(r, 100))
  }
  throw new Error('Timed out: ' + expression)
}
await call('Runtime.enable')
await call('Page.enable')
await call('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1767, deviceScaleFactor: 1, mobile: false })
async function navigate(path) {
  await call('Page.navigate', { url: origin + path })
  await until("document.readyState === 'complete' && !!document.querySelector('header')")
  await evaluate('document.fonts.ready.then(() => true)')
}
async function screenshot(name) {
  const result = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  writeFileSync(resolve(output, name + '.png'), Buffer.from(result.data, 'base64'))
}
const routes = [
  ['/mypage/orders', '2275:24028'], ['/mypage/returns', '2275:23889'],
  ['/mypage/refunds', '2275:23648'], ['/mypage/addresses', '2275:23787'],
  ['/mypage/addresses/populated', '2275:24125'], ['/mypage/addresses/new', '2275:24236'],
  ['/mypage/coupons', '2275:23490'], ['/mypage/account', '2275:24396'],
  ['/mypage/account/email', '2275:24685'], ['/mypage/account/password', '2275:25287'],
  ['/mypage/account/password-help', '2275:24985'], ['/mypage/skin', '2275:25590'],
  ['/mypage/skin/settings', '2275:25807'],
]
const report = []
for (const [path, frame] of routes) {
  await navigate(path)
  await until("document.querySelector('main')?.getAttribute('data-figma-frame') === " + JSON.stringify(frame))
  const assets = await evaluate(`[...document.querySelectorAll('main img')].map(img => {
    const rect = img.getBoundingClientRect();
    return { src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0, natural: [img.naturalWidth, img.naturalHeight], rendered: [rect.width, rect.height], position: [rect.x, rect.y], transform: getComputedStyle(img.parentElement).rotate };
  })`)
  const counts = await evaluate("({headers: document.querySelectorAll('header').length, footers: document.querySelectorAll('footer').length})")
  if (assets.some(a => !a.loaded) || counts.headers !== 1 || counts.footers !== 1) throw new Error('Invalid render: ' + path)
  await screenshot(path.slice(8).replaceAll('/', '-'))
  await call('Page.reload')
  await until("document.querySelector('main')?.getAttribute('data-figma-frame') === " + JSON.stringify(frame))
  report.push({ path, frame, counts, assets })
}
await navigate('/mypage')
await until("!!document.querySelector('.ongyeol-mypage-menu a')")
await screenshot('main')
const links = await evaluate("[...document.querySelectorAll('.ongyeol-mypage-menu a')].map(a => a.getAttribute('href'))")
for (const href of links) {
  await navigate('/mypage')
  await evaluate('document.querySelector(' + JSON.stringify('.ongyeol-mypage-menu a[href="' + href + '"]') + ').click()')
  await until("location.pathname === " + JSON.stringify(href) + " && !!document.querySelector('[data-figma-frame]')")
}
const transitions = [
  ['/mypage/addresses', '/mypage/addresses/new'],
  ['/mypage/addresses/new', '/mypage/addresses'],
  ['/mypage/addresses/new', '/mypage/addresses/populated'],
  ['/mypage/account', '/mypage/account/password'],
  ['/mypage/account', '/mypage/account/password-help'],
  ['/mypage/account', '/mypage/account/email'],
  ['/mypage/skin', '/mypage/skin/settings'],
]
for (const [from, to] of transitions) {
  await navigate(from)
  await evaluate('document.querySelector(' + JSON.stringify('a[href="' + to + '"]') + ').click()')
  await until("location.pathname === " + JSON.stringify(to) + " && !!document.querySelector('[data-figma-frame]')")
}
await navigate('/')
if (!await evaluate("document.body.innerText.includes('Get started') && !document.querySelector('main.ongyeol-mypage')")) throw new Error('Home changed')
await evaluate("document.querySelector('#member-trigger').click()")
await until("document.querySelector('#member-trigger').getAttribute('aria-expanded') === 'true'")
await evaluate("document.querySelector('#member-dropdown a[href=\"/mypage\"]').click()")
await until("location.pathname === '/mypage' && !!document.querySelector('main.ongyeol-mypage')")
writeFileSync(resolve(output, 'verification.json'), JSON.stringify({ origin, routes: report, sidebarLinks: links, transitions, errors }, null, 2))
console.log(JSON.stringify({ screens: report.length, refresh: 'PASS', sidebarLinks: links.length, transitions: transitions.length, home: 'PASS', headerMenu: 'PASS', javascriptErrors: errors.length, output }))
await call('Page.close')
ws.close()
if (errors.length) process.exitCode = 1
