import bodyScrub from '../assets/products/body-scrub.png'
import pad from '../assets/products/pad.png'
import cream from '../assets/products/cream.png'
import ampoule from '../assets/products/ampoule.png'
import mist from '../assets/products/mist.png'
import toner from '../assets/products/toner.png'
import mask from '../assets/products/mask.png'

// Display values follow the supplied design. Concerns are provisional UI tags,
// pending the team's category mapping; they are not verified efficacy claims.
export const products = [
  { id: 'dakyeolmae-body-scrub', name: '닥열매 퍼퓸 바디 스크럽, 300g', image: bodyScrub,
    price: 32000, badge: 'HOT', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '클렌징', concerns: ['모공/피지'] },
  { id: 'dakyeolmae-pad', name: '닥열매 사각 패드, 70매', image: pad,
    price: 32000, badge: 'NEW', rating: 5, reviewCount: 5, defaultWished: false,
    line: '닥열매', type: '토너/패드', concerns: ['민감/진정', '모공/피지', '피부톤/기미잡티'] },
  { id: 'dakyeolmae-cream', name: '닥열매 크림, 50ml', image: cream,
    originalPrice: 36000, price: 28800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '로션/크림', concerns: ['수분/보습', '피부톤/기미잡티'] },
  { id: 'dakyeolmae-ampoule', name: '닥열매 리페어 앰플, 30ml', image: ampoule,
    originalPrice: 36000, price: 28800, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '에센스/앰플', concerns: ['민감/진정', '수분/보습'] },
  { id: 'dakyeolmae-mist', name: '닥열매 콜라겐 세럼 미스트, 100ml', image: mist,
    price: 34000, badge: 'BEST', rating: 5, reviewCount: 4, defaultWished: true,
    line: '닥열매', type: '에센스/앰플', concerns: ['수분/보습', '주름/탄력'] },
  { id: 'dakyeolmae-toner', name: '닥열매 워터 토너, 200ml', image: toner,
    originalPrice: 28000, price: 22400, discountPercent: 20, badge: 'SALE', rating: 5, reviewCount: 3, defaultWished: false,
    line: '닥열매', type: '토너/패드', concerns: ['수분/보습', '모공/피지', '피부톤/기미잡티'] },
  { id: 'dakyeolmae-mask', name: '닥열매 콜라겐 마스크팩, 8+1매', image: mask,
    price: 34000, badge: 'BEST', rating: 5, reviewCount: 5, defaultWished: true,
    line: '닥열매', type: '마스크팩', concerns: ['민감/진정', '수분/보습', '주름/탄력'] },
]
