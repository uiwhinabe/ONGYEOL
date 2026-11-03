import { useNavigate } from 'react-router-dom'

// Authentication is handled by the existing wishlist and cart route guards.
export default function useShoppingMenuNavigation(onClose) {
  const navigate = useNavigate()
  return path => {
    onClose()
    navigate(path)
  }
}
