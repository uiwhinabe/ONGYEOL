import { useState } from 'react'
import { useMyPage } from './MyPageContext.js'

// The parent retains editable filters and query results when a content unmounts.
export default function useMyPageDraft(key, initialValue) {
  const { drafts, setDrafts } = useMyPage()
  const [initial] = useState(initialValue)
  const value = Object.hasOwn(drafts, key) ? drafts[key] : initial
  function setValue(next) {
    setDrafts(previous => {
      const current = Object.hasOwn(previous, key) ? previous[key] : initial
      return { ...previous, [key]: typeof next === 'function' ? next(current) : next }
    })
  }
  return [value, setValue]
}
