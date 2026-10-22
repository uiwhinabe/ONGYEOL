import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { calculateShippingFee } from '../utils/orderPricing.js'
import './Payment.css'
import './Checkout.css'
import cardIcon from '../assets/payment/card.svg'
import bankIcon from '../assets/payment/bank.svg'
import mobileIcon from '../assets/payment/mobile.svg'
import escrowIcon from '../assets/payment/escrow.svg'
import kakaoIcon from '../assets/payment/kakao.svg'
import naverIcon from '../assets/payment/naver.svg'

const areaCodes = ['02', '031', '032', '033', '041', '042', '043', '051', '052', '053', '054', '055', '061', '062', '063', '064']
const mobileCodes = ['010', '011', '016', '017', '018', '019']
const emailDomains = ['직접입력', '@gmail.com', '@naver.com', '@daum.net', '@nate.com']
const paymentMethods = [
  { id: 'card', icon: cardIcon, label: '카드 결제' },
  { id: 'bank', icon: bankIcon, label: '무통장 입금' },
  { id: 'mobile', icon: mobileIcon, label: '휴대폰 결제' },
  { id: 'escrow', icon: escrowIcon, label: '에스크로(가상계좌)' },
  { id: 'kakao', icon: kakaoIcon, label: '카카오페이(간편결제)' },
  { id: 'naver', icon: naverIcon, label: '네이버페이' },
]
const mockAddresses = Array.from({ length: 5 }, (_, index) => ({
  postcode: String(6164 + index).padStart(5, '0'),
  address: `서울특별시 강남구 테헤란로 ${123 + index} (역삼동)`,
}))
const initialPerson = {
  name: '', postcode: '', address: '', detail: '',
  landlinePrefix: '02', landlineMiddle: '', landlineLast: '',
  mobilePrefix: '010', mobileMiddle: '', mobileLast: '',
  email: '', emailDomain: '직접입력', message: '',
}

function ErrorMessage({ id, visible, className = '' }) {
  return visible ? <p className={`checkout-error-message ${className}`} id={id} role="status">필수 입력 항목입니다.</p> : null
}

const initialProducts = [
  { id: 'pad', name: '[반값특가] 히알루론산 카테킨 패드', price: 12000, quantity: 1, option: '(옵션: 1개)' },
  { id: 'pdrn-set', name: '[SET] PDRN 주름 관리 세트', price: 38900, quantity: 1, option: '(옵션: PDRN 세럼 1개 + PDRN 크림 1개)' },
]

function Icon({ name }) {
  const paths = {
    user: <><circle cx="12" cy="7" r="4" fill="currentColor" stroke="none" /><path d="M4 21v-3c0-6 16-6 16 0v3Z" fill="currentColor" stroke="none" /></>,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>,
    support: <><path d="M5 14V9a7 7 0 0 1 14 0v5M19 16v2c0 3-3 3-5 3" /><rect x="2" y="10" width="5" height="8" rx="2" /><rect x="17" y="10" width="5" height="8" rx="2" /><circle cx="12" cy="21" r="2" /></>,
    cart: <><path d="M2 3h3l3 12h11l3-9H6" /><circle cx="9" cy="20" r="1.5" fill="currentColor" /><circle cx="18" cy="20" r="1.5" fill="currentColor" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  }
  return <svg className="checkout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Section({ title, children, className = '' }) {
  return <section className={`checkout-section ${className}`}><h2 className="checkout-section-title">{title}</h2>{children}</section>
}

function Field({ label, required, children }) {
  return <div className="checkout-field"><div className="checkout-field-label">{label}{required && <span className="checkout-required">*</span>}</div><div className="checkout-field-content">{children}</div></div>
}

function NameInput({ label, scope, form }) {
  return <><input {...form.input(scope, 'name', 'checkout-name-input')} type="text" aria-label={label} placeholder="이름을 입력해주세요." /><ErrorMessage id={`${scope}-name-error`} visible={form.errors[`${scope}.name`]} /></>
}

