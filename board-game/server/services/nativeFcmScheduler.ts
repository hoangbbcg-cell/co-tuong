import { getMysqlPool } from '../repositories/mysqlPool'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import { sendNativeFcmToAccount } from './nativeFcmSender'
import { tickNativeFcmEnergyFull } from './nativeFcmEnergyScheduler'
import { OFFLINE_REMINDER_TYPES, OFFLINE_REMINDER_MILESTONES_MS } from './notificationPolicy'

export type OfflineFcmCandidate = { userId: string; cycleId: string; offlineSince: Date; now: number }
export function chooseOfflineReminder(candidate: OfflineFcmCandidate): { kind: string; dedupeKey: string; title: string; body: string } | null {
  const age = candidate.now - new Date(candidate.offlineSince).getTime()
  if (!Number.isFinite(age) || age < OFFLINE_REMINDER_MILESTONES_MS[0]) return null
  // Catch-up: choose the latest overdue milestone, not four push notifications at once.
  let selected = 0
  for (let i = 1; i < OFFLINE_REMINDER_MILESTONES_MS.length; i++) {
    if (age >= OFFLINE_REMINDER_MILESTONES_MS[i]) selected = i
  }
  const type = OFFLINE_REMINDER_TYPES[selected]
  const human = ['6 giờ', '24 giờ', '3 ngày', '7 ngày'][selected]
  return {
    kind: type,
    dedupeKey: `native:${type}:${candidate.cycleId}`,
    title: 'HOVANG Cờ Tướng',
    body: `Bạn đã vắng mặt ${human}. Quay lại HOVANG làm một ván cờ nhé!`,
  }
}

/** No sending unless BOTH flags are enabled. This does not manage energy notices. */
export function startNativeFcmOfflineScheduler(): () => void {
  if (process.env.HOVANG_NATIVE_FCM_SCHEDULER !== 'enabled' ||
      process.env.HOVANG_NATIVE_FCM_SEND !== 'enabled' ||
      process.env.HOVANG_NOTIFICATION_OFFLINE_DB_ENABLED !== '1' ||
      !process.env.DB_NAME) return () => {}
  const pool = getMysqlPool()
  let busy = false
  let closed = false
  const tick = async () => {
    if (busy || closed) return
    busy = true
    try {
      // Only offline accounts with a live, enabled Android token are eligible.
      const [rows] = await pool.query<(RowDataPacket & { userId: string; cycleId: string; offlineSince: Date })[]>(
        `SELECT CAST(c.user_id AS CHAR) userId, CAST(c.cycle_id AS CHAR) cycleId, c.offline_since offlineSince
           FROM notification_offline_cycles c
          WHERE c.offline_since IS NOT NULL
            AND c.offline_since <= UTC_TIMESTAMP(3) - INTERVAL 6 HOUR
            AND EXISTS (SELECT 1 FROM notification_native_fcm_devices n
                        WHERE n.user_id=c.user_id AND n.enabled=1)
          ORDER BY c.offline_since DESC LIMIT 100`,
      )
      for (const row of rows) {
        if (closed) break
        const candidate = chooseOfflineReminder({ ...row, now: Date.now() })
        if (!candidate) continue
        // Critical re-check: user may have come online since the SELECT.
        const [stillOffline] = await pool.execute<(RowDataPacket & { ok: number })[]>(
          `SELECT 1 ok FROM notification_offline_cycles
            WHERE user_id=? AND cycle_id=? AND offline_since IS NOT NULL LIMIT 1`,
          [row.userId, row.cycleId],
        )
        if (stillOffline.length !== 1) continue
        // Unique (user_id,dedupe_key) makes concurrent scheduler instances at-most-once.
        const [insert] = await pool.execute<ResultSetHeader>(
          `INSERT IGNORE INTO notification_deliveries
            (user_id,dedupe_key,kind,title,body,status)
           VALUES (?,?,?,?,?,'pending')`,
          [row.userId, candidate.dedupeKey, candidate.kind, candidate.title, candidate.body],
        )
        if (insert.affectedRows !== 1) continue
        // Avoid sending after a race with a fresh login even after dedupe claim.
        const [checkAgain] = await pool.execute<(RowDataPacket & { ok: number })[]>(
          `SELECT 1 ok FROM notification_offline_cycles
            WHERE user_id=? AND cycle_id=? AND offline_since IS NOT NULL LIMIT 1`,
          [row.userId, row.cycleId],
        )
        if (checkAgain.length !== 1) {
          await pool.execute(`UPDATE notification_deliveries SET status='cancelled' WHERE user_id=? AND dedupe_key=?`, [row.userId, candidate.dedupeKey])
          continue
        }
        try {
          const result = await sendNativeFcmToAccount(row.userId, candidate.title, candidate.body)
          await pool.execute(`UPDATE notification_deliveries SET status=?, sent_at=IF(?='sent', UTC_TIMESTAMP(3), NULL)
            WHERE user_id=? AND dedupe_key=?`,
            [result.sent > 0 ? 'sent' : 'failed', result.sent > 0 ? 'sent' : 'failed', row.userId, candidate.dedupeKey])
        } catch {
          await pool.execute(`UPDATE notification_deliveries SET status='failed' WHERE user_id=? AND dedupe_key=?`, [row.userId, candidate.dedupeKey])
          console.error('Native FCM offline delivery failed')
        }
      }
      await tickNativeFcmEnergyFull()
    } catch {
      console.error('Native FCM offline scheduler tick failed')
    } finally { busy = false }
  }
  const timer = setInterval(() => { void tick() }, 5 * 60 * 1000)
  timer.unref?.()
  void tick()
  return () => { closed = true; clearInterval(timer) }
}
