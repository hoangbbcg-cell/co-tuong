import { describe, expect, it } from 'vitest'
import { notificationInviteKey, shouldOfferNotificationInvite } from '../src/services/notificationInvitePolicy'
const base = { authenticated: true, onHome: true, supported: true, permission: 'default' as const, previouslyDismissed: false }
describe('notification invite policy', () => {
  it('shows on home after login', () => expect(shouldOfferNotificationInvite(base)).toBe(true))
  it('never shows before login', () => expect(shouldOfferNotificationInvite({ ...base, authenticated: false })).toBe(false))
  it('never shows while playing', () => expect(shouldOfferNotificationInvite({ ...base, onHome: false })).toBe(false))
  it('does not re-prompt dismissed accounts', () => expect(shouldOfferNotificationInvite({ ...base, previouslyDismissed: true })).toBe(false))
  it('does not prompt after permission granted or denied', () => {
    expect(shouldOfferNotificationInvite({ ...base, permission: 'granted' })).toBe(false)
    expect(shouldOfferNotificationInvite({ ...base, permission: 'denied' })).toBe(false)
  })
  it('does not prompt on unsupported platform', () => expect(shouldOfferNotificationInvite({ ...base, supported: false })).toBe(false))
  it('separates dismissal preferences by account', () => expect(notificationInviteKey(1)).not.toBe(notificationInviteKey(2)))
})
