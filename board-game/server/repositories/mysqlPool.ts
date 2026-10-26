import { createPool } from 'mysql2/promise'
import { readFileSync } from 'node:fs'
import type { Pool, PoolOptions, RowDataPacket } from 'mysql2/promise'

export function mysqlOptions(env: NodeJS.ProcessEnv = process.env): PoolOptions {
  const required = (key: string) => {
    const value = env[key]
    if (value === undefined || value.length === 0) throw new Error(`Thiếu ${key}. Hãy cấu hình trong board-game/.env.`)
    return value
  }
  const host = required('DB_HOST').trim()
  const database = required('DB_NAME').trim()
  const runtimeUser = required('DB_USER').trim()
  if (runtimeUser.toLowerCase() === 'root') throw new Error('Backend không được dùng MySQL root. Hãy dùng cotuong_app.')
  let user = runtimeUser
  let password = required('DB_PASSWORD')
  const migratorFile = env.DB_MIGRATOR_CREDENTIALS_FILE
  if (migratorFile) {
    try {
      const credentials = JSON.parse(readFileSync(migratorFile, 'utf8')) as { user?: unknown; password?: unknown }
      if (credentials.user !== 'cotuong_migrator' || typeof credentials.password !== 'string' || !credentials.password) {
        throw new Error('invalid')
      }
      user = credentials.user
      password = credentials.password
    } catch {
      throw new Error('Invalid dedicated MySQL migrator credential file.')
    }
  }
  const rawPort = required('DB_PORT')
  if (!host || !database || !user) throw new Error('DB_HOST, DB_NAME và DB_USER không được để trống.')
  if (user.toLowerCase() === 'root') throw new Error('Backend không được dùng MySQL root. Hãy dùng cotuong_app.')
  if (!/^\d+$/.test(rawPort) || Number(rawPort) < 1 || Number(rawPort) > 65535) throw new Error('DB_PORT phải là số nguyên từ 1 đến 65535.')
  return {
    host, port: Number(rawPort), database, user, password,
    connectionLimit: 5, waitForConnections: true, queueLimit: 20,
    connectTimeout: 5000, charset: 'utf8mb4', timezone: 'Z',
    supportBigNumbers: true, bigNumberStrings: true, multipleStatements: false,
  }
}

let pool: Pool | undefined
/** Lazy backend-only pool: existing RAM gameplay does not require a configured DB. */
export function getMysqlPool(): Pool {
  pool ??= createPool(mysqlOptions())
  return pool
}

export async function getMysqlConnection() {
  const connection = await getMysqlPool().getConnection()
  try {
    await connection.query("SET time_zone = '+00:00'")
    return connection
  } catch (error) { connection.release(); throw error }
}

export async function closeMysqlPool(): Promise<void> {
  const current = pool
  pool = undefined
  await current?.end()
}

export async function checkMysqlConnection(): Promise<void> {
  const [rows] = await getMysqlPool().query<(RowDataPacket & { ok: number })[]>({ sql: 'SELECT 1 AS ok', timeout: 5000 })
  if (rows.length !== 1 || (rows[0].ok !== 1 && String(rows[0].ok) !== '1')) throw new Error('MySQL trả kết quả SELECT 1 không hợp lệ.')
}
