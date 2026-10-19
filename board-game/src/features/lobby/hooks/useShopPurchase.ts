import { useRef, useState } from 'react'
import axios from 'axios'
import { accountApi } from '../../../services/accountApi'
import { applyAccount } from '../../../services/accountSession'
import { errorMessage } from '../../../services/api'
import { useSessionStore } from '../../../store/sessionStore'
import { alreadyOwnedMessage, ownsCosmetic } from '../../../lib/shopCatalog'
import type { ShopProduct } from '../../../lib/shopCatalog'

export function useShopPurchase(onMessage: (message: string) => void) {
  const [selected, setSelected] = useState<ShopProduct | null>(null)
  const [buying, setBuying] = useState(false)
  const busy = useRef(false)
  const attempts = useRef(new Map<string, string>())
  const open = (product: ShopProduct) => {
    if (busy.current) return
    const account = useSessionStore.getState().account
    if (!account) { onMessage('Vui lòng đăng nhập để mua sản phẩm.'); return }
    if (ownsCosmetic(account, product)) { onMessage(alreadyOwnedMessage(product)); return }
    onMessage(''); setSelected(product)
  }
  const confirm = async () => {
    if (!selected || busy.current) return
    const product = selected
    busy.current = true; setBuying(true)
    const requestId = attempts.current.get(product.id) ?? crypto.randomUUID()
    attempts.current.set(product.id, requestId)
    try {
      const profile = await accountApi.purchase(product.id, requestId)
      if (useSessionStore.getState().account?.id === profile.id) applyAccount(profile)
      attempts.current.delete(product.id)
      onMessage(`Đã mua ${product.kind === 'avatar' ? 'avatar' : 'viền'} ${product.name}. Vật phẩm đã được lưu vào ${product.kind === 'avatar' ? 'Chọn avatar' : 'Chọn viền'}.`)
    } catch (error) {
      // Keep the key on timeout: the server may already have committed this purchase.
      if (axios.isAxiosError(error) && error.response && error.response.status < 500) attempts.current.delete(product.id)
      onMessage(errorMessage(error))
    } finally { busy.current = false; setBuying(false); setSelected(null) }
  }
  return { selected, buying, open, confirm, cancel: () => { if (!busy.current) setSelected(null) } }
}
