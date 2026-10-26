import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { navigateToProducts } from '../utils/productNavigation.js'
import './HamburgerDropdown.css'

const categories = [
  { title: '제품유형별', items: ['토너/패드', '에센스/앰플', '로션/크림', '클렌징', '마스크팩'] },
  { title: '핵심라인별', items: ['백목이', '오디', '닥열매', '레몬', '장미'], defaultCategory: '백목이' },
  { title: '피부고민별', items: ['민감/진정', '수분/보습', '모공/피지', '피부톤/기미잡티', '주름/탄력'] },
]

export default function HamburgerDropdown({ ref, open: panelOpen, controller }) {
  const navigate = useNavigate()
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
          {categories.map(({ title, items, defaultCategory }, index) => {
            const open = expanded.includes(index)
            return (
              <div key={title}>
                <div className="ongyeol-hd-category">
                  <button className="ongyeol-hd-title" type="button" onClick={() => {
                    controller.close()
                    navigateToProducts(['type', 'line', 'concern'][index], index === 0 ? '전체' : defaultCategory || items[0], navigate)
                  }}>{title}</button>
                  <button className={`ongyeol-hd-plus${open ? ' is-expanded' : ''}`} type="button"
                    aria-label={`${title} 하위 메뉴 ${open ? '접기' : '펼치기'}`}
                    aria-expanded={open} aria-controls={`hd-items-${index}`}
                    onClick={() => setExpanded((values) => open ? values.filter((value) => value !== index) : [...values, index])} />
                </div>
                <ul className="ongyeol-hd-items" id={`hd-items-${index}`} hidden={!open}>
                  {items.map((label) => <li key={label}><button className="ongyeol-hd-item" type="button" onClick={() => {
                    controller.close()
                    navigateToProducts(['type', 'line', 'concern'][index], label, navigate)
                  }}>{label}</button></li>)}
                </ul>
              </div>
            )
          })}
        </div>
        {/* Page files have no connected routes yet. Do not invent destinations. */}
        <button className="ongyeol-hd-link ongyeol-hd-mypage" type="button" aria-disabled="true">마이페이지</button>
        {['SKIN GUIDE', 'EVENT', 'BRAND'].map((label) => label === 'SKIN GUIDE'
          ? <Link className="ongyeol-hd-link" key={label} to="/skin-guide" onClick={controller.close} style={{ textDecoration: 'none' }}>{label}</Link>
          : label === 'EVENT'
          ? <Link className="ongyeol-hd-link" key={label} to="/event?tab=ongoing" onClick={controller.close} style={{ textDecoration: 'none' }}>{label}</Link>
          : <Link className="ongyeol-hd-link" key={label} to="/brand" onClick={controller.close} style={{ textDecoration: 'none' }}>{label}</Link>)}
      </nav>
    </div>
  )
}
