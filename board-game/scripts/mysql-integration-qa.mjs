// Disposable MySQL 8.0 verification only; never reads .env or touches localhost:3306.
import { spawn } from 'node:child_process'
import { mkdtemp,rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join,resolve } from 'node:path'
import { randomBytes } from 'node:crypto'
import mysql from 'mysql2/promise'
const exe=process.env.MYSQL_QA_BINARY??'C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqld.exe'
const directory=await mkdtemp(join(tmpdir(),'cotuong-mysql-qa-'))
const port=33319,password=randomBytes(32).toString('hex')
const env={...process.env,DB_HOST:'127.0.0.1',DB_PORT:String(port),DB_NAME:'cotuong',DB_USER:'cotuong_app',DB_PASSWORD:password,DB_INTEGRATION:'1'}
const run=(binary,args,environment=process.env,cwd=process.cwd())=>new Promise((resolve,reject)=>{
  const child=spawn(binary,args,{env:environment,cwd,windowsHide:true,stdio:'inherit'})
  child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(Error(`QA child exit ${code}`)))
})
let server,admin
try {
  // Refuse to attach to an existing instance on the QA port.
  const {createServer}=await import('node:net');const probe=createServer();await new Promise((resolve,reject)=>{probe.once('error',reject);probe.listen(port,'127.0.0.1',resolve)});await new Promise(r=>probe.close(r))
  const binDir=resolve(exe,'..')
  await run(exe,['--no-defaults','--console','--initialize-insecure',`--datadir=${directory}`],process.env,binDir)
  server=spawn(exe,['--no-defaults','--standalone','--console',`--datadir=${directory}`,`--port=${port}`,'--bind-address=127.0.0.1','--mysqlx=0'],{cwd:binDir,windowsHide:true,stdio:'ignore'})
  for(let i=0;i<40;i++){try{admin=await mysql.createConnection({host:'127.0.0.1',port,user:'root'});break}catch{await new Promise(r=>setTimeout(r,500))}}
  if(!admin)throw Error('QA MySQL did not start')
  const [where]=await admin.query('SELECT @@datadir d');if(!resolve(where[0].d).startsWith(resolve(directory)))throw Error('Unexpected QA server')
  await admin.query('CREATE DATABASE cotuong CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci')
  await admin.query("CREATE USER 'cotuong_app'@'localhost' IDENTIFIED BY ?",[password])
  await admin.query("GRANT ALL ON cotuong.* TO 'cotuong_app'@'localhost'")
  for(const command of ['migrate','migrate','verify','smoke'])await run(process.execPath,['--import','tsx','server/database.ts',command],env)
  await run(process.execPath,['node_modules/vitest/vitest.mjs','run','tests/account-persistence.integration.test.ts'],env)
} finally {
  if(admin){try{await admin.query('SHUTDOWN')}catch{}await admin.end()}
  if(server&&server.exitCode===null){await new Promise(resolve=>{server.once('exit',resolve);setTimeout(()=>server.kill(),5000)})}
  if(resolve(directory).startsWith(resolve(tmpdir())+'/')||resolve(directory).startsWith(resolve(tmpdir())+'\\'))await rm(directory,{recursive:true,force:true,maxRetries:10,retryDelay:500})
}
