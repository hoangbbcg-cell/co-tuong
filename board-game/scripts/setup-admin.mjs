import { randomBytes, scryptSync } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
const envPath = new URL('../.env', import.meta.url)
const accessPath = new URL('../.admin-access.txt', import.meta.url)
const env = await readFile(envPath, 'utf8').catch(error => { if (error.code === 'ENOENT') return ''; throw error })
if (/^ADMIN_PASSWORD_HASH=.+/m.test(env)) {
  console.log('Quản trị đã có mật khẩu. Xem .admin-access.txt hoặc cấu hình ADMIN_PASSWORD_HASH hiện có.')
} else {
  const password = randomBytes(18).toString('base64url'), salt = randomBytes(16).toString('hex')
  const hash = `scrypt:${salt}:${scryptSync(password, salt, 64).toString('hex')}`
  await writeFile(accessPath, `Trang quản trị: http://localhost:5173/admin (dev) hoặc http://localhost:3001/admin (sau build)\nMật khẩu: ${password}\n\nFile riêng, không đưa lên Git hoặc chia sẻ.\n`, { flag: 'wx' })
  await writeFile(envPath, `${env.trimEnd()}\nADMIN_PASSWORD_HASH=${hash}\n`)
  console.log('Đã cấu hình quản trị. Mật khẩu nằm trong board-game/.admin-access.txt. Khởi động lại backend để nhận cấu hình.')
}
