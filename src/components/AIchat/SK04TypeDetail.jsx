import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { InquiryAvatar, InquiryHeader, InquiryComposer } from './ChatStart.jsx'
import stepChevron from '../../assets/images/chat/products/step-chevron.svg'
import './SK04TypeDetail.css'

export default function SK04TypeDetail({ data, onBack, onContinue }) {
  const [ingredientStep, setIngredientStep] = useState(0)
  const motionRef = useRef(null)
  const busyRef = useRef(false)
  const generationRef = useRef(0)
  const animationRef = useRef(null)
  const imagesRef = useRef(new Map())

  useEffect(() => {
    const images = imagesRef.current
    for (const ingredient of data.ingredients) {
      if (!images.has(ingredient.image)) {
        const image = new Image()
        image.src = ingredient.image
        images.set(ingredient.image, image.decode().then(() => true, () => false))
      }
    }
    return () => {
      generationRef.current += 1
      animationRef.current?.cancel()
      busyRef.current = false
    }
  }, [data.ingredients])

  const moveIngredient = async (direction) => {
    const nextStep = ingredientStep + direction
    if (busyRef.current || nextStep < 0 || nextStep >= data.ingredients.length) return
    busyRef.current = true
    const generation = generationRef.current
    const current = () => generation === generationRef.current
    try {
      const loaded = await imagesRef.current.get(data.ingredients[nextStep].image)
      if (!current() || !loaded) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIngredientStep(nextStep)
        return
      }
      const animate = async (frames) => {
        const animation = motionRef.current.animate(frames, { duration: 140, easing: 'ease-out', fill: 'forwards' })
        animationRef.current = animation
        await animation.finished
      }
      await animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${-direction * 14}px)` }])
      if (!current()) return
      flushSync(() => setIngredientStep(nextStep))
      animationRef.current.cancel()
      await animate([{ opacity: 0, transform: `translateX(${direction * 14}px)` }, { opacity: 1, transform: 'translateX(0)' }])
    } catch (error) {
      if (error.name !== 'AbortError') throw error
    } finally {
      if (current()) {
        animationRef.current?.cancel()
        busyRef.current = false
      }
    }
  }
  return (
    <div className="ongyeol-inquiry ongyeol-chat-skin-guide-recommendation">
      <InquiryHeader onBack={onBack} backLabel="피부 타입 안내 화면으로 돌아가기" />
      <div className="ongyeol-chat-skin-guide-recommendation-content">
        <div className="ongyeol-chat-skin-guide-recommendation-message">
          <InquiryAvatar small />
          <div className="ongyeol-chat-skin-guide-recommendation-copy">
            <p>{data.title}</p>
            <p>{data.description}</p>
          </div>
        </div>
        <div ref={motionRef} className="ongyeol-chat-skin-guide-recommendation-ingredients" aria-live="polite" aria-label="추천 성분">
          {data.ingredients.map((ingredient, index) => <figure className="ongyeol-chat-skin-guide-recommendation-ingredient" key={ingredient.name} hidden={index !== ingredientStep}>
            <img src={ingredient.image} alt={ingredient.name} />
            <figcaption><p>{ingredient.name}</p><p>{ingredient.description}</p></figcaption>
          </figure>)}
        </div>
        <button className="ongyeol-chat-skin-guide-recommendation-action" type="button" disabled={!onContinue} onClick={onContinue} title={!onContinue ? "제품 확인 화면은 준비 중입니다" : undefined}>{data.actionLabel}</button>
        <nav className="ongyeol-chat-skin-guide-recommendation-navigation" aria-label="추천 성분 단계 이동">
          <button type="button" aria-label="이전 추천 성분" disabled={ingredientStep === 0}
            onClick={() => moveIngredient(-1)}><img src={stepChevron} alt="" /></button>
          <button type="button" aria-label="다음 추천 성분" disabled={ingredientStep === data.ingredients.length - 1}
            onClick={() => moveIngredient(1)}><img src={stepChevron} alt="" /></button>
        </nav>
      </div>
      <InquiryComposer />
    </div>
  )
}
