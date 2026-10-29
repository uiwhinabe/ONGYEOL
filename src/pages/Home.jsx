import ProductBadge from '../components/ProductBadge.jsx'
import { getSectionScrollTop } from '../utils/sectionScroll.js'
import { products } from '../data/products.js'
import ProductPrice from '../components/ProductPrice.jsx'
import { getProductDetailHref, navigateToProducts } from '../utils/productNavigation.js'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import heroImage from '../assets/images/home/image 228.png'
import moistureHeroImage from '../assets/images/home/image 228-1.png'
import vitaminHeroImage from '../assets/images/home/image 228-2.png'
import cleansingIcon from '../assets/images/home/category-cleansing.png'
import tonerIcon from '../assets/images/home/category-toner.png'
import essenceIcon from '../assets/images/home/category-essence.png'
import creamIcon from '../assets/images/home/category-cream.png'
import maskIcon from '../assets/images/home/category-mask.png'
import openingBanner from '../assets/images/home/grand-opening.png'
import featuredImage from '../assets/images/home/백목이전체.png'
import lemonLineImage from '../assets/images/home/비타민전체.png'
import roseLineImage from '../assets/images/home/장미전체.png'
import mulberryLineImage from '../assets/images/home/오디 전체.png'
import paperMulberryLineImage from '../assets/images/home/닥열매 전체.png'
import { skinConcerns } from './skinGuideConcernData.js'
import './Home.css'

const heroSlides = [
  { id: 'rose', productId: 'rose-pdrn-eyecream', image: heroImage, description: '촉촉하고 탄탄한 눈가를 위한 데일리 케어', title: '로즈 PDRN 아이크림', alt: '로즈 PDRN 아이크림을 들고 있는 모델', position: 'center center', textSide: 'right' },
  { id: 'tremella', productId: 'baekmogi-ampoule', image: moistureHeroImage, description: '메마른 피부를 촉촉하게 채우는 집중 수분 케어', title: '백목이 수분 농축 앰플', alt: '백목이 수분 농축 앰플을 들고 있는 모델', position: 'center center', textSide: 'left' },
  { id: 'vitamin', productId: 'vitamin-c-cleanser', image: vitaminHeroImage, description: '맑고 생기 있는 피부를 위한 데일리 클렌징', title: '비타민 클렌징 폼', alt: '비타민 클렌징 폼을 들고 있는 모델', position: 'center center', textSide: 'left' },
].map(slide => ({ ...slide, line: products.find(product => product.id === slide.productId).line }))
// The first slide's clone lets the final slide move forward before resetting invisibly.
const heroTrackSlides = [...heroSlides, { ...heroSlides[0], id: 'rose-loop' }]

const productCategories = [
  { id: 'toner-pad', label: '토너 / 패드', category: '토너/패드', image: tonerIcon },
  { id: 'essence-ampoule', label: '에센스 / 앰플', category: '에센스/앰플', image: essenceIcon },
  { id: 'lotion-cream', label: '로션 / 크림', category: '로션/크림', image: creamIcon },
  { id: 'cleansing', label: '클렌징', category: '클렌징', image: cleansingIcon },
  { id: 'mask', label: '마스크팩', category: '마스크팩', image: maskIcon },
]
const byIds = ids => ids.map(id => products.find(p => p.id === id)).filter(Boolean)
const lineSlides = [
  { id: 'tremella', label: '백목이', name: '백목이 라인', icon: '💧', image: featuredImage, products: byIds(['baekmogi-pad', 'baekmogi-cream', 'baekmogi-ampoule']) },
  { id: 'lemon', label: '레몬', name: '레몬 라인', icon: '🍋', image: lemonLineImage, products: byIds(['vitamin-c-toner', 'vitamin-c-ampoule', 'vitamin-c-cleanser']) },
  { id: 'rose', label: '로즈 PDRN', name: '장미 라인', icon: '🌹', image: roseLineImage, products: byIds(['rose-pdrn-balancing-cream', 'rose-pdrn-eyecream']) },
  { id: 'mulberry', label: '오디', name: '오디 라인', icon: '🍇', image: mulberryLineImage, products: byIds(['odi-toner', 'odi-ampoule', 'odi-cream']) },
  { id: 'paper-mulberry', label: '닥열매', name: '닥열매 라인', icon: '🌿', image: paperMulberryLineImage, products: byIds(['dakyeolmae-pad', 'dakyeolmae-ampoule', 'dakyeolmae-body-scrub']) },
]
const lineTrackSlides = [...lineSlides, { ...lineSlides[0], id: 'tremella-loop' }]

function HomeLineArrow() {
  return <svg width="154" height="154" viewBox="0 0 154 154" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M59.7392 43.0558C59.1443 43.6495 58.6724 44.3546 58.3504 45.1308C58.0284 45.9071 57.8627 46.7392 57.8627 47.5796C57.8627 48.42 58.0284 49.2521 58.3504 50.0283C58.6724 50.8046 59.1443 51.5097 59.7392 52.1033L84.6358 77L59.7392 101.897C58.5394 103.096 57.8654 104.724 57.8654 106.42C57.8654 108.117 58.5394 109.744 59.7392 110.944C60.9389 112.144 62.5662 112.818 64.2629 112.818C65.9597 112.818 67.5869 112.144 68.7867 110.944L98.2392 81.4917C98.834 80.898 99.3059 80.1929 99.6279 79.4167C99.9499 78.6404 100.116 77.8083 100.116 76.9679C100.116 76.1275 99.9499 75.2954 99.6279 74.5192C99.3059 73.7429 98.834 73.0378 98.2392 72.4442L68.7867 42.9917C66.3483 40.5533 62.2417 40.5533 59.7392 43.0558Z" fill="white" />
  </svg>
}

