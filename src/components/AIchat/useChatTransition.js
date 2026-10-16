import { useLayoutEffect, useRef } from 'react'

// Animate existing content nodes without replacing screens or their local state.
export default function useChatTransition(elementRef, transitionKey) {
  const previousKey = useRef(transitionKey)
  useLayoutEffect(() => {
    if (previousKey.current === transitionKey) return
    previousKey.current = transitionKey
    const panel = elementRef.current?.closest('.ongyeol-consultation')
    if (!panel || panel.getAttribute('aria-hidden') === 'true') return
    if (window.matchMedia('(width < 520px)').matches) panel.scrollTop = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return
    const screen = [...panel.querySelectorAll('.ongyeol-inquiry')].find((node) => !node.closest('[hidden]'))
    const content = screen
      ? [...screen.children].filter((node) => !node.matches('.ongyeol-inquiry-header, .ongyeol-inquiry-composer'))
      : [...panel.querySelectorAll('.ongyeol-consultation-card, .ongyeol-consultation-navigation')]
    const animations = content.map((node) => node.animate([
      { opacity: 0, translate: '0 6px' },
      { opacity: 1, translate: '0 0' },
    ], { duration: 220, easing: 'ease-out' }))
    const cancel = () => animations.forEach((animation) => animation.cancel())
    const onMotionChange = () => { if (reducedMotion.matches) cancel() }
    reducedMotion.addEventListener('change', onMotionChange)
    return () => {
      cancel()
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [elementRef, transitionKey])
}
