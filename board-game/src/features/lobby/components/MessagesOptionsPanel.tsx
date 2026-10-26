import { useSocialStore } from '../../../store/socialStore'
import type { PendingGroupMember, BlockedGroupMember, GroupMemberRole } from '../hooks/useDatabaseMessages'
import { MessagesGroupSettings } from './MessagesGroupSettings'
import { NoticeOverlay } from './NoticeOverlay'
import { mobileNoticeButtonStyle } from '../../../lib/uiClasses'
import { messagesConfirmationSize, messagesConfirmationBody, messagesConfirmationActions } from './messagesConfirmationStyles'
import { messagesFriendsField, messagesFriendsInput } from './messagesInputStyles'
import { socialActionByName } from '../../../store/socialStore'
import { MessagesMemberFriendButton } from './MessagesMemberFriendButton'
import { MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import { errorMessage } from '../../../services/api'
import { MessagesBackButton } from './MessagesBackButton'
import { DialogCloseButton } from './DialogCloseButton'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useDatabaseProfile } from '../hooks/useDatabaseProfile'
import { useSessionStore } from '../../../store/sessionStore'
import { SocialPlayerName } from './SocialUi'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { NumberText } from '../../../lib/NumberText'
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
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

export function MessagesOptionsPanel({ width, height, uiScale, image, name, accountName, nicknameValue, isBlocked, isGroup = false, members = [], memberImages = {}, creatorName, memberRowHeight, memberListWidth, selfName, selfAvatarIndex = 0, notificationMuteDuration = 1, onSaveNotificationMute, onBack, onViewInfo, onMemberInfo, onRemoveMember, onSaveNickname, onChangeGroupImage, onToggleBlock, onDeleteConversation, onLeaveGroup, onRenameGroup, onTransferOwner, onDissolveGroup, approvalRequired, pendingMembers, onSetApproval, onInviteMember, onReviewMember, memberRoles, blockedMembers, onBlockMember, onSetDeputy }: {
  width: number; height: number; uiScale?: number; image: string; name: string; accountName?: string; nicknameValue: string; isBlocked: boolean; isGroup?: boolean; members?: string[]; memberImages?: Record<string, string>; creatorName?: string; memberRowHeight?: number; memberListWidth?: number; selfName?: string; selfAvatarIndex?: number; onBack: () => void; onViewInfo: () => void; onSaveNickname: (nickname: string) => void; onChangeGroupImage: (image: string) => void; onToggleBlock: (blocked: boolean) => void; onDeleteConversation: () => void; onLeaveGroup: () => Promise<void>; onRenameGroup: (name: string) => Promise<void>; onTransferOwner: (name: string) => Promise<void>; onDissolveGroup: () => Promise<void>
  memberRoles: Record<string,GroupMemberRole>; blockedMembers: BlockedGroupMember[]; onBlockMember: (name: string, blocked: boolean) => Promise<void>; onSetDeputy: (name: string, enabled: boolean) => Promise<void>
  approvalRequired: boolean; pendingMembers: PendingGroupMember[]; onSetApproval: (enabled: boolean) => Promise<void>; onInviteMember: (name: string) => Promise<{pendingApproval: boolean}>; onReviewMember: (id: string, accepted: boolean) => Promise<void>
  notificationMuteDuration?: NotificationMuteDuration; onSaveNotificationMute: (duration: NotificationMuteDuration) => void
  onMemberInfo: (name: string) => void; onRemoveMember: (name: string) => Promise<void>
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
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [leavingGroup, setLeavingGroup] = useState(false)
  const [leaveError, setLeaveError] = useState('')
  const [viewingMembers, setViewingMembers] = useState(false)
  const [memberTab, setMemberTab] = useState<'members'|'leaders'|'blocked'|'pending'|'invite'>('members')
  const [membershipPending, setMembershipPending] = useState(false)
  const [memberBlockTarget, setMemberBlockTarget] = useState<{name: string; blocked: boolean}|null>(null)
  const [invitationNotice, setInvitationNotice] = useState('')
  const friends = useSocialStore(state => state.friends)
  useEffect(() => { if (viewingMembers && accountName) void useSocialStore.getState().refresh().catch(() => {}) }, [viewingMembers, accountName])
  async function inviteMember(name: string) {
    if (membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { const result=await onInviteMember(name); setInvitationNotice(result.pendingApproval ? 'Đã gửi lời mời. Vui lòng chờ chủ nhóm duyệt thành viên.' : 'Đã thêm thành viên vào nhóm.'); setMemberTab('members') }
    catch (error) { setMemberError(errorMessage(error)) } finally { setMembershipPending(false) }
  }
  async function setDeputy(name: string) {
    if (membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { await onSetDeputy(name,memberRoles[name]!=='deputy'); setMemberMenu(null) } catch(error) { setMemberError(errorMessage(error)) } finally { setMembershipPending(false) }
  }
  async function confirmMemberBlock() {
    if (!memberBlockTarget || membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { await onBlockMember(memberBlockTarget.name,memberBlockTarget.blocked); setMemberBlockTarget(null); setMemberMenu(null) } catch(error) { setMemberError(errorMessage(error)) } finally { setMembershipPending(false) }
  }
  async function reviewMember(id: string, accepted: boolean) {
    if (membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { await onReviewMember(id,accepted) } catch (error) { setMemberError(errorMessage(error)) } finally { setMembershipPending(false) }
  }
  const [memberMenu, setMemberMenu] = useState<string | null>(null)
  const memberPanelRef = useRef<HTMLElement>(null)
  const [memberMenuAnchor, setMemberMenuAnchor] = useState({ left: 0, top: 0 })
  const [friendRemoval, setFriendRemoval] = useState<string | null>(null)
  const [removingFriend, setRemovingFriend] = useState(false)
  const [skipFriendConfirmation, setSkipFriendConfirmation] = useState(false)
  async function removeFriend(name: string, skip: boolean) {
    if (removingFriend) return
    setRemovingFriend(true)
    try {
      if (useSessionStore.getState().account) await socialActionByName(name, 'remove')
      else useSessionStore.getState().setFriendship(name, false)
      setFriendRemoval(null)
      setMemberMenu(null)
    } catch (error) { setMemberError(errorMessage(error)) }
    finally { setRemovingFriend(false) }
  }
  function requestFriendRemoval(name: string) {
    setSkipFriendConfirmation(false)
    setFriendRemoval(name)
  }
  const [memberError, setMemberError] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [ownerLeaveNotice, setOwnerLeaveNotice] = useState(false)
  useEffect(() => {
    if (!memberError && !leaveError) return
    const timer = window.setTimeout(() => { setMemberError(''); setLeaveError('') }, 3000)
    return () => window.clearTimeout(timer)
  }, [memberError, leaveError])
  const [removingMember, setRemovingMember] = useState(false)
  const [memberRemoval, setMemberRemoval] = useState<string | null>(null)
  async function confirmMemberRemoval() {
    if (!memberRemoval || removingMember) return
    setRemovingMember(true)
    setMemberError('')
    try {
      await onRemoveMember(memberRemoval)
      setMemberRemoval(null)
      setMemberMenu(null)
    } catch (error) { setMemberError(errorMessage(error)) }
    finally { setRemovingMember(false) }
  }
  const [editingNotificationMute, setEditingNotificationMute] = useState(false)
  const [notificationMuteDraft, setNotificationMuteDraft] = useState<NotificationMuteDuration>(notificationMuteDuration)
  const groupAvatarInputRef = useRef<HTMLInputElement>(null)
  const canManageGroup = isGroup && Boolean(creatorName) && creatorName === selfName
  const memberRole = (member: string): GroupMemberRole => memberRoles[member] ?? (member === creatorName ? 'owner' : 'member')
  const roleOrder = { owner: 0, deputy: 1, member: 2 }
  const sortedMembers = [...members].sort((a,b)=>roleOrder[memberRole(a)]-roleOrder[memberRole(b)])
  const listedMembers = memberTab === 'leaders' ? sortedMembers.filter(member=>memberRole(member)!=='member') : sortedMembers
  function submitNickname(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSaveNickname(nicknameDraft.trim())
    setEditingNickname(false)
  }
  const avatarDiameter = width * (uiScale ? 270 : 200) / sourceWidth
  const memberViewportHeight = uiScale ? height * 0.76 : Math.min((memberRowHeight || 58) * 8, Math.max(0, height * 0.88 - 78))
  const avatarStyle: CSSProperties = {
    left: `${(isGroup ? 447.5 : 446) / sourceWidth * 100}%`,
    top: `${(isGroup ? 200 : 140) / sourceHeight * 100}%`,
    width: avatarDiameter,
    height: avatarDiameter,
    transform: 'translate(-50%, -50%)',
  }
  return <div className={`absolute inset-0 z-40 flex items-center justify-center ${uiScale ? 'bg-[#281205]' : 'bg-black/45'}`} onClick={uiScale ? undefined : onBack}>
    <div role={uiScale ? 'region' : 'dialog'} aria-modal={uiScale ? undefined : true} aria-label={`Tùy chọn với ${name}`} className="relative shrink-0" style={{ ...(uiScale ? getCrispUiLayout(uiScale) : {}), width: uiScale ? '100%' : width, height: uiScale ? '100%' : height }} onClick={event => event.stopPropagation()} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
      <CrispUiImage src={body} alt="" className="pointer-events-none absolute object-fill" style={uiScale ? { inset: 0, width: '100%', height: '100%' } : place(31, 32, 834, 948)} />
      <CrispUiImage src={scene} alt="" className="pointer-events-none absolute object-cover" style={uiScale ? place(0, 0, sourceWidth, 386) : place(31, 32, 834, 354)} />
      <div aria-hidden="true" className="pointer-events-none absolute" style={{ ...(uiScale ? place(0, 280, sourceWidth, 180) : place(31, 280, 834, 180)), background: 'linear-gradient(to bottom, transparent 0%, rgba(40, 18, 5, 0.12) 42%, rgba(40, 18, 5, 0.68) 70%, #281205 100%)' }} />
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
        <button type="button" aria-label="Đổi ảnh nhóm" onClick={() => groupAvatarInputRef.current?.click()} className={`${buttonInteraction} absolute z-20 grid place-items-center rounded-full border border-[#e7b755] bg-[#2d160a] p-1 text-[#ffe08b] shadow-[0_1px_3px_#160904]`} style={uiScale ? { left: '50%', top: `${200 / sourceHeight * 100}%`, marginLeft: avatarDiameter * 0.32, marginTop: -avatarDiameter * 0.5, width: width * 0.095, height: width * 0.095, padding: width * 0.018 } : place(499.5, 109, 48, 48)}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-full" fill="currentColor"><path d="M8 4 6 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z"/><circle cx="12" cy="13" r="4" fill="#2d160a"/><circle cx="12" cy="13" r="2.5" fill="currentColor"/></svg></button>
      </>}
      <span className="absolute z-10 w-[80%] -translate-x-1/2 truncate text-center font-heading text-[length:var(--ui-p-28)] font-bold leading-none text-[#ffe8ad]" style={{ left: `${(isGroup ? 447.5 : 447) / sourceWidth * 100}%`, top: `${(isGroup ? 315 : 316) / sourceHeight * 100}%` }}><SocialPlayerName name={name} /></span>
      {isGroup && <button type="button" aria-label="Thêm thành viên" title="Thêm thành viên" onClick={() => { setMemberTab('invite'); setViewingMembers(true) }} className={`${buttonInteraction} absolute z-20 grid place-items-center rounded-full border border-[#b8873e] bg-[#3e200e] p-[5px] text-[#f4c75e]`} style={uiScale ? {right:6,top:13,width:28,height:28} : place(774,35,64,64)}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m3-14v8m-4-4h8"/></svg></button>}
      {uiScale ? <MessagesBackButton autoFocus label="Quay lại hội thoại" onClick={onBack} size={28} className="absolute z-20" style={{ left: 6, top: 13 }} /> : <button autoFocus type="button" aria-label="Quay lại hội thoại" onClick={onBack} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={place(40, 35, 85, 77)}>
        <CrispUiImage src={back} alt="" className="block h-full w-full object-contain" />
      </button>}
      {canManageGroup && <button type="button" aria-label="Cài đặt nhóm" onClick={() => setSettingsOpen(true)} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={uiScale ? place(47, 385, 800, 90) : place(47, 388, 800, 85)}>
        <OptionRowBackground />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 3-.6 2.4-2 .9-2.2-.7-2 3.4 1.7 1.8v2.4L2.2 15l2 3.4 2.2-.7 2 .9L9 21h4l.6-2.4 2-.9 2.2.7 2-3.4-1.7-1.8v-2.4L19.8 9l-2-3.4-2.2.7-2-.9L13 3Z"/><circle cx="11" cy="12" r="3"/></svg>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-cormorant text-[length:var(--ui-p-22)] font-bold text-[#ffe8ad]">Cài đặt</span>
      </button>}
      {settingsOpen && canManageGroup && <MessagesGroupSettings name={name} members={members} selfName={selfName} onBack={() => setSettingsOpen(false)} onRename={onRenameGroup} onTransfer={onTransferOwner} onDissolve={onDissolveGroup} onOpenApproval={() => { setSettingsOpen(false); setMemberTab('pending'); setViewingMembers(true) }} />}
      {actions.filter(action => (action.image !== mute || notificationMuteEnabled) && (isGroup
        ? action.image !== info && action.image !== block && action.image !== nickname
        : action.image !== mute)).map((action, index) => {
        const actionBox = uiScale && isGroup && action.image === nickname ? [289, 388, 317, 77] : uiScale ? [47, 385 + (index + (isGroup && action.image !== nickname ? 1 : 0)) * 102, 800, 90] : isGroup
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
      }} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none ${editingNickname && (action.label === 'Xem thông tin' || action.label === 'Biệt danh') ? 'invisible' : ''}`} style={place(actionBox[0], actionBox[1] + (canManageGroup ? uiScale ? 102 : 91 : 0), actionBox[2], actionBox[3])}>
        {uiScale && !(isGroup && action.image === nickname) ? <><OptionRowBackground/><svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{action.image === info ? <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/></> : action.image === nickname ? <><path d="m4 16 12-12 4 4L8 20l-5 1Z"/><path d="m13 7 4 4"/></> : action.image === block ? <><circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/></> : action.image === deleteChat ? <><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/></> : <><path d="M5 21V3m0 1c5-3 9 3 14 0v10c-5 3-9-3-14 0"/></>}</svg><span className="absolute left-[15%] top-0 flex h-full items-center font-cormorant text-[length:var(--ui-p-22)] font-bold text-[#ffe8ad]">{actionLabel}</span></> : <>
        {!isGroup && action.image === block ? <OptionRowBackground showBlockIcon /> : <CrispUiImage src={isGroup && action.image === nickname ? blankActionButton : action.image} alt="" className={`block h-full w-full ${isGroup && action.image === nickname ? 'object-fill' : 'object-contain'}`} />}
        {!isGroup && action.image === block && <span className="absolute left-[15%] top-0 flex h-full items-center font-cormorant text-[length:var(--ui-p-22)] font-bold text-[#ffe8ad]">{actionLabel}</span>}
        {isGroup && action.image === nickname && <><svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[19%] top-[22%] h-[56%] w-[12%] text-[#f4c75e]" fill="currentColor"><path d="m17.7 2.3 4 4a1 1 0 0 1 0 1.4l-2.4 2.4-5.4-5.4 2.4-2.4a1 1 0 0 1 1.4 0ZM12.5 6.1l5.4 5.4L8 21.4 2 23l1.6-6L12.5 6.1ZM3 22h18v1H3Z" /></svg><span className="absolute left-[36%] top-0 flex h-full w-[60%] items-center justify-center font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe8ad]">Đổi tên</span></>}
        </>}
      </button>
      })}
      {isGroup && <button type="button" onClick={() => { if (canManageGroup) { setOwnerLeaveNotice(true); return } setLeaveError(""); setConfirmLeave(true) }} aria-label="Rời nhóm" className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={uiScale ? place(47, canManageGroup ? 793 : 691, 800, 90) : place(47, canManageGroup ? 854 : 763, 800, 85)}>
        <OptionRowBackground />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#ff5555]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/><path d="M10 12H3m0 0 4-4m-4 4 4 4"/></svg>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-cormorant text-[length:var(--ui-p-22)] font-bold text-[#ff5555]">Rời nhóm</span>
      </button>}
      {isGroup && <button type="button" onClick={() => { setMemberTab('members'); setViewingMembers(true) }} aria-label={`Xem thành viên (${members.length})`} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={uiScale ? place(47, canManageGroup ? 487 : 385, 800, 90) : place(47, canManageGroup ? 581 : 490, 800, 85)}>
        <OptionRowBackground />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 .17c-.29 0-.62.02-.97.05 1.16.84 1.97 1.94 1.97 3.28V19h6v-2.5c0-2.33-4.67-3.33-7-3.33Z" /></svg>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ffe8ad] [font-variant-numeric:lining-nums]">Xem thành viên (<span className="font-number">{members.length}</span>)</span>
      </button>}
      {viewingMembers && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-[6%] compact:p-[3%]">
        <section ref={memberPanelRef} role="dialog" aria-modal="true" aria-label={`Thành viên nhóm (${members.length})`} className="relative flex max-h-full max-w-full flex-col rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#4a260f,#241007)] p-4 shadow-[0_4px_18px_#120700]" style={{ width: uiScale ? '100%' : memberListWidth ?? '100%', height: uiScale ? '94%' : undefined }}>
          <div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-cormorant text-[length:var(--ui-p-22)] compact:text-[20px] font-bold text-[#ffe5a6] [font-variant-numeric:lining-nums]">{memberTab==='invite'?'Thêm thành viên':'Thành viên'} {memberTab!=='invite' && <>(<span className="font-number">{members.length}</span>)</>}</h2>{uiScale ? <DialogCloseButton onClose={() => { setViewingMembers(false); setMemberMenu(null) }} compact scale={width / 1120} positionClass="top-[12px] right-[16px]" /> : <button type="button" autoFocus onClick={() => setViewingMembers(false)} aria-label="Đóng danh sách thành viên" className={`${buttonInteraction} rounded-lg border border-[#b8873e] px-3 py-1 text-[#ffe5a6]`}>×</button>}</div>
          {memberError && <p role="alert" className="text-[14px] text-[#ffac80]">{memberError}</p>}
          {memberTab !== 'invite' && <nav role="tablist" aria-label="Danh sách thành viên nhóm" className="mb-[12px] flex min-w-0 shrink-0 gap-[8px] overflow-x-auto overscroll-x-contain whitespace-nowrap pb-[6px] text-[16px] [touch-action:pan-x]">
            {([{id:'members',label:'Tất cả'},{id:'leaders',label:'Trưởng và phó nhóm'},{id:'blocked',label:'Đã chặn'},...(canManageGroup?[{id:'pending',label:'Duyệt thành viên ('+pendingMembers.length+')'}]:[])] as const).map(tab=><button key={tab.id} role="tab" aria-selected={memberTab===tab.id} type="button" onClick={()=>{setMemberMenu(null);setMemberTab(tab.id as typeof memberTab)}} className={buttonInteraction+' shrink-0 rounded border border-[#b8873e] px-[10px] py-[8px] '+(memberTab===tab.id?'bg-[#805100] text-[#ffedac]':'bg-[#3e200e] text-[#c8aa78]')}>{tab.label}</button>)}
          </nav>}
          {(memberTab === 'members' || memberTab === 'leaders') && <ul className={`min-h-0 flex-1 overflow-y-auto pr-1 ${messageScrollbarClass}`} style={{ height: memberViewportHeight }}>{listedMembers.map(member => <li key={member} className="relative flex shrink-0 items-center gap-2 border-b border-[#79501e] px-1 py-1 font-heading text-[length:var(--ui-p-22)] compact:text-[16px] font-bold text-[#fff6df] leading-tight" style={{ height: memberViewportHeight / 8 }}>
            <button type="button" aria-label={`Xem thông tin ${member}`} onClick={() => { setMemberMenu(null); onMemberInfo(member) }} className={`${buttonInteraction} relative block size-[var(--ui-p-50)] compact:size-[40px] shrink-0 cursor-pointer border-0 bg-transparent p-0`}> 
              {accountName ? <MessageAccountAvatar name={member} /> : member === selfName ? <AvatarPortrait avatarIndex={selfAvatarIndex} className="size-full rounded-full object-contain" /> : <CrispUiImage src={memberImages[member] ?? defaultMemberAvatar} alt={`Avatar ${member}`} className="block size-full rounded-full object-contain" />}
              {memberRole(member) !== 'member' && <span role="img" aria-label={memberRole(member)==='owner'?'Trưởng nhóm · Khóa vàng':'Phó nhóm · Khóa bạc'} className="absolute -right-[var(--ui-p-2)] -bottom-[var(--ui-p-2)] z-30 grid size-[var(--ui-p-20)] place-items-center rounded-full border border-[#666666] bg-[#666666] shadow-[0_1px_2px_#1c0e07]"><svg aria-hidden="true" viewBox="0 0 24 24" className={'size-[var(--ui-p-13)] '+(memberRole(member)==='owner'?'text-[#FBD65B]':'text-[#d7dee8]')} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="8" r="5" /><path d="m12.5 11.5-9 9H7v-4h4v-4" /></svg></span>}
            </button>
            <span className="min-w-0 flex-1 truncate"><SocialPlayerName name={member} /></span>
            {member !== selfName && (canManageGroup ? <button type="button" aria-label={`Tùy chọn thành viên ${member}`} aria-expanded={memberMenu === member} onClick={event => { const button = event.currentTarget.getBoundingClientRect(); const panel = memberPanelRef.current?.getBoundingClientRect(); if (panel) setMemberMenuAnchor({ left: button.left - panel.left - 8, top: button.top - panel.top + button.height / 2 }); setMemberError(''); setMemberMenu(current => current === member ? null : member) }} className={`${buttonInteraction} grid h-[32px] w-[28px] shrink-0 place-items-center border-0 bg-transparent p-0 text-[24px] leading-none text-[#ffe5a6]`}>...</button> : null)}
          </li>)}</ul>}
          {memberTab === 'blocked' && <div className="min-h-0 flex-1 overflow-y-auto text-[16px]">{blockedMembers.length===0&&<p>Chưa có thành viên bị chặn.</p>}{blockedMembers.map(member=><div key={member.id} className="flex min-h-[54px] items-center gap-[10px] border-b border-[#79501e] py-[8px]"><button type="button" aria-label={'Xem thông tin '+member.name} onClick={()=>onMemberInfo(member.name)} className="size-[var(--ui-p-50)] compact:size-[40px] shrink-0 border-0 bg-transparent p-0"><MessageAccountAvatar name={member.name}/></button><span className="min-w-0 flex-1"><SocialPlayerName name={member.name}/></span>{canManageGroup&&<button type="button" disabled={membershipPending} onClick={()=>{setMemberError('');setMemberBlockTarget({name:member.name,blocked:false})}} className={buttonInteraction+' shrink-0 rounded border border-[#b8873e] px-[8px] py-[6px] text-[#f4c75e] disabled:opacity-50'}>Bỏ chặn</button>}</div>)}</div>}
          {memberTab === 'pending' && canManageGroup && <div className="min-h-0 flex-1 overflow-y-auto text-[16px]"><label className="mb-[14px] flex items-center justify-between gap-[12px] border-b border-[#79501e] pb-[12px] text-[16px]"><span>Bật duyệt thành viên</span><input type="checkbox" role="switch" aria-label="Bật duyệt thành viên" checked={approvalRequired} disabled={membershipPending} onChange={event=>{const enabled=event.target.checked;if(membershipPending)return;setMembershipPending(true);void onSetApproval(enabled).catch(error=>setMemberError(errorMessage(error))).finally(()=>setMembershipPending(false))}} className="size-[24px] accent-[#d8ac35]"/></label>{pendingMembers.length===0 && <p>Chưa có thành viên chờ duyệt.</p>}{pendingMembers.map(member=><div key={member.id} className="flex items-center gap-[8px] border-b border-[#79501e] py-[12px]"><div className="min-w-0 flex-1"><NumberText text={member.name} compact weight="normal" soften={false}/><p className="text-[14px] text-[#c8aa78]">Người mời: <NumberText text={member.inviterName} compact weight="normal" soften={false}/></p></div><button type="button" disabled={membershipPending} aria-label={'Từ chối '+member.name} onClick={()=>{void reviewMember(member.id,false)}} className={buttonInteraction+' size-[38px] rounded border border-[#b8873e] text-[26px] text-[#ff9b9b] disabled:opacity-50'}>×</button><button type="button" disabled={membershipPending} aria-label={'Duyệt '+member.name} onClick={()=>{void reviewMember(member.id,true)}} className={buttonInteraction+' size-[38px] rounded border border-[#b8873e] text-[26px] text-[#e8cb6e] disabled:opacity-50'}>✓</button></div>)}</div>}
          {memberTab === 'invite' && <div className="min-h-0 flex-1 overflow-y-auto text-[16px]">{friends.filter(friend=>friend.status==='accepted'&&!members.includes(friend.name)).map(friend=><button key={friend.id} type="button" disabled={membershipPending} onClick={()=>{void inviteMember(friend.name)}} className={buttonInteraction+' flex min-h-[50px] w-full items-center justify-between gap-[8px] border-b border-[#79501e] bg-transparent py-[10px] text-left disabled:opacity-50'}><NumberText text={friend.name} compact weight="normal" soften={false}/><span className="text-[24px] text-[#f4c75e]">+</span></button>)}{!friends.some(friend=>friend.status==='accepted'&&!members.includes(friend.name))&&<p>Chưa có bạn bè có thể thêm vào nhóm.</p>}</div>}
          {memberMenu && canManageGroup && <button type="button" aria-label="Đóng menu thành viên" onClick={() => setMemberMenu(null)} className="absolute inset-0 z-[35] cursor-default border-0 bg-transparent p-0" />}
          {memberMenu && canManageGroup && <div role="group" aria-label={`Tùy chọn thành viên ${memberMenu}`} style={{ left: memberMenuAnchor.left, top: memberMenuAnchor.top, transform: 'translate(-100%, -50%)' }} className="absolute z-40 flex flex-col items-start whitespace-nowrap rounded-lg border border-[#b8873e] bg-[#321705] p-[10px] shadow-lg">
            <button type="button" disabled={membershipPending} onClick={()=>{void setDeputy(memberMenu)}} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ffe5a6] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] text-[#d7dee8]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="8" r="5"/><path d="m12 12-9 9h4v-4h4v-4"/></svg>{memberRole(memberMenu)==='deputy'?'Gỡ phó nhóm':'Phong phó nhóm'}</button>
            <button type="button" disabled={membershipPending} onClick={()=>{setMemberError('');setMemberBlockTarget({name:memberMenu,blocked:!blockedMembers.some(member=>member.name===memberMenu)});setMemberMenu(null)}} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ffe5a6] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/></svg>{blockedMembers.some(member=>member.name===memberMenu)?'Bỏ chặn thành viên':'Chặn thành viên'}</button>
            <hr className="my-[8px] w-full border-0 border-t border-[#b8873e]/60"/>
            <button type="button" disabled={removingMember||membershipPending||memberMenu===creatorName} onClick={()=>{setMemberError('');setMemberRemoval(memberMenu);setMemberMenu(null)}} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ff5555] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>Xóa khỏi nhóm</button>
          </div>}
          {memberBlockTarget && <MessagesFriendRemovalConfirmation name={memberBlockTarget.name} skip={false} onSkipChange={()=>{}} pending={membershipPending} error={memberError} message={memberBlockTarget.blocked?'Chặn chat và mời thành viên của '+memberBlockTarget.name+' trong nhóm này? Người chơi vẫn ở trong nhóm.':'Bỏ chặn chat và mời thành viên cho '+memberBlockTarget.name+'?'} onCancel={()=>{if(!membershipPending)setMemberBlockTarget(null)}} onConfirm={()=>{void confirmMemberBlock()}}/>}
          {memberRemoval && <MessagesFriendRemovalConfirmation name={memberRemoval} message={`Bạn có chắc muốn xóa ${memberRemoval} khỏi nhóm không?`} showSkip={false} skip={false} onSkipChange={() => {}} pending={removingMember} error={memberError} onCancel={() => { if (!removingMember) setMemberRemoval(null) }} onConfirm={() => { void confirmMemberRemoval() }}/>}
          {friendRemoval && <MessagesFriendRemovalConfirmation pending={removingFriend} error={memberError} name={friendRemoval} skip={skipFriendConfirmation} onSkipChange={setSkipFriendConfirmation} onCancel={() => { if (!removingFriend) setFriendRemoval(null) }} onConfirm={() => { void removeFriend(friendRemoval, skipFriendConfirmation) }}/>}
        </section>
      </div>}
      {editingNickname && <form onSubmit={submitNickname} aria-label="Đặt biệt danh" className="absolute z-20 flex items-center gap-2 rounded-lg border-2 border-[#e7b755] bg-[linear-gradient(135deg,#4a260f,#241007)] px-2 shadow-[0_2px_8px_#120700]" style={uiScale ? { ...place(47, 380, 800, 100), minHeight: 58 } : place(106, 388, 682, 77)}>
        <input autoFocus aria-label={isGroup ? 'Tên nhóm' : 'Biệt danh'} value={nicknameDraft} onChange={event => setNicknameDraft(event.target.value)} maxLength={32} placeholder={isGroup ? 'Nhập tên' : 'Nhập biệt danh'} className={uiScale ? `h-[44px] px-[10px] ${messagesFriendsField} ${messagesFriendsInput}` : 'h-[70%] min-w-0 flex-1 rounded-md border border-[#b8873e] bg-[#1c0e07] px-2 text-[length:var(--ui-p-18)] text-[#fff6df] outline-none placeholder:text-[#c8aa78]'} />
        <button type="button" onClick={() => setEditingNickname(false)} className={`${buttonInteraction} ${uiScale ? 'h-[40px] min-w-[44px] px-[8px] text-[16px]' : ''} shrink-0 rounded-md border border-[#b8873e] bg-[#3e200e] px-2 text-[length:var(--ui-p-16)] text-[#ffe5a6]`}>Hủy</button>
        <button type="submit" className={`${buttonInteraction} ${uiScale ? 'h-[40px] min-w-[44px] px-[8px] text-[16px]' : ''} shrink-0 rounded-md border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-3 text-[length:var(--ui-p-16)] font-bold text-[#fff2c8]`}>OK</button>
      </form>}
      {invitationNotice && <NoticeOverlay onDismiss={() => setInvitationNotice('')} className="flex items-center justify-center bg-black/60 p-5"><section role="alertdialog" aria-modal="true" aria-label="Thông báo mời thành viên" className={`${messagesConfirmationSize} w-full max-w-[420px] rounded-xl border-2 border-[#e7b755] bg-[#30271e] p-5 text-center text-[#ffe5a6]`}><div className={messagesConfirmationBody}><p>{invitationNotice}</p></div><button autoFocus type="button" onClick={() => setInvitationNotice('')} className={`${mobileNoticeButtonStyle} ${buttonInteraction} mx-auto mt-4 rounded-lg border border-[#d8ac35] bg-[#805100] px-5 py-2`}>Đóng</button></section></NoticeOverlay>}
      {ownerLeaveNotice && <NoticeOverlay onDismiss={() => setOwnerLeaveNotice(false)} className="flex items-center justify-center bg-black/60 p-5"><section role="alertdialog" aria-modal="true" aria-label="Chuyển khóa vàng trước khi rời nhóm" className={`${messagesConfirmationSize} w-full max-w-[420px] rounded-xl border-2 border-[#e7b755] bg-[#30271e] p-5 text-center text-[#ffe5a6]`}><div className={messagesConfirmationBody}><p>Vui lòng chuyển khóa vàng cho người khác trước khi rời nhóm.</p></div><button autoFocus type="button" onClick={() => setOwnerLeaveNotice(false)} className={`${mobileNoticeButtonStyle} ${buttonInteraction} mx-auto mt-4 rounded-lg border border-[#d8ac35] bg-[#805100] px-5 py-2`}>Đóng</button></section></NoticeOverlay>}
      {confirmLeave && <MessagesFriendRemovalConfirmation name={name} message={`Bạn có chắc muốn rời nhóm “${name}” không?`} skip={false} onSkipChange={() => {}} pending={leavingGroup} error={leaveError} onCancel={() => { if (!leavingGroup) setConfirmLeave(false) }} onConfirm={() => { if (leavingGroup) return; setLeavingGroup(true); setLeaveError(""); void onLeaveGroup().then(() => setConfirmLeave(false)).catch(error => setLeaveError(errorMessage(error))).finally(() => setLeavingGroup(false)) }} />}
      {confirmBlock && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/65 p-6">
        <section role="alertdialog" aria-modal="true" aria-labelledby="messages-block-confirmation-title" className={`${messagesConfirmationSize} w-[82%] rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#54290f,#241007)] px-5 py-4 text-center shadow-[0_4px_18px_#120700]`}>
          <div className={messagesConfirmationBody}><p id="messages-block-confirmation-title" className="font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe5a6]">Muốn {isBlocked ? 'bỏ chặn' : 'chặn'} người chơi <NumberText text={name} compact weight="normal" soften={false} />?</p></div>
          <div className={`mt-4 flex justify-center gap-4 ${messagesConfirmationActions}`}>
            <button type="button" onClick={() => setConfirmBlock(false)} className={`${mobileNoticeButtonStyle} ${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#b8873e] bg-[#3e200e] px-4 py-2 text-[length:var(--ui-p-18)] text-[#ffe5a6]`}>Hủy</button>
            <button type="button" onClick={() => { onToggleBlock(!isBlocked); setConfirmBlock(false) }} className={`${mobileNoticeButtonStyle} ${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-4 py-2 text-[length:var(--ui-p-18)] font-bold text-[#fff2c8]`}>Đồng ý</button>
          </div>
        </section>
      </div>}
      {editingNotificationMute && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/65 p-6">
        <form role="dialog" aria-modal="true" aria-labelledby="messages-mute-title" className={`${messagesConfirmationSize} w-[88%] rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#54290f,#241007)] px-5 py-4 shadow-[0_4px_18px_#120700]`} onSubmit={event => {
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
          <div className={`mt-4 flex justify-center gap-4 ${messagesConfirmationActions}`}>
            <button type="button" onClick={() => setEditingNotificationMute(false)} className={`${mobileNoticeButtonStyle} ${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#b8873e] bg-[#3e200e] px-4 py-2 text-[length:var(--ui-p-18)] text-[#ffe5a6]`}>Hủy</button>
            <button type="submit" className={`${mobileNoticeButtonStyle} ${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-4 py-2 text-[length:var(--ui-p-18)] font-bold text-[#fff2c8]`}>OK</button>
          </div>
        </form>
      </div>}
      {confirmDelete && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/65 p-6">
        <section role="alertdialog" aria-modal="true" aria-labelledby="messages-delete-confirmation-title" className={`${messagesConfirmationSize} w-[88%] rounded-xl border-2 border-[#e7b755] bg-[linear-gradient(145deg,#54290f,#241007)] px-5 py-4 text-center shadow-[0_4px_18px_#120700]`}>
          <div className={messagesConfirmationBody}><p id="messages-delete-confirmation-title" className="font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe5a6]">Xóa toàn bộ tin nhắn?</p>
          <p className="mt-2 text-[length:var(--ui-p-16)] text-[#e2c79f]">Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn.</p></div>
          <div className={`mt-4 flex justify-center gap-4 ${messagesConfirmationActions}`}>
            <button type="button" onClick={() => setConfirmDelete(false)} className={`${mobileNoticeButtonStyle} ${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#b8873e] bg-[#3e200e] px-4 py-2 text-[length:var(--ui-p-18)] text-[#ffe5a6]`}>Hủy</button>
            <button type="button" onClick={onDeleteConversation} className={`${mobileNoticeButtonStyle} ${buttonInteraction} min-w-[var(--ui-p-96)] rounded-lg border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] px-4 py-2 text-[length:var(--ui-p-18)] font-bold text-[#fff2c8]`}>Đồng ý</button>
          </div>
        </section>
      </div>}
      {!uiScale && <CrispUiImage src={frame} alt="" className="pointer-events-none absolute inset-0 block h-full w-full object-fill" />}
    </div>
  </div>
}




