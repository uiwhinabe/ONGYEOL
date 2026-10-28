import Pagination from '../../components/Pagination.jsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { skinConcerns } from '../skinGuideConcernData.js'
import { reviewPages } from './reviewData.js'
import starIcon from '../../assets/reviews/star.svg'
import starsIcon from '../../assets/reviews/stars.svg'
import profileIcon from '../../assets/reviews/profile.svg'
import helpfulIcon from '../../assets/reviews/helpful.svg'
import downIcon from '../../assets/reviews/chevron-down.svg'
import rightIcon from '../../assets/reviews/chevron-right.svg'
import mobileRatingStar from '../../assets/reviews/mobile-rating-star.svg'
import mobileReviewStar from '../../assets/reviews/mobile-review-star.svg'
import mobileHelpfulIcon from '../../assets/reviews/mobile-helpful.svg'
import './Review.css'
import ReviewComposer from './ReviewComposer.jsx'
import PhotoReviewDialog from './PhotoReviewDialog.jsx'
import { getPhotoReviews } from './reviewPhotos.js'

const PAGE_SIZE = 3
const concernLabel = id => skinConcerns.find(item => item.id === id)?.label.replaceAll(' / ', '•') ?? id

function Stars({ rating = 5 }) {
  return <span className="review-stars" role="img" aria-label={`별점 ${rating}점`}>
    {rating === 5 ? <img src={starsIcon} alt="" /> : Array.from({ length: 5 }, (_, index) => <img key={index} src={starIcon} alt="" className={index >= rating ? 'review-star-empty' : undefined} />)}
    <span className="review-mobile-only review-compact-stars" aria-hidden="true"><img src={mobileReviewStar} alt="" />{rating}</span>
  </span>
}

function Dropdown({ label, mobileLabel, kind, value, options, onChange }) {
  const detailsRef = useRef(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const closeOutside = event => {
      if (!detailsRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside, true)
    return () => document.removeEventListener('pointerdown', closeOutside, true)
  }, [open])
  const selected = options.find(option => option.value === value)
  return <details className={`review-dropdown review-dropdown--${kind}`} ref={detailsRef} open={open} onBlur={event => {
    // A touch can blur the summary without focusing the option. Let its click complete.
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }} onKeyDown={event => {
    if (event.key === 'Escape') { setOpen(false); event.currentTarget.querySelector('summary').focus() }
  }}>
    <summary aria-expanded={open} aria-label={`${label}: ${selected?.label ?? label}`} onClick={event => { event.preventDefault(); setOpen(current => !current) }}><span className={mobileLabel ? 'review-filter-desktop-label' : undefined}>{value ? selected?.label : label}</span>{mobileLabel && <span className="review-mobile-only">{value ? selected?.label : mobileLabel}</span>}<img src={downIcon} alt="" /></summary>
    <div className="review-dropdown-options" aria-label={label}>
      {options.map(option => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => {
        onChange(option.value)
        setOpen(false)
        detailsRef.current.querySelector('summary').focus()
      }}>{option.label}</button>)}
    </div>
  </details>
}

function ReviewSummary({ data, onPhoto }) {
  const totalRatings = Object.values(data.ratingDistribution).reduce((sum, count) => sum + count, 0)
  return <section className="review-summary" aria-label="리뷰 요약">
    <p className="review-mobile-only review-mobile-total">총 {data.totalReviews}개 리뷰</p>
    <div className="review-summary-inner">
      <div className="review-score"><strong>{data.totalReviews ? data.rating.toFixed(1) : '—'}</strong><Stars rating={Math.round(data.rating)} /></div>
      <dl className="review-statistics">
        {[["리뷰등록", data.totalReviews], ["포토리뷰", data.photoReviewCount], ["상품조회수", data.viewCount]].map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{count}건</dd></div>)}
      </dl>
      <div className="review-summary-divider" />
      <div className="review-breakdown"><h2>세부평가</h2><div className="review-rating-rows">
        {[5, 4, 3, 2, 1].map(rating => <div className="review-rating-row" key={rating}>
          <span className="review-rating-label"><img src={starIcon} alt="" />{rating}<span className="review-sr-only">점</span></span>
          <div className="review-rating-bar" role="meter" aria-label={`${rating}점 리뷰 비율`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={totalRatings ? data.ratingDistribution[rating] / totalRatings * 100 : 0}>
            <span style={{ width: `${totalRatings ? data.ratingDistribution[rating] / totalRatings * 100 : 0}%` }} />
          </div><span className="review-rating-count">{data.ratingDistribution[rating]}</span>
        </div>)}
      </div></div>
      <div className="review-summary-divider" />
      <div className="review-mini-gallery"><h2>포토리뷰 모아보기</h2><div>
        {(data.summaryPhotos ?? data.photoReviews).slice(0, 4).map(photo => <button key={photo.id} type="button" onClick={() => onPhoto(photo)}><img src={photo.src} alt={photo.alt} /></button>)}
      </div></div>
    </div>
  </section>
}

