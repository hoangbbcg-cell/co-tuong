import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { AccountError } from '../errors'

const derive = promisify(scrypt)
export async function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const key = await derive(password, salt, 64) as Buffer
  return `scrypt:${salt}:${key.toString('hex')}`
}
export class AdminAuth {
  private sessions = new Map<string, { expires: number; config: string }>()
  private attempts = new Map<string, { count: number; until: number }>()
  constructor(private config = () => process.env.ADMIN_PASSWORD_HASH ?? '', private now = Date.now) {}
  private digest(token: string) { return createHash('sha256').update(token).digest('hex') }
  async login(input: unknown, ip: string) {
    const config = this.config()
    if (!/^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(config)) throw new AccountError('Chưa cấu hình mật khẩu quản trị.', 503)
    const now = this.now()
    for (const [key, value] of this.attempts) if (value.until <= now) this.attempts.delete(key)
    const attempt = this.attempts.get(ip) ?? { count: 0, until: now + 10 * 60_000 }
    if (attempt.count >= 5 || this.attempts.size >= 10000) throw new AccountError('Thử quá nhiều lần. Vui lòng đợi 10 phút.', 429)
    attempt.count++; this.attempts.set(ip, attempt)
    if (typeof input !== 'string' || input.length < 12 || input.length > 128) throw new AccountError('Mật khẩu không đúng.', 401)
    const [, salt, expected] = config.split(':')
    const actual = await derive(input, salt, 64) as Buffer
    if (!timingSafeEqual(actual, Buffer.from(expected, 'hex'))) throw new AccountError('Mật khẩu không đúng.', 401)
    this.attempts.delete(ip)
    for (const [key, value] of this.sessions) if (value.expires <= now || value.config !== config) this.sessions.delete(key)
    if (this.sessions.size >= 1000) throw new AccountError('Quá nhiều phiên quản trị.', 429)
    const token = randomBytes(32).toString('hex')
    this.sessions.set(this.digest(token), { expires: now + 2 * 60 * 60_000, config })
    return token
  }
  authorize(token: string | undefined) {
    const key = token ? this.digest(token) : ''
    const session = this.sessions.get(key)
    if (!session || session.expires <= this.now() || session.config !== this.config()) {
      this.sessions.delete(key)
      throw new AccountError('Cần đăng nhập quản trị.', 401)
    }
  }
  logout(token: string | undefined) { if (token) this.sessions.delete(this.digest(token)) }
}
