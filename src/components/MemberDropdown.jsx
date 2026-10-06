import { useEffect, useLayoutEffect, useRef } from 'react'
import './MemberDropdown.css'

export default function MemberDropdown({ open, onClose, onPointerEnter, onPointerLeave, anchorRef, headerRef, links = {} }) {
  const panelRef = useRef(null)

  useLayoutEffect(() => {
    if (!open) return
    const update = () => {
      const anchor = anchorRef.current?.getBoundingClientRect()
      const header = headerRef.current?.getBoundingClientRect()
      const panel = panelRef.current
      if (!anchor || !header || !panel) return
      const viewportWidth = document.documentElement.clientWidth
      const width = Math.min(160, Math.max(0, viewportWidth - 16))
      const left = Math.max(8, Math.min(anchor.left + anchor.width / 2 - width / 2, viewportWidth - width - 8))
      panel.style.setProperty('--member-left', `${left}px`)
      panel.style.setProperty('--member-top', `${header.bottom}px`)
    }
    update()
    const observer = new ResizeObserver(update)
    if (headerRef.current) observer.observe(headerRef.current)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [open, anchorRef, headerRef])

  useEffect(() => {
    if (!open) return
    const outside = (event) => {
      if (!panelRef.current?.contains(event.target) && !anchorRef.current?.contains(event.target)) onClose()
    }
    const escape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        anchorRef.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open, onClose, anchorRef])

  const item = (name, label) => links[name]
    ? <a className="ongyeol-member-item" href={links[name]} onClick={onClose}>{label}</a>
    : <button className="ongyeol-member-item" type="button" aria-disabled="true">{label}</button>

  return (
    <nav ref={panelRef} id="member-dropdown" className={`ongyeol-member-dropdown${open ? ' is-open' : ''}`}
      inert={!open} aria-hidden={!open} aria-label="회원 메뉴" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <div className="ongyeol-member-account-row">
        {item('login', '로그인')}<span aria-hidden="true">/</span>{item('signup', '회원가입')}
      </div>
      {item('mypage', '마이페이지')}
    </nav>
  )
}
