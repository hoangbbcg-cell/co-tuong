import { describe, expect, it } from 'vitest'
import { dueOfflineReminders, shouldNotifyEnergyFull, eventReminderHour, vietnamHour, maintenanceCompletionAllowed } from '../server/services/notificationPolicy'
const H = 3600_000
const base = 1_900_000_000_000

describe('HOVANG notification rules', () => {
  it('never reminds while any game connection is online', () => {
    expect(dueOfflineReminders({ now: base + 8*H, offlineSince: base, onlineConnections: 1, sentThisCycle: [] })).toEqual([])
  })
  it('starts from the last device disconnect and triggers six-hour reminder once', () => {
    expect(dueOfflineReminders({ now: base + 6*H - 1, offlineSince: base, onlineConnections: 0, sentThisCycle: [] })).toEqual([])
    expect(dueOfflineReminders({ now: base + 6*H, offlineSince: base, onlineConnections: 0, sentThisCycle: [] })).toEqual(['offline_6h'])
    expect(dueOfflineReminders({ now: base + 6*H, offlineSince: base, onlineConnections: 0, sentThisCycle: ['offline_6h'] })).toEqual([])
  })
  it('supports 1-day, 3-day and 7-day milestones without duplicates', () => {
    expect(dueOfflineReminders({ now: base + 168*H, offlineSince: base, onlineConnections: 0, sentThisCycle: ['offline_6h','offline_24h'] })).toEqual(['offline_3d','offline_7d'])
  })
  it('requires a real offline energy-full transition', () => {
    expect(shouldNotifyEnergyFull({previousEnergy: 4,energy: 5,maximum: 5,onlineConnections: 0})).toBe(true)
    expect(shouldNotifyEnergyFull({previousEnergy: 5,energy: 5,maximum: 5,onlineConnections: 0})).toBe(false)
    expect(shouldNotifyEnergyFull({previousEnergy: 4,energy: 5,maximum: 5,onlineConnections: 1})).toBe(false)
  })
  it('spaces event reminders by two hours without crossing midnight', () => {
    expect([0,1,2].map(i=>eventReminderHour(i,7))).toEqual([7,9,11])
    expect([0,1,2,3].map(i=>eventReminderHour(i,18))).toEqual([18,20,22,null])
  })
  it('uses Vietnam time for schedules', () => {
    expect(vietnamHour(Date.UTC(2026,9,31,0,0))).toBe(7)
  })
  it('never announces maintenance completion without admin confirmation and health', () => {
    expect(maintenanceCompletionAllowed({maintenanceStatus:'active',appHealthy:true,confirmedByAdmin:false})).toBe(false)
    expect(maintenanceCompletionAllowed({maintenanceStatus:'active',appHealthy:true,confirmedByAdmin:true})).toBe(true)
  })
})
