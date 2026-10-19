// @vitest-environment jsdom
import { createRef } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ProfileDialog } from '../src/features/lobby/components/ProfileDialog'
import { useSessionStore } from '../src/store/sessionStore'

vi.mock('../src/features/lobby/hooks/useDatabaseProfile', () => ({
  useDatabaseProfile: (_name: string, own: boolean) => own ? null : {
    id: '2', displayName: 'OtherPlayer', avatarCode: 'avatar-0', avatarFrameCode: 'frame-0',
    stats: [{ variant: 'xiangqi', elo: 2900 }, { variant: 'jieqi', elo: 1000 }],
  },
}))
const layout = { width: 740, height: 850, scale: 0.7, avatarWidth: 980, avatarHeight: 780, avatarScale: 0.7 }
beforeEach(() => {
  localStorage.clear()
  useSessionStore.setState({ name: 'SelfPlayer', account: null, elo: 1200 })
  HTMLDialogElement.prototype.showModal = function () { this.open = true }
  HTMLDialogElement.prototype.close = function () { this.open = false }
})
afterEach(cleanup)
it('uses live Elo for own profile and customization without changing star geometry', () => {
  const ref = createRef<HTMLDialogElement>()
  render(<ProfileDialog dialogRef={ref} layout={layout} name="SelfPlayer" editable onClose={() => {}} primaryActionLabel="Liên kết" onPrimaryAction={() => {}} />)
  act(() => ref.current?.showModal())
  expect(screen.getByLabelText('3 trên 3 sao')).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Danh hiệu Tân Binh' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Tùy chỉnh avatar' }))
  expect(screen.getByLabelText('3 trên 3 sao')).toBeTruthy()
  act(() => useSessionStore.setState({ elo: 1300 }))
  expect(screen.getByLabelText('1 trên 3 sao')).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Danh hiệu Kỳ Sĩ' })).toBeTruthy()
  act(() => useSessionStore.setState({ elo: 3000 }))
  expect(screen.getByLabelText('3 trên 3 sao')).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Danh hiệu Kỳ Thánh' })).toBeTruthy()
})
it('uses the viewed player Elo instead of own Elo or the 1000 default', () => {
  const ref = createRef<HTMLDialogElement>()
  render(<ProfileDialog dialogRef={ref} layout={layout} name="OtherPlayer" onClose={() => {}} primaryActionLabel="Kết bạn" onPrimaryAction={() => {}} />)
  act(() => ref.current?.showModal())
  expect(screen.getByLabelText('2 trên 3 sao')).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Danh hiệu Kỳ Thánh' })).toBeTruthy()
})
