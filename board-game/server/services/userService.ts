import { randomInt } from 'node:crypto'
import type { UserPersistence } from '../repositories/userRepository'

export class UserService {
  constructor(private readonly users: UserPersistence, private readonly random = randomInt) {}
  async createGuest() {
    for (let attempt = 0; attempt < 30; attempt++) {
      const code = String(this.random(0, 1_000_000)).padStart(6, '0')
      const publicId = String(this.random(10_000_000, 100_000_000))
      try { return await this.users.createGuest(code, publicId) }
      catch (error) {
        if (!error || typeof error !== 'object' || !('code' in error) || error.code !== 'ER_DUP_ENTRY') throw error
      }
    }
    throw new Error('Không cấp được mã khách duy nhất. Vui lòng thử lại sau.')
  }
  /** Internal use only until the caller has authenticated ownership of this user. */
  async rename(id: string, input: string): Promise<void> {
    if (!/^[1-9]\d*$/.test(id)) throw new Error('User ID không hợp lệ.')
    const name = input.trim().normalize('NFC')
    if (!name || Array.from(name).length > 10 || /^(?:Guest\d{5}|Kỳ\s*Thủ\s*\d{5,6})$/iu.test(name)) throw new Error('Tên không hợp lệ hoặc thuộc vùng tên khách dành riêng.')
    if (!await this.users.renameLinkedUser(id, name)) throw new Error('Chỉ tài khoản đã liên kết, đang hoạt động và chưa đổi tên mới được đổi tên.')
  }
}
