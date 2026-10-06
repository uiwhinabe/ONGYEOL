import { createPortal } from 'react-dom'
import logo from '../assets/images/chat/ongyeol-logo.png'
import hoverIcon from '../assets/images/chat/hover-close.svg'
import './AIChatButton.css'

export default function AIChatButton({ onClick, open = false, buttonRef }) {
  // Keep fixed positioning independent of layout ancestors' transform/overflow.
  return createPortal(
    <button ref={buttonRef} className={`ongyeol-ai-chat-button${open ? ' is-open' : ''}`} type="button" aria-label={open ? 'AI 상담 닫기' : 'AI 상담 열기'} aria-expanded={open} aria-controls="ai-consultation" onClick={onClick}>
      <span className="ongyeol-ai-chat-visual" aria-hidden="true">
        <span className="ongyeol-ai-chat-logo"><img src={logo} alt="" /></span>
        <img className="ongyeol-ai-chat-hover-icon" src={hoverIcon} width="31" height="31" alt="" />
      </span>
    </button>,
    document.body,
  )
}
