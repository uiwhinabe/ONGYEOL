from pathlib import Path
p = Path('src/components/AIchat')
renames = {'Inquiry': 'ChatStart', 'ChatSkinGuideIntro': 'SK01', 'ChatSkinGuideSelect': 'SK02', 'ChatSkinGuideTypeDetail': 'SK03TypeText', 'ChatSkinGuideRecommendation': 'SK04TypeDetail'}
for name in ['AIChat.jsx', 'ChatStart.jsx', 'SK01.jsx', 'SK02.jsx', 'SK03TypeText.jsx', 'SK04TypeDetail.jsx']:
    file = p / name
    text = file.read_text(encoding='utf-8')
    for old, new in renames.items():
        text = text.replace(f"'./{old}.jsx'", f"'./{new}.jsx'").replace(f"'./{old}.css'", f"'./{new}.css'")
        text = text.replace(f'function {old}(', f'function {new}(').replace(f'import {old} from', f'import {new} from').replace(f'<{old} ', f'<{new} ')
    if name == 'SK04TypeDetail.jsx':
        text = text.replace('{ data, onBack }', '{ data, onBack, onContinue }')
        text = text.replace('disabled title="제품 확인 화면은 준비 중입니다"', 'disabled={!onContinue} onClick={onContinue} title={!onContinue ? "제품 확인 화면은 준비 중입니다" : undefined}')
    if name == 'AIChat.jsx':
        text = text.replace("import { skinGuideData }", "import SK05Recommend from './SK05Recommend.jsx'\nimport { skinGuideData }")
        text = text.replace("  const openRecommendation =", "  const products = skinGuideData[selectedSkinType]?.products\n  const openProducts = () => {\n    if (products?.length) changeScreen('skin-guide-products')\n  }\n  const openRecommendation =")
        text = text.replace(": '온결 AI 문의하기'}", ": screen === 'skin-guide-products' ? '온결 AI 추천제품' : '온결 AI 문의하기'}")
        text = text.replace("<SK04TypeDetail data={recommendation}", "<SK04TypeDetail data={recommendation} onContinue={products?.length ? openProducts : undefined}")
        text = text.replace("          </>}", "            {screen === 'skin-guide-products' && products?.length > 0 && <SK05Recommend key={selectedSkinType} products={products} onBack={() => changeScreen('skin-guide-recommendation')} />}\n          </>}")
    file.write_text(text, encoding='utf-8')
