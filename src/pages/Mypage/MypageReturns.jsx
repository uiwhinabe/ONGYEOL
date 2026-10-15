import { useRef, useState } from 'react'
import { ShoppingBenefits, ShoppingPeriod } from './MypageShoppingTablet.jsx'
import imgCalendar from '../../assets/mypage/screens/40ae1.svg'
import imgLine2 from '../../assets/mypage/screens/083a1.svg'
import imgLine3 from '../../assets/mypage/screens/6d799.svg'
import MypageShoppingMobileCards from './MypageShoppingMobileCards.jsx'
import './MypageShoppingMobile.css'

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

// No API or fixtures are loaded by the normal route. Tests may supply explicitly synthetic records.
// Figma frame 2275:23889; content node 2275:23918.
export default function MypageReturns({ testRecords = [] }) {
  const [records] = useState(() => testRecords.filter(record => record.isTest === true))
  const [activeTab, setActiveTab] = useState('requests')
  // No processing records exist yet. Never infer them from request fixtures.
  const [processingResults] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [range, setRange] = useState(INITIAL_RANGE)
  const [results, setResults] = useState(() => records.filter(record => record.requestedOn >= INITIAL_RANGE.start && record.requestedOn <= INITIAL_RANGE.end))
  const [appliedRange, setAppliedRange] = useState(INITIAL_RANGE)
  const visibleResults = activeTab === 'requests' ? results : processingResults
  const tabStyle = { margin: 0, padding: 0, border: 0, background: 'transparent', font: 'inherit', color: 'inherit', textAlign: 'inherit', cursor: 'pointer' }
  const formRef = useRef(null)
  function applyRange(nextRange) {
    setResults(records.filter(record => record.requestedOn >= nextRange.start && record.requestedOn <= nextRange.end))
    setAppliedRange({ ...nextRange })
  }
  function selectPeriod(period) {
    setSelectedPeriod(period)
    const nextRange = calculateRange(period)
    setRange(nextRange)
    formRef.current.elements.startDate.setCustomValidity('')
    formRef.current.elements.endDate.setCustomValidity('')
    if (window.matchMedia('(max-width: 767px)').matches) applyRange(nextRange)
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

  return (
    <div className="mp-view-93 mp-shopping mp-shopping-returns" data-node-id="2275:23918" data-name="취소" data-applied-start={appliedRange.start} data-applied-end={appliedRange.end}>
<ShoppingBenefits />
            <form ref={formRef} noValidate onSubmit={query} className="mp-view-18" data-node-id="2275:23933" data-name="기간조회 수정탭">
              <div className="mp-view-19" data-node-id="2275:23934">
                <div className="mp-view-20" data-node-id="2275:23935">
                  <div className="mp-view-21" data-node-id="2275:23936" data-name="기간조회">
                    <p className="mp-view-22" data-node-id="2275:23937" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      기간조회
                    </p>
                  </div>
                  <ShoppingPeriod value={selectedPeriod} onChange={selectPeriod} />
                  <div className="mp-view-23" data-node-id="2275:23938" data-name="전체 날짜 T">
                    <button type="button" aria-pressed={selectedPeriod === '오늘'} onClick={() => selectPeriod('오늘')} style={controlStyle} className="mp-view-24" data-node-id="2275:23939">
                      <p className="mp-view-25" data-node-id="2275:23940" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        오늘
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '7일'} onClick={() => selectPeriod('7일')} style={controlStyle} className="mp-view-24" data-node-id="2275:23941">
                      <p className="mp-view-25" data-node-id="2275:23942" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        7일
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '1개월'} onClick={() => selectPeriod('1개월')} style={controlStyle} className="mp-view-26" data-node-id="2275:23943">
                      <p className="mp-view-25" data-node-id="2275:23944" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        1개월
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '3개월'} onClick={() => selectPeriod('3개월')} style={controlStyle} className="mp-view-26" data-node-id="2275:23945">
                      <p className="mp-view-25" data-node-id="2275:23946" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        3개월
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '1년'} onClick={() => selectPeriod('1년')} style={controlStyle} className="mp-view-24" data-node-id="2275:23947">
                      <p className="mp-view-25" data-node-id="2275:23948" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        1년
                      </p>
                    </button>
                  </div>
                </div>
                <div className="mp-view-27" data-node-id="2275:23949" data-name="날짜조회">
                  <div className="mp-view-28" data-node-id="2275:23950" data-name="날짜조회">
                    <div className="mp-view-29" data-node-id="2275:23951">
                      {dateInput('start', '시작 날짜', '2026-09-03')}
                      <button type="button" className="mp-view-30" style={{ ...controlStyle, padding: 0 }} aria-label="시작 날짜 입력" onClick={() => formRef.current.elements.startDate.focus()} data-node-id="2275:23953" data-name="calendar">
                        <img alt="" className="mp-view-31" src={imgCalendar} />
                      </button>
                    </div>
                    <div className="mp-view-32" data-node-id="2275:23955">
                      <p className="mp-view-33" data-node-id="2275:23956" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        ~
                      </p>
                    </div>
                    <div className="mp-view-29" data-node-id="2275:23957">
                      {dateInput('end', '종료 날짜', '2026-09-10')}
                      <button type="button" className="mp-view-30" style={{ ...controlStyle, padding: 0 }} aria-label="종료 날짜 입력" onClick={() => formRef.current.elements.endDate.focus()} data-node-id="2275:23960" data-name="calendar">
                        <img alt="" className="mp-view-31" src={imgCalendar} />
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" style={controlStyle} className="mp-view-24" data-node-id="2275:23962">
                  <p className="mp-view-25" data-node-id="2275:23963" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    조회
                  </p>
                </button>
              </div>
            </form>
              <div className="mp-view-95" data-node-id="2275:23964">
                <div className="mp-view-62" role="tablist" data-node-id="2275:23965">
                  <button type="button" role="tab" id="returns-requests-tab" aria-controls="returns-tab-panel" aria-selected={activeTab === 'requests'} onClick={() => setActiveTab('requests')} style={tabStyle}  className="mp-view-96" data-node-id="2275:23966">
                    <div className="mp-view-97" data-node-id="2275:23967">
                      <p className="mp-view-98" style={ { color: activeTab === 'requests' ? '#000' : '#3f3d3d' } } data-node-id="2275:23968">
                        취소/반품/교환 신청 내역
                      </p>
                    </div>
                    <div className={activeTab === 'requests' ? 'mp-view-66' : 'mp-view-68'} data-node-id="2275:23969" />
                  </button>
                  <button type="button" role="tab" id="returns-processing-tab" aria-controls="returns-tab-panel" aria-selected={activeTab === 'processing'} onClick={() => setActiveTab('processing')} style={tabStyle}  className="mp-view-99" data-node-id="2275:23970">
                    <div className="mp-view-100" data-node-id="2275:23971">
                      <p className="mp-view-101" style={ { color: activeTab === 'processing' ? '#000' : '#3f3d3d' } } data-node-id="2275:23972">
                        취소/반품/교환 처리 현황
                      </p>
                    </div>
                    <div className={activeTab === 'processing' ? 'mp-view-66' : 'mp-view-68'} data-node-id="2275:23973" />
                  </button>
                </div>
                <div className="mp-view-69" data-node-id="2275:23974" />
              </div>
              <div className="mp-view-70" role="tabpanel" id="returns-tab-panel" aria-labelledby={activeTab === 'requests' ? 'returns-requests-tab' : 'returns-processing-tab'} data-node-id="2275:23975" data-name="최근주문정보 전체">
                <div className="mp-view-71" data-node-id="2275:23976">
                  <div className="mp-view-37" data-node-id="2275:23977">
                    <p className="mp-view-38 mp-shopping-desktop-heading" data-node-id="2275:23978" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      주문목록 / 배송조회내역
                    </p>
                    <p className="mp-shopping-mobile-heading">{activeTab === 'requests' ? '취소/반품/교환 신청 내역' : '취소/반품/교환 처리 현황'}</p>
                  </div>
                  <div className="mp-view-72" data-node-id="2275:23979">
                    <p className="mp-view-3" data-node-id="2275:23980" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-73">{`총 `}</span>
                      <span className="mp-view-74" aria-live="polite">{visibleResults.length}</span>
                      <span className="mp-view-73">건</span>
                    </p>
                  </div>
                </div>
                <div className="mp-view-75" data-node-id="2275:23981" data-name="최근주문 정보">
                  <div className="mp-view-76" data-node-id="2275:23982">
                    <div className="mp-view-41" data-node-id="2275:23983" data-name="최근 주문 정보 수정">
                      <div className="mp-view-42" data-node-id="2275:23984" data-name="최근 주문 정보">
                        <div className="mp-view-43" data-node-id="2275:23985">
                          <div className="mp-view-44">
                            <img alt="" className="mp-view-14" src={imgLine2} />
                          </div>
                        </div>
                        <div className="mp-view-77" data-node-id="2275:23986" data-name="날짜/주문번호">
                          <p className="mp-view-46" data-node-id="2275:23987" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            날짜/주문번호
                          </p>
                        </div>
                        <div className="mp-view-47" data-node-id="2275:23988" data-name="상품명/옵션">
                          <p className="mp-view-46" data-node-id="2275:23989" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            상품명/옵션
                          </p>
                        </div>
                        <div className="mp-view-78" data-node-id="2275:23990" data-name="상품금액/수량">
                          <p className="mp-view-46" data-node-id="2275:23991" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            상품금액/수량
                          </p>
                        </div>
                        <div className="mp-view-79" data-node-id="2275:23992" data-name="주문상태">
                          <p className="mp-view-46" data-node-id="2275:23993" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            주문상태
                          </p>
                        </div>
                        <div className="mp-view-80" data-node-id="2275:23994" data-name="리뷰">
                          <p className="mp-view-46" data-node-id="2275:23995" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            리뷰
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {visibleResults.length === 0 ? (
                  <div className="mp-view-37" data-node-id="2275:23996">
                    <p className="mp-view-81" data-node-id="2275:23997" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      {activeTab === 'requests' ? '조회 내역이 없습니다.' : '처리 중인 내역이 없습니다.'}
                    </p>
                  </div>
                  ) : (
                    <div className="mp-shopping-desktop-records" role="list" aria-label="테스트 취소·반품·교환 내역" style={{ width: '100%' }}>
                      {visibleResults.map(record => (
                        <div role="listitem" key={record.id} style={{ display: 'grid', gridTemplateColumns: '200px 230px 220px 190px 1fr', alignItems: 'center', padding: '15px 10px', fontSize: 14, textAlign: 'center' }}>
                          <p>{record.requestedOn}<br />[테스트] {record.id}</p>
                          <p>[테스트] {record.productName}<br />{record.option}</p>
                          <p>{record.amount.toLocaleString('ko-KR')}원 / {record.quantity}개</p>
                          <p>[테스트] {record.kind} {record.status}</p>
                          <p>—</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <MypageShoppingMobileCards records={visibleResults} variant="returns" />
                  <div className="mp-view-82" data-node-id="2275:23998">
                    <div className="mp-view-13">
                      <img alt="" className="mp-view-14" src={imgLine3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}
