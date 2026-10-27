import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'
import '../../components/FooterPageLayout.css'
import MyPageMenu from './MyPageMenu.jsx'
import { MyPageContext } from './MyPageContext.js'
import { MyPageButton } from './MyPageButton.jsx'
import { MypageContent } from './MypageHomeContent.jsx'
import { mypageScreens } from './mypageRoutes.js'
import MypageAddresses from './MypageAddresses.jsx'
import MypageAddressesPopulated from './MypageAddressesPopulated.jsx'
import MypageAddressDialog from './MypageAddressDialog.jsx'
import useMypageAddressBook from './useMypageAddressBook.js'
import './Mypage.css'
import './MypageScreens.css'
import './MypageLayout.css'
import './MypageMobile.css'
import './MyPageNavigation.css'
import './MypageOrderStatus.css'
import chatLogo from '../../assets/images/chat/ongyeol-logo.png'

export default function MyPage(props) {
  return <MyPageLayout {...props} />
}

function MyPageLayout() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const activeMenu = location.pathname === '/mypage' || Object.hasOwn(mypageScreens, location.pathname) ? location.pathname : '/mypage'
  const [email, setEmail] = useState('ongyeol@gmail.com')
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [drafts, setDrafts] = useState({})
  const [memoDraft, setMemoDraft] = useState('')
  const isMyPage = path => path === '/mypage' || Object.hasOwn(mypageScreens, path)
  function navigate(path, replace = false) {
    if (!isMyPage(path)) return
    if (location.pathname !== path) routerNavigate(path, { replace })
  }
  const addressBook = useMypageAddressBook(activeMenu, navigate)
  useLayoutEffect(() => {
    // The document scrolls; reset after the route DOM commits, before paint.
    if (window.matchMedia('(max-width: 1432px)').matches) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.pathname])

  useEffect(() => {
    const nextPath = location.pathname
    if (nextPath.startsWith('/mypage/') && !Object.hasOwn(mypageScreens, nextPath)) routerNavigate('/mypage', { replace: true })
    else if (nextPath !== '/mypage' && !Object.hasOwn(mypageScreens, nextPath)) window.location.reload()
  }, [location.pathname, routerNavigate])

  const home = activeMenu === '/mypage'
  const screen = mypageScreens[activeMenu]
  const isAddresses = screen?.active === '/mypage/addresses'
  const Content = screen?.Content
  const context = { navigate, email, setEmail, passwords, setPasswords, memoDraft, setMemoDraft, drafts, setDrafts }
  return (
    <MyPageContext.Provider value={context}>
      <main className={`ongyeol-mypage ${home ? 'ongyeol-mypage-home' : 'ongyeol-mypage-screens'}${screen?.wide ? ' mp-page-wide' : ''}${screen?.variant ? ` mp-page-${screen.variant}` : ''}`} data-figma-frame={screen?.frame}>
        <div className={`${home ? 'ongyeol-mypage-inner' : 'mp-page-layout'} ongyeol-mypage-layout`} data-has-title={home || Boolean(screen?.title)} inert={isAddresses && addressBook.isOpen}>
          {(home || screen?.title) && <h1 className={home ? undefined : 'mp-page-heading'}><MyPageButton to="/mypage">MY PAGE</MyPageButton></h1>}
          <div className={`${home ? 'ongyeol-mypage-columns' : 'mp-page-columns'} ongyeol-mypage-layout-columns`}>
            <MyPageMenu activeMenu={screen?.active} onMenuChange={navigate} />
            {home ? <MypageContent /> : isAddresses ? (
              addressBook.addresses.length > 0
                ? <MypageAddressesPopulated addresses={addressBook.addresses} onAdd={addressBook.add} onEdit={addressBook.edit} onDelete={addressBook.remove} />
                : <MypageAddresses onAdd={addressBook.add} />
            ) : <Content />}
          </div>
        </div>
        {isAddresses && addressBook.isOpen && <div className="mp-dialog-overlay" onMouseDown={event => { if (event.target === event.currentTarget) addressBook.close() }}><MypageAddressDialog value={addressBook.draft} editing={addressBook.editingId !== null} onChange={addressBook.change} onSave={addressBook.save} onClose={addressBook.close} /></div>}
        {home && <button className="ongyeol-mypage-chat" type="button" aria-label="AI 상담"><span><img src={chatLogo} alt="" /></span></button>}
      </main>
    </MyPageContext.Provider>
  )
}
