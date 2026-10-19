import { useEffect, useRef } from 'react'
import { buttonInteraction } from '../../lib/uiClasses'

export function ShopPurchaseDialog({ name, price, buying, onCancel, onConfirm }: { name: string; price: number; buying: boolean; onCancel: () => void; onConfirm: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (!ref.current?.open) ref.current?.showModal() }, [])
  return <dialog ref={ref} aria-labelledby="shop-purchase-title" aria-describedby="shop-purchase-description" onCancel={event => { event.preventDefault(); onCancel() }} onClose={onCancel} onClick={event => { if (event.target === event.currentTarget) onCancel() }} className="m-auto w-[min(440px,90vw)] rounded-xl border-2 border-[#bd914e] bg-[#302015] p-6 font-heading text-[#ffe6b0] shadow-[inset_0_0_0_2px_#65421e,0_8px_30px_#0009] backdrop:bg-black/65 backdrop:backdrop-blur-sm">
    <h2 id="shop-purchase-title" className="text-center text-3xl font-bold">Xác nhận mua</h2>
    <p id="shop-purchase-description" className="mt-4 text-center text-xl">Bạn muốn mua <strong>{name}</strong> với giá <span className="whitespace-nowrap font-number font-bold text-[#ffd36e]">{price.toLocaleString('vi-VN')} vàng</span>?</p>

    <div className="mt-6 flex justify-center gap-4">
      <button autoFocus type="button" disabled={buying} onClick={onCancel} className={`${buttonInteraction} rounded-lg border border-[#a86e2c] bg-[#351a0b] px-6 py-2 text-lg font-bold`}>Hủy</button>
      <button type="button" disabled={buying} onClick={onConfirm} className={`${buttonInteraction} rounded-lg border-2 border-[#edba5a] bg-[linear-gradient(135deg,#ffe29a,#f1bb5e)] px-6 py-2 text-lg font-bold text-[#46220c]`}>{buying ? 'Đang mua...' : 'Xác nhận'}</button>
    </div>
  </dialog>
}
