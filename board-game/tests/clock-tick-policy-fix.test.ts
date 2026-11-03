import { describe, expect, it } from 'vitest'
import { shouldPlayClockTick } from '../src/features/game/audio/clockTickPolicy'

describe('clock tick eligibility', () => {
  const game = {
    phase: 'playing' as const,
    turnElapsed: 0,
    currentTurn: 'red' as const,
    remainingTime: { red: 60000, black: 60000 },
  }

  it('keeps the start of play silent', () => {
    expect(shouldPlayClockTick(game)).toBe(false)
  })

  it('is silent while ready or finished', () => {
    expect(shouldPlayClockTick({ ...game, phase: 'ready' })).toBe(false)
    expect(shouldPlayClockTick({ ...game, phase: 'finished' })).toBe(false)
  })

  it('is silent when paused or out of time', () => {
    expect(shouldPlayClockTick(game, true)).toBe(false)
    expect(shouldPlayClockTick({
      ...game,
      remainingTime: { red: 0, black: 60000 },
    })).toBe(false)
  })
})