import { useEffect, useRef, useState } from 'react'
import searchIcon from '../assets/images/header/search-dropdown.svg'
import './SearchDropdown.css'

const popularKeywords = [
  '어성초 진정 세럼',
  '비타민 미백 앰플',
  '히알루로산 수분 에센스',
  '히알루로산 보습 크림',
  '나이아신아마이드 모공 마스크팩',
]

export default function SearchDropdown({ ref, open, onSearch }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleSubmit = (event) => {
    event.preventDefault()
    const keyword = query.trim()
    if (!keyword) return
    // Connect the search route/service through Header's onSearch prop when available.
    onSearch?.(keyword)
  }

  return (
    <section
      ref={ref}
      id="search-dropdown"
      className={`ongyeol-search-dropdown${open ? ' is-open' : ''}`}
      inert={!open}
      aria-hidden={!open}
      aria-labelledby="ongyeol-search-title"
    >
      <div className="ongyeol-search-content">
        <h2 id="ongyeol-search-title" className="ongyeol-search-title">Search</h2>
        <form className="ongyeol-search-form" role="search" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="ongyeol-search-input"
            type="search"
            name="query"
            aria-label="검색어"
            placeholder="Search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault()
            }}
          />
          <button className="ongyeol-search-submit" type="submit" aria-label="검색 실행">
            <img src={searchIcon} width="20" height="20" alt="" />
          </button>
        </form>
        <div className="ongyeol-search-popular">
          <h3 className="ongyeol-search-popular-title">인기 검색어</h3>
          <ol className="ongyeol-search-keywords">
            {popularKeywords.map((keyword, index) => (
              <li key={keyword}>
                <span aria-hidden="true">{index + 1}.</span>
                <span>{keyword}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
