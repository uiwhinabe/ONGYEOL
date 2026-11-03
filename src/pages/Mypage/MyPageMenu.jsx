import sidebarLine from '../../assets/mypage/sidebar-line.svg'
import './MypageSidebar.css'
import { mypageMenuGroups } from './mypageMenus.js'

export default function MyPageMenu({ activeMenu, onMenuChange }) {
  return (
    <aside className={`ongyeol-mypage-menu${activeMenu ? ' mp-menu-has-selection' : ''}`} aria-label="마이페이지 메뉴">
      {mypageMenuGroups.map(([title, items], index) => (
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
