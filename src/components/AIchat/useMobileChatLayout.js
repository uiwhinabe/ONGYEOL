import { useEffect } from 'react'

export default function useMobileChatLayout(open, panelRef) {
  useEffect(() => {
    if (!open) return
    const media = window.matchMedia('(width < 520px)')
    let release
    const sync = () => {
      release?.()
      release = undefined
      if (!media.matches) return
      const panel = panelRef.current
      const button = document.querySelector('.ongyeol-ai-chat-button')
      const body = document.body
      const html = document.documentElement
      const scrollX = window.scrollX
      const scrollY = window.scrollY
      const properties = ['position', 'top', 'left', 'width', 'overflow']
      const saved = properties.map((property) => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)])
      const htmlOverflow = [html.style.getPropertyValue('overflow'), html.style.getPropertyPriority('overflow')]
      body.style.position = 'fixed'
      body.style.top = `${-scrollY}px`
      body.style.left = `${-scrollX}px`
      body.style.width = '100%'
      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
      const viewport = window.visualViewport
      const updateViewport = () => {
        panel?.style.setProperty('--ongyeol-mobile-height', `${viewport?.height ?? window.innerHeight}px`)
        panel?.style.setProperty('--ongyeol-mobile-top', `${viewport?.offsetTop ?? 0}px`)
        button?.style.setProperty('--ongyeol-mobile-top', `${viewport?.offsetTop ?? 0}px`)
      }
      updateViewport()
      viewport?.addEventListener('resize', updateViewport)
      viewport?.addEventListener('scroll', updateViewport)
      window.addEventListener('resize', updateViewport)
      release = () => {
        viewport?.removeEventListener('resize', updateViewport)
        viewport?.removeEventListener('scroll', updateViewport)
        window.removeEventListener('resize', updateViewport)
        panel?.style.removeProperty('--ongyeol-mobile-height')
        panel?.style.removeProperty('--ongyeol-mobile-top')
        button?.style.removeProperty('--ongyeol-mobile-top')
        saved.forEach(([property, value, priority]) => value ? body.style.setProperty(property, value, priority) : body.style.removeProperty(property))
        if (htmlOverflow[0]) html.style.setProperty('overflow', ...htmlOverflow)
        else html.style.removeProperty('overflow')
        window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' })
      }
    }
    sync()
    media.addEventListener('change', sync)
    return () => {
      media.removeEventListener('change', sync)
      release?.()
    }
  }, [open, panelRef])
}
