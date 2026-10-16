import { NumberText } from '../../../lib/NumberText'
import { useEffect, useState, type CSSProperties, type RefObject } from 'react'
import { useRef, type FormEvent, type MouseEvent } from 'react'
import type { useRankingLayout } from '../hooks/useRankingLayout'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { buttonInteraction, messageSelectionHighlight, messageScrollbarClass } from '../../../lib/uiClasses'
import { MessagesSidebar, MessagesChatPane } from './MessagesPanels'
import { MessagesOptionsPanel, type NotificationMuteDuration } from './MessagesOptionsPanel'
import { MessagesCreateGroupPanel, type MessagesCreateGroupPayload } from './MessagesCreateGroupPanel'
import { MessagesFriendButton, MessagesFriendRemovalConfirmation } from './MessagesFriendButton'
import { MessagesGroupAvatar } from './MessagesGroupAvatar'
import { useMessageFriendship } from '../hooks/useMessageFriendship'
import { getMessageFriendContacts } from './FriendsDialog'
import { useSessionStore } from '../../../store/sessionStore'
import { MESSAGE_PANEL_SIZE, MESSAGE_FRAME_REFERENCE_WIDTH } from './messagesPanelLayout'
import groupButton from '../../../assets/messages/group-button.png'
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
type MessageItem = { id: number; text: string; outgoing: boolean; sentAt: number; blocked?: boolean }
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

