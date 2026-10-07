import { useEffect, useRef, useState } from 'react'
import { AuthContext } from './authContext.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { consumeReturnPath, isAuthPath, readAuthenticated, saveReturnPath, writeAuthenticated } from '../services/demoSession.js'

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(readAuthenticated)
  const location = useLocation()
  const navigate = useNavigate()
  const previous = useRef(location)
  useEffect(() => {
    const from = previous.current
    if (!isAuthPath(from.pathname) && isAuthPath(location.pathname)) {
      saveReturnPath(from.pathname + from.search + from.hash)
    }
    previous.current = location
  }, [location])
  const enterLogin = () => {
    if (!isAuthPath(location.pathname)) saveReturnPath(location.pathname + location.search + location.hash)
    navigate('/login')
  }
  const completeLogin = () => {
    writeAuthenticated(true)
    setAuthenticated(true)
    navigate(consumeReturnPath(), { replace: true })
  }
  const logout = () => {
    writeAuthenticated(false)
    setAuthenticated(false)
    window.location.reload()
  }
  return <AuthContext.Provider value={{ isAuthenticated, enterLogin, completeLogin, logout }}>{children}</AuthContext.Provider>
}
