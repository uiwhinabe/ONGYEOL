import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AIChatWidget from './components/AIChatWidget.jsx'
import Products from './pages/Products.jsx'
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
      <Products classification={productRoute.classification} initialCategory={productRoute.category}
        onCategoryChange={navigateToProducts} />
      <Footer />
      <AIChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </>
  )
}

export default App
