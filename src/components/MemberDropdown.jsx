import { useEffect, useLayoutEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import './MemberDropdown.css'

export default function MemberDropdown({ open, onClose, onPointerEnter, onPointerLeave, anchorRef, headerRef, links = {}, isAuthenticated = false, onLogout }) {
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

  const navigate = (event, href) => {
    // Close the menu before starting a full document navigation.
    event.preventDefault()
    flushSync(onClose)
    window.location.assign(href)
  }
  const item = (name, label) => {
    const href = isAuthenticated ? links[name] : '/login'
    return href
      ? <a className="ongyeol-member-item" href={href} onClick={(event) => navigate(event, href)}>{label}</a>
      : <button className="ongyeol-member-item" type="button" aria-disabled="true">{label}</button>
  }
  const logout = () => {
    flushSync(onClose)
    onLogout?.()
  }

  return (
    <nav ref={panelRef} id="member-dropdown" className={`ongyeol-member-dropdown${open ? ' is-open' : ''}`}
      inert={!open} aria-hidden={!open} aria-label="회원 메뉴" onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <div className="ongyeol-member-account-row">
        {isAuthenticated
          ? <button className="ongyeol-member-item" type="button" disabled={!onLogout} onClick={logout}>로그아웃</button>
          : <>{item('login', '로그인')}<span aria-hidden="true">/</span>{item('signup', '회원가입')}</>}
      </div>
      {item('mypage', '마이페이지')}
    </nav>
  )
}
