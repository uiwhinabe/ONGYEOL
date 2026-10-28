# 일반 텍스트 폰트 정리

일반 텍스트의 폰트 순서는 `'Noto Sans KR', 'Noto Sans', sans-serif`입니다. 페이지 및 공통 컴포넌트의 기존 font-family와 font 단축 선언에서 글꼴 부분만 변경했습니다. 기존 글자 크기·굵기·색상·줄간격은 유지했습니다. 버튼·입력창·선택창·textarea·placeholder는 전역에서 font-family를 상속하며, `* !important` 덮어쓰기는 사용하지 않습니다.

`src/fonts.css`에서 Noto Sans KR 400/500/700과 Noto Sans 400/500/600/700을 한 번씩 선언하고 `src/main.jsx`에서 불러옵니다. Footer·Header·AuthFonts·AIChatFonts의 중복 본문 폰트 선언과 더 이상 사용하지 않는 마이페이지 Pretendard/Inter 선언을 제거했습니다. 폰트 파일 자체는 삭제하지 않았습니다.

## 로고 및 아이콘 예외

- `.ongyeol-header-logo`: 기존 `'Ongyeol Noto Serif', serif` 및 400 폰트 선언 유지. 모바일에서도 같은 전용 선택자를 사용합니다.
- `.ongyeol-footer-logo`: 기존 `--ongyeol-footer-serif` 및 `'Ongyeol Footer Noto Serif'` 400/700 선언 유지.
- 결제 화면에 남아 있는 `.checkout-logo`, `.checkout-footer-logo`의 Georgia/Times New Roman 선언 유지.
- 챗봇 텍스트 로고 `.ongyeol-consultation-wordmark`는 기존 상속 폰트를 전용 선택자에 명시했습니다. 이미지 로고·SVG 아이콘·별점 기호용 Arial 설정도 유지했습니다.

## 확인 결과

- CSS·font 단축 선언·font-family 변수·@font-face 및 JSX/JS 인라인 설정을 검색했습니다. 실행 소스 밖의 빌드 산출물과 과거 백업 사본은 수정하지 않았습니다. SCSS/테마의 별도 글꼴 선언은 없었습니다.
- Chrome에서 홈·상품·장바구니·주문·결제·찜·로그인·이벤트·마이페이지를 1440px/390px로 확인했습니다. 확인한 일반 텍스트의 computed font-family는 공통 순서와 일치했습니다.
- CSS Font Loading API로 본문 폰트 7개가 모두 loaded임을 확인했습니다. 브라우저의 실제 렌더링 폰트 조회에서도 장바구니 상품명은 NotoSansKR-Regular, 제목은 NotoSansKR-Bold, 헤더·푸터 로고는 NotoSerif-Regular를 사용했습니다.
- 헤더·푸터 로고의 변경 전후 font-family·굵기·크기·행 높이·치수가 데스크탑/모바일에서 동일했습니다. 모바일 메뉴도 본문 폰트 적용을 확인했습니다.
- 할인·비할인 상품이 함께 담긴 장바구니를 1440/1024/768/390/360px로 확인했습니다. 금액과 원의 줄바꿈, 가격 영역 잘림, 페이지 가로 넘침이 없었으며 데스크탑·모바일 캡처를 확인했습니다.
- 주요 화면의 버튼 텍스트가 영역 안에 표시되는지 확인했습니다. 찜 화면 삭제 버튼의 scrollWidth 차이는 기존 양옆 장식선 때문이며, 텍스트 자체는 버튼 영역 안에 표시됩니다.
- `npm.cmd run build`, `npm.cmd run lint`, `git diff --check` 통과. 빌드의 기존 큰 청크 경고는 유지됩니다.

## 변경 파일

- `src/components/AIchat/AIChatFonts.css`
- `src/components/AIchat/AIConsultation.css`
- `src/components/CartDropdown.css`
- `src/components/Footer.css`
- `src/components/HamburgerDropdown.css`
- `src/components/Header.css`
- `src/components/MemberDropdown.css`
- `src/components/ProductCard.css`
- `src/components/SearchDropdown.css`
- `src/components/ShopDropdown.css`
- `src/components/review/ProductReviewSummary.css`
- `src/fonts.css`
- `src/index.css`
- `src/main.jsx`
- `src/pages/AuthFonts.css`
- `src/pages/Brand.css`
- `src/pages/Cart.css`
- `src/pages/Checkout.css`
- `src/pages/Contact Us.css`
- `src/pages/Event.css`
- `src/pages/EventDetail.css`
- `src/pages/Home.css`
- `src/pages/Mypage/MyPageSummary.css`
- `src/pages/Mypage/Mypage.css`
- `src/pages/Mypage/MypageAddressDetailsTablet.css`
- `src/pages/Mypage/MypageAddressesMobile.css`
- `src/pages/Mypage/MypageAddressesTablet.css`
- `src/pages/Mypage/MypageCouponsMobile.css`
- `src/pages/Mypage/MypageLayout.css`
- `src/pages/Mypage/MypageMobile.css`
- `src/pages/Mypage/MypageOrderStatus.css`
- `src/pages/Mypage/MypageScreens.css`
- `src/pages/Mypage/MypageShoppingMobile.css`
- `src/pages/Mypage/MypageShoppingTablet.css`
- `src/pages/Mypage/MypageSkinMobile.css`
- `src/pages/Mypage/MypageSkinTablet.css`
- `src/pages/Mypage/SkinSettingsMenu.css`
- `src/pages/OrderComplete.css`
- `src/pages/Payment.css`
- `src/pages/ProductDetail.css`
- `src/pages/Products.css`
- `src/pages/Review/Review.css`
- `src/pages/SkinGuide.css`
- `src/pages/Wishlist.css`
