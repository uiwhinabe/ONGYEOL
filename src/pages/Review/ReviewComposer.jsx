import { useRef, useState } from 'react'
import { products } from '../../data/products.js'
import './ReviewComposer.css'

export default function ReviewComposer({ productId, onSubmit }) {
  const product = products.find(item => item.id === productId)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [body, setBody] = useState('')
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)
  const valid = rating > 0 && body.trim().length >= 15 && !loading

  const addPhotos = async event => {
    const files = [...event.target.files]
    event.target.value = ''
    if (!files.length) return
    if (files.some(file => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024)) {
      setError('사진은 장당 10MB 이하의 이미지 파일로 선택해주세요.')
      return
    }
    if (files.length + photos.length > 5) {
      setError('사진은 최대 5장까지 등록할 수 있어요.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const added = await Promise.all(files.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve({ id: crypto.randomUUID(), src: reader.result, alt: `${product?.name ?? '상품'} 사용 후기 사진` })
        reader.onerror = reject
        reader.readAsDataURL(file)
      })))
      setPhotos(current => [...current, ...added].slice(0, 5))
    } catch {
      setError('사진을 불러오지 못했어요. 다시 선택해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return <form className="review-composer" onSubmit={event => {
    event.preventDefault()
    if (!valid) { setError('별점을 선택하고 리뷰를 15자 이상 작성해주세요.'); return }
    onSubmit({ rating, body: body.trim(), photos })
    setRating(0); setHoverRating(0); setBody(''); setPhotos([]); setError('')
  }}>
    {product && <section className="review-composer__product" aria-label="리뷰 작성 상품">
      <img src={product.image} alt={product.name} />
      <div><h3>{product.name}</h3><p>{product.englishName ?? `${product.line} · ${product.type}`}</p></div>
    </section>}
    <fieldset className="review-composer__rating">
      <legend>상품은 어떠셨나요?</legend>
      <p id="review-rating-hint">평점을 남겨주세요</p>
      <div className="review-composer__stars" onMouseLeave={() => setHoverRating(0)}>
        {[1, 2, 3, 4, 5].map(value => <label key={value} onMouseEnter={() => setHoverRating(value)}>
          <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} aria-label={`${value}점`} aria-describedby="review-rating-hint" />
          <span aria-hidden="true">{value <= (hoverRating || rating) ? '★' : '☆'}
            <svg className={value <= (hoverRating || rating) ? 'is-active' : undefined} viewBox="0 0 24 24" focusable="false">
              <polygon points="12,3 14.7,8.2 20.5,9.1 16.3,13.3 17.3,19.2 12,16.4 6.7,19.2 7.7,13.3 3.5,9.1 9.3,8.2" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
          </span>
        </label>)}
      </div>
      <span className="review-composer__rating-value" aria-live="polite">{hoverRating || rating ? `${hoverRating || rating}점` : '별점을 선택해주세요'}</span>
    </fieldset>
    <section className="review-composer__section">
      <label htmlFor="review-body">상세 리뷰를 작성해주세요</label>
      <textarea id="review-body" name="body" placeholder="제품을 사용하면서 좋았던 점이나 사용감을 자유롭게 작성해주세요." value={body} onChange={event => setBody(event.target.value)} maxLength={500} rows={6} aria-describedby="review-body-hint review-body-count" required />
      <div className="review-composer__body-footer"><span id="review-body-hint">15자 이상 작성해주세요.</span><span id="review-body-count">{body.length} / 500</span></div>
    </section>
    <section className="review-composer__section" aria-labelledby="review-upload-title">
      <h3 id="review-upload-title">사진을 등록해주세요 <span>(선택 · 최대 5장)</span></h3>
      <div className="review-composer__uploads">
        {photos.map((photo, index) => <div className="review-composer__preview" key={photo.id}>
          <img src={photo.src} alt={photo.alt} />
          <button type="button" aria-label={`${index + 1}번 사진 삭제`} onClick={() => setPhotos(current => current.filter(item => item.id !== photo.id))}>×</button>
        </div>)}
        {photos.length < 5 && <button className="review-composer__add" type="button" onClick={() => fileRef.current.click()} disabled={loading} aria-label="리뷰 사진 추가"><span aria-hidden="true">+</span></button>}
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={addPhotos} hidden disabled={loading} />
      {loading && <p role="status">사진을 불러오는 중이에요.</p>}
    </section>
    <div className="review-composer__submit">
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={!valid}>리뷰 등록하기</button>
      <p>작성한 리뷰는 현재 페이지에서만 표시됩니다.</p>
    </div>
  </form>
}
