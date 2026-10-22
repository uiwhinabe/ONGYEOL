import { DEFAULT_USER_NAME } from './mypageUser.js'
import './MypageAccountTablet.css'
import './MypageAccountMobile.css'
import { useRef, useState } from 'react'
import useAccountPreview, { passwordErrors } from './useAccountPreview.js'
import imgAkarIconsChevronDownSmall from '../../assets/mypage/screens/2ed0f.svg'
import imgIcBaselineRadioButtonUnchecked from '../../assets/mypage/screens/36109.svg'
import imgCarbonRadioButtonChecked from '../../assets/mypage/screens/47e79.svg'
import imgAkarIconsCheck from '../../assets/mypage/screens/91352.svg'

// Figma frame 2275:25287; content node 2275:25342.
export default function MypageAccountPassword() {
  const account = useAccountPreview()
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const fields = useRef({})

  function passwordInput(name, label, nodeId) {
    return <input ref={element => { fields.current[name] = element }} name={name} aria-label={label} type="password" autoComplete={name === 'currentPassword' ? 'current-password' : 'new-password'} required value={passwords[name]} className="mp-view-216" data-node-id={nodeId} style={{ margin: 0, font: 'inherit', color: 'inherit', background: 'transparent' }} onChange={event => {
      const next = { ...passwords, [name]: event.target.value }
      setPasswords(next)
      const errors = passwordErrors(next)
      Object.entries(fields.current).forEach(([key, field]) => field?.setCustomValidity(errors[key]))
    }} onBlur={event => {
      event.target.setCustomValidity(passwordErrors(passwords)[name])
      if (event.target.value) event.target.reportValidity()
    }} onKeyDown={event => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      const errors = passwordErrors(passwords)
      Object.entries(fields.current).forEach(([key, field]) => field?.setCustomValidity(errors[key]))
      Object.values(fields.current).find(field => field && !field.checkValidity())?.reportValidity()
      // Validation only. No authentication, password persistence, or account update.
    }} />
  }
  return (
    <div className="mp-view-150 mp-account-tablet mp-account-password" data-node-id="2275:25342" onKeyDown={account.keyDown}>
          <div className="mp-view-118" data-node-id="2275:25343">
            <div className="mp-view-119" data-node-id="2275:25344">
              <div className="mp-view-120" data-node-id="2275:25345" data-name="나의 배송지 관리 F">
                <p className="mp-view-121" data-node-id="2275:25346" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  기본정보
                </p>
              </div>
            </div>
            <div className="mp-view-122" data-node-id="2275:25347" data-name="라인" />
          </div>
          <div className="mp-view-123" data-node-id="2275:25348">
            <div className="mp-view-62" data-node-id="2275:25349">
              <div className="mp-view-151" data-node-id="2275:25350" data-name="아이디">
                <p className="mp-view-184" data-node-id="2275:25351" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    아이디
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`   `}</span>
                </p>
              </div>
              <div className="mp-view-154" data-node-id="2275:25352">
                <p className="mp-view-25" data-node-id="2275:25353" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  ongyeolhehe11
                </p>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25354" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:25355">
              <div className="mp-view-151" data-node-id="2275:25356" data-name="비밀번호">
                <p className="mp-view-184" data-node-id="2275:25357" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    비밀번호
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-132" data-node-id="2275:25358">
                <a href="/mypage/account" className="mp-screen-action mp-view-155" data-node-id="2275:25359" data-name="비밀번호 설정">
                  <p className="mp-view-46 mp-button-label" data-node-id="2275:25360" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    <span className="mp-button-text">비밀번호 설정</span>
                  </p>
                  <div className="mp-view-30" data-node-id="2275:25361" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </a>
                <a href="/mypage/account/password-help" className="mp-screen-action mp-view-156" data-node-id="2275:25363" data-name="비밀번호 도움말">
                  <p className="mp-view-46 mp-button-label" data-node-id="2275:25364" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    <span className="mp-button-text">비밀번호 도움말</span>
                  </p>
                  <div className="mp-view-30" data-node-id="2275:25365" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </a>
              </div>
            </div>
            <div className="mp-view-213" data-node-id="2275:25367">
              <div className="mp-view-214" data-node-id="2275:25368">
                <div className="mp-view-215" data-node-id="2275:25369">
                  <p className="mp-view-25" data-node-id="2275:25370" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    현재 비밀번호
                  </p>
                </div>
                {passwordInput('currentPassword', '현재 비밀번호', '2275:25371')}
              </div>
              <div className="mp-view-214" data-node-id="2275:25372">
                <div className="mp-view-215" data-node-id="2275:25373">
                  <p className="mp-view-25" data-node-id="2275:25374" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`새 비밀번호 `}</p>
                </div>
                {passwordInput('newPassword', '새 비밀번호', '2275:25375')}
              </div>
              <div className="mp-view-214" data-node-id="2275:25376">
                <div className="mp-view-217" data-node-id="2275:25377">
                  <p className="mp-view-25" data-node-id="2275:25378" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    새 비밀번호 확인
                  </p>
                </div>
                {passwordInput('confirmPassword', '새 비밀번호 확인', '2275:25379')}
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25380" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:25381">
              <div className="mp-view-151" data-node-id="2275:25382" data-name="이름">
                <p className="mp-view-184" data-node-id="2275:25383" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이름
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-154" data-node-id="2275:25384">
                <p className="mp-view-25" data-node-id="2275:25385" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  {DEFAULT_USER_NAME}
                </p>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25386" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:25387">
              <div className="mp-view-151" data-node-id="2275:25388" data-name="생일">
                <p className="mp-view-184" data-node-id="2275:25389" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    생년월일
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-132" data-node-id="2275:25390">
                <div className="mp-view-157" data-node-id="2275:25391" data-name="생년월일">
                  <p className="mp-view-46" data-node-id="2275:25392" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    2002
                  </p>
                  <div className="mp-view-30" data-node-id="2275:25393" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
                <div className="mp-view-158" data-node-id="2275:25395" data-name="생일">
                  <p className="mp-view-46" data-node-id="2275:25396" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    03
                  </p>
                  <div className="mp-view-30" data-node-id="2275:25397" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
                <div className="mp-view-158" data-node-id="2275:25399" data-name="생일 정보">
                  <p className="mp-view-46" data-node-id="2275:25400" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    05
                  </p>
                  <div className="mp-view-30" data-node-id="2275:25401" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25403" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:25404">
              <div className="mp-view-151" data-node-id="2275:25405">
                <p className="mp-view-145" data-node-id="2275:25406" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  성별
                </p>
              </div>
              <div className="mp-view-160" data-node-id="2275:25407">
                <div className="mp-view-23" data-node-id="2275:25408" data-name="남자">
                  <div className="mp-view-30" data-node-id="2275:25409" data-name="ic:baseline-radio-button-unchecked">
                    <img alt="" className="mp-view-31" src={imgIcBaselineRadioButtonUnchecked} />
                  </div>
                  <div className="mp-view-161" data-node-id="2275:25411">
                    <p className="mp-view-162" data-node-id="2275:25412" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      남자
                    </p>
                  </div>
                </div>
                <div className="mp-view-163" data-node-id="2275:25413" data-name="여자">
                  <div className="mp-view-30" data-node-id="2275:25414" data-name="carbon:radio-button-checked">
                    <img alt="" className="mp-view-31" src={imgCarbonRadioButtonChecked} />
                  </div>
                  <div className="mp-view-161" data-node-id="2275:25417">
                    <p className="mp-view-162" data-node-id="2275:25418" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      여자
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25419" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:25420">
              <div className="mp-view-151" data-node-id="2275:25421" data-name="닉네임">
                <p className="mp-view-184" data-node-id="2275:25422" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    닉네임
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-164" data-node-id="2275:25423">
                <div className="mp-view-165" data-node-id="2275:25424">
                  <p className="mp-view-25" data-node-id="2275:25425" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    온결프로젝트화이팅
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25426" data-name="라인" />
            <div className="mp-view-141" data-node-id="2275:25427">
              <div className="mp-view-151" data-node-id="2275:25428" data-name="이메일 *">
                <p className="mp-view-184" data-node-id="2275:25429" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이메일
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-166" data-node-id="2275:25430">
                <div className="mp-view-137" data-node-id="2275:25431">
                  <div className="mp-view-167" data-node-id="2275:25432">
                    <div className="mp-view-168" data-node-id="2275:25433">
                      <input name="previewEmail" aria-label="Email" type="email" required value={account.email} onChange={account.changeEmail} onBlur={event => event.target.reportValidity()} onKeyDown={account.keyDown} className="mp-view-25" data-node-id="2275:25434" style={{ width: '100%', minWidth: 0, padding: 0, margin: 0, border: 0, background: 'transparent' }} />
                    </div>
                  </div>
                  <a href="/mypage/account/email" className="mp-screen-action mp-view-169" data-node-id="2275:25435" data-name="직접입력">
                    <p className="mp-view-170 mp-button-label" data-node-id="2275:25436" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-button-text">직접입력</span>
                    </p>
                    <div className="mp-view-30" data-node-id="2275:25437" data-name="akar-icons:chevron-down-small">
                      <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                    </div>
                  </a>
                </div>
                <div className="mp-view-171" data-node-id="2275:25439" data-name="수신동의 문구">
                  <div className="mp-view-172" data-node-id="2275:25440">
                    <div className="mp-view-173" data-node-id="2275:25441" data-name="akar-icons:check">
                      <img alt="" className="mp-view-31" src={imgAkarIconsCheck} />
                    </div>
                  </div>
                  <p className="mp-view-174" data-node-id="2275:25443" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    정보/이벤트 메일 수신에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25444" data-name="라인" />
            <div className="mp-view-141" data-node-id="2275:25445">
              <div className="mp-view-151" data-node-id="2275:25446" data-name="휴대폰번호">
                <p className="mp-view-184" data-node-id="2275:25447" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    휴대폰 번호
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-175" data-node-id="2275:25448">
                <div className="mp-view-137" data-node-id="2275:25449">
                  <div className="mp-view-176" data-node-id="2275:25450">
                    <div className="mp-view-177" data-node-id="2275:25451">
                      <p className="mp-view-52" data-node-id="2275:25452" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        010-1234-5678
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-178" data-node-id="2275:25453" data-name="휴대폰번호 변경">
                    <p className="mp-view-46" data-node-id="2275:25454" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      휴대폰번호 변경
                    </p>
                  </div>
                </div>
                <div className="mp-view-171" data-node-id="2275:25455" data-name="수신동의 문구">
                  <div className="mp-view-172" data-node-id="2275:25456">
                    <div className="mp-view-173" data-node-id="2275:25457" data-name="akar-icons:check">
                      <img alt="" className="mp-view-31" src={imgAkarIconsCheck} />
                    </div>
                  </div>
                  <p className="mp-view-174" data-node-id="2275:25459" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    정보/이벤트 메일 수신에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:25460" data-name="라인" />
            <div className="mp-view-130" data-node-id="2275:25461">
              <div className="mp-view-151" data-node-id="2275:25462" data-name="주소">
                <p className="mp-view-184" data-node-id="2275:25463" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`주소 `}</span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-131" data-node-id="2275:25464">
                <div className="mp-view-132" data-node-id="2275:25465">
                  <div className="mp-view-176" data-node-id="2275:25466">
                    <div className="mp-view-177" data-node-id="2275:25467">
                      <p className="mp-view-52" data-node-id="2275:25468" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        000000
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-179" data-node-id="2275:25469">
                    <p className="mp-view-46" data-node-id="2275:25470" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      우편번호검색
                    </p>
                  </div>
                </div>
                <div className="mp-view-137" data-node-id="2275:25471">
                  <div className="mp-view-180" data-node-id="2275:25472">
                    <div className="mp-view-181" data-node-id="2275:25473">
                      <p className="mp-view-182" data-node-id="2275:25474" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        서울특별시 마포구 월드컵북로 123, 온결빌라 502호
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-187" data-node-id="2275:25475">
                    <p className="mp-view-52" data-node-id="2275:25476" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      502호
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