/** Messaging prototype with live client-side threads; server sync is not connected. */
export function MessagesDialog({ dialogRef, layout, onClose, openRequest, onViewInfo }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: ReturnType<typeof useRankingLayout>
  onClose: () => void
  openRequest?: MessageConversationRequest | null
  onViewInfo: (name: string) => void
}) {
  const [now, setNow] = useState(() => Date.now())
  const [selectedConversation, setSelectedConversation] = useState<string | null>(memberPreviewGroupId)
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const currentUserName = useSessionStore(state => state.name)
  const currentAvatarIndex = useSessionStore(state => state.avatarIndex)
  // Temporary preview requested by the user: the current account is a regular member.
  const [conversationList, setConversationList] = useState<ConversationItem[]>(() => {
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
  const [threads, setThreads] = useState<Record<string, MessageItem[]>>(() => ({
    ...initialThreads,
    [memberPreviewGroupId]: [{ id: 1, text: 'Chào mừng bạn vào nhóm!', outgoing: false, sentAt: fixtureNow }],
  }))
  // A few incoming fixture messages start unread so the badge can be previewed.
  const [lastReadAt, setLastReadAt] = useState<Record<string, number>>(() => Object.fromEntries(
    conversations.map(conversation => [conversation.name, ['Picolozz', 'Nguyễn Hoàng Minh Khôi', 'An'].includes(conversation.name) ? 0 : fixtureNow]),
  ))
  const unreadCounts = Object.fromEntries(conversationList.map(conversation => [conversation.name,
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
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [notificationMutes, setNotificationMutes] = useState<Record<string, { duration: NotificationMuteDuration; until: number }>>({})
  const [createGroupOpen, setCreateGroupOpen] = useState(false)
  const groupTriggerRef = useRef<HTMLButtonElement>(null)
  const optionsTriggerRef = useRef<HTMLButtonElement | null>(null)
  const nextMessageId = useRef(Date.now())
  const messageListRef = useRef<HTMLDivElement>(null)
  const conversationListRef = useRef<HTMLOListElement>(null)
  const [conversationRowHeight, setConversationRowHeight] = useState(0)
  const [friendRequestToast, setFriendRequestToast] = useState<'visible' | 'exiting' | null>(null)
  const friendRequestToastTimer = useRef<number | undefined>(undefined)
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
  useEffect(() => () => {
    if (friendRequestToastTimer.current !== undefined) window.clearTimeout(friendRequestToastTimer.current)
  }, [])
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
  const sourceWidth = MESSAGE_PANEL_SIZE.left.width + MESSAGE_PANEL_SIZE.right.width
  const sourceHeight = Math.max(MESSAGE_PANEL_SIZE.left.height, MESSAGE_PANEL_SIZE.right.height)
  const designWidth = layout.width * sourceWidth / MESSAGE_FRAME_REFERENCE_WIDTH
  const frameHeight = layout.width * sourceHeight / MESSAGE_FRAME_REFERENCE_WIDTH
  const viewport = window.visualViewport
  const scale = Math.min(1, ((viewport?.width ?? window.innerWidth) - 24) / designWidth, ((viewport?.height ?? window.innerHeight) - 24) / frameHeight)
  const expandedWidth = Math.round(Math.min((viewport?.width ?? window.innerWidth) - 12, designWidth * scale * 1.2))
  const leftWidth = Math.round(expandedWidth * MESSAGE_PANEL_SIZE.left.width / sourceWidth)
  const panelHeight = (height: number) => Math.round(frameHeight * scale * height / sourceHeight)
  const activeConversation = conversationList.find(conversation => conversation.name === (selectedConversation ?? 'Picolozz')) ?? conversationList[0] ?? { name: '', image: defaultAvatar, status: 'offline' as const, text: '', lastMessageAt: 0 }
  const normalizedSearchQuery = normalizeSearchValue(searchQuery.trim())
  const visibleConversations = normalizedSearchQuery
    ? conversationList.filter(conversation => [conversation.name, conversation.title ?? '', nicknames[conversation.name] ?? '', conversation.playerId ?? ''].some(value => normalizeSearchValue(value).includes(normalizedSearchQuery)))
    : conversationList
  const activeMessages = threads[activeConversation.name] ?? []
  const blockedAt = blockedAtByName[activeConversation.name]
  const isBlocked = blockedAt !== undefined
  const friendship = useMessageFriendship(activeConversation.name)
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
  function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || !activeConversation.name) return
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
  function handleCreateGroup(group: MessagesCreateGroupPayload) {
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
  return <dialog ref={dialogRef} aria-label="Tin nhắn" onCancel={event => { event.preventDefault(); if (friendship.removalName) cancelFriendRemoval(); else if (createGroupOpen) dismissCreateGroup(); else if (optionsOpen) dismissOptions(); else onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#ffebba] backdrop:bg-black/45" style={{ ...getCrispUiLayout(scale, designWidth, frameHeight), width: expandedWidth, '--ui-p-45': `${Math.round(45 * scale)}px`, '--ui-p-70': `${Math.round(70 * scale)}px` } as CSSProperties}>
    <div className="relative flex h-full w-full items-start border-0 bg-transparent p-0 shadow-none">
      <button type="button" onClick={onClose} className={`${buttonInteraction} absolute -top-[var(--ui-p-1)] right-[var(--ui-p-10)] z-30 grid size-[var(--ui-p-54)] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[length:var(--ui-p-42)] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng Tin nhắn">×</button>
          <MessagesSidebar width={leftWidth} height={panelHeight(MESSAGE_PANEL_SIZE.left.height)}>
            <button ref={groupTriggerRef} type="button" onClick={() => setCreateGroupOpen(true)} aria-label="Tạo nhóm" className={`${buttonInteraction} m-0 h-[var(--ui-p-56)] w-full max-w-full shrink-0 border-0 bg-transparent p-0 leading-none`}>
              <CrispUiImage src={groupButton} alt="" className="block h-full w-full object-fill" />
            </button>
            <label className="my-3 flex h-[var(--ui-p-50)] shrink-0 items-center gap-3 rounded-full border-2 border-[#dca44d] bg-[#241309] px-4">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-24)] shrink-0" fill="none" stroke="#e5b45d" strokeWidth="2"><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></svg>
              <input aria-label="Tìm tên hoặc ID người chơi" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Tìm tên hoặc ID người chơi" className="min-w-0 flex-1 border-0 bg-transparent text-[length:var(--ui-p-20)] text-white outline-none placeholder:text-white" />
            </label>
            <ol ref={conversationListRef} className={`m-0 flex min-h-0 flex-1 flex-col overflow-y-auto p-0 pr-1 ${messageScrollbarClass}`}>
              {visibleConversations.map(item => <li key={item.name} className="relative flex h-[calc(100%/8)] min-h-0 flex-none shrink-0 border-b border-[#875026] px-1 py-1 leading-tight">
                {selectedConversation === item.name && <span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-lg border-2 border-[#ffe08b] ${messageSelectionHighlight}`} />}
                <button type="button" onClick={() => { setSelectedConversation(item.name); setSelectedMessage(null) }} aria-pressed={selectedConversation === item.name} className="relative flex min-w-0 flex-1 items-center gap-2 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-[#ffe08b]">
                {item.isGroup
                  ? <MessagesGroupAvatar src={item.image} alt="" className="size-[var(--ui-p-50)] shrink-0 cursor-pointer" />
                  : <CrispUiImage src={item.image} alt="" className={`block size-[var(--ui-p-50)] shrink-0 cursor-pointer ${item.image === computer ? 'object-contain' : 'rounded-full object-cover'}`} />}
                <div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-2"><span className="flex min-w-0 items-center gap-1.5 truncate font-heading text-[length:var(--ui-p-22)] font-bold text-[#fff6df]">{item.isGroup && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-22)] shrink-0 text-[#f4c75e]" fill="currentColor"><path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm14 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM12 10c-3 0-5 1.5-5 4v6h10v-6c0-2.5-2-4-5-4ZM5 12c-2.5 0-4 1.5-4 3.5V19h4v-5c0-.7.1-1.4.4-2H5Zm14 0h-.4c.3.6.4 1.3.4 2v5h4v-3.5c0-2-1.5-3.5-4-3.5Z" /></svg>}<span className="truncate"><NumberText text={nicknames[item.name] || item.title || item.name} compact weight="semibold" /></span></span>{unreadCounts[item.name] > 0 ? <span aria-label={`${unreadCounts[item.name]} tin nhắn chưa đọc`} className="grid size-[var(--ui-p-28)] shrink-0 place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] font-number lining-nums tabular-nums text-[length:var(--ui-p-15)] font-semibold leading-none text-white opacity-[0.88] shadow-[0_1px_4px_#321407]">{unreadCounts[item.name] > 99 ? '99+' : unreadCounts[item.name]}</span> : item.lastMessageAt > 0 && <span className="shrink-0 whitespace-nowrap font-number lining-nums tabular-nums text-[length:var(--ui-p-16)] text-[#d6b982]">{formatMessageTime(item.lastMessageAt, now)}</span>}</div>
                  <p className="mt-1 flex items-center gap-2 text-[length:var(--ui-p-17)] text-[#e2c79f]">{!item.isGroup && <Dot status={item.status} />}<span className="truncate"><NumberText text={item.text} /></span></p>
                </div>
                </button>
              </li>)}
              {visibleConversations.length === 0 && <li role="status" className="px-3 py-5 text-center font-cormorant text-[length:var(--ui-p-20)] text-[#d6b982]">Không tìm thấy người chơi</li>}
            </ol>
          </MessagesSidebar>
          <MessagesChatPane width={expandedWidth - leftWidth} height={panelHeight(MESSAGE_PANEL_SIZE.right.height)}>
            {conversationList.length === 0 ? <div className="grid h-full w-full place-items-center bg-black/45 p-6 text-center font-cormorant text-[length:var(--ui-p-24)] text-[#e2c79f]">Chưa có cuộc trò chuyện</div> : <>
            <div className="flex h-[var(--ui-p-76)] shrink-0 items-center gap-3 border-b border-[#d39a42] bg-[linear-gradient(135deg,#3e200e,#1c0e07)] px-3">
              <button type="button" onClick={openOptions} aria-label={`Mở tùy chọn với ${activeConversation.title || activeConversation.name}`} className="m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none">{activeConversation.isGroup
                ? <MessagesGroupAvatar src={activeConversation.image} alt={`Avatar ${activeConversation.title || activeConversation.name}`} className="size-[var(--ui-p-66)] shrink-0 cursor-pointer" />
                : <CrispUiImage src={activeConversation.image} alt={`Avatar ${activeConversation.title || activeConversation.name}`} className={`size-[var(--ui-p-66)] shrink-0 cursor-pointer ${activeConversation.image === computer ? 'object-contain' : 'rounded-full object-cover'}`} />}</button>
              <div className="min-w-0 flex-1"><p className="font-heading text-[length:var(--ui-p-28)] font-bold text-[#ffe08b]"><NumberText text={nicknames[activeConversation.name] || activeConversation.title || activeConversation.name} compact weight="semibold" /></p>{!activeConversation.isGroup && <p className="flex items-center gap-2 text-[length:var(--ui-p-18)] text-[#e2c79f]"><Dot status={activeConversation.status} />Đang hoạt động</p>}</div>
              {!activeConversation.isGroup && <MessagesFriendButton name={activeConversation.name} isFriend={friendship.isFriend} pending={friendship.pending} incoming={friendship.incoming} onClick={event => {
                friendTriggerRef.current = event.currentTarget
                const sendsRequest = !friendship.isFriend && !friendship.pending && !friendship.incoming
                friendship.activate()
                if (!sendsRequest) return
                if (friendRequestToastTimer.current !== undefined) window.clearTimeout(friendRequestToastTimer.current)
                setFriendRequestToast('visible')
                friendRequestToastTimer.current = window.setTimeout(() => {
                  setFriendRequestToast('exiting')
                  friendRequestToastTimer.current = undefined
                }, 500)
              }} />}
              <button type="button" onClick={openOptions} aria-label="Tùy chọn hội thoại" className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}><CrispUiImage src={more} alt="" className="block size-[var(--ui-p-42)] object-contain" /></button>
            </div>
            <div ref={messageListRef} className="relative flex min-h-0 flex-1 flex-col justify-start gap-2 overflow-y-auto bg-black/45 p-3 [scrollbar-width:none]">
              {activeMessages.map((item, index) => <div key={item.id} className="shrink-0">
                {index > 0 && item.sentAt - activeMessages[index - 1].sentAt >= 10 * 60_000 && <p className="mb-2 text-center text-[length:var(--ui-p-20)] text-[#fff6df] [text-shadow:0_1px_3px_#160904]">
                  <time dateTime={new Date(item.sentAt).toISOString()}>{formatSentTime(item.sentAt)}</time>
                </p>}
                <div className={`flex items-center gap-3 ${item.outgoing ? 'justify-end' : ''}`}>
                {!item.outgoing && (activeConversation.isGroup
                  ? <MessagesGroupAvatar src={activeConversation.image} alt="" className="size-[var(--ui-p-48)] shrink-0 cursor-pointer" />
                  : <CrispUiImage src={activeConversation.image} alt="" className={`size-[var(--ui-p-48)] shrink-0 cursor-pointer ${activeConversation.image === computer ? 'object-contain' : 'rounded-full object-cover'}`} />)}
                <div className="max-w-[85%]">
                <button type="button" onClick={() => setSelectedMessage(current => current === item.id ? null : item.id)} aria-expanded={selectedMessage === item.id} aria-controls={`message-time-${item.id}`} className={`relative block max-w-full cursor-pointer rounded-[var(--ui-p-12)] border-[length:var(--ui-p-2)] border-[#dca44d] px-6 py-2 text-left shadow-[inset_0_0_0_1px_#ffe08b55,0_2px_3px_#16090488] ${item.outgoing ? 'bg-[linear-gradient(135deg,#ffe5a6,#efc67f)] text-[#241309]' : 'bg-[linear-gradient(135deg,#3e200eef,#613014ee)] text-[#fff6df]'}`}>
                  <span aria-hidden="true" className={`absolute top-[var(--ui-p-12)] size-[var(--ui-p-10)] rotate-45 border-[#dca44d] ${item.outgoing ? '-right-[var(--ui-p-6)] border-t border-r bg-[#efc67f]' : '-left-[var(--ui-p-6)] border-b border-l bg-[#3e200e]'}`} />
                  <span className="relative block text-[length:var(--ui-p-23)] leading-tight"><NumberText text={item.text} /></span>
                  {item.outgoing && <svg aria-hidden="true" viewBox="0 0 36 24" className="pointer-events-none absolute -right-2 -bottom-1 h-[var(--ui-p-20)] w-[var(--ui-p-28)]" fill="none" strokeLinecap="round"><path d="M3 19C14 25 25 14 16 13C8 12 11 21 21 18C32 14 21 9 26 4C31-1 39 9 29 11" stroke="#b8873e" strokeWidth="5"/><path d="M3 19C14 25 25 14 16 13C8 12 11 21 21 18C32 14 21 9 26 4C31-1 39 9 29 11" stroke="#ffe5a6" strokeWidth="2"/></svg>}
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
            <form onSubmit={handleSendMessage} className="flex h-[var(--ui-p-76)] shrink-0 items-center gap-3 border-t border-[#d39a42] bg-[#2d160a] px-3">
              <button type="button" aria-label="Đính kèm ảnh" className={`${buttonInteraction} grid size-[var(--ui-p-46)] shrink-0 place-items-center rounded-lg border-2 border-[#e7b755] bg-[#3e200e] p-0 text-[#e7b755]`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-30)]" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m3 19 6-7 4 4 3-5 5 8"/></svg></button>
              <input aria-label="Nhập tin nhắn" value={draft} onChange={event => setDraft(event.target.value)} maxLength={300} placeholder="Nhập tin nhắn..." className="h-[var(--ui-p-50)] min-w-0 flex-1 rounded-xl border border-[#b8873e] bg-[#1c0e07] px-4 text-[length:var(--ui-p-20)] text-white outline-none placeholder:text-white" />
              <button type="button" aria-label="Biểu tượng cảm xúc" className={`${buttonInteraction} shrink-0 border-0 bg-transparent p-0 text-[length:var(--ui-p-45)] leading-none text-[#e7b755]`}>☺</button>
              <button type="submit" aria-label="Gửi tin nhắn" className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}><CrispUiImage src={send} alt="" className="block size-[var(--ui-p-50)] object-contain" /></button>
            </form>
            </>}
          </MessagesChatPane>
      {optionsOpen && <MessagesOptionsPanel width={Math.min(expandedWidth * 0.8, panelHeight(sourceHeight) * 0.8 * 894 / 1008)} height={Math.min(panelHeight(sourceHeight) * 0.88, expandedWidth * 0.88 * 1008 / 894)} image={activeConversation.image} name={nicknames[activeConversation.name] || activeConversation.title || activeConversation.name} nicknameValue={nicknames[activeConversation.name] ?? ''} isBlocked={isBlocked} notificationMuteDuration={notificationMutes[activeConversation.name]?.until > now ? notificationMutes[activeConversation.name].duration : 1} onSaveNotificationMute={duration => setNotificationMutes(current => ({ ...current, [activeConversation.name]: { duration, until: duration === 'forever' ? Infinity : Date.now() + duration * 60 * 60 * 1000 } }))} isGroup={Boolean(activeConversation.isGroup)} members={activeConversation.members ?? []} memberImages={memberImages} creatorName={activeConversation.creatorName ?? activeConversation.members?.[0]} memberRowHeight={conversationRowHeight} memberListWidth={leftWidth} selfName={currentUserName || 'Bạn'} selfAvatarIndex={currentAvatarIndex} onChangeGroupImage={nextImage => setConversationList(current => current.map(conversation => conversation.name === activeConversation.name ? { ...conversation, image: nextImage } : conversation))} onToggleBlock={blocked => {
        setBlockedAtByName(current => {
          if (blocked) return { ...current, [activeConversation.name]: Date.now() }
          const next = { ...current }; delete next[activeConversation.name]; return next
        })
      }} onBack={dismissOptions} onViewInfo={() => { setOptionsOpen(false); onViewInfo(activeConversation.name) }} onSaveNickname={value => setNicknames(current => {
        if (!value) { const next = { ...current }; delete next[activeConversation.name]; return next }
        return { ...current, [activeConversation.name]: value }
      })} onDeleteConversation={() => {
        const deletedName = activeConversation.name
        setConversationList(current => current.map(conversation => conversation.name === deletedName ? { ...conversation, text: '', lastMessageAt: 0 } : conversation))
        setThreads(current => ({ ...current, [deletedName]: [] }))
        setSelectedConversation(deletedName)
        setSelectedMessage(null)
        setDraft('')
        setOptionsOpen(false)
        optionsTriggerRef.current?.focus()
      }} />}
      {createGroupOpen && <MessagesCreateGroupPanel width={Math.min(expandedWidth * 0.8, panelHeight(sourceHeight) * 0.88 * 944 / 997)} height={Math.min(panelHeight(sourceHeight) * 0.88, expandedWidth * 0.8 * 997 / 944)} contacts={getMessageFriendContacts(conversationList.filter(conversation => !conversation.isGroup).map(conversation => ({ name: conversation.name, image: conversation.image, status: conversation.status })))} selfName={currentUserName || 'Bạn'} onBack={dismissCreateGroup} onCreate={handleCreateGroup} />}
      {friendRequestToast && <div className="pointer-events-none fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"><p role="status" onAnimationEnd={() => setFriendRequestToast(null)} className={`m-0 min-w-[var(--ui-p-190,190px)] rounded-[var(--ui-p-3,3px)] border border-green-700 bg-green-600 px-5 py-2 text-center font-cormorant text-2xl font-bold tracking-wide text-white shadow-lg ${friendRequestToast === 'exiting' ? 'friend-request-sent-exit' : ''}`}>Đã gửi</p></div>}
      {friendship.removalName && <MessagesFriendRemovalConfirmation name={friendship.removalName} skip={friendship.skipConfirmation} onSkipChange={friendship.setSkipConfirmation} onCancel={cancelFriendRemoval} onConfirm={confirmFriendRemoval} />}
    </div>
  </dialog>
}


