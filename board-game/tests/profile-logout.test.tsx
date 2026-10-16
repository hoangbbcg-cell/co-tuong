// @vitest-environment jsdom
import { createRef } from 'react'
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ProfileDialog } from '../src/features/lobby/components/ProfileDialog'

const logout = vi.hoisted(() => vi.fn())
vi.mock('../src/features/lobby/hooks/useAccountLogout', () => ({ useAccountLogout: () => logout }))
beforeEach(() => {
  localStorage.clear()
  logout.mockReset()
  HTMLDialogElement.prototype.showModal = function () { this.open = true }
  HTMLDialogElement.prototype.close = function () { this.open = false }
})
afterEach(cleanup)

it('confirms logout only in the own profile, and cancel keeps the profile open', () => {
  const ref = createRef<HTMLDialogElement>()
  const onClose = vi.fn()
  render(<ProfileDialog dialogRef={ref} layout={{ width: 740, height: 850, scale: 0.7, avatarWidth: 980, avatarHeight: 780, avatarScale: 0.7 }} name="Kỳ thủ000042" editable onClose={onClose} primaryActionLabel="Liên kết tài khoản" onPrimaryAction={() => {}} />)
  act(() => ref.current?.showModal())
  fireEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }))
  let confirmation = screen.getByRole('dialog', { name: 'Xác nhận đăng xuất' })
  expect(within(confirmation).getByText('Bạn có chắc muốn đăng xuất?')).toBeInTheDocument()
  fireEvent.click(within(confirmation).getByRole('button', { name: 'Hủy' }))
  expect(logout).not.toHaveBeenCalled()
  expect(ref.current?.open).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }))
  confirmation = screen.getByRole('dialog', { name: 'Xác nhận đăng xuất' })
  fireEvent.click(within(confirmation).getByRole('button', { name: 'Đồng ý' }))
  expect(logout).toHaveBeenCalledOnce()
  expect(onClose).toHaveBeenCalledOnce()
})
