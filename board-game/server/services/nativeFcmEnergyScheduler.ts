import { createHash } from 'node:crypto'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import { getMysqlPool } from '../repositories/mysqlPool'
import { sendNativeFcmToAccount } from './nativeFcmSender'
import { ENERGY_RECOVERY_MS, MAX_ENERGY } from '../../src/lib/energy'

type Candidate = RowDataPacket & {
  userId: string
  cycleId: string
  energy: number
  recoveryAt: Date
  offlineSince: Date
}

export function energyFullAt(
  energy: number,
  recoveryAt: number | null
): number | null {
  if (!Number.isInteger(energy) ||
      energy < 0 ||
      energy >= MAX_ENERGY ||
      recoveryAt === null ||
      !Number.isFinite(recoveryAt)) return null

  return recoveryAt +
    (MAX_ENERGY - energy - 1) * ENERGY_RECOVERY_MS
}

export function shouldSendEnergyFull(input: {
  energy: number
  recoveryAt: number | null
  offlineSince: number
  now: number
}): boolean {
  const full = energyFullAt(input.energy, input.recoveryAt)
  return full !== null &&
    Number.isFinite(input.offlineSince) &&
    Number.isFinite(input.now) &&
    full >= input.offlineSince &&
    full <= input.now
}

export function energyDedupeKey(
  userId: string,
  cycleId: string,
  energy: number,
  recoveryAt: number
): string {
  const hash = createHash('sha256')
    .update([userId, cycleId, energy, recoveryAt].join(':'))
    .digest('hex')
  return `native:energy_full:${hash}`
}

/** Uses real paid energy entitlement data. */
async function unlimited(userId: string): Promise<boolean> {
  const [rows] = await getMysqlPool().execute<
    (RowDataPacket & { active: number })[]
  >(
    `SELECT EXISTS(
       SELECT 1 FROM energy_subscriptions
       WHERE user_id=? AND unlimited_until > UTC_TIMESTAMP(3)
     ) AS active`,
    [userId]
  )
  return Number(rows[0]?.active) === 1
}

const title = 'HOVANG Cờ Tướng'
const body = 'Năng lượng của bạn đã đầy. Quay lại HOVANG chơi cờ nhé!'

async function readCurrent(
  userId: string,
  cycleId: string
): Promise<Candidate | null> {
  const [rows] = await getMysqlPool().execute<Candidate[]>(
    `SELECT CAST(r.user_id AS CHAR) AS userId,
            CAST(c.cycle_id AS CHAR) AS cycleId,
            r.energy AS energy,
            r.energy_recovery_at AS recoveryAt,
            c.offline_since AS offlineSince
       FROM user_resources r
       JOIN notification_offline_cycles c ON c.user_id=r.user_id
       WHERE r.user_id=? AND c.cycle_id=?
         AND c.offline_since IS NOT NULL`,
    [userId, cycleId]
  )
  return rows.length === 1 ? rows[0] : null
}

function matches(
  row: Candidate | null,
  expected: Candidate
): boolean {
  if (!row) return false
  const recoveryAt = new Date(row.recoveryAt).getTime()
  return Number(row.energy) === Number(expected.energy) &&
    recoveryAt === new Date(expected.recoveryAt).getTime() &&
    shouldSendEnergyFull({
      energy: Number(row.energy),
      recoveryAt,
      offlineSince: new Date(row.offlineSince).getTime(),
      now: Date.now()
    })
}

/** Called only from the existing gated offline scheduler. */
export async function tickNativeFcmEnergyFull(): Promise<void> {
  if (
    process.env.HOVANG_NATIVE_FCM_SCHEDULER !== 'enabled' ||
    process.env.HOVANG_NATIVE_FCM_SEND !== 'enabled' ||
    process.env.HOVANG_NOTIFICATION_OFFLINE_DB_ENABLED !== '1' ||
    !process.env.DB_NAME
  ) return

  const pool = getMysqlPool()

  const [rows] = await pool.query<Candidate[]>(
    `SELECT CAST(r.user_id AS CHAR) AS userId,
            CAST(c.cycle_id AS CHAR) AS cycleId,
            r.energy AS energy,
            r.energy_recovery_at AS recoveryAt,
            c.offline_since AS offlineSince
       FROM user_resources r
       JOIN notification_offline_cycles c ON c.user_id=r.user_id
       JOIN users u ON u.id=r.user_id AND u.status='active'
       WHERE c.offline_since IS NOT NULL
         AND r.energy < 5
         AND r.energy_recovery_at IS NOT NULL
         AND TIMESTAMPADD(
           MINUTE,(5-r.energy-1)*7,r.energy_recovery_at
         ) <= UTC_TIMESTAMP(3)
         AND EXISTS (
           SELECT 1 FROM notification_native_fcm_devices n
           WHERE n.user_id=r.user_id AND n.enabled=1
         )
       ORDER BY r.energy_recovery_at DESC
       LIMIT 100`
  )

  for (const row of rows) {
    const recoveryAt = new Date(row.recoveryAt).getTime()

    if (!shouldSendEnergyFull({
      energy: Number(row.energy),
      recoveryAt,
      offlineSince: new Date(row.offlineSince).getTime(),
      now: Date.now()
    })) continue

    if (await unlimited(row.userId)) continue

    const key = energyDedupeKey(
      row.userId, row.cycleId, Number(row.energy), recoveryAt
    )

    if (!matches(
      await readCurrent(row.userId, row.cycleId), row
    )) continue

    const [claim] = await pool.execute<ResultSetHeader>(
      `INSERT IGNORE INTO notification_deliveries
         (user_id,dedupe_key,kind,title,body,status)
       VALUES (?,?,'energy_full',?,?,'pending')`,
      [row.userId, key, title, body]
    )

    if (claim.affectedRows !== 1) continue

    try {
      const current = await readCurrent(row.userId, row.cycleId)

      if (!matches(current, row) || await unlimited(row.userId)) {
        await pool.execute(
          `UPDATE notification_deliveries
           SET status='cancelled'
           WHERE user_id=? AND dedupe_key=?`,
          [row.userId, key]
        )
        continue
      }

      const result = await sendNativeFcmToAccount(
        row.userId, title, body
      )

      const status = result.sent > 0 ? 'sent' : 'failed'

      await pool.execute(
        `UPDATE notification_deliveries
         SET status=?,
             sent_at=IF(?='sent',UTC_TIMESTAMP(3),NULL)
         WHERE user_id=? AND dedupe_key=?`,
        [status, status, row.userId, key]
      )
    } catch {
      await pool.execute(
        `UPDATE notification_deliveries
         SET status='failed'
         WHERE user_id=? AND dedupe_key=?`,
        [row.userId, key]
      )
      console.error('Native FCM energy-full delivery failed')
    }
  }
}