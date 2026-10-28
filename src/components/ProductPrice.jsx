import { money, productPricing } from '../utils/productPricing.js'
import './ProductPrice.css'
export default function ProductPrice({ product, className = '', cart = false }) {
  const { originalPrice, price, discountPercent, discounted } = productPricing(product)
  return <span className={`product-price ${cart ? 'product-price--cart' : ''} ${className}`}>
    {discounted && <del className="ongyeol-product-card__original-price">{money(originalPrice)}</del>}
    <strong>{money(price)}</strong>
    {!cart && discounted && <span className="ongyeol-product-card__discount">{discountPercent}%</span>}
  </span>
}
