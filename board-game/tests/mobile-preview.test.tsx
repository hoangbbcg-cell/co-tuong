// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { MobilePreviewPage } from '../src/pages/preview/MobilePreviewPage'

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

it('resizes and rotates the real app viewport without reloading the running app', () => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1200)
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(600)
  const disconnect = vi.fn()
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect = disconnect })
  const view = render(<MobilePreviewPage />)
  const frame = screen.getByTitle('Giao diện Cờ Tướng trên điện thoại')
  expect(frame.getAttribute('src')).toBe('/')
  expect(frame.style.width).toBe('390px')
  expect(frame.style.height).toBe('844px')
  const fitBox = frame.parentElement!.parentElement!
  expect(parseFloat(fitBox.style.height)).toBeLessThanOrEqual(600)
  fireEvent.click(screen.getByRole('button', { name: /Nhỏ/ }))
  expect(screen.getByTitle('Giao diện Cờ Tướng trên điện thoại')).toBe(frame)
  expect(frame.style.width).toBe('360px')
  expect(frame.style.height).toBe('800px')
  fireEvent.click(screen.getByRole('button', { name: 'Xoay ngang' }))
  expect(frame.style.width).toBe('800px')
  expect(frame.style.height).toBe('360px')
  fireEvent.click(screen.getByRole('button', { name: /Lớn/ }))
  expect(frame.style.width).toBe('932px')
  expect(frame.style.height).toBe('430px')
  expect(screen.getByRole('link', { name: 'Về bản laptop' }).getAttribute('href')).toBe('/')
  view.unmount()
  expect(disconnect).toHaveBeenCalledOnce()
})
