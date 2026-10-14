import sensitiveImage from '../assets/images/home/Ellipse 10.png'
import moistureImage from '../assets/images/home/Ellipse 11.png'
import poreImage from '../assets/images/home/Ellipse 12.png'
import toneImage from '../assets/images/home/Ellipse 13.png'
import elasticityImage from '../assets/images/home/Ellipse 14.png'
import roseImage from '../assets/images/skin-guide/장미.png'
import pdrnImage from '../assets/images/skin-guide/PDRN.png'
import tremellaImage from '../assets/images/skin-guide/백목이.png'
import mulberryImage from '../assets/images/skin-guide/오디.png'
import paperMulberryImage from '../assets/images/skin-guide/닥열매.png'
import vitaminCImage from '../assets/images/skin-guide/비타민C.png'
import panthenolImage from '../assets/images/skin-guide/판테놀.png'
import hyaluronicImage from '../assets/images/skin-guide/히알루론산.png'
import ceramideImage from '../assets/images/skin-guide/세라마이드.png'
import adenosineImage from '../assets/images/skin-guide/아데노신.png'
import niacinamideImage from '../assets/images/skin-guide/나이아신아마이드.png'
import mulberryTonerImage from '../assets/images/skin-guide/추천제품/오디 수분 토너.png'
import tremellaLotionImage from '../assets/images/skin-guide/추천제품/백목이 딥 모이스처 로션.png'
import creamImage from '../assets/images/skin-guide/추천제품/백목이 수분 잠금 크림.png'
import tremellaTonerImage from '../assets/images/skin-guide/추천제품/백목이 딥 모이스처 토너.png'
import tremellaAmpouleImage from '../assets/images/skin-guide/추천제품/백목이 수분 농축 앰플.png'
import tremellaMaskImage from '../assets/images/skin-guide/추천제품/백목이 수분 베일 마스크팩.png'
import roseCreamImage from '../assets/images/skin-guide/추천제품/PDRN 로즈 밸런싱 크림.png'
import eyecreamImage from '../assets/images/skin-guide/추천제품/PDRN 리페어 로즈 아이크림.png'
import vitaminCleanserImage from '../assets/images/skin-guide/추천제품/비타민C 클렌징폼.png'
import paperMulberryTonerImage from '../assets/images/skin-guide/추천제품/닥열매 프라이트닝 워터 토너.png'
import paperMulberryPadImage from '../assets/images/skin-guide/추천제품/닥열매 브라이트닝 토너 패드.png'
import vitaminTonerImage from '../assets/images/skin-guide/추천제품/비타민C 브라이트닝 토너.png'
import vitaminAmpouleImage from '../assets/images/skin-guide/추천제품/비타민C 브라이트닝 앰플.png'
import vitaminLotionImage from '../assets/images/skin-guide/추천제품/비타민C 브라이트닝 로션.png'

// Names, order and image sources match HOME. HOME itself is unchanged.
export const skinConcerns = [
  { id: 'sensitive', label: '민감 / 진정', image: sensitiveImage, description: '외부 자극에 쉽게\n반응하는 피부' },
  { id: 'moisture', label: '수분 / 보습', image: moistureImage, description: '건조하고 수분이\n부족한 피부' },
  { id: 'pore', label: '모공 / 피지', image: poreImage, description: '번들거림과 모공이\n고민인 피부' },
  { id: 'tone', label: '피부톤 / 기미·잡티', image: toneImage, description: '맑고 균일한\n피부톤을 위한 케어' },
  { id: 'elasticity', label: '주름 / 탄력', image: elasticityImage, description: '탄탄하고 생기 있는\n피부를 위한 케어' },
]

// Only existing ingredient photos are used. Replace a null image here when
// the corresponding approved ingredient asset is supplied (not product art).
const ingredientImages = {
  tremella: tremellaImage,
  rose: roseImage,
  pdrn: pdrnImage,
  mulberry: mulberryImage,
  paperMulberry: paperMulberryImage,
  vitaminC: vitaminCImage,
  panthenol: panthenolImage,
  hyaluronicAcid: hyaluronicImage,
  ceramide: ceramideImage,
  niacinamide: niacinamideImage,
  adenosine: adenosineImage,
}

