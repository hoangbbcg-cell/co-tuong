// @vitest-environment jsdom
import { createRef } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ProfileDialog } from '../src/features/lobby/components/ProfileDialog'
import { useSessionStore } from '../src/store/sessionStore'

vi.mock('../src/features/lobby/hooks/useDatabaseHonors', () => ({
  useDatabaseHonors: () => ({ ownedIds: ['arena_2_1', 'arena_3_1'], selectedIds: [], counts: {}, select: vi.fn() }),
}))
vi.mock('../src/features/lobby/hooks/useDatabaseProfile', () => ({ useDatabaseProfile: () => null }))

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} })
  localStorage.clear()
  useSessionStore.setState({ name: 'SelfPlayer', account: null, countryCode: 'VN', province: 'Tỉnh Đồng Nai', address: 'Xã Long Thành, Tỉnh Đồng Nai' })
  useSessionStore.setState({ account: {
    id: '1', publicId: '12345678', displayName: 'SelfPlayer', linked: false, renamed: false,
    avatarCode: 'avatar-0', avatarFrameCode: 'frame-0', countryCode: 'VN', provinceCode: '75', provinceName: 'Tỉnh Đồng Nai', wardCode: '1', wardName: 'Xã Long Thành', locationSet: true,
    gold: '0', energy: 5, energyRecoveryAt: null, friends: 0, followers: 0, likes: 0, stats: [],
  } })
  HTMLDialogElement.prototype.showModal = function () { this.open = true }
  HTMLDialogElement.prototype.close = function () { this.open = false }
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

it('adds the chosen province or commune as the second arena description line', () => {
  const ref = createRef<HTMLDialogElement>()
  const layout = { width: 740, height: 850, scale: 0.7, avatarWidth: 980, avatarHeight: 780, avatarScale: 0.7 }
  render(<ProfileDialog dialogRef={ref} layout={layout} name="SelfPlayer" editable onClose={() => {}} primaryActionLabel="Liên kết" onPrimaryAction={() => {}} />)
  act(() => ref.current?.showModal())
  fireEvent.click(screen.getByRole('button', { name: 'Mở danh hiệu' }))
  fireEvent.click(screen.getByRole('button', { name: 'Xem thông tin Quán Quân cấp 2' }))
  expect(screen.getByText('Vô địch Cờ Tướng tỉnh Đồng Nai.')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Xem thông tin Quán Quân cấp 3' }))
  expect(screen.getByText('Vô địch Cờ Tướng xã Long Thành.')).toBeTruthy()
})
