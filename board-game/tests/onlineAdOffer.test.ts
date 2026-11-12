import { describe, expect, it } from 'vitest'
import { queueOnlineAdOffer, getPendingOnlineAdOffer, dismissOnlineAdOffer, takeOnlineAdOffer, subscribeOnlineAdOffer } from '../src/features/ads/onlineAdOffer'

describe('post-match online ad offer', () => {
  it('offers once per match, never automatically shows an ad', () => {
    const id = 'qa-online-ad-' + Math.random()
    expect(queueOnlineAdOffer(id)).toBe(true)
    expect(getPendingOnlineAdOffer()).toBe(id)
    expect(queueOnlineAdOffer(id)).toBe(false)
    dismissOnlineAdOffer(id)
    expect(getPendingOnlineAdOffer()).toBe(null)
    expect(queueOnlineAdOffer(id)).toBe(false)
  })
  it('does not allow dismissing the wrong match', () => {
    const id = 'qa-other-' + Math.random()
    queueOnlineAdOffer(id)
    dismissOnlineAdOffer('wrong-match')
    expect(getPendingOnlineAdOffer()).toBe(id)
    dismissOnlineAdOffer(id)
  })
  it('consumes a finished match only once before automatic ad request', () => {
    const id = 'qa-auto-' + Math.random()
    expect(queueOnlineAdOffer(id)).toBe(true)
    expect(takeOnlineAdOffer(id)).toBe(true)
    expect(takeOnlineAdOffer(id)).toBe(false)
    expect(getPendingOnlineAdOffer()).toBe(null)
    expect(queueOnlineAdOffer(id)).toBe(false)
  })
  it('does not consume a different match', () => {
    const id = 'qa-current-' + Math.random()
    queueOnlineAdOffer(id)
    expect(takeOnlineAdOffer('another-id')).toBe(false)
    expect(getPendingOnlineAdOffer()).toBe(id)
    dismissOnlineAdOffer(id)
  })
  it('notifies subscribers of changes', () => {
    const id = 'qa-notification-' + Math.random()
    let changes = 0
    const unsubscribe = subscribeOnlineAdOffer(() => { changes += 1 })
    queueOnlineAdOffer(id)
    dismissOnlineAdOffer(id)
    unsubscribe()
    expect(changes).toBe(2)
  })
})