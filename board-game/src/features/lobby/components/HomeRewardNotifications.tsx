import { useSessionStore } from '../../../store/sessionStore'
import { useEffect, useRef, useState } from 'react'
import { useHomeRewardNotifications } from '../hooks/useHomeRewardNotifications'
import { useCelebrationSound } from '../../../lib/useCelebrationSound'
import { type HomeReward } from '../../../store/homeRewardsStore'
import { AvatarPortrait } from './AvatarCustomization'
import { getAvatarFrame } from '../../../lib/avatarFrames'
import { ReceivedHonorArtwork, ReceivedHonorDetails } from './ProfileDialog'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import frame from '../../../assets/85b40e21-9122-454b-918b-038bfaa7fda2.png'
import goldIcon from '../../../assets/home-actions/gold-icon-v2.png'
import { XIANGQI_ELO_ICON as redGeneral } from '../../../lib/eloArtwork'
import concealedPiece from '../../../assets/history/history-hidden-user.png'
import { SHOP_PRODUCTS } from '../../../lib/shopCatalog'
import { RewardItemTile, RewardPreviewDialog } from './RewardItemTile'

function RewardArtwork({ reward }: { reward: HomeReward }) {
  const index = Number(reward.code.replace(/^(avatar|frame)-/, ''))
  if (reward.kind === 'avatar') return <AvatarPortrait avatarIndex={index} className="size-[82%] rounded-full" />
  if (reward.kind === 'frame') return <CrispUiImage src={getAvatarFrame(index).image} alt="Viền avatar mới" className="size-[90%] object-contain" />
  if (reward.kind === 'honor') return <ReceivedHonorArtwork code={reward.code} />
  return <CrispUiImage src={reward.kind === 'gold' ? goldIcon : reward.code === 'jieqi' ? concealedPiece : redGeneral} alt={reward.kind === 'gold' ? 'Vàng' : `Elo ${reward.code === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'}`} className="size-[88%] object-contain" />
}

function RewardPreview({ reward, onClose, detailsVisible, onCloseDetails, detailsPressed }: { reward: HomeReward; onClose: () => void; detailsVisible: boolean; onCloseDetails: () => void; detailsPressed: boolean }) {
  const name = SHOP_PRODUCTS.find(product => product.code === reward.code)?.name
    ?? (reward.kind === 'honor' ? 'Danh hiệu nhận được' : reward.kind === 'gold' ? 'Vàng' : 'Elo')
  return <RewardPreviewDialog name={name} amount={reward.amount ? `+${reward.amount}` : undefined} onClose={onClose} detailsVisible={detailsVisible} detailsPressed={detailsPressed} onCloseDetails={onCloseDetails} details={reward.kind === 'honor' ? closeDetails => <ReceivedHonorDetails code={reward.code} onClose={closeDetails} /> : undefined}><RewardArtwork reward={reward} /></RewardPreviewDialog>
}

export function HomeRewardNotifications() {
  const { account, pending, visible, markPresented, dismiss } = useHomeRewardNotifications()
  const screen = useSessionStore(state => state.screen)
  const [dialogOpened, setDialogOpened] = useState(false)
  useCelebrationSound('reward', visible && dialogOpened, { finishOnClose: true, resetKey: `${account?.id}:${screen}` })
  const [selectedReward, setSelectedReward] = useState<HomeReward | null>(null)
  const [honorDetailsVisible, setHonorDetailsVisible] = useState(true)
  const [pressedHonor, setPressedHonor] = useState<string | null>(null)
  useEffect(() => { setSelectedReward(null); setHonorDetailsVisible(true); setPressedHonor(null) }, [visible, account?.id])
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (visible && element && !element.open) { element.showModal(); markPresented() }
    else if (!visible && element?.open) element.close()
    setDialogOpened(Boolean(visible && element?.open))
  }, [visible])
  if (!visible) return null
  const rewards: HomeReward[] = []
  for (const reward of pending) {
    const previous = rewards.find(entry => entry.kind === reward.kind && entry.code === reward.code)
    if (previous && reward.amount && previous.amount) previous.amount = (BigInt(previous.amount) + BigInt(reward.amount)).toString()
    else if (!previous) rewards.push({ ...reward })
  }
  const onlyResources = rewards.every(reward => reward.kind === 'gold' || reward.kind === 'elo')
  const closePreview = () => { setSelectedReward(null); setPressedHonor(null) }
  const confirm = () => { if (account && !selectedReward) dismiss() }
  return <dialog ref={dialog} data-home-reward aria-label="Vật phẩm mới nhận được" onCancel={event => { event.preventDefault(); if (event.target !== event.currentTarget) return; if (selectedReward) closePreview(); else confirm() }} className="fixed! inset-0! m-0! flex! h-[100dvh]! w-screen! max-h-none! max-w-none! items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none backdrop:bg-black/60" style={{ width: 'min(92vw, 70dvh)' }}>
    <div className="relative mx-auto w-[min(92vw,70dvh)] max-w-full shrink-0">
      <CrispUiImage src={frame} alt="Nhận được — Vật phẩm nhận được" className="block h-auto w-full" />
      <div className="absolute overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x [container-type:size]" style={onlyResources ? { left: '18%', top: '56%', width: '64%', height: '16%' } : { left: '12%', top: '54%', width: '76%', height: '21%' }}>
        <div className="flex w-max min-w-full flex-nowrap items-start gap-[8px] pb-[8px]">
          {rewards.map(reward => <RewardItemTile key={`${reward.kind}:${reward.code}`} label={reward.kind === 'honor' ? 'Danh hiệu mới' : reward.kind === 'avatar' ? 'Avatar mới' : reward.kind === 'frame' ? 'Viền mới' : `${reward.kind === 'gold' ? 'Vàng' : 'Elo'} +${reward.amount}`} amount={reward.amount ? `+${reward.amount}` : undefined}  onClick={() => { setSelectedReward(reward); setHonorDetailsVisible(true) }}><RewardArtwork reward={reward} /></RewardItemTile>)}
        </div>
      </div>
      <button autoFocus type="button" aria-label="Xác nhận vật phẩm đã nhận" onClick={confirm} className="absolute cursor-pointer rounded-xl border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-[#ffe19a]" style={{ left: '25%', top: '77.5%', width: '50%', height: '10%' }} />
    </div>
    {selectedReward && <RewardPreview reward={selectedReward} detailsVisible={honorDetailsVisible} detailsPressed={selectedReward.kind === 'honor' && pressedHonor === selectedReward.code} onCloseDetails={() => setHonorDetailsVisible(false)} onClose={closePreview} />}
  </dialog>
}
