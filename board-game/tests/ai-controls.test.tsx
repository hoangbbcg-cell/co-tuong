// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { ReplayControls } from '../src/features/game/components/ReplayControls'
import { HomeSettings } from '../src/features/lobby/components/HomeSettings'
import { useAiControlsHidden, writeAiControlsHidden } from '../src/lib/aiControlsPreference'
import { useSessionStore } from '../src/store/sessionStore'
import type { AccountProfile } from '../src/types/account'
import type { useReplayTrial } from '../src/features/game/hooks/useReplayTrial'
import type { useReplayPlayback } from '../src/features/game/hooks/useReplayPlayback'
import type { useHomeMusic } from '../src/features/lobby/hooks/useHomeMusic'

afterEach(() => { cleanup(); localStorage.clear(); useSessionStore.setState({ account: null }) })
function account(granted: boolean, publicId = '12345678') {
  useSessionStore.setState({ account: { id: '1', publicId, aiControlsControl: granted, hovangWatermarkControl: true } as AccountProfile })
}
const music = { playing: false, toggle: vi.fn(async () => {}) } as unknown as ReturnType<typeof useHomeMusic>
it('only shows Bỏ AI for the server-granted account and places it below Bỏ logo', () => {
  account(false)
  const view = render(<HomeSettings music={music} onError={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: 'Cài đặt' }))
  expect(screen.queryByRole('button', { name: 'Bỏ AI' })).toBeNull()
  act(() => account(true))
  const hide = screen.getByRole('button', { name: 'Bỏ AI' })
  expect(screen.getByRole('button', { name: 'Bỏ logo' }).nextElementSibling).toBe(hide)
  expect(hide.querySelector('svg path[stroke="#f87171"]')).toBeTruthy()
  fireEvent.click(hide)
  expect(hide.getAttribute('aria-pressed')).toBe('true')
  expect(localStorage.getItem('ai-controls-hidden:12345678')).toBe('true')
  view.unmount()
  render(<HomeSettings music={music} onError={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: 'Cài đặt' }))
  expect(screen.getByRole('button', { name: 'Bỏ AI' }).getAttribute('aria-pressed')).toBe('true')
})
it('ignores saved preference without permission, restores controls on revoke and isolates accounts', () => {
  account(true)
  const { result } = renderHook(() => useAiControlsHidden())
  act(() => writeAiControlsHidden('12345678', true))
  expect(result.current).toBe(true)
  act(() => account(false))
  expect(result.current).toBe(false)
  act(() => account(true, '87654321'))
  expect(result.current).toBe(false)
})
function controls() {
  const back = vi.fn(), seek = vi.fn(), toggleMachineSide = vi.fn()
  const trial = { active: true, step: 1, total: 2, back, seek, machineRed: false, machineBlack: false, toggleMachineSide } as unknown as ReturnType<typeof useReplayTrial>
  const playback = { step: 0, total: 0 } as ReturnType<typeof useReplayPlayback>
  return { trial, playback, back, seek, toggleMachineSide }
}
it('moves navigation into the mobile tools position without duplicate lower controls or machine switches', () => {
  const c = controls()
  render(<><ReplayControls {...c} mobilePart="tools" hideAiControls /><ReplayControls {...c} mobilePart="navigation" hideAiControls /></>)
  expect(screen.queryByLabelText('Chọn bên máy đánh')).toBeNull()
  expect(screen.queryByRole('button', { name: 'Máy đánh Bên Đỏ' })).toBeNull()
  expect(screen.getAllByRole('button', { name: 'Nước trước' })).toHaveLength(1)
  fireEvent.click(screen.getByRole('button', { name: 'Nước trước' }))
  fireEvent.click(screen.getByRole('button', { name: 'Nước sau' }))
  expect(c.back).toHaveBeenCalledOnce()
  expect(c.seek).toHaveBeenCalledWith(2)
  expect(c.toggleMachineSide).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: 'Tạo bàn' })).toBeTruthy()
})
it('keeps normal machine controls by default and replaces them in the desktop panel when enabled', () => {
  const c = controls(), view = render(<ReplayControls {...c} />)
  expect(screen.getByLabelText('Chọn bên máy đánh')).toBeTruthy()
  view.rerender(<ReplayControls {...c} hideAiControls />)
  expect(screen.queryByLabelText('Chọn bên máy đánh')).toBeNull()
  expect(screen.getAllByRole('button', { name: 'Nước trước' })).toHaveLength(1)
  expect(screen.getByRole('button', { name: 'Reset thế thử ban đầu' })).toBeTruthy()
})
