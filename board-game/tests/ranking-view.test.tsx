// @vitest-environment jsdom
vi.mock('../src/features/lobby/hooks/useDatabaseRanking',()=>({useDatabaseRanking:()=>[{name:'ShopCoTuong',online:true,playing:'Đang chơi Cờ Tướng',elo:'2719'},{name:'NgocLinhAnh',online:true,playing:'Đang online',elo:'2719'},{name:'Tu_CoTuong',online:false,playing:'Offline',elo:'2719'}]}))
import { createRef } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { RankingDialog } from '../src/features/lobby/components/RankingDialog'
const { onView } = vi.hoisted(() => ({ onView: vi.fn() }))
vi.mock('../src/features/lobby/hooks/useRankingWatch', () => ({ useRankingWatch: () => ({
  matchFor: (name: string) => name === 'ShopCoTuong' ? { id: 'playing-room' } : undefined,
  watch: onView, error: '', passwordControls: { passwordRoom: null, pending: false, passwordError: '', join: vi.fn(), dismissPasswordRoom: vi.fn() },
}) }))

afterEach(cleanup)
it('chỉ hiện Vào xem cho top online đang chơi, không hiện cho offline/online rảnh', () => {
  render(<RankingDialog dialogRef={createRef<HTMLDialogElement>()} layout={{ width: 1120, height: 750, scale: 1 }} onClose={() => {}} onOpenProfile={() => {}}/>)
  const dialog = screen.getByText('ShopCoTuong').closest('dialog')!
  dialog.open = true
  const buttons = screen.getAllByRole('button', { name: /^Vào xem / })
  expect(buttons).toHaveLength(1)
  expect(buttons[0].getAttribute('aria-label')).toBe('Vào xem ShopCoTuong')
  expect(screen.queryByRole('button', { name: 'Vào xem NgocLinhAnh' })).toBeNull()
  expect(screen.queryByRole('button', { name: 'Vào xem Tu_CoTuong' })).toBeNull()
  fireEvent.click(buttons[0])
  expect(onView).toHaveBeenCalledWith('ShopCoTuong')
})
