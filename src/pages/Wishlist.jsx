import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addCartProducts, addWishlistProduct, removeWishlistProducts, useShopping, paginateWishlist, wishlistCatalog } from '../services/wishlistStore.js'
import './Wishlist.css'
import { createWishlistPreviewProducts } from '../data/wishlistPreview.js'

const won = (value) => `${value.toLocaleString('ko-KR')}원`

function ProductImage({ product }) {
  const [failed, setFailed] = useState(false)
  return product.image && !failed
    ? <img src={product.image} alt={product.name} onError={() => setFailed(true)} />
    : <span className="wishlist-image-placeholder" role="img" aria-label={`${product.name} 이미지 준비 중`} />
}

function Price({ product }) {
  const discounted = product.originalPrice > product.price
  return <span className="wishlist-prices">
    {discounted && <del>{won(product.originalPrice)}</del>}
    <strong>{won(product.price)}</strong>
    {discounted && <span className="wishlist-discount">{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
  </span>
}

function CartAddedPopup({ onClose, cartPath = null }) {
  const dialogRef = useRef(null)
  const backdropPointer = useRef(false)
  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])
  function outside(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    return event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom
  }
  return <dialog ref={dialogRef} className="ongyeol-cart-popup" aria-modal="true"
    aria-labelledby="ongyeol-cart-popup-title" aria-describedby="ongyeol-cart-popup-description"
    onCancel={(event) => { event.preventDefault(); onClose() }}
    onPointerDown={(event) => { backdropPointer.current = event.target === event.currentTarget && outside(event) }}
    onClick={(event) => {
      if (backdropPointer.current && event.target === event.currentTarget && outside(event)) onClose()
      backdropPointer.current = false
    }}
    onKeyDown={(event) => {
      if (event.key !== 'Tab') return
      const controls = event.currentTarget.querySelectorAll('button:not(:disabled), a[href]')
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }}>
    <button className="ongyeol-cart-popup-close" type="button" aria-label="장바구니 알림 닫기" onClick={onClose}>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4L16 16M16 4L4 16" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    </button>
    <div className="ongyeol-cart-popup-content">
      <div className="ongyeol-cart-popup-heading">
        <h2 id="ongyeol-cart-popup-title">장바구니에 담았습니다.</h2>
        <p id="ongyeol-cart-popup-description">선택한 상품이 장바구니에 추가되었습니다.</p>
      </div>
      <p className="ongyeol-cart-popup-result">선택한 상품을 장바구니에 담았습니다.</p>
      <div className="ongyeol-cart-popup-actions">
        <button className="ongyeol-cart-popup-continue" type="button" autoFocus onClick={onClose}>쇼핑 계속하기</button>
        {/* Supply cartPath only after the team has registered its cart route. */}
        {cartPath ? <Link className="ongyeol-cart-popup-view" to={cartPath} onClick={onClose}>장바구니 보기</Link>
          : <button className="ongyeol-cart-popup-view" type="button" disabled title="장바구니 페이지 준비 중">장바구니 보기</button>}
      </div>
    </div>
  </dialog>
}

