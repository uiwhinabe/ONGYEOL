import { MyPageButton } from './MyPageButton.jsx'
import { ShoppingBenefits } from './MypageShoppingTablet.jsx'
import './MypageAddressDetailsTablet.css'
import './MypageAddressesMobile.css'
import mobileRadio from './mobile-address-radio.svg'
import mobileMore from './mobile-address-more.svg'
import imgLine2 from '../../assets/mypage/screens/083a1.svg'
import imgLine3 from '../../assets/mypage/screens/3a1d3.svg'

// Figma frame 2275:24125; content node 2275:24183.
export default function MypageAddressesPopulated({ addresses = [], onAdd, onEdit, onDelete }) {
  return (
    <div className="mp-view-83 mp-address-populated" data-node-id="2275:24183">
              <div className="mp-view-76" data-node-id="2275:24184" data-name="취소">
                <div className="mp-view-76" data-node-id="2275:24185">
<ShoppingBenefits />
                </div>
              </div>
              <div className="mp-view-36" data-node-id="2275:24200" data-name="최근주문정보 전체">
                <div className="mp-view-84" data-node-id="2275:24201">
                  <div className="mp-view-71" data-node-id="2275:24202">
                    <div className="mp-view-37" data-node-id="2275:24203">
                      <p className="mp-view-38" data-node-id="2275:24204" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        배송지 관리
                      </p>
                    </div>
                    <div className="mp-view-72" data-node-id="2275:24205">
                      <p className="mp-view-3" data-node-id="2275:24206" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-view-73">{`총 `}</span>
                        <span className="mp-view-74">{addresses.length}</span>
                        <span className="mp-view-73">건</span>
                      </p>
                    </div>
                  </div>
                  <MyPageButton to="/mypage/addresses/new" onClick={onAdd} className="mp-screen-action mp-view-85" data-node-id="2275:24207" data-name="배송지추가버튼">
                    <p className="mp-view-86" data-node-id="2275:24208" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      + 새 배송지 추가
                    </p>
                  </MyPageButton>
                </div>
                <div className="mp-view-87" style={{ height: 'auto', minHeight: 215, paddingBottom: 30 }} data-node-id="2275:24209" data-name="최근주문 정보">
                  <div className="mp-view-40" style={{ position: 'relative' }} data-node-id="2275:24210">
                    <div className="mp-view-41" data-node-id="2275:24211" data-name="최근 주문 정보 수정">
                      <div className="mp-view-42" data-node-id="2275:24212" data-name="최근 주문 정보">
                        <div className="mp-view-43" data-node-id="2275:24213">
                          <div className="mp-view-44">
                            <img alt="" className="mp-view-14" src={imgLine2} />
                          </div>
                        </div>
                        <div className="mp-view-77" data-node-id="2275:24214" data-name="날짜/주문번호">
                          <p className="mp-view-46" data-node-id="2275:24215" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            배송지이름
                          </p>
                        </div>
                        <div className="mp-view-47" data-node-id="2275:24216" data-name="상품명/옵션">
                          <p className="mp-view-46" data-node-id="2275:24217" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            받으실 분
                          </p>
                        </div>
                        <div className="mp-view-105" data-node-id="2275:24218" data-name="상품금액/수량">
                          <p className="mp-view-46" data-node-id="2275:24219" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            주소
                          </p>
                        </div>
                        <div className="mp-view-106" data-node-id="2275:24220" data-name="주문상태">
                          <p className="mp-view-46" data-node-id="2275:24221" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            연락처
                          </p>
                        </div>
                        <div className="mp-view-90" data-node-id="2275:24222" data-name="리뷰">
                          <p className="mp-view-46" data-node-id="2275:24223" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            수정/삭제
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-92" style={{ top: 'auto', bottom: 0 }} data-node-id="2275:24224">
                    <div className="mp-view-13">
                      <img alt="" className="mp-view-14" src={imgLine3} />
                    </div>
                  </div>
                  <div style={{ marginTop: 13 }}>
                    {addresses.map(item => (
                      <div key={item.id} className="mp-view-107" data-address-id={item.id} data-is-default={item.isDefault} style={{ position: 'relative', top: 0, height: 'auto', minHeight: 60, display: 'grid', gridTemplateColumns: 'var(--mp-address-columns, 225px 149px 247px 199px 68px)', paddingTop: 4 }}>
                        {item.isDefault && <img className="mp-address-mobile-only mp-address-mobile-radio" src={mobileRadio} alt="" />}
                        <img className="mp-address-mobile-only mp-address-mobile-more" src={mobileMore} alt="" />
                        <div className="mp-view-108" style={{ position: 'static', width: 180, height: 'auto' }}>
                          <span className="mp-address-mobile-only mp-address-mobile-badge" aria-label={item.isDefault ? `${item.label} (기본 배송지)` : item.label}>{item.isDefault ? '기본 배송지' : item.label}</span>
                          <p className="mp-view-109" aria-label={item.isDefault ? `${item.label} (기본 배송지)` : item.label} style={{ position: 'relative', whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{item.label}</p>
                        </div>
                        <div className="mp-view-110" style={{ position: 'static', width: 120, height: 'auto' }}>
                          <p className="mp-view-109" style={{ position: 'relative', whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{item.recipient}</p>
                        </div>
                        <div className="mp-view-111" style={{ position: 'static', height: 'auto' }}>
                          <p className="mp-view-112" style={{ position: 'relative', whiteSpace: 'normal', overflowWrap: 'anywhere' }}>
                            {item.address}<br />{item.detail}
                          </p>
                        </div>
                        <div className="mp-view-113" style={{ position: 'static', width: 170, height: 'auto' }}>
                          <p className="mp-view-109" style={{ position: 'relative', whiteSpace: 'normal' }}>{item.mobile}</p>
                        </div>
                        <div className="mp-view-114" style={{ position: 'static', height: 'auto' }}>
                          <p className="mp-view-109" style={{ position: 'relative' }}>
                            <MyPageButton className="mp-screen-action" to="/mypage/addresses/new" onClick={event => { event.preventDefault(); onEdit(item.id) }} aria-label={`${item.label} 수정`}>수정</MyPageButton> · <MyPageButton className="mp-screen-action" to="/mypage/addresses" onClick={event => { event.preventDefault(); onDelete(item.id) }} aria-label={`${item.label} 삭제`}>삭제</MyPageButton>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  )
}
