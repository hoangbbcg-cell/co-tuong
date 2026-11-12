import { readFile } from 'node:fs/promises';
import { createPool } from 'mysql2/promise';
import { mysqlOptions } from '../server/repositories/mysqlPool.ts';

// Run using `node --import tsx ...` (from PowerShell batch).
const qa = process.env.HOVANG_NOTIFICATION_QA_DB_NAME?.trim() ?? '';
const production = process.env.DB_NAME?.trim() ?? '';
if (!/^[A-Za-z0-9_]+_qa$/.test(qa) || !production || qa === production) {
  throw new Error('Refusing DB write: explicit isolated *_qa database is required and must differ from DB_NAME.');
}
const pool = createPool(mysqlOptions({ ...process.env, DB_NAME: qa }));
try {
  const [db] = await pool.query('SELECT DATABASE() AS db');
  if (db[0]?.db !== qa) throw new Error('Unexpected selected database.');
  const [tables] = await pool.query(`SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME IN ('users','notification_devices','notification_offline_cycles','notification_campaigns','notification_deliveries')`);
  const existing = new Set(tables.map(r => r.name));
  if (!existing.has('users')) throw new Error('QA foundation `users` missing. Run foundation QA migrations first.');
  if ([...existing].some(t => t.startsWith('notification_'))) throw new Error('QA notification tables already exist; refusing overwrite or reuse.');
  const sql = await readFile(new URL('../server/migrations/019_notifications.sql', import.meta.url), 'utf8');
  const statements = sql.split(';').map(x => x.trim()).filter(Boolean);
  if (statements.length !== 4 || statements.some(x => !/^CREATE TABLE notification_(devices|offline_cycles|campaigns|deliveries)\b/i.test(x))) {
    throw new Error('Unexpected 019 DDL; refuse to apply.');
  }
  const expected = ['notification_devices','notification_offline_cycles','notification_campaigns','notification_deliveries'];
  // QA only, DDL is intentionally not attempted on runtime/production schema.
  for (const statement of statements) await pool.query(statement);
  const [created] = await pool.query(`SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME LIKE 'notification_%'`);
  for (const name of expected) if (!created.some(r => r.name === name)) throw new Error(`Missing QA table ${name}`);
  const [users] = await pool.query('SELECT CAST(id AS CHAR) AS id FROM users LIMIT 1');
  if (users.length) {
    const id = users[0].id;
    await pool.execute('INSERT INTO notification_offline_cycles (user_id,offline_since,cycle_id) VALUES (?,UTC_TIMESTAMP(3),1)',[id]);
    const [offline] = await pool.execute('SELECT offline_since,cycle_id FROM notification_offline_cycles WHERE user_id=?',[id]);
    if (!offline[0]?.offline_since || Number(offline[0].cycle_id)!==1) throw new Error('QA offline write/read failed');
    await pool.execute('UPDATE notification_offline_cycles SET offline_since=NULL,cycle_id=cycle_id+1 WHERE user_id=?',[id]);
    const [online] = await pool.execute('SELECT offline_since,cycle_id FROM notification_offline_cycles WHERE user_id=?',[id]);
    if (online[0]?.offline_since !== null || Number(online[0].cycle_id)!==2) throw new Error('QA online reset failed');
    await pool.execute('DELETE FROM notification_offline_cycles WHERE user_id=?',[id]);
    console.log('QA offline->online write/read PASS');
  } else console.log('QA schema PASS; no QA user present, write/read NOT TESTED');
  console.log(`QA 019 table creation PASS in ${qa}. Tables retained in QA for inspection.`);
} finally { await pool.end(); }
