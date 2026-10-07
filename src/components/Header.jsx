import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import './Header.css'
import ShopDropdown from './ShopDropdown.jsx'
import SearchDropdown from './SearchDropdown.jsx'
import HamburgerDropdown from './HamburgerDropdown.jsx'
import useHamburgerDropdown from './useHamburgerDropdown.js'
import MemberDropdown from './MemberDropdown.jsx'
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
      <source media="(max-width: 834px)" srcSet={tablet} />
      <img src={desktop} alt="" />
    </picture>
  )
}

export default function Header({ onSearch, accountLinks, chatOpen = false }) {
  const handleLogoClick = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const homeUrl = new URL(event.currentTarget.href)
    if (window.location.pathname === homeUrl.pathname) {
      event.preventDefault()
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }
  const [memberOpen, setMemberOpen] = useState(false)
  const memberTriggerRef = useRef(null)
  const memberCloseTimer = useRef(null)
  const cancelMemberClose = () => window.clearTimeout(memberCloseTimer.current)
  const enterMember = (event) => {
    if (event.pointerType !== 'mouse') return
    cancelMemberClose()
  }
  const leaveMember = (event) => {
    if (event.pointerType !== 'mouse') return
    cancelMemberClose()
    memberCloseTimer.current = window.setTimeout(() => setMemberOpen(false), 150)
  }
  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchAutoFocus, setSearchAutoFocus] = useState(false)
  const headerRef = useRef(null)
  const shopRef = useRef(null)
  const dropdownRef = useRef(null)
  const searchTriggerRef = useRef(null)
  const searchDropdownRef = useRef(null)
  const searchBridgeRef = useRef(null)
  const closeTimer = useRef(null)
  const searchCloseTimer = useRef(null)
  const searchHovered = useRef(false)
  const cancelSearchClose = () => window.clearTimeout(searchCloseTimer.current)
  const scheduleSearchClose = () => {
    cancelSearchClose()
    searchCloseTimer.current = window.setTimeout(() => {
      if (!searchHovered.current) {
        setSearchOpen(false)
      }
    }, 150)
  }
  const enterSearch = (event) => {
    if (event.pointerType !== 'mouse') return
    searchHovered.current = true
    cancelSearchClose()
  }
  const leaveSearch = (event) => {
    if (event.pointerType !== 'mouse') return
    searchHovered.current = false
    scheduleSearchClose()
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)
  const { open: hamburgerOpen, triggerRef: hamburgerTriggerRef, panelRef: hamburgerPanelRef, triggerProps: hamburgerTriggerProps, ...hamburger } = useHamburgerDropdown(() => {
    cancelClose()
    setShopOpen(false)
    setSearchOpen(false)
    setMemberOpen(false)
  })
  const openShop = () => {
    cancelClose()
    if (window.matchMedia('(min-width: 1480px)').matches) {
      setSearchOpen(false)
      setMemberOpen(false)
      hamburger.close()
      setShopOpen(true)
    }
  }
  const closeHamburger = hamburger.close
  useEffect(() => {
    if (!chatOpen) return
    window.clearTimeout(closeTimer.current)
    window.clearTimeout(searchCloseTimer.current)
    window.clearTimeout(memberCloseTimer.current)
    searchHovered.current = false
    const frame = requestAnimationFrame(() => {
      setShopOpen(false)
      setSearchOpen(false)
      setMemberOpen(false)
      closeHamburger()
    })
    return () => cancelAnimationFrame(frame)
  }, [chatOpen, closeHamburger])
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
    setMemberOpen(false)
    cancelSearchClose()
    closeShop()
    hamburger.close()
    setSearchAutoFocus(true)
    setSearchOpen((previous) => !previous || !searchAutoFocus)
  }
  const hoverSearch = (event) => {
    if (event.pointerType !== 'mouse') return
    enterSearch(event)
    setMemberOpen(false)
    closeShop()
    hamburger.close()
    if (!searchOpen) {
      setSearchAutoFocus(false)
      setSearchOpen(true)
    }
  }
  const toggleMember = () => {
    cancelMemberClose()
    cancelSearchClose()
    closeShop()
    setSearchOpen(false)
    hamburger.close()
    setMemberOpen((previous) => !previous)
  }
  const hoverMember = (event) => {
    if (event.pointerType !== 'mouse') return
    enterMember(event)
    cancelSearchClose()
    closeShop()
    setSearchOpen(false)
    hamburger.close()
    setMemberOpen(true)
  }
  useEffect(() => {
    if (!searchOpen) return
    const handleOutsideClick = (event) => {
      if (!searchDropdownRef.current?.contains(event.target) && !searchTriggerRef.current?.contains(event.target) && !searchBridgeRef.current?.contains(event.target)) {
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
    const update = () => {
      headerRef.current?.style.setProperty('--shop-header-bottom', `${Math.max(0, headerRef.current.getBoundingClientRect().bottom)}px`)
      const trigger = searchTriggerRef.current?.getBoundingClientRect()
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom
      if (trigger && headerBottom != null) {
        headerRef.current.style.setProperty('--search-bridge-left', `${trigger.left}px`)
        headerRef.current.style.setProperty('--search-bridge-top', `${trigger.bottom}px`)
        headerRef.current.style.setProperty('--search-bridge-width', `${trigger.width}px`)
        headerRef.current.style.setProperty('--search-bridge-height', `${Math.max(0, headerBottom - trigger.bottom)}px`)
      }
      if (!window.matchMedia('(min-width: 1480px)').matches) setShopOpen(false)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.clearTimeout(closeTimer.current)
      window.clearTimeout(searchCloseTimer.current)
      window.clearTimeout(memberCloseTimer.current)
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
        <button ref={hamburgerTriggerRef} {...hamburgerTriggerProps} className="ongyeol-header-menu-button" type="button" aria-label="메뉴 열기">
          <span className="ongyeol-header-hamburger" aria-hidden="true">
            <span className="ongyeol-header-hamburger-line" />
            <span className="ongyeol-header-hamburger-line" />
            <span className="ongyeol-header-hamburger-line" />
          </span>
        </button>
        <div className="ongyeol-header-logo" aria-label="온결">
          <a className="ongyeol-header-wordmark" href={import.meta.env.BASE_URL} onClick={handleLogoClick} aria-label="온결 홈으로 이동">ONGYEOL</a>
        </div>
        <div className="ongyeol-header-actions">
          <button ref={memberTriggerRef} id="member-trigger" className="ongyeol-header-action ongyeol-header-member-trigger" type="button" aria-label="회원 메뉴" aria-expanded={memberOpen} aria-controls="member-dropdown" onClick={toggleMember} onPointerEnter={hoverMember} onPointerLeave={leaveMember}>
            <ResponsiveIcon desktop={memberDesktop} tablet={memberTablet} mobile={memberMobile} />
          </button>
          <button ref={searchTriggerRef} id="search-trigger" className="ongyeol-header-action" type="button" aria-label="검색" aria-expanded={searchOpen} aria-controls="search-dropdown" onClick={toggleSearch} onPointerEnter={hoverSearch} onPointerLeave={leaveSearch}>
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
      {searchOpen && <div ref={searchBridgeRef} className="ongyeol-search-hover-bridge" aria-hidden="true" onPointerEnter={enterSearch} onPointerLeave={leaveSearch} />}
      <SearchDropdown ref={searchDropdownRef} open={searchOpen} autoFocusInput={searchAutoFocus} onSearch={onSearch} onPointerEnter={enterSearch} onPointerLeave={leaveSearch} />
      <HamburgerDropdown ref={hamburgerPanelRef} open={hamburgerOpen} controller={hamburger} />
      <MemberDropdown open={memberOpen} onClose={() => { cancelMemberClose(); setMemberOpen(false) }} onPointerEnter={enterMember} onPointerLeave={leaveMember} anchorRef={memberTriggerRef} headerRef={headerRef} links={accountLinks} />
    </header>
  )
}
