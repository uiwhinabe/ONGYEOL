import { useEffect, useRef, useState } from 'react'
import { skinConcerns } from '../skinGuideConcernData.js'
import './PhotoReviews.css'

export default function PhotoReviewDialog({ dialogRef, selectedPhoto, photoReviews }) {
  const initialIndex = Math.max(0, photoReviews.findIndex(photo => photo.reviewId === selectedPhoto?.reviewId))
  const [reviewIndex, setReviewIndex] = useState(initialIndex)
  const [transition, setTransition] = useState(null)
  const moving = useRef(false)
  useEffect(() => {
    if (!transition) return
    // Also unlock if animationend is skipped when the dialog or tab is hidden.
    const timer = window.setTimeout(() => { moving.current = false; setTransition(null) }, 450)
    return () => window.clearTimeout(timer)
  }, [transition])
  const move = direction => {
    const next = reviewIndex + direction
    if (moving.current || next < 0 || next >= photoReviews.length) return
    moving.current = true
    setTransition({ from: reviewIndex, to: next, direction: direction > 0 ? 'next' : 'previous' })
    setReviewIndex(next)
  }
  const renderReview = (index, animation = '') => {
    const entry = photoReviews[index]
    const review = entry?.review
    if (!entry || !review) return null
    const photo = entry.photos.find(item => item.src === (entry.reviewId === selectedPhoto?.reviewId ? selectedPhoto.src : entry.src)) ?? entry.photos[0]
    return <PhotoReviewContent key={entry.reviewId} entry={entry} review={review} photo={photo} animation={animation}
      onAnimationEnd={event => {
        if (event.target !== event.currentTarget || !animation.startsWith('enter-')) return
        moving.current = false
        setTransition(null)
      }} />
  }
  return (
    <dialog className="photo-reviews-dialog" ref={dialogRef} aria-label="포토리뷰 상세" onClose={() => {
      moving.current = false
      setTransition(null)
      setReviewIndex(initialIndex)
    }} onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        move(event.key === 'ArrowRight' ? 1 : -1)
      }
    }} onClick={event => {
      if (event.target === event.currentTarget) event.currentTarget.close()
    }}>
      <form method="dialog"><button aria-label="닫기">×</button></form>
      {selectedPhoto && photoReviews.length > 0 && <>
        <div className="photo-review-detail__viewport" aria-busy={Boolean(transition)}>
          {transition ? <>
            {renderReview(transition.from, `leave-${transition.direction}`)}
            {renderReview(transition.to, `enter-${transition.direction}`)}
          </> : renderReview(reviewIndex)}
        </div>
        <nav className="photo-review-detail__navigation" aria-label="포토리뷰 탐색">
          <button type="button" aria-label="이전 리뷰" disabled={reviewIndex === 0} onClick={() => move(-1)}><ReviewArrow /></button>
          <span aria-live="polite" aria-atomic="true">{reviewIndex + 1}</span>
          <button type="button" aria-label="다음 리뷰" disabled={reviewIndex === photoReviews.length - 1} onClick={() => move(1)}><ReviewArrow next /></button>
        </nav>
      </>}
    </dialog>
  )
}

function ReviewArrow({ next = false }) {
  return <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true" style={next ? { transform: 'rotate(180deg)' } : undefined}>
    <path d="M11 3 4 10l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

function PhotoReviewContent({ entry, review: selectedReview, photo, animation, onAnimationEnd }) {
  return <div className={`photo-review-detail${animation ? ` photo-review-detail--${animation}` : ''}`} data-review-id={entry.reviewId}
    aria-hidden={animation.startsWith('leave-') || undefined} inert={animation.startsWith('leave-')} onAnimationEnd={onAnimationEnd}>
        <div className="photo-review-detail__media">
          <img src={photo.src} alt={photo.alt} />
        </div>
        <article className="photo-review-detail__content">
          <div className="photo-review-detail__author"><strong>{selectedReview.nickname}</strong><time dateTime={selectedReview.date}>{selectedReview.date.replaceAll('-', '.')}</time></div>
          <div className="photo-review-detail__stars" role="img" aria-label={`별점 ${selectedReview.rating}점`}>
            <span aria-hidden="true">{'★'.repeat(selectedReview.rating)}{'☆'.repeat(5 - selectedReview.rating)}</span>
          </div>
          <div className="photo-review-detail__tags">{[
            selectedReview.skinType,
            selectedReview.concernLabel ?? skinConcerns.find(concern => concern.id === selectedReview.concern)?.label.replaceAll(' / ', '•') ?? selectedReview.concern,
            selectedReview.age,
          ].filter(Boolean).map((tag, index) => <span key={index}>{tag}</span>)}</div>
          <h2>{selectedReview.title}</h2>
          <p>{selectedReview.body}</p>
        </article>
      </div>
}
