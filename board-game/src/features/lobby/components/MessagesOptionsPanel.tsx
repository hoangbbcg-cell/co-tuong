import { useDatabaseProfile } from '../hooks/useDatabaseProfile'
import { useSessionStore } from '../../../store/sessionStore'
import { SocialPlayerName } from './SocialUi'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { NumberText } from '../../../lib/NumberText'
import { useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { buttonInteraction, messageScrollbarClass } from '../../../lib/uiClasses'
import { AvatarPortrait } from './AvatarCustomization'
import { AvatarRankBadge } from '../../game/components/AvatarRankBadge'
import { AvatarFrameOverlay } from '../../game/components/AvatarFrameOverlay'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { getAvatarFrame } from '../../../lib/avatarFrames'
import picolozzAvatar from '../../../assets/messages/avatar-picolozz.png'
import frame from '../../../assets/messages/options/frame.png'
import scene from '../../../assets/messages/options/scene-background.png'
import body from '../../../assets/messages/options/body.png'
import back from '../../../assets/messages/options/back.png'
import info from '../../../assets/messages/options/info.png'
import nickname from '../../../assets/messages/options/nickname.png'
import blankActionButton from '../../../assets/messages/create-group/create-button-blank.png'
import defaultMemberAvatar from '../../../assets/icons/avatar.svg'
import block from '../../../assets/messages/options/block.png'
import blankActionRow from '../../../assets/messages/options/action-row-blank.png'
import mute from '../../../assets/messages/options/mute.png'
import deleteChat from '../../../assets/messages/options/delete-chat.png'
import report from '../../../assets/messages/options/report.png'

const sourceWidth = 894
const sourceHeight = 1008
// Temporarily hidden at the user's request; keep the duration dialog for later.
const notificationMuteEnabled = false
export type NotificationMuteDuration = 1 | 4 | 8 | 'forever'
const notificationMuteOptions = [
  { value: 1, label: '1h' },
  { value: 4, label: '4h' },
  { value: 8, label: '8h' },
  { value: 'forever', label: 'Cho đến khi mở lại' },
] as const
const place = (left: number, top: number, width: number, height: number): CSSProperties => ({
  left: `${left / sourceWidth * 100}%`, top: `${top / sourceHeight * 100}%`,
  width: `${width / sourceWidth * 100}%`, height: `${height / sourceHeight * 100}%`,
})
const actions = [
  { label: 'Xem thông tin', image: info, box: [118, 388, 315, 77] },
  { label: 'Biệt danh', image: nickname, box: [462, 388, 317, 77] },
  { label: 'Chặn', image: block, box: [47, 490, 800, 85] },
  { label: 'Tắt thông báo', image: mute, box: [47, 585, 800, 85] },
  { label: 'Xóa cuộc trò chuyện', image: deleteChat, box: [47, 681, 800, 85] },
  { label: 'Báo cáo', image: report, box: [47, 778, 800, 85] },
] as const

function OptionRowBackground({ showBlockIcon = false }: { showBlockIcon?: boolean }) {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-0 block">
    <CrispUiImage src={blankActionRow} alt="" className="block h-full w-full object-fill" />
    {showBlockIcon && <svg viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#ff6b40]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="m5.6 5.6 12.8 12.8" /></svg>}
  </span>
}

export function MessagesOptionsPanel({ width, height, image, name, accountName, nicknameValue, isBlocked, isGroup = false, members = [], memberImages = {}, creatorName, memberRowHeight, memberListWidth, selfName, selfAvatarIndex = 0, notificationMuteDuration = 1, onSaveNotificationMute, onBack, onViewInfo, onSaveNickname, onChangeGroupImage, onToggleBlock, onDeleteConversation }: {
  width: number; height: number; image: string; name: string; accountName?: string; nicknameValue: string; isBlocked: boolean; isGroup?: boolean; members?: string[]; memberImages?: Record<string, string>; creatorName?: string; memberRowHeight?: number; memberListWidth?: number; selfName?: string; selfAvatarIndex?: number; onBack: () => void; onViewInfo: () => void; onSaveNickname: (nickname: string) => void; onChangeGroupImage: (image: string) => void; onToggleBlock: (blocked: boolean) => void; onDeleteConversation: () => void
  notificationMuteDuration?: NotificationMuteDuration; onSaveNotificationMute: (duration: NotificationMuteDuration) => void
}) {
  const ownName = useSessionStore(state => state.name)
  const ownElo = useSessionStore(state => state.elo)
  const profileName = accountName ?? name
  const ownProfile = profileName === ownName
  const profile = useDatabaseProfile(isGroup ? '' : profileName, ownProfile)
  const elo = profile?.stats.find(stat => stat.variant === 'xiangqi')?.elo ?? (ownProfile ? ownElo : 1000)
  const [editingNickname, setEditingNickname] = useState(false)
  const [nicknameDraft, setNicknameDraft] = useState(nicknameValue)
  const [confirmBlock, setConfirmBlock] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [viewingMembers, setViewingMembers] = useState(false)
  const [editingNotificationMute, setEditingNotificationMute] = useState(false)
  const [notificationMuteDraft, setNotificationMuteDraft] = useState<NotificationMuteDuration>(notificationMuteDuration)
  const groupAvatarInputRef = useRef<HTMLInputElement>(null)
  const canManageGroup = isGroup && Boolean(creatorName) && creatorName === selfName
  const sortedMembers = creatorName && members.includes(creatorName)
    ? [creatorName, ...members.filter(member => member !== creatorName)]
    : members
  function submitNickname(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSaveNickname(nicknameDraft.trim())
    setEditingNickname(false)
  }
  const avatarDiameter = width * 200 / sourceWidth
  const memberViewportHeight = Math.min((memberRowHeight || 58) * 8, Math.max(0, height * 0.88 - 78))
  const avatarStyle: CSSProperties = {
    left: `${(isGroup ? 447.5 : 446) / sourceWidth * 100}%`,
    top: `${(isGroup ? 200 : 140) / sourceHeight * 100}%`,
    width: avatarDiameter,
    height: avatarDiameter,
    transform: 'translate(-50%, -50%)',
  }
  return <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/45" onClick={onBack}>
    <div role="dialog" aria-modal="true" aria-label={`Tùy chọn với ${name}`} className="relative shrink-0" style={{ width, height }} onClick={event => event.stopPropagation()} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
      <CrispUiImage src={body} alt="" className="pointer-events-none absolute object-fill" style={place(31, 32, 834, 948)} />
      <CrispUiImage src={scene} alt="" className="pointer-events-none absolute object-cover" style={place(31, 32, 834, 354)} />
      <div aria-hidden="true" className="pointer-events-none absolute" style={{ ...place(31, 280, 834, 180), background: 'linear-gradient(to bottom, transparent 0%, rgba(40, 18, 5, 0.12) 42%, rgba(40, 18, 5, 0.68) 70%, #281205 100%)' }} />
      <span className="absolute z-10 block" style={avatarStyle}>
        {isGroup
          ? <MessagesGroupAvatar src={image} alt={`Avatar ${name}`} className="block size-full" />
          : accountName ? <MessageAccountAvatar name={accountName} /> : image === picolozzAvatar
          ? <span role="img" aria-label={`Avatar ${name}`} className="block h-full w-full overflow-hidden rounded-full"><AvatarPortrait avatarIndex={0} className="h-full w-full rounded-full" /></span>
          : <CrispUiImage src={image} alt={`Avatar ${name}`} className="block h-full w-full cursor-pointer rounded-full object-cover" />}
        {!isGroup && !accountName && <AvatarFrameOverlay src={getAvatarFrame(0).image} alt={getAvatarFrame(0).label} />}
        {!isGroup && <AvatarRankBadge elo={elo} />}
      </span>
      {canManageGroup && <>
        <input ref={groupAvatarInputRef} hidden type="file" accept="image/*" onChange={event => {
          const file = event.currentTarget.files?.[0]
          event.currentTarget.value = ''
          if (!file || !file.type.startsWith('image/')) return
          if(file.size>10*1024*1024){window.alert('Chọn ảnh nhỏ hơn 10 MB.');return}
          void createImageBitmap(file).then(bitmap=>{
            const canvas=document.createElement('canvas')
            canvas.width=256;canvas.height=256
            const context=canvas.getContext('2d')
            if(!context){bitmap.close();throw new Error('Không đọc được ảnh.')}
            context.fillStyle='#fff';context.fillRect(0,0,256,256)
            const size=Math.min(bitmap.width,bitmap.height)
            context.drawImage(bitmap,(bitmap.width-size)/2,(bitmap.height-size)/2,size,size,0,0,256,256)
            bitmap.close()
            onChangeGroupImage(canvas.toDataURL('image/jpeg',0.8))
          }).catch(()=>window.alert('Không đọc được ảnh. Hãy chọn PNG, JPEG hoặc WebP.'))
        }} />
        <button type="button" aria-label="Đổi ảnh nhóm" onClick={() => groupAvatarInputRef.current?.click()} className={`${buttonInteraction} absolute z-20 grid place-items-center rounded-full border border-[#e7b755] bg-[#2d160a] p-1 text-[#ffe08b] shadow-[0_1px_3px_#160904]`} style={place(499.5, 109, 48, 48)}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-full" fill="currentColor"><path d="M8 4 6 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z"/><circle cx="12" cy="13" r="4" fill="#2d160a"/><circle cx="12" cy="13" r="2.5" fill="currentColor"/></svg></button>
      </>}
      <span className="absolute z-10 w-[80%] -translate-x-1/2 truncate text-center font-heading text-[length:var(--ui-p-28)] font-bold leading-none text-[#ffe8ad]" style={{ left: `${(isGroup ? 447.5 : 447) / sourceWidth * 100}%`, top: `${(isGroup ? 315 : 316) / sourceHeight * 100}%` }}><SocialPlayerName name={name} /></span>
      <button autoFocus type="button" aria-label="Quay lại hội thoại" onClick={onBack} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={place(40, 35, 85, 77)}>
        <CrispUiImage src={back} alt="" className="block h-full w-full object-contain" />
      </button>
      {actions.filter(action => (action.image !== mute || notificationMuteEnabled) && (isGroup
        ? action.image !== info && action.image !== block && (canManageGroup || action.image !== nickname)
        : action.image !== mute)).map(action => {
        const actionBox = isGroup
          ? action.image === nickname ? [289, 388, 317, 77]
            : action.image === mute ? [47, 581, 800, 85]
              : action.image === deleteChat ? [47, notificationMuteEnabled ? 672 : 581, 800, 85]
                : action.image === report ? [47, notificationMuteEnabled ? 763 : 672, 800, 85]
                  : action.box
          : action.image === deleteChat ? [47, 585, 800, 85]
            : action.image === report ? [47, 681, 800, 85]
              : action.box
        const actionLabel = isGroup && action.image === nickname ? 'Đổi tên' : !isGroup && action.image === block && isBlocked ? 'Bỏ chặn' : action.label
        return <button key={action.label} type="button" aria-label={actionLabel} onClick={() => {
        if (action.label === 'Xem thông tin') onViewInfo()
        if (action.label === 'Biệt danh') { setNicknameDraft(nicknameValue); setEditingNickname(true) }
        if (action.image === block) setConfirmBlock(true)
        if (action.image === mute) { setNotificationMuteDraft(notificationMuteDuration); setEditingNotificationMute(true) }
        if (action.label === 'Xóa cuộc trò chuyện') setConfirmDelete(true)
      }} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none ${editingNickname && (action.label === 'Xem thông tin' || action.label === 'Biệt danh') ? 'invisible' : ''}`} style={place(actionBox[0], actionBox[1], actionBox[2], actionBox[3])}>
        {!isGroup && action.image === block ? <OptionRowBackground showBlockIcon /> : <CrispUiImage src={isGroup && action.image === nickname ? blankActionButton : action.image} alt="" className={`block h-full w-full ${isGroup && action.image === nickname ? 'object-fill' : 'object-contain'}`} />}
        {!isGroup && action.image === block && <span className="absolute left-[15%] top-0 flex h-full items-center font-cormorant text-[length:var(--ui-p-22)] font-bold text-[#ffe8ad]">{actionLabel}</span>}
        {isGroup && action.image === nickname && <><svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[19%] top-[22%] h-[56%] w-[12%] text-[#f4c75e]" fill="currentColor"><path d="m17.7 2.3 4 4a1 1 0 0 1 0 1.4l-2.4 2.4-5.4-5.4 2.4-2.4a1 1 0 0 1 1.4 0ZM12.5 6.1l5.4 5.4L8 21.4 2 23l1.6-6L12.5 6.1ZM3 22h18v1H3Z" /></svg><span className="absolute left-[36%] top-0 flex h-full w-[60%] items-center justify-center font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe8ad]">Đổi tên</span></>}
      </button>
      })}
      {isGroup && <button type="button" onClick={() => setViewingMembers(true)} aria-label={`Xem thành viên (${members.length})`} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={place(47, 490, 800, 85)}>
        <OptionRowBackground />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 .17c-.29 0-.62.02-.97.05 1.16.84 1.97 1.94 1.97 3.28V19h6v-2.5c0-2.33-4.67-3.33-7-3.33Z" /></svg>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ffe8ad] [font-variant-numeric:lining-nums]">Xem thành viên (<span className="font-number">{members.length}</span>)</span>
      </button>}
      {viewingMembers && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-[6%]">
        <section role="dialog" aria-modal="true" aria-label={`Thành viên nhóm (${members.length})`} className="flex max-h-full max-w-full flex-col rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#4a260f,#241007)] p-4 shadow-[0_4px_18px_#120700]" style={{ width: memberListWidth ?? '100%' }}>
          <div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-cormorant text-[length:var(--ui-p-22)] font-bold text-[#ffe5a6] [font-variant-numeric:lining-nums]">Thành viên (<span className="font-number">{members.length}</span>)</h2><button type="button" autoFocus onClick={() => setViewingMembers(false)} aria-label="Đóng danh sách thành viên" className={`${buttonInteraction} rounded-lg border border-[#b8873e] px-3 py-1 text-[#ffe5a6]`}>×</button></div>
          <ul className={`min-h-0 shrink-0 overflow-y-auto pr-1 ${messageScrollbarClass}`} style={{ height: memberViewportHeight }}>{sortedMembers.map(member => <li key={member} className="flex shrink-0 items-center gap-2 border-b border-[#79501e] px-1 py-1 font-heading text-[length:var(--ui-p-22)] font-bold text-[#fff6df] leading-tight" style={{ height: memberViewportHeight / 8 }}>
            <span className="relative block size-[var(--ui-p-50)] shrink-0 cursor-pointer">
              {accountName ? <MessageAccountAvatar name={member} /> : member === selfName ? <AvatarPortrait avatarIndex={selfAvatarIndex} className="size-full rounded-full object-contain" /> : <CrispUiImage src={memberImages[member] ?? defaultMemberAvatar} alt={`Avatar ${member}`} className="block size-full rounded-full object-contain" />}
              {member === creatorName && <span role="img" aria-label="Người tạo nhóm" className="absolute -right-[var(--ui-p-2)] -bottom-[var(--ui-p-2)] grid size-[var(--ui-p-20)] place-items-center rounded-full border border-[#666666] bg-[#666666] shadow-[0_1px_2px_#1c0e07]"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-13)] text-[#FBD65B]" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="8" r="5" /><path d="m12.5 11.5-9 9H7v-4h4v-4" /></svg></span>}
            </span>
            <span className="min-w-0 truncate"><SocialPlayerName name={member} /></span>
          </li>)}</ul>
        </section>
      </div>}
      {editingNickname && <form onSubmit={submitNickname} aria-label="Đặt biệt danh" className="absolute z-20 flex items-center gap-2 rounded-lg border-2 border-[#e7b755] bg-[linear-gradient(135deg,#4a260f,#241007)] px-2 shadow-[0_2px_8px_#120700]" style={place(106, 388, 682, 77)}>
        <input autoFocus aria-label={isGroup ? 'Tên nhóm' : 'Biệt danh'} value={nicknameDraft} onChange={event => setNicknameDraft(event.target.value)} maxLength={32} placeholder={isGroup ? 'Nhập tên' : 'Nhập biệt danh'} className="h-[70%] min-w-0 flex-1 rounded-md border border-[#b8873e] bg-[#1c0e07] px-2 text-[length:var(--ui-p-18)] text-[#fff6df] outline-none placeholder:text-[#c8aa78]" />
        <button type="button" onClick={() => setEditingNickname(false)} className={`${buttonInteraction} shrink-0 rounded-md border border-[#b8873e] bg-[#3e200e] px-2 text-[length:var(--ui-p-16)] text-[#ffe5a6]`}>Hủy</button>
        <button type="submit" className={`${buttonInteraction} shrink-0 rounded-md border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-3 text-[length:var(--ui-p-16)] font-bold text-[#fff2c8]`}>OK</button>
      </form>}
      {confirmBlock && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/65 p-6">
        <section role="alertdialog" aria-modal="true" aria-labelledby="messages-block-confirmation-title" className="w-[82%] rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#54290f,#241007)] px-5 py-4 text-center shadow-[0_4px_18px_#120700]">
          <p id="messages-block-confirmation-title" className="font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe5a6]">Muốn {isBlocked ? 'bỏ chặn' : 'chặn'} người chơi {name}?</p>
          <div className="mt-4 flex justify-center gap-4">
            <button type="button" onClick={() => setConfirmBlock(false)} className={`${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#b8873e] bg-[#3e200e] px-4 py-2 text-[length:var(--ui-p-18)] text-[#ffe5a6]`}>Hủy</button>
            <button type="button" onClick={() => { onToggleBlock(!isBlocked); setConfirmBlock(false) }} className={`${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-4 py-2 text-[length:var(--ui-p-18)] font-bold text-[#fff2c8]`}>Đồng ý</button>
          </div>
        </section>
      </div>}
      {editingNotificationMute && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/65 p-6">
        <form role="dialog" aria-modal="true" aria-labelledby="messages-mute-title" className="w-[88%] rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#54290f,#241007)] px-5 py-4 shadow-[0_4px_18px_#120700]" onSubmit={event => {
          event.preventDefault()
          onSaveNotificationMute(notificationMuteDraft)
          setEditingNotificationMute(false)
        }}>
          <h2 id="messages-mute-title" className="text-center font-heading text-[length:var(--ui-p-24)] font-bold text-[#ffe5a6]">Tắt thông báo trong:</h2>
          <fieldset aria-label="Thời gian tắt thông báo" className="mt-4 flex flex-col gap-4">
            {notificationMuteOptions.map((option, index) => <label key={option.value} className="flex cursor-pointer items-center gap-3 text-[length:var(--ui-p-18)] text-[#e2c79f]">
              <input type="radio" name="notification-mute-duration" value={option.value} checked={notificationMuteDraft === option.value} onChange={() => setNotificationMuteDraft(option.value)} autoFocus={index === 0} className="peer sr-only" />
              <span aria-hidden="true" className="grid size-[var(--ui-p-22)] shrink-0 place-items-center rounded-full border-2 border-[#b8873e] bg-[#241007] peer-checked:border-[#ffe08b] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ffe08b]">
                {notificationMuteDraft === option.value && <span className="block size-[var(--ui-p-10)] rounded-full bg-[#ffe08b]" />}
              </span>
              {option.value === 'forever' ? <span>{option.label}</span> : <span className="whitespace-nowrap font-number lining-nums tabular-nums text-[length:var(--ui-p-20)]"><NumberText text={option.label} /></span>}
            </label>)}
          </fieldset>
          <div className="mt-4 flex justify-center gap-4">
            <button type="button" onClick={() => setEditingNotificationMute(false)} className={`${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#b8873e] bg-[#3e200e] px-4 py-2 text-[length:var(--ui-p-18)] text-[#ffe5a6]`}>Hủy</button>
            <button type="submit" className={`${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-4 py-2 text-[length:var(--ui-p-18)] font-bold text-[#fff2c8]`}>OK</button>
          </div>
        </form>
      </div>}
      {confirmDelete && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/65 p-6">
        <section role="alertdialog" aria-modal="true" aria-labelledby="messages-delete-confirmation-title" className="w-[88%] rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#54290f,#241007)] px-5 py-4 text-center shadow-[0_4px_18px_#120700]">
          <p id="messages-delete-confirmation-title" className="font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe5a6]">Xóa toàn bộ tin nhắn?</p>
          <p className="mt-2 text-[length:var(--ui-p-16)] text-[#e2c79f]">Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn.</p>
          <div className="mt-4 flex justify-center gap-4">
            <button type="button" onClick={() => setConfirmDelete(false)} className={`${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#b8873e] bg-[#3e200e] px-4 py-2 text-[length:var(--ui-p-18)] text-[#ffe5a6]`}>Hủy</button>
            <button type="button" onClick={onDeleteConversation} className={`${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-4 py-2 text-[length:var(--ui-p-18)] font-bold text-[#fff2c8]`}>Đồng ý</button>
          </div>
        </section>
      </div>}
      <CrispUiImage src={frame} alt="" className="pointer-events-none absolute inset-0 block h-full w-full object-fill" />
    </div>
  </div>
}




