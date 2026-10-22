import { useEffect, useState } from 'react'
import useSkinProfile, { skinTypes, skinConcerns } from './useSkinProfile.js'
import imgEllipse1 from '../../assets/mypage/screens/e97f4.svg'
import imgGriddyIconsWaterDrop from '../../assets/mypage/screens/feac4.svg'
import imgSparkles from '../../assets/mypage/screens/32349.svg'
import imgGroup from '../../assets/mypage/screens/a5630.svg'
import imgGroup1 from '../../assets/mypage/screens/f086a.svg'
import imgEpCircleCheckFilled from '../../assets/mypage/screens/66631.svg'
import imgBiEmojiSmile from '../../assets/mypage/screens/ec637.svg'
import imgVector from '../../assets/mypage/screens/c37a4.svg'
import './MypageSkinTablet.css'
import './MypageSkinMobile.css'
import tabletCombination from './tablet-skin-combination.svg'

// Figma frame 2275:25807; content node 2275:25859.
export default function MypageSkinSettings() {
  const { profile, update, toggleConcern } = useSkinProfile()
  const [memoDraft, setMemoDraft] = useState(profile.memo)
  useEffect(() => {
    // Tablet keeps its explicit save action. Leaving that layout commits the
    // current draft so switching to an immediate editor never loses typing.
    const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1432px)')
    const syncDraft = event => { if (!event.matches) update({ memo: memoDraft }) }
    tablet.addEventListener('change', syncDraft)
    return () => tablet.removeEventListener('change', syncDraft)
  }, [memoDraft, update])
  const controlStyle = { margin: 0, font: 'inherit', color: 'inherit', textAlign: 'inherit', cursor: 'pointer' }

  function saveProfile() {
    update({ skinType: profile.skinType, concerns: profile.concerns, memo: memoDraft })
  }

  return (
    <div className="mp-view-256 mp-skin-settings" data-node-id="2275:25859" data-name="나의 피부정보">
          <div className="mp-view-257" data-node-id="2275:25860" data-name="나의 피부 정보 상단">
            <div className="mp-view-258" data-node-id="2275:25861">
              <p className="mp-view-259" data-node-id="2275:25862" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                나의 피부 정보
              </p>
            </div>
            <div className="mp-view-260" data-node-id="2275:25863">
              <p className="mp-view-261" data-node-id="2275:25864" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                내 피부 상태를 입력하면,<br className="mp-skin-mobile-break" /> 더 정확한 맞춤 케어를 추천해드려요.
              </p>
            </div>
          </div>
          <div className="mp-view-262" data-node-id="2275:25865" data-name="피부타입">
            <div className="mp-view-263" data-node-id="2275:25866">
              <div className="mp-view-264" data-node-id="2275:25867" data-name="피부타입 T + F">
                <div className="mp-view-265" data-node-id="2275:25868">
                  <div className="mp-view-266" data-node-id="2275:25869">
                    <img alt="" className="mp-view-31" src={imgEllipse1} />
                  </div>
                  <p className="mp-view-267" data-node-id="2275:25870">
                    01
                  </p>
                </div>
                <div className="mp-view-268" data-node-id="2275:25871">
                  <div className="mp-view-269" data-node-id="2275:25872">
                    <p className="mp-view-270" data-node-id="2275:25873">
                      피부타입
                    </p>
                  </div>
                  <div className="mp-view-271" data-node-id="2275:25874">
                    <p className="mp-view-272" data-node-id="2275:25875">
                      가장 가까운 피부 타입을 선택해주세요.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mp-view-273" data-node-id="2275:25876" data-name="피부타입 카드">
                <button type="button" aria-label={skinTypes[0]} aria-pressed={profile.skinType === skinTypes[0]} onClick={() => update({ skinType: skinTypes[0] })} style={controlStyle}  className="mp-view-274" data-node-id="2275:25877" data-name="건성">
                  {profile.skinType === skinTypes[0] && <span className="mp-view-300"><img alt="" className="mp-view-31" src={imgEpCircleCheckFilled} /></span>}
                  <div className="mp-view-275" data-node-id="2275:25878">
                    <div className="mp-view-276" data-node-id="2275:25879" data-name="griddy-icons:water-drop">
                      <img alt="" className="mp-view-31" src={imgGriddyIconsWaterDrop} />
                    </div>
                    <div className="mp-view-277" data-node-id="2275:25881">
                      <p className="mp-view-278" data-node-id="2275:25882">
                        건성
                      </p>
                    </div>
                    <div className="mp-view-279" data-node-id="2275:25883">
                      <p className="mp-view-280" data-node-id="2275:25884">
                        {`당김이 느껴지고 `}
                        <br aria-hidden />
                        쉽게 건조해요
                      </p>
                    </div>
                  </div>
                </button>
                <button type="button" aria-label={skinTypes[1]} aria-pressed={profile.skinType === skinTypes[1]} onClick={() => update({ skinType: skinTypes[1] })} style={controlStyle}  className="mp-view-281" data-node-id="2275:25885" data-name="지성">
                  {profile.skinType === skinTypes[1] && <span className="mp-view-300"><img alt="" className="mp-view-31" src={imgEpCircleCheckFilled} /></span>}
                  <div className="mp-view-62" data-node-id="2275:25886">
                    <div className="mp-view-275" data-node-id="2275:25887" data-name="지성">
                      <div className="mp-view-276" data-node-id="2275:25888" data-name="sparkles">
                        <img alt="" className="mp-view-31" src={imgSparkles} />
                      </div>
                      <div className="mp-view-277" data-node-id="2275:25890">
                        <p className="mp-view-278" data-node-id="2275:25891">
                          지성
                        </p>
                      </div>
                      <div className="mp-view-279" data-node-id="2275:25892">
                        <p className="mp-view-280" data-node-id="2275:25893">
                          {`피지와 유분이 `}
                          <br aria-hidden />
                          많은 편이에요
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
                <button type="button" aria-label={skinTypes[2]} aria-pressed={profile.skinType === skinTypes[2]} onClick={() => update({ skinType: skinTypes[2] })} style={controlStyle}  className="mp-view-282" data-node-id="2275:25894" data-name="복합성">
                  {profile.skinType === skinTypes[2] && <span className="mp-view-300"><img alt="" className="mp-view-31" src={imgEpCircleCheckFilled} /></span>}
                  <div className="mp-view-283" data-node-id="2275:25895">
                    <div className="mp-view-284" data-node-id="2275:25896" data-name="glyphs:venn">
                      <div className="mp-view-285" data-node-id="2275:25897" data-name="Group">
                        <div className="mp-view-286">
                            <picture><source media="(min-width: 768px) and (max-width: 1432px)" srcSet={tabletCombination} /><img alt="" className="mp-view-14" src={imgGroup} /></picture>
                        </div>
                      </div>
                    </div>
                    <div className="mp-view-287" data-node-id="2275:25901">
                      <p className="mp-view-288" data-node-id="2275:25902">
                        복합성
                      </p>
                    </div>
                    <div className="mp-view-289" data-node-id="2275:25903">
                      <p className="mp-skin-type-tablet-copy">부위별로<br />유분·건조함이<br />달라요</p>
                      <p className="mp-view-290" data-node-id="2275:25904">
                        부위별로 유분·
                        <br aria-hidden />
                        건조함이 달라요
                      </p>
                    </div>
                  </div>
                </button>
                <div className="mp-view-291" data-node-id="2275:25905">
                  <button type="button" aria-label={skinTypes[3]} aria-pressed={profile.skinType === skinTypes[3]} onClick={() => update({ skinType: skinTypes[3] })} style={controlStyle}  className="mp-view-292" data-node-id="2275:25906" data-name="민감성">
                  {profile.skinType === skinTypes[3] && <span className="mp-view-300"><img alt="" className="mp-view-31" src={imgEpCircleCheckFilled} /></span>}
                    <div className="mp-view-293" data-node-id="2275:25907">
                      <div className="mp-view-294" data-node-id="2275:25908" data-name="akar-icons:circle-alert">
                        <div className="mp-view-295" data-node-id="2275:25909" data-name="Group">
                          <div className="mp-view-296">
                            <img alt="" className="mp-view-14" src={imgGroup1} />
                          </div>
                        </div>
                      </div>
                      <div className="mp-view-277" data-node-id="2275:25912">
                        <p className="mp-view-297" data-node-id="2275:25913">
                          민감성
                        </p>
                      </div>
                      <div className="mp-view-298" data-node-id="2275:25914">
                        <p className="mp-skin-type-tablet-copy">성분이나<br />외부 자극에<br />쉽게 반응해요</p>
                        <p className="mp-view-299" data-node-id="2275:25915">
                          {`성분이나 외부 자극에 `}
                          <br aria-hidden />
                          쉽게 반응해요
                        </p>
                      </div>
                    </div>

                  </button>
                </div>
                <button type="button" aria-label={skinTypes[4]} aria-pressed={profile.skinType === skinTypes[4]} onClick={() => update({ skinType: skinTypes[4] })} style={controlStyle}  className="mp-view-301" data-node-id="2275:25918" data-name="중성">
                  {profile.skinType === skinTypes[4] && <span className="mp-view-300"><img alt="" className="mp-view-31" src={imgEpCircleCheckFilled} /></span>}
                  <div className="mp-view-302" data-node-id="2275:25919" data-name="중성">
                    <div className="mp-view-284" data-node-id="2275:25920" data-name="codicon:sparkle-compact">
                      <div className="mp-view-303" data-node-id="2275:25921" data-name="bi:emoji-smile">
                        <img alt="" className="mp-view-31" src={imgBiEmojiSmile} />
                      </div>
                    </div>
                    <div className="mp-view-277" data-node-id="2275:25925">
                      <p className="mp-view-278" data-node-id="2275:25926">
                        중성
                      </p>
                    </div>
                    <div className="mp-view-279" data-node-id="2275:25927">
                      <p className="mp-skin-type-tablet-copy">유·수분<br />균형이 비교적<br />안정적이에요</p>
                      <p className="mp-view-304" data-node-id="2275:25928">
                        유·수분 균형이
                        <br aria-hidden />
                        비교적 안정적이에요
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="mp-view-305" data-node-id="2275:25929" data-name="외부">
            <div className="mp-view-306" data-node-id="2275:25930">
              <div className="mp-view-307" data-node-id="2275:25931" data-name="피부타입 T + F">
                <div className="mp-view-265" data-node-id="2275:25932">
                  <div className="mp-view-266" data-node-id="2275:25933">
                    <img alt="" className="mp-view-31" src={imgEllipse1} />
                  </div>
                  <p className="mp-view-267" data-node-id="2275:25934">
                    02
                  </p>
                </div>
                <div className="mp-view-308" data-node-id="2275:25935">
                  <div className="mp-view-309" data-node-id="2275:25936">
                    <div className="mp-view-310" data-node-id="2275:25937">
                      <div className="mp-view-311" data-node-id="2275:25938">
                        <div className="mp-view-312" data-node-id="2275:25939">
                          <p className="mp-view-270" data-node-id="2275:25940">
                            피부고민
                          </p>
                        </div>
                        <p className="mp-view-313" data-node-id="2275:25941">
                          (복수 선택 가능)
                        </p>
                      </div>
                      <div className="mp-view-314" data-node-id="2275:25942">
                        <p className="mp-view-272" data-node-id="2275:25943">
                          현재 가장 신경 쓰이는 피부 고민을 선택해주세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mp-view-315" data-node-id="2275:25944">
                <div className="mp-view-316" data-node-id="2275:25945">
                  <div className="mp-view-317" data-node-id="2275:25946" data-name="민감 진정">
                    <button type="button" aria-label={skinConcerns[0]} aria-pressed={profile.concerns.includes(skinConcerns[0])} onClick={() => toggleConcern(skinConcerns[0])} style={{ ...controlStyle, background: 'transparent' }}  className="mp-view-318" data-node-id="2275:25947">
                      <div className="mp-view-319" data-node-id="2275:25948">
                        <p className="mp-view-320" data-node-id="2275:25949">
                          민감 · 진정
                        </p>
                      </div>
                      <div className="mp-view-321" data-node-id="2275:25950" data-name="ep:circle-check-filled" />
                      <div className="mp-view-322" style={{ visibility: profile.concerns.includes(skinConcerns[0]) ? 'visible' : 'hidden' }} data-node-id="2275:25951" data-name="Vector">
                        <img alt="" className="mp-view-31" src={imgVector} />
                      </div>
                    </button>
                  </div>
                  <button type="button" aria-label={skinConcerns[1]} aria-pressed={profile.concerns.includes(skinConcerns[1])} onClick={() => toggleConcern(skinConcerns[1])} style={{ ...controlStyle, background: 'transparent' }}  className="mp-view-323" data-node-id="2275:25952">
                    {profile.concerns.includes(skinConcerns[1]) && <span className="mp-view-322"><img alt="" className="mp-view-31" src={imgVector} /></span>}
                    <p className="mp-view-324" data-node-id="2275:25953">
                      수분·보습
                    </p>
                  </button>
                  <button type="button" aria-label={skinConcerns[2]} aria-pressed={profile.concerns.includes(skinConcerns[2])} onClick={() => toggleConcern(skinConcerns[2])} style={{ ...controlStyle, background: 'transparent' }}  className="mp-view-323" data-node-id="2275:25954">
                    {profile.concerns.includes(skinConcerns[2]) && <span className="mp-view-322"><img alt="" className="mp-view-31" src={imgVector} /></span>}
                    <p className="mp-view-324" data-node-id="2275:25955">
                      모공·피지
                    </p>
                  </button>
                </div>
                <div className="mp-view-325" data-node-id="2275:25956">
                  <button type="button" aria-label={skinConcerns[3]} aria-pressed={profile.concerns.includes(skinConcerns[3])} onClick={() => toggleConcern(skinConcerns[3])} style={{ ...controlStyle, background: 'transparent' }}  className="mp-view-323" data-node-id="2275:25957">
                    {profile.concerns.includes(skinConcerns[3]) && <span className="mp-view-322"><img alt="" className="mp-view-31" src={imgVector} /></span>}
                    <p className="mp-view-324" data-node-id="2275:25958">
                      피부톤·잡티
                    </p>
                  </button>
                  <button type="button" aria-label={skinConcerns[4]} aria-pressed={profile.concerns.includes(skinConcerns[4])} onClick={() => toggleConcern(skinConcerns[4])} style={{ ...controlStyle, background: 'transparent' }}  className="mp-view-323" data-node-id="2275:25959">
                    {profile.concerns.includes(skinConcerns[4]) && <span className="mp-view-322"><img alt="" className="mp-view-31" src={imgVector} /></span>}
                    <p className="mp-view-324" data-node-id="2275:25960">
                      주름·탄력
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mp-skin-settings-final">
          <div className="mp-view-326" data-node-id="2275:25961">
            <div className="mp-view-327" data-node-id="2275:25962">
              <div className="mp-view-328" data-node-id="2275:25963" data-name="피부타입 T + F">
                <div className="mp-view-265" data-node-id="2275:25964">
                  <div className="mp-view-266" data-node-id="2275:25965">
                    <img alt="" className="mp-view-31" src={imgEllipse1} />
                  </div>
                  <p className="mp-view-267" data-node-id="2275:25966">
                    03
                  </p>
                </div>
                <div className="mp-view-308" data-node-id="2275:25967">
                  <div className="mp-view-309" data-node-id="2275:25968">
                    <div className="mp-view-310" data-node-id="2275:25969">
                      <div className="mp-view-311" data-node-id="2275:25970">
                        <div className="mp-view-312" data-node-id="2275:25971">
                          <p className="mp-view-270" data-node-id="2275:25972">
                            피부 고민 메모
                          </p>
                        </div>
                        <p className="mp-view-313" data-node-id="2275:25973">
                          (선택)
                        </p>
                      </div>
                      <div className="mp-view-314" data-node-id="2275:25974">
                        <p className="mp-view-272" data-node-id="2275:25975">
                          추가로 전달하고 싶은 피부 고민이 있다면 자유롭게 작성해주세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mp-view-329" data-node-id="2275:25976">
                <div className="mp-view-271" data-node-id="2275:25977">
                  <textarea rows={1} aria-label="피부 고민 메모" className="mp-view-330" value={memoDraft} placeholder="ex) 환절기에 피부가 더 예민해져요" onChange={event => { update({ memo: event.target.value }); setMemoDraft(event.target.value) }} style={{ width: '100%', height: '100%', padding: 0, border: 0, margin: 0, background: 'transparent' }} />
                </div>
                <div className="mp-skin-tablet-memo">
                  <textarea aria-label="피부 고민 메모" value={memoDraft} placeholder="ex) 환절기에 피부가 더 예민해져요" onChange={event => setMemoDraft(event.target.value)} />
                  <div><button type="button" onClick={saveProfile}>저장하기</button></div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="mp-screen-action mp-skin-settings-save" onClick={saveProfile} data-node-id="2814:5576">
            <span className="mp-button-label"><span className="mp-button-text">저장</span></span>
          </button>
          </div>
        </div>
  )
}
