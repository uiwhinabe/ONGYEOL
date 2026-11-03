function normalizePhoto(value) {
  const src = typeof value === 'string' ? value : value?.src ?? value?.url
  return typeof src === 'string' && src.trim() ? { src, alt: value?.alt ?? '포토리뷰 사진' } : null
}

// One thumbnail per review, regardless of how many photos that review contains.
export function getPhotoReviews(reviews, thumbnailOrder = []) {
  const photoReviews = reviews.flatMap(review => {
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
    return photos.length ? [{ ...photos[0], reviewId: review.id, photos, review }] : []
  })
  // Preserve the displayed gallery order, then append reviews not in its preview data.
  const ordered = []
  const seen = new Set()
  for (const thumbnail of thumbnailOrder) {
    const image = normalizePhoto(thumbnail)
    const entry = photoReviews.find(item => thumbnail.reviewId
      ? item.reviewId === thumbnail.reviewId : item.photos.some(photo => photo.src === image?.src))
    if (!entry || seen.has(entry.reviewId)) continue
    seen.add(entry.reviewId)
    ordered.push({ ...entry, ...(entry.photos.find(photo => photo.src === image?.src) ?? entry.photos[0]) })
  }
  for (const entry of photoReviews) {
    if (seen.has(entry.reviewId)) continue
    seen.add(entry.reviewId)
    ordered.push(entry)
  }
  return ordered
}
