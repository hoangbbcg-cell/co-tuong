import { SearchIcon } from './SearchIcon'
import { confirmationDialogActions } from '../../../lib/confirmationDialogStyles'
import { confirmationCancelButton, confirmationAcceptButton } from '../../../lib/confirmationButtonStyles'
import { searchFieldMetrics, searchFieldTextSize } from '../../../lib/searchFieldMetrics'
import { SocialPlayerName } from './SocialUi'
import { NumberText } from '../../../lib/NumberText'
import { useEffect, useRef, useState } from 'react'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { buttonInteraction } from '../../../lib/uiClasses'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { useSocialStore } from '../../../store/socialStore'
import { useSessionStore } from '../../../store/sessionStore'
import { AccountAvatar } from './AccountAvatar'
import { SocialDialogFrame } from './SocialDialogFrame'
import titleFrame from '../../../assets/messages/create-group-title-gold-v2.png'
import avatar from '../../../assets/messages/create-group/avatar.png'

export type MessagesCreateGroupPayload = { name: string; image: string; members: string[] }

export function MessagesCreateGroupPanel({ width, height, compact = false, selfName, onBack, onCreate, onViewInfo }: {
  width: number; height: number; compact?: boolean; selfName: string; onBack: () => void; onCreate: (group: MessagesCreateGroupPayload) => void; onViewInfo: (name: string) => void
}) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)
  const [nameError, setNameError] = useState(false)
  const [search, setSearch] = useState('')
  const friends = useSocialStore(state => state.friends)
  const account = useSessionStore(state => state.account)
  const refreshFriends = useSocialStore(state => state.refresh)
  const groupContacts = friends.filter(friend => friend.status === 'accepted').map(friend => ({ name: friend.name, image: avatar, status: friend.online ? 'online' : 'offline' }))
  const selectedContacts = groupContacts.filter(contact => selected.includes(contact.name))
  const visibleContacts = groupContacts.filter(contact => {
    const publicId = friends.find(friend => friend.name === contact.name)?.publicId ?? ''
    return `${contact.name} ${publicId}`.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi'))
  })
  const toggleMember = (member: string) => setSelected(current => current.includes(member) ? current.filter(item => item !== member) : [...current, member])
  const uploadRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (compact) panelRef.current?.focus({ preventScroll: true })
  }, [compact])
  useEffect(() => {
    if (account) void refreshFriends().catch(() => useSessionStore.getState().setNotice('Không tải được danh sách bạn bè.'))
  }, [account?.id, refreshFriends])
  function createGroup() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError(true)
      nameInputRef.current?.focus()
      return
    }
    const selectedFriends = groupContacts.filter(contact => selected.includes(contact.name)).map(contact => contact.name)
    onCreate({ name: trimmedName, image: image ?? avatar, members: [...new Set([selfName, ...selectedFriends])] })
  }
  return <div className={`${compact ? 'absolute' : 'fixed'} inset-0 z-[60] flex items-center justify-center bg-black/45`} onClick={onBack}>
    <section ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Tạo nhóm" className="relative shrink-0 font-['Times_New_Roman'] text-[#ffe08b] outline-none" style={{ ...getCrispUiLayout(width / 1120), width, height }} onClick={event => event.stopPropagation()} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not([hidden])')
      const first = controls[0], last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
      <SocialDialogFrame layout={{ width: 1120, height: height / (width / 1120), scale: width / 1120, compact: true }} titleImage={titleFrame} titleCrop={{ width: 2171, height: 724, top: 181, cropHeight: 364 }} titleId="create-group-frame-title" title="Tạo nhóm" onClose={onBack}><div className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2" style={{ fontSize: Math.max(14, width * (compact ? 0.043 : 0.037)) }}>
        <label htmlFor="message-group-name" className="mb-2 flex shrink-0 items-center gap-[10px] text-[0.9em] font-bold text-[#ffe08b]">
          <svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className={`shrink-0 ${compact ? 'size-[1.15em]' : 'size-[1.08em]'}`}><circle cx="16" cy="7" r="6"/><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M6 27v-5a10 10 0 0 1 20 0v5ZM0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></svg> Tên nhóm
        </label>
        <input ref={nameInputRef} id="message-group-name" value={name} onChange={event => { setName(event.target.value); setNameError(false) }} maxLength={80} aria-invalid={nameError} placeholder="Nhập tên nhóm" className="h-[6.5%] desktop:h-[7.5%] desktop:min-h-[44px] min-h-[32px] w-full shrink-0 rounded-full border border-[#e7b755] bg-[#1c0e07]/90 pl-[14px] pr-3 text-[0.85em] desktop:text-[18px] text-[#fff6df] outline-none placeholder:text-[#b6a28c] focus:border-[#fff0a5]" />
        {nameError && <p role="alert" className="mt-1 text-sm text-[#ffcf85]">Vui lòng nhập tên nhóm</p>}
        <div className="my-3 shrink-0 border-t border-[#a26b28]" />
        <div style={searchFieldMetrics(`${Math.max(32, height * 0.065)}px`)} className="flex h-[6.5%] desktop:h-[7.5%] desktop:min-h-[44px] min-h-[32px] shrink-0 items-center gap-2 border border-[#e7b755] bg-[#1c0e07]/90 pl-[14px] pr-3">
          <SearchIcon className="size-[1em] shrink-0" />
          <input aria-label="Tìm bạn bè theo tên hoặc ID" value={search} onChange={event => setSearch(event.target.value)} placeholder="Tìm tên hoặc ID người chơi" className={`h-full min-w-0 flex-1 bg-transparent text-[#fff6df] outline-none placeholder:text-[#b6a28c] ${compact ? searchFieldTextSize : 'text-[18px] placeholder:text-[18px]'}`} />
        </div>
        <div className="mb-2 mt-3 flex shrink-0 items-center justify-between desktop:text-[0.9em] font-bold"><span className="flex items-center gap-[10px]"><svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className={`shrink-0 ${compact ? 'size-[1.15em]' : 'size-[1.08em]'}`}><circle cx="16" cy="7" r="6"/><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M6 27v-5a10 10 0 0 1 20 0v5ZM0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></svg>Bạn bè</span><span className="text-[0.85em] font-normal text-[#c89c61]"><NumberText text={String(groupContacts.length)} /> người</span></div>
        <div className="flex min-h-0 flex-1 flex-col gap-[6px] overflow-y-auto ">
          {visibleContacts.map(contact => {
            const isSelected = selected.includes(contact.name)
            const friend = friends.find(friend => friend.name === contact.name)
            const publicId = friend?.publicId
            const online = friend?.online ?? (contact.status === 'online')
            return <div key={contact.name} className="flex min-h-0 w-full shrink-0 basis-[calc((100%_-_12px)/3)] items-center gap-[10px] rounded-[18px] border border-[#ab702b] bg-[#321705]/50 pl-[10px] pr-[10px] py-[4px] desktop:py-[7px] [container-type:size] text-left">
              <button data-ui-selection-sound type="button" aria-label={`Xem thông tin ${contact.name}`} onClick={() => onViewInfo(contact.name)} className={`${buttonInteraction} relative size-[min(48px,85cqh)] shrink-0 rounded-full`}><AccountAvatar avatarCode={friend?.avatarCode} avatarFrameCode={friend?.avatarFrameCode}/><span role="img" aria-label={online ? 'Đang online' : 'Offline'} title={online ? 'Đang online' : 'Offline'} className={`pointer-events-none absolute bottom-0 right-0 z-30 size-[14px] rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${online ? 'bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]' : 'bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]'}`} /></button>
              <span className="min-w-0 flex-1"><span className="block truncate font-bold desktop:font-normal desktop:text-[0.9em] text-[#fff6df]"><>{compact ? <SocialPlayerName name={contact.name}/> : <NumberText text={contact.name} compact weight="normal" soften={false}/>}</></span><span className="block text-[0.8em] desktop:text-[0.75em] text-[#c4aa86]">{publicId ? <>ID: <NumberText text={publicId} /></> : online ? 'Đang online' : 'Offline'}</span></span>
              <button data-ui-selection-sound type="button" aria-label={`Chọn ${contact.name}`} aria-pressed={isSelected} onClick={() => { if (!isSelected) toggleMember(contact.name) }} className={`${buttonInteraction} grid size-[36px] shrink-0 place-items-center rounded-full border-2 border-[#f8ca62] bg-[linear-gradient(#955719,#412006)] text-[30px] leading-none text-[#ffe691] ${isSelected ? 'brightness-50' : ''}`}>+</button>
            </div>
          })}
          {visibleContacts.length === 0 && <p className="py-4 text-center text-[0.85em] text-[#c4aa86]">{search ? 'Không tìm thấy bạn bè' : 'Chưa có bạn bè'}</p>}
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-[#a26b28] py-[10px] text-[0.9em] font-bold"><span className="flex items-center gap-[10px]"><svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className={`shrink-0 ${compact ? 'size-[1.15em]' : 'size-[1.08em]'}`}><circle cx="16" cy="7" r="6"/><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M6 27v-5a10 10 0 0 1 20 0v5ZM0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></svg>Thành viên đã chọn</span><span className="pr-[8px] text-[1.05em] font-normal"><NumberText text={String(selectedContacts.length)} /></span></div>
        <div className="grid h-[18%] desktop:h-[20%] min-h-20 shrink-0 grid-cols-4 items-center justify-items-center gap-[8px] overflow-x-auto rounded-[20px] border border-[#ab702b] bg-[#1c0e07]/40 px-[10px] py-[8px]">
          {selectedContacts.map(contact => <div key={contact.name} className="relative flex h-[92%] aspect-square desktop:aspect-auto desktop:w-full max-w-full min-w-0 flex-col items-center justify-start gap-[4px] rounded-[16px] border border-[#ab702b] bg-[linear-gradient(145deg,#69370d66,#32170588)] px-[3px] pb-[5px] pt-[6px] desktop:px-[6px] desktop:pt-[10px] [container-type:size]"><span className="relative block size-[min(48px,65cqh)] desktop:size-[min(56px,70cqh)] shrink-0"><button data-ui-selection-sound type="button" aria-label={`Xem thông tin ${contact.name}`} onClick={() => onViewInfo(contact.name)} className={`${buttonInteraction} block size-full rounded-full`}><AccountAvatar avatarCode={friends.find(friend => friend.name === contact.name)?.avatarCode} avatarFrameCode={friends.find(friend => friend.name === contact.name)?.avatarFrameCode}/></button><button data-ui-selection-sound type="button" aria-label={`Bỏ chọn ${contact.name}`} onClick={() => toggleMember(contact.name)} className={`${buttonInteraction} absolute -right-[8px] -top-[6px] desktop:-right-[10px] desktop:-top-[4px] desktop:text-[16px] desktop:font-body z-30 grid size-[18px] place-items-center rounded-full border border-[#f8ca62] bg-[#69370d] leading-none`}>×</button></span><span className="w-full truncate desktop:whitespace-normal desktop:break-words desktop:overflow-y-auto text-center text-[0.75em] desktop:text-[16px] leading-tight text-[#fff6df]">{contact.name}</span></div>)}
          {Array.from({ length: Math.max(0, 4 - selectedContacts.length) }, (_, index) => <span key={index} aria-hidden="true" className="grid h-[92%] aspect-square max-w-full place-items-center"><span className="grid size-full place-items-center rounded-full border border-dashed border-[#a06b29] text-[2em] text-[#a06b29]">+</span></span>)}
        </div>
        <div className={compact ? 'mx-auto mt-3 flex h-[7%] min-h-[32px] shrink-0 gap-3 text-[0.9em] w-[84%]' : `${confirmationDialogActions} mx-auto mt-[8px]! max-w-[360px] shrink-0 gap-[12px]! font-body [&_button]:h-[44px]! [&_button]:py-[8px]! [&_button]:text-[18px]! [&_button]:leading-[24px]!`}>
          <button data-ui-selection-sound type="button" onClick={onBack} className={`${confirmationCancelButton} flex-1`}>Hủy</button>
          <button data-ui-selection-sound type="button" onClick={createGroup} className={`${confirmationAcceptButton} flex-1`}>Tạo nhóm</button>
        </div>
      </div></SocialDialogFrame>
    </section>
  </div>
}

