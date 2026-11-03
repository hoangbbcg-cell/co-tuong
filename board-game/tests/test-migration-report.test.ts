import { expect, it } from 'vitest'
import { loadMigrations } from '../server/repositories/migrationRepository'
import { compareTestMigrationReport } from '../scripts/inspect-test-migrations'

const steps = await loadMigrations()
const report = (count = 0) => ({ format: 1, host: '103.153.254.184', schema: 'cotuong_stage', collation: 'utf8mb4_0900_ai_ci',
  tableCount: count ? 2 : 0, tables: count ? ['schema_migrations', 'users'].map(name => ({ name, engine: 'InnoDB', collation: 'utf8mb4_0900_ai_ci' })) : [],
  journalExists: count > 0, journal: steps.slice(0, count).map(step => ({ version: step.version, checksum: step.checksum, status: 'applied' })),
  environmentMetadata: [{ path: '/etc/cotuong/cotuong.env', regular: true, uid: 0, group: 'cotuong', mode: '0640' },
    { path: '/etc/cotuong/cotuong-migrator.env', regular: true, uid: 0, group: 'root', mode: '0600' }] })

it('distinguishes an empty bootstrap schema, a contiguous pending prefix and current checksums', () => {
  expect(compareTestMigrationReport(report(), steps)).toMatchObject({ state: 'EMPTY_BASELINE', appliedSteps: 0, expectedSteps: steps.length })
  expect(compareTestMigrationReport(report(1), steps)).toMatchObject({ state: 'PENDING', pendingSteps: steps.slice(1).map(step => step.version) })
  expect(compareTestMigrationReport(report(steps.length), steps)).toMatchObject({ state: 'CURRENT', pendingSteps: [], schemaVerificationRequired: true })
})

it('fails closed for checksum mismatch, running DDL, a hole or unknown/duplicate version', () => {
  const changed = report(1); changed.journal[0].checksum = '0'.repeat(64)
  expect(() => compareTestMigrationReport(changed, steps)).toThrow('mismatch')
  const running = report(1); running.journal[0].status = 'running'
  expect(() => compareTestMigrationReport(running, steps)).toThrow('incomplete')
  const hole = report(2); hole.journal.shift()
  expect(() => compareTestMigrationReport(hole, steps)).toThrow('contiguous')
  const unknown = report(1); unknown.journal[0].version = '999_unknown.sql:001'
  expect(() => compareTestMigrationReport(unknown, steps)).toThrow('mismatch')
  const duplicate = report(1); duplicate.journal.push(duplicate.journal[0])
  expect(() => compareTestMigrationReport(duplicate, steps)).toThrow('Duplicate')
})

it('rejects unjournaled tables, wrong targets and unsafe protected file metadata', () => {
  const noHistory = report(1); noHistory.journal = []
  expect(() => compareTestMigrationReport(noHistory, steps)).toThrow('no migration history')
  expect(() => compareTestMigrationReport({ ...report(), host: '103.9.78.75' }, steps)).toThrow('target')
  const unsafe = report(); unsafe.environmentMetadata[0].regular = false
  expect(() => compareTestMigrationReport(unsafe, steps)).toThrow('Unsafe')
})
