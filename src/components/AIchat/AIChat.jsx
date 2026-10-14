import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import AIConsultation from './AIConsultation.jsx'
import ChatStart from './ChatStart.jsx'
import SK01 from './SK01.jsx'
import SK02 from './SK02.jsx'
import SK03TypeText from './SK03TypeText.jsx'
import SK04TypeDetail from './SK04TypeDetail.jsx'
import SK05Recommend from './SK05Recommend.jsx'
import { skinGuideData } from './skinGuideData.js'
import './AIChat.css'

export default function AIChat({ open, onInquiry, onConversation, onSettings }) {
  const [screen, setScreen] = useState('home')
  const [selectedSkinType, setSelectedSkinType] = useState('')
  const [visible, setVisible] = useState(false)
  const [present, setPresent] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    let frame
    let timer
    if (open) {
      frame = requestAnimationFrame(() => {
        setPresent(true)
        setVisible(true)
        panelRef.current?.focus({ preventScroll: true })
      })
    } else {
      frame = requestAnimationFrame(() => setVisible(false))
      timer = setTimeout(() => setPresent(false), 250)
    }
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [open])

  const changeScreen = (next) => {
    setScreen(next)
    panelRef.current?.focus({ preventScroll: true })
  }
  const selectSkinType = (type) => {
    setSelectedSkinType(type)
    if (skinGuideData[type]) changeScreen('skin-guide-type-detail')
  }
  const recommendation = skinGuideData[selectedSkinType]?.recommendation
  const products = skinGuideData[selectedSkinType]?.products
  const openProducts = () => {
    if (products?.length) changeScreen('skin-guide-products')
  }
  const openRecommendation = () => {
    if (recommendation) changeScreen('skin-guide-recommendation')
  }
  return createPortal(
    <section id="ai-consultation" ref={panelRef} role="dialog" aria-modal="false"
      aria-label={screen === 'home' ? '온결 AI 상담' : screen === 'skin-guide-intro' ? '온결 AI 스킨가이드 안내' : screen === 'skin-guide-step-one' ? '온결 AI 스킨가이드 첫 질문' : screen === 'skin-guide-type-detail' ? '온결 AI 피부 타입 안내' : screen === 'skin-guide-recommendation' ? '온결 AI 피부 타입 추천' : screen === 'skin-guide-products' ? '온결 AI 추천제품' : '온결 AI 문의하기'}
      aria-hidden={!open} inert={!open} tabIndex={-1} hidden={!open && !present}
      className={`ongyeol-consultation${visible && open ? ' is-visible' : ''}`}>
      {screen === 'home'
        ? <AIConsultation onInquiry={() => { changeScreen('inquiry'); onInquiry?.() }}
            onConversation={onConversation} onSettings={onSettings} onHome={() => panelRef.current?.focus({ preventScroll: true })} />
        : <>
            <ChatStart hidden={screen !== 'inquiry'} onBack={() => changeScreen('home')} onSkinGuide={() => changeScreen('skin-guide-intro')} />
            {screen === 'skin-guide-intro' && <SK01 onBack={() => changeScreen('inquiry')} onStart={() => changeScreen('skin-guide-step-one')} />}
            {screen === 'skin-guide-step-one' && <SK02 onBack={() => changeScreen('skin-guide-intro')} selectedSkinType={selectedSkinType} onSelectSkinType={selectSkinType} />}
            {screen === 'skin-guide-type-detail' && <SK03TypeText data={skinGuideData[selectedSkinType]} onBack={() => changeScreen('skin-guide-step-one')} onContinue={recommendation ? openRecommendation : undefined} />}
            {screen === 'skin-guide-recommendation' && recommendation && <SK04TypeDetail data={recommendation} onContinue={products?.length ? openProducts : undefined} onBack={() => changeScreen('skin-guide-type-detail')} />}
            {screen === 'skin-guide-products' && products?.length > 0 && <SK05Recommend key={selectedSkinType} products={products} onBack={() => changeScreen('skin-guide-recommendation')} onBrowseConcerns={() => changeScreen('skin-guide-step-one')} />}
          </>}
    </section>, document.body,
  )
}
