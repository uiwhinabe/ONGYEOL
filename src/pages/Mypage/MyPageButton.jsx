import { useMyPage } from './MyPageContext.js'

export function MyPageButton({ to, onClick, children, ...props }) {
  const { navigate } = useMyPage()
  return <button {...props} type="button" onClick={event => {
    onClick?.(event)
    if (!event.defaultPrevented) navigate(to)
  }}>{children}</button>
}
