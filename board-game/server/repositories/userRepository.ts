import type { RowDataPacket } from 'mysql2/promise'
import { getMysqlConnection, getMysqlPool } from './mysqlPool'

export interface DatabaseUser { id: string; publicId: string; guestCode: string; displayName: string; linked: boolean; renamed: boolean; active: boolean }
export interface UserPersistence {
  createGuest(code: string, publicId: string): Promise<DatabaseUser>
  renameLinkedUser(id: string, name: string): Promise<boolean>
}
const userSelect = `SELECT CAST(id AS CHAR) AS id, CAST(public_id AS CHAR) AS publicId, guest_code AS guestCode,
 display_name AS displayName, linked_at IS NOT NULL AS linked, name_changed_at IS NOT NULL AS renamed, status='active' AS active FROM users`
function toUser(row: RowDataPacket): DatabaseUser {
  return { id: String(row.id), publicId: String(row.publicId), guestCode: String(row.guestCode), displayName: String(row.displayName), linked: Number(row.linked)===1, renamed: Number(row.renamed)===1, active: Number(row.active)===1 }
}
export class UserRepository implements UserPersistence {
  async createGuest(code: string, publicId: string): Promise<DatabaseUser> {
    const connection = await getMysqlConnection()
    try {
      const name = `Guest${code.slice(-5)}`
      await connection.execute('INSERT INTO users(public_id,guest_code,display_name,search_name) VALUES (?,?,?,?)', [publicId, code, name, name.toLocaleLowerCase('vi')])
      // Never read insertId as a JS Number: CAST on the same connection preserves BIGINT.
      const [rows] = await connection.query<RowDataPacket[]>(`${userSelect} WHERE id=LAST_INSERT_ID()`)
      if (!rows[0]) throw new Error('Created user not found.')
      return toUser(rows[0])
    } finally { connection.release() }
  }
  async findById(id: string): Promise<DatabaseUser | null> {
    const [rows] = await getMysqlPool().execute<RowDataPacket[]>(`${userSelect} WHERE id=?`, [id])
    return rows[0] ? toUser(rows[0]) : null
  }
  async renameLinkedUser(id: string, name: string): Promise<boolean> {
    const [result] = await getMysqlPool().execute<import('mysql2/promise').ResultSetHeader>(
      "UPDATE users SET display_name=?,search_name=?,name_changed_at=UTC_TIMESTAMP(3),updated_at=UTC_TIMESTAMP(3) WHERE id=? AND linked_at IS NOT NULL AND name_changed_at IS NULL AND status='active'",
      [name, name.toLocaleLowerCase('vi'), id])
    return result.affectedRows === 1
  }
}