function Address({ prefix, scope, form }) {
  return <div className="checkout-address">
    <div className="checkout-inline"><input {...form.input(scope, 'postcode', 'checkout-postcode')} aria-label={`${prefix} 우편번호`} /><button type="button" className="checkout-postcode-button" onClick={() => form.openAddress(scope)}><Icon name="search" />우편번호 찾기</button></div>
    <label className="checkout-address-line"><span>기본주소</span><input {...form.input(scope, 'address')} aria-label={`${prefix} 기본주소`} placeholder="주소를 입력해주세요." /></label>
    <ErrorMessage id={`${scope}-address-error`} visible={form.errors[`${scope}.address`]} className="checkout-address-error-message" />
    <label className="checkout-address-line"><span>상세주소</span><input {...form.input(scope, 'detail')} aria-label={`${prefix} 상세주소`} placeholder="상세주소를 입력해주세요." /></label>
    <ErrorMessage id={`${scope}-detail-error`} visible={form.errors[`${scope}.detail`]} className="checkout-address-error-message" />
  </div>
}

function Phone({ label, landline = false, scope, form }) {
  const type = landline ? 'landline' : 'mobile'
  const invalid = !landline && form.errors[`${scope}.mobile`]
  const errorProps = { 'aria-invalid': Boolean(invalid), 'aria-describedby': invalid ? `${scope}-mobile-error` : undefined }
  return <><div className={`checkout-phone${invalid ? ' checkout-phone-error' : ''}`}><select {...form.input(scope, `${type}Prefix`)} {...errorProps} aria-label={`${label} 앞자리`}>{(landline ? areaCodes : mobileCodes).map(code => <option key={code}>{code}</option>)}</select><input {...form.input(scope, `${type}Middle`)} {...errorProps} aria-label={`${label} 중간 번호`} inputMode="numeric" maxLength={4} /><input {...form.input(scope, `${type}Last`)} {...errorProps} aria-label={`${label} 마지막 번호`} inputMode="numeric" maxLength={4} /></div><ErrorMessage id={`${scope}-mobile-error`} visible={invalid} /></>
}

function Radio({ name, text, value, onChange }) {
  return <label className="checkout-radio"><input type="radio" name={name} value={text} checked={value === text} onChange={() => onChange(text)} />{text}</label>
}

function AddressModal({ onClose, onSelect, onManual }) {
  const dialogRef = useRef(null)
  const searchRef = useRef(null)
  const [search, setSearch] = useState('')
  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    dialog.showModal()
    searchRef.current.focus()
    return () => {
      dialog.close()
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])
  const query = search.trim().toLowerCase()
  const results = mockAddresses.filter(result => `${result.postcode} ${result.address}`.toLowerCase().includes(query))
  return createPortal(<dialog className="checkout-address-modal" ref={dialogRef} onCancel={event => { event.preventDefault(); onClose() }} aria-labelledby="checkout-modal-title" aria-describedby="checkout-modal-description">
    <button className="checkout-modal-close" type="button" aria-label="우편번호 찾기 닫기" onClick={onClose}>×</button>
    <h2 id="checkout-modal-title">우편번호 찾기</h2>
    <p id="checkout-modal-description">주소를 검색하여 우편번호를 찾아보세요.</p>
    <label className="checkout-modal-search"><Icon name="search" /><input ref={searchRef} aria-label="주소 검색" placeholder="주소 또는 건물명으로 검색하세요." value={search} onChange={event => setSearch(event.target.value)} /></label>
    <h3>검색결과</h3>
    <div className="checkout-modal-results">{results.length ? results.map(result => <button className="checkout-modal-result" key={result.postcode} type="button" onClick={() => onSelect(result)}><span className="checkout-modal-postcode">{result.postcode}</span><span>{result.address}</span><span aria-hidden="true">›</span></button>) : <p className="checkout-modal-empty">검색 결과가 없습니다.</p>}</div>
    <button className="checkout-modal-manual" type="button" onClick={onManual}>검색하신 주소가 없나요?<br />직접 입력하기 <span aria-hidden="true">›</span></button>
  </dialog>, document.body)
}

function formatPrice(value) {
  return value.toLocaleString('ko-KR')
}

function Amount({ label, amount, large = false }) {
  return <div className={`checkout-amount ${large ? 'checkout-amount-large' : ''}`}><span>{label}</span><span><strong>{formatPrice(amount)}</strong>원</span></div>
}

