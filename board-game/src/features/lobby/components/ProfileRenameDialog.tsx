import { useEffect, useRef, useState } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'

export function ProfileRenameDialog({name,onSave,onClose}:{name:string;onSave:(name:string)=>Promise<void>;onClose:()=>void}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [draft,setDraft] = useState(name)
  const [pending,setPending] = useState(false)
  const [error,setError] = useState('')
  useEffect(()=>{dialog.current?.showModal()},[])
  const save = async () => {
    if(pending)return
    const next = draft.trim().normalize('NFC')
    if(!next || Array.from(next).length>10 || /^(?:Guest\d{5}|Kỳ\s*Thủ\s*\d{5,6})$/iu.test(next)) {
      setError('Tên cần từ 1 đến 10 ký tự và không dùng mẫu tên khách.')
      return
    }
    setPending(true)
    setError('')
    try {await onSave(next);onClose()}
    catch {setError('Không thể đổi tên. Vui lòng thử lại.');setPending(false)}
  }
  const button = `${buttonInteraction} rounded border border-[#c89b4f] bg-[#69401c] px-4 py-2 text-[#ffe5a6] hover:brightness-110`
  return <dialog ref={dialog} aria-label="Đổi tên người chơi" onCancel={event=>{event.preventDefault();if(!pending)onClose()}} className="m-auto w-[min(420px,calc(100vw-24px))] rounded-xl border-2 border-[#d29a43] bg-[#241007] p-5 text-[#ffe5a6] backdrop:bg-black/65">
    <form onSubmit={event=>{event.preventDefault();void save()}}>
      <h2 className="mb-3 font-heading text-2xl font-bold">Đổi tên người chơi</h2>
      <p className="mb-4 text-sm">Bạn được đổi tên một lần sau khi liên kết tài khoản.</p>
      <label className="block text-sm">Tên mới<input autoFocus value={draft} disabled={pending} onChange={event=>setDraft(event.target.value)} className="mt-2 block w-full rounded border border-[#bb8b42] bg-[#fff0cc] px-3 py-2 text-base text-[#301b0d]" /></label>
      {error && <p role="alert" className="mt-3 text-sm text-[#ffb7a3]">{error}</p>}
      <div className="mt-5 flex justify-end gap-3"><button type="button" disabled={pending} onClick={onClose} className={button}>Hủy</button><button type="submit" disabled={pending} className={button}>{pending?'Đang lưu…':'Lưu tên'}</button></div>
    </form>
  </dialog>
}
