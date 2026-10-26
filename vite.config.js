import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/ONGYEOL/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.browser-verify-tmp/**'],
    },
  },
})
