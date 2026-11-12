// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { AdminAnalytics } from '../src/features/admin/AdminAnalytics'
import { adminApi } from '../src/services/adminApi'
import type { AnalyticsReport } from '../src/types/activity'

afterEach(() => { cleanup(); vi.restoreAllMocks() })
const report: AnalyticsReport = {
  totals: { total: 3, online: 1, offline: 2, google: 1, guest: 2, activeInPeriod: 2 },
  users: [{ id: '1', publicId: '12345678', name: 'Người thử', accountType: 'google', online: true, createdAt: '2026-11-10T00:00:00Z', lastSeenAt: null }],
  usersHasMore: false, eventsHasMore: false, generatedAt: '2026-11-10T01:00:00Z',
  events: [{ id: 'event1', publicId: '12345678', name: 'Người thử', kind: 'page', code: 'shop', createdAt: '2026-11-10T00:00:00Z' }],
  usage: [{ kind: 'page', code: 'shop', count: 5, users: 2 }],
}
it('shows real totals, per-user activity, functional filters and usage aggregation', async () => {
  const load = vi.spyOn(adminApi, 'analytics').mockResolvedValue(report)
  render(<AdminAnalytics />)
  await screen.findByText('Tài khoản đã vào game')
  expect(screen.getByText('● Online')).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Trang sau' }).hasAttribute('disabled')).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: 'Xem hoạt động' }))
  await waitFor(() => expect(load).toHaveBeenLastCalledWith(expect.objectContaining({ q: '12345678' }), expect.any(AbortSignal)))
  await screen.findByText('Cửa hàng', { selector: 'td' })
  fireEvent.change(screen.getByLabelText('Thời gian'), { target: { value: '30' } })
  await waitFor(() => expect(load).toHaveBeenLastCalledWith(expect.objectContaining({ days: 30 }), expect.any(AbortSignal)))
  fireEvent.click(screen.getByRole('button', { name: 'Thống kê chức năng' }))
  await screen.findByText('5', { selector: 'td' })
})
it('shows errors without inventing zero totals and allows retry', async () => {
  const load = vi.spyOn(adminApi, 'analytics').mockRejectedValueOnce(new Error('Migration chưa áp dụng')).mockResolvedValue(report)
  render(<AdminAnalytics />)
  await screen.findByRole('alert')
  expect(screen.queryByText('Tài khoản đã vào game')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Thử tải lại' }))
  await screen.findByText('Tài khoản đã vào game')
  expect(load).toHaveBeenCalledTimes(2)
})
it('keeps account statistics visible and distinguishes unavailable activity from zero activity', async () => {
  vi.spyOn(adminApi, 'analytics').mockResolvedValue({ ...report, activityAvailable: false,
    totals: { ...report.totals, activeInPeriod: null }, events: [], usage: [] })
  render(<AdminAnalytics />)
  await screen.findByText('Tài khoản đã vào game')
  expect(screen.getByText('—')).toBeTruthy()
  expect(screen.getByText(/Nhật ký chưa được kích hoạt trong cơ sở dữ liệu/)).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Nhật ký hoạt động' }))
  expect(screen.queryByText('Chưa có hoạt động trong bộ lọc này.')).toBeNull()
  expect(screen.getByText('Nhật ký chưa được kích hoạt.')).toBeTruthy()
})

it('opens player details and requests thirty users per page', async () => {
  const load = vi.spyOn(adminApi, 'analytics').mockResolvedValue({ ...report, usersHasMore: true })
  const view = vi.fn()
  render(<AdminAnalytics onViewUser={view} />)
  fireEvent.click(await screen.findByRole('button', { name: 'Xem chi tiết' }))
  expect(view).toHaveBeenCalledWith('12345678')
  fireEvent.click(screen.getByRole('button', { name: 'Trang sau' }))
  await waitFor(() => expect(load).toHaveBeenLastCalledWith(expect.objectContaining({ usersOffset: 30 }), expect.any(AbortSignal)))
})

it('clears the applied player filter and returns to users at page one immediately', async () => {
  const load = vi.spyOn(adminApi, 'analytics').mockResolvedValue(report)
  render(<AdminAnalytics />)
  fireEvent.click(await screen.findByRole('button', { name: 'Xem hoạt động' }))
  await waitFor(() => expect(load).toHaveBeenLastCalledWith(expect.objectContaining({ q: '12345678' }), expect.any(AbortSignal)))
  fireEvent.click(screen.getByRole('button', { name: 'Xóa lọc hoạt động theo id hoặc tên' }))
  await waitFor(() => expect(load).toHaveBeenLastCalledWith(expect.objectContaining({ q: '', usersOffset: 0, eventsOffset: 0 }), expect.any(AbortSignal)))
  expect((screen.getByLabelText('Lọc hoạt động theo ID hoặc tên') as HTMLInputElement).value).toBe('')
  expect(screen.getByRole('button', { name: 'Danh sách người chơi' }).getAttribute('aria-pressed')).toBe('true')
  expect(screen.queryByRole('button', { name: 'Xóa lọc hoạt động theo id hoặc tên' })).toBeNull()
})
