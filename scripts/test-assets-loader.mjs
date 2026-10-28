export async function load(url, context, nextLoad) {
  if (/\.png$/.test(url)) return { format: 'module', source: `export default ${JSON.stringify(url)}`, shortCircuit: true }
  return nextLoad(url, context)
}
