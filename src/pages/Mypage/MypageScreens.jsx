import { useEffect, useState } from 'react'
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import MypageSidebar from './MypageSidebar.jsx'
import MypageAddressDialog from './MypageAddressDialog.jsx'
import { mypageScreens } from './mypageRoutes.js'
import MypageAddresses from './MypageAddresses.jsx'
import MypageAddressesPopulated from './MypageAddressesPopulated.jsx'
import useMypageAddressBook from './useMypageAddressBook.js'
import './Mypage.css'
import './MypageScreens.css'
import './MypageLayout.css'
import './MypageMobile.css'


export default function MypageScreens({ pathname }) {
  const [currentPath, setCurrentPath] = useState(pathname)
  const screen = mypageScreens[currentPath]
  function navigateAddress(nextPath, replace = false) {
    window.history[replace ? 'replaceState' : 'pushState'](null, '', nextPath)
    setCurrentPath(nextPath)
  }
  const addressBook = useMypageAddressBook(currentPath, navigateAddress)
  const isAddresses = screen.active === '/mypage/addresses'
  useEffect(() => {
    const onPopState = () => {
      const nextPath = window.location.pathname
      if (Object.hasOwn(mypageScreens, nextPath)) setCurrentPath(nextPath)
      else window.location.reload()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const { Content } = screen
  return (
    <>
      <Header />
      <main className={`ongyeol-mypage ongyeol-mypage-screens${screen.wide ? ' mp-page-wide' : ''}${screen.variant ? ` mp-page-${screen.variant}` : ''}`} data-figma-frame={screen.frame}>
        <div className="mp-page-layout ongyeol-mypage-layout" data-has-title={Boolean(screen.title)} inert={isAddresses && addressBook.isOpen}>
          {screen.title && <h1 className="mp-page-heading"><a href="/mypage">MY PAGE</a></h1>}
          <div className="mp-page-columns ongyeol-mypage-layout-columns">
            <MypageSidebar active={screen.active} />
            {isAddresses ? (
              addressBook.addresses.length > 0
                ? <MypageAddressesPopulated addresses={addressBook.addresses} onAdd={addressBook.add} onEdit={addressBook.edit} onDelete={addressBook.remove} />
                : <MypageAddresses onAdd={addressBook.add} />
            ) : <Content />}
          </div>
        </div>
        {isAddresses && addressBook.isOpen && <div className="mp-dialog-overlay" onMouseDown={event => { if (event.target === event.currentTarget) addressBook.close() }}><MypageAddressDialog value={addressBook.draft} editing={addressBook.editingId !== null} onChange={addressBook.change} onSave={addressBook.save} onClose={addressBook.close} /></div>}
      </main>
      <Footer />
    </>
  )
}
