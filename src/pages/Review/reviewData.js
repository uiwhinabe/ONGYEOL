import vitaminMaskReview1 from '../../assets/reviews/vitamin-mask-1.png'
import vitaminMaskReview2 from '../../assets/reviews/vitamin-mask-2.png'
import vitaminMaskReview3 from '../../assets/reviews/vitamin-mask-3.png'
import vitaminMaskReview4 from '../../assets/reviews/vitamin-mask-4.png'
import vitaminMaskReview5 from '../../assets/reviews/vitamin-mask-5.png'
import vitaminMaskReview6 from '../../assets/reviews/vitamin-mask-6.png'
const vitaminMaskReviewPhotos = [vitaminMaskReview1, vitaminMaskReview2, vitaminMaskReview3, vitaminMaskReview4, vitaminMaskReview5, vitaminMaskReview6].map((src, index) => ({ id: `vitamin-mask-photo-${index + 1}`, src, alt: `비타민 C 마스크팩 포토 리뷰 ${index + 1}` }))
import vitaminPadReview1 from '../../assets/reviews/vitamin-pad-1.png'
import vitaminPadReview2 from '../../assets/reviews/vitamin-pad-2.png'
import vitaminPadReview3 from '../../assets/reviews/vitamin-pad-3.png'
import vitaminPadReview4 from '../../assets/reviews/vitamin-pad-4.png'
import vitaminPadReview5 from '../../assets/reviews/vitamin-pad-5.png'
import vitaminPadReview6 from '../../assets/reviews/vitamin-pad-6.png'
const vitaminPadReviewPhotos = [vitaminPadReview1, vitaminPadReview2, vitaminPadReview3, vitaminPadReview4, vitaminPadReview5, vitaminPadReview6].map((src, index) => ({ id: `vitamin-pad-photo-${index + 1}`, src, alt: `비타민 C 토너 패드 포토 리뷰 ${index + 1}` }))
import photo1 from '../../assets/reviews/odi-mask-1.png'
import photo2 from '../../assets/reviews/odi-mask-2.png'
import photo3 from '../../assets/reviews/odi-mask-3.png'
import photo4 from '../../assets/reviews/odi-mask-4.png'
import photo5 from '../../assets/reviews/odi-mask-5.png'
import photo6 from '../../assets/reviews/odi-mask-6.png'
import { products } from '../../data/products.js'
import balmPhoto1 from '../../assets/reviews/odi-balm-1.png'
import balmPhoto2 from '../../assets/reviews/odi-balm-2.png'
import balmPhoto3 from '../../assets/reviews/odi-balm-3.png'
import balmPhoto4 from '../../assets/reviews/odi-balm-4.png'
import balmPhoto5 from '../../assets/reviews/odi-balm-5.png'
import balmPhoto6 from '../../assets/reviews/odi-balm-6.png'
import tonerPhoto1 from '../../assets/reviews/odi-toner-1.png'
import tonerPhoto2 from '../../assets/reviews/odi-toner-2.png'
import tonerPhoto3 from '../../assets/reviews/odi-toner-3.png'
import tonerPhoto4 from '../../assets/reviews/odi-toner-4.png'
import tonerPhoto5 from '../../assets/reviews/odi-toner-5.png'
import tonerPhoto6 from '../../assets/reviews/odi-toner-6.png'
import ampoulePhoto1 from '../../assets/reviews/odi-ampoule-1.png'
import ampoulePhoto2 from '../../assets/reviews/odi-ampoule-2.png'
import ampoulePhoto3 from '../../assets/reviews/odi-ampoule-3.png'
import ampoulePhoto4 from '../../assets/reviews/odi-ampoule-4.png'
import ampoulePhoto5 from '../../assets/reviews/odi-ampoule-5.png'
import ampoulePhoto6 from '../../assets/reviews/odi-ampoule-6.png'
import creamPhoto1 from '../../assets/reviews/odi-cream-1.png'
import creamPhoto2 from '../../assets/reviews/odi-cream-2.png'
import creamPhoto3 from '../../assets/reviews/odi-cream-3.png'
import creamPhoto4 from '../../assets/reviews/odi-cream-4.png'
import creamPhoto5 from '../../assets/reviews/odi-cream-5.png'
import creamPhoto6 from '../../assets/reviews/odi-cream-6.png'
import baekmogiCreamPhoto1 from '../../assets/reviews/baekmogi-cream-1.png'
import baekmogiCreamPhoto2 from '../../assets/reviews/baekmogi-cream-2.png'
import baekmogiCreamPhoto3 from '../../assets/reviews/baekmogi-cream-3.png'
import baekmogiCreamPhoto4 from '../../assets/reviews/baekmogi-cream-4.png'
import padPhoto1 from '../../assets/reviews/baekmogi-pad-1.png'
import padPhoto2 from '../../assets/reviews/baekmogi-pad-2.png'
import padPhoto3 from '../../assets/reviews/baekmogi-pad-3.png'
import padPhoto4 from '../../assets/reviews/baekmogi-pad-4.png'
import padPhoto5 from '../../assets/reviews/baekmogi-pad-5.png'
import padPhoto6 from '../../assets/reviews/baekmogi-pad-6.png'
import tremellaAmpoulePhoto1 from '../../assets/reviews/baekmogi-ampoule-1.png'
import tremellaAmpoulePhoto2 from '../../assets/reviews/baekmogi-ampoule-2.png'
import tremellaAmpoulePhoto3 from '../../assets/reviews/baekmogi-ampoule-3.png'
import tremellaAmpoulePhoto4 from '../../assets/reviews/baekmogi-ampoule-4.png'
import tremellaAmpoulePhoto5 from '../../assets/reviews/baekmogi-ampoule-5.png'
import tremellaMaskPhoto1 from '../../assets/reviews/baekmogi-mask-1.png'
import tremellaMaskPhoto2 from '../../assets/reviews/baekmogi-mask-2.png'
import tremellaMaskPhoto3 from '../../assets/reviews/baekmogi-mask-3.png'
import tremellaMaskPhoto4 from '../../assets/reviews/baekmogi-mask-4.png'
import tremellaMaskPhoto5 from '../../assets/reviews/baekmogi-mask-5.png'
import tremellaMaskPhoto6 from '../../assets/reviews/baekmogi-mask-6.png'
import tremellaTonerPhoto1 from '../../assets/reviews/baekmogi-toner-1.png'
import tremellaTonerPhoto2 from '../../assets/reviews/baekmogi-toner-2.png'
import tremellaTonerPhoto3 from '../../assets/reviews/baekmogi-toner-3.png'
import tremellaTonerPhoto4 from '../../assets/reviews/baekmogi-toner-4.png'
import tremellaTonerPhoto6 from '../../assets/reviews/baekmogi-toner-6.png'
import lotionPhoto1 from '../../assets/reviews/baekmogi-lotion-1.png'
import lotionPhoto2 from '../../assets/reviews/baekmogi-lotion-2.png'
import lotionPhoto3 from '../../assets/reviews/baekmogi-lotion-3.png'
import lotionPhoto4 from '../../assets/reviews/baekmogi-lotion-4.png'
import lotionPhoto5 from '../../assets/reviews/baekmogi-lotion-5.png'
import lotionPhoto6 from '../../assets/reviews/baekmogi-lotion-6.png'
import roseCreamPhoto1 from '../../assets/reviews/rose-cream-1.png'
import roseCreamPhoto2 from '../../assets/reviews/rose-cream-2.png'
import roseCreamPhoto3 from '../../assets/reviews/rose-cream-3.png'
import roseCreamPhoto4 from '../../assets/reviews/rose-cream-4.png'
import roseCreamPhoto5 from '../../assets/reviews/rose-cream-5.png'
import roseCreamPhoto6 from '../../assets/reviews/rose-cream-6.png'
import eyecreamPhoto1 from '../../assets/reviews/rose-eyecream-1.png'
import eyecreamPhoto2 from '../../assets/reviews/rose-eyecream-2.png'
import eyecreamPhoto3 from '../../assets/reviews/rose-eyecream-3.png'
import eyecreamPhoto4 from '../../assets/reviews/rose-eyecream-4.png'
import eyecreamPhoto5 from '../../assets/reviews/rose-eyecream-5.png'
import eyecreamPhoto6 from '../../assets/reviews/rose-eyecream-6.png'
import cleanserPhoto1 from '../../assets/reviews/vitamin-cleanser-1.png'
import cleanserPhoto2 from '../../assets/reviews/vitamin-cleanser-2.png'
import cleanserPhoto3 from '../../assets/reviews/vitamin-cleanser-3.png'
import cleanserPhoto4 from '../../assets/reviews/vitamin-cleanser-4.png'
import cleanserPhoto5 from '../../assets/reviews/vitamin-cleanser-5.png'
import cleanserPhoto6 from '../../assets/reviews/vitamin-cleanser-6.png'
import vitaminTonerPhoto1 from '../../assets/reviews/vitamin-toner-1.png'
import vitaminTonerPhoto2 from '../../assets/reviews/vitamin-toner-2.png'
import vitaminTonerPhoto3 from '../../assets/reviews/vitamin-toner-3.png'
import vitaminTonerPhoto4 from '../../assets/reviews/vitamin-toner-4.png'
import vitaminTonerPhoto5 from '../../assets/reviews/vitamin-toner-5.png'
import vitaminTonerPhoto6 from '../../assets/reviews/vitamin-toner-6.png'
import vitaminAmpoulePhoto1 from '../../assets/reviews/vitamin-ampoule-1.png'
import vitaminAmpoulePhoto2 from '../../assets/reviews/vitamin-ampoule-2.png'
import vitaminAmpoulePhoto3 from '../../assets/reviews/vitamin-ampoule-3.png'
import vitaminAmpoulePhoto4 from '../../assets/reviews/vitamin-ampoule-4.png'
import vitaminAmpoulePhoto5 from '../../assets/reviews/vitamin-ampoule-5.png'
import vitaminAmpoulePhoto6 from '../../assets/reviews/vitamin-ampoule-6.png'
import vitaminLotionPhoto1 from '../../assets/reviews/vitamin-lotion-1.png'
import vitaminLotionPhoto2 from '../../assets/reviews/vitamin-lotion-2.png'
import vitaminLotionPhoto3 from '../../assets/reviews/vitamin-lotion-3.png'
import vitaminLotionPhoto4 from '../../assets/reviews/vitamin-lotion-4.png'
import vitaminLotionPhoto5 from '../../assets/reviews/vitamin-lotion-5.png'
import vitaminLotionPhoto6 from '../../assets/reviews/vitamin-lotion-6.png'
import essencePhoto1 from '../../assets/reviews/vitamin-essence-1.png'
import essencePhoto2 from '../../assets/reviews/vitamin-essence-2.png'
import essencePhoto3 from '../../assets/reviews/vitamin-essence-3.png'
import essencePhoto4 from '../../assets/reviews/vitamin-essence-4.png'
import essencePhoto5 from '../../assets/reviews/vitamin-essence-5.png'
import essencePhoto6 from '../../assets/reviews/vitamin-essence-6.png'
import vitaminCreamPhoto1 from '../../assets/reviews/vitamin-cream-1.png'
import vitaminCreamPhoto2 from '../../assets/reviews/vitamin-cream-2.png'
import vitaminCreamPhoto3 from '../../assets/reviews/vitamin-cream-3.png'
import vitaminCreamPhoto4 from '../../assets/reviews/vitamin-cream-4.png'
import vitaminCreamPhoto5 from '../../assets/reviews/vitamin-cream-5.png'
import vitaminCreamPhoto6 from '../../assets/reviews/vitamin-cream-6.png'