function ReviewItem({ review, helpful, onHelpful, onPhoto }) {
  return <article className={`review-item${review.photo ? '' : ' review-item--text-only'}`}>
    <div className="review-item-content">
      <div className="review-item-text">
        <div className="review-item-meta">
          <img className="review-profile" src={profileIcon} alt="" />
          <div className="review-user"><span>{review.nickname}</span><div><Stars rating={review.rating} /><time dateTime={review.date}>{review.date.replaceAll('-', '.')}</time></div></div>
          <div className="review-tags">{[review.skinType, review.concernLabel ?? concernLabel(review.concern), review.age].map((tag, index) => <span key={`${tag}-${index}`}>{tag}</span>)}</div>
        </div>
        <h3>{review.title}</h3><p>{review.preview ?? review.body}</p>
      </div>
      <button className="review-helpful" type="button" aria-pressed={helpful} onClick={onHelpful}><span><img src={helpfulIcon} alt="" /><img className="review-mobile-only" src={mobileHelpfulIcon} alt="" /></span>도움돼요</button>
    </div>
    {review.photo && <button className="review-item-photo" type="button" onClick={() => onPhoto(review.photo)}><img src={review.photo.src} alt={review.photo.alt} /></button>}
  </article>
}

function ReviewDialog({ dialogRef, productId, onSubmit }) {
  return <dialog className="review-dialog review-dialog--compose" ref={dialogRef} aria-label="리뷰 작성">
      <header className="review-composer-header"><h2>리뷰 작성</h2><button type="button" aria-label="리뷰 작성 닫기" onClick={() => dialogRef.current.close()}>×</button></header>
      <ReviewComposer productId={productId} onSubmit={review => { onSubmit(review); dialogRef.current.close() }} />
  </dialog>
}

