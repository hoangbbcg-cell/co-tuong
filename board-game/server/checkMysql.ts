import { checkMysqlConnection, closeMysqlPool } from './repositories/mysqlPool'

try {
  await checkMysqlConnection()
  console.log('Kết nối MySQL thành công: SELECT 1 = 1.')
} catch (error) {
  // Never print driver messages/config: they may contain credentials or server details.
  const code = error && typeof error === 'object' && 'code' in error && typeof error.code === 'string'
    ? error.code : null
  const safeCodes = new Set(['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'ER_ACCESS_DENIED_ERROR', 'ER_BAD_DB_ERROR', 'PROTOCOL_SEQUENCE_TIMEOUT'])
  console.error(code && safeCodes.has(code)
    ? `Không kết nối được MySQL (${code}). Kiểm tra dịch vụ MySQL và DB_* trong .env.`
    : 'Không kiểm tra được MySQL. Kiểm tra đủ DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD trong .env; không dùng root.')
  process.exitCode = 1
} finally {
  await closeMysqlPool()
}
