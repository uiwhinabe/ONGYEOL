import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { calculateShippingFee } from '../utils/orderPricing.js'
import trashIcon from '../assets/cart/trash.svg'
import truckIcon from '../assets/cart/truck.svg'
import cardIcon from '../assets/cart/card.svg'
import giftIcon from '../assets/cart/gift.svg'
import nextIcon from '../assets/cart/next.svg'
import buyIcon from '../assets/cart/buy.svg'
import './Cart.css'

const findProduct = id => products.find(product => product.id === id)
// Cart reference prices are local to this screen; the catalog remains unchanged.
const RECOMMENDATIONS_PER_PAGE = 5
const MOBILE_QUERY = '(max-width: 540px)'
const recommendedProducts = [
  { ...findProduct('baekmogi-ampoule'), name: '백목이 수분 농축 앰플 50ml', originalPrice: 26000, price: 20800, discountPercent: 20 },
  { ...findProduct('dakyeolmae-ampoule'), name: '닥열매 리페어 앰플 30ml' },
  { ...findProduct('vitamin-c-lotion'), name: '비타민 C 로션 50ml' },
  { ...findProduct('odi-cream'), name: '오디 보습 크림' },
  { ...findProduct('baekmogi-pad'), name: '백목이 커스텀 핏 패드 100매', originalPrice: 26000, price: 20800, discountPercent: 20 },
].filter(product => product.id)
const initialCartItems = [
  { ...findProduct('odi-ampoule'), name: '오디 톤업 앰플 50ml', option: '(옵션: 1개)', price: 25600, quantity: 1, selected: true },
  { ...findProduct('baekmogi-cream'), name: '백목이 수분 크림', option: '(옵션: 1개)', price: 20800, quantity: 1, selected: true },
]
const benefits = [
  { text: <>50,000원 이상<br />무료배송</>, icon: truckIcon },
  { text: <>다양한<br />결제수단</>, icon: cardIcon },
  { text: <>멤버십 전용<br />특별 혜택</>, icon: giftIcon },
]
const money = value => `${value.toLocaleString('ko-KR')}원`

function SelectAll({ checked, disabled, onChange, label }) {
  return <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} aria-label={label} />
}

