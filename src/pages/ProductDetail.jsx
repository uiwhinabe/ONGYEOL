import { useEffect, useState } from 'react'
import { products } from '../data/products.js'
import { navigateToProducts } from '../utils/productNavigation.js'
import './ProductDetail.css'
import scrubMain from '../assets/product-details/body-scrub-main.png'
import naverPay from '../assets/product-details/naver-pay.png'
import scrubSecondary from '../assets/product-details/body-scrub-secondary.png'
import scrubSecondary2 from '../assets/product-details/body-scrub-secondary-2.png'
import scrubDetail1 from '../assets/product-details/body-scrub-detail-1.png'
import scrubDetail2 from '../assets/product-details/body-scrub-detail-2.png'
import scrubDetail3 from '../assets/product-details/body-scrub-detail-3.png'
import scrubDetail4 from '../assets/product-details/body-scrub-detail-4.png'
import scrubDetail5 from '../assets/product-details/body-scrub-detail-5.png'
import scrubDetail6 from '../assets/product-details/body-scrub-detail-6.png'
import scrubDetail7 from '../assets/product-details/body-scrub-detail-7.png'
import scrubDetail8 from '../assets/product-details/body-scrub-detail-8.png'

import padMain from '../assets/product-details/pad-main.png'
import padSecondary1 from '../assets/product-details/pad-secondary-1.png'
import padSecondary2 from '../assets/product-details/pad-secondary-2.png'
import padSecondary3 from '../assets/product-details/pad-secondary-3.png'
import padDetail1 from '../assets/product-details/pad-detail-1.png'
import padDetail2 from '../assets/product-details/pad-detail-2.png'
import padDetail3 from '../assets/product-details/pad-detail-3.png'
import padDetail4 from '../assets/product-details/pad-detail-4.png'
import padDetail5 from '../assets/product-details/pad-detail-5.png'
import padDetail6 from '../assets/product-details/pad-detail-6.png'
import padDetail7 from '../assets/product-details/pad-detail-7.png'
import padDetail8 from '../assets/product-details/pad-detail-8.png'

import creamMain from '../assets/product-details/cream-main.png'
import creamSecondary1 from '../assets/product-details/cream-secondary-1.png'
import creamSecondary2 from '../assets/product-details/cream-secondary-2.png'
import creamSecondary3 from '../assets/product-details/cream-secondary-3.png'
import creamDetail1 from '../assets/product-details/cream-detail-1.png'
import creamDetail2 from '../assets/product-details/cream-detail-2.png'
import creamDetail3 from '../assets/product-details/cream-detail-3.png'
import creamDetail4 from '../assets/product-details/cream-detail-4.png'
import creamDetail5 from '../assets/product-details/cream-detail-5.png'
import creamDetail6 from '../assets/product-details/cream-detail-6.png'
import creamDetail7 from '../assets/product-details/cream-detail-7.png'

import ampouleMain from '../assets/product-details/ampoule-main.png'
import ampouleSecondary1 from '../assets/product-details/ampoule-secondary-1.png'
import ampouleSecondary2 from '../assets/product-details/ampoule-secondary-2.png'
import ampouleSecondary3 from '../assets/product-details/ampoule-secondary-3.png'
import ampouleDetail1 from '../assets/product-details/ampoule-detail-1.png'
import ampouleDetail2 from '../assets/product-details/ampoule-detail-2.png'
import ampouleDetail3 from '../assets/product-details/ampoule-detail-3.png'
import ampouleDetail4 from '../assets/product-details/ampoule-detail-4.png'
import ampouleDetail5 from '../assets/product-details/ampoule-detail-5.png'
import ampouleDetail6 from '../assets/product-details/ampoule-detail-6.png'
import ampouleDetail7 from '../assets/product-details/ampoule-detail-7.png'

import mistMain from '../assets/product-details/mist-main.png'
import mistSecondary1 from '../assets/product-details/mist-secondary-1.png'
import mistSecondary2 from '../assets/product-details/mist-secondary-2.png'
import mistSecondary3 from '../assets/product-details/mist-secondary-3.png'
import mistDetail1 from '../assets/product-details/mist-detail-1.png'
import mistDetail2 from '../assets/product-details/mist-detail-2.png'
import mistDetail3 from '../assets/product-details/mist-detail-3.png'
import mistDetail4 from '../assets/product-details/mist-detail-4.png'
import mistDetail5 from '../assets/product-details/mist-detail-5.png'
import mistDetail6 from '../assets/product-details/mist-detail-6.png'
import mistDetail7 from '../assets/product-details/mist-detail-7.png'

