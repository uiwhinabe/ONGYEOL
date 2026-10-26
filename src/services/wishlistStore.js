import { useSyncExternalStore } from 'react'

// Temporary catalog from the design. Replace with the product API when available.
export const wishlistCatalog = [
  ['odi-cream', '오디 보습 크림', 30000, 24000],
  ['refit-pad', '리프 리셋 카밍 패드 70매', 26000, 20800],
  ['vitamin-cleansing', '비타민 e 클렌징폼 150ml', 18000, 14400],
  ['odi-mask', '오디 진정 마스크팩 5+1,25ml', 22000, 22000],
  ['wood-ampoule', '백목이 수분 농축 앰플 50ml', 26000, 20800],
  ['odi-ampoule', '오디 톤업 앰플 50ml', 32000, 25600],
  ['wood-pad', '백목이 커스텀 핏 패드 100매', 26000, 20800],
  ['vitamin-cream', '비타민 c 수분크림 50ml', 30000, 24000],
  ['vitamin-lotion', '비타민 c 로션 50ml', 28000, 22400],
].map(([id, name, originalPrice, price]) => ({ id, name, originalPrice, price, image: '' }))

export const SHOPPING_STORAGE_KEY = 'ongyeol.shopping.v1'
const empty = { wishlist: [], cart: [] }
let snapshot = empty
let loaded = false
const listeners = new Set()
const validProduct = (p) => p && typeof p.id === 'string' && typeof p.name === 'string'
  && p.name.length > 0 && Number.isFinite(p.price) && p.price >= 0

function read() {
  try {
    const data = JSON.parse(window.localStorage.getItem(SHOPPING_STORAGE_KEY))
    if (!Array.isArray(data?.wishlist) || !Array.isArray(data?.cart)) return empty
    return {
      wishlist: data.wishlist.filter((p, i, all) => validProduct(p) && all.findIndex((item) => item?.id === p.id) === i),
      cart: data.cart.filter((p) => validProduct(p) && Number.isInteger(p.quantity) && p.quantity > 0),
    }
  } catch { return empty }
}

export function getShoppingSnapshot() {
  if (!loaded && typeof window !== 'undefined') { snapshot = read(); loaded = true }
  return snapshot
}

function subscribe(listener) {
  listeners.add(listener)
  const onStorage = (event) => {
    if (event.key === SHOPPING_STORAGE_KEY || event.key === null) {
      snapshot = read()
      listeners.forEach((notify) => notify())
    }
  }
  window.addEventListener('storage', onStorage)
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage) }
}

export function useShopping() {
  return useSyncExternalStore(subscribe, getShoppingSnapshot, () => empty)
}

function save(update) {
  // Read at mutation time to retain changes made by another tab.
  const next = update(read())
  window.localStorage.setItem(SHOPPING_STORAGE_KEY, JSON.stringify(next))
  snapshot = next
  loaded = true
  listeners.forEach((notify) => notify())
}

export function addWishlistProduct(product) {
  if (!validProduct(product)) throw new Error('Invalid product')
  save((data) => ({ ...data, wishlist: data.wishlist.some((p) => p.id === product.id)
    ? data.wishlist : [...data.wishlist, product] }))
}

export function removeWishlistProducts(ids) {
  const removed = new Set(ids)
  save((data) => ({ ...data, wishlist: data.wishlist.filter((p) => !removed.has(p.id)) }))
}

export function addCartProducts(products) {
  if (!products.every(validProduct)) throw new Error('Invalid product')
  save((data) => {
    const cart = data.cart.map((p) => ({ ...p }))
    for (const product of products) {
      const existing = cart.find((p) => p.id === product.id)
      if (existing) existing.quantity += 1
      else cart.push({ ...product, quantity: 1 })
    }
    return { ...data, cart }
  })
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
