import { Fragment, useRef, useState } from 'react'
import './Payment.css'
import cardIcon from '../assets/payment/card.svg'
import bankIcon from '../assets/payment/bank.svg'
import mobileIcon from '../assets/payment/mobile.svg'
import escrowIcon from '../assets/payment/escrow.svg'
import kakaoIcon from '../assets/payment/kakao.svg'
import naverIcon from '../assets/payment/naver.svg'

// Original Figma SVGs are embedded so this standalone page needs only two new files.
const designAssets = {"truck":"data:image/svg+xml;base64,PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwLjAxMDgiIHZpZXdCb3g9IjAgMCA0MCAzMC4wMTA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBpZD0iJiMyMzU7JiMxNzY7JiMxNzY7JiMyMzY7JiMxMzQ7JiMxNjE7JiMyMzY7JiMxNjc7JiMxMjg7JiMyMzY7JiMxNjA7JiMxNDk7JiMyMzU7JiMxNzk7JiMxODA7JiMyMzY7JiMxNDk7JiMxMzY7JiMyMzU7JiMxMzA7JiMxODA7JiMyMzY7JiMxNDk7JiMxMzI7JiMyMzY7JiMxNTc7JiMxODA7JiMyMzY7JiMxODk7JiMxNTI7IiBkPSJNNS40NTk3N2UtMDkgMy43NUM1LjQ1OTc3ZS0wOSAyLjc1NTQ0IDAuMzk1MDg4IDEuODAxNjEgMS4wOTgzNSAxLjA5ODM1QzEuODAxNjEgMC4zOTUwODggMi43NTU0NCAwIDMuNzUgMEgyNi4yNUMyNy4yNDQ2IDAgMjguMTk4NCAwLjM5NTA4OCAyOC45MDE3IDEuMDk4MzVDMjkuNjA0OSAxLjgwMTYxIDMwIDIuNzU1NDQgMzAgMy43NVY3LjVIMzIuNTVDMzMuMTExOCA3LjUwMDUgMzMuNjY2NCA3LjYyNzI1IDM0LjE3MjcgNy44NzA4N0MzNC42NzkgOC4xMTQ0OSAzNS4xMjQgOC40Njg3NiAzNS40NzUgOC45MDc1TDM5LjE3NzUgMTMuNTMyNUMzOS43MTAyIDE0LjE5OCA0MC4wMDAzIDE1LjAyNTEgNDAgMTUuODc3NVYyMS4yNUM0MCAyMi4yNDQ2IDM5LjYwNDkgMjMuMTk4NCAzOC45MDE3IDIzLjkwMTdDMzguMTk4NCAyNC42MDQ5IDM3LjI0NDYgMjUgMzYuMjUgMjVIMzVDMzUgMjYuMzI2MSAzNC40NzMyIDI3LjU5NzkgMzMuNTM1NSAyOC41MzU1QzMyLjU5NzkgMjkuNDczMiAzMS4zMjYxIDMwIDMwIDMwQzI4LjY3MzkgMzAgMjcuNDAyMSAyOS40NzMyIDI2LjQ2NDUgMjguNTM1NUMyNS41MjY4IDI3LjU5NzkgMjUgMjYuMzI2MSAyNSAyNUgxMi41QzEyLjUwMTQgMjUuNjY2NSAxMi4zNjk2IDI2LjMyNjUgMTIuMTEyMyAyNi45NDEzQzExLjg1NSAyNy41NTYgMTEuNDc3NCAyOC4xMTMyIDExLjAwMTYgMjguNTc5OUMxMC41MjU5IDI5LjA0NjcgOS45NjE2NCAyOS40MTM2IDkuMzQyMDUgMjkuNjU5MUM4LjcyMjQ2IDI5LjkwNDYgOC4wNjAwNCAzMC4wMjM4IDcuMzkzNzMgMzAuMDA5N0M2LjcyNzQyIDI5Ljk5NTUgNi4wNzA2NyAyOS44NDgzIDUuNDYyMDcgMjkuNTc2NkM0Ljg1MzQ4IDI5LjMwNSA0LjMwNTM0IDI4LjkxNDQgMy44NDk4NyAyOC40Mjc5QzMuMzk0NCAyNy45NDEzIDMuMDQwNzkgMjcuMzY4NyAyLjgwOTg0IDI2Ljc0MzVDMi41Nzg4OCAyNi4xMTgzIDIuNDc1MjQgMjUuNDUzMyAyLjUwNSAyNC43ODc1QzEuNzcyNjIgMjQuNTI5NyAxLjEzODMxIDI0LjA1MSAwLjY4OTYxMSAyMy40MTczQzAuMjQwOTE0IDIyLjc4MzcgLTQuMTg3OTllLTA1IDIyLjAyNjQgNS40NTk3N2UtMDkgMjEuMjVMNS40NTk3N2UtMDkgMy43NVpNMy4yMzUgMjIuMzlDMy42ODc0OCAyMS42NTA2IDQuMzI0NDIgMjEuMDQxNSA1LjA4MzMyIDIwLjYyMjZDNS44NDIyMiAyMC4yMDM2IDYuNjk3IDE5Ljk4OTIgNy41NjM3OSAyMC4wMDAzQzguNDMwNTggMjAuMDExNCA5LjI3OTU5IDIwLjI0NzYgMTAuMDI3NSAyMC42ODU5QzEwLjc3NTQgMjEuMTI0MSAxMS4zOTY2IDIxLjc0OTMgMTEuODMgMjIuNUgyNS42N0MyNi4xMDg4IDIxLjc0IDI2Ljc0IDIxLjEwODggMjcuNSAyMC42N1YzLjc1QzI3LjUgMy40MTg0OCAyNy4zNjgzIDMuMTAwNTQgMjcuMTMzOSAyLjg2NjEyQzI2Ljg5OTUgMi42MzE3IDI2LjU4MTUgMi41IDI2LjI1IDIuNUgzLjc1QzMuNDE4NDggMi41IDMuMTAwNTQgMi42MzE3IDIuODY2MTIgMi44NjYxMkMyLjYzMTcgMy4xMDA1NCAyLjUgMy40MTg0OCAyLjUgMy43NVYyMS4yNUMyLjQ5OTggMjEuNDkwNiAyLjU2OTA1IDIxLjcyNjEgMi42OTk0MyAyMS45Mjg0QzIuODI5OCAyMi4xMzA2IDMuMDE1NzcgMjIuMjkwOSAzLjIzNSAyMi4zOVpNMzAgMjBDMzAuODc3NyAyMCAzMS43Mzk5IDIwLjIzMTEgMzIuNDk5OSAyMC42Njk5QzMzLjI2IDIxLjEwODcgMzMuODkxMiAyMS43Mzk5IDM0LjMzIDIyLjVIMzYuMjVDMzYuNTgxNSAyMi41IDM2Ljg5OTUgMjIuMzY4MyAzNy4xMzM5IDIyLjEzMzlDMzcuMzY4MyAyMS44OTk1IDM3LjUgMjEuNTgxNSAzNy41IDIxLjI1VjE1Ljg3NUMzNy40OTk1IDE1LjU5MTMgMzcuNDAyNSAxNS4zMTYzIDM3LjIyNSAxNS4wOTVMMzMuNTI1IDEwLjQ3QzMzLjQwODEgMTAuMzIzNiAzMy4yNTk4IDEwLjIwNTQgMzMuMDkxIDEwLjEyNEMzMi45MjIyIDEwLjA0MjYgMzIuNzM3NCAxMC4wMDAzIDMyLjU1IDEwSDMwVjIwWk03LjUgMjIuNUM2LjgzNjk2IDIyLjUgNi4yMDEwNyAyMi43NjM0IDUuNzMyMjMgMjMuMjMyMkM1LjI2MzM5IDIzLjcwMTEgNSAyNC4zMzcgNSAyNUM1IDI1LjY2MyA1LjI2MzM5IDI2LjI5ODkgNS43MzIyMyAyNi43Njc4QzYuMjAxMDcgMjcuMjM2NiA2LjgzNjk2IDI3LjUgNy41IDI3LjVDOC4xNjMwNCAyNy41IDguNzk4OTMgMjcuMjM2NiA5LjI2Nzc3IDI2Ljc2NzhDOS43MzY2MSAyNi4yOTg5IDEwIDI1LjY2MyAxMCAyNUMxMCAyNC4zMzcgOS43MzY2MSAyMy43MDExIDkuMjY3NzcgMjMuMjMyMkM4Ljc5ODkzIDIyLjc2MzQgOC4xNjMwNCAyMi41IDcuNSAyMi41Wk0zMCAyMi41QzI5LjMzNyAyMi41IDI4LjcwMTEgMjIuNzYzNCAyOC4yMzIyIDIzLjIzMjJDMjcuNzYzNCAyMy43MDExIDI3LjUgMjQuMzM3IDI3LjUgMjVDMjcuNSAyNS42NjMgMjcuNzYzNCAyNi4yOTg5IDI4LjIzMjIgMjYuNzY3OEMyOC43MDExIDI3LjIzNjYgMjkuMzM3IDI3LjUgMzAgMjcuNUMzMC42NjMgMjcuNSAzMS4yOTg5IDI3LjIzNjYgMzEuNzY3OCAyNi43Njc4QzMyLjIzNjYgMjYuMjk4OSAzMi41IDI1LjY2MyAzMi41IDI1QzMyLjUgMjQuMzM3IDMyLjIzNjYgMjMuNzAxMSAzMS43Njc4IDIzLjIzMjJDMzEuMjk4OSAyMi43NjM0IDMwLjY2MyAyMi41IDMwIDIyLjVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K","chevron":"data:image/svg+xml;base64,PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJha2FyLWljb25zOmNoZXZyb24tZG93bi1zbWFsbCI+CjxwYXRoIGlkPSJWZWN0b3IiIGQ9Ik01IDguMzMzMzNMMTAgMTMuMzMzM0wxNSA4LjMzMzMzIiBzdHJva2U9IiM4Nzg3ODciIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8L3N2Zz4K","payChevron":"data:image/svg+xml;base64,PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIgd2lkdGg9IjI3IiBoZWlnaHQ9IjI3IiB2aWV3Qm94PSIwIDAgMjcgMjciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGlkPSJha2FyLWljb25zOmNoZXZyb24tZG93bi1zbWFsbCI+CjxwYXRoIGlkPSJWZWN0b3IiIGQ9Ik05Ljg5OTIzIDIxLjYwMDFMMTYuNjQ5MiAxNC44NTAxTDkuODk5MjMgOC4xMDAxMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8L3N2Zz4K"}
const paymentMethods = [
  { id: 'card', label: '카드 결제', icon: cardIcon },
  { id: 'bank', label: '무통장 입금', icon: bankIcon },
  { id: 'mobile', label: '휴대폰 결제', icon: mobileIcon },
  { id: 'escrow', label: '에스크로(가상계좌)', icon: escrowIcon },
  { id: 'kakao', label: '카카오페이(간편결제)', icon: kakaoIcon },
  { id: 'naver', label: '네이버페이', icon: naverIcon },
]
const exampleProducts = [
  { id: 'pad', name: '[반값특가] 히알루론산 카테킨 패드', option: '(옵션: 1개)', price: 12000, quantity: 1 },
  { id: 'pdrn-set', name: '[SET] PDRN 주름 관리 세트', option: '(옵션: PDRN 세럼 1개 + PDRN 크림 1개)', price: 38900, quantity: 1 },
]
const exampleDelivery = { name: '김ㅇㅇ', phone: '010-0000-0000', address: '서울특별시 ㅇㅇ구 ㅇㅇ로 00, 000동 000호' }
// Mock member coupons; replace this array when member coupon data is connected.
const coupons = [
  { id: 'signup-coupon', name: '신규 가입 회원 10,000원 쿠폰', discount: 10000 },
  { id: 'kakao-coupon', name: '카카오톡 플러스 친구 10,000원 쿠폰', discount: 10000 },
]
const cards = ['신한카드', '삼성카드', '현대카드', '국민카드', '롯데카드', '비씨카드']
const mobileCodes = ['010', '011', '016', '017', '018', '019']
const banks = ['신한은행', '국민은행', '우리은행', '하나은행', '농협은행']
const carriers = ['SKT', 'KT', 'LG U+', '알뜰폰']
const emailDomains = ['직접입력', '@gmail.com', '@naver.com', '@daum.net', '@nate.com']
const installmentOptions = ['일시불', '2개월', '3개월', '6개월', '12개월']
const terms = ['개인정보 수집 및 이용 동의 (필수)', '이용약관 동의 (필수)', '전자금융거래 이용약관 동의 (필수)']
const formatPrice = value => value.toLocaleString('ko-KR')

