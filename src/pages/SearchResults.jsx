import { useLayoutEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/Pagination.jsx'
import { products } from '../data/products.js'
import { searchProducts } from '../utils/productSearch.js'
import './Products.css'
import './SearchResults.css'

const pageSize = 9

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()
  const results = searchProducts(products, query)
  const totalPages = Math.ceil(results.length / pageSize)
  const requestedPage = Number(searchParams.get('page') || 1)
  const currentPage = Number.isSafeInteger(requestedPage)
    ? Math.max(1, Math.min(requestedPage, totalPages || 1)) : 1
  const visible = results.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [query])

  return <main className="ongyeol-products search-results" aria-labelledby="search-results-title">
    <h1 id="search-results-title" className="ongyeol-products__title">“{query}” 검색 결과</h1>
    <p className="search-results__count" role="status">총 {results.length}개</p>
    {visible.length ? <ul className="ongyeol-products__grid catalog-product-grid">
      {visible.map(product => <li key={product.id} className="ongyeol-products__card"><ProductCard product={product} /></li>)}
    </ul> : <p className="ongyeol-products__empty">검색 결과가 없습니다.</p>}
    {totalPages > 0 && <div className="products-page-navigation">
      <Pagination currentPage={currentPage} totalPages={totalPages} label="검색 결과 페이지"
        onPageChange={page => setSearchParams({ q: query, ...(page > 1 ? { page: String(page) } : {}) })} />
    </div>}
  </main>
}
