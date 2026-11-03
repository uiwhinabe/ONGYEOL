import { test } from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../data/products.js'
import { searchProducts } from './productSearch.js'

test('searches the shared catalog by name, type and line', () => {
  assert.ok(searchProducts(products, '크림').some(product => product.id === 'dakyeolmae-cream'))
  assert.ok(searchProducts(products, '로션/크림').every(product => product.type === '로션/크림'))
  assert.ok(searchProducts(products, '뽕나무').some(product => product.name.includes('오디')))
})

test('ignores case, surrounding and internal whitespace', () => {
  assert.deepEqual(searchProducts(products, '  p d r n  '), searchProducts(products, 'PDRN'))
  assert.ok(searchProducts(products, 'PDRN').length > 0)
  assert.deepEqual(searchProducts(products, '백목이수분잠금크림'), searchProducts(products, '백목이 수분 잠금 크림'))
})

test('empty and unmatched searches return no products; results have unique IDs', () => {
  assert.deepEqual(searchProducts(products, ' \t\n '), [])
  assert.deepEqual(searchProducts(products, '존재하지않는상품검색어'), [])
  const results = searchProducts([...products, ...products], '크림')
  assert.ok(results.length > 0)
  assert.equal(results.length, new Set(results.map(product => product.id)).size)
})
