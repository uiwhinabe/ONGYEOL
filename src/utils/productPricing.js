export const money = value => `${value.toLocaleString('ko-KR')}\uc6d0`
export function productPricing(product) {
  const originalPrice = product.originalPrice ?? product.price
  const discountPercent = product.discountPercent || 0
  return { originalPrice, discountPercent, price: Math.round(originalPrice * (100 - discountPercent) / 100), discounted: discountPercent > 0 }
}