import tonerMain from '../assets/product-details/toner-main.png'
import tonerSecondary1 from '../assets/product-details/toner-secondary-1.png'
import tonerSecondary2 from '../assets/product-details/toner-secondary-2.png'
import tonerSecondary3 from '../assets/product-details/toner-secondary-3.png'
import tonerDetail1 from '../assets/product-details/toner-detail-1.png'
import tonerDetail2 from '../assets/product-details/toner-detail-2.png'
import tonerDetail3 from '../assets/product-details/toner-detail-3.png'
import tonerDetail4 from '../assets/product-details/toner-detail-4.png'
import tonerDetail5 from '../assets/product-details/toner-detail-5.png'
import tonerDetail6 from '../assets/product-details/toner-detail-6.png'
import tonerDetail7 from '../assets/product-details/toner-detail-7.png'
import tonerDetail8 from '../assets/product-details/toner-detail-8.png'

import maskMain from '../assets/product-details/mask-main.png'
import maskSecondary1 from '../assets/product-details/mask-secondary-1.png'
import maskSecondary2 from '../assets/product-details/mask-secondary-2.png'
import maskSecondary3 from '../assets/product-details/mask-secondary-3.png'
import maskDetail1 from '../assets/product-details/mask-detail-1.png'
import maskDetail2 from '../assets/product-details/mask-detail-2.png'
import maskDetail3 from '../assets/product-details/mask-detail-3.png'
import maskDetail4 from '../assets/product-details/mask-detail-4.png'
import maskDetail5 from '../assets/product-details/mask-detail-5.png'
import maskDetail6 from '../assets/product-details/mask-detail-6.png'
import maskDetail7 from '../assets/product-details/mask-detail-7.png'
import maskDetail8 from '../assets/product-details/mask-detail-8.png'
import maskDetail9 from '../assets/product-details/mask-detail-9.png'

import odiTonerMain from '../assets/product-details/odi-toner-main.png'
import odiTonerSecondary1 from '../assets/product-details/odi-toner-secondary-1-enhanced.png'
import odiTonerSecondary2 from '../assets/product-details/odi-toner-secondary-2-enhanced.png'
import odiTonerSecondary3 from '../assets/product-details/odi-toner-secondary-3-enhanced.png'
import odiTonerDetail1 from '../assets/product-details/odi-toner-detail-1.png'
import odiTonerDetail2 from '../assets/product-details/odi-toner-detail-2.png'
import odiTonerDetail3 from '../assets/product-details/odi-toner-detail-3.png'
import odiTonerDetail4 from '../assets/product-details/odi-toner-detail-4.png'
import odiTonerDetail5 from '../assets/product-details/odi-toner-detail-5.png'
import odiTonerDetail6 from '../assets/product-details/odi-toner-detail-6.png'
import odiTonerDetail7 from '../assets/product-details/odi-toner-detail-7.png'
import odiTonerDetail8 from '../assets/product-details/odi-toner-detail-8.png'

import odiAmpouleMain from '../assets/product-details/odi-ampoule-main.png'
import odiAmpouleSecondary1 from '../assets/product-details/odi-ampoule-secondary-1-square.png'
import odiAmpouleSecondary2 from '../assets/product-details/odi-ampoule-secondary-2-replacement.png'
import odiAmpouleSecondary3 from '../assets/product-details/odi-ampoule-secondary-3.png'
import odiAmpouleDetail1 from '../assets/product-details/odi-ampoule-detail-1.png'
import odiAmpouleDetail2 from '../assets/product-details/odi-ampoule-detail-2.png'
import odiAmpouleDetail3 from '../assets/product-details/odi-ampoule-detail-3.png'
import odiAmpouleDetail4 from '../assets/product-details/odi-ampoule-detail-4.png'
import odiAmpouleDetail5 from '../assets/product-details/odi-ampoule-detail-5.png'
import odiAmpouleDetail6 from '../assets/product-details/odi-ampoule-detail-6.png'
import odiAmpouleDetail7 from '../assets/product-details/odi-ampoule-detail-7.png'
import odiAmpouleDetail8 from '../assets/product-details/odi-ampoule-detail-8.png'

