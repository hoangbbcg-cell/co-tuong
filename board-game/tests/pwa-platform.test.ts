// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeEach, expect, it } from 'vitest'

const script = readFileSync(resolve('public/hovang-pwa-platform.js'), 'utf8')
const desktop = JSON.parse(readFileSync(resolve('public/manifest.webmanifest'), 'utf8'))
const android = JSON.parse(readFileSync(resolve('public/manifest-android.webmanifest'), 'utf8'))
const html = readFileSync(resolve('index.html'), 'utf8')
const phone = 'Mozilla/5.0 (Linux; Android 15; Pixel 9) Chrome/142.0.0.0 Mobile Safari/537.36'
function configure(userAgent: string) {
  // Execute the exact pre-React production bootstrap against a real DOM.
  new Function('navigator', 'document', script)({ userAgent }, document)
}
beforeEach(() => {
  document.head.innerHTML = '<meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="manifest" href="/manifest.webmanifest">'
})
it('selects the browser-display manifest on Android and reserves the cutout-safe viewport', () => {
  configure(phone)
  expect(document.querySelector('link')?.getAttribute('href')).toBe('/manifest-android.webmanifest')
  expect(document.querySelector('meta')?.content).toBe('width=device-width, initial-scale=1.0, viewport-fit=contain')
  configure(phone)
  expect(document.querySelector('meta')?.content.match(/viewport-fit=/g)).toHaveLength(1)
})
it.each([
  'Mozilla/5.0 (Windows NT 10.0) Chrome/142.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/142.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) Safari/604.1',
  'Mozilla/5.0 (Linux; Android 15; Pixel; wv) Chrome/142.0.0.0 Mobile Safari/537.36',
])('leaves existing desktop/iOS/native-WebView settings unchanged: %s', ua => {
  configure(ua)
  expect(document.querySelector('link')?.getAttribute('href')).toBe('/manifest.webmanifest')
  expect(document.querySelector('meta')?.content).toBe('width=device-width, initial-scale=1.0')
})
it('preserves app identity, scope, portrait, colors and official icons across manifests', () => {
  expect(desktop.display).toBe('standalone')
  expect(android.display).toBe('browser')
  expect({ ...android, display: desktop.display }).toEqual(desktop)
  expect(android.id).toBe('/')
  expect(android.icons.map((icon: { sizes: string }) => icon.sizes)).toEqual(['192x192', '512x512'])
})
it('runs platform selection in the document head before React without requesting fullscreen', () => {
  expect(html.indexOf('/hovang-pwa-platform.js')).toBeGreaterThan(html.indexOf('rel="manifest"'))
  expect(html.indexOf('/hovang-pwa-platform.js')).toBeLessThan(html.indexOf('</head>'))
  expect(html.indexOf('/hovang-pwa-platform.js')).toBeLessThan(html.indexOf('/src/main.tsx'))
  expect(script).not.toMatch(/requestFullscreen|webkitRequestFullscreen|exitFullscreen|\.prompt\(/)
})
