// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AdminPage } from '../src/pages/admin/AdminPage'
import { adminApi } from '../src/services/adminApi'
import type { AdminUser } from '../src/types/admin'

afterEach(() => { cleanup(); vi.restoreAllMocks() })
it('uses password login, selects a player and sends explicit resource edits with a reason', async () => {
  vi.spyOn(adminApi, 'me').mockRejectedValue(new Error('Unauthenticated'))
  vi.spyOn(adminApi, 'login').mockResolvedValue()
  vi.spyOn(adminApi, 'catalog').mockResolvedValue([])
  vi.spyOn(adminApi, 'search').mockResolvedValue([{ publicId: '12345678', name: 'Test player' }])
  const target = { profile: { id: '1', publicId: '12345678', displayName: 'Test player', gold: '1000', energy: 5, avatarCode: 'avatar-0', avatarFrameCode: 'frame-0', stats: [{ variant: 'xiangqi', elo: 1000 }, { variant: 'jieqi', elo: 1000 }] }, cosmetics: [], honors: [], audit: [] } as unknown as AdminUser
  vi.spyOn(adminApi, 'user').mockResolvedValue(target)
  const change = vi.spyOn(adminApi, 'change').mockResolvedValue(target)
  render(<AdminPage />)
  await waitFor(() => expect(screen.getByRole('button', { name: 'Đăng nhập' }).hasAttribute('disabled')).toBe(false))
  fireEvent.change(screen.getByLabelText('Mật khẩu'), { target: { value: 'test-password' } })
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }))
  await waitFor(() => expect(screen.getByRole('button', { name: 'Tìm người chơi' })).toBeTruthy())
  fireEvent.change(screen.getByLabelText('ID hoặc tên người chơi'), { target: { value: '12345678' } })
  fireEvent.click(screen.getByRole('button', { name: 'Tìm người chơi' }))
  await waitFor(() => expect(screen.getByRole('button', { name: /Test player/ })).toBeTruthy())
  fireEvent.click(screen.getByRole('button', { name: /Test player/ }))
  await waitFor(() => expect(screen.getByLabelText('Vàng')).toBeTruthy())
  expect(screen.getByRole('button', { name: 'Lưu tài nguyên và Elo' }).hasAttribute('disabled')).toBe(true)
  fireEvent.change(screen.getByLabelText('Lý do chỉnh sửa'), { target: { value: 'Kiểm thử tài nguyên' } })
  fireEvent.change(screen.getByLabelText('Vàng'), { target: { value: '5000' } })
  fireEvent.click(screen.getByRole('button', { name: 'Lưu tài nguyên và Elo' }))
  await waitFor(() => expect(change).toHaveBeenCalledWith('12345678', expect.objectContaining({ action: 'resources', gold: 5000, energy: 5, xiangqi: 1000, jieqi: 1000, reason: 'Kiểm thử tài nguyên', requestId: expect.any(String) })))
})
