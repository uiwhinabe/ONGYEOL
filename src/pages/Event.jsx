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
const saleProducts = [
  { id: 'sale-1', name: '어성초 저자극 진정 토너', originalPrice: 26000, salePrice: 20800, discount: 20, image: null },
  { id: 'sale-2', name: '히알루론산 수분 크림', originalPrice: 32000, salePrice: 25600, discount: 20, image: null },
  { id: 'sale-3', name: '나이아신아마이드 모공 패드', originalPrice: 26000, salePrice: 20800, discount: 20, image: null },
  { id: 'sale-4', name: '레티놀 나이트 리페어 크림', originalPrice: 30000, salePrice: 22500, discount: 25, image: null },
  { id: 'sale-5', name: '비타민 미백 탄력 마스크팩', originalPrice: 30000, salePrice: 22500, discount: 25, image: null },
  { id: 'sale-6', name: '히알루론산 수분 딥클렌징폼', originalPrice: 30000, salePrice: 22500, discount: 25, image: null },
]

const formatPrice = price => `${price.toLocaleString('ko-KR')}원`

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
  const visibleProducts = saleProducts.slice((salePage - 1) * pageSize, salePage * pageSize)

  return <main className="event-page">
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
      <nav className="event-pagination" aria-label="이벤트 페이지">
        <button className="event-page-arrow" type="button" aria-label="이전 페이지" disabled>‹</button>
        <span className="event-page-number" aria-current="page">1</span>
        <button className="event-page-arrow" type="button" aria-label="다음 페이지" disabled>›</button>
      </nav>
    </> : <>
      <div className="sale-product-grid">
        {visibleProducts.map(product => <button type="button" className="sale-product-card" key={product.id}>
          {product.image
            ? <img className="sale-product-image" src={product.image} alt="" />
            : <span className="sale-product-placeholder" aria-hidden="true" />}
          <span className="sale-product-name">{product.name}</span>
          <span className="sale-product-prices">
            <span className="sale-product-original-price">{formatPrice(product.originalPrice)}</span>
            <span className="sale-product-sale-price">{formatPrice(product.salePrice)}</span>
            <span className="sale-product-discount">{product.discount}%</span>
          </span>
        </button>)}
      </div>
      <nav className="sale-pagination" aria-label="세일상품 페이지">
        <button type="button" className="sale-pagination-arrow" aria-label="이전 페이지" disabled={salePage === 1} onClick={() => setSalePage(page => Math.max(1, page - 1))}>‹</button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(page => <button type="button" className="sale-pagination-number" key={page} aria-current={page === salePage ? 'page' : undefined} aria-label={`${page}페이지`} onClick={() => setSalePage(page)}>{page}</button>)}
        <button type="button" className="sale-pagination-arrow" aria-label="다음 페이지" disabled={salePage === pageCount} onClick={() => setSalePage(page => Math.min(pageCount, page + 1))}>›</button>
      </nav>
    </>}
  </main>
}
