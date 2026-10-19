import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import type { PoolConnection, RowDataPacket } from 'mysql2/promise'
import { getMysqlConnection } from './mysqlPool'

export const FOUNDATION_TABLES = ['users', 'user_game_stats', 'user_resources', 'matches', 'match_players', 'match_moves', 'resource_events', 'saved_matches', 'saved_positions', 'friendships', 'user_follows', 'user_blocks', 'conversations', 'conversation_members', 'messages', 'honors', 'user_honors', 'honor_endorsements', 'match_likes'] as const
export const migrationFiles = ['001_foundation.sql', '002_accounts_and_resources.sql', '003_honor_catalog.sql', '004_google_identity.sql', '005_admin_tools.sql'] as const
export interface MigrationStep { version: string; checksum: string; sql: string }

/** Deliberately small format: no procedures, quoted semicolons or custom delimiters. */
export function migrationSteps(file: string, contents: string): MigrationStep[] {
  // Git on Windows can check out CRLF while the applied journal was built from LF.
  // Canonicalize line endings only; changes to SQL still invalidate its checksum.
  const statements = contents.replace(/\r\n/g, '\n').replace(/^\s*--.*$/gm, '').split(';').map(sql => sql.trim()).filter(Boolean)
  return statements.map((sql, index) => {
    const safe = sql.replace(/\bDROP CHECK\s+\w+/gi, '')
    if (!/^(CREATE TABLE|ALTER TABLE|INSERT INTO honors\b)/i.test(sql) || /\b(DROP|TRUNCATE|DELETE)\b/i.test(safe)) throw new Error('Migration contains unsupported SQL.')
    return { version: `${file}:${String(index + 1).padStart(3, '0')}`, checksum: createHash('sha256').update(sql).digest('hex'), sql }
  })
}
export async function loadMigrations(): Promise<MigrationStep[]> {
  const result: MigrationStep[] = []
  for (const file of migrationFiles) result.push(...migrationSteps(file, await readFile(new URL(`../migrations/${file}`, import.meta.url), 'utf8')))
  return result
}
export interface AppliedStep { version: string; checksum: string; status: string }
export function pendingMigrations(steps: MigrationStep[], applied: AppliedStep[]): MigrationStep[] {
  const known = new Map(steps.map(step => [step.version, step]))
  for (const row of applied) {
    if (!known.has(row.version) || known.get(row.version)?.checksum !== row.checksum) throw new Error(`Migration checksum/history mismatch: ${row.version}`)
    if (row.status !== 'applied') throw new Error(`Migration incomplete: ${row.version}. Inspect schema and repair explicitly before retrying.`)
  }
  const done = new Set(applied.map(row => row.version))
  let missing = false
  for (const step of steps) {
    if (!done.has(step.version)) missing = true
    else if (missing) throw new Error('Migration history is not a contiguous prefix.')
  }
  return steps.filter(step => !done.has(step.version))
}

