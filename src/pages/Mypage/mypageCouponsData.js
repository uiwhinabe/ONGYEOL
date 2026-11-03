// Display fixtures shared by the coupon list and member summary.
export const mypageCoupons = [
  {
    id: 'signup-coupon',
    issuedOn: '2026-09-03',
    expiresOn: '2026-10-03',
    name: '온결 신규가입 웰컴 쿠폰',
    benefit: '10,000원 할인',
    condition: '30,000원 이상 구매 시',
    applicableProducts: '전 상품',
    validityLabel: '발급일로부터 1개월',
    notices: ['다른 쿠폰과 중복 사용 가능', '일부 프로모션 및 상품에는 적용이 제한될 수 있습니다.'],
  },
  {
    id: 'kakao-coupon',
    issuedOn: '2026-09-06',
    expiresOn: '2026-10-06',
    name: '온결 카카오톡 친구추가 쿠폰',
    benefit: '10,000원 할인',
    condition: '30,000원 이상 구매 시',
    applicableProducts: '전 상품',
    validityLabel: '발급일로부터 30일',
    notices: ['온결 카카오톡 채널 친구추가 시 지급'],
  },
]
