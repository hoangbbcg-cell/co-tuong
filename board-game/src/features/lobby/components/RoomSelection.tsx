import { SearchButton } from './SearchButton'

import { DialogCloseButton } from './DialogCloseButton'
import { useFriendsLayout } from '../hooks/useFriendsLayout'
import { useState } from 'react'
import { RoomPasswordDialog } from './RoomPasswordDialog'
import { CreateRoomForm } from './CreateRoomForm'
import { PlayerNameValidationDialog } from './PlayerNameValidationDialog'
import background from '../../../assets/backgrounds/computer.png'
import buttonImage from '../../../assets/room-selection/brown-card-upload.png'
import quickImage from '../../../assets/room-selection/red-card-upload.png'
import { RoomTableGrid } from './RoomTableGrid'
import provincePickerFrame from '../../../assets/room-selection/province-picker-frame.png'
import provinceCard from '../../../assets/room-selection/province-card.png'
import { ROOM_MINUTES } from '../../../types/room'
import type { useLobby } from '../hooks/useLobby'
import type { useHomeMusic } from '../hooks/useHomeMusic'
import { useRoomSelection } from '../hooks/useRoomSelection'
import { useRoomEntrance } from '../../game/hooks/useRoomEntrance'
import { OpeningCover } from '../../game/components/OpeningCover'
import { HomeIcon } from './HomeIcon'
import { buttonInteraction, gameUtilityButton, homeUtilityButton, shopMobileDialogFrameClass } from '../../../lib/uiClasses'
import { GameBackIcon } from '../../game/components/GameBackIcon'




import { roomProvinceIcon, roomProvinceLabel } from './roomProvinces'
import { useVietnamAdministrativeUnits } from '../hooks/useVietnamAdministrativeUnits'

type Props = { lobby: ReturnType<typeof useLobby>; music: ReturnType<typeof useHomeMusic>; onClose: () => void; onEntranceComplete: () => void; onOpenFriends: () => void; onOpenRanking: () => void; onOpenProfile: () => void; onFullscreen: () => void }
const coin = `${homeUtilityButton} shrink-0 compact:size-9 compact:[&_svg]:size-5`

const framedButton = `${buttonInteraction} border-0 bg-transparent bg-[length:100%_100%] bg-no-repeat text-[#fff0ce] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50`

