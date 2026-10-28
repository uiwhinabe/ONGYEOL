import './Pagination.css'

export default function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 5, label = '페이지 이동' }) {
  const count = Number.isFinite(totalPages) ? Math.max(0, Math.floor(totalPages)) : 0
  if (count === 0) return null
  const page = Number.isFinite(currentPage) ? Math.max(1, Math.min(count, Math.floor(currentPage))) : 1
  const size = Number.isFinite(maxVisiblePages) ? Math.max(1, Math.floor(maxVisiblePages)) : 5
  const start = Math.floor((page - 1) / size) * size + 1
  const pages = Array.from({ length: Math.min(size, count - start + 1) }, (_, index) => start + index)
  function change(next) {
    if (next >= 1 && next <= count && next !== page) onPageChange?.(next)
  }

  return <nav className="ongyeol-pagination" aria-label={label}>
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
