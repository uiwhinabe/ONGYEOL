import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/images/home/image 228.png'
import moistureHeroImage from '../assets/images/home/image 228-1.png'
import vitaminHeroImage from '../assets/images/home/image 228-2.png'
import sensitiveImage from '../assets/images/home/Ellipse 10.png'
import moistureImage from '../assets/images/home/Ellipse 11.png'
import poresImage from '../assets/images/home/Ellipse 12.png'
import toneImage from '../assets/images/home/Ellipse 13.png'
import elasticityImage from '../assets/images/home/Ellipse 14.png'
import cleansingIcon from '../assets/images/home/category-cleansing.png'
import tonerIcon from '../assets/images/home/category-toner.png'
import essenceIcon from '../assets/images/home/category-essence.png'
import creamIcon from '../assets/images/home/category-cream.png'
import maskIcon from '../assets/images/home/category-mask.png'
import openingBanner from '../assets/images/home/grand-opening.png'
import featuredImage from '../assets/images/home/백목이전체.png'
import padImage from '../assets/images/home/백목이1.png'
import creamImage from '../assets/images/home/백목이3.png'
import ampouleImage from '../assets/images/home/백목이2.png'
import lemonLineImage from '../assets/images/home/비타민전체.png'
import lemonProduct1 from '../assets/images/home/비타민1.png'
import lemonProduct2 from '../assets/images/home/비타민2.png'
import lemonProduct3 from '../assets/images/home/비타민3.png'
import roseLineImage from '../assets/images/home/장미전체.png'
import roseProduct1 from '../assets/images/home/장미1.png'
import roseProduct2 from '../assets/images/home/장미2.png'
import mulberryLineImage from '../assets/images/home/오디 전체.png'
import mulberryProduct1 from '../assets/images/home/오디1.png'
import mulberryProduct2 from '../assets/images/home/오디2.png'
import mulberryProduct3 from '../assets/images/home/오디3.png'
import paperMulberryLineImage from '../assets/images/home/닥열매 전체.png'
import paperMulberryProduct1 from '../assets/images/home/닥열매1.png'
import paperMulberryProduct2 from '../assets/images/home/닥열매2.png'
import paperMulberryProduct3 from '../assets/images/home/닥열매3.png'
import featuredArrowLeft from '../assets/images/home/featured-arrow-left.svg'
import featuredArrowRight from '../assets/images/home/featured-arrow-right.svg'
import './Home.css'

const heroSlides = [
  { id: 'rose', image: heroImage, description: '촉촉하고 탄탄한 눈가를 위한 데일리 케어', title: '로즈 PDRN 아이크림', alt: '로즈 PDRN 아이크림을 들고 있는 모델', position: 'center center', textSide: 'right' },
  { id: 'tremella', image: moistureHeroImage, description: '메마른 피부를 촉촉하게 채우는 집중 수분 케어', title: '백목이 수분 농축 앰플', alt: '백목이 수분 농축 앰플을 들고 있는 모델', position: 'center center', textSide: 'left' },
  { id: 'vitamin', image: vitaminHeroImage, description: '맑고 생기 있는 피부를 위한 데일리 클렌징', title: '비타민 클렌징 폼', alt: '비타민 클렌징 폼을 들고 있는 모델', position: 'center center', textSide: 'left' },
]
// The first slide's clone lets the final slide move forward before resetting invisibly.
const heroTrackSlides = [...heroSlides, { ...heroSlides[0], id: 'rose-loop' }]

