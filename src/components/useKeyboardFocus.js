import { useEffect, useState } from 'react'

export default function useKeyboardFocus() {
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  useEffect(() => {
    const handleKeyDown = event => { if (event.key === 'Tab') setKeyboardFocus(true) }
    const handlePointerDown = () => setKeyboardFocus(false)
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
    }
  }, [])
  return keyboardFocus
}
