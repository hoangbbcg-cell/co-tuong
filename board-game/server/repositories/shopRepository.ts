import { AccountRepository, rows, change, transaction } from './accountRepository'
import { AccountError } from '../errors'
import { alreadyOwnedMessage, ownsCosmetic } from '../../src/lib/shopCatalog'
import type { ShopProduct } from '../../src/lib/shopCatalog'
import type { DailyShop } from '../../src/types/dailyShop'

export class ShopRepository {
  constructor(private accounts = new AccountRepository()) {}
  async purchase(id: string, product: ShopProduct, requestId: string, sale: DailyShop) {
    await transaction(async c => {
      const user = await rows("SELECT id FROM users WHERE id=? AND status='active' FOR UPDATE", [id], c)
      if (!user.length) throw new AccountError('Tài khoản không hoạt động.', 401)
      const key = `shop:${id}:${requestId}`
      const reason = `shop_purchase:${product.id}`
      const existing = await rows('SELECT reason FROM resource_events WHERE idempotency_key=?', [key], c)
      if (existing.length) {
        if (existing[0].reason !== reason) throw new AccountError('Mã mua hàng đã dùng cho sản phẩm khác.', 409)
        return
      }
      if (Date.now() >= sale.refreshAt || !sale.products.some(item => item.id === product.id)) throw new AccountError('Vật phẩm không có trong phiên chợ hôm nay. Vui lòng tải lại phiên chợ.', 409)
      const cosmetics = await rows('SELECT kind,code FROM user_cosmetics WHERE user_id=?', [id], c)
      if (ownsCosmetic({ cosmetics: cosmetics.map(item => ({ kind: String(item.kind), code: String(item.code) })) }, product)) throw new AccountError(alreadyOwnedMessage(product), 409)
      const resource = await this.accounts.resources(id, c)
      if (BigInt(resource.gold) < BigInt(product.price)) throw new AccountError('Bạn không đủ vàng để mua sản phẩm này.', 400)
      await change('UPDATE user_resources SET gold=gold-?,version=version+1 WHERE user_id=?', [product.price, id], c)
      await change('INSERT INTO user_cosmetics(user_id,kind,code) VALUES (?,?,?)', [id, product.kind, product.code], c)
      await this.accounts.ledger(c, id, 'gold', -product.price, reason, key)
    })
    return this.accounts.profile(id)
  }
}
