import { useCallback, useEffect, useRef, useState } from 'react'

export default function useHamburgerDropdown(onOpen) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const timer = useRef(null)
  const cancelClose = useCallback(() => window.clearTimeout(timer.current), [])
  const close = useCallback(() => {
    window.clearTimeout(timer.current)
    setOpen(false)
  }, [])
  const show = () => {
    cancelClose()
    if (window.matchMedia('(max-width: 1479px)').matches) {
      onOpen()
      setOpen(true)
    }
  }
  const scheduleClose = () => {
    cancelClose()
    timer.current = window.setTimeout(() => setOpen(false), 140)
  }
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1480px)')
    const change = () => { if (desktop.matches) close() }
    desktop.addEventListener('change', change)
    return () => { desktop.removeEventListener('change', change); window.clearTimeout(timer.current) }
  }, [close])
  useEffect(() => {
    if (!open) return
    const keydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        triggerRef.current?.focus({ preventScroll: true })
      }
    }
    const outside = (event) => {
      if (!triggerRef.current?.contains(event.target) && !panelRef.current?.contains(event.target)) close()
    }
    document.addEventListener('keydown', keydown)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open, close])
  const onBlur = (event) => {
    if (!triggerRef.current?.contains(event.relatedTarget) && !panelRef.current?.contains(event.relatedTarget)) close()
  }
  const triggerProps = {
    'aria-expanded': open,
    'aria-controls': 'hamburger-dropdown',
    onPointerEnter: (event) => { if (event.pointerType === 'mouse') show() },
    onPointerLeave: (event) => { if (event.pointerType === 'mouse') scheduleClose() },
    onClick: (event) => {
      if (!window.matchMedia('(max-width: 1479px)').matches) return
      cancelClose()
      if (!open) onOpen()
      setOpen((value) => !value)
      if (event.detail === 0 && !open) window.requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus())
    },
    onKeyDown: (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        show()
        window.requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus())
      }
    },
    onBlur,
  }
  return { open, close, triggerProps, triggerRef, panelRef, cancelClose, scheduleClose, onBlur }
}
