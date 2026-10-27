function normalizePhoto(value) {
  const src = typeof value === 'string' ? value : value?.src ?? value?.url
  return typeof src === 'string' && src.trim() ? { src, alt: value?.alt ?? '포토리뷰 사진' } : null
}

// One thumbnail per review, regardless of how many photos that review contains.
export function getPhotoReviews(reviews) {
  return reviews.flatMap(review => {
    const candidates = [review.photo, review.image,
      ...(Array.isArray(review.photos) ? review.photos : []),
      ...(Array.isArray(review.images) ? review.images : []),
    ]
    const seen = new Set()
    const photos = candidates.map(normalizePhoto).filter(photo => {
      if (!photo || seen.has(photo.src)) return false
      seen.add(photo.src)
      return true
    })
    return photos.length ? [{ ...photos[0], reviewId: review.id, photos }] : []
  })
}
