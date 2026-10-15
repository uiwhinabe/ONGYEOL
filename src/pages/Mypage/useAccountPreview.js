import { useEffect, useState } from 'react'

// Figma example, updated only in memory; never an authenticated account record.
let previewEmail = 'ongyeol@gmail.com'
const listeners = new Set()
const accountPaths = ['/mypage/account', '/mypage/account/email', '/mypage/account/password', '/mypage/account/password-help']

export function openAccount(path) {
  if (!accountPaths.includes(path) || window.location.pathname === path) return
  window.history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function navigate(event) {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  const link = event.target.closest('a[href]')
  if (!link || link.target || link.origin !== window.location.origin || !accountPaths.includes(link.pathname)) return
  event.preventDefault()
  openAccount(link.pathname)
}

export function emailError(value) {
  if (!value.trim()) return '이메일을 입력해 주세요.'
  const email = value.trim()
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(email) || email.startsWith('.') || email.split('@')[0].endsWith('.') || email.split('@')[0].includes('..')) return '올바른 이메일 형식을 입력해 주세요.'
  return ''
}

export function passwordErrors(values) {
  return {
    currentPassword: values.currentPassword ? '' : '현재 비밀번호를 입력해 주세요.',
    newPassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])[A-Za-z\d!@#$%^&*()_+\-=]{8,16}$/.test(values.newPassword) ? '' : '영문, 숫자, 허용 특수문자를 조합해 8~16자로 입력해 주세요.',
    confirmPassword: !values.confirmPassword ? '새 비밀번호 확인을 입력해 주세요.' : values.confirmPassword === values.newPassword ? '' : '새 비밀번호와 일치하지 않습니다.',
  }
}

export default function useAccountPreview() {
  const [email, setEmail] = useState(previewEmail)
  useEffect(() => {
    listeners.add(setEmail)
    document.addEventListener('click', navigate)
    return () => {
      listeners.delete(setEmail)
      document.removeEventListener('click', navigate)
    }
  }, [])

  function changeEmail(event) {
    const value = event.target.value
    setEmail(value)
    event.target.setCustomValidity(emailError(value))
    if (!emailError(value)) previewEmail = value.trim()
  }

  function selectDomain(event, domain) {
    event.preventDefault()
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    if (domain) {
      const next = email.split('@')[0].trim() + domain
      const input = document.querySelector('main input[name="previewEmail"]')
      const error = emailError(next)
      input?.setCustomValidity(error)
      if (error) { input?.reportValidity(); return }
      previewEmail = next
      listeners.forEach(listener => listener(next))
    }
    openAccount('/mypage/account')
    window.requestAnimationFrame(() => document.querySelector('main input[name="previewEmail"]')?.focus())
  }

  function keyDown(event) {
    if (event.key === 'Enter' && event.target.name === 'previewEmail') {
      event.preventDefault()
      event.target.setCustomValidity(emailError(event.target.value))
      event.target.reportValidity()
    }
    if (event.key === 'Escape') {
      setEmail(previewEmail)
      if (event.target instanceof HTMLInputElement) event.target.setCustomValidity('')
      openAccount('/mypage/account')
    }
  }

  return { email, changeEmail, selectDomain, keyDown }
}
