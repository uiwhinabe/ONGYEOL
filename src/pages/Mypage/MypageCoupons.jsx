import { useRef, useState } from 'react'
import imgLine9 from '../../assets/mypage/screens/31115.svg'
import imgCalendar from '../../assets/mypage/screens/40ae1.svg'
import imgLine2 from '../../assets/mypage/screens/083a1.svg'
import imgLine3 from '../../assets/mypage/screens/e1a1e.svg'
import tabletSummaryLine from './tablet-summary-line.svg'
import tabletRowLine from './tablet-coupon-row-line.svg'
import { ShoppingPeriod } from './MypageShoppingTablet.jsx'
import './MypageCouponsTablet.css'
import './MypageCouponsMobile.css'


// Only issuedOn is used by period queries. expiresOn is separate and never filtered here.
// Temporary fixtures preserve the three Figma rows; replace this array with API records later.
const MOCK_COUPONS = [
  { id: 'figma-coupon-1', issuedOn: '2026-09-03', expiresOn: '2026-10-03' },
  { id: 'figma-coupon-2', issuedOn: '2026-09-06', expiresOn: '2026-10-06' },
  { id: 'figma-coupon-3', issuedOn: '2026-09-10', expiresOn: '2026-10-10' },
].map(coupon => ({
  ...coupon,
  name: '온결 신규 회원가입 쿠폰',
  benefit: '전 상품',
  condition: '30,000원 이상 구매 시',
  applicableProducts: '전 상품',
  validityLabel: '발급일로부터 30일',
}))
const INITIAL_RANGE = { start: '2026-09-03', end: '2026-09-10' }
const controlStyle = { margin: 0, font: 'inherit', color: 'inherit', background: 'transparent', cursor: 'pointer' }

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(value + 'T00:00:00.000Z')
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null
}

function shiftMonths(date, amount) {
  const day = date.getUTCDate()
  date.setUTCDate(1)
  date.setUTCMonth(date.getUTCMonth() + amount)
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
  date.setUTCDate(Math.min(day, lastDay))
}

function calculateRange(period) {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  const start = parseDate(today)
  if (period === '7일') start.setUTCDate(start.getUTCDate() - 6) // Seven calendar dates including today.
  else if (period === '1개월') shiftMonths(start, -1)
  else if (period === '3개월') shiftMonths(start, -3)
  else if (period === '1년') shiftMonths(start, -12)
  return { start: start.toISOString().slice(0, 10), end: today }
}

