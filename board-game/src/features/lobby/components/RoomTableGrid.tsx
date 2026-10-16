import board from '../../../assets/room-selection/table-board.png'
import lockedBoard from '../../../assets/room-selection/table-board-locked.png'
import bluePlayer from '../../../assets/room-selection/table-player-blue.png'
import redPlayer from '../../../assets/room-selection/table-player-red.png'
import { buttonInteraction } from '../../../lib/uiClasses'
import type { RoomSummary } from '../../../types/room'

type Props = { rooms: RoomSummary[]; vacantOnly: boolean; previewEnabled: boolean; disabled: boolean; loading: boolean; onJoin: (id: string) => void; onPreview: (minutes: number) => void }

// Temporary visual preview requested by the user; never sent to room APIs.
const previewRooms: RoomSummary[] = Array.from({ length: 22 }, (_, index) => ({
  id: `preview-table-${index + 1}`,
  name: '',
  players: index < 2 ? 2 : index % 2 === 0 ? 1 : 2,
  playerNames: index % 3 === 1 ? ['An', 'Bình'] : ['An'],
  phase: 'ready',
  minutes: [10, 15, 30, 5, 3][index % 5],
}))

export function RoomTableGrid({ rooms, vacantOnly, previewEnabled, disabled, loading, onJoin, onPreview }: Props) {
  const preview = !loading && previewEnabled
  const displayedRooms = (preview ? previewRooms : rooms)
    .filter(room => (room.players > 0 || (room.viewerCount ?? 0) > 0) && (!vacantOnly || room.players === 1))
    // The server returns rooms in repository insertion (creation) order; stable ties keep older rooms first.
    .sort((left, right) => (right.players + (right.viewerCount ?? 0)) - (left.players + (left.viewerCount ?? 0)))
  return <div className="relative z-10 grid min-h-0 flex-1 grid-cols-4 auto-rows-[calc((100%-16px)/3)] gap-2 compact:grid-cols-2 compact:auto-rows-[170px] narrow:auto-rows-[150px] overflow-y-auto [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(34,193,168,0.3)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#22c1a8]/30 [&::-webkit-scrollbar-thumb:hover]:bg-[#22c1a8]/45">
    {displayedRooms.map(room => {
      const totalPeople = room.players + (room.viewerCount ?? 0)
      return <button key={room.id} type="button" disabled={!preview && disabled} onClick={() => { if (preview) onPreview(room.minutes ?? 10); else onJoin(room.id) }} aria-label={`${preview ? 'Bàn mẫu' : 'Vào phòng'} ${room.name}, ${room.players}/2 ghế, ${totalPeople} người trong phòng`} className={`${buttonInteraction} disabled:cursor-pointer! relative flex min-h-0 min-w-0 flex-col items-center justify-center gap-1 bg-transparent p-0 text-[#fff0ce] ${preview ? 'disabled:opacity-100' : ''}`}>
      <span className="flex h-[78%] compact:h-[60%] w-full min-h-0 flex-col items-center justify-center gap-[5px]">
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
            {room.locked && <svg role="img" aria-label="Bàn khóa" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-0 top-0 size-6 rounded bg-[#241007] text-[#ffe08b]"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/></svg>}
            {room.players > 0 && <img src={bluePlayer} alt="" className="absolute right-[calc(100%+3px)] top-1/2 block h-[45%] w-auto max-w-none -translate-y-1/2" />}
            {room.players > 1 && <img src={redPlayer} alt="" className="absolute left-[calc(100%+3px)] top-1/2 block h-[45%] w-auto max-w-none -translate-y-1/2" />}
          </span>
        </span>
      </span>
      <span className="flex w-full min-w-0 items-baseline justify-center gap-1 truncate text-center font-heading text-xl compact:text-xl"><span className="shrink-0 font-number lining-nums tabular-nums">{room.minutes ?? 10}′</span>{room.playerNames?.[0] && <span className="max-w-[65%] truncate">{room.playerNames[0]}</span>}</span>
    </button>
    })}
    {loading && displayedRooms.length === 0 && <p role="status" className="col-span-4 self-center text-center text-[#f4d995]">Đang tải danh sách bàn…</p>}
    {!loading && displayedRooms.length === 0 && <p className="col-span-full self-center text-center text-[#f4d995]">Chưa có bàn phù hợp.</p>}
  </div>
}
