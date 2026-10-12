export const skinTypes = [
  { id: 'dry', label: '건성' },
  { id: 'oily', label: '지성' },
  { id: 'combination', label: '복합성' },
  { id: 'sensitive', label: '민감성' },
  { id: 'normal', label: '중성' },
]

// Each paragraph is an array of lines; additional lines render as explicit breaks.
// Add other types under their skinTypes id when their approved copy is available.
export const skinGuideData = {
  dry: {
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
    title: '피지·번들거림 고민을 선택하셨네요 🌿',
    paragraphs: [
      ['피부가 쉽게 번들거리거나 유분이 많고, 화장이 쉽게 무너지는 경우 피지 관리가 필요한 상태일 수 있어요.'],
      ['피지를 없애기 위한 잦은 세안은 피부에 부담을 줄 수 있어, 부드러운 세안과 가벼운 수분 관리가 필요해요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '유분이 많은 피부에는 수분을 채우고 피지 균형을 관리해 주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '나이아신아마이드 — 피부 유분 관리에 도움을 줘요',
        '히알루론산 — 피부에 수분을 공급해요',
        '판테놀 — 피부 장벽을 편안하게 보호해요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  combination: {
    title: '유수분 균형 고민을 선택하셨네요 ⚖️',
    paragraphs: [
      ['이마와 코는 쉽게 번들거리지만, 볼이나 입 주변은 당기는 경우 부위마다 다른 피부 관리가 필요할 수 있어요.'],
      ['피부 부위마다 유분과 수분의 상태가 달라, 건조한 곳은 보습을 더하고 번들거리는 곳은 가볍게 관리해 주세요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '유수분 균형이 다른 피부에는 수분을 채우고 부위별 보습을 도와주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '히알루론산 — 피부에 수분을 공급해요',
        '나이아신아마이드 — 피부 유분 관리에 도움을 줘요',
        '세라마이드 — 수분이 빠져나가지 않도록 도와줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  sensitive: {
    title: '자극·민감함 고민을 선택하셨네요 🍃',
    paragraphs: [
      ['피부가 쉽게 붉어지거나 따갑고, 작은 변화에도 불편함이 느껴지는 경우 자극을 줄이는 관리가 필요할 수 있어요.'],
      ['온도 변화, 마찰, 화장품 등의 영향으로 피부가 예민해질 수 있어, 순한 보습 관리로 편안하게 돌봐 주세요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '자극에 민감한 피부에는 수분을 채우고 피부 장벽을 보호해 주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '판테놀 — 피부 장벽을 편안하게 보호해요',
        '알란토인 — 피부를 편안하게 진정시켜 줘요',
        '세라마이드 — 수분이 빠져나가지 않도록 도와줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },

  normal: {
    title: '피부 균형 유지 고민을 선택하셨네요 ✨',
    paragraphs: [
      ['피부가 심하게 당기거나 번들거리지 않고, 대체로 편안하다면 현재의 유수분 균형을 유지하는 관리가 좋아요.'],
      ['계절 변화, 생활 습관, 주변 환경에 따라 피부 상태가 달라질 수 있어, 꾸준한 수분과 보습 관리가 필요해요.'],
    ],
    actionLabel: '내 피부에 필요한 성분 확인하기',
    recommendation: {
      title: '균형이 잡힌 피부에는 수분을 채우고 촉촉한 피부 상태를 유지해 주는 성분이 필요해요.',
      description: '추천 성분은 다음과 같아요.',
      ingredients: [
        '히알루론산 — 피부에 수분을 공급해요',
        '판테놀 — 피부 장벽을 편안하게 보호해요',
        '세라마이드 — 수분이 빠져나가지 않도록 도와줘요',
      ],
      actionLabel: '온결 추천 제품 확인하기',
    },
  },
}
