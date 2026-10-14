import ampouleTexture from '../../assets/images/chat/products/ampoule-texture.png'
import ampoule from '../../assets/images/chat/products/ampoule.png'
import creamTexture from '../../assets/images/chat/products/cream-texture.png'
import cream from '../../assets/images/chat/products/cream.png'
import eyecreamTexture from '../../assets/images/chat/products/eyecream-texture.png'
import eyecream from '../../assets/images/chat/products/eyecream.png'
import tonerTexture from '../../assets/images/chat/products/mulberry-toner-texture.png'
import toner from '../../assets/images/chat/products/mulberry-toner.png'
import lotionTexture from '../../assets/images/chat/products/tremella-lotion-texture.png'
import lotion from '../../assets/images/chat/products/tremella-lotion.png'
import holdingCreamTexture from '../../assets/images/chat/products/tremella-cream-texture.png'
import holdingCream from '../../assets/images/chat/products/tremella-cream.png'

import deepToner from '../../assets/images/chat/products/tremella-toner.png'
import deepTonerTexture from '../../assets/images/chat/products/tremella-toner-texture.png'
import veilMaskTexture from '../../assets/images/chat/products/tremella-mask-texture.png'
import veilMask from '../../assets/images/chat/products/tremella-mask.png'
import cleanserTexture from '../../assets/images/chat/products/vitamin-cleanser-texture.png'
import cleanser from '../../assets/images/chat/products/vitamin-cleanser.png'
import dakTonerTexture from '../../assets/images/chat/products/dakyeolmae-toner-texture.png'
import dakToner from '../../assets/images/chat/products/dakyeolmae-toner.png'
import dakPadTexture from '../../assets/images/chat/products/dakyeolmae-pad-texture.png'
import dakPad from '../../assets/images/chat/products/dakyeolmae-pad.png'
import vitaminTonerTexture from '../../assets/images/chat/products/vitamin-toner-texture.png'
import vitaminToner from '../../assets/images/chat/products/vitamin-toner.png'
import vitaminAmpouleTexture from '../../assets/images/chat/products/vitamin-ampoule-texture.png'
import vitaminAmpoule from '../../assets/images/chat/products/vitamin-ampoule.png'
import vitaminLotionTexture from '../../assets/images/chat/products/vitamin-lotion-texture.png'
import vitaminLotion from '../../assets/images/chat/products/vitamin-lotion.png'

// Shared ampoule information; concern-specific presentation can override it.
const tremellaAmpoule = {
  id: 'tremella-ampoule',
  name: '백목이 수분 농축 앰플, 50ml',
  englishName: 'TREMELLA INTENSIVE HYDRATING AMPOULE',
  description: ['푸석해진 피부를 빠르게 잡아주는 데일리 앰플'],
  href: null,
  contentWidth: 299,
  imageSize: { width: 136.476, height: 182 },
  imageLayers: [
    { src: ampouleTexture, width: 136.476, height: 182, left: 0, top: 0 },
    { src: ampoule, width: 102.57, height: 136.76, left: 17.24, top: 23 },
  ],
}

export const skinTypes = [
  { id: 'oily', label: '저자극·진정' },
  { id: 'dry', label: '수분·보습' },
  { id: 'combination', label: '주름·탄력' },
  { id: 'sensitive', label: '모공·피지' },
  { id: 'normal', label: '피부톤·기미·잡티' },
]

