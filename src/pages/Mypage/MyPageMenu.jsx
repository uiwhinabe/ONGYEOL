import sidebarLine from '../../assets/mypage/sidebar-line.svg'
import './MypageSidebar.css'

const menus = [
  ['쇼핑정보', [
    ['· 주문목록/배송조회', '/mypage/orders'],
    ['· 취소/반품/교환 내역', '/mypage/returns'],
    ['· 환불/입금 내역', '/mypage/refunds'],
    ['· 배송지 관리', '/mypage/addresses'],
  ]],
  ['나의 피부 정보', [['· 나의 피부 정보', '/mypage/skin']]],
  ['혜택관리', [['· 쿠폰함', '/mypage/coupons']]],
  ['고객센터', [['· 1:1 문의', '/contact']]],
  ['회원정보', [['· 회원정보 변경', '/mypage/account']]],
]

export default function MyPageMenu({ activeMenu, onMenuChange }) {
  return (
    <aside className={`ongyeol-mypage-menu${activeMenu ? ' mp-menu-has-selection' : ''}`} aria-label="마이페이지 메뉴">
      {menus.map(([title, items], index) => (
        <div className={`ongyeol-mypage-menu-group group-${index}`} key={title}>
          {index > 0 && <img className="ongyeol-mypage-menu-line" src={sidebarLine} alt="" />}
          <section>
            <h2>{title}</h2>
            <div>{items.map(([label, href]) => (
              <p key={label} className={href && activeMenu === href ? 'mp-menu-current mp-menu-selected' : undefined}>
                {href ? <button type="button" onClick={() => onMenuChange(href)} aria-current={activeMenu === href ? 'page' : undefined}>{label}</button> : label}
              </p>
            ))}</div>
          </section>
        </div>
      ))}
    </aside>
  )
}
