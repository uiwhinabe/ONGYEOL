import { useEffect, useRef, useState } from 'react'
import './Contact Us.css'

const inquiryTypes = ['주문/결제', '배송', '교환/반품', '상품', '기타 문의']
const questions = [
  {
    question: '주문/배송은 얼마나 걸리나요?',
    answer: [
      '결제 완료 후 평균 1~3일 이내 출고되며, 배송은 출고 후 약 1~2일 정도 소요합니다.',
      '주말 및 공휴일에는 배송 일정이 달라질 수 있습니다.',
      '배송 상황은 마이페이지>주문내역에서 실시간으로 확인하실 수 있습니다.',
    ],
  },
  {
    question: '교환/반품은 어떻게 하나요?',
    answer: [
      '마이페이지>주문내역에서 교환/반품을 신청해 주세요.',
      '단순 변심의 경우 배송비가 발생할 수 있으며, 상품이 훼손되거나 사용한 경우 교환/반품이 어려울 수 있습니다.',
      '자세한 사항은 교환/반품 정책을 확인해 주세요.',
    ],
  },
  {
    question: '회원정보를 변경하고 싶어요.',
    answer: [
      '마이페이지>회원정보에서 언제든지 수정할 수 있습니다.',
      '이름, 연락처, 주소, 비밀번호 등의 정보를 변경할 수 있으며,',
      '이메일 변경 시에는 본인 인증 절차가 필요할 수 있습니다.',
    ],
  },
  {
    question: '제품 사용 방법이 궁금해요!',
    answer: [
      '각 제품의 상세페이지에서 사용 방법을 확인하실 수 있습니다.',
      '제품별 사용 순서, 권장 사용량, 피부 타입별 사용 팁도 함께 안내되어 있어요.',
      '추가로 궁금한 점이 있다면 고객센터로 문의해 주세요.',
    ],
  },
]

function ContactIcon({ type }) {
  return <svg className="contact-benefit-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {type === 'chat' && <><path d="M29 17a11 11 0 0 1-15 10l-7 2 2-7A11 11 0 1 1 29 17Z" /><circle cx="12" cy="17" r=".7" /><circle cx="18" cy="17" r=".7" /><circle cx="24" cy="17" r=".7" /></>}
    {type === 'headset' && <><path d="M7 23v-7a11 11 0 0 1 22 0v7" /><rect x="5" y="17" width="5" height="12" rx="1" /><rect x="26" y="17" width="5" height="12" rx="1" /></>}
    {type === 'heart' && <path d="M18 30S4 22 4 12a7 7 0 0 1 14-1 7 7 0 0 1 14 1c0 10-14 18-14 18Z" />}
  </svg>
}

