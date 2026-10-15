import { getIngredients } from './skinProfileData.js'
import useSkinProfile from './useSkinProfile.js'
import tabletMore from './tablet-skin-more.svg'
import './MypageSkinTablet.css'
import './MypageSkinMobile.css'

// Reuse only descriptions present in the Figma concern cards.
const concernDescriptions = {
  '민감 · 진정': '쉽게 자극받는 피부를 편안하게 진정해요.',
  '모공·피지': '번들거림과 과도한 피지를 산뜻하게 관리해요.',
}

// Figma frame 2275:25590; content node 2275:25642.
export default function MypageSkin() {
  const { profile } = useSkinProfile()
  const ingredients = getIngredients(profile.concerns)
  const hasOriginalConcerns = profile.concerns.length === 2 && profile.concerns.includes('민감 · 진정') && profile.concerns.includes('모공·피지')
  const isOriginalProfile = profile.skinType === '민감성' && hasOriginalConcerns

  return (
    <div className="mp-view-218 mp-skin-summary" data-node-id="2275:25642" data-name="스킨가이드(상단바제외) F" data-skin-type={profile.skinType}>
          <div className="mp-view-219" data-node-id="2275:25643">
            <div className="mp-view-220" data-node-id="2275:25644">
              <div className="mp-view-221" data-node-id="2275:25645" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                <p className="mp-view-222">
                  <span className="mp-view-223" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    이다빈님
                  </span>
                  <span className="mp-view-4">{` `}</span>
                </p>
                <p className="mp-view-224">
                  <span className="mp-view-225">{`내 `}</span>
                  <span className="mp-view-226" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    피부 고민
                  </span>
                  <span className="mp-view-225">{`과 `}</span>
                  <span className="mp-view-226" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    맞춤 성분
                  </span>
                  <span className="mp-view-225">을 확인해보세요.</span>
                </p>
              </div>
              <a href="/mypage/skin/settings" className="mp-screen-action mp-view-227" data-node-id="2275:25646">
                <p className="mp-view-25" data-node-id="2275:25647" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  다시 설정
                </p>
              </a>
              <button
                type="button"
                className="mp-skin-tablet-more"
                aria-label="피부 정보 다시 설정"
                onClick={() => {
                  window.history.pushState(null, '', '/mypage/skin/settings')
                  window.dispatchEvent(new PopStateEvent('popstate'))
                }}
              ><img src={tabletMore} alt="" /></button>
            </div>
          </div>
          <div className="mp-view-228" data-node-id="2275:25648">
            <div className="mp-view-229" data-node-id="2275:25649" data-name="피부타입">
              <div className="mp-view-230" data-node-id="2275:25650">
                <p className="mp-view-231" data-node-id="2275:25651" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  MY SKIN PROFILE
                </p>
              </div>
              <div className="mp-view-232" data-node-id="2275:25652">
                <p className="mp-view-233" data-node-id="2275:25653" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  {isOriginalProfile ? '\uBBFC\uAC10 \u00B7 \uC9C4\uC815 \u00B7 \uD53C\uC9C0' : [profile.skinType, ...profile.concerns].join(' \u00B7 ')}
                </p>
              </div>
              <div className="mp-view-234" data-node-id="2275:25654">
                <p className="mp-view-231" data-node-id="2275:25655" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                  현재 선택한 피부 고민을 기준으로 맞춤 케어를 추천합니다.
                </p>
              </div>
            </div>
            <div className="mp-view-235" data-node-id="2275:25656">
              <div className="mp-view-118" data-node-id="2275:25657">
                <div className="mp-view-236" data-node-id="2275:25658" data-name="나의피부고민F">
                  <p className="mp-view-237" data-node-id="2275:25659" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                    나의 피부 고민
                  </p>
                </div>
                {hasOriginalConcerns ? (
                <div className="mp-view-238" data-node-id="2275:25660">
                  <div className="mp-view-239" style={{ height: 96 }} data-node-id="2275:25661" data-name="피지">
                    <div className="mp-view-240" data-node-id="2275:25662">
                      <div className="mp-view-34" data-node-id="2275:25663">
                        <p className="mp-view-241" data-node-id="2275:25664" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                          피지
                        </p>
                      </div>
                      <div className="mp-view-34" data-node-id="2275:25665">
                        <p className="mp-view-52" data-node-id="2275:25666" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                          번들거림과 과도한 피지를 산뜻하게 관리해요.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mp-view-242" style={{ height: 96 }} data-node-id="2275:25667" data-name="피지">
                    <div className="mp-view-240" data-node-id="2275:25668">
                      <div className="mp-view-34" data-node-id="2275:25669">
                        <p className="mp-view-243" data-node-id="2275:25670" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                          민감 · 진정
                        </p>
                      </div>
                      <div className="mp-view-34" data-node-id="2275:25671">
                        <p className="mp-view-52" data-node-id="2275:25672" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
                          쉽게 자극받는 피부를 편안하게 진정해요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                <div className="mp-view-238" style={{ height: 'auto', minHeight: 96, flexWrap: 'wrap', gap: 20 }}>
                  {profile.concerns.map(concern => (
                    <div className="mp-view-242" style={{ height: 96 }} key={concern}>
                      <div className="mp-view-240">
                        <div className="mp-view-34"><p className="mp-view-243">{concern}</p></div>
                        <div className="mp-view-34">
                          <p className="mp-view-52" aria-hidden={!concernDescriptions[concern]}>{concernDescriptions[concern] || '\u00a0'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
              <div className="mp-view-118" data-node-id="2275:25673" data-name="추천성분 전체 F">
                <div className="mp-view-244" data-node-id="2275:25674" data-name="추천성분 T">
                  <p className="mp-view-237" data-node-id="2275:25675" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>{`추천 성분 `}</p>
                </div>
                <div className="mp-view-245" data-node-id="2275:25676" style={{ flexWrap: 'wrap', alignItems: 'start' }}>
                  {ingredients.map(ingredient => (
                    <div className="mp-view-246" key={ingredient.name} data-ingredient={ingredient.name} style={{ paddingBlock: 5 }}>
                      <div className="mp-view-247" style={{ gap: 4 }}>
                        <p className="mp-view-249" style={{ position: 'relative', lineHeight: '22px' }}>{ingredient.name}</p>
                        <p className="mp-view-182" style={{ position: 'relative', whiteSpace: 'normal', textAlign: 'center', lineHeight: '18px' }}>{ingredient.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
