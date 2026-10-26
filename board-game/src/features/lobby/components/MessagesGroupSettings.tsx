import { useEffect, useState } from 'react'
import { buttonInteraction } from '../../../lib/uiClasses'
import { errorMessage } from '../../../services/api'
import { MessagesBackButton } from './MessagesBackButton'
import { MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import { NumberText } from '../../../lib/NumberText'
import rowImage from '../../../assets/messages/options/action-row-blank.png'

const icons = {
  rename: 'm4 16 12-12 4 4L8 20l-5 1ZM13 7l4 4',
  transfer: 'M14 10a5 5 0 1 0 0-7 5 5 0 0 0 0 7Zm-3-1L2 18v4h4v-3h3v-3h3',
  approve: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 0 2 2 4-4',
  dissolve: 'M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
}
export function MessagesGroupSettings({ name, members, selfName, onBack, onRename, onTransfer, onDissolve, onOpenApproval }: {
  name: string; members: string[]; selfName?: string; onBack: () => void
  onOpenApproval: () => void
  onRename: (name: string) => Promise<void>; onTransfer: (name: string) => Promise<void>; onDissolve: () => Promise<void>
}) {
  const [mode, setMode] = useState<'main' | 'rename' | 'transfer'>('main')
  const [draft, setDraft] = useState(name)
  const [target, setTarget] = useState<string | null>(null)
  const [dissolving, setDissolving] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { if (!error) return; const timer = window.setTimeout(() => setError(''), 3000); return () => window.clearTimeout(timer) }, [error])
  async function run(action: () => Promise<void>, done: () => void) {
    if (pending) return
    setPending(true); setError('')
    try { await action(); done() } catch (error) { setError(errorMessage(error)) } finally { setPending(false) }
  }
  function row(label: string, icon: keyof typeof icons, action: () => void, danger = false) {
    return <button type="button" disabled={pending} onClick={action} className={buttonInteraction + ' relative flex h-[var(--ui-p-90)] compact:h-[50px] w-full shrink-0 items-center gap-[12px] border-0 bg-transparent px-[16px] text-left disabled:opacity-50'}>
      <img src={rowImage} alt="" className="pointer-events-none absolute inset-0 size-full" />
      <svg aria-hidden="true" viewBox="0 0 24 24" className={'relative size-[var(--ui-p-34)] compact:size-[22px] shrink-0 ' + (danger ? 'text-[#ff5555]' : 'text-[#f4c75e]')} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icons[icon]}/></svg>
      <span className={'relative font-cormorant text-[length:var(--ui-p-22)] compact:text-[18px] font-bold ' + (danger ? 'text-[#ff5555]' : 'text-[#ffe8ad]')}>{label}</span>
    </button>
  }
  return <section aria-label="Cài đặt nhóm" className="absolute inset-0 z-30 flex min-h-0 flex-col gap-[12px] bg-[#281205] p-[20px] text-[#ffe8ad]">
    <header className="flex shrink-0 items-center gap-[12px]"><MessagesBackButton label="Quay lại tùy chọn nhóm" onClick={() => { if (!pending) { if (mode === 'main') onBack(); else setMode('main') } }} /><h2 className="font-heading text-[length:var(--ui-p-28)] compact:text-[22px]">{mode === 'rename' ? 'Đổi tên nhóm' : mode === 'transfer' ? 'Chuyển khóa vàng' : 'Cài đặt nhóm'}</h2></header>
    {error && !target && !dissolving && <p role="alert" className="text-[16px] text-[#ff9b9b]">{error}</p>}
    {mode === 'main' && <>{row('Đổi tên', 'rename', () => { setDraft(name); setMode('rename') })}{row('Chuyển khóa vàng', 'transfer', () => setMode('transfer'))}{row('Duyệt thành viên', 'approve', onOpenApproval)}<div className="mt-auto">{row('Giải tán nhóm', 'dissolve', () => setDissolving(true), true)}</div></>}
    {mode === 'rename' && <form className="flex flex-col gap-[16px]" onSubmit={event => { event.preventDefault(); if (draft.trim()) void run(() => onRename(draft.trim()), () => setMode('main')) }}><input autoFocus aria-label="Tên nhóm" value={draft} maxLength={80} onChange={event => setDraft(event.target.value)} className="h-[44px] rounded-[10px] border border-[#b8873e] bg-[#1c0e07] px-[12px] text-[18px] outline-none"/><button disabled={pending || !draft.trim()} className={buttonInteraction + ' rounded-[8px] border border-[#d8ac35] bg-[#805100] py-[12px] text-[18px] disabled:opacity-50'}>Lưu tên</button></form>}
    {mode === 'transfer' && <div className="min-h-0 overflow-y-auto">{members.filter(member => member !== selfName).map(member => <button key={member} type="button" disabled={pending} onClick={() => { setError(''); setTarget(member) }} className={buttonInteraction + ' flex min-h-[50px] w-full items-center border-b border-[#79501e] bg-transparent py-[12px] text-left text-[18px]'}><NumberText text={member} compact weight="normal" soften={false}/></button>)}{members.every(member => member === selfName) && <p className="text-[18px]">Chưa có thành viên khác để chuyển khóa vàng.</p>}</div>}
    {target && <MessagesFriendRemovalConfirmation name={target} skip={false} onSkipChange={() => {}} message={'Chuyển khóa vàng cho ' + target + '? Bạn sẽ trở thành thành viên thường.'} pending={pending} error={error} onCancel={() => { if (!pending) setTarget(null) }} onConfirm={() => { void run(() => onTransfer(target), () => { setTarget(null); onBack() }) }}/>}
    {dissolving && <MessagesFriendRemovalConfirmation name={name} skip={false} onSkipChange={() => {}} message="Giải tán nhóm? Tất cả thành viên sẽ rời nhóm và không thể gửi thêm tin nhắn." pending={pending} error={error} onCancel={() => { if (!pending) setDissolving(false) }} onConfirm={() => { void run(onDissolve, () => setDissolving(false)) }}/>}
  </section>
}
