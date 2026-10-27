import MyPageSummary from './MyPageSummary.jsx'
import useMyPageDraft from './useMyPageDraft.js'
import { useRef, useState } from 'react'
import { ShoppingPeriod } from './MypageShoppingTablet.jsx'
import imgCalendar from '../../assets/mypage/screens/40ae1.svg'
import imgLine2 from '../../assets/mypage/screens/083a1.svg'
import imgLine3 from '../../assets/mypage/screens/911d5.svg'
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

// Queries use the refund request date (requestedOn), confirmed by the user.
// Synthetic records are injected only by tests; the normal route stays empty.
// Figma frame 2275:23648; content node 2275:23705.
export default function MypageRefunds({ testRecords = [] }) {
  const [records] = useState(() => testRecords.filter(record => record.isTest === true))
  const [activeTab, setActiveTab] = useMyPageDraft('MypageRefunds.activeTab', 'requests')
  // No processing records exist yet. Never infer them from request fixtures.
  const [processingResults] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useMyPageDraft('MypageRefunds.selectedPeriod', null)
  const [range, setRange] = useMyPageDraft('MypageRefunds.range', INITIAL_RANGE)
  const [results, setResults] = useMyPageDraft('MypageRefunds.results', () => records.filter(record => record.requestedOn >= INITIAL_RANGE.start && record.requestedOn <= INITIAL_RANGE.end))
  const [appliedRange, setAppliedRange] = useMyPageDraft('MypageRefunds.appliedRange', INITIAL_RANGE)
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
    <div className="mp-view-58 mp-shopping mp-shopping-refunds" data-node-id="2275:23705" data-applied-start={appliedRange.start} data-applied-end={appliedRange.end} data-name="취소">
            <div className="mp-view-59" data-node-id="2275:23706">
<MyPageSummary />
            <form ref={formRef} noValidate onSubmit={query} className="mp-view-18" data-node-id="2275:23721" data-name="기간조회 수정탭">
              <div className="mp-view-19" data-node-id="2275:23722">
                <div className="mp-view-20" data-node-id="2275:23723">
                  <div className="mp-view-21" data-node-id="2275:23724" data-name="기간조회">
                    <p className="mp-view-22" data-node-id="2275:23725" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      기간조회
                    </p>
                  </div>
                  <ShoppingPeriod value={selectedPeriod} onChange={selectPeriod} />
                  <div className="mp-view-23" data-node-id="2275:23726" data-name="전체 날짜 T">
                    <button type="button" aria-pressed={selectedPeriod === '오늘'} onClick={() => selectPeriod('오늘')} style={{ ...controlStyle, background: undefined }} className="mp-period-button mp-view-24" data-node-id="2275:23727">
                      <p className="mp-view-25 mp-button-label" data-node-id="2275:23728" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-button-text">오늘</span>
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '7일'} onClick={() => selectPeriod('7일')} style={{ ...controlStyle, background: undefined }} className="mp-period-button mp-view-24" data-node-id="2275:23729">
                      <p className="mp-view-25 mp-button-label" data-node-id="2275:23730" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-button-text">7일</span>
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '1개월'} onClick={() => selectPeriod('1개월')} style={{ ...controlStyle, background: undefined }} className="mp-period-button mp-view-26" data-node-id="2275:23731">
                      <p className="mp-view-25 mp-button-label" data-node-id="2275:23732" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-button-text">1개월</span>
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '3개월'} onClick={() => selectPeriod('3개월')} style={{ ...controlStyle, background: undefined }} className="mp-period-button mp-view-26" data-node-id="2275:23733">
                      <p className="mp-view-25 mp-button-label" data-node-id="2275:23734" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-button-text">3개월</span>
                      </p>
                    </button>
                    <button type="button" aria-pressed={selectedPeriod === '1년'} onClick={() => selectPeriod('1년')} style={{ ...controlStyle, background: undefined }} className="mp-period-button mp-view-24" data-node-id="2275:23735">
                      <p className="mp-view-25 mp-button-label" data-node-id="2275:23736" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        <span className="mp-button-text">1년</span>
                      </p>
                    </button>
                  </div>
                </div>
                <div className="mp-view-27" data-node-id="2275:23737" data-name="날짜조회">
                  <div className="mp-view-28" data-node-id="2275:23738" data-name="날짜조회">
                    <div className="mp-view-29" data-node-id="2275:23739">
                      {dateInput('start', '시작 날짜', '2026-09-03')}
                      <button type="button" className="mp-view-30" style={{ ...controlStyle, padding: 0 }} aria-label="시작 날짜 입력" onClick={() => formRef.current.elements.startDate.focus()} data-node-id="2275:23741" data-name="calendar">
                        <img alt="" className="mp-view-31" src={imgCalendar} />
                      </button>
                    </div>
                    <div className="mp-view-32" data-node-id="2275:23743">
                      <p className="mp-view-33" data-node-id="2275:23744" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        ~
                      </p>
                    </div>
                    <div className="mp-view-29" data-node-id="2275:23745">
                      {dateInput('end', '종료 날짜', '2026-09-10')}
                      <button type="button" className="mp-view-30" style={{ ...controlStyle, padding: 0 }} aria-label="종료 날짜 입력" onClick={() => formRef.current.elements.endDate.focus()} data-node-id="2275:23748" data-name="calendar">
                        <img alt="" className="mp-view-31" src={imgCalendar} />
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" style={controlStyle} className="mp-view-24" data-node-id="2275:23750">
                  <p className="mp-view-25 mp-button-label" data-node-id="2275:23751" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    <span className="mp-button-text">조회</span>
                  </p>
                </button>
              </div>
            </form>
              <div className="mp-view-61" data-node-id="2275:23752" data-name="환불탭">
                <div className="mp-view-62 mp-noto-kr" role="tablist" data-node-id="2275:23753" data-name="환불 T+F">
                  <button type="button" role="tab" id="refunds-requests-tab" aria-controls="refunds-tab-panel" aria-selected={activeTab === 'requests'} onClick={() => setActiveTab('requests')} style={tabStyle}  className="mp-view-63" data-node-id="2275:23754">
                    <div className="mp-view-64" data-node-id="2275:23755">
                      <p className="mp-view-65" style={ { color: activeTab === 'requests' ? '#000' : '#3f3d3d' } } data-node-id="2275:23756">
                        환불 신청 내역
                      </p>
                    </div>
                    <div className={activeTab === 'requests' ? 'mp-view-66' : 'mp-view-68'} data-node-id="2275:23757" />
                  </button>
                  <button type="button" role="tab" id="refunds-processing-tab" aria-controls="refunds-tab-panel" aria-selected={activeTab === 'processing'} onClick={() => setActiveTab('processing')} style={tabStyle}  className="mp-view-63" data-node-id="2275:23758">
                    <div className="mp-view-64" data-node-id="2275:23759">
                      <p className="mp-view-67" style={ { color: activeTab === 'processing' ? '#000' : '#3f3d3d' } } data-node-id="2275:23760">
                        환불/입금 처리 현황
                      </p>
                    </div>
                    <div className={activeTab === 'processing' ? 'mp-view-66' : 'mp-view-68'} data-node-id="2275:23761" />
                  </button>
                </div>
                <div className="mp-view-69" data-node-id="2275:23762" />
              </div>
              <div className="mp-view-70" role="tabpanel" id="refunds-tab-panel" aria-labelledby={activeTab === 'requests' ? 'refunds-requests-tab' : 'refunds-processing-tab'} data-node-id="2275:23763" data-name="최근주문정보 전체">
                <div className="mp-view-71" data-node-id="2275:23764">
                  <div className="mp-view-37" data-node-id="2275:23765">
                    <p className="mp-view-38" data-node-id="2275:23766" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      환불 / 입금 내역
                    </p>
                  </div>
                  <div className="mp-view-72" data-node-id="2275:23767">
                    <p className="mp-view-3" data-node-id="2275:23768" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-73">{`총 `}</span>
                      <span className="mp-view-74" aria-live="polite">{visibleResults.length}</span>
                      <span className="mp-view-73">건</span>
                    </p>
                  </div>
                </div>
                <div className="mp-view-75" data-node-id="2275:23769" data-name="최근주문 정보">
                  <div className="mp-view-76" data-node-id="2275:23770">
                    <div className="mp-view-41" data-node-id="2275:23771" data-name="최근 주문 정보 수정">
                      <div className="mp-view-42" data-node-id="2275:23772" data-name="최근 주문 정보">
                        <div className="mp-view-43" data-node-id="2275:23773">
                          <div className="mp-view-44">
                            <img alt="" className="mp-view-14" src={imgLine2} />
                          </div>
                        </div>
                        <div className="mp-view-77" data-node-id="2275:23774" data-name="날짜/주문번호">
                          <p className="mp-view-46" data-node-id="2275:23775" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            날짜/주문번호
                          </p>
                        </div>
                        <div className="mp-view-47" data-node-id="2275:23776" data-name="상품명/옵션">
                          <p className="mp-view-46" data-node-id="2275:23777" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            상품명/옵션
                          </p>
                        </div>
                        <div className="mp-view-78" data-node-id="2275:23778" data-name="상품금액/수량">
                          <p className="mp-view-46" data-node-id="2275:23779" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            상품금액/수량
                          </p>
                        </div>
                        <div className="mp-view-79" data-node-id="2275:23780" data-name="주문상태">
                          <p className="mp-view-46" data-node-id="2275:23781" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            주문상태
                          </p>
                        </div>
                        <div className="mp-view-80" data-node-id="2275:23782" data-name="리뷰">
                          <p className="mp-view-46" data-node-id="2275:23783" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                            리뷰
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {visibleResults.length === 0 ? (
                  <div className="mp-view-37" data-node-id="2275:23784">
                    <p className="mp-view-81" data-node-id="2275:23785" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      {activeTab === 'requests' ? '조회 내역이 없습니다.' : '환불/입금 처리 내역이 없습니다.'}
                    </p>
                  </div>
                  ) : (
                    <div className="mp-shopping-desktop-records" role="list" aria-label="테스트 환불·입금 내역" style={{ width: '100%' }}>
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
                  <MypageShoppingMobileCards records={visibleResults} variant="refunds" />
                  <div className="mp-view-82" data-node-id="2275:23786">
                    <div className="mp-view-13">
                      <img alt="" className="mp-view-14" src={imgLine3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
