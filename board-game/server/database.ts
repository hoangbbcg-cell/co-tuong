import { closeMysqlPool, checkMysqlConnection } from './repositories/mysqlPool'
import { migrateDatabase, verifySchema } from './repositories/migrationRepository'
import { smokeDatabase } from './repositories/databaseSmoke'

try {
  const command = process.argv[2]
  await checkMysqlConnection()
  if (command === 'migrate') {
    const count = await migrateDatabase()
    await verifySchema()
    console.log(`MySQL migration thành công: ${count} bước mới, đủ 19 bảng foundation và FK/index.`)
  } else if (command === 'verify') {
    await verifySchema()
    console.log('MySQL schema PASS: migration/checksum, 19 bảng, PK/FK/CHECK/index.')
  } else if (command === 'smoke') {
    await smokeDatabase()
    console.log('MySQL smoke PASS: tạo/đọc 19 bảng, constraint và rollback không để lại bản ghi thử.')
  } else throw new Error('Unknown database command.')
} catch (error) {
  // Driver errors contain SQL/parameters: never print the raw error or stack.
  const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : ''
  console.error(/^ER_[A-Z0-9_]+$|^ECONNREFUSED$|^ETIMEDOUT$|^ENOTFOUND$/.test(code)
    ? `Database command failed (${code}). Kiểm tra cấu hình/quyền/schema theo docs/MYSQL-FOUNDATION.md.`
    : error instanceof Error && !code ? error.message : 'Database command failed. Xem docs/MYSQL-FOUNDATION.md.')
  process.exitCode = 1
} finally { await closeMysqlPool() }
