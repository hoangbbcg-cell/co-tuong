// @vitest-environment jsdom
import { act, cleanup, fireEvent, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { useMobileChatOverlay } from '../src/features/game/hooks/useMobileChatOverlay'

afterEach(() => { cleanup(); document.body.replaceChildren(); vi.unstubAllGlobals() })

function setup() {
  vi.stubGlobal('innerWidth', 390)
  vi.stubGlobal('innerHeight', 844)
  vi.stubGlobal('matchMedia', () => ({ matches: true }))
  const viewport = Object.assign(new EventTarget(), { height: 844, offsetTop: 0 })
  vi.stubGlobal('visualViewport', viewport)
  const panel = document.createElement('section')
  const input = document.createElement('input')
  panel.append(input)
  document.body.append(panel)
  const container = { current: panel }
  const inputRef = { current: input }
  const close = vi.fn()
  const hook = renderHook(({ open, board }) => useMobileChatOverlay(open, board, container, inputRef, close), { initialProps: { open: true, board: 440 } })
  return { hook, viewport, panel, input, close }
}

it('keeps panel height through keyboard resize and message rerenders, restores bottom only after keyboard dismissal', () => {
  const { hook, viewport } = setup()
  expect(hook.result.current['--mobile-chat-height' as keyof typeof hook.result.current]).toBe('400px')
  act(() => { viewport.height = 500; viewport.dispatchEvent(new Event('resize')) })
  expect(hook.result.current).toMatchObject({ '--mobile-chat-height': '400px', '--mobile-chat-bottom': '344px' })
  hook.rerender({ open: true, board: 180 })
  expect(hook.result.current).toMatchObject({ '--mobile-chat-height': '400px', '--mobile-chat-bottom': '344px' })
  act(() => { viewport.height = 844; viewport.dispatchEvent(new Event('resize')) })
  expect(hook.result.current).toMatchObject({ '--mobile-chat-height': '400px', '--mobile-chat-bottom': '0px' })
})

it('closes and blurs only on outside taps, ignores chat controls and removes listeners on close', () => {
  const { hook, input, close } = setup()
  input.focus()
  fireEvent.pointerDown(input)
  const trigger = document.createElement('button')
  trigger.setAttribute('aria-controls', 'mobile-room-chat')
  document.body.append(trigger)
  fireEvent.pointerDown(trigger)
  expect(close).not.toHaveBeenCalled()
  fireEvent.pointerDown(document.body)
  expect(close).toHaveBeenCalledTimes(1)
  expect(document.activeElement).not.toBe(input)
  hook.rerender({ open: false, board: 440 })
  fireEvent.pointerDown(document.body)
  expect(close).toHaveBeenCalledTimes(1)
})

it('uses the resized layout viewport without double-counting keyboard height', () => {
  const { hook, viewport } = setup()
  act(() => {
    vi.stubGlobal('innerHeight', 500)
    viewport.height = 500
    viewport.dispatchEvent(new Event('resize'))
  })
  expect(hook.result.current).toMatchObject({ '--mobile-chat-height': '400px', '--mobile-chat-bottom': '0px' })
})
