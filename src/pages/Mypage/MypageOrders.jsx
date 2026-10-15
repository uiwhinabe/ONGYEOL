import { ShoppingBenefits, ShoppingOrderStatus } from './MypageShoppingTablet.jsx'
import imgLine2 from '../../assets/mypage/screens/083a1.svg'
import imgLine3 from '../../assets/mypage/screens/6d799.svg'
import MypageShoppingMobileCards from './MypageShoppingMobileCards.jsx'
import './MypageShoppingMobile.css'

// Figma frame 2275:24028; content node 2275:24086.
export default function MypageOrders({ testRecords = [] }) {
  // Like the other shopping screens, only explicitly injected test fixtures
  // can populate this presentation. The normal route remains empty.
  const records = testRecords.filter(record => record.isTest === true)
  return (
    <div className="mp-view-102 mp-shopping mp-shopping-orders" data-node-id="2275:24086" data-name="주문목록">
<ShoppingBenefits />
<ShoppingOrderStatus />
              <div className="mp-view-70" data-node-id="2275:24101" data-name="최근주문정보 전체">
                <div className="mp-view-103" data-node-id="2275:24102">
                  <div className="mp-view-37" data-node-id="2275:24103">
                    <p className="mp-view-104 mp-shopping-desktop-title" data-node-id="2275:24104" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      주문목록 / 배송조회내역
                    </p>
                  <p className="mp-shopping-tablet-title">최근 주문 정보</p>
                  </div>
                  <p className="mp-shopping-tablet-caption">(최근 3개월 기준)</p>
                  <div className="mp-view-72" data-node-id="2275:24105">
                    <p className="mp-view-3" data-node-id="2275:24106" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-73">{`총 `}</span>
                      <span className="mp-view-74">{records.length}</span>
                      <span className="mp-view-73">건</span>
                    </p>
                  </div>
                </div>
                <div className="mp-view-75" data-node-id="2275:24107" data-name="최근주문 정보">
                  <div className="mp-view-76" data-node-id="2275:24108">
                    <div className="mp-view-41" data-node-id="2275:24109" data-name="최근 주문 정보 수정">
                      <div className="mp-view-42" data-node-id="2275:24110" data-name="최근 주문 정보">
                        <div className="mp-view-43" data-node-id="2275:24111">
                          <div className="mp-view-44">
                            <img alt="" className="mp-view-14" src={imgLine2} />
                          </div>
                        </div>
                        <div className="mp-view-77" data-node-id="2275:24112" data-name="날짜/주문번호">
                          <p className="mp-view-46" data-node-id="2275:24113" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            날짜/주문번호
                          </p>
                        </div>
                        <div className="mp-view-47" data-node-id="2275:24114" data-name="상품명/옵션">
                          <p className="mp-view-46" data-node-id="2275:24115" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            상품명/옵션
                          </p>
                        </div>
                        <div className="mp-view-78" data-node-id="2275:24116" data-name="상품금액/수량">
                          <p className="mp-view-46" data-node-id="2275:24117" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            상품금액/수량
                          </p>
                        </div>
                        <div className="mp-view-79" data-node-id="2275:24118" data-name="주문상태">
                          <p className="mp-view-46" data-node-id="2275:24119" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            주문상태
                          </p>
                        </div>
                        <div className="mp-view-80" data-node-id="2275:24120" data-name="리뷰">
                          <p className="mp-view-46" data-node-id="2275:24121" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            리뷰
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`mp-view-37${records.length ? ' mp-shopping-fixture-empty' : ''}`} data-node-id="2275:24122">
                    <p className="mp-view-81" data-node-id="2275:24123" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      조회 내역이 없습니다.
                    </p>
                  </div>
                  <MypageShoppingMobileCards records={records} variant="orders" />
                  <div className="mp-view-82" data-node-id="2275:24124">
                    <div className="mp-view-13">
                      <img alt="" className="mp-view-14" src={imgLine3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}
