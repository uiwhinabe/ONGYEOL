// Shared with Checkout so cart estimates and order totals use the same rule.
export function calculateShippingFee(productsPrice, itemCount) {
  return itemCount === 0 || productsPrice >= 50000 ? 0 : 3000
}

export function calculateOrderTotals(items, couponDiscount = 0) {
  const originalTotal = items.reduce((sum, p) => sum + (p.originalPrice ?? p.price) * p.quantity, 0)
  const productsTotal = items.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const discountTotal = originalTotal - productsTotal
  const shippingFee = calculateShippingFee(productsTotal, items.length)
  return { originalTotal, productsTotal, discountTotal, shippingFee, total: Math.max(0, productsTotal + shippingFee - couponDiscount) }
}
