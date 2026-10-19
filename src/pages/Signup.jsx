import { useLayoutEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Signup.css'

const agreements = [
  '(필수) 이용약관에 동의합니다.',
  '(필수) 만 14세 이상입니다.',
  '(필수) 개인정보 수집·이용에 동의합니다.',
  '(선택) 마케팅 목적의 개인정보 수집·이용에 동의합니다.',
  'SMS 수신', '이메일 수신', '카카오톡 알림 수신',
]

function SignupPasswordInput({ label, ...inputProps }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="ongyeol-signup-password-input">
      <input {...inputProps} type={visible ? 'text' : 'password'} />
      <button type="button" className="ongyeol-signup-password-toggle"
        aria-label={`${label} ${visible ? '숨기기' : '표시'}`} aria-pressed={visible}
        aria-controls={inputProps.id} onClick={() => setVisible((value) => !value)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{!visible && <path d="m3 21 18-18" />}</svg>
      </button>
    </div>
  )
}

export default function Signup() {
  const location = useLocation()
  return <SignupForm key={location.key} />
}

function SignupForm() {
  const [checked, setChecked] = useState(agreements.map(() => false))
  const [gender, setGender] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [agreementError, setAgreementError] = useState(false)
  const navigate = useNavigate()
  const allChecked = checked.every(Boolean)
  const requiredAgreed = agreements.every((label, index) => !label.startsWith('(필수)') || checked[index])
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const submit = (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const nextErrors = {}
    const name = values.get('name')
    const email = values.get('email')
    const password = values.get('password')
    const confirm = values.get('passwordConfirm')
    if (!name?.trim()) nextErrors.name = '이름을 입력해 주세요.'
    else if (name !== '신짱구') nextErrors.name = '가상 가입 이름 신짱구를 입력해 주세요.'
    if (!email) nextErrors.email = '이메일을 입력해 주세요.'
    else if (email !== 'test@gmail.com') nextErrors.email = 'test@gmail.com을 입력해 주세요.'
    if (!password) nextErrors.password = '비밀번호를 입력해 주세요.'
    else if (password !== '1234!') nextErrors.password = '가상 가입 비밀번호 1234!를 입력해 주세요.'
    if (!confirm) nextErrors.passwordConfirm = '비밀번호 확인을 입력해 주세요.'
    else if (confirm !== password) nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    if (!gender) nextErrors.gender = '성별을 선택해 주세요.'
    else if (gender !== 'female') nextErrors.gender = '가상 가입 성별은 여성으로 선택해 주세요.'
    setErrors(nextErrors)
    setAgreementError(!requiredAgreed)
    setMessage('')
    if (Object.keys(nextErrors).length === 0 && requiredAgreed) navigate('/signup/complete')
  }

  const fieldError = (name) => errors[name]
    ? <p id={`signup-${name}-error`} className="ongyeol-signup-field-error" role="alert">{errors[name]}</p>
    : null
  const errorAttributes = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `signup-${name}-error` : undefined,
  })

  return (
    <main className="ongyeol-signup" aria-label="회원가입">
      <form className="ongyeol-signup-form" noValidate autoComplete="off" onSubmit={submit}>
        <nav className="ongyeol-signup-tabs" aria-label="회원 페이지">
          <Link to="/login">로그인</Link>
          <Link to="/signup" aria-current="page">회원가입</Link>
        </nav>
        <div className="ongyeol-signup-fields">
          <div className="ongyeol-signup-field">
            <label htmlFor="signup-name">이름</label>
            <input id="signup-name" name="name" type="text" autoComplete="off" placeholder="신짱구 입력" required {...errorAttributes('name')} />
            {fieldError('name')}
          </div>
          <div className="ongyeol-signup-field">
            <label htmlFor="signup-email">아이디(이메일)</label>
            <input id="signup-email" name="email" type="email" autoComplete="off" placeholder="test@gmail.com 입력" required {...errorAttributes('email')} />
            {fieldError('email')}
          </div>
          <div className="ongyeol-signup-field">
            <label htmlFor="signup-password">비밀번호</label>
            <SignupPasswordInput label="비밀번호" id="signup-password" name="password" autoComplete="new-password" placeholder="1234! 입력" required {...errorAttributes('password')} />
            {fieldError('password')}
          </div>
          <div className="ongyeol-signup-field">
            <label htmlFor="signup-password-confirm">비밀번호 확인</label>
            <SignupPasswordInput label="비밀번호 확인" id="signup-password-confirm" name="passwordConfirm" autoComplete="new-password" placeholder="1234!를 한번 더 입력" required {...errorAttributes('passwordConfirm')} />
            {fieldError('passwordConfirm')}
          </div>
          <div className="ongyeol-signup-field">
            <label htmlFor="signup-gender">성별</label>
            <select id="signup-gender" name="gender" value={gender} required {...errorAttributes('gender')} className={gender ? '' : 'ongyeol-signup-placeholder'} onChange={(event) => setGender(event.target.value)}>
              <option value="" disabled>성별을 선택해주세요.</option>
              <option value="female">여성</option><option value="male">남성</option><option value="unspecified">선택 안 함</option>
            </select>
            {fieldError('gender')}
          </div>
          <div className="ongyeol-signup-field">
            <label htmlFor="signup-code">코드 번호 (3000원 혜택)</label>
            <div className="ongyeol-signup-code-row">
              <input id="signup-code" name="code" type="text" placeholder="코드 번호 입력" />
              <button type="button" onClick={() => setMessage('코드 인증 서비스는 준비 중입니다. 인증이나 포인트 지급은 처리되지 않습니다.')}>입력</button>
            </div>
          </div>
        </div>
        <div className="ongyeol-signup-information">
          <section className="ongyeol-signup-benefits" aria-labelledby="signup-benefits-title">
            <h2 id="signup-benefits-title">회원가입 혜택 안내</h2>
            <ul>
              <li>온결 카카오톡 플러스친구 채널을 추가하고, 온결이 보내드린 메시지 속 인증 코드를 확인해 주세요.</li>
              <li>인증 코드를 입력하고 가입하면 즉시 사용할 수 있는 3,000포인트를 드립니다.</li>
              <li>포인트 내역은 마이페이지 &gt; 포인트에서 확인해 주세요.</li>
            </ul>
          </section>
          <fieldset className="ongyeol-signup-agreements" aria-describedby="signup-agreement-error">
            <legend>약관 동의</legend>
            <div className="ongyeol-signup-checks">
              <label><input type="checkbox" checked={allChecked} onChange={(event) => setChecked(agreements.map(() => event.target.checked))} /> 모두 동의합니다.</label>
              {agreements.map((label, index) => (
                <label key={label}><input type="checkbox" name={`agreement-${index}`} required={label.startsWith('(필수)')} checked={checked[index]} onChange={(event) => setChecked((previous) => previous.map((value, item) => item === index ? event.target.checked : value))} /> {label}</label>
              ))}
            </div>
            <p id="signup-agreement-error" className="ongyeol-signup-agreement-error" role="status" aria-atomic="true">
              {agreementError && !requiredAgreed ? '*필수 약관에 모두 동의해 주세요.' : ''}
            </p>
          </fieldset>
        </div>
        <div className="ongyeol-signup-submit-area">
          <button className="ongyeol-signup-submit" type="submit">가입하기</button>
          <p className="ongyeol-signup-status" role="status" aria-atomic="true">{message}</p>
        </div>
      </form>
    </main>
  )
}
