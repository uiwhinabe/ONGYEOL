import { useCallback, useEffect, useRef } from 'react'
import AIChatButton from './AIChatButton.jsx'
import AIConsultation from './AIConsultation.jsx'

export default function AIChatWidget({ open, onOpenChange, onInquiry, onConversation, onSettings }) {
  const buttonRef = useRef(null)
  const close = useCallback(() => {
    onOpenChange(false)
    buttonRef.current?.focus({ preventScroll: true })
  }, [onOpenChange])

  useEffect(() => {
    if (!open) return
    const keydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [open, close])

  return <>
    <AIConsultation open={open} onInquiry={onInquiry} onConversation={onConversation} onSettings={onSettings} />
    <AIChatButton buttonRef={buttonRef} open={open} onClick={() => open ? close() : onOpenChange(true)} />
  </>
}
