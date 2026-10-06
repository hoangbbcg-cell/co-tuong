import { CrispUiImage } from '../../../lib/CrispUiImage'
import { getCrispUiLayout } from '../../../lib/crispUiRendering'
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import type { useFriendsLayout } from '../hooks/useFriendsLayout'
import friendsTitle from '../../../assets/friends/friends-banner.png'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import inviteButtonImage from '../../../assets/friends/friend-invite-button.png'
import { SocialAvatar, socialActionButton as baseFriendActionButton, socialActionStyle as friendActionFrame, socialPanelClass } from './SocialUi'
import secondaryActionButtonFrame from '../../../assets/friends/friend-secondary-action-button-frame.png'
import friendAddIcon from '../../../assets/friends/friend-add-icon.png'
import friendSectionTitleFrame from '../../../assets/friends/friend-section-title-frame-tight.png'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import chatButtonImage from '../../../assets/friends/friend-chat-button.png'
import defaultAvatar from '../../../assets/icons/avatar.svg'
import listTabInactive from '../../../assets/friends/friends-tab-list-inactive.png'
import addTabInactive from '../../../assets/friends/friends-tab-add-inactive.png'
import invitesTabInactive from '../../../assets/friends/friends-tab-invites-inactive.png'
import { buttonInteraction, selectedImageTabGlow } from '../../../lib/uiClasses'
import { getRankProgress } from '../../../lib/rankProgression'

import { RankTitleBadge } from '../../game/components/RankTitleBadge'

type Tab = 'list' | 'add' | 'invites'
type Presence = 'online' | 'offline'
type Friend = { name: string; presence: Presence; facebook?: boolean; elo: number; piece: string; avatar: string }

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
  return friends.some(friend => friend.name === name)
}

