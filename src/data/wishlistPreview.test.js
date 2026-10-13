import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createWishlistPreviewProducts, paginateWishlistPreview } from './wishlistPreview.js'
import { wishlistPageNumbers } from '../services/wishlistStore.js'

test('all 50 preview pages are selectable with products only on pages 1 and 2', () => {
  const products = createWishlistPreviewProducts()
  assert.equal(products.length, 9)
  assert.equal(new Set(products.map((p) => p.id)).size, 9)
  for (let page = 1; page <= 50; page++) {
    const result = paginateWishlistPreview(products, page)
    assert.equal(result.page, page)
    assert.equal(result.pageCount, 50)
    assert.equal(result.items.length, page === 1 ? 6 : page === 2 ? 3 : 0)
    assert.ok(wishlistPageNumbers(page, 50).includes(page))
  }
})

test('arrows advance and return through ten consecutive groups of five', () => {
  const visited = []
  for (let start = 1; start <= 46; start += 5) {
    const numbers = wishlistPageNumbers(start, 50)
    assert.deepEqual(numbers, [start, start + 1, start + 2, start + 3, start + 4])
    visited.push(...numbers)
  }
  assert.deepEqual(visited, Array.from({ length: 50 }, (_, index) => index + 1))
  for (let start = 46; start >= 6; start -= 5) {
    assert.equal(wishlistPageNumbers(start - 5, 50)[0], start - 5)
  }
  assert.equal(wishlistPageNumbers(5, 50)[0], 1)
  assert.equal(wishlistPageNumbers(46, 50).at(-1), 50)
})

test('preview boundaries and empty fixtures retain the fifty-page navigation', () => {
  assert.equal(paginateWishlistPreview([], 0).page, 1)
  assert.equal(paginateWishlistPreview([], 51).page, 50)
  assert.equal(paginateWishlistPreview([], 46).pageCount, 50)
  assert.deepEqual(paginateWishlistPreview([], 46).items, [])
})
