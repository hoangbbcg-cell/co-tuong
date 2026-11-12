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
    headers: {
      // Always revalidate the HTML/module graph so a normal F5 picks up the
      // latest local source without requiring an incognito window or cache clear.
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    host: '0.0.0.0',
    proxy: {
      // Preserve the browser host so the backend's same-origin check also works in dev.
      '/api': sameOriginProxy,
      '/media/group-avatars': sameOriginProxy,
      '/media/message-images': sameOriginProxy,
      '/socket.io': { target: 'http://127.0.0.1:3001', ws: true },
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  },
  // Large full-app jsdom suites must not compete for CPU; keep normal deadlines.
  test: { environment: 'node', include: ['tests/**/*.test.{ts,tsx}'], setupFiles: ['tests/setup.ts'], maxWorkers: 1 },
})
