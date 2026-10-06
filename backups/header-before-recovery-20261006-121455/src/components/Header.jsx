import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import './Header.css'
import ShopDropdown from './ShopDropdown.jsx'
import SearchDropdown from './SearchDropdown.jsx'
import memberDesktop from '../assets/header/member-desktop.svg'
import memberTablet from '../assets/header/member-tablet.svg'
import memberMobile from '../assets/header/member-mobile.svg'
import searchDesktop from '../assets/header/search-desktop.svg'
import searchTablet from '../assets/header/search-tablet.svg'
import searchMobile from '../assets/header/search-mobile.svg'
import support from '../assets/header/support.svg'
import cart from '../assets/header/cart.svg'

const menuItems = [
  { id: 'shop', label: 'SHOP' },
  { id: 'skin-guide', label: 'SKIN GUIDE' },
  { id: 'event', label: 'EVENT' },
  { id: 'brand', label: 'BRAND' },
]

function ResponsiveIcon({ desktop, tablet, mobile }) {
  return (
    <picture className="ongyeol-header-icon">
      <source media="(max-width: 599px)" srcSet={mobile} />
      <source media="(max-width: 1599px)" srcSet={tablet} />
      <img src={desktop} alt="" />
    </picture>
  )
}

export default function Header({ onSearch }) {
  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const headerRef = useRef(null)
  const shopRef = useRef(null)
  const dropdownRef = useRef(null)
  const searchTriggerRef = useRef(null)
  const searchDropdownRef = useRef(null)
  const closeTimer = useRef(null)
  const cancelClose = () => window.clearTimeout(closeTimer.current)
  const openShop = () => {
    cancelClose()
    if (window.matchMedia('(min-width: 835px)').matches) {
      setSearchOpen(false)
      setShopOpen(true)
    }
  }
  const closeShop = () => {
    cancelClose()
    setShopOpen(false)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setShopOpen(false), 120)
  }
  const handleBlur = (event) => {
    const next = event.relatedTarget
    if (!shopRef.current?.contains(next) && !dropdownRef.current?.contains(next)) closeShop()
  }
  const toggleSearch = () => {
    if (!window.matchMedia('(min-width: 1600px)').matches) return
    closeShop()
    setSearchOpen((previous) => !previous)
  }
  useEffect(() => {
    if (!searchOpen) return
    const handleOutsideClick = (event) => {
      if (!searchDropdownRef.current?.contains(event.target) && !searchTriggerRef.current?.contains(event.target)) {
        setSearchOpen(false)
      }
    }
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setSearchOpen(false)
      searchTriggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [searchOpen])
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1600px)')
    const update = () => {
      headerRef.current?.style.setProperty('--shop-header-bottom', `${Math.max(0, headerRef.current.getBoundingClientRect().bottom)}px`)
      if (!desktop.matches) {
        setSearchOpen(false)
      }
      if (!window.matchMedia('(min-width: 835px)').matches) setShopOpen(false)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.clearTimeout(closeTimer.current)
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [])
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && shopOpen) {
      event.preventDefault()
      // Restore focus before closing so focus does not reopen the panel.
      shopRef.current?.focus()
      closeShop()
    }
    if (event.target === shopRef.current && event.key === 'ArrowDown') {
      event.preventDefault()
      flushSync(openShop)
      dropdownRef.current?.querySelector('button, a')?.focus()
    }
  }
  return (
    <header className="ongyeol-header" ref={headerRef} onKeyDown={handleKeyDown}>
      <div className="ongyeol-header-banner">
        <p className="ongyeol-header-tagline">온전한 자연에서 찾은, 건강한 피부의 결</p>
      </div>
      <div className="ongyeol-header-bar">
        <nav className="ongyeol-header-navigation" aria-label="주 메뉴">
          <ul className="ongyeol-header-menu">
            {menuItems.map(({ id, label }) => (
              <li key={id} className={`ongyeol-header-menu-item${id === 'shop' ? ' ongyeol-header-shop-item' : ''}`} onMouseEnter={id === 'shop' ? openShop : closeShop} onMouseLeave={id === 'shop' ? scheduleClose : undefined}>
                {/* 페이지 연결 시 이 span을 React Router Link로 교체합니다. */}
                {id === 'shop' ? (
                  <button ref={shopRef} id="shop-trigger" className="ongyeol-header-menu-label ongyeol-header-shop-trigger" type="button" aria-expanded={shopOpen} aria-controls="shop-dropdown" onFocus={openShop} onBlur={handleBlur} onClick={openShop}>
                    {label}
                  </button>
                ) : <span className="ongyeol-header-menu-label">{label}</span>}
                {id === 'shop' && <ShopDropdown ref={dropdownRef} open={shopOpen} onMouseEnter={cancelClose} onMouseLeave={scheduleClose} onBlur={handleBlur} onClose={closeShop} />}
              </li>
            ))}
          </ul>
        </nav>
        <button className="ongyeol-header-menu-button" type="button" aria-label="메뉴 열기">
          <span className="ongyeol-header-hamburger" aria-hidden="true">
            <span className="ongyeol-header-hamburger-line" />
            <span className="ongyeol-header-hamburger-line" />
            <span className="ongyeol-header-hamburger-line" />
          </span>
        </button>
        <div className="ongyeol-header-logo" aria-label="온결">
          <span className="ongyeol-header-wordmark">ONGYEOL</span>
        </div>
        <div className="ongyeol-header-actions">
          <button className="ongyeol-header-action" type="button" aria-label="로그인">
            <ResponsiveIcon desktop={memberDesktop} tablet={memberTablet} mobile={memberMobile} />
          </button>
          <button ref={searchTriggerRef} id="search-trigger" className="ongyeol-header-action" type="button" aria-label="검색" aria-expanded={searchOpen} aria-controls="search-dropdown" onClick={toggleSearch}>
            <ResponsiveIcon desktop={searchDesktop} tablet={searchTablet} mobile={searchMobile} />
          </button>
          <button className="ongyeol-header-action ongyeol-header-action-desktop" type="button" aria-label="고객센터">
            <img className="ongyeol-header-static-icon" src={support} width="26.25" height="26.2212" alt="" />
          </button>
          <button className="ongyeol-header-action ongyeol-header-action-desktop" type="button" aria-label="장바구니">
            <img className="ongyeol-header-static-icon" src={cart} width="25" height="25" alt="" />
          </button>
        </div>
      </div>
      <SearchDropdown ref={searchDropdownRef} open={searchOpen} onSearch={onSearch} />
    </header>
  )
}
