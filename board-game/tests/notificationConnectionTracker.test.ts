import { describe, expect, it } from 'vitest'
import { NotificationConnectionTracker } from '../server/services/notificationConnectionTracker'

describe('HOVANG account-level connection tracking', () => {
  it('starts offline only after the last device disconnects', () => {
    const tracker = new NotificationConnectionTracker()
    tracker.connect('user1', 'phone', 100)
    tracker.connect('user1', 'desktop', 110)
    expect(tracker.disconnect('phone', 120)).toEqual({ onlineConnections: 1, offlineSince: null })
    expect(tracker.disconnect('desktop', 130)).toEqual({ onlineConnections: 0, offlineSince: 130 })
  })
  it('resets offline clock on return and begins a new cycle on exit', () => {
    const tracker = new NotificationConnectionTracker()
    tracker.connect('user1', 'phone', 100)
    tracker.disconnect('phone', 200)
    expect(tracker.get('user1').offlineSince).toBe(200)
    expect(tracker.connect('user1', 'phone', 300).offlineSince).toBeNull()
    tracker.disconnect('phone', 400)
    expect(tracker.get('user1').offlineSince).toBe(400)
  })
  it('ignores duplicate connections and repeated disconnects', () => {
    const tracker = new NotificationConnectionTracker()
    tracker.connect('user1', 'tab', 100)
    tracker.connect('user1', 'tab', 110)
    expect(tracker.get('user1').onlineConnections).toBe(1)
    tracker.disconnect('tab', 120)
    expect(tracker.disconnect('tab', 130)).toBeNull()
    expect(tracker.get('user1').offlineSince).toBe(120)
  })
  it('isolates accounts and reassigns a reused socket id', () => {
    const tracker = new NotificationConnectionTracker()
    tracker.connect('a', 'socket', 100)
    tracker.connect('b', 'socket', 200)
    expect(tracker.get('a')).toEqual({ onlineConnections: 0, offlineSince: 200 })
    expect(tracker.get('b')).toEqual({ onlineConnections: 1, offlineSince: null })
  })
})
