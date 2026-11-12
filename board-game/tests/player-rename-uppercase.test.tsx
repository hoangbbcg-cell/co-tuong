// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { playerNameError, playerRenameError } from '../src/lib/playerName'
import { UserService } from '../server/services/userService'
import { AccountService } from '../server/services/accountService'
import { ProfileRenameDialog } from '../src/features/lobby/components/ProfileRenameDialog'

afterEach(cleanup)
it.each(['hoang', 'Hoang', 'hoAng', 'Đặng', 'Ấn', '123', '  An  ', 'A\u0301n'])('accepts zero or one uppercase letter: %s', name => {
  expect(playerRenameError(name)).toBe('')
})
it.each(['HOang', 'ĐẶng', 'An Bình', 'A\u0301N'])('rejects multiple Unicode uppercase letters: %s', name => {
  expect(playerRenameError(name)).toContain('tối đa 1 ký tự in hoa')
})
it('retains old name and guest compatibility outside a rename', () => {
  expect(playerNameError('HOANG')).toBe('')
  expect(playerNameError('Kỳ Thủ 000042')).toBe('')
  expect(playerRenameError('Guest00042')).not.toBe('')
  expect(playerRenameError('abcdefghijk')).not.toBe('')
})
it('rejects before writing or consuming the one-time rename', async () => {
  const renameLinkedUser = vi.fn().mockResolvedValue(true)
  const service = new UserService({ createGuest: vi.fn(), renameLinkedUser })
  await expect(service.rename('1', 'HOANG')).rejects.toThrow('tối đa 1')
  expect(renameLinkedUser).not.toHaveBeenCalled()
  await expect(service.rename('1', '  Hoang  ')).resolves.toBeUndefined()
  expect(renameLinkedUser).toHaveBeenCalledExactlyOnceWith('1', 'Hoang')
})
it('returns the validation reason from the account API service before accessing persistence', async () => {
  await expect(new AccountService().rename('1', 'ĐẶng')).rejects.toMatchObject({ status: 400, message: 'Tên chỉ được có tối đa 1 ký tự in hoa.' })
})
it('shows the same validation in the rename dialog without saving', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function(this: HTMLDialogElement) { this.open = true } })
  const onSave = vi.fn()
  render(<ProfileRenameDialog name="Hoang" onSave={onSave} onClose={vi.fn()} />)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'HOANG' } })
  fireEvent.click(screen.getByRole('button', { name: 'Lưu tên' }))
  expect(screen.getByRole('alert').textContent).toContain('tối đa 1 ký tự in hoa')
  expect(onSave).not.toHaveBeenCalled()
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
})