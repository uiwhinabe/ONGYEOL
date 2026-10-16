import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import heroImage from '../assets/images/skin-guide/hero.png'
import howType from '../assets/images/skin-guide/how-type.png'
import howConcern from '../assets/images/skin-guide/how-concern.png'
import howSolution from '../assets/images/skin-guide/how-solution.png'
import endingTexture from '../assets/images/skin-guide/ending-texture.jpg'
import endingLogo from '../assets/images/skin-guide/ending-logo.png'
import labelLine from '../assets/images/skin-guide/label-line.svg'
import routineLine from '../assets/images/skin-guide/routine-line.svg'
import buttonChevron from '../assets/images/skin-guide/button-chevron.svg'
import routineChevron from '../assets/images/skin-guide/routine-chevron.svg'
import scrollDoubleChevron from '../assets/images/skin-guide/scroll-double-chevron.svg'
import { skinConcerns, concernData } from './skinGuideConcernData.js'
import WhyCauseIcon from './WhyCauseIcon.jsx'
import './SkinGuide.css'

const howSteps = [
  { icon: howType, title: '피부 고민 선택', description: '지금 가장 신경 쓰이는 피부 고민을 선택하세요.' },
  { icon: howConcern, title: '고민 원인 확인', description: '선택한 피부 고민의 원인을 확인하세요.' },
  { icon: howSolution, title: '맞춤 솔루션 확인', description: '원인과 추천 성분, 온결의 추천 제품을 확인하세요.' },
]

function GuideText({ children }) {
  return String(children).split('\n').map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)
}

function GuideSteps({ activeStep, hidden = false }) {
  return <ol className="skin-guide-steps" aria-label="스킨 가이드 진행 단계" hidden={hidden}>
    {['피부 고민', '고민 원인', '맞춤 솔루션'].map((label, index) => <li key={label} aria-current={activeStep === index + 1 ? 'step' : undefined}>
      <span><span className="skin-guide-step-number" data-mobile-number={index + 1}>{String(index + 1).padStart(2, '0')}</span>{' '}<span className="skin-guide-step-label">{label}</span></span>
    </li>)}
  </ol>
}

function ConcernImage({ concern }) {
  return <span className="skin-guide-type-icon skin-guide-concern-image">
    <img src={concern.image} alt="" />
  </span>
}

function DetailLabel({ children }) {
  return <p className="skin-guide-detail-label">{children}<img src={labelLine} alt="" /></p>
}

function MobileRoutine({ products }) {
  const [productIndex, setProductIndex] = useState(0)
  const product = products[productIndex]
  const moveProduct = direction => setProductIndex(index => (index + direction + products.length) % products.length)
  return <div className="skin-guide-mobile-routine-product">
    <article aria-label={`${product.step} 추천 제품`} aria-live="polite" aria-atomic="true">
      <div className={`skin-guide-routine-image skin-guide-routine-image--${product.id}`}><img src={product.image ?? undefined} alt={product.imageAlt ?? ''} loading="lazy" /></div>
      <div className="skin-guide-routine-copy">
        <span className="skin-guide-product-step">{product.step}</span>
        <h4>{product.name}</h4>
        <p className="skin-guide-product-english" lang="en">{product.englishName}</p>
        <p className="skin-guide-product-description">{product.descriptionLines?.map((line, index) => <span key={index}>{line}{index === 0 ? ' ' : ''}</span>) ?? product.description}</p>
        <button type="button" aria-disabled={!product.image || undefined} aria-label={`${product.imageAlt} 제품 보러가기`}>제품 보러가기 <img src={buttonChevron} alt="" /></button>
      </div>
    </article>
    <div className="skin-guide-mobile-routine-controls" aria-label="추천 제품 이동">
      <button type="button" onClick={() => moveProduct(-1)} aria-label="이전 추천 제품"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      <div>{products.map((item, index) => <button key={item.id} type="button" aria-label={`${item.step} 추천 제품 보기`} aria-pressed={index === productIndex} onClick={() => setProductIndex(index)} />)}</div>
      <button type="button" onClick={() => moveProduct(1)} aria-label="다음 추천 제품"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
    </div>
  </div>
}