export default function Home() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const skinGuideRef = useRef(null)
  const isAutoScrolling = useRef(false)

  useLayoutEffect(() => {
    const section = skinGuideRef.current
    const desktop = window.matchMedia('(min-width: 1025px)')
    let revealed = false
    let completed = false
    const observer = new IntersectionObserver(entries => {
      if (!desktop.matches || revealed || !entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .3)) return
      revealed = true
      section.dataset.guideReveal = 'visible'
      observer.disconnect()
    }, { threshold: .3 })
    const finish = event => {
      if (event.animationName !== 'home-guide-fade-up' || event.target !== section.querySelector('.home-concerns li:last-child')) return
      completed = true
      section.dataset.guideReveal = 'complete'
    }
    const update = () => {
      observer.disconnect()
      if (!desktop.matches) {
        if (revealed) completed = true
        section.removeAttribute('data-guide-reveal')
        return
      }
      section.dataset.guideReveal = completed ? 'complete' : revealed ? 'visible' : 'pending'
      if (!revealed) observer.observe(section)
    }
    update()
    section.addEventListener('animationend', finish)
    desktop.addEventListener('change', update)
    return () => {
      observer.disconnect()
      section.removeEventListener('animationend', finish)
      desktop.removeEventListener('change', update)
      section.removeAttribute('data-guide-reveal')
    }
  }, [])

  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)')
    const header = document.querySelector('.ongyeol-header')
    const guide = skinGuideRef.current
    let unlockTimer
    let animationFrame
    let animationFinished = true
    let lastWheelAt = 0

    const updateHeaderHeight = () => {
      const height = `${header?.getBoundingClientRect().height ?? 0}px`
      guide?.style.setProperty('--home-header-height', height)
      heroRef.current?.style.setProperty('--home-header-height', height)
    }
    updateHeaderHeight()
    const headerObserver = new ResizeObserver(updateHeaderHeight)
    if (header) headerObserver.observe(header)

    const handleWheel = event => {
      if (pathname !== '/' || !desktop.matches || event.ctrlKey || event.defaultPrevented) return
      const hero = heroRef.current
      if (!event.deltaY || !hero || !guide || !hero.closest('.home-page')?.contains(event.target)) return
      if (isAutoScrolling.current) {
        lastWheelAt = performance.now()
        if (event.cancelable) event.preventDefault()
        return
      }

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
          window.scrollTo({ top: getSectionScrollTop(guide, header), behavior: 'instant' })
        }
        return
      }

      if (event.cancelable) event.preventDefault()
      isAutoScrolling.current = true
      animationFinished = false
      lastWheelAt = performance.now()
      updateHeaderHeight()
      const startY = window.scrollY
      const targetY = () => getSectionScrollTop(target, header)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: targetY(), behavior: 'instant' })
        animationFinished = true
      } else {
        // A cancellable animation prevents native smooth scrolling from
        // continuing after React switches to another page.
        const startedAt = performance.now()
        const animate = now => {
          const progress = Math.min((now - startedAt) / 800, 1)
          const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
          window.scrollTo({ top: startY + (targetY() - startY) * eased, behavior: 'instant' })
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
  }, [pathname])

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
            <div className="home-hero-actions"><button type="button" onClick={() => navigate(getProductDetailHref(slide.productId))}>Shop now</button><button type="button" onClick={() => navigateToProducts('line', slide.line, navigate)}>Shop more</button></div>
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
        <button className="home-category-link" type="button" onClick={() => navigateToProducts('type', category.category, navigate)}>
          <div className="home-category-image"><img src={category.image} alt="" loading="lazy" /></div><span>{category.label}</span>
        </button>
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
        <button className="home-featured-arrow home-featured-arrow-left" type="button" aria-label="이전 라인 보기" onClick={() => moveLine(-1)}><HomeLineArrow /></button>
        <button className="home-featured-arrow home-featured-arrow-right" type="button" aria-label="다음 라인 보기" onClick={() => moveLine(1)}><HomeLineArrow /></button>
        <button className="home-line-arrow-button home-line-arrow-previous" type="button" aria-label="이전 라인 보기" onClick={() => moveLine(-1)}><HomeLineArrow /></button>
        <button className="home-line-arrow-button home-line-arrow-next" type="button" aria-label="다음 라인 보기" onClick={() => moveLine(1)}><HomeLineArrow /></button>
      </div>
      <div className="home-featured-details">
        <h2><span aria-hidden="true">{line.icon}</span> {line.name}</h2>
        <ul className="home-featured-products">{line.products.map((product, productIndex) => <li key={product.id}>
          <Link to={getProductDetailHref(product.id)} className="home-product-image">{product.image ? <img src={product.image} alt={product.name ?? `${line.label} 라인 상품 ${productIndex + 1}`} /> : <span className="home-product-pending-image">이미지 준비 중</span>}</Link>
          <div className="home-product-details"><ProductBadge product={product} /><h3><Link to={getProductDetailHref(product.id)}>{product.name ?? '상품 정보 준비 중'}</Link></h3>
            <ProductPrice product={product} className="home-product-prices" />
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
