# 공통 상품 및 쇼핑 상태 연동

상품 목록의 `src/data/products.js`를 기준으로 이름·이미지·가격·할인율·배지를 사용합니다. 가격 계산은 `utils/productPricing.js`, 표시 컴포넌트는 `components/ProductPrice.jsx`, 주문 합계·배송비 계산은 `utils/orderPricing.js`입니다.

## 변경 파일

- `data/products.js`: 기존 상품 ID·분류·가격 유지, 기본 찜 상태 제거, 할인 계산 통일.
- `services/wishlistStore.js`: 공통 찜·장바구니 저장, 사용자 분리, 기존 데이터 이전, 잘못된 데이터 제외.
- `services/cartRecommendations.js`: 전체 상품에서 최대 5개 선정, 장바구니 제외, 새로고침 유지와 재진입 갱신.
- `services/orderStore.js`: 사용자별 진행 주문 및 모의 완료 주문 저장.
- `components/AuthProvider.jsx`, `pages/Login.jsx`, `App.jsx`: 기존 데모 인증 연결 및 접근 제한.
- `components/ProductCard.jsx`, `ProductPrice.jsx/.css`, `ProductBadge.jsx`: 찜·가격·배지 공통 표시.
- `pages/Home.jsx`, `Event.jsx`, `ProductDetail.jsx`, `Wishlist.jsx`: 공통 상품 참조 및 실제 상세 경로 연결.
- `pages/Cart.jsx/.css`: 저장 상태 조작, 추천·가격 반응형 표시, 선택 상품 주문 전달.
- `pages/Checkout.jsx`, `Payment.jsx`, `OrderComplete.jsx`: 실제 주문 상품 표시·복원, 모의 결제 완료 수량 차감.
- `services/wishlistStore.test.js`, `scripts/test-assets-loader.mjs`: 상품 이미지 import를 지원하는 상태·추천·주문 테스트.

## 기존 화면 대비 정정

- 상세의 닥열매 패드 32,400원 → 목록 기준 32,000원. 닥열매·오디 등 상세의 별도 상품명도 목록 기준으로 통일.
- 홈 백목이 패드 28,000원은 유지하되, 정상가 35,000원·20% 할인 표시 제거.
- 홈 백목이 크림 20,800원 → 32,000원, 백목이 앰플 22,400원 → 29,000원. 두 상품의 가상 할인 제거.
- 장바구니의 가상 백목이 크림 20,800원과 고정 초기 상품 제거. 추천의 백목이 앰플·패드 가상 할인 제거.
- 이벤트 가상 상품 6개를 실제 할인 중인 상품으로 교체.
- 상세 무료배송 안내 40,000원 → 기존 장바구니·결제 정책인 50,000원으로 일치.

## 보존 및 확인 필요

기존 `ongyeol.shopping.v1`과 상품별 명시적 찜 값은 원래 데모 계정으로 이전합니다. 기본으로 켜져 있던 하트는 이전하지 않습니다. 기존 ID 중 `wood-ampoule`, `wood-pad`, `vitamin-cleansing`, `vitamin-cream`, `vitamin-lotion`은 대응하는 실제 ID로 이전합니다. `refit-pad` 등 대응이 확인되지 않는 ID는 임의 대체하지 않고 화면에서 제외하며 원본 저장값은 보존합니다.

현재 인증은 단일 데모 계정입니다. 사용자 키별 저장 분리는 구현했지만 실제 다중 계정 인증 API는 없습니다. 상품 옵션 정의도 없으므로 기본 상품 단위로 연결하고 알 수 없는 옵션은 제외합니다. 피부고민 태그는 기존 데이터에 잠정 분류라고 명시되어 있어 확정 매핑 확인이 필요합니다. 홈의 미확정 개별 상품 시안은 라인별 실제 상품 ID 추천으로 대체했습니다.

Figma 데스크탑·중간·최소 너비 노드를 조회하고 기존 1024px/540px 기준을 사용했습니다. 브라우저 자동화 도구가 설치되어 있지 않아 실제 클릭·스와이프·픽셀 배치와 모든 중간 너비는 직접 확인하지 못했습니다. 상세 설명 이미지 안의 문구·금액은 이미지 원본이므로 별도 수정하지 않았습니다. 실제 결제 서비스는 연결하지 않았습니다.

## 검증

`npm.cmd run build`, `npm.cmd run lint` 통과. 기존 미리보기 3개 및 신규 쇼핑 상태 6개 테스트 통과:

```sh
node --loader ./scripts/test-assets-loader.mjs --test src/services/wishlistStore.test.js src/data/wishlistPreview.test.js
```

상품 ID·가격 일관성, 찜 저장·해제, 사용자 전환·로그아웃, 수량 병합·선택 저장, 주문 복원·부분 차감, 배송비 경계값, 손상 데이터, 추천 유지·보충·재진입·후보 부족을 검증합니다. 빌드의 기존 대용량 청크 경고는 남아 있습니다.
