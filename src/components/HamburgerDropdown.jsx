import { useState } from 'react'
import './HamburgerDropdown.css'

const categories = [
  { title: '제품유형별', items: ['토너/패드', '에센스/앰플', '로션/크림', '클렌징', '마스크팩'] },
  { title: '핵심라인별', items: ['닥열매', '백목이', '오디', '레몬', '장미'] },
  { title: '피부고민별', items: ['민감/진정', '수분/보습', '모공/피지', '피부톤/기미잡티', '주름/탄력'] },
]

export default function HamburgerDropdown({ ref, open: panelOpen, controller }) {
  const [expanded, setExpanded] = useState([])
  return (
    <div className={`ongyeol-hd-layer${panelOpen ? ' is-open' : ''}`} inert={!panelOpen} aria-hidden={!panelOpen}
      onTransitionEnd={(event) => {
        if (!panelOpen && event.target === event.currentTarget && event.propertyName === 'opacity') setExpanded([])
      }}>
      <div className="ongyeol-hd-overlay" aria-hidden="true" onClick={controller.close} />
      <nav ref={ref} id="hamburger-dropdown" className="ongyeol-hd-panel" aria-label="전체 메뉴"
        onPointerEnter={controller.cancelClose} onPointerLeave={(event) => { if (event.pointerType === 'mouse') controller.scheduleClose() }} onBlur={controller.onBlur}>
        <h2 className="ongyeol-hd-heading">SHOP</h2>
        <div className="ongyeol-hd-categories">
          {categories.map(({ title, items }, index) => {
            const open = expanded.includes(index)
            return (
              <div key={title}>
                <button className="ongyeol-hd-category" type="button" aria-expanded={open} aria-controls={`hd-items-${index}`}
                  onClick={() => setExpanded((values) => open ? values.filter((value) => value !== index) : [...values, index])}>
                  <span>{title}</span><span className={`ongyeol-hd-plus${open ? ' is-expanded' : ''}`} aria-hidden="true" />
                </button>
                <ul className="ongyeol-hd-items" id={`hd-items-${index}`} hidden={!open}>
                  {items.map((label) => <li key={label}><button className="ongyeol-hd-item" type="button" aria-disabled="true">{label}</button></li>)}
                </ul>
              </div>
            )
          })}
        </div>
        {/* Page files have no connected routes yet. Do not invent destinations. */}
        <button className="ongyeol-hd-link ongyeol-hd-mypage" type="button" aria-disabled="true">마이페이지</button>
        {['SKIN GUIDE', 'EVENT', 'BRAND'].map((label) => <button className="ongyeol-hd-link" key={label} type="button" aria-disabled="true">{label}</button>)}
      </nav>
    </div>
  )
}
