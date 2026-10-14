export function readProductRoute() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const classification = params.get('classification') || 'type'
  return {
    isProducts: window.location.hash.split('?')[0] === '#/products',
    productId: params.get('productId') || undefined,
    classification: ['type', 'concern', 'line'].includes(classification) ? classification : 'type',
    category: params.get('category') || undefined,
  }
}

export function navigateToHome() {
  window.location.hash = '/'
  window.scrollTo({ top: 0, behavior: 'auto' })
}

// Image and name links share the same product identifier.
export function getProductDetailHref(productId) {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  params.set('productId', productId)
  return `#/products?${params}`
}

export function navigateToProducts(classification, category) {
  window.location.hash = `/products?${new URLSearchParams({ classification, category })}`
  window.scrollTo({ top: 0, behavior: 'auto' })
}
