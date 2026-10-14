import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { InquiryAvatar, InquiryHeader, InquiryComposer } from './ChatStart.jsx'
import stepChevron from '../../assets/images/chat/products/step-chevron.svg'
import productChevron from '../../assets/images/chat/products/product-chevron.svg'
import browseChevron from '../../assets/images/chat/products/browse-chevron.svg'
import './SK05Recommend.css'

export default function SK05Recommend({ products, onBack, onBrowseConcerns }) {
  // This screen mounts on entry; returning from ingredients starts at STEP 01.
  const [productStep, setProductStep] = useState(0)
  const motionRef = useRef(null)
  const busyRef = useRef(false)
  const generationRef = useRef(0)
  const animationRef = useRef(null)
  const imagesRef = useRef(new Map())

  useEffect(() => {
    const images = imagesRef.current
    for (const { imageLayers } of products) {
      for (const { src } of imageLayers) {
        if (!images.has(src)) {
          const image = new Image()
          image.src = src
          images.set(src, image.decode().then(() => true, () => false))
        }
      }
    }
    return () => {
      generationRef.current += 1
      animationRef.current?.cancel()
      busyRef.current = false
    }
  }, [products])

  const moveProduct = async (direction) => {
    const nextStep = productStep + direction
    if (busyRef.current || nextStep < 0 || nextStep >= products.length) return
    busyRef.current = true
    const generation = generationRef.current
    const current = () => generation === generationRef.current
    try {
      const loaded = await Promise.all(products[nextStep].imageLayers.map(({ src }) => imagesRef.current.get(src)))
      if (!current() || loaded.some((ready) => !ready)) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        setProductStep(nextStep)
        return
      }
      const animate = async (frames) => {
        const animation = motionRef.current.animate(frames, { duration: 140, easing: 'ease-out', fill: 'forwards' })
        animationRef.current = animation
        await animation.finished
      }
      await animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${-direction * 14}px)` }])
      if (!current()) return
      flushSync(() => setProductStep(nextStep))
      animationRef.current.cancel()
      await animate([{ opacity: 0, transform: `translateX(${direction * 14}px)` }, { opacity: 1, transform: 'translateX(0)' }])
    } catch (error) {
      // Cancellation on screen exit is expected; no delayed state update follows.
      if (error.name !== 'AbortError') throw error
    } finally {
      if (current()) {
        animationRef.current?.cancel()
        busyRef.current = false
      }
    }
  }
  const product = products[productStep]
  const actionContent = <>제품 보러가기<img src={productChevron} alt="" /></>

  return <div className="ongyeol-inquiry ongyeol-chat-products">
    <InquiryHeader onBack={onBack} backLabel="추천 성분 화면으로 돌아가기" />
    <div className="ongyeol-chat-products-avatar"><InquiryAvatar small /></div>
    <article className="ongyeol-chat-products-content" aria-label="추천제품" aria-live="polite"
      data-presentation={product.presentation}
      style={{ width: product.contentWidth, top: product.contentTop }}>
      <div className="ongyeol-chat-products-motion" ref={motionRef}>
      <div className="ongyeol-chat-products-image" role="img" aria-label={product.name} style={product.imageSize}>
        {product.imageLayers.map(({ src, crop, ...geometry }) => crop
          ? <div key={src} className="ongyeol-chat-products-image-crop" style={geometry}><img src={src} alt="" style={crop} /></div>
          : <img key={src} src={src} alt="" style={geometry} />)}
      </div>
      <div className="ongyeol-chat-products-details">
        <p className="ongyeol-chat-products-step">STEP  {String(productStep + 1).padStart(2, '0')}</p>
        <div className="ongyeol-chat-products-names">
          <h2>{product.name}</h2>
          <p className="ongyeol-chat-products-english" style={{ whiteSpace: product.englishNoWrap ? 'nowrap' : undefined }}>{product.englishName}</p>
        </div>
        <p className="ongyeol-chat-products-description">{product.description.map((line) => <span key={line}>{line}</span>)}</p>
      </div>
      </div>
    </article>
    <div className="ongyeol-chat-products-actions">
        <button className="ongyeol-chat-products-action ongyeol-chat-products-view" type="button">{actionContent}</button>
        {productStep === products.length - 1 && <button className="ongyeol-chat-products-action ongyeol-chat-products-browse" type="button" onClick={onBrowseConcerns}>
          다른 고민 둘러보기<img src={browseChevron} alt="" />
        </button>}
    </div>
    <nav className="ongyeol-chat-products-navigation" aria-label="추천제품 단계 이동">
      <button type="button" aria-label="이전 추천제품" disabled={productStep === 0}
        onClick={() => moveProduct(-1)}><img src={stepChevron} alt="" /></button>
      <button type="button" aria-label="다음 추천제품" disabled={productStep === products.length - 1}
        onClick={() => moveProduct(1)}><img src={stepChevron} alt="" /></button>
    </nav>
    <InquiryComposer />
  </div>
}
