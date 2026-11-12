// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AdminPage } from '../src/pages/admin/AdminPage'
import { adminApi } from '../src/services/adminApi'
import type { AnalyticsReport } from '../src/types/activity'

afterEach(() => { cleanup(); vi.restoreAllMocks() })
const expired = () => Object.assign(new Error('Expired'), { isAxiosError: true, response: { status: 401 } })
const report: AnalyticsReport = { totals: { total: 0, online: 0, offline: 0, google: 0, guest: 0, activeInPeriod: 0 }, users: [], events: [], usage: [], usersHasMore: false, eventsHasMore: false, generatedAt: new Date().toISOString() }

it('returns to login on analytics401 and restores statistics after signing in again', async () => {
  vi.spyOn(adminApi, 'me').mockResolvedValue()
  vi.spyOn(adminApi, 'catalog').mockResolvedValue([])
  const analytics = vi.spyOn(adminApi, 'analytics').mockRejectedValueOnce(expired()).mockResolvedValue(report)
  const login = vi.spyOn(adminApi, 'login').mockResolvedValue()
  render(<AdminPage />)
  await screen.findByText('Phiên quản trị đã hết hiệu lực. Vui lòng đăng nhập lại.')
  expect(screen.queryByRole('button', { name: 'Đăng xuất quản trị' })).toBeNull()
  expect(screen.queryByLabelText('Thống kê và hoạt động người chơi')).toBeNull()
  fireEvent.change(screen.getByLabelText('Mật khẩu'), { target: { value: 'test-password' } })
  fireEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }))
  await screen.findByText('Tài khoản đã vào game')
  expect(login).toHaveBeenCalledWith('test-password')
  expect(analytics).toHaveBeenCalledTimes(2)
  expect(screen.queryByText('Phiên quản trị đã hết hiệu lực. Vui lòng đăng nhập lại.')).toBeNull()
})
it('handles catalog401 consistently with other protected admin requests', async () => {
  vi.spyOn(adminApi, 'me').mockResolvedValue()
  vi.spyOn(adminApi, 'catalog').mockRejectedValue(expired())
  vi.spyOn(adminApi, 'analytics').mockResolvedValue(report)
  render(<AdminPage />)
  await screen.findByText('Phiên quản trị đã hết hiệu lực. Vui lòng đăng nhập lại.')
  expect(screen.getByLabelText('Mật khẩu')).toBeTruthy()
  expect(screen.queryByRole('button', { name: 'Tìm người chơi' })).toBeNull()
})
it('keeps a valid session on a temporary network error and permits analytics retry', async () => {
  vi.spyOn(adminApi, 'me').mockResolvedValue()
  vi.spyOn(adminApi, 'catalog').mockResolvedValue([])
  const analytics = vi.spyOn(adminApi, 'analytics').mockRejectedValueOnce(Object.assign(new Error('network'), { isAxiosError: true })).mockResolvedValue(report)
  render(<AdminPage />)
  await screen.findByText(/Không tải được thống kê:/)
  expect(screen.getByRole('button', { name: 'Đăng xuất quản trị' })).toBeTruthy()
  expect(screen.queryByLabelText('Mật khẩu')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Thử tải lại' }))
  await waitFor(() => expect(analytics).toHaveBeenCalledTimes(2))
  await screen.findByText('Tài khoản đã vào game')
})

it('clears the account search through its X and loads the unfiltered account list', async () => {
  vi.spyOn(adminApi, 'me').mockResolvedValue()
  vi.spyOn(adminApi, 'catalog').mockResolvedValue([])
  vi.spyOn(adminApi, 'analytics').mockResolvedValue(report)
  const search = vi.spyOn(adminApi, 'search').mockResolvedValue([])
  render(<AdminPage />)
  const field = await screen.findByLabelText('ID hoặc tên người chơi')
  fireEvent.change(field, { target: { value: '12345678' } })
  fireEvent.click(screen.getByRole('button', { name: 'Xóa id hoặc tên người chơi' }))
  await waitFor(() => expect(search).toHaveBeenCalledWith(''))
  expect((field as HTMLInputElement).value).toBe('')
})
