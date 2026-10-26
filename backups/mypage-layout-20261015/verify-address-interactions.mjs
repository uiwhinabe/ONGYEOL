import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const origin = 'http://127.0.0.1:5192'
const target = await (await fetch('http://127.0.0.1:9246/json/new?about:blank', { method: 'PUT' })).json()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(r => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map(), errors = [], checks = []
ws.onmessage = e => {
  const m = JSON.parse(e.data)
  if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails)
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args)
}
async function call(method, params = {}) {
  const n = ++id, result = new Promise(r => pending.set(n, r))
  ws.send(JSON.stringify({ id: n, method, params }))
  const m = await result
  if (m.error) throw Error(JSON.stringify(m.error))
  return m.result
}
async function ev(expression) {
  const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails))
  return r.result.value
}
async function until(expression) {
  for (let i = 0; i < 80; i++) { try { if (await ev(expression)) return } catch {} await new Promise(r => setTimeout(r, 100)) }
  throw Error('Timed out: ' + expression)
}
async function assert(name, expression) {
  if (!await ev(expression)) throw Error(name)
  checks.push(name)
}
async function click(selector) { await ev('document.querySelector(' + JSON.stringify(selector) + ').click()') }
async function fill(name, value) {
  await ev(`(() => { const input = document.querySelector('input[name="${name}"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, ${JSON.stringify(value)}); input.dispatchEvent(new Event('input', {bubbles:true})); })()`)
}
async function navigate(path) { await call('Page.navigate', { url: origin + path }); await until("document.readyState === 'complete' && !!document.querySelector('header')") }
async function add(label) {
  await click('[data-name="배송지추가버튼"]')
  await until("!!document.querySelector('form[role=dialog]')")
  for (const [name, value] of Object.entries({ label, recipient: '검증용 수령인', postcode: '00000', address: '검증용 주소', mobile: '010-0000-0000' })) await fill(name, value)
}
async function save() { await click('form[role=dialog] button[type=submit]'); await until("!document.querySelector('form[role=dialog]')") }
const output = resolve('backups/mypage-layout-20261015/address-interactions')
mkdirSync(output, { recursive: true })
async function screenshot(name) { const r = await call('Page.captureScreenshot', {format:'png', captureBeyondViewport:true}); writeFileSync(resolve(output, name + '.png'), Buffer.from(r.data, 'base64')) }

