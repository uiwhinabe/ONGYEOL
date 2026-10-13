import vitaminCleanserTexture from '../assets/products/vitamin-c-cleanser-texture.png'
import vitaminTonerTexture from '../assets/products/vitamin-c-toner-texture.png'
import vitaminPadTexture from '../assets/products/vitamin-c-pad-texture.png'
import vitaminAmpouleTexture from '../assets/products/vitamin-c-ampoule-texture.png'
import vitaminEssenceTexture from '../assets/products/vitamin-c-essence-texture.png'
import vitaminLotionTexture from '../assets/products/vitamin-c-lotion-texture.png'
import vitaminCreamTexture from '../assets/products/vitamin-c-cream-texture.png'
import vitaminMaskTexture from '../assets/products/vitamin-c-mask-texture.png'
import odiAmpouleTexture from '../assets/products/odi-ampoule-texture.png'
import odiTonerTexture from '../assets/products/odi-toner-texture.png'
import odiCreamTexture from '../assets/products/odi-cream-texture.png'
import odiMaskTexture from '../assets/products/odi-mask-texture.png'
import odiBalmTexture from '../assets/products/odi-cleansing-balm-texture.png'
import baekmogiAmpouleTexture from '../assets/products/baekmogi-ampoule-texture.png'
import baekmogiPadTexture from '../assets/products/baekmogi-pad-texture.png'
import baekmogiCreamTexture from '../assets/products/baekmogi-cream-texture.png'
import baekmogiLotionTexture from '../assets/products/baekmogi-lotion-texture.png'
import baekmogiTonerTexture from '../assets/products/baekmogi-toner-texture.png'
import baekmogiMaskTexture from '../assets/products/baekmogi-mask-texture.png'
import roseEyecreamTexture from '../assets/products/rose-eyecream-texture.png'
import roseBalancingCreamTexture from '../assets/products/rose-balancing-cream-texture.png'
import bodyScrubTexture from '../assets/products/dakyeolmae-body-scrub-texture.png'
import padTexture from '../assets/products/dakyeolmae-pad-texture.png'
import creamTexture from '../assets/products/dakyeolmae-cream-texture.png'
import ampouleTexture from '../assets/products/dakyeolmae-ampoule-texture.png'
import mistTexture from '../assets/products/dakyeolmae-mist-texture.png'
import tonerTexture from '../assets/products/dakyeolmae-toner-texture.png'
import maskTexture from '../assets/products/dakyeolmae-mask-texture.png'
import bodyScrub from '../assets/products/body-scrub.png'
import pad from '../assets/products/pad.png'
import cream from '../assets/products/cream.png'
import ampoule from '../assets/products/ampoule.png'
import mist from '../assets/products/mist.png'
import toner from '../assets/products/toner.png'
import mask from '../assets/products/mask.png'
import vitaminCleanser from '../assets/products/vitamin-c-cleanser.png'
import vitaminToner from '../assets/products/vitamin-c-toner.png'
import vitaminPad from '../assets/products/vitamin-c-pad.png'
import vitaminAmpoule from '../assets/products/vitamin-c-ampoule.png'
import vitaminEssence from '../assets/products/vitamin-c-essence.png'
import vitaminLotion from '../assets/products/vitamin-c-lotion.png'
import vitaminCream from '../assets/products/vitamin-c-cream.png'
import vitaminMask from '../assets/products/vitamin-c-mask.png'
import odiToner from '../assets/products/odi-toner.png'
import odiCream from '../assets/products/odi-cream.png'
import odiMask from '../assets/products/odi-mask.png'
import odiAmpoule from '../assets/products/odi-ampoule.png'
import odiBalm from '../assets/products/odi-cleansing-balm.png'
import baekmogiAmpoule from '../assets/products/baekmogi-ampoule.png'
import baekmogiPad from '../assets/products/baekmogi-pad.png'
import baekmogiCream from '../assets/products/baekmogi-cream.png'
import baekmogiLotion from '../assets/products/baekmogi-lotion.png'
import baekmogiToner from '../assets/products/baekmogi-toner.png'
import baekmogiMask from '../assets/products/baekmogi-mask.png'
import roseEyecream from '../assets/products/rose-eyecream.png'
import roseBalancingCream from '../assets/products/rose-balancing-cream.png'