const money = (value) => `${value.toLocaleString('ko-KR')}원`
const tabs = [['detail', '상세정보'], ['reviews', '리뷰'], ['questions', 'Q&A']]

function DetailTabs({ active }) {
  return <nav className="ongyeol-detail__tabs" aria-label="상품 정보 이동">
    {tabs.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}
      onClick={(event) => { event.preventDefault(); document.getElementById(`product-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>{label}</a>)}
  </nav>
}

export default function ProductDetail({ productId }) {
  const sourceProduct = products.find((item) => item.id === productId)
  const isOdiAmpoule = productId === 'odi-ampoule'
  const isOdiToner = productId === 'odi-toner'
  const isMask = productId === 'dakyeolmae-mask'
  const isToner = productId === 'dakyeolmae-toner'
  const isMist = productId === 'dakyeolmae-mist'
  const isAmpoule = productId === 'dakyeolmae-ampoule'
  const isCream = productId === 'dakyeolmae-cream'
  const isPad = productId === 'dakyeolmae-pad'
  const product = sourceProduct && (isPad ? { ...sourceProduct, name: '닥열매 브라이트닝 토너 패드, 70매', englishName: 'PAPER MULBERRY BRIGHTENING TONER PAD', price: 32400 } : isCream ? { ...sourceProduct, name: '닥열매 브라이트닝 크림, 50ml', englishName: 'PAPER MULBERRY BRIGHTENING CREAM', originalPrice: 36000, price: 28800, discountPercent: 20 } : isAmpoule ? { ...sourceProduct, englishName: 'PAPER MULBERRY REPAIR AMPOULE' } : isMist ? { ...sourceProduct, englishName: 'Paper Mulberry Collagen Serum Mist' } : isToner ? { ...sourceProduct, name: '닥열매 브라이트닝 워터 토너, 200ml', englishName: 'DAKYEOLMAE BRIGHTENING WATER TONER' } : isMask ? { ...sourceProduct, englishName: 'DAKYEOLMAE COLLAGEN MASK SET' } : isOdiToner ? { ...sourceProduct, englishName: 'Leaf Reset Hydrating Toner' } : isOdiAmpoule ? { ...sourceProduct, name: '오디 톤업 앰플, 50ml', englishName: 'Radiance TONE-UP Ampoule' } : sourceProduct)
  const [imageIndex, setImageIndex] = useState(0)
  const [thumbnailStart, setThumbnailStart] = useState(1)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [productId])
  if (!product) return <main className="ongyeol-detail"><h1>상품을 찾을 수 없습니다.</h1><button type="button" onClick={() => navigateToProducts('type', '전체')}>상품 목록으로 돌아가기</button></main>
  const isScrub = product.id === 'dakyeolmae-body-scrub'
  const images = isScrub ? [scrubMain, product.textureImage, scrubSecondary, scrubSecondary2].filter(Boolean) : isPad ? [padMain, padSecondary1, padSecondary2, padSecondary3] : isCream ? [creamMain, creamSecondary1, creamSecondary2, creamSecondary3] : isAmpoule ? [ampouleMain, ampouleSecondary1, ampouleSecondary2, ampouleSecondary3] : isMist ? [mistMain, mistSecondary1, mistSecondary2, mistSecondary3] : isToner ? [tonerMain, tonerSecondary1, tonerSecondary2, tonerSecondary3] : isMask ? [maskMain, maskSecondary1, maskSecondary2, maskSecondary3] : isOdiToner ? [odiTonerMain, odiTonerSecondary1, odiTonerSecondary2, odiTonerSecondary3] : isOdiAmpoule ? [odiAmpouleMain, odiAmpouleSecondary1, odiAmpouleSecondary2, odiAmpouleSecondary3] : [product.image, product.textureImage].filter(Boolean)
  const thumbnailIndexes = Array.from({ length: Math.min(3, images.length) }, (_, offset) => thumbnailStart + offset)
  const slideGallery = (direction) => {
    const nextIndex = (imageIndex + direction + images.length) % images.length
    setImageIndex(nextIndex)
    setThumbnailStart((start) => Math.max(0, Math.min(Math.max(0, images.length - 3), nextIndex < start ? nextIndex : nextIndex >= start + 3 ? nextIndex - 2 : start)))
  }
  const detailImages = isScrub ? [scrubDetail1, scrubDetail2, scrubDetail3, scrubDetail4, scrubDetail5, scrubDetail6, scrubDetail7, scrubDetail8] : isPad ? [padDetail1, padDetail2, padDetail3, padDetail4, padDetail5, padDetail6, padDetail7, padDetail8] : isCream ? [creamDetail1, creamDetail2, creamDetail3, creamDetail4, creamDetail5, creamDetail6, creamDetail7] : isAmpoule ? [ampouleDetail1, ampouleDetail2, ampouleDetail3, ampouleDetail4, ampouleDetail5, ampouleDetail6, ampouleDetail7] : isMist ? [mistDetail1, mistDetail2, mistDetail3, mistDetail4, mistDetail5, mistDetail6, mistDetail7] : isToner ? [tonerDetail1, tonerDetail2, tonerDetail3, tonerDetail4, tonerDetail5, tonerDetail6, tonerDetail7, tonerDetail8] : isMask ? [maskDetail1, maskDetail2, maskDetail3, maskDetail4, maskDetail5, maskDetail6, maskDetail7, maskDetail8, maskDetail9] : isOdiToner ? [odiTonerDetail1, odiTonerDetail2, odiTonerDetail3, odiTonerDetail4, odiTonerDetail5, odiTonerDetail6, odiTonerDetail7, odiTonerDetail8] : isOdiAmpoule ? [odiAmpouleDetail1, odiAmpouleDetail2, odiAmpouleDetail3, odiAmpouleDetail4, odiAmpouleDetail5, odiAmpouleDetail6, odiAmpouleDetail7, odiAmpouleDetail8] : product.detailImages
  return <main className={`ongyeol-detail${isOdiToner ? ' ongyeol-detail--odi-toner' : isOdiAmpoule ? ' ongyeol-detail--odi-ampoule' : ''}`} aria-labelledby="product-detail-title">
    <section className="ongyeol-detail__top">
      <div className="ongyeol-detail__gallery">
        <img className="ongyeol-detail__hero" src={images[imageIndex]} alt={`${product.name} 이미지 ${imageIndex + 1}`} style={isOdiAmpoule && imageIndex === 0 ? { objectFit: 'contain' } : undefined} />
        <div className="ongyeol-detail__thumbnails" aria-label="상품 이미지 선택">
          <button className="ongyeol-detail__arrow" type="button" aria-label="이전 이미지" onClick={() => slideGallery(-1)}>‹</button>
          {thumbnailIndexes.map((index) => <button className="ongyeol-detail__thumbnail" key={images[index]} type="button" aria-label={index === 0 ? '대표 이미지 보기' : index === 1 ? '제형 이미지 보기' : `보조 이미지 ${index - 1} 보기`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}><img src={images[index]} alt="" /></button>)}
          <button className="ongyeol-detail__arrow" type="button" aria-label="다음 이미지" onClick={() => slideGallery(1)}>›</button>
        </div>
      </div>
      <div className="ongyeol-detail__summary">
        {(product.englishName || isScrub) && <p className="ongyeol-detail__english">{product.englishName || 'PAPER MULBERRY PERFUME BODY SCRUB'}</p>}
        <h1 id="product-detail-title">{product.name}</h1>
        {(isScrub || isPad || isCream || isAmpoule || isMist || isToner || isMask || isOdiToner || isOdiAmpoule) && <p className="ongyeol-detail__description">{isOdiAmpoule ? '맑고 환한 톤으로 생기있게 빛나는 피부' : isOdiToner ? '가볍고 맑은 수분으로 피부결을 촉촉하게 정돈' : isMask ? '촉촉하고 탄탄한 피부로 가꿔주는 집중 탄력 마스크' : isToner ? '맑은 수분을 채워 피부결을 촉촉하고 투명하게 정돈하는 워터 토너' : isMist ? '미세한 수분 세럼 입자가 피부에 촉촉한 윤기와 탄력을 더해주는 콜라겐 미스트' : isAmpoule ? '촉촉한 수분과 영양을 채워 편안하고 건강한 피부 컨디션 케어' : isCream ? '맑은 윤기와 촉촉한 보습으로 매끄러운 피부결 케어' : isPad ? '맑은 피부결, 촉촉한 수분과 부드러운 결 케어' : <>향기롭게, 더 맑은 하루를 위한 바디 케어</>}</p>}
        <dl className="ongyeol-detail__prices">
          {(isCream || isAmpoule || isToner || isOdiAmpoule) && <><dt>정상가</dt><dd><del>{money(product.originalPrice)}</del></dd></>}
          <dt>판매가</dt><dd><strong>{money(product.price)}</strong>{product.discountPercent > 0 && <span className="ongyeol-detail__discount">{product.discountPercent}%</span>}</dd>
        </dl>
        <p className="ongyeol-detail__shipping"><span>배송비</span>3,000원(40,000원 이상 구매 시 무료)</p>
        <div className="ongyeol-detail__coupon">신규 가입하고 <span>1만원 할인 쿠폰</span>받기</div>
        <div className="ongyeol-detail__quantity">
          <div><button type="button" aria-label="수량 줄이기" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>−</button><input type="number" aria-label="상품 수량" min="1" max="99" value={quantity} onChange={(event) => setQuantity(Math.min(99, Math.max(1, Math.trunc(Number(event.target.value) || 1))))} /><button type="button" aria-label="수량 늘리기" disabled={quantity === 99} onClick={() => setQuantity(quantity + 1)}>+</button></div>
          <strong>{money(product.price * quantity)}</strong>
        </div>
        <p className="ongyeol-detail__total"><span>구매수량 {quantity}개</span><strong>총 {money(product.price * quantity)}</strong></p>
        <div className="ongyeol-detail__purchase"><button type="button" disabled aria-label="N pay"><img src={naverPay} alt="N pay" /></button><button type="button" disabled>장바구니</button><button type="button" disabled>구매하기</button></div>
        <div className="ongyeol-detail__facts">
          {[['배송안내', '평균 2~3일 이내 도착 예정'], ['교환·반품', '상품 수령 후 7일 이내 신청 가능'], ['결제 안내', '카드·간편결제 이용 가능'], ['고객 안내', '상품 및 배송 관련 문의']].map(([label, text]) => <div className="ongyeol-detail__fact" key={label}><span>{label}</span><span>{text}</span><span aria-hidden="true">›</span></div>)}
        </div>
      </div>
    </section>
    <section id="product-reviews" className="ongyeol-detail__section">
      <DetailTabs active="reviews" />
      <h2>고객 리뷰 ({product.reviewCount})</h2>
      <div className="ongyeol-detail__review-summary"><strong>{Number(product.rating).toFixed(1)}</strong><span aria-label={`별점 ${product.rating}점`}>{'★'.repeat(Math.round(product.rating))}</span><p>등록된 상품의 평점과 리뷰 수입니다.</p></div>
      <p className="ongyeol-detail__notice">개별 리뷰 내용은 아직 연결되지 않았습니다.</p>
    </section>
    <section id="product-detail" className="ongyeol-detail__section">
      <DetailTabs active="detail" />
      {detailImages?.length ? <div className="ongyeol-detail__content">{detailImages.map((src, index) => <img key={src} src={src} alt={`${product.name} 상세정보 ${index + 1}`} loading="lazy" />)}</div> : <div className="ongyeol-detail__pending"><h2>상품 상세정보</h2><p>{product.name}</p><p>상세정보 이미지가 준비 중입니다.</p></div>}
    </section>
    <section id="product-questions" className="ongyeol-detail__section">
      <DetailTabs active="questions" />
      <div className="ongyeol-detail__qa-heading"><h2>Q&A</h2><div><button type="button" disabled>문의하기</button><button type="button" disabled>모두보기</button></div></div>
      <div className="ongyeol-detail__qa-empty">게시물이 없습니다.</div>
    </section>
  </main>
}
