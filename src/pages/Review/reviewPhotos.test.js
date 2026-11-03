import { test } from 'node:test'
import assert from 'node:assert/strict'
import { products } from '../../data/products.js'
import { reviewPages } from './reviewData.js'
import { getPhotoReviews } from './reviewPhotos.js'

test('every product uses a unique photo-review list in displayed thumbnail order', () => {
  for (const product of products) {
    const data = reviewPages[product.id]
    const entries = getPhotoReviews(data.reviews, data.photoReviews)
    assert.equal(new Set(data.reviews.map(review => review.id)).size, data.reviews.length, product.id)
    assert.equal(new Set(entries.map(entry => entry.reviewId)).size, entries.length, product.id)
    const expected = []
    for (const thumbnail of data.photoReviews) {
      const review = getPhotoReviews(data.reviews).find(entry => entry.photos.some(photo => photo.src === thumbnail.src))
      if (review && !expected.includes(review.reviewId)) expected.push(review.reviewId)
    }
    assert.deepEqual(entries.slice(0, expected.length).map(entry => entry.reviewId), expected, product.id)
    for (const entry of entries) {
      assert.equal(entry.review, data.reviews.find(review => review.id === entry.reviewId))
      assert.ok(entry.photos.some(photo => photo.src === entry.src))
    }
    assert.equal(entries.length, getPhotoReviews(data.reviews).length, product.id)
  }
})

test('missing photos and duplicate image references do not create extra review pages', () => {
  const reviews = [
    { id: 'text-only', body: 'no photo' },
    { id: 'first', photo: { src: 'one' }, photos: [{ src: 'one' }, { src: 'two' }] },
    { id: 'second', photo: { src: 'three' } },
  ]
  const entries = getPhotoReviews(reviews, [{ src: 'three' }, { src: 'one' }, { src: 'two' }])
  assert.deepEqual(entries.map(entry => entry.reviewId), ['second', 'first'])
  assert.equal(entries[1].photos.length, 2)
  assert.deepEqual(getPhotoReviews([]), [])
})
