// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { OpeningCover } from '../src/features/game/components/OpeningCover'

const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  if (originalAnimate) Object.defineProperty(Element.prototype, 'animate', originalAnimate)
  else Reflect.deleteProperty(Element.prototype, 'animate')
})

it('fallback completes at 600ms and cancels an abandoned opening', () => {
  Reflect.deleteProperty(Element.prototype, 'animate')
  const complete = vi.fn()
  const view = render(<OpeningCover onComplete={complete} />)
  act(() => vi.advanceTimersByTime(599))
  expect(complete).not.toHaveBeenCalled()
  act(() => vi.advanceTimersByTime(1))
  expect(complete).toHaveBeenCalledOnce()
  view.unmount()
  const abandoned = vi.fn()
  const next = render(<OpeningCover onComplete={abandoned} />)
  next.unmount()
  act(() => vi.advanceTimersByTime(600))
  expect(abandoned).not.toHaveBeenCalled()
})

it('both Web Animations panels use 600ms; last panel finishes and cleanup cancels both', () => {
  const animations: Array<{ onfinish: (() => void) | null; cancel: ReturnType<typeof vi.fn> }> = []
  const animate = vi.fn((_frames: Keyframe[] | PropertyIndexedKeyframes, _options?: KeyframeAnimationOptions) => {
    const animation = { onfinish: null as (() => void) | null, cancel: vi.fn() }
    animations.push(animation)
    return animation
  })
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
  const complete = vi.fn()
  const view = render(<OpeningCover onComplete={complete} />)
  expect(animate).toHaveBeenCalledTimes(2)
  for (const call of animate.mock.calls) expect(call[1]).toMatchObject({ duration: 600, fill: 'both' })
  act(() => vi.advanceTimersByTime(600))
  expect(complete).not.toHaveBeenCalled()
  act(() => animations[1].onfinish?.())
  expect(complete).toHaveBeenCalledOnce()
  view.unmount()
  for (const animation of animations) {
    expect(animation.onfinish).toBeNull()
    expect(animation.cancel).toHaveBeenCalledOnce()
  }
})

it('mobile waits for piece decoding before the full600ms reveal; unmount cancels pending work', async () => {
  Reflect.deleteProperty(Element.prototype, 'animate')
  let ready!: () => void
  const complete = vi.fn()
  const view = render(<div><img data-cached-piece-face="true" alt="" ref={image => {
    if (image) image.decode = () => new Promise<void>(resolve => { ready = resolve })
  }} /><OpeningCover onComplete={complete} waitForPieceImages /></div>)
  act(() => vi.advanceTimersByTime(5000))
  expect(complete).not.toHaveBeenCalled()
  await act(async () => { ready(); await Promise.resolve() })
  act(() => vi.advanceTimersByTime(40))
  expect(complete).not.toHaveBeenCalled()
  act(() => vi.advanceTimersByTime(600))
  expect(complete).toHaveBeenCalledOnce()
  view.unmount()
  complete.mockClear()
  const abandoned = render(<div><img data-cached-piece-face="true" alt="" ref={image => {
    if (image) image.decode = () => new Promise<void>(resolve => { ready = resolve })
  }} /><OpeningCover onComplete={complete} waitForPieceImages /></div>)
  abandoned.unmount()
  await act(async () => { ready(); await Promise.resolve() })
  act(() => vi.advanceTimersByTime(1000))
  expect(complete).not.toHaveBeenCalled()
})
