import { useState } from 'react'
import type { useLobby } from '../hooks/useLobby'
import { ROOM_MINUTES, ROOM_TURN_SECONDS } from '../../../types/room'
import { buttonInteraction } from '../../../lib/uiClasses'
import dialogSkin from '../../../assets/room-selection/province-picker-frame.png'
import timeField from '../../../assets/create-room/field-upload.png'
import cancelButton from '../../../assets/create-room/cancel-upload.png'
import confirmButton from '../../../assets/create-room/confirm-upload.png'

function TimeIcon({ hourglass = false }: { hourglass?: boolean }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="pointer-events-none absolute left-[6%] top-1/2 w-[7.5%] -translate-y-1/2 text-[#ffe5a6]">{hourglass ? <><path d="M7 3h18M7 29h18M9 3c0 8 2 9 7 13-5 4-7 5-7 13m14-26c0 8-2 9-7 13 5 4 7 5 7 13"/><path d="m11 25 5-5 5 5Z" fill="currentColor" stroke="none"/></> : <><circle cx="16" cy="16" r="13"/><path d="M16 6v10l6 4"/></>}</svg>
}

export function CreateRoomForm({ lobby, onCancel, province = lobby.province }: { lobby: ReturnType<typeof useLobby>; onCancel?: () => void; province?: string }) {
  const [minutes, setMinutes] = useState(10)
  const [turnSeconds, setTurnSeconds] = useState(60)
  const [locked, setLocked] = useState(false)
  const [password, setPassword] = useState('')
  const field = 'relative z-10 h-full w-full appearance-none border-0 bg-transparent pl-[20%] pr-[15%] font-number text-[3.2cqw] text-[#fff0ce] outline-none disabled:opacity-50'
  return <form aria-label="Tạo bàn mới" autoComplete="off" className="relative mx-auto aspect-[1369/953] w-full max-w-[min(680px,calc(73dvh*1.4365))] border-0 bg-transparent p-0 [container-type:inline-size]" onSubmit={event => { event.preventDefault(); lobby.create(minutes, turnSeconds, province, locked ? password : undefined) }}>
    <img src={dialogSkin} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full"/>
    <h3 className="absolute left-[27%] top-[2.5%] flex h-[12%] w-[46%] items-center justify-center font-heading text-[5.8cqw] leading-none text-[#ffe5a6]">Tạo bàn</h3>
    {onCancel && <button type="button" aria-label="Đóng tạo bàn" onClick={onCancel} disabled={lobby.pending} className={`${buttonInteraction} absolute left-[95%] top-[15%] h-[10%] w-[7%] -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0 hover:brightness-125`} />}
    <div className="absolute left-[22%] top-[22%] flex h-[8%] w-[56%] items-center gap-[4cqw]">
      <span id="create-room-lock-label" className="font-arial text-[2.7cqw] text-[#fff0ce]">Bàn khóa</span>
      <button type="button" role="switch" aria-labelledby="create-room-lock-label" aria-checked={locked} disabled={lobby.pending} onClick={() => setLocked(value => !value)} className={`${buttonInteraction} relative h-[4.8cqw] w-[8.8cqw] rounded-full border-2 hover:border-[#ffe08b] ${locked ? 'border-[#e9a638] bg-[linear-gradient(#9c5709,#643006)] shadow-[inset_0_0_0_1px_#ffdc79]' : 'border-[#b78a47] bg-[linear-gradient(#49321e,#2d1b0d)] shadow-[inset_0_0_0_1px_#79501e]'}`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-[9%] top-1/2 size-[2.4cqw] -translate-y-1/2 text-[#ffd36d]"><rect x="6" y="10" width="12" height="11" rx="2"/><path d="M9 10V6a3 3 0 0 1 6 0v4M12 14v3"/></svg>
        <span className={`absolute top-1/2 size-[3.6cqw] -translate-y-1/2 rounded-full border shadow-[0_1px_3px_#502003] ${locked ? 'right-[5%] border-[#ffde78] bg-[linear-gradient(#ffe66d,#efa31c)]' : 'left-[5%] border-[#d6b982] bg-[linear-gradient(#d6b982,#a17b43)]'}`} />
      </button>
    </div>
    {locked && <div className="absolute left-[22%] top-[32%] flex h-[9%] w-[56%] items-center gap-[2cqw]">
      <label htmlFor="create-room-password" className="shrink-0 font-arial text-[2.7cqw] text-[#fff0ce]">Mật khẩu</label>
      <div className="relative h-full min-w-0 flex-1"><img src={timeField} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full"/><input id="create-room-password" required type="text" value={password} maxLength={64} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-1p-ignore="true" disabled={lobby.pending} onChange={event => setPassword(event.target.value)} className="relative size-full border-0 bg-transparent px-[3cqw] font-arial text-[2.7cqw] text-[#fff0ce] outline-none focus:outline-none focus:ring-0"/></div>
    </div>}
    <label htmlFor="create-room-minutes" style={{ top: locked ? '43%' : '32%' }} className="absolute left-[22%] font-[Arial,sans-serif] text-[2.7cqw] leading-tight text-[#fff0ce]">Thời gian chơi mỗi bên</label>
    <div style={{ top: locked ? '49%' : '38%' }} className="absolute left-[22%] h-[10%] w-[56%]"><img src={timeField} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full" /><TimeIcon/><select id="create-room-minutes" className={field} value={minutes} disabled={lobby.pending} onChange={event => setMinutes(Number(event.target.value))}>{ROOM_MINUTES.map(value => <option key={value} value={value} className="bg-[#301b0c]">{value} phút</option>)}</select><span aria-hidden="true" className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 text-[3cqw] leading-none text-[#ffe5a6]">▼</span></div>
    <label htmlFor="create-room-turn-seconds" style={{ top: locked ? '61%' : '50%' }} className="absolute left-[22%] font-[Arial,sans-serif] text-[2.7cqw] leading-tight text-[#fff0ce]">Thời gian tối đa mỗi nước đi</label>
    <div style={{ top: locked ? '67%' : '56%' }} className="absolute left-[22%] h-[10%] w-[56%]"><img src={timeField} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full" /><TimeIcon hourglass/><select id="create-room-turn-seconds" className={field} value={turnSeconds} disabled={lobby.pending} onChange={event => setTurnSeconds(Number(event.target.value))}>{ROOM_TURN_SECONDS.map(value => <option key={value} value={value} className="bg-[#301b0c]">{value} giây</option>)}</select><span aria-hidden="true" className="pointer-events-none absolute right-[5%] top-1/2 -translate-y-1/2 text-[3cqw] leading-none text-[#ffe5a6]">▼</span></div>
    {lobby.error && <p role="alert" className="absolute left-[22%] top-[78%] w-[56%] text-center text-[1.8cqw] leading-tight text-red-200">{lobby.error}</p>}
    {onCancel && <button type="button" className={`${buttonInteraction} absolute left-[27%] top-[84%] h-[10%] w-[22%] border-0 bg-transparent p-0 font-heading text-[3cqw] text-[#ffe5a6] group disabled:opacity-50`} disabled={lobby.pending} onClick={onCancel}><img src={cancelButton} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full" /><span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-[#ffe08b]/10 group-hover:block group-disabled:hidden" style={{ maskImage: `url(${cancelButton})`, WebkitMaskImage: `url(${cancelButton})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }} /><span className="relative">Hủy</span></button>}
    <button type="submit" className={`${buttonInteraction} absolute left-[53%] top-[84%] h-[10%] w-[22%] border-0 bg-transparent p-0 font-heading text-[3.3cqw] text-[#241007] group disabled:opacity-50`} disabled={lobby.pending || !lobby.name.trim() || locked && !password}><img src={confirmButton} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 block size-full" /><span aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-[#ffe08b]/30 group-hover:block group-disabled:hidden" style={{ maskImage: `url(${confirmButton})`, WebkitMaskImage: `url(${confirmButton})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }} /><span className="relative">{lobby.pending ? 'Đang tạo…' : 'Tạo bàn'}</span></button>
  </form>
}
