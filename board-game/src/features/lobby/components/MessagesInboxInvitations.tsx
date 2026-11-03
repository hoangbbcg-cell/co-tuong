import { HovangDataSpinner } from '../../../components/HovangDataSpinner'
import { messagesInboxListStyle, messagesInboxRowStyle } from './messagesInboxRowStyles'
import { socialPlayerRowClass } from './SocialDialogFrame'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useDatabaseMessages, type GroupInvitation } from '../hooks/useDatabaseMessages'
import { useSessionStore } from '../../../store/sessionStore'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { SocialPlayerName, socialActionButton, socialActionStyle } from './SocialUi'
import secondaryActionFrame from '../../../assets/friends/friend-secondary-action-button-frame.png'
import friendAddIcon from '../../../assets/friends/friend-add-icon.png'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { buttonInteraction, messageScrollbarClass } from '../../../lib/uiClasses'
import { errorMessage } from '../../../services/api'
import defaultGroupAvatar from '../../../assets/messages/create-group/avatar.png'
import { MessagesBackButton } from './MessagesBackButton'
import groupInvitationIcon from '../../../assets/messages/group-invitation-icon.svg'
import { useInviteSentNotice } from './InviteSentNotice'

export function MessagesInvitationBadge({ count, corner = false }: { count: number; corner?: boolean }) {
  if (count <= 0) return null
  return <span aria-label={`${count} lời mời vào nhóm`} className={`${corner ? 'absolute -top-[8px] right-[2px] z-10' : 'shrink-0'} grid h-[var(--ui-p-28)] min-w-[var(--ui-p-28)] compact:h-[24px] compact:min-w-[24px] place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] px-[4px] font-number text-[length:var(--ui-p-15)] compact:text-[14px] font-semibold leading-none lining-nums tabular-nums text-white shadow-[0_1px_4px_#321407]`}>{count > 99 ? '99+' : count}</span>
}

export function MessagesInboxInvitations({ onChanged, compact, scale, invitations, loading, loadError }: { onChanged: (joinedGroupId?: string) => Promise<void>; compact: boolean; scale: number; invitations: GroupInvitation[]; loading: boolean; loadError: boolean }) {
  const accountId=useSessionStore(state=>state.account?.id)
  const api=useDatabaseMessages()
  const client=useQueryClient()
  const key=['group-invitations',accountId]
  const [expanded, setExpanded] = useState(false)
  const [pending,setPending]=useState(false)
  const feedback = useInviteSentNotice()
  async function respond(id:string,accepted:boolean) {
    if(pending)return
    setPending(true)
    try {
      const result=await api.respondInvitation(id,accepted)
      await client.cancelQueries({queryKey:key})
      client.setQueryData<typeof invitations>(key,current=>current?.filter(item=>item.conversationId!==id)??[])
      if (!accepted) feedback.show('Đã từ chối')
      else if (result.pendingApproval) feedback.show('Chờ duyệt')
      await onChanged(accepted && !result.pendingApproval ? id : undefined)
    } catch(error) {feedback.show(errorMessage(error))}
    finally {setPending(false);void client.invalidateQueries({queryKey:key})}
  }
  return <section aria-label="Lời mời" className="flex min-h-0 flex-1 flex-col text-[#ffe5a6] compact:text-[#251506] desktop:text-[#251506]">
    {feedback.notice}
    <ul style={messagesInboxListStyle(scale, compact)} className={`m-0 flex min-h-0 flex-1 flex-col overflow-y-auto p-0 desktop:pr-1 ${messageScrollbarClass}`}>
      {!expanded && <li style={messagesInboxRowStyle(scale, compact)} className={`${socialPlayerRowClass} ${compact ? 'compact:[container-type:size]' : ''}`}>
        <button type="button" data-ui-tab-sound aria-expanded={expanded} onClick={() => setExpanded(current => !current)} className={`${buttonInteraction} flex size-full min-w-0 items-center gap-[10px] border-0 bg-transparent p-0 text-left`}>
          <MessagesGroupAvatar src={groupInvitationIcon} alt="" className="size-[var(--ui-p-52,52px)] compact:size-[72cqh] shrink-0 rounded-full border border-[#ffe2a1]" />
          <span className="min-w-0 flex-1 font-heading text-[length:var(--ui-p-22)] compact:text-[18px] font-bold leading-tight text-[#251506]">Lời mời vào nhóm</span>
          <MessagesInvitationBadge count={invitations.length} />
        </button>
      </li>}
      {expanded && <li className="shrink-0"><MessagesBackButton onClick={() => setExpanded(false)} label="Quay lại lời mời" size={compact ? 28 : 38} /></li>}
      {expanded && invitations.map(item=><li key={item.conversationId} data-ui-tab-sound style={messagesInboxRowStyle(scale, compact)} className={`${socialPlayerRowClass} !flex gap-[10px] ${compact ? 'compact:[container-type:size]' : ''}`}>
        <MessagesGroupAvatar src={item.avatarUrl || defaultGroupAvatar} alt={`Ảnh nhóm ${item.title}`} className="size-[var(--ui-p-52,52px)] max-h-[85%] max-w-[22%] shrink-0 compact:size-[72cqh]"/>
        <div className="min-w-0 flex-1"><p className="truncate font-heading text-[length:var(--ui-p-22)] compact:text-[18px] font-bold text-[#251506]"><SocialPlayerName name={item.title}/></p></div>
        <div className="flex w-[56%] desktop:w-[64%] shrink-0 gap-[6px] [container-type:inline-size]">
          <button type="button" data-ui-tab-sound aria-label={`Chấp nhận vào nhóm ${item.title}`} disabled={pending} onClick={()=>void respond(item.conversationId,true)} style={{ ...socialActionStyle, width: 'calc(50% - 3px)', height: compact ? 42 : Math.round(56 * scale), paddingInline: 4, gap: 2, fontSize: compact ? 'clamp(10px, 5.6cqw, 17px)' : 'clamp(14px, 7cqw, 20px)' }} className={`${socialActionButton} overflow-hidden whitespace-nowrap disabled:opacity-50`}><CrispUiImage src={friendAddIcon} alt="" aria-hidden="true" className="size-[min(22px,10cqw)] desktop:size-[min(26px,11cqw)] shrink-0 object-contain"/><span>Chấp nhận</span></button>
          <button type="button" data-ui-tab-sound aria-label={`Từ chối vào nhóm ${item.title}`} disabled={pending} onClick={()=>void respond(item.conversationId,false)} style={{ backgroundImage: `url(${secondaryActionFrame})`, backgroundSize: '100% 100%', width: 'calc(50% - 3px)', height: compact ? 42 : Math.round(56 * scale), paddingInline: 4, gap: 2, fontSize: compact ? 'clamp(10px, 5.6cqw, 17px)' : 'clamp(14px, 7cqw, 20px)' }} className={`${socialActionButton} overflow-hidden whitespace-nowrap text-[#6c160f] disabled:opacity-50`}><svg aria-hidden="true" viewBox="0 0 32 32" className="size-[min(22px,10cqw)] desktop:size-[min(26px,11cqw)] shrink-0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square"><path d="m7 7 18 18M25 7 7 25"/></svg><span>Từ chối</span></button>
        </div>
      </li>)}
      {expanded && (loadError?<li role="alert" className="flex flex-1 items-center justify-center text-center text-[16px]">Không tải được lời mời vào nhóm.</li>:!invitations.length&&<li className="flex flex-1 items-center justify-center text-center text-[16px]">{accountId && loading ? <HovangDataSpinner /> : 'Chưa có lời mời vào nhóm.'}</li>)}
    </ul>
  </section>
}
