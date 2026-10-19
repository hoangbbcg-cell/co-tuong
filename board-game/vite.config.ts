import { defineConfig } from 'vitest/config'
import type { ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const sameOriginProxy: ProxyOptions = {
  target: 'http://127.0.0.1:3001',
  changeOrigin: false,
  configure(proxy) {
    proxy.on('proxyReq', (outgoing, incoming) => {
      if (incoming.headers.host) outgoing.setHeader('Host', incoming.headers.host)
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // Preserve the browser host so the backend's same-origin check also works in dev.
      '/api': sameOriginProxy,
      '/media/group-avatars': sameOriginProxy,
      '/media/message-images': sameOriginProxy,
      '/socket.io': { target: 'http://127.0.0.1:3001', ws: true },
    },
  },
  test: { environment: 'node', include: ['tests/**/*.test.{ts,tsx}'] },
})