export default function Checkout({ onPayment }) {
  const location = useLocation()
  const [products, setProducts] = useState(() => location.state?.cartItems ?? initialProducts)
  const [quantityDrafts, setQuantityDrafts] = useState({})
  const totalProductQuantity = products.reduce((total, product) => total + product.quantity, 0)
  const totalProductPrice = products.reduce((total, product) => total + product.price * product.quantity, 0)
  const shippingFee = calculateShippingFee(totalProductPrice, products.length)
  const totalPaymentPrice = totalProductPrice + shippingFee

  function changeQuantity(id, change) {
    setQuantityDrafts(current => ({ ...current, [id]: undefined }))
    setProducts(current => current.map(product => product.id === id
      ? { ...product, quantity: Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, product.quantity + change)) }
      : product))
  }

  function inputQuantity(id, value) {
    if (!/^\d*$/.test(value)) return
    if (value !== '' && (!Number.isSafeInteger(Number(value)) || Number(value) < 1)) return
    setQuantityDrafts(current => ({ ...current, [id]: value }))
    setProducts(current => current.map(product => product.id === id
      ? { ...product, quantity: value === '' ? 1 : Number(value) }
      : product))
  }

  function finishQuantity(id) {
    setQuantityDrafts(current => ({ ...current, [id]: undefined }))
  }

  function removeProduct(id) {
    setProducts(current => current.filter(product => product.id !== id))
  }
  const [values, setValues] = useState({ order: { ...initialPerson }, delivery: { ...initialPerson } })
  const [errors, setErrors] = useState({})
  const [addressTarget, setAddressTarget] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [paymentDetails, setPaymentDetails] = useState({ bank: '', depositor: '', carrier: 'SKT', phonePrefix: '010', phoneMiddle: '', phoneLast: '' })
  const [selectedCard, setSelectedCard] = useState('신한카드')
  const [selectedInstallment, setSelectedInstallment] = useState('일시불')
  const [deliveryChoice, setDeliveryChoice] = useState('주문자 정보와 동일')
  const mainRef = useRef(null)

  function selectPayment(method) {
    setSelectedPayment(method)
    setErrors(current => {
      const next = { ...current }
      for (const key of ['payment.bank', 'payment.depositor', 'payment.carrier', 'payment.phone']) delete next[key]
      return next
    })
  }

  function paymentInput(key, errorKey = key, numeric = false) {
    const invalid = Boolean(errors[`payment.${errorKey}`])
    return {
      value: paymentDetails[key],
      onChange: event => {
        const value = numeric ? event.target.value.replace(/\D/g, '').slice(0, 4) : event.target.value
        setPaymentDetails(current => ({ ...current, [key]: value }))
        setErrors(current => ({ ...current, [`payment.${errorKey}`]: false }))
      },
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `checkout-payment-${errorKey}-error` : undefined,
      ...(numeric ? { inputMode: 'numeric', maxLength: 4 } : {}),
    }
  }

  function updateField(scope, key, value) {
    setValues(current => ({ ...current, [scope]: { ...current[scope], [key]: value } }))
    if (value.trim()) {
      const errorKey = key.startsWith('mobile') ? 'mobile' : key
      setErrors(current => ({ ...current, [`${scope}.${errorKey}`]: false }))
    }
  }
  const form = {
    errors,
    openAddress: setAddressTarget,
    input(scope, key, className = '') {
      const invalid = Boolean(errors[`${scope}.${key}`])
      return {
        value: values[scope][key],
        onChange: event => updateField(scope, key, event.target.value),
        className: `${className}${invalid ? ' checkout-input-error' : ''}`.trim() || undefined,
        'aria-invalid': invalid,
        'aria-describedby': invalid ? `${scope}-${key}-error` : undefined,
      }
    },
  }

  function selectAddress(result) {
    const scope = addressTarget
    setValues(current => ({ ...current, [scope]: { ...current[scope], postcode: result.postcode, address: result.address } }))
    setErrors(current => ({ ...current, [`${scope}.address`]: false }))
    setAddressTarget(null)
  }

  function validatePayment() {
    const nextErrors = {}
    if (selectedPayment === 'bank') {
      if (!paymentDetails.bank) nextErrors['payment.bank'] = true
      if (!paymentDetails.depositor.trim()) nextErrors['payment.depositor'] = true
    } else if (selectedPayment === 'mobile') {
      if (!paymentDetails.carrier) nextErrors['payment.carrier'] = true
      if (!/^\d{3}$/.test(paymentDetails.phonePrefix) || !/^\d{3,4}$/.test(paymentDetails.phoneMiddle) || !/^\d{4}$/.test(paymentDetails.phoneLast)) nextErrors['payment.phone'] = true
    }
    for (const scope of ['order', 'delivery']) {
      for (const key of ['name', 'address', 'detail']) {
        if (!values[scope][key].trim()) nextErrors[`${scope}.${key}`] = true
      }
      if (['mobilePrefix', 'mobileMiddle', 'mobileLast'].some(key => !values[scope][key].trim())) nextErrors[`${scope}.mobile`] = true
    }
    if (!values.order.email.trim()) nextErrors['order.email'] = true
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => mainRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    onPayment?.()
  }

  // Escrow remains a desktop-only option, including when resizing the viewport.
  useEffect(() => {
    const tablet = window.matchMedia('(max-width: 1024px)')
    const resetHiddenPayment = () => {
      if (tablet.matches) setSelectedPayment(current => current === 'escrow' ? 'card' : current)
    }
    resetHiddenPayment()
    tablet.addEventListener('change', resetHiddenPayment)
    return () => tablet.removeEventListener('change', resetHiddenPayment)
  }, [])

  const renderPaymentMethod = method => <button type="button" key={method.id} className={`payment-method checkout-payment-${method.id}${selectedPayment === method.id ? ' payment-method-active checkout-payment-active' : ''}`} aria-pressed={selectedPayment === method.id} onClick={() => selectPayment(method.id)}><img className="payment-method-icon" src={method.icon} alt="" aria-hidden="true" />{method.label}</button>

  return <div className="checkout-page">
    <main className="checkout-main" ref={mainRef}>
      <div className="checkout-heading"><h1>주문서 작성</h1><p>주문 정보를 입력하고 결제 수단을 선택해주세요.</p></div>
      <div className="checkout-layout">
        <div className="checkout-left">
          <Section title={`주문 상품 (${totalProductQuantity}개)`} className="checkout-order-section">
            {products.map(product => <div className="checkout-product" key={product.id}>
              <div className="checkout-product-placeholder" aria-label="상품 이미지 자리" />
              <div className="checkout-product-description"><p>{product.name}</p><small>{product.option}</small></div>
              <span className="checkout-product-price">{formatPrice(product.price)}원</span>
              <div className="checkout-quantity"><button type="button" aria-label={`${product.name} 수량 감소`} disabled={product.quantity === 1} onClick={() => changeQuantity(product.id, -1)}>-</button><input className="checkout-quantity-input" type="text" inputMode="numeric" pattern="[0-9]*" aria-label={`${product.name} 수량`} value={quantityDrafts[product.id] ?? product.quantity} onChange={event => inputQuantity(product.id, event.target.value)} onBlur={() => finishQuantity(product.id)} /><button type="button" aria-label={`${product.name} 수량 증가`} onClick={() => changeQuantity(product.id, 1)}>+</button></div>
              <span className="checkout-product-price">{formatPrice(product.price * product.quantity)}원</span>
              <button type="button" className="checkout-remove" aria-label={`${product.name} 삭제`} onClick={() => removeProduct(product.id)}>×</button>
            </div>)}
            {products.length === 0 && <p>주문 상품이 없습니다.</p>}
            <div className="checkout-product-summary"><span>선택상품 ({totalProductQuantity}개)</span><span><span className="checkout-summary-subtotal">상품구매금액 <b>{formatPrice(totalProductPrice)}</b> + 배송비 {formatPrice(shippingFee)}{shippingFee === 0 ? ' (무료)' : ''}</span>{' '}<span className="checkout-summary-total">= 합계 : <strong>{formatPrice(totalPaymentPrice)}</strong>원</span></span></div>
          </Section>

          <Section title="주문 정보">
            <Field label="주문하시는 분" required><NameInput label="주문하시는 분" scope="order" form={form} /></Field>
            <Field label="주소" required><Address prefix="주문자" scope="order" form={form} /></Field>
            <Field label="일반전화"><Phone label="주문자 일반전화" scope="order" form={form} landline /></Field>
            <Field label="휴대전화" required><Phone label="주문자 휴대전화" scope="order" form={form} /></Field>
            <Field label="이메일" required><div className="checkout-email"><input {...form.input('order', 'email')} type="email" aria-label="주문자 이메일" placeholder="이메일을 입력해주세요." /><select {...form.input('order', 'emailDomain')} aria-label="이메일 도메인">{emailDomains.map(domain => <option key={domain}>{domain}</option>)}</select></div><ErrorMessage id="order-email-error" visible={errors['order.email']} /><div className="checkout-email-notes"><p>*이메일을 통해 주문처리과정을 보내드립니다.</p><p>*이메일 주소란에는 반드시 수신가능한 이메일주소를 입력해 주세요.</p></div></Field>
          </Section>

          <Section title="배송정보">
            <Field label="배송지 선택"><div className="checkout-radio-group"><Radio name="checkout-delivery" text="주문자 정보와 동일" value={deliveryChoice} onChange={setDeliveryChoice} /><Radio name="checkout-delivery" text="새로운 배송지" value={deliveryChoice} onChange={setDeliveryChoice} /></div></Field>
            <Field label="받는사람" required><NameInput label="받는사람" scope="delivery" form={form} /></Field>
            <Field label="주소" required><Address prefix="배송지" scope="delivery" form={form} /></Field>
            <Field label="휴대전화" required><Phone label="받는사람 휴대전화" scope="delivery" form={form} /></Field>
            <Field label="배송 메시지"><textarea {...form.input('delivery', 'message')} aria-label="배송 메시지" placeholder="배송 시 요청사항이 있으시면 입력해주세요." rows={2} /></Field>
          </Section>

          <Section title="결제 수단" className="checkout-payment-section">
            <div className="payment-method-scroll checkout-payment-methods-standard"><div className="payment-methods payment-method-row">{paymentMethods.map(renderPaymentMethod)}</div></div>
            <div className="checkout-payment-methods-mobile">
              <div className="checkout-payment-methods-mobile-row">{paymentMethods.slice(0, 3).map(renderPaymentMethod)}</div>
              <div className="checkout-payment-methods-mobile-row">{paymentMethods.filter(method => method.id === 'kakao' || method.id === 'naver').map(renderPaymentMethod)}</div>
            </div>
            {selectedPayment === 'card' && <>
            <div className="checkout-payment-row"><span>카드사 선택</span><div className="checkout-radio-group">{['신한카드', '삼성카드', '현대카드', '국민카드', '롯데카드', '비씨카드'].map(card => <Radio name="checkout-card" key={card} text={card} value={selectedCard} onChange={setSelectedCard} />)}<select aria-label="카드사 직접입력"><option>직접입력</option></select></div></div>
            <div className="checkout-payment-row"><span>할부 선택</span><div className="checkout-radio-group">{['일시불', '2개월', '3개월', '6개월', '12개월'].map(term => <Radio name="checkout-installment" key={term} text={term} value={selectedInstallment} onChange={setSelectedInstallment} />)}</div></div>
            </>}
            {selectedPayment === 'bank' && <>
              <div className="checkout-payment-row"><span>입금은행</span><div className="checkout-payment-detail"><select aria-label="입금은행" {...paymentInput('bank')}><option value="">은행 선택</option>{['신한은행', '국민은행', '우리은행', '하나은행', '농협은행'].map(bank => <option key={bank}>{bank}</option>)}</select><ErrorMessage id="checkout-payment-bank-error" visible={errors['payment.bank']} /></div></div>
              <div className="checkout-payment-row"><span>입금자명</span><div className="checkout-payment-detail"><input aria-label="입금자명" placeholder="이름 입력" {...paymentInput('depositor')} /><ErrorMessage id="checkout-payment-depositor-error" visible={errors['payment.depositor']} /></div></div>
              <div className="checkout-payment-row"><span>입금기한</span><p>주문 후 24시간 이내 입금해주세요.</p></div>
            </>}
            {selectedPayment === 'mobile' && <>
              <div className="checkout-payment-row"><span>통신사</span><div className="checkout-payment-detail"><select aria-label="결제 통신사" {...paymentInput('carrier')}>{['SKT', 'KT', 'LG U+', '알뜰폰'].map(carrier => <option key={carrier}>{carrier}</option>)}</select><ErrorMessage id="checkout-payment-carrier-error" visible={errors['payment.carrier']} /></div></div>
              <div className="checkout-payment-row"><span>휴대폰 번호</span><div className="checkout-payment-detail"><div className="checkout-phone checkout-payment-phone"><select aria-label="결제 휴대폰 앞자리" {...paymentInput('phonePrefix', 'phone')}>{mobileCodes.map(code => <option key={code}>{code}</option>)}</select><span aria-hidden="true">-</span><input aria-label="결제 휴대폰 중간 번호" placeholder="0000" {...paymentInput('phoneMiddle', 'phone', true)} /><span aria-hidden="true">-</span><input aria-label="결제 휴대폰 마지막 번호" placeholder="0000" {...paymentInput('phoneLast', 'phone', true)} /></div><ErrorMessage id="checkout-payment-phone-error" visible={errors['payment.phone']} /></div></div>
            </>}
            {selectedPayment === 'escrow' && <div className="checkout-payment-row"><span>에스크로 안전결제</span><p>구매 확인 전까지 결제대금을 안전하게 보호하는 에스크로 결제를 이용합니다.</p></div>}
            {selectedPayment === 'kakao' && <div className="checkout-payment-row"><span>카카오페이</span><p>결제하기 버튼을 누르면 카카오페이 결제창으로 이동합니다.</p></div>}
            {selectedPayment === 'naver' && <div className="checkout-payment-row"><span>네이버페이</span><p>결제하기 버튼을 누르면 네이버페이 결제창으로 이동합니다.</p></div>}
          </Section>
        </div>

        <aside className="checkout-sidebar" aria-label="주문 및 결제 요약">
          <Section title="주문 금액 정보" className="checkout-order-amount"><div className="checkout-amount-body"><Amount label="상품금액" amount={totalProductPrice} /><div className="checkout-amount"><span>배송비</span><span>{formatPrice(shippingFee)}원</span></div><div className="checkout-total-divider"><Amount label="총 상품금액" amount={totalProductPrice} large /></div><div className="checkout-free-shipping"><span>배송비</span><span>{shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}</span></div></div></Section>
          <Section title="결제 금액 정보" className="checkout-payment-amount"><div className="checkout-amount-body"><Amount label="총 상품금액" amount={totalProductPrice} /><div className="checkout-amount"><span>배송비</span><span>{formatPrice(shippingFee)}원</span></div><div className="checkout-total-payment"><Amount label="총 결제금액" amount={totalPaymentPrice} large /></div></div></Section>
          <Section title="주문 상품 확인하기" className="checkout-review">{products.map(product => <div className="checkout-review-product" key={product.id}><div className="checkout-product-placeholder" aria-label="상품 이미지 자리" /><div><p>{product.name}</p><p>{formatPrice(product.price)}원 <span className="checkout-review-quantity">{product.quantity}개</span></p></div></div>)}</Section>
          <div className="checkout-actions">
            <button className="checkout-pay-button" type="button" onClick={validatePayment}>결제하기 <svg className="checkout-pay-chevron" width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true"><path d="M9.89923 21.6001L16.6492 14.8501L9.89923 8.10011" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <button className="checkout-back-button" type="button">이전으로</button>
          </div>
        </aside>
      </div>
    </main>

    {addressTarget && <AddressModal onClose={() => setAddressTarget(null)} onSelect={selectAddress} onManual={() => {
      const scope = addressTarget
      setAddressTarget(null)
      requestAnimationFrame(() => mainRef.current?.querySelector(`[aria-label="${scope === 'order' ? '주문자' : '배송지'} 기본주소"]`)?.focus())
    }} />}
  </div>
}
