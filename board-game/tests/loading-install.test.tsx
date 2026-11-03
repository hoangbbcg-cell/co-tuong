// @vitest-environment jsdom
import { StrictMode } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { createLoadingInstallController, loadingInstall } from '../src/app/loadingInstall'
import { LoadingInstallInvitation } from '../src/app/LoadingInstallInvitation'
let controller: typeof loadingInstall
let standalone = false
let modeListener: (() => void) | undefined
const android = 'Mozilla/5.0 (Linux; Android 15; Pixel 9) Chrome/142.0.0.0 Mobile Safari/537.36'
beforeEach(() => {
  localStorage.clear(); standalone = false; loadingInstall.setLoading(false)
  Object.defineProperty(navigator, 'userAgent', { configurable: true, value: android })
  Object.defineProperty(navigator, 'vendor', { configurable: true, value: 'Google Inc.' })
  vi.stubGlobal('matchMedia', () => ({ get matches() { return standalone }, addEventListener: (_: string, fn: () => void) => { modeListener = fn }, removeEventListener: vi.fn() }))
  controller = createLoadingInstallController(window)
})
afterEach(() => { cleanup(); controller.dispose(); vi.unstubAllGlobals(); vi.restoreAllMocks() })
it('offers a clearly branded website shortcut without any installability event', () => {
  render(<LoadingInstallInvitation controller={controller} />)
  expect(screen.getByText('Thêm lối tắt HOVANG?')).toBeTruthy()
  expect(screen.getByText('Lời mời từ HOVANG')).toBeTruthy()
  expect(screen.getByAltText('Logo HOVANG').getAttribute('src')).toBe('/icons/hovang-shortcut-192.png')
  expect(screen.getByRole('button', { name: 'Cho phép' })).toBeTruthy()
})
it('opens accurate manual instructions without calling a browser prompt or claiming success', () => {
  render(<LoadingInstallInvitation controller={controller} />)
  const prompt = vi.fn()
  const event = new Event('beforeinstallprompt', { cancelable: true })
  Object.assign(event, { prompt })
  act(() => { window.dispatchEvent(event) })
  expect(event.defaultPrevented).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: 'Cho phép' }))
  expect(prompt).not.toHaveBeenCalled()
  expect(screen.getByText('Cài đặt và tạo lối tắt')).toBeTruthy()
  expect(screen.getByText('Tạo lối tắt')).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Đóng hướng dẫn' })).toBeTruthy()
  expect(screen.queryByText(/Đã thêm thành công/)).toBeNull()
  expect(controller.getGateSnapshot()).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: 'Đóng hướng dẫn' }))
  expect(controller.getGateSnapshot()).toBe(false)
})
it('stores seven-day defer; a fresh page may offer again only after expiry', () => {
  const now = Date.now(); vi.spyOn(Date, 'now').mockReturnValue(now)
  controller.later()
  expect(Number(localStorage.getItem('hovang-shortcut-later-until'))).toBe(now + 604800000)
  controller.dispose(); controller = createLoadingInstallController(window)
  expect(controller.getSnapshot()).toBeNull()
  vi.spyOn(Date, 'now').mockReturnValue(now + 604800001)
  expect(controller.getSnapshot()).toBe('invitation')
})
it.each(['Windows Chrome/142.0.0.0', 'Android Firefox/140', android+' EdgA/142', android+' SamsungBrowser/28', android+' OPR/90', 'Android; wv) Chrome/142.0.0.0'])('excludes unsupported browser %s', ua => {
  Object.defineProperty(navigator, 'userAgent', { configurable: true, value: ua })
  expect(controller.getSnapshot()).toBeNull()
  expect(controller.getGateSnapshot()).toBe(false)
})
it('does not reuse old PWA installed/defer flags to control website shortcut guidance', () => {
  localStorage.setItem('hovang-pwa-installed','1')
  localStorage.setItem('hovang-install-later-until',String(Date.now()+604800000))
  expect(controller.getSnapshot()).toBe('invitation')
})
it('suppresses standalone/fullscreen and ends guidance when the display mode changes', () => {
  standalone = true; expect(controller.getSnapshot()).toBeNull()
  standalone = false; controller.showInstructions()
  standalone = true; act(() => modeListener?.())
  expect(controller.getGateSnapshot()).toBe(false)
})
it('survives StrictMode and does not reopen after guide close or unmount', () => {
  const view = render(<StrictMode><LoadingInstallInvitation controller={controller}/></StrictMode>)
  fireEvent.click(screen.getByRole('button',{name:'Cho phép'}))
  fireEvent.click(screen.getByRole('button',{name:'Đóng hướng dẫn'}))
  controller.showInstructions(); expect(controller.getSnapshot()).toBeNull()
  view.unmount(); expect(controller.getGateSnapshot()).toBe(false)
})
it('retains session cooldown when storage is blocked', () => {
  vi.spyOn(Storage.prototype,'getItem').mockImplementation(()=>{throw new Error('blocked')})
  vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('blocked')})
  expect(controller.getSnapshot()).toBe('invitation')
  expect(()=>controller.later()).not.toThrow()
  expect(controller.getGateSnapshot()).toBe(false)
})