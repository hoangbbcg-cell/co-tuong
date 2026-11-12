import { describe, expect, it } from 'vitest'
import { shouldRestartReadyForChangedPair } from '../src/lib/roomReadiness'

describe('Ready timer after reseating an online room', () => {
  it('restarts when a new pair sits after a finished game', () => {
    expect(shouldRestartReadyForChangedPair('finished', ['winner', 'newcomer'], 'loser:winner', false)).toBe(true)
  })
  it('restarts when a player leaves and a viewer immediately takes their place', () => {
    expect(shouldRestartReadyForChangedPair('finished', ['old', 'viewer'], null, false)).toBe(true)
  })
  it('retains the old pair rematch waiting period', () => {
    expect(shouldRestartReadyForChangedPair('finished', ['black', 'red'], 'black:red', false)).toBe(false)
  })
  it('never restarts during a game or with only one seated player', () => {
    expect(shouldRestartReadyForChangedPair('playing', ['old', 'new'], null, false)).toBe(false)
    expect(shouldRestartReadyForChangedPair('finished', ['old'], null, false)).toBe(false)
    expect(shouldRestartReadyForChangedPair('ready', ['old', 'new'], null, false)).toBe(false)
  })
  it('preserves pending queue rotation and rejects duplicate seats', () => {
    expect(shouldRestartReadyForChangedPair('finished', ['old', 'new'], null, true)).toBe(false)
    expect(shouldRestartReadyForChangedPair('finished', ['same', 'same'], null, false)).toBe(false)
  })
})