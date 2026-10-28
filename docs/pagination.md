# 공통 페이지네이션

- 컴포넌트: `src/components/Pagination.jsx`
- 디자인 CSS: `src/components/Pagination.css`
- Figma: https://www.figma.com/design/lGtJn9ydJEJCEq0cH1dkVI/ONGYEOL?node-id=3045-7746

새 Figma 기준으로 숫자 크기 17px, 숫자 사이 간격 30px, 화살표와 숫자 묶음 사이 간격 20px를 적용했습니다. 화살표는 24px 프레임 안의 6×13px 삼각형이며, 클릭 영역은 44×44px로 확장했습니다. 화살표와 숫자는 세로 중앙 정렬합니다. 기존 500 굵기·Noto Sans KR 글꼴·선택 #000·나머지 #777 및 이동 기능은 유지했습니다. 모바일에서는 숫자 사이 간격 20px, 화살표와 숫자 묶음 사이 간격 12px로 조절하고 필요 시 숫자 묶음을 줄바꿈해 넘침을 방지합니다.

## 사용법

`src/pages`의 페이지에서:

```jsx
import { useState } from 'react'
import Pagination from '../components/Pagination.jsx'

export default function Example({ totalPages }) {
  const [page, setPage] = useState(1)
  const currentPage = Math.max(1, Math.min(page, totalPages || 1))

  return <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setPage}
    label="검색 결과 페이지"
    maxVisiblePages={5}
  />
}
```

`currentPage`는 현재 페이지, `totalPages`는 전체 페이지 수, `onPageChange`는 다음 페이지 번호를 받는 콜백입니다. `label`은 내비게이션 접근성 이름입니다. `maxVisiblePages`의 기본값은 5이며, 번호를 1~5·6~10처럼 묶어 표시합니다. 모든 번호를 표시하려면 `maxVisiblePages={totalPages}`를 지정합니다. 이전·다음은 한 페이지씩 이동합니다. 0페이지일 때는 표시하지 않으며, 입력 페이지가 범위를 벗어나면 유효 범위로 표시를 제한합니다. 부모 상태를 자동 변경하지 않으므로 데이터 조회·필터링·상태 보정은 페이지에서 담당합니다.

## 적용 위치

- `src/pages/Products.jsx`: 제품유형·핵심라인·피부고민 상품 목록
- `src/pages/Wishlist.jsx`: 찜 목록
- `src/pages/Review/Review.jsx`: 고객 리뷰 목록
- `src/pages/Event.jsx`: 진행중 이벤트 및 세일상품

각 페이지의 기존 목록 크기·필터·URL·스크롤 이동 동작을 유지했습니다. 페이지별 CSS에는 위쪽 배치 여백만 남겼고, 버튼 디자인은 모두 공통 CSS에서 관리합니다. 홈의 배너·라인 슬라이드 점 표시와 포토 갤러리는 데이터 목록 페이지 이동이 아니므로 교체하지 않았습니다. 마이페이지에는 번호 기반 페이지네이션이 없어 새로 추가하지 않았습니다.

## 검증

- 빌드·린트·`git diff --check` 통과. 기존 테스트 9개 통과.
- 실제 페이지에서 첫·중간·마지막 선택 표시와 이전·다음 경계 비활성화를 확인했습니다.
- 상품 분류 변경 시 1페이지 복귀 및 URL 쿼리 유지, 찜 마지막 페이지 삭제 시 페이지 보정, 리뷰 필터 변경 시 1페이지 복귀를 확인했습니다.
- 데스크탑·768px·390px·320px에서 공통 폰트·선택 색상·버튼 겹침 여부를 확인했습니다.
- 브라우저에서 공통 컴포넌트를 별도로 렌더링해 12페이지의 6~10 번호 묶음, 양방향 콜백, 마지막 페이지 제한, 7페이지에서 전체 2페이지로 감소했을 때의 표시 보정, 전체 0페이지 숨김을 확인했습니다.

이후 버튼 크기·간격·색상·폰트 등 디자인은 `src/components/Pagination.css`, 버튼 표시와 이동 요청 로직은 `src/components/Pagination.jsx`를 수정하면 적용한 모든 페이지에 반영됩니다.
