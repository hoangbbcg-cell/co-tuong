import { searchFieldMetrics, searchFieldTextSize } from '../../../lib/searchFieldMetrics'
import { SocialPlayerName } from './SocialUi'
import { NumberText } from '../../../lib/NumberText'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { buttonInteraction } from '../../../lib/uiClasses'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { useSocialStore } from '../../../store/socialStore'
import { useSessionStore } from '../../../store/sessionStore'
import { AccountAvatar } from './AccountAvatar'
import { SocialDialogFrame } from './SocialDialogFrame'
import titleFrame from '../../../assets/messages/create-group-title-gold-v2.png'
import frame from '../../../assets/messages/create-group/frame-background.png'
import title from '../../../assets/messages/create-group/title.png'
import back from '../../../assets/messages/create-group/back.png'
import avatar from '../../../assets/messages/create-group/avatar.png'
import createButton from '../../../assets/messages/create-group/create-button-blank.png'
import tabFrame from '../../../assets/messages/options/block.png'

const place = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: `${x / 944 * 100}%`, top: `${y / 997 * 100}%`, width: `${w / 944 * 100}%`, height: `${h / 997 * 100}%` })

export type MessagesCreateGroupPayload = { name: string; image: string; members: string[] }

export function MessagesCreateGroupPanel({ width, height, compact = false, contacts, selfName, onBack, onCreate, onViewInfo }: {
  width: number; height: number; compact?: boolean; contacts: { name: string; image: string; status?: string }[]; selfName: string; onBack: () => void; onCreate: (group: MessagesCreateGroupPayload) => void; onViewInfo: (name: string) => void
}) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [alone, setAlone] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [nameError, setNameError] = useState(false)
  const [search, setSearch] = useState('')
  const friends = useSocialStore(state => state.friends)
  const account = useSessionStore(state => state.account)
  const refreshFriends = useSocialStore(state => state.refresh)
  const groupContacts = compact ? friends.filter(friend => friend.status === 'accepted').map(friend => ({ name: friend.name, image: avatar, status: friend.online ? 'online' : 'offline' })) : contacts
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
    if (compact && account) void refreshFriends().catch(() => useSessionStore.getState().setNotice('Không tải được danh sách bạn bè.'))
  }, [compact, account?.id, refreshFriends])
  function createGroup() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError(true)
      nameInputRef.current?.focus()
      return
    }
    const selectedFriends = alone ? [] : groupContacts.filter(contact => selected.includes(contact.name)).map(contact => contact.name)
    onCreate({ name: trimmedName, image: image ?? avatar, members: [...new Set([selfName, ...selectedFriends])] })
  }
  return <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/45" onClick={onBack}>
    <section ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Tạo nhóm" className="relative shrink-0 font-['Times_New_Roman'] text-[#ffe08b] outline-none" style={{ ...getCrispUiLayout(width / 944), width, height }} onClick={event => event.stopPropagation()} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not([hidden])')
      const first = controls[0], last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
      {!compact && <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 border-solid border-transparent" style={{ borderImageSource: `url(${frame})`, borderImageSlice: '210 fill', borderImageWidth: `${width / 944 * 75}px` }} />}
      {compact ? <SocialDialogFrame layout={{ width: 1120, height: height / (width / 1120), scale: width / 1120, compact: true }} titleImage={titleFrame} titleCrop={{ width: 2171, height: 724, top: 181, cropHeight: 364 }} titleId="create-group-frame-title" title="Tạo nhóm" onClose={onBack}><div className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2" style={{ fontSize: Math.max(14, width * 0.043) }}>
        <label htmlFor="message-group-name" className="mb-2 flex shrink-0 items-center gap-[10px] text-[0.9em] font-bold text-[#ffe08b]">
          <svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className="size-[1.15em] shrink-0"><circle cx="16" cy="7" r="6"/><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M6 27v-5a10 10 0 0 1 20 0v5ZM0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></svg> Tên nhóm
        </label>
        <input ref={nameInputRef} id="message-group-name" value={name} onChange={event => { setName(event.target.value); setNameError(false) }} maxLength={80} aria-invalid={nameError} placeholder="Nhập tên nhóm" className="h-[6.5%] min-h-[32px] w-full shrink-0 rounded-full border border-[#e7b755] bg-[#1c0e07]/90 pl-[14px] pr-3 text-[0.85em] text-[#fff6df] outline-none placeholder:text-[#b6a28c] focus:border-[#fff0a5]" />
        {nameError && <p role="alert" className="mt-1 text-sm text-[#ffcf85]">Vui lòng nhập tên nhóm</p>}
        <div className="my-3 shrink-0 border-t border-[#a26b28]" />
        <div style={searchFieldMetrics(`${Math.max(32, height * 0.065)}px`)} className="flex h-[6.5%] min-h-[32px] shrink-0 items-center gap-2 border border-[#e7b755] bg-[#1c0e07]/90 pl-[14px] pr-3">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1em] shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></svg>
          <input aria-label="Tìm bạn bè theo tên hoặc ID" value={search} onChange={event => setSearch(event.target.value)} placeholder="Tìm tên hoặc ID người chơi" className={`h-full min-w-0 flex-1 bg-transparent text-[#fff6df] outline-none placeholder:text-[#b6a28c] ${searchFieldTextSize}`} />
        </div>
        <div className="mb-2 mt-3 flex shrink-0 items-center justify-between font-bold"><span className="flex items-center gap-[10px]"><svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className="size-[1.15em] shrink-0"><circle cx="16" cy="7" r="6"/><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M6 27v-5a10 10 0 0 1 20 0v5ZM0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></svg>Bạn bè</span><span className="text-[0.85em] font-normal text-[#c89c61]"><NumberText text={String(groupContacts.length)} /> người</span></div>
        <div className="flex min-h-0 flex-1 flex-col gap-[6px] overflow-y-auto ">
          {visibleContacts.map(contact => {
            const isSelected = selected.includes(contact.name)
            const friend = friends.find(friend => friend.name === contact.name)
            const publicId = friend?.publicId
            const online = friend?.online ?? (contact.status === 'online')
            return <div key={contact.name} className="flex min-h-0 w-full shrink-0 basis-[calc((100%_-_12px)/3)] items-center gap-[10px] rounded-[18px] border border-[#ab702b] bg-[#321705]/50 pl-[10px] pr-[10px] py-[4px] [container-type:size] text-left">
              <button type="button" aria-label={`Xem thông tin ${contact.name}`} onClick={() => onViewInfo(contact.name)} className={`${buttonInteraction} relative size-[min(48px,85cqh)] shrink-0 rounded-full`}><AccountAvatar avatarCode={friend?.avatarCode} avatarFrameCode={friend?.avatarFrameCode}/><span role="img" aria-label={online ? 'Đang online' : 'Offline'} title={online ? 'Đang online' : 'Offline'} className={`pointer-events-none absolute bottom-0 right-0 z-30 size-[14px] rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${online ? 'bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]' : 'bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]'}`} /></button>
              <span className="min-w-0 flex-1"><span className="block truncate font-bold text-[#fff6df]"><SocialPlayerName name={contact.name}/></span><span className="block text-[0.8em] text-[#c4aa86]">{publicId ? <>ID: <NumberText text={publicId} /></> : online ? 'Đang online' : 'Offline'}</span></span>
              <button type="button" aria-label={`Chọn ${contact.name}`} aria-pressed={isSelected} onClick={() => { if (!isSelected) toggleMember(contact.name) }} className={`${buttonInteraction} grid size-[36px] shrink-0 place-items-center rounded-full border-2 border-[#f8ca62] bg-[linear-gradient(#955719,#412006)] text-[30px] leading-none text-[#ffe691] ${isSelected ? 'brightness-50' : ''}`}>+</button>
            </div>
          })}
          {visibleContacts.length === 0 && <p className="py-4 text-center text-[0.85em] text-[#c4aa86]">{search ? 'Không tìm thấy bạn bè' : 'Chưa có bạn bè'}</p>}
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-[#a26b28] py-[10px] text-[0.9em] font-bold"><span className="flex items-center gap-[10px]"><svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className="size-[1.15em] shrink-0"><circle cx="16" cy="7" r="6"/><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M6 27v-5a10 10 0 0 1 20 0v5ZM0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></svg>Thành viên đã chọn</span><span className="pr-[8px] text-[1.05em] font-normal"><NumberText text={String(selectedContacts.length)} /></span></div>
        <div className="flex h-[18%] min-h-20 shrink-0 items-center gap-[8px] overflow-x-auto rounded-[20px] border border-[#ab702b] bg-[#1c0e07]/40 px-[10px] py-[8px] ">
          {selectedContacts.map(contact => <div key={contact.name} className="relative flex h-[92%] min-w-0 basis-[calc((100%_-_24px)/4)] shrink-0 flex-col items-center justify-start gap-[4px] rounded-[16px] border border-[#ab702b] bg-[linear-gradient(145deg,#69370d66,#32170588)] px-[3px] pb-[5px] pt-[6px] [container-type:size]"><span className="relative block size-[min(48px,65cqh)] shrink-0"><button type="button" aria-label={`Xem thông tin ${contact.name}`} onClick={() => onViewInfo(contact.name)} className={`${buttonInteraction} block size-full rounded-full`}><AccountAvatar avatarCode={friends.find(friend => friend.name === contact.name)?.avatarCode} avatarFrameCode={friends.find(friend => friend.name === contact.name)?.avatarFrameCode}/></button><button type="button" aria-label={`Bỏ chọn ${contact.name}`} onClick={() => toggleMember(contact.name)} className={`${buttonInteraction} absolute -right-[8px] -top-[6px] z-30 grid size-[18px] place-items-center rounded-full border border-[#f8ca62] bg-[#69370d] leading-none`}>×</button></span><span className="w-full truncate text-center text-[0.75em] leading-tight text-[#fff6df]">{contact.name}</span></div>)}
          {Array.from({ length: Math.max(0, 4 - selectedContacts.length) }, (_, index) => <span key={index} aria-hidden="true" className="relative aspect-square min-w-0 basis-[calc((100%_-_24px)/4)] shrink-0"><span className="grid aspect-square w-full place-items-center rounded-full border border-dashed border-[#a06b29] text-[2em] text-[#a06b29]">+</span></span>)}
        </div>
        <div className="mx-auto mt-3 flex h-[7%] min-h-[32px] w-[84%] shrink-0 gap-3 text-[0.9em]">
          <button type="button" onClick={onBack} className={`${buttonInteraction} flex-1 rounded-2xl border-2 border-[#c98b31] bg-[linear-gradient(#61300e,#2a1005)] font-bold text-[#fff0bd]`}>Hủy</button>
          <button type="button" onClick={createGroup} className={`${buttonInteraction} flex-1 rounded-2xl border-2 border-[#ffe08b] bg-[linear-gradient(#ffe68b,#f2ab24,#c47412)] font-bold text-[#2c1405] shadow-[inset_0_0_0_2px_#a35810]`}>Tạo nhóm</button>
        </div>
      </div></SocialDialogFrame> : <div className="absolute inset-0 z-10">
      <CrispUiImage src={title} alt="Tạo nhóm" className="pointer-events-none absolute object-contain [clip-path:polygon(8%_0,92%_0,96%_12%,98%_30%,100%_50%,98%_70%,96%_88%,92%_100%,8%_100%,4%_88%,2%_70%,0_50%,2%_30%,4%_12%)]" style={place(191, 36, 562, 78)} />
      <button autoFocus type="button" aria-label="Quay lại Tin nhắn" onClick={onBack} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={place(59, 43, 72, 71)}><CrispUiImage src={back} alt="" className="block size-full object-contain" /></button>
      <MessagesGroupAvatar src={image ?? avatar} alt="Avatar nhóm" className="absolute" style={{ left: '50%', top: `${151 / 997 * 100}%`, width: width * 176 / 944, height: width * 176 / 944, transform: 'translateX(-50%)' }} />
      <button type="button" aria-label="Chọn avatar nhóm" onClick={() => uploadRef.current?.click()} className={`${buttonInteraction} absolute z-10 grid place-items-center rounded-full border border-[#e7b755] bg-[#2d160a] p-1`} style={place(518, 159, 42, 42)}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-full" fill="currentColor"><path d="M8 4 6 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z"/><circle cx="12" cy="13" r="4" fill="#2d160a"/><circle cx="12" cy="13" r="2.5" fill="currentColor"/></svg></button>
      <input ref={uploadRef} hidden type="file" accept="image/*" onChange={event => {
        const file = event.target.files?.[0]
        if (!file || !file.type.startsWith('image/')) return
        const reader = new FileReader()
        reader.onload = () => { if (typeof reader.result === 'string') setImage(reader.result) }
        reader.readAsDataURL(file)
      }} />
      <label htmlFor="message-group-name" className="absolute flex items-center text-[length:var(--ui-p-32)]" style={place(78, 364, 160, 62)}>Tên nhóm</label>
      <div className="absolute flex items-center gap-3 rounded-2xl border-2 border-[#e7b755] bg-[#1c0e07] px-5" style={place(241, 364, 630, 62)}><span aria-hidden="true" className="text-[length:var(--ui-p-30,30px)]">✎</span><input ref={nameInputRef} id="message-group-name" value={name} onChange={event => { setName(event.target.value); setNameError(false) }} maxLength={80} aria-invalid={nameError} placeholder="Nhập tên nhóm" className="h-full min-w-0 flex-1 bg-transparent text-[length:var(--ui-p-26,26px)] text-[#fff6df] outline-none placeholder:text-[#d6b982]" /></div>
      <div className="absolute flex gap-3" style={place(75, 444, 796, 62)}>{['Bạn bè', '1 mình'].map((label, index) => <button key={label} type="button" aria-pressed={alone === (index === 1)} onClick={() => setAlone(index === 1)} className={`${buttonInteraction} relative flex min-w-0 flex-1 items-center justify-center gap-3 border-0 bg-transparent p-0 text-[length:var(--ui-p-28,28px)] font-bold`}><span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${alone === (index === 1) ? `rounded-lg border-2 border-[#ffdf70] bg-[linear-gradient(180deg,#f6c85c_0%,#bd792e_42%,#613014_100%)] shadow-[inset_0_1px_5px_#fff0a8,inset_0_-3px_5px_#4b210a,0_0_6px_#f8b73c]` : 'bg-[linear-gradient(135deg,#3e200e,#1c0e07)] [clip-path:polygon(10px_0,calc(100%_-_10px)_0,100%_10px,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,10px_100%,0_calc(100%_-_10px),0_10px)]'}`} />{alone !== (index === 1) && <span aria-hidden="true" className="pointer-events-none absolute inset-0 border-[length:var(--ui-p-10)] border-solid border-transparent" style={{ borderImageSource: `url(${tabFrame})`, borderImageSlice: 12, borderImageWidth: `${width / 944 * 10}px` }} />}<svg aria-hidden="true" viewBox="0 0 32 28" fill="currentColor" className="relative size-[var(--ui-p-36)] shrink-0"><circle cx="16" cy="7" r="6"/><path d="M6 27v-5a10 10 0 0 1 20 0v5Z"/>{index === 0 && <><circle cx="4" cy="10" r="4"/><circle cx="28" cy="10" r="4"/><path d="M0 26v-6a6 6 0 0 1 7-6L4 26ZM28 26l-3-12a6 6 0 0 1 7 6v6Z"/></>}</svg><span className="relative">{label}</span></button>)}</div>
      <div className="absolute overflow-y-auto rounded-2xl border border-[#b8873e] bg-[#3e200e55] px-5  " style={place(75, 517, 796, 350)}>{!alone && contacts.map(contact => <label key={contact.name} className="flex h-1/5 cursor-pointer items-center gap-5 border-b border-[#79501e] last:border-b-0"><CrispUiImage src={contact.image} alt="" className="block size-[var(--ui-p-50)] shrink-0 rounded-full object-cover" /><span className="min-w-0 flex-1 truncate text-[length:var(--ui-p-24)] text-[#fff6df]"><SocialPlayerName name={contact.name} /></span><input type="checkbox" aria-label={`Chọn ${contact.name}`} checked={selected.includes(contact.name)} onChange={event => setSelected(current => event.target.checked ? [...current, contact.name] : current.filter(item => item !== contact.name))} className="peer sr-only" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" className={`size-[var(--ui-p-30,30px)] shrink-0 peer-focus-visible:rounded peer-focus-visible:outline-2 peer-focus-visible:outline-[#ffe08b] ${selected.includes(contact.name) ? 'text-[#ffe08b] drop-shadow-[0_0_5px_#f8b73c]' : 'text-[#b8873e]'}`}><rect x="1" y="1" width="22" height="22" rx="3" fill="#1c0e07" />{selected.includes(contact.name) && <path d="m5 11 4 9L20 4" strokeWidth="3" />}</svg></label>)}</div>
      {nameError && <div role="alert" className="absolute z-20 flex items-center justify-center rounded-xl border-2 border-[#f3d27c] bg-[linear-gradient(180deg,#fff4cf,#eecb80)] px-4 text-center text-[length:var(--ui-p-20)] font-bold text-[#4a260f] shadow-[0_3px_8px_#160904aa,inset_0_1px_0_#fffbe7]" style={place(406, 312, 300, 42)}>Vui lòng nhập tên<span aria-hidden="true" className="absolute -bottom-[6px] left-1/2 size-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-[#f3d27c] bg-[#eecb80]" /></div>}
      <button type="button" onClick={createGroup} aria-label="Tạo nhóm" className={`${buttonInteraction} absolute m-0 rounded-[var(--ui-p-12)] border-0 bg-transparent p-0 leading-none transition-[filter] duration-150 hover:brightness-125 motion-reduce:transition-none`} style={place(282, 878, 380, 81)}><CrispUiImage src={createButton} alt="" className="pointer-events-none absolute inset-0 block size-full object-fill" /><span className="absolute inset-0 flex items-center justify-center text-center font-cormorant text-[length:var(--ui-p-36)] font-bold leading-none text-[#fff6df]">Tạo nhóm</span></button>
      </div>}
    </section>
  </div>
}

