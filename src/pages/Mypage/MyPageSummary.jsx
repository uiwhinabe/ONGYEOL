import { myPageSummaryData } from './myPageSummaryData.js'
import summaryLine from './tablet-summary-line.svg'
import './MyPageSummary.css'
import imgLine9 from '../../assets/mypage/screens/31115.svg'

export default function MyPageSummary() {
  const { name, grade, couponCount, shippingCount, wishlistCount } = myPageSummaryData
  return (
    <>
    <div className="mp-view-94 mp-summary" data-node-id="2275:24087" data-name="1.등급">
                <p className="mp-coupon-tablet-greeting">{name}님은 {grade}등급 <span>입니다.</span></p>
                <p className="mp-view-3" data-node-id="2275:24088" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-4">{`${name}님의 `}</span>
                  <span className="mp-view-5" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    회원등급은
                  </span>
                  <span className="mp-view-4">{` ${grade}등급 `}</span>
                  <span className="mp-view-5" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    입니다
                  </span>
                  <span className="mp-view-4">.</span>
                </p>
                <div className="mp-view-6" data-node-id="2275:24089" data-name="1.등급">
                  <div className="mp-view-7" data-node-id="2275:24090">
                    <p className="mp-view-8" data-node-id="2275:24091" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      쿠폰
                    </p>
                    <p className="mp-view-9" data-node-id="2275:24092" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      {couponCount}장
                    </p>
                  </div>
                  <div className="mp-view-10" data-node-id="2275:24093">
                    <div className="mp-view-11">
                      <div className="mp-view-12">
                        <div className="mp-view-13">
                          <picture><source media="(max-width: 1432px)" srcSet={summaryLine} /><img alt="" className="mp-view-14" src={imgLine9} /></picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-15" data-node-id="2275:24094">
                    <p className="mp-view-8" data-node-id="2275:24095" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      주문현황
                    </p>
                    <p className="mp-view-16" data-node-id="2275:24096" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      배송중 {shippingCount}건
                    </p>
                  </div>
                  <div className="mp-view-10" data-node-id="2275:24097">
                    <div className="mp-view-11">
                      <div className="mp-view-12">
                        <div className="mp-view-13">
                          <picture><source media="(max-width: 1432px)" srcSet={summaryLine} /><img alt="" className="mp-view-14" src={imgLine9} /></picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-17" data-node-id="2275:24098">
                    <p className="mp-view-8" data-node-id="2275:24099" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      찜한 제품
                    </p>
                    <p className="mp-view-9" data-node-id="2275:24100" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      {wishlistCount}개
                    </p>
                  </div>
                </div>
              </div>
    <section className="mp-shopping-benefits mp-summary-compact" aria-label="회원등급 및 혜택">
      <p>{name}님은 {grade}등급 <span>입니다.</span></p>
      <div className="mp-shopping-benefit-items">
        {[['쿠폰', `${couponCount}장`], ['주문현황', `배송중 ${shippingCount}건`], ['찜한 제품', `${wishlistCount}개`]].map(([label, value], index) =>
          <div className="mp-shopping-benefit-item" key={label}>
            {index > 0 && <span className="mp-shopping-benefit-divider"><img src={summaryLine} alt="" /></span>}
            <h2>{label}</h2><p>{value}</p>
          </div>)}
      </div>
    </section>
    </>
  )
}