// Figma frame 2275:23490; content node 2275:23547.
export default function MypageCoupons() {
  const [coupons] = useState(() => MOCK_COUPONS)
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [range, setRange] = useState(INITIAL_RANGE)
  const [results, setResults] = useState(coupons)
  const [appliedRange, setAppliedRange] = useState(INITIAL_RANGE)
  const formRef = useRef(null)

  function selectPeriod(period) {
    const nextRange = calculateRange(period)
    setSelectedPeriod(period)
    setRange(nextRange)
    if (window.matchMedia('(max-width: 767px)').matches) applyRange(nextRange)
    formRef.current.elements.startDate.setCustomValidity('')
    formRef.current.elements.endDate.setCustomValidity('')
  }

  function dateInput(name, label, originalText) {
    return (
      <div className="mp-view-34" style={{ position: 'relative' }}>
        <p className="mp-view-25" aria-hidden="true" style={{ visibility: 'hidden' }}>{originalText}</p>
        <input name={name === 'start' ? 'startDate' : 'endDate'} aria-label={label} type="text" inputMode="numeric" value={range[name]} className="mp-view-25" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 0, borderRadius: 0, background: 'transparent', margin: 0, minWidth: 0 }} onChange={event => {
          event.target.setCustomValidity('')
          setSelectedPeriod(null)
          setRange(previous => ({ ...previous, [name]: event.target.value }))
        }} />
      </div>
    )
  }

  function query(event) {
    event.preventDefault()
    const startInput = formRef.current.elements.startDate
    const endInput = formRef.current.elements.endDate
    startInput.setCustomValidity(parseDate(range.start) ? '' : '시작 날짜를 YYYY-MM-DD 형식의 올바른 날짜로 입력해 주세요.')
    endInput.setCustomValidity(parseDate(range.end) ? '' : '종료 날짜를 YYYY-MM-DD 형식의 올바른 날짜로 입력해 주세요.')
    if (parseDate(range.start) && parseDate(range.end) && range.start > range.end) endInput.setCustomValidity('종료 날짜는 시작 날짜보다 빠를 수 없습니다.')
    if (!formRef.current.reportValidity()) return
    applyRange(range)
  }

  function applyRange(nextRange) {
    setResults(coupons.filter(coupon => coupon.issuedOn >= nextRange.start && coupon.issuedOn <= nextRange.end))
    setAppliedRange({ ...nextRange })
  }
  return (
    <div className="mp-view-1 mp-coupons" data-node-id="2275:23547" data-applied-start={appliedRange.start} data-applied-end={appliedRange.end}>
<CouponBenefits count={results.length} />
            <form ref={formRef} noValidate onSubmit={query} className="mp-view-18" data-node-id="2275:23562" data-name="기간조회 수정탭">
              <div className="mp-view-19" data-node-id="2275:23563">
                <div className="mp-view-20" data-node-id="2275:23564">
                  <div className="mp-view-21" data-node-id="2275:23565" data-name="기간조회">
                    <p className="mp-view-22" data-node-id="2275:23566" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      기간조회
                    </p>
                  </div>
                  <ShoppingPeriod value={selectedPeriod} onChange={selectPeriod} />
                  <div className="mp-view-23" data-node-id="2275:23567" data-name="전체 날짜 T">
                    <button type="button" aria-pressed={selectedPeriod === '오늘'} onClick={() => selectPeriod('오늘')} style={controlStyle} className="mp-view-24" data-node-id="2275:23568">
                      <p className="mp-view-25" data-node-id="2275:23569" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        오늘
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '7일'} onClick={() => selectPeriod('7일')} style={controlStyle} className="mp-view-24" data-node-id="2275:23570">
                      <p className="mp-view-25" data-node-id="2275:23571" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        7일
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '1개월'} onClick={() => selectPeriod('1개월')} style={controlStyle} className="mp-view-26" data-node-id="2275:23572">
                      <p className="mp-view-25" data-node-id="2275:23573" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        1개월
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '3개월'} onClick={() => selectPeriod('3개월')} style={controlStyle} className="mp-view-26" data-node-id="2275:23574">
                      <p className="mp-view-25" data-node-id="2275:23575" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        3개월
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '1년'} onClick={() => selectPeriod('1년')} style={controlStyle} className="mp-view-24" data-node-id="2275:23576">
                      <p className="mp-view-25" data-node-id="2275:23577" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        1년
                      </p>
                    </button>
                  </div>
                </div>
                <div className="mp-view-27" data-node-id="2275:23578" data-name="날짜조회">
                  <div className="mp-view-28" data-node-id="2275:23579" data-name="날짜조회">
                    <div className="mp-view-29" data-node-id="2275:23580">
                      {dateInput('start', '시작 날짜', '2026-09-03')}
                      <button type="button" className="mp-view-30" style={{ ...controlStyle, padding: 0 }} aria-label="시작 날짜 입력" onClick={() => formRef.current.elements.startDate.focus()} data-node-id="2275:23582" data-name="calendar">
                        <img alt="" className="mp-view-31" src={imgCalendar} />
                      </button>
                    </div>
                    <div className="mp-view-32" data-node-id="2275:23584">
                      <p className="mp-view-33" data-node-id="2275:23585" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        ~
                      </p>
                    </div>
                    <div className="mp-view-29" data-node-id="2275:23586">
                      {dateInput('end', '종료 날짜', '2026-09-10')}
                      <button type="button" className="mp-view-30" style={{ ...controlStyle, padding: 0 }} aria-label="종료 날짜 입력" onClick={() => formRef.current.elements.endDate.focus()} data-node-id="2275:23589" data-name="calendar">
                        <img alt="" className="mp-view-31" src={imgCalendar} />
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" style={controlStyle} className="mp-view-24" data-node-id="2275:23591">
                  <p className="mp-view-25" data-node-id="2275:23592" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    조회
                  </p>
                </button>
              </div>
            </form>
            <div className="mp-view-35" data-node-id="2275:23593">
              <div className="mp-view-36" data-node-id="2275:23594">
                <div className="mp-coupon-mobile-heading"><h2>쿠폰 내역</h2><p>(사용 가능한 쿠폰 <span>{results.length}</span>장)</p></div>
                <div className="mp-view-37" data-node-id="2275:23595">
                  <p className="mp-view-38" data-node-id="2275:23596" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    나의 쿠폰
                  </p>
                </div>
                <div className="mp-view-39" data-node-id="2275:23597" data-name="쿠폰함">
                  <div className="mp-view-40" data-node-id="2275:23598">
                    <div className="mp-view-41" data-node-id="2275:23599" data-name="최근 주문 정보 수정">
                      <div className="mp-view-42" data-node-id="2275:23600" data-name="유효기간">
                        <div className="mp-view-43" data-node-id="2275:23601">
                          <div className="mp-view-44">
                            <img alt="" className="mp-view-14" src={imgLine2} />
                          </div>
                        </div>
                        <div className="mp-view-45" data-node-id="2275:23602" data-name="쿠폰명">
                          <p className="mp-view-46" data-node-id="2275:23603" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            쿠폰명
                          </p>
                        </div>
                        <div className="mp-view-47" data-node-id="2275:23604" data-name="쿠폰 혜택">
                          <p className="mp-view-46" data-node-id="2275:23605" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            쿠폰 혜택
                          </p>
                        </div>
                        <div className="mp-view-48" data-node-id="2275:23606" data-name="사용 조건">
                          <p className="mp-view-46" data-node-id="2275:23607" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            사용 조건
                          </p>
                        </div>
                        <div className="mp-view-49" data-node-id="2275:23608" data-name="적용 상품">
                          <p className="mp-view-46" data-node-id="2275:23609" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            적용 상품
                          </p>
                        </div>
                        <div className="mp-view-50" data-node-id="2275:23610" data-name="리뷰">
                          <p className="mp-view-46" data-node-id="2275:23611" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            유효기간
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {results.length === 0 ? (
                    <p className="mp-view-52" role="status" style={{ position: 'absolute', top: 117, left: 0, width: '100%', textAlign: 'center' }}>조회 내역이 없습니다.</p>
                  ) : results.map((coupon, index) => (
                    <div key={coupon.id} data-coupon-id={coupon.id}>
                      <MobileCouponCard coupon={coupon} />
                      <div className={['mp-view-51', 'mp-view-53', 'mp-view-54'][index]} data-name="쿠폰 상세 T + f">
                        {[coupon.name, coupon.benefit, coupon.condition, coupon.applicableProducts, coupon.validityLabel].map((text, column) => (
                          <div className="mp-view-34" key={column}>
                            <p className="mp-view-52" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{text}</p>
                          </div>
                        ))}
                      </div>
                      <div className={index === results.length - 1 ? 'mp-view-55' : index === 0 ? 'mp-view-56' : 'mp-view-57'} style={{ top: 109 + index * 61 }}>
                        <div className="mp-view-13"><picture><source media="(min-width: 768px) and (max-width: 1432px)" srcSet={tabletRowLine} /><img alt="" className="mp-view-14" src={imgLine3} /></picture></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
  )
}

export function MobileCouponCard({ coupon }) {
  return <article className="mp-coupon-mobile-card" aria-label={coupon.name}>
    <h3>{coupon.name}</h3>
    <dl>{[['쿠폰 혜택', coupon.benefit], ['유효기간', coupon.validityLabel], ['취득일자', coupon.issuedOn]].map(([label, value]) =>
      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <p>적용 상품: {coupon.applicableProducts} · {coupon.condition}</p>
  </article>
}

// Coupon-only summary: the shared summary and other pages remain unchanged.
function CouponBenefits({ count }) {
  return (
    <div className="mp-view-94" data-node-id="2275:24087" data-name="1.등급">
                <p className="mp-coupon-tablet-greeting">김온결님은 Welcome등급 <span>입니다.</span></p>
                <p className="mp-view-3" data-node-id="2275:24088" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-4">{`이다빈님의 `}</span>
                  <span className="mp-view-5" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    회원등급은
                  </span>
                  <span className="mp-view-4">{` Welcome등급 `}</span>
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
                      {count}장
                    </p>
                  </div>
                  <div className="mp-view-10" data-node-id="2275:24093">
                    <div className="mp-view-11">
                      <div className="mp-view-12">
                        <div className="mp-view-13">
                          <picture><source media="(min-width: 768px) and (max-width: 1432px)" srcSet={tabletSummaryLine} /><img alt="" className="mp-view-14" src={imgLine9} /></picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-15" data-node-id="2275:24094">
                    <p className="mp-view-8" data-node-id="2275:24095" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      주문현황
                    </p>
                    <p className="mp-view-16" data-node-id="2275:24096" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      배송중 1건
                    </p>
                  </div>
                  <div className="mp-view-10" data-node-id="2275:24097">
                    <div className="mp-view-11">
                      <div className="mp-view-12">
                        <div className="mp-view-13">
                          <picture><source media="(min-width: 768px) and (max-width: 1432px)" srcSet={tabletSummaryLine} /><img alt="" className="mp-view-14" src={imgLine9} /></picture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-17" data-node-id="2275:24098">
                    <p className="mp-view-8" data-node-id="2275:24099" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      찜한 제품
                    </p>
                    <p className="mp-view-9" data-node-id="2275:24100" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      3개
                    </p>
                  </div>
                </div>
              </div>
  )
}
