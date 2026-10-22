import { MyPageButton } from './MyPageButton.jsx'
import { ShoppingBenefits } from './MypageShoppingTablet.jsx'
import './MypageAddressesTablet.css'
import './MypageAddressesMobile.css'
import imgLine2 from '../../assets/mypage/screens/083a1.svg'
import imgLine3 from '../../assets/mypage/screens/3a1d3.svg'

// Figma frame 2275:23787; content node 2275:23845.
export default function MypageAddresses({ onAdd }) {
  return (
    <div className="mp-view-83 mp-address-empty" data-node-id="2275:23845">
              <div className="mp-view-76" data-node-id="2275:23846" data-name="취소">
                <div className="mp-view-76" data-node-id="2275:23847">
<ShoppingBenefits />
                </div>
              </div>
              <div className="mp-view-36" data-node-id="2275:23862" data-name="최근주문정보 전체">
                <div className="mp-view-84" data-node-id="2275:23863">
                  <div className="mp-view-71" data-node-id="2275:23864">
                    <div className="mp-view-37" data-node-id="2275:23865">
                      <p className="mp-view-38" data-node-id="2275:23866" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        배송지 관리
                      </p>
                    </div>
                    <div className="mp-view-72" data-node-id="2275:23867">
                      <p className="mp-view-3" data-node-id="2275:23868" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-view-73">{`총 `}</span>
                        <span className="mp-view-74">0</span>
                        <span className="mp-view-73">건</span>
                      </p>
                    </div>
                  </div>
                  <MyPageButton to="/mypage/addresses/new" onClick={onAdd} className="mp-screen-action mp-view-85" data-node-id="2275:23869" data-name="배송지추가버튼">
                    <p className="mp-view-86" data-node-id="2275:23870" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      + 새 배송지 추가
                    </p>
                  </MyPageButton>
                </div>
                <div className="mp-view-87" data-node-id="2275:23871" data-name="최근주문 정보">
                  <div className="mp-view-40" data-node-id="2275:23872">
                    <div className="mp-view-41" data-node-id="2275:23873" data-name="최근 주문 정보 수정">
                      <div className="mp-view-42" data-node-id="2275:23874" data-name="최근 주문 정보">
                        <div className="mp-view-43" data-node-id="2275:23875">
                          <div className="mp-view-44">
                            <img alt="" className="mp-view-14" src={imgLine2} />
                          </div>
                        </div>
                        <div className="mp-view-77" data-node-id="2275:23876" data-name="날짜/주문번호">
                          <p className="mp-view-46" data-node-id="2275:23877" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            배송지이름
                          </p>
                        </div>
                        <div className="mp-view-47" data-node-id="2275:23878" data-name="상품명/옵션">
                          <p className="mp-view-46" data-node-id="2275:23879" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            받으실 분
                          </p>
                        </div>
                        <div className="mp-view-88" data-node-id="2275:23880" data-name="상품금액/수량">
                          <p className="mp-view-46" data-node-id="2275:23881" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            주소
                          </p>
                        </div>
                        <div className="mp-view-89" data-node-id="2275:23882" data-name="주문상태">
                          <p className="mp-view-46" data-node-id="2275:23883" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            연락처
                          </p>
                        </div>
                        <div className="mp-view-90" data-node-id="2275:23884" data-name="리뷰">
                          <p className="mp-view-46" data-node-id="2275:23885" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            수정/삭제
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-91" data-node-id="2275:23886">
                    <p className="mp-view-81" data-node-id="2275:23887" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      조회 내역이 없습니다.
                    </p>
                  </div>
                  <div className="mp-view-92" data-node-id="2275:23888">
                    <div className="mp-view-13">
                      <img alt="" className="mp-view-14" src={imgLine3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}