function Chevron({ white = false }) {
  return <img className={`payment-chevron${white ? ' payment-chevron-white' : ''}`} src={white ? designAssets.payChevron : designAssets.chevron} alt="" aria-hidden="true" />
}

function Section({ title, children, change = false, className = '' }) {
  return <section className={`payment-section ${className}`}><div className="payment-section-heading"><h2 className="payment-section-title">{title}</h2>{change && <span className="payment-change">변경하기 <Chevron /></span>}</div>{children}</section>
}

function Field({ label, id, invalid, children }) {
  return <div className="payment-field"><label className="payment-field-label" htmlFor={id}>{label}<span className="payment-required">*</span></label><div className="payment-field-content">{children}{invalid && <p className="payment-error" id={`${id}-error`} role="status">필수 입력 항목입니다.</p>}</div></div>
}

export default function Payment({ products = exampleProducts, delivery = exampleDelivery, onComplete, onBack }) {
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [values, setValues] = useState({ card: '', cardNumber: ['', '', '', ''], month: '', year: '', installment: '일시불', password: '', name: '', mobilePrefix: '010', mobileMiddle: '', mobileLast: '', email: '', emailDomain: '직접입력' })
  const [selectedCouponId, setSelectedCouponId] = useState('')
  const [methodValues, setMethodValues] = useState({ bank: '', depositor: '', carrier: '', phonePrefix: '010', phoneMiddle: '', phoneLast: '' })
  const [billingType, setBillingType] = useState('개인')
  const [saveInfo, setSaveInfo] = useState(true)
  const [sameAsOrder, setSameAsOrder] = useState(true)
  const [agreements, setAgreements] = useState([false, false, false])
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)
  const [currentYear] = useState(() => new Date().getFullYear())
  const totalProductPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const shippingFee = !products.length || totalProductPrice >= 50000 ? 0 : 3000
  const couponDiscount = coupons.find(coupon => coupon.id === selectedCouponId)?.discount ?? 0
  const totalPaymentPrice = Math.max(0, totalProductPrice + shippingFee - couponDiscount)
  const allAgreed = agreements.every(Boolean)

  function update(key, value) {
    setValues(current => ({ ...current, [key]: value }))
    setErrors(current => ({ ...current, [key]: false, ...(key.startsWith('mobile') ? { mobile: false } : {}), ...(key === 'month' || key === 'year' ? { expiry: false } : {}) }))
  }

  function control(key, errorKey = key, errorId = key) {
    return { value: values[key], onChange: event => update(key, event.target.value), 'aria-invalid': Boolean(errors[errorKey]), 'aria-describedby': errors[errorKey] ? `payment-${errorId}-error` : undefined }
  }

  function numeric(key, length, errorKey = key, errorId = key) {
    return { ...control(key, errorKey, errorId), inputMode: 'numeric', maxLength: length, onChange: event => update(key, event.target.value.replace(/\D/g, '').slice(0, length)) }
  }

  function selectPayment(id) {
    setSelectedPayment(id)
    setErrors(current => {
      const next = { ...current }
      for (const key of ['card', 'cardNumber', 'expiry', 'installment', 'password', 'bank', 'depositor', 'carrier', 'paymentPhone']) delete next[key]
      return next
    })
  }

  function methodControl(key, errorKey = key, digits) {
    return {
      value: methodValues[key],
      onChange: event => {
        const value = digits ? event.target.value.replace(/\D/g, '').slice(0, digits) : event.target.value
        setMethodValues(current => ({ ...current, [key]: value }))
        setErrors(current => ({ ...current, [errorKey]: false }))
      },
      'aria-invalid': Boolean(errors[errorKey]),
      'aria-describedby': errors[errorKey] ? `payment-${errorKey}-error` : undefined,
      ...(digits ? { inputMode: 'numeric', maxLength: digits } : {}),
    }
  }

  function submit(event) {
    event.preventDefault()
    const next = {}
    if (selectedPayment === 'card') {
      for (const key of ['card', 'installment']) if (!values[key].trim()) next[key] = true
      if (values.cardNumber.some(part => !/^\d{4}$/.test(part))) next.cardNumber = true
      if (!values.month || !values.year) next.expiry = true
      if (!/^\d{2}$/.test(values.password)) next.password = true
    } else if (selectedPayment === 'bank') {
      if (!methodValues.bank) next.bank = true
      if (!methodValues.depositor.trim()) next.depositor = true
    } else if (selectedPayment === 'mobile') {
      if (!methodValues.carrier) next.carrier = true
      if (!/^\d{3}$/.test(methodValues.phonePrefix) || !/^\d{3,4}$/.test(methodValues.phoneMiddle) || !/^\d{4}$/.test(methodValues.phoneLast)) next.paymentPhone = true
    }
    if (!values.name.trim()) next.name = true
    if (!/^\d{3}$/.test(values.mobilePrefix) || !/^\d{3,4}$/.test(values.mobileMiddle) || !/^\d{4}$/.test(values.mobileLast)) next.mobile = true
    const email = values.emailDomain === '직접입력' ? values.email.trim() : `${values.email.trim().split('@')[0]}${values.emailDomain}`
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true
    if (!allAgreed) next.agreements = true
    setErrors(next)
    if (Object.keys(next).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    onComplete?.()
  }

  return <main className="payment-page payment-main">
    <div className="payment-heading"><h1>결제하기</h1><p>선택하신 결제 수단으로 안전하게 결제할 수 있습니다.</p></div>
    <form className="payment-layout" ref={formRef} onSubmit={submit} noValidate>
      <div className="payment-left">
        <Section title="결제 수단 선택" className="payment-card-section">
          <div className="payment-methods">{paymentMethods.map(method => <button key={method.id} type="button" className={`payment-method${selectedPayment === method.id ? ' payment-method-active' : ''}`} aria-pressed={selectedPayment === method.id} onClick={() => selectPayment(method.id)}><img className="payment-method-icon" src={method.icon} alt="" aria-hidden="true" />{method.label}</button>)}</div>
          {selectedPayment === 'card' && <>
          <h2 className="payment-card-title">카드 정보 입력</h2>
          <div className="payment-card-form">
            <Field label="카드사 선택" id="payment-card" invalid={errors.card}><select id="payment-card" className="payment-long-input" {...control('card')}><option value="">카드사를 선택해주세요.</option>{cards.map(card => <option key={card}>{card}</option>)}</select></Field>
            <Field label="카드 번호" id="payment-cardNumber" invalid={errors.cardNumber}><div className="payment-card-number">{values.cardNumber.map((value, index) => <Fragment key={index}>{index > 0 && <span aria-hidden="true">-</span>}<input id={index === 0 ? 'payment-cardNumber' : undefined} aria-label={`카드 번호 ${index + 1}번째 4자리`} inputMode="numeric" maxLength={4} value={value} aria-invalid={Boolean(errors.cardNumber)} aria-describedby={errors.cardNumber ? 'payment-cardNumber-error' : undefined} onChange={event => update('cardNumber', values.cardNumber.map((part, partIndex) => partIndex === index ? event.target.value.replace(/\D/g, '').slice(0, 4) : part))} /></Fragment>)}</div></Field>
            <Field label="유효기간" id="payment-expiry" invalid={errors.expiry}><div className="payment-expiry"><select id="payment-expiry" aria-label="유효기간 월" {...control('month', 'expiry', 'expiry')}><option value="">월</option>{Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0')).map(month => <option key={month}>{month}</option>)}</select><select aria-label="유효기간 년" {...control('year', 'expiry', 'expiry')}><option value="">년</option>{Array.from({ length: 8 }, (_, index) => currentYear + index).map(year => <option key={year}>{year}</option>)}</select></div></Field>
            <Field label="할부 개월" id="payment-installment" invalid={errors.installment}><select id="payment-installment" className="payment-installment" {...control('installment')}>{installmentOptions.map(term => <option key={term}>{term}</option>)}</select></Field>
            <Field label="카드 비밀번호 앞 2자리" id="payment-password" invalid={errors.password}><div className="payment-password"><input id="payment-password" type="password" autoComplete="off" {...numeric('password', 2)} /><span>숫자 2자리를 입력해주세요.</span></div></Field>
          </div>
          <div className="payment-save-info"><label className="payment-checkbox"><input type="checkbox" checked={saveInfo} onChange={event => setSaveInfo(event.target.checked)} />위 결제 정보를 다음에도 사용하겠습니다.</label><p>(선택한 경우, 다음 결제 시 더 빠르게 진행할 수 있습니다.)</p></div>
          </>}
          {selectedPayment === 'bank' && <>
            <h2 className="payment-card-title">무통장입금 정보</h2>
            <div className="payment-card-form">
              <Field label="입금은행 선택" id="payment-bank" invalid={errors.bank}><select id="payment-bank" className="payment-long-input" {...methodControl('bank')}><option value="">은행 선택</option>{banks.map(bank => <option key={bank}>{bank}</option>)}</select></Field>
              <Field label="입금자명" id="payment-depositor" invalid={errors.depositor}><input id="payment-depositor" className="payment-long-input" placeholder="입금자명을 입력해주세요." {...methodControl('depositor')} /></Field>
              <div className="payment-field"><span className="payment-field-label">입금기한</span><div className="payment-field-content"><p className="payment-method-notice">주문 후 24시간 이내 입금해주세요.</p></div></div>
            </div>
          </>}
          {selectedPayment === 'mobile' && <>
            <h2 className="payment-card-title">휴대폰 결제 정보</h2>
            <div className="payment-card-form">
              <Field label="통신사 선택" id="payment-carrier" invalid={errors.carrier}><select id="payment-carrier" className="payment-long-input" {...methodControl('carrier')}><option value="">통신사 선택</option>{carriers.map(carrier => <option key={carrier}>{carrier}</option>)}</select></Field>
              <Field label="휴대폰 번호" id="payment-paymentPhone" invalid={errors.paymentPhone}><div className="payment-phone"><select id="payment-paymentPhone" aria-label="결제 휴대폰 앞자리" {...methodControl('phonePrefix', 'paymentPhone')}>{mobileCodes.map(code => <option key={code}>{code}</option>)}</select><input aria-label="결제 휴대폰 중간 번호" {...methodControl('phoneMiddle', 'paymentPhone', 4)} /><input aria-label="결제 휴대폰 마지막 번호" {...methodControl('phoneLast', 'paymentPhone', 4)} /></div></Field>
            </div>
          </>}
          {selectedPayment === 'escrow' && <>
            <h2 className="payment-card-title">에스크로 안전결제</h2>
            <div className="payment-field"><div className="payment-method-notice payment-method-guide"><p>에스크로 안전결제를 이용합니다.<br />결제 완료 후 판매자에게 바로 대금이 지급되지 않고 구매 확인 후 정산됩니다.</p></div></div>
          </>}
          {(selectedPayment === 'kakao' || selectedPayment === 'naver') && <>
            <h2 className="payment-card-title">{selectedPayment === 'kakao' ? '카카오페이' : '네이버페이'}</h2>
            <div className="payment-field"><div className="payment-method-notice payment-method-guide"><p>결제하기 버튼을 누르면 {selectedPayment === 'kakao' ? '카카오페이' : '네이버페이'} 결제창으로 이동합니다.</p><p>현재는 mock 화면으로 실제 결제창은 열리지 않습니다.</p></div></div>
          </>}
        </Section>
        <Section title="청구정보" className="payment-billing">
          <div className="payment-billing-type">{['개인', '법인'].map(type => <label key={type} className="payment-radio"><input type="radio" name="payment-billing-type" value={type} checked={billingType === type} onChange={() => setBillingType(type)} />{type}</label>)}</div>
          <Field label="이름" id="payment-name" invalid={errors.name}><input id="payment-name" className="payment-long-input" placeholder="이름을 입력해주세요." autoComplete="name" {...control('name')} /></Field>
          <Field label="휴대전화" id="payment-mobile" invalid={errors.mobile}><div className="payment-phone"><select id="payment-mobile" aria-label="휴대전화 앞자리" {...control('mobilePrefix', 'mobile', 'mobile')}>{mobileCodes.map(code => <option key={code}>{code}</option>)}</select><input aria-label="휴대전화 중간 번호" {...numeric('mobileMiddle', 4, 'mobile', 'mobile')} /><input aria-label="휴대전화 마지막 번호" {...numeric('mobileLast', 4, 'mobile', 'mobile')} /></div></Field>
          <Field label="이메일" id="payment-email" invalid={errors.email}><div className="payment-email"><input id="payment-email" placeholder="이메일을 입력해주세요." autoComplete="email" {...control('email')} /><select aria-label="이메일 도메인" {...control('emailDomain', 'email', 'email')}>{emailDomains.map(domain => <option key={domain}>{domain}</option>)}</select></div><label className="payment-checkbox payment-same-order"><input type="checkbox" checked={sameAsOrder} onChange={event => setSameAsOrder(event.target.checked)} />주문자 정보와 동일합니다.</label></Field>
        </Section>
        <Section title="쿠폰" className="payment-coupon">
          <div className="payment-field"><label className="payment-field-label" htmlFor="payment-coupon">쿠폰</label><div className="payment-field-content"><select id="payment-coupon" className="payment-long-input" value={selectedCouponId} onChange={event => setSelectedCouponId(event.target.value)}><option value="">쿠폰 선택 안 함</option>{coupons.map(coupon => <option key={coupon.id} value={coupon.id}>{coupon.name}</option>)}</select></div></div>
          <div className="payment-coupon-footer"><p>*쿠폰은 1개만 선택하여 사용할 수 있습니다.</p><strong>쿠폰 적용 {couponDiscount > 0 ? '-' : ''}{formatPrice(couponDiscount)}원</strong></div>
        </Section>
        <Section title="결제 동의" className="payment-agreements">
          <label className="payment-checkbox payment-agree-all"><input type="checkbox" checked={allAgreed} onChange={event => { setAgreements(terms.map(() => event.target.checked)); setErrors(current => ({ ...current, agreements: false })) }} />전체 동의하기</label>
          <div className="payment-term-list">{terms.map((term, index) => <div key={term} className="payment-term"><label className="payment-checkbox"><input type="checkbox" checked={agreements[index]} aria-invalid={Boolean(errors.agreements)} aria-describedby={errors.agreements ? 'payment-agreements-error' : undefined} onChange={event => { setAgreements(current => current.map((checked, i) => i === index ? event.target.checked : checked)); setErrors(current => ({ ...current, agreements: false })) }} />{term}</label><span className="payment-term-view">내용보기 <Chevron /></span></div>)}</div>
          {errors.agreements && <p className="payment-error payment-agreement-error" id="payment-agreements-error" role="status">필수 약관에 동의해주세요.</p>}
        </Section>
      </div>
      <aside className="payment-sidebar" aria-label="주문 및 배송 요약">
        <Section title="주문 상품 정보" change className="payment-order-summary">
          {products.map(product => <div className="payment-product" key={product.id}><div className="payment-product-placeholder" aria-label="상품 이미지 자리" /><div><p>{product.name}</p><small>{product.option}</small><p className="payment-product-price">{formatPrice(product.price)}원 <span>{product.quantity}개</span></p></div></div>)}
          <div className="payment-amounts"><div className="payment-amount"><span>총 상품금액</span><span>{formatPrice(totalProductPrice)}원</span></div><div className="payment-amount"><span>배송비</span><span>{formatPrice(shippingFee)}원</span></div><div className="payment-total"><span>총 결제금액</span><span><strong>{formatPrice(totalPaymentPrice)}</strong>원</span></div></div>
        </Section>
        <Section title="배송지 정보" change className="payment-delivery">
          <div className="payment-delivery-details"><p>{delivery.name}</p><p>{delivery.phone}</p><p>{delivery.address}</p></div>
          <div className="payment-delivery-notice"><img className="payment-truck" src={designAssets.truck} alt="" aria-hidden="true" /><p>주문완성 상품은 평균 2~3일 이내 배송됩니다.<br />(주말 및 공휴일 제외)</p></div>
        </Section>
        <div className="payment-actions"><button className="payment-pay-button" type="submit">결제하기 <Chevron white /></button><button className="payment-back-button" type="button" onClick={onBack}>이전으로</button></div>
      </aside>
    </form>
  </main>
}
