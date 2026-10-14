import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import MypageSidebar from './MypageSidebar.jsx'
import summaryLine from '../assets/mypage/summary-line.svg'
import arrow from '../assets/mypage/arrow.svg'
import paymentArrow from '../assets/mypage/arrow-payment.svg'
import preparingArrow from '../assets/mypage/arrow-preparing.svg'
import tableTop from '../assets/mypage/table-top.svg'
import tableBottom from '../assets/mypage/table-bottom.svg'
import chatLogo from '../assets/images/chat/ongyeol-logo.png'
import './Mypage.css'

const stages = ['주문접수', '결제완료', '상품준비중', '배송중', '배송완료']
const arrows = [arrow, paymentArrow, preparingArrow, arrow]

// The application shell can reuse the body without duplicating Header/Footer.
export function MypageContent() {
  return (
    <main className="ongyeol-mypage" data-node-id="2275:23333">
      <div className="ongyeol-mypage-inner">
        <h1>MY PAGE</h1>
        <div className="ongyeol-mypage-columns">
          <MypageSidebar />
          <div className="ongyeol-mypage-content">
            <section className="ongyeol-mypage-summary" aria-label="회원등급 및 혜택">
              <p className="ongyeol-mypage-greeting">이다빈님의 <span>회원등급은</span> Welcome등급 <span>입니다</span>.</p>
              <div className="ongyeol-mypage-benefits">
                <div><h2>쿠폰</h2><p>1장</p></div>
                <span className="ongyeol-mypage-summary-divider"><img src={summaryLine} alt="" /></span>
                <div><h2>주문현황</h2><p>배송중 1건</p></div>
                <span className="ongyeol-mypage-summary-divider"><img src={summaryLine} alt="" /></span>
                <div><h2>찜한 제품</h2><p>3개</p></div>
              </div>
            </section>
            <section aria-labelledby="mypage-order-status">
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
        </div>
      </div>
      <button className="ongyeol-mypage-chat" type="button" aria-label="AI 상담"><span><img src={chatLogo} alt="" /></span></button>
    </main>
  )
}

export default function MypageDesktop() {
  return <><Header /><MypageContent /><Footer /></>
}
