import { useEffect, useState } from 'react'

export const skinTypes = ['건성', '지성', '복합성', '민감성', '중성']
export const skinConcerns = ['민감 · 진정', '수분·보습', '모공·피지', '피부톤·잡티', '주름·탄력']

// Figma examples, not a customer record or a diagnosis. Memory only.
let profile = { skinType: '민감성', concerns: ['민감 · 진정', '모공·피지'], memo: '' }
const listeners = new Set()

export default function useSkinProfile() {
  const [value, setValue] = useState(profile)
  useEffect(() => {
    listeners.add(setValue)
    return () => {
      listeners.delete(setValue)
    }
  }, [])

  function update(patch) {
    if ('skinType' in patch && !skinTypes.includes(patch.skinType)) return
    if ('concerns' in patch && (!Array.isArray(patch.concerns) || patch.concerns.some(item => !skinConcerns.includes(item)))) return
    if ('memo' in patch && typeof patch.memo !== 'string') return
    profile = { ...profile, ...patch }
    if (patch.concerns) profile.concerns = [...new Set(patch.concerns)]
    listeners.forEach(listener => listener(profile))
  }

  function toggleConcern(concern) {
    if (!skinConcerns.includes(concern)) return
    update({ concerns: profile.concerns.includes(concern) ? profile.concerns.filter(item => item !== concern) : [...profile.concerns, concern] })
  }

  return { profile: value, update, toggleConcern }
}
