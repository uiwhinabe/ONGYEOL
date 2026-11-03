import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { navigateToProducts } from '../utils/productNavigation.js'
import { useAuth } from './authContext.js'
import { mypageMenuGroups } from '../pages/Mypage/mypageMenus.js'
import './HamburgerDropdown.css'

const categories = [
  { title: '제품유형별', items: ['토너/패드', '에센스/앰플', '로션/크림', '클렌징', '마스크팩'] },
  { title: '핵심라인별', items: ['백목이', '오디', '닥열매', '레몬', '장미'], defaultCategory: '백목이' },
  { title: '피부고민별', items: ['민감/진정', '수분/보습', '모공/피지', '피부톤/기미잡티', '주름/탄력'] },
]

function MyPageAccordion({ onClose }) {
  const { isAuthenticated, enterLogin } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const visit = event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    flushSync(onClose)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (!isAuthenticated) {
      event.preventDefault()
      enterLogin()
    }
  }
  return <div className="ongyeol-hd-mypage">
    <div className="ongyeol-hd-mypage-heading">
      <Link className="ongyeol-hd-link" to={isAuthenticated ? '/mypage' : '/login'} onClick={visit} style={{ textDecoration: 'none' }}>마이페이지</Link>
      <button className={`ongyeol-hd-plus${expanded ? ' is-expanded' : ''}`} type="button"
        aria-label={`마이페이지 하위 메뉴 ${expanded ? '접기' : '펼치기'}`}
        aria-expanded={expanded} aria-controls="hd-mypage-items" onClick={() => setExpanded(value => !value)} />
    </div>
    <ul className="ongyeol-hd-items" id="hd-mypage-items" hidden={!expanded}>
      {mypageMenuGroups.flatMap(([, items]) => items).map(([label, path]) => <li key={path}>
        <Link className="ongyeol-hd-item" to={isAuthenticated ? path : '/login'} onClick={visit}>{label.replace(/^·\s*/, '')}</Link>
      </li>)}
    </ul>
  </div>
}

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
        <MyPageAccordion key={String(panelOpen)} onClose={controller.close} />
        {['SKIN GUIDE', 'EVENT', 'BRAND'].map((label) => label === 'SKIN GUIDE'
          ? <Link className="ongyeol-hd-link" key={label} to="/skin-guide" onClick={controller.close} style={{ textDecoration: 'none' }}>{label}</Link>
          : label === 'EVENT'
          ? <Link className="ongyeol-hd-link" key={label} to="/event?tab=ongoing" onClick={controller.close} style={{ textDecoration: 'none' }}>{label}</Link>
          : <Link className="ongyeol-hd-link" key={label} to="/brand" onClick={controller.close} style={{ textDecoration: 'none' }}>{label}</Link>)}
      </nav>
    </div>
  )
}
