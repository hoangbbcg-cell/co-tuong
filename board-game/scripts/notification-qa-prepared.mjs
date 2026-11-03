import { createPool } from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import { mysqlOptions } from '../server/repositories/mysqlPool.ts';

const qa = 'hovang_notification_qa';
const opts = mysqlOptions(process.env);
const host = String(opts.host ?? '').toLowerCase();
const appDb = String(process.env.DB_NAME ?? opts.database ?? '').trim();
if (!['127.0.0.1', 'localhost', '::1'].includes(host)) throw new Error('SAFETY STOP: database host must be LOCAL.');
if (!appDb || appDb === qa) throw new Error('SAFETY STOP: application database is missing or equals QA database.');
if (process.env.HOVANG_NOTIFICATION_QA_DB_NAME !== qa) throw new Error('SAFETY STOP: explicit QA database confirmation required.');

const expected = ['notification_devices','notification_offline_cycles','notification_campaigns','notification_deliveries'];
const pool = createPool({ ...opts, host:'127.0.0.1', database:qa, connectionLimit:1, multipleStatements:false });
try {
  const [current] = await pool.query('SELECT DATABASE() AS name');
  if (current[0]?.name !== qa) throw new Error('SAFETY STOP: unexpected current database');
  const [tables] = await pool.execute('SELECT TABLE_NAME AS name, TABLE_TYPE AS type, ENGINE AS engine FROM information_schema.TABLES WHERE TABLE_SCHEMA=?', [qa]);
  if (tables.length !== 1 || tables[0].name !== 'users' || tables[0].type !== 'BASE TABLE' || tables[0].engine !== 'InnoDB') {
    throw new Error('SAFETY STOP: QA must contain only one InnoDB users table; found: '+tables.map(x=>x.name).join(','));
  }
  const [cols] = await pool.execute('SELECT COLUMN_NAME AS name,COLUMN_TYPE AS type, IS_NULLABLE AS nullable FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME=?',[qa,'users']);
  if (cols.length !== 1 || cols[0].name !== 'id' || cols[0].type !== 'bigint unsigned' || cols[0].nullable !== 'NO') throw new Error('SAFETY STOP: unexpected QA users columns.');
  const [pk] = await pool.execute("SELECT COLUMN_NAME AS name FROM information_schema.STATISTICS WHERE TABLE_SCHEMA=? AND TABLE_NAME='users' AND INDEX_NAME='PRIMARY'",[qa]);
  if (pk.length !== 1 || pk[0].name !== 'id') throw new Error('SAFETY STOP: QA users.id must be the primary key.');
  // Previous interrupted QA attempts may have inserted the single known fixture id=1.
  // Never accept unknown or multiple user rows in the isolated QA database.
  const [fixtureRows] = await pool.query('SELECT id FROM users ORDER BY id LIMIT 2');
  if (fixtureRows.length > 1 || (fixtureRows.length === 1 && String(fixtureRows[0].id) !== '1')) {
    throw new Error('SAFETY STOP: QA users contains unexpected data; no changes made.');
  }

  const sql = await readFile(new URL('../server/migrations/019_notifications.sql', import.meta.url),'utf8');
  const statements = sql.split(';').map(s=>s.trim()).filter(Boolean);
  if (statements.length !== 4 || statements.some((s,i)=>!new RegExp(`^CREATE TABLE ${expected[i]}\\s*\\(`,'i').test(s))) {
    throw new Error('SAFETY STOP: migration 019 has unexpected statements.');
  }
  console.log('PREFLIGHT PASS: LOCAL QA users contains only the allowed fixture (or is empty); migration 019 verified.');
  if (fixtureRows.length === 0) await pool.execute('INSERT INTO users(id) VALUES (?)',[1]);
  for (const stmt of statements) await pool.query(stmt);
  const [built] = await pool.execute('SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA=?',[qa]);
  if (built.length !== 5 || !['users',...expected].every(n=>built.some(x=>x.name===n))) throw new Error('QA tables mismatch');
  await pool.execute('INSERT INTO notification_offline_cycles(user_id,offline_since,cycle_id) VALUES (?,UTC_TIMESTAMP(3),?)',[1,1]);
  const [stored] = await pool.execute('SELECT offline_since,cycle_id FROM notification_offline_cycles WHERE user_id=?',[1]);
  if (!stored[0]?.offline_since || Number(stored[0]?.cycle_id)!==1) throw new Error('QA offline write/read failed');
  console.log('QA migration and offline write/read PASS');
} finally { await pool.end(); }

const reconnect = createPool({ ...opts, host:'127.0.0.1', database:qa, connectionLimit:1, multipleStatements:false });
try {
  const [stored] = await reconnect.execute('SELECT offline_since,cycle_id FROM notification_offline_cycles WHERE user_id=?',[1]);
  if (!stored[0]?.offline_since || Number(stored[0]?.cycle_id)!==1) throw new Error('QA reconnect persistence failed');
  await reconnect.execute('UPDATE notification_offline_cycles SET offline_since=NULL,cycle_id=cycle_id+1 WHERE user_id=?',[1]);
  const [online] = await reconnect.execute('SELECT offline_since,cycle_id FROM notification_offline_cycles WHERE user_id=?',[1]);
  if (online[0]?.offline_since !== null || Number(online[0]?.cycle_id)!==2) throw new Error('QA online reset failed');
  console.log('MYSQL QA PASS: four tables, offline persistence across connections, online reset.');
  console.log('QA tables retained; production untouched; no PUSH enabled.');
} finally { await reconnect.end(); }
