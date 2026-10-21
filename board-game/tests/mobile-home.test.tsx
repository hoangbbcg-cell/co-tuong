// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, expect, it, vi } from 'vitest'
import { MobileHome } from '../src/pages/home/MobileHome'
import { useHome } from '../src/features/lobby/hooks/useHome'
import { homeUtilityButton } from '../src/lib/uiClasses'

afterEach(cleanup)

it('pages through all four real modes and keeps resources, chat and settings available', () => {
  const quick = vi.fn(), rooms = vi.fn(), hidden = vi.fn(), computer = vi.fn(), energy = vi.fn(), messages = vi.fn()
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  function Harness() {
    const home = useHome()
    return <MobileHome home={{ ...home, quickPlay: quick, openRooms: rooms, playHidden: hidden, openComputer: computer }} music={{ playing: true, toggle: vi.fn(async () => {}) }} onEnergy={energy} onMessages={messages} />
  }
  const view = render(<QueryClientProvider client={client}><Harness /></QueryClientProvider>)
  expect(screen.getByLabelText(/^Elo Cờ Tướng:/)).toBeTruthy()
  expect(screen.getByLabelText(/^Elo Cờ Úp:/)).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Giải đấu' }).textContent).toContain('🏆')
  const utilityOrder = ['Xếp hạng', 'Lịch sử', 'Bạn bè', 'Chat', 'Cửa hàng', 'Cài đặt']
  expect(within(screen.getByRole('navigation', { name: 'Tiện ích điện thoại' })).getAllByRole('button').map(button => button.getAttribute('aria-label'))).toEqual(utilityOrder)
  for (const label of utilityOrder) {
    expect(screen.getByRole('button', { name: label }).className).toContain(homeUtilityButton)
  }
  fireEvent.click(screen.getByRole('button', { name: 'Cờ Tướng' }))
  fireEvent.click(screen.getByRole('button', { name: 'Chọn Bàn' }))
  expect(quick).toHaveBeenCalledTimes(1)
  expect(rooms).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByRole('button', { name: 'Chế độ tiếp theo' }))
  expect(screen.queryByRole('button', { name: 'Cờ Tướng' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Cờ Úp' }))
  fireEvent.click(screen.getByRole('button', { name: 'Chơi Với Máy' }))
  expect(hidden).toHaveBeenCalledTimes(1)
  expect(computer).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByRole('button', { name: 'Chế độ trước' }))
  expect(screen.getByRole('button', { name: 'Cờ Tướng' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Thêm năng lượng' }))
  fireEvent.click(screen.getByRole('button', { name: 'Chat' }))
  expect(energy).toHaveBeenCalledTimes(1)
  expect(messages).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByRole('button', { name: 'Cài đặt' }))
  expect(screen.getByRole('group', { name: 'Cài đặt âm thanh' }).className).toContain('bottom-full')
  view.unmount()
  client.clear()
})
