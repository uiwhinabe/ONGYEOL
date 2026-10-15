import './MypageAccountTablet.css'
import './MypageAccountMobile.css'
import useAccountPreview from './useAccountPreview.js'
import imgAkarIconsChevronDownSmall from '../../assets/mypage/screens/2ed0f.svg'
import imgIcBaselineRadioButtonUnchecked from '../../assets/mypage/screens/36109.svg'
import imgCarbonRadioButtonChecked from '../../assets/mypage/screens/47e79.svg'
import imgAkarIconsCheck from '../../assets/mypage/screens/91352.svg'

// Figma frame 2275:24396; content node 2275:24451.
export default function MypageAccount() {
  const account = useAccountPreview()
  return (
    <div className="mp-view-150 mp-account-tablet mp-account-basic" data-node-id="2275:24451" onKeyDown={account.keyDown}>
          <div className="mp-view-118" data-node-id="2275:24452">
            <div className="mp-view-119" data-node-id="2275:24453">
              <div className="mp-view-120" data-node-id="2275:24454" data-name="나의 배송지 관리 F">
                <p className="mp-view-121" data-node-id="2275:24455" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  기본정보
                </p>
              </div>
            </div>
            <div className="mp-view-122" data-node-id="2275:24456" data-name="라인" />
          </div>
          <div className="mp-view-123" data-node-id="2275:24457">
            <div className="mp-view-62" data-node-id="2275:24458">
              <div className="mp-view-151" data-node-id="2275:24459" data-name="아이디">
                <p className="mp-view-125" data-node-id="2275:24460" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    아이디
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`   `}</span>
                </p>
              </div>
              <div className="mp-view-154" data-node-id="2275:24461">
                <p className="mp-view-25" data-node-id="2275:24462" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  ongyeolhehe11
                </p>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24463" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24464">
              <div className="mp-view-151" data-node-id="2275:24465" data-name="비밀번호">
                <p className="mp-view-125" data-node-id="2275:24466" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    비밀번호
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-132" data-node-id="2275:24467">
                <a href="/mypage/account/password" className="mp-screen-action mp-view-155" data-node-id="2275:24468" data-name="비밀번호 설정">
                  <p className="mp-view-46" data-node-id="2275:24469" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    비밀번호 설정
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24470" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </a>
                <a href="/mypage/account/password-help" className="mp-screen-action mp-view-156" data-node-id="2275:24472" data-name="비밀번호 도움말">
                  <p className="mp-view-46" data-node-id="2275:24473" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    비밀번호 도움말
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24474" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </a>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24476" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24477">
              <div className="mp-view-151" data-node-id="2275:24478" data-name="이름">
                <p className="mp-view-125" data-node-id="2275:24479" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이름
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-154" data-node-id="2275:24480">
                <p className="mp-view-25" data-node-id="2275:24481" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  이다빈
                </p>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24482" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24483">
              <div className="mp-view-151" data-node-id="2275:24484" data-name="생일">
                <p className="mp-view-125" data-node-id="2275:24485" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    생년월일
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-132" data-node-id="2275:24486">
                <div className="mp-view-157" data-node-id="2275:24487" data-name="생년월일">
                  <p className="mp-view-46" data-node-id="2275:24488" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    2002
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24489" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
                <div className="mp-view-158" data-node-id="2275:24491" data-name="생일">
                  <p className="mp-view-46" data-node-id="2275:24492" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    03
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24493" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
                <div className="mp-view-158" data-node-id="2275:24495" data-name="생일 정보">
                  <p className="mp-view-46" data-node-id="2275:24496" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    05
                  </p>
                  <div className="mp-view-30" data-node-id="2275:24497" data-name="akar-icons:chevron-down-small">
                    <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24499" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24500">
              <div className="mp-view-151" data-node-id="2275:24501">
                <p className="mp-view-159" data-node-id="2275:24502" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  성별
                </p>
              </div>
              <div className="mp-view-160" data-node-id="2275:24503">
                <div className="mp-view-23" data-node-id="2275:24504" data-name="남자">
                  <div className="mp-view-30" data-node-id="2275:24505" data-name="ic:baseline-radio-button-unchecked">
                    <img alt="" className="mp-view-31" src={imgIcBaselineRadioButtonUnchecked} />
                  </div>
                  <div className="mp-view-161" data-node-id="2275:24507">
                    <p className="mp-view-162" data-node-id="2275:24508" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      남자
                    </p>
                  </div>
                </div>
                <div className="mp-view-163" data-node-id="2275:24509" data-name="여자">
                  <div className="mp-view-30" data-node-id="2275:24510" data-name="carbon:radio-button-checked">
                    <img alt="" className="mp-view-31" src={imgCarbonRadioButtonChecked} />
                  </div>
                  <div className="mp-view-161" data-node-id="2275:24513">
                    <p className="mp-view-162" data-node-id="2275:24514" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      여자
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24515" data-name="라인" />
            <div className="mp-view-62" data-node-id="2275:24516">
              <div className="mp-view-151" data-node-id="2275:24517" data-name="닉네임">
                <p className="mp-view-125" data-node-id="2275:24518" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    닉네임
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-164" data-node-id="2275:24519">
                <div className="mp-view-165" data-node-id="2275:24520">
                  <p className="mp-view-25" data-node-id="2275:24521" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    온결프로젝트화이팅
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24522" data-name="라인" />
            <div className="mp-view-141" data-node-id="2275:24523">
              <div className="mp-view-151" data-node-id="2275:24524" data-name="이메일 *">
                <p className="mp-view-125" data-node-id="2275:24525" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이메일
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-166" data-node-id="2275:24526">
                <div className="mp-view-137" data-node-id="2275:24527">
                  <div className="mp-view-167" data-node-id="2275:24528">
                    <div className="mp-view-168" data-node-id="2275:24529">
                      <input name="previewEmail" aria-label="Email" type="email" required value={account.email} onChange={account.changeEmail} onBlur={event => event.target.reportValidity()} onKeyDown={account.keyDown} className="mp-view-25" data-node-id="2275:24530" style={{ width: '100%', minWidth: 0, padding: 0, margin: 0, border: 0, background: 'transparent' }} />
                    </div>
                  </div>
                  <a href="/mypage/account/email" className="mp-screen-action mp-view-169" data-node-id="2275:24531" data-name="직접입력">
                    <p className="mp-view-170" data-node-id="2275:24532" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      직접입력
                    </p>
                    <div className="mp-view-30" data-node-id="2275:24533" data-name="akar-icons:chevron-down-small">
                      <img alt="" className="mp-view-31" src={imgAkarIconsChevronDownSmall} />
                    </div>
                  </a>
                </div>
                <div className="mp-view-171" data-node-id="2275:24535" data-name="수신동의 문구">
                  <div className="mp-view-172" data-node-id="2275:24536">
                    <div className="mp-view-173" data-node-id="2275:24537" data-name="akar-icons:check">
                      <img alt="" className="mp-view-31" src={imgAkarIconsCheck} />
                    </div>
                  </div>
                  <p className="mp-view-174" data-node-id="2275:24539" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    정보/이벤트 메일 수신에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24540" data-name="라인" />
            <div className="mp-view-141" data-node-id="2275:24541">
              <div className="mp-view-151" data-node-id="2275:24542" data-name="휴대폰번호">
                <p className="mp-view-125" data-node-id="2275:24543" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    휴대폰 번호
                  </span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-175" data-node-id="2275:24544">
                <div className="mp-view-137" data-node-id="2275:24545">
                  <div className="mp-view-176" data-node-id="2275:24546">
                    <div className="mp-view-177" data-node-id="2275:24547">
                      <p className="mp-view-52" data-node-id="2275:24548" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        010-1234-5678
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-178" data-node-id="2275:24549" data-name="휴대폰번호 변경">
                    <p className="mp-view-46" data-node-id="2275:24550" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      휴대폰번호 변경
                    </p>
                  </div>
                </div>
                <div className="mp-view-171" data-node-id="2275:24551" data-name="수신동의 문구">
                  <div className="mp-view-172" data-node-id="2275:24552">
                    <div className="mp-view-173" data-node-id="2275:24553" data-name="akar-icons:check">
                      <img alt="" className="mp-view-31" src={imgAkarIconsCheck} />
                    </div>
                  </div>
                  <p className="mp-view-174" data-node-id="2275:24555" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    정보/이벤트 메일 수신에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="mp-view-129" data-node-id="2275:24556" data-name="라인" />
            <div className="mp-view-130" data-node-id="2275:24557">
              <div className="mp-view-151" data-node-id="2275:24558" data-name="주소">
                <p className="mp-view-125" data-node-id="2275:24559" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`주소 `}</span>
                  <span className="mp-view-153" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    *
                  </span>
                  <span className="mp-view-152" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`  `}</span>
                </p>
              </div>
              <div className="mp-view-131" data-node-id="2275:24560">
                <div className="mp-view-132" data-node-id="2275:24561">
                  <div className="mp-view-176" data-node-id="2275:24562">
                    <div className="mp-view-177" data-node-id="2275:24563">
                      <p className="mp-view-52" data-node-id="2275:24564" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        000000
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-179" data-node-id="2275:24565">
                    <p className="mp-view-46" data-node-id="2275:24566" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                      우편번호검색
                    </p>
                  </div>
                </div>
                <div className="mp-view-137" data-node-id="2275:24567">
                  <div className="mp-view-180" data-node-id="2275:24568">
                    <div className="mp-view-181" data-node-id="2275:24569">
                      <p className="mp-view-182" data-node-id="2275:24570" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                        서울특별시 마포구 월드컵북로 123, 온결빌라 502호
                      </p>
                    </div>
                  </div>
                  <div className="mp-view-183" data-node-id="2275:24571">
                    <p className="mp-view-52" data-node-id="2275:24572" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
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
