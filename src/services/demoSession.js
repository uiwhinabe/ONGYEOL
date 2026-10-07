const SESSION_KEY = 'ongyeol.demoAuthenticated'
const RETURN_KEY = 'ongyeol.loginReturnTo'
export function isAuthPath(pathname) {
  return /^\/(login|signup)(\/|$)/i.test(pathname)
}
export function validReturnPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return null
  try {
    const decoded = decodeURIComponent(value.split(/[?#]/)[0])
    if (decoded.includes('\\') || [...decoded].some((character) => character.charCodeAt(0) <= 32) || decoded.startsWith('//')) return null
    const url = new URL(value, window.location.origin)
    if (url.origin !== window.location.origin || isAuthPath(decodeURIComponent(url.pathname))) return null
    return url.pathname + url.search + url.hash
  } catch { return null }
}
export function readAuthenticated() {
  try { return sessionStorage.getItem(SESSION_KEY) === 'true' } catch { return false }
}
export function writeAuthenticated(value) {
  try {
    if (value) sessionStorage.setItem(SESSION_KEY, 'true')
    else sessionStorage.removeItem(SESSION_KEY)
  } catch { /* In-memory authentication still works if storage is unavailable. */ }
}
export function saveReturnPath(value) {
  const path = validReturnPath(value)
  if (!path) return
  try { sessionStorage.setItem(RETURN_KEY, path) } catch { /* Storage may be unavailable. */ }
}
export function consumeReturnPath() {
  try {
    const value = sessionStorage.getItem(RETURN_KEY)
    sessionStorage.removeItem(RETURN_KEY)
    return validReturnPath(value) || '/'
  } catch { return '/' }
}
