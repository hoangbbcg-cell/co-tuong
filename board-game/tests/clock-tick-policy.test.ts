import { describe, expect, it } from 'vitest'
import { shouldPlayClockTick } from '../src/features/game/audio/clockTickPolicy'

const clock = (
  phase: 'ready' | 'playing' | 'finished',
  elapsed: number,
  remaining = 600_000,
) => ({
  phase,
  turnElapsed: elapsed,
  currentTurn: 'red' as const,
  remainingTime: { red: remaining, black: 600_000 },
})

describe('HOVANG V6.6 clock tick policy', () => {
  it('does not play before the match', () => {
    expect(shouldPlayClockTick(clock('ready', 0))).toBe(false)
  })

  it('does not play before the clock advances', () => {
    expect(shouldPlayClockTick(clock('playing', 0))).toBe(false)
  })

  it('stays silent after the clock advances, even with zero moves', () => {
    expect(shouldPlayClockTick(clock('playing', 1000))).toBe(false)
  })

  it('stays silent on the next turn', () => {
    expect(shouldPlayClockTick(clock('playing', 100))).toBe(false)
  })

  it('does not play when a repetition notice pauses time', () => {
    expect(shouldPlayClockTick(clock('playing', 1000), true)).toBe(false)
  })

  it('does not play after timeout', () => {
    expect(shouldPlayClockTick(clock('playing', 1000, 0))).toBe(false)
  })

  it('stops when finished', () => {
    expect(shouldPlayClockTick(clock('finished', 1000))).toBe(false)
  })
})