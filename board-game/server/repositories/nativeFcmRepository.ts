import { getMysqlPool } from './mysqlPool'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'

export class NativeFcmRepository {
  async register(userId: string, hash: string, token: string): Promise<void> {
    // Tokens cannot be silently moved across accounts.
    await getMysqlPool().execute<ResultSetHeader>(
      `INSERT INTO notification_native_fcm_devices (user_id, token_hash, token, enabled)
       VALUES (?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE
         token = IF(user_id = VALUES(user_id), VALUES(token), token),
         enabled = IF(user_id = VALUES(user_id), 1, enabled)`,
      [userId, hash, token],
    )
  }

  async disable(userId: string, hash: string): Promise<void> {
    await getMysqlPool().execute<ResultSetHeader>(
      'UPDATE notification_native_fcm_devices SET enabled = 0 WHERE user_id = ? AND token_hash = ?',
      [userId, hash],
    )
  }

  async tokensForUser(userId: string): Promise<Array<{ token: string; hash: string }>> {
    const [rows] = await getMysqlPool().execute<(RowDataPacket & { token: string; hash: string })[]>(
      'SELECT token, token_hash AS hash FROM notification_native_fcm_devices WHERE user_id = ? AND enabled = 1',
      [userId],
    )
    return rows.map(({token,hash}) => ({ token, hash }))
  }
}
