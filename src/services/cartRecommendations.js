import { products } from '../data/products.js'
import { shoppingUser } from './wishlistStore.js'
const memory = new Map()
function read(key) { try { return JSON.parse(sessionStorage.getItem(key)) } catch { return memory.get(key) } }
function write(key, value) { memory.set(key, value); try { sessionStorage.setItem(key, JSON.stringify(value)) } catch { /* unavailable */ } }
export function trackShoppingRoute(location) {
  const previous = read('ongyeol.shoppingRoute')
  const route = location.pathname + location.search + ':' + location.key
  if (previous?.route !== route) write('ongyeol.shoppingRoute', { route, visit: (previous?.visit || 0) + 1 })
}
export function selectRecommendations(cart) {
  const key = `ongyeol.recommendations:${shoppingUser()}`
  const visit = read('ongyeol.shoppingRoute')?.visit || 0
  const previous = read(key)
  const excluded = new Set(cart.map(p => p.id))
  const candidates = products.map(p => p.id).filter(id => !excluded.has(id))
  const shuffle = ids => {
    const result = [...ids]
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]] }
    return result
  }
  let ids = previous?.visit === visit && Array.isArray(previous.ids) ? previous.ids.filter((id, i, all) => candidates.includes(id) && all.indexOf(id) === i).slice(0, 5) : []
  if (!ids.length || ids.length < Math.min(5, candidates.length)) ids = [...ids, ...shuffle(candidates.filter(id => !ids.includes(id))).slice(0, 5 - ids.length)]
  if (previous?.visit !== visit && candidates.length > 5 && ids.length === 5 && previous?.ids?.length === 5 && ids.every(id => previous.ids.includes(id))) ids[4] = candidates.find(id => !ids.includes(id))
  write(key, { visit, ids })
  return ids.map(id => products.find(p => p.id === id))
}
