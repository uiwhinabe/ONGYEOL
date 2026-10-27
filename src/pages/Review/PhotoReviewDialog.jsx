import { useState } from 'react'
import { skinConcerns } from '../skinGuideConcernData.js'
import './PhotoReviews.css'

export default function PhotoReviewDialog({ dialogRef, selectedPhoto, selectedReview }) {
  const [photoIndex, setPhotoIndex] = useState(() => Math.max(0, selectedPhoto?.photos.findIndex(photo => photo.src === selectedPhoto.src) ?? 0))
  return (
    <dialog className="photo-reviews-dialog" ref={dialogRef} aria-label="포토리뷰 상세" onClose={() => setPhotoIndex(Math.max(0, selectedPhoto?.photos.findIndex(photo => photo.src === selectedPhoto.src) ?? 0))} onClick={event => {
      if (event.target === event.currentTarget) event.currentTarget.close()
    }}>
      <form method="dialog"><button aria-label="닫기">×</button></form>
      {selectedPhoto && selectedReview && <div className="photo-review-detail">
        <div className="photo-review-detail__media">
          <img src={selectedPhoto.photos[photoIndex].src} alt={selectedPhoto.photos[photoIndex].alt} />
      {selectedPhoto.photos.length > 1 && <nav className="photo-review-detail__navigation" aria-label="리뷰 사진 탐색">
        <button type="button" aria-label="이전 사진" disabled={photoIndex === 0} onClick={() => setPhotoIndex(index => index - 1)}>‹</button>
        <span aria-live="polite">{photoIndex + 1} / {selectedPhoto.photos.length}</span>
        <button type="button" aria-label="다음 사진" disabled={photoIndex === selectedPhoto.photos.length - 1} onClick={() => setPhotoIndex(index => index + 1)}>›</button>
      </nav>}
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
      </div>}
    </dialog>
  )
}
