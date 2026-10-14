import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addCartProducts, addWishlistProduct, removeWishlistProducts, useShopping, paginateWishlist, wishlistPageNumbers, wishlistCatalog } from '../services/wishlistStore.js'
import './Wishlist.css'
import { createWishlistPreviewProducts, paginateWishlistPreview } from '../data/wishlistPreview.js'

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
    dialog.showModal()
    const timer = popup.type === 'notice' ? window.setTimeout(onClose, 2000) : null
    return () => {
      if (timer !== null) window.clearTimeout(timer)
      dialog.close()
    }
  }, [popup, onClose])
  if (!popup) return null
  if (popup.type === 'cart') return <CartAddedPopup onClose={onClose} />
  return <dialog ref={dialogRef} className="wishlist-popup" aria-label={popup.message}
    onCancel={(event) => { event.preventDefault(); onClose() }}>
    <p role={popup.type === 'notice' ? 'status' : undefined}>{popup.message}</p>
    {popup.type === 'confirm' && <div className="wishlist-popup-actions">
      <button type="button" autoFocus onClick={onClose}>취소</button>
      <button type="button" onClick={() => { onClose(); popup.onConfirm() }}>삭제</button>
    </div>}
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
  const [preview, setPreview] = useState(() => import.meta.env.DEV && wishlist.length === 0)
  const [previewProducts, setPreviewProducts] = useState(createWishlistPreviewProducts)
  const [previewCartCount, setPreviewCartCount] = useState(0)
  return <>
    {import.meta.env.DEV && <aside className="wishlist-preview-controls" aria-label="개발용 디자인 미리보기">
      <span>{preview ? `개발용 미리보기 · 임시 장바구니 ${previewCartCount}개` : '실제 찜 목록'}</span>
      <button type="button" aria-pressed={preview} onClick={() => setPreview((current) => !current)}>
        {preview ? '실제 찜 목록 보기' : '임시 상품 9개 미리보기'}
      </button>
      {preview && <button type="button" onClick={() => {
        setPreviewProducts(createWishlistPreviewProducts())
        setPreviewCartCount(0)
      }}>임시 데이터 초기화</button>}
      {preview && <p>미리보기의 담기·삭제는 실제 찜 목록과 장바구니에 저장되지 않습니다.</p>}
    </aside>}
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
  const [allChecked, setAllChecked] = useState(false)
  const { page, pageCount, items } = preview
    ? paginateWishlistPreview(wishlist, requestedPage)
    : paginateWishlist(wishlist, requestedPage)
  const pageNumbers = wishlistPageNumbers(page, pageCount)
  const groupStart = pageNumbers[0]
  const groupEnd = pageNumbers[pageNumbers.length - 1]
  const listTopRef = useRef(null)
  const previousPageRef = useRef(page)
  const [heartError, setHeartError] = useState('')
  useEffect(() => {
    if (previousPageRef.current !== page) {
      listTopRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      })
      previousPageRef.current = page
    }
  }, [page])
  const selected = wishlist.filter((p) => selection.includes(p.id))
  if (previousWishlist !== wishlist) {
    setPreviousWishlist(wishlist)
    setPage(page)
    setSelection((current) => current.filter((id) => wishlist.some((p) => p.id === id)))
    setAllChecked(false)
  }

  function remove(products, bulk = false) {
    const ids = products.map((p) => p.id)
    setPopup({ type: 'confirm', message: bulk ? '선택한 상품을 삭제하시겠습니까?' : '찜 목록에서 삭제하시겠습니까?',
      onConfirm: () => perform(async () => {
        await onRemove(ids)
        setSelection((current) => current.filter((id) => !ids.includes(id)))
        setAllChecked(false)
        setPage(page)
      }) })
  }
  function movePage(next) {
    setPage(next)
    setSelection([])
    setAllChecked(false)
  }
  function unlike(product) {
    try {
      onRemove([product.id])
      setHeartError('')
      setSelection((current) => current.filter((id) => id !== product.id))
      setAllChecked(false)
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
    <h1 ref={listTopRef}>찜 목록</h1>
    <div className="wishlist-toolbar">
      <span>전체 ({wishlist.length})</span>
      <div className="wishlist-tools">
        <label><input type="checkbox" checked={allChecked} disabled={!items.length}
          onChange={(event) => {
            const checked = event.target.checked
            setAllChecked(checked)
            setSelection((current) => checked
              ? [...new Set([...current, ...items.map((p) => p.id)])]
              : current.filter((id) => !items.some((p) => p.id === id)))
          }} />전체 선택</label>
        <button type="button" disabled={!selected.length} onClick={() => perform(() => onAddCart(selected), '선택한 상품을 장바구니에 담았습니다.', 'cart')}>선택 상품 장바구니 담기</button>
        <button type="button" disabled={!selected.length} onClick={() => remove(selected, true)}>선택 삭제</button>
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
                setAllChecked(false)
                setSelection((current) => checked ? [...current, product.id] : current.filter((id) => id !== product.id))
              }} />
          </div>
          <Link className="wishlist-product-name" to={preview ? '/wishlist' : `/products/${encodeURIComponent(product.id)}`} onClick={handleProductLink}>{product.name}</Link>
          <div className="wishlist-price-row"><Price product={product} />
            <button className="wishlist-heart" type="button" aria-label={`${product.name} 찜 해제`} aria-pressed="true" onClick={() => unlike(product)}>♥</button>
          </div>
          <div className="wishlist-card-actions">
            <button type="button" onClick={() => perform(() => onAddCart([product]), '장바구니에 담았습니다.', 'cart')}>장바구니 담기</button>
            <button type="button" onClick={() => remove([product])}>삭제</button>
          </div>
        </li>)}
      </ul>
    </>}
      <nav className="wishlist-pagination" aria-label="찜 목록 페이지">
        <button type="button" disabled={groupStart === 1} aria-label="이전 페이지 번호 그룹" onClick={() => movePage(groupStart - 5)}>‹</button>
        {pageNumbers.map((number) =>
          <button key={number} type="button" aria-label={`${number} 페이지`} aria-current={page === number ? 'page' : undefined} onClick={() => movePage(number)}>{number}</button>)}
        <button type="button" disabled={groupEnd === pageCount} aria-label="다음 페이지 번호 그룹" onClick={() => movePage(groupStart + 5)}>›</button>
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
