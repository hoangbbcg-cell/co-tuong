import { describe, expect, it } from 'vitest'
import {
  eligibleOnlineExitAdId,
  queueOnlineAdOffer,
  getPendingOnlineAdOffer,
  takeOnlineAdOffer,
} from '../src/features/ads/onlineAdOffer'

describe('Online exit Mock Ad eligibility', () => {
  it('allows an active online player to leave mid-match', () => {
    expect(
      eligibleOnlineExitAdId(true, true, 'playing', 'active-match')
    ).toBe('active-match')
  })

  it('allows completed online matches', () => {
    expect(
      eligibleOnlineExitAdId(
        true, true, 'finished', null, 'completed-match'
      )
    ).toBe('completed-match')
  })

  it('rejects ready room, spectator, offline and missing match IDs', () => {
    expect(
      eligibleOnlineExitAdId(true, true, 'ready', 'match')
    ).toBeUndefined()

    expect(
      eligibleOnlineExitAdId(true, false, 'playing', 'match')
    ).toBeUndefined()

    expect(
      eligibleOnlineExitAdId(false, true, 'playing', 'match')
    ).toBeUndefined()

    expect(
      eligibleOnlineExitAdId(true, true, 'playing')
    ).toBeUndefined()
  })

  it('does not repeat an offer for the same online match', () => {
    const id = 'exit-test-' + Math.random()
    expect(queueOnlineAdOffer(id)).toBe(true)
    expect(getPendingOnlineAdOffer()).toBe(id)
    expect(takeOnlineAdOffer(id)).toBe(true)
    expect(queueOnlineAdOffer(id)).toBe(false)
  })
})