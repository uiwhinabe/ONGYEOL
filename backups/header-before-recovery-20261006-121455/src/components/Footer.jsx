import './Footer.css'
import instagram from '../assets/footer/instagram.svg'
import instagramMobile from '../assets/footer/instagram-mobile.svg'
import kakaotalk from '../assets/footer/kakaotalk.svg'
import down from '../assets/footer/down.svg'

const companyDetails = [
  ['상호명', '주식회사 온결 (ONGYEOL Co., Ltd.)'],
  ['대표', '김온결'],
  ['주소', '서울특별시 성동구 성수이로 00길 00, 온결빌딩 3층'],
  ['이메일', '(Korea) business@ongyeol.com'],
  ['사업자등록번호', '000-00-00000'],
  ['통신판매업신고', '2026-서울성동-0000'],
  ['개인정보관리책임', '@@@'],
  ['호스팅제공', '카페24(주)'],
]

export default function Footer() {
  return (
    <footer className="ongyeol-footer" aria-label="온결 사이트 정보">
      <div className="ongyeol-footer-content">
        <div className="ongyeol-footer-brand">
          <p className="ongyeol-footer-logo" aria-label="온결">ONGYEOL</p>
          <dl className="ongyeol-footer-company">
            {companyDetails.map(([label, value]) => (
              <div className="ongyeol-footer-company-row" key={label}>
                <dt className="ongyeol-footer-company-label">{label}</dt>
                <dd className="ongyeol-footer-company-value">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="ongyeol-footer-middle">
          <section className="ongyeol-footer-social" aria-label="소셜 미디어">
            <h2 className="ongyeol-footer-social-title"><span className="ongyeol-footer-social-small-caps">social media</span></h2>
            <div className="ongyeol-footer-social-icons">
              <button className="ongyeol-footer-social-button" type="button" aria-label="온결 인스타그램">
                <picture className="ongyeol-footer-icon">
                  <source media="(max-width: 699px)" srcSet={instagramMobile} />
                  <img className="ongyeol-footer-icon" src={instagram} alt="" />
                </picture>
              </button>
              <button className="ongyeol-footer-social-button" type="button" aria-label="온결 카카오톡">
                <img className="ongyeol-footer-icon" src={kakaotalk} alt="" />
              </button>
            </div>
          </section>
          <section className="ongyeol-footer-service" aria-label="고객센터">
            <h2 className="ongyeol-footer-service-title">고객센터</h2>
            <div className="ongyeol-footer-service-details">
              <p className="ongyeol-footer-phone">070-0001-0002</p>
              <p className="ongyeol-footer-hours"><span>OPEN</span><span>10:00 am ~ 17:00 pm</span></p>
              <p className="ongyeol-footer-holiday">주말 및 공휴일 휴무</p>
            </div>
          </section>
        </div>
        <section className="ongyeol-footer-join" aria-label="회원가입 혜택">
          <h2 className="ongyeol-footer-join-title">Join us</h2>
          <div className="ongyeol-footer-join-content">
            <p className="ongyeol-footer-join-description">온결 자사몰 회원 가입시<br />1만원 쿠폰팩 즉시 증정</p>
            <button className="ongyeol-footer-join-button" type="button">카카오톡 1초 회원가입</button>
          </div>
        </section>
        <button className="ongyeol-footer-business-button" type="button" aria-label="온결 사업자 정보">
          <span className="ongyeol-footer-business-label">온결 사업자 정보</span>
          <img className="ongyeol-footer-icon" src={down} alt="" />
        </button>
      </div>
      <div className="ongyeol-footer-copyright">
        <p className="ongyeol-footer-copyright-text">Copyright © 2026 ONGYEOL Co., Ltd. All rights reserved.</p>
      </div>
    </footer>
  )
}
