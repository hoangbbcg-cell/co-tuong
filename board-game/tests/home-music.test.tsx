// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })

it('phát đúng thứ tự, chờ4s và không bị thao tác/rời màn bỏ qua khoảng nghỉ', async () => {
  vi.useFakeTimers()
  vi.resetModules()
  class MockAudio extends EventTarget {
    src: string
    paused = true
    ended = false
    preload = ''
    loop = false
    constructor(src: string) { super(); this.src = src }
    play = vi.fn(async () => { this.paused = false; this.ended = false })
    pause = vi.fn(() => { this.paused = true })
    load = vi.fn(() => { this.ended = false })
  }
  let audio: MockAudio
  vi.stubGlobal('Audio', class extends MockAudio { constructor(src: string) { super(src); audio = this } })
  const { useHomeMusic } = await import('../src/features/lobby/hooks/useHomeMusic')
  const view = renderHook(useHomeMusic)
  expect(audio!.src).toContain('155926')
  const finish = () => act(() => { audio!.ended = true; audio!.paused = true; audio!.dispatchEvent(new Event('ended')) })
  finish()
  act(() => { document.dispatchEvent(new Event('pointerdown')); vi.advanceTimersByTime(3999) })
  expect(audio!.src).toContain('155926')
  view.unmount()
  act(() => vi.advanceTimersByTime(1))
  expect(audio!.src).toContain('247345')
  finish()
  act(() => vi.advanceTimersByTime(4000))
  expect(audio!.src).toContain('618302')
  finish()
  act(() => vi.advanceTimersByTime(4000))
  expect(audio!.src).toContain('155926')
})
