// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { CreateRoomForm } from '../src/features/lobby/components/CreateRoomForm'
import type { useLobby } from '../src/features/lobby/hooks/useLobby'

vi.mock('../src/features/lobby/hooks/useFriendsLayout', () => ({ useFriendsLayout: () => ({ compact: false, scale: 1 }) }))
vi.mock('../src/lib/uiActionSound', () => ({ playConfirmationActionSound: vi.fn(), playCustomizationTabActionSound: vi.fn() }))
afterEach(cleanup)

it('offers1/2minutes and increments1..10; clamps an existing120s selection to60s for1minute', () => {
  const create = vi.fn()
  const lobby = { create, pending: false, error: '', name: 'Người chơi', province: '' } as unknown as ReturnType<typeof useLobby>
  render(<CreateRoomForm lobby={lobby} province="" />)
  const minutes = screen.getByLabelText('Thời gian chơi mỗi bên') as HTMLSelectElement
  expect([...minutes.options].map(option => option.value)).toEqual(['1','2','3','5','10','15','30'])
  const turn = screen.getByLabelText('Thời gian nước đi') as HTMLSelectElement
  fireEvent.change(turn, { target: { value: '120' } })
  fireEvent.change(minutes, { target: { value: '1' } })
  expect(turn.value).toBe('60')
  expect([...turn.options].map(option => option.value)).toEqual(['30','60'])
  const increment = screen.getByRole('combobox', { name: 'Thời gian tích lũy' })
  fireEvent.click(increment)
  expect(screen.getAllByRole('option').filter(option => option.id.startsWith('increment-option-'))).toHaveLength(11)
  fireEvent.click(screen.getByRole('option', { name: '7 giây' }))
  fireEvent.click(screen.getByRole('button', { name: 'Tạo bàn' }))
  expect(create).toHaveBeenCalledWith(1,60,'',undefined,'xiangqi',undefined,7)
})

it('forwards2minutes/120seconds/10increment for Jieqi too', () => {
  const create = vi.fn()
  const lobby = { create, pending: false, error: '', name: 'Người chơi', province: '' } as unknown as ReturnType<typeof useLobby>
  render(<CreateRoomForm lobby={lobby} province="" initialVariant="jieqi" />)
  fireEvent.change(screen.getByLabelText('Thời gian chơi mỗi bên'), { target: { value: '2' } })
  fireEvent.change(screen.getByLabelText('Thời gian nước đi'), { target: { value: '120' } })
  fireEvent.click(screen.getByRole('combobox', { name: 'Thời gian tích lũy' }))
  fireEvent.click(screen.getByRole('option', { name: '10 giây' }))
  fireEvent.click(screen.getByRole('button', { name: 'Tạo bàn' }))
  expect(create).toHaveBeenCalledWith(2,120,'',undefined,'jieqi',undefined,10)
})

it('supports keyboard selection and Escape without submitting the room', () => {
  const create = vi.fn()
  const lobby = { create, pending: false, error: '', name: 'Người chơi', province: '' } as unknown as ReturnType<typeof useLobby>
  render(<CreateRoomForm lobby={lobby} province="" />)
  const increment = screen.getByRole('combobox', { name: 'Thời gian tích lũy' })
  fireEvent.keyDown(increment, { key: 'ArrowDown' })
  fireEvent.keyDown(increment, { key: 'End' })
  fireEvent.keyDown(increment, { key: 'Enter' })
  expect(increment.textContent).toBe('10 giây')
  expect(create).not.toHaveBeenCalled()
  fireEvent.click(increment)
  fireEvent.keyDown(increment, { key: 'Home' })
  fireEvent.keyDown(increment, { key: 'Escape' })
  expect(increment.textContent).toBe('10 giây')
  expect(screen.queryByRole('listbox')).toBeNull()
})