const skinConcerns = [
  { id: 'sensitive', label: '민감 / 진정', image: sensitiveImage },
  { id: 'moisture', label: '수분 / 보습', image: moistureImage },
  { id: 'pore', label: '모공 / 피지', image: poresImage },
  { id: 'tone', label: '피부톤 / 기미·잡티', image: toneImage },
  { id: 'elasticity', label: '주름 / 탄력', image: elasticityImage },
]
const productCategories = [
  { id: 'cleansing', label: '클렌징', image: cleansingIcon },
  { id: 'toner-pad', label: '토너 / 패드', image: tonerIcon },
  { id: 'essence-ampoule', label: '에센스 / 앰플', image: essenceIcon },
  { id: 'lotion-cream', label: '로션 / 크림', image: creamIcon },
  { id: 'mask', label: '마스크팩', image: maskIcon },
]
// HOME display data, independent of the future product catalog.
const featuredProducts = [
  { id: 'tremella-pad', name: '백목이 커스텀 수분 패드,100매', originalPrice: 35000, salePrice: 28000, discount: 20, image: padImage },
  { id: 'tremella-cream', name: '백목이 수분 진정 크림 50ml', originalPrice: 26000, salePrice: 20800, discount: 20, image: creamImage },
  { id: 'tremella-ampoule', name: '백목이 수분 농축 앰플,50ml', originalPrice: 28000, salePrice: 22400, discount: 20, image: ampouleImage },
]
// Null fields are intentionally awaiting catalog data; do not invent names/prices.
const pendingProduct = (id, image = null, name = null) => ({ id, image, name, originalPrice: null, salePrice: null, discount: null })
const lineSlides = [
  { id: 'tremella', label: '백목이', name: '백목이 라인', icon: '💧', image: featuredImage, products: featuredProducts },
  { id: 'lemon', label: '레몬', name: '레몬 라인', icon: '🍋', image: lemonLineImage, products: [pendingProduct('lemon-1', lemonProduct1), pendingProduct('lemon-2', lemonProduct2), pendingProduct('lemon-3', lemonProduct3, '비타민 클렌징 폼')] },
  { id: 'rose', label: '로즈 PDRN', name: '장미 라인', icon: '🌹', image: roseLineImage, products: [pendingProduct('rose-1', roseProduct1), pendingProduct('rose-2', roseProduct2, '로즈 PDRN 아이크림'), pendingProduct('rose-3')] },
  { id: 'mulberry', label: '오디', name: '오디 라인', icon: '🍇', image: mulberryLineImage, products: [pendingProduct('mulberry-1', mulberryProduct1), pendingProduct('mulberry-2', mulberryProduct2), pendingProduct('mulberry-3', mulberryProduct3, '오디 보습 크림')] },
  { id: 'paper-mulberry', label: '닥열매', name: '닥열매 라인', icon: '🌿', image: paperMulberryLineImage, products: [pendingProduct('paper-mulberry-1', paperMulberryProduct1), pendingProduct('paper-mulberry-2', paperMulberryProduct2), pendingProduct('paper-mulberry-3', paperMulberryProduct3, '닥열매 퍼퓸 바디 스크럽')] },
]
const lineTrackSlides = [...lineSlides, { ...lineSlides[0], id: 'tremella-loop' }]
const formatPrice = price => price.toLocaleString('ko-KR') + '원'

