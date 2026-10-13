
import { useState } from 'react'
import './ProductCard.css'
import { productImageFrames } from '../data/productImageFrames.js'

// A stable, unique product.id preserves each product's wish across page changes.
export default function ProductCard({ product }) {
  const storageKey = `ongyeol:wishlist:${product.id}`
  const [wished, setWished] = useState(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      return stored === null ? Boolean(product.defaultWished) : stored === 'true'
    } catch {
      return Boolean(product.defaultWished)
    }
  })
  const rating = Math.min(5, Math.max(0, Number(product.rating) || 0))
  const stars = Math.round(rating)
  const frame = productImageFrames[product.id]
  const textureImage = ['닥열매', '장미', '백목이', '뽕나무', '비타민C'].includes(product.line) ? product.textureImage : null

  function toggleWish() {
    const next = !wished
    setWished(next)
    try {
      window.localStorage.setItem(storageKey, String(next))
    } catch {
      // Keep the button usable when browser storage is unavailable.
    }
  }

  return (
    <article className="ongyeol-product-card" data-product-id={product.id}>
      <div className="ongyeol-product-card__visual">
        {product.image && frame ? (
          <div className="ongyeol-product-card__image-stage">
            <div className="ongyeol-product-card__image-crop" style={{
              '--product-ratio': frame.width * frame.ratio / frame.height,
            }}>
              <img src={product.image} alt={product.name} loading="lazy" style={{
                width: `${100 / frame.width}%`,
                left: `${-100 * frame.x / frame.width}%`,
                top: `${-100 * frame.y / frame.height}%`,
              }} />
            </div>
          </div>
        ) : product.image
          ? <img className="ongyeol-product-card__image" src={product.image} alt={product.name} loading="lazy" />
          : <div className="ongyeol-product-card__image" role="img" aria-label={`${product.name} 이미지 준비 중`} />}
        {textureImage && (
          <img className="ongyeol-product-card__texture" src={textureImage} alt="" aria-hidden="true" />
        )}
        {product.badge && (
          <span className={`ongyeol-product-card__badge ongyeol-product-card__badge--${product.badge.toLowerCase()}`}>
            {product.badge === 'SALE' ? `${product.discountPercent}% SALE` : product.badge}
          </span>
        )}
      </div>
      <h2 className="ongyeol-product-card__name">{product.name}</h2>
      <p className="ongyeol-product-card__price">
        {product.originalPrice > product.price && <del className="ongyeol-product-card__original-price">{product.originalPrice.toLocaleString('ko-KR')}원</del>}
        <span>{product.price.toLocaleString('ko-KR')}원</span>
        {product.discountPercent > 0 && <span className="ongyeol-product-card__discount">{product.discountPercent}%</span>}
      </p>
      <div className="ongyeol-product-card__meta">
        <span className="ongyeol-product-card__rating" aria-label={`평점 ${rating}점, 리뷰 ${product.reviewCount}개`}>
          <span className="ongyeol-product-card__stars" aria-hidden="true">{'★'.repeat(stars)}<span className="ongyeol-product-card__empty-stars">{'★'.repeat(5 - stars)}</span></span>
          <span className="ongyeol-product-card__reviews" aria-hidden="true">({product.reviewCount})</span>
        </span>
        <button type="button" className="ongyeol-product-card__wish" aria-pressed={wished}
          aria-label={`${product.name} 찜 ${wished ? '해제' : '하기'}`} onClick={toggleWish}>
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21S2 15 2 8.5C2 3 8 1 12 6c4-5 10-3 10 2.5C22 15 12 21 12 21Z"
              fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>
    </article>
  )
}
