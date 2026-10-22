import { DEFAULT_USER_NAME } from './mypageUser.js'
import { useId, useRef, useState } from 'react'
import MypageBenefits from './MypageBenefits.jsx'
import summaryLine from './tablet-summary-line.svg'
import chevron from './tablet-period-chevron.svg'
import arrow from '../../assets/mypage/arrow.svg'
import mobileArrow from './mobile-shopping-stage-arrow.svg'
import './MypageShoppingTablet.css'
import './ShoppingBenefits.css'

// Only the three shopping screens use this tablet presentation.
export function ShoppingBenefits() {
  return <>
    <MypageBenefits />
    <section className="mp-shopping-benefits" aria-label="회원등급 및 혜택">
      <p>{DEFAULT_USER_NAME}님은 Welcome등급 <span>입니다.</span></p>
      <div className="mp-shopping-benefit-items">
        {[['쿠폰', '1장'], ['주문현황', '배송중 0건'], ['찜한 제품', '0개']].map(([label, value], index) =>
          <div className="mp-shopping-benefit-item" key={label}>
            {index > 0 && <span className="mp-shopping-benefit-divider"><img src={summaryLine} alt="" /></span>}
            <h2>{label}</h2><p>{value}</p>
          </div>)}
      </div>
    </section>
  </>
}

const periods = ['오늘', '1개월', '3개월', '1년']
export function ShoppingPeriod({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const trigger = useRef(null)
  // A custom range and the desktop-only seven-day range must never imply three months.
  const label = value === null ? '기간조회' : value === '오늘' || value === '7일' ? value : `최근 ${value}`
  function choose(period) {
    onChange(period)
    setOpen(false)
    trigger.current.focus()
  }
  return <div className="mp-shopping-period" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }} onKeyDown={event => {
    if (event.key === 'Escape') { setOpen(false); trigger.current.focus() }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      const direction = event.key === 'ArrowDown' ? 1 : -1
      requestAnimationFrame(() => {
        const options = [...document.getElementById(id).querySelectorAll('[role="option"]')]
        const current = options.indexOf(document.activeElement)
        options[(current + direction + options.length) % options.length].focus()
      })
    }
  }}>
    <button ref={trigger} type="button" aria-label="기간 선택" aria-haspopup="listbox" aria-expanded={open} aria-controls={id} onClick={() => setOpen(previous => !previous)}>
      <span className="mp-button-label"><span className="mp-button-text">{label}</span></span><img src={chevron} alt="" />
    </button>
    {open && <div id={id} role="listbox" aria-label="조회 기간">
      {periods.map(period => <button key={period} type="button" role="option" aria-selected={value === period} onClick={() => choose(period)}>{period}</button>)}
    </div>}
  </div>
}

export function ShoppingOrderStatus() {
  const stages = ['주문접수', '결제완료', '상품준비중', '배송중', '배송완료']
  const arrows = [arrow, arrow, arrow, arrow]
  return <section className="mp-shopping-order-status" aria-label="나의 주문 처리 현황">
    <div className="mp-shopping-section-title"><h2>나의 주문 처리 현황</h2><p>(최근 3개월 기준)</p></div>
    <div className="mp-shopping-status-card">
      <div className="mp-shopping-stages">
        {stages.map((stage, index) => <div className={`mp-shopping-stage mp-shopping-stage-${index}`} key={stage}>
          <div><span>0</span><p>{stage}</p></div>
          {arrows[index] && <img src={arrows[index]} alt="" />}
          {arrows[index] && <img className="mp-shopping-mobile-stage-arrow" src={mobileArrow} alt="" />}
        </div>)}
      </div>
      <div className="mp-shopping-status-returns">{['취소', '교환', '반품'].map(label => <p key={label}>{label} : 0</p>)}</div>
    </div>
  </section>
}
