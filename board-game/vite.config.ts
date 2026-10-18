import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // Preserve the browser host so the backend's same-origin check also works in dev.
      '/api': { target: 'http://127.0.0.1:3001', changeOrigin: false },
      '/media/group-avatars': { target: 'http://127.0.0.1:3001', changeOrigin: false },
      '/media/message-images': { target: 'http://127.0.0.1:3001', changeOrigin: false },
      '/socket.io': { target: 'http://127.0.0.1:3001', ws: true },
    },
  },
  test: { environment: 'node', include: ['tests/**/*.test.{ts,tsx}'] },
})
