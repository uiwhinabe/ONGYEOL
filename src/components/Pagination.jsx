import { useLayoutEffect, useRef } from 'react'
import './Pagination.css'

export default function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 5, label = '페이지 이동' }) {
  const count = Number.isFinite(totalPages) ? Math.max(0, Math.floor(totalPages)) : 0
  const page = Number.isFinite(currentPage) ? Math.max(1, Math.min(count || 1, Math.floor(currentPage))) : 1
  const navRef = useRef(null)
  const previousPage = useRef(page)
  const hasPages = count > 0
  useLayoutEffect(() => {
    if (!hasPages) return
    // Native history restoration must not overwrite the post-render reset.
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previousRestoration }
  }, [hasPages])
  useLayoutEffect(() => {
    if (previousPage.current === page) return
    previousPage.current = page
    // Run after the new page's DOM commits, including when the last page shrinks.
    for (let element = navRef.current?.parentElement; element; element = element.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(element).overflowY)) {
        element.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [page])
  if (count === 0) return null
  const size = Number.isFinite(maxVisiblePages) ? Math.max(1, Math.floor(maxVisiblePages)) : 5
  const start = Math.floor((page - 1) / size) * size + 1
  const pages = Array.from({ length: Math.min(size, count - start + 1) }, (_, index) => start + index)
  function change(next) {
    if (next >= 1 && next <= count && next !== page) onPageChange?.(next)
  }

  return <nav ref={navRef} className="ongyeol-pagination" aria-label={label}>
    <button type="button" className="ongyeol-pagination__button ongyeol-pagination__arrow" aria-label="이전 페이지"
      disabled={page === 1} onClick={() => change(page - 1)}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5.5V18.5L10 12Z" fill="currentColor" /></svg>
    </button>
    <div className="ongyeol-pagination__numbers">
      {pages.map(number => <button key={number} type="button" className="ongyeol-pagination__button"
        aria-label={`${number}페이지`} aria-current={page === number ? 'page' : undefined}
        onClick={() => change(number)}>{number}</button>)}
    </div>
    <button type="button" className="ongyeol-pagination__button ongyeol-pagination__arrow" aria-label="다음 페이지"
      disabled={page === count} onClick={() => change(page + 1)}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5V18.5L14 12Z" fill="currentColor" /></svg>
    </button>
  </nav>
}
