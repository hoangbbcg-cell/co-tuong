// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, expect, it, vi } from 'vitest'
import { ShopPage } from '../src/pages/shop/ShopPage'
import { useSessionStore } from '../src/store/sessionStore'
import { accountApi } from '../src/services/accountApi'
import type { AccountProfile } from '../src/types/account'
import { SHOP_PRODUCTS } from '../src/lib/shopCatalog'

const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal)
  else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
})

it('confirms real purchases, updates owned items/balance and blocks duplicate purchases', async () => {
  const account = { id: '1', publicId: '12345678', displayName: 'Buyer', gold: '10000', energy: 5, energyRecoveryAt: null, countryCode: null, provinceName: null, wardName: null, avatarCode: 'avatar-0', avatarFrameCode: 'frame-0', stats: [{ variant: 'xiangqi', elo: 1000 }], cosmetics: [] } as unknown as AccountProfile
  useSessionStore.setState({ screen: 'shop', gold: 10000, energy: 5, account })
  const dailyProducts = [
    ...SHOP_PRODUCTS.filter(item => item.kind === 'avatar').slice(0, 3),
    ...SHOP_PRODUCTS.filter(item => item.kind === 'frame').slice(0, 3),
  ]
  vi.spyOn(accountApi, 'dailyShop').mockResolvedValue({ date: '2026-10-25', refreshAt: Date.now() + 86_400_000, products: dailyProducts })
  const purchase = vi.spyOn(accountApi, 'purchase').mockResolvedValue({ ...account, gold: '7000', cosmetics: [{ kind: 'avatar', code: 'avatar-16' }] })
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true } })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const view = render(<QueryClientProvider client={client}><ShopPage /></QueryClientProvider>)
  expect(await screen.findAllByRole('article')).toHaveLength(6)
  expect(screen.queryByAltText('Đã mua')).toBeNull()
  expect(screen.getByRole('main').className).toContain('fixed inset-0')
  const frame = view.container.querySelector<HTMLElement>('[data-shop-frame]')!
  expect(frame.style.width).toBe(`${window.innerWidth - 240}px`)
  expect(frame.style.height).toBe(`${window.innerHeight - 12}px`)
  expect(screen.queryByText('Sản phẩm xem thử')).toBeNull()
  expect(screen.queryByRole('button', { name: 'Mua avatar Quan Vũ' })).toBeNull()
  expect(screen.queryByRole('button', { name: 'Mua avatar Nữ kiếm khách' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Mua avatar Lão quân sư' }))
  const confirmation = screen.getByRole('dialog', { name: 'Xác nhận mua' })
  fireEvent.click(within(confirmation).getByRole('button', { name: 'Xác nhận' }))
  await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Xác nhận mua' })).toBeNull())
  expect(screen.getByRole('alert').textContent).toContain('Đã mua avatar Lão quân sư')
  expect(purchase).toHaveBeenCalledWith('avatar-16', expect.any(String))
  expect(useSessionStore.getState().gold).toBe(7000)
  expect(useSessionStore.getState().account?.cosmetics).toContainEqual({ kind: 'avatar', code: 'avatar-16' })
  expect(within(screen.getByRole('article', { name: 'Lão quân sư' })).getByAltText('Đã mua')).toBeTruthy()
  expect(within(screen.getByRole('article', { name: 'Nam tướng quân' })).queryByAltText('Đã mua')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Mua avatar Lão quân sư' }))
  expect(screen.getByRole('alert').textContent).toContain('Bạn đã có avatar này')
  expect(purchase).toHaveBeenCalledTimes(1)
  const premium = screen.getByRole('button', { name: 'Cửa Hàng Cao Cấp' })
  expect(premium.hasAttribute('disabled')).toBe(false)
  fireEvent.click(premium)
  expect(premium.getAttribute('aria-pressed')).toBe('true')
  expect(screen.queryByRole('article')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Sự Kiện' }))
  expect(screen.getByRole('button', { name: 'Sự Kiện' }).getAttribute('aria-pressed')).toBe('true')
  fireEvent.click(screen.getByRole('button', { name: 'Phiên Chợ Hàng Ngày' }))
  fireEvent.click(screen.getByRole('tab', { name: 'Khung Viền' }))
  expect(screen.getAllByRole('article')).toHaveLength(3)
  for (const name of ['Viền đỏ 03', 'Viền xanh ngọc 08', 'Viền tím 09']) {
    expect(screen.getByRole('img', { name })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: `Mua ${name}` }))
    const dialog = screen.getByRole('dialog', { name: 'Xác nhận mua' })
    expect(dialog.textContent).toContain(name)
    fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }))
    expect(screen.queryByRole('dialog', { name: 'Xác nhận mua' })).toBeNull()
    expect(useSessionStore.getState().gold).toBe(7000)
  }
  fireEvent.click(screen.getByRole('tab', { name: 'Avatar' }))
  expect(screen.getAllByRole('article')).toHaveLength(3)
  fireEvent.click(screen.getByRole('button', { name: 'Trở về Home' }))
  expect(useSessionStore.getState().screen).toBe('home')
  view.unmount()
  client.clear()
})