export function RoomSelection({ lobby, music, onClose, onEntranceComplete, onOpenFriends, onOpenRanking, onOpenProfile, onFullscreen }: Props) {
  const [roomCode, setRoomCode] = useState('')
  const provinceDialogLayout = useFriendsLayout()
  const selection = useRoomSelection(lobby)
  const provinceOptions = useVietnamAdministrativeUnits(selection.provincePickerOpen, null)
  const provinceLabel = selection.allProvinces ? 'Tất cả' : roomProvinceLabel(selection.province)
  const entrance = useRoomEntrance(onEntranceComplete)
  return <><div ref={entrance.sceneRef} data-testid="lobby-entrance" data-entering={entrance.entering} style={{ clipPath: 'inset(0)' }} className="relative isolate flex h-full min-h-0 flex-col overflow-hidden pb-5 font-[Arial,sans-serif] compact:pb-3">
    <img src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-black/15" />
    <div inert={entrance.entering} className="contents">
    <header className="relative flex h-[56px] shrink-0 items-center gap-6 border-b-2 border-[#b78136] bg-[#130e08]/85 px-10 compact:h-12 compact:gap-3 compact:px-4">
      <button type="button" className={`${gameUtilityButton} shrink-0 compact:size-9 compact:[&_svg]:size-5`} aria-label="Đóng" onClick={onClose}><GameBackIcon /></button>
      <form noValidate aria-label="Tìm phòng theo số" className="absolute left-1/2 top-1/2 flex h-9 w-[min(390px,43%)] -translate-x-1/2 -translate-y-1/2 items-stretch gap-2 compact:w-[calc(100%_-_134px)] compact:gap-[6px]" onSubmit={event => { event.preventDefault(); lobby.joinByCode(roomCode) }}><label className="flex min-w-0 flex-1 items-center rounded-md border border-[#81420f] bg-[linear-gradient(#5a3219,#2b1508)] px-2 shadow-[inset_0_0_0_1px_#ffd888,inset_0_0_0_3px_#a45f20,inset_0_0_0_4px_#55250b,0_1px_1px_#5b2b0d]"><svg aria-hidden="true" viewBox="0 0 32 32" className="size-5 shrink-0 fill-none stroke-[#f6d27b]" strokeWidth="3.5" strokeLinecap="round"><circle cx="13" cy="13" r="7"/><path d="m18.5 18.5 7.5 7.5"/></svg><input aria-label="Số phòng" placeholder="Nhập số phòng..." inputMode="numeric" maxLength={6} value={roomCode} onChange={event => setRoomCode(event.target.value.replace(/\D/g, ''))} className="ml-1 h-full min-w-0 flex-1 bg-transparent font-arial text-base font-normal not-italic lining-nums tabular-nums text-[#e5d8bc] outline-none placeholder:font-body placeholder:text-sm placeholder:text-[#c2ae81]" /></label><SearchButton aria-label="Tìm và vào phòng" disabled={lobby.pending} className="h-full min-w-[62px] text-sm compact:min-w-[56px] compact:px-[8px]"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[16px] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg>Tìm</SearchButton></form>
      <nav className="ml-auto flex flex-wrap shrink-0 items-center justify-end gap-[10px]" aria-label="Tiện ích">
        <button className={`${coin} compact:hidden`} aria-label="Thành tích" onClick={onOpenRanking}><HomeIcon name="trophy"/></button>
        <button className={`${coin} compact:hidden`} aria-label="Bạn bè" onClick={onOpenFriends}><HomeIcon name="friends"/></button>
        <button className={coin} aria-label={music.playing ? 'Tắt nhạc' : 'Bật nhạc'} aria-pressed={music.playing} onClick={() => void music.toggle().catch(() => selection.setMessage('Không thể phát nhạc trên trình duyệt này.'))}><HomeIcon name={music.playing ? 'sound' : 'muted'}/></button>
        <button className={`${coin} compact:hidden`} aria-label="Toàn màn hình" title="Phóng to/thu nhỏ màn hình" onClick={onFullscreen}><HomeIcon name="fullscreen"/></button>
      </nav>
    </header>
    <div className="mx-auto flex min-h-0 w-[calc(88%-180px)] flex-1 flex-col pt-3 compact:w-full compact:px-2 compact:pt-2">
      <div className="grid shrink-0 grid-cols-[3fr_2.5fr_4fr] gap-3 px-[10px] compact:grid-cols-2 compact:gap-2">
        <button type="button" aria-label={`Chọn tỉnh/thành phố, hiện tại ${provinceLabel}`} onClick={selection.openProvincePicker} className={`${framedButton} relative isolate flex h-[72px] items-center gap-3 px-6 py-[5px] compact:h-[52px] compact:gap-1 compact:px-3`}>
          <img src={buttonImage} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 size-full object-fill" />
          {selection.allProvinces ? <span aria-hidden="true" className="relative z-10 text-3xl compact:text-2xl">🌐</span> : <img src={roomProvinceIcon(selection.province)} alt="" className="relative z-10 block max-h-[56px] w-14 shrink-0 object-contain compact:max-h-9 compact:w-9"/>}
          <h2 id="roomSelectionTitle" className="sr-only">Chọn Bàn</h2>
          <div className="relative -top-[3px] z-10 min-w-0 flex-1 text-left">
            <p title={provinceLabel} className="relative top-[5px] truncate font-heading text-[22px] leading-tight compact:text-lg">{provinceLabel}</p>
            <p className="mt-1 flex gap-x-4 text-base compact:gap-x-2 compact:text-sm">
              <span className="flex items-center gap-1" aria-label={`${lobby.rooms.filter(room => (room.players > 0 || (room.viewerCount ?? 0) > 0) && (selection.allProvinces || room.province === selection.province)).length} bàn đang được tạo tại ${provinceLabel}`}><span aria-hidden="true" className="text-[22px] leading-none compact:text-base">▦</span><span className="font-number text-xl compact:text-base">{lobby.rooms.filter(room => (room.players > 0 || (room.viewerCount ?? 0) > 0) && (selection.allProvinces || room.province === selection.province)).length}</span></span>
              <span className="flex items-center gap-1" aria-label={`${lobby.rooms.reduce((sum, room) => sum + (selection.allProvinces || room.province === selection.province ? room.players : 0), 0)} người tại ${provinceLabel}`}><span aria-hidden="true" className="text-[22px] leading-none compact:text-base">♟</span><span className="font-number text-xl compact:text-base">{lobby.rooms.reduce((sum, room) => sum + (selection.allProvinces || room.province === selection.province ? room.players : 0), 0)}</span></span>
            </p>
          </div>
        </button>
        <button aria-label="Tạo bàn" className={`${framedButton} relative isolate flex h-[72px] items-center justify-center gap-2 compact:h-[52px]`} onClick={() => selection.setCreating(true)} disabled={lobby.pending}><img src={buttonImage} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 size-full object-fill"/><span className="relative z-10 font-heading text-[22px] compact:text-lg">Tạo bàn</span><span aria-hidden="true" className="relative z-10 font-number text-4xl leading-none compact:text-2xl">＋</span></button>
        <div ref={selection.quickTimeRef} style={{ backgroundImage: `url(${quickImage})` }} className="relative flex h-[72px] items-center bg-transparent bg-[length:100%_100%] bg-no-repeat px-3 text-[#fff0ce] compact:col-span-2 compact:h-[52px]">
          <button className={`${buttonInteraction} flex min-w-0 flex-1 items-center justify-center gap-2 py-2 text-[22px] hover:brightness-110 disabled:opacity-50 compact:text-lg`} disabled={lobby.pending || lobby.loading || !lobby.name.trim()} onClick={selection.quickPlay}><span aria-hidden="true" className="text-4xl leading-none compact:text-[28px]">⚔</span><span className="font-heading compact:text-xl">Chơi nhanh</span><span className="border-l border-[#e4ac57]/50 pl-2 font-heading"><span className="font-number">{selection.quickMinutes}</span> <span className="compact:text-xl">phút</span></span></button>
          <button type="button" className={`${buttonInteraction} grid size-10 compact:size-8 shrink-0 place-items-center text-3xl compact:text-2xl hover:bg-black/20`} aria-label="Chọn thời gian Chơi nhanh" aria-expanded={selection.timeOpen} aria-controls="room-time-options" onClick={() => selection.setTimeOpen(!selection.timeOpen)}><svg viewBox="0 0 24 24" className="size-7 compact:size-6" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m5 9 7 7 7-7"/></svg></button>
          {selection.timeOpen && <div id="room-time-options" role="listbox" aria-label="Thời gian Chơi nhanh" className="absolute right-0 top-full z-20 mt-1 flex w-28 flex-col gap-1 rounded-md border border-[#b78a47] bg-[#382717]/95 p-1.5 shadow-[0_4px_12px_#0009]" onKeyDown={event => { if (event.key === 'Escape') selection.setTimeOpen(false) }}>{ROOM_MINUTES.map(minutes => <button key={minutes} type="button" role="option" aria-selected={selection.quickMinutes === minutes} className={`${buttonInteraction} flex h-8 compact:h-11 w-full items-center justify-center rounded-sm bg-[#2b160edb] px-2 font-number text-base text-[#ffe7b6] hover:bg-[#613014]`} onClick={() => { selection.setQuickMinutes(minutes); selection.setTimeOpen(false) }}>{minutes} phút</button>)}</div>}
        </div>
      </div>
      {lobby.error && <p role="alert" className="mt-2 shrink-0 rounded bg-red-950/90 p-2 text-sm text-red-100">{lobby.error}</p>}
      {selection.message && <div role="status" className="mt-2 flex shrink-0 items-center justify-between gap-3 rounded border border-[#8d6a3b] bg-[#49321e] p-2 text-sm">{selection.message}<button onClick={() => selection.setMessage('')} aria-label="Ẩn thông báo">✕</button></div>}
      <section aria-label="Phòng online" aria-busy={lobby.loading} className="relative isolate mt-2 mb-6 flex min-h-0 flex-1 flex-col p-[20px] compact:p-[10px] compact:mb-3">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 rounded-md border border-[#bd914e] bg-[#1c0e07]/40" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-[4px] z-20 rounded-sm border border-[#bd914e]" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">{['absolute left-1 top-1', 'absolute right-1 top-1 rotate-90', 'absolute right-1 bottom-1 rotate-180', 'absolute left-1 bottom-1 -rotate-90'].map(position => <svg key={position} viewBox="0 0 40 40" fill="none" stroke="#f4d995" strokeWidth="1.5" className={`${position} size-8`}><path d="M2 38V14h12V2h24M2 24h22V2M8 30V8h22M2 14h12V2M8 20h12V8M2 38l6-6v-8M38 2l-6 6h-8" /></svg>)}</span>
        <RoomTableGrid rooms={selection.rooms} vacantOnly={selection.vacantOnly} disabled={lobby.pending || !lobby.name.trim()} loading={lobby.loading} onJoin={lobby.join} />
      </section>
    </div>
    <footer className="shrink-0 pt-2">
      <div className="mx-auto flex max-w-full justify-center gap-2" aria-label="Lọc bàn">{(['all', 'vacant', 'locked'] as const).map(filter => <button key={filter} aria-pressed={selection.roomFilter === filter} onClick={() => selection.setRoomFilter(filter)} className={`${buttonInteraction} grid h-[34px] compact:h-8 compact:w-[110px] compact:px-2 compact:text-xs w-[140px] max-w-[30%] place-items-center rounded-[3px] border border-[#dfc49c] px-3 text-sm shadow-[inset_0_0_0_1px_#f7e3bd44,0_2px_3px_#0005] hover:brightness-110 ${selection.roomFilter === filter ? 'bg-[linear-gradient(#e3cba6,#bea07a)] text-[#392715]' : 'bg-[linear-gradient(#705437,#4a3422)] text-[#ddc5a2]'}`}>{filter === 'locked' ? 'Bàn khóa' : filter === 'vacant' ? 'Còn trống' : 'Tất cả'}</button>)}</div>
    </footer>
    {lobby.roomSearchNotice && <div role="alert" className={`${shopMobileDialogFrameClass} pointer-events-none absolute left-1/2 top-1/2 z-50 w-[min(320px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-[#d5a657] bg-[radial-gradient(ellipse_at_top,#85502466,transparent_70%),linear-gradient(145deg,#482910,#201007)] px-5 py-6 text-center font-body text-xl font-semibold text-[#ffe5ac] shadow-[inset_0_0_0_3px_#3b1d0b,inset_0_0_0_4px_#a8753466,0_14px_40px_#0009]`}>Không tìm thấy phòng</div>}
    {selection.addressNoticeOpen && <div className="absolute inset-0 z-50 grid place-items-center bg-black/65 p-4"><section role="alertdialog" aria-modal="true" aria-labelledby="room-address-notice" className={`${shopMobileDialogFrameClass} relative w-full max-w-md rounded-2xl border-2 border-[#d5a657] bg-[radial-gradient(ellipse_at_top,#85502466,transparent_70%),linear-gradient(145deg,#482910,#201007)] p-6 text-center text-[#ffe5ac] shadow-[inset_0_0_0_3px_#3b1d0b,inset_0_0_0_4px_#a8753466,0_14px_40px_#0009]`} onKeyDown={event => { if (event.key === 'Escape') selection.setAddressNoticeOpen(false) }}><p id="room-address-notice" className="text-lg">Bạn chưa chọn địa chỉ, hãy thiết lập địa chỉ.</p><div className="mt-6 flex justify-center gap-4"><button autoFocus type="button" className={`${buttonInteraction} rounded-md border border-[#c99044] bg-[#4a3020] px-6 py-2 text-base`} onClick={() => selection.setAddressNoticeOpen(false)}>Hủy</button><button type="button" className={`${buttonInteraction} rounded-md border border-[#ffe08b] bg-[linear-gradient(#ffe39b,#dba644)] px-6 py-2 text-base font-bold text-[#39200c]`} onClick={() => { selection.setAddressNoticeOpen(false); onOpenProfile() }}>Đồng ý</button></div></section></div>}
    {selection.creating && <div className="absolute inset-0 z-30 grid place-items-center bg-black/65 p-5 compact:p-2"><CreateRoomForm lobby={lobby} province={selection.province} onCancel={() => selection.setCreating(false)} /></div>}
    {selection.provincePickerOpen && <div className="absolute inset-0 z-40 grid place-items-center bg-black/75 p-4 compact:p-2" onMouseDown={event => { if (event.target === event.currentTarget) selection.setProvincePickerOpen(false) }}>
      <section role="dialog" aria-modal="true" aria-labelledby="room-province-title" className="relative aspect-[1369/953] w-full max-w-[min(920px,124dvh)] border-0 bg-transparent p-0 text-[#ffe7b2] compact:aspect-auto compact:h-[80dvh] compact:rounded-xl compact:border compact:border-[#79501e] compact:bg-[#241007]">
        <img src={provincePickerFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full compact:hidden" />
        <div className="absolute left-[24%] top-[1%] flex h-[14%] w-[52%] compact:left-3 compact:top-0 compact:h-16 compact:w-[calc(100%-68px)] min-w-0 items-center justify-center"><h2 id="room-province-title" className="truncate text-center font-heading text-[34px] text-[#ffe7b2] compact:text-[22px]">Chọn tỉnh / thành phố</h2></div>
        <DialogCloseButton onClose={() => selection.setProvincePickerOpen(false)} scale={provinceDialogLayout.scale} compact={provinceDialogLayout.compact} positionClass="right-[2%] top-[9%] compact:right-5 compact:top-5" />
        <div className="absolute inset-x-[3%] top-[19%] bottom-[4%] compact:top-16 compact:bottom-3 min-h-0 overflow-y-auto p-1  ">
          {provinceOptions.provincesLoading && <p role="status" className="p-6 text-center text-lg text-[#f3d59f]">Đang tải danh sách tỉnh/thành phố…</p>}
          {provinceOptions.provincesError && <div role="alert" className="flex flex-col items-center gap-3 p-6 text-center text-[#f3d59f]"><span>{provinceOptions.provincesError}</span><button type="button" onClick={provinceOptions.retryProvinces} className="rounded-md border border-[#e1ae4e] px-4 py-2 hover:bg-[#613014]">Tải lại</button></div>}
          {!provinceOptions.provincesLoading && !provinceOptions.provincesError && <div className="grid h-full grid-cols-2 auto-rows-[calc((100%-24px)/4)] gap-x-3 gap-y-2 compact:grid-cols-2 compact:auto-rows-[calc((100%-40px)/6)] compact:gap-2">
          {[{ name: 'Tất cả' }, ...provinceOptions.provinces].map(city => {
            const isAll = city.name === 'Tất cả'
            const selected = isAll ? selection.allProvinces : !selection.allProvinces && city.name === selection.province
            const roomCount = lobby.rooms.filter(room => (room.players > 0 || (room.viewerCount ?? 0) > 0) && (isAll || room.province === city.name)).length
            const playerCount = lobby.rooms.reduce((sum, room) => sum + (isAll || room.province === city.name ? room.players : 0), 0)
            return <button key={city.name} type="button" aria-pressed={selected} onClick={() => { selection.setAllProvinces(isAll); if (!isAll) selection.setProvince(city.name); selection.setProvincePickerOpen(false) }} className={`${buttonInteraction} relative isolate flex h-full min-h-0 [container-type:inline-size] compact:[container-type:size] items-center gap-3 rounded-lg border-0 bg-transparent px-5 py-0 text-left leading-none hover:brightness-125 compact:gap-[2cqw] compact:px-[3cqw] ${selected ? 'ring-2 ring-[#ffd65b]' : ''}`}>
              <img src={provinceCard} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 block size-full object-fill" />
              <span aria-hidden="true" className="relative z-10 flex h-full w-[26cqw] compact:w-[min(36cqw,100cqh)] shrink-0 items-center justify-center">{isAll ? <span className="text-[16cqw] compact:text-[min(27cqw,78cqh)]">🌐</span> : <img src={roomProvinceIcon(city.name)} alt="" className="block size-full object-contain" />}</span>
              <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-[1cqw]">
                <span className="truncate font-heading text-[min(36px,7cqw)] compact:text-[min(10.5cqw,34cqh)] leading-tight">{roomProvinceLabel(city.name)}</span>
                <span aria-hidden="true" className="h-px w-full bg-gradient-to-r from-[#e5af50] via-[#e5af50]/70 to-transparent" />
                <span className="flex flex-wrap gap-x-4 gap-y-1 font-number text-[min(28px,5.5cqw)] compact:text-[min(9cqw,28cqh)] leading-none text-[#fff0ce] compact:gap-x-2"><span className="inline-flex items-center gap-1" aria-label={`${roomCount} bàn`}><span aria-hidden="true" className="text-[1.1em] leading-none">▦</span>{roomCount}</span><span className="inline-flex items-center gap-1" aria-label={`${playerCount} người`}><span aria-hidden="true" className="text-[1.1em] leading-none">♟</span>{playerCount}</span></span>
              </span>
              {selected && <span aria-hidden="true" className="absolute right-2 top-2 text-lg text-[#ffe078]">✓</span>}
            </button>
          })}
          </div>}
        </div>
      </section>
    </div>}
    </div>
  </div>{entrance.entering && <OpeningCover onComplete={entrance.finishEntrance} />}<RoomPasswordDialog lobby={lobby}/><PlayerNameValidationDialog message={lobby.nameError} onClose={lobby.dismissNameError} /></>
}

