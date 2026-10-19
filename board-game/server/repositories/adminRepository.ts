import { createHash } from 'node:crypto'
import { AccountRepository, rows, change, transaction } from './accountRepository'
import { AccountError } from '../errors'
import type { AdminChange, AdminUser } from '../../src/types/admin'

export class AdminRepository {
  constructor(private accounts = new AccountRepository()) {}
  async search(query: string) {
    return rows(`SELECT CAST(id AS CHAR) id,CAST(public_id AS CHAR) publicId,display_name name FROM users
      WHERE status='active' AND (CAST(public_id AS CHAR)=? OR display_name LIKE ?) ORDER BY id DESC LIMIT 20`,
    [query, `%${query.replace(/[\\%_]/g, '\\$&')}%`])
  }
  async get(publicId: string): Promise<AdminUser> {
    const found = await rows("SELECT CAST(id AS CHAR) id FROM users WHERE public_id=? AND status='active'", [publicId])
    if (!found.length) throw new AccountError('Không tìm thấy người chơi.', 404)
    const id = String(found[0].id)
    const profile = await this.accounts.profile(id)
    if (!profile) throw new AccountError('Không tìm thấy người chơi.', 404)
    const cosmetics = await rows('SELECT kind,code FROM user_cosmetics WHERE user_id=? ORDER BY kind,code', [id])
    const honors = await rows('SELECT honor_code code,selected FROM user_honors WHERE user_id=? AND revoked_at IS NULL', [id])
    const audit = await rows('SELECT id,action,reason,before_value `before`,after_value `after`,created_at createdAt FROM admin_audit WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 30', [id])
    return { profile, cosmetics, honors, audit } as AdminUser
  }
  async catalog() { return rows('SELECT code,title FROM honors WHERE active=1 ORDER BY catalog_order,level,code') }
  async change(publicId: string, command: AdminChange) {
    await transaction(async c => {
      // Serialize all admin changes for this target, including duplicate requests.
      const users = await rows("SELECT CAST(id AS CHAR) id,avatar_code avatar,avatar_frame_code frame FROM users WHERE public_id=? AND status='active' FOR UPDATE", [publicId], c)
      if (!users.length) throw new AccountError('Không tìm thấy người chơi.', 404)
      const id = String(users[0].id)
      const hash = createHash('sha256').update(JSON.stringify({ publicId, command })).digest('hex')
      const duplicate = await rows('SELECT request_hash hash FROM admin_audit WHERE id=?', [command.requestId], c)
      if (duplicate.length) {
        if (duplicate[0].hash !== hash) throw new AccountError('Mã thao tác đã dùng cho dữ liệu khác.', 409)
        return
      }
      let before: unknown, after: unknown
      if (command.action === 'resources') {
        const resource = await this.accounts.resources(id, c)
        const stats = await rows('SELECT variant,elo FROM user_game_stats WHERE user_id=? ORDER BY variant FOR UPDATE', [id], c)
        before = { gold: resource.gold, energy: resource.energy, stats }
        await change('UPDATE user_resources SET gold=?,energy=?,energy_recovery_at=IF(?<5,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 7 MINUTE),NULL),version=version+1 WHERE user_id=?', [command.gold, command.energy, command.energy, id], c)
        for (const variant of ['xiangqi', 'jieqi'] as const) await change('UPDATE user_game_stats SET elo=? WHERE user_id=? AND variant=?', [command[variant], id, variant], c)
        const goldDelta = command.gold - Number(resource.gold), energyDelta = command.energy - resource.energy
        if (goldDelta) await this.accounts.ledger(c, id, 'gold', goldDelta, 'admin_adjustment', `admin:${command.requestId}:gold`)
        if (energyDelta) await this.accounts.ledger(c, id, 'energy', energyDelta, 'admin_adjustment', `admin:${command.requestId}:energy`)
        after = { gold: command.gold, energy: command.energy, xiangqi: command.xiangqi, jieqi: command.jieqi }
      } else if (command.action === 'honor') {
        if (!(await rows('SELECT code FROM honors WHERE code=? AND active=1', [command.code], c)).length) throw new AccountError('Danh hiệu không tồn tại.')
        before = await rows('SELECT honor_code code,selected,revoked_at revokedAt FROM user_honors WHERE user_id=? AND honor_code=?', [id, command.code], c)
        await change('INSERT INTO user_honors(user_id,honor_code,selected) VALUES (?,?,?) ON DUPLICATE KEY UPDATE revoked_at=NULL,selected=IF(?=1,1,selected)', [id, command.code, Number(command.equip), Number(command.equip)], c)
        after = { code: command.code, selected: command.equip }
      } else {
        before = { owned: (await rows('SELECT code FROM user_cosmetics WHERE user_id=? AND kind=? AND code=?', [id, command.action, command.code], c)).length > 0, equipped: command.action === 'avatar' ? users[0].avatar : users[0].frame }
        await change('INSERT INTO user_cosmetics(user_id,kind,code) VALUES (?,?,?) ON DUPLICATE KEY UPDATE code=VALUES(code)', [id, command.action, command.code], c)
        if (command.equip) await change(command.action === 'avatar' ? 'UPDATE users SET avatar_code=? WHERE id=?' : 'UPDATE users SET avatar_frame_code=? WHERE id=?', [command.code, id], c)
        after = { code: command.code, equipped: command.equip }
      }
      await change('INSERT INTO admin_audit(id,user_id,action,reason,request_hash,before_value,after_value) VALUES (?,?,?,?,?,?,?)', [command.requestId, id, command.action, command.reason, hash, JSON.stringify(before), JSON.stringify(after)], c)
    })
    return this.get(publicId)
  }
}
