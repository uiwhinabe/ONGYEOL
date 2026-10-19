import { useLayoutEffect, useRef } from 'react'
import { HEADER_SCROLL_TOP_EVENT } from '../headerNavigation.js'
import './Brand.css'
import brandFilm from '../assets/videos/brand/ongyeol-brand-film.mp4'
import landscapeImage from '../assets/images/brand/landscape.png'
import waterImage from '../assets/images/brand/water.png'
import natureImage from '../assets/images/brand/nature.png'
import scienceImage from '../assets/images/brand/science.png'
import pureImage from '../assets/images/brand/pure.png'
import natureVideo from '../assets/videos/brand/1.mp4'
import scienceVideo from '../assets/videos/brand/2.mp4'
import pureVideo from '../assets/videos/brand/3.mp4'
import roseImage from '../assets/images/brand/rose.png'
import berriesImage from '../assets/images/brand/berries.png'
import lemonImage from '../assets/images/brand/lemon.png'
import tremellaImage from '../assets/images/brand/tremella.png'
import mulberryImage from '../assets/images/brand/mulberry.png'
import roseCircle from '../assets/images/brand/rose-circle.png'
import berriesCircle from '../assets/images/brand/berries-circle.png'
import lemonCircle from '../assets/images/brand/lemon-circle.png'
import tremellaCircle from '../assets/images/brand/tremella-circle.png'
import mulberryCircle from '../assets/images/brand/mulberry-circle.png'

const brandIngredients = [
  { id: 'rose', image: roseImage, circle: roseCircle, name: '장미', englishName: 'ROSE', active: 'PDRN', description: ['피부에 탄력을 더해', '매끈하고 건강한 피부로 가꾸어줍니다.'], tag: '주름 · 탄력', stripWidth: 367 },
  { id: 'berries', image: berriesImage, circle: berriesCircle, name: '붉은 열매', englishName: 'PAPER MULBERRY FRUIT', active: 'Niacinamide', description: ['모공과 피지 고민을 케어해', '균형 잡힌 피부로 가꾸어줍니다.'], tag: '모공 · 피지', stripWidth: 390 },
  { id: 'lemon', image: lemonImage, circle: lemonCircle, name: '레몬', englishName: 'LEMON', active: 'Vitamin C', description: ['칙칙한 피부톤을 환하게 케어해', '맑고 생기 있는 피부톤으로 가꾸어줍니다.'], tag: '피부톤 · 잡티', stripWidth: 390 },
  { id: 'tremella', image: tremellaImage, circle: tremellaCircle, name: '백목이', englishName: 'WHITE TREMELLA', active: 'Glucuronoxylomannan (GXM)', description: ['풍부한 수분 보유력으로', '촉촉하고 편안한 피부를 유지해 줍니다.'], tag: '수분 · 보습', stripWidth: 368 },
  { id: 'mulberry', image: mulberryImage, circle: mulberryCircle, name: '오디', englishName: 'MULBERRY', active: 'Anthocyanin', description: ['항산화 케어로 피부 컨디션을 지켜', '건강한 윤기와 생기를 더해줍니다.'], tag: '톤 케어 · 항산화', stripWidth: 405 },
]

