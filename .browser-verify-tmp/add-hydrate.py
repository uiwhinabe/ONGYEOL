from pathlib import Path
p=Path('src/components/AIchat/skinGuideData.js')
s=p.read_text(encoding='utf-8')
start=s.index("      {\n        id: 'tremella-ampoule',")
end=s.index("      {\n        id: 'pdrn-rose-cream',",start)
block=s[start:end]
base='\n// Shared ampoule information; concern-specific presentation can override it.\nconst tremellaAmpoule = '+block.strip().removesuffix(',')+'\n\n'
s=s[:start]+'      tremellaAmpoule,\n'+s[end:]
imports="""import deepToner from '../../assets/images/chat/products/tremella-toner.png'
import deepTonerTexture from '../../assets/images/chat/products/tremella-toner-texture.png'
import veilMaskTexture from '../../assets/images/chat/products/tremella-mask-texture.png'
import veilMask from '../../assets/images/chat/products/tremella-mask.png'
"""
s=s.replace('export const skinTypes',imports+base+'export const skinTypes',1)
data="""  dry: {
    products: [
      {
        id: 'tremella-deep-toner',
        name: '백목이 딥 모이스처 토너',
        englishName: 'TREMELLA DEEP MOISTURE TONER',
        description: ['건조한 피부에 수분을 채우는 데일리 토너'],
        href: null,
        contentWidth: 258,
        contentTop: 154,
        englishNoWrap: true,
        imageSize: { width: 151.469, height: 202 },
        imageLayers: [
          { src: deepToner, width: 132.872, height: 177.163, left: 13.95, top: 10.52 },
          { src: deepTonerTexture, width: 151.469, height: 202, left: 0, top: 0 },
        ],
      },
      {
        ...tremellaAmpoule,
        englishName: 'Tremella Intensive Hydrating Ampoule',
        englishNoWrap: true,
      },
      {
        id: 'tremella-veil-mask',
        name: '백목이 수분 베일 마스크팩',
        // Preserve the spelling supplied by this Figma screen.
        englishName: 'TREMELLA HYDRAITON VEIL MASK',
        description: ['건조해진 피부에 수분을 채우는 데일리 마스크팩'],
        href: null,
        contentWidth: 296,
        englishNoWrap: true,
        imageSize: { width: 172, height: 164.72 },
        imageLayers: [
          { src: veilMaskTexture, width: 172, height: 136.508, left: 0, top: 22.52,
            crop: { width: '100%', height: '168%', left: 0, top: '-40.17%' } },
          { src: veilMask, width: 123.54, height: 164.72, left: 32.99, top: 0 },
        ],
      },
    ],
"""
s=s.replace('  dry: {\n',data,1)
p.write_text(s,encoding='utf-8')
