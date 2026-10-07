import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { authenticateLogin } from '../services/login.js'
import { useAuth } from '../components/authContext.js'
import './Login.css'
function FieldError({ id, message }) {
  return <div id={id} className="ongyeol-login-error" aria-live="polite" aria-atomic="true">{message && <><svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><circle cx="5.5" cy="5.5" r="5" stroke="currentColor" /><path d="M5.5 2.5v3.5" stroke="currentColor" /><circle cx="5.5" cy="8" r=".6" fill="currentColor" /></svg><span>{message}</span></>}</div>
}
export default function Login() {
  const { completeLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [pending, setPending] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const revision = useRef(0)
  const submitting = useRef(false)
  const edit = (field, value) => {
    revision.current += 1
    if (field === 'email') setEmail(value)
    else setPassword(value)
    setErrors((previous) => ({ ...previous, [field]: undefined }))
    setFormError('')
  }
  const submit = async (event) => {
    event.preventDefault()
    if (submitting.current) return
    setFormError('')
    if (!email.trim()) {
      setErrors({ email: '아이디를 입력해 주세요.' })
      emailRef.current?.focus()
      return
    }
    if (password === '') {
      setErrors({ password: '비밀번호를 입력해주세요.' })
      passwordRef.current?.focus()
      return
    }
    setErrors({})
    submitting.current = true
    setPending(true)
    const submittedRevision = revision.current
    try {
      const result = await authenticateLogin({ email: email.trim(), password })
      if (submittedRevision !== revision.current) return
      if (result.status === 'success') completeLogin()
      else if (result.status === 'id-mismatch') {
        setErrors({ email: '아이디를 다시 확인해주세요.' })
        emailRef.current?.focus()
      } else if (result.status === 'password-mismatch') {
        setErrors({ password: '비밀번호를 다시 확인해주세요.' })
        passwordRef.current?.focus()
      }
      else setFormError('로그인에 실패했습니다. 입력 정보를 확인해주세요.')
    } catch {
      if (submittedRevision === revision.current) setFormError('로그인 요청을 처리하지 못했습니다. 다시 시도해주세요.')
    } finally {
      submitting.current = false
      setPending(false)
    }
  }
  return (
    <main className="ongyeol-login" aria-label="로그인">
      <div className="ongyeol-login-panel">
        <nav className="ongyeol-login-tabs" aria-label="회원 페이지">
          <Link to="/login" aria-current="page">로그인</Link><Link to="/signup">회원가입</Link>
        </nav>
        <form className="ongyeol-login-form" noValidate onSubmit={submit} aria-busy={pending}>
          <div className="ongyeol-login-email">
          <label className="ongyeol-login-sr-only" htmlFor="login-email">아이디(이메일)</label>
          <input ref={emailRef} id="login-email" name="email" type="email" autoComplete="username" placeholder="아이디(이메일)" value={email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} onChange={(event) => edit('email', event.target.value)} />
          <FieldError id="login-email-error" message={errors.email} />
          </div>
          <div className="ongyeol-login-password">
            <label className="ongyeol-login-sr-only" htmlFor="login-password">비밀번호</label>
            <input ref={passwordRef} id="login-password" name="password" type={visible ? 'text' : 'password'} autoComplete="current-password" placeholder="비밀번호" value={password} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} onChange={(event) => edit('password', event.target.value)} />
            <button type="button" className="ongyeol-login-toggle" aria-label={visible ? '비밀번호 숨기기' : '비밀번호 표시'} aria-pressed={visible} onClick={() => setVisible((value) => !value)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{!visible && <path d="m3 21 18-18" />}</svg>
            </button>
            <FieldError id="login-password-error" message={errors.password} />
          </div>
          <div className="ongyeol-login-submit-area">
            <button className="ongyeol-login-submit" type="submit" disabled={pending}>로그인</button>
            <p className="ongyeol-login-form-error" role="status" aria-atomic="true">{formError}</p>
          </div>
          <nav className="ongyeol-login-links" aria-label="계정 도움말">
            <button type="button" disabled title="아이디 찾기는 준비 중입니다">아이디 찾기</button><span aria-hidden="true">|</span>
            <button type="button" disabled title="비밀번호 찾기는 준비 중입니다">비밀번호 찾기</button><span aria-hidden="true">|</span>
            <Link to="/signup">회원가입</Link>
          </nav>
          <div className="ongyeol-login-social">
            <button className="ongyeol-login-social-kakao" type="button" disabled><svg className="ongyeol-login-social-icon" width="18" height="16" viewBox="0 0 18 16" aria-hidden="true"><path fill="currentColor" d="M9 0C4 0 0 3 0 6.7c0 2.4 1.6 4.5 4.1 5.7L3 16l4-2.7h2c5 0 9-3 9-6.6S14 0 9 0Z" /></svg>카카오 로그인</button>
            <button className="ongyeol-login-social-naver" type="button" disabled><span className="ongyeol-login-social-icon ongyeol-login-naver" aria-hidden="true">N</span>네이버 로그인</button>
          </div>
        </form>
      </div>
    </main>
  )
}
