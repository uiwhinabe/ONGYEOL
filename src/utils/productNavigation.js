export function readProductRoute() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const classification = params.get('classification') || 'type'
  return {
    classification: ['type', 'concern', 'line'].includes(classification) ? classification : 'type',
    category: params.get('category') || undefined,
  }
}

export function navigateToProducts(classification, category) {
  window.location.hash = `/products?${new URLSearchParams({ classification, category })}`
  window.scrollTo({ top: 0, behavior: 'auto' })
}