function WishlistPopup({ popup, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (!popup || popup.type === 'cart') return
    const dialog = dialogRef.current
    const trigger = document.activeElement
    dialog.showModal()
    const timer = popup.type === 'notice' ? window.setTimeout(onClose, 2000) : null
    return () => {
      if (timer !== null) window.clearTimeout(timer)
      dialog.close()
      if (popup.type === 'confirm' && trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [popup, onClose])
  if (!popup) return null
  if (popup.type === 'cart') return <CartAddedPopup onClose={onClose} />
  return <dialog ref={dialogRef} className={popup.type === 'confirm' ? 'wishlist-popup wishlist-delete-popup' : 'wishlist-popup'}
    aria-label={popup.type === 'confirm' ? undefined : popup.message}
    aria-labelledby={popup.type === 'confirm' ? 'wishlist-delete-title' : undefined}
    aria-describedby={popup.type === 'confirm' ? 'wishlist-delete-description' : undefined}
    onCancel={(event) => { event.preventDefault(); onClose() }}>
    {popup.type === 'confirm' ? <div className="wishlist-delete-content">
      <button className="wishlist-delete-close" type="button" aria-label="삭제 확인 팝업 닫기" onClick={onClose}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2L14 14M14 2L2 14" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      <div className="wishlist-delete-heading">
        <h2 id="wishlist-delete-title">찜 목록에서 삭제하시겠습니까?</h2>
        <p id="wishlist-delete-description">선택한 상품이 찜 목록에서 삭제됩니다.</p>
      </div>
      <p className="wishlist-delete-result">선택한 상품을 삭제하시겠습니까?</p>
      <div className="wishlist-delete-actions">
        <button type="button" autoFocus onClick={onClose}>취소</button>
        <button type="button" onClick={() => { onClose(); popup.onConfirm() }}>삭제</button>
      </div>
    </div> : <p role={popup.type === 'notice' ? 'status' : undefined}>{popup.message}</p>}
    {popup.type === 'error' && <div className="wishlist-popup-actions"><button type="button" autoFocus onClick={onClose}>닫기</button></div>}
  </dialog>
}

function useWishlistPopup() {
  const [popup, setPopup] = useState(null)
  // Stable callback keeps the dismissal timer intact through list updates.
  const [closePopup] = useState(() => () => setPopup(null))
  async function perform(action, success, type = 'notice') {
    try {
      await action()
      setPopup(success ? { type, message: success } : null)
    } catch {
      setPopup({ type: 'error', message: '저장하지 못했습니다. 브라우저 저장 공간 설정을 확인하고 다시 시도해 주세요.' })
    }
  }
  return { popup, setPopup, closePopup, perform }
}

export default function Wishlist() {
  const { wishlist } = useShopping()
  const [preview] = useState(() => import.meta.env.DEV && wishlist.length === 0)
  const [previewProducts, setPreviewProducts] = useState(createWishlistPreviewProducts)
  const [, setPreviewCartCount] = useState(0)
  return <>
    <WishlistContent key={preview ? 'preview' : 'actual'} wishlist={preview ? previewProducts : wishlist}
      preview={preview}
      onRemove={preview ? (ids) => setPreviewProducts((products) => products.filter((p) => !ids.includes(p.id))) : removeWishlistProducts}
      onAddCart={preview ? (products) => setPreviewCartCount((count) => count + products.length) : addCartProducts} />
  </>
}

function WishlistContent({ wishlist, preview, onRemove, onAddCart }) {
  const [requestedPage, setPage] = useState(1)
  const [selection, setSelection] = useState([])
  const [previousWishlist, setPreviousWishlist] = useState(wishlist)
  const { popup, setPopup, closePopup, perform } = useWishlistPopup()
  const { page, pageCount, items } = paginateWishlist(wishlist, requestedPage)
  const [heartError, setHeartError] = useState('')
  const [animatingHearts, setAnimatingHearts] = useState([])
  const selected = wishlist.filter((p) => selection.includes(p.id))
  const allChecked = wishlist.length > 0 && selected.length === wishlist.length
  if (previousWishlist !== wishlist) {
    setPreviousWishlist(wishlist)
    setPage(page)
    setSelection((current) => current.filter((id) => wishlist.some((p) => p.id === id)))
  }

  function remove(products, bulk = false) {
    const ids = products.map((p) => p.id)
    setPopup({ type: 'confirm', message: bulk ? '선택한 상품을 삭제하시겠습니까?' : '찜 목록에서 삭제하시겠습니까?',
      onConfirm: () => perform(async () => {
        await onRemove(ids)
        setSelection([])
        setPage(page)
      }) })
  }
  function movePage(next) {
    setPage(Math.max(1, Math.min(next, pageCount)))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function unlike(product) {
    try {
      onRemove([product.id])
      setHeartError('')
      setSelection((current) => current.filter((id) => id !== product.id))
    } catch {
      setHeartError('찜을 해제하지 못했습니다. 브라우저 저장 공간 설정을 확인하고 다시 시도해 주세요.')
    }
  }
  function handleProductLink(event) {
    if (preview) {
      event.preventDefault()
      setPopup({ type: 'notice', message: '개발용 임시 상품입니다. 실제 상품 상세 페이지로 이동하지 않습니다.' })
    }
  }
  return <main className="wishlist-page">
    <h1>찜 목록</h1>
    <div className="wishlist-toolbar">
      <span>전체 ({wishlist.length})</span>
      <div className="wishlist-tools">
        <label><input type="checkbox" checked={allChecked} disabled={!wishlist.length}
          onChange={(event) => {
            const checked = event.target.checked
            setSelection(checked ? wishlist.map((p) => p.id) : [])
          }} />전체 선택</label>
        <button className="wishlist-hover-cart" type="button" disabled={!selected.length} onClick={() => perform(() => onAddCart(selected), '선택한 상품을 장바구니에 담았습니다.', 'cart')}><span>선택 상품 장바구니 담기</span></button>
        <button className="wishlist-hover-delete" type="button" disabled={!selected.length} onClick={() => remove(selected, true)}><span className="wishlist-delete-label">선택 삭제</span></button>
      </div>
    </div>
    <div className="wishlist-message-space" aria-hidden="true" />
    {heartError && <p role="alert">{heartError}</p>}
    {!items.length ? <p className="wishlist-empty">{preview ? '표시할 상품이 없습니다.' : '찜한 상품이 없습니다.'}</p> : <>
      <ul className="wishlist-grid">
        {items.map((product) => <li className="wishlist-card" key={product.id}>
          <div className="wishlist-image">
            <Link to={preview ? '/wishlist' : `/products/${encodeURIComponent(product.id)}`} onClick={handleProductLink}><ProductImage product={product} /></Link>
            <input className="wishlist-product-checkbox" type="checkbox" aria-label={`${product.name} 선택`}
              checked={selection.includes(product.id)} onChange={(event) => {
                const checked = event.target.checked
                setSelection((current) => checked ? [...current, product.id] : current.filter((id) => id !== product.id))
              }} />
          </div>
          <Link className="wishlist-product-name" to={preview ? '/wishlist' : `/products/${encodeURIComponent(product.id)}`} onClick={handleProductLink}>{product.name}</Link>
          <div className="wishlist-price-row"><Price product={product} />
            <button className={`wishlist-heart${animatingHearts.includes(product.id) ? ' wishlist-heart-animating' : ''}`} type="button" aria-label={`${product.name} 찜 해제`} aria-pressed="true"
              onClick={(event) => {
                if (animatingHearts.includes(product.id)) return
                const touch = event.nativeEvent.pointerType === 'touch'
                  || !window.matchMedia('(hover: hover) and (pointer: fine)').matches
                if (touch && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  setAnimatingHearts((current) => [...current, product.id])
                } else unlike(product)
              }}
              onAnimationEnd={() => {
                if (!animatingHearts.includes(product.id)) return
                setAnimatingHearts((current) => current.filter((id) => id !== product.id))
                unlike(product)
              }}>♥</button>
          </div>
          <div className="wishlist-card-actions">
            <button className="wishlist-cart-button wishlist-hover-cart" type="button" aria-label={`${product.name} 장바구니 담기`} onClick={() => perform(() => onAddCart([product]), '장바구니에 담았습니다.', 'cart')}><span className="wishlist-cart-text">장바구니 담기</span></button>
            <button className="wishlist-buy-button" type="button" disabled title="구매 기능 준비 중"><span>바로구매</span></button>
          </div>
        </li>)}
      </ul>
    </>}
      <nav className="wishlist-pagination" aria-label="찜 목록 페이지">
        <button className="wishlist-pagination-arrow" type="button" disabled={page === 1} aria-label="이전 페이지" onClick={() => movePage(page - 1)}><span aria-hidden="true">◀</span></button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) =>
          <button key={number} type="button" aria-label={`${number} 페이지`} aria-current={page === number ? 'page' : undefined} onClick={() => movePage(number)}>{number}</button>)}
        <button className="wishlist-pagination-arrow" type="button" disabled={page === pageCount} aria-label="다음 페이지" onClick={() => movePage(page + 1)}><span aria-hidden="true">▶</span></button>
      </nav>
    <WishlistPopup popup={popup} onClose={closePopup} />
  </main>
}

