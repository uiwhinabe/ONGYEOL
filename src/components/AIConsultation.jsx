import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import background from '../assets/images/chat/background.png'
import logo from '../assets/images/chat/panel-logo.png'
import avatar from '../assets/images/chat/avatar.svg'
import home from '../assets/images/chat/home.svg'
import conversation from '../assets/images/chat/conversation.svg'
import settings from '../assets/images/chat/settings.svg'
import clock from '../assets/images/chat/clock.svg'
import send from '../assets/images/chat/send.svg'
import './AIConsultation.css'

// Optional actions connect to existing screens when those screens are available.
export default function AIConsultation({ open, onInquiry, onConversation, onSettings }) {
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

  return createPortal(
    <section id="ai-consultation" ref={panelRef} role="dialog" aria-modal="false" aria-label="온결 AI 상담" aria-hidden={!open} inert={!open} tabIndex={-1} hidden={!open && !present} className={`ongyeol-consultation${visible && open ? ' is-visible' : ''}`}>
      <img className="ongyeol-consultation-background" src={background} alt="" />
      <div className="ongyeol-consultation-gradient" />
      <p className="ongyeol-consultation-wordmark">ONGYEOL</p>
      <div className="ongyeol-consultation-card">
        <div className="ongyeol-consultation-avatar">
          <img src={avatar} alt="" />
          <span><img src={logo} alt="" /></span>
        </div>
        <p className="ongyeol-consultation-name">ongyeol</p>
        <div className="ongyeol-consultation-content">
          <div className="ongyeol-consultation-copy">
            <p>안녕하세요. 온결입니다 :)</p>
            <div className="ongyeol-consultation-lines"><p>궁금한 점이나 도움이 필요하신가요?</p><p>아래의 버튼을 눌러주세요.</p></div>
            <div className="ongyeol-consultation-hours ongyeol-consultation-lines"><p>운영 시간</p><p className="ongyeol-consultation-ellipsis">AI 상담 : 24시간 연중무휴ㅇㅇㅇㅇㅇ</p></div>
          </div>
          <button type="button" className="ongyeol-consultation-inquiry" disabled={!onInquiry} onClick={onInquiry}>문의하기<img src={send} alt="" /></button>
          <div className="ongyeol-consultation-schedule"><img src={clock} alt="" /><p>월요일 오전 10시부터 운영해요</p></div>
        </div>
      </div>
      <nav className="ongyeol-consultation-navigation" aria-label="상담 메뉴">
        <button type="button" aria-current="page" onClick={() => panelRef.current?.focus({ preventScroll: true })}><img src={home} alt="" /><span>홈</span></button>
        <button type="button" disabled={!onConversation} onClick={onConversation}><img src={conversation} alt="" /><span>대화</span></button>
        <button type="button" disabled={!onSettings} onClick={onSettings}><img src={settings} alt="" /><span>설정</span></button>
      </nav>
    </section>, document.body,
  )
}
