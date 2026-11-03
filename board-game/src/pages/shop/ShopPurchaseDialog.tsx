import { confirmationCancelButton, confirmationAcceptButton } from '../../lib/confirmationButtonStyles'
import { useEffect, useRef } from 'react'
import { confirmationDialogFrame, confirmationDialogTitle, confirmationDialogDescription, confirmationDialogActions } from '../../lib/confirmationDialogStyles'

export function ShopPurchaseDialog({ name, price, buying, onCancel, onConfirm }: { name: string; price: number; buying: boolean; onCancel: () => void; onConfirm: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (!ref.current?.open) ref.current?.showModal() }, [])
  return <dialog ref={ref} aria-labelledby="shop-purchase-title" aria-describedby="shop-purchase-description" onCancel={event => { event.preventDefault(); onCancel() }} onClose={onCancel} onClick={event => { if (event.target === event.currentTarget) onCancel() }} className={`${confirmationDialogFrame} m-auto backdrop:bg-black/60`}>
    <h2 id="shop-purchase-title" className={confirmationDialogTitle}>Xác nhận mua</h2>
    <p id="shop-purchase-description" className={confirmationDialogDescription}>Bạn muốn mua <strong>{name}</strong> với giá <span className="whitespace-nowrap font-number font-bold text-[#ffd36e] compact:inline-flex compact:items-baseline compact:gap-1 compact:font-body"><span className="compact:font-number compact:lining-nums compact:tabular-nums compact:not-italic compact:leading-none">{price.toLocaleString('vi-VN')}</span><span> vàng</span></span>?</p>

    <div className={confirmationDialogActions}>
      <button autoFocus type="button" disabled={buying} onClick={onCancel} className={`${confirmationCancelButton} px-6 py-2 text-lg`}>Hủy</button>
      <button type="button" disabled={buying} onClick={onConfirm} className={`${confirmationAcceptButton} px-6 py-2 text-lg`}>{buying ? 'Đang mua...' : 'Xác nhận'}</button>
    </div>
  </dialog>
}
