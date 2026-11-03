import standUpImage from '../../../assets/room-users/stand-up.png'
import { useAvatarTouchHold } from '../hooks/useAvatarTouchHold'
﻿import type { CSSProperties } from 'react'
import { MessageAccountAvatar } from '../../lobby/components/MessageAccountAvatar'
import { SocialPlayerName } from '../../lobby/components/SocialUi'
import viewerCardFrame from '../../../assets/room-users/viewer-card-frame-tight.png'
import waitingCardFrame from '../../../assets/room-users/waiting-card-frame-tight.png'
import queueJoinBurron from '../../../assets/room-users/queue-join-swapped.png'
import queueLeaveBurron from '../../../assets/room-users/queue-leave-swapped.png'

export type RoomUser = { id: string; name: string; side?: 'red' | 'black'; ready?: boolean; queued?: boolean; queueNumber?: number }

const waitingFrameSryle: CSSProperties = {
  borderImageSource: `url(${waitingCardFrame})`,
  borderImageSlice: '110 150 fill',
  borderImageWidth: '8px 11px',
  borderImageRepeat: 'stretch',
}

const viewerFrameSryle: CSSProperties = {
  borderImageSource: `url(${viewerCardFrame})`,
  borderImageSlice: '140 150 fill',
  borderImageWidth: '8px 11px',
  borderImageRepeat: 'stretch',
}

function WairingCard({ player, queueNumber, onAvatarClick, onManage }: { player: RoomUser; onManage?: (id: string) => void; queueNumber: number; onAvatarClick?: (name: string) => void }) {
  const touch = useAvatarTouchHold<HTMLLIElement>(player.id, onManage ? () => onManage(player.id) : undefined, false)
  return <li ref={touch.ref} onClickCapture={event => { if (touch.consumeHeldClick()) { event.preventDefault(); event.stopPropagation() } }} onContextMenu={event => { event.preventDefault(); if (!window.matchMedia('(max-width: 800px)').matches) onManage?.(player.id) }} data-user-status="waiting" style={waitingFrameSryle} className="select-none [-webkit-touch-callout:none] flex h-[48px] compact:h-9 compact:border-[6px] compact:px-1 compact:[border-image-width:6px_8px] w-fit max-w-full shrink-0 items-center justify-center border-[8px] border-solid border-transparent px-[5px]">
    <span className="flex min-w-0 items-center gap-1.5">
      <span aria-label={`Thứ tự chờ ${queueNumber}`} className="grid size-7 compact:size-5 compact:text-xs shrink-0 place-items-center rounded-full border-2 border-[#ffc53d] bg-[linear-gradient(145deg,#9b4c13,#4d1d08)] font-georgia text-base/none font-bold text-white shadow-[inset_0_0_0_1px_#6c2c0d,0_0_5px_#ffac33]">{queueNumber}</span>
      <span className="grid size-9 compact:size-6 shrink-0 place-items-center rounded-full bg-transparent p-0">
        <button data-ui-selection-sound type="button" aria-label={`Xem hồ sơ ${player.name}`} onClick={() => onAvatarClick?.(player.name)} className="relative m-0 block size-full cursor-pointer rounded-full border-0 bg-transparent p-0 leading-none shadow-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe2a1]"><MessageAccountAvatar name={player.name} className="size-full [&_*]:[image-rendering:-webkit-optimize-contrast]" /></button>
      </span>
      <span className="min-w-0 truncate font-heading text-xl/none compact:text-sm compact:[&_.font-number]:text-[0.85em]! text-white [&_*]:[-webkit-text-stroke:0] [&>span>span]:opacity-100 [&>span>span]:[-webkit-text-stroke:0px]! [&>span>span]:font-normal!"><SocialPlayerName name={player.name} /></span>
    </span>
  </li>
}