// Product mappings remain pending until supplied by the team.
// Keep three layout slots; null values must be replaced with approved data,
// never inferred from an image filename or another concern's recommendations.
const pendingRecommendations = () => ({
  ingredientsStatus: 'pending',
  productsStatus: 'pending',
  ingredients: Array.from({ length: 3 }, (_, i) => ({ id: `pending-${i}`, name: null, effect: null, image: null })),
  products: ['pad', 'cream', 'eyecream'].map((id, i) => ({ id, step: `STEP ${String(i + 1).padStart(2, '0')}`, name: null, englishName: null, description: null, image: null, imageAlt: null })),
})
const guide = (item, copy) => ({
  ...pendingRecommendations(),
  concern: item,
  concernName: item.label,
  intro: '현재 피부 고민을 바탕으로\n온결이 필요한 케어를 제안합니다.',
  solutionIntro: `${item.label} 고민을 위한\n온결의 맞춤 케어를 만나보세요.`,
  routineDescription: `${item.label} 고민을 위한 온결의 추천 케어 루틴`,
  mySkinDescription: copy.whyDescription,
  whyDescriptionTablet: copy.whyDescription,
  ...copy,
})
const reasons = entries => entries.map(([title, icon, description], i) => ({ id: `reason-${i}`, title, icon, description }))
const productDescriptionLines = {
  'mulberry-toner': ['맑고 가벼운 수분을 채워', '피부결을 촉촉하고 매끄럽게 정돈하는 데일리 토너'],
  'tremella-ampoule': ['푸석해진 피부를 빠르게 잡아주는', '데일리 앰플'],
  'rose-cream': ['건조하고 거칠어진 피부에', '촉촉한 편안함을 전하는 크림'],
  eyecream: ['건조하고 거칠어진 눈가에', '촉촉한 편안함을 전하는 아이크림'],
  cream: ['건조한 피부에 촉촉한 수분을 머금는', '수분크림'],
  'vitamin-cleanser': ['부드러운 거품으로 노폐물을 씻어내', '맑고 산뜻한 피부로 가꿔주는 클렌징 폼'],
  'paper-mulberry-toner': ['맑은 수분을 채워 피부결을', '촉촉하고 투명하게 정돈하는 워터 토너'],
  'tremella-lotion': ['건조한 피부에 수분을 채우는', '데일리 로션'],
  'tremella-mask': ['건조해진 피부에 수분을 채우는', '데일리 마스크팩'],
  'paper-mulberry-pad': ['맑은 피부결, 촉촉한 수분과', '부드러운 결 케어'],
  'tremella-toner': ['건조한 피부에 수분을 채우는', '데일리 토너'],
  'vitamin-toner': ['맑고 생기 있는 피부를 위한 비타민 C', '브라이트닝 토너'],
  'vitamin-ampoule': ['비타민 C 성분을 집중적으로 전달해', '맑고 생기 있는 피부로 가꿔주는 앰플'],
  'vitamin-lotion': ['산뜻한 보습막으로 수분을 채워', '촉촉하고 윤기 있는 피부로 가꿔주는 로션'],
}
const product = (id, step, name, image, englishName = '', description = '') => ({
  id, step, name, image, imageAlt: name, englishName, description,
  descriptionLines: productDescriptionLines[id],
})

