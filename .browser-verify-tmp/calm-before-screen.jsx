import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InquiryAvatar, InquiryHeader, InquiryComposer } from './ChatStart.jsx'
import stepChevron from '../../assets/images/chat/products/step-chevron.svg'
import productChevron from '../../assets/images/chat/products/product-chevron.svg'
import './SK05Recommend.css'

export default function SK05Recommend({ products, onBack }) {
  // This screen mounts on entry; returning from ingredients starts at STEP 01.
  const [productStep, setProductStep] = useState(0)
  const product = products[productStep]
  const actionContent = <>제품 보러가기<img src={productChevron} alt="" /></>

  return <div className="ongyeol-inquiry ongyeol-chat-products">
    <InquiryHeader onBack={onBack} backLabel="추천 성분 화면으로 돌아가기" />
    <div className="ongyeol-chat-products-avatar"><InquiryAvatar small /></div>
    <article className="ongyeol-chat-products-content" aria-label="추천제품" aria-live="polite"
      style={{ width: product.contentWidth }}>
      <div className="ongyeol-chat-products-image" role="img" aria-label={product.name} style={product.imageSize}>
        {product.imageLayers.map(({ src, ...geometry }) => <img key={src} src={src} alt="" style={geometry} />)}
      </div>
      <div className="ongyeol-chat-products-details">
        <p className="ongyeol-chat-products-step">STEP  {String(productStep + 1).padStart(2, '0')}</p>
        <div className="ongyeol-chat-products-names">
          <h2>{product.name}</h2>
          <p className="ongyeol-chat-products-english">{product.englishName}</p>
        </div>
        <p className="ongyeol-chat-products-description">{product.description.map((line) => <span key={line}>{line}</span>)}</p>
        {product.href
          ? <Link className="ongyeol-chat-products-action" to={product.href}>{actionContent}</Link>
          : <button className="ongyeol-chat-products-action" type="button" disabled title="상품 상세 페이지는 준비 중입니다">{actionContent}</button>}
      </div>
    </article>
    <nav className="ongyeol-chat-products-navigation" aria-label="추천제품 단계 이동">
      <button type="button" aria-label="이전 추천제품" disabled={productStep === 0}
        onClick={() => setProductStep((step) => Math.max(0, step - 1))}><img src={stepChevron} alt="" /></button>
      <button type="button" aria-label="다음 추천제품" disabled={productStep === products.length - 1}
        onClick={() => setProductStep((step) => Math.min(products.length - 1, step + 1))}><img src={stepChevron} alt="" /></button>
    </nav>
    <InquiryComposer />
  </div>
}
