import { Link } from 'react-router-dom'
import { reviewPages } from '../../pages/Review/reviewData.js'
import starsIcon from '../../assets/reviews/stars.svg'
import starIcon from '../../assets/reviews/star.svg'
import './ProductReviewSummary.css'

export default function ProductReviewSummary({ productId }) {
  const data = reviewPages[productId]
  if (!data) return null
  const ratingCount = Object.values(data.ratingDistribution).reduce((sum, count) => sum + count, 0)
  const reviewHref = `/review/${encodeURIComponent(productId)}`

  return <div className="product-review-summary">
    <div className="product-review-summary__heading">
      <h2>고객 리뷰 <span>({data.totalReviews})</span></h2>
      <Link to={reviewHref}>리뷰 자세히보기</Link>
    </div>
    <div className="product-review-summary__content">
      <div className="product-review-summary__score">
        <strong>{data.reviewCount ? data.rating.toFixed(1) : '—'}</strong>
        {data.reviewCount > 0 && <img src={starsIcon} alt={`평점 ${data.rating}점`} />}
      </div>
      <dl className="product-review-summary__stats">
        {[["리뷰등록", data.reviewCount], ["포토리뷰", data.photoReviewCount], ["상품조회수", data.viewCount]].map(([label, count]) => <div key={label}><dt>{label}</dt><dd>{count}건</dd></div>)}
      </dl>
      <div className="product-review-summary__ratings">
        <h3>세부평가</h3>
        {[5, 4, 3, 2, 1].map(rating => <div className="product-review-summary__rating" key={rating}>
          <span><img src={starIcon} alt="" />{rating}</span>
          <div className="product-review-summary__bar" role="meter" aria-label={`${rating}점 리뷰 수`} aria-valuemin={0} aria-valuemax={Math.max(1, ratingCount)} aria-valuenow={data.ratingDistribution[rating]}><span style={{ width: `${ratingCount ? data.ratingDistribution[rating] / ratingCount * 100 : 0}%` }} /></div>
          <span>{data.ratingDistribution[rating]}</span>
        </div>)}
      </div>
      <div className="product-review-summary__photos">
        <h3>포토리뷰 모아보기</h3>
        <div>{(data.summaryPhotos ?? data.photoReviews).slice(0, 4).map(photo => <Link key={photo.id} to={reviewHref} aria-label={`${photo.alt} 자세히보기`}><img src={photo.src} alt={photo.alt} /></Link>)}</div>
        {!data.photoReviews.length && <p>등록된 포토리뷰가 없습니다.</p>}
      </div>
    </div>
  </div>
}