export const concernData = {
  sensitive: guide(skinConcerns[0], {
    productsStatus: 'ready',
    products: [
      product('mulberry-toner', 'STEP 01', '오디 수분 토너', mulberryTonerImage, 'Mulberry Hydrating Toner', '맑고 가벼운 수분을 채워 피부결을 촉촉하고 매끄럽게 정돈하는 데일리 토너'),
      product('tremella-lotion', 'STEP 02', '백목이 딥 모이스처 로션', tremellaLotionImage, 'Tremella Deep Moisture Lotion', '건조한 피부에 수분을 채우는 데일리 로션'),
      product('cream', 'STEP 03', '백목이 수분 잠금 크림', creamImage, 'Tremella Moisture Holding Cream', '건조한 피부에 촉촉한 수분을 머금는 수분크림'),
    ],
    concernTitle: '외부 자극에 쉽게 반응하는 피부를 위한',
    solutionEnglish: 'ONGYEOL SOOTHING SOLUTION',
    whyTitle: '내 피부는 왜 쉽게 민감해질까요?',
    whyDescription: '민감한 피부는 외부 환경 변화나 피부 장벽 컨디션에 따라\n자극을 쉽게 느낄 수 있습니다.\n수분이 부족하거나 피부가 건조해지면 작은 자극에도\n예민하게 반응할 수 있어 편안한 진정과 보습 관리가 중요합니다.',
    reasons: reasons([
      ['#외부 자극', 'shield', '외부 환경의 변화로\n피부가 자극을 쉽게\n느낄 수 있습니다.'],
      ['#피부 장벽 약화', 'barrier', '피부 장벽 컨디션에 따라\n작은 자극에도 예민하게\n반응할 수 있습니다.'],
      ['#수분 부족', 'droplet', '수분이 부족하고 건조하면\n피부가 쉽게 예민해져\n보습 관리가 필요합니다.'],
    ]),
    ingredientsStatus: 'ready',
    ingredients: [
      { name: '백목이', effect: '보습 유지', image: ingredientImages.tremella },
      { name: '판테놀', effect: '진정 케어', image: ingredientImages.panthenol },
      { name: '오디', effect: '피부 컨디셔닝', image: ingredientImages.mulberry },
    ],
  }),
  moisture: guide(skinConcerns[1], {
    concernTitle: '건조하고 수분이 부족한 피부를 위한',
    solutionEnglish: 'ONGYEOL MOISTURE SOLUTION',
    whyTitle: '내 피부는 왜 쉽게 건조해질까요?',
    whyDescription: '피부 타입과 생활 환경에 따라\n건조함을 느끼는 이유는 달라질 수 있어요.\n선택한 고민과 관련된 요인을 살펴보세요.',
    whyDescriptionTablet: '건성 피부는 피지 분비가 적어 피부의 수분을 유지하는 힘이 부족할 수 있습니다.\n여기에 건조한 환경이나 잦은 세안 등으로 피부 장벽이 약해지면 수분이 쉽게 빠져나가 당김과 거칠음이 느껴질 수 있습니다.',
    solutionIntro: '건조함과 당김이 느껴지는 피부를 위해\n온결이 제안하는 케어 루틴을 만나보세요.',
    mySkinDescription: '수분이 쉽게 부족해지고 당김이 느껴지는 피부로,\n피부에 수분을 채우고 촉촉함을 오래 유지하는 케어가 필요합니다.',
    routineDescription: '수분을 채우고, 피부 본연의 건강한 빛을 되찾는 온결의 3단계 케어 루틴',
    reasons: [
      { id: 'water', icon: 'water-waves', title: '#수분 손실', description: '피부의 수분이 쉽게 증발하여\n피부가 건조하고 당김이\n느껴질 수 있습니다.' },
      { id: 'barrier', icon: 'barrier', title: '#피부 장벽 약화', description: '피부 장벽이 약해지면 수분이\n쉽게 빠져나가 외부 자극에\n더 민감해질 수 있습니다.' },
      { id: 'environment', icon: 'sun', title: '#건조한 외부 환경', description: '차가운 바람, 실내 냉난방, 낮은\n습도 등의 환경은 피부를 더욱\n건조하게 만들 수 있습니다.' },
    ],
    ingredientsStatus: 'ready',
    ingredients: [
      { name: '백목이', effect: '수분 유지', image: ingredientImages.tremella },
      { name: '히알루론산', effect: '수분 충전', image: ingredientImages.hyaluronicAcid },
      { name: '세라마이드', effect: '보습 장벽', image: ingredientImages.ceramide },
    ],
    productsStatus: 'ready',
    products: [
      product('tremella-toner', 'STEP 01', '백목이 딥 모이스처 토너', tremellaTonerImage, 'Tremella Deep Moisture Toner', '건조한 피부에 수분을 채우는 데일리 토너'),
      product('tremella-ampoule', 'STEP 02', '백목이 수분 농축 앰플', tremellaAmpouleImage, 'Tremella Intensive Hydrating Ampoule', '푸석해진 피부를 빠르게 잡아주는 데일리 앰플'),
      product('tremella-mask', 'STEP 03', '백목이 수분 베일 마스크', tremellaMaskImage, 'Tremella Hydration Veil Mask', '건조해진 피부에 수분을 채우는 데일리 마스크팩'),
    ],
  }),
  pore: guide(skinConcerns[2], {
    productsStatus: 'ready',
    products: [
      product('vitamin-cleanser', 'STEP 01', '비타민 C 클렌징폼', vitaminCleanserImage, 'Vitamin C Brightening Cleansing Foam', '부드러운 거품으로 노폐물을 씻어내 맑고 산뜻한 피부로 가꿔주는 클렌징 폼'),
      product('paper-mulberry-toner', 'STEP 02', '닥열매 워터 토너', paperMulberryTonerImage, 'Dakyeolmae Brightening Water Toner', '맑은 수분을 채워 피부결을 촉촉하고 투명하게 정돈하는 워터 토너'),
      product('paper-mulberry-pad', 'STEP 03', '닥열매 사각 패드', paperMulberryPadImage, 'Paper Mulberry Brightening Toner Pad', '맑은 피부결, 촉촉한 수분과 부드러운 결 케어'),
    ],
    concernTitle: '번들거림과 모공이 고민인 피부를 위한',
    solutionEnglish: 'ONGYEOL PORE BALANCE SOLUTION',
    whyTitle: '내 피부는 왜 피지가 많고 모공이 신경 쓰일까요?',
    whyDescription: '피지 분비가 활발하면 피부 표면에 유분과 노폐물이\n쉽게 쌓일 수 있습니다.\n과도한 피지와 유수분 균형의 변화는\n번들거림을 증가시키고 모공이 더욱 도드라져 보이게 할 수 있어\n깨끗하고 균형 있는 관리가 필요합니다.',
    reasons: reasons([
      ['#과도한 피지', 'droplet', '피지 분비가 활발하면\n피부 표면이 쉽게\n번들거릴 수 있습니다.'],
      ['#모공 노폐물', 'particles', '유분과 노폐물이 쌓이면\n모공이 더욱 도드라져\n보일 수 있습니다.'],
      ['#유수분 불균형', 'balance', '유수분 균형의 변화로\n번들거림이 증가해\n균형 있는 관리가 필요합니다.'],
    ]),
    ingredientsStatus: 'ready',
    ingredients: [
      { name: '닥열매', effect: '피부결 정돈', image: ingredientImages.paperMulberry },
      { name: '나이아신아마이드', effect: '피지 케어', image: ingredientImages.niacinamide },
      { name: '비타민 C', effect: '맑은 피부', image: ingredientImages.vitaminC },
    ],
  }),
  tone: guide(skinConcerns[3], {
    productsStatus: 'ready',
    products: [
      product('vitamin-toner', 'STEP 01', '비타민 C 토너', vitaminTonerImage, 'Vitamin C Brightening Toner', '맑고 생기 있는 피부를 위한 비타민 C 브라이트닝 토너'),
      product('vitamin-ampoule', 'STEP 02', '비타민 C 앰플', vitaminAmpouleImage, 'Vitamin C Brightening Ampoule', '비타민 C 성분을 집중적으로 전달해 맑고 생기 있는 피부로 가꿔주는 앰플'),
      product('vitamin-lotion', 'STEP 03', '비타민 C 로션', vitaminLotionImage, 'Vitamin C Brightening Lotion', '산뜻한 보습막으로 수분을 채워 촉촉하고 윤기 있는 피부로 가꿔주는 로션'),
    ],
    concernTitle: '맑고 균일한 피부톤을 위한',
    solutionEnglish: 'ONGYEOL BRIGHTENING SOLUTION',
    whyTitle: '내 피부톤은 왜 쉽게 칙칙해질까요?',
    whyDescription: '자외선 노출과 피부 컨디션의 변화는\n피부톤을 칙칙하고 고르지 않게 보이게 할 수 있습니다.\n피부 턴오버가 원활하지 않거나 색소가 피부에 남으면\n기미와 잡티가 더욱 신경 쓰일 수 있어\n꾸준한 톤 케어가 필요합니다.',
    reasons: reasons([
      ['#자외선 노출', 'sun', '자외선 노출은 피부톤을\n고르지 않게 보이게\n할 수 있습니다.'],
      ['#칙칙한 피부톤', 'sparkles', '피부 컨디션이 변화하면\n피부톤이 칙칙하게\n보일 수 있습니다.'],
      ['#기미·잡티', 'spots', '색소가 피부에 남으면\n기미와 잡티가 더욱\n신경 쓰일 수 있습니다.'],
    ]),
    ingredientsStatus: 'ready',
    ingredients: [
      { name: '비타민 C', effect: '브라이트닝', image: ingredientImages.vitaminC },
      { name: '오디', effect: '피부톤 케어', image: ingredientImages.mulberry },
      { name: '나이아신아마이드', effect: '톤 정돈', image: ingredientImages.niacinamide },
    ],
  }),
  elasticity: guide(skinConcerns[4], {
    productsStatus: 'ready',
    products: [
      product('tremella-ampoule', 'STEP 01', '백목이 수분 농축 앰플', tremellaAmpouleImage, 'Tremella Intensive Hydrating Ampoule', '푸석해진 피부를 빠르게 잡아주는 데일리 앰플'),
      product('rose-cream', 'STEP 02', 'PDRN 로즈 밸런싱 크림', roseCreamImage, 'PDRN Rose Balancing Cream', '건조하고 거칠어진 피부에 촉촉한 편안함을 전하는 크림'),
      product('eyecream', 'STEP 03', 'PDRN 리페어 로즈 아이크림', eyecreamImage, 'PDRN Repair Rose Eye Cream', '건조하고 거칠어진 눈가에 촉촉한 편안함을 전하는 아이크림'),
    ],
    concernTitle: '탄탄하고 생기 있는 피부를 위한',
    solutionEnglish: 'ONGYEOL FIRMING SOLUTION',
    whyTitle: '내 피부는 왜 탄력이 떨어져 보일까요?',
    whyDescription: '피부의 수분과 탄력이 부족해지면\n피부가 쉽게 건조해지고 잔주름이 도드라져 보일 수 있습니다.\n시간의 흐름과 외부 환경으로 피부 컨디션이 저하되면\n탄력이 떨어져 보일 수 있어\n보습과 탄력 케어를 함께 관리하는 것이 중요합니다.',
    reasons: reasons([
      ['#탄력 저하', 'elasticity', '피부 컨디션이 저하되면\n탄력이 떨어져\n보일 수 있습니다.'],
      ['#수분 부족', 'droplet', '피부의 수분이 부족하면\n쉽게 건조해져\n보습 케어가 필요합니다.'],
      ['#주름 고민', 'wrinkles', '수분과 탄력이 부족하면\n잔주름이 더욱 도드라져\n보일 수 있습니다.'],
    ]),
    ingredientsStatus: 'ready',
    ingredients: [
      { name: 'PDRN', effect: '피부 컨디셔닝', image: ingredientImages.pdrn },
      { name: '장미', effect: '보습·윤기', image: ingredientImages.rose },
      { name: '아데노신', effect: '탄력 케어', image: ingredientImages.adenosine },
    ],
  }),
}