async function history(connection: PoolConnection): Promise<AppliedStep[]> {
  const [rows] = await connection.query<(RowDataPacket & AppliedStep)[]>('SELECT version, checksum, status FROM schema_migrations ORDER BY version')
  return rows
}
export async function migrateDatabase(): Promise<number> {
  const steps = await loadMigrations()
  const connection = await getMysqlConnection()
  let locked = false
  try {
    const [lock] = await connection.query<(RowDataPacket & { acquired: number })[]>("SELECT GET_LOCK(CONCAT('cotuong:migrate:', LEFT(SHA2(DATABASE(),256),32)), 10) AS acquired")
    if (String(lock[0]?.acquired) !== '1') throw new Error('Another migration is running.')
    locked = true
    await connection.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(128) CHARACTER SET ascii COLLATE ascii_bin NOT NULL PRIMARY KEY,
      checksum CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
      status VARCHAR(16) NOT NULL, started_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), applied_at DATETIME(3) NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`)
    const applied = await history(connection)
    const pending = pendingMigrations(steps, applied)
    // Never silently adopt existing application tables or overwrite data.
    if (applied.length === 0) {
      const [existing] = await connection.query<RowDataPacket[]>('SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (?)', [[...FOUNDATION_TABLES]])
      if (existing.length) throw new Error('Application tables already exist without migration history. No automatic adoption or deletion.')
    }
    for (const step of pending) {
      await connection.execute('INSERT INTO schema_migrations(version,checksum,status) VALUES (?, ?, ?)', [step.version, step.checksum, 'running'])
      await connection.query(step.sql)
      await connection.execute("UPDATE schema_migrations SET status='applied', applied_at=UTC_TIMESTAMP(3) WHERE version=?", [step.version])
    }
    return pending.length
  } finally {
    try { if (locked) await connection.query("SELECT RELEASE_LOCK(CONCAT('cotuong:migrate:', LEFT(SHA2(DATABASE(),256),32)))") }
    finally { connection.release() }
  }
}

export async function verifySchema(): Promise<void> {
  const steps = await loadMigrations()
  const connection = await getMysqlConnection()
  try {
    if (pendingMigrations(steps, await history(connection)).length) throw new Error('Pending migrations remain.')
    const [tables] = await connection.query<RowDataPacket[]>('SELECT TABLE_NAME AS name, ENGINE AS engine, TABLE_COLLATION AS collation FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE()')
    const [constraints] = await connection.query<RowDataPacket[]>('SELECT TABLE_NAME AS name, CONSTRAINT_NAME AS constraintName, CONSTRAINT_TYPE AS kind, ENFORCED AS enforced FROM information_schema.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA=DATABASE()')
    const [indexes] = await connection.query<RowDataPacket[]>('SELECT TABLE_NAME AS name, INDEX_NAME AS indexName, COLUMN_NAME AS columnName, SEQ_IN_INDEX AS seq, NON_UNIQUE AS nonUnique FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=DATABASE() ORDER BY TABLE_NAME,INDEX_NAME,SEQ_IN_INDEX')
    const [foreignKeys] = await connection.query<RowDataPacket[]>('SELECT TABLE_NAME AS name, CONSTRAINT_NAME AS constraintName, COLUMN_NAME AS columnName, REFERENCED_TABLE_NAME AS parent, REFERENCED_COLUMN_NAME AS parentColumn FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA=DATABASE() AND REFERENCED_TABLE_NAME IS NOT NULL ORDER BY TABLE_NAME,CONSTRAINT_NAME,ORDINAL_POSITION')
    const [columns] = await connection.query<RowDataPacket[]>('SELECT TABLE_NAME AS name, COLUMN_NAME AS columnName, COLUMN_TYPE AS type, DATETIME_PRECISION AS precisionValue FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE()')
    for (const step of steps) {
      if (/^INSERT INTO honors/i.test(step.sql)) continue
      const table = /^(?:CREATE TABLE|ALTER TABLE)\s+(\w+)/i.exec(step.sql)?.[1]
      if (!table) throw new Error('Unknown migration table.')
      const row = tables.find(item => item.name === table)
      if (!row || row.engine !== 'InnoDB' || row.collation !== 'utf8mb4_0900_ai_ci') throw new Error(`Missing/invalid table: ${table}`)
      for (const match of step.sql.matchAll(/CONSTRAINT\s+(\w+)\s+(FOREIGN KEY|CHECK)/gi)) {
        if (steps.some(later => new RegExp(`DROP CHECK\\s+${match[1]}\\b`, 'i').test(later.sql))) continue
        if (!constraints.some(item => item.name === table && item.constraintName === match[1] && item.kind === match[2].toUpperCase() && (item.kind !== 'CHECK' || item.enforced === 'YES'))) throw new Error(`Missing constraint: ${match[1]}`)
      }
      for (const match of step.sql.matchAll(/CONSTRAINT\s+(\w+)\s+FOREIGN KEY\s*\(([^)]+)\)\s+REFERENCES\s+(\w+)\s*\(([^)]+)\)/gi)) {
        const rows = foreignKeys.filter(item => item.name === table && item.constraintName === match[1])
        if (rows.map(row => row.columnName).join(',') !== match[2].replace(/\s/g,'') || rows.some(row => row.parent !== match[3]) || rows.map(row => row.parentColumn).join(',') !== match[4].replace(/\s/g,'')) throw new Error(`Invalid foreign key: ${match[1]}`)
      }
      for (const match of step.sql.matchAll(/(UNIQUE KEY|\bKEY)\s+(\w+)\s*\(([^)]+)\)/gi)) {
        const rows = indexes.filter(item => item.name === table && item.indexName === match[2])
        const expectedColumns = match[3].replace(/\s+(DESC|ASC)/gi,'').replace(/\s/g,'')
        if (rows.map(row => row.columnName).join(',') !== expectedColumns || match[1].toUpperCase() === 'UNIQUE KEY' && rows.some(row => String(row.nonUnique) !== '0')) throw new Error(`Invalid index: ${match[2]}`)
      }
      if (/^CREATE TABLE/i.test(step.sql)) {
        if (!constraints.some(item => item.name === table && item.kind === 'PRIMARY KEY')) throw new Error(`Missing primary key: ${table}`)
        for (const line of step.sql.split('\n')) {
          for (const match of line.matchAll(/(?:^|,)\s*(\w+)\s+(BIGINT UNSIGNED|DATETIME\(3\)|JSON|CHAR\(36\))/gi)) {
            const column = columns.find(item => item.name === table && item.columnName === match[1])
            const expected = match[2].toLowerCase()
            if (!column || (expected === 'datetime(3)' ? column.type !== expected : !String(column.type).startsWith(expected))) throw new Error(`Invalid column: ${table}.${match[1]}`)
          }
        }
      }
    }
    if(!columns.some(c=>c.name==='user_resources'&&c.columnName==='energy'&&c.type==='int unsigned'))throw new Error('Energy must support balances above natural recovery cap.')
    if(constraints.some(c=>c.name==='user_resources'&&c.constraintName==='ck_resources_energy'))throw new Error('Obsolete energy cap CHECK remains.')
    for(const name of ['country_code','province_name','ward_name','location_set_at','guest_device_hash','guest_session_hash','activity_days','last_activity_date','google_sub','session_expires_at'])if(!columns.some(c=>c.name==='users'&&c.columnName===name))throw new Error(`Missing account column: ${name}`)
    const [catalog]=await connection.query<RowDataPacket[]>("SELECT code FROM honors WHERE code LIKE 'vqkd_%' OR code LIKE 'pt_%' OR code LIKE 'cct_%' OR code LIKE 'tvc_%' OR code LIKE 'occ_%'")
    if(catalog.length<39)throw new Error('Honor catalog seed is incomplete.')
  } finally { connection.release() }
}

