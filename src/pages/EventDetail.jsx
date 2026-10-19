import { Link } from 'react-router-dom'
import './EventDetail.css'

export default function EventDetail({ title, status = '상시 이벤트', detailImage, imageAlt = title }) {
  return <main className="event-detail-page"><div className="event-detail-inner">
    <h1 className="event-detail-page-title">이벤트</h1>
    <div className="event-detail-tabs" aria-label="이벤트 분류">
      <Link className="event-detail-tab-active" to="/event?tab=ongoing">진행중 이벤트</Link>
      <span className="event-detail-tab-divider" aria-hidden="true" />
      <Link to="/event?tab=sale">세일상품</Link>
    </div>
    <div className="event-detail-title-area">
      <div className="event-detail-title-copy">
        <h2 className="event-detail-title">{title}</h2>
        <p className="event-detail-status">{status}</p>
      </div>
      <Link className="event-detail-previous-link" to="/event?tab=ongoing">이전으로</Link>
    </div>
    <div className="event-detail-content">
      <img className="event-detail-image" src={detailImage} alt={imageAlt} />
    </div>
    <div className="event-detail-actions">
      <Link className="event-detail-back-link" to="/event?tab=ongoing">목록으로</Link>
    </div>
  </div></main>
}