export default function Brand() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const natureRef = useRef(null)
  const scienceRef = useRef(null)
  const pureRef = useRef(null)
  const transitionRef = useRef(null)
  const ingredientsRef = useRef(null)
  const wheelScrolling = useRef(false)
  const transitionUnlockAt = useRef(0)
  const ingredientUnlockAt = useRef(0)

  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)')
    const page = pageRef.current
    const header = document.querySelector('.ongyeol-header')
    const sections = [heroRef, transitionRef, natureRef, scienceRef, pureRef, ingredientsRef]
    let animationFrame
    let unlockTimer
    let locked = false
    let lastWheelAt = -Infinity
    const headerHeight = () => {
      const position = header && getComputedStyle(header).position
      return position === 'sticky' || position === 'fixed' ? header.getBoundingClientRect().height : 0
    }
    const stop = () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(unlockTimer)
      wheelScrolling.current = false
      locked = false
    }
    const moveTo = (target, section) => {
      locked = true
      wheelScrolling.current = true
      const copy = section?.querySelector('.brand-story-copy')
      copy?.classList.remove('is-visible')
      if (section === transitionRef.current) section.classList.remove('is-active')
      const start = window.scrollY
      const destination = Math.min(Math.max(0, target), document.documentElement.scrollHeight - window.innerHeight)
      const startedAt = performance.now()
      const finish = () => {
        wheelScrolling.current = false
        if (section === heroRef.current) {
          transitionRef.current.classList.remove('is-active')
          ingredientsRef.current.classList.remove('is-active', 'is-complete')
        }
        if (section === pureRef.current) ingredientsRef.current.classList.remove('is-active')
        sections.slice(2, 5).forEach(ref => {
          if (ref.current !== section) ref.current.querySelector('.brand-story-copy').classList.remove('is-visible')
        })
        if (section === transitionRef.current) {
          section.classList.add('is-active')
          transitionUnlockAt.current = performance.now() + 2700
        }
        if (section === ingredientsRef.current && !section.classList.contains('is-active')) {
          section.classList.add('is-active')
          ingredientUnlockAt.current = performance.now() + 2500
        }
        copy?.classList.add('is-visible')
        const unlock = () => {
          if (performance.now() - lastWheelAt >= 150) locked = false
          else unlockTimer = window.setTimeout(unlock, 50)
        }
        unlock()
      }
      const animate = now => {
        const progress = Math.min((now - startedAt) / 800, 1)
        const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
        window.scrollTo({ top: start + (destination - start) * eased, behavior: 'instant' })
        if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
        else finish()
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: destination, behavior: 'instant' })
        finish()
      } else animationFrame = window.requestAnimationFrame(animate)
    }
    const handleWheel = event => {
      if (!desktop.matches || !/^\/brand\/?$/.test(window.location.pathname) || event.ctrlKey || event.defaultPrevented || !event.deltaY) return
      if (event.target instanceof Element && event.target.closest('header, [role="dialog"]')) return
      for (let node = event.target; node instanceof Element && node !== page && node !== document.body && node !== document.documentElement; node = node.parentElement) {
        if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) return
      }
      const now = performance.now()
      if (locked) {
        lastWheelAt = now
        if (event.cancelable) event.preventDefault()
        return
      }
      const offset = headerHeight()
      const positions = sections.map(ref => {
        const bounds = ref.current.getBoundingClientRect()
        return { top: bounds.top + window.scrollY, bottom: bounds.bottom + window.scrollY }
      })
      const anchor = window.scrollY + offset
      const center = anchor + (window.innerHeight - offset) / 2
      const direction = Math.sign(event.deltaY)
      const last = positions.at(-1)
      if (window.scrollY + window.innerHeight > last.bottom + 4) {
        if (direction < 0) {
          if (event.cancelable) event.preventDefault()
          lastWheelAt = now
          moveTo(last.bottom - window.innerHeight, ingredientsRef.current)
        }
        return
      }
      let index = positions.findIndex(p => Math.abs(p.top - anchor) <= 4)
      if (index < 0) index = positions.findIndex(p => center >= p.top && center < p.bottom)
      if (index < 0) index = positions.reduce((closest, p, i) => Math.abs(p.top - anchor) < Math.abs(positions[closest].top - anchor) ? i : closest, 0)
      if (((index === 1 && now < transitionUnlockAt.current) || (index === 5 && now < ingredientUnlockAt.current)) || ((index === 1 || index === 5) && now - lastWheelAt < 150)) {
        lastWheelAt = now
        if (event.cancelable) event.preventDefault()
        return
      }
      lastWheelAt = now
      const next = index + direction
      if (next < 0) return
      if (event.cancelable) event.preventDefault()
      moveTo(next === sections.length ? last.bottom - offset : positions[next].top - offset, sections[next]?.current)
    }
    const handleHeaderScrollTop = event => {
      if (!desktop.matches || event.detail?.pathname !== '/brand') return
      event.preventDefault()
      stop()
      lastWheelAt = -Infinity
      transitionUnlockAt.current = 0
      ingredientUnlockAt.current = 0
      moveTo(0, heroRef.current)
    }
    window.addEventListener(HEADER_SCROLL_TOP_EVENT, handleHeaderScrollTop)
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', stop)
    desktop.addEventListener('change', stop)
    return () => {
      window.removeEventListener(HEADER_SCROLL_TOP_EVENT, handleHeaderScrollTop)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', stop)
      desktop.removeEventListener('change', stop)
      stop()
    }
  }, [])

  useLayoutEffect(() => {
    const section = ingredientsRef.current
    const desktop = window.matchMedia('(min-width: 1025px)')
    const observer = new IntersectionObserver(entries => {
      if (wheelScrolling.current || !desktop.matches) return
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= .55) {
          if (!section.classList.contains('is-active')) ingredientUnlockAt.current = performance.now() + 2500
          section.classList.add('is-active')
        } else if (entry.intersectionRatio <= .001 && entry.boundingClientRect.top >= window.innerHeight - 1) {
          section.classList.remove('is-active')
        }
      })
    }, { threshold: [0, .001, .55] })
    const resetForBreakpoint = () => {
      if (!desktop.matches) section.classList.remove('is-active')
      observer.unobserve(section)
      observer.observe(section)
    }
    observer.observe(section)
    desktop.addEventListener('change', resetForBreakpoint)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', resetForBreakpoint)
      section.classList.remove('is-active')
    }
  }, [])

  useLayoutEffect(() => {
    const section = ingredientsRef.current
    const desktop = window.matchMedia('(min-width: 1025px)')
    const completed = new Set()
    const reset = () => {
      if (!desktop.matches || !section.classList.contains('is-active')) {
        completed.clear()
        if (section.classList.contains('is-complete')) section.classList.remove('is-complete')
      }
    }
    const onTransitionEnd = event => {
      if (!desktop.matches || !section.classList.contains('is-active') || event.propertyName !== 'opacity' || !event.target.classList.contains('brand-ingredient-copy')) return
      completed.add(event.target)
      if (completed.size === brandIngredients.length) section.classList.add('is-complete')
    }
    const observer = new MutationObserver(reset)
    observer.observe(section, { attributes: true, attributeFilter: ['class'] })
    section.addEventListener('transitionend', onTransitionEnd)
    desktop.addEventListener('change', reset)
    return () => {
      observer.disconnect()
      section.removeEventListener('transitionend', onTransitionEnd)
      desktop.removeEventListener('change', reset)
      section.classList.remove('is-complete')
    }
  }, [])

  useLayoutEffect(() => {
    const smallScreen = window.matchMedia('(max-width: 1024px)')
    const items = [...ingredientsRef.current.querySelectorAll('.brand-ingredient')]
    const observer = new IntersectionObserver(entries => {
      if (!smallScreen.matches) return
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= .2) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .2 })
    const observeItems = () => {
      items.forEach(item => {
        observer.unobserve(item)
        if (smallScreen.matches && !item.classList.contains('is-revealed')) observer.observe(item)
      })
    }
    observeItems()
    smallScreen.addEventListener('change', observeItems)
    return () => {
      observer.disconnect()
      smallScreen.removeEventListener('change', observeItems)
    }
  }, [])

  useLayoutEffect(() => {
    const panels = [...pageRef.current.querySelectorAll('.brand-story-copy')]
    const observer = new IntersectionObserver(entries => {
      if (wheelScrolling.current) return
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= .4) {
          entry.target.classList.add('is-visible')
        } else if (!entry.isIntersecting) {
          // Keep the revealed state near the entry threshold; reset only offscreen.
          entry.target.classList.remove('is-visible')
        }
      })
    }, { threshold: [0, .4] })
    panels.forEach(panel => observer.observe(panel))
    return () => {
      observer.disconnect()
      panels.forEach(panel => panel.classList.remove('is-visible'))
    }
  }, [])

  useLayoutEffect(() => {
    const page = pageRef.current
    const section = transitionRef.current
    const header = document.querySelector('.ongyeol-header')
    const desktop = window.matchMedia('(min-width: 1025px)')
    let observer
    const measure = () => {
      const position = header && getComputedStyle(header).position
      const headerHeight = position === 'sticky' || position === 'fixed'
        ? header.getBoundingClientRect().height : 0
      page.style.setProperty('--brand-header-height', `${headerHeight}px`)
      observer?.disconnect()
      observer = new IntersectionObserver(entries => {
        if (wheelScrolling.current) return
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= .5) {
            if (!section.classList.contains('is-active')) transitionUnlockAt.current = performance.now() + 2700
            section.classList.add('is-active')
          } else if (entry.intersectionRatio <= .001 && entry.boundingClientRect.top >= window.innerHeight - 1) {
            // Reset only after returning fully to the hero; retain the finished state below.
            section.classList.remove('is-active')
          }
        })
      }, { threshold: [0, .001, .5], rootMargin: `-${headerHeight}px 0px 0px 0px` })
      observer.observe(section)
    }
    const headerObserver = new ResizeObserver(measure)
    if (header) headerObserver.observe(header)
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('pageshow', measure)
    desktop.addEventListener('change', measure)
    return () => {
      observer?.disconnect()
      headerObserver.disconnect()
      section.classList.remove('is-active')
      window.removeEventListener('resize', measure)
      window.removeEventListener('pageshow', measure)
      desktop.removeEventListener('change', measure)
    }
  }, [])

  return (
    <main ref={pageRef} className="brand-page" aria-label="온결 브랜드 소개">
      <section ref={heroRef} className="brand-hero" aria-label="Nature, Refined.">
        <video className="brand-hero-video" src={brandFilm} autoPlay muted loop playsInline aria-label="온결 브랜드 필름. Nature, Refined." />
      </section>

      <section ref={transitionRef} className="brand-transition" aria-label="자연에서 찾고, 과학으로 완성하다">
        <div className="brand-transition-sticky">
          <div className="brand-nature-panel">
            <img src={landscapeImage} alt="산과 하늘이 맑은 호수에 비치는 자연 풍경" />
          </div>
          <div className="brand-water-panel">
            <img src={waterImage} alt="햇빛이 투명한 물 위에 만드는 잔잔한 물결" />
          </div>
          <div className="brand-nature-message">
            <p>자연에서 찾고,<br />과학으로 완성하다.</p>
          </div>
          <div className="brand-keywords" aria-label="Nature, Science, Skincare">
            <div className="brand-keyword-circle brand-keyword-circle--nature">NATURE</div>
            <div className="brand-keyword-circle brand-keyword-circle--science">SCIENCE</div>
            <div className="brand-keyword-circle brand-keyword-circle--skincare">SKINCARE</div>
          </div>
        </div>
      </section>

      <section ref={natureRef} className="brand-story brand-story--nature" aria-labelledby="brand-nature-title">
        <video className="brand-story-image" src={natureVideo} poster={natureImage} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="brand-story-copy">
          <div className="brand-story-text">
            <h1 className="brand-story-title" id="brand-nature-title">Nature, Refined</h1>
            <div className="brand-story-description">
              <p>자연에서 발견한 원료의 가능성을 세심하게 살펴보고,<br />피부에 필요한 성분만을 선별해<br />더욱 섬세하게 다듬습니다.</p>
              <p>온결은 자연의 본질을 피부를 위한<br />스킨케어로 완성합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={scienceRef} className="brand-story brand-story--science" aria-labelledby="brand-science-title">
        <div className="brand-story-copy">
          <div className="brand-story-text">
            <h2 className="brand-story-title" id="brand-science-title">Nature &amp; Science</h2>
            <div className="brand-story-description">
              <p>자연에서 얻은 원료에 현대적인 성분<br />연구와 과학적인 기준을 더합니다.</p>
              <p>각 피부 고민에 필요한 성분과 효능을<br />깊이 있게 연구해,<br />자연과 과학이 균형을 이루는 믿을 수<br />있는 솔루션을 제안합니다.</p>
            </div>
          </div>
        </div>
        <video className="brand-story-image" src={scienceVideo} poster={scienceImage} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
      </section>

      <section ref={pureRef} className="brand-story brand-story--pure" aria-labelledby="brand-pure-title">
        <video className="brand-story-image" src={pureVideo} poster={pureImage} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="brand-story-copy">
          <div className="brand-story-text">
            <h2 className="brand-story-title" id="brand-pure-title">Pure &amp; Simple</h2>
            <div className="brand-story-description">
              <p>복잡한 성분과 정보 속에서도 피부에 필요한 것을<br />쉽게 선택할 수 있도록,<br />불필요한 요소는 덜어내고<br />꼭 필요한 성분과 정보만 명확하게 담습니다.</p>
              <p>온결은 단순하지만 충분한 스킨케어<br />경험을 만들어갑니다</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={ingredientsRef} className="brand-ingredients" aria-label="온결의 자연 원료">
        <div className="brand-ingredients-sticky">
          {brandIngredients.map(ingredient => <div key={ingredient.id} className={`brand-ingredient brand-ingredient--${ingredient.id}`}>
            <div className="brand-ingredient-media">
              <img className="brand-ingredient-strip" src={ingredient.image} alt={ingredient.name} />
              <img className="brand-ingredient-circle" src={ingredient.circle} alt="" aria-hidden="true" />
            </div>
            <div className="brand-ingredient-copy">
              <h2 className="brand-ingredient-name">{ingredient.englishName}</h2>
              <p className="brand-ingredient-active">{ingredient.active}</p>
              <p className="brand-ingredient-tag">{ingredient.tag}</p>
              <p className="brand-ingredient-description">{ingredient.description.map(line => <span key={line}>{line}</span>)}</p>
            </div>
          </div>)}
        </div>
      </section>
    </main>
  )
}
