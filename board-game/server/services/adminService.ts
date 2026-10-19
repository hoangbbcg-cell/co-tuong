import { AccountError } from '../errors'
import { AdminRepository } from '../repositories/adminRepository'
import { ADMIN_AVATARS, ADMIN_FRAMES } from '../../src/types/admin'
import type { AdminChange } from '../../src/types/admin'

export class AdminService {
  constructor(readonly repository = new AdminRepository()) {}
  publicId(value: unknown) {
    if (typeof value !== 'string' || !/^\d{8}$/.test(value)) throw new AccountError('ID người chơi phải gồm 8 chữ số.')
    return value
  }
  change(publicId: unknown, input: unknown) {
    const id = this.publicId(publicId)
    if (!input || typeof input !== 'object') throw new AccountError('Dữ liệu không hợp lệ.')
    const body = input as Record<string, unknown>
    if (typeof body.requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId)) throw new AccountError('Mã thao tác không hợp lệ.')
    if (typeof body.reason !== 'string' || body.reason.trim().length < 3 || body.reason.length > 300) throw new AccountError('Nhập lý do từ 3 đến 300 ký tự.')
    const base = { requestId: body.requestId, reason: body.reason.trim() }
    let command: AdminChange
    if (body.action === 'resources') {
      for (const key of ['gold', 'energy', 'xiangqi', 'jieqi']) {
        const max = key === 'gold' ? 1_000_000_000 : 1_000_000
        if (typeof body[key] !== 'number' || !Number.isSafeInteger(body[key]) || Number(body[key]) < 0 || Number(body[key]) > max) throw new AccountError(`${key}: cần số nguyên từ 0 đến ${max}.`)
      }
      command = { ...base, action: 'resources', gold: Number(body.gold), energy: Number(body.energy), xiangqi: Number(body.xiangqi), jieqi: Number(body.jieqi) }
    } else if (body.action === 'avatar' || body.action === 'frame' || body.action === 'honor') {
      if (typeof body.code !== 'string' || body.code.length > 64 || typeof body.equip !== 'boolean') throw new AccountError('Vật phẩm không hợp lệ.')
      if (body.action === 'avatar' && !ADMIN_AVATARS.some(item => item.code === body.code) || body.action === 'frame' && !ADMIN_FRAMES.some(item => item.code === body.code)) throw new AccountError('Vật phẩm không tồn tại.')
      command = { ...base, action: body.action, code: body.code, equip: body.equip }
    } else throw new AccountError('Thao tác không hợp lệ.')
    return this.repository.change(id, command)
  }
}
