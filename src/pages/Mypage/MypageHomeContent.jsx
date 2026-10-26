import { DEFAULT_USER_NAME } from './mypageUser.js'
import summaryLine from '../../assets/mypage/summary-line.svg'
import tabletSummaryLine from './tablet-summary-line.svg'
import arrow from '../../assets/mypage/arrow.svg'
import tableTop from '../../assets/mypage/table-top.svg'
import tableBottom from '../../assets/mypage/table-bottom.svg'
import './Mypage.css'
import './MypageLayout.css'
import './MypageMobile.css'

const stages = ['주문접수', '결제완료', '상품준비중', '배송중', '배송완료']
const arrows = [arrow, arrow, arrow, arrow]

// The application shell can reuse the body without duplicating Header/Footer.
export function MypageContent() {
  return (
          <div className="ongyeol-mypage-content">
            <section className="ongyeol-mypage-summary" aria-label="회원등급 및 혜택">
              <p className="mp-hub-mobile-greeting">{DEFAULT_USER_NAME}님은 Welcome등급 입니다.</p>
              <p className="ongyeol-mypage-greeting">{DEFAULT_USER_NAME}님의 <span>회원등급은</span> Welcome등급 <span>입니다</span>.</p>
              <div className="ongyeol-mypage-benefits">
                <span className="mp-hub-grade"><h2>등급</h2><p>Welcome</p></span>
                <span className="mp-hub-divider"><img src={tabletSummaryLine} alt="" /></span>
                <div><h2>쿠폰</h2><p>1장</p></div>
                <span className="ongyeol-mypage-summary-divider"><img src={summaryLine} alt="" /><img className="mp-hub-line" src={tabletSummaryLine} alt="" /></span>
                <div><h2>주문현황</h2><p>배송중 0건</p></div>
                <span className="ongyeol-mypage-summary-divider"><img src={summaryLine} alt="" /><img className="mp-hub-line" src={tabletSummaryLine} alt="" /></span>
                <div><h2>찜한 제품</h2><p>0개</p></div>
              </div>
            </section>
            <section className="mp-home-order-status" aria-labelledby="mypage-order-status">
              <div className="ongyeol-mypage-section-heading"><h2 id="mypage-order-status">나의 주문 처리 현황</h2><p>(최근 3개월 기준)</p></div>
              <div className="ongyeol-mypage-status">
                <div className="ongyeol-mypage-stages">
                  {stages.map((stage, index) => (
                    <div className={`ongyeol-mypage-stage stage-${index}`} key={stage}>
                      <div className="ongyeol-mypage-stage-value"><span>0</span><p>{stage}</p></div>
                      {arrows[index] && <img src={arrows[index]} alt="" />}
                    </div>
                  ))}
                </div>
                <div className="ongyeol-mypage-returns">{['취소', '교환', '반품'].map(label => <p key={label}>{label} : 0</p>)}</div>
              </div>
            </section>
            <section className="ongyeol-mypage-recent" aria-labelledby="mypage-recent-orders">
              <div className="ongyeol-mypage-section-heading"><h2 id="mypage-recent-orders">최근 주문 정보</h2><p>(최근 3개월 기준)</p></div>
              <table>
                <colgroup><col /><col /><col /><col /><col /></colgroup>
                <thead><tr>{['날짜/주문번호', '상품명/옵션', '상품금액/수량', '주문상태', '리뷰'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
                <tbody><tr><td colSpan="5">조회 내역이 없습니다.</td></tr></tbody>
              </table>
              <img className="ongyeol-mypage-table-top" src={tableTop} alt="" />
              <img className="ongyeol-mypage-table-bottom" src={tableBottom} alt="" />
            </section>
          </div>
  )
}

