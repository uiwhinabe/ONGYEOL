import { DEFAULT_USER_NAME } from './mypageUser.js'
import { mypageCoupons } from './mypageCouponsData.js'

// Temporary member summary until a member API is connected.
export const myPageSummaryData = Object.freeze({
  name: DEFAULT_USER_NAME,
  grade: 'Welcome',
  couponCount: mypageCoupons.length,
  shippingCount: 0,
  wishlistCount: 0,
})