const vitaminCreamPhotos = [vitaminCreamPhoto1, vitaminCreamPhoto2, vitaminCreamPhoto3, vitaminCreamPhoto4, vitaminCreamPhoto5, vitaminCreamPhoto6].map((src, index) => ({
  id: `vitamin-cream-photo-${index + 1}`, src, alt: `비타민 수분크림 포토 리뷰 ${index + 1}`,
}))

const essencePhotos = [essencePhoto1, essencePhoto2, essencePhoto3, essencePhoto4, essencePhoto5, essencePhoto6].map((src, index) => ({
  id: `vitamin-essence-photo-${index + 1}`, src, alt: `비타민 에센스 포토 리뷰 ${index + 1}`,
}))

const vitaminLotionPhotos = [vitaminLotionPhoto1, vitaminLotionPhoto2, vitaminLotionPhoto3, vitaminLotionPhoto4, vitaminLotionPhoto5, vitaminLotionPhoto6].map((src, index) => ({
  id: `vitamin-lotion-photo-${index + 1}`, src, alt: `비타민 로션 포토 리뷰 ${index + 1}`,
}))

const vitaminAmpoulePhotos = [vitaminAmpoulePhoto1, vitaminAmpoulePhoto2, vitaminAmpoulePhoto3, vitaminAmpoulePhoto4, vitaminAmpoulePhoto5, vitaminAmpoulePhoto6].map((src, index) => ({
  id: `vitamin-ampoule-photo-${index + 1}`, src, alt: `비타민 앰플 포토 리뷰 ${index + 1}`,
}))

const vitaminTonerPhotos = [vitaminTonerPhoto1, vitaminTonerPhoto2, vitaminTonerPhoto3, vitaminTonerPhoto4, vitaminTonerPhoto5, vitaminTonerPhoto6].map((src, index) => ({
  id: `vitamin-toner-photo-${index + 1}`, src, alt: `비타민 토너 포토 리뷰 ${index + 1}`,
}))

const cleanserPhotos = [cleanserPhoto1, cleanserPhoto2, cleanserPhoto3, cleanserPhoto4, cleanserPhoto5, cleanserPhoto6].map((src, index) => ({
  id: `vitamin-cleanser-photo-${index + 1}`, src, alt: `비타민 폼클렌징 포토 리뷰 ${index + 1}`,
}))

const eyecreamPhotos = [eyecreamPhoto1, eyecreamPhoto2, eyecreamPhoto3, eyecreamPhoto4, eyecreamPhoto5, eyecreamPhoto6].map((src, index) => ({
  id: `rose-eyecream-photo-${index + 1}`, src, alt: `로즈 PDRN 리페어 아이크림 포토 리뷰 ${index + 1}`,
}))

const roseCreamPhotos = [roseCreamPhoto1, roseCreamPhoto2, roseCreamPhoto3, roseCreamPhoto4, roseCreamPhoto5, roseCreamPhoto6].map((src, index) => ({
  id: `rose-cream-photo-${index + 1}`, src, alt: `로즈 PDRN 밸런싱 크림 포토 리뷰 ${index + 1}`,
}))

const lotionPhotos = [lotionPhoto1, lotionPhoto2, lotionPhoto3, lotionPhoto5, lotionPhoto4, lotionPhoto6].map((src, index) => ({
  id: `baekmogi-lotion-photo-${index + 1}`, src, alt: `백목이 딥 모이스처 로션 포토 리뷰 ${index + 1}`,
}))

const tremellaTonerPhotos = [tremellaTonerPhoto1, tremellaTonerPhoto2, tremellaTonerPhoto3, tremellaTonerPhoto4, tremellaMaskPhoto5, tremellaTonerPhoto6].map((src, index) => ({
  id: `baekmogi-toner-photo-${index + 1}`, src, alt: `백목이 딥 모이스처 토너 포토 리뷰 ${index + 1}`,
}))

const tremellaMaskPhotos = [tremellaMaskPhoto1, tremellaMaskPhoto2, tremellaMaskPhoto3, tremellaMaskPhoto4, tremellaMaskPhoto5, tremellaMaskPhoto6].map((src, index) => ({
  id: `baekmogi-mask-photo-${index + 1}`, src, alt: `백목이 수분 베일 마스크팩 포토 리뷰 ${index + 1}`,
}))

const tremellaAmpoulePhotos = [tremellaAmpoulePhoto1, tremellaAmpoulePhoto2, tremellaAmpoulePhoto3, tremellaAmpoulePhoto4, tremellaAmpoulePhoto5].map((src, index) => ({
  id: `baekmogi-ampoule-photo-${index + 1}`, src, alt: `백목이 수분 농축 앰플 포토 리뷰 ${index + 1}`,
}))

const padPhotos = [padPhoto1, padPhoto2, padPhoto3, padPhoto4, padPhoto5, padPhoto6].map((src, index) => ({
  id: `baekmogi-pad-photo-${index + 1}`, src, alt: `백목이 커스텀 핏 패드 포토 리뷰 ${index + 1}`,
}))

const baekmogiCreamPhotos = [baekmogiCreamPhoto1, baekmogiCreamPhoto2, baekmogiCreamPhoto3, baekmogiCreamPhoto4].map((src, index) => ({
  id: `baekmogi-cream-photo-${index + 1}`, src, alt: `백목이 수분 잠금 크림 포토 리뷰 ${index + 1}`,
}))

const creamPhotos = [creamPhoto1, creamPhoto2, creamPhoto3, creamPhoto4, creamPhoto5, creamPhoto6].map((src, index) => ({
  id: `odi-cream-photo-${index + 1}`, src, alt: `오디 크림 포토 리뷰 ${index + 1}`,
}))

const ampoulePhotos = [ampoulePhoto1, ampoulePhoto2, ampoulePhoto3, ampoulePhoto4, ampoulePhoto5, ampoulePhoto6].map((src, index) => ({
  id: `odi-ampoule-photo-${index + 1}`, src, alt: `오디 앰플 포토 리뷰 ${index + 1}`,
}))

const tonerPhotos = [tonerPhoto1, tonerPhoto2, tonerPhoto3, tonerPhoto4, tonerPhoto5, tonerPhoto6].map((src, index) => ({
  id: `odi-toner-photo-${index + 1}`, src, alt: `오디 토너 포토 리뷰 ${index + 1}`,
}))

const balmPhotos = [balmPhoto1, balmPhoto2, balmPhoto3, balmPhoto4, balmPhoto5, balmPhoto6].map((src, index) => ({
  id: `odi-balm-photo-${index + 1}`, src, alt: `오디 클렌징밤 포토 리뷰 ${index + 1}`,
}))

const photos = [photo1, photo2, photo3, photo4, photo5, photo6].map((src, index) => ({
  id: `odi-photo-${index + 1}`, src, alt: `오디 진정 마스크팩 포토 리뷰 ${index + 1}`,
}))

