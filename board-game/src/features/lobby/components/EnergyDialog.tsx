import { HovangLoadingOverlay } from '../../../components/HovangLoadingOverlay'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, RefObject } from 'react'
import axios from 'axios'
import panel from '../../../assets/energy-shop/panel-no-count.png'
import close from '../../../assets/energy-shop/close.png'
import { useProfileLayout } from '../hooks/useProfileLayout'
import { buttonInteraction } from '../../../lib/uiClasses'
import { oneChoiceNoticePanel, oneChoiceNoticeButton } from './OneChoiceNoticeStyles'
import { ENERGY_PAYMENT_PRODUCTS } from '../../../lib/energyPaymentCatalog'
import type { EnergyPaymentProductCode } from '../../../lib/energyPaymentCatalog'

const offers = [
  {label:'Xem quảng cáo',left:'6.6%',title:'Xem quảng cáo',description:'Quảng cáo chưa được tích hợp.',action:'XEM',iconX:170,iconHeight:268,surface:'bg-[linear-gradient(135deg,#613512,#281307)]'},
  {label:'Mua gói 100 năng lượng',left:'37.8%',title:'Gói 100 năng lượng',description:'Mua gói để nhận 100 Năng lượng. Dùng thoải mái cho các ván đấu.',action:'19.000đ',iconX:700,iconHeight:268,surface:'bg-[linear-gradient(135deg,#123c5b,#071c2d)]'},
  {label:'Mua năng lượng vô hạn',left:'68.8%',title:'Năng lượng vô hạn',description:'Chơi không giới hạn Năng lượng trong 30 ngày.',action:'39.000đ',iconX:1220,iconHeight:257,surface:'bg-[linear-gradient(135deg,#174827,#061f11)]'},
] as const

function EnergyArtworkCrop({x,y,width,height}:{x:number;y:number;width:number;height:number}) {
  return <span aria-hidden="true" className="relative block w-full overflow-hidden" style={{aspectRatio:`${width}/${height}`}}><img src={panel} alt="" className="pointer-events-none absolute block h-auto max-w-none" style={{width:`${1690/width*100}%`,left:`${-x/width*100}%`,top:`${-y/height*100}%`}} /></span>
}

type PaymentOrder = {
  id: string
  productCode: string
  amountVnd: number
  status: string
  expiresAt: string
}

type CheckoutResponse = {
  orderId: string
  orderCode: number
  checkoutUrl: string
  paymentLinkId: string
}

