import { copyFile } from 'node:fs/promises'

// GitHub Pages serves this app for missing paths, keeping the requested URL
// (including query strings and hashes) for BrowserRouter to resolve.
const dist = new URL('../dist/', import.meta.url)
await copyFile(new URL('index.html', dist), new URL('404.html', dist))
console.log('Created dist/404.html for GitHub Pages routes.')
