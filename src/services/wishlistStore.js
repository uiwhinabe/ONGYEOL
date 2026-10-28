import { useSyncExternalStore } from 'react'
import { products } from '../data/products.js'
import { readAuthenticated } from './demoSession.js'
export const wishlistCatalog = products
export const SHOPPING_STORAGE_KEY = 'ongyeol.shopping.v1'
const empty = { wishlist: [], cart: [] }
let snapshot = empty
let owner
const listeners = new Set()
export function shoppingUser() {
  if (!readAuthenticated()) return null
  try { return sessionStorage.getItem('ongyeol.userId') || 'ongyeol@gmail.com' } catch { return 'ongyeol@gmail.com' }
}
const aliases = { 'vitamin-cleansing': 'vitamin-c-cleanser', 'wood-ampoule': 'baekmogi-ampoule', 'wood-pad': 'baekmogi-pad', 'vitamin-cream': 'vitamin-c-cream', 'vitamin-lotion': 'vitamin-c-lotion' }
export const cartKey = p => `${p.id}:${p.optionId || ''}`
export function resolveItems(items) {
  if (!Array.isArray(items)) return []
  return items.flatMap(item => {
    const product = products.find(p => p.id === (aliases[item?.id] || item?.id))
    if (!product || (item.optionId != null && item.optionId !== '')) return []
    const quantity = item.quantity ?? 1
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 9999) return []
    return [{ ...product, quantity, optionId: '', option: '', selected: item.selected !== false }]
  }).reduce((all, item) => {
    const found = all.find(p => cartKey(p) === cartKey(item))
    if (found) found.quantity = Math.min(9999, found.quantity + item.quantity)
    else all.push(item)
    return all
  }, [])
}
function key() { return `${SHOPPING_STORAGE_KEY}:${shoppingUser()}` }
function read() {
  if (!shoppingUser()) return empty
  try {
    let raw = localStorage.getItem(key())
    // The old demo store belongs only to the original demo account.
    if (raw === null && shoppingUser() === 'ongyeol@gmail.com') {
      const old = JSON.parse(localStorage.getItem(SHOPPING_STORAGE_KEY)) || { wishlist: [], cart: [] }
      if (!Array.isArray(old.wishlist)) old.wishlist = []
      for (const p of products) if (localStorage.getItem(`ongyeol:wishlist:${p.id}`) === 'true') old.wishlist.push({ id: p.id })
      raw = JSON.stringify(old)
      localStorage.setItem(key(), raw)
    }
    const data = JSON.parse(raw)
    return { wishlist: resolveItems(data?.wishlist).map(p => products.find(item => item.id === p.id)), cart: resolveItems(data?.cart) }
  } catch { return empty }
}
export function refreshShopping() {
  owner = shoppingUser(); snapshot = read(); listeners.forEach(fn => fn())
}
export function getShoppingSnapshot() {
  if (owner !== shoppingUser()) { owner = shoppingUser(); snapshot = read() }
  return snapshot
}
function subscribe(fn) {
  listeners.add(fn)
  window.addEventListener('storage', refreshShopping)
  return () => { listeners.delete(fn); window.removeEventListener('storage', refreshShopping) }
}
export function useShopping() { return useSyncExternalStore(subscribe, getShoppingSnapshot, () => empty) }
function save(update) {
  if (!shoppingUser()) return
  const next = update(getShoppingSnapshot())
  try { localStorage.setItem(key(), JSON.stringify({ wishlist: next.wishlist.map(p => ({ id: p.id })), cart: next.cart.map(({ id, quantity, optionId, selected }) => ({ id, quantity, optionId, selected })) })) } catch { /* Keep this session usable. */ }
  snapshot = next; owner = shoppingUser(); listeners.forEach(fn => fn())
}
export function addWishlistProduct(product) {
  if (!products.some(p => p.id === product?.id)) return
  save(data => ({ ...data, wishlist: data.wishlist.some(p => p.id === product.id) ? data.wishlist : [...data.wishlist, products.find(p => p.id === product.id)] }))
}
export function removeWishlistProducts(ids) { save(data => ({ ...data, wishlist: data.wishlist.filter(p => !ids.includes(p.id)) })) }
export function addCartProducts(items) { save(data => ({ ...data, cart: resolveItems([...data.cart, ...items]) })) }
export function updateCart(update) { save(data => ({ ...data, cart: resolveItems(update(data.cart)) })) }
export function completeCartOrder(items) {
  updateCart(cart => cart.flatMap(p => {
    const purchased = items.find(item => cartKey(item) === cartKey(p))
    const quantity = p.quantity - (purchased?.quantity || 0)
    return quantity > 0 ? [{ ...p, quantity }] : []
  }))
}
export function paginateWishlist(products, requestedPage, pageSize = 6) {
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize))
  const page = Math.max(1, Math.min(requestedPage, pageCount))
  return { page, pageCount, items: products.slice((page - 1) * pageSize, page * pageSize) }
}

export function wishlistPageNumbers(page, pageCount) {
  const start = Math.floor((page - 1) / 5) * 5 + 1
  const count = Math.min(5, pageCount - start + 1)
  return Array.from({ length: count }, (_, index) => start + index)
}
