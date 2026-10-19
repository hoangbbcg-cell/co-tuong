import { SHOP_PRODUCTS } from '../../src/lib/shopCatalog'
import { AccountError } from '../errors'
import { ShopRepository } from '../repositories/shopRepository'

export class ShopService {
  constructor(readonly repository = new ShopRepository()) {}
  purchase(id: string, input: unknown) {
    if (!input || typeof input !== 'object') throw new AccountError('Yêu cầu mua hàng không hợp lệ.')
    const body = input as Record<string, unknown>
    const product = SHOP_PRODUCTS.find(item => item.id === body.productId)
    if (!product) throw new AccountError('Sản phẩm không tồn tại.', 404)
    if (typeof body.requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId)) throw new AccountError('Mã mua hàng không hợp lệ.')
    // Price, kind and code come exclusively from the server catalog.
    return this.repository.purchase(id, product, body.requestId)
  }
}
