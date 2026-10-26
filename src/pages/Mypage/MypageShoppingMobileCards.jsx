import chevron from './mobile-shopping-chevron-right.svg'
import './MypageShoppingMobile.css'

// Presentation only: use the caller's records, never seed customer data or
// simulate order, cancellation, refund, tracking, or review operations.
export default function MypageShoppingMobileCards({ records, variant }) {
  return (
    <div className="mp-shopping-mobile-cards" role="list" aria-label="테스트 쇼핑 내역">
      {records.map(record => {
        const action = variant === 'refunds' ? '신청취소하기' : variant === 'returns' ? '신청취소'
          : record.status === '배송완료' ? '리뷰쓰기' : record.status === '배송중' ? '배송조회' : null
        const description = record.description || (variant === 'refunds' && record.status === '신청'
          ? '고객님의 환불 신청이 접수되었습니다.\n처리 후 안내 드리겠습니다.' : '')
        return (
          <article className="mp-shopping-mobile-card" role="listitem" key={record.id} data-shopping-record={record.id}>
            <div className="mp-shopping-mobile-order-number">
              <div><span>{record.requestedOn}</span><span>[테스트] {record.id}</span></div>
              <img src={chevron} alt="" />
            </div>
            <div className="mp-shopping-mobile-product">
              <div className="mp-shopping-mobile-placeholder" aria-hidden="true" />
              <div className="mp-shopping-mobile-product-copy">
                <div><p>[테스트] {record.productName}</p><p className="mp-shopping-mobile-option">{record.option}</p></div>
                <div className="mp-shopping-mobile-price"><span>{record.amount.toLocaleString('ko-KR')}원</span><span>{record.quantity}개</span></div>
              </div>
            </div>
            <div className="mp-shopping-mobile-status">
              <div>
                <p>[테스트] {record.kind} {record.status}</p>
                {variant === 'refunds' && <p className="mp-shopping-mobile-note">{record.requestedOn}</p>}
                {description && <p className="mp-shopping-mobile-note">{description}</p>}
              </div>
              {action && <button type="button" disabled><span className="mp-button-label"><span className="mp-button-text">{action}</span></span></button>}
            </div>
          </article>
        )
      })}
    </div>
  )
}
