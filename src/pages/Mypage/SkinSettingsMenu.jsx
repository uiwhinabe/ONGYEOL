import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMyPage } from './MyPageContext.js'
import tabletMore from './tablet-skin-more.svg'
import './SkinSettingsMenu.css'

export default function SkinSettingsMenu() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, right: 16 })
  const trigger = useRef(null)
  const dropdown = useRef(null)
  const action = useRef(null)
  const id = useId()
  const { navigate } = useMyPage()

  useLayoutEffect(() => {
    if (!open) return
    function place() {
      const rect = trigger.current.getBoundingClientRect()
      if (!rect.width) { setOpen(false); return }
      const height = dropdown.current?.offsetHeight ?? 48
      setPosition({
        top: Math.max(8, Math.min(rect.bottom + 6, window.innerHeight - height - 8)),
        right: Math.max(16, window.innerWidth - rect.right),
      })
    }
    place()
    action.current?.focus()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function outside(event) {
      if (!trigger.current?.contains(event.target) && !dropdown.current?.contains(event.target)) setOpen(false)
    }
    function escape(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return <>
    <button ref={trigger} type="button" className="mp-skin-tablet-more"
      aria-label="스킨가이드 설정 메뉴" aria-expanded={open} aria-controls={open ? id : undefined}
      onClick={() => setOpen(value => !value)}
      onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true) } }}>
      <img src={tabletMore} alt="" />
    </button>
    {open && createPortal(
      <div ref={dropdown} id={id} className="mp-skin-settings-dropdown" style={position}>
        <button ref={action} type="button" onClick={() => { setOpen(false); navigate('/mypage/skin/settings') }}>
          스킨가이드 다시 설정
        </button>
      </div>, document.body)}
  </>
}
