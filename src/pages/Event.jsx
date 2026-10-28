import Pagination from '../components/Pagination.jsx'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import welcomeBenefit from '../assets/images/events/welcome-benefit.png'
import kakaoEvent from '../assets/images/events/kakao.png'
import './Event.css'

const events = [
  { id: 'signup-coupon', title: '신규 가입 회원 쿠폰 이벤트', status: '상시 이벤트', image: welcomeBenefit },
  { id: 'kakao-coupon', title: '카카오톡 플러스 친구 쿠폰 이벤트', status: '상시 이벤트', image: kakaoEvent },
]

// 실제 상품 데이터가 준비되면 이 배열을 교체합니다.
const saleProducts = products.filter(p => p.discountPercent > 0)

export default function Event() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') === 'sale' ? 'sale' : 'ongoing'
  const setActiveTab = tab => setSearchParams(previous => {
    const next = new URLSearchParams(previous)
    next.set('tab', tab)
    return next
  })
  const [pageSize, setPageSize] = useState(() => window.matchMedia('(min-width: 1025px)').matches ? 6 : 4)
  const [salePage, setSalePage] = useState(1)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)')
    const updatePageSize = () => {
      setPageSize(desktop.matches ? 6 : 4)
      setSalePage(1)
    }
    desktop.addEventListener('change', updatePageSize)
    return () => desktop.removeEventListener('change', updatePageSize)
  }, [])

  const pageCount = Math.ceil(saleProducts.length / pageSize)
  const currentPage = Math.max(1, Math.min(salePage, pageCount || 1))
  const visibleProducts = saleProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return <main className="event-page"><div className="event-content">
    <h1 className="event-page-title">이벤트</h1>
    <div className="event-tabs" aria-label="이벤트 분류">
      <button className={`event-tab${activeTab === 'ongoing' ? ' event-tab-active' : ''}`} type="button" aria-pressed={activeTab === 'ongoing'} onClick={() => setActiveTab('ongoing')}>진행중 이벤트</button>
      <span className="event-tab-divider" aria-hidden="true" />
      <button className={`event-tab${activeTab === 'sale' ? ' event-tab-active' : ''}`} type="button" aria-pressed={activeTab === 'sale'} onClick={() => setActiveTab('sale')}>세일상품</button>
    </div>
    {activeTab === 'ongoing' ? <>
      <div className="event-grid">{events.map(event => <button type="button" className="event-card" key={event.id} onClick={() => navigate(`/event/${event.id}`)}>
        <img className="event-card-image" src={event.image} alt="" />
        <span className="event-card-title">{event.title}</span>
        <span className="event-card-status">{event.status}</span>
      </button>)}</div>
      <div className="events-page-navigation"><Pagination currentPage={1} totalPages={1} label="이벤트 페이지" /></div>
    </> : <>
      <div className="sale-product-grid">
        {visibleProducts.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className="sale-page-navigation"><Pagination currentPage={currentPage} totalPages={pageCount} onPageChange={setSalePage} maxVisiblePages={pageCount} label="세일상품 페이지" /></div>
    </>}
  </div></main>
}