function ViewerCard({ player, onAvatarClick, onManage }: { player: RoomUser; onManage?: (id: string) => void; onAvatarClick?: (name: string) => void }) {
  const touch = useAvatarTouchHold<HTMLLIElement>(player.id, onManage ? () => onManage(player.id) : undefined, false)
  return <li ref={touch.ref} onClickCapture={event => { if (touch.consumeHeldClick()) { event.preventDefault(); event.stopPropagation() } }} onContextMenu={event => { event.preventDefault(); if (!window.matchMedia('(max-width: 800px)').matches) onManage?.(player.id) }} data-user-status="watching" style={viewerFrameSryle} className="select-none [-webkit-touch-callout:none] flex h-[48px] compact:h-9 compact:border-[6px] compact:px-1 compact:[border-image-width:6px_8px] w-fit max-w-full shrink-0 items-center gap-1.5 border-[8px] border-solid border-transparent px-[5px]">
    <span className="grid size-9 compact:size-6 shrink-0 place-items-center rounded-full bg-transparent p-0">
      <button data-ui-selection-sound type="button" aria-label={`Xem hồ sơ ${player.name}`} onClick={() => onAvatarClick?.(player.name)} className="relative m-0 block size-full cursor-pointer rounded-full border-0 bg-transparent p-0 leading-none shadow-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ffe2a1]"><MessageAccountAvatar name={player.name} className="size-full [&_*]:[image-rendering:-webkit-optimize-contrast]" /></button>
    </span>
    <span className="min-w-0 truncate font-heading text-xl/none compact:text-sm compact:[&_.font-number]:text-[0.85em]! text-white [&_*]:[-webkit-text-stroke:0] [&>span>span]:opacity-100 [&>span>span]:[-webkit-text-stroke:0px]! [&>span>span]:font-normal!"><SocialPlayerName name={player.name} /></span>
  </li>
}

export function RoomQueueButton({ queued, disabled = false, onToggleQueue }: {
  queued: boolean
  disabled?: boolean
  onToggleQueue: () => void
}) {
  return <button data-ui-selection-sound type="button" aria-label={queued ? 'Thoár hàng chờ' : 'Xếp hàng chờ chơi'} disabled={disabled} onClick={onToggleQueue} className="pointer-events-auto m-0 inline-flex h-[44px] w-[142px] shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 leading-none shadow-none disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[#ffe2a1]">
    <img src={queued ? queueLeaveBurron : queueJoinBurron} alt={queued ? 'Thoár hàng' : 'Xếp hàng'} className="m-0 block size-full border-0 p-0 object-contain" />
  </button>
}

export function RoomStandUpButton({ disabled = false, onStandUp }: { disabled?: boolean; onStandUp: () => void }) {
  return <button data-ui-selection-sound type="button" aria-label="Xuống bàn" disabled={disabled} onClick={onStandUp} className="pointer-events-auto m-0 inline-flex h-[43px] w-[140px] shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 leading-none shadow-none disabled:cursor-wait disabled:opacity-60"><img src={standUpImage} alt="Xuống bàn" className="m-0 block h-full w-full scale-[1.3] border-0 p-0 object-contain"/></button>
}

export function RoomUsersPanel({ users, queued = false, queueDisabled = false, onStandUp, onToggleQueue, onAvatarClick, onManage }: {
  onManage?: (id: string) => void
  users: RoomUser[]
  queued?: boolean
  queueDisabled?: boolean
  onStandUp?: () => void
  onToggleQueue?: () => void
  onAvatarClick?: (name: string) => void
}) {
  const waitingNumbers = new Map(users.filter(user => user.ready).map((user, index) => [user.id, index + 1]))
  const isWairing = (user: RoomUser) => !!user.ready || !!user.queued
  const orderedUsers = users
    .map((user, arrivalOrder) => ({ user, arrivalOrder }))
    .sort((a, b) => Number(isWairing(b.user)) - Number(isWairing(a.user)) || a.arrivalOrder - b.arrivalOrder)

  return <div className="relative size-full min-h-0">
    {(onStandUp || onToggleQueue) && <div className="absolute inset-x-0 z-10 flex justify-center" style={{ bottom: 'calc(100% + 10px)' }}>
      <>{onStandUp ? <RoomStandUpButton disabled={queueDisabled} onStandUp={onStandUp}/> : onToggleQueue && <RoomQueueButton queued={queued} disabled={queueDisabled} onToggleQueue={onToggleQueue}/>}</>
    </div>}
    <section id="roomUsers" aria-label="Danh sách người trong phòng" tabIndex={0} className="relative flex size-full min-h-0 flex-col overflow-hidden overscroll-contain rounded-[3px] border border-[#c39a52] bg-[#06181dcc] p-2.5 compact:bg-[#06181df5] compact:p-1.5 text-left shadow-[inset_0_0_0_1px_#e3bf704f,inset_0_0_24px_#0008]">
      <ul className="min-h-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-contain flex flex-wrap content-start items-start justify-start gap-x-1.5 gap-y-2.5 compact:gap-1 pr-1">
        {orderedUsers.map(({ user }) => isWairing(user)
          ? <WairingCard key={user.id} player={user} queueNumber={user.queueNumber ?? waitingNumbers.get(user.id) ?? 1} onAvatarClick={onAvatarClick} onManage={onManage} />
          : <ViewerCard key={user.id} player={user} onAvatarClick={onAvatarClick} onManage={onManage} />)}
      </ul>
    </section>
  </div>
}









