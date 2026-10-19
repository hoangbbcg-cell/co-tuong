import { AccountRepository, change, rows, transaction } from './accountRepository'
import { AccountError } from '../errors'

export class TestBotRepository {
  constructor(private accounts = new AccountRepository()) {}
  async reward(userId: string, matchId: string, gold: number) {
    await transaction(async connection => {
      const user = await rows("SELECT id FROM users WHERE id=? AND status='active' FOR UPDATE", [userId], connection)
      if (!user.length) throw new AccountError('Tài khoản không hoạt động.', 401)
      const key = `test-bot:${userId}:${matchId}`
      if ((await rows('SELECT id FROM resource_events WHERE idempotency_key=?', [key], connection)).length) return
      await this.accounts.resources(userId, connection)
      await change('UPDATE user_resources SET gold=gold+?,version=version+1 WHERE user_id=?', [gold, userId], connection)
      await this.accounts.ledger(connection, userId, 'gold', gold, 'test_bot_win', key)
    })
    return this.accounts.profile(userId)
  }
}
