import { describe, expect, it } from 'vitest'
import {
  updateOnlineAdMatchIdentity,
} from '../src/features/ads/onlineAdOffer'

describe('HOVANG online ad identity V4.1', () => {
  it('creates fallback ID for active match without server ID', () => {
    const result = updateOnlineAdMatchIdentity(
      null, 'room-a', 'playing', undefined, () => 'fallback-a',
    )
    expect(result?.matchId).toBe('fallback-a')
  })

  it('keeps ID during updates of the same match', () => {
    const first = updateOnlineAdMatchIdentity(
      null, 'room-a', 'playing', undefined, () => 'first',
    )
    const second = updateOnlineAdMatchIdentity(
      first, 'room-a', 'playing', undefined, () => 'wrong',
    )
    expect(second?.matchId).toBe('first')
  })

  it('keeps ID when playing becomes finished', () => {
    const first = updateOnlineAdMatchIdentity(
      null, 'room-a', 'playing', undefined, () => 'first',
    )
    const second = updateOnlineAdMatchIdentity(
      first, 'room-a', 'finished', undefined, () => 'wrong',
    )
    expect(second?.matchId).toBe('first')
  })

  it('uses a new ID for a new room', () => {
    const first = updateOnlineAdMatchIdentity(
      null, 'room-a', 'playing', undefined, () => 'first',
    )
    const second = updateOnlineAdMatchIdentity(
      first, 'room-b', 'playing', undefined, () => 'second',
    )
    expect(second?.matchId).toBe('second')
  })

  it('resets identity during ready phase', () => {
    const first = updateOnlineAdMatchIdentity(
      null, 'room-a', 'playing', undefined, () => 'first',
    )
    expect(updateOnlineAdMatchIdentity(
      first, 'room-a', 'ready', undefined, () => 'wrong',
    )).toBeNull()
  })

  it('creates new ID for a rematch', () => {
    const first = updateOnlineAdMatchIdentity(
      null, 'room-a', 'playing', 'match-1', () => 'wrong',
    )
    const finished = updateOnlineAdMatchIdentity(
      first, 'room-a', 'finished', 'match-1', () => 'wrong',
    )
    const next = updateOnlineAdMatchIdentity(
      finished, 'room-a', 'playing', 'match-2', () => 'wrong',
    )
    expect(next?.matchId).toBe('match-2')
  })
})