// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useAvatarTouchHold } from '../src/features/game/hooks/useAvatarTouchHold'

function Avatar({ hold, click, identity = 'player' }: { hold: () => void; click: () => void; identity?: string }) {
  const touch = useAvatarTouchHold(identity, hold)
  return <button ref={touch.ref} onClick={() => { if (!touch.consumeHeldClick()) click() }}>Avatar</button>
}
const point = (x = 20) => ({ clientX: x, clientY: 20 })
afterEach(() => { cleanup(); vi.useRealTimers() })

it('giữ chạm vẫn mở sau 550ms qua cập nhật đồng hồ, không mở hồ sơ sau đó', () => {
  vi.useFakeTimers()
  const hold = vi.fn(), latestHold = vi.fn(), click = vi.fn()
  const view = render(<Avatar hold={hold} click={click} />)
  const button = screen.getByRole('button')
  fireEvent.touchStart(button, { touches: [point()] })
  act(() => vi.advanceTimersByTime(300))
  view.rerender(<Avatar hold={latestHold} click={click} />)
  act(() => vi.advanceTimersByTime(250))
  expect(hold).not.toHaveBeenCalled()
  expect(latestHold).toHaveBeenCalledTimes(1)
  fireEvent.touchEnd(button, { touches: [] })
  fireEvent.click(button)
  expect(click).not.toHaveBeenCalled()
})

it('chạm ngắn mở hồ sơ đúng một lần, không phong tặng', () => {
  vi.useFakeTimers()
  const hold = vi.fn(), click = vi.fn()
  render(<Avatar hold={hold} click={click} />)
  const button = screen.getByRole('button')
  fireEvent.touchStart(button, { touches: [point()] })
  act(() => vi.advanceTimersByTime(100))
  fireEvent.touchEnd(button, { touches: [] })
  act(() => vi.advanceTimersByTime(600))
  expect(click).toHaveBeenCalledTimes(1)
  expect(hold).not.toHaveBeenCalled()
})

it.each(['move', 'cancel', 'identity'])('hủy giữ khi %s, không phong nhầm người', kind => {
  vi.useFakeTimers()
  const hold = vi.fn(), click = vi.fn()
  const view = render(<Avatar hold={hold} click={click} />)
  const button = screen.getByRole('button')
  fireEvent.touchStart(button, { touches: [point()] })
  if (kind === 'move') fireEvent.touchMove(button, { touches: [point(40)] })
  else if (kind === 'cancel') fireEvent.touchCancel(button)
  else view.rerender(<Avatar identity="new-player" hold={hold} click={click} />)
  act(() => vi.advanceTimersByTime(600))
  fireEvent.touchEnd(button, { touches: [] })
  expect(hold).not.toHaveBeenCalled()
  expect(click).not.toHaveBeenCalled()
})