// Figma's aggregate numbers and first three reviews are reference data, not live customer records.
// Additional fixtures make pagination and text-only/photo filtering usable before an API is connected.
const additionalFixtures = [
  ['촉촉한하루', '사용 후 촉촉해요', '저녁에 사용했는데 다음날까지 촉촉한 느낌이 남아요.', '30대', '건성', 'moisture', 5],
  ['온결좋아', '편안하게 사용했어요', '시트가 부드러워서 편안하게 관리하기 좋아요.', '20대', '민감성', 'sensitive', 4],
  ['초록잎', '피부결 관리에 좋아요', '세안 후 사용하면 피부결이 한결 부드러워지는 느낌이에요.', '40대', '복합성', 'elasticity', 5],
  ['보습일기', '저녁 케어로 쓰고 있어요', '하루를 마무리할 때 간편하게 사용하고 있어요.', '50대 이상', '건성', 'moisture', 4],
  ['맑은아침', '밀착감이 좋아요', '얼굴에 잘 붙어서 사용하는 동안 편안했어요.', '30대', '지성', 'pore', 5],
  ['달빛', '산뜻한 마무리', '끈적임이 적고 마무리가 산뜻한 편이에요.', '20대', '수부지', 'tone', 3],
  ['피부휴식', '부드러운 시트', '시트가 부드럽고 에센스가 넉넉해서 마음에 들어요.', '10대', '민감성', 'sensitive', 5],
  ['여유로운밤', '꾸준히 사용 중이에요', '일주일에 몇 번씩 편하게 관리하고 있어요.', '40대', '복합성', 'elasticity', 4],
  ['하루한팩', '데일리 팩으로 좋아요', '부담 없이 쓰기 좋아서 데일리 케어로 골랐어요.', '30대', '수부지', 'moisture', 5],
  ['소담', '촉촉한 사용감', '건조한 날에 사용하면 촉촉한 느낌이 좋아요.', '50대 이상', '건성', 'moisture', 4],
  ['구름', '무난하게 사용하기 좋아요', '가볍게 관리하고 싶은 날에 사용하고 있어요.', '20대', '지성', 'pore', 3],
  ['봄날', '피부가 편안해요', '사용하고 나면 피부가 편안해서 자주 손이 가요.', '40대', '민감성', 'sensitive', 5],
].map(([nickname, title, body, age, skinType, concern, rating], index) => ({
  id: `odi-fixture-${index + 4}`, nickname, title, body, age, skinType, concern, rating,
  date: `2026-10-${String(14 - index).padStart(2, '0')}`,
  photo: index % 2 === 0 ? photos[(index + 3) % photos.length] : null,
}))

