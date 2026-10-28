export default function ProductBadge({ product }) {
  if (!product.badge || (product.badge === 'SALE' && !product.discountPercent)) return null
  return <span className="product-badge">{product.badge === 'SALE' ? `${product.discountPercent}% SALE` : product.badge}</span>
}
