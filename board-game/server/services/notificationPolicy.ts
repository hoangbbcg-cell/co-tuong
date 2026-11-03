/** HOVANG notification timing rules. All timestamps are UTC milliseconds. */
export const OFFLINE_REMINDER_MILESTONES_MS = [6, 24, 72, 168].map(hours => hours * 60 * 60 * 1000) as readonly number[]
export type OfflineReminder = 'offline_6h' | 'offline_24h' | 'offline_3d' | 'offline_7d'
export const OFFLINE_REMINDER_TYPES: readonly OfflineReminder[] = ['offline_6h', 'offline_24h', 'offline_3d', 'offline_7d']

/** A reminder is due once per offline cycle, never while any user session is online. */
export function dueOfflineReminders(input: {
  now: number
  offlineSince: number | null
  onlineConnections: number
  sentThisCycle: readonly OfflineReminder[]
}): OfflineReminder[] {
  const { now, offlineSince, onlineConnections, sentThisCycle } = input
  if (onlineConnections > 0 || offlineSince === null || !Number.isFinite(now) || !Number.isFinite(offlineSince) || now < offlineSince) return []
  return OFFLINE_REMINDER_TYPES.filter((type, index) =>
    now - offlineSince >= OFFLINE_REMINDER_MILESTONES_MS[index] && !sentThisCycle.includes(type))
}

/** Sends energy-full notice only on a genuine transition to full, and only offline. */
export function shouldNotifyEnergyFull(input: { previousEnergy: number; energy: number; maximum: number; onlineConnections: number }) {
  const {previousEnergy, energy, maximum, onlineConnections} = input
  return onlineConnections === 0 && maximum > 0 && previousEnergy < maximum && energy >= maximum
}

/** Compute local clock hour in Vietnam, independent of server timezone. */
export function vietnamHour(now: number) {
  return new Date(now + 7 * 60 * 60 * 1000).getUTCHours()
}

/** Daily live-event reminder slots, with a two-hour gap per active event. */
export function eventReminderHour(index: number, baseHour: 7 | 18): number | null {
  if (!Number.isInteger(index) || index < 0) return null
  const hour = baseHour + index * 2
  return hour < 24 ? hour : null
}

/** Notifications must not claim maintenance ended just because expected time passed. */
export function maintenanceCompletionAllowed(input: { maintenanceStatus: string; appHealthy: boolean; confirmedByAdmin: boolean }) {
  return input.maintenanceStatus === 'active' && input.appHealthy && input.confirmedByAdmin
}
