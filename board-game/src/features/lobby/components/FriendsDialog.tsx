import { socialListScrollbarClass } from '../../../lib/uiClasses'
import { DesktopFriendsDialog } from './DesktopFriendsDialog'
import { FriendsDialogFrame } from './FriendsDialogFrame'
import { socialPlayerRowClass, socialPlayerListClass, getSocialRowStyle } from './SocialDialogFrame'
import { AvatarRankBadge } from '../../game/components/AvatarRankBadge'
import { AccountAvatar } from './AccountAvatar'
import { useSocialStore, socialActionByName } from '../../../store/socialStore'
import { CrispUiImage } from '../../../lib/CrispUiImage'


import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import type { useFriendsLayout } from '../hooks/useFriendsLayout'

import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import inviteButtonImage from '../../../assets/friends/friend-invite-button.png'
import { SocialPlayerName, socialPresenceTextClass, socialActionButton as baseFriendActionButton, socialActionStyle as friendActionFrame, socialPanelClass } from './SocialUi'
import secondaryActionButtonFrame from '../../../assets/friends/friend-secondary-action-button-frame.png'
import friendAddIcon from '../../../assets/friends/friend-add-icon.png'
import friendSectionTitleFrame from '../../../assets/friends/friend-section-title-frame-tight.png'

import chatButtonImage from '../../../assets/friends/friend-chat-button.png'
import defaultAvatar from '../../../assets/icons/avatar.svg'
import listTabInactive from '../../../assets/friends/friends-tab-list-inactive.png'
import addTabInactive from '../../../assets/friends/friends-tab-add-inactive.png'
import invitesTabInactive from '../../../assets/friends/friends-tab-invites-inactive.png'
import { buttonInteraction, selectedImageTabGlow } from '../../../lib/uiClasses'
import { useFriendChallenge } from '../hooks/useFriendChallenge'
import { useSessionStore } from '../../../store/sessionStore'


type Tab = 'list' | 'add' | 'invites'
type Presence = 'online' | 'offline'
type Friend = { name: string; publicId?: string; presence: Presence; facebook?: boolean; elo: number; piece: string; avatar: string; avatarCode?: string; avatarFrameCode?: string }

function matchesFriendSearch(friend: Friend, query: string) {
  const value = query.trim().toLowerCase()
  return friend.name.toLowerCase().includes(value) || friend.publicId === value
}

function sortOnlineFirst(items: Friend[]) {
  return [...items].sort((left, right) => Number(right.presence === 'online') - Number(left.presence === 'online'))
}

const friends: Friend[] = [
  { name: 'LinhMeo99', presence: 'online', elo: 1100, piece: '帥', avatar: defaultAvatar },
  { name: 'AnhTuan86', presence: 'online', facebook: true, elo: 1100, piece: '將', avatar: defaultAvatar },
  { name: 'MinhQuang', presence: 'online', elo: 1400, piece: '帥', avatar: defaultAvatar },
  { name: 'FonGiaoSu', presence: 'offline', elo: 1800, piece: '將', avatar: defaultAvatar },
  { name: 'HoaPhongLan', presence: 'offline', facebook: true, elo: 1400, piece: '帥', avatar: defaultAvatar },
  { name: 'TomCute', presence: 'offline', elo: 2100, piece: '車', avatar: defaultAvatar },
]

export function isExistingFriend(name: string): boolean {
  const override = useSessionStore.getState().friendshipOverrides[name]
  return override ?? (useSessionStore.getState().account ? useSocialStore.getState().friends.some(f=>f.name===name&&f.status==='accepted') : friends.some(friend => friend.name === name))
}

