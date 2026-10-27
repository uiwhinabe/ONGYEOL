import { useLayoutEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import Header from './components/Header.jsx'
import MyPage from './pages/Mypage/Mypage.jsx'
import Footer from './components/Footer.jsx'
import AIChatWidget from './components/AIchat/AIChatWidget.jsx'

import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Review from './pages/Review/Review.jsx'
import PhotoReviews from './pages/Review/PhotoReviews.jsx'
import { readProductRoute, navigateToProducts } from './utils/productNavigation.js'
import Brand from './pages/Brand.jsx'
import SkinGuide from './pages/Skinguide.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import SignupComplete from './pages/SignupComplete.jsx'
import IdentityVerification from './pages/IdentityVerification.jsx'
import Wishlist, { WishlistProductDetail } from './pages/Wishlist.jsx'

import Checkout from './pages/Checkout.jsx'
import Cart from './pages/Cart.jsx'
import Payment from './pages/Payment.jsx'
import OrderComplete from './pages/OrderComplete.jsx'

import Event from './pages/Event.jsx'
import EventDetail from './pages/EventDetail.jsx'

import welcomeBenefitDetail from './assets/images/events/welcome-benefit-detail.png'
import kakaoDetail from './assets/images/events/kakao-detail.png'

import AuthProvider from './components/AuthProvider.jsx'
import { useAuth } from './components/authContext.js'
import './pages/paymentControls.css'

function ProductPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const route = readProductRoute(location)
  if (route.productId) return <ProductDetail key={route.productId} productId={route.productId} />
  return <Products classification={route.classification} initialCategory={route.category}
    onCategoryChange={(classification, category) => navigateToProducts(classification, category, navigate)} />
}

function Layout() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  const [chatOpen, setChatOpen] = useState(false)

  const { isAuthenticated, enterLogin, logout } = useAuth()

  const isMyPage = pathname === '/contact' || pathname === '/mypage' || pathname.startsWith('/mypage/')
  const isLogin = pathname === '/login' || pathname === '/login/'
  const isWishlist = /^\/(wishlist\/?|products\/[^/]+\/?$)/.test(pathname)

  // Keep existing product bookmarks working with the shared BrowserRouter.
  useLayoutEffect(() => {
    if (hash.split('?')[0] === '#/products') {
      navigate(`/products${hash.includes('?') ? `?${hash.split('?')[1]}` : ''}`, { replace: true })
    }
  }, [hash, navigate])

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
      }${isWishlist ? ' ongyeol-layout--wishlist' : ''}${isMyPage ? ' footer-page-layout' : ''}`}
    >
      <Header
        chatOpen={chatOpen}
        isAuthenticated={isAuthenticated}
        onLogin={enterLogin}
        onLogout={logout}
        accountLinks={{
          login: '/login',
          signup: '/signup',
          mypage: '/mypage',
        }}
      />

      <Routes>
        <Route path="/contact" element={<div className="footer-page-body"><MyPage /></div>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:id" element={<WishlistProductDetail />} />
        <Route path="/mypage/*" element={<div className="footer-page-body"><MyPage /></div>} />
        {/* HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/review/:productId" element={<Review />} />
        <Route path="/review/:productId/photos" element={<PhotoReviews />} />
        <Route path="/skin-guide" element={<SkinGuide />} />
        <Route path="/brand" element={<Brand />} />

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
        <Route path="/cart" element={<Cart />} />
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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}
