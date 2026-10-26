import { useAuth } from '../components/authContext.js'
import presentIcon from '../assets/signup-complete/present.svg'
import './SignupComplete.css'
import './AuthFonts.css'

export default function SignupComplete() {
  const { completeSignup } = useAuth()
  return (
    <main className="ongyeol-signup-complete" aria-labelledby="signup-complete-title">
      <section className="ongyeol-signup-complete-panel">
        <h1 id="signup-complete-title" className="ongyeol-signup-complete-title">@@@님, 반갑습니다.</h1>
        <div className="ongyeol-signup-complete-content">
          <p className="ongyeol-signup-complete-description">
            회원가입이 완료되었습니다.<br />
            지금부터 온결의 다양한 제품과 회원 혜택을 만나보세요
          </p>
          <div className="ongyeol-signup-complete-coupon">
            <img className="ongyeol-signup-complete-present" src={presentIcon} alt="" width="32" height="32" />
            <p>신규 회원가입 축하 쿠폰이 발급되었습니다.</p>
          </div>
          <div className="ongyeol-signup-complete-actions">
            <button className="ongyeol-signup-complete-button ongyeol-signup-complete-home" type="button" onClick={completeSignup}>홈으로 돌아가기</button>
            <button className="ongyeol-signup-complete-button ongyeol-signup-complete-coupon-button" type="button" disabled title="쿠폰함은 준비 중입니다">쿠폰함 보러가기</button>
          </div>
        </div>
      </section>
    </main>
  )
}