const suggestions: Friend[] = [
  { name: 'ThanhVan92', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
  { name: 'MeoCon2010', presence: 'online', elo: 2900, piece: '將', avatar: defaultAvatar },
  { name: 'QuocKhanh', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
  { name: 'BinhBoong', presence: 'offline', elo: 2100, piece: '車', avatar: defaultAvatar },
  { name: 'NgocThao07', presence: 'online', elo: 3200, piece: '炮', avatar: defaultAvatar },
  { name: 'DuyKien', presence: 'online', elo: 2500, piece: '帥', avatar: defaultAvatar },
]

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
const goldButton = `${friendButtonInteraction} flex h-[var(--ui-p-40,40px)] min-w-[var(--ui-p-140,140px)] items-center justify-center gap-2 rounded-[var(--ui-p-11,11px)] border-2 border-[#9a581c] bg-[linear-gradient(#fff0b9,#f3c66f_55%,#dc9540)] px-3 font-['Times_New_Roman'] text-[length:var(--ui-p-18,18px)] font-bold italic text-[#2b1909] shadow-[inset_0_0_0_2px_#ffedb4,0_2px_3px_#59300e88]`

const friendSecondaryActionButton = `${friendActionButton} text-[#6c160f]`
const friendSecondaryActionFrame = { backgroundImage: `url(${secondaryActionButtonFrame})`, backgroundSize: '100% 100%' }
const friendDirectoryClass = "flex h-full min-h-0 flex-col gap-[var(--ui-p-14,14px)]"
const friendListClass = "m-0 min-h-0 w-full flex-1 list-none overflow-x-hidden overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[var(--ui-p-12,12px)] border-[length:var(--ui-p-3,3px)] border-double border-[#c3a371] bg-[#ecd3a3] p-0 shadow-[inset_0_0_0_2px_#f8e5bd,inset_0_0_12px_#b58b4d26] [scrollbar-gutter:stable]"
const friendSectionTitle = "relative flex h-[var(--ui-p-50,50px)] shrink-0 items-center bg-center bg-no-repeat px-[var(--ui-p-50,50px)] font-['Times_New_Roman'] text-[length:var(--ui-p-27,27px)] leading-none font-bold italic text-[#f6dfa0] [text-shadow:0_1px_1px_#52200d]"
const friendSectionTitleStyle = { backgroundImage: `url(${friendSectionTitleFrame})`, backgroundSize: '100% 100%', top: 'calc((var(--ui-p-54,54px) - var(--ui-p-50,50px)) / 2)' }
const filterButton = `${friendButtonInteraction} flex h-[var(--ui-p-54,54px)] min-w-0 items-center justify-center gap-3 rounded-[var(--ui-p-10,10px)] border-2 px-4 font-['Times_New_Roman'] text-[length:var(--ui-p-22,22px)] leading-none font-bold italic tracking-[0.01em] text-[#2a1708] [text-shadow:0_1px_#f9dfaa]`
const selectedFilter = 'border-[#925015] bg-[linear-gradient(#fff1bd,#f7cf81_52%,#d9953c)] shadow-[inset_0_0_0_1px_#fff8d0,inset_0_0_0_3px_#bc7725,0_2px_3px_#5a310f99]'
const idleFilter = 'border-[#a8885b] bg-[linear-gradient(#dfc99d,#bea477)] shadow-[inset_0_1px_1px_#f9e6c1aa,0_1px_2px_#72512b55]'

function FilterIcon({ kind }: { kind: 'all' | 'online' | 'facebook' }) {
  if (kind === 'online') return <span aria-hidden="true" className="size-[var(--ui-p-27,27px)] shrink-0 rounded-full border border-[#399114] bg-[radial-gradient(circle_at_35%_25%,#a7ff56,#42d719_62%,#248d0c)] shadow-[0_1px_1px_#4d331c]" />
  if (kind === 'facebook') return <span aria-hidden="true" className="grid size-[var(--ui-p-33,33px)] shrink-0 place-items-center rounded-full bg-[#2f5595] text-white shadow-[0_1px_1px_#51341f]"><svg viewBox="0 0 24 24" className="size-[var(--ui-p-26,26px)] fill-current"><path d="M13.7 20v-7h2.4l.35-2.75H13.7V8.5c0-.8.22-1.34 1.37-1.34h1.46V4.7c-.25-.03-1.12-.11-2.12-.11-2.1 0-3.53 1.28-3.53 3.63v2.03H8.5V13h2.38v7h2.82Z" /></svg></span>
  return <svg aria-hidden="true" viewBox="0 0 32 24" className="h-[var(--ui-p-32,32px)] w-[var(--ui-p-42,42px)] shrink-0 fill-current"><circle cx="16" cy="6" r="4" /><circle cx="6" cy="8" r="3" /><circle cx="26" cy="8" r="3" /><path d="M10 22v-6a6 6 0 0 1 12 0v6ZM1 21v-5a5 5 0 0 1 8-4v9Zm22 0v-9a5 5 0 0 1 8 4v5Z" /></svg>
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
  return <button className={`${goldButton} min-w-[var(--ui-p-170,170px)] gap-[var(--ui-p-9,9px)] text-[length:var(--ui-p-21,21px)]`} style={{ height: 'var(--ui-p-56,56px)' }} type="submit"><SearchIcon /><span>Tìm</span></button>
}

function PresenceLabel({ presence, facebook }: { presence: Presence; facebook?: boolean }) {
  const isOnline = presence === 'online'
  return <div className={`m-0 inline-flex h-[var(--ui-p-21,21px)] w-max flex-row flex-nowrap items-center gap-[var(--ui-p-6,6px)] whitespace-nowrap text-[length:var(--ui-p-19,19px)] leading-5 font-medium ${isOnline ? 'text-[#268523]' : 'text-[#5a5147]'}`}>
    <span aria-hidden="true" className={`mr-[var(--ui-p-6,6px)] block size-[var(--ui-p-21,21px)] shrink-0 rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${isOnline ? 'bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]' : 'bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]'}`} />
    <span>{isOnline ? 'Đang online' : 'Offline'}</span>
    {facebook && <span aria-label="Bạn Facebook" className="grid size-[var(--ui-p-21,21px)] shrink-0 place-items-center rounded-[var(--ui-p-3,3px)] border border-[#1d4d91] bg-[#2f67bb] font-arial text-[length:var(--ui-p-21,21px)] font-bold leading-none text-white shadow-[inset_0_1px_0_#8db8ed,0_1px_2px_#49301888]">f</span>}
  </div>
}
function FriendIdentity({ friend, onOpenProfile }: { friend: Friend; onOpenProfile?: (name: string) => void }) {
  return <div className="flex h-[var(--ui-p-76,76px)] min-w-0 items-center gap-[var(--ui-p-28,28px)] pl-[var(--ui-p-16,16px)]">
    {onOpenProfile ? <button type="button" aria-label={`Mở hồ sơ của ${friend.name}`} onClick={() => onOpenProfile(friend.name)} className={`${buttonInteraction} block size-[var(--ui-p-76,76px)] shrink-0 rounded-full border-0 bg-transparent p-0`}><SocialAvatar src={friend.avatar} /></button> : <SocialAvatar src={friend.avatar} />}
    <div className="grid h-[var(--ui-p-53,53px)] min-w-0 grid-rows-[var(--ui-p-24,24px)_var(--ui-p-21,21px)] gap-2"><h3 className="m-0 h-[var(--ui-p-24,24px)] truncate font-arial text-[length:var(--ui-p-22,22px)] leading-6 font-bold text-[#251506]">{friend.name}</h3><PresenceLabel presence={friend.presence} facebook={friend.facebook} /></div>
  </div>
}

function FriendRank({ friend }: { friend: Friend }) {
  const { name, elo } = getRankProgress(friend.elo)
  return <div className="flex w-[var(--ui-p-320,320px)] shrink-0 items-center gap-3">
    <span aria-label={`Elo ${elo}`} className="block h-[var(--ui-p-84,84px)] w-[var(--ui-p-166,166px)] shrink-0"><span className="block h-[var(--ui-p-66-382,66.382px)] w-full"><RankTitleBadge elo={elo} /></span></span>
    <span className="min-w-0 whitespace-nowrap font-['Times_New_Roman'] text-[length:var(--ui-p-20,20px)] leading-5 font-bold italic text-[#553016]">{name}</span>
  </div>
}
function FriendRowShade() {
  return <svg viewBox="0 0 600 76" preserveAspectRatio="none" className="size-full" fill="none">
    <path d="M8 48Q0 43 9 38Q4 31 17 29Q12 22 26 21Q22 14 37 13Q35 7 49 8Q53 2 65 5Q72 0 85 4Q91 1 102 2H590Q598 2 598 10V66Q598 74 590 74H51Q42 75 39 70Q27 74 25 66Q14 69 16 61Q5 62 9 55Q0 53 8 48Z" fill="#b68c53" fillOpacity=".46" />
    <path d="M9 48c13-12 22 8 30-3s-10-16-15-7 16 14 22 3-6-21 5-24m-32 37c12-9 24 14 35 0s-9-18-10-8 12 10 19 2M29 29c8-10 15 4 22-4s-5-12 4-16" stroke="#e9cda0" strokeOpacity=".55" strokeWidth="1.2" />
  </svg>
}

function FriendRow({ friend, children, onOpenProfile }: { friend: Friend; children: ReactNode; onOpenProfile?: (name: string) => void }) {
  const columns = 'grid-cols-[minmax(0,1fr)_var(--ui-p-240,240px)_var(--ui-p-330,330px)]'
  const brownContentPosition = 'relative -left-[var(--ui-p-50,50px)]'
  return <li className={`relative isolate grid h-[var(--ui-p-90,90px)] min-h-[var(--ui-p-90,90px)] max-h-[var(--ui-p-90,90px)] grid-rows-[var(--ui-p-85,85px)] shrink-0 ${columns} content-center items-center gap-3 border-b border-[#c5a16a]/55 bg-[linear-gradient(90deg,#ead0a0,#f0dcb3_48%,#e8cca0)] pr-[var(--ui-p-38,38px)] pl-0 py-0 shadow-[inset_0_1px_0_#f8e6bd] last:border-b-transparent`}><span aria-hidden="true" className="pointer-events-none col-start-2 col-end-4 row-start-1 -z-10 -ml-[calc(var(--ui-p-38,38px)+var(--ui-p-50,50px))] h-[calc(100%-var(--ui-p-4,4px))] self-center"><FriendRowShade /></span><div className="col-start-1 row-start-1"><FriendIdentity friend={friend} onOpenProfile={onOpenProfile} /></div><div className={`${brownContentPosition} col-start-2 row-start-1`}><FriendRank friend={friend} /></div><div className="col-start-3 row-start-1 flex items-center justify-end gap-2 pr-[var(--ui-p-8,8px)]">{children}</div></li>
}

export function FriendsDialog({ dialogRef, layout, onClose, onOpenProfile }: { dialogRef: RefObject<HTMLDialogElement | null>; layout: ReturnType<typeof useFriendsLayout>; onClose: () => void; onOpenProfile?: (name: string) => void }) {
  const [tab, setTab] = useState<Tab>('list')
  const [filter, setFilter] = useState<'all' | 'online' | 'facebook'>('all')
  const [listQuery, setListQuery] = useState('')
  const [query, setQuery] = useState('')

  const [received, setReceived] = useState(incoming)
  const [sentInvites, setSentInvites] = useState<Friend[]>([])
  const sent = useMemo(() => sentInvites.map(friend => friend.name), [sentInvites])
  const [actionFeedback, setActionFeedback] = useState<{ title: string; message: string } | null>(null)
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
  const visibleFriends = useMemo(() => sortOnlineFirst(friends.filter(friend => {
    const matchesGroup = filter === 'facebook'
      ? friend.facebook === true
      : friend.facebook !== true && (filter === 'all' || friend.presence === filter)
    return matchesGroup && friend.name.toLowerCase().includes(listQuery.trim().toLowerCase())
  })), [filter, listQuery])
  const visibleSuggestions = useMemo(() => sortOnlineFirst(suggestions.filter(friend => friend.name.toLowerCase().includes(query.trim().toLowerCase()))), [query])
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

  return <dialog ref={dialogRef} aria-labelledby="friends-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[var(--ui-p-22,22px)] border-[length:var(--ui-p-5,5px)] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[var(--ui-p-36,36px)] pt-[var(--ui-p-52,52px)] pb-[var(--ui-p-28,28px)] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={getCrispUiLayout(layout.scale, layout.width, layout.height)}>
      <header className="absolute -top-[var(--ui-p-50,50px)] left-1/2 z-20 w-[var(--ui-p-650,650px)] -translate-x-1/2 text-center"><CrispUiImage src={friendsTitle} alt="" className="pointer-events-none mx-auto h-auto w-full" /><h2 id="friends-title" className="sr-only">Bạn bè</h2></header>
      <button type="button" onClick={onClose} className={`${friendButtonInteraction} absolute top-[var(--ui-p-24,24px)] right-[var(--ui-p-28,28px)] z-30 grid size-[var(--ui-p-56,56px)] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[length:var(--ui-p-42,42px)] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
      <div className="relative flex h-full min-h-0 flex-col">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[var(--ui-p-8,8px)] h-[var(--ui-p-104,104px)] overflow-hidden rounded-[var(--ui-p-10,10px)] opacity-80 shadow-[inset_0_0_18px_8px_#241107]">
          <CrispUiImage src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
        </div>
        <nav className="relative z-10 mx-auto mb-0 flex w-[var(--ui-p-760,760px)] max-w-full gap-2.5" role="tablist" aria-label="Chức năng bạn bè">
          <button type="button" role="tab" aria-selected={tab === 'list'} onClick={() => selectTab('list')} className={`${friendButtonInteraction} flex-1`}><CrispUiImage src={listTabInactive} alt="Danh sách" className={`pointer-events-none block h-auto w-full transition-[filter] duration-200 motion-reduce:transition-none ${tab === 'list' ? selectedImageTabGlow : ''}`} /></button>
          <button type="button" role="tab" aria-selected={tab === 'add'} onClick={() => selectTab('add')} className={`${friendButtonInteraction} flex-1`}><CrispUiImage src={addTabInactive} alt="Thêm bạn" className={`pointer-events-none block h-auto w-full transition-[filter] duration-200 motion-reduce:transition-none ${tab === 'add' ? selectedImageTabGlow : ''}`} /></button>
          <button type="button" role="tab" aria-selected={tab === 'invites'} onClick={() => selectTab('invites')} className={`${friendButtonInteraction} relative flex-1`}><CrispUiImage src={invitesTabInactive} alt={`Lời mời (${received.length})`} className={`pointer-events-none block h-auto w-full transition-[filter] duration-200 motion-reduce:transition-none ${tab === 'invites' ? selectedImageTabGlow : ''}`} />{received.length > 0 && <span aria-hidden="true" className="pointer-events-none absolute -top-1 right-0 grid size-[var(--ui-p-28,28px)] place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] font-arial text-[length:var(--ui-p-15,15px)] font-bold leading-none text-white shadow-[0_1px_4px_#321407]">{received.length > 99 ? '99+' : received.length}</span>}</button>
        </nav>
        <section className={socialPanelClass} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          {tab === 'list' && <div className={friendDirectoryClass}>
            <div className="grid h-[var(--ui-p-54,54px)] shrink-0 grid-cols-3 gap-2">
              <button type="button" onClick={() => setFilter('all')} className={`${filterButton} ${filter === 'all' ? selectedFilter : idleFilter}`}><FilterIcon kind="all" />Tất cả</button>
              <button type="button" onClick={() => setFilter('online')} className={`${filterButton} ${filter === 'online' ? selectedFilter : idleFilter}`}><FilterIcon kind="online" />Đang online</button>
              <button type="button" onClick={() => setFilter('facebook')} className={`${filterButton} ${filter === 'facebook' ? selectedFilter : idleFilter}`}><FilterIcon kind="facebook" />Bạn Facebook</button>
            </div>
            <form className="relative h-[var(--ui-p-48,48px)] shrink-0" onSubmit={event => { event.preventDefault(); setListQuery(listQuery.trim()) }}>
              <div className="absolute inset-x-0 -top-[var(--ui-p-4,4px)] flex h-[var(--ui-p-56,56px)] gap-3">
                <label className="flex h-[var(--ui-p-56,56px)] min-w-0 flex-1 items-center rounded-[var(--ui-p-10,10px)] border border-[#81420f] bg-[linear-gradient(#5a3219,#2b1508)] px-[var(--ui-p-11,11px)] shadow-[inset_0_0_0_1px_#ffd888,inset_0_0_0_3px_#a45f20,inset_0_0_0_4px_#55250b,0_1px_1px_#5b2b0d]">
                <SearchIcon className="text-[#f6d27b] [filter:drop-shadow(0_1px_#3a1b08)]" />
                <input aria-label="Tìm bạn trong danh sách" value={listQuery} onChange={event => setListQuery(event.target.value)} placeholder="Nhập tên / ID người chơi..." className="ml-2 min-w-0 flex-1 bg-transparent font-['Times_New_Roman'] text-[length:var(--ui-p-23,23px)] leading-none font-normal italic text-[#e5d8bc] outline-none placeholder:text-[#c2ae81]" />
                {listQuery && <button type="button" className={`${friendButtonInteraction} grid size-[var(--ui-p-30,30px)] shrink-0 place-items-center rounded-full text-[length:var(--ui-p-28,28px)] leading-none text-[#f6d27b] hover:bg-[#f6d27b]/15`} aria-label="Xóa nội dung tìm kiếm" onClick={() => setListQuery('')}>×</button>}
                </label>
                <FriendSearchButton />
              </div>
            </form>
            <ul className={friendListClass}>
              {visibleFriends.map(friend => <FriendRow key={friend.name} friend={friend} onOpenProfile={onOpenProfile}><button type="button" className={friendActionButton} style={friendActionFrame} aria-label={`Mời chơi ${friend.name}`} onClick={() => setActionFeedback({ title: `Mời chơi ${friend.name}`, message: 'Chức năng mời bạn vào ván chưa được hỗ trợ.' })}><span aria-hidden="true" className="pointer-events-none block size-[var(--ui-p-35,35px)] shrink-0 bg-no-repeat" style={{ backgroundImage: `url(${inviteButtonImage})`, backgroundSize: `${Math.round(183 * layout.scale)}px ${Math.round(54 * layout.scale)}px`, backgroundPosition: `${Math.round(-30 * layout.scale)}px ${Math.round(-9 * layout.scale)}px` }} /><span className="whitespace-nowrap">Mời chơi</span></button><button type="button" className={friendButtonInteraction} aria-label={`Nhắn tin ${friend.name}`} onClick={() => setActionFeedback({ title: `Nhắn tin ${friend.name}`, message: 'Chức năng nhắn tin riêng chưa được hỗ trợ.' })}><CrispUiImage src={chatButtonImage} alt="Nhắn tin" className="pointer-events-none h-[var(--ui-p-54,54px)] w-[var(--ui-p-63,63px)] object-contain" /></button></FriendRow>)}
            </ul>
          </div>}
          {tab === 'add' && <div className={friendDirectoryClass}>
            <div className="flex h-[var(--ui-p-54,54px)] shrink-0 items-start">
              <h3 className={`${friendSectionTitle} w-full`} style={friendSectionTitleStyle}>♟ Gợi ý cho bạn</h3>
            </div>
            <form className="relative h-[var(--ui-p-48,48px)] shrink-0" onSubmit={event => { event.preventDefault(); updateFeedback(query.trim() ? `Đã tìm người chơi “${query.trim()}”.` : 'Hãy nhập tên người chơi để tìm.') }}>
              <div className="absolute inset-x-0 -top-[var(--ui-p-4,4px)] flex h-[var(--ui-p-56,56px)] gap-3">
                <label className="flex h-[var(--ui-p-56,56px)] min-w-0 flex-1 items-center rounded-[var(--ui-p-10,10px)] border border-[#81420f] bg-[linear-gradient(#5a3219,#2b1508)] px-[var(--ui-p-11,11px)] text-[#f6d27b] shadow-[inset_0_0_0_1px_#ffd888,inset_0_0_0_3px_#a45f20,inset_0_0_0_4px_#55250b,0_1px_1px_#5b2b0d]"><SearchIcon /><input aria-label="Tìm người chơi để kết bạn" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nhập tên / ID người chơi..." className="ml-2 min-w-0 flex-1 bg-transparent font-['Times_New_Roman'] text-[length:var(--ui-p-23,23px)] leading-none font-normal italic text-[#e5d8bc] outline-none placeholder:text-[#c2ae81]" /></label>
                <FriendSearchButton />
              </div>
            </form>
            <ul className={friendListClass}>{visibleSuggestions.map(friend => <FriendRow key={friend.name} friend={friend} onOpenProfile={onOpenProfile}><button type="button" disabled={sent.includes(friend.name)} className={sent.includes(friend.name) ? `${friendSecondaryActionButton} opacity-60` : friendActionButton} style={sent.includes(friend.name) ? { ...friendActionFrame, width: 173, height: 'var(--ui-p-60,60px)', flexShrink: 0, filter: 'brightness(.78)', opacity: 1 } : { ...friendActionFrame, width: 173, height: 'var(--ui-p-60,60px)', flexShrink: 0 }} onClick={() => { if (sent.includes(friend.name)) return; setSentInvites(current => current.some(item => item.name === friend.name) ? current : [...current, friend]); updateFeedback(`Đã gửi lời mời kết bạn tới ${friend.name}.`) }}>{sent.includes(friend.name) ? <><SentIcon /><span>Đã gửi</span></> : <><AddFriendIcon /><span>Kết bạn</span></>}</button></FriendRow>)}</ul>
          </div>}
          {tab === 'invites' && <div className="flex h-full flex-col gap-3"><div className="flex min-h-0 flex-[2] flex-col"><h3 className={friendSectionTitle} style={friendSectionTitleStyle}>Lời mời đã nhận ({received.length})</h3><ul className={friendListClass}>{sortOnlineFirst(received).map(friend => <FriendRow key={friend.name} friend={friend} onOpenProfile={onOpenProfile}><div className="flex items-center gap-[var(--ui-p-10,10px)]"><button type="button" className={friendActionButton} style={{ ...friendActionFrame, width: 145, height: 'var(--ui-p-60,60px)', paddingInline: 6, gap: 4, fontSize: 18 }} aria-label={`Chấp nhận lời mời của ${friend.name}`} onClick={() => { setReceived(current => current.filter(item => item.name !== friend.name)); updateFeedback(`Đã chấp nhận lời mời của ${friend.name}.`) }}><AddFriendIcon /><span className="whitespace-nowrap">Chấp nhận</span></button><button type="button" className={friendSecondaryActionButton} style={{ ...friendSecondaryActionFrame, width: 145, height: 'var(--ui-p-60,60px)', paddingInline: 6, gap: 4, fontSize: 18 }} aria-label={`Từ chối lời mời của ${friend.name}`} onClick={() => { setReceived(current => current.filter(item => item.name !== friend.name)); updateFeedback(`Đã từ chối lời mời của ${friend.name}.`) }}><RemoveFriendIcon /><span>Từ chối</span></button></div></FriendRow>)}</ul></div><div className="flex min-h-0 flex-1 flex-col"><h3 className={friendSectionTitle} style={friendSectionTitleStyle}>Đã gửi lời mời ({sentInvites.length})</h3><ul className={friendListClass}>{sortOnlineFirst(sentInvites).map(friend => <FriendRow key={friend.name} friend={friend} onOpenProfile={onOpenProfile}><button type="button" className={friendSecondaryActionButton} style={friendSecondaryActionFrame} aria-label={`Hủy lời mời tới ${friend.name}`} onClick={() => { setSentInvites(current => current.filter(item => item.name !== friend.name)); updateFeedback(`Đã hủy lời mời tới ${friend.name}.`) }}><RemoveFriendIcon /><span>Hủy</span></button></FriendRow>)}</ul></div></div>}

        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[var(--ui-p-76,76px)] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
    {actionFeedback && <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50" onClick={() => setActionFeedback(null)}><section role="alertdialog" aria-modal="true" aria-labelledby="friend-action-title" aria-describedby="friend-action-message" className="mx-5 w-[var(--ui-p-380,380px)] max-w-full rounded-[var(--ui-p-10,10px)] border-2 border-[#d8ac57] bg-[#351d10] p-5 text-center text-[#ffe3a2] shadow-xl" onClick={event => event.stopPropagation()}><h3 id="friend-action-title" className="font-cormorant text-2xl font-bold">{actionFeedback.title}</h3><p id="friend-action-message" className="my-4 text-base">{actionFeedback.message}</p><button type="button" autoFocus className={`${goldButton} mx-auto`} onClick={() => setActionFeedback(null)}>Đóng</button></section></div>}
    {sentToasts.map(toast => <div key={toast.id} className="pointer-events-none fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"><p role="status" onAnimationEnd={() => setSentToasts(current => current.filter(item => item.id !== toast.id))} className={`m-0 min-w-[var(--ui-p-190,190px)] rounded-[var(--ui-p-3,3px)] border border-green-700 bg-green-600 px-5 py-2 text-center font-cormorant text-2xl font-bold tracking-wide text-white shadow-lg ${toast.phase === 'exiting' ? 'friend-request-sent-exit' : ''}`}>Đã gửi</p></div>)}
  </dialog>
}