// Display values follow the supplied design. Concerns are provisional UI tags,
// pending the team's category mapping; they are not verified efficacy claims.
export const products = [
  { id: 'dakyeolmae-body-scrub', name: '닥열매 퍼퓸 바디 스크럽, 300g', image: bodyScrub, textureImage: bodyScrubTexture,
    price: 32000, badge: 'HOT', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '클렌징', concerns: ['모공/피지'] },
  { id: 'dakyeolmae-pad', name: '닥열매 사각 패드, 70매', image: pad, textureImage: padTexture,
    price: 32000, badge: null, rating: 5, reviewCount: 5, defaultWished: false,
    line: '닥열매', type: '토너/패드', concerns: ['민감/진정', '모공/피지', '피부톤/기미잡티'] },
  { id: 'dakyeolmae-cream', name: '닥열매 크림, 50ml', image: cream, textureImage: creamTexture,
    originalPrice: 36000, price: 28800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '로션/크림', concerns: ['수분/보습', '피부톤/기미잡티'] },
  { id: 'dakyeolmae-ampoule', name: '닥열매 리페어 앰플, 30ml', image: ampoule, textureImage: ampouleTexture,
    originalPrice: 36000, price: 28800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '에센스/앰플', concerns: ['민감/진정', '수분/보습'] },
  { id: 'dakyeolmae-mist', name: '닥열매 콜라겐 세럼 미스트, 100ml', image: mist, textureImage: mistTexture,
    price: 34000, badge: 'BEST', rating: 5, reviewCount: 4, defaultWished: true,
    line: '닥열매', type: '에센스/앰플', concerns: ['수분/보습', '주름/탄력'] },
  { id: 'dakyeolmae-toner', name: '닥열매 워터 토너, 200ml', image: toner, textureImage: tonerTexture,
    originalPrice: 28000, price: 22400, discountPercent: 20, badge: null, rating: 5, reviewCount: 3, defaultWished: false,
    line: '닥열매', type: '토너/패드', concerns: ['수분/보습', '모공/피지', '피부톤/기미잡티'] },
  { id: 'dakyeolmae-mask', name: '닥열매 콜라겐 마스크팩, 8+1매', image: mask, textureImage: maskTexture,
    price: 34000, badge: 'LIMITED', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '마스크팩', concerns: ['민감/진정', '수분/보습', '주름/탄력'] },
  // Vitamin C display order and review values follow the supplied screenshot.
  // Concern tags follow the team's Vitamin C category mapping.
  { id: 'vitamin-c-cleanser', name: '비타민 C 클렌징폼, 150mL', image: vitaminCleanser, textureImage: vitaminCleanserTexture,
    originalPrice: 18000, price: 18000, badge: 'NEW', rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '클렌징', concerns: ['모공/피지', '피부톤/기미잡티'] },
  { id: 'vitamin-c-toner', name: '비타민 C 토너, 250mL', image: vitaminToner, textureImage: vitaminTonerTexture,
    originalPrice: 24000, price: 24000, badge: null, rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '토너/패드', concerns: ['수분/보습', '피부톤/기미잡티'] },
  { id: 'vitamin-c-pad', name: '비타민 C 토너 패드, 70매', image: vitaminPad, textureImage: vitaminPadTexture,
    originalPrice: 26000, price: 20800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '토너/패드', concerns: ['피부톤/기미잡티', '모공/피지'] },
  { id: 'vitamin-c-ampoule', name: '비타민 C 앰플, 30mL', image: vitaminAmpoule, textureImage: vitaminAmpouleTexture,
    originalPrice: 32000, price: 32000, badge: 'HOT', rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '에센스/앰플', concerns: ['피부톤/기미잡티', '주름/탄력'] },
  { id: 'vitamin-c-essence', name: '비타민 C 에센스, 50mL', image: vitaminEssence, textureImage: vitaminEssenceTexture,
    originalPrice: 30000, price: 30000, badge: 'LIMITED', rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '에센스/앰플', concerns: ['피부톤/기미잡티', '수분/보습'] },
  { id: 'vitamin-c-lotion', name: '비타민 C 로션, 150mL', image: vitaminLotion, textureImage: vitaminLotionTexture,
    originalPrice: 28000, price: 28000, badge: null, rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '로션/크림', concerns: ['수분/보습', '피부톤/기미잡티'] },
  { id: 'vitamin-c-cream', name: '비타민 C 수분크림, 50mL', image: vitaminCream, textureImage: vitaminCreamTexture,
    originalPrice: 30000, price: 24000, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '로션/크림', concerns: ['수분/보습', '피부톤/기미잡티'] },
  { id: 'vitamin-c-mask', name: '비타민 C 마스크팩, 1매', image: vitaminMask, textureImage: vitaminMaskTexture,
    originalPrice: 3000, price: 3000, badge: null, rating: 5, reviewCount: 5, defaultWished: false,
    line: '비타민C', type: '마스크팩', concerns: ['피부톤/기미잡티', '수분/보습'] },
  // Team source files are unavailable; values and order follow the supplied
  // finished-page screenshot. Five stars and empty initial hearts are requested.
  // The existing mulberry line menu is labeled 뽕나무. Concerns use the team's mapping.
  { id: 'odi-toner', name: '오디 수분 토너, 200ml', image: odiToner, textureImage: odiTonerTexture,
    price: 24000, badge: null, rating: 5, reviewCount: 5, defaultWished: false,
    line: '뽕나무', type: '토너/패드', concerns: ['수분/보습', '민감/진정'] },
  { id: 'odi-cream', name: '오디 보습 크림, 50g', image: odiCream, textureImage: odiCreamTexture,
    originalPrice: 30000, price: 24000, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: false,
    line: '뽕나무', type: '로션/크림', concerns: ['수분/보습', '민감/진정'] },
  { id: 'odi-mask', name: '오디 진정 마스크팩 5+1, 25ml', image: odiMask, textureImage: odiMaskTexture,
    price: 22000, badge: 'HOT', rating: 5, reviewCount: 5, defaultWished: false,
    line: '뽕나무', type: '마스크팩', concerns: ['민감/진정', '수분/보습'] },
  { id: 'odi-ampoule', name: '오디 토탈 앰플, 50ml', image: odiAmpoule, textureImage: odiAmpouleTexture,
    originalPrice: 32000, price: 25600, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: false,
    line: '뽕나무', type: '에센스/앰플', concerns: ['수분/보습', '피부톤/기미잡티'] },
  { id: 'odi-cleansing-balm', name: '오디 클렌징밤, 100g', image: odiBalm, textureImage: odiBalmTexture,
    originalPrice: 26000, price: 22100, discountPercent: 15, badge: 'BEST', rating: 5, reviewCount: 5, defaultWished: false,
    line: '뽕나무', type: '클렌징', concerns: ['모공/피지', '민감/진정'] },
  // Order, images and review counts follow the supplied team screenshot.
  // Prices, badges, five-star ratings and empty initial hearts follow the brief.
  { id: 'baekmogi-ampoule', name: '백목이 수분 농축 앰플, 50ml', image: baekmogiAmpoule, textureImage: baekmogiAmpouleTexture,
    originalPrice: 29000, price: 29000, badge: 'NEW', rating: 5, reviewCount: 5, defaultWished: false,
    line: '백목이', type: '에센스/앰플', concerns: ['수분/보습', '주름/탄력'] },
  { id: 'baekmogi-pad', name: '백목이 커스텀 핏 패드, 100매', image: baekmogiPad, textureImage: baekmogiPadTexture,
    originalPrice: 28000, price: 28000, badge: 'LIMITED', rating: 5, reviewCount: 5, defaultWished: false,
    line: '백목이', type: '토너/패드', concerns: ['수분/보습', '민감/진정'] },
  { id: 'baekmogi-cream', name: '백목이 수분 잠금 크림, 50ml', image: baekmogiCream, textureImage: baekmogiCreamTexture,
    originalPrice: 32000, price: 32000, badge: 'BEST', rating: 5, reviewCount: 5, defaultWished: false,
    line: '백목이', type: '로션/크림', concerns: ['수분/보습', '민감/진정'] },
  { id: 'baekmogi-lotion', name: '백목이 딥 모이스처 로션, 150ml', image: baekmogiLotion, textureImage: baekmogiLotionTexture,
    originalPrice: 26000, price: 20800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: false,
    line: '백목이', type: '로션/크림', concerns: ['수분/보습', '민감/진정'] },
  { id: 'baekmogi-toner', name: '백목이 딥 모이스처 토너, 250ml', image: baekmogiToner, textureImage: baekmogiTonerTexture,
    originalPrice: 26000, price: 20800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: false,
    line: '백목이', type: '토너/패드', concerns: ['수분/보습', '민감/진정'] },
  { id: 'baekmogi-mask', name: '백목이 수분 베일 마스크, 1매', image: baekmogiMask, textureImage: baekmogiMaskTexture,
    originalPrice: 3000, price: 3000, badge: null, rating: 5, reviewCount: 5, defaultWished: false,
    line: '백목이', type: '마스크팩', concerns: ['수분/보습', '주름/탄력'] },
  { id: 'rose-pdrn-eyecream', name: 'PDRN 리페어 로즈 아이크림, 30ml',
    englishName: 'PDRN REPAIR ROSE EYECREAM', image: roseEyecream, textureImage: roseEyecreamTexture,
    originalPrice: 32000, price: 25600, discountPercent: 20, badge: 'SALE',
    rating: 5, reviewCount: 5, defaultWished: false,
    line: '장미', type: '로션/크림', concerns: ['주름/탄력', '민감/진정'] },
  { id: 'rose-pdrn-balancing-cream', name: 'PDRN 로즈 밸런싱 크림, 50ml',
    englishName: 'PDRN ROSE BALANCING CREAM', image: roseBalancingCream, textureImage: roseBalancingCreamTexture,
    originalPrice: 36000, price: 28800, discountPercent: 20, badge: 'SALE',
    rating: 5, reviewCount: 5, defaultWished: false,
    line: '장미', type: '로션/크림', concerns: ['수분/보습', '민감/진정', '주름/탄력'] },
]