await call('Runtime.enable')
await call('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1767, deviceScaleFactor: 1, mobile: false })
await navigate('/mypage/addresses')
await assert('Initial list is empty; no seeded personal data', "!document.querySelector('[data-address-id]') && document.body.innerText.includes('조회 내역이 없습니다.')")
await click('[data-name="배송지추가버튼"]')
await until("!!document.querySelector('form[role=dialog]')")
await assert('Add opens original modal and relative /new URL', "location.pathname === '/mypage/addresses/new' && document.querySelectorAll('form[role=dialog] input:not([type=checkbox])').length === 7")
await assert('First field receives focus', "document.activeElement.name === 'label'")
await click('form[role=dialog] button[type=submit]')
await assert('Required fields block empty save', "!!document.querySelector('form[role=dialog]') && document.querySelectorAll('form[role=dialog] input:invalid').length === 5")
for (const [name, value] of Object.entries({ label: '  검증용 배송지 A  ', recipient: '검증용 수령인', postcode: '123', address: '검증용 주소', mobile: '잘못된 번호', phone: '잘못된 번호' })) await fill(name, value)
await click('form[role=dialog] button[type=submit]')
await assert('Postcode/mobile/optional telephone formats validated', "['postcode','mobile','phone'].every(name => !!document.querySelector('input[name='+name+']').validationMessage)")
await fill('label', '   ')
await fill('postcode', '00000')
await fill('mobile', '010-0000-0000')
await fill('phone', '')
await click('form[role=dialog] button[type=submit]')
await assert('Whitespace-only required value rejected', "!!document.querySelector('input[name=label]').validationMessage")
await fill('label', '  검증용 배송지 A  ')
await fill('detail', '검증용 상세주소')
await ev('document.fonts.ready.then(() => true)')
await screenshot('modal')
await save()
await assert('Save adds user input and trims outer whitespace', "document.querySelectorAll('[data-address-id]').length === 1 && document.querySelector('[data-address-id]').innerText.includes('검증용 배송지 A') && document.querySelector('[data-address-id]').innerText.includes('검증용 상세주소')")
await assert('First address retains checked default state', "document.querySelector('[data-address-id]').dataset.isDefault === 'true'")
await click('[aria-label="검증용 배송지 A 수정"]')
await until("!!document.querySelector('form[role=dialog]')")
await assert('Edit pre-fills all stored fields', "document.querySelector('input[name=label]').value === '검증용 배송지 A' && document.querySelector('input[name=detail]').value === '검증용 상세주소' && document.querySelector('input[name=isDefault]').checked")
await fill('label', '취소할 수정')
await click('form[role=dialog] button[type=button]')
await until("!document.querySelector('form[role=dialog]')")
await assert('Cancel edit preserves saved value', "document.querySelector('[data-address-id]').innerText.includes('검증용 배송지 A') && !document.body.innerText.includes('취소할 수정')")
await click('[aria-label="검증용 배송지 A 수정"]')
await until("!!document.querySelector('form[role=dialog]')")
await fill('label', '검증용 수정 A')
await save()
await assert('Edit updates row without adding a duplicate', "document.querySelectorAll('[data-address-id]').length === 1 && document.querySelector('[data-address-id]').innerText.includes('검증용 수정 A')")
await add('검증용 배송지 B')
await assert('Additional address starts unchecked', "!document.querySelector('input[name=isDefault]').checked")
await click('input[name=isDefault]')
await save()
await assert('Choosing new default clears previous default', "document.querySelectorAll('[data-is-default=true]').length === 1 && document.querySelector('[data-is-default=true]').innerText.includes('검증용 배송지 B')")
await click('[aria-label="검증용 배송지 B 수정"]')
await until("!!document.querySelector('form[role=dialog]')")
await click('input[name=isDefault]')
await save()
await assert('Unchecking default is saved', "document.querySelectorAll('[data-is-default=true]').length === 0")
await click('[aria-label="검증용 수정 A 수정"]')
await until("!!document.querySelector('form[role=dialog]')")
await click('input[name=isDefault]')
await save()
await click('[aria-label="검증용 수정 A 삭제"]')
await assert('Delete removes selected row and promotes remaining default', "document.querySelectorAll('[data-address-id]').length === 1 && document.querySelector('[data-is-default=true]').innerText.includes('검증용 배송지 B')")
await click('[data-name="배송지추가버튼"]')
await until("!!document.querySelector('form[role=dialog]')")
await ev("document.querySelector('form[role=dialog]').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))")
await until("!document.querySelector('form[role=dialog]')")
await assert('Escape closes without adding a row', "document.querySelectorAll('[data-address-id]').length === 1")
await click('[data-name="배송지추가버튼"]')
await until("!!document.querySelector('form[role=dialog]')")
await ev("document.querySelector('.mp-dialog-overlay').dispatchEvent(new MouseEvent('mousedown',{bubbles:true}))")
await until("!document.querySelector('form[role=dialog]')")
await assert('Backdrop closes modal without saving', "document.querySelectorAll('[data-address-id]').length === 1")
await add('검증용 배송지 C')
await save()
await add('검증용 배송지 D')
await save()
await assert('Multiple addresses appear with correct total', "document.querySelectorAll('[data-address-id]').length === 3 && document.querySelector('[data-node-id=\"2275:24206\"]').innerText === '총 3건'")
await screenshot('list')
await assert('Rows stay below table heading without overlaps', "(()=>{ const header=document.querySelector('[data-node-id=\"2275:24212\"]').getBoundingClientRect(); const rows=[...document.querySelectorAll('[data-address-id]')].map(x=>x.getBoundingClientRect()); return rows[0].top >= header.bottom + 12 && rows.every((row,i)=>!i || row.top >= rows[i-1].bottom); })()")
for (const label of ['검증용 배송지 B','검증용 배송지 C','검증용 배송지 D']) await click('[aria-label="' + label + ' 삭제"]')
await assert('Deleting all rows restores empty state', "!document.querySelector('[data-address-id]') && document.body.innerText.includes('조회 내역이 없습니다.')")
await add('새로고침 검증')
await save()
await call('Page.reload')
await until("!!document.querySelector('[data-name=배송지추가버튼]')")
await assert('Refresh clears React-only address state', "!document.querySelector('[data-address-id]')")
await navigate('/mypage/addresses/new')
await until("!!document.querySelector('form[role=dialog]')")
await assert('Direct /new access opens an empty draft', "document.querySelector('input[name=label]').value === ''")
await click('form[role=dialog] button[type=button]')
await until("!document.querySelector('form[role=dialog]')")
await navigate('/mypage/account')
await assert('Other account screen still renders', "document.body.innerText.includes('기본정보') && !document.querySelector('form[role=dialog]')")
await navigate('/mypage')
await assert('Main screen still renders', "document.querySelector('h1').textContent === 'MY PAGE' && !document.querySelector('form[role=dialog]')")
await navigate('/')
await assert('Home page still renders', "document.body.innerText.includes('Get started')")
writeFileSync(resolve(output,'results.json'), JSON.stringify({ origin, checks, errors, persistence:'React memory only; reload resets data', fixtures:'Test-only labels and values, removed by reload' }, null, 2))
console.log(JSON.stringify({passed:checks.length, errors:errors.length, output}))
await call('Page.close')
ws.close()
if (errors.length) process.exitCode = 1
