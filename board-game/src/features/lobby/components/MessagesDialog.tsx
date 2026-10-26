import { searchFieldMetrics, searchFieldTextSize } from '../../../lib/searchFieldMetrics'
import { useInviteSentNotice } from './InviteSentNotice'
import { MessagesBackButton } from './MessagesBackButton'
import { messagesFriendsField, messagesFriendsInput } from './messagesInputStyles'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import { socialPlayerRowClass, getSocialRowStyle } from './SocialDialogFrame'
import { SocialPlayerName, socialPanelClass } from './SocialUi'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { isMessageImage, prepareMessageImage } from '../../../lib/messageImage'
import { useDatabaseMessages, type DatabaseConversation, type PendingGroupMember, type BlockedGroupMember, type GroupMemberRole } from '../hooks/useDatabaseMessages'
import { errorMessage } from '../../../services/api'

import { createClientId } from '../../../lib/clientId'
import { NumberText } from '../../../lib/NumberText'
import { useEffect, useState, type CSSProperties, type RefObject } from 'react'
import { useRef, type FormEvent, type MouseEvent } from 'react'
import type { useRankingLayout } from '../hooks/useRankingLayout'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { buttonInteraction, messageSelectionHighlight, messageScrollbarClass } from '../../../lib/uiClasses'
import { MessagesSidebar, MessagesChatPane, MessagesDialogSurface } from './MessagesPanels'
import { MessagesOptionsPanel, type NotificationMuteDuration } from './MessagesOptionsPanel'
import { MessagesCreateGroupPanel, type MessagesCreateGroupPayload } from './MessagesCreateGroupPanel'
import { MessagesFriendButton, MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { useMessageFriendship } from '../hooks/useMessageFriendship'
import { getMessageFriendContacts } from './FriendsDialog'
import { useSessionStore } from '../../../store/sessionStore'
import { MESSAGE_PANEL_SIZE, MESSAGE_FRAME_REFERENCE_WIDTH } from './messagesPanelLayout'
import { MessagesCreateGroupButton } from './MessagesCreateGroupButton'
import picolozz from '../../../assets/messages/avatar-picolozz.png'
import khoi from '../../../assets/messages/avatar-khoi.png'
import an from '../../../assets/messages/avatar-an.png'
import { computerAvatar as computer } from '../../../lib/computerAvatar'
import dung from '../../../assets/messages/avatar-dung.png'
import tuan from '../../../assets/messages/avatar-tuan.png'
import han from '../../../assets/messages/avatar-han.png'
import phat from '../../../assets/messages/avatar-phat.png'
import send from '../../../assets/messages/send.png'
import more from '../../../assets/messages/more.png'
import defaultAvatar from '../../../assets/icons/avatar.svg'
import defaultGroupAvatar from '../../../assets/messages/create-group/avatar.png'

const fixtureNow = Date.now()
const minutesAgo = (minutes: number) => fixtureNow - minutes * 60_000
const memberPreviewGroupId = 'demo-group-member'
type MessageItem = { id: number | string; text: string; outgoing: boolean; sentAt: number; blocked?: boolean }
type ConversationItem = { name: string; title?: string; playerId?: string; image: string; status: 'online' | 'offline'; text: string; lastMessageAt: number; isGroup?: boolean; members?: string[]; creatorName?: string }
export type MessageConversationRequest = { id: number; name: string; playerId?: string; image?: string; status?: 'online' | 'offline' }

function normalizeSearchValue(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()
}

const messages: MessageItem[] = [
  { id: 1, text: 'Chào bạn!', outgoing: false, sentAt: minutesAgo(36) },
  { id: 2, text: 'Chào bạn!', outgoing: true, sentAt: minutesAgo(35) },
  { id: 3, text: 'Vào bàn nhé?', outgoing: false, sentAt: minutesAgo(25) },
  { id: 4, text: 'Ok, đợi mình chút.', outgoing: true, sentAt: minutesAgo(24) },
  { id: 5, text: 'Được thôi, mình tạo bàn ngay.', outgoing: false, sentAt: minutesAgo(23) },
  { id: 6, text: 'Vào thôi! 💪', outgoing: true, sentAt: minutesAgo(4) },
  { id: 7, text: 'Chúc bạn chơi vui! 😊', outgoing: false, sentAt: minutesAgo(3) },
]
const latestMessageText = messages[messages.length - 1].text
const conversations: ConversationItem[] = [
  { name: 'Picolozz', image: picolozz, status: 'online', text: latestMessageText, lastMessageAt: messages[messages.length - 1].sentAt },
  { name: 'Nguyễn Hoàng Minh Khôi', image: khoi, status: 'online', text: 'Vào bàn nhé?', lastMessageAt: minutesAgo(28) },
  { name: 'An', image: an, status: 'offline', text: 'Hẹn gặp lại!', lastMessageAt: minutesAgo(135) },
  { name: 'Ông Hoàng', image: computer, status: 'offline', text: 'Thử thách một ván không?', lastMessageAt: minutesAgo(26 * 60) },
  { name: 'Lê Quốc Dũng', image: dung, status: 'offline', text: 'Chúc bạn chơi vui!', lastMessageAt: minutesAgo(30 * 60) },
  { name: 'Trần Anh Tuấn', image: tuan, status: 'offline', text: 'Mai đánh tiếp nhé.', lastMessageAt: minutesAgo(36 * 60) },
  { name: 'Phạm Gia Hân', image: han, status: 'offline', text: 'Cảm ơn bạn!', lastMessageAt: minutesAgo(48 * 60) },
  { name: 'Đỗ Minh Phát', image: phat, status: 'offline', text: 'Ván này căng quá!', lastMessageAt: minutesAgo(3 * 24 * 60) },
]

const initialThreads = Object.fromEntries(conversations.map(conversation => [
  conversation.name,
  conversation.name === 'Picolozz'
    ? messages
    : [{ id: 1, text: conversation.text, outgoing: false, sentAt: conversation.lastMessageAt }],
])) as Record<string, MessageItem[]>

function Dot({ status }: { status: 'online' | 'offline' }) {
  return <span aria-hidden="true" className={`mr-[var(--ui-p-6)] block size-[var(--ui-p-16)] shrink-0 rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${status === 'online' ? 'bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]' : 'bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]'}`} />
}

function formatSentTime(timestamp: number): string {
  const date = new Date(timestamp)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function formatMessageTime(timestamp: number, now: number): string {
  const messageDate = new Date(timestamp)
  const elapsed = Math.max(0, now - timestamp)
  if (elapsed < 24 * 60 * 60_000) {
    return formatSentTime(timestamp)
  }
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  const weekday = weekdays[messageDate.getDay()]
  const currentDate = new Date(now)
  if (elapsed < 30 * 24 * 60 * 60_000 && messageDate.getMonth() === currentDate.getMonth() && messageDate.getFullYear() === currentDate.getFullYear()) {
    return weekday
  }
  return `${weekday}, tháng ${messageDate.getMonth() + 1}`
}

/** Database-backed messaging, with legacy local threads for offline previews. */
export function MessagesDialog({ dialogRef, layout: incomingLayout, onClose, openRequest, onViewInfo }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: ReturnType<typeof useRankingLayout>
  onClose: () => void
  openRequest?: MessageConversationRequest | null
  onViewInfo: (name: string) => void
}) {
  const [searchLayout, setSearchLayout] = useState<ReturnType<typeof useRankingLayout> | null>(null)
  const layout = searchLayout ?? incomingLayout
  const [now, setNow] = useState(() => Date.now())
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<number | string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const currentUserName = useSessionStore(state => state.name)
  const account=useSessionStore(s=>s.account)
  const databaseMessages=useDatabaseMessages()
  const databaseConversations=useRef<DatabaseConversation[]>([])
  const databaseIds=useRef<Record<string,string>>({})
  const [groupApprovalRequired,setGroupApprovalRequired]=useState(false)
  const [pendingGroupMembers,setPendingGroupMembers]=useState<PendingGroupMember[]>([])
  const [groupMemberRoles,setGroupMemberRoles]=useState<Record<string,GroupMemberRole>>({})
  const [blockedGroupMembers,setBlockedGroupMembers]=useState<BlockedGroupMember[]>([])
  const selectedGroupKey=useRef('')
  selectedGroupKey.current=(account?.id??'local')+':'+(selectedConversation??'')
  useEffect(()=>{setGroupApprovalRequired(false);setPendingGroupMembers([]);setGroupMemberRoles({});setBlockedGroupMembers([])},[selectedConversation,account?.id])
  const [databaseError,setDatabaseError]=useState('')
  useEffect(() => {
    if (!databaseError) return
    const timer = window.setTimeout(() => setDatabaseError(''), 3000)
    return () => window.clearTimeout(timer)
  }, [databaseError])
  const [messagesLoading,setMessagesLoading]=useState(false)
  const [messageActionPending,setMessageActionPending]=useState(false)
  const currentAvatarIndex = useSessionStore(state => state.avatarIndex)
  // Temporary preview requested by the user: the current account is a regular member.
  const [conversationList, setConversationList] = useState<ConversationItem[]>(() => {
    if(account)return []
    const selfName = currentUserName || 'Bạn'
    const creatorName = selfName === 'MinhQuang' ? 'LinhMeo99' : 'MinhQuang'
    return [{
      name: memberPreviewGroupId,
      title: 'Nhóm Kỳ Hữu',
      image: defaultGroupAvatar,
      status: 'online',
      text: 'Chào mừng bạn vào nhóm!',
      lastMessageAt: fixtureNow,
      isGroup: true,
      creatorName,
      members: [...new Set([creatorName, selfName, 'LinhMeo99', 'FonGiaoSu', 'TomCute'])],
    }, ...conversations]
  })
  const memberImages = Object.fromEntries([
    ...getMessageFriendContacts().map(contact => [contact.name, contact.image]),
    ...conversationList.filter(conversation => !conversation.isGroup).map(conversation => [conversation.name, conversation.image]),
  ]) as Record<string, string>
  const [nicknames, setNicknames] = useState<Record<string, string>>({})
  const [blockedAtByName, setBlockedAtByName] = useState<Record<string, number>>({})
  const [threads, setThreads] = useState<Record<string, MessageItem[]>>(() => account ? {} : ({
    ...initialThreads,
    [memberPreviewGroupId]: [{ id: 1, text: 'Chào mừng bạn vào nhóm!', outgoing: false, sentAt: fixtureNow }],
  }))
  // A few incoming fixture messages start unread so the badge can be previewed.
  const [lastReadAt, setLastReadAt] = useState<Record<string, number>>(() => Object.fromEntries(
    conversations.map(conversation => [conversation.name, ['Picolozz', 'Nguyễn Hoàng Minh Khôi', 'An'].includes(conversation.name) ? 0 : fixtureNow]),
  ))
  const unreadCounts = account?Object.fromEntries(databaseConversations.current.map(c=>[c.type==='direct'?c.peerName??c.id:c.id,Number(c.unreadCount)])):Object.fromEntries(conversationList.map(conversation => [conversation.name,
    (threads[conversation.name] ?? []).filter(message => !message.outgoing && message.sentAt > (lastReadAt[conversation.name] ?? 0)).length,
  ]))
  useEffect(() => {
    if (!selectedConversation) return
    const latestReceivedAt = (threads[selectedConversation] ?? []).reduce((latest, message) => message.outgoing ? latest : Math.max(latest, message.sentAt), 0)
    setLastReadAt(current => latestReceivedAt > (current[selectedConversation] ?? 0)
      ? { ...current, [selectedConversation]: latestReceivedAt }
      : current)
  }, [selectedConversation, threads])
  const [draft, setDraft] = useState('')
  const [emojiOpen,setEmojiOpen]=useState(false)
  const [pendingImage,setPendingImage]=useState<string|null>(null)
  const imageInputRef=useRef<HTMLInputElement>(null)
  const draftInputRef=useRef<HTMLInputElement>(null)
  useEffect(()=>{setPendingImage(null);setEmojiOpen(false)},[selectedConversation])
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [notificationMutes, setNotificationMutes] = useState<Record<string, { duration: NotificationMuteDuration; until: number }>>({})
  const [createGroupOpen, setCreateGroupOpen] = useState(false)
  const groupTriggerRef = useRef<HTMLButtonElement>(null)
  const optionsTriggerRef = useRef<HTMLButtonElement | null>(null)
  const nextMessageId = useRef(Date.now())
  const messageListRef = useRef<HTMLDivElement>(null)
  const conversationListRef = useRef<HTMLOListElement>(null)
  const [conversationRowHeight, setConversationRowHeight] = useState(0)
  const sentNotice = useInviteSentNotice()
  useEffect(() => {
    const list = conversationListRef.current
    if (!list) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0) setConversationRowHeight(entry.contentRect.height / 8)
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [])
  const friendTriggerRef = useRef<HTMLButtonElement | null>(null)
  const nextGroupId = useRef(0)
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    if (!openRequest) return
    const requestedAt = Date.now()
    setConversationList(current => {
      const existing = current.find(conversation => conversation.name === openRequest.name)
      const conversation = existing
        ? { ...existing, playerId: openRequest.playerId ?? existing.playerId, lastMessageAt: requestedAt }
        : { name: openRequest.name, playerId: openRequest.playerId, image: openRequest.image ?? defaultAvatar, status: openRequest.status ?? 'offline', text: '', lastMessageAt: requestedAt }
      return [conversation, ...current.filter(item => item.name !== openRequest.name)]
    })
    setThreads(current => current[openRequest.name] ? current : { ...current, [openRequest.name]: [] })
    setSelectedConversation(openRequest.name)
    setSelectedMessage(null)
    setSearchQuery('')
    setDraft('')
    setNow(requestedAt)
  }, [openRequest?.id])
  const reloadDatabase=async()=>{
    if(!account)return
    const currentId=selectedConversation?databaseIds.current[selectedConversation]:undefined
    const [list,social]=await Promise.all([databaseMessages.list(),databaseMessages.social()])
    const selectedItems=currentId&&list.some(c=>c.id===currentId)?await databaseMessages.messages(currentId).catch(()=>null):null
    databaseConversations.current=list
    const next:ConversationItem[]=list.map(c=>{const name=c.type==='direct'?c.peerName??c.id:c.id;databaseIds.current[name]=c.id;return {name,title:c.title??undefined,playerId:c.peerId??undefined,image:c.type==='group'?(c.avatarUrl??defaultGroupAvatar):defaultAvatar,status:c.online?'online':'offline',text:c.preview&&isMessageImage(c.preview)?'📷 Ảnh':c.preview??'',lastMessageAt:c.lastMessageAt?new Date(c.lastMessageAt).getTime():0,isGroup:c.type==='group'}})


    setBlockedAtByName(Object.fromEntries(list.filter(c=>c.peerId&&social.blocks.some(b=>b.id===c.peerId)).map(c=>[c.peerName??c.id,0])))
    setConversationList(current => next.map(conversation => {
      const previous = current.find(item => item.name === conversation.name)
      return conversation.isGroup ? { ...conversation, members: previous?.members, creatorName: previous?.creatorName } : conversation
    }))
    if(selectedConversation&&!next.some(c=>c.name===selectedConversation)&&!openRequest){setSelectedConversation(null);setOptionsOpen(false)}
    setNotificationMutes(Object.fromEntries(list.filter(c=>Number(c.mutedIndefinitely)===1||c.mutedUntil&&new Date(c.mutedUntil).getTime()>Date.now()).map(c=>{const until=Number(c.mutedIndefinitely)===1?Infinity:new Date(c.mutedUntil!).getTime();const hours=(until-Date.now())/3600000;return [c.type==='direct'?c.peerName??c.id:c.id,{duration:until===Infinity?'forever':hours>4?8:hours>1?4:1,until}] })))
    setNicknames(Object.fromEntries(list.filter(c=>c.nickname).map(c=>[c.type==='direct'?c.peerName??c.id:c.id,c.nickname!])))
    for(const c of next.filter(c=>c.name===selectedConversation)){const items=selectedItems??await databaseMessages.messages(databaseIds.current[c.name]);
if(selectedConversation===c.name&&items[0])void databaseMessages.read(databaseIds.current[c.name],items[0].id).catch(()=>{});
const messages=items.reverse().map(m=>({id:m.id,text:m.body,outgoing:m.senderId===account.id,sentAt:new Date(m.sentAt).getTime()}))
setThreads(current=>{
  const previous=current[c.name]
  if(previous?.length===messages.length&&previous.every((message,index)=>message.id===messages[index].id&&message.text===messages[index].text&&message.outgoing===messages[index].outgoing&&message.sentAt===messages[index].sentAt))return current
  return {...current,[c.name]:messages}
})}
    for(const group of next.filter(c=>c.isGroup&&c.name===selectedConversation)){
      void Promise.all([databaseMessages.members(databaseIds.current[group.name]),databaseMessages.settings(databaseIds.current[group.name]),databaseMessages.blocked(databaseIds.current[group.name])]).then(async([members,settings,blocked])=>{
        const owner=members.find(m=>m.role==='owner')
        const pending=owner?.id===account.id?await databaseMessages.pending(databaseIds.current[group.name]):[]
        if(selectedGroupKey.current!==account.id+':'+group.name)return
        setConversationList(current=>current.map(c=>c.name===group.name?{...c,members:members.map(m=>m.name),creatorName:owner?.name}:c))
        setGroupApprovalRequired(settings.approvalRequired)
        setPendingGroupMembers(pending)
        setGroupMemberRoles(Object.fromEntries(members.map(member=>[member.name,member.role as GroupMemberRole])))
        setBlockedGroupMembers(blocked)
      }).catch(()=>{})
    }
  }
  useEffect(()=>{
    if(!account)return
    let pending=false,cancelled=false,firstLoad=true
    const load=()=>{
      if(pending||!dialogRef.current?.open)return
      pending=true
      if(firstLoad)setMessagesLoading(true)
      void reloadDatabase().catch(()=>{if(!cancelled)setDatabaseError('Không tải được tin nhắn.')}).finally(()=>{
        pending=false;firstLoad=false
        if(!cancelled)setMessagesLoading(false)
      })
    }
    load()
    const timer=setInterval(load,1000)
    return()=>{cancelled=true;clearInterval(timer)}
  },[account?.id,selectedConversation])
  useEffect(()=>{if(!account||!openRequest)return;void databaseMessages.direct(openRequest.name).then(id=>{databaseIds.current[openRequest.name]=id;return reloadDatabase()}).catch(()=>setDatabaseError('Không mở được hội thoại.'))},[openRequest?.id,account?.id])
  const sourceWidth = MESSAGE_PANEL_SIZE.left.width + MESSAGE_PANEL_SIZE.right.width
  const sourceHeight = Math.max(MESSAGE_PANEL_SIZE.left.height, MESSAGE_PANEL_SIZE.right.height)
  const designWidth = layout.width * sourceWidth / MESSAGE_FRAME_REFERENCE_WIDTH
  const frameHeight = layout.width * sourceHeight / MESSAGE_FRAME_REFERENCE_WIDTH
  const viewport = window.visualViewport
  const scale = layout.compact ? Math.max(0.65, layout.scale * 1.5) : Math.min(1, ((viewport?.width ?? window.innerWidth) - 24) / designWidth, ((viewport?.height ?? window.innerHeight) - 24) / frameHeight)
  const expandedWidth = layout.compact ? Math.round(layout.width * layout.scale) : Math.round(Math.min((viewport?.width ?? window.innerWidth) - 12, designWidth * scale * 1.2))
  const leftWidth = Math.round(expandedWidth * MESSAGE_PANEL_SIZE.left.width / sourceWidth)
  const panelHeight = (height: number) => layout.compact ? Math.round(layout.height * layout.scale) : Math.round(frameHeight * scale * height / sourceHeight)
  const activeConversation = conversationList.find(conversation => conversation.name === selectedConversation) ?? { name: '', image: defaultAvatar, status: 'offline' as const, text: '', lastMessageAt: 0 }
  const normalizedSearchQuery = normalizeSearchValue(searchQuery.trim())
  const visibleConversations = normalizedSearchQuery
    ? conversationList.filter(conversation => [conversation.name, conversation.title ?? '', nicknames[conversation.name] ?? '', conversation.playerId ?? ''].some(value => normalizeSearchValue(value).includes(normalizedSearchQuery)))
    : conversationList
  const activeMessages = threads[activeConversation.name] ?? []
  const blockedAt = blockedAtByName[activeConversation.name]
  const isBlocked = blockedAt !== undefined
  const friendship = useMessageFriendship(activeConversation.name, sentNotice.show)
  const cancelFriendRemoval = () => {
    friendship.cancelRemoval()
    const focusTarget = friendTriggerRef.current ?? optionsTriggerRef.current
    focusTarget?.focus()
  }
  const confirmFriendRemoval = () => {
    friendship.confirmRemoval()
    const focusTarget = friendTriggerRef.current ?? optionsTriggerRef.current
    focusTarget?.focus()
  }
  useEffect(() => {
    const messageList = messageListRef.current
    if (messageList) messageList.scrollTop = messageList.scrollHeight
  }, [activeConversation.name, activeMessages.length])
  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if ((!text&&!pendingImage) || !activeConversation.name || messageActionPending) return
    if(account){
      setMessageActionPending(true)
      try {
        const id = databaseIds.current[activeConversation.name] ?? await databaseMessages.direct(activeConversation.name)
        databaseIds.current[activeConversation.name] = id
        if (pendingImage) { await databaseMessages.sendImage(id, pendingImage, createClientId()); setPendingImage(null) }
        if (text) await databaseMessages.send(id, text, createClientId())
        setDraft('')
        setDatabaseError('')
        await reloadDatabase().catch(() => setDatabaseError('Tin đã gửi, chưa tải lại được hội thoại.'))
      } catch (error) { setDatabaseError(`Không gửi được tin nhắn: ${errorMessage(error)}`) }
      finally { setMessageActionPending(false) }
      return
    }
    const sentAt = Date.now()
    const message = { id: nextMessageId.current++, text, outgoing: true, sentAt, blocked: isBlocked }
    setThreads(current => ({ ...current, [activeConversation.name]: [...(current[activeConversation.name] ?? []), message] }))
    setConversationList(current => {
      const latestConversation = current.find(conversation => conversation.name === activeConversation.name)
      if (!latestConversation) return current
      return [
        { ...latestConversation, text, lastMessageAt: sentAt },
        ...current.filter(conversation => conversation.name !== activeConversation.name),
      ]
    })
    setNow(sentAt)
    setDraft('')
    setSelectedMessage(null)
  }
  async function handleCreateGroup(group: MessagesCreateGroupPayload) {
    if(account){if(messageActionPending)return;setMessageActionPending(true);try{const id=await databaseMessages.group(group.name,group.members.filter(name=>name!==account.displayName));await reloadDatabase();setConversationList(current => { const created = current.find(conversation => conversation.name === id); return created ? [created, ...current.filter(conversation => conversation.name !== id)] : current });setSearchQuery('');setSelectedConversation(id);setCreateGroupOpen(false)}catch(error){setDatabaseError(`Không tạo được nhóm: ${errorMessage(error)}`)}finally{setMessageActionPending(false)}return}
    const name = `group:${Date.now()}:${nextGroupId.current++}`
    const conversation: ConversationItem = {
      name,
      title: group.name,
      image: group.image,
      status: 'offline',
      text: `${group.members.length} thành viên`,
      lastMessageAt: 0,
      isGroup: true,
      members: group.members,
      creatorName: currentUserName || 'Bạn',
    }
    setConversationList(current => [conversation, ...current])
    setThreads(current => ({ ...current, [name]: [] }))
    setSelectedConversation(name)
    setSelectedMessage(null)
    setSearchQuery('')
    setDraft('')
    setCreateGroupOpen(false)
  }
  function openOptions(event: MouseEvent<HTMLButtonElement>) {
    optionsTriggerRef.current = event.currentTarget
    setEmojiOpen(false)
    if (layout.compact) draftInputRef.current?.blur()
    setOptionsOpen(true)
  }
  function dismissOptions() {
    setOptionsOpen(false)
    optionsTriggerRef.current?.focus()
  }
  function dismissCreateGroup() {
    setCreateGroupOpen(false)
    groupTriggerRef.current?.focus()
  }
  return <dialog ref={dialogRef} onPointerDownCapture={event => { if (layout.compact && !(event.target as HTMLElement).closest('[data-message-composer]')) { draftInputRef.current?.blur(); setEmojiOpen(false) } }} onFocusCapture={event => { if (layout.compact && !searchLayout && event.target instanceof HTMLInputElement) setSearchLayout(layout) }} aria-label="Tin nhắn" onClose={() => { setSelectedConversation(null); setSearchQuery(''); setSearchLayout(null) }} onCancel={event => { event.preventDefault(); if (friendship.removalName) cancelFriendRemoval(); else if (createGroupOpen) dismissCreateGroup(); else if (optionsOpen) dismissOptions(); else if (layout.compact && selectedConversation) setSelectedConversation(null); else onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#ffebba] backdrop:bg-black/45" style={{ ...getCrispUiLayout(scale, designWidth, frameHeight), width: expandedWidth, height: panelHeight(sourceHeight), '--ui-p-45': `${Math.round(45 * scale)}px`, '--ui-p-70': `${Math.round(70 * scale)}px` } as CSSProperties}>
    {!(layout.compact && createGroupOpen) && <MessagesDialogSurface compact={layout.compact} activeChat={layout.compact && !!selectedConversation} layout={layout} onClose={layout.compact && optionsOpen ? dismissOptions : onClose}>
    <div className="relative z-10 flex min-h-0 h-full w-full items-start border-0 bg-transparent p-0 shadow-none">{(messagesLoading || messageActionPending) && <div role="status" aria-label="Đang tải tin nhắn" className="pointer-events-none absolute inset-0 z-[60] grid place-items-center"><span className="size-9 animate-spin rounded-full border-[3px] border-[#ffe08b]/25 border-t-[#ffe08b]" /></div>}{databaseError && !(layout.compact && databaseError === 'Không tải được tin nhắn.') && <p role="alert" className="absolute bottom-0 left-0 z-50 bg-[#241007] text-[#ffe5a6]">{databaseError}</p>}
      {!layout.compact && <button type="button" onClick={onClose} className={`${buttonInteraction} absolute -top-[var(--ui-p-1)] right-[var(--ui-p-10)] compact:top-3 compact:right-3 z-30 grid size-[var(--ui-p-54)] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[length:var(--ui-p-42)] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng Tin nhắn">×</button>}
          <MessagesSidebar compact={layout.compact} hidden={layout.compact && !!selectedConversation} width={layout.compact ? expandedWidth : leftWidth} height={panelHeight(MESSAGE_PANEL_SIZE.left.height)}>
            <div className="contents compact:mx-auto compact:w-full compact:mb-3 compact:grid compact:grid-cols-[auto_minmax(0,1fr)] compact:items-center compact:gap-3">
            <MessagesCreateGroupButton ref={groupTriggerRef} compact={layout.compact} width={112} iconSize={20} labelSize={15} onClick={() => { if (layout.compact && !searchLayout) setSearchLayout(layout); setCreateGroupOpen(true) }} className="compact:col-start-1 compact:row-start-1" />
            <label style={searchFieldMetrics(layout.compact ? '44px' : 'var(--ui-p-50)', layout.compact)} className={layout.compact ? `col-start-2 row-start-1 my-0 flex h-[44px] min-w-0 items-center gap-[6px] px-[10px] ${messagesFriendsField}` : 'my-3 flex h-[var(--ui-p-50)] shrink-0 items-center gap-3 rounded-full border-2 border-[#dca44d] bg-[#241309] px-4'}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-24)] shrink-0" fill="none" stroke="#e5b45d" strokeWidth="2"><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></svg>
              <span className="relative flex min-w-0 flex-1 items-center"><input aria-label="Tìm tên hoặc ID người chơi" onFocus={() => { if (layout.compact && !searchLayout) setSearchLayout(layout) }} value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder={layout.compact ? 'Nhập tên / ID người chơi...' : 'Tìm tên hoặc ID người chơi'} className={layout.compact ? `w-full ${messagesFriendsInput} ${searchFieldTextSize}` : `w-full min-w-0 border-0 bg-transparent text-white outline-none placeholder:text-white ${searchFieldTextSize}`} /></span>
            </label>
            </div>
            <div className={layout.compact ? `${socialPanelClass} flex min-h-0 flex-1 flex-col` : 'contents'} style={layout.compact ? { paddingInline: Math.round(20 * layout.scale), borderWidth: Math.round(3 * layout.scale), borderRadius: Math.round(14 * layout.scale), backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' } : undefined}>
            <ol ref={conversationListRef} className={`m-0 flex min-h-0 flex-1 flex-col overflow-y-auto p-0 pr-1 compact:gap-[6px] ${messageScrollbarClass}`}>
              {visibleConversations.map(item => <li key={item.name} style={layout.compact ? { ...getSocialRowStyle(layout.scale, true), height: 'calc((100% - 36px) / 7)', minHeight: 0, flex: '0 0 calc((100% - 36px) / 7)', paddingInline: Math.round(12 * layout.scale * 1.5) + 5 } : undefined} className={layout.compact ? `${socialPlayerRowClass} [container-type:size]` : 'relative flex h-[calc(100%/8)] min-h-0 flex-none shrink-0 border-b border-[#875026] px-1 py-1 leading-tight'}>
                {layout.compact && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" style={{ width: Math.round(132 * layout.scale * 1.5) }} />}
                {selectedConversation === item.name && <span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-lg border-2 border-[#ffe08b] ${messageSelectionHighlight}`} />}
                <button type="button" onClick={() => { setSelectedConversation(item.name); setSelectedMessage(null) }} aria-pressed={selectedConversation === item.name} className="relative flex w-full min-w-0 flex-1 compact:h-full items-center justify-start gap-2 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-[#ffe08b]">
                {item.isGroup
                  ? <MessagesGroupAvatar src={item.image} alt="" className="size-[var(--ui-p-50)] compact:size-[72cqh] shrink-0 cursor-pointer" />
                  : <MessageAccountAvatar name={item.name} className="size-[var(--ui-p-50)] compact:size-[72cqh]" />}
                <div className="min-w-0 flex-1 overflow-hidden text-left compact:ml-[7px] compact:self-center"><div className="flex items-baseline justify-between gap-2"><span className="flex min-w-0 items-center gap-1.5 truncate font-heading text-[length:var(--ui-p-22)] font-bold text-[#fff6df] compact:text-[29.5cqh] compact:leading-[36cqh] compact:text-[#251506]">{item.isGroup && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-22)] shrink-0 text-[#f4c75e]" fill="currentColor"><path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm14 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM12 10c-3 0-5 1.5-5 4v6h10v-6c0-2.5-2-4-5-4ZM5 12c-2.5 0-4 1.5-4 3.5V19h4v-5c0-.7.1-1.4.4-2H5Zm14 0h-.4c.3.6.4 1.3.4 2v5h4v-3.5c0-2-1.5-3.5-4-3.5Z" /></svg>}<span className="truncate"><SocialPlayerName name={nicknames[item.name] || item.title || item.name} /></span></span>{layout.compact && item.lastMessageAt > 0 && <span className="shrink-0 whitespace-nowrap font-number text-[23cqh] leading-[36cqh] lining-nums tabular-nums text-[#76552e]">{formatMessageTime(item.lastMessageAt, now)}</span>}{!layout.compact && <>{unreadCounts[item.name] > 0 ? <span aria-label={`${unreadCounts[item.name]} tin nhắn chưa đọc`} className="grid size-[var(--ui-p-28)] shrink-0 place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] font-number lining-nums tabular-nums text-[length:var(--ui-p-15)] font-semibold leading-none text-white opacity-[0.88] shadow-[0_1px_4px_#321407]">{unreadCounts[item.name] > 99 ? '99+' : unreadCounts[item.name]}</span> : item.lastMessageAt > 0 && <span className="shrink-0 whitespace-nowrap font-number lining-nums tabular-nums text-[length:var(--ui-p-16)] compact:ml-auto compact:text-[14px] text-[#d6b982] compact:text-[#76552e]">{formatMessageTime(item.lastMessageAt, now)}</span>}</>}</div>

                  <p className="mt-1 compact:mt-0 flex min-h-[var(--ui-p-20)] compact:min-h-[33cqh] min-w-0 items-center justify-start gap-2 text-left text-[length:var(--ui-p-17)] compact:text-[26cqh] compact:leading-[33cqh] text-[#e2c79f] compact:text-[#624622]">{!item.isGroup && <span className="shrink-0 compact:[--ui-p-16:20cqh] compact:[--ui-p-6:6cqh]"><Dot status={item.status} /></span>}<span className={`min-w-0 flex-1 truncate ${layout.compact && unreadCounts[item.name] > 0 ? 'font-semibold text-[#36200c]' : ''}`}><NumberText text={isMessageImage(item.text) ? '📷 Ảnh' : item.text || (layout.compact && !item.isGroup ? (item.status === 'online' ? 'Đang online' : 'Offline') : '')} /></span>{layout.compact && unreadCounts[item.name] > 0 && <span aria-label={`${unreadCounts[item.name]} tin nhắn chưa đọc`} className="grid h-[39cqh] min-w-[39cqh] shrink-0 place-items-center rounded-full border border-[#ffe2a1] bg-[#d82323] px-[6.5cqh] font-number text-[22cqh] leading-none text-white">{unreadCounts[item.name] > 99 ? '99+' : unreadCounts[item.name]}</span>}</p>
                </div>
                </button>
              </li>)}
            </ol>
            </div>
          </MessagesSidebar>
          <MessagesChatPane compact={layout.compact} hidden={layout.compact && !selectedConversation} width={layout.compact ? expandedWidth : expandedWidth - leftWidth} height={panelHeight(MESSAGE_PANEL_SIZE.right.height)}>
            {!activeConversation.name ? <div className="grid h-full w-full place-items-center p-6 text-center"><span className="font-georgia text-[length:var(--ui-p-48)] leading-none font-bold whitespace-nowrap text-[#FFF6DF] italic">HOANGBBCG</span></div> : <>
            <div className="flex h-[var(--ui-p-76)] compact:h-[54px] compact:min-h-[54px] compact:pr-[6px] compact:pl-[6px] compact:gap-[8px] shrink-0 items-center gap-3 border-b border-[#d39a42] bg-[linear-gradient(135deg,#3e200e,#1c0e07)] px-3">
              {layout.compact && <MessagesBackButton onClick={() => { setSelectedConversation(null); setOptionsOpen(false) }} label="Quay lại danh sách tin nhắn" />}
              <button type="button" onClick={openOptions} aria-label={`Mở tùy chọn với ${activeConversation.title || activeConversation.name}`} className="m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none">{activeConversation.isGroup
                ? <MessagesGroupAvatar src={activeConversation.image} alt={`Avatar ${activeConversation.title || activeConversation.name}`} className="size-[var(--ui-p-66)] compact:size-[34px] shrink-0 cursor-pointer" />
                : <MessageAccountAvatar name={activeConversation.name} className="size-[var(--ui-p-66)] compact:size-[34px]" />}</button>
              <div className="min-w-0 flex-1"><p className="font-heading text-[length:var(--ui-p-28)] font-bold text-[#ffe08b]"><SocialPlayerName name={nicknames[activeConversation.name] || activeConversation.title || activeConversation.name} /></p>{!activeConversation.isGroup && <p className="flex items-center gap-2 text-[length:var(--ui-p-18)] text-[#e2c79f]"><span className="shrink-0 compact:[--ui-p-16:12px] compact:[--ui-p-6:2px]"><Dot status={activeConversation.status} /></span>{activeConversation.status === 'online' ? 'Đang hoạt động' : 'Offline'}</p>}</div>
              {!activeConversation.isGroup && <MessagesFriendButton name={activeConversation.name} isFriend={friendship.isFriend} pending={friendship.pending} incoming={friendship.incoming} onClick={event => {
                friendTriggerRef.current = event.currentTarget
                friendship.activate()
              }} />}
              <button type="button" onClick={openOptions} aria-label="Tùy chọn hội thoại" className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}><CrispUiImage src={more} alt="" className="block size-[var(--ui-p-42)] compact:size-[26px] object-contain" /></button>
            </div>
            <div ref={messageListRef} aria-busy={messagesLoading || messageActionPending} className="relative flex min-h-0 flex-1 flex-col justify-start gap-2 compact:gap-[10px] overflow-x-hidden overflow-y-auto bg-black/45 p-3 ">
              {activeMessages.map((item, index) => <div key={item.id} className="shrink-0">
                {index > 0 && item.sentAt - activeMessages[index - 1].sentAt >= 10 * 60_000 && <p className="mb-2 text-center text-[length:var(--ui-p-20)] text-[#fff6df] [text-shadow:0_1px_3px_#160904]">
                  <time dateTime={new Date(item.sentAt).toISOString()}>{formatSentTime(item.sentAt)}</time>
                </p>}
                <div className={`flex items-center gap-3 ${item.outgoing ? 'justify-end' : ''}`}>
                {!item.outgoing && (activeConversation.isGroup
                  ? <MessagesGroupAvatar src={activeConversation.image} alt="" className="size-[var(--ui-p-48)] compact:size-[32px] shrink-0 cursor-pointer" />
                  : <MessageAccountAvatar name={activeConversation.name} className="size-[var(--ui-p-48)] compact:size-[32px]" />)}
                <div className="min-w-0 max-w-[85%]">
                <button type="button" onClick={() => setSelectedMessage(current => current === item.id ? null : item.id)} aria-expanded={selectedMessage === item.id} aria-controls={`message-time-${item.id}`} className={isMessageImage(item.text) ? "m-0 block h-fit w-fit max-w-full cursor-pointer border-0 bg-transparent p-0 leading-none shadow-none" : `relative block max-w-full cursor-pointer rounded-[var(--ui-p-12)] border-[length:var(--ui-p-2)] border-[#dca44d] px-6 py-2 compact:px-[12px] compact:py-[8px] text-left shadow-[inset_0_0_0_1px_#ffe08b55,0_2px_3px_#16090488] ${item.outgoing ? 'bg-[linear-gradient(135deg,#ffe5a6,#efc67f)] text-[#241309]' : 'bg-[linear-gradient(135deg,#3e200eef,#613014ee)] text-[#fff6df]'}`}>
                  {!isMessageImage(item.text) && <span aria-hidden="true" className={`absolute top-[var(--ui-p-12)] size-[var(--ui-p-10)] rotate-45 border-[#dca44d] ${item.outgoing ? '-right-[var(--ui-p-6)] border-t border-r bg-[#efc67f]' : '-left-[var(--ui-p-6)] border-b border-l bg-[#3e200e]'}`} />}
                  <span className="relative block text-[length:var(--ui-p-23)] compact:text-[16px] compact:leading-[1.4] leading-tight">{isMessageImage(item.text) ? <img src={item.text} alt="Ảnh được gửi trong hội thoại" loading="lazy" className="block h-auto w-auto max-h-[260px] max-w-full border-0 p-0 m-0 object-contain" /> : <NumberText text={item.text} />}</span>
                  {item.outgoing && !isMessageImage(item.text) && <svg aria-hidden="true" viewBox="0 0 36 24" className="pointer-events-none absolute -right-2 -bottom-1 h-[var(--ui-p-20)] w-[var(--ui-p-28)]" fill="none" strokeLinecap="round"><path d="M3 19C14 25 25 14 16 13C8 12 11 21 21 18C32 14 21 9 26 4C31-1 39 9 29 11" stroke="#b8873e" strokeWidth="5"/><path d="M3 19C14 25 25 14 16 13C8 12 11 21 21 18C32 14 21 9 26 4C31-1 39 9 29 11" stroke="#ffe5a6" strokeWidth="2"/></svg>}
                </button>
                <p id={`message-time-${item.id}`} hidden={selectedMessage !== item.id} className={`mt-1 text-[length:var(--ui-p-20)] text-[#fff6df] [text-shadow:0_1px_3px_#160904] ${item.outgoing ? 'text-right' : 'text-left'}`}>
                  <time dateTime={new Date(item.sentAt).toISOString()}>{formatSentTime(item.sentAt)}</time>
                </p>
                </div>
                </div>
                {item.blocked && <p role="status" className="mt-1 w-full text-center text-[length:var(--ui-p-20)] text-[#ffe5a6] [text-shadow:0_1px_3px_#160904]">Vui lòng bỏ chặn để gửi.</p>}
                {blockedAt !== undefined && !item.outgoing && item.sentAt > blockedAt && <div role="status" className="mt-1 flex w-full items-center justify-center gap-2 text-center text-[length:var(--ui-p-20)] text-[#ffe5a6] [text-shadow:0_1px_3px_#160904]"><span>Bạn đã chặn người chơi này.</span><button type="button" onClick={() => setBlockedAtByName(current => { const next = { ...current }; delete next[activeConversation.name]; return next })} className={`${buttonInteraction} border-0 bg-transparent p-0 font-bold text-[#ffe08b] underline underline-offset-2`}>Bỏ chặn</button></div>}
              </div>)}
            </div>
            <form data-message-composer onSubmit={handleSendMessage} style={layout.compact && optionsOpen ? { display: 'none' } : undefined} className="relative flex compact:h-[66px] compact:gap-[6px] compact:px-[6px] h-[var(--ui-p-76)] shrink-0 items-center gap-3 border-t border-[#d39a42] bg-[#2d160a] px-3">
              <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={event=>{
                const file=event.currentTarget.files?.[0];event.currentTarget.value=''
                if(!file)return
                if(!account){setDatabaseError('Cần đăng nhập để gửi ảnh.');return}
                setMessageActionPending(true)
                void prepareMessageImage(file).then(image=>{setPendingImage(image);setDatabaseError('')}).catch(error=>setDatabaseError(errorMessage(error))).finally(()=>setMessageActionPending(false))
              }} />
              {pendingImage&&<div className="absolute bottom-full left-3 z-40 rounded border border-[#d39a42] bg-[#241007] p-2"><img src={pendingImage} alt="Ảnh chuẩn bị gửi" className="block max-h-[140px] max-w-[200px] object-contain"/><button type="button" aria-label="Bỏ ảnh đính kèm" disabled={messageActionPending} onClick={()=>setPendingImage(null)} className="absolute right-0 top-0 rounded bg-[#241007] px-2 text-white">×</button></div>}
              {emojiOpen&&<div role="group" aria-label="Chọn emoji" className="absolute bottom-full right-3 z-50 grid grid-cols-6 gap-1 compact:gap-[4px] compact:p-[8px] rounded-lg border border-[#d39a42] bg-[#241007] p-2">
                {['😀','😁','😂','🤣','😊','😍','🥰','😎','🤔','😅','😢','😭','😡','😮','😴','👍','👎','👏','🙏','💪','❤️','🔥','🎉','🏆'].map(emoji=><button type="button" key={emoji} aria-label={`Chèn ${emoji}`} className="grid size-9 compact:size-[32px] shrink-0 place-items-center rounded text-2xl compact:text-[24px] leading-none hover:bg-[#75471c]" onClick={()=>{
                  const start=draftInputRef.current?.selectionStart??draft.length,end=draftInputRef.current?.selectionEnd??draft.length
                  const next=draft.slice(0,start)+emoji+draft.slice(end)
                  if(next.length<=300)setDraft(next)
                  setEmojiOpen(false)
                  requestAnimationFrame(()=>{if(!layout.compact)draftInputRef.current?.focus();draftInputRef.current?.setSelectionRange(start+emoji.length,start+emoji.length)})
                }}>{emoji}</button>)}
              </div>}
              <button type="button" aria-label="Đính kèm ảnh" disabled={messageActionPending} onClick={()=>imageInputRef.current?.click()} className={`${buttonInteraction} grid size-[var(--ui-p-46)] compact:size-[30px] shrink-0 place-items-center rounded-lg border-2 border-[#e7b755] bg-[#3e200e] p-0 text-[#e7b755]`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-30)] compact:size-[22px]" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m3 19 6-7 4 4 3-5 5 8"/></svg></button>
              <input ref={draftInputRef} onFocus={() => setEmojiOpen(false)} aria-label="Nhập tin nhắn" value={draft} onChange={event => setDraft(event.target.value)} maxLength={300} placeholder="Nhập tin nhắn..." className={layout.compact ? `h-[44px] px-[10px] ${messagesFriendsField} ${messagesFriendsInput}` : 'h-[var(--ui-p-50)] min-w-0 flex-1 rounded-xl border border-[#b8873e] bg-[#1c0e07] px-4 text-[length:var(--ui-p-20)] text-white outline-none placeholder:text-white'} />
              <button type="button" aria-label="Biểu tượng cảm xúc" aria-expanded={emojiOpen} onClick={()=>{if(layout.compact)draftInputRef.current?.blur();setEmojiOpen(open=>!open)}} className={`${buttonInteraction} grid size-[var(--ui-p-45)] compact:size-[30px] shrink-0 place-items-center border-0 bg-transparent p-0 leading-none text-[#e7b755]`}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 14c1.5 3 6.5 3 8 0"/><circle cx="8.5" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9" r="1" fill="currentColor" stroke="none"/></svg></button>
              <button type="submit" onPointerDown={event => { if (layout.compact && document.activeElement === draftInputRef.current) event.preventDefault() }} disabled={messageActionPending || (!draft.trim() && !pendingImage)} aria-label="Gửi tin nhắn" className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}><CrispUiImage src={send} alt="" className="block size-[var(--ui-p-50)] compact:size-[36px] object-contain" /></button>
            </form>
            </>}
          </MessagesChatPane>
      {optionsOpen && <MessagesOptionsPanel onRemoveMember={async name => { const id = databaseIds.current[activeConversation.name]; if (!id) throw new Error('Không tìm thấy nhóm.'); await databaseMessages.removeMember(id, name); setConversationList(current => current.map(conversation => conversation.name === activeConversation.name ? { ...conversation, members: conversation.members?.filter(member => member !== name) } : conversation)) }} memberRoles={groupMemberRoles} blockedMembers={blockedGroupMembers} onBlockMember={async(name,blocked)=>{if(account){const id=databaseIds.current[activeConversation.name];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.manageMember(id,name,blocked?"block-member":"unblock-member")}setBlockedGroupMembers(current=>blocked?[...current.filter(member=>member.name!==name),{id:name,name}]:current.filter(member=>member.name!==name))}} onSetDeputy={async(name,enabled)=>{if(account){const id=databaseIds.current[activeConversation.name];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.manageMember(id,name,enabled?"promote-deputy":"demote-deputy")}setGroupMemberRoles(current=>({...current,[name]:enabled?"deputy":"member"}))}} approvalRequired={groupApprovalRequired} pendingMembers={pendingGroupMembers} onSetApproval={async enabled=>{if(account){const id=databaseIds.current[activeConversation.name];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.setApproval(id,enabled)}setGroupApprovalRequired(enabled)}} onInviteMember={async name=>{const groupName=activeConversation.name;let pendingApproval=groupApprovalRequired&&activeConversation.creatorName!==currentUserName;if(account){const id=databaseIds.current[groupName];if(!id)throw new Error("Không tìm thấy nhóm.");const result=await databaseMessages.invite(id,name);pendingApproval=Boolean(result.pendingApproval)}if(!pendingApproval)setConversationList(current=>current.map(c=>c.name===groupName?{...c,members:[...new Set([...(c.members??[]),name])]}:c));else if(!account)setPendingGroupMembers(current=>[...current.filter(m=>m.name!==name),{id:name,name,inviterName:currentUserName}]);return {pendingApproval}}} onReviewMember={async(id,accepted)=>{const target=pendingGroupMembers.find(m=>m.id===id);const groupName=activeConversation.name;if(account){const groupId=databaseIds.current[groupName];if(!groupId)throw new Error("Không tìm thấy nhóm.");await databaseMessages.member(groupId,accepted?"approve":"reject",id)}setPendingGroupMembers(current=>current.filter(m=>m.id!==id));if(accepted&&target)setConversationList(current=>current.map(c=>c.name===groupName?{...c,members:[...new Set([...(c.members??[]),target.name])]}:c))}} onRenameGroup={async name=>{const groupName=activeConversation.name;if(account){const id=databaseIds.current[groupName];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.title(id,name)}setConversationList(current=>current.map(c=>c.name===groupName?{...c,title:name}:c))}} onTransferOwner={async name=>{const groupName=activeConversation.name;if(account){const id=databaseIds.current[groupName];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.transferOwner(id,name)}setGroupMemberRoles(current=>({...current,[currentUserName]:"member",[name]:"owner"}));setConversationList(current=>current.map(c=>c.name===groupName?{...c,creatorName:name}:c))}} onDissolveGroup={async()=>{const groupName=activeConversation.name;if(account){const id=databaseIds.current[groupName];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.member(id,"dissolve");delete databaseIds.current[groupName]}setConversationList(current=>current.filter(c=>c.name!==groupName));setSelectedConversation(null);setOptionsOpen(false)}} onLeaveGroup={async()=>{const groupName=activeConversation.name;if(account){const id=databaseIds.current[groupName];if(!id)throw new Error("Không tìm thấy nhóm.");await databaseMessages.member(id,"leave");delete databaseIds.current[groupName]}setConversationList(current=>current.filter(conversation=>conversation.name!==groupName));setThreads(current=>{const next={...current};delete next[groupName];return next});setSelectedConversation(null);setSelectedMessage(null);setOptionsOpen(false)}} onMemberInfo={onViewInfo} uiScale={layout.compact ? scale * Math.min(expandedWidth * 0.96, panelHeight(sourceHeight) * 0.94 * 894 / 1008) / Math.min(expandedWidth * 0.8, panelHeight(sourceHeight) * 0.8 * 894 / 1008) : undefined} width={layout.compact ? expandedWidth : Math.min(expandedWidth * 0.8, panelHeight(sourceHeight) * 0.8 * 894 / 1008)} height={layout.compact ? panelHeight(sourceHeight) : Math.min(panelHeight(sourceHeight) * 0.88, expandedWidth * 0.88 * 1008 / 894)} image={activeConversation.image} accountName={account ? activeConversation.name : undefined} name={nicknames[activeConversation.name] || activeConversation.title || activeConversation.name} nicknameValue={nicknames[activeConversation.name] ?? ''} isBlocked={isBlocked} notificationMuteDuration={notificationMutes[activeConversation.name]?.until > now ? notificationMutes[activeConversation.name].duration : 1} onSaveNotificationMute={duration => {if(account)void databaseMessages.mute(databaseIds.current[activeConversation.name],duration==='forever'?null:duration).catch(()=>setDatabaseError('Không lưu được tắt thông báo.'));setNotificationMutes(current => ({ ...current, [activeConversation.name]: { duration, until: duration === 'forever' ? Infinity : Date.now() + duration * 60 * 60 * 1000 } }))}} isGroup={Boolean(activeConversation.isGroup)} members={activeConversation.members ?? []} memberImages={memberImages} creatorName={activeConversation.creatorName ?? activeConversation.members?.[0]} memberRowHeight={conversationRowHeight} memberListWidth={leftWidth} selfName={currentUserName || 'Bạn'} selfAvatarIndex={currentAvatarIndex} onChangeGroupImage={nextImage => {if(account){void databaseMessages.avatar(databaseIds.current[activeConversation.name],nextImage).then(url=>{setConversationList(current=>current.map(conversation=>conversation.name===activeConversation.name?{...conversation,image:url}:conversation))}).catch(error=>setDatabaseError(errorMessage(error)));return}setConversationList(current => current.map(conversation => conversation.name === activeConversation.name ? { ...conversation, image: nextImage } : conversation))}} onToggleBlock={blocked => { if(account){const c=databaseConversations.current.find(c=>c.id===databaseIds.current[activeConversation.name]);if(c?.peerId)void databaseMessages.block(c.peerId,blocked).catch(()=>setDatabaseError('Không cập nhật được chặn tin nhắn.'))}
        setBlockedAtByName(current => {
          if (blocked) return { ...current, [activeConversation.name]: Date.now() }
          const next = { ...current }; delete next[activeConversation.name]; return next
        })
      }} onBack={dismissOptions} onViewInfo={() => { setOptionsOpen(false); onViewInfo(activeConversation.name) }} onSaveNickname={value => {if(account){void (activeConversation.isGroup?databaseMessages.title(databaseIds.current[activeConversation.name],value):databaseMessages.member(databaseIds.current[activeConversation.name],'nickname',value)).then(reloadDatabase).catch(()=>setDatabaseError(''));return}setNicknames(current => {
        if (!value) { const next = { ...current }; delete next[activeConversation.name]; return next }
        return { ...current, [activeConversation.name]: value }
      })}} onDeleteConversation={() => { if(account){void databaseMessages.member(databaseIds.current[activeConversation.name],'clear').then(reloadDatabase).catch(()=>setDatabaseError('Không xóa được cuộc trò chuyện.'));setOptionsOpen(false);return}
        const deletedName = activeConversation.name
        setConversationList(current => current.map(conversation => conversation.name === deletedName ? { ...conversation, text: '', lastMessageAt: 0 } : conversation))
        setThreads(current => ({ ...current, [deletedName]: [] }))
        setSelectedConversation(deletedName)
        setSelectedMessage(null)
        setDraft('')
        setOptionsOpen(false)
        optionsTriggerRef.current?.focus()
      }} />}
      {sentNotice.notice}
      {friendship.removalName && <MessagesFriendRemovalConfirmation name={friendship.removalName} skip={friendship.skipConfirmation} onSkipChange={friendship.setSkipConfirmation} onCancel={cancelFriendRemoval} onConfirm={confirmFriendRemoval} />}
    </div>
    </MessagesDialogSurface>}
      {createGroupOpen && <MessagesCreateGroupPanel compact={layout.compact} width={layout.compact ? expandedWidth : Math.min(expandedWidth * 0.8, panelHeight(sourceHeight) * 0.88 * 944 / 997)} height={layout.compact ? panelHeight(sourceHeight) : Math.min(panelHeight(sourceHeight) * 0.88, expandedWidth * 0.8 * 997 / 944)} contacts={getMessageFriendContacts(conversationList.filter(conversation => !conversation.isGroup).map(conversation => ({ name: conversation.name, image: conversation.image, status: conversation.status })))} selfName={currentUserName || 'Bạn'} onBack={dismissCreateGroup} onCreate={handleCreateGroup} onViewInfo={onViewInfo} />}
  </dialog>
}








