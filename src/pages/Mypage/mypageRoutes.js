import ContactUs from '../Contact Us.jsx'
import MypageOrders from './MypageOrders.jsx'
import MypageReturns from './MypageReturns.jsx'
import MypageRefunds from './MypageRefunds.jsx'
import MypageAddresses from './MypageAddresses.jsx'
import MypageAddressesPopulated from './MypageAddressesPopulated.jsx'
import MypageCoupons from './MypageCoupons.jsx'
import MypageAccount from './MypageAccount.jsx'
import MypageAccountEmail from './MypageAccountEmail.jsx'
import MypageAccountPassword from './MypageAccountPassword.jsx'
import MypageAccountHelp from './MypageAccountHelp.jsx'
import MypageSkin from './MypageSkin.jsx'
import MypageSkinSettings from './MypageSkinSettings.jsx'

// Each Figma state has a stable URL for direct access and refresh.
export const mypageScreens = {
  '/contact': { Content: ContactUs, active: '/contact', title: true, variant: 'contact' },
  '/mypage/orders': { Content: MypageOrders, frame: '2275:24028', active: '/mypage/orders', title: true, wide: true },
  '/mypage/returns': { Content: MypageReturns, frame: '2275:23889', active: '/mypage/returns', title: true, wide: true },
  '/mypage/refunds': { Content: MypageRefunds, frame: '2275:23648', active: '/mypage/refunds', title: true },
  '/mypage/addresses': { Content: MypageAddresses, frame: '2275:23787', active: '/mypage/addresses', title: true },
  '/mypage/addresses/populated': { Content: MypageAddressesPopulated, frame: '2275:24125', active: '/mypage/addresses', title: true },
  '/mypage/addresses/new': { Content: MypageAddresses, frame: '2275:24236', active: '/mypage/addresses', title: true, dialog: true },
  '/mypage/coupons': { Content: MypageCoupons, frame: '2275:23490', active: '/mypage/coupons', title: true },
  '/mypage/account': { Content: MypageAccount, frame: '2275:24396', active: '/mypage/account', variant: 'account' },
  '/mypage/account/email': { Content: MypageAccountEmail, frame: '2275:24685', active: '/mypage/account', variant: 'account' },
  '/mypage/account/password': { Content: MypageAccountPassword, frame: '2275:25287', active: '/mypage/account', variant: 'account-password' },
  '/mypage/account/password-help': { Content: MypageAccountHelp, frame: '2275:24985', active: '/mypage/account', variant: 'account-help' },
  '/mypage/skin': { Content: MypageSkin, frame: '2275:25590', active: '/mypage/skin', variant: 'skin' },
  '/mypage/skin/settings': { Content: MypageSkinSettings, frame: '2275:25807', active: '/mypage/skin', variant: 'skin-settings' },
}
