// @vitest-environment jsdom
import { createRef } from 'react'
import { act, cleanup, render, renderHook, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { MatchIntro } from '../src/features/game/components/MatchIntro'
import { useMatchIntro } from '../src/features/game/hooks/useMatchIntro'
import type { AccountProfile } from '../src/types/account'
import { MATCH_INTRO_MS } from '../src/game/moves/actions'

vi.mock('../src/features/lobby/hooks/useDatabaseProfile', () => ({ useDatabaseProfile: (name: string) => ({
  displayName: name, avatarCode: 'avatar-0', avatarFrameCode: 'frame-0',
  stats: [{ variant: 'xiangqi', elo: name === 'Red' ? 1100 : 1900 }, { variant: 'jieqi', elo: name === 'Red' ? 2100 : 1200 }],
} as AccountProfile) }))
const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, 'animate')
afterEach(() => { if (originalAnimate) Object.defineProperty(Element.prototype, 'animate', originalAnimate); else Reflect.deleteProperty(Element.prototype, 'animate'); cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

it.each(['xiangqi', 'jieqi'] as const)('orders players by the actual %s Elo and includes portraits/frames', variant => {
  const intro = { visible: true, panelRef: createRef<HTMLDivElement>(), redRef: createRef<HTMLDivElement>(), blackRef: createRef<HTMLDivElement>(), crossRef: createRef<HTMLDivElement>(), leftSwordRef: createRef<HTMLDivElement>(), rightSwordRef: createRef<HTMLDivElement>() }
  render(<MatchIntro intro={intro} redName="Red" blackName="Black" variant={variant} />)
  const panel = screen.getByTestId('match-intro')
  const top = panel.querySelector('[data-intro-position="top"]')!
  const bottom = panel.querySelector('[data-intro-position="bottom"]')!
  expect(top.textContent).toContain(variant === 'xiangqi' ? 'Black' : 'Red')
  expect(Number(top.getAttribute('data-intro-elo'))).toBeGreaterThan(Number(bottom.getAttribute('data-intro-elo')))
  expect(top.querySelector('img')).toBeTruthy()
  expect(panel.querySelectorAll('[data-intro-sword]')).toHaveLength(2)
  expect(panel.querySelector('[data-intro-emblem] img')).toBeTruthy()
  expect(top.querySelector('[style*=background-image]')).toBeTruthy()
})

it('slides opposite ways, slows in the middle, fades over 50px and cleans up after the full introduction', () => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const cancel = vi.fn()
  const animate = vi.fn<(frames: Keyframe[], options: KeyframeAnimationOptions) => Animation>(() => ({ cancel } as unknown as Animation))
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate })
  const { result, rerender } = renderHook(({ phase }: { phase: 'ready' | 'playing' }) => useMatchIntro(phase, 'room'), { initialProps: { phase: 'ready' } })
  result.current.redRef.current = document.createElement('div')
  result.current.blackRef.current = document.createElement('div')
  result.current.crossRef.current = document.createElement('div')
  result.current.leftSwordRef.current = document.createElement('div')
  result.current.rightSwordRef.current = document.createElement('div')
  rerender({ phase: 'playing' })
  expect(result.current.visible).toBe(true)
  const top = animate.mock.calls[0][0] as Keyframe[]
  const bottom = animate.mock.calls[1][0] as Keyframe[]
  expect(top[0].transform).toMatch(/translateX\(-/)
  expect(bottom[0].transform).not.toMatch(/translateX\(-/)
  expect(top[2]).toMatchObject({ transform: 'translateX(16px)', opacity: 1 })
  expect((Number(top[2].offset) - Number(top[1].offset)) * MATCH_INTRO_MS).toBe(1000)
  expect(top[3]).toMatchObject({ transform: 'translateX(66px)', opacity: 0 })
  const emblem = animate.mock.calls[2][0] as Keyframe[]
  expect(emblem[0].transform).toContain('translateZ(360px)')
  const sword = animate.mock.calls[3][0] as Keyframe[]
  expect(sword[0].transform).toBe('translate(-36px, -36px)')
  expect((Number(sword[2].offset) - Number(sword[1].offset)) * MATCH_INTRO_MS).toBe(1000)
  act(() => vi.advanceTimersByTime(1300))
  expect(result.current.visible).toBe(true)
  act(() => vi.advanceTimersByTime(MATCH_INTRO_MS - 1300))
  expect(result.current.visible).toBe(false)
  expect(cancel).toHaveBeenCalled()
})
