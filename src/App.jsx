import { useLayoutEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AIChatWidget from './components/AIchat/AIChatWidget.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import SignupComplete from './pages/SignupComplete.jsx'
import IdentityVerification from './pages/IdentityVerification.jsx'
import Wishlist, { WishlistProductDetail } from './pages/Wishlist.jsx'
import ContactUs from './pages/Contact Us.jsx'
import AuthProvider from './components/AuthProvider.jsx'
import { useAuth } from './components/authContext.js'
function Layout() {
  const { pathname } = useLocation()
  const [chatOpen, setChatOpen] = useState(false)
  const { isAuthenticated, enterLogin, logout } = useAuth()
  const isLogin = pathname === '/login' || pathname === '/login/'
  const isWishlist = /^\/(wishlist\/?|products\/[^/]+\/?$)/.test(pathname)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return (
    <div className={`ongyeol-layout${isLogin ? ' ongyeol-layout--login' : ''}${isWishlist ? ' ongyeol-layout--wishlist' : ''}`}>
      <Header chatOpen={chatOpen} isAuthenticated={isAuthenticated} onLogin={enterLogin} onLogout={logout} accountLinks={{ login: '/login', signup: '/signup' }} />
      <Routes>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:id" element={<WishlistProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/complete" element={<SignupComplete />} />
        <Route path="/signup/verify" element={<IdentityVerification />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <AIChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  )
}
export default function App() { return <BrowserRouter basename={import.meta.env.BASE_URL}><AuthProvider><Layout /></AuthProvider></BrowserRouter> }
