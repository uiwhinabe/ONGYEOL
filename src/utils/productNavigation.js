// Preserve main's menu labels while using the catalog's existing line names.
const lineCategoryAliases = { '오디': '뽕나무', '레몬': '비타민C' }

export function readProductRoute(location = window.location) {
  const legacyProducts = location.hash?.split('?')[0] === '#/products'
  const params = new URLSearchParams(legacyProducts ? location.hash.split('?')[1] || '' : location.search)
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const pathname = base && location.pathname.startsWith(`${base}/`) ? location.pathname.slice(base.length) : location.pathname
  const classification = params.get('classification') || 'type'
  const category = params.get('category') || undefined
  return {
    isProducts: legacyProducts || /^\/products\/?$/.test(pathname),
    productId: params.get('productId') || undefined,
    classification: ['type', 'concern', 'line'].includes(classification) ? classification : 'type',
    category: classification === 'line' ? lineCategoryAliases[category] || category : category,
  }
}

export function navigateToHome(navigate) {
  if (navigate) navigate('/')
  else window.location.assign(import.meta.env.BASE_URL)
  window.scrollTo({ top: 0, behavior: 'auto' })
}

// Image and name links share the same product identifier.
export function getProductDetailHref(productId) {
  const params = new URLSearchParams(window.location.search)
  params.set('productId', productId)
  return `/products?${params}`
}

export function navigateToProducts(classification, category, navigate) {
  const selectedCategory = classification === 'line' ? lineCategoryAliases[category] || category : category
  const target = `/products?${new URLSearchParams({ classification, category: selectedCategory })}`
  if (navigate) navigate(target)
  else window.location.assign(`${import.meta.env.BASE_URL}${target.slice(1)}`)
  window.scrollTo({ top: 0, behavior: 'auto' })
}
