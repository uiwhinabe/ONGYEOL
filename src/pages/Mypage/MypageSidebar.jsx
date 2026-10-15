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
  ['나의 게시글', [['· 나의 상품문의'], ['· 나의 상품후기']]],
  ['고객센터', [['· 1:1 문의']]],
  ['회원정보', [['· 회원정보 변경', '/mypage/account']]],
]

export default function MypageSidebar({ active }) {
  return (
    <aside className={`ongyeol-mypage-menu${active ? ' mp-menu-selected' : ''}`} aria-label="마이페이지 메뉴">
      {menus.map(([title, items], index) => (
        <div className={`ongyeol-mypage-menu-group group-${index}`} key={title}>
          {index > 0 && <img className="ongyeol-mypage-menu-line" src={sidebarLine} alt="" />}
          <section>
            <h2>{title}</h2>
            <div>{items.map(([label, href]) => (
              <p key={label} className={active === href ? 'mp-menu-current' : undefined}>
                {href ? <a href={href} aria-current={active === href ? 'page' : undefined}>{label}</a> : label}
              </p>
            ))}</div>
          </section>
        </div>
      ))}
    </aside>
  )
}