export default function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState(initialCartItems)
  const [recommendationIndex, setRecommendationIndex] = useState(0)
  const recommendationViewportRef = useRef(null)
  const recommendationTrackRef = useRef(null)
  const slideLockRef = useRef(false)
  const slideTimerRef = useRef(null)
  const [slideStep, setSlideStep] = useState(0)
  const [viewportVisibleCount, setViewportVisibleCount] = useState(RECOMMENDATIONS_PER_PAGE)
  const [hasRecommendationOverflow, setHasRecommendationOverflow] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const updateMobile = () => setIsMobile(media.matches)
    updateMobile()
    media.addEventListener('change', updateMobile)
    return () => media.removeEventListener('change', updateMobile)
  }, [])
  const selectedItems = items.filter(item => item.selected)
  const allSelected = items.length > 0 && items.every(item => item.selected)
  const selectedItemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const selectedProductsPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = calculateShippingFee(selectedProductsPrice, selectedItems.length)
  const totalPrice = selectedProductsPrice + shippingFee
  const visibleCount = viewportVisibleCount
  const lastRecommendationIndex = hasRecommendationOverflow ? Math.max(0, recommendedProducts.length - visibleCount) : 0
  const startIndex = Math.min(recommendationIndex, lastRecommendationIndex)
  const canGoPrevious = startIndex > 0
  const canGoNext = startIndex < lastRecommendationIndex

  useLayoutEffect(() => {
    const viewport = recommendationViewportRef.current
    const track = recommendationTrackRef.current
    const measureStep = () => {
      const hasOverflow = track.scrollWidth > viewport.clientWidth
      setHasRecommendationOverflow(hasOverflow)
      if (!hasOverflow) setRecommendationIndex(0)
      const card = track.firstElementChild
      if (card) {
        const gap = parseFloat(getComputedStyle(track).columnGap)
        const step = card.getBoundingClientRect().width + gap
        setSlideStep(step)
        setViewportVisibleCount(Math.max(1, Math.min(recommendedProducts.length, Math.floor((viewport.getBoundingClientRect().width + gap + 0.5) / step))))
      }
    }
    measureStep()
    const observer = new ResizeObserver(measureStep)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => () => window.clearTimeout(slideTimerRef.current), [])

  function finishSlide() {
    window.clearTimeout(slideTimerRef.current)
    slideLockRef.current = false
    setIsSliding(false)
  }

  function moveRecommendation(direction) {
    if (slideLockRef.current) return
    const nextIndex = Math.max(0, Math.min(lastRecommendationIndex, startIndex + direction))
    if (nextIndex === startIndex) return
    slideLockRef.current = true
    setIsSliding(true)
    setRecommendationIndex(nextIndex)
    slideTimerRef.current = window.setTimeout(finishSlide, 500)
  }

  function toggleAll() {
    setItems(current => current.map(item => ({ ...item, selected: !allSelected })))
  }
  function changeQuantity(id, delta) {
    setItems(current => current.map(item => item.id === id
      ? { ...item, quantity: Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, item.quantity + delta)) }
      : item))
  }
  function checkout() {
    if (!selectedItems.length) return
    navigate('/checkout', { state: { cartItems: selectedItems.map(({ id, name, option, price, quantity, image }) => ({ id, name, option, price, quantity, image })) } })
  }

  return <main className="cart-page">
    <section className="cart-recommendations" aria-labelledby="cart-recommendation-title">
      <div className="cart-heading"><h2 id="cart-recommendation-title">이런 상품은 어떠신가요?</h2><p>장바구니에 담은 물건과 함께 사용하면 좋은 제품</p></div>
      <div className="cart-recommendation-carousel">
        <div className="cart-recommend-viewport" ref={recommendationViewportRef}>
          <div className="cart-recommendation-list cart-recommend-track" ref={recommendationTrackRef}
            style={{ transform: `translateX(-${startIndex * slideStep}px)` }}
            onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === 'transform') finishSlide() }}>
            {recommendedProducts.map((product, index) => <div className="cart-recommend-slide" key={product.id} inert={index < startIndex || index >= startIndex + visibleCount}><ProductCard product={product} /></div>)}
          </div>
        </div>
        {canGoPrevious && <button className="cart-next cart-previous" type="button" aria-label="이전 추천 상품" aria-disabled={isSliding} onClick={() => moveRecommendation(-1)}><img src={nextIcon} alt="" /></button>}
        {canGoNext && <button className="cart-next" type="button" aria-label="다음 추천 상품" aria-disabled={isSliding} onClick={() => moveRecommendation(1)}><img src={nextIcon} alt="" /></button>}
      </div>
    </section>

    <section className="cart-content" aria-labelledby="cart-title">
      <div className="cart-heading"><h1 id="cart-title">장바구니</h1><p>좋은 피부를 위한 선택. 지금 담아보세요.</p></div>
      <div className="cart-layout">
        <div className="cart-products">
          <div className="cart-toolbar">
            <label className="cart-select-all"><SelectAll checked={allSelected} disabled={!items.length} onChange={toggleAll} label="전체 선택" /><span>전체 선택</span></label>
            <button type="button" className="cart-delete" disabled={!selectedItems.length} onClick={() => setItems(current => current.filter(item => !item.selected))}><img src={trashIcon} alt="" />선택 삭제</button>
          </div>
          <table className="cart-table">
            <colgroup><col className="cart-col-check" /><col /><col className="cart-col-price" /><col className="cart-col-quantity" /><col className="cart-col-delivery" /><col className="cart-col-shipping" /><col className="cart-col-price" /></colgroup>
            <thead><tr><th scope="col"><SelectAll checked={allSelected} disabled={!items.length} onChange={toggleAll} label="장바구니 상품 전체 선택" /></th><th scope="col">상품/옵션정보</th><th scope="col">판매가</th><th scope="col">수량</th><th scope="col">배송구분</th><th scope="col">배송비</th><th scope="col">합계</th></tr></thead>
            <tbody>{items.map(item => <tr key={item.id}>
              <td className="cart-item-check"><input type="checkbox" checked={item.selected} aria-label={`${item.name} 선택`} onChange={() => setItems(current => current.map(product => product.id === item.id ? { ...product, selected: !product.selected } : product))} /></td>
              <td><div className="cart-item-info"><img src={item.image} alt={item.name} /><div><p>{item.name}</p><small>{item.option}</small></div></div></td>
              <td>{money(item.price)}</td>
              <td><div className="cart-bottom-info"><div className="cart-quantity"><button type="button" aria-label={`${item.name} 수량 감소`} disabled={item.quantity === 1} onClick={() => changeQuantity(item.id, -1)}>−</button><output aria-label={`${item.name} 수량`}>{item.quantity}</output><button type="button" aria-label={`${item.name} 수량 증가`} onClick={() => changeQuantity(item.id, 1)}>+</button></div><span className="cart-mobile-amount">{shippingFee ? money(shippingFee) : '무료'}</span><span className="cart-mobile-amount">{money(item.price * item.quantity)}</span></div></td>
              <td>기본배송</td><td>{shippingFee ? money(shippingFee) : '무료'}</td><td>{money(item.price * item.quantity)}</td>
            </tr>)}{!items.length && <tr><td colSpan={7} className="cart-empty">장바구니가 비어 있습니다.</td></tr>}</tbody>
          </table>
        </div>
        <aside className="cart-summary" aria-labelledby="cart-summary-title">
          <h2 id="cart-summary-title">주문 요약</h2>
          <div className="cart-summary-amounts" aria-live="polite" aria-atomic="true">
            <div><span>선택상품 ({selectedItemCount}개)</span><span>{money(selectedProductsPrice)}</span></div>
            <div><span>배송비</span><span>{money(shippingFee)}</span></div>
            <div className="cart-total"><span>총 결제금액</span><strong>{money(totalPrice)}</strong></div>
          </div>
          <div className="cart-benefits">{benefits.map((benefit, index) => <div key={index}><p>{benefit.text}</p><img src={benefit.icon} alt="" /></div>)}</div>
        </aside>
      </div>
      <div className="cart-actions"><button className="cart-buy" type="button" disabled={!selectedItems.length} onClick={checkout}>구매하기 <img src={buyIcon} alt="" /></button><Link to="/products">쇼핑 계속하기</Link></div>
    </section>
  </main>
}
