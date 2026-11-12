// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { afterEach, expect, it, vi } from 'vitest'

const source = readFileSync('public/hovang-startup.js', 'utf8')
const start = () => {
  vi.useFakeTimers()
  document.body.innerHTML = '<div id="root"></div>'
  window.eval(source)
}
const finish = async () => {
  document.getElementById('root')!.innerHTML = '<main>Game</main>'
  await Promise.resolve()
}
afterEach(async () => { await finish(); vi.useRealTimers(); document.body.replaceChildren() })

it('shows a loading message even before application modules run', () => {
  start()
  expect(document.getElementById('hovang-startup')?.textContent).toContain('Đang mở game')
  expect(document.querySelector<HTMLButtonElement>('button')!.style.display).toBe('none')
})
it('offers recovery when application modules cannot load', () => {
  start()
  window.dispatchEvent(new Event('hovang:startup-error'))
  expect(document.getElementById('hovang-startup')?.textContent).toContain('Chưa tải được game')
  expect(document.querySelector<HTMLButtonElement>('button')!.style.display).toBe('block')
})
it('offers recovery if the browser cannot execute modules, without deleting account storage', () => {
  localStorage.setItem('startup-test', 'keep')
  start()
  vi.advanceTimersByTime(30000)
  expect(document.getElementById('hovang-startup')?.textContent).toContain('Chưa tải được game')
  expect(localStorage.getItem('startup-test')).toBe('keep')
  localStorage.removeItem('startup-test')
})
it('removes the startup overlay and listeners once the app renders', async () => {
  start()
  await finish()
  expect(document.getElementById('hovang-startup')).toBeNull()
  vi.advanceTimersByTime(30000)
  window.dispatchEvent(new Event('hovang:startup-error'))
  expect(document.getElementById('hovang-startup')).toBeNull()
})
it('recovers from an initial preload failure, but ignores unrelated scripts', () => {
  start()
  const unrelated = document.createElement('script')
  document.body.appendChild(unrelated)
  unrelated.dispatchEvent(new Event('error'))
  expect(document.querySelector<HTMLButtonElement>('button')!.style.display).toBe('none')
  window.dispatchEvent(new Event('vite:preloadError'))
  expect(document.querySelector<HTMLButtonElement>('button')!.style.display).toBe('block')
})