export function Review({ data }) {
  const [tab, setTab] = useState('all')
  const [filters, setFilters] = useState({ age: '', skinType: '', concern: '', sort: 'latest' })
  const [page, setPage] = useState(1)
  const [helpfulIds, setHelpfulIds] = useState(new Set())
  const [localReviews, setLocalReviews] = useState([])
  const [photo, setPhoto] = useState(null)
  const listRef = useRef(null)
  const dialogRef = useRef(null)
  const photoDialogRef = useRef(null)
  const photoReviews = getPhotoReviews([...localReviews, ...data.reviews])
  const selectedPhotoReview = photo && photoReviews.find(entry => entry.photos.some(image => image.src === photo.src))
  const selectedReview = selectedPhotoReview && [...localReviews, ...data.reviews].find(review => review.id === selectedPhotoReview.reviewId)
  const previewPhotos = data.photoReviews.flatMap(image => {
    const entry = photoReviews.find(review => review.photos.some(photo => photo.src === image.src))
    return entry ? [{ ...entry, ...image }] : []
  })
  const filteredReviews = useMemo(() => [...localReviews, ...data.reviews].filter(review =>
    (tab !== 'photo' || review.photo) && (!filters.age || review.age === filters.age) &&
    (!filters.skinType || review.skinType === filters.skinType) && (!filters.concern || review.concern === filters.concern)
  ).sort((a, b) => (filters.sort === 'high' ? b.rating - a.rating : filters.sort === 'low' ? a.rating - b.rating : 0) || b.date.localeCompare(a.date)), [localReviews, data.reviews, tab, filters])
  const pageCount = Math.ceil(filteredReviews.length / PAGE_SIZE)
  const currentPage = Math.min(page, Math.max(1, pageCount))
  const submitReview = ({ rating, body, photos }) => {
    setLocalReviews(current => [{ id: crypto.randomUUID(), productId: data.productId, nickname: '온결회원', title: body.split('\n')[0].slice(0, 40), body, rating, photos, photo: photos[0], date: new Date().toLocaleDateString('sv-SE'), skinType: '미입력', concernLabel: '미입력', age: '미입력' }, ...current])
    setTab('all'); setFilters({ age: '', skinType: '', concern: '', sort: 'latest' }); setPage(1)
  }
  const openPhoto = nextPhoto => { setPhoto(nextPhoto); requestAnimationFrame(() => photoDialogRef.current?.showModal()) }
  const updateFilter = (key, value) => { setFilters(current => ({ ...current, [key]: value })); setPage(1) }
  const selectTab = next => { setTab(next); setPage(1) }
  const turnPage = next => { setPage(next); listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const options = values => [{ label: '전체', value: '' }, ...values.map(value => ({ label: value, value }))]

  return <main className="review-page" aria-label={`${data.productName} 리뷰`}>
    <div className="review-container">
      <div className="review-section-heading"><h1><span className="review-heading-desktop-label">고객 리뷰</span><span className="review-mobile-only">리뷰</span><span>({data.totalReviews})</span></h1><span className="review-mobile-only review-mobile-rating" aria-label={`평점 ${data.rating}점`}><img src={mobileRatingStar} alt="" />{data.totalReviews ? data.rating.toFixed(1) : '—'}</span><button className="review-outline-button" type="button" onClick={() => { setPhoto(null); requestAnimationFrame(() => dialogRef.current.showModal()) }}>리뷰 작성</button></div>
      <ReviewSummary data={data} onPhoto={openPhoto} />
      <div className="review-body">
        <section className="review-photo-section" aria-labelledby="review-photo-heading">
          <div className="review-section-heading"><h2 id="review-photo-heading">포토 리뷰 <span>({data.photoReviewCount})</span></h2><Link className="review-view-all" to="photos" style={{ textDecoration: 'none', color: 'inherit' }}>전체보기<img src={rightIcon} alt="" /></Link></div>
          <div className="review-photo-strip">{previewPhotos.slice(0, 6).map(item => <button key={item.id} type="button" onClick={() => openPhoto(item)}><img src={item.src} alt={item.alt} /></button>)}</div>
        </section>
        <div className="review-tabs" aria-label="리뷰 종류">{[['all', '전체리뷰'], ['photo', '포토리뷰']].map(([value, label]) => <button key={value} type="button" aria-pressed={tab === value} onClick={() => selectTab(value)}>{label}</button>)}</div>
        <div className="review-filters">
          <Dropdown kind="age" label="연령대" value={filters.age} options={options(['10대', '20대', '30대', '40대', '50대 이상'])} onChange={value => updateFilter('age', value)} />
          <div className="review-filter-row review-filter-row--secondary">
            <Dropdown kind="skin" label="피부타입별" mobileLabel="피부타입" value={filters.skinType} options={options(['건성', '지성', '수부지', '복합성', '민감성'])} onChange={value => updateFilter('skinType', value)} />
            <Dropdown kind="concern" label="피부고민별" mobileLabel="피부고민" value={filters.concern} options={[{ label: '전체', value: '' }, ...skinConcerns.map(item => ({ value: item.id, label: concernLabel(item.id) }))]} onChange={value => updateFilter('concern', value)} />
          </div>
          <div className="review-filter-row review-filter-row--primary">
            <Dropdown kind="sort" label="정렬" value={filters.sort} options={[{ value: 'latest', label: '최신순' }, { value: 'high', label: '별점 높은순' }, { value: 'low', label: '별점 낮은순' }]} onChange={value => updateFilter('sort', value)} />
            <button className="review-mobile-only review-mobile-photo-filter" type="button" aria-pressed={tab === 'photo'} onClick={() => selectTab(tab === 'photo' ? 'all' : 'photo')}>포토리뷰</button>
          </div>
        </div>
        <section className="review-list" ref={listRef} aria-label="고객 리뷰 목록" aria-live="polite">
          {filteredReviews.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map(review => <ReviewItem key={review.id} review={review} helpful={helpfulIds.has(review.id)} onHelpful={() => setHelpfulIds(current => { const next = new Set(current); if (next.has(review.id)) next.delete(review.id); else next.add(review.id); return next })} onPhoto={openPhoto} />)}
          {!filteredReviews.length && <p className="review-empty">{data.reviews.length || localReviews.length ? '선택한 조건에 맞는 리뷰가 없습니다.' : `${data.productName}의 리뷰가 아직 등록되지 않았습니다.`}</p>}
        </section>
      </div>
      {pageCount > 0 && <div className="reviews-page-navigation"><Pagination currentPage={currentPage} totalPages={pageCount} onPageChange={turnPage} label="리뷰 페이지" /></div>}
    </div>
    <ReviewDialog dialogRef={dialogRef} productId={data.productId} onSubmit={submitReview} />
    <PhotoReviewDialog key={`${selectedPhotoReview?.reviewId}:${photo?.src}`} dialogRef={photoDialogRef} selectedPhoto={selectedPhotoReview && { ...selectedPhotoReview, src: photo.src }} selectedReview={selectedReview} />
  </main>
}

export default function ReviewRoute() {
  const { productId } = useParams()
  const data = reviewPages[productId]
  return data ? <Review key={productId} data={data} /> : <main className="review-page review-unavailable"><h1>아직 등록된 리뷰 페이지가 없습니다.</h1><Link to="/products">상품 보러가기</Link></main>
}
