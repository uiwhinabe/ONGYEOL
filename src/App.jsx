import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AIChatWidget from './components/AIChatWidget.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AuthProvider from './components/AuthProvider.jsx'
import { useAuth } from './components/authContext.js'
function Layout() {
  const { pathname } = useLocation()
  const [chatOpen, setChatOpen] = useState(false)
  const { isAuthenticated, enterLogin, logout } = useAuth()
  const isLogin = pathname === '/login' || pathname === '/login/'
  return (
    <div className={`ongyeol-layout${isLogin ? ' ongyeol-layout--login' : ''}`}>
      <Header chatOpen={chatOpen} isAuthenticated={isAuthenticated} onLogin={enterLogin} onLogout={logout} accountLinks={{ login: '/login', signup: '/signup' }} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <AIChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  )
}
export default function App() { return <BrowserRouter><AuthProvider><Layout /></AuthProvider></BrowserRouter> }
