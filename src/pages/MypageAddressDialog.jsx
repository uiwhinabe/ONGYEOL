import { useEffect, useRef } from 'react'
import imgVector from '../assets/mypage/screens/4d486.svg'

// Figma frame 2275:24236; content node 2275:24341.
const inputStyle = { font: 'inherit', color: 'inherit', background: 'transparent', margin: 0 }

export default function MypageAddressDialog({ value, editing = false, onChange, onSave, onClose }) {
  const formRef = useRef(null)
  useEffect(() => { formRef.current?.elements.namedItem('label')?.focus() }, [])

  function input(name, label, className, required = false, style = {}) {
    return <input name={name} aria-label={label} className={className} style={{ ...inputStyle, ...style }} value={value[name]} required={required} type={name === 'phone' || name === 'mobile' ? 'tel' : 'text'} inputMode={name === 'postcode' ? 'numeric' : undefined} onChange={event => { event.target.setCustomValidity(''); onChange(name, event.target.value) }} />
  }

  function submit(event) {
    event.preventDefault()
    for (const field of formRef.current.querySelectorAll('input:not([type="checkbox"])')) {
      let error = field.required && !field.value.trim() ? `${field.getAttribute('aria-label')}을(를) 입력해 주세요.` : ''
      if (!error && field.name === 'postcode' && !/^\d{5}$/.test(field.value.trim())) error = '우편번호는 숫자 5자리로 입력해 주세요.'
      if (!error && field.name === 'mobile' && !/^\d{10,11}$/.test(field.value.replace(/[-\s]/g, ''))) error = '휴대폰 번호는 숫자 10~11자리로 입력해 주세요.'
      if (!error && field.name === 'phone' && field.value.trim() && !/^\d{9,11}$/.test(field.value.replace(/[-\s]/g, ''))) error = '전화 번호는 숫자 9~11자리로 입력해 주세요.'
      field.setCustomValidity(error)
    }
    if (formRef.current.reportValidity()) onSave()
  }

  function keyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
    if (event.key !== 'Tab') return
    const controls = [...formRef.current.querySelectorAll('input, button, a[href]')]
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
  return (
    <form ref={formRef} noValidate onSubmit={submit} onKeyDown={keyDown} role="dialog" aria-modal="true" aria-label={editing ? '배송지 수정' : '배송지 등록'} className="mp-view-115" data-node-id="2275:24341">
          <div className="mp-view-116" data-node-id="2275:24342">
            <div className="mp-view-117" data-node-id="2275:24343">
              <div className="mp-view-118" data-node-id="2275:24344">
                <div className="mp-view-119" data-node-id="2275:24345">
                  <div className="mp-view-120" data-node-id="2275:24346" data-name="나의 배송지 관리 F">
                    <p className="mp-view-121" data-node-id="2275:24347" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      {editing ? '배송지 수정' : '배송지 등록'}
                    </p>
                  </div>
                </div>
                <div className="mp-view-122" data-node-id="2275:24348" data-name="라인" />
              </div>
              <div className="mp-view-123" data-node-id="2275:24349">
                <div className="mp-view-62" data-node-id="2275:24350">
                  <div className="mp-view-124" data-node-id="2275:24351" data-name="아이디">
                    <p className="mp-view-125" data-node-id="2275:24352" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        배송지 이름
                      </span>
                      <span className="mp-view-127" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        *
                      </span>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`   `}</span>
                    </p>
                  </div>
                  {input('label', '배송지 이름', 'mp-view-128', true)}
                </div>
                <div className="mp-view-129" data-node-id="2275:24354" data-name="라인" />
                <div className="mp-view-62" data-node-id="2275:24355">
                  <div className="mp-view-124" data-node-id="2275:24356" data-name="이름">
                    <p className="mp-view-125" data-node-id="2275:24357" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        받으실 분
                      </span>
                      <span className="mp-view-127" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        *
                      </span>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                    </p>
                  </div>
                  {input('recipient', '받으실 분', 'mp-view-128', true)}
                </div>
                <div className="mp-view-129" data-node-id="2275:24359" data-name="라인" />
                <div className="mp-view-130" data-node-id="2275:24360">
                  <div className="mp-view-124" data-node-id="2275:24361" data-name="주소">
                    <p className="mp-view-125" data-node-id="2275:24362" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`주소 `}</span>
                      <span className="mp-view-127" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        *
                      </span>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                    </p>
                  </div>
                  <div className="mp-view-131" data-node-id="2275:24363">
                    <div className="mp-view-132" data-node-id="2275:24364">
                      {input('postcode', '우편번호', 'mp-view-133', true, { paddingInline: 10 })}
                      <div className="mp-view-135" data-node-id="2275:24367">
                        <p className="mp-view-136" data-node-id="2275:24368" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                          우편번호검색
                        </p>
                      </div>
                    </div>
                    <div className="mp-view-137" data-node-id="2275:24369">
                      {input('address', '주소', 'mp-view-138', true)}
                      {input('detail', '상세주소', 'mp-view-140')}
                    </div>
                  </div>
                </div>
                <div className="mp-view-129" data-node-id="2275:24373" data-name="라인" />
                <div className="mp-view-141" data-node-id="2275:24374">
                  <div className="mp-view-124" data-node-id="2275:24375" data-name="휴대폰번호">
                    <p className="mp-view-81" data-node-id="2275:24376" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      전화 번호
                    </p>
                  </div>
                  {input('phone', '전화 번호', 'mp-view-142')}
                </div>
                <div className="mp-view-129" data-node-id="2275:24379" data-name="라인" />
                <div className="mp-view-141" data-node-id="2275:24380">
                  <div className="mp-view-124" data-node-id="2275:24381" data-name="휴대폰번호">
                    <p className="mp-view-125" data-node-id="2275:24382" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        휴대폰 번호
                      </span>
                      <span className="mp-view-127" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        *
                      </span>
                      <span className="mp-view-126" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                    </p>
                  </div>
                  {input('mobile', '휴대폰 번호', 'mp-view-142', true)}
                </div>
                <div className="mp-view-129" data-node-id="2275:24385" data-name="라인" />
              </div>
            </div>
            <div className="mp-view-144" data-node-id="2275:24386" data-name="체크 기본 배송지 설정 t">
              <span className="mp-view-30" style={{ display: 'block' }}>
                <input type="checkbox" name="isDefault" aria-label="기본 배송지로 설정" checked={value.isDefault} onChange={event => onChange('isDefault', event.target.checked)} style={{ position: 'absolute', inset: 0, margin: 0, opacity: 0, width: 24, height: 24, cursor: 'pointer', zIndex: 1 }} />
                {value.isDefault ? <img alt="" className="mp-view-31" src={imgVector} /> : <span aria-hidden="true" style={{ display: 'block', width: 24, height: 24, border: '1px solid #000', borderRadius: 3 }} />}
              </span>
              <p className="mp-view-145" data-node-id="2275:24388" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                기본 배송지로 설정 합니다.
              </p>
            </div>
            <div className="mp-view-146" data-node-id="2275:24389">
              <button type="button" onClick={onClose} style={{ ...inputStyle, cursor: 'pointer' }} className="mp-screen-action mp-view-147" data-node-id="2275:24390">
                <p className="mp-view-145" data-node-id="2275:24391" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  취소
                </p>
              </button>
              <button type="submit" style={{ margin: 0, cursor: 'pointer', font: 'inherit' }} className="mp-screen-action mp-view-148" data-node-id="2275:24392">
                <p className="mp-view-149" data-node-id="2275:24393" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  저장
                </p>
              </button>
            </div>
          </div>
        </form>
  )
}
