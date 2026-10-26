import { afterEach, describe, expect, it, vi } from 'vitest'
import { useChallengeCooldownStore } from '../src/store/challengeCooldownStore'

afterEach(() => {
  vi.clearAllTimers()
  vi.useRealTimers()
  useChallengeCooldownStore.setState({ until: 0 })
})

describe('shared invitation cooldown', () => {
  it('blocks repeated sends and releases all subscribers after five seconds', () => {
    vi.useFakeTimers()
    expect(useChallengeCooldownStore.getState().start()).toBe(true)
    const firstUntil = useChallengeCooldownStore.getState().until
    vi.advanceTimersByTime(4999)
    expect(useChallengeCooldownStore.getState().start()).toBe(false)
    expect(useChallengeCooldownStore.getState().until).toBe(firstUntil)
    vi.advanceTimersByTime(1)
    expect(useChallengeCooldownStore.getState().until).toBe(0)
    expect(useChallengeCooldownStore.getState().start()).toBe(true)
  })
})