export default function Home() {
  const heroRef = useRef(null)
  const skinGuideRef = useRef(null)
  const isAutoScrolling = useRef(false)

  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)')
    const header = document.querySelector('.ongyeol-header')
    const guide = skinGuideRef.current
    let unlockTimer
    let animationFrame
    let animationFinished = true
    let lastWheelAt = 0

    const updateHeaderHeight = () => {
      guide?.style.setProperty('--home-header-height', `${header?.getBoundingClientRect().height ?? 0}px`)
    }
    updateHeaderHeight()
    const headerObserver = new ResizeObserver(updateHeaderHeight)
    if (header) headerObserver.observe(header)

    const handleWheel = event => {
      if (window.location.pathname !== '/' || !desktop.matches || event.ctrlKey || event.defaultPrevented) return
      if (isAutoScrolling.current) {
        lastWheelAt = performance.now()
        if (event.cancelable) event.preventDefault()
        return
      }
      const hero = heroRef.current
      if (!event.deltaY || !hero || !guide || !hero.closest('.home-page')?.contains(event.target)) return

      const bounds = hero.getBoundingClientRect()
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const visibleHeroHeight = Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, headerHeight)
      const guideBounds = guide.getBoundingClientRect()
      const atGuideTop = Math.abs(guideBounds.top - headerHeight) <= 20
      const viewingHero = guideBounds.top > headerHeight + 20 && visibleHeroHeight >= Math.min(bounds.height, window.innerHeight - headerHeight) / 2
      const target = event.deltaY > 0 && viewingHero ? guide : event.deltaY < 0 && atGuideTop ? hero : null
      if (!target) {
        // Let users read/scroll back through the guide. A large final wheel
        // step stops at its top so the next gesture can return to the hero.
        const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
        const distanceToTop = headerHeight - guideBounds.top
        if (delta < 0 && distanceToTop > 20 && guideBounds.bottom > headerHeight && -delta >= distanceToTop && event.cancelable) {
          event.preventDefault()
          window.scrollTo({ top: window.scrollY - distanceToTop, behavior: 'instant' })
        }
        return
      }

      if (event.cancelable) event.preventDefault()
      isAutoScrolling.current = true
      animationFinished = false
      lastWheelAt = performance.now()
      updateHeaderHeight()
      const startY = window.scrollY
      const targetY = Math.max(0, startY + target.getBoundingClientRect().top - headerHeight)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: targetY, behavior: 'instant' })
        animationFinished = true
      } else {
        // A cancellable animation prevents native smooth scrolling from
        // continuing after React switches to another page.
        const startedAt = performance.now()
        const animate = now => {
          const progress = Math.min((now - startedAt) / 800, 1)
          const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
          window.scrollTo({ top: startY + (targetY - startY) * eased, behavior: 'instant' })
          if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
          else animationFinished = true
        }
        animationFrame = window.requestAnimationFrame(animate)
      }
      const unlockWhenIdle = () => {
        if (animationFinished && performance.now() - lastWheelAt >= 250) isAutoScrolling.current = false
        else unlockTimer = window.setTimeout(unlockWhenIdle, 50)
      }
      unlockTimer = window.setTimeout(unlockWhenIdle, 850)
    }

    const handleBreakpointChange = () => {
      if (!desktop.matches && isAutoScrolling.current) {
        window.cancelAnimationFrame(animationFrame)
        window.clearTimeout(unlockTimer)
        isAutoScrolling.current = false
      }
      updateHeaderHeight()
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    desktop.addEventListener('change', handleBreakpointChange)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      desktop.removeEventListener('change', handleBreakpointChange)
      headerObserver.disconnect()
      window.clearTimeout(unlockTimer)
      window.cancelAnimationFrame(animationFrame)
      isAutoScrolling.current = false
    }
  }, [])

  const [heroState, setHeroState] = useState({ index: 0, animate: true })
  const [heroHovered, setHeroHovered] = useState(false)
  const [heroTimerVersion, setHeroTimerVersion] = useState(0)
  const activeHeroIndex = heroState.index % heroSlides.length

  useEffect(() => {
    if (heroHovered || heroSlides.length < 2) return
    const timer = setInterval(() => {
      setHeroState(current => ({ index: (current.index % heroSlides.length) + 1, animate: true }))
    }, 5000)
    return () => clearInterval(timer)
  }, [heroHovered, heroTimerVersion])

  function selectHero(index) {
    setHeroState({ index, animate: true })
    setHeroTimerVersion(current => current + 1)
  }

  function finishHeroTransition(event) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    setHeroState(current => current.index === heroSlides.length ? { index: 0, animate: false } : current)
  }

  const [lineState, setLineState] = useState({ index: 0, animate: true })
  const [lineHovered, setLineHovered] = useState(false)
  const [lineTimerVersion, setLineTimerVersion] = useState(0)
  const activeLineIndex = lineState.index % lineSlides.length

  useEffect(() => {
    if (lineHovered) return
    const timer = setInterval(() => {
      setLineState(current => ({ index: (current.index % lineSlides.length) + 1, animate: true }))
    }, 5000)
    return () => clearInterval(timer)
  }, [lineHovered, lineTimerVersion])

  function selectLine(index) {
    setLineState({ index, animate: true })
    setLineTimerVersion(current => current + 1)
  }

  function moveLine(direction) {
    setLineState(current => {
      const index = current.index % lineSlides.length
      return {
        // Use the existing first-slide clone when advancing from the final line.
        index: direction > 0 ? index + 1 : (index + lineSlides.length - 1) % lineSlides.length,
        animate: true,
      }
    })
    setLineTimerVersion(current => current + 1)
  }

  function finishLineTransition(event) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    setLineState(current => current.index === lineSlides.length ? { index: 0, animate: false } : current)
  }

  return <main className="home-page">
    <section ref={heroRef} className="home-hero" aria-label="메인 상품 배너" aria-roledescription="캐러셀" onPointerEnter={event => { if (event.pointerType === 'mouse') setHeroHovered(true) }} onPointerLeave={() => setHeroHovered(false)}>
      <div className={`home-hero-track${heroState.animate ? '' : ' home-hero-track-reset'}`} style={{ transform: `translateX(-${heroState.index * 100}%)` }} onTransitionEnd={finishHeroTransition}>
        {heroTrackSlides.map((slide, index) => <div className={`home-hero-slide home-hero-slide-${slide.textSide}${slide.id === 'tremella' ? ' home-hero-slide--second' : ''}`} key={slide.id} role="group" aria-roledescription="슬라이드" aria-label={`${(index % heroSlides.length) + 1} / ${heroSlides.length}`} aria-hidden={index !== heroState.index || index === heroSlides.length} inert={index !== heroState.index || index === heroSlides.length}>
          <img className="home-hero-image" src={slide.image} alt={slide.alt} style={{ objectPosition: slide.position }} fetchPriority={index === 0 ? 'high' : 'auto'} />
          <div className="home-hero-overlay"><div className="home-hero-copy">
            <p>{slide.description}</p>
            <h1>{slide.title}</h1>
            <div className="home-hero-actions"><button type="button">Shop now</button><button type="button">Show more</button></div>
          </div></div>
        </div>)}
      </div>
      <div className="home-hero-pagination" aria-label="배너 선택">{heroSlides.map((slide, index) => <button key={slide.id} type="button" className={`home-hero-dot${activeHeroIndex === index ? ' home-hero-dot-active' : ''}`} aria-label={`${index + 1}번째 배너 보기`} aria-pressed={activeHeroIndex === index} onClick={() => selectHero(index)} />)}</div>
    </section>
    <section ref={skinGuideRef} className="home-skin-guide" id="home-skin-guide" aria-labelledby="home-guide-title">
      <h2 id="home-guide-title">ONGYEOL SKIN GUIDE</h2>
      <p className="home-guide-description">나의 피부 고민에 맞는 제품을 찾아보세요.</p>
      <ul className="home-concerns">{skinConcerns.map(concern => <li key={concern.id}>
        <Link className="home-concern-link" to={`/skin-guide?concern=${concern.id}`}>
        <img src={concern.image} alt="" width="200" height="200" loading="lazy" /><span>{concern.label}</span>
        </Link>
      </li>)}</ul>
    </section>
    <section className="home-categories" aria-label="제품 유형">
      <ul>{productCategories.map(category => <li key={category.id}>
        <div className="home-category-image"><img src={category.image} alt="" loading="lazy" /></div><span>{category.label}</span>
      </li>)}</ul>
    </section>
    <section className="home-opening" aria-label="온결 Grand Opening">
      <img src={openingBanner} alt="온결 Grand Opening Coming Soon 11.18.mon" loading="lazy" />
    </section>
    <section className="home-featured" id="home-featured" aria-label="라인별 추천 상품" aria-roledescription="캐러셀" onPointerEnter={event => { if (event.pointerType === 'mouse') setLineHovered(true) }} onPointerLeave={() => setLineHovered(false)}>
      <div className="home-line-viewport">
        <div className={`home-line-track${lineState.animate ? '' : ' home-line-track-reset'}`} style={{ transform: `translateX(-${lineState.index * 100}%)` }} onTransitionEnd={finishLineTransition}>
          {lineTrackSlides.map((line, index) => <div className="home-line-slide" key={line.id} role="group" aria-roledescription="슬라이드" aria-label={`${line.label} 라인`} aria-hidden={index !== lineState.index || index === lineSlides.length} inert={index !== lineState.index || index === lineSlides.length}>
      <div className="home-featured-visual">
        <img className="home-featured-image" src={line.image} alt={`${line.label} 라인 제품 연출 이미지`} />
        <button className="home-featured-arrow home-featured-arrow-left" type="button" aria-label="이전 라인 보기" onClick={() => moveLine(-1)}><img src={featuredArrowLeft} alt="" /></button>
        <button className="home-featured-arrow home-featured-arrow-right" type="button" aria-label="다음 라인 보기" onClick={() => moveLine(1)}><img src={featuredArrowRight} alt="" /></button>
        <button className="home-line-arrow-button home-line-arrow-previous" type="button" aria-label="이전 라인 보기" onClick={() => moveLine(-1)}><img src={featuredArrowLeft} alt="" /></button>
        <button className="home-line-arrow-button home-line-arrow-next" type="button" aria-label="다음 라인 보기" onClick={() => moveLine(1)}><img src={featuredArrowRight} alt="" /></button>
      </div>
      <div className="home-featured-details">
        <h2><span aria-hidden="true">{line.icon}</span> {line.name}</h2>
        <ul className="home-featured-products">{line.products.map((product, productIndex) => <li key={product.id}>
          <div className="home-product-image">{product.image ? <img src={product.image} alt={product.name ?? `${line.label} 라인 상품 ${productIndex + 1}`} /> : <span className="home-product-pending-image">이미지 준비 중</span>}</div>
          <div className="home-product-details"><h3>{product.name ?? '상품 정보 준비 중'}</h3>
            <p className="home-product-prices">{product.originalPrice !== null && <del>{formatPrice(product.originalPrice)}</del>}{product.salePrice !== null ? <strong>{formatPrice(product.salePrice)}</strong> : <span className="home-product-pending-price">가격 정보 준비 중</span>}{product.discount !== null && <span>{product.discount}%</span>}</p>
          </div>
        </li>)}</ul>
      </div>
          </div>)}
        </div>
      </div>
      <div className="home-line-pagination" aria-label="추천 상품 라인 선택">{lineSlides.map((line, index) => <button key={line.id} className={`home-line-dot${activeLineIndex === index ? ' home-line-dot-active' : ''}`} type="button" aria-label={`${line.label} 라인 보기`} aria-pressed={activeLineIndex === index} onClick={() => selectLine(index)} />)}</div>
    </section>
  </main>
}
