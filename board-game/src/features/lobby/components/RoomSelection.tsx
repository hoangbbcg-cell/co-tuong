import type { CSSProperties } from 'react'
import background from '../../../assets/backgrounds/computer.png'
import panelFrame from '../../../assets/room-selection/panel.png'
import buttonImage from '../../../assets/room-selection/brown-button.png'
import quickImage from '../../../assets/room-selection/red-button.png'
import house from '../../../assets/room-selection/house.png'
import emptyBoard from '../../../assets/room-selection/empty-board.png'
import backImage from '../../../assets/room-selection/back.png'
import avatarImage from '../../../assets/room-selection/avatar.png'
import { ROOM_MINUTES } from '../../../types/room'
import type { useLobby } from '../hooks/useLobby'
import type { useHomeMusic } from '../hooks/useHomeMusic'
import { useRoomSelection } from '../hooks/useRoomSelection'
import { useRoomEntrance } from '../../game/hooks/useRoomEntrance'
import { HomeIcon } from './HomeIcon'
import { buttonInteraction, homeUtilityButton } from '../../../lib/uiClasses'

type Props = { lobby: ReturnType<typeof useLobby>; music: ReturnType<typeof useHomeMusic>; onClose: () => void; onEntranceComplete: () => void }
const gold = `${buttonInteraction} rounded-xl border border-[#be8741] bg-[linear-gradient(160deg,#e6af58,#bd8139_65%,#996029)] text-[#42280e] shadow-[inset_0_2px_2px_#ffe1a277,0_4px_3px_#0008] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50`
const coin = `${homeUtilityButton} shrink-0`

function Avatar({ empty = false, header = false }: { empty?: boolean; header?: boolean }) {
  return <span className={`grid aspect-square ${header ? 'w-full' : 'w-[22%]'} max-w-14 shrink-0 place-items-center rounded-full border-2 ${empty ? 'border-dashed border-[#ab9776]/70' : 'border-[#e4d6bd] bg-[linear-gradient(#646b6d,#242b2e)] shadow-[0_3px_2px_#0009]'}`}>
    {!empty && <svg viewBox="0 0 40 40" className="w-full" aria-hidden="true"><path fill="#f1f1eb" d="M8 35q-2-7 8-10v-4q-4-3-4-9 0-9 8-9t8 9q0 6-4 9v4q10 3 8 10Z" /></svg>}
  </span>
}

function MiniBoard() {
  return <svg viewBox="0 0 110 120" className="w-[48%] max-w-28 drop-shadow-[0_4px_2px_#0009]" aria-hidden="true">
    <defs><linearGradient id="room-wood" x2="1" y2="1"><stop stopColor="#ad762e"/><stop offset="1" stopColor="#503010"/></linearGradient><radialGradient id="room-face"><stop stopColor="#c48b37"/><stop offset="1" stopColor="#8b521b"/></radialGradient></defs>
    <rect x="2" y="2" width="106" height="116" rx="7" fill="url(#room-wood)" stroke="#6e491f" strokeWidth="3"/>
    <rect x="9" y="10" width="92" height="100" fill="url(#room-face)" stroke="#36200e" strokeWidth="3"/>
    <g stroke="#573711" strokeWidth=".7">{Array.from({length: 10}, (_, i) => <path key={`h${i}`} d={`M15 ${16+i*10}h80`}/>)}{Array.from({length: 9}, (_, i) => <path key={`v${i}`} d={`M${15+i*10} 16v40m0 10v40`}/>)}<path d="m45 16 20 20m0-20-20 20m0 50 20 20m0-20-20 20"/></g>
    <g fill="#f4d28b" stroke="#916129" strokeWidth=".6">{[15,35,55,75,95].map(x => <circle key={x} cx={x} cy="16" r="3"/>)}<circle cx="55" cy="66" r="3.6"/><circle cx="15" cy="86" r="3"/><circle cx="95" cy="86" r="3"/></g>
  </svg>
}

function frame(source: string, slice: number, width: number): CSSProperties {
  return { borderImageSource: `url(${source})`, borderImageSlice: slice, borderImageWidth: `${width}px`, borderImageRepeat: 'stretch' }
}
const framedButton = `${buttonInteraction} border-[10px] border-transparent bg-transparent text-[#fff0ce] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50`