// Temporary detail route: leaves the team's empty ProductDetail.jsx untouched.
export function WishlistProductDetail() {
  const { id } = useParams()
  const { wishlist, cart } = useShopping()
  const product = wishlist.find((p) => p.id === id) || cart.find((p) => p.id === id) || wishlistCatalog.find((p) => p.id === id)
  const liked = wishlist.some((p) => p.id === id)
  const [message, setMessage] = useState('')
  const { popup, closePopup, perform } = useWishlistPopup()
  function act(action, text) {
    try { action(); setMessage(text) }
    catch { setMessage('저장하지 못했습니다. 브라우저 저장 공간 설정을 확인해 주세요.') }
  }
  return <main className="wishlist-page wishlist-detail">
    <Link to="/wishlist">찜 목록으로 돌아가기</Link>
    {!product ? <h1>상품을 찾을 수 없습니다.</h1> : <>
      <h1>{product.name}</h1>
      <div className="wishlist-detail-body">
        <div className="wishlist-image"><ProductImage key={product.id} product={product} /></div>
        <div><Price product={product} /><div className="wishlist-card-actions">
          <button type="button" aria-pressed={liked} onClick={() => act(() => liked ? removeWishlistProducts([id]) : addWishlistProduct(product), liked ? '찜을 해제했습니다.' : '찜 목록에 추가했습니다.')}>{liked ? '♥ 찜 해제' : '♡ 찜하기'}</button>
          <button type="button" onClick={() => { setMessage(''); perform(() => addCartProducts([product]), '장바구니에 담았습니다.', 'cart') }}>장바구니 담기</button>
        </div></div>
      </div>
    </>}
    <p className="wishlist-message" role="status">{message}</p>
    <WishlistPopup popup={popup} onClose={closePopup} />
  </main>
}
