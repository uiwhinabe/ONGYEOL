import { MyPageButton } from './MyPageButton.jsx'
import { DEFAULT_USER_NAME } from './mypageUser.js'
import './MypageAccountTablet.css'
import './MypageAccountMobile.css'
import useAccountPreview from './useAccountPreview.js'
import imgAkarIconsChevronDownSmall from '../../assets/mypage/screens/2ed0f.svg'
import imgIcBaselineRadioButtonUnchecked from '../../assets/mypage/screens/36109.svg'
import imgCarbonRadioButtonChecked from '../../assets/mypage/screens/47e79.svg'
import imgAkarIconsChevronDownSmall1 from '../../assets/mypage/screens/0ff46.svg'
import imgAkarIconsCheck from '../../assets/mypage/screens/91352.svg'

// Figma frame 2275:24685; content node 2275:24740.
export default function MypageAccountEmail() {
  const account = useAccountPreview()
  return (
    <div className="mp-view-150 mp-account-tablet mp-account-email" data-node-id="2275:24740" onKeyDown={account.keyDown}>
          <div className="mp-view-118" data-node-id="2275:24741">
            <div className="mp-view-119" data-node-id="2275:24742">
              <div className="mp-view-120" data-node-id="2275:24743" data-name="나의 배송지 관리 F">
                <p className="mp-view-121" data-node-id="2275:24744" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  기본정보
                </p>
              </div>
            </div>
            <div className="mp-view-122" data-node-id="2275:24745" data-name="라인" />
          </div>
          <div className="mp-view-123" data-node-id="2275:24746">
            <div className="mp-view-62" data-node-id="2275:24747">
              <div className="mp-view-151" data-node-id="2275:24748" data-name="아이디">
                <p className="mp-view-184" data-node-id="2275:24749" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    아이디
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`   `}</span>
                </p>
              </div>
              <div className="mp-view-154" data-node-id="2275:24750">
                <p className="mp-view-25" data-node-id="2275:24751" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  ongyeolhehe11
                </p>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24752" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24753">
              <div className="mp-view-151" data-node-id="2275:24754" data-name="비밀번호">
                <p className="mp-view-184" data-node-id="2275:24755" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    비밀번호
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-132" data-node-id="2275:24756">
                <MyPageButton to="/mypage/account/password" className="mp-screen-action mp-view-155" data-node-id="2275:24757" data-name="비밀번호 설정">
                  <p className="mp-view-46 mp-button-label" data-node-id="2275:24758" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    <span className="mp-button-text">비밀번호 설정</span>
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24759" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </MyPageButton>
                <MyPageButton to="/mypage/account/password-help" className="mp-screen-action mp-view-156" data-node-id="2275:24761" data-name="비밀번호 도움말">
                  <p className="mp-view-46 mp-button-label" data-node-id="2275:24762" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    <span className="mp-button-text">비밀번호 도움말</span>
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24763" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </MyPageButton>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24765" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24766">
              <div className="mp-view-151" data-node-id="2275:24767" data-name="이름">
                <p className="mp-view-184" data-node-id="2275:24768" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이름
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-154" data-node-id="2275:24769">
                <p className="mp-view-25" data-node-id="2275:24770" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  {DEFAULT_USER_NAME}
                </p>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24771" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24772">
              <div className="mp-view-151" data-node-id="2275:24773" data-name="생일">
                <p className="mp-view-184" data-node-id="2275:24774" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    생년월일
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-132" data-node-id="2275:24775">
                <div className="mp-view-157" data-node-id="2275:24776" data-name="생년월일">
                  <p className="mp-view-46" data-node-id="2275:24777" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    2002
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24778" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
                <div className="mp-view-158" data-node-id="2275:24780" data-name="생일">
                  <p className="mp-view-46" data-node-id="2275:24781" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    03
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24782" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
                <div className="mp-view-158" data-node-id="2275:24784" data-name="생일 정보">
                  <p className="mp-view-46" data-node-id="2275:24785" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    05
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24786" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24788" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24789">
              <div className="mp-view-151" data-node-id="2275:24790">
                <p className="mp-view-145" data-node-id="2275:24791" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  성별
                </p>
              </div>
              <div className="mp-view-160" data-node-id="2275:24792">
                <div className="mp-view-23" data-node-id="2275:24793" data-name="남자">
                  <div className="mp-view-30" data-node-id="2275:24794" data-name="ic:baseline-radio-button-unchecked">
                    <img alt="" className="mp-view-31" src={imgIcBaselineRadioButtonUnchecked} />
                  </div>
                  <div className="mp-view-161" data-node-id="2275:24796">
                    <p className="mp-view-162" data-node-id="2275:24797" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      남자
                    </p>
                  </div>
                </div>
                <div className="mp-view-163" data-node-id="2275:24798" data-name="여자">
                  <div className="mp-view-30" data-node-id="2275:24799" data-name="carbon:radio-button-checked">
                    <img alt="" className="mp-view-31" src={imgCarbonRadioButtonChecked} />
                  </div>
                  <div className="mp-view-161" data-node-id="2275:24802">
                    <p className="mp-view-162" data-node-id="2275:24803" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      여자
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24804" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24805">
              <div className="mp-view-151" data-node-id="2275:24806" data-name="닉네임">
                <p className="mp-view-184" data-node-id="2275:24807" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    닉네임
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-164" data-node-id="2275:24808">
                <div className="mp-view-165" data-node-id="2275:24809">
                  <p className="mp-view-25" data-node-id="2275:24810" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    온결프로젝트화이팅
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24811" data-name="라인" />
            <div className="mp-view-141" data-node-id="2275:24812">
              <div className="mp-view-151" data-node-id="2275:24813" data-name="이메일 *">
                <p className="mp-view-184" data-node-id="2275:24814" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이메일
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-166" data-node-id="2275:24815">
                <div className="mp-view-137" data-node-id="2275:24816">
                  <div className="mp-view-167" data-node-id="2275:24817">
                    <div className="mp-view-168" data-node-id="2275:24818">
                      <input name="previewEmail" aria-label="Email" type="email" required value={account.email} onChange={account.changeEmail} onBlur={event => event.target.reportValidity()} onKeyDown={account.keyDown} className="mp-view-25" data-node-id="2275:24819" style={{ width: '100%', minWidth: 0, padding: 0, margin: 0, border: 0, background: 'transparent' }} />
                    </div>
                  </div>
                  <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-169" data-node-id="2275:24820" data-name="직접입력">
                    <p className="mp-view-170 mp-button-label" data-node-id="2275:24821" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      <span className="mp-button-text">직접입력</span>
                    </p>
                    <div className="mp-view-30" data-node-id="2275:24822" data-name="akar-icons:chevron-down-small">
                      <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall1} />
                    </div>
                  </MyPageButton>
                </div>
                <div className="mp-view-188 mp-account-mobile-domains" data-name="이메일">
                  <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-189" onClick={event => account.selectDomain(event, "@gmail.com")}>
                    <p className="mp-view-190">
                      @gmail.com
                    </p>
                  </MyPageButton>
                  <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-191" onClick={event => account.selectDomain(event, "@naver.com")}>
                    <p className="mp-view-190">
                      @naver.com
                    </p>
                  </MyPageButton>
                  <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-192" onClick={event => account.selectDomain(event, "@daum.net")}>
                    <p className="mp-view-190">
                      @daum.net
                    </p>
                  </MyPageButton>
                  <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-193" onClick={event => account.selectDomain(event, "@nate.com")}>
                    <p className="mp-view-190">
                      @nate.com
                    </p>
                  </MyPageButton>
                  <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-194" onClick={event => account.selectDomain(event, "")}>
                    <p className="mp-view-190">
                      직접입력
                    </p>
                  </MyPageButton>
                </div>
                <div className="mp-view-171" data-node-id="2275:24824" data-name="수신동의 문구">
                  <div className="mp-view-172" data-node-id="2275:24825">
                    <div className="mp-view-173" data-node-id="2275:24826" data-name="akar-icons:check">
                      <img alt="" className="mp-view-31" src={imgAkarIconsCheck} />
                    </div>
                  </div>
                  <p className="mp-view-174" data-node-id="2275:24828" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    정보/이벤트 메일 수신에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24829" data-name="라인" />
            <div className="mp-view-141" data-node-id="2275:24830">
              <div className="mp-view-151" data-node-id="2275:24831" data-name="휴대폰번호">
                <p className="mp-view-184" data-node-id="2275:24832" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    휴대폰 번호
                  </span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-175" data-node-id="2275:24833">
                <div className="mp-view-137" data-node-id="2275:24834">
                  <div className="mp-view-176" data-node-id="2275:24835">
                    <div className="mp-view-177" data-node-id="2275:24836">
                      <p className="mp-view-52" data-node-id="2275:24837" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        010-1234-5678
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-178" data-node-id="2275:24838" data-name="휴대폰번호 변경">
                    <p className="mp-view-46" data-node-id="2275:24839" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      휴대폰번호 변경
                    </p>
                  </div>
                </div>
                <div className="mp-view-171" data-node-id="2275:24840" data-name="수신동의 문구">
                  <div className="mp-view-172" data-node-id="2275:24841">
                    <div className="mp-view-173" data-node-id="2275:24842" data-name="akar-icons:check">
                      <img alt="" className="mp-view-31" src={imgAkarIconsCheck} />
                    </div>
                  </div>
                  <p className="mp-view-174" data-node-id="2275:24844" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    정보/이벤트 메일 수신에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24845" data-name="라인" />
            <div className="mp-view-130" data-node-id="2275:24846">
              <div className="mp-view-151" data-node-id="2275:24847" data-name="주소">
                <p className="mp-view-184" data-node-id="2275:24848" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`주소 `}</span>
                  <span className="mp-view-186" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-185" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-131" data-node-id="2275:24849">
                <div className="mp-view-132" data-node-id="2275:24850">
                  <div className="mp-view-176" data-node-id="2275:24851">
                    <div className="mp-view-177" data-node-id="2275:24852">
                      <p className="mp-view-52" data-node-id="2275:24853" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        000000
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-179" data-node-id="2275:24854">
                    <p className="mp-view-46" data-node-id="2275:24855" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      우편번호검색
                    </p>
                  </div>
                </div>
                <div className="mp-view-137" data-node-id="2275:24856">
                  <div className="mp-view-180" data-node-id="2275:24857">
                    <div className="mp-view-181" data-node-id="2275:24858">
                      <p className="mp-view-182" data-node-id="2275:24859" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        서울특별시 마포구 월드컵북로 123, 온결빌라 502호
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-187" data-node-id="2275:24860">
                    <p className="mp-view-52" data-node-id="2275:24861" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      502호
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-188" data-node-id="2275:24862" data-name="이메일">
              <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-189" onClick={event => account.selectDomain(event, "@gmail.com")} data-node-id="2275:24863">
                <p className="mp-view-190" data-node-id="2275:24864">
                  @gmail.com
                </p>
              </MyPageButton>
              <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-191" onClick={event => account.selectDomain(event, "@naver.com")} data-node-id="2275:24865">
                <p className="mp-view-190" data-node-id="2275:24866">
                  @naver.com
                </p>
              </MyPageButton>
              <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-192" onClick={event => account.selectDomain(event, "@daum.net")} data-node-id="2275:24867">
                <p className="mp-view-190" data-node-id="2275:24868">
                  @daum.net
                </p>
              </MyPageButton>
              <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-193" onClick={event => account.selectDomain(event, "@nate.com")} data-node-id="2275:24869">
                <p className="mp-view-190" data-node-id="2275:24870">
                  @nate.com
                </p>
              </MyPageButton>
              <MyPageButton to="/mypage/account" className="mp-screen-action mp-view-194" onClick={event => account.selectDomain(event, "")} data-node-id="2275:24871">
                <p className="mp-view-190" data-node-id="2275:24872">
                  직접입력
                </p>
              </MyPageButton>
            </div>
          </div>
        </div>
  )
}
