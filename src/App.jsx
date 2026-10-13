import { useLayoutEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AIChatWidget from './components/AIchat/AIChatWidget.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import SignupComplete from './pages/SignupComplete.jsx'
import IdentityVerification from './pages/IdentityVerification.jsx'

import Checkout from './pages/Checkout.jsx'
import Payment from './pages/Payment.jsx'
import OrderComplete from './pages/OrderComplete.jsx'

import Event from './pages/Event.jsx'
import EventDetail from './pages/EventDetail.jsx'

import welcomeBenefitDetail from './assets/images/events/welcome-benefit-detail.png'
import kakaoDetail from './assets/images/events/kakao-detail.png'

import AuthProvider from './components/AuthProvider.jsx'
import { useAuth } from './components/authContext.js'

function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [chatOpen, setChatOpen] = useState(false)

  const { isAuthenticated, enterLogin, logout } = useAuth()

  const isLogin = pathname === '/login' || pathname === '/login/'

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return (
    <div
      className={`ongyeol-layout${
        isLogin ? ' ongyeol-layout--login' : ''
      }`}
    >
      <Header
        chatOpen={chatOpen}
        isAuthenticated={isAuthenticated}
        onLogin={enterLogin}
        onLogout={logout}
        accountLinks={{
          login: '/login',
          signup: '/signup',
        }}
      />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* 회원 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/complete" element={<SignupComplete />} />
        <Route
          path="/signup/verify"
          element={<IdentityVerification />}
        />

        {/* EVENT */}
        <Route path="/event" element={<Event />} />

        <Route
          path="/event/signup-coupon"
          element={
            <EventDetail
              title="신규 가입 회원 쿠폰 이벤트"
              detailImage={welcomeBenefitDetail}
              imageAlt="신규 회원 10,000원 쿠폰 혜택, 쿠폰 사용 안내, 쿠폰 받는 방법 및 쿠폰 이용 안내"
            />
          }
        />

        <Route
          path="/event/kakao-coupon"
          element={
            <EventDetail
              title="카카오톡 플러스 친구 쿠폰 이벤트"
              detailImage={kakaoDetail}
              imageAlt="카카오톡 플러스친구 10,000원 쿠폰 이벤트, 참여 방법, 특별 혜택 및 유의사항"
            />
          }
        />

        {/* 주문서 작성 */}
        <Route
          path="/checkout"
          element={
            <Checkout
              onPayment={() => navigate('/payment')}
            />
          }
        />

        {/* 결제 */}
        <Route
          path="/payment"
          element={
            <Payment
              onComplete={() => navigate('/order-complete')}
              onBack={() => navigate('/checkout')}
            />
          }
        />

        {/* 주문 완료 */}
        <Route
          path="/order-complete"
          element={
            <OrderComplete
              onContinueShopping={() => navigate('/')}
            />
          }
        />

        {/* 없는 주소는 HOME */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />

      <AIChatWidget
        open={chatOpen}
        onOpenChange={setChatOpen}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}