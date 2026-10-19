import { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AIChatButton from './AIChatButton.jsx'
import AIChat from './AIChat.jsx'

export default function AIChatWidget({ open, onOpenChange, onInquiry, onConversation, onSettings }) {
  const buttonRef = useRef(null)
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const close = useCallback(() => {
    onOpenChange(false)
    buttonRef.current?.focus({ preventScroll: true })
  }, [onOpenChange])

  useEffect(() => {
    const changed = previousPath.current !== pathname
    previousPath.current = pathname
    if (changed && open && window.matchMedia('(width < 520px)').matches) close()
  }, [pathname, open, close])

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
    <AIChat open={open} onInquiry={onInquiry} onConversation={onConversation} onSettings={onSettings} />
    <AIChatButton buttonRef={buttonRef} open={open} onClick={() => open ? close() : onOpenChange(true)} />
  </>
}