export default function SkinGuide() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const concernParam = searchParams.get('concern')
  const validConcern = Object.hasOwn(concernData, concernParam) ? concernParam : null
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const howRef = useRef(null)
  const concernSelectionRef = useRef(null)
  const concernRef = useRef(null)
  const solutionRef = useRef(null)
  const routineRef = useRef(null)
  const isAutoScrolling = useRef(false)
  const requestSectionScroll = useRef(null)

  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)')
    const page = pageRef.current
    const header = document.querySelector('.ongyeol-header')
    const sections = [heroRef, howRef, concernSelectionRef, concernRef, solutionRef, routineRef]
    let animationFrame
    let unlockTimer
    let animationFinished = true
    let lastWheelAt = 0
    const headerHeight = () => {
      const position = header && getComputedStyle(header).position
      return position === 'sticky' || position === 'fixed' ? header.getBoundingClientRect().height : 0
    }
    const updateHeaderHeight = () => page?.style.setProperty('--skin-guide-header-height', `${headerHeight()}px`)
    updateHeaderHeight()
    const observer = new ResizeObserver(updateHeaderHeight)
    if (header) observer.observe(header)

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(unlockTimer)
      animationFinished = true
      isAutoScrolling.current = false
    }
    const moveTo = target => {
      isAutoScrolling.current = true
      animationFinished = false
      lastWheelAt = performance.now()
      const unlockWhenIdle = () => {
        if (animationFinished && performance.now() - lastWheelAt >= 150) {
          isAutoScrolling.current = false
        } else {
          unlockTimer = window.setTimeout(unlockWhenIdle, 50)
        }
      }
      const start = window.scrollY
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: target, behavior: 'instant' })
        animationFinished = true
      } else {
        const startedAt = performance.now()
        const animate = now => {
          const progress = Math.min((now - startedAt) / 800, 1)
          const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
          window.scrollTo({ top: start + (target - start) * eased, behavior: 'instant' })
          if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
          else animationFinished = true
        }
        animationFrame = window.requestAnimationFrame(animate)
      }
      unlockTimer = window.setTimeout(unlockWhenIdle, 850)
    }
    requestSectionScroll.current = section => {
      if (!section) return
      stopAnimation()
      updateHeaderHeight()
      moveTo(Math.max(0, window.scrollY + section.getBoundingClientRect().top - headerHeight()))
    }
    const handleWheel = event => {
      if (!desktop.matches || !/^\/skin-guide\/?$/.test(window.location.pathname) || event.ctrlKey || event.defaultPrevented) return
      if (isAutoScrolling.current) {
        lastWheelAt = performance.now()
        if (event.cancelable) event.preventDefault()
        return
      }
      if (event.target instanceof Element && event.target.closest('header, [role="dialog"]')) return
      if (!event.deltaY) return
      // Leave independently scrollable panels to their own wheel handling.
      for (let node = event.target; node instanceof Element && node !== page && node !== document.body && node !== document.documentElement; node = node.parentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) return
      }
      const offset = headerHeight()
      const positions = sections.map(ref => {
        const bounds = ref.current.getBoundingClientRect()
        return { top: bounds.top + window.scrollY, bottom: bounds.bottom + window.scrollY }
      })
      // The solution and its nested routine are consecutive logical sections.
      positions[4].bottom = positions[5].top
      const anchor = window.scrollY + offset
      const availableHeight = window.innerHeight - offset
      const center = anchor + availableHeight / 2
      if (center >= positions[5].bottom || center < positions[0].top) return
      // Prefer a section aligned under the header. Otherwise infer the current
      // section from the visible center, including scrollbar/footer re-entry.
      let index = positions.findIndex(position => Math.abs(position.top - anchor) <= 4)
      if (index < 0) {
        index = positions.findIndex(position => anchor >= position.top && anchor < position.bottom && position.bottom - position.top > availableHeight + 4)
      }
      if (index < 0) {
        index = positions.findIndex(position => center >= position.top && center < position.bottom)
      }
      if (index < 0) {
        index = positions.reduce((closest, position, i) => Math.abs((position.top + position.bottom) / 2 - center) < Math.abs((positions[closest].top + positions[closest].bottom) / 2 - center) ? i : closest, 0)
      }
      const current = positions[index]
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
      const remaining = delta > 0 ? current.bottom - (window.scrollY + window.innerHeight) : anchor - current.top
      if (current.bottom - current.top > availableHeight + 4 && remaining > 4) {
        // Read long sections normally, but don't let a large wheel delta skip
        // their last content and cross into a different section in one event.
        if (Math.abs(delta) > remaining && event.cancelable) {
          event.preventDefault()
          window.scrollTo({ top: window.scrollY + Math.sign(delta) * remaining, behavior: 'instant' })
        }
        return
      }
      const nextIndex = index + Math.sign(delta)
      if (nextIndex < 0 || nextIndex >= positions.length) return
      if (event.cancelable) event.preventDefault()
      const next = positions[nextIndex]
      const target = next.top - offset
      moveTo(Math.max(0, target))
    }
    const handleBreakpointChange = () => {
      if (!desktop.matches) stopAnimation()
      updateHeaderHeight()
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    desktop.addEventListener('change', handleBreakpointChange)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      desktop.removeEventListener('change', handleBreakpointChange)
      observer.disconnect()
      stopAnimation()
      requestSectionScroll.current = null
    }
  }, [])

  const [selectedConcern, setSelectedConcern] = useState(() => validConcern ?? 'moisture')
  const [mobileSelection, setMobileSelection] = useState(() => validConcern)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 540px)').matches)
  useLayoutEffect(() => {
    const mobile = window.matchMedia('(max-width: 540px)')
    const update = () => setIsMobile(mobile.matches)
    mobile.addEventListener('change', update)
    return () => mobile.removeEventListener('change', update)
  }, [])
  const [selectionRequest, setSelectionRequest] = useState(() => validConcern ? 1 : 0)
  const [queryEntryKey, setQueryEntryKey] = useState(location.key)
  if (queryEntryKey !== location.key) {
    setQueryEntryKey(location.key)
    setSelectedConcern(validConcern ?? 'moisture')
    setMobileSelection(validConcern)
    setSelectionRequest(request => validConcern ? request + 1 : 0)
  }
  const currentConcern = concernData[selectedConcern]
  useLayoutEffect(() => {
    const routine = routineRef.current
    const descriptions = [...routine.querySelectorAll('.skin-guide-product-description')]
    const lines = descriptions.flatMap(description => [...description.querySelectorAll('span')])
    const matchHeights = () => {
      const height = Math.max(...descriptions.map(description =>
        [...description.children].reduce((total, line) => total + line.getBoundingClientRect().height, 0)))
      routine.style.setProperty('--routine-description-height', `${height}px`)
    }
    const observer = new ResizeObserver(matchHeights)
    lines.forEach(line => observer.observe(line))
    matchHeights()
    return () => {
      observer.disconnect()
      routine.style.removeProperty('--routine-description-height')
    }
  }, [selectedConcern])
  useLayoutEffect(() => {
    if (!selectionRequest) return
    // Run after the selected data is committed and the shared route layout
    // has restored its initial scroll position.
    const frame = window.requestAnimationFrame(() => requestSectionScroll.current?.(concernRef.current))
    return () => window.cancelAnimationFrame(frame)
  }, [selectionRequest])
  function handleConcernSelect(id) {
    if (window.matchMedia('(max-width: 540px)').matches) {
      setMobileSelection(id)
      setSelectedConcern(id)
      return
    }
    setSelectedConcern(id)
    setSelectionRequest(request => request + 1)
  }
  function handleMobileNext() {
    if (!window.matchMedia('(max-width: 540px)').matches || !mobileSelection) return
    setSelectedConcern(mobileSelection)
    setSelectionRequest(request => request + 1)
  }
  function handleMobileSolutionNext() {
    if (!window.matchMedia('(max-width: 540px)').matches || !mobileSelection) return
    requestSectionScroll.current?.(solutionRef.current)
  }
  function scrollToSection(id) {
    requestSectionScroll.current?.(document.getElementById(id))
  }

  return <main ref={pageRef} className="skin-guide-page">
    <section ref={heroRef} className="skin-guide-hero" aria-labelledby="skin-guide-title">
      <img className="skin-guide-hero-image" src={heroImage} alt="" fetchPriority="high" />
      <div className="skin-guide-hero-copy">
        <h1 id="skin-guide-title">내 피부에 필요한 케어를 찾아보세요.</h1>
        <p>피부 고민을 선택하면 고민에 맞는 핵심 성분과<br />추천 제품을 안내해 드립니다.</p>
        <p lang="en">Find the right care for your skin.</p>
      </div>
    </section>

    <section ref={howRef} className="skin-guide-how skin-guide-surface" aria-labelledby="skin-guide-how-title">
      <h2 id="skin-guide-how-title">HOW IT WORKS</h2>
      <p className="skin-guide-how-intro">피부를 이해하는 것부터,<br />온결의 스킨케어는 시작됩니다.</p>
      <ol className="skin-guide-how-list">
        {howSteps.map((step, index) => <li key={step.title}>
          <img src={step.icon} alt="" width="60" height="60" loading="lazy" />
          <h3><span className="skin-guide-visually-hidden">{String(index + 1).padStart(2, '0')} </span>{step.title}</h3>
          <p>{step.description}</p>
        </li>)}
      </ol>
    </section>

    <section ref={concernSelectionRef} className="skin-guide-types skin-guide-surface" aria-labelledby="skin-guide-types-title">
      <div className="skin-guide-types-content">
        <GuideSteps activeStep={1} />
        <div className="skin-guide-type-heading">
          <h2 id="skin-guide-types-title">지금 가장 신경 쓰이는 피부 고민을 선택해주세요.</h2>
          <h2 className="skin-guide-mobile-type-title" hidden>피부 고민을 선택해주세요.</h2>
          <p>가장 고민되는 항목을 하나 선택해주세요.</p>
        </div>
        <div className="skin-guide-type-list" role="group" aria-labelledby="skin-guide-types-title">
          {skinConcerns.map(item => <button key={item.id} type="button" className={`skin-guide-type-button${(isMobile ? mobileSelection : selectedConcern) === item.id ? ' is-active' : ''}`} aria-pressed={(isMobile ? mobileSelection : selectedConcern) === item.id} onClick={() => handleConcernSelect(item.id)}>
            <ConcernImage concern={item} />
            <span className="skin-guide-type-name">{item.label}</span>
            <span className="skin-guide-type-description">{item.description}</span>
          </button>)}
        </div>
        <div className="skin-guide-mobile-next" hidden><button type="button" disabled={isMobile && !mobileSelection} onClick={handleMobileNext}>다음으로</button></div>
      </div>
    </section>

    <section ref={concernRef} className="skin-guide-why skin-guide-surface" id="skin-guide-concerns" aria-labelledby="skin-guide-why-title">
      <div className="skin-guide-why-content">
        <GuideSteps activeStep={2} />
        <div className="skin-guide-why-columns">
          <div className="skin-guide-summary">
            <div className="skin-guide-mobile-summary-steps" hidden><GuideSteps activeStep={2} /></div>
            <div><h2>{currentConcern.concernTitle ?? `${currentConcern.concernName} 피부 분석 준비 중`}</h2><p className="skin-guide-moisture-label">{currentConcern.solutionEnglish ?? '결과 정보 준비 중'}</p></div>
            <div className="skin-guide-summary-type"><ConcernImage concern={currentConcern.concern} /><p>{currentConcern.concernName}</p></div>
            <p className="skin-guide-summary-copy"><GuideText>{currentConcern.intro}</GuideText></p>
          </div>
          <div className="skin-guide-causes">
            <p className="skin-guide-why-label">WHY</p>
            <h2 id="skin-guide-why-title">{currentConcern.whyTitle ?? `${currentConcern.concernName} WHY 준비 중`}</h2>
            <p className="skin-guide-why-description skin-guide-why-description--desktop"><GuideText>{currentConcern.whyDescription}</GuideText></p>
            <p className="skin-guide-why-description skin-guide-why-description--tablet" hidden><GuideText>{currentConcern.whyDescriptionTablet}</GuideText></p>
            <ul className="skin-guide-cause-list">
              {currentConcern.reasons.map(cause => <li key={cause.id}>
                <span className="skin-guide-cause-icon"><WhyCauseIcon icon={cause.icon} /></span>
                <h3>{cause.title ?? '원인 준비 중'}</h3><p>{cause.description ?? '원인 정보 확인 후\n안내해 드립니다.\n현재는 준비 중입니다.'}</p>
              </li>)}
            </ul>
            <div className="skin-guide-mobile-next" hidden><button type="button" disabled={isMobile && !mobileSelection} onClick={handleMobileSolutionNext}>다음으로</button></div>
          </div>
        </div>
      </div>
    </section>

    <section ref={solutionRef} className="skin-guide-solution skin-guide-surface" aria-labelledby="skin-guide-solution-title">
      <div className="skin-guide-solution-content">
      <GuideSteps activeStep={3} />
      <div className="skin-guide-solution-heading"><p>YOUR SKIN SOLUTION</p><h2 id="skin-guide-solution-title">당신의 피부를 위한 맞춤 솔루션</h2><p className="skin-guide-solution-intro" hidden><GuideText>{currentConcern.solutionIntro ?? `${currentConcern.concernName} 피부의 맞춤 케어를 준비하고 있습니다.\n확정된 루틴은 추후 안내해 드립니다.`}</GuideText></p></div>
      <div className="skin-guide-solution-details">
        <div className="skin-guide-my-skin">
          <DetailLabel>MY SKIN</DetailLabel>
          <div className="skin-guide-my-skin-content">
            <div className="skin-guide-summary-type"><ConcernImage concern={currentConcern.concern} /><p>{currentConcern.concernName}</p></div>
            <p>{currentConcern.mySkinDescription}</p>
          </div>
        </div>
        <div className="skin-guide-ingredients">
          <DetailLabel>KEY INGREDIENT</DetailLabel>
          <ul>{currentConcern.ingredients.map(ingredient => <li key={ingredient.id ?? ingredient.name}>
            <img src={ingredient.image ?? undefined} alt={ingredient.name ?? ''} width="120" height="120" loading="lazy" style={!ingredient.image ? { visibility: 'hidden' } : undefined} />
            <p>{ingredient.name ?? '성분 준비 중'}</p><p>{ingredient.effect ?? '확정 후 안내'}</p>
          </li>)}</ul>
        </div>
      </div>
      <div className="skin-guide-mobile-scroll" hidden>
        <p>추천 제품을 확인해보세요</p>
        <button type="button" aria-label="추천 제품 영역으로 이동" onClick={() => scrollToSection('skin-guide-routine')}><img src={scrollDoubleChevron} alt="" /></button>
        <p>SCROLL OR TAP</p>
      </div>
      </div>
      <div ref={routineRef} className="skin-guide-routine" id="skin-guide-routine">
        <div className="skin-guide-mobile-routine-steps" hidden><GuideSteps activeStep={3} /></div>
        <div className="skin-guide-routine-heading">
          <h3>ONGYEOL RECOMMENDED ROUTINE</h3>
          <span className="skin-guide-routine-line"><img src={routineLine} alt="" /></span>
          <p>{currentConcern.routineDescription}</p>
        </div>
        <ol className="skin-guide-routine-list">{currentConcern.products.map((product, index) => <li key={product.id}>
          <div className={`skin-guide-routine-image skin-guide-routine-image--${product.id}`}><img src={product.image ?? undefined} alt={product.imageAlt ?? ''} loading="lazy" style={!product.image ? { visibility: 'hidden' } : undefined} /></div>
          <div className="skin-guide-routine-copy">
            <span className="skin-guide-product-step">{product.step}</span>
            <h4>{product.name ?? '추천 제품 준비 중'}</h4><p className="skin-guide-product-english" lang="en">{product.englishName ?? 'PRODUCT INFORMATION\nCOMING SOON'}</p>
            <p className="skin-guide-product-description">{product.descriptionLines?.map((line, index) => <span key={index}>{line}{index === 0 ? ' ' : ''}</span>) ?? product.description ?? '확정된 추천 제품은 추후 안내해 드립니다.'}</p>
            <button type="button" aria-disabled={!product.image || undefined} aria-label={product.imageAlt ? `${product.imageAlt} 제품 보러가기` : '추천 제품 준비 중'}>제품 보러가기 <img src={buttonChevron} alt="" /></button>
          </div>
          {index < currentConcern.products.length - 1 && <img className="skin-guide-routine-chevron" src={routineChevron} alt="" />}
        </li>)}</ol>
        <MobileRoutine key={selectedConcern} products={currentConcern.products} />
      </div>
    </section>

    <section className="skin-guide-ending" aria-labelledby="skin-guide-ending-title" style={{ backgroundImage: `url(${endingTexture})` }}>
      <h2 id="skin-guide-ending-title">Find Your Skin Balance</h2>
      <div className="skin-guide-ending-logo"><img src={endingLogo} alt="ONGYEOL" loading="lazy" /></div>
      <p>당신의 피부에 필요한 것만, 온결답게.</p>
    </section>
  </main>
}
