import drawDialog from '../../../assets/takeback/draw-dialog.png'
import takebackDialog from '../../../assets/takeback/takeback-dialog.png'
import takebackDecline from '../../../assets/takeback/takeback-decline.png'
import takebackAccept from '../../../assets/takeback/takeback-accept.png'
import type { Side } from '../../../types/game'
import type { RoomSnapshot } from '../../../types/room'

interface Props {
  online: boolean
  playerSide?: Side
  drawOffer?: Side | null
  takebackOffer?: RoomSnapshot['takebackOffer']
  pending: boolean
  replyDraw: (accepted: boolean) => void
  replyTakeback: (accepted: boolean) => void
}

export function RoomOfferDialog({ online, playerSide, drawOffer, takebackOffer, pending, replyDraw, replyTakeback }: Props) {
  const drawPending = !!drawOffer && drawOffer !== playerSide
  const takebackPending = !!takebackOffer && takebackOffer.requester !== playerSide
  if (!online || !playerSide || (!drawPending && !takebackPending)) return null

  const isDraw = drawPending
  const reply = isDraw ? replyDraw : replyTakeback
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#07171526]" role="alertdialog" aria-label={isDraw ? 'Đối thủ cầu hòa' : 'Đối thủ yêu cầu đi lại'}>
    <div className="relative w-[min(520px,calc(100%-32px))] overflow-hidden shadow-[0_10px_35px_#0009]">
      <img src={isDraw ? drawDialog : takebackDialog} alt={isDraw ? 'Đối phương muốn cầu hòa' : 'Đối phương muốn đi lại'} className="block h-auto w-full border-0" />
      <button type="button" aria-label={isDraw ? 'Đóng và từ chối cầu hòa' : 'Đóng và từ chối đi lại'} disabled={pending} onClick={() => reply(false)} className="absolute top-[11.5%] right-[2.5%] m-0 aspect-square w-[9.8%] rounded-full border-0 bg-transparent p-0 enabled:hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe290]" />
      <button type="button" aria-label={isDraw ? 'Từ chối cầu hòa' : 'Từ chối đi lại'} disabled={pending} onClick={() => reply(false)} className="absolute bottom-[10.45%] left-[11.85%] m-0 h-auto w-[36.6%] border-0 bg-transparent p-0 leading-none enabled:hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe290]"><img src={takebackDecline} alt="" className="block size-full border-0" /></button>
      <button type="button" aria-label={isDraw ? 'Đồng ý cầu hòa' : 'Cho phép đi lại'} disabled={pending} onClick={() => reply(true)} className="absolute right-[12.63%] bottom-[10.45%] m-0 h-auto w-[36.6%] border-0 bg-transparent p-0 leading-none enabled:hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe290]"><img src={takebackAccept} alt="" className="block size-full border-0" /></button>
    </div>
  </div>
}
