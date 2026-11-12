import { getMysqlPool } from './mysqlPool'
import type { ResultSetHeader } from 'mysql2'
import type { ValidatedNotificationDevice } from '../services/notificationDevicePolicy'

/** Dormant repository until an authenticated account API is wired. Requires migration 019. */
export class NotificationDeviceRepository {
  async upsert(userId: string, device: ValidatedNotificationDevice): Promise<void> {
    // Never transfer an endpoint registered to another account implicitly.
    await getMysqlPool().execute<ResultSetHeader>(
      `INSERT INTO notification_devices (user_id, endpoint_hash, endpoint, push_p256dh, push_auth, platform, enabled)
       VALUES (?, ?, ?, ?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE
         user_id = IF(user_id = VALUES(user_id), VALUES(user_id), user_id),
         endpoint = IF(user_id = VALUES(user_id), VALUES(endpoint), endpoint),
         push_p256dh = IF(user_id = VALUES(user_id), VALUES(push_p256dh), push_p256dh),
         push_auth = IF(user_id = VALUES(user_id), VALUES(push_auth), push_auth),
         platform = IF(user_id = VALUES(user_id), VALUES(platform), platform),
         enabled = IF(user_id = VALUES(user_id), 1, enabled)`,
      [userId, device.endpointHash, device.endpoint, device.p256dh, device.auth, device.platform],
    )
  }

  async disable(userId: string, endpointHash: string): Promise<boolean> {
    const [result] = await getMysqlPool().execute<ResultSetHeader>(
      'UPDATE notification_devices SET enabled = 0 WHERE user_id = ? AND endpoint_hash = ?',
      [userId, endpointHash],
    )
    return result.affectedRows > 0
  }
}
