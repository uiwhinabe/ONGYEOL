// Product content supplied by the project owner; no diagnosis or skin-type inference.
// Existing Figma ingredient descriptions take precedence where available.
export const concernIngredients = {
  '민감 · 진정': { name: '어성초', description: '진정 · 피부 컨디셔닝' },
  '수분·보습': { name: '히알루론산', description: '수분 충전 · 보습' },
  '모공·피지': { name: '나이아신아마이드', description: '과도한 피지로 고민되는 피부의 유분 밸런스와 피부결을 관리해 줍니다.' },
  '피부톤·잡티': { name: '비타민 C', description: '칙칙한 피부톤을 맑고 균일하게 가꾸는 데 도움을 줍니다.' },
  '주름·탄력': { name: 'PDRN', description: '피부의 보습과 탄력 케어에 도움을 주어 건강한 피부결로 가꿔줍니다.' },
}

export function getIngredients(concerns) {
  const unique = new Map()
  for (const concern of concerns) {
    const ingredient = concernIngredients[concern]
    if (ingredient) unique.set(ingredient.name, ingredient)
  }
  return [...unique.values()]
}
