import { SettingsIcon } from './SettingsIcon'
import { GroupCheckbox } from './GroupCheckbox'
import { confirmationDialogFrame, confirmationDialogTitle, confirmationDialogDescription, confirmationDialogActions, confirmationDialogOverlay } from '../../../lib/confirmationDialogStyles'
import { confirmationCancelButton, confirmationAcceptButton } from '../../../lib/confirmationButtonStyles'
import { SearchIcon } from './SearchIcon'
import { useSocialStore } from '../../../store/socialStore'
import type { PendingGroupMember, BlockedGroupMember, GroupMemberRole } from '../hooks/useDatabaseMessages'
import { MessagesGroupSettings } from './MessagesGroupSettings'
import { NoticeOverlay } from './NoticeOverlay'
import { oneChoiceNoticePanel, oneChoiceNoticeButton } from './OneChoiceNoticeStyles'

import { messagesConfirmationBody } from './messagesConfirmationStyles'
import { messagesFriendsField, messagesFriendsInput } from './messagesInputStyles'
import { socialActionByName } from '../../../store/socialStore'
import { MessagesMemberFriendButton } from './MessagesMemberFriendButton'
import { ConfirmationName, MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
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
import { sharedRankEloFromStats } from '../../../lib/rankProgression'
import { AvatarFrameOverlay } from '../../game/components/AvatarFrameOverlay'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { getAvatarFrame } from '../../../lib/avatarFrames'
import picolozzAvatar from '../../../assets/messages/avatar-picolozz.png'
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

function BlockedMemberBadge() {
  return <span role="img" aria-label="Đã chặn chat và mời" className="absolute -right-[var(--ui-p-2)] -bottom-[var(--ui-p-2)] z-30 grid size-[var(--ui-p-20)] place-items-center rounded-full border border-[#666666] bg-[#666666] shadow-[0_1px_2px_#1c0e07]"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-13)] text-[#ff5555]" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="m4 20 16-16"/></svg></span>
}

