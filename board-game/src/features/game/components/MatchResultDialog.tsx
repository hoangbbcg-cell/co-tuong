import { ReadyCountdownBadge } from './ReadyCountdownBadge'
import { useEffect, useRef, useState } from 'react'
import win from '../../../assets/game-result/victory.webp'
import loss from '../../../assets/game-result/defeat.webp'
import redWins from '../../../assets/game-result/red-wins.png'
import blackWins from '../../../assets/game-result/black-wins.png'
import goldIcon from '../../../assets/home-actions/gold-icon-v2.png'
import { XIANGQI_ELO_ICON as redGeneral } from '../../../lib/eloArtwork'
import concealedPiece from '../../../assets/history/history-hidden-user.png'
import type { GameVariant } from '../../../types/game'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { RewardItemTile, RewardPreviewDialog } from '../../lobby/components/RewardItemTile'

export function MatchResultDialog({ outcome, onClose, rewardGold, eloDelta, variant = 'xiangqi', readyCountdown, winner }: { outcome: 'win' | 'loss'; onClose: () => void; rewardGold?: number; eloDelta?: number; variant?: GameVariant; readyCountdown?: number | null; winner?: 'red' | 'black' }) {
  const title = winner ? (winner === 'red' ? 'Đỏ thắng' : 'Đen thắng') : outcome === 'win' ? 'Chiến thắng' : 'Thất bại'
  const artwork = winner ? (winner === 'red' ? redWins : blackWins) : outcome === 'win' ? win : loss
  const ref = useRef<HTMLDialogElement>(null)
  const dismissAfter = useRef(Infinity)
  const [selectedReward, setSelectedReward] = useState<'gold' | 'elo' | null>(null)
  const rewards: { kind: 'gold' | 'elo'; name: string; image: string; amount: number }[] = []
  if (!winner && rewardGold !== undefined && rewardGold !== 0) rewards.push({ kind: 'gold', name: 'Vàng', image: goldIcon, amount: rewardGold })
  if (!winner && eloDelta !== undefined && eloDelta !== 0) rewards.push({ kind: 'elo', name: `Elo ${variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'}`, image: variant === 'jieqi' ? concealedPiece : redGeneral, amount: eloDelta })
  const selected = rewards.find(reward => reward.kind === selectedReward)
  const formatAmount = (amount: number) => `${amount < 0 ? '−' : '+'}${Math.abs(amount)}`
  useEffect(() => {
    ref.current?.show()
    dismissAfter.current = performance.now() + 1000
  }, [])
  const dismiss = () => {
    if (performance.now() >= dismissAfter.current) onClose()
  }
  return <dialog ref={ref} aria-label={title} onClick={dismiss} onCancel={event => { event.preventDefault(); dismiss() }}
    className="pointer-events-none fixed inset-0 m-0 h-full w-full max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 leading-none shadow-none"
    style={{ width: '100%', height: '100%', maxWidth: 'none', maxHeight: 'none' }}>
    <div data-result-backdrop aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/40" />
    <div className="pointer-events-auto absolute left-1/2 top-1/2 w-[min(92vw,68dvh)] -translate-x-1/2 -translate-y-1/2">
    <div className="relative m-0 h-fit w-fit border-0 bg-transparent p-0 leading-none">
      <img src={artwork} alt={title} className="m-0 block h-auto w-full border-0 p-0" />
      <div className="absolute overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x [container-type:size]" style={{ left: '18%', top: '56%', width: '64%', height: '16%' }}>
        <div className="flex w-max min-w-full flex-nowrap items-start gap-[8px] pb-[8px]">
          {rewards.map(reward => <RewardItemTile key={reward.kind} label={`${reward.name} ${formatAmount(reward.amount)}`} amount={formatAmount(reward.amount)} onClick={() => setSelectedReward(reward.kind)}><CrispUiImage src={reward.image} alt={reward.name} className="size-[88%] object-contain" /></RewardItemTile>)}
        </div>
      </div>
      <button autoFocus type="button" aria-label="Xác nhận"
        className="absolute cursor-pointer rounded-xl border-0 bg-transparent p-0 shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe19a]"
        style={winner ? { left: winner === 'red' ? '30%' : '25%', top: '73%', width: '50%', height: '15%' } : { left: '25%', top: '77.5%', width: '50%', height: '10%' }} />
    </div>
    </div>
    {readyCountdown != null && <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3"><ReadyCountdownBadge seconds={readyCountdown} scale={0.65} result/></div>}
    {selected && <RewardPreviewDialog name={selected.name} amount={formatAmount(selected.amount)} onClose={() => setSelectedReward(null)}><CrispUiImage src={selected.image} alt={selected.name} className="size-[88%] object-contain" /></RewardPreviewDialog>}
  </dialog>
}
