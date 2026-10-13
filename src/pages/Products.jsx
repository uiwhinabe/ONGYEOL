import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { products as catalogProducts } from '../data/products.js'
import './Products.css'

const concerns = ['민감/진정', '수분/보습', '모공/피지', '피부톤/기미잡티', '주름/탄력']
const types = ['전체', '클렌징', '토너/패드', '에센스/앰플', '로션/크림', '마스크팩']
const lines = ['백목이', '뽕나무', '닥열매', '비타민C', '장미']
const defaultPageSize = 7

function shuffleProducts(products, seed) {
  const shuffled = [...products]
  let value = seed
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    value ^= value << 13
    value ^= value >>> 17
    value ^= value << 5
    const target = Math.floor(((value >>> 0) / 4294967296) * (index + 1))
    ;[shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]]
  }
  return shuffled
}

export default function Products({ products = catalogProducts, classification = 'type', initialCategory, onCategoryChange }) {
  const [shuffleSeed] = useState(() => Math.floor(Math.random() * 4294967295) + 1)
  const shuffledProducts = useMemo(() => shuffleProducts(products, shuffleSeed), [products, shuffleSeed])
  const selectedCategory = classification === 'line' && initialCategory === '오디' ? '뽕나무' : initialCategory
  return (
    <main className="ongyeol-products" aria-labelledby="products-title">
      <ProductList key={`${classification}:${selectedCategory || ''}`} products={products}
        classification={classification} initialCategory={selectedCategory} onCategoryChange={onCategoryChange}
        shuffledProducts={shuffledProducts} />
    </main>
  )
}

function ProductList({ products, classification, initialCategory, onCategoryChange, shuffledProducts }) {
  const byType = classification === 'type'
  const byLine = classification === 'line'
  const categories = byType ? types : byLine ? lines : concerns
  const title = byType ? '제품유형별' : byLine ? '핵심라인별' : '피부고민별'
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : categories[0])
  const [page, setPage] = useState(1)
  const filtered = products.filter((product) => byType
    ? category === '전체' || product.type === category
    : byLine ? product.line === category : product.concerns.includes(category))
  const showVitaminCollection = byLine && category === '비타민C'
  const showAllTypes = byType && category === '전체'
  const pageSize = classification === 'concern' || showAllTypes ? 9
    : byType ? 8 : showVitaminCollection ? Math.max(1, filtered.length) : defaultPageSize
  const matchingIds = new Set(filtered.map((product) => product.id))
  const ordered = showAllTypes || classification === 'concern'
    ? shuffledProducts.filter((product) => matchingIds.has(product.id))
    : filtered
  const pageCount = Math.ceil(ordered.length / pageSize)
  const currentPage = Math.min(page, Math.max(1, pageCount))
  const visible = ordered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <section id="products-list" aria-labelledby="products-title">
      <h1 id="products-title" className="ongyeol-products__title">{title}</h1>
      <nav className="ongyeol-products__categories" aria-label={byType ? '제품 종류 선택' : byLine ? '제품 라인 선택' : '피부고민 선택'}>
        {categories.map((label) => (
          <button key={label} type="button" className="ongyeol-products__category"
            aria-pressed={category === label} onClick={() => { setCategory(label); setPage(1); onCategoryChange?.(classification, label) }}>
            {label}
          </button>
        ))}
      </nav>
      <div aria-live="polite" aria-atomic="true">
        {visible.length ? (
          <ul className="ongyeol-products__grid">
            {visible.map((product) => (
              <li key={product.id} className="ongyeol-products__card">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : <p className="ongyeol-products__empty">{category}에 등록된 상품이 없습니다.</p>}
      </div>
      {pageCount > 0 && (
        <nav className="ongyeol-products__pagination" aria-label="상품 목록 페이지">
          <button type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden="true"><path d="M5 1 1 5l4 4Z" fill="currentColor" /></svg>
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button key={number} type="button" aria-label={`${number}페이지`} aria-current={currentPage === number ? 'page' : undefined}
              onClick={() => setPage(number)}>{number}</button>
          ))}
          <button type="button" aria-label="다음 페이지" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>
            <svg width="6" height="10" viewBox="0 0 6 10" aria-hidden="true"><path d="m1 1 4 4-4 4Z" fill="currentColor" /></svg>
          </button>
        </nav>
      )}
    </section>
  )
}
