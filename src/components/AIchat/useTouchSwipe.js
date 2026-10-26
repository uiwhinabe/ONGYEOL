import { useEffect, useRef } from 'react'

// Keep native vertical scrolling; claim only deliberate horizontal gestures.
export default function useTouchSwipe(onSwipe) {
  const swipeRef = useRef(null)
  const suppressClickUntil = useRef(0)

  useEffect(() => {
    const element = swipeRef.current
    let gesture = null

    const start = (event) => {
      gesture = null
      suppressClickUntil.current = 0
      if (event.touches.length !== 1) return
      const touch = event.touches[0]
      gesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY, axis: null }
    }
    const move = (event) => {
      if (!gesture) return
      if (event.touches.length !== 1) {
        gesture = null
        return
      }
      const touch = event.touches[0]
      const dx = Math.abs(touch.clientX - gesture.x)
      const dy = Math.abs(touch.clientY - gesture.y)
      if (!gesture.axis && Math.max(dx, dy) >= 10) {
        gesture.axis = dx > dy * 1.5 ? 'horizontal' : 'vertical'
      }
      if (gesture.axis === 'horizontal' && event.cancelable) event.preventDefault()
    }
    const end = (event) => {
      const completed = gesture
      gesture = null
      if (!completed || event.touches.length) return
      const touch = Array.from(event.changedTouches).find((item) => item.identifier === completed.id)
      if (!touch || completed.axis === 'vertical') return
      const dx = touch.clientX - completed.x
      const dy = touch.clientY - completed.y
      if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy) * 1.5) return
      suppressClickUntil.current = Date.now() + 700
      if (event.cancelable) event.preventDefault()
      onSwipe(dx < 0 ? 1 : -1)
    }
    const cancel = () => { gesture = null }

    element.addEventListener('touchstart', start, { passive: true })
    element.addEventListener('touchmove', move, { passive: false })
    element.addEventListener('touchend', end, { passive: false })
    element.addEventListener('touchcancel', cancel)
    return () => {
      element.removeEventListener('touchstart', start)
      element.removeEventListener('touchmove', move)
      element.removeEventListener('touchend', end)
      element.removeEventListener('touchcancel', cancel)
    }
  }, [onSwipe])

  const onClickCapture = (event) => {
    // Keyboard activation and a fresh touch remain usable immediately.
    if (event.detail !== 0 && Date.now() < suppressClickUntil.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  return { swipeRef, onClickCapture }
}