export function RoomSelection({ lobby, music, onClose, onEntranceComplete }: Props) {
  const selection = useRoomSelection(lobby)
  const entrance = useRoomEntrance(onEntranceComplete)
  return <div ref={entrance.sceneRef} data-testid="lobby-entrance" data-entering={entrance.entering} inert={entrance.entering} style={{ clipPath: 'inset(0)' }} className="relative isolate flex h-full min-h-0 flex-col overflow-hidden pb-5 font-[Arial,sans-serif] compact:pb-3">
    <img src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-black/15" />
    <header className="flex h-[56px] shrink-0 items-center gap-6 border-b-2 border-[#b78136] bg-[#130e08]/85 px-10 compact:h-12 compact:gap-3 compact:px-4">
      <button className={`${buttonInteraction} shrink-0 border-r border-[#af7e32]/70 pr-5 compact:pr-2`} aria-label="Đóng" onClick={onClose}><img src={backImage} alt="" className="w-9" /></button>
      <div className="flex min-w-0 flex-1 items-center gap-3"><img src={avatarImage} alt="" className="size-10 shrink-0 compact:size-8"/><input className="w-full max-w-44 border-0 border-b border-[#b18c54]/70 bg-transparent py-1 text-lg text-[#eee4ce] outline-none focus:border-[#f7c875] compact:text-sm" aria-label="Tên người chơi" maxLength={24} value={lobby.name} onChange={event => lobby.setName(event.target.value)} /></div>
      <button className={coin} aria-label="Thành tích" onClick={() => selection.setMessage('Thành tích sắp ra mắt.')}><HomeIcon name="trophy"/></button>
      <button className={coin} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} onClick={() => void music.toggle().catch(() => selection.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'}/></button>
    </header>
    <div className="mx-auto flex min-h-0 w-[calc(88%-180px)] flex-1 flex-col pt-3 compact:w-[88%] compact:pt-2">
      <div className="grid shrink-0 grid-cols-[3fr_2.5fr_4fr] gap-3 px-[10px] compact:grid-cols-2 compact:gap-2">
        <div style={{ ...frame(buttonImage, 14, 12), borderImageSlice: '14 fill' }} className={`${framedButton} flex h-[64px] items-center gap-3 px-3 compact:h-[56px] compact:gap-1 compact:px-1`}>
          <img src={house} alt="" className="w-12 shrink-0 compact:w-10"/>
          <h2 id="roomSelectionTitle" className="sr-only">Chọn Bàn</h2>
          <p className="flex flex-wrap gap-x-4 self-end pb-1 text-base compact:gap-x-2 compact:text-sm"><span aria-label={`${lobby.rooms.length} bàn`}>▦ {lobby.rooms.length}</span><span aria-label={`${selection.players} người`}>♟ {selection.players}</span></p>
        </div>
        <button aria-label="Tạo bàn" style={{ ...frame(buttonImage, 14, 12), borderImageSlice: '14 fill' }} className={`${framedButton} grid h-[64px] place-items-center text-4xl compact:h-[56px]`} onClick={() => selection.setCreating(true)} disabled={lobby.pending}><span aria-hidden="true">＋</span></button>
        <div style={{ backgroundImage: `url(${quickImage})` }} className="relative flex h-[64px] items-center bg-transparent bg-[length:100%_100%] bg-no-repeat px-3 text-[#fff0ce] compact:col-span-2 compact:h-[56px]">
          <button className={`${buttonInteraction} flex min-w-0 flex-1 items-center justify-center gap-2 py-2 text-[clamp(12px,1.3vw,18px)] hover:brightness-110 disabled:opacity-50 compact:text-lg`} disabled={lobby.pending || lobby.loading || !lobby.name.trim()} onClick={selection.quickPlay}><span aria-hidden="true" className="text-3xl compact:text-2xl">⚔</span><span>Chơi nhanh <span className="ml-1 inline-block border-l border-[#e4ac57]/50 pl-2 text-[0.85em] font-normal">{lobby.minutes} phút</span></span></button>
          <button className={`${buttonInteraction} grid size-10 shrink-0 place-items-center text-3xl hover:bg-black/20`} aria-label="Chọn thời gian" aria-expanded={selection.timeOpen} onClick={() => selection.setTimeOpen(!selection.timeOpen)}><svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg></button>
          {selection.timeOpen && <label className="absolute top-full right-0 z-10 mt-3 whitespace-nowrap rounded-lg border border-[#b78a47] bg-[#382717] p-3 text-sm text-[#f5deb8]">Thời gian<select autoFocus aria-label="Thời gian ván" className="ml-3 rounded border border-[#a27b44] bg-[#2b2014] p-2 text-base" value={lobby.minutes} onChange={event => { lobby.setMinutes(Number(event.target.value)); selection.setTimeOpen(false) }} onKeyDown={event => { if (event.key === 'Escape') selection.setTimeOpen(false) }}>{ROOM_MINUTES.map(minutes => <option key={minutes} value={minutes}>{minutes} phút</option>)}</select></label>}
        </div>
      </div>
      {lobby.error && <p role="alert" className="mt-2 shrink-0 rounded bg-red-950/90 p-2 text-sm text-red-100">{lobby.error}</p>}
      {selection.message && <div role="status" className="mt-2 flex shrink-0 items-center justify-between gap-3 rounded border border-[#8d6a3b] bg-[#49321e] p-2 text-sm">{selection.message}<button onClick={() => selection.setMessage('')} aria-label="Ẩn thông báo">✕</button></div>}
      <section aria-label="Phòng online" aria-busy={lobby.loading} style={frame(panelFrame, 42, 30)} className="relative mt-2 flex min-h-0 flex-1 flex-col border-[20px] border-transparent bg-[#201306]/70 compact:border-[14px]">
        {selection.rooms.length > 0 ? <div className="grid min-h-0 flex-1 auto-rows-min grid-cols-3 content-start gap-x-4 gap-y-6 overflow-y-auto p-3 compact:grid-cols-2 compact:gap-x-2 compact:p-1">
          {selection.rooms.map(room => <button key={room.id} className={`${buttonInteraction} flex min-w-0 flex-col items-center justify-center gap-3 disabled:cursor-not-allowed`} aria-label={`Vào phòng ${room.name}, ${room.players}/2 người`} disabled={lobby.pending || !lobby.name.trim()} onClick={() => lobby.join(room.id)}>
            <span className="flex w-full items-center justify-center gap-1"><Avatar empty={room.players === 0}/><MiniBoard/><Avatar empty={room.players < 2}/></span>
            <span className="w-full truncate text-center text-lg compact:text-sm">{room.minutes ?? 10}′ · {room.name}</span><span className="-mt-2 text-xs text-[#e1c18b]">{room.phase === 'playing' ? 'Đang chơi · Có thể xem' : room.players >= 2 ? 'Đủ người · Có thể xếp hàng' : 'Còn trống'}</span>
          </button>)}
        </div> : <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-2 py-3"><img src={emptyBoard} alt="" className="w-[137px] max-w-[25%] shrink-0 mix-blend-screen"/><p className="text-center text-lg leading-relaxed text-[#f4d995] compact:text-sm">{lobby.loading ? 'Đang tải danh sách bàn…' : selection.vacantOnly ? 'Chưa có bàn trống. Tạo bàn để mời bạn cùng chơi.' : 'Chưa có bàn nào. Hãy tạo bàn đầu tiên!'}</p></div>}
      </section>
    </div>
    <footer className="shrink-0 pt-2">
      <div className="mx-auto flex max-w-full justify-center gap-2" aria-label="Lọc bàn">{[false, true].map(vacant => <button key={String(vacant)} aria-pressed={selection.vacantOnly === vacant} onClick={() => selection.setVacantOnly(vacant)} className={`${buttonInteraction} grid h-[34px] w-[140px] max-w-[42%] place-items-center rounded-[3px] border border-[#dfc49c] px-3 text-sm shadow-[inset_0_0_0_1px_#f7e3bd44,0_2px_3px_#0005] hover:brightness-110 ${selection.vacantOnly === vacant ? 'bg-[linear-gradient(#e3cba6,#bea07a)] text-[#392715]' : 'bg-[linear-gradient(#705437,#4a3422)] text-[#ddc5a2]'}`}>{vacant ? 'Còn trống' : 'Tất cả'}</button>)}</div>
      <div className="mt-2 flex justify-center gap-5">{(['friends', 'video'] as const).map(icon => <button key={icon} aria-label={icon === 'friends' ? 'Bạn bè' : 'Xem video'} className={coin} onClick={() => selection.setMessage(icon === 'friends' ? 'Tính năng bạn bè sắp ra mắt.' : 'Tính năng xem video sắp ra mắt.')}><HomeIcon name={icon}/></button>)}</div>
    </footer>
    {selection.creating && <div className="absolute inset-0 z-20 grid place-items-center bg-black/65 p-5"><form aria-label="Tạo bàn mới" className="grid w-full max-w-sm gap-4 rounded-xl border-2 border-[#bd914e] bg-[#382717] p-6 shadow-2xl" onSubmit={event => { event.preventDefault(); lobby.create() }}><h3 className="text-2xl text-[#f6cf87]">Tạo bàn</h3><label className="grid gap-2">Tên phòng<input autoFocus className="rounded border border-[#a27b44] bg-[#21180f] p-3 text-[#f2dfbb]" value={lobby.roomName} onChange={event => lobby.setRoomName(event.target.value)} maxLength={40} required/></label><p className="text-sm text-[#cbb18a]">Cờ tướng · {lobby.minutes} phút mỗi bên</p>{lobby.error && <p role="alert" className="text-sm text-red-200">{lobby.error}</p>}<div className="flex gap-3"><button type="button" className="flex-1 p-3" disabled={lobby.pending} onClick={() => selection.setCreating(false)}>Hủy</button><button className={`${gold} flex-1 p-3`} disabled={lobby.pending || !lobby.name.trim() || !lobby.roomName.trim()}>{lobby.pending ? 'Đang tạo…' : 'Tạo phòng'}</button></div></form></div>}
  </div>
}
