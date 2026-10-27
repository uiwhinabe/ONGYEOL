import Footer from './Footer.jsx'
import './FooterPageLayout.css'

// Only screens which render a Footer opt in to this layout.
export default function FooterPageLayout({ header, children }) {
  return <div className="footer-page-layout">
    {header}
    <div className="footer-page-body">{children}</div>
    <Footer />
  </div>
}