const suggestions: Friend[] = [
  { name: 'ThanhVan92', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
  { name: 'MeoCon2010', presence: 'online', elo: 2900, piece: '將', avatar: defaultAvatar },
  { name: 'QuocKhanh', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
  { name: 'BinhBoong', presence: 'offline', elo: 2100, piece: '車', avatar: defaultAvatar },
  { name: 'NgocThao07', presence: 'online', elo: 3200, piece: '炮', avatar: defaultAvatar },
  { name: 'DuyKien', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
]

export function hasInitialIncomingFriendRequest(name: string): boolean {
  return useSessionStore.getState().account ? useSocialStore.getState().friends.some(f=>f.name===name&&f.status==='pending'&&f.requestedBy!==useSessionStore.getState().account?.id) : incoming.some(friend => friend.name === name)
}

export type MessageFriendContact = { name: string; image: string; status: Presence }

export function getMessageFriendContacts(extraContacts: MessageFriendContact[] = []): MessageFriendContact[] {
  if(useSessionStore.getState().account)return useSocialStore.getState().friends.filter(f=>f.status==='accepted').map(f=>({name:f.name,image:defaultAvatar,status:'offline' as const}))
  const overrides = useSessionStore.getState().friendshipOverrides
  const knownFriends = [...friends, ...suggestions, ...incoming].filter(friend => overrides[friend.name] ?? friends.includes(friend))
  const contacts = new Map(knownFriends.map(friend => [friend.name, { name: friend.name, image: friend.avatar, status: friend.presence }]))

  for (const contact of extraContacts) {
    if (overrides[contact.name] === true && !contacts.has(contact.name)) contacts.set(contact.name, contact)
  }

  return [...contacts.values()].sort((left, right) => Number(right.status === 'online') - Number(left.status === 'online'))
}

const incoming: Friend[] = [
  { name: 'ThanhMai92', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
  { name: 'MeoCon', presence: 'online', elo: 2900, piece: '將', avatar: defaultAvatar },
  { name: 'QuangHuy88', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
  { name: 'ThuTrang', presence: 'offline', elo: 2100, piece: '車', avatar: defaultAvatar },
]

const outgoing: Friend[] = [
  { name: 'HoangNam01', presence: 'online', elo: 2900, piece: '將', avatar: defaultAvatar },
  { name: 'LinhChi', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
]

const friendButtonInteraction = `${buttonInteraction} transition-[filter] duration-150 enabled:hover:brightness-110 motion-reduce:transition-none`
const friendActionButton = `${baseFriendActionButton} transition-[filter] duration-150 enabled:hover:brightness-110 motion-reduce:transition-none`
const goldButtonBase = `${friendButtonInteraction} flex h-[var(--ui-p-40,40px)] min-w-[var(--ui-p-140,140px)] items-center justify-center gap-2 rounded-[var(--ui-p-11,11px)] border-2 border-[#9a581c] bg-[linear-gradient(#fff0b9,#f3c66f_55%,#dc9540)] px-3 text-[length:var(--ui-p-18,18px)] font-bold text-[#2b1909] shadow-[inset_0_0_0_2px_#ffedb4,0_2px_3px_#59300e88]`
const goldButton = `${goldButtonBase} font-['Times_New_Roman'] italic`

const friendSecondaryActionButton = `${friendActionButton} text-[#6c160f]`
const friendSecondaryActionFrame = { backgroundImage: `url(${secondaryActionButtonFrame})`, backgroundSize: '100% 100%' }
const friendDirectoryClass = "flex h-full min-h-0 flex-col gap-[var(--ui-p-14,14px)]"
const compactFriendListClass = `${socialPlayerListClass} ${socialListScrollbarClass} m-0 w-full list-none`
const friendSectionTitle = "relative flex h-[var(--ui-p-50,50px)] shrink-0 items-center bg-center bg-no-repeat px-[var(--ui-p-50,50px)] font-body text-[length:var(--ui-p-30,30px)] leading-none font-bold not-italic text-[#f6dfa0] [text-shadow:0_1px_1px_#52200d]"
const friendSectionTitleStyle = { backgroundImage: `url(${friendSectionTitleFrame})`, backgroundSize: '100% 100%', top: 'calc((var(--ui-p-54,54px) - var(--ui-p-50,50px)) / 2)' }
const filterButton = `${friendButtonInteraction} relative isolate flex h-[var(--ui-p-54,54px)] min-w-0 items-center justify-center gap-3 rounded-[var(--ui-p-10,10px)] border-2 px-4 font-body text-[length:var(--ui-p-25,25px)] leading-none font-bold not-italic tracking-[0.01em] text-[#2a1708] [text-shadow:0_1px_#f9dfaa]`
const selectedFilter = `[filter:brightness(1.1)_saturate(1.3)_drop-shadow(0_0_1px_#ffcf38)_drop-shadow(0_0_4px_#ffad16)] z-10 border-transparent bg-[linear-gradient(#dfc99d,#bea477)] shadow-[inset_0_1px_1px_#f9e6c1aa,0_1px_2px_#72512b55]`
const idleFilter = 'border-[#a8885b] bg-[linear-gradient(#dfc99d,#bea477)] shadow-[inset_0_1px_1px_#f9e6c1aa,0_1px_2px_#72512b55]'

function FilterIcon({ kind }: { kind: 'all' | 'online' | 'facebook' }) {
  if (kind === 'online') return <span aria-hidden="true" className="size-[var(--ui-p-31,31px)] shrink-0 rounded-full border border-[#399114] bg-[radial-gradient(circle_at_35%_25%,#a7ff56,#42d719_62%,#248d0c)] shadow-[0_1px_1px_#4d331c]" />
  if (kind === 'facebook') return <span aria-hidden="true" className="grid size-[var(--ui-p-38,38px)] shrink-0 place-items-center rounded-full bg-[#2f5595] text-white shadow-[0_1px_1px_#51341f]"><svg viewBox="0 0 24 24" className="size-[var(--ui-p-30,30px)] fill-current"><path d="M13.7 20v-7h2.4l.35-2.75H13.7V8.5c0-.8.22-1.34 1.37-1.34h1.46V4.7c-.25-.03-1.12-.11-2.12-.11-2.1 0-3.53 1.28-3.53 3.63v2.03H8.5V13h2.38v7h2.82Z" /></svg></span>
  return <svg aria-hidden="true" viewBox="0 0 32 24" className="h-[var(--ui-p-36,36px)] w-[var(--ui-p-48,48px)] shrink-0 fill-current"><circle cx="16" cy="6" r="4" /><circle cx="6" cy="8" r="3" /><circle cx="26" cy="8" r="3" /><path d="M10 22v-6a6 6 0 0 1 12 0v6ZM1 21v-5a5 5 0 0 1 8-4v9Zm22 0v-9a5 5 0 0 1 8 4v5Z" /></svg>
}

function AddFriendIcon() {
  return <CrispUiImage src={friendAddIcon} alt="" aria-hidden="true" className="size-[var(--ui-p-35,35px)] shrink-0 object-contain" />
}

function RemoveFriendIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[var(--ui-p-31,31px)] shrink-0 fill-none stroke-current" strokeWidth="5" strokeLinecap="square"><path d="m7 7 18 18M25 7 7 25" /></svg>
}

function SentIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[var(--ui-p-31,31px)] shrink-0 fill-none stroke-current" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 7 7L27 8" /></svg>
}

function SearchIcon({ className = '' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className={`size-[var(--ui-p-31,31px)] shrink-0 fill-none stroke-current ${className}`} strokeWidth="3.5" strokeLinecap="round"><circle cx="13" cy="13" r="7" /><path d="m18.5 18.5 7.5 7.5" /></svg>
}

function FriendSearchButton() {
  return <button className={`${goldButtonBase} font-body not-italic min-w-[var(--ui-p-190,190px)] gap-[var(--ui-p-9,9px)] text-[length:var(--ui-p-23,23px)]`} style={{ height: 'var(--ui-p-60,60px)' }} type="submit"><SearchIcon /><span>Tìm</span></button>
}

function PresenceLabel({ presence, facebook }: { presence: Presence; facebook?: boolean }) {
  const isOnline = presence === 'online'
  return <div className={`m-0 inline-flex h-auto w-max flex-row flex-nowrap items-center gap-[var(--ui-p-6,6px)] whitespace-nowrap ${socialPresenceTextClass} text-[length:var(--ui-p-22,22px)] compact:text-[length:var(--ui-p-24,24px)] leading-[1.3] ${isOnline ? 'text-[#268523]' : 'text-[#5a5147]'}`}>
    <span aria-hidden="true" className={`mr-[var(--ui-p-6,6px)] block size-[var(--ui-p-21,21px)] shrink-0 rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${isOnline ? 'bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]' : 'bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]'}`} />
    <span>{isOnline ? 'Đang online' : 'Offline'}</span>
    {facebook && <span aria-label="Bạn Facebook" className="grid size-[var(--ui-p-21,21px)] shrink-0 place-items-center rounded-[var(--ui-p-3,3px)] border border-[#1d4d91] bg-[#2f67bb] font-arial text-[length:var(--ui-p-21,21px)] font-bold leading-none text-white shadow-[inset_0_1px_0_#8db8ed,0_1px_2px_#49301888]">f</span>}
  </div>
}
function FriendIdentity({ friend, onOpenProfile, compact = false }: { friend: Friend; onOpenProfile?: (name: string) => void; compact?: boolean }) {
  return <div className="flex h-[var(--ui-p-92,92px)] compact:h-[var(--ui-p-128,128px)] box-content pb-[calc(var(--ui-p-92,92px)*0.3)] compact:pb-[calc(var(--ui-p-128,128px)*0.3)] min-w-0 items-center gap-[var(--ui-p-28,28px)] pl-[calc(10px+var(--ui-p-92,92px)*0.35)] compact:pl-[calc(10px+var(--ui-p-128,128px)*0.35)]">
    <div className="relative w-[var(--ui-p-92,92px)] compact:w-[var(--ui-p-128,128px)] shrink-0">{onOpenProfile ? <button type="button" aria-label={`Mở hồ sơ của ${friend.name}`} onClick={() => onOpenProfile(friend.name)} className={`${buttonInteraction} block size-[var(--ui-p-92,92px)] compact:size-[var(--ui-p-128,128px)] shrink-0 rounded-full border-0 bg-transparent p-0`}><span className="block size-[var(--ui-p-92,92px)] compact:size-[var(--ui-p-128,128px)] shrink-0"><AccountAvatar avatarCode={friend.avatarCode} avatarFrameCode={friend.avatarFrameCode} /></span></button> : <span className="block size-[var(--ui-p-92,92px)] compact:size-[var(--ui-p-128,128px)] shrink-0"><AccountAvatar avatarCode={friend.avatarCode} avatarFrameCode={friend.avatarFrameCode} /></span>}<AvatarRankBadge elo={friend.elo} /></div>
    <div className="relative top-[calc(var(--ui-p-92,92px)*0.15)] compact:top-[calc(var(--ui-p-128,128px)*0.15)] grid h-auto min-w-0 grid-rows-[auto_auto] gap-2"><h3 className="m-0 h-auto flex items-center font-heading text-[length:var(--ui-p-25,25px)] compact:text-[length:var(--ui-p-29,29px)] leading-6 text-[#251506]"><SocialPlayerName name={friend.name} equalDigitSize={compact} fullName={compact} /></h3><PresenceLabel presence={friend.presence} facebook={friend.facebook} /></div>
  </div>
}

function FriendRowShade() {
  return <svg viewBox="0 0 600 76" preserveAspectRatio="none" className="size-full" fill="none">
    <path d="M8 48Q0 43 9 38Q4 31 17 29Q12 22 26 21Q22 14 37 13Q35 7 49 8Q53 2 65 5Q72 0 85 4Q91 1 102 2H590Q598 2 598 10V66Q598 74 590 74H51Q42 75 39 70Q27 74 25 66Q14 69 16 61Q5 62 9 55Q0 53 8 48Z" fill="#b68c53" fillOpacity=".46" />
    <path d="M9 48c13-12 22 8 30-3s-10-16-15-7 16 14 22 3-6-21 5-24m-32 37c12-9 24 14 35 0s-9-18-10-8 12 10 19 2M29 29c8-10 15 4 22-4s-5-12 4-16" stroke="#e9cda0" strokeOpacity=".55" strokeWidth="1.2" />
  </svg>
}
function FriendRow({ friend, children, onOpenProfile, compact = false, scale, invitationActions = false }: { friend: Friend; children: ReactNode; invitationActions?: boolean; onOpenProfile?: (name: string) => void; compact?: boolean; scale: number }) {
  const columns = 'grid-cols-[minmax(0,1fr)_var(--ui-p-440,440px)]'
  return <li style={compact ? { ...getSocialRowStyle(scale, compact), flexBasis: 'calc((100cqh - var(--ui-p-54,54px) - var(--ui-p-48,48px) - 2 * var(--ui-p-14,14px)) / 6 - var(--social-row-gap))', ...(invitationActions ? { gridTemplateColumns: 'minmax(0,1fr) ' + Math.round(500 * scale) + 'px' } : {}) } : undefined} className={`${compact ? socialPlayerRowClass : 'relative isolate grid h-[var(--ui-p-150,150px)] min-h-[var(--ui-p-150,150px)] max-h-[var(--ui-p-150,150px)] grid-rows-[var(--ui-p-149,149px)] shrink-0 content-center items-center gap-3 border-b border-[#c5a16a]/55 bg-[linear-gradient(90deg,#ead0a0,#f0dcb3_48%,#e8cca0)] pr-[var(--ui-p-38,38px)] pl-0 py-0 shadow-[inset_0_1px_0_#f8e6bd] last:border-b-transparent'} ${columns}`}>
    {compact && <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" style={{ width: Math.round(132 * scale * 1.5) }} />}
    <span aria-hidden="true" className="pointer-events-none col-start-2 col-end-3 row-start-1 -z-10 min-w-0 overflow-hidden -ml-[var(--ui-p-12,12px)] -translate-x-[var(--ui-p-12,12px)] h-[calc(100%-var(--ui-p-4,4px)-15px)] self-center" style={compact && invitationActions ? { marginLeft: 7, transform: 'none' } : undefined}><FriendRowShade /></span>
    <div className="relative z-10 col-start-1 row-start-1 min-w-0"><FriendIdentity friend={friend} onOpenProfile={onOpenProfile} compact={compact} /></div>
    <div className="relative z-10 col-start-2 row-start-1 flex items-center justify-end gap-[var(--ui-p-18,18px)] pr-[var(--ui-p-8,8px)]" style={compact && invitationActions ? { height: '100%', minHeight: 0, paddingLeft: Math.round(22 * scale) + 7 } : undefined}>{children}</div>
  </li>
}

function MobileFriendsDialog({ dialogRef, layout, onClose, onOpenProfile, onOpenMessages }: { dialogRef: RefObject<HTMLDialogElement | null>; layout: ReturnType<typeof useFriendsLayout>; onClose: () => void; onOpenProfile?: (name: string) => void; onOpenMessages: (name: string, image?: string, status?: Presence) => void }) {
  const [tab, setTab] = useState<Tab>('list')
  const account=useSessionStore(s=>s.account)
  const databaseFriends=useSocialStore(s=>s.friends)
  const databaseUsers=useSocialStore(s=>s.users)
  const toFriend=(u:{name:string;publicId?:string;elo?:number;online?:boolean;avatarCode?:string;avatarFrameCode?:string}):Friend=>({name:u.name,publicId:u.publicId,avatarCode:u.avatarCode,avatarFrameCode:u.avatarFrameCode,presence:u.online?'online':'offline',elo:u.elo??1000,piece:'帥',avatar:defaultAvatar})
  const friends=account?databaseFriends.filter(f=>f.status==='accepted').map(toFriend):[]
  const suggestions=account?databaseUsers.filter(u=>u.id!==account.id).map(toFriend):[]
  const incoming=account?databaseFriends.filter(f=>f.status==='pending'&&f.requestedBy!==account.id).map(toFriend):[]
  const outgoing=account?databaseFriends.filter(f=>f.status==='pending'&&f.requestedBy===account.id).map(toFriend):[]
  useEffect(()=>{if(!account)return;void useSocialStore.getState().refresh();const timer=setInterval(()=>{void useSocialStore.getState().refresh().catch(()=>{})},10000);return()=>clearInterval(timer)},[account?.id])
  const [filter, setFilter] = useState<'all' | 'online' | 'facebook'>('all')
  const [listQuery, setListQuery] = useState('')
  const [query, setQuery] = useState('')
  useEffect(()=>{if(!account)return;const timer=setTimeout(()=>{void useSocialStore.getState().search(query).catch(()=>{})},300);return()=>clearTimeout(timer)},[query,account?.id])
  const legacyOverrides = useSessionStore(state => state.friendshipOverrides)
  const friendshipOverrides=account?Object.fromEntries(databaseFriends.map(f=>[f.name,f.status==='accepted'])):legacyOverrides

  const incomingOverrides = useSessionStore(state => state.incomingFriendRequestOverrides)
  const setIncoming = (name:string,pending:boolean) => {if(!pending)void socialActionByName(name,'remove').catch(()=>{})}
  const received = account?incoming:incoming.filter(friend => (incomingOverrides[friend.name] ?? true) && !(friendshipOverrides[friend.name]??false))
  const pendingFriendRequests = useSessionStore(state => state.pendingFriendRequests)
  const setPending = async(name:string,pending:boolean) => {try{await socialActionByName(name,pending?'request':'remove');return true}catch{setActionFeedback({title:'Bạn bè',message:'Không thực hiện được thao tác.'});return false}}
  const setFriendship = async(name:string,accepted:boolean) => {try{await socialActionByName(name,accepted?'accept':'remove');return true}catch{setActionFeedback({title:'Bạn bè',message:'Không thực hiện được thao tác.'});return false}}
  const sentInvites = outgoing
  const sent = useMemo(() => sentInvites.map(friend => friend.name), [sentInvites])
  const [actionFeedback, setActionFeedback] = useState<{ title: string; message: string } | null>(null)
  const challenge = useFriendChallenge((name, message) => setActionFeedback({ title: `Mời chơi ${name}`, message }))
  const [sentToasts, setSentToasts] = useState<Array<{ id: number; phase: 'visible' | 'exiting' }>>([])
  const sentToastId = useRef(0)
  const sentToastTimeout = useRef<number | undefined>(undefined)
  const sentToastFont = useRef<Promise<FontFace[]> | null>(null)
  const isMounted = useRef(true)
  useEffect(() => {
    isMounted.current = true
    sentToastFont.current = document.fonts.load('700 24px "Cormorant Garamond"', 'Đã gửi').catch(() => [])
    return () => {
      isMounted.current = false
      if (sentToastTimeout.current !== undefined) window.clearTimeout(sentToastTimeout.current)
    }
  }, [])
  const visibleFriends = useMemo(() => sortOnlineFirst([...friends, ...suggestions, ...incoming].filter(friend => {
    if (!(friendshipOverrides[friend.name] ?? friends.includes(friend))) return false
    const matchesGroup = filter === 'facebook'
      ? friend.facebook === true
      : friend.facebook !== true && (filter === 'all' || friend.presence === filter)
    return matchesGroup && matchesFriendSearch(friend, listQuery)
  })), [filter, listQuery, friendshipOverrides,databaseFriends])
  const visibleSuggestions = useMemo(() => sortOnlineFirst(suggestions.filter(friend => !(friendshipOverrides[friend.name] ?? false) && matchesFriendSearch(friend, query))), [query, friendshipOverrides,databaseUsers])
  const selectTab = (next: Tab) => setTab(next)
  const updateFeedback = async (message: string) => {
    if (!message.startsWith('Đã gửi lời mời kết bạn tới')) return
    // Keep the first toast from switching between fallback and loaded fonts.
    await sentToastFont.current
    if (!isMounted.current) return
    if (sentToastTimeout.current !== undefined) window.clearTimeout(sentToastTimeout.current)
    const id = ++sentToastId.current
    setSentToasts(current => [...current.map(toast => ({ ...toast, phase: 'exiting' as const })), { id, phase: 'visible' }])
    sentToastTimeout.current = window.setTimeout(() => {
      setSentToasts(current => current.map(toast => toast.id === id ? { ...toast, phase: 'exiting' } : toast))
      sentToastTimeout.current = undefined
    }, 500)
  }

  const friendListClass = layout.compact ? compactFriendListClass : "m-0 min-h-0 w-full flex-1 list-none overflow-x-hidden overflow-y-auto   rounded-[var(--ui-p-12,12px)] border-[length:var(--ui-p-3,3px)] border-double border-[#c3a371] bg-[#ecd3a3] p-0 shadow-[inset_0_0_0_2px_#f8e5bd,inset_0_0_12px_#b58b4d26] [scrollbar-gutter:stable]"
  const compactContentStyle = layout.compact ? Object.fromEntries([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 38, 40, 48, 50, 53, 54, 56, 60, 85, 90].map(size => ['--ui-p-' + size, Math.round(size * layout.scale * 1.5) + 'px'])) : undefined
  const contentStyle = { ...{ '--ranking-tab-width': Math.round(264 * layout.scale * 1.6) + 'px' }, ...Object.fromEntries([73, 92, 160, 184, 200, 230, 350, 400, 440].map(size => ['--ui-p-' + size, Math.round(size * layout.scale) + 'px'])), ...compactContentStyle } as CSSProperties

  return <dialog ref={dialogRef} aria-labelledby="friends-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
    <FriendsDialogFrame layout={layout} onClose={onClose} contentStyle={contentStyle}>
        <nav className={layout.compact ? 'relative z-10 mx-auto mb-1 flex w-full max-w-full shrink-0 items-end gap-[5px] overflow-x-auto overflow-y-hidden overscroll-x-contain mt-[calc(var(--spacing)-8px)] pb-2 pt-[calc(var(--spacing)+8px)]  ' : 'relative z-10 mx-auto mb-0 flex w-[var(--ui-p-760,760px)] max-w-full gap-2.5'} role="tablist" aria-label="Chức năng bạn bè">
          <button type="button" role="tab" aria-selected={tab === 'list'} onClick={() => selectTab('list')} className={`${friendButtonInteraction} ${layout.compact ? 'relative block h-[var(--ranking-tab-height)] w-[var(--ranking-tab-width)] shrink-0 border-0 bg-transparent p-0' : 'relative flex-1'}`}><CrispUiImage src={listTabInactive} alt="Danh sách" className={`pointer-events-none block ${layout.compact ? 'h-full w-full' : 'h-auto w-full'} transition-[filter] duration-200 motion-reduce:transition-none ${tab === 'list' ? selectedImageTabGlow : ''}`} /></button>
          <button type="button" role="tab" aria-selected={tab === 'add'} onClick={() => selectTab('add')} className={`${friendButtonInteraction} ${layout.compact ? 'relative block h-[var(--ranking-tab-height)] w-[var(--ranking-tab-width)] shrink-0 border-0 bg-transparent p-0' : 'relative flex-1'}`}><CrispUiImage src={addTabInactive} alt="Thêm bạn" className={`pointer-events-none block ${layout.compact ? 'h-full w-full' : 'h-auto w-full'} transition-[filter] duration-200 motion-reduce:transition-none ${tab === 'add' ? selectedImageTabGlow : ''}`} /></button>
          <button type="button" role="tab" aria-selected={tab === 'invites'} onClick={() => selectTab('invites')} className={`${friendButtonInteraction} ${layout.compact ? 'relative block h-[var(--ranking-tab-height)] w-[var(--ranking-tab-width)] shrink-0 border-0 bg-transparent p-0' : 'relative flex-1'}`}><CrispUiImage src={invitesTabInactive} alt={`Lời mời (${received.length})`} className={`pointer-events-none block ${layout.compact ? 'h-full w-full' : 'h-auto w-full'} transition-[filter] duration-200 motion-reduce:transition-none ${tab === 'invites' ? selectedImageTabGlow : ''}`} />{received.length > 0 && <span aria-hidden="true" className="pointer-events-none absolute top-[calc(-1*var(--spacing)-5px)] left-0 grid size-[var(--ui-p-38,38px)] place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] font-number lining-nums tabular-nums text-[length:var(--ui-p-20,20px)] font-semibold leading-none text-white opacity-[0.88] shadow-[0_1px_4px_#321407]">{received.length > 99 ? '99+' : received.length}</span>}</button>
        </nav>
        <section className={socialPanelClass} style={{ ...(layout.compact ? { containerType: 'size', paddingInline: Math.round(20 * layout.scale), borderWidth: Math.round(3 * layout.scale), borderRadius: Math.round(14 * layout.scale) } : {}), backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          {tab === 'list' && <div className={friendDirectoryClass}>
            <div className="grid h-[var(--ui-p-54,54px)] shrink-0 grid-cols-3 gap-2">
              <button type="button" onClick={() => setFilter('all')} className={`${filterButton} ${filter === 'all' ? selectedFilter : idleFilter}`}><FilterIcon kind="all" />Tất cả</button>
              <button type="button" onClick={() => setFilter('online')} className={`${filterButton} ${filter === 'online' ? selectedFilter : idleFilter}`}><FilterIcon kind="online" />Đang online</button>
              <button type="button" onClick={() => setFilter('facebook')} className={`${filterButton} ${filter === 'facebook' ? selectedFilter : idleFilter}`}><FilterIcon kind="facebook" />Bạn Facebook</button>
            </div>
            <form className="relative h-[var(--ui-p-48,48px)] shrink-0" onSubmit={event => { event.preventDefault(); setListQuery(listQuery.trim()) }}>
              <div className="absolute inset-x-0 -top-[var(--ui-p-4,4px)] flex h-[var(--ui-p-60,60px)] gap-3">
                <label className="flex h-[var(--ui-p-60,60px)] min-w-0 flex-1 items-center rounded-[var(--ui-p-10,10px)] border border-[#81420f] bg-[linear-gradient(#5a3219,#2b1508)] px-[var(--ui-p-11,11px)] shadow-[inset_0_0_0_1px_#ffd888,inset_0_0_0_3px_#a45f20,inset_0_0_0_4px_#55250b,0_1px_1px_#5b2b0d]">
                <SearchIcon className="text-[#f6d27b] [filter:drop-shadow(0_1px_#3a1b08)]" />
                <input aria-label="Tìm bạn trong danh sách" value={listQuery} onChange={event => setListQuery(event.target.value)} placeholder="Nhập tên / ID người chơi..." className="ml-2 min-w-0 flex-1 bg-transparent font-arial text-[length:var(--ui-p-24,24px)] compact:text-[length:max(16px,var(--ui-p-24,24px))] leading-none font-normal not-italic lining-nums tabular-nums text-[#e5d8bc] outline-none placeholder:font-body placeholder:not-italic placeholder:text-[length:var(--ui-p-21,21px)] compact:placeholder:text-[length:max(14px,var(--ui-p-21,21px))] placeholder:text-[#c2ae81]" />
                {listQuery && <button type="button" className={`${friendButtonInteraction} grid size-[var(--ui-p-30,30px)] shrink-0 place-items-center rounded-full text-[length:var(--ui-p-28,28px)] leading-none text-[#f6d27b] hover:bg-[#f6d27b]/15`} aria-label="Xóa nội dung tìm kiếm" onClick={() => setListQuery('')}>×</button>}
                </label>
                <FriendSearchButton />
              </div>
            </form>
            <ul className={friendListClass}>
              {visibleFriends.map(friend => <FriendRow key={friend.name} friend={friend} onOpenProfile={onOpenProfile} compact={layout.compact} scale={layout.scale}>{friend.presence === 'online' && <button type="button" className={friendActionButton} style={{ ...friendActionFrame, width: Math.round((layout.compact ? 285 : 230) * layout.scale), height: Math.round((layout.compact ? 106 : 82) * layout.scale), fontSize: Math.round((layout.compact ? 34 : 27) * layout.scale) }} aria-label={`Mời chơi ${friend.name}`} disabled={challenge.pending} onClick={() => void challenge.invite(friend.name)}><span aria-hidden="true" className="pointer-events-none block size-[var(--ui-p-35,35px)] shrink-0 bg-no-repeat" style={{ width: Math.round(40 * layout.scale), height: Math.round(40 * layout.scale), backgroundImage: `url(${inviteButtonImage})`, backgroundSize: `${Math.round(183 * layout.scale * 40 / 35)}px ${Math.round(54 * layout.scale * 40 / 35)}px`, backgroundPosition: `${Math.round(-30 * layout.scale * 40 / 35)}px ${Math.round(-9 * layout.scale * 40 / 35)}px` }} /><span className="whitespace-nowrap">Mời chơi</span></button>}<button type="button" className={`${friendButtonInteraction} shrink-0 flex items-center justify-center`} aria-label={`Nhắn tin ${friend.name}`} onClick={() => onOpenMessages(friend.name, friend.avatar, friend.presence)}><CrispUiImage src={chatButtonImage} alt="Nhắn tin" style={{ width: Math.round((layout.compact ? 118 : 104) * layout.scale), height: Math.round((layout.compact ? 100 : 88) * layout.scale) }} className="pointer-events-none object-contain" /></button></FriendRow>)}
            </ul>
          </div>}
          {tab === 'add' && <div className={friendDirectoryClass}>
            <div className="flex h-[var(--ui-p-54,54px)] shrink-0 items-start">
              <h3 className={`${friendSectionTitle} w-full`} style={friendSectionTitleStyle}>♟ Gợi ý cho bạn</h3>
            </div>
            <form className="relative h-[var(--ui-p-48,48px)] shrink-0" onSubmit={event => { event.preventDefault(); updateFeedback(query.trim() ? `Đã tìm người chơi “${query.trim()}”.` : 'Hãy nhập tên người chơi để tìm.') }}>
              <div className="absolute inset-x-0 -top-[var(--ui-p-4,4px)] flex h-[var(--ui-p-60,60px)] gap-3">
                <label className="flex h-[var(--ui-p-60,60px)] min-w-0 flex-1 items-center rounded-[var(--ui-p-10,10px)] border border-[#81420f] bg-[linear-gradient(#5a3219,#2b1508)] px-[var(--ui-p-11,11px)] text-[#f6d27b] shadow-[inset_0_0_0_1px_#ffd888,inset_0_0_0_3px_#a45f20,inset_0_0_0_4px_#55250b,0_1px_1px_#5b2b0d]"><SearchIcon /><input aria-label="Tìm người chơi để kết bạn" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nhập tên / ID người chơi..." className="ml-2 min-w-0 flex-1 bg-transparent font-arial text-[length:var(--ui-p-24,24px)] compact:text-[length:max(16px,var(--ui-p-24,24px))] leading-none font-normal not-italic lining-nums tabular-nums text-[#e5d8bc] outline-none placeholder:font-body placeholder:not-italic placeholder:text-[length:var(--ui-p-21,21px)] compact:placeholder:text-[length:max(14px,var(--ui-p-21,21px))] placeholder:text-[#c2ae81]" /></label>
                <FriendSearchButton />
              </div>
            </form>
            <ul className={friendListClass}>{visibleSuggestions.map(friend => <FriendRow key={friend.name} friend={friend} onOpenProfile={onOpenProfile} compact={layout.compact} scale={layout.scale}><button type="button" disabled={sent.includes(friend.name)} className={sent.includes(friend.name) ? `${friendSecondaryActionButton} opacity-60` : friendActionButton} style={sent.includes(friend.name) ? { ...friendActionFrame, width: layout.compact ? Math.round(280 * layout.scale) : 173, height: layout.compact ? Math.round(118 * layout.scale) : 'var(--ui-p-60,60px)', fontSize: layout.compact ? Math.round(33 * layout.scale) : undefined, flexShrink: 0, filter: 'brightness(.78)', opacity: 1 } : { ...friendActionFrame, width: layout.compact ? Math.round(280 * layout.scale) : 173, height: layout.compact ? Math.round(118 * layout.scale) : 'var(--ui-p-60,60px)', fontSize: layout.compact ? Math.round(33 * layout.scale) : undefined, flexShrink: 0 }} onClick={async () => { if (sent.includes(friend.name)) return; if(!await setPending(friend.name, true))return; updateFeedback(`Đã gửi lời mời kết bạn tới ${friend.name}.`) }}>{sent.includes(friend.name) ? <><SentIcon /><span>Đã gửi</span></> : <><AddFriendIcon /><span>Kết bạn</span></>}</button></FriendRow>)}</ul>
          </div>}
          {tab === 'invites' && <div className="flex h-full flex-col gap-3"><div className="flex min-h-0 flex-[2] flex-col"><h3 className={friendSectionTitle} style={friendSectionTitleStyle}>Lời mời đã nhận (<span className="font-number lining-nums tabular-nums font-semibold">{received.length}</span>)</h3><ul className={friendListClass} style={{ '--social-visible-rows': 4 } as CSSProperties}>{sortOnlineFirst(received).map(friend => <FriendRow invitationActions key={friend.name} friend={friend} onOpenProfile={onOpenProfile} compact={layout.compact} scale={layout.scale}><div className="flex w-full min-w-0 items-center gap-[var(--ui-p-10,10px)]" style={layout.compact ? { height: 'calc(100% - var(--ui-p-4,4px) - 23px)', maxHeight: Math.round(108 * layout.scale), transform: 'translateX(-3px)', ...{ '--ui-p-35': Math.round(42 * layout.scale) + 'px', '--ui-p-31': Math.round(37 * layout.scale) + 'px' } } : undefined}><button type="button" className={friendActionButton} style={{ ...friendActionFrame, width: layout.compact ? 'calc((100% - var(--ui-p-10,10px)) / 2)' : 145, height: layout.compact ? '100%' : 'var(--ui-p-60,60px)', minWidth: 0, flexShrink: 0, paddingInline: layout.compact ? Math.round(6 * layout.scale) : 6, gap: layout.compact ? Math.round(4 * layout.scale) : 4, fontSize: layout.compact ? Math.round(27 * layout.scale) : 18 }} aria-label={`Chấp nhận lời mời của ${friend.name}`} onClick={async () => { if(!await setFriendship(friend.name, true))return; updateFeedback(`Đã chấp nhận lời mời của ${friend.name}.`) }}><AddFriendIcon /><span className="whitespace-nowrap">Chấp nhận</span></button><button type="button" className={friendSecondaryActionButton} style={{ ...friendSecondaryActionFrame, width: layout.compact ? 'calc((100% - var(--ui-p-10,10px)) / 2)' : 145, height: layout.compact ? '100%' : 'var(--ui-p-60,60px)', minWidth: 0, flexShrink: 0, paddingInline: layout.compact ? Math.round(6 * layout.scale) : 6, gap: layout.compact ? Math.round(4 * layout.scale) : 4, fontSize: layout.compact ? Math.round(27 * layout.scale) : 18 }} aria-label={`Từ chối lời mời của ${friend.name}`} onClick={() => { setIncoming(friend.name, false); updateFeedback(`Đã từ chối lời mời của ${friend.name}.`) }}><RemoveFriendIcon /><span>Từ chối</span></button></div></FriendRow>)}</ul></div><div className="flex min-h-0 flex-1 flex-col"><h3 className={friendSectionTitle} style={friendSectionTitleStyle}>Đã gửi lời mời (<span className="font-number lining-nums tabular-nums font-semibold">{sentInvites.length}</span>)</h3><ul className={friendListClass} style={{ '--social-visible-rows': 2 } as CSSProperties}>{sortOnlineFirst(sentInvites).map(friend => <FriendRow invitationActions key={friend.name} friend={friend} onOpenProfile={onOpenProfile} compact={layout.compact} scale={layout.scale}><div className="flex w-full min-w-0 items-center justify-end gap-[var(--ui-p-10,10px)]" style={layout.compact ? { height: 'calc(100% - var(--ui-p-4,4px) - 23px)', maxHeight: Math.round(108 * layout.scale), transform: 'translateX(-3px)', ...{ '--ui-p-35': Math.round(42 * layout.scale) + 'px', '--ui-p-31': Math.round(42 * layout.scale) + 'px' } } : undefined}><button type="button" className={friendSecondaryActionButton} style={{ ...friendSecondaryActionFrame, width: layout.compact ? 'calc((100% - var(--ui-p-10,10px)) / 2)' : 145, height: layout.compact ? '100%' : 'var(--ui-p-60,60px)', minWidth: 0, flexShrink: 0, paddingInline: layout.compact ? Math.round(6 * layout.scale) : 6, gap: layout.compact ? Math.round(4 * layout.scale) : 4, fontSize: layout.compact ? Math.round(30 * layout.scale) : 18 }} aria-label={`Hủy lời mời tới ${friend.name}`} onClick={() => { setPending(friend.name, false); updateFeedback(`Đã hủy lời mời tới ${friend.name}.`) }}><RemoveFriendIcon /><span>Hủy</span></button></div></FriendRow>)}</ul></div></div>}

        </section>
    </FriendsDialogFrame>
    {actionFeedback && <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50" onClick={() => setActionFeedback(null)}><section role="alertdialog" aria-modal="true" aria-labelledby="friend-action-title" aria-describedby="friend-action-message" className="mx-5 w-[var(--ui-p-380,380px)] max-w-full rounded-[var(--ui-p-10,10px)] border-2 border-[#d8ac57] bg-[#351d10] p-5 text-center text-[#ffe3a2] shadow-xl" onClick={event => event.stopPropagation()}><h3 id="friend-action-title" className="font-cormorant text-2xl font-bold">{actionFeedback.title}</h3><p id="friend-action-message" className="my-4 text-base">{actionFeedback.message}</p><button type="button" autoFocus className={`${goldButton} mx-auto`} onClick={() => setActionFeedback(null)}>Đóng</button></section></div>}
    {sentToasts.map(toast => <div key={toast.id} className="pointer-events-none fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"><p role="status" onAnimationEnd={() => setSentToasts(current => current.filter(item => item.id !== toast.id))} className={`m-0 min-w-[var(--ui-p-190,190px)] rounded-[var(--ui-p-3,3px)] border border-green-700 bg-green-600 px-5 py-2 text-center font-cormorant text-2xl font-bold tracking-wide text-white shadow-lg ${toast.phase === 'exiting' ? 'friend-request-sent-exit' : ''}`}>Đã gửi</p></div>)}
  </dialog>
}


export function FriendsDialog(props: Parameters<typeof MobileFriendsDialog>[0]) {
  return props.layout.compact ? <MobileFriendsDialog {...props} /> : <DesktopFriendsDialog {...props} />
}
