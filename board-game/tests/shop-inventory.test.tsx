// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AvatarCustomization } from '../src/features/lobby/components/AvatarCustomization'
import { useSessionStore } from '../src/store/sessionStore'
import { useShopPurchase } from '../src/features/lobby/hooks/useShopPurchase'
import { accountApi } from '../src/services/accountApi'
import { SHOP_PRODUCTS } from '../src/lib/shopCatalog'
import type { AccountProfile } from '../src/types/account'

const account = { id: '1', publicId: '12345678', displayName: 'Buyer', avatarCode: 'avatar-0', avatarFrameCode: 'frame-0', stats: [], gold: '1000', energy: 5, energyRecoveryAt: null, cosmetics: [] } as unknown as AccountProfile
afterEach(() => { cleanup(); vi.restoreAllMocks() })
it('shows owned avatars and frames in corresponding selectors, keeping unowned frames locked', () => {
  useSessionStore.setState({ account: { ...account, cosmetics: [{ kind: 'avatar', code: 'avatar-15' }, { kind: 'avatar', code: 'avatar-16' }, { kind: 'frame', code: 'frame-5' }] } })
  render(<AvatarCustomization previewPanel={null} selectedAvatarIndex={0} selectedFrameIndex={0} onUse={() => {}} onCancel={() => {}} />)
  expect(screen.getByRole('button', { name: 'Chọn avatar nhân vật 17' })).toBeTruthy()
  expect(screen.queryByRole('button', { name: 'Chọn avatar nhân vật 16' })).toBeNull()
  expect(screen.queryByRole('button', { name: 'Viền xanh ngọc 08' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Chọn viền' }))
  expect(screen.getByRole('button', { name: 'Viền xanh ngọc 08' })).toBeTruthy()
  expect(screen.queryByRole('button', { name: 'Viền đỏ 03' })).toBeNull()
})
it('blocks overlapping submissions and retries uncertain purchases using the same key', async () => {
  useSessionStore.setState({ account })
  let fail: (error: Error) => void = () => {}
  const pending = new Promise<AccountProfile>((_resolve, reject) => { fail = reject })
  const api = vi.spyOn(accountApi, 'purchase').mockReturnValueOnce(pending).mockResolvedValueOnce({ ...account, gold: '500', cosmetics: [{ kind: 'frame', code: 'frame-4' }] })
  const hook = renderHook(() => useShopPurchase(vi.fn()))
  act(() => hook.result.current.open(SHOP_PRODUCTS[0]))
  let first: Promise<void> = Promise.resolve()
  act(() => { first = hook.result.current.confirm(); void hook.result.current.confirm() })
  expect(api).toHaveBeenCalledTimes(1)
  await act(async () => { fail(new Error('Network timeout')); await first })
  act(() => hook.result.current.open(SHOP_PRODUCTS[0]))
  await act(async () => { await hook.result.current.confirm() })
  expect(api).toHaveBeenCalledTimes(2)
  expect(api.mock.calls[0]).toEqual(api.mock.calls[1])
  expect(useSessionStore.getState().gold).toBe(500)
})

it('purchases without randomUUID on HTTP mobile and clears the busy state', async () => {
  useSessionStore.setState({ account })
  const originalCrypto = globalThis.crypto
  vi.stubGlobal('crypto', { getRandomValues: originalCrypto.getRandomValues.bind(originalCrypto) })
  try {
    const api = vi.spyOn(accountApi, 'purchase').mockResolvedValue({ ...account, gold: '500', cosmetics: [{ kind: 'frame', code: 'frame-4' }] })
    const hook = renderHook(() => useShopPurchase(vi.fn()))
    act(() => hook.result.current.open(SHOP_PRODUCTS[0]))
    await act(async () => { await hook.result.current.confirm() })
    expect(api).toHaveBeenCalledTimes(1)
    expect(api.mock.calls[0][1]).toMatch(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i)
    expect(hook.result.current.buying).toBe(false)
    expect(hook.result.current.selected).toBeNull()
    expect(useSessionStore.getState().gold).toBe(500)
  } finally { vi.unstubAllGlobals() }
})