export const reviewPages = {
  // Products without supplied review records get their own empty dataset.
  // Never reuse the mask's reviews for another product.
  ...Object.fromEntries(products.map(product => [product.id, {
    productId: product.id, productName: product.name,
    totalReviews: 0, rating: 0, reviewCount: 0, photoReviewCount: 0, viewCount: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    photoReviews: [], reviews: [],
  }])),
  'vitamin-c-mask': {
    productId: 'vitamin-c-mask', productName: '비타민 C 마스크팩',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Preserve Figma's supplied totals without recalculation.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: vitaminMaskReviewPhotos,
    summaryPhotos: [vitaminMaskReviewPhotos[0], vitaminMaskReviewPhotos[1], vitaminMaskReviewPhotos[3], vitaminMaskReviewPhotos[2]],
    reviews: [
{
  "id": "vitamin-mask-1",
  "nickname": "민트초코칩",
  "date": "2026-09-17",
  "rating": 5,
  "skinType": "건성",
  "concern": "pore",
  "concernLabel": "모공•피지",
  "age": "20대",
  "title": "팩 한 장으로 촉촉함이 꽉 차는 느낌이에요",
  "body": "피부가 건조하고 푸석할 때 사용해봤는데 시트에 에센스가 충분히 묻어 있어서 끝까지 촉촉하게 사용할 수 있었어요. 팩을 떼어낸 뒤에도 피부가 금방 마르지 않고 촉촉함이 오래 남는 느낌이라 만족스러웠어요. 특히 볼이나 입가처럼 건조한 부분이 한결 편안해져서 좋아요.",
  "photo": vitaminMaskReviewPhotos[0]
},
{
  "id": "vitamin-mask-2",
  "nickname": "서하늘",
  "date": "2026-09-17",
  "rating": 5,
  "skinType": "수부지",
  "concern": "elasticity",
  "concernLabel": "주름•탄력",
  "age": "40대",
  "title": "사용 후 피부가 맑아 보여요",
  "body": "피부톤이 칙칙해 보이는 날 저녁에 사용하고 있어요. 팩을 붙이고 있는 동안 답답한 느낌이 적고 떼어낸 뒤에는 피부가 촉촉하면서도 한층 맑아 보이는 느낌이에요. 에센스를 가볍게 두드려 흡수시키면 번들거림도 심하지 않고 다음 날 피부가 생기 있어 보여서 중요한 날 전날 사용하기 좋",
  "photo": vitaminMaskReviewPhotos[2]
},
{
  "id": "vitamin-mask-3",
  "nickname": "레몬소다",
  "date": "2026-09-16",
  "rating": 5,
  "skinType": "민감성",
  "concern": "sensitive",
  "concernLabel": "수부지",
  "age": "10대",
  "title": "거칠어진 피부가 부드럽게 정돈돼요",
  "body": "피부가 예민해지고 결이 거칠게 느껴질 때 사용해봤어요. 시트가 얼굴에 부드럽게 밀착되고 사용하는 동안 편안했어요. 팩을 떼어낸 뒤 남은 에센스를 가볍게 흡수시켜주니까 들떠 보이던 피부결이 매끈하게 정돈되고 촉촉해졌어요. 피부가 자극받았을 때 진정용으로 사용하기도 괜찮은 것 같아요.",
  "photo": vitaminMaskReviewPhotos[3]
},
    ],
  },
  'vitamin-c-pad': {
    productId: 'vitamin-c-pad', productName: '비타민 C 토너 패드',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Preserve Figma's supplied totals without recalculation.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: vitaminPadReviewPhotos,
    summaryPhotos: [vitaminPadReviewPhotos[0], vitaminPadReviewPhotos[1], vitaminPadReviewPhotos[2], vitaminPadReviewPhotos[5]],
    reviews: [
{
  "id": "vitamin-pad-1",
  "nickname": "MellowDay",
  "date": "2026-09-17",
  "rating": 5,
  "skinType": "건성",
  "concern": "pore",
  "concernLabel": "모공•피지",
  "age": "20대",
  "title": "에센스가 촉촉하게 잘 묻어 있어요",
  "body": "패드가 얇게 마른 느낌이 아니라 에센스를 충분히 머금고 있어서 한 장만 사용해도 얼굴 전체를 촉촉하게 닦아낼 수 있어요. 세안 후 피부결을 따라 가볍게 닦아주면 피부가 매끈하게 정돈되고 건조한 부분에는 잠깐 올려두면 팩처럼 사용할 수 있어서 편해요. 사용 후에도 당기는 느낌이 적어서 만족하고 있어요.",
  "photo": vitaminPadReviewPhotos[0]
},
{
  "id": "vitamin-pad-2",
  "nickname": "루나빛",
  "date": "2026-09-17",
  "rating": 5,
  "skinType": "수부지",
  "concern": "elasticity",
  "concernLabel": "주름•탄력",
  "age": "40대",
  "title": "내장 집게가 있어서 위생적으로 쓰기 좋아요",
  "body": "패드 제품은 손으로 꺼낼 때 조금 신경 쓰였는데 뚜껑 안쪽에 집게가 따로 들어 있어서 깔끔하게 사용할 수 있어요. 패드도 한 장씩 잘 집히고 에센스가 넉넉하게 묻어 있어서 아침에 피부결 정돈할 때 간편하게 쓰기 좋았습니다. 닦고 난 뒤에도 번들거리지 않고 산뜻해서 손이 자주 가요.",
  "photo": vitaminPadReviewPhotos[1]
},
{
  "id": "vitamin-pad-3",
  "nickname": "하니베리",
  "date": "2026-09-16",
  "rating": 5,
  "skinType": "민감성",
  "concern": "sensitive",
  "concernLabel": "수부지",
  "age": "10대",
  "title": "한 장으로 피부결 정돈하기 편해요",
  "body": "세안하고 피부가 거칠게 느껴질 때 한 장씩 사용하고 있어요. 엠보 면으로 피부결을 따라 부드럽게 닦아준 뒤 반대쪽 면으로 한 번 더 정돈해주니까 사용하기 편했어요. 패드가 에센스를 촉촉하게 머금고 있어서 자극적인 느낌도 적고 사용하고 나면 피부가 한층 매끈하고 맑아 보이는 느낌이에요.",
  "photo": vitaminPadReviewPhotos[2]
},
    ],
  },
  'vitamin-c-cream': {
    productId: 'vitamin-c-cream', productName: '비타민 C 수분크림',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Keep the Figma statistics as supplied, including their differing totals.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: vitaminCreamPhotos,
    summaryPhotos: [vitaminCreamPhotos[0], vitaminCreamPhotos[3], vitaminCreamPhotos[1], vitaminCreamPhotos[4]],
    reviews: [
      {
        id: 'vitamin-cream-1', nickname: '시온이', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '건조할 때 든든하게 마무리돼요',
        body: '세안 후 스킨케어를 해도 금방 당기는 편인데 마지막에 이 크림을 발라주면 촉촉함이 오래 남는 느낌이에요. 부드럽게 펴 발리고 피부를 편안하게 감싸주는 보습감이 있어서 건조한 날에도 피부가 덜 푸석해 보여요. 밤에 듬뿍 바르고 자면 다음 날까지 피부가 촉촉해서 만족해요.',
        photo: vitaminCreamPhotos[0],
      },
      {
        id: 'vitamin-cream-2', nickname: '모찌구름', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '크림인데 생각보다 부담스럽지 않아요',
        body: '수분크림은 너무 무거우면 잘 안 쓰게 되는데 이 제품은 촉촉한 크림 제형인데도 부드럽게 잘 펴 발려요. 적당량만 사용하면 답답하거나 과하게 번들거리는 느낌이 적고 흡수된 뒤에는 피부결이 매끈하게 정돈돼 보여요. 보습감과 사용감의 균형이 괜찮아서 데일리로 쓰기 좋습니다.',
        photo: vitaminCreamPhotos[4],
      },
      {
        id: 'vitamin-cream-3', nickname: '윤슬이', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '푸석할 때 여러 번 덧바르기 좋아요',
        body: '요즘 피부가 건조해서 볼 쪽이 특히 푸석하게 느껴졌는데 크림을 얇게 펴 바르면 피부가 한결 부드럽고 촉촉해져요. 건조한 부분에는 조금 더 덧발라도 뭉치거나 겉도는 느낌이 적고 사용 후에는 피부가 매끈하고 윤기 있게 정돈돼 보여요. 스킨케어 마지막 단계로 꾸준히 사용하고 있어요.',
        photo: vitaminCreamPhotos[1],
      },
    ],
  },
  'vitamin-c-essence': {
    productId: 'vitamin-c-essence', productName: '비타민 C 에센스',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Preserve the supplied Figma values without reconciling their totals.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: essencePhotos,
    summaryPhotos: [essencePhotos[0], essencePhotos[2], essencePhotos[1], essencePhotos[4]],
    reviews: [
      {
        id: 'vitamin-essence-1', nickname: '바다', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '촉촉한데 끈적임이 적어요',
        body: '건성이라 에센스를 바르면 촉촉함이 오래 남는 제품을 좋아하는데 이 제품은 수분감은 충분하면서도 끈적이는 느낌이 적어서 좋았어요. 펌프로 적당량 덜어 바르면 피부에 부드럽게 펴지고 흡수된 뒤에는 피부가 촉촉하고 매끈하게 정돈되는 느낌이에요. 아침에도 부담 없이 사용하기 좋아요.',
        photo: essencePhotos[0],
      },
      {
        id: 'vitamin-essence-2', nickname: '치이카', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '피부가 한층 맑아 보이는 느낌이에요',
        body: '요즘 피부가 칙칙하고 생기가 없어 보여서 사용해봤어요. 제형이 무겁지 않고 피부에 빠르게 스며들어서 여러 단계 스킨케어를 해도 답답한 느낌이 거의 없어요. 꾸준히 사용하니까 피부가 조금 더 맑고 윤기 있어 보이고 화장 전에 사용해도 밀림이 적어서 만족하고 있습니다.',
        photo: essencePhotos[1],
      },
      {
        id: 'vitamin-essence-3', nickname: '짱구', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '푸석한 피부결이 매끈해 보여요',
        body: '피부가 건조하면 결이 거칠고 푸석해 보이는 편인데 에센스를 얇게 펴 바르고 손으로 가볍게 흡수시켜주니까 피부결이 한결 부드럽고 매끈하게 정돈되는 느낌이에요. 한 번에 많이 바르기보다 필요한 만큼 얇게 덧바르기 좋고 사용 후 피부가 촉촉하고 생기 있어 보여서 마음에 들어요.',
        photo: essencePhotos[3],
      },
    ],
  },
  'vitamin-c-lotion': {
    productId: 'vitamin-c-lotion', productName: '비타민 C 브라이트닝 로션',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Preserve Figma statistics without reconciling their totals.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: vitaminLotionPhotos,
    // The reference summary retains three toner photos; keep this product's images throughout.
    summaryPhotos: [vitaminLotionPhotos[0], vitaminLotionPhotos[1], vitaminLotionPhotos[2], vitaminLotionPhotos[4]],
    reviews: [
      {
        id: 'vitamin-lotion-1', nickname: '나나봄', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '촉촉한데 답답하지 않아요',
        body: '건성이라 로션을 발라도 금방 건조해지는 편인데 이 제품은 부드럽게 펴 발리고 촉촉함이 오래 남아요. 보습감은 충분한데 너무 무겁거나 끈적이지 않아서 아침 스킨케어에도 부담 없이 사용하기 좋았어요. 바르고 나면 피부가 한결 매끈해 보여서 만족해요.',
        photo: vitaminLotionPhotos[0],
      },
      {
        id: 'vitamin-lotion-2', nickname: 'ChloeK', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '산뜻하게 마무리돼서 좋아요',
        body: '로션은 잘못 바르면 번들거리거나 답답해서 잘 안 쓰는데 이 제품은 가볍게 스며들면서 피부에 촉촉함만 남는 느낌이에요. 적당량만 발라도 부드럽게 잘 펴지고 흡수된 뒤에는 피부결이 매끈하게 정돈돼 보여요. 유분감이 과하지 않아서 데일리로 사용하기 좋습니다',
        photo: vitaminLotionPhotos[1],
      },
      {
        id: 'vitamin-lotion-3', nickname: '보라구름', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '푸석한 피부가 부드러워져요',
        body: '요즘 피부가 건조하고 푸석해 보여서 사용해봤어요. 제형이 부드러워서 피부에 자극 없이 편하게 펴 바를 수 있고 손으로 가볍게 흡수시키면 촉촉하고 매끈하게 마무리돼요. 여러 번 덧발라도 부담스럽지 않고 피부가 생기 있어 보여서 꾸준히 사용하고 있어요.',
        photo: vitaminLotionPhotos[4],
      },
    ],
  },
  'vitamin-c-ampoule': {
    productId: 'vitamin-c-ampoule', productName: '비타민 C 앰플',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Preserve the Figma values without recalculating the distribution or review total.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: vitaminAmpoulePhotos,
    summaryPhotos: [vitaminAmpoulePhotos[3], vitaminAmpoulePhotos[2], vitaminAmpoulePhotos[1], vitaminAmpoulePhotos[4]],
    reviews: [
      {
        id: 'vitamin-ampoule-1', nickname: '토리콩', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '피부가 맑아 보이는 느낌이에요',
        body: '요즘 피부가 칙칙해 보여서 브라이트닝 앰플을 찾다가 사용해봤어요. 촉촉하게 발리는데 무겁거나 끈적이는 느낌이 거의 없고, 피부에 부드럽게 흡수돼서 데일리로 쓰기 편해요. 꾸준히 사용하니까 피부가 조금 더 맑고 생기 있어 보이는 느낌이라 아침저녁으로 잘 사용하고 있어요.',
        photo: vitaminAmpoulePhotos[0],
      },
      {
        id: 'vitamin-ampoule-2', nickname: '은하수집', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '산뜻한데 은은하게 광이 나요',
        body: '앰플은 끈적이거나 무거울까 봐 잘 안 쓰는 편인데 이 제품은 생각보다 가볍게 펴 발리고 흡수도 빨라서 좋았어요. 바르고 나면 번들거리는 광이 아니라 피부가 촉촉하고 은은하게 윤기 있어 보이는 느낌이에요. 메이크업 전에 사용해도 밀리는 느낌이 없어서 만족스러워요.',
        photo: vitaminAmpoulePhotos[1],
      },
      {
        id: 'vitamin-ampoule-3', nickname: 'CozyMint', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '피부결이 매끈해 보여요',
        body: '피부가 푸석하고 결이 거칠어 보일 때 사용하고 있어요. 한 번에 많이 바르지 않고 얇게 펴 바르니까 부담이 없고 손으로 가볍게 두드리면 촉촉하게 잘 흡수돼요. 사용하고 나면 피부결이 조금 더 매끈하게 정돈돼 보이고 피부도 생기 있어 보여서 꾸준히 사용해보려고 해요.',
        photo: vitaminAmpoulePhotos[4],
      },
    ],
  },
  'vitamin-c-toner': {
    productId: 'vitamin-c-toner', productName: '비타민 C 토너',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Keep the supplied Figma statistics without reconciling their totals.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: vitaminTonerPhotos,
    summaryPhotos: [vitaminTonerPhotos[0], vitaminTonerPhotos[1], vitaminTonerPhotos[2], vitaminTonerPhotos[4]],
    reviews: [
      {
        id: 'vitamin-toner-1', nickname: '몽이23', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '바르자마자 촉촉해져요',
        body: '세안하고 나면 피부가 금방 당기는 편인데 이 토너를 사용하니까 피부가 한결 편안해졌어요. 물처럼 가볍게 발리면서도 금방 날아가는 느낌이 아니라 촉촉함이 은은하게 남아서 마음에 들어요. 여러 번 덧발라도 끈적이지 않아서 잘 쓰고 있어요.',
        photo: vitaminTonerPhotos[0],
      },
      {
        id: 'vitamin-toner-2', nickname: '이서윤', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '세안 후 첫 단계로 딱이에요',
        body: '세안 직후 피부가 쉽게 건조해져서 바로 토너를 사용하는데 자극적인 느낌 없이 부드럽게 사용할 수 있어서 좋아요. 손으로 가볍게 두드려 흡수시키면 피부가 촉촉해지고 다음 단계 스킨케어도 부드럽게 잘 발리는 것 같아요. 향도 강하지 않아서 매일 부담 없이 사용하고 있어요.',
        photo: vitaminTonerPhotos[5],
      },
      {
        id: 'vitamin-toner-3', nickname: 'PeachMoon', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '산뜻해서 매일 쓰기 좋아요',
        body: '무거운 토너는 답답해서 잘 사용하지 않는 편인데 이 제품은 가볍고 산뜻하게 흡수돼서 부담이 없어요. 화장솜에 충분히 적셔 피부결을 따라 닦아주면 피부가 매끈하게 정돈되는 느낌도 들고 끈적임이 거의 없어 아침에도 편하게 사용하고 있어요.',
        photo: vitaminTonerPhotos[2],
      },
    ],
  },
  'vitamin-c-cleanser': {
    productId: 'vitamin-c-cleanser', productName: '비타민 C 클렌징폼',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Preserve Figma's supplied values; distribution and total are intentionally not reconciled.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: cleanserPhotos,
    summaryPhotos: [cleanserPhotos[0], cleanserPhotos[3], cleanserPhotos[2], cleanserPhotos[4]],
    reviews: [
      {
        id: 'vitamin-cleanser-1', nickname: '소소한봄', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '세안 후에도 당기지 않아요',
        body: '평소 세안하고 나면 얼굴이 금방 당기는 편인데 이건 그런 느낌이 덜했어요. 거품이 부드럽고 얼굴에 문지를 때도 자극적인 느낌이 없었고, 씻고 나면 피부가 개운하면서도 너무 뽀득하지 않아서 마음에 들어요.',
        photo: cleanserPhotos[3],
      },
      {
        id: 'vitamin-cleanser-2', nickname: 'JENNY92', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '거품이 진짜 잘 나요',
        body: '조금만 짜도 거품이 풍성하게 올라와서 생각보다 오래 쓸 것 같아요. 거품 자체가 쫀쫀한 편이라 얼굴 전체에 마사지하듯 세안하기도 편하고 선크림 바른 날에도 깔끔하게 씻기는 느낌이라 요즘 잘 쓰고 있어요.',
        photo: cleanserPhotos[2],
      },
      {
        id: 'vitamin-cleanser-3', nickname: '몽글몽글', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '아침 세안용으로 딱이에요',
        body: '저녁보다 아침에 가볍게 사용할 클렌징폼을 찾다가 써봤어요. 밤사이 올라온 유분기는 깔끔하게 씻어주는데 세안 후 피부가 너무 건조해지지 않아서 좋네요. 향도 과하게 남지 않고 산뜻해서 아침마다 손이 가요.',
        photo: cleanserPhotos[4],
      },
    ],
  },
  'rose-pdrn-eyecream': {
    productId: 'rose-pdrn-eyecream', productName: '로즈 PDRN 리페어 아이크림',
    totalReviews: 206, rating: 4.9, reviewCount: 206, photoReviewCount: 60, viewCount: 12035,
    ratingDistribution: { 5: 198, 4: 7, 3: 1, 2: 0, 1: 0 },
    photoReviews: eyecreamPhotos,
    reviews: [
      {
        id: 'rose-eyecream-1', nickname: 'godki****', date: '2026-10-15', rating: 5,
        skinType: '건성', concern: 'elasticity', concernLabel: '주름', age: '20대',
        title: '좋은데 쓰기도 편해요',
        body: '크림 제형이 부드럽고 촉촉하게 발리면서도 너무 무겁거나 답답하지 않아 데일리로 사용하기 좋았습니다. 바른 후 눈가가 촉촉하게 유지되고 피부결도 한층 매끄럽게 정돈되는 느낌이에요. 눈가 탄력 케어를 꾸준히 해주고 싶은 분들에게 잘 맞을 것 같아요.특히 흡수가 빠른 편이라 아침에 사용해도 메이크업이 밀리는 느낌이 적어서 좋았어요. 30ml라 용량도 넉넉하고 튜브 타입이라 위생적으로 사용하기 편합니다.',
        preview: '크림 제형이 부드럽고 촉촉하게 발리면서도 너무 무겁거나 답답하지 않아 데일리로 사용하기 좋았습니다. 바른 후 눈가가 촉촉하게 유지되고 피부결도 한층 매끄럽게 정돈되는 느낌이에요. 눈가 탄력 케어를 꾸준히 해주고 싶은 분들에게 잘 맞을...',
        photo: eyecreamPhotos[0],
      },
      {
        id: 'rose-eyecream-2', nickname: '카피바라쿤', date: '2026-10-13', rating: 5,
        skinType: '수부지', concern: 'pore', concernLabel: '모공•탄력', age: '20대',
        title: '부담없어요 :)',
        body: '사용한 지 얼마 안 돼서 드라마틱한 효과는 더 지켜봐야겠지만, 제형이 부드럽고 보습감이 좋아서 부담 없이 쓰기 좋아요!  🤍✨',
        photo: eyecreamPhotos[1],
      },
      {
        id: 'rose-eyecream-3', nickname: '붕어빵', date: '2026-10-08', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '40대',
        title: '좋아요',
        body: '눈가뿐만 아니라 목 주름이랑 팔자주름에도 바르기 좋아요! 끈적임 없이 촉촉해서 매일 영양 케어용으로 딱입니다～',
        photo: eyecreamPhotos[2],
      },
    ],
  },
  'rose-pdrn-balancing-cream': {
    productId: 'rose-pdrn-balancing-cream', productName: '로즈 PDRN 밸런싱 크림',
    totalReviews: 206, rating: 4.9, reviewCount: 206, photoReviewCount: 60, viewCount: 12035,
    ratingDistribution: { 5: 198, 4: 7, 3: 1, 2: 0, 1: 0 },
    photoReviews: roseCreamPhotos,
    reviews: [
      {
        id: 'rose-cream-1', nickname: '밍맹붕', date: '2026-09-08', rating: 5,
        skinType: '건성', concern: 'elasticity', concernLabel: '주름', age: '30대',
        title: 'ㅎㅎ만족템',
        body: '제형이 쫀쫀한 편인데 막상 발라보면 무겁지 않고 부드럽게 밀착돼서 데일리로 부담 없이 쓸 수 있어요. 밤에 넉넉하게 바르고 자면 다음 날 당김 없이 피부가 한결 매끈하게 정돈되는 느낌이 들어요. 얼굴뿐 아니라 목처럼 건조한 부위에도 발라줄 수 있어서 활용도가 괜찮은 편이에요.',
        preview: '제형이 쫀쫀한 편인데 막상 발라보면 무겁지 않고 부드럽게 밀착돼서 데일리로 부담 없이 쓸 수 있어요. 밤에 넉넉하게 바르고 자면 다음 날 당김 없이 피부가 한결 매끈하게 정돈되는 느낌이 들어요. 얼굴뿐 아니라 목처럼 건조한 부위에도 발라...',
        photo: roseCreamPhotos[0],
      },
      {
        id: 'rose-cream-2', nickname: '타로짱기요어', date: '2026-09-16', rating: 5,
        skinType: '수부지', concern: 'pore', concernLabel: '모공•탄력', age: '20대',
        title: '피부에서 광나요ㅜㅜ',
        body: '몇통째쓰는지 모르겟어요 너무 좋아서 피부 좋아지고 광나고 다 함',
        photo: roseCreamPhotos[1],
      },
      {
        id: 'rose-cream-3', nickname: '카페인탈출자', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '굿굿추천',
        body: '크림이라 무거울 줄 알았는데 발라보면 안 무겁고 부드럽게 발려요. 피부에 잘 밀착돼서 좋아요 향도 세지 않고 은은하게 나서 사용하기 좋았어요',
        photo: roseCreamPhotos[2],
      },
    ],
  },
  'baekmogi-lotion': {
    productId: 'baekmogi-lotion', productName: '백목이 딥 모이스처 로션',
    totalReviews: 206, rating: 4.9, reviewCount: 206, photoReviewCount: 60, viewCount: 12035,
    ratingDistribution: { 5: 198, 4: 7, 3: 1, 2: 0, 1: 0 },
    photoReviews: lotionPhotos,
    summaryPhotos: [lotionPhotos[0], lotionPhotos[1], lotionPhotos[2], lotionPhotos[4]],
    reviews: [
      {
        id: 'baekmogi-lotion-1', nickname: 'kingbad***', date: '2026-10-01', rating: 5,
        skinType: '건성', concern: 'elasticity', concernLabel: '주름', age: '10대',
        title: '속건조 잘 잡아줌',
        body: '요즘같은 계절에 쓰기 좋아요\n얼굴뿐아니라 건조한 곳에 바르기 좋아요. 보습에도 좋고 잘 사용해볼게요',
        photo: lotionPhotos[0],
      },
      {
        id: 'baekmogi-lotion-2', nickname: 'tarohehe', date: '2026-09-30', rating: 5,
        skinType: '수부지', concern: 'pore', concernLabel: '모공•탄력', age: '20대',
        title: '사길잘했어요',
        body: '건조한 피부라 보습력이 좋은 제품을 찾다가 사용해봤는데 만족스러워요 제형이 너무 무겁거나 끈적이지 않고 부드럽게 발려서 데일리로 사용하기 좋아요  바른 후 피부가 촉촉하고 편안한 느낌이 들고 시간이 지나도 당김이 덜한 편이예요 자극적인 향도 거의 없어 부담 없이 사용할 수 있었어요 세안 후 건조함이 느껴지는 분들이 꾸준히 사용하기 좋은 보습 로션인 것 같아요 ㅎㅎ',
        preview: '건조한 피부라 보습력이 좋은 제품을 찾다가 사용해봤는데 만족스러워요 제형이 너무 무겁거나 끈적이지 않고 부드럽게 발려서 데일리로 사용하기 좋아요  바른 후 피부가 촉촉하고 편안한 느낌이 들고 시간이 지나도 당김이 덜한 편이예요 자극적인 향도 거의 없어 부담 없이 사용할 수 있...',
        photo: lotionPhotos[1],
      },
      {
        id: 'baekmogi-lotion-3', nickname: 'ngng****', date: '2026-09-30', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '40대',
        title: '산뜻해용',
        body: '에센스나 세럼만으로 부족한 건성이 보습용으로 바르기 괜찮아요. 유수분 적당히 밸런스 있으면서도 산뜻하게 마무리돼요.',
        photo: lotionPhotos[2],
      },
    ],
  },
  'baekmogi-toner': {
    productId: 'baekmogi-toner', productName: '백목이 딥 모이스처 토너',
    totalReviews: 108, rating: 4.9, reviewCount: 108, photoReviewCount: 48, viewCount: 10023,
    ratingDistribution: { 5: 98, 4: 8, 3: 2, 2: 0, 1: 0 },
    photoReviews: tremellaTonerPhotos,
    reviews: [
      {
        id: 'baekmogi-toner-1', nickname: 'kmo98***', date: '2026-10-08', rating: 5,
        skinType: '건성', concern: 'elasticity', concernLabel: '주름', age: '30대',
        title: '신랑과도 같이 쓰기 좋아요',
        body: '신랑이랑 기대이상으로 촉촉해요 !!! 신랑이랑 같이 사용하는데 넘 좋은거같음 ^____^',
        photo: tremellaTonerPhotos[0],
      },
      {
        id: 'baekmogi-toner-2', nickname: '앵듈리', date: '2026-10-07', rating: 5,
        skinType: '수부지', concern: 'pore', concernLabel: '모공•탄력', age: '20대',
        title: '결정리 잘돼요',
        body: '피부 열감 낮추고 산뜻하게 수분 채우기 좋은 토너입니다! 화장솜에 듬뿍 적셔서 토너팩으로 활용하면 피붓결도 매끄러워지고 속당김이 싹 잡혀요. 끈적거리는 잔여감 없이 깔끔하게 수분만 꽉 채워주는 느낌이라 아침저녁으로 부담 없이 쓰고 있습니다. 300ml 본품에 100ml 추가 증정이라 아낌없이 활용하기 너무 좋네요!',
        preview: '피부 열감 낮추고 산뜻하게 수분 채우기 좋은 토너입니다! 화장솜에 듬뿍 적셔서 토너팩으로 활용하면 피붓결도 매끄러워지고 속당김이 싹 잡혀요. 끈적거리는 잔여감 없이 깔끔하게 수분만 꽉 채워주는 느낌이라 아침저녁으로 부담 없이 쓰고 있습니다. 300ml 본품에 100ml 추가 증정이...',
        photo: tremellaTonerPhotos[1],
      },
      {
        id: 'baekmogi-toner-3', nickname: 'xiaopppo', date: '2026-10-07', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '싸게 잘 샀어요',
        body: '좋어요 저렴한 가갹격에 세일해서 구매했어요 항상 잘 쓰고있는제품이에용',
        photo: tremellaTonerPhotos[2],
      },
    ],
  },
  'baekmogi-mask': {
    productId: 'baekmogi-mask', productName: '백목이 수분 베일 마스크팩',
    totalReviews: 88, rating: 4.9, reviewCount: 88, photoReviewCount: 30, viewCount: 5689,
    ratingDistribution: { 5: 80, 4: 5, 3: 3, 2: 0, 1: 0 },
    photoReviews: tremellaMaskPhotos,
    reviews: [
      {
        id: 'baekmogi-mask-1', nickname: '몽몽냥냥', date: '2026-10-25', rating: 5,
        skinType: '건성', concern: 'elasticity', concernLabel: '주름', age: '20대',
        title: '선물용으로 딱좋아요',
        body: '외국인 친구들 선물용으로 K-뷰티 다들 좋아해서 구매한건데 다들 만족했고 밀착력도 좋고 사용후에 피부 컨디션도 좋고 해서 다들 좋아하더라고요. 선물용으로 부담없이 나눠주기 좋아요',
        photo: tremellaMaskPhotos[0],
      },
      {
        id: 'baekmogi-mask-2', nickname: 'DdGg', date: '2026-10-18', rating: 5,
        skinType: '수부지', concern: 'tone', concernLabel: '잡티•주름', age: '30대',
        title: '속건조 잘 잡아줘요',
        body: '한 달 동안 피부가 건조하게 느껴질 때마다 하나씩 꺼내 사용했는데 촉촉한 스킨케어를 간단하게 하고 싶을 때 편했어요. 세안 후 토너로 가볍게 피부결을 정돈한 뒤 시트를 얼굴에 밀착시키고 잠시 쉬어주면 되어서 저녁에 사용하기 좋았어요. 떼어낸 뒤 남아 있는 에센스를 얼굴과 목에 가볍게 펴 발라주니 피부가 촉촉하게 정돈된 느낌이 들었어요. 특히 건조해서 베이스 메이크업이 들뜨는 것 같은 날 전날 사용하면 피부결을 부드럽게 준비하는 데 도움이 되는 느낌이었어요. 10+1 구성이라 여러 장을 넉넉하게 사용할 수 있고, 피부가 건조할 때 부담 없이 꺼내 쓰기 좋은 기본 수분팩으로 만족했어요.',
        preview: '한 달 동안 피부가 건조하게 느껴질 때마다 하나씩 꺼내 사용했는데 촉촉한 스킨케어를 간단하게 하고 싶을 때 편했어요. 세안 후 토너로 가볍게 피부결을 정돈한 뒤 시트를 얼굴에 밀착시키고 잠시 쉬어주면 되어서 저녁에 사용하기 좋았어요. 떼어낸 뒤 남아 있는 에센스를 얼굴과 목에 가...',
        photo: tremellaMaskPhotos[1],
      },
      {
        id: 'baekmogi-mask-3', nickname: 'gan토', date: '2026-10-15', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '자극없어요 굿',
        body: '자극 없고 수분 충전용으로는 가격대비 진짜 좋은 것 같아요 세일할때 왕창 샀습니다',
        photo: tremellaMaskPhotos[2],
      },
    ],
  },
  'baekmogi-ampoule':
    {
      "productId": "baekmogi-ampoule",
      "productName": "백목이 수분 농축 앰플",
      "totalReviews": 30,
      "rating": 4.9,
      "reviewCount": 30,
      "photoReviewCount": 5,
      "viewCount": 1080,
      "ratingDistribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 2,
        "5": 28
      },
      "photoReviews": tremellaAmpoulePhotos,
      "reviews": [
        {
          "id": "baekmogi-ampoule-1",
          "nickname": "룰랑",
          "date": "2026-09-17",
          "rating": 5,
          "skinType": "건성",
          "concern": "tone",
          "concernLabel": "미백•주름",
          "age": "20대",
          "title": "제형이 좋아요",
          "body": "묽은 세럼 제형이라 피부에 올렸을 때 가볍게 펴 발리고 흡수도 빠른 편이라 아침 저녁으로 사용하기 좋았어요. 60ml라 세럼치고 용량도 넉넉한 편이라 꾸준히 사용하기 좋았고 다른 스킨케어 제품과 함께 레이어링하기에도 편해서 데일리 세럼으로 만족스러웠어요",
          "preview": "묽은 세럼 제형이라 피부에 올렸을 때 가볍게 펴 발리고 흡수도 빠른 편이라 아침 저녁으로 사용하기 좋았어요. 60ml라 세럼치고 용량도 넉넉한 편이라 꾸준히 사용하기 좋았고 다른 스킨케어 제품과 함께 레이어링하기에도 편해서 데일리 세럼으로 만족스러웠어요...",
          "photo": tremellaAmpoulePhotos[0]
        },
        {
          "id": "baekmogi-ampoule-2",
          "nickname": "쬬포도",
          "date": "2026-08-27",
          "rating": 5,
          "skinType": "민감성",
          "concern": "sensitive",
          "concernLabel": "각질•트러블",
          "age": "20대",
          "title": "저아요...",
          "body": "ㅈㅉ 너무 좋음 쓴지 3일만에 피부 모찌 떡 됨… 밀린다는 분들은 잘못 바르고 있는 거예여 수분 세럼 한번 바르고 미스트 듬~뿍 뿌린 후 나이아신 아마이드 세럼 얼굴 전체에 3방울 정도 문지르면서 바르는게 아니라 스파츌러로 파데 올리듯 얼굴에 스윽 스윽 올리기만 하세요 그리고 피부에 다 올렸으면 문지르지 말고 그대로 손바닥으로 톡톡톡 짭짭짭(그렇다고 미.친듯이 파바박 X 손바닥으로 피부에 넣는다는 느낌으로 살살 짭짭짭) 두드려서 흡수하고 선풍기로 1분정도 말린 뒤에 크림 바르세용 크림도 절대 문지르지 말고 똑같이 손바닥으로 톡톡짭짭 바르면 다음날 애기 모찌떡이 됩니다~ 밀리는 분들 이 방법 츄라이하세요. 오빠 한 번 믿어봐~ 아 근데 입술엔 안 묻게 바르는게 좋을 듯 입술 건조해져용 ㅜㅜ",
          "preview": "ㅈㅉ 너무 좋음 쓴지 3일만에 피부 모찌 떡 됨… 밀린다는 분들은 잘못 바르고 있는 거예여 수분 세럼 한번 바르고 미스트 듬~뿍 뿌린 후 나이아신 아마이드 세럼 얼굴 전체에 3방울 정도 문지르면서 바르는게 아니라 스파츌러로 파데 올리듯 얼굴에 스윽 스윽 올리기만 하세요 그리고 피부에 다 올렸으...",
          "photo": tremellaAmpoulePhotos[1]
        },
        {
          "id": "baekmogi-ampoule-3",
          "nickname": "이다곰",
          "date": "2026-08-31",
          "rating": 5,
          "skinType": "복합성",
          "concern": "tone",
          "concernLabel": "잡티",
          "age": "30대",
          "title": "만족해용",
          "body": "반정도 썼네요 거의 매일 사용한 거 같은 데 소량 사용해도 진짜 충분 하더라구요. 처음에 자극적이라는 후기들이 좀 있어서 걱정했는데 솔직히 저는 민감성피부인데도 자극적인 거 못 느꼈어요. 한두 방울 정도 사용해도 충분한 거 같거든요. 많이 바르면 상당히 밀립니다 각질처럼 때처럼 밀려 나와서 소량 바르는 게 더 좋아요. 확실히 좀 피부가 투명해 지고 결이 개선 되는 느낌은 있어요.재구매의사 있슴다",
          "preview": "반정도 썼네요 거의 매일 사용한 거 같은 데 소량 사용해도 진짜 충분 하더라구요. 처음에 자극적이라는 후기들이 좀 있어서 걱정했는데 솔직히 저는 민감성피부인데도 자극적인 거 못 느꼈어요. 한두 방울 정도 사용해도 충분한 거 같거든요. 많이 바르면 상당히 밀립니다 각질처럼 때처럼 밀려 나와서 소...",
          "photo": tremellaAmpoulePhotos[2]
        }
      ]
    },
  'baekmogi-pad': {
    productId: 'baekmogi-pad', productName: '백목이 커스텀 핏 패드',
    totalReviews: 51, rating: 4.9, reviewCount: 51, photoReviewCount: 8, viewCount: 3115,
    ratingDistribution: { 5: 43, 4: 6, 3: 2, 2: 0, 1: 0 },
    photoReviews: padPhotos,
    reviews: [
      {
        id: 'baekmogi-pad-1', nickname: '0happy', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '쓰기편해요',
        body: '항상 사용하고 있고 다 써가서 추가구매했네요. 토너팩으로 붙이고 있기 좋아욥',
        photo: padPhotos[0],
      },
      {
        id: 'baekmogi-pad-2', nickname: '터엉장', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '30대',
        title: '밀착이 잘돼요',
        body: '앰플양 넉넉하게 많고 두께는 엄청 슬림해서 팩처럼 착붙 올리기 조아용 수분감도 정말 오래가용 만족합니당',
        photo: padPhotos[1],
      },
      {
        id: 'baekmogi-pad-3', nickname: 'pjm23***', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '쿨링감굿',
        body: '넘 아랑스러운 템입니다아 ㅎㅅㅎ 피부 열감도 싹 줄여주는 느낌도 들고 화장하기전에 사용하기에도 좋아요',
        photo: padPhotos[2],
      },
    ],
  },
  'baekmogi-cream': {
    productId: 'baekmogi-cream', productName: '백목이 수분 잠금 크림',
    totalReviews: 20, rating: 4.9, reviewCount: 20, photoReviewCount: 4, viewCount: 2218,
    ratingDistribution: { 5: 17, 4: 2, 3: 1, 2: 0, 1: 0 },
    photoReviews: baekmogiCreamPhotos,
    reviews: [
      {
        id: 'baekmogi-cream-1', nickname: '김온결', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '여름에도 부담 없어요',
        body: '자극 별로 없고 순하고 좋아요. 2개월 사용하고 적는 후기입니다.',
        photo: baekmogiCreamPhotos[0],
      },
      {
        id: 'baekmogi-cream-2', nickname: '치이카와', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '30대',
        title: '패드가 촉촉해서 사용하기 편해요',
        body: '지성피부라 끈적이지않아서 좋고, 유통기한도 기네요~ 쿠폰까지 먹여서 저렴하게 잘 구입했습니당',
        photo: baekmogiCreamPhotos[1],
      },
      {
        id: 'baekmogi-cream-3', nickname: '신짱구', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '건조할 때 바르면 촉촉함이 오래가요',
        body: '손등에 덜어서 발라보면 부드럽게 슥 펴지고 흡수도 빠른 편이라 여러번 덧발라도 밀리는 느낌이 거의 없어요. 바른 직후에는 피부에 수분감이 꽉 채워진 느낌인데 그렇다고 끈적거리지는 않아서 아침 메이크업 전에 사용하기에도 부담이 없어용 ㅎㅎㅎ',
        photo: baekmogiCreamPhotos[2],
      },
    ],
  },
  'odi-cream': {
    productId: 'odi-cream', productName: '오디 보습 크림',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: creamPhotos,
    summaryPhotos: [creamPhotos[0], creamPhotos[1], creamPhotos[3], creamPhotos[2]],
    reviews: [
      {
        id: 'odi-cream-1', nickname: '아아아악', date: '2026-09-17', rating: 4,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '보습감이 딱 적당해요',
        body: '건조해서 크림을 이것저것 써보다가 사용해봤어요. 너무 리치한 제품은 답답해서 잘 못 쓰는데 이건 부담스럽지 않더라고요. 적당히 촉촉하면서 피부를 편안하게 감싸주는 느낌이고, 바른 뒤에도 무겁게 남지 않아서 아침저녁으로 잘 사용하고 있어요.',
        photo: creamPhotos[0],
      },
      {
        id: 'odi-cream-2', nickname: '훙냥냥', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '기대했던 것보다 만족스러워요',
        body: '처음 구매해본 제품이라 큰 기대 없이 사용하기 시작했는데 생각보다 괜찮았어요. 발림성이 부드럽고 소량만 사용해도 얼굴 전체에 잘 펴 발려요. 마무리도 깔끔한 편이라 다른 기초 제품이랑 같이 사용하기 좋았고, 전체적인 사용감이 마음에 들어 꾸준히 써보려고 해요.',
        photo: creamPhotos[2],
      },
      {
        id: 'odi-cream-3', nickname: '웅엥웅', date: '2026-09-16', rating: 4,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '피부가 매끈해 보여요',
        body: '요즘 피부가 푸석해서 화장할 때마다 신경 쓰였는데 크림 바르고 나면 한결 나아 보여요. 특히 볼 부분이 촉촉하게 정돈되면서 피부결도 매끈해 보이는 느낌이에요. 과하게 번들거리는 광이 아니라 자연스럽게 윤기가 돌아서 마음에 들고, 메이크업 전에 발라도 부담스럽지 않아 자주 사용하고 있어요.',
        photo: creamPhotos[4],
      },
    ],
  },
  'odi-ampoule': {
    productId: 'odi-ampoule', productName: '오디 토탈 앰플',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: ampoulePhotos,
    summaryPhotos: [ampoulePhotos[0], ampoulePhotos[1], ampoulePhotos[4], ampoulePhotos[5]],
    reviews: [
      {
        id: 'odi-ampoule-1', nickname: '아아아악', date: '2026-09-17', rating: 4,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '보습감이 꽤 만족스러워요',
        body: '수분감 있는 제품 찾다가 사용해봤는데 발랐을 때 촉촉하게 피부를 감싸주는 느낌이 좋았어요. 제형도 너무 무겁지 않고 부드럽게 펴 발려서 아침저녁으로 사용하기 부담 없더라고요. 흡수된 뒤에도 피부가 편안하고 당기는 느낌이 덜해서 요즘 스킨케어할 때 꾸준히 사용하고 있어요.',
        photo: ampoulePhotos[0],
      },
      {
        id: 'odi-ampoule-2', nickname: '훙냥냥', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '기대했던 것보다 손이 자주 가요',
        body: '처음에는 디자인이 예뻐서 눈에 들어왔는데 사용해보니 사용감도 생각보다 마음에 들었어요. 펌프 타입이라 필요한 만큼 덜어 쓰기 편하고 끈적임이 심하지 않아서 다른 기초 제품이랑 같이 쓰기도 좋아요. 화장대에 두고 아침저녁으로 챙겨 바르다 보니 어느새 자주 사용하는 제품 중 하나가 됐네요.',
        photo: ampoulePhotos[1],
      },
      {
        id: 'odi-ampoule-3', nickname: '웅엥웅', date: '2026-09-16', rating: 4,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '피부가 촉촉해 보이는 게 좋아요',
        body: '요즘 피부가 건조해서 화장할 때 들뜨는 게 신경 쓰였는데 이거 바르고 나면 피부에 수분감이 더해지는 느낌이에요. 특히 볼처럼 쉽게 건조해지는 부분에 신경 써서 발라주고 있어요. 바른 뒤 피부에 은은하게 윤기가 돌아서 피부가 전체적으로 좀 더 촉촉하고 매끈해 보여요. 과하게 번들거리는 느낌은 아니라 데일리로 쓰기 괜찮았어요.',
        photo: ampoulePhotos[4],
      },
    ],
  },
  'odi-toner': {
    productId: 'odi-toner', productName: '오디 수분 토너',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: tonerPhotos,
    reviews: [
      {
        id: 'odi-toner-1', nickname: '김시온', date: '2026-09-17', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '가볍게 흡수되는데 촉촉함은 오래가요',
        body: '묽은 토너는 금방 마르는 느낌 때문에 잘 안 쓰는 편인데 이 제품은 피부에 가볍게 흡수되면서도 촉촉함이 꽤 오래 남아요. 손으로 몇 번 두드려 흡수시키면 피부결도 매끈하게 정돈되고 겉도는 느낌이나 답답함이 거의 없어서 데일리로 사용하기 편해요. 스킨케어 첫 단계로 잘 쓰고 있습니다.',
        photo: tonerPhotos[0],
      },
      {
        id: 'odi-toner-2', nickname: '철수', date: '2026-09-17', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '순하고 편안해서 매일 쓰기 좋아요',
        body: '피부가 쉽게 푸석해지고 예민해질 때가 있어서 자극 없이 사용할 수 있는 토너를 찾다가 써봤어요. 제형이 가볍고 부드럽게 흡수돼서 부담이 적고 건조하게 느껴지는 부분에는 한 번 더 덧발라주면 촉촉해져요. 사용 후 피부가 편안하고 매끈해지는 느낌이라 마음에 들어요.',
        photo: tonerPhotos[2],
      },
      {
        id: 'odi-toner-3', nickname: '가영이', date: '2026-09-16', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '세안 후 당김이 덜해요',
        body: '세안하고 나면 피부가 금방 당기고 건조해지는 편인데 이 토너를 바르면 피부가 한결 촉촉하고 편안해져요. 워터 타입이라 가볍게 펴 발리는데도 수분감이 금방 사라지지 않고 여러 번 덧발라도 끈적임이 거의 없어서 좋았어요. 아침저녁으로 부담 없이 사용하기 좋은 토너예요',
        photo: tonerPhotos[3],
      },
    ],
  },
  'odi-cleansing-balm': {
    productId: 'odi-cleansing-balm', productName: '오디 클렌징밤',
    totalReviews: 415, rating: 4.9, reviewCount: 415, photoReviewCount: 11, viewCount: 42218,
    // Reference values are intentionally preserved, including the distribution's 445 total.
    ratingDistribution: { 5: 398, 4: 24, 3: 16, 2: 5, 1: 2 },
    photoReviews: balmPhotos,
    reviews: [
      {
        id: 'odi-balm-1', nickname: '빤쮸토낑', date: '2026-10-26', rating: 5,
        skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대',
        title: '밤인데도 부드럽고 순해요 굿',
        body: '몇 통째인지 모를 정도로 또 재구매했어요♡ 클렌징 제품은 잘 맞는 거 찾으면 쉽게 못 바꾸는 편인데 오디폼은 역시 다시 돌아오게 되네요ㅎㅎ 처음에는 꾸덕하고 부드러운 제형인데 얼굴에 롤링하면 사르르 녹으면서 메이크업을 부드럽게 풀어줘요. 물을 살짝 묻혀 마사지하면 폼처럼 변해서 세안까지 한 번에 가능! 특히 코 옆이나 턱처럼 피지랑 노폐물이 신경 쓰이는 부분은 조금 더 꼼꼼하게 롤링해주면 세안 후 매끈해진 느낌이라 만족스러워요♡ 무엇보다 씻고 난 뒤 너무 뽀득하거나 당기는 느낌이 적고 피부가 촉촉하고 보들보들하게 마무리되는 점이 제 취향이에요.',
        // Figma shows an excerpt; retain the original body separately without enlarging the cards.
        preview: '몇 통째인지 모를 정도로 또 재구매했어요♡ 클렌징 제품은 잘 맞는 거 찾으면 쉽게 못 바꾸는 편인데 오디폼은 역시 다시 돌아오게 되네요ㅎㅎ 처음에는 꾸덕하고 부드러운 제형인데 얼굴에 롤링하면 사르르 녹으면서 메이크업을 부드럽게 풀어줘요. 물을 살짝 묻혀 마사...',
        photo: balmPhotos[0],
      },
      {
        id: 'odi-balm-2', nickname: '모모스무디', date: '2026-10-23', rating: 5,
        skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '40대',
        title: '클렌징 효과도 확실한데 진정도 돼용',
        body: '평소에 세안하고 나면 얼굴이 찢어질 듯이 당겨서 클렌징 제품 고를 때 진짜 까다로운 편인데요. 이건 밤 제형으로 부드럽게 문질러서 메이크업 녹여주고 물 묻히면 바로 거품으로 변해서 씻어내기가 너무 편하더라구요. 따로 2차 세안 안 해도 지저분한 노폐물이나 메이크업 잔여물이 싹 씻겨 내려가는게 세정력도 좋더라구요.  무엇보다 세안 끝나고 물기 닦아냈을 때 얼굴이 바짝 마르는 느낌 없이 보들보들 촉촉하게 남아있는 게 제일 좋네요.',
        preview: '평소에 세안하고 나면 얼굴이 찢어질 듯이 당겨서 클렌징 제품 고를 때 진짜 까다로운 편인데요. 이건 밤 제형으로 부드럽게 문질러서 메이크업 녹여주고 물 묻히면 바로 거품으로 변해서 씻어내기가 너무 편하더라구요. 따로 2차 세안 안 해도 지저분한 노폐물이...',
        photo: balmPhotos[1],
      },
      {
        id: 'odi-balm-3', nickname: '시로흰둥이몽몽', date: '2026-10-20', rating: 5,
        skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '10대',
        title: '좋은 향도 나서 사용할때기분이 좋아용ㅎㅎ',
        body: '피부에 닿자마자 스르륵 녹아 메이크업과 모공 속 노폐물까지 깔끔하게 지워줘 다른게필요없어요! 물을 묻히면 거품으로 변해 2차 세안 필요 없이 개운하게 마무리되는 점이 제일 편하고 좋더라구요 사용 후에도 당김 없이 촉촉하고, 기획 구성으로 들어있는 미니 밤 3개는 여행용으로 챙겨 다니기 딱 좋아 계속 쓰고있어요 다쓰고 또 재구매할게요',
        preview: '피부에 닿자마자 스르륵 녹아 메이크업과 모공 속 노폐물까지 깔끔하게 지워줘 다른게필요없어요! 물을 묻히면 거품으로 변해 2차 세안 필요 없이 개운하게 마무리되는 점이 제일 편하고 좋더라구요 사용 후에도 당김 없이 촉촉하고, 기획 구성으로 들어있는 미니 밤 3개는 여행용으로...',
        photo: balmPhotos[2],
      },
    ],
  },
  'odi-mask': {
    productId: 'odi-mask', productName: '오디 진정 마스크팩',
    totalReviews: 415, rating: 4.9, reviewCount: 356, photoReviewCount: 84, viewCount: 4565,
    ratingDistribution: { 5: 348, 4: 6, 3: 2, 2: 0, 1: 0 },
    photoReviews: photos,
    reviews: [
      { id: 'odi-1', nickname: '냥녕뇽', date: '2026-10-28', rating: 5, skinType: '건성', concern: 'pore', concernLabel: '모공•피지', age: '20대', title: '부담없이 쓰기 좋아요', body: '부드러운 시트 덕분에 피부에 자극 없이 사용할 수 있었어요. 밀착력이 좋아 들뜨지 않았고, 사용 후에는 촉촉하고 편안한 마무리감이 마음에 들었습니다. 데일리 케어용으로 괜찮아요.', photo: photos[0] },
      { id: 'odi-2', nickname: '하치와레', date: '2026-10-26', rating: 5, skinType: '수부지', concern: 'elasticity', concernLabel: '주름•탄력', age: '10대', title: '밀착이 잘되네요', body: '피부가 보들보들해지는 느낌이 들고 다음날 화장이 잘 먹는거 같아서 자주 사용하고 있어요 온결 팩들은 다 기능이 좋은거 같아요', photo: photos[1] },
      { id: 'odi-3', nickname: '우사기만세', date: '2026-10-15', rating: 5, skinType: '민감성', concern: 'sensitive', concernLabel: '수부지', age: '40대', title: '열감이 금방 내려가고 피부 진정돼요', body: '자극적인건 아니고요 걱정마세용~ 팩을 이틀정도 연속으로 하면 피부결이 너무 매끈거리고 화장이 촵촵 잘 먹어요~~! ^^', photo: photos[2] },
      ...additionalFixtures,
    ],
  },
}

// The brief's example ID and the existing catalog ID resolve to the same data.
reviewPages['mulberry-mask'] = reviewPages['odi-mask']
