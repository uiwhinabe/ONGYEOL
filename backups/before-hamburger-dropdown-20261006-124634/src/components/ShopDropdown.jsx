import './ShopDropdown.css'
import welcomeBenefit from '../assets/images/events/welcome-benefit.png'

const categories = [
  { title: '제품유형별', items: ['토너/패드', '에센스/앰플', '로션/크림', '클렌징', '마스크팩'] },
  { title: '핵심라인별', items: ['닥열매', '백목이', '오디', '레몬', '장미'] },
  { title: '피부고민별', items: ['민감/진정', '수분/보습', '모공/피지', '피부톤/기미잡티', '주름/탄력'] },
]

export default function ShopDropdown({ ref, open, onMouseEnter, onMouseLeave, onBlur, onClose }) {
  return (
    <div className={`shop-dropdown-layer${open ? ' is-open' : ''}`} inert={!open} aria-hidden={!open}>
      <div className="shop-dropdown-overlay" aria-hidden="true" onClick={onClose} onMouseEnter={onMouseLeave} />
      <div ref={ref} id="shop-dropdown" className="shop-dropdown" role="region" aria-labelledby="shop-trigger" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onBlur={onBlur}>
        <div className="shop-dropdown-inner">
          <div className="shop-dropdown-categories">
            {categories.map(({ title, items }, index) => (
              <section key={title} aria-labelledby={`shop-category-${index}`}>
                <h2 id={`shop-category-${index}`} className="shop-dropdown-title">{title}</h2>
                <ul className="shop-dropdown-list">
                  {items.map((label) => (
                    <li key={label}>
                      {/* No category routes exist yet. Keep items focusable without inventing URLs. */}
                      <button type="button" className="shop-dropdown-item" aria-disabled="true">{label}</button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <img
            className="shop-dropdown-banner"
            src={welcomeBenefit}
            width="465"
            height="264"
            alt="온결 신규가입 회원 10,000원 쿠폰 이벤트"
          />
        </div>
      </div>
    </div>
  )
}
