// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, expect, it, vi } from 'vitest'
import { ShopPage } from '../src/pages/shop/ShopPage'
import { useSessionStore } from '../src/store/sessionStore'

const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal)
  else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
})

it('shows one demo product, filters it, previews without buying, and returns Home', () => {
  useSessionStore.setState({ screen: 'shop', gold: 1000, energy: 5 })
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true } })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const view = render(<QueryClientProvider client={client}><ShopPage /></QueryClientProvider>)
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByRole('main').className).toContain('fixed inset-0')
  const frame = view.container.querySelector<HTMLElement>('[data-shop-frame]')!
  expect(frame.style.width).toBe(`${window.innerWidth - 240}px`)
  expect(frame.style.height).toBe(`${window.innerHeight - 12}px`)
  fireEvent.click(screen.getByRole('button', { name: 'Xem trước sản phẩm demo' }))
  expect(screen.getByRole('dialog', { name: 'Xem trước Avatar' })).toBeTruthy()
  expect(useSessionStore.getState().gold).toBe(1000)
  expect(screen.getByRole('button', { name: /Cửa Hàng Cao Cấp/ }).hasAttribute('disabled')).toBe(true)
  fireEvent.click(screen.getByRole('tab', { name: 'Khung Viền' }))
  expect(screen.queryByRole('article')).toBeNull()
  fireEvent.click(screen.getByRole('tab', { name: 'Avatar' }))
  expect(screen.getAllByRole('article')).toHaveLength(1)
  fireEvent.click(screen.getByRole('button', { name: 'Trở về Home' }))
  expect(useSessionStore.getState().screen).toBe('home')
  view.unmount()
  client.clear()
})