export const skinGuideData = {
  dry: {
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
    title: '수분·보습 고민을 선택하셨네요 💧',
    paragraphs: [
      ['피부가 쉽게 당기거나 각질이 일어나고, 화장이 들뜨는 경우 피부 속 수분이 부족한 상태일 수 있어요.'],
      ['건조한 환경, 잦은 세안, 자외선 등의 영향으로 피부 장벽이 약해지면 수분이 빠르게 증발할 수 있어요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '수분이 부족한 피부에는 수분을 채우고 피부 장벽을 보호해 주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '히알루론산 — 피부에 수분을 공급해요',
        '판테놀 — 피부 장벽을 편안하게 보호해요',
        '세라마이드 — 수분이 빠져나가지 않도록 도와줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  oily: {
    products: [
      {
        id: 'mulberry-toner',
        name: '오디 수분 토너',
        englishName: 'Mulberry Hydrating Toner',
        // The supplied Figma toner screen uses this ampoule description.
        description: ['푸석해진 피부를 빠르게 잡아주는 데일리 앰플'],
        href: null,
        contentWidth: 282,
        imageSize: { width: 129.026, height: 148 },
        imageLayers: [
          { src: tonerTexture, width: 129.026, height: 108.154, left: 0, top: 33.21,
            crop: { width: '110.29%', height: '131.58%', left: '-10.29%', top: '-21.93%' } },
          { src: toner, width: 98.667, height: 148, left: 16, top: 0 },
        ],
      },
      {
        id: 'tremella-lotion',
        name: '백목이 딥 모이스처 로션',
        englishName: 'TREMELLA DEEP MOISTURE LOTION',
        description: ['건조한 피부에 수분을 채우는 데일리 로션'],
        href: null,
        contentWidth: 258,
        contentTop: 154,
        englishNoWrap: true,
        imageSize: { width: 132, height: 181.715 },
        imageLayers: [
          { src: lotionTexture, width: 132, height: 176, left: 0, top: 5.71 },
          { src: lotion, width: 132, height: 176, left: 0, top: 0 },
        ],
      },
      {
        id: 'tremella-holding-cream',
        name: '백목이 수분 잠금 크림',
        englishName: 'TREMELLA MOISTURE HOLDING CREAM',
        description: ['건조한 피부에 촉촉한 수분을 머금는 수분크림'],
        href: null,
        contentWidth: 298,
        englishNoWrap: true,
        imageSize: { width: 142, height: 142 },
        imageLayers: [
          { src: holdingCreamTexture, width: 142, height: 115.595, left: 0, top: 0,
            crop: { width: '137.83%', height: '225.76%', left: '-20.25%', top: '-65.01%' } },
          { src: holdingCream, width: 131.319, height: 109.118, left: 3.5, top: 32.88,
            crop: { width: '100%', height: '120.35%', left: 0, top: '-13.24%' } },
        ],
      },
    ],
    title: '저자극·진정 고민을 선택하셨네요 🍃',
    paragraphs: [
      ['피부가 쉽게 붉어지거나 따갑고, 작은 변화에도 불편함이 느껴진다면 자극을 줄이는 관리가 필요할 수 있어요.'],
      ['강한 세안이나 잦은 각질 관리는 줄이고, 순한 보습 관리로 예민해진 피부를 편안하게 돌봐 주세요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '예민해진 피부에는 진정과 피부 장벽 보호를 도와주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '판테놀 — 피부 보습과 장벽 관리에 도움을 줘요',
        '알란토인 — 피부를 편안하게 진정시키는 데 도움을 줘요',
        '세라마이드 — 수분이 빠져나가지 않도록 도와줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  combination: {
    // Add products only when that concern's design and product list are confirmed.
    // imageLayers preserve the texture/product overlays supplied by Figma.
    // Set href to an implemented React Router product route when available.
    products: [
      { ...tremellaAmpoule, presentation: 'wrinkle-ampoule' },
      {
        id: 'pdrn-rose-cream',
        name: 'PDRN 로즈 밸런싱 크림',
        englishName: 'PDRN ROSE BALANCING CRAEM',
        description: ['건조하고 거칠어진 피부에', '촉촉한 편안함을 전하는 크림'],
        href: null,
        contentWidth: 258,
        imageSize: { width: 161.459, height: 165.54 },
        imageLayers: [
          { src: creamTexture, width: 160.656, height: 160.656, left: 0, top: 0 },
          { src: cream, width: 153.459, height: 165.54, left: 8, top: 0 },
        ],
      },
      {
        id: 'pdrn-rose-eyecream',
        name: 'PDRN 리페어 로즈 아이크림',
        englishName: 'PDRN REPAIR ROSE EYECREAM',
        description: ['건조하고 거칠어진 눈가에', '촉촉한 편안함을 전하는 아이크림'],
        href: null,
        contentWidth: 296,
        imageSize: { width: 128, height: 168 },
        imageLayers: [
          { src: eyecreamTexture, width: 123, height: 165, left: 0, top: 0 },
          { src: eyecream, width: 124, height: 165, left: 4, top: 3 },
        ],
      },
    ],
    title: '주름·탄력 고민을 선택하셨네요 ✨',
    paragraphs: [
      ['잔주름이 눈에 띄거나 피부 탄력이 예전 같지 않다고 느껴진다면, 보습과 탄력 관리가 필요할 수 있어요.'],
      ['건조함과 자외선은 피부 상태에 영향을 줄 수 있어, 충분한 보습과 꾸준한 자외선 차단을 함께해 주세요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '주름과 탄력이 고민인 피부에는 보습과 탄력 관리를 도와주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '아데노신 — 주름 개선에 도움을 줘요',
        '펩타이드 — 피부 탄력 관리에 도움을 줘요',
        '히알루론산 — 피부에 수분을 공급해 촉촉하게 유지해 줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  sensitive: {
    products: [
      {
        id: 'vitamin-c-cleanser',
        name: '비타민 C 브라이트닝 클렌징폼',
        englishName: 'Vitamin C Brightening Cleansing Foam',
        description: ['부드러운 거품으로 노폐물을 씻어내 맑고', '산뜻한 피부로 가꿔주는 클렌징 폼'],
        href: null,
        contentWidth: 258,
        contentTop: 154,
        englishNoWrap: true,
        imageSize: { width: 207.996, height: 175.241 },
        imageLayers: [
          { src: cleanserTexture, width: 207.996, height: 167.052, left: 0, top: 0 },
          { src: cleanser, width: 153.131, height: 175.241, left: 31.94, top: 0, objectFit: 'contain' },
        ],
      },
      {
        id: 'dakyeolmae-water-toner',
        name: '닥열매 브라이트닝 워터 토너',
        englishName: 'Dakyeolmae Brightening Water Toner',
        description: ['맑은 수분을 채워 피부결을 촉촉하고 투명하게', '정돈하는 워터 토너'],
        href: null,
        contentWidth: 296,
        englishNoWrap: true,
        imageSize: { width: 139.125, height: 157 },
        imageLayers: [
          { src: dakTonerTexture, width: 139.125, height: 134.441, left: 0, top: 13.11 },
          { src: dakToner, width: 130, height: 157, left: 4.56, top: 0,
            crop: { width: '99.68%', height: '109.8%', left: '0.09%', top: '-9.55%' } },
        ],
      },
      {
        id: 'dakyeolmae-toner-pad',
        name: '닥열매 브라이트닝 토너 패드',
        englishName: 'Paper Mulberry Brightening Toner Pad',
        description: ['맑은 피부결, 촉촉한 수분과 부드러운 결 케어'],
        href: null,
        contentWidth: 296,
        englishNoWrap: true,
        imageSize: { width: 210, height: 162.904 },
        imageLayers: [
          { src: dakPadTexture, width: 210, height: 162.904, left: 0, top: 0,
            crop: { width: '100%', height: '171.88%', left: 0, top: '-41.63%' } },
          { src: dakPad, width: 168, height: 162.904, left: 20.54, top: 0,
            crop: { width: '100%', height: '137.06%', left: 0, top: '-6.82%' } },
        ],
      },
    ],
    title: '모공·피지 고민을 선택하셨네요 🌿',
    paragraphs: [
      ['피부가 쉽게 번들거리거나 모공이 눈에 띄고, 블랙헤드가 신경 쓰인다면 피지와 피부결 관리가 필요할 수 있어요.'],
      ['피지를 제거하려고 자주 씻거나 강하게 문지르기보다, 부드러운 세안과 가벼운 수분 관리로 피부를 돌봐 주세요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '모공과 피지가 고민인 피부에는 유분과 각질 관리를 도와주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '나이아신아마이드 — 피부 유분 관리에 도움을 줘요',
        'PHA — 피부 표면의 각질을 부드럽게 정돈하는 데 도움을 줘요',
        '히알루론산 — 피부에 수분을 공급해요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  normal: {
    products: [
      {
        id: 'vitamin-c-toner',
        name: '비타민 C 브라이트닝 토너',
        englishName: 'Vitamin C Brightening Toner',
        description: ['맑고 생기 있는 피부를 위한 비타민 C', '브라이트닝 토너'],
        href: null,
        contentWidth: 258,
        contentTop: 154,
        englishNoWrap: true,
        imageSize: { width: 150, height: 164 },
        imageLayers: [
          { src: vitaminTonerTexture, width: 150, height: 150, left: 0, top: 14 },
          { src: vitaminToner, width: 139, height: 164, left: 11, top: 0, objectFit: 'contain' },
        ],
      },
      {
        id: 'vitamin-c-ampoule',
        name: '비타민 C 브라이트닝 앰플',
        englishName: 'Vitamin C Brightening Ampoule',
        description: ['비타민 C 성분을 집중적으로 전달해', '맑고 생기 있는 피부로 가꿔주는 앰플'],
        href: null,
        contentWidth: 265,
        englishNoWrap: true,
        imageSize: { width: 164, height: 164 },
        imageLayers: [
          { src: vitaminAmpouleTexture, width: 150, height: 150, left: 7, top: 14 },
          { src: vitaminAmpoule, width: 164, height: 164, left: 0, top: 0, objectFit: 'contain' },
        ],
      },
      {
        id: 'vitamin-c-lotion',
        name: '비타민 C 브라이트닝 로션',
        englishName: 'Vitamin C Brightening Lotion',
        description: ['산뜻한 보습막으로 수분을 채워', '촉촉하고 윤기 있는 피부로 가꿔주는 로션'],
        href: null,
        contentWidth: 265,
        englishNoWrap: true,
        imageSize: { width: 150, height: 150, overflow: 'hidden' },
        imageLayers: [
          { src: vitaminLotionTexture, width: 150, height: 150, left: 0, top: 0 },
          { src: vitaminLotion, width: 160, height: 160, left: -5, top: -5, objectFit: 'contain' },
        ],
      },
    ],
    title: '피부톤·기미·잡티 고민을 선택하셨네요 ☀️',
    paragraphs: [
      ['피부톤이 칙칙하거나 고르지 않고, 기미와 잡티가 신경 쓰인다면 피부톤을 관리하는 케어가 필요할 수 있어요.'],
      ['자외선은 기미와 잡티를 짙어지게 할 수 있어, 매일 자외선을 차단하고 꾸준한 보습 관리도 함께해 주세요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '피부톤과 잡티가 고민인 피부에는 밝고 균일한 피부톤 관리를 도와주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '나이아신아마이드 — 피부 미백에 도움을 줘요',
        '비타민 C 유도체 — 밝고 균일한 피부톤 관리에 도움을 줘요',
        '히알루론산 — 피부에 수분을 공급해 촉촉하게 유지해 줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },
}
