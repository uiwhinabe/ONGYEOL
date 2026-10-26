export const HEADER_SCROLL_TOP_EVENT = 'ongyeol:header-scroll-top'

export function handleDesktopHeaderNav(event, currentPath, targetPath) {
  if (!window.matchMedia('(min-width: 1025px)').matches || event.defaultPrevented ||
    event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (currentPath.replace(/\/+$/, '') !== targetPath.replace(/\/+$/, '')) return

  event.preventDefault()
  // Full-page controllers cancel their animation and own the return to top.
  const request = new CustomEvent(HEADER_SCROLL_TOP_EVENT, { cancelable: true, detail: { pathname: targetPath } })
  if (window.dispatchEvent(request)) window.scrollTo({ top: 0, behavior: 'smooth' })
}
