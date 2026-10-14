import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AIChatWidget from './components/AIChatWidget.jsx'
import Products from './pages/Products.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import { readProductRoute, navigateToProducts } from './utils/productNavigation.js'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [productRoute, setProductRoute] = useState(readProductRoute)
  useEffect(() => {
    const updateRoute = () => setProductRoute(readProductRoute())
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  return (
    <>
      <Header chatOpen={chatOpen} />
      {productRoute.isProducts && ['dakyeolmae-body-scrub', 'dakyeolmae-pad', 'dakyeolmae-cream', 'dakyeolmae-ampoule', 'dakyeolmae-mist', 'dakyeolmae-toner', 'dakyeolmae-mask', 'odi-toner', 'odi-ampoule'].includes(productRoute.productId) ? <ProductDetail key={productRoute.productId} productId={productRoute.productId} /> : productRoute.isProducts ? <Products classification={productRoute.classification} initialCategory={productRoute.category}
        onCategoryChange={navigateToProducts} /> : <Home />}
      <Footer />
      <AIChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  )
}

export default App
