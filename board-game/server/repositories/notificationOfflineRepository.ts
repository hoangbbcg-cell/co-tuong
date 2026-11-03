import { getMysqlPool } from './mysqlPool'

/** Requires migration 019_notifications.sql. All dates stored as UTC, MySQL DATETIME(3). */
export class NotificationOfflineRepository {
  async online(userId: string): Promise<void> {
    await getMysqlPool().execute(
      `INSERT INTO notification_offline_cycles (user_id, offline_since, cycle_id)
       VALUES (?, NULL, 1)
       ON DUPLICATE KEY UPDATE offline_since = NULL, cycle_id = cycle_id + 1`, [userId])
  }

  async offline(userId: string, at: number): Promise<void> {
    if (!Number.isFinite(at)) throw new Error('Invalid offline timestamp')
    // Only set once. The caller guarantees this is the last live connection.
    await getMysqlPool().execute(
      `INSERT INTO notification_offline_cycles (user_id, offline_since, cycle_id)
       VALUES (?, ?, 1)
       ON DUPLICATE KEY UPDATE offline_since = COALESCE(offline_since, VALUES(offline_since))`,
      [userId, new Date(at)])
  }
}
