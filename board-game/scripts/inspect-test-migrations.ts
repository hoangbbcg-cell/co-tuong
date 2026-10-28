import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadMigrations, pendingMigrations } from '../server/repositories/migrationRepository'
import type { AppliedStep, MigrationStep } from '../server/repositories/migrationRepository'

export function compareTestMigrationReport(input: unknown, steps: MigrationStep[]) {
  if (!input || typeof input !== 'object') throw new Error('Invalid metadata report.')
  const report = input as Record<string, unknown>
  if (report.format !== 1 || report.host !== '103.153.254.184' || report.schema !== 'cotuong_stage') throw new Error('Unexpected metadata report target.')
  if (report.collation !== 'utf8mb4_0900_ai_ci') throw new Error('Unexpected schema collation.')
  if (!Array.isArray(report.environmentMetadata)) throw new Error('Missing protected file metadata.')
  for (const [path, group, mode] of [['/etc/cotuong/cotuong.env', 'cotuong', '0640'], ['/etc/cotuong/cotuong-migrator.env', 'root', '0600']]) {
    const info = report.environmentMetadata.find((entry: unknown) => !!entry && typeof entry === 'object' && (entry as Record<string, unknown>).path === path) as Record<string, unknown> | undefined
    if (!info || info.regular !== true || info.uid !== 0 || info.group !== group || info.mode !== mode) throw new Error('Unsafe protected environment file metadata.')
  }
  if (!Array.isArray(report.tables) || report.tableCount !== report.tables.length || typeof report.journalExists !== 'boolean' || !Array.isArray(report.journal)) throw new Error('Incomplete metadata report.')
  const tables = report.tables.map((table: unknown) => {
    if (!table || typeof table !== 'object') throw new Error('Invalid table metadata.')
    const row = table as Record<string, unknown>
    if (typeof row.name !== 'string' || row.engine !== 'InnoDB' || row.collation !== 'utf8mb4_0900_ai_ci') throw new Error('Unexpected table engine or collation.')
    return row.name
  })
  if (new Set(tables).size !== tables.length || report.journalExists !== tables.includes('schema_migrations')) throw new Error('Inconsistent table/journal metadata.')
  const applied: AppliedStep[] = report.journal.map((entry: unknown) => {
    if (!entry || typeof entry !== 'object') throw new Error('Invalid journal row.')
    const row = entry as Record<string, unknown>
    if (typeof row.version !== 'string' || !/^\d{3}_[a-z_]+\.sql:\d{3}$/.test(row.version) || typeof row.checksum !== 'string' || !/^[a-f0-9]{64}$/.test(row.checksum) || typeof row.status !== 'string') throw new Error('Invalid journal row.')
    return { version: row.version, checksum: row.checksum, status: row.status }
  })
  if (new Set(applied.map(row => row.version)).size !== applied.length) throw new Error('Duplicate migration journal versions.')
  if (!report.journalExists && applied.length) throw new Error('Journal rows without a journal table.')
  if (applied.length === 0 && tables.some(name => name !== 'schema_migrations')) throw new Error('Existing application tables have no migration history; manual inspection required.')
  const pending = pendingMigrations(steps, applied)
  return { schema: 'cotuong_stage', state: applied.length === 0 ? 'EMPTY_BASELINE' : pending.length ? 'PENDING' : 'CURRENT',
    appliedSteps: applied.length, expectedSteps: steps.length, pendingSteps: pending.map(step => step.version),
    expectedFiles: [...new Set(steps.map(step => step.version.split(':')[0]))],
    schemaVerificationRequired: true }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: inspect-test-migrations.ts <read-only-metadata-report.json>')
    const result = compareTestMigrationReport(JSON.parse(await readFile(process.argv[2], 'utf8')), await loadMigrations())
    console.log(JSON.stringify(result, null, 2))
    console.log('MIGRATION_JOURNAL_COMPARISON=PASS; no database connection or mutation performed by this comparison. Run db:verify with the app account after migration.')
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Migration comparison failed.')
    process.exitCode = 1
  }
}
