import { resolveItems, shoppingUser } from './wishlistStore.js'
const key = () => `ongyeol.order:${shoppingUser()}`
export function saveOrder(items) {
  if (!shoppingUser()) return
  const data = resolveItems(items).map(({ id, optionId, quantity }) => ({ id, optionId, quantity }))
  try { sessionStorage.setItem(key(), JSON.stringify(data)) } catch { /* unavailable */ }
}
export function readOrder() {
  if (!shoppingUser()) return []
  try { return resolveItems(JSON.parse(sessionStorage.getItem(key()))) } catch { return [] }
}
export function clearOrder() { try { sessionStorage.removeItem(key()) } catch { /* unavailable */ } }

export function saveCompletedOrder(order) { try { sessionStorage.setItem(`${key()}:completed`, JSON.stringify(order)) } catch { /* unavailable */ } }
export function readCompletedOrder() { try { return JSON.parse(sessionStorage.getItem(`${key()}:completed`)) } catch { return null } }

export function recordCompletedOrder(order) { saveCompletedOrder({ ...order, orderNumber: `DEMO-${Date.now()}`, orderDate: new Date().toLocaleString('ko-KR') }) }
