import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import back from '../../assets/images/chat/inquiry/back.svg'
import send from '../../assets/images/chat/inquiry/send.svg'
import attachment from '../../assets/images/chat/inquiry/attachment.svg'
import emoji from '../../assets/images/chat/inquiry/emoji.svg'
import avatarHeader from '../../assets/images/chat/inquiry/avatar-header.svg'
import avatarMessage from '../../assets/images/chat/inquiry/avatar-message.svg'
import logo from '../../assets/images/chat/panel-logo.png'
import './ChatStart.css'
import Counselor from './상담원.jsx'
import DeliveryInquiry from './배송문의.jsx'
import { useAuth } from '../authContext.js'
import useChatTransition from './useChatTransition.js'

export function InquiryAvatar({ small = false }) {
  return <span className={`ongyeol-inquiry-avatar${small ? ' ongyeol-inquiry-avatar--small' : ''}`}>
    <img src={small ? avatarMessage : avatarHeader} alt="" />
    <span className="ongyeol-inquiry-avatar-logo"><img src={logo} alt="" /></span>
  </span>
}

export function InquiryHeader({ onBack, backLabel = '상담 첫 화면으로 돌아가기' }) {
  return <header className="ongyeol-inquiry-header">
    <button className="ongyeol-inquiry-back" type="button" onClick={onBack} aria-label={backLabel}><img src={back} alt="" /></button>
    <InquiryAvatar />
    <div className="ongyeol-inquiry-heading"><p>ongyeol</p><p>월요일 오전 10시부터 운영해요</p></div>
  </header>
}

export function InquiryComposer() {
  const [question, setQuestion] = useState('')
  return <div className="ongyeol-inquiry-composer">
    <textarea aria-label="AI에게 질문" placeholder="AI에게 질문해주세요." value={question} onChange={(event) => setQuestion(event.target.value)} rows={1} />
    <div className="ongyeol-inquiry-tools">
      <button type="button" disabled aria-label="파일 첨부" title="파일 첨부는 준비 중입니다"><img src={attachment} alt="" /></button>
      <button type="button" aria-label="웃는 이모지 입력" onClick={() => setQuestion((value) => value + '😊')}><img src={emoji} alt="" /></button>
    </div>
    <button className="ongyeol-inquiry-send" type="button" disabled aria-label="질문 전송" title="질문 전송은 준비 중입니다"><img src={send} alt="" /></button>
  </div>
}

// Keep the clicked screen mounted until the existing ChatStart pop motion ends.
async function finishInquiryButtonClick(button, onComplete) {
  if (button.dataset.counselorPending === 'true') return
  button.dataset.counselorPending = 'true'
  try {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      await button.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-2px)' },
        { transform: 'translateY(0)' },
      ], { duration: 400, easing: 'ease-in-out' }).finished
    }
    if (!button.isConnected || button.closest('[hidden]')) return
    onComplete()
    button.closest('[role="dialog"]')?.focus({ preventScroll: true })
  } catch (error) {
    if (error.name !== 'AbortError') throw error
  } finally {
    delete button.dataset.counselorPending
  }
}

export default function ChatStart({ onBack, onSkinGuide, hidden = false }) {
  const { isAuthenticated } = useAuth()
  const [topic, setTopic] = useState('')
  const [showCounselor, setShowCounselor] = useState(false)
  const screenRef = useRef(null)
  useChatTransition(screenRef, `${topic}:${showCounselor}`)
  return (
    <>
    <div ref={screenRef} className={`ongyeol-inquiry ongyeol-chat-start${isAuthenticated ? ' ongyeol-inquiry--authenticated' : ''}`} hidden={hidden || showCounselor || topic === 'delivery'}>
      <InquiryHeader onBack={onBack} />
      <div className="ongyeol-inquiry-message">
        <InquiryAvatar small />
        <div className="ongyeol-inquiry-copy">
          <p>안녕하세요, 고객님 반갑습니다 😊</p>
          {isAuthenticated ? <>
            <p>건강한 피부의 결을 찾아드리는 온결 AI 상담사예요.<br />피부 고민에 맞는 제품 추천부터 주문·배송 문의까지 도와드릴게요.</p>
            <p>스킨가이드 결과를 저장하고, 맞춤 제품 추천과 다양한 회원 혜택을 받아보세요.</p>
          </> : <>
          <p>피부 고민에 맞는 제품 추천부터 주문·배송 문의까지 도와드릴게요.</p>
          <p>아직 온결 회원이 아니신가요?</p>
          <p>회원가입 후 스킨가이드 결과를 저장하고, 맞춤 제품 추천과 다양한 회원 혜택을 받아보세요.</p>
          </>}
        </div>
      </div>
      {!isAuthenticated && <div className="ongyeol-inquiry-account">
        <Link to="/login">로그인</Link><Link to="/signup/verify">회원가입</Link>
      </div>}
      <div className="ongyeol-inquiry-topics" role="group" aria-label="문의 유형">
        {['스킨가이드', '상담원 연결', '배송 문의'].map((label) => <button key={label}
          className={`ongyeol-inquiry-topic ongyeol-inquiry-choice ongyeol-inquiry-topic--${label === '스킨가이드' ? 'skin' : label === '상담원 연결' ? 'agent' : 'delivery'}`}
          type="button" onClick={(event) => finishInquiryButtonClick(event.currentTarget, () => {
            if (label === '스킨가이드') onSkinGuide?.()
            else if (label === '상담원 연결') setShowCounselor(true)
            else setTopic('delivery')
          })}>{label}</button>)}
      </div>
      <InquiryComposer />
    </div>
    <Counselor hidden={hidden || !showCounselor} onBack={() => setShowCounselor(false)}
      onReturnClick={(event) => finishInquiryButtonClick(event.currentTarget, () => setShowCounselor(false))} />
    {topic === 'delivery' && <DeliveryInquiry hidden={hidden} onBack={() => setTopic('')}
      onAction={(event, action) => finishInquiryButtonClick(event.currentTarget, action)} />}
    </>
  )
}
