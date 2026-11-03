const normalize = value => String(value ?? '').normalize('NFKC').toLowerCase().replace(/\s+/gu, '')

export function searchProducts(products, query) {
  const keyword = normalize(query)
  if (!keyword) return []
  const seen = new Set()
  return products.filter(product => {
    if (seen.has(product.id)) return false
    const matches = [product.name, product.type, product.line].some(value => normalize(value).includes(keyword))
    if (matches) seen.add(product.id)
    return matches
  })
}
