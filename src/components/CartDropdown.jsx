import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CartDropdown.css'

// Header can use this controller without duplicating hover and touch handling.
// oxlint-disable-next-line react/only-export-components
export function useCartDropdown(onOpen) {
  const location = useLocation()
  const [openedAt, setOpenedAt] = useState(null)
  const open = openedAt === location
  const anchorRef = useRef(null)
  const panelRef = useRef(null)
  const closeTimer = useRef(null)
  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), [])
  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    setOpenedAt(null)
  }, [])
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])
  useEffect(() => {
    const hidden = window.matchMedia('(max-width: 1199px)')
    const update = () => { if (hidden.matches) close() }
    update()
    hidden.addEventListener('change', update)
    return () => hidden.removeEventListener('change', update)
  }, [close])

  const show = () => {
    cancelClose()
    onOpen?.()
    setOpenedAt(location)
  }
  const enter = (event) => {
    if (event.pointerType === 'mouse') cancelClose()
  }
  const leave = (event) => {
    if (event.pointerType !== 'mouse') return
    cancelClose()
    closeTimer.current = window.setTimeout(close, 150)
  }
  const onBlur = (event) => {
    const next = event.relatedTarget
    if (!anchorRef.current?.contains(next) && !panelRef.current?.contains(next)) close()
  }
  const focusFirst = () => window.requestAnimationFrame(() => {
    panelRef.current?.querySelector('button')?.focus()
  })

  return {
    open, close, anchorRef, panelRef,
    triggerProps: {
      'aria-label': '장바구니 및 찜 메뉴',
      'aria-expanded': open,
      'aria-controls': 'cart-dropdown',
      onPointerEnter: (event) => { if (event.pointerType === 'mouse') show() },
      onPointerLeave: leave,
      onClick: (event) => {
        if (open) close()
        else {
          show()
          if (event.detail === 0) focusFirst()
        }
      },
      onKeyDown: (event) => {
        if (event.key !== 'ArrowDown') return
        event.preventDefault()
        show()
        focusFirst()
      },
      onBlur,
    },
    panelProps: { onPointerEnter: enter, onPointerLeave: leave, onBlur },
  }
}

export default function CartDropdown({ open, onClose, anchorRef, headerRef, panelRef: externalPanelRef,
  onPointerEnter, onPointerLeave, onBlur }) {
  const localPanelRef = useRef(null)
  const navigate = useNavigate()
  const visit = (path) => {
    onClose()
    navigate(path)
  }
  const panelRef = externalPanelRef || localPanelRef

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
      panel.style.setProperty('--cart-dropdown-left', `${left}px`)
      panel.style.setProperty('--cart-dropdown-top', `${header.bottom}px`)
      panel.style.setProperty('--cart-dropdown-bridge-height', `${Math.max(0, header.bottom - anchor.bottom)}px`)
    }
    update()
    const observer = new ResizeObserver(update)
    if (headerRef.current) observer.observe(headerRef.current)
    if (anchorRef.current) observer.observe(anchorRef.current)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [open, anchorRef, headerRef, panelRef])

  useEffect(() => {
    if (!open) return
    const outside = (event) => {
      if (!panelRef.current?.contains(event.target) && !anchorRef.current?.contains(event.target)) onClose()
    }
    const escape = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onClose()
      anchorRef.current?.focus({ preventScroll: true })
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open, onClose, anchorRef, panelRef])

  return (
    <nav ref={panelRef} id="cart-dropdown" className={`ongyeol-cart-dropdown${open ? ' is-open' : ''}`}
      inert={!open} aria-hidden={!open} aria-label="장바구니 및 찜 메뉴"
      onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onBlur={onBlur}>
      <button className="ongyeol-cart-dropdown-item" type="button" onClick={() => visit('/cart')}>장바구니</button>
      <button className="ongyeol-cart-dropdown-item" type="button" onClick={() => visit('/wishlist')}>찜</button>
    </nav>
  )
}
