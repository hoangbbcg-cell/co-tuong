import { useEffect, useRef, useState } from 'react'
import type { RoomSummary } from '../../../types/room'
import frame from '../../../assets/room-selection/province-picker-frame.png'
import field from '../../../assets/create-room/field-upload.png'
import cancel from '../../../assets/create-room/cancel-upload.png'
import confirm from '../../../assets/create-room/confirm-upload.png'
import { buttonInteraction } from '../../../lib/uiClasses'

export interface RoomPasswordControls {
  passwordRoom: Pick<RoomSummary, 'id'> | null
  pending: boolean
  passwordError: string
  join: (id: string, password?: string) => void
  dismissPasswordRoom: () => void
}

export function RoomPasswordDialog({ lobby }: { lobby: RoomPasswordControls }) {
  const [password, setPassword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { setPassword(''); if (lobby.passwordRoom) inputRef.current?.focus() }, [lobby.passwordRoom?.id])
  if (!lobby.passwordRoom) return null
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/65 p-4" onKeyDown={event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); lobby.dismissPasswordRoom() }
    if (event.key === 'Tab') {
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)')]
      const target = event.shiftKey ? controls.at(-1) : controls[0]
      if (document.activeElement === (event.shiftKey ? controls[0] : controls.at(-1))) { event.preventDefault(); target?.focus() }
    }
  }} onMouseDown={event => { if (event.target === event.currentTarget) lobby.dismissPasswordRoom() }}>
    <form role="dialog" aria-modal="true" aria-label="Nhập mật khẩu bàn" autoComplete="off" className="relative aspect-[1369/953] w-full max-w-[min(520px,90dvh)] border-0 bg-transparent p-0 text-[#ffe5a6] [container-type:inline-size]" onSubmit={event => { event.preventDefault(); lobby.join(lobby.passwordRoom!.id, password) }}>
      <img src={frame} alt="" className="pointer-events-none absolute inset-0 block size-full"/>
      <h2 className="absolute left-[26%] top-[2%] grid h-[13%] w-[48%] place-items-center font-heading text-[4.5cqw]">Nhập mật khẩu</h2>
      <button type="button" aria-label="Đóng nhập mật khẩu" disabled={lobby.pending} onClick={lobby.dismissPasswordRoom} className={`${buttonInteraction} absolute left-[91%] top-[9%] h-[10%] w-[8%] border-0 bg-transparent p-0`}/>
      <label htmlFor="join-room-password" className="absolute left-[16%] top-[29%] font-heading text-[4cqw]">Mật khẩu bàn</label>
      <div className="absolute left-[16%] top-[40%] h-[13%] w-[68%]"><img src={field} alt="" className="pointer-events-none absolute inset-0 block size-full"/><input ref={inputRef} id="join-room-password" type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} data-lpignore="true" data-1p-ignore="true" required maxLength={64} disabled={lobby.pending} value={password} onChange={event => setPassword(event.target.value)} className="relative size-full border-0 bg-transparent px-[4cqw] font-arial text-[3.5cqw] text-[#fff0ce] outline-none"/></div>
      {lobby.passwordError && <p role="alert" className="absolute left-[16%] top-[57%] w-[68%] text-center font-arial text-[2.8cqw] text-red-200">{lobby.passwordError}</p>}
      {([{ image: cancel, text: 'Hủy', type: 'button', left: 'left-[22%]' }, { image: confirm, text: lobby.pending ? 'Đang vào…' : 'Vào bàn', type: 'submit', left: 'left-[53%]' }] as const).map(item => <button key={item.type} type={item.type} disabled={lobby.pending || item.type === 'submit' && !password} onClick={item.type === 'button' ? lobby.dismissPasswordRoom : undefined} className={`${buttonInteraction} group absolute ${item.left} top-[75%] h-[14%] w-[25%] border-0 bg-transparent p-0 font-heading text-[3.7cqw] ${item.type === 'submit' ? 'text-[#241007]' : 'text-[#ffe5a6]'}`}><img src={item.image} alt="" className="pointer-events-none absolute inset-0 block size-full"/><span aria-hidden="true" className={`pointer-events-none absolute inset-0 hidden group-hover:block group-disabled:hidden ${item.type === 'submit' ? 'bg-[#ffe08b]/30' : 'bg-[#ffe08b]/10'}`} style={{ maskImage: `url(${item.image})`, WebkitMaskImage: `url(${item.image})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}/><span className="relative">{item.text}</span></button>)}
    </form>
  </div>
}
