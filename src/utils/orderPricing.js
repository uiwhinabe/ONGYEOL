// Shared with Checkout so cart estimates and order totals use the same rule.
export function calculateShippingFee(productsPrice, itemCount) {
  return itemCount === 0 || productsPrice >= 50000 ? 0 : 3000
}
