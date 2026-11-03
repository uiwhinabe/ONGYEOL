export default function ProductBadge({ product, className = 'product-badge' }) {
  if (!product.badge || (product.badge === 'SALE' && !product.discountPercent)) return null
  return <span className={className}>{product.badge === 'SALE' ? `${product.discountPercent}% SALE` : product.badge}</span>
}
