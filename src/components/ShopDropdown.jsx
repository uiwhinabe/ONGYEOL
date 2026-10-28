import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { navigateToProducts } from '../utils/productNavigation.js'
import './ShopDropdown.css'
import welcomeBenefit from '../assets/images/events/welcome-benefit.png'
import kakaoEvent from '../assets/images/events/kakao.png'

const categories = [
  { title: '제품유형별', items: ['토너/패드', '에센스/앰플', '로션/크림', '클렌징', '마스크팩'] },
  { title: '핵심라인별', items: ['백목이', '오디', '닥열매', '레몬', '장미'], defaultCategory: '백목이' },
  { title: '피부고민별', items: ['민감/진정', '수분/보습', '모공/피지', '피부톤/기미잡티', '주름/탄력'] },
]

const eventBanners = [
  { id: 'signup-coupon', image: welcomeBenefit, alt: '온결 신규가입 회원 10,000원 쿠폰 이벤트' },
  { id: 'kakao-coupon', image: kakaoEvent, alt: '온결 카카오톡 플러스친구 추가 시 10,000원 할인 쿠폰 이벤트' },
]
// Match Home's forward loop: slide onto a copy of the first banner, then reset invisibly.
const bannerTrack = [...eventBanners, eventBanners[0]]

function ShopEventBanners({ onClose }) {
  const [index, setIndex] = useState(0)
  const [animated, setAnimated] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (hovered || focused) return
    const timer = window.setInterval(() => setIndex(current => current + 1), 4000)
    return () => window.clearInterval(timer)
  }, [hovered, focused])

  function finishLoop() {
    if (index !== eventBanners.length) return
    setAnimated(false)
    setIndex(0)
  }

  useEffect(() => {
    if (index !== eventBanners.length) return
    // Also reset when reduced motion disables transitionend, or the tab is hidden.
    const timer = window.setTimeout(() => {
      setAnimated(false)
      setIndex(0)
    }, 500)
    return () => window.clearTimeout(timer)
  }, [index])

  useLayoutEffect(() => {
    if (animated) return
    let secondFrame
    const frame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setAnimated(true))
    })
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(secondFrame) }
  }, [animated])

  return <div className="shop-dropdown-banner-carousel" aria-label="이벤트 배너" aria-roledescription="캐러셀"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <div className={`shop-dropdown-banner-track${animated ? '' : ' is-resetting'}`}
      style={{ transform: `translateX(-${index * 100}%)` }}
      onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === 'transform') finishLoop() }}>
      {bannerTrack.map((banner, slide) => <Link key={`${banner.id}-${slide}`} className="shop-dropdown-banner-link"
        to={`/event/${banner.id}`} onClick={onClose} aria-label={banner.alt}
        inert={slide !== index} aria-hidden={slide !== index} tabIndex={slide === index ? 0 : -1}>
        <img className="shop-dropdown-banner" src={banner.image} alt={banner.alt} width="465" height="264" />
      </Link>)}
    </div>
  </div>
}

export default function ShopDropdown({ ref, open, onMouseEnter, onMouseLeave, onBlur, onClose }) {
  const navigate = useNavigate()
  return (
    <div className={`shop-dropdown-layer${open ? ' is-open' : ''}`} inert={!open} aria-hidden={!open}>
      <div className="shop-dropdown-overlay" aria-hidden="true" onClick={onClose} onMouseEnter={onMouseLeave} />
      <div ref={ref} id="shop-dropdown" className="shop-dropdown" role="region" aria-labelledby="shop-trigger" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onBlur={onBlur}>
        <div className="shop-dropdown-inner">
          <div className="shop-dropdown-categories">
            {categories.map(({ title, items, defaultCategory }, index) => (
              <section key={title} aria-labelledby={`shop-category-${index}`}>
                <h2 id={`shop-category-${index}`} className="shop-dropdown-title">
                  <button type="button" className="shop-dropdown-title-button" onClick={() => {
                    onClose()
                    navigateToProducts(['type', 'line', 'concern'][index], index === 0 ? '전체' : defaultCategory || items[0], navigate)
                  }}>{title}</button>
                </h2>
                <ul className="shop-dropdown-list">
                  {items.map((label) => (
                    <li key={label}>
                      <button type="button" className="shop-dropdown-item" onClick={() => {
                        onClose()
                        navigateToProducts(['type', 'line', 'concern'][index], label, navigate)
                      }}>{label}</button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div className="shop-dropdown-banners">
            {open && <ShopEventBanners onClose={onClose} />}
          </div>
        </div>
      </div>
    </div>
  )
}
