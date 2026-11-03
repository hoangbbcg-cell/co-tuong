// @vitest-environment jsdom
import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { useGameViewportLock } from '../src/features/game/hooks/useGameViewportLock'

afterEach(() => { cleanup(); document.body.replaceChildren() })

function touch(target: HTMLElement, type: string, y: number, count = 1) {
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(event, 'touches', { value: Array.from({ length: count }, () => ({ clientX: 10, clientY: y })) })
  target.dispatchEvent(event)
  return event
}

it('blocks page panning on the board and removes its listeners when leaving the game', () => {
  const board = document.createElement('div')
  document.body.append(board)
  const { unmount } = renderHook(() => useGameViewportLock())
  touch(board, 'touchstart', 100)
  expect(touch(board, 'touchmove', 140).defaultPrevented).toBe(true)
  unmount()
  touch(board, 'touchstart', 100)
  expect(touch(board, 'touchmove', 140).defaultPrevented).toBe(false)
})

it('allows nested chat scrolling but prevents dragging past either scroll edge', () => {
  const panel = document.createElement('div')
  panel.style.overflowY = 'auto'
  Object.defineProperties(panel, { scrollHeight: { value: 400 }, clientHeight: { value: 100 } })
  const message = document.createElement('span')
  panel.append(message)
  document.body.append(panel)
  renderHook(() => useGameViewportLock())
  panel.scrollTop = 50
  touch(message, 'touchstart', 100)
  expect(touch(message, 'touchmove', 120).defaultPrevented).toBe(false)
  panel.scrollTop = 0
  touch(message, 'touchstart', 100)
  expect(touch(message, 'touchmove', 120).defaultPrevented).toBe(true)
  panel.scrollTop = 300
  touch(message, 'touchstart', 100)
  expect(touch(message, 'touchmove', 80).defaultPrevented).toBe(true)
})

it('preserves multi-touch gestures and native range controls', () => {
  const slider = document.createElement('input')
  slider.type = 'range'
  document.body.append(slider)
  renderHook(() => useGameViewportLock())
  touch(slider, 'touchstart', 100)
  expect(touch(slider, 'touchmove', 140).defaultPrevented).toBe(false)
  touch(document.body, 'touchstart', 100, 2)
  expect(touch(document.body, 'touchmove', 140, 2).defaultPrevented).toBe(false)
})
