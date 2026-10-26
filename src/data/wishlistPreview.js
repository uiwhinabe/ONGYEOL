// Design-only fixtures. Never write these products to the shopping store.
const previewImage = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="400" height="500" fill="#999"/></svg>')}`

export function createWishlistPreviewProducts() {
  return [
    ['cream', '오디 보습 크림', 30000, 24000],
    ['pad', '리프 리셋 카밍 패드 70매', 26000, 20800],
    ['cleansing', '비타민 e 클렌징폼 150ml', 18000, 14400],
    ['mask', '오디 진정 마스크팩 5+1,25ml', 22000, 22000],
    ['wood', '백목이 수분 농축 앰플 50ml', 26000, 20800],
    ['ampoule', '오디 톤업 앰플 50ml', 32000, 25600],
    ['wood-pad', '백목이 커스텀 핏 패드 100매', 26000, 20800],
    ['vitamin-cream', '비타민 c 수분크림 50ml', 30000, 24000],
    ['vitamin-lotion', '비타민 c 로션 50ml', 28000, 22400],
  ].map(([id, name, originalPrice, price]) => ({
    id: `preview-${id}`, name, originalPrice, price, image: previewImage,
  }))
}

// Fifty clickable design-preview pages, independent of the real wishlist.
export function paginateWishlistPreview(products, requestedPage) {
  const pageCount = 50
  const page = Math.max(1, Math.min(requestedPage, pageCount))
  return { page, pageCount, items: products.slice((page - 1) * 6, page * 6) }
}