export function MessagesOptionsPanel({ width, height, uiScale, image, name, accountName, nicknameValue, isBlocked, isGroup = false, members = [], memberImages = {}, creatorName, memberRowHeight, memberListWidth, selfName, selfAvatarIndex = 0, notificationMuteDuration = 1, onSaveNotificationMute, onBack, onViewInfo, onMemberInfo, onRemoveMember, onSaveNickname, onChangeGroupImage, onToggleBlock, onDeleteConversation, onLeaveGroup, onRenameGroup, onTransferOwner, onDissolveGroup, approvalRequired, pendingMembers, onSetApproval, onInviteMember, onReviewMember, memberRoles, blockedMembers, onBlockMember, onSetDeputy, chatDisabled, deputyChatAllowed, onSetChat }: {
  width: number; height: number; uiScale?: number; image: string; name: string; accountName?: string; nicknameValue: string; isBlocked: boolean; isGroup?: boolean; members?: string[]; memberImages?: Record<string, string>; creatorName?: string; memberRowHeight?: number; memberListWidth?: number; selfName?: string; selfAvatarIndex?: number; onBack: () => void; onViewInfo: () => void; onSaveNickname: (nickname: string) => void; onChangeGroupImage: (image: string) => void; onToggleBlock: (blocked: boolean) => void; onDeleteConversation: () => void; onLeaveGroup: () => Promise<void>; onRenameGroup: (name: string) => Promise<void>; onTransferOwner: (name: string) => Promise<void>; onDissolveGroup: () => Promise<void>
  chatDisabled:boolean;deputyChatAllowed:boolean;onSetChat:(disabled:boolean,deputyAllowed:boolean)=>Promise<void>
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
  // The chat badge tier is shared across variants and follows the higher Elo; own chats without the DB profile keep the live session Elo.
  const elo = profile ? sharedRankEloFromStats(profile.stats) : (ownProfile ? ownElo : 1000)
  const [editingGroupName,setEditingGroupName]=useState(false)
  const [groupNamePending,setGroupNamePending]=useState(false)
  const [editingNickname, setEditingNickname] = useState(false)
  const [nicknameDraft, setNicknameDraft] = useState(nicknameValue)
  const [confirmBlock, setConfirmBlock] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [leavingGroup, setLeavingGroup] = useState(false)
  const [leaveError, setLeaveError] = useState('')
  const [viewingMembers, setViewingMembers] = useState(false)
  useEffect(()=>{setMemberSearchOpen(false);setMemberSearch('')},[viewingMembers])
  const [memberSearchOpen,setMemberSearchOpen] = useState(false)
  const [memberSearch,setMemberSearch] = useState('')
  const matchesMember = (name: string) => name.toLocaleLowerCase('vi').includes(memberSearch.trim().toLocaleLowerCase('vi'))
  const [memberTab, setMemberTab] = useState<'members'|'leaders'|'blocked'|'pending'|'invite'|'deputy'>('members')
  const [membershipPending, setMembershipPending] = useState(false)
  const [approvalChecked,setApprovalChecked]=useState(approvalRequired)
  useEffect(()=>{if(!membershipPending)setApprovalChecked(approvalRequired)},[approvalRequired,membershipPending])
  const [roleTarget,setRoleTarget] = useState<{name:string;role:'owner'|'deputy'|'member'}|null>(null)
  function memberErrorMessage(error: unknown) { const message=errorMessage(error); return /thao tác quá nhanh/i.test(message)?'':message }
  const [memberBlockTarget, setMemberBlockTarget] = useState<{name: string; blocked: boolean}|null>(null)
  const [invitationNotice, setInvitationNotice] = useState('')
  const [reportNotice, setReportNotice] = useState(false)
  const friends = useSocialStore(state => state.friends)
  useEffect(() => { if (viewingMembers && accountName) void useSocialStore.getState().refresh().catch(() => {}) }, [viewingMembers, accountName])
  async function inviteMember(name: string) {
    if (membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { await onInviteMember(name); setInvitationNotice('Đã gửi lời mời vào nhóm.'); setMemberTab('members') }
    catch (error) { setMemberError(memberErrorMessage(error)) } finally { setMembershipPending(false) }
  }
  function setDeputy(name: string) {
    setMemberError('');setRoleTarget({name,role:memberRoles[name]==='deputy'?'member':'deputy'});setMemberMenu(null)
  }
  async function confirmRoleChange() {
    if (!roleTarget || membershipPending) return
    setMembershipPending(true);setMemberError('')
    try {
      if(roleTarget.role==='owner')await onTransferOwner(roleTarget.name)
      else await onSetDeputy(roleTarget.name,roleTarget.role==='deputy')
      setRoleTarget(null);setMemberMenu(null);setMemberTab('leaders')
    } catch(error) {setMemberError(memberErrorMessage(error))} finally {setMembershipPending(false)}
  }
  async function confirmMemberBlock() {
    if (!memberBlockTarget || membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { await onBlockMember(memberBlockTarget.name,memberBlockTarget.blocked); setMemberBlockTarget(null); setMemberMenu(null) } catch(error) { setMemberError(memberErrorMessage(error)) } finally { setMembershipPending(false) }
  }
  async function reviewMember(id: string, accepted: boolean) {
    if (membershipPending) return
    setMembershipPending(true); setMemberError('')
    try { await onReviewMember(id,accepted) } catch (error) { setMemberError(memberErrorMessage(error)) } finally { setMembershipPending(false) }
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
    } catch (error) { setMemberError(memberErrorMessage(error)) }
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
    } catch (error) { setMemberError(memberErrorMessage(error)) }
    finally { setRemovingMember(false) }
  }
  const [editingNotificationMute, setEditingNotificationMute] = useState(false)
  const [notificationMuteDraft, setNotificationMuteDraft] = useState<NotificationMuteDuration>(notificationMuteDuration)
  const groupAvatarInputRef = useRef<HTMLInputElement>(null)
  const canManageGroup = isGroup && Boolean(creatorName) && creatorName === selfName
  const canViewManagementTabs = canManageGroup || memberRoles[selfName ?? ''] === 'deputy'
  useEffect(()=>{if(!canViewManagementTabs && memberTab!=='members' && memberTab!=='invite')setMemberTab('members')},[canViewManagementTabs,memberTab])
  const memberRole = (member: string): GroupMemberRole => memberRoles[member] ?? (member === creatorName ? 'owner' : 'member')
  const roleOrder = { owner: 0, deputy: 1, member: 2 }
  const sortedMembers = [...members].sort((a,b)=>roleOrder[memberRole(a)]-roleOrder[memberRole(b)])
  const listedMembers = sortedMembers.filter(member=>matchesMember(member) && (memberTab !== 'leaders' || memberRole(member)!=='member'))
  function submitNickname(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSaveNickname(nicknameDraft.trim())
    setEditingNickname(false)
  }
  const avatarDiameter = width * (uiScale ? 270 : 180) / sourceWidth
  const memberViewportHeight = uiScale ? height * 0.76 : Math.min((memberRowHeight || 58) * 8, Math.max(0, height * 0.88 - 78))
  const avatarStyle: CSSProperties = {
    left: `${(isGroup ? 447.5 : 446) / sourceWidth * 100}%`,
    top: `${(isGroup ? 200 : 140) / sourceHeight * 100}%`,
    width: avatarDiameter,
    height: avatarDiameter,
    transform: 'translate(-50%, -50%)',
  }
  return <div className={`inset-0 z-40 flex items-center justify-center [-webkit-tap-highlight-color:transparent] [&_button:disabled]:opacity-100 [&_input:disabled]:opacity-100 ${uiScale ? 'absolute bg-[#281205]' : 'fixed bg-transparent'}`}>
    <div role={uiScale ? 'region' : 'dialog'} aria-modal={uiScale ? undefined : true} aria-label={`Tùy chọn với ${name}`} className={`relative shrink-0 ${uiScale ? '' : 'rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-4 shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]'}`} style={{ ...getCrispUiLayout(uiScale ?? width / sourceWidth), ...(!uiScale ? { '--ui-p-22': `${28 * width / sourceWidth}px`, '--ui-p-28': `${40 * width / sourceWidth}px`, '--ui-p-34': `${42 * width / sourceWidth}px` } : {}), width: uiScale ? '100%' : width, height: uiScale ? '100%' : height } as CSSProperties} onClick={event => event.stopPropagation()} onKeyDown={event => {
      if (event.key !== 'Tab') return
      const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }}>
      {!uiScale && <CrispUiImage src={body} alt="" className="pointer-events-none absolute inset-[3%] block h-[94%] w-[94%] rounded-lg object-fill" />}
      {uiScale && <CrispUiImage src={body} alt="" className="pointer-events-none absolute object-fill" style={{ inset: 0, width: '100%', height: '100%' }} />}
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
        <button data-ui-selection-sound type="button" aria-label="Đổi ảnh nhóm" onClick={() => groupAvatarInputRef.current?.click()} className={`${buttonInteraction} absolute z-20 grid place-items-center rounded-full border border-[#e7b755] bg-[#2d160a] p-1 text-[#ffe08b] shadow-[0_1px_3px_#160904]`} style={uiScale ? { left: '50%', top: `${200 / sourceHeight * 100}%`, marginLeft: avatarDiameter * 0.32, marginTop: -avatarDiameter * 0.5, width: width * 0.095, height: width * 0.095, padding: width * 0.018 } : place(489.5, 119, 48, 48)}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-full" fill="currentColor"><path d="M8 4 6 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z"/><circle cx="12" cy="13" r="4" fill="#2d160a"/><circle cx="12" cy="13" r="2.5" fill="currentColor"/></svg></button>
      </>}
      <span className="absolute z-10 w-[80%] -translate-x-1/2 text-center font-heading text-[length:var(--ui-p-28)] font-bold leading-none text-[#ffe8ad]" style={{ left: `${(isGroup ? 447.5 : 447) / sourceWidth * 100}%`, top: `${(isGroup ? 315 : 316) / sourceHeight * 100}%` }}><span className="relative inline-block max-w-[calc(100%-60px)] align-top"><span className="block truncate"><SocialPlayerName name={name} /></span>{canManageGroup&&<button data-ui-selection-sound type="button" aria-label="Đổi tên nhóm" onClick={()=>{setNicknameDraft(name);setMemberError('');setEditingGroupName(true)}} className={buttonInteraction+' absolute left-[calc(100%+8px)] top-1/2 size-[22px] -translate-y-1/2 border-0 bg-transparent p-0 text-[#f4c75e]'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m4 16 12-12 4 4L8 20l-5 1ZM13 7l4 4"/></svg></button>}</span></span>
      <MessagesBackButton autoFocus label="Quay lại hội thoại" onClick={onBack} size={uiScale ? 28 : 38} className="absolute z-20" style={uiScale ? { left: 6, top: 13 } : { left: '6%', top: '5%' }} />
      {!uiScale && <DialogCloseButton onClose={onBack} scale={width / sourceWidth} compact={false} positionClass="top-0 right-0" zIndex={100} />}
      {canManageGroup && <button data-ui-selection-sound type="button" aria-label="Cài đặt nhóm" onClick={() => setSettingsOpen(true)} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={uiScale ? place(47, 385, 800, 90) : place(47, 385, 800, 90)}>
        <OptionRowBackground />
        <SettingsIcon className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]"/>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ffe8ad]">Cài đặt</span>
      </button>}
      {settingsOpen && canManageGroup && <div className={uiScale ? 'contents' : 'absolute inset-[3%] z-30 overflow-hidden rounded-lg'}><MessagesGroupSettings compact={Boolean(uiScale)} name={name} onBack={()=>setSettingsOpen(false)} onDissolve={onDissolveGroup} chatDisabled={chatDisabled} deputyChatAllowed={deputyChatAllowed} onSetChat={onSetChat}/></div>}
      {actions.filter(action => (action.image !== mute || notificationMuteEnabled) && (isGroup
        ? action.image !== info && action.image !== block && action.image !== nickname
        : action.image !== mute)).map((action, index) => {
        const actionBox = uiScale && isGroup && action.image === nickname ? [289, 388, 317, 77] : uiScale ? [47, 385 + (index + (isGroup && action.image !== nickname ? 1 : 0)) * 102, 800, 90] : isGroup
          ? [47, 385 + (index + (canManageGroup ? 2 : 1)) * 98, 800, 90]
          : [47, 385 + index * 102, 800, 90]
        const actionLabel = isGroup && action.image === nickname ? 'Đổi tên' : !isGroup && action.image === block && isBlocked ? 'Bỏ chặn' : action.label
        return <button data-ui-selection-sound key={action.label} type="button" aria-label={actionLabel} onClick={() => {
        if (action.label === 'Xem thông tin') onViewInfo()
        if (action.image === report) setReportNotice(true)
        if (action.label === 'Biệt danh') { setNicknameDraft(nicknameValue); setEditingNickname(true) }
        if (action.image === block) setConfirmBlock(true)
        if (action.image === mute) { setNotificationMuteDraft(notificationMuteDuration); setEditingNotificationMute(true) }
        if (action.label === 'Xóa cuộc trò chuyện') setConfirmDelete(true)
      }} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none ${editingNickname && (action.label === 'Biệt danh' || Boolean(uiScale) && action.label === 'Xem thông tin') ? 'invisible' : ''}`} style={place(actionBox[0], actionBox[1] + (canManageGroup && uiScale ? 102 : 0), actionBox[2], actionBox[3])}>
        {!(isGroup && action.image === nickname) ? <><OptionRowBackground/><svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{action.image === info ? <><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/></> : action.image === nickname ? <><path d="m4 16 12-12 4 4L8 20l-5 1Z"/><path d="m13 7 4 4"/></> : action.image === block ? <><circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/></> : action.image === deleteChat ? <><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/></> : <><path d="M5 21V3m0 1c5-3 9 3 14 0v10c-5 3-9-3-14 0"/></>}</svg><span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ffe8ad]">{actionLabel}</span></> : <>
        {!isGroup && action.image === block ? <OptionRowBackground showBlockIcon /> : <CrispUiImage src={isGroup && action.image === nickname ? blankActionButton : action.image} alt="" className={`block h-full w-full ${isGroup && action.image === nickname ? 'object-fill' : 'object-contain'}`} />}
        {!isGroup && action.image === block && <span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ffe8ad]">{actionLabel}</span>}
        {isGroup && action.image === nickname && <><svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[19%] top-[22%] h-[56%] w-[12%] text-[#f4c75e]" fill="currentColor"><path d="m17.7 2.3 4 4a1 1 0 0 1 0 1.4l-2.4 2.4-5.4-5.4 2.4-2.4a1 1 0 0 1 1.4 0ZM12.5 6.1l5.4 5.4L8 21.4 2 23l1.6-6L12.5 6.1ZM3 22h18v1H3Z" /></svg><span className="absolute left-[36%] top-0 flex h-full w-[60%] items-center justify-center font-cormorant text-[length:var(--ui-p-24)] font-bold text-[#ffe8ad]">Đổi tên</span></>}
        </>}
      </button>
      })}
      {isGroup && <button data-ui-selection-sound type="button" onClick={() => { if (canManageGroup) { setOwnerLeaveNotice(true); return } setLeaveError(""); setConfirmLeave(true) }} aria-label="Rời nhóm" className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={uiScale ? place(47, canManageGroup ? 793 : 691, 800, 90) : place(47, canManageGroup ? 777 : 679, 800, 90)}>
        <OptionRowBackground />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#ff5555]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/><path d="M10 12H3m0 0 4-4m-4 4 4 4"/></svg>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ff5555]">Rời nhóm</span>
      </button>}
      {isGroup && <button data-ui-selection-sound type="button" onClick={() => { setMemberTab('members'); setViewingMembers(true) }} aria-label={`Xem thành viên (${members.length})`} className={`${buttonInteraction} absolute m-0 border-0 bg-transparent p-0 leading-none`} style={uiScale ? place(47, canManageGroup ? 487 : 385, 800, 90) : place(47, canManageGroup ? 483 : 385, 800, 90)}>
        <OptionRowBackground />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-[4%] top-1/2 size-[var(--ui-p-34)] -translate-y-1/2 text-[#f4c75e]" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 .17c-.29 0-.62.02-.97.05 1.16.84 1.97 1.94 1.97 3.28V19h6v-2.5c0-2.33-4.67-3.33-7-3.33Z" /></svg>
        <span className="absolute left-[15%] top-0 flex h-full items-center font-number text-[length:var(--ui-p-22)] font-normal text-[#ffe8ad] [font-variant-numeric:lining-nums]">Xem thành viên (<span className="font-number">{members.length}</span>)</span>
      </button>}
      {viewingMembers && <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden rounded-lg bg-[#281205]" style={uiScale ? undefined : { inset: '3%' }}>
        <section ref={memberPanelRef} role="dialog" aria-modal="true" aria-label={`Thành viên nhóm (${members.length})`} className="relative flex h-full w-full min-h-0 flex-col bg-[#281205] p-[20px]" style={uiScale ? undefined : { '--ui-p-50': `${64 * width / sourceWidth}px`, '--ui-p-22': `${32 * width / sourceWidth}px`, '--member-name-size': `${32 * width / sourceWidth}px`, '--member-heading-size': `${36 * width / sourceWidth}px` } as CSSProperties}>
          <div className="mb-[12px] flex h-[36px] shrink-0 items-center justify-between gap-[12px]">
            <MessagesBackButton size={uiScale ? 28 : 38} label="Quay lại tùy chọn nhóm" onClick={()=>{if(memberTab==='invite'||memberTab==='pending')setMemberTab('members');else if(memberTab==='deputy')setMemberTab('leaders');else {setViewingMembers(false);setMemberMenu(null)} }}/>
            <div className="flex min-w-0 flex-1 items-center justify-end gap-[12px]">
              {memberSearchOpen && <label className={`flex h-[36px] min-w-0 flex-1 items-center px-[10px] ${messagesFriendsField}`}><input aria-label="Tìm thành viên theo tên" placeholder="Tìm tên thành viên..." value={memberSearch} onChange={event=>setMemberSearch(event.target.value)} className={`w-full ${messagesFriendsInput}`}/></label>}
              <button data-ui-selection-sound type="button" aria-label="Tìm kiếm thành viên" aria-expanded={memberSearchOpen} onClick={()=>{setMemberSearchOpen(open=>!open);setMemberSearch('')}} className={buttonInteraction+' size-[24px] shrink-0 border-0 bg-transparent p-0 text-[#f4c75e]'}><SearchIcon className="size-full" /></button>
              {isGroup && <button data-ui-selection-sound type="button" aria-label="Thêm bạn vào nhóm" onClick={()=>{setMemberSearch('');setMemberTab('invite')}} className={buttonInteraction+' size-[24px] shrink-0 border-0 bg-transparent p-0 text-[#f4c75e]'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m3-14v8m-4-4h8"/></svg></button>}
            </div>
          </div>
          {memberTab !== 'invite' && memberTab !== 'pending' && memberTab !== 'deputy' && <nav role="tablist" aria-label="Danh sách thành viên nhóm" className="flex min-w-0 shrink-0 gap-[16px] overflow-x-auto overscroll-x-contain whitespace-nowrap border-b border-[#79501e] text-[16px] [touch-action:pan-x]">
            {([{id:'members',label:'Tất cả'},...(canViewManagementTabs?[{id:'leaders' as const,label:'Trưởng và phó nhóm'},{id:'blocked' as const,label:'Đã chặn'}]:[])] as const).map(tab=><button data-ui-selection-sound key={tab.id} role="tab" aria-selected={memberTab===tab.id} type="button" onClick={()=>{setMemberMenu(null);setMemberTab(tab.id)}} className={buttonInteraction+' shrink-0 border-0 border-b-2 border-solid bg-transparent px-[4px] py-[12px] '+(memberTab===tab.id?'border-b-[#f4c75e] text-[#f4c75e]':'border-b-transparent text-[#c8aa78]')}>{tab.label}</button>)}
          </nav>}
          {canManageGroup && memberTab === 'members' && <button data-ui-selection-sound type="button" aria-haspopup="true" onClick={()=>{setMemberMenu(null);setMemberTab('pending')}} className={buttonInteraction+' flex w-full shrink-0 items-center justify-between border-0 border-b border-solid border-b-[#79501e] bg-transparent px-[4px] py-[12px] text-left text-[16px] '+'text-[#c8aa78]'}><span className="flex items-center gap-[10px]"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] shrink-0 text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m0-10 2 2 4-4"/></svg><span>Duyệt thành viên</span></span>{pendingMembers.length>0 && <span role="status" aria-label={`${pendingMembers.length} thành viên chờ duyệt`} className="size-[10px] shrink-0 rounded-full bg-[#ff3333] shadow-[0_0_5px_#ff333366]"/>}</button>}
          {canManageGroup && memberTab==='leaders' && <button data-ui-selection-sound type="button" onClick={()=>{setMemberMenu(null);setMemberSearch('');setMemberTab('deputy')}} className={buttonInteraction+' flex w-full shrink-0 items-center gap-[10px] border-0 border-b border-solid border-b-[#79501e] bg-transparent px-[4px] py-[12px] text-left text-[16px] text-[#d7dee8]'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m3-14v8m-4-4h8"/></svg>Thêm phó nhóm</button>}
          <h2 className="my-[12px] shrink-0 font-cormorant text-[length:var(--member-heading-size,var(--ui-p-22))] compact:text-[20px] font-bold text-[#ffe5a6]">{memberTab==='invite'?'Thêm thành viên':memberTab==='pending'?'Duyệt thành viên':memberTab==='deputy'?'Thêm phó nhóm':memberTab==='blocked'?'Đã chặn':'Thành viên'} (<NumberText text={String(memberTab==='pending'?pendingMembers.length:memberTab==='blocked'?blockedMembers.length:members.length)} compact weight="normal"/>)</h2>
          {memberError && <p role="alert" className="text-[14px] text-[#ffac80]">{memberError}</p>}
          {(memberTab === 'members' || memberTab === 'leaders') && <ul className={`min-h-0 flex-1 overflow-y-auto pr-1 ${messageScrollbarClass}`} style={{ height: memberViewportHeight }}>{listedMembers.map(member => <li key={member} className="relative flex shrink-0 items-center gap-2 border-b border-[#79501e] px-1 py-1 font-heading text-[length:var(--ui-p-22)] compact:text-[16px] font-bold text-[#fff6df] leading-tight" style={{ height: memberViewportHeight / 8 }}>
            <button data-ui-selection-sound type="button" aria-label={`Xem thông tin ${member}`} onClick={() => { setMemberMenu(null); onMemberInfo(member) }} className={`${buttonInteraction} relative block size-[var(--ui-p-50)] compact:size-[40px] shrink-0 cursor-pointer border-0 bg-transparent p-0`}> 
              {accountName ? <MessageAccountAvatar name={member} /> : member === selfName ? <AvatarPortrait avatarIndex={selfAvatarIndex} className="size-full rounded-full object-contain" /> : <CrispUiImage src={memberImages[member] ?? defaultMemberAvatar} alt={`Avatar ${member}`} className="block size-full rounded-full object-contain" />}
              {blockedMembers.some(blocked=>blocked.name===member) && <BlockedMemberBadge/>}
              {!blockedMembers.some(blocked=>blocked.name===member) && memberRole(member) !== 'member' && <span role="img" aria-label={memberRole(member)==='owner'?'Trưởng nhóm · Khóa vàng':'Phó nhóm · Khóa bạc'} className="absolute -right-[var(--ui-p-2)] -bottom-[var(--ui-p-2)] z-30 grid size-[var(--ui-p-20)] place-items-center rounded-full border border-[#666666] bg-[#666666] shadow-[0_1px_2px_#1c0e07]"><svg aria-hidden="true" viewBox="0 0 24 24" className={'size-[var(--ui-p-13)] '+(memberRole(member)==='owner'?'text-[#FBD65B]':'text-[#d7dee8]')} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="8" r="5" /><path d="m12.5 11.5-9 9H7v-4h4v-4" /></svg></span>}
            </button>
            <span className="min-w-0 flex-1 truncate ml-[4px] desktop:text-[length:var(--member-name-size)]"><SocialPlayerName name={member} /></span>
            {member !== selfName && (canManageGroup ? <button data-ui-selection-sound type="button" aria-label={`Tùy chọn thành viên ${member}`} aria-expanded={memberMenu === member} onClick={event => { const button = event.currentTarget.getBoundingClientRect(); const panel = memberPanelRef.current?.getBoundingClientRect(); if (panel) setMemberMenuAnchor({ left: button.left - panel.left - 8, top: button.top - panel.top + button.height / 2 }); setMemberError(''); setMemberMenu(current => current === member ? null : member) }} className={`${buttonInteraction} grid h-[32px] w-[28px] shrink-0 place-items-center border-0 bg-transparent p-0 text-[24px] leading-none text-[#ffe5a6]`}>...</button> : null)}
          </li>)}</ul>}
          {memberTab === 'blocked' && <div className="min-h-0 flex-1 overflow-y-auto text-[16px]">{blockedMembers.length===0&&<p>Chưa có thành viên bị chặn.</p>}{blockedMembers.filter(member=>matchesMember(member.name)).map(member=><div key={member.id} className="flex min-h-[54px] items-center gap-[10px] border-b border-[#79501e] py-[8px]" style={{ height: memberViewportHeight / 8 }}><button data-ui-selection-sound type="button" aria-label={'Xem thông tin '+member.name} onClick={()=>onMemberInfo(member.name)} className="relative size-[var(--ui-p-50)] compact:size-[40px] shrink-0 border-0 bg-transparent p-0"><MessageAccountAvatar name={member.name}/><BlockedMemberBadge/></button><span className="min-w-0 flex-1 ml-[4px] desktop:text-[length:var(--member-name-size)]"><SocialPlayerName name={member.name}/></span>{canManageGroup&&<button data-ui-selection-sound type="button" disabled={membershipPending} onClick={()=>{setMemberError('');setMemberBlockTarget({name:member.name,blocked:false})}} className={buttonInteraction+' shrink-0 rounded border border-[#b8873e] px-[8px] py-[6px] text-[#f4c75e] disabled:opacity-50'}>Bỏ chặn</button>}</div>)}</div>}
          {memberTab === 'pending' && canManageGroup && <div className="min-h-0 flex-1 overflow-y-auto text-[16px]"><label className="mb-[14px] flex items-center justify-between gap-[12px] border-b border-[#79501e] pb-[12px] text-[16px]"><span>Bật duyệt thành viên</span><GroupCheckbox role="switch" aria-label="Bật duyệt thành viên" checked={approvalChecked} disabled={membershipPending} onChange={event=>{const enabled=event.target.checked;if(membershipPending)return;setApprovalChecked(enabled);setMembershipPending(true);void onSetApproval(enabled).catch(error=>{setApprovalChecked(approvalRequired);setMemberError(memberErrorMessage(error))}).finally(()=>setMembershipPending(false))}} className="size-[24px] accent-[#d8ac35]"/></label>{pendingMembers.length===0 && <p>Chưa có thành viên chờ duyệt.</p>}{pendingMembers.filter(member=>matchesMember(member.name)).map(member=><div key={member.id} className="flex items-center gap-[8px] border-b border-[#79501e] py-[12px]"><div className="min-w-0 flex-1"><span className="desktop:text-[length:var(--member-name-size)]"><NumberText text={member.name} compact weight="normal" soften={false}/></span><p className="text-[14px] text-[#c8aa78]">Người mời: <NumberText text={member.inviterName} compact weight="normal" soften={false}/></p></div><button data-ui-selection-sound type="button" disabled={membershipPending} aria-label={'Từ chối '+member.name} onClick={()=>{void reviewMember(member.id,false)}} className={buttonInteraction+' size-[38px] rounded border border-[#b8873e] text-[26px] text-[#ff9b9b] disabled:opacity-50'}>×</button><button data-ui-selection-sound type="button" disabled={membershipPending} aria-label={'Duyệt '+member.name} onClick={()=>{void reviewMember(member.id,true)}} className={buttonInteraction+' size-[38px] rounded border border-[#b8873e] text-[26px] text-[#e8cb6e] disabled:opacity-50'}>✓</button></div>)}</div>}
          {memberTab==='deputy' && <ul className={`min-h-0 flex-1 overflow-y-auto pr-1 ${messageScrollbarClass}`} style={{height:memberViewportHeight}}>{sortedMembers.filter(member=>memberRole(member)==='member'&&matchesMember(member)).map(member=><li key={member} className="relative flex shrink-0 items-center gap-2 border-b border-[#79501e] px-1 py-1 font-heading text-[length:var(--ui-p-22)] compact:text-[16px] font-bold text-[#fff6df] leading-tight" style={{ height: memberViewportHeight / 8 }}><button data-ui-selection-sound type="button" aria-label={'Xem thông tin '+member} onClick={()=>onMemberInfo(member)} className={buttonInteraction+' relative block size-[var(--ui-p-50)] compact:size-[40px] shrink-0 border-0 bg-transparent p-0'}>{accountName?<MessageAccountAvatar name={member}/>:<CrispUiImage src={memberImages[member]??defaultMemberAvatar} alt={'Avatar '+member} className="block size-full rounded-full object-contain"/>}{blockedMembers.some(blocked=>blocked.name===member)&&<BlockedMemberBadge/>}</button><span className="min-w-0 flex-1 truncate ml-[4px] desktop:text-[length:var(--member-name-size)]"><SocialPlayerName name={member}/></span><button data-ui-selection-sound type="button" aria-label={'Phong phó nhóm '+member} disabled={membershipPending} onClick={()=>setDeputy(member)} className={buttonInteraction+' grid size-[40px] shrink-0 place-items-center border-0 bg-transparent p-0 text-[#d7dee8] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[30px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg></button></li>)}</ul>}
          {memberTab === 'invite' && <ul className={`min-h-0 flex-1 overflow-y-auto pr-1 ${messageScrollbarClass}`} style={{ height: memberViewportHeight }}>
            {friends.filter(friend=>friend.status==='accepted'&&!members.includes(friend.name)&&matchesMember(friend.name)).map(friend=><li key={friend.id} className="relative flex shrink-0 items-center gap-2 border-b border-[#79501e] px-1 py-1 font-heading text-[length:var(--ui-p-22)] compact:text-[16px] font-bold text-[#fff6df] leading-tight" style={{ height: memberViewportHeight / 8 }}>
              <button data-ui-selection-sound type="button" aria-label={`Xem thông tin ${friend.name}`} onClick={()=>onMemberInfo(friend.name)} className={`${buttonInteraction} relative block size-[var(--ui-p-50)] compact:size-[40px] shrink-0 cursor-pointer border-0 bg-transparent p-0`}>
                <MessageAccountAvatar name={friend.name}/>
              </button>
              <span className="min-w-0 flex-1 truncate ml-[4px] desktop:text-[length:var(--member-name-size)]"><SocialPlayerName name={friend.name}/></span>
              <button data-ui-selection-sound type="button" aria-label={`Thêm ${friend.name} vào nhóm`} disabled={membershipPending} onClick={()=>{void inviteMember(friend.name)}} className={`${buttonInteraction} grid size-[40px] shrink-0 place-items-center border-0 bg-transparent p-0 text-[#f4c75e] disabled:opacity-50`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[30px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4v16M4 12h16"/></svg>
              </button>
            </li>)}
            {!friends.some(friend=>friend.status==='accepted'&&!members.includes(friend.name))&&<li>Chưa có bạn bè có thể thêm vào nhóm.</li>}
          </ul>}
          {memberMenu && canManageGroup && <button data-ui-selection-sound type="button" aria-label="Đóng menu thành viên" onClick={() => setMemberMenu(null)} className="absolute inset-0 z-[35] cursor-default border-0 bg-transparent p-0" />}
          {memberMenu && canManageGroup && <div role="group" aria-label={`Tùy chọn thành viên ${memberMenu}`} style={{ left: memberMenuAnchor.left, top: memberMenuAnchor.top, transform: 'translate(-100%, -50%)' }} className="absolute z-40 flex flex-col items-start whitespace-nowrap rounded-lg border border-[#b8873e] bg-[#321705] p-[10px] shadow-lg">
            <button data-ui-selection-sound type="button" disabled={membershipPending} onClick={()=>{setMemberError('');setRoleTarget({name:memberMenu,role:'owner'});setMemberMenu(null)}} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ffe5a6] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] text-[#FBD65B]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="8" r="5"/><path d="m12 12-9 9h4v-4h4v-4"/></svg>Phong trưởng nhóm</button>
            <button data-ui-selection-sound type="button" disabled={membershipPending} onClick={()=>setDeputy(memberMenu)} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ffe5a6] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] text-[#d7dee8]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="8" r="5"/><path d="m12 12-9 9h4v-4h4v-4"/></svg>{memberRole(memberMenu)==='deputy'?'Gỡ phó nhóm':'Phong phó nhóm'}</button>
            <button data-ui-selection-sound type="button" disabled={membershipPending} onClick={()=>{setMemberError('');setMemberBlockTarget({name:memberMenu,blocked:!blockedMembers.some(member=>member.name===memberMenu)});setMemberMenu(null)}} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ffe5a6] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px] text-[#f4c75e]" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/></svg>{blockedMembers.some(member=>member.name===memberMenu)?'Bỏ chặn thành viên':'Chặn thành viên'}</button>
            <hr className="my-[8px] w-full border-0 border-t border-[#b8873e]/60"/>
            <button data-ui-selection-sound type="button" disabled={removingMember||membershipPending||memberMenu===creatorName} onClick={()=>{setMemberError('');setMemberRemoval(memberMenu);setMemberMenu(null)}} className={buttonInteraction+' flex min-h-[36px] items-center gap-[8px] bg-transparent text-[14px] text-[#ff5555] disabled:opacity-50'}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[24px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>Xóa khỏi nhóm</button>
          </div>}
          {roleTarget && <MessagesFriendRemovalConfirmation name={roleTarget.name} skip={false} onSkipChange={()=>{}} pending={membershipPending} error={memberError} message={roleTarget.role==='owner'?<>Phong <ConfirmationName name={roleTarget.name}/> làm trưởng nhóm? Bạn sẽ mất quyền trưởng nhóm và trở thành thành viên thường.</>:roleTarget.role==='deputy'?<>Phong <ConfirmationName name={roleTarget.name}/> làm phó nhóm?</>:<>Gỡ chức phó nhóm của <ConfirmationName name={roleTarget.name}/>?</>} onCancel={()=>{if(!membershipPending)setRoleTarget(null)}} onConfirm={()=>{void confirmRoleChange()}}/>}
          {memberBlockTarget && <MessagesFriendRemovalConfirmation name={memberBlockTarget.name} skip={false} onSkipChange={()=>{}} pending={membershipPending} error={memberError} message={memberBlockTarget.blocked?<>Chặn chat và mời thành viên của <ConfirmationName name={memberBlockTarget.name}/> trong nhóm này? Người chơi vẫn ở trong nhóm.</>:<>Bỏ chặn chat và mời thành viên cho <ConfirmationName name={memberBlockTarget.name}/>?</>} onCancel={()=>{if(!membershipPending)setMemberBlockTarget(null)}} onConfirm={()=>{void confirmMemberBlock()}}/>}
          {memberRemoval && <MessagesFriendRemovalConfirmation name={memberRemoval} message={<>Bạn có chắc muốn xóa <ConfirmationName name={memberRemoval}/> khỏi nhóm không?</>} showSkip={false} skip={false} onSkipChange={() => {}} pending={removingMember} error={memberError} onCancel={() => { if (!removingMember) setMemberRemoval(null) }} onConfirm={() => { void confirmMemberRemoval() }}/>}
          {friendRemoval && <MessagesFriendRemovalConfirmation pending={removingFriend} error={memberError} name={friendRemoval} skip={skipFriendConfirmation} onSkipChange={setSkipFriendConfirmation} onCancel={() => { if (!removingFriend) setFriendRemoval(null) }} onConfirm={() => { void removeFriend(friendRemoval, skipFriendConfirmation) }}/>}
        </section>
      </div>}
      {editingGroupName&&<NoticeOverlay onDismiss={()=>{if(!groupNamePending)setEditingGroupName(false)}} className={confirmationDialogOverlay}><form onSubmit={event=>{event.preventDefault();if(groupNamePending||!nicknameDraft.trim())return;setGroupNamePending(true);void onRenameGroup(nicknameDraft.trim()).then(()=>setEditingGroupName(false)).catch(error=>setMemberError(memberErrorMessage(error))).finally(()=>setGroupNamePending(false))}} role="dialog" aria-modal="true" aria-labelledby="group-rename-title" className={confirmationDialogFrame}><h2 id="group-rename-title" className={confirmationDialogTitle}>Đổi tên nhóm</h2><label className="mt-[20px] block"><span className="sr-only">Tên nhóm</span><input autoFocus maxLength={80} value={nicknameDraft} onChange={event=>setNicknameDraft(event.target.value)} className={`h-[60px] min-h-[60px] w-full px-[14px] ${messagesFriendsField} ${messagesFriendsInput}`}/></label>{memberError&&<p role="alert">{memberError}</p>}<div className={confirmationDialogActions}><button data-ui-selection-sound type="button" disabled={groupNamePending} onClick={()=>setEditingGroupName(false)} className={confirmationCancelButton}>Hủy</button><button data-ui-selection-sound type="submit" disabled={groupNamePending||!nicknameDraft.trim()} className={confirmationAcceptButton}>Đồng ý</button></div></form></NoticeOverlay>}
      {editingNickname && <form onSubmit={submitNickname} aria-label="Đặt biệt danh" className="absolute z-20 flex items-center gap-2 rounded-lg border-2 border-[#e7b755] bg-[linear-gradient(135deg,#4a260f,#241007)] px-2 shadow-[0_2px_8px_#120700]" style={uiScale ? { ...place(47, 380, 800, 100), minHeight: 58 } : place(47, 487, 800, 90)}>
        <input autoFocus aria-label={isGroup ? 'Tên nhóm' : 'Biệt danh'} value={nicknameDraft} onChange={event => setNicknameDraft(event.target.value)} maxLength={32} placeholder={isGroup ? 'Nhập tên' : 'Nhập biệt danh'} className={uiScale ? `h-[44px] px-[10px] ${messagesFriendsField} ${messagesFriendsInput}` : 'h-[80%] min-w-0 flex-1 rounded-md border border-[#b8873e] bg-[#1c0e07] px-2 text-[length:var(--ui-p-18)] text-[#fff6df] outline-none placeholder:text-[#c8aa78]'} />
        <button data-ui-selection-sound type="button" onClick={() => setEditingNickname(false)} style={uiScale ? undefined : { fontSize: 'var(--ui-p-18)' }} className={`${buttonInteraction} ${uiScale ? 'h-[40px] min-w-[44px] px-[8px] text-[16px]' : 'h-[80%] min-w-[54px] px-3'} shrink-0 rounded-md border border-[#b8873e] bg-[#3e200e] text-[length:var(--ui-p-16)] text-[#ffe5a6]`}>Hủy</button>
        <button data-ui-selection-sound type="submit" style={uiScale ? undefined : { fontSize: 'var(--ui-p-18)' }} className={`${buttonInteraction} ${uiScale ? 'h-[40px] min-w-[44px] px-[8px] text-[16px]' : 'h-[80%] min-w-[54px] px-3'} shrink-0 rounded-md border border-[#ffe08b] bg-[linear-gradient(#d99c37,#8f4d17)] font-bold text-[#fff2c8]`}>OK</button>
      </form>}
      {reportNotice && <NoticeOverlay onDismiss={() => setReportNotice(false)} className="flex items-center justify-center bg-black/60 p-5"><section role="alertdialog" aria-modal="true" aria-label="Thông báo báo cáo" className={oneChoiceNoticePanel}><div className={messagesConfirmationBody}><p>Tính năng đang phát triển</p></div><button data-ui-selection-sound autoFocus type="button" onClick={() => setReportNotice(false)} className={oneChoiceNoticeButton}>Đã hiểu</button></section></NoticeOverlay>}
      {invitationNotice && <NoticeOverlay onDismiss={() => setInvitationNotice('')} className="flex items-center justify-center bg-black/60 p-5"><section role="alertdialog" aria-modal="true" aria-label="Thông báo mời thành viên" className={oneChoiceNoticePanel}><div className={messagesConfirmationBody}><p>{invitationNotice}</p></div><button data-ui-selection-sound autoFocus type="button" onClick={() => setInvitationNotice('')} className={oneChoiceNoticeButton}>Đã hiểu</button></section></NoticeOverlay>}
      {ownerLeaveNotice && <NoticeOverlay onDismiss={() => setOwnerLeaveNotice(false)} className="flex items-center justify-center bg-black/60 p-5"><section role="alertdialog" aria-modal="true" aria-label="Chuyển khóa vàng trước khi rời nhóm" className={oneChoiceNoticePanel}><div className={messagesConfirmationBody}><p>Vui lòng chuyển khóa vàng cho người khác trước khi rời nhóm.</p></div><button data-ui-selection-sound autoFocus type="button" onClick={() => setOwnerLeaveNotice(false)} className={oneChoiceNoticeButton}>Đã hiểu</button></section></NoticeOverlay>}
      {confirmLeave && <MessagesFriendRemovalConfirmation name={name} message={<>Bạn có chắc muốn rời nhóm “<ConfirmationName name={name}/>” không?</>} skip={false} onSkipChange={() => {}} pending={leavingGroup} error={leaveError} onCancel={() => { if (!leavingGroup) setConfirmLeave(false) }} onConfirm={() => { if (leavingGroup) return; setLeavingGroup(true); setLeaveError(""); void onLeaveGroup().then(() => setConfirmLeave(false)).catch(error => setLeaveError(errorMessage(error))).finally(() => setLeavingGroup(false)) }} />}
      {confirmBlock && <NoticeOverlay onDismiss={() => setConfirmBlock(false)} className={confirmationDialogOverlay}>
        <section role="alertdialog" aria-modal="true" aria-labelledby="messages-block-confirmation-title" className={confirmationDialogFrame}>
          <h2 id="messages-block-confirmation-title" className={confirmationDialogTitle}>Xác nhận {isBlocked ? 'bỏ chặn' : 'chặn'}</h2>
          <p className={confirmationDialogDescription}>Muốn {isBlocked ? 'bỏ chặn' : 'chặn'} người chơi <NumberText text={name} compact weight="normal" soften={false} />?</p>
          <div className={confirmationDialogActions}>
            <button data-ui-selection-sound type="button" onClick={() => setConfirmBlock(false)} className={`${confirmationCancelButton} min-w-[var(--ui-p-96)] px-4 py-2 text-[length:var(--ui-p-18)]`}>Hủy</button>
            <button data-ui-selection-sound type="button" onClick={() => { onToggleBlock(!isBlocked); setConfirmBlock(false) }} className={`${confirmationAcceptButton} min-w-[var(--ui-p-96)] px-4 py-2 text-[length:var(--ui-p-18)]`}>Đồng ý</button>
          </div>
        </section>
      </NoticeOverlay>}
      {editingNotificationMute && <NoticeOverlay onDismiss={() => setEditingNotificationMute(false)} className={confirmationDialogOverlay}>
        <form role="dialog" aria-modal="true" aria-labelledby="messages-mute-title" className={confirmationDialogFrame} onSubmit={event => {
          event.preventDefault()
          onSaveNotificationMute(notificationMuteDraft)
          setEditingNotificationMute(false)
        }}>
          <h2 id="messages-mute-title" className={confirmationDialogTitle}>Tắt thông báo trong:</h2>
          <fieldset aria-label="Thời gian tắt thông báo" className="mt-4 flex flex-col gap-4">
            {notificationMuteOptions.map((option, index) => <label key={option.value} className="flex cursor-pointer items-center gap-3 text-[length:var(--ui-p-18)] text-[#e2c79f]">
              <input type="radio" name="notification-mute-duration" value={option.value} checked={notificationMuteDraft === option.value} onChange={() => setNotificationMuteDraft(option.value)} autoFocus={index === 0} className="peer sr-only" />
              <span aria-hidden="true" className="grid size-[var(--ui-p-22)] shrink-0 place-items-center rounded-full border-2 border-[#b8873e] bg-[#241007] peer-checked:border-[#ffe08b] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ffe08b]">
                {notificationMuteDraft === option.value && <span className="block size-[var(--ui-p-10)] rounded-full bg-[#ffe08b]" />}
              </span>
              {option.value === 'forever' ? <span>{option.label}</span> : <span className="whitespace-nowrap font-number lining-nums tabular-nums text-[length:var(--ui-p-20)]"><NumberText text={option.label} /></span>}
            </label>)}
          </fieldset>
          <div className={confirmationDialogActions}>
            <button data-ui-selection-sound type="button" onClick={() => setEditingNotificationMute(false)} className={`${confirmationCancelButton} min-w-[var(--ui-p-96)] px-4 py-2 text-[length:var(--ui-p-18)]`}>Hủy</button>
            <button data-ui-selection-sound type="submit" className={`${confirmationAcceptButton} min-w-[var(--ui-p-96)] px-4 py-2 text-[length:var(--ui-p-18)]`}>OK</button>
          </div>
        </form>
      </NoticeOverlay>}
      {confirmDelete && <NoticeOverlay onDismiss={() => setConfirmDelete(false)} className={confirmationDialogOverlay}>
        <section role="alertdialog" aria-modal="true" aria-labelledby="messages-delete-confirmation-title" className={confirmationDialogFrame}>
          <h2 id="messages-delete-confirmation-title" className={confirmationDialogTitle}>Xác nhận xóa tin nhắn</h2>
          <p className={confirmationDialogDescription}>Tin nhắn người bên kia vẫn được giữ, chỉ xóa ở phía bạn?</p>
          <div className={confirmationDialogActions}>
            <button data-ui-selection-sound type="button" onClick={() => setConfirmDelete(false)} className={`${confirmationCancelButton} min-w-[var(--ui-p-96)] px-4 py-2 text-[length:var(--ui-p-18)]`}>Hủy</button>
            <button data-ui-selection-sound type="button" onClick={onDeleteConversation} className={`${confirmationAcceptButton} min-w-[var(--ui-p-96)] px-4 py-2 text-[length:var(--ui-p-18)]`}>Đồng ý</button>
          </div>
        </section>
      </NoticeOverlay>}
    </div>
  </div>
}




