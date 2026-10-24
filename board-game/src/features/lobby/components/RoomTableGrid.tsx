import board from '../../../assets/room-selection/table-board.png'
import lockedBoard from '../../../assets/room-selection/table-board-locked.png'
import bluePlayer from '../../../assets/room-selection/table-player-blue.png'
import redPlayer from '../../../assets/room-selection/table-player-red.png'
import { buttonInteraction } from '../../../lib/uiClasses'
import type { RoomSummary } from '../../../types/room'

type Props = { rooms: RoomSummary[]; vacantOnly: boolean; disabled: boolean; loading: boolean; onJoin: (id: string) => void }

export function RoomTableGrid({ rooms, vacantOnly, disabled, loading, onJoin }: Props) {
  const displayedRooms = rooms
    .filter(room => (room.players > 0 || (room.viewerCount ?? 0) > 0) && (!vacantOnly || room.players === 1))
    // The server returns rooms in repository insertion (creation) order; stable ties keep older rooms first.
    .sort((left, right) => (right.players + (right.viewerCount ?? 0)) - (left.players + (left.viewerCount ?? 0)))
  return <div className="relative z-10 grid min-h-0 flex-1 grid-cols-4 auto-rows-[calc((100%-16px)/3)] gap-2 compact:grid-cols-3 compact:auto-rows-[calc((100%-24px)/4)] narrow:auto-rows-[calc((100%-24px)/4)] overflow-y-auto [scrollbar-gutter:stable]       ">
    {displayedRooms.map(room => {
      const totalPeople = room.players + (room.viewerCount ?? 0)
      return <button key={room.id} type="button" disabled={disabled} onClick={() => onJoin(room.id)} aria-label={`Vào phòng ${room.name}, ${room.players}/2 ghế, ${totalPeople} người trong phòng`} className={`${buttonInteraction} disabled:cursor-pointer! relative flex min-h-0 min-w-0 flex-col items-center justify-center gap-1 bg-transparent p-0 text-[#fff0ce]`}>
      <span className="flex h-[78%] compact:h-[76%] w-full min-h-0 flex-col items-center justify-center gap-[5px]">
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#1c0e07]/65 px-1.5 py-0.5 text-[#ffe08b]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="block h-4 w-4 compact:h-3 compact:w-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
            <circle cx="12" cy="12" r="2.6" />
          </svg>
          <span className="font-number text-sm lining-nums tabular-nums compact:text-xs">{totalPeople}</span>
        </span>
        <span className="flex min-h-0 w-full flex-1 items-center justify-center">
          <span className="relative h-full aspect-[934/922] shrink-0">
            <img src={room.locked ? lockedBoard : board} alt="" className="block size-full max-w-none object-contain" />
            {room.players > 0 && <img src={bluePlayer} alt="" className="absolute right-[calc(100%+3px)] top-1/2 block h-[45%] compact:h-[46%] w-auto max-w-none -translate-y-1/2" />}
            {room.players > 1 && <img src={redPlayer} alt="" className="absolute left-[calc(100%+3px)] top-1/2 block h-[45%] compact:h-[46%] w-auto max-w-none -translate-y-1/2" />}
          </span>
        </span>
      </span>
      <span className="flex w-full min-w-0 items-baseline justify-center gap-1 truncate text-center font-heading text-xl compact:font-body compact:text-[13px] compact:leading-tight compact:flex-wrap compact:overflow-visible compact:whitespace-normal compact:shrink-0"><span className="shrink-0 font-number compact:font-body lining-nums tabular-nums">{room.minutes ?? 10}′</span>{room.playerNames?.[0] && <span className="max-w-[65%] truncate compact:max-w-full compact:overflow-visible compact:whitespace-normal compact:text-clip compact:break-words compact:[overflow-wrap:anywhere]">{room.playerNames[0]}</span>}</span>
    </button>
    })}
    {loading && displayedRooms.length === 0 && <p role="status" className="absolute inset-0 m-0 grid place-items-center text-center text-[#f4d995]">Đang tải danh sách bàn…</p>}
    {!loading && displayedRooms.length === 0 && <p className="absolute inset-0 m-0 grid place-items-center text-center text-[#f4d995]">Chưa có bàn phù hợp.</p>}
  </div>
}