function PayosCheckoutPanel({
  productCode,
  onClose,
}: {
  productCode: EnergyPaymentProductCode
  onClose: () => void
}) {
  const product = ENERGY_PAYMENT_PRODUCTS[productCode]
  const [order, setOrder] = useState<PaymentOrder | null>(null)
  const [checkout, setCheckout] = useState<CheckoutResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const busy = useRef(false)

  async function startPayment() {
    if (busy.current || checkout) return

    busy.current = true
    setLoading(true)
    setError('')

    try {
      let currentOrder = order

      if (!currentOrder) {
        const response = await axios.post<PaymentOrder>(
          '/api/payments/orders',
          { productCode },
          { timeout: 15000 },
        )
        currentOrder = response.data
        setOrder(currentOrder)
      }

      if (currentOrder.status !== 'pending') {
        throw new Error('Đơn hàng không còn chờ thanh toán.')
      }

      const response = await axios.post<CheckoutResponse>(
        `/api/payments/orders/${encodeURIComponent(currentOrder.id)}/checkout`,
        {},
        { timeout: 20000 },
      )

      const data = response.data
      const url = new URL(data.checkoutUrl)

      if (
        url.protocol !== 'https:' ||
        !data.paymentLinkId ||
        data.orderId !== currentOrder.id
      ) {
        throw new Error('Đường dẫn thanh toán không hợp lệ.')
      }

      setCheckout(data)
    } catch (cause) {
      if (axios.isAxiosError(cause)) {
        const message = cause.response?.data?.error
        setError(
          typeof message === 'string'
            ? message
            : 'Không kết nối được thanh toán. Vui lòng thử lại.',
        )
      } else {
        setError(
          cause instanceof Error
            ? cause.message
            : 'Không thể tạo thanh toán.',
        )
      }
    } finally {
      busy.current = false
      setLoading(false)
    }
  }

  async function refreshStatus() {
    if (!order || busy.current) return

    busy.current = true
    setLoading(true)
    setError('')

    try {
      const response = await axios.get<PaymentOrder>(
        `/api/payments/orders/${encodeURIComponent(order.id)}`,
        { timeout: 15000 },
      )
      setOrder(response.data)
    } catch {
      setError('Không kiểm tra được trạng thái đơn hàng.')
    } finally {
      busy.current = false
      setLoading(false)
    }
  }

  const isUnlimited = productCode === 'energy_unlimited_30d'
  const packageTitle = isUnlimited ? 'Năng lượng vô hạn' : 'Gói 100 năng lượng'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thanh toán năng lượng"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 p-3 sm:p-5"
    >
      <div
        className={`relative my-auto w-full max-w-[780px] overflow-hidden rounded-[22px] border-[3px] border-[#e9b453] p-4 text-[#ffedc9] shadow-[0_20px_65px_#000b,inset_0_0_0_2px_#6a3b12] sm:p-6 ${isUnlimited ? 'bg-[radial-gradient(ellipse_at_30%_40%,#13572e_0%,#07391d_50%,#04180e_100%)]' : 'bg-[radial-gradient(ellipse_at_30%_40%,#12547a_0%,#07365b_50%,#061c32_100%)]'}`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-[7px] rounded-[16px] border border-[#9c6d31]" />
        {loading && <HovangLoadingOverlay label="Đang xử lý" />}
        <header className="relative mb-4 flex items-center justify-center gap-3 border-b border-[#be8a43]/70 pb-3 sm:mb-5">
          <span aria-hidden="true" className="text-2xl text-[#ffc24d]">⚡</span>
          <h2 className="m-0 pr-9 text-center font-heading text-[clamp(22px,4.4vw,34px)] font-bold leading-tight text-[#ffe9ab] [text-shadow:0_2px_2px_#301705]">
            Thanh toán năng lượng
          </h2>
          <button
            type="button"
            aria-label="Đóng thanh toán"
            onClick={onClose}
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#d7a350] bg-[#3a200e] text-xl text-[#ffe5aa] hover:brightness-125"
          >✕</button>
        </header>

        <div className="relative grid grid-cols-[34%_1fr] items-center gap-3 sm:gap-6">
          <div className="min-w-0 rounded-full border border-[#c99b4b]/60 bg-black/20 p-2 shadow-[inset_0_0_35px_#d8a13621]">
            <EnergyArtworkCrop x={isUnlimited ? 1220 : 700} y={330} width={300} height={isUnlimited ? 257 : 268} />
          </div>
          <div className="flex min-w-0 flex-col items-center gap-3 text-center">
            <h3 className={`m-0 w-full rounded-lg border-2 border-[#e4b15e] px-2 py-2 font-heading text-[clamp(17px,3.6vw,29px)] font-bold leading-tight text-[#ffefbb] shadow-[inset_0_0_0_1px_#593818] ${isUnlimited ? 'bg-[#064122]' : 'bg-[#063c65]'}`}>
              {isUnlimited ? packageTitle : <>Gói <span className="font-sans tabular-nums [font-variant-numeric:lining-nums_tabular-nums]">100</span> năng lượng</>}
            </h3>
            <p className="m-0 w-full max-w-[320px] rounded-lg border-2 border-[#ffe49e] bg-[linear-gradient(#ffe17a,#e8aa35)] px-2 py-1 font-number text-[clamp(25px,5vw,38px)] font-extrabold leading-tight tabular-nums text-[#221304] shadow-[0_3px_0_#86521c]">
              {product.amountVnd.toLocaleString('vi-VN')}đ
            </p>
            <p className="m-0 text-[clamp(12px,2.6vw,17px)] leading-snug text-[#fff2d8]">
              {isUnlimited ? 'Chơi không giới hạn năng lượng trong 30 ngày.' : 'Nhận 100 năng lượng sau khi thanh toán thành công.'}
            </p>
          </div>
        </div>

        {order && (
          <div className="relative mt-3 rounded-md border border-[#c5954e]/60 bg-black/20 px-3 py-2 text-sm">
            <p className="m-0 break-all">Mã đơn: {order.id}</p>
            <p className="m-0">Trạng thái: {order.status === 'paid' ? 'Đã thanh toán' : order.status === 'pending' ? 'Đang chờ thanh toán' : order.status}</p>
          </div>
        )}

        {checkout && order?.status !== 'paid' && (
          <div className="relative mt-4 rounded-lg border border-[#e4b453] bg-[#fff0d0] p-3 text-center text-[#543820]">
            <p className="m-0 font-bold">Thanh toán qua payOS</p>
            <p className="my-2 text-sm">Chỉ chuyển khoản theo thông tin trên trang payOS.</p>
            <a href={checkout.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-md bg-[#186c4b] px-4 py-3 font-bold text-white hover:brightness-110">
              Mở trang thanh toán
            </a>
          </div>
        )}

        {order?.status === 'paid' && (
          <p role="status" className="relative mt-4 text-center font-bold text-green-300">Thanh toán đã được hệ thống xác nhận.</p>
        )}
        {!checkout && (
          <p className="relative mt-4 text-center text-[clamp(12px,2.2vw,15px)] leading-relaxed text-[#ffdfaa]">
            ⓘ Thanh toán chỉ khả dụng khi hệ thống payOS được kích hoạt.
          </p>
        )}
        {error && <p role="alert" className="relative mt-3 text-center text-red-300">{error}</p>}

        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-3">
          {!checkout && order?.status !== 'paid' && (
            <button type="button" disabled={loading} onClick={() => void startPayment()}
              className="min-h-12 flex-1 rounded-lg border-2 border-[#ffe3a1] bg-[linear-gradient(#ffdf73,#e5a12b)] px-4 py-2 font-bold text-[#281708] shadow-[0_3px_0_#7f4a16] hover:brightness-110 disabled:opacity-50 sm:flex-none sm:px-7">
              {loading ? 'Đang xử lý...' : 'Thanh toán qua payOS'}
            </button>
          )}
          {order && (
            <button type="button" disabled={loading} onClick={() => void refreshStatus()}
              className="min-h-12 rounded-lg border-2 border-[#d0a050] bg-[#3b2414] px-4 py-2 font-bold hover:brightness-125 disabled:opacity-50">
              Kiểm tra trạng thái
            </button>
          )}
          <button type="button" onClick={onClose}
            className="min-h-12 rounded-lg border-2 border-[#d0a050] bg-[#3b2414] px-5 py-2 font-bold hover:brightness-125">
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
function AdNotIntegratedNotice({onClose}: {onClose: () => void}) {
  const noticeRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = noticeRef.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      if (dialog?.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      ref={noticeRef}
      aria-label="Thông báo quảng cáo"
      className="m-auto max-w-none border-0 bg-transparent p-0 backdrop:bg-black/60"
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-label="Thông báo"
        className={oneChoiceNoticePanel}
      >
        <p role="status">Quảng cáo chưa được tích hợp</p>
        <button
          type="button"
          autoFocus
          className={oneChoiceNoticeButton}
          onClick={onClose}
        >
          Đóng
        </button>
      </section>
    </dialog>
  )
}
export function EnergyDialog({dialogRef}:{dialogRef:RefObject<HTMLDialogElement|null>;onUnavailable:()=>void}) {
  const layout = useProfileLayout()
  const [selectedPayment, setSelectedPayment] = useState<EnergyPaymentProductCode | null>(null)
  const [showAdNotice, setShowAdNotice] = useState(false)

  const chooseOffer = async (index: number) => {
    dialogRef.current?.close()
    if (index === 0) {
      setShowAdNotice(true)
      return
    }
    setSelectedPayment(index === 1 ? 'energy_100' : 'energy_unlimited_30d')
  }
  return <><dialog ref={dialogRef} aria-label="Năng lượng" className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-black/65 compact:landscape:!w-[min(80vw,calc(78dvh_*_2.1),1160px)] compact:portrait:!w-[var(--energy-mobile-width)] compact:portrait:!h-[var(--energy-mobile-height)] compact:portrait:-translate-y-[6px]" style={{width:'min(68vw, calc(78dvh * 2.1), 980px)','--energy-mobile-width':`${layout.width*layout.scale}px`,'--energy-mobile-height':`${layout.height*layout.scale}px`} as CSSProperties}>
    <div className="relative compact:portrait:hidden">
      <img src={panel} alt="Năng lượng: xem video, gói 100 năng lượng, năng lượng vô hạn" className="m-0 block h-auto w-full border-0 p-0" />
      <button type="button" aria-label="Đóng Năng lượng" onClick={()=>dialogRef.current?.close()} className="absolute right-[1%] top-[10%] m-0 h-fit w-[5.2%] cursor-pointer border-0 bg-transparent p-0 leading-none shadow-none hover:brightness-110"><img src={close} alt="" className="m-0 block h-auto w-full border-0 p-0" /></button>
      {offers.map((item,index)=><button key={item.label} type="button" aria-label={item.label} onClick={() => chooseOffer(index)} className="absolute top-[76.9%] h-[10.4%] w-[24.7%] cursor-pointer border-0 bg-transparent p-0 hover:bg-[#ffd34e]/20 active:bg-[#ffd34e]/30" style={{left:item.left,clipPath:'polygon(4% 0,96% 0,100% 17%,100% 83%,96% 100%,4% 100%,0 83%,0 17%)'}} />)}
    </div>
    <div className="relative hidden h-full flex-col rounded-xl border-[3px] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-3 text-[#fff0cf] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_5px_#875026,inset_0_0_0_7px_#160904] [container-type:inline-size] compact:portrait:flex">
      <header className="relative flex shrink-0 items-center justify-center pb-2">
        <div className="w-[88%]"><EnergyArtworkCrop x={340} y={0} width={1010} height={195} /></div>
        <button type="button" aria-label="Đóng Năng lượng" onClick={()=>dialogRef.current?.close()} className={`${buttonInteraction} absolute right-0 top-0 m-0 w-[9cqw] border-0 bg-transparent p-0 hover:brightness-110`}><img src={close} alt="" className="block h-auto w-full" /></button>
      </header>
      <div className="grid min-h-0 flex-1 grid-rows-3 gap-2">
        {offers.map((item,index)=><section key={item.label} className={`${item.surface} grid min-h-0 grid-cols-[38%_1fr] items-center gap-2 rounded-lg border-2 border-[#c69a48] p-2 shadow-[inset_0_0_0_1px_#5c3514]`}>
          <EnergyArtworkCrop x={item.iconX} y={330} width={300} height={item.iconHeight} />
          <div className="flex min-w-0 flex-col items-center gap-[2cqw] text-center">
            <h3 className="m-0 font-heading text-[5.3cqw] font-bold leading-tight text-[#ffe5a6]">{item.title}</h3>
            <p className="m-0 text-[4.2cqw] leading-snug">{item.description}</p>
            <button type="button" aria-label={item.label} onClick={() => chooseOffer(index)} className={`${buttonInteraction} flex w-full items-center justify-center whitespace-nowrap rounded border-2 border-[#ffe4a0] bg-[linear-gradient(#ffe485,#e6a51d)] px-2 py-[1.5cqw] font-number text-[5cqw] font-bold not-italic leading-none text-[#281708] lining-nums tabular-nums shadow-[inset_0_0_0_1px_#a46b16] hover:brightness-110`}>{item.action}</button>
          </div>
        </section>)}
      </div>
    </div>
  </dialog>
    {showAdNotice && <AdNotIntegratedNotice onClose={() => setShowAdNotice(false)} />}
    {selectedPayment && (
      <PayosCheckoutPanel
        productCode={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    )}
  </>
}