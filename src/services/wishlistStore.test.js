import { beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { addCartProducts, addWishlistProduct, removeWishlistProducts, getShoppingSnapshot, paginateWishlist, wishlistPageNumbers, SHOPPING_STORAGE_KEY } from './wishlistStore.js'

const storage = new Map()
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
}
const product = (id) => ({ id: String(id), name: `상품 ${id}`, price: 20000 })
beforeEach(() => storage.clear())

test('adding likes deduplicates products and persists them', () => {
  addWishlistProduct(product(1))
  addWishlistProduct(product(1))
  addWishlistProduct(product(2))
  assert.deepEqual(getShoppingSnapshot().wishlist.map((p) => p.id), ['1', '2'])
  assert.equal(JSON.parse(storage.get(SHOPPING_STORAGE_KEY)).wishlist.length, 2)
})
test('bulk cart additions increase existing quantity and retain likes', () => {
  addWishlistProduct(product(1))
  addCartProducts([product(1), product(2)])
  addCartProducts([product(1)])
  assert.deepEqual(getShoppingSnapshot().cart.map((p) => p.quantity), [2, 1])
  assert.equal(getShoppingSnapshot().wishlist.length, 1)
})
test('single and bulk removal preserve other products and the cart', () => {
  for (let i = 1; i <= 4; i++) addWishlistProduct(product(i))
  addCartProducts([product(1)])
  removeWishlistProducts(['2'])
  removeWishlistProducts(['1', '4'])
  assert.deepEqual(getShoppingSnapshot().wishlist, [product(3)])
  assert.equal(getShoppingSnapshot().cart[0].id, '1')
})
test('pagination supports arbitrary counts and clamps an empty last page', () => {
  const products = Array.from({ length: 23 }, (_, i) => product(i))
  assert.equal(paginateWishlist(products, 1).items.length, 6)
  assert.equal(paginateWishlist(products, 4).items.length, 5)
  assert.equal(paginateWishlist(products, 4).pageCount, 4)
  assert.equal(paginateWishlist(products.slice(0, 18), 4).page, 3)
  assert.deepEqual(paginateWishlist([], 3), { page: 1, pageCount: 1, items: [] })
})

test('six products per page works for all requested counts and more than 50 pages', () => {
  for (const [count, pages] of [[6, 1], [12, 2], [30, 5], [60, 10], [300, 50], [307, 52]]) {
    const products = Array.from({ length: count }, (_, i) => product(i))
    const seen = []
    for (let page = 1; page <= pages; page++) {
      const result = paginateWishlist(products, page)
      assert.equal(result.pageCount, pages)
      assert.ok(result.items.length <= 6)
      seen.push(...result.items)
      const numbers = wishlistPageNumbers(page, pages)
      assert.ok(numbers.length <= 5)
      assert.ok(numbers.includes(page))
      assert.ok(numbers.every((number) => number >= 1 && number <= pages))
    }
    assert.deepEqual(seen, products)
  }
  assert.deepEqual(wishlistPageNumbers(1, 50), [1, 2, 3, 4, 5])
  assert.deepEqual(wishlistPageNumbers(25, 50), [21, 22, 23, 24, 25])
  assert.deepEqual(wishlistPageNumbers(50, 50), [46, 47, 48, 49, 50])
})

test('unliking the only last-page item updates storage and returns to the valid page', () => {
  for (let i = 1; i <= 7; i++) addWishlistProduct(product(i))
  const lastItem = paginateWishlist(getShoppingSnapshot().wishlist, 2).items[0]
  removeWishlistProducts([lastItem.id])
  const remaining = getShoppingSnapshot().wishlist
  assert.equal(remaining.length, 6)
  assert.ok(!remaining.some((p) => p.id === lastItem.id))
  assert.equal(paginateWishlist(remaining, 2).page, 1)
  assert.deepEqual(JSON.parse(storage.get(SHOPPING_STORAGE_KEY)).wishlist, remaining)
})
test('mutations retain products added by another tab', () => {
  addWishlistProduct(product(1))
  storage.set(SHOPPING_STORAGE_KEY, JSON.stringify({ wishlist: [product(1), product(2)], cart: [] }))
  addWishlistProduct(product(3))
  assert.equal(getShoppingSnapshot().wishlist.length, 3)
})
test('corrupt storage recovers and write failures do not report success', () => {
  storage.set(SHOPPING_STORAGE_KEY, 'broken json')
  addWishlistProduct(product(1))
  const previous = getShoppingSnapshot()
  const original = window.localStorage.setItem
  window.localStorage.setItem = () => { throw new Error('QuotaExceededError') }
  try {
    assert.throws(() => removeWishlistProducts(['1']), /QuotaExceededError/)
    assert.equal(getShoppingSnapshot(), previous)
  } finally { window.localStorage.setItem = original }
})
