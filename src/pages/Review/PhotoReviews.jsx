import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { reviewPages } from './reviewData.js'
import { getPhotoReviews } from './reviewPhotos.js'
import PhotoReviewDialog from './PhotoReviewDialog.jsx'
import './Review.css'
import './PhotoReviews.css'

export default function PhotoReviews() {
  const { productId } = useParams()
  const data = reviewPages[productId]
  const dialogRef = useRef(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  if (!data) return <main className="review-page review-unavailable"><h1>아직 등록된 리뷰 페이지가 없습니다.</h1><Link to="/products">상품 보러가기</Link></main>

  const photoReviews = getPhotoReviews(data.reviews)
  const selectedReview = selectedPhoto && data.reviews.find(review => review.id === selectedPhoto.reviewId)
  const openPhoto = photo => {
    setSelectedPhoto(photo)
    requestAnimationFrame(() => dialogRef.current.showModal())
  }

  return <main className="review-page photo-reviews-page" aria-label={`${data.productName} 포토리뷰`}>
    <div className="review-container">
      <div className="photo-reviews-heading">
        <h1>포토리뷰 <span>({data.photoReviewCount})</span></h1>
        <Link to=".." relative="path">리뷰로 돌아가기</Link>
      </div>
      <p className="photo-reviews-product">{data.productName}</p>
      {photoReviews.length ? <div className="photo-reviews-grid" aria-label="포토리뷰 사진 모음">
        {photoReviews.map(photo => <button type="button" key={photo.reviewId} onClick={() => openPhoto(photo)} aria-label={`${photo.alt} 리뷰 자세히보기`}>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </button>)}
      </div> : <p className="photo-reviews-empty">등록된 포토리뷰가 없습니다.</p>}
    </div>
    <PhotoReviewDialog key={`${selectedPhoto?.reviewId}:${selectedPhoto?.src}`} dialogRef={dialogRef} selectedPhoto={selectedPhoto} selectedReview={selectedReview} />
  </main>
}
