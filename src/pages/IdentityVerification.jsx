import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './IdentityVerification.css'
import './AuthFonts.css'

export default function IdentityVerification() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useLayoutEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const trigger = triggerRef.current
    const bodyOverflow = document.body.style.overflow
    const rootOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    dialog.showModal()
    const positionDialog = () => {
      const panel = panelRef.current.getBoundingClientRect()
      const viewport = window.visualViewport
      const viewportTop = viewport?.offsetTop ?? 0
      const viewportHeight = viewport?.height ?? window.innerHeight
      const headerBottom = document.querySelector('.ongyeol-header')?.getBoundingClientRect().bottom ?? viewportTop
      const minTop = Math.max(viewportTop + 12, headerBottom + 12)
      const availableHeight = Math.max(1, viewportTop + viewportHeight - 20 - minTop)
      const height = Math.min(Math.max(350, panel.height + 40), availableHeight)
      const top = Math.max(minTop, Math.min(panel.top + (panel.height - height) / 2, viewportTop + viewportHeight - 20 - height))
      dialog.style.setProperty('--identity-dialog-top', `${top}px`)
      dialog.style.setProperty('--identity-dialog-height', `${height}px`)
      dialog.style.setProperty('--identity-dialog-left', `${panel.left + panel.width / 2}px`)
    }
    positionDialog()
    const observer = new ResizeObserver(positionDialog)
    observer.observe(panelRef.current)
    window.addEventListener('resize', positionDialog)
    window.visualViewport?.addEventListener('resize', positionDialog)
    window.visualViewport?.addEventListener('scroll', positionDialog)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', positionDialog)
      window.visualViewport?.removeEventListener('resize', positionDialog)
      window.visualViewport?.removeEventListener('scroll', positionDialog)
      dialog.close()
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = rootOverflow
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <main className="ongyeol-identity" aria-labelledby="identity-title">
      <div ref={panelRef} className={`ongyeol-identity-panel${open ? ' ongyeol-identity-panel--covered' : ''}`} aria-hidden={open || undefined}>
        <h1 id="identity-title">본인 인증</h1>
        <div className="ongyeol-identity-description">
          <p>‘온결’ 웹 사이트에서는 고객님의 안전한 거래 및 회원정보 보호를 위해본인 인증 (최초 1회 가입시)을 하고 있습니다.</p>
          <p>본인 인증 시 제공되는 정보 중 본인 인증 목적의 정보는 해당 인증기관에서 직접 수집하며, 수집 정보 중 이름, 휴대폰 번호, 생일, 출생년도는 웹 사이트 회원가입 단계에 자동 입력됩니다.</p>
          <p>만 14세 미만 아동은 온결 웹사이트 회원에서 제외됩니다.</p>
        </div>
        <button ref={triggerRef} type="button" className="ongyeol-identity-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>본인 인증하기</button>
      </div>
      <dialog ref={dialogRef} className="ongyeol-identity-dialog" aria-modal="true" aria-labelledby="identity-dialog-title" aria-describedby="identity-demo-note" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const links = event.currentTarget.querySelectorAll('a[href]')
        const first = links[0]
        const last = links[links.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }}>
        <div className="ongyeol-identity-dialog-content">
          <div className="ongyeol-identity-dialog-heading">
            <h2 id="identity-dialog-title">본인인증이 완료되었습니다.</h2>
            <p id="identity-demo-note">시연용 화면입니다. 실제 본인인증은 진행되지 않습니다.</p>
          </div>
          <p className="ongyeol-identity-result">본인인증 되었습니다.</p>
          <nav className="ongyeol-identity-actions" aria-label="인증 안내 후 이동">
            <Link to="/" className="ongyeol-identity-home" autoFocus>홈으로 돌아가기</Link>
            <Link to="/signup">회원가입 하러가기</Link>
          </nav>
        </div>
      </dialog>
    </main>
  )
}