export default function ContactUs() {
  const [type, setType] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [openQuestion, setOpenQuestion] = useState(null)
  const [typeError, setTypeError] = useState('')
  const confirmationRef = useRef(null)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const optionsRef = useRef([])

  useEffect(() => {
    if (!dropdownOpen) return
    const closeOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setDropdownOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [dropdownOpen])

  function selectType(value) {
    setType(value)
    setTypeError('')
    setDropdownOpen(false)
    triggerRef.current?.focus()
  }
  function resetInquiry(event) {
    setType('')
    setContent('')
    setFiles([])
    setFileError('')
    setTypeError('')
    setDropdownOpen(false)
    for (const field of Array.from(event.currentTarget.elements)) {
      field.setCustomValidity?.('')
    }
  }
  function confirmInquiry(event) {
    event.preventDefault()
    if (!type) {
      setTypeError('문의 유형을 선택해 주세요.')
      triggerRef.current?.focus()
      return
    }
    for (const [name, message] of [['subject', '제목을 입력해 주세요.'], ['content', '문의 내용을 입력해 주세요.']]) {
      const field = event.currentTarget.elements.namedItem(name)
      field.setCustomValidity(field.value.trim() ? '' : message)
      if (!field.reportValidity()) return
    }
    setDropdownOpen(false)
    confirmationRef.current?.showModal()
  }
  function selectFiles(event) {
    const next = Array.from(event.target.files || [])
    if (next.length > 5 || next.some((file) => !['image/jpeg', 'image/png'].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      setFileError('JPG, PNG 파일을 최대 5개까지 선택해 주세요. 파일당 최대 10MB입니다.')
      event.target.value = ''
      setFiles([])
      return
    }
    setFileError('')
    setFiles(next)
  }

  return <div className="contact-page contact-main" aria-labelledby="contact-title">
        <header className="contact-section-heading">
          <h2 className="contact-title" id="contact-title">고객센터</h2>
          <p className="contact-introduction">궁금한 점을 남겨주시면 빠르고 친절하게 답변드리겠습니다.</p>
        </header>

        <form className="contact-form" noValidate onSubmit={confirmInquiry} onReset={resetInquiry}>
          <div className="contact-form-panel">
            <div className="contact-field contact-field-type">
              <label className="contact-label" id="contact-type-label" htmlFor="contact-type-trigger">문의 유형</label>
              <div className="contact-dropdown" ref={dropdownRef} onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setDropdownOpen(false)
              }} onKeyDown={(event) => {
                if (event.key === 'Escape') { setDropdownOpen(false); triggerRef.current?.focus() }
              }}>
                <button ref={triggerRef} id="contact-type-trigger" className={`contact-dropdown-trigger${type ? ' contact-dropdown-selected' : ''}`} type="button"
                  aria-expanded={dropdownOpen} aria-controls="contact-type-options" aria-haspopup="listbox" aria-labelledby="contact-type-label contact-type-value" aria-invalid={!!typeError} aria-describedby={typeError ? 'contact-type-error' : undefined}
                  onClick={() => setDropdownOpen((open) => !open)} onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      if (dropdownOpen) optionsRef.current[0]?.focus()
                      else setDropdownOpen(true)
                    }
                  }}>
                  <span className="contact-dropdown-value" id="contact-type-value">{type || '문의 유형을 선택해 주세요'}</span><span className="contact-chevron" aria-hidden="true" />
                </button>
                {dropdownOpen && <ul className="contact-dropdown-options" id="contact-type-options" role="listbox" aria-labelledby="contact-type-label">
                  {inquiryTypes.map((value, index) => <li className="contact-dropdown-option-row" role="presentation" key={value}>
                    <button ref={(element) => { optionsRef.current[index] = element }} className="contact-dropdown-option" type="button" role="option" aria-selected={type === value}
                      onClick={() => selectType(value)} onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                          event.preventDefault()
                          optionsRef.current[(index + (event.key === 'ArrowDown' ? 1 : -1) + inquiryTypes.length) % inquiryTypes.length]?.focus()
                        } else if (event.key === 'Home' || event.key === 'End') {
                          event.preventDefault(); optionsRef.current[event.key === 'Home' ? 0 : inquiryTypes.length - 1]?.focus()
                        }
                      }}>{value}</button>
                  </li>)}
                </ul>}
                {typeError && <p className="contact-type-error" id="contact-type-error" role="alert">{typeError}</p>}
              </div>
            </div>

            <div className="contact-field contact-field-title">
              <label className="contact-label" htmlFor="contact-subject">제목</label>
              <input className="contact-input" id="contact-subject" name="subject" required onInput={(event) => event.currentTarget.setCustomValidity('')} placeholder="제목을 입력해 주세요." />
            </div>
            <div className="contact-field contact-field-content">
              <label className="contact-label" htmlFor="contact-content">문의 내용</label>
              <div className="contact-textarea-wrap">
                <textarea className="contact-textarea" id="contact-content" name="content" required maxLength={1000} value={content} onChange={(event) => { event.currentTarget.setCustomValidity(''); setContent(event.target.value) }}
                  placeholder={'문의 내용을 자세히 입력해 주세요.\n(최대 1,000자)'} aria-describedby="contact-content-count" />
                <span className="contact-character-count" id="contact-content-count">{content.length.toLocaleString('ko-KR')} / 1,000</span>
              </div>
            </div>
            <div className="contact-field contact-field-files">
              <label className="contact-label" htmlFor="contact-files">첨부파일</label>
              <div className="contact-attachment">
                <div className="contact-file-controls">
                  <span className="contact-file-name" title={files.map((file) => file.name).join(', ')}>{files.length ? files.map((file) => file.name).join(', ') : '파일을 선택해 주세요.'}</span>
                  <label className="contact-file-button" htmlFor="contact-files">파일 첨부</label>
                  <input className="contact-file-input" id="contact-files" type="file" multiple accept="image/jpeg,image/png" onChange={selectFiles} aria-describedby="contact-file-note contact-file-error" />
                  <span className="contact-file-note" id="contact-file-note">JPG, PNG (최대 5개, 각 10MB 이하)</span>
                </div>
                <p className="contact-file-error" id="contact-file-error" role="alert">{fileError}</p>
              </div>
            </div>
          </div>
          <div className="contact-submit-area">
            <button className="contact-submit-button" type="reset">초기화</button>
            <button className="contact-submit-button" type="submit" aria-describedby="contact-submit-note">문의 하기</button>
            <span className="contact-visually-hidden" id="contact-submit-note">문의 제출 기능은 준비 중입니다. 입력 내용과 첨부파일은 서버에 전송되지 않습니다.</span>
          </div>
        </form>

        <dialog ref={confirmationRef} className="contact-confirm-popup" aria-labelledby="contact-confirm-title" aria-describedby="contact-confirm-description contact-confirm-test-note">
          <button className="contact-confirm-close" type="button" aria-label="문의 등록 확인 팝업 닫기" onClick={() => confirmationRef.current?.close()}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2L14 14M14 2L2 14" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
          <div className="contact-confirm-content">
            <div className="contact-confirm-heading">
              <h2 id="contact-confirm-title">문의를 등록하시겠습니까?</h2>
              <p id="contact-confirm-description">답변하신 문의 내용이 등록됩니다.</p>
            </div>
            <p className="contact-confirm-question">작성하신 문의를 등록하시겠습니까?</p>
            <div className="contact-confirm-actions">
              <button type="button" autoFocus onClick={() => confirmationRef.current?.close()}>취소</button>
              <button type="button" onClick={() => confirmationRef.current?.close()}>등록</button>
            </div>
            <p className="contact-confirm-test-note" id="contact-confirm-test-note">테스트용 확인창입니다. 실제로 저장되지 않습니다.</p>
          </div>
        </dialog>

        <section className="contact-faq" aria-labelledby="contact-faq-title">
          <header className="contact-section-heading">
            <h2 className="contact-faq-title" id="contact-faq-title">자주 묻는 질문</h2>
            <p className="contact-faq-introduction">많이 궁금해 하는 질문을 모았어요.</p>
          </header>
          <p className="contact-faq-note">더 많은 Q&amp;A는 고객센터에서 확인하실 수 있어요.</p>
          <div className="contact-faq-list">
            {questions.map(({ question, answer }, index) => <article className="contact-faq-item" key={question}>
              <h3 className="contact-faq-question">
                <button className="contact-faq-trigger" id={`contact-faq-trigger-${index}`} type="button" aria-expanded={openQuestion === index} aria-controls={`contact-faq-answer-${index}`}
                  onClick={() => setOpenQuestion((current) => current === index ? null : index)}>
                  <span>{question}</span><span className={`contact-chevron${openQuestion === index ? ' contact-chevron-open' : ''}`} aria-hidden="true" />
                </button>
              </h3>
              <div className="contact-faq-answer" id={`contact-faq-answer-${index}`} role="region" aria-labelledby={`contact-faq-trigger-${index}`} hidden={openQuestion !== index}>
                {answer.map((paragraph) => <p className="contact-faq-paragraph" key={paragraph}>{paragraph}</p>)}
              </div>
            </article>)}
          </div>
        </section>

        <div className="contact-benefits">
          <div className="contact-benefit"><ContactIcon type="chat" /><div className="contact-benefit-text"><h2 className="contact-benefit-title">친절한 상담</h2><p className="contact-benefit-description">언제든지 편하게<br />문의해 주세요.</p></div></div>
          <div className="contact-benefit"><ContactIcon type="headset" /><div className="contact-benefit-text"><h2 className="contact-benefit-title">빠른 답변</h2><p className="contact-benefit-description">평일 24시간 내<br />답변을 드려요.</p></div></div>
          <div className="contact-benefit"><ContactIcon type="heart" /><div className="contact-benefit-text"><h2 className="contact-benefit-title">더 좋은 온결</h2><p className="contact-benefit-description">고객님의 의견으로<br />더 나아갑니다.</p></div></div>
        </div>
  </div>
}
