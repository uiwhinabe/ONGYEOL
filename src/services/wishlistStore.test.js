import { beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../data/products.js'
import { addCartProducts, addWishlistProduct, removeWishlistProducts, getShoppingSnapshot, refreshShopping, updateCart, completeCartOrder, paginateWishlist, SHOPPING_STORAGE_KEY } from './wishlistStore.js'
import { trackShoppingRoute, selectRecommendations } from './cartRecommendations.js'
import { saveOrder, readOrder } from './orderStore.js'
import { calculateShippingFee } from '../utils/orderPricing.js'
import { productPricing } from '../utils/productPricing.js'
const storage = () => { const data = new Map(); return { getItem: k => data.get(k) ?? null, setItem: (k,v) => data.set(k,v), removeItem: k => data.delete(k), clear: () => data.clear() } }
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = { localStorage, sessionStorage }
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); sessionStorage.setItem('ongyeol.demoAuthenticated', 'true'); sessionStorage.setItem('ongyeol.userId', 'test-a'); refreshShopping(); trackShoppingRoute({ pathname: '/cart', search: '', key: 'a' }) })
test('catalog IDs and numeric prices are consistent', () => {
  assert.equal(new Set(products.map(p => p.id)).size, products.length)
  for (const p of products) assert.equal(p.price, productPricing(p).price)
  assert.equal(productPricing({ originalPrice: 30000, price: 20000, discountPercent: 0 }).price, 30000)
})
test('likes persist as IDs and share a snapshot; new accounts start empty', () => {
  addWishlistProduct(products[0]); addWishlistProduct(products[0]); assert.equal(getShoppingSnapshot().wishlist.length, 1)
  refreshShopping(); assert.equal(getShoppingSnapshot().wishlist[0].name, products[0].name)
  removeWishlistProducts([products[0].id]); assert.equal(getShoppingSnapshot().wishlist.length, 0)
  addCartProducts([products[0]]); sessionStorage.setItem('ongyeol.userId', 'test-b'); refreshShopping(); assert.equal(getShoppingSnapshot().cart.length, 0)
  sessionStorage.removeItem('ongyeol.demoAuthenticated'); refreshShopping(); addWishlistProduct(products[1]); assert.equal(getShoppingSnapshot().wishlist.length, 0)
})
test('cart merges quantities, updates selection and retains unpurchased quantities', () => {
  addCartProducts([{ ...products[0], quantity: 2 }, products[1]]); addCartProducts([products[0]])
  assert.equal(getShoppingSnapshot().cart[0].quantity, 3)
  updateCart(cart => cart.map((p,i) => ({ ...p, selected: i === 0 })))
  saveOrder(getShoppingSnapshot().cart.filter(p => p.selected)); assert.equal(readOrder().length, 1)
  refreshShopping(); assert.equal(readOrder()[0].quantity, 3)
  completeCartOrder([{ ...products[0], quantity: 2 }]); assert.deepEqual(getShoppingSnapshot().cart.map(p => p.quantity), [1,1])
  assert.equal(calculateShippingFee(49999, 1), 3000); assert.equal(calculateShippingFee(50000, 1), 0); assert.equal(calculateShippingFee(0,0), 0)
})
test('corrupt storage and unknown products are safely ignored', () => {
  localStorage.setItem(`${SHOPPING_STORAGE_KEY}:test-a`, '{'); refreshShopping(); assert.equal(getShoppingSnapshot().cart.length, 0)
  addCartProducts([{ id: 'missing' }, { ...products[0], quantity: -1 }, { ...products[1], optionId: 'unknown' }]); assert.equal(getShoppingSnapshot().cart.length, 0)
})
test('recommendations survive refresh, preserve survivors and change on reentry', () => {
  const first = selectRecommendations([]).map(p => p.id); assert.equal(first.length, 5); assert.equal(new Set(first).size, 5)
  trackShoppingRoute({ pathname: '/cart', search: '', key: 'a' }); assert.deepEqual(selectRecommendations([]).map(p => p.id), first)
  const next = selectRecommendations([{ id: first[1] }]).map(p => p.id); assert.deepEqual(next.slice(0,4), first.filter((_,i) => i !== 1)); assert.ok(!next.includes(first[1]))
  trackShoppingRoute({ pathname: '/', search: '', key: 'b' }); trackShoppingRoute({ pathname: '/cart', search: '', key: 'a' })
  const reentry = selectRecommendations([]).map(p => p.id); assert.ok(!reentry.every(id => next.includes(id)))
  assert.equal(selectRecommendations(products).length, 0)
  assert.equal(selectRecommendations(products.slice(1)).length, 1)
})
test('pagination clamps empty and removed final pages', () => {
  assert.deepEqual(paginateWishlist([], 3), { page: 1, pageCount: 1, items: [] })
  assert.equal(paginateWishlist(products.slice(0,6), 2).page, 1)
})
