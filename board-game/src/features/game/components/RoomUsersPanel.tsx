import type { CSSProperties } from 'react'
import avatar from '../../../assets/icons/avatar.svg'
import viewerCardFrame from '../../../assets/room-users/viewer-card-frame-tight.png'
import waitingCardFrame from '../../../assets/room-users/waiting-card-frame-tight.png'
import queueJoinButton from '../../../assets/room-users/queue-join-swapped.png'
import queueLeaveButton from '../../../assets/room-users/queue-leave-swapped.png'
import defaultAvatarFrame from '../../../assets/player/fb7341c5-be02-45ac-846c-f085eebc50ee.png'
import { AvatarFrameOverlay } from './AvatarFrameOverlay'

type RoomUser = { id: string; name: string; side?: 'red' | 'black'; ready?: boolean; queued?: boolean; queueNumber?: number }

const waitingFrameStyle: CSSProperties = {
  borderImageSource: `url(${waitingCardFrame})`,
  borderImageSlice: '110 150 fill',
  borderImageWidth: '8px 11px',
  borderImageRepeat: 'stretch',
}

const viewerFrameStyle: CSSProperties = {
  borderImageSource: `url(${viewerCardFrame})`,
  borderImageSlice: '140 150 fill',
  borderImageWidth: '8px 11px',
  borderImageRepeat: 'stretch',
}

function WaitingCard({ player, queueNumber, onAvatarClick }: { player: RoomUser; queueNumber: number; onAvatarClick?: (name: string) => void }) {
  return <li data-user-status="waiting" style={waitingFrameStyle} className="flex h-10 w-fit max-w-full shrink-0 items-center justify-center border-[8px] border-solid border-transparent px-2.5 drop-shadow-[0_3px_4px_#0009]">
    <span className="flex min-w-0 items-center gap-1.5">
      <span aria-label={`Thứ tự chờ ${queueNumber}`} className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-[#ffc53d] bg-[linear-gradient(145deg,#9b4c13,#4d1d08)] font-georgia text-base/none font-bold text-white shadow-[inset_0_0_0_1px_#6c2c0d,0_0_5px_#ffac33]">{queueNumber}</span>
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#fff0b5,#9e7132_50%,#f7d988)] p-0.5 shadow-[0_1px_3px_#000b]">
        <button type="button" aria-label={`Xem hồ sơ ${player.name}`} onClick={() => onAvatarClick?.(player.name)} className="relative m-0 block size-full cursor-pointer rounded-full border-0 bg-transparent p-0 leading-none shadow-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe2a1]"><img src={avatar} alt="" className="block size-full rounded-full border-0 object-cover" /><AvatarFrameOverlay src={defaultAvatarFrame} /></button>
      </span>
      <span className="min-w-0 truncate font-arial text-sm/none text-white [text-shadow:0_2px_2px_#170600]">{player.name}</span>
    </span>
  </li>
}

function ViewerCard({ player, onAvatarClick }: { player: RoomUser; onAvatarClick?: (name: string) => void }) {
  return <li data-user-status="watching" style={viewerFrameStyle} className="flex h-10 w-fit max-w-full shrink-0 items-center gap-1.5 border-[8px] border-solid border-transparent px-2.5 drop-shadow-[0_3px_4px_#0009]">
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#ffe69b,#9d6b27_52%,#f4cf72)] p-0.5 shadow-[0_1px_3px_#000b]">
      <button type="button" aria-label={`Xem hồ sơ ${player.name}`} onClick={() => onAvatarClick?.(player.name)} className="relative m-0 block size-full cursor-pointer rounded-full border-0 bg-transparent p-0 leading-none shadow-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe2a1]"><img src={avatar} alt="" className="block size-full rounded-full border-0 object-cover" /><AvatarFrameOverlay src={defaultAvatarFrame} /></button>
    </span>
    <span className="min-w-0 truncate font-arial text-sm/none text-white [text-shadow:0_2px_2px_#071116]">{player.name}</span>
  </li>
}

export function RoomQueueButton({ queued, disabled = false, onToggleQueue }: {
  queued: boolean
  disabled?: boolean
  onToggleQueue: () => void
}) {
  return <button type="button" aria-label={queued ? 'Thoát hàng chờ' : 'Xếp hàng chờ chơi'} disabled={disabled} onClick={onToggleQueue} className="pointer-events-auto m-0 inline-flex h-[44px] w-[142px] shrink-0 items-center justify-center border-0 bg-transparent p-0 leading-none shadow-none disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#ffe2a1]">
    <img src={queued ? queueLeaveButton : queueJoinButton} alt={queued ? 'Thoát hàng' : 'Xếp hàng'} className="m-0 block size-full border-0 p-0 object-contain" />
  </button>
}

export function RoomUsersPanel({ users, queued = false, queueDisabled = false, onToggleQueue, onAvatarClick }: {
  users: RoomUser[]
  queued?: boolean
  queueDisabled?: boolean
  onToggleQueue?: () => void
  onAvatarClick?: (name: string) => void
}) {
  const waitingNumbers = new Map(users.filter(user => user.ready).map((user, index) => [user.id, index + 1]))
  const isWaiting = (user: RoomUser) => !!user.ready || !!user.queued
  const orderedUsers = users
    .map((user, arrivalOrder) => ({ user, arrivalOrder }))
    .sort((a, b) => Number(isWaiting(b.user)) - Number(isWaiting(a.user)) || a.arrivalOrder - b.arrivalOrder)

  return <div className="relative size-full min-h-0">
    {onToggleQueue && <div className="absolute inset-x-0 z-10 flex justify-center" style={{ bottom: 'calc(100% + 10px)' }}>
      <RoomQueueButton queued={queued} disabled={queueDisabled} onToggleQueue={onToggleQueue} />
    </div>}
    <section id="roomUsers" aria-label="Danh sách người trong phòng" tabIndex={0} className="relative flex size-full min-h-0 flex-col overflow-hidden overscroll-contain rounded-[3px] border border-[#c39a52] bg-[#06181dcc] p-2.5 text-left shadow-[inset_0_0_0_1px_#e3bf704f,inset_0_0_24px_#0008]">
      <ul className="min-h-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-contain flex flex-wrap content-start items-start justify-start gap-x-1.5 gap-y-2.5 pr-1">
        {orderedUsers.map(({ user }) => isWaiting(user)
          ? <WaitingCard key={user.id} player={user} queueNumber={user.queueNumber ?? waitingNumbers.get(user.id) ?? 1} onAvatarClick={onAvatarClick} />
          : <ViewerCard key={user.id} player={user} onAvatarClick={onAvatarClick} />)}
      </ul>
    </section>
  </div>
}
