import { useMemo, useState, type ReactNode, type RefObject } from 'react'
import type { useFriendsLayout } from '../hooks/useFriendsLayout'
import friendsTitle from '../../../assets/friends/friends-banner.png'
import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import inviteButtonImage from '../../../assets/friends/friend-invite-button.png'
import { SocialAvatar, socialActionButton as friendActionButton, socialActionStyle as friendActionFrame, socialPanelClass } from './SocialUi'
import secondaryActionButtonFrame from '../../../assets/friends/friend-secondary-action-button-frame.png'
import friendAddIcon from '../../../assets/friends/friend-add-icon.png'
import friendSectionTitleFrame from '../../../assets/friends/friend-section-title-frame.png'
import socialHeaderLandscape from '../../../assets/rankings/social-header-landscape.png'
import chatButtonImage from '../../../assets/friends/friend-chat-button.png'
import defaultAvatar from '../../../assets/icons/avatar.svg'
import listTabActive from '../../../assets/friends/friends-tab-list-active.png'
import listTabInactive from '../../../assets/friends/friends-tab-list-inactive.png'
import addTabActive from '../../../assets/friends/friends-tab-add-active.png'
import addTabInactive from '../../../assets/friends/friends-tab-add-inactive.png'
import invitesTabActive from '../../../assets/friends/friends-tab-invites-active.png'
import invitesTabInactive from '../../../assets/friends/friends-tab-invites-inactive.png'
import { buttonInteraction } from '../../../lib/uiClasses'

type Tab = 'list' | 'add' | 'invites'
type Presence = 'online' | 'facebook' | 'playing' | 'offline'
type Friend = { name: string; presence: Presence; rank: string; piece: string; avatar: string }

const friends: Friend[] = [
  { name: 'LinhMeo99', presence: 'online', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'AnhTuan86', presence: 'facebook', rank: 'Đại Sư', piece: '將', avatar: defaultAvatar },
  { name: 'MinhQuang', presence: 'online', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'FonGiaoSu', presence: 'offline', rank: 'Đại Sư', piece: '將', avatar: defaultAvatar },
  { name: 'HoaPhongLan', presence: 'facebook', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'TomCute', presence: 'offline', rank: 'Danh Thủ', piece: '車', avatar: defaultAvatar },
]

const suggestions: Friend[] = [
  { name: 'ThanhVan92', presence: 'online', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'MeoCon2010', presence: 'playing', rank: 'Đại Sư', piece: '將', avatar: defaultAvatar },
  { name: 'QuocKhanh', presence: 'online', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'BinhBoong', presence: 'offline', rank: 'Danh Thủ', piece: '車', avatar: defaultAvatar },
  { name: 'NgocThao07', presence: 'online', rank: 'Trạng Nguyên', piece: '炮', avatar: defaultAvatar },
  { name: 'DuyKien', presence: 'playing', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
]

const incoming: Friend[] = [
  { name: 'ThanhMai92', presence: 'online', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'MeoCon', presence: 'playing', rank: 'Đại Sư', piece: '將', avatar: defaultAvatar },
  { name: 'QuangHuy88', presence: 'online', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
  { name: 'ThuTrang', presence: 'offline', rank: 'Danh Thủ', piece: '車', avatar: defaultAvatar },
]

const outgoing: Friend[] = [
  { name: 'HoangNam01', presence: 'online', rank: 'Đại Sư', piece: '將', avatar: defaultAvatar },
  { name: 'LinhChi', presence: 'playing', rank: 'Kỳ Vương', piece: '帥', avatar: defaultAvatar },
]

const goldButton = `${buttonInteraction} flex h-[40px] min-w-[140px] items-center justify-center gap-2 rounded-[11px] border-2 border-[#9a581c] bg-[linear-gradient(#fff0b9,#f3c66f_55%,#dc9540)] px-3 font-['Times_New_Roman'] text-[18px] font-bold italic text-[#2b1909] shadow-[inset_0_0_0_2px_#ffedb4,0_2px_3px_#59300e88]`

const friendSecondaryActionButton = `${friendActionButton} text-[#6c160f]`
const friendSecondaryActionFrame = { backgroundImage: `url(${secondaryActionButtonFrame})`, backgroundSize: '100% 100%' }
const friendSectionTitle = "flex h-[50px] shrink-0 items-center bg-center bg-no-repeat px-[50px] font-['Times_New_Roman'] text-[27px] leading-none font-bold italic text-[#f6dfa0] [text-shadow:0_1px_1px_#52200d]"
const friendSectionTitleStyle = { backgroundImage: `url(${friendSectionTitleFrame})`, backgroundSize: '100% 100%' }
const filterButton = `${buttonInteraction} flex h-[54px] min-w-0 items-center justify-center gap-3 rounded-[10px] border-2 px-4 font-['Times_New_Roman'] text-[22px] leading-none font-bold italic tracking-[0.01em] text-[#2a1708] [text-shadow:0_1px_#f9dfaa]`
const selectedFilter = 'border-[#925015] bg-[linear-gradient(#fff1bd,#f7cf81_52%,#d9953c)] shadow-[inset_0_0_0_1px_#fff8d0,inset_0_0_0_3px_#bc7725,0_2px_3px_#5a310f99]'
const idleFilter = 'border-[#a8885b] bg-[linear-gradient(#dfc99d,#bea477)] shadow-[inset_0_1px_1px_#f9e6c1aa,0_1px_2px_#72512b55]'

function FilterIcon({ kind }: { kind: 'all' | 'online' | 'facebook' }) {
  if (kind === 'online') return <span aria-hidden="true" className="size-[27px] shrink-0 rounded-full border border-[#399114] bg-[radial-gradient(circle_at_35%_25%,#a7ff56,#42d719_62%,#248d0c)] shadow-[0_1px_1px_#4d331c]" />
  if (kind === 'facebook') return <span aria-hidden="true" className="grid size-[33px] shrink-0 place-items-center rounded-full bg-[#2f5595] text-white shadow-[0_1px_1px_#51341f]"><svg viewBox="0 0 24 24" className="size-[26px] fill-current"><path d="M13.7 20v-7h2.4l.35-2.75H13.7V8.5c0-.8.22-1.34 1.37-1.34h1.46V4.7c-.25-.03-1.12-.11-2.12-.11-2.1 0-3.53 1.28-3.53 3.63v2.03H8.5V13h2.38v7h2.82Z" /></svg></span>
  return <svg aria-hidden="true" viewBox="0 0 32 24" className="h-[32px] w-[42px] shrink-0 fill-current"><circle cx="16" cy="6" r="4" /><circle cx="6" cy="8" r="3" /><circle cx="26" cy="8" r="3" /><path d="M10 22v-6a6 6 0 0 1 12 0v6ZM1 21v-5a5 5 0 0 1 8-4v9Zm22 0v-9a5 5 0 0 1 8 4v5Z" /></svg>
}

function AddFriendIcon() {
  return <img src={friendAddIcon} alt="" aria-hidden="true" className="size-[35px] shrink-0 object-contain" />
}

function RemoveFriendIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[31px] shrink-0 fill-none stroke-current" strokeWidth="5" strokeLinecap="square"><path d="m7 7 18 18M25 7 7 25" /></svg>
}

function SentIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[31px] shrink-0 fill-none stroke-current" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 7 7L27 8" /></svg>
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[31px] shrink-0 fill-none stroke-current" strokeWidth="3.5" strokeLinecap="round"><circle cx="13" cy="13" r="7" /><path d="m18.5 18.5 7.5 7.5" /></svg>
}

function PresenceLabel({ presence }: { presence: Presence }) {
  const info = presence === 'online'
    ? { label: 'Đang online', dot: 'bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]', color: 'text-[#268523]' }
    : presence === 'facebook'
      ? { label: 'Facebook online', dot: 'bg-[#2f67bb]', color: 'text-[#2871be]' }
      : presence === 'playing'
        ? { label: 'Đang trong sảnh', dot: 'bg-[radial-gradient(circle_at_33%_25%,#ffed67,#f6a300_58%,#bf6700)]', color: 'text-[#b46b08]' }
        : { label: 'Offline', dot: 'bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]', color: 'text-[#5a5147]' }
  const icon = presence === 'facebook'
    ? <span className="grid size-[25px] shrink-0 place-items-center rounded-[3px] border border-[#1d4d91] bg-[#2f67bb] font-arial text-[25px] font-bold leading-none text-white shadow-[inset_0_1px_0_#8db8ed,0_1px_2px_#49301888]">f</span>
    : <span className={`grid size-[21px] shrink-0 place-items-center rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${info.dot}`} />
  return <p className={`mt-2 flex items-center gap-3 text-[19px] leading-5 font-medium ${info.color}`}>{icon}{info.label}</p>
}

function FriendIdentity({ friend }: { friend: Friend }) {
  return <div className="flex min-w-0 items-center gap-[36px] pl-[22px]">
    <SocialAvatar src={friend.avatar} />
    <div className="min-w-0"><h3 className="truncate font-arial text-[22px] leading-6 font-bold text-[#251506]">{friend.name}</h3><PresenceLabel presence={friend.presence} /></div>
  </div>
}

function FriendRank({ friend }: { friend: Friend }) {
  const stars = friend.rank === 'Kỳ Vương' ? 5 : friend.rank === 'Đại Sư' ? 4 : 2
  const tone = friend.rank === 'Kỳ Vương'
    ? 'border-[#9e3b16] bg-[radial-gradient(circle_at_35%_25%,#fff1b0,#f3be58_42%,#c0441c_72%,#7b230d)] text-[#bd2c18]'
    : friend.rank === 'Đại Sư'
      ? 'border-[#40515d] bg-[radial-gradient(circle_at_35%_25%,#fff8d7,#b7c7cf_42%,#657986_72%,#34424d)] text-[#293641]'
      : 'border-[#8e5a18] bg-[radial-gradient(circle_at_35%_25%,#fff0a9,#eac45c_42%,#bd7d22_72%,#6b3e0d)] text-[#33200a]'
  return <div className="flex w-[204px] shrink-0 items-center gap-3">
    <span aria-label={`Quân ${friend.piece}`} className={`grid size-[54px] shrink-0 place-items-center rounded-full border-[3px] font-chess text-[35px] leading-none shadow-[inset_0_0_0_2px_#ffe5a0,0_1px_3px_#58301099] ${tone}`}>{friend.piece}</span>
    <span className="min-w-0"><span className="block truncate font-['Times_New_Roman'] text-[20px] leading-5 font-bold italic text-[#553016]">{friend.rank}</span><span aria-label={`${stars} trên 5 sao`} className="mt-1 flex gap-px text-[22px] leading-none">{Array.from({ length: 5 }, (_, index) => <span key={index} className={index < stars ? 'text-[#e39a13] [text-shadow:0_1px_0_#71420b]' : 'text-[#85837b] [text-shadow:0_1px_0_#fff0b5]'}>★</span>)}</span></span>
  </div>
}

function FriendRowShade() {
  return <svg viewBox="0 0 600 76" preserveAspectRatio="none" className="size-full" fill="none">
    <path d="M8 48Q0 43 9 38Q4 31 17 29Q12 22 26 21Q22 14 37 13Q35 7 49 8Q53 2 65 5Q72 0 85 4Q91 1 102 2H590Q598 2 598 10V66Q598 74 590 74H51Q42 75 39 70Q27 74 25 66Q14 69 16 61Q5 62 9 55Q0 53 8 48Z" fill="#b68c53" fillOpacity=".46" />
    <path d="M9 48c13-12 22 8 30-3s-10-16-15-7 16 14 22 3-6-21 5-24m-32 37c12-9 24 14 35 0s-9-18-10-8 12 10 19 2M29 29c8-10 15 4 22-4s-5-12 4-16" stroke="#e9cda0" strokeOpacity=".55" strokeWidth="1.2" />
  </svg>
}

function FriendRow({ friend, children }: { friend: Friend; children: ReactNode }) {
  return <li className="relative isolate grid min-h-[85px] grid-cols-[minmax(0,1fr)_204px_auto] items-center gap-3 border-b border-[#c5a16a]/55 bg-[linear-gradient(90deg,#ead0a0,#f0dcb3_48%,#e8cca0)] px-4 py-0.5 shadow-[inset_0_1px_0_#f8e6bd] last:border-b-0"><svg aria-hidden="true" viewBox="0 0 42 76" className="pointer-events-none absolute top-1/2 left-[7px] -z-10 h-[76px] w-[56px] -translate-y-1/2" fill="none"><path d="M40 3Q28 0 25 9Q14 6 15 17Q5 17 10 26Q0 28 7 37Q0 44 9 48Q4 57 16 59Q13 69 26 67Q30 76 40 72Z" fill="#b68c53" fillOpacity=".46" /><path d="M13 34c-6-8 9-15 12-7s-12 13-9 20 15 5 13-2-12-3-8 4M22 18c-3-7 10-10 12-3M20 58c5-5 13 6 9 8" stroke="#e9cda0" strokeOpacity=".65" strokeWidth="1.2" /></svg><span aria-hidden="true" className="pointer-events-none col-start-2 col-end-4 row-start-1 -z-10 -ml-[38px] h-[calc(100%-4px)] self-center"><FriendRowShade /></span><div className="col-start-1 row-start-1"><FriendIdentity friend={friend} /></div><div className="col-start-2 row-start-1"><FriendRank friend={friend} /></div><div className="col-start-3 row-start-1 flex items-center justify-end gap-2">{children}</div></li>
}

export function FriendsDialog({ dialogRef, layout, onClose }: { dialogRef: RefObject<HTMLDialogElement | null>; layout: ReturnType<typeof useFriendsLayout>; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('list')
  const [filter, setFilter] = useState<'all' | 'online' | 'facebook'>('all')
  const [listQuery, setListQuery] = useState('')
  const [query, setQuery] = useState('')
  const [sent, setSent] = useState<string[]>(['BinhBoong'])
  const [received, setReceived] = useState(incoming)
  const [sentInvites, setSentInvites] = useState(outgoing)
  const [feedback, setFeedback] = useState('')
  const visibleFriends = useMemo(() => friends.filter(friend => {
    const matchesGroup = filter === 'facebook'
      ? friend.presence === 'facebook'
      : friend.presence !== 'facebook' && (filter === 'all' || friend.presence === filter)
    return matchesGroup && friend.name.toLowerCase().includes(listQuery.trim().toLowerCase())
  }), [filter, listQuery])
  const visibleSuggestions = useMemo(() => suggestions.filter(friend => friend.name.toLowerCase().includes(query.trim().toLowerCase())), [query])
  const selectTab = (next: Tab) => { setTab(next); setFeedback('') }
  const updateFeedback = (message: string) => setFeedback(message)

  return <dialog ref={dialogRef} aria-labelledby="friends-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/50" style={{ width: layout.width * layout.scale, height: layout.height * layout.scale }}>
    <div className="absolute top-0 left-0 origin-top-left rounded-[22px] border-[5px] border-[#5e3014] bg-[radial-gradient(ellipse_at_50%_8%,#b87a3344,transparent_38%),linear-gradient(135deg,#6e3718,#2b160b_48%,#5d2e14)] px-[36px] pt-[52px] pb-[28px] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_7px_#875026,inset_0_0_0_9px_#160904]" style={{ width: layout.width, height: layout.height, transform: `scale(${layout.scale})` }}>
      <header className="absolute -top-[50px] left-1/2 z-20 w-[650px] -translate-x-1/2 text-center"><img src={friendsTitle} alt="" className="pointer-events-none mx-auto h-auto w-full" /><h2 id="friends-title" className="sr-only">Bạn bè</h2></header>
      <button type="button" onClick={onClose} className={`${buttonInteraction} absolute top-[24px] right-[28px] z-30 grid size-[56px] place-items-center rounded-xl border-2 border-[#efb75d] bg-[linear-gradient(#6e3d17,#291207)] text-[42px] leading-none text-[#ffe3a2] shadow-[inset_0_0_0_3px_#3f1a08,0_3px_4px_#160804]`} aria-label="Đóng">×</button>
      <div className="relative flex h-full min-h-0 flex-col">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[8px] h-[104px] overflow-hidden rounded-[10px] opacity-80 shadow-[inset_0_0_18px_8px_#241107]">
          <img src={socialHeaderLandscape} alt="" className="size-full object-cover object-center" />
        </div>
        <nav className="relative z-10 mx-auto mb-0 flex w-[760px] max-w-full gap-2.5" role="tablist" aria-label="Chức năng bạn bè">
          <button type="button" role="tab" aria-selected={tab === 'list'} onClick={() => selectTab('list')} className={`${buttonInteraction} flex-1`}><img src={tab === 'list' ? listTabActive : listTabInactive} alt="Danh sách" className="pointer-events-none h-auto w-full" /></button>
          <button type="button" role="tab" aria-selected={tab === 'add'} onClick={() => selectTab('add')} className={`${buttonInteraction} flex-1`}><img src={tab === 'add' ? addTabActive : addTabInactive} alt="Thêm bạn" className="pointer-events-none h-auto w-full" /></button>
          <button type="button" role="tab" aria-selected={tab === 'invites'} onClick={() => selectTab('invites')} className={`${buttonInteraction} flex-1`}><img src={tab === 'invites' ? invitesTabActive : invitesTabInactive} alt={`Lời mời (${received.length})`} className="pointer-events-none h-auto w-full" /></button>
        </nav>
        <section className={socialPanelClass} style={{ backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          {tab === 'list' && <div className="flex h-full flex-col gap-[14px]">
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={() => setFilter('all')} className={`${filterButton} ${filter === 'all' ? selectedFilter : idleFilter}`}><FilterIcon kind="all" />Tất cả</button>
              <button type="button" onClick={() => setFilter('online')} className={`${filterButton} ${filter === 'online' ? selectedFilter : idleFilter}`}><FilterIcon kind="online" />Đang online</button>
              <button type="button" onClick={() => setFilter('facebook')} className={`${filterButton} ${filter === 'facebook' ? selectedFilter : idleFilter}`}><FilterIcon kind="facebook" />Bạn Facebook</button>
            </div>
            <div className="relative h-[48px] shrink-0">
              <div className="absolute inset-x-0 -top-[4px] flex h-[56px] items-center rounded-[10px] border border-[#81420f] bg-[linear-gradient(#5a3219,#2b1508)] px-[11px] shadow-[inset_0_0_0_1px_#ffd888,inset_0_0_0_3px_#a45f20,inset_0_0_0_4px_#55250b,0_1px_1px_#5b2b0d]">
                <svg aria-hidden="true" viewBox="0 0 32 32" className="size-[29px] shrink-0 fill-none stroke-[#f6d27b] stroke-[3] [filter:drop-shadow(0_1px_#3a1b08)]"><circle cx="13" cy="13" r="7" /><path d="m18.25 18.25 7 7" /></svg>
                <input aria-label="Tìm bạn trong danh sách" value={listQuery} onChange={event => setListQuery(event.target.value)} placeholder="Nhập tên người chơi..." className="ml-2 min-w-0 flex-1 bg-transparent font-['Times_New_Roman'] text-[21px] leading-none font-normal italic text-[#e5d8bc] outline-none placeholder:text-[#c2ae81]" />
                {listQuery && <button type="button" className={`${buttonInteraction} grid size-[30px] shrink-0 place-items-center rounded-full text-[28px] leading-none text-[#f6d27b] hover:bg-[#f6d27b]/15`} aria-label="Xóa nội dung tìm kiếm" onClick={() => setListQuery('')}>×</button>}
              </div>
            </div>
            <ul className="grid h-[427px] shrink-0 grid-rows-5 overflow-hidden rounded-[12px] border-[3px] border-double border-[#c3a371] bg-[#ecd3a3] shadow-[inset_0_0_0_2px_#f8e5bd,inset_0_0_12px_#b58b4d26]">
              {visibleFriends.slice(0, 5).map(friend => <FriendRow key={friend.name} friend={friend}><button type="button" className={friendActionButton} style={friendActionFrame} aria-label={`Mời chơi ${friend.name}`} onClick={() => updateFeedback(`Đã gửi lời mời chơi tới ${friend.name}.`)}><span aria-hidden="true" className="pointer-events-none block size-[35px] shrink-0 bg-no-repeat" style={{ backgroundImage: `url(${inviteButtonImage})`, backgroundSize: '183px 54px', backgroundPosition: '-30px -9px' }} /><span className="whitespace-nowrap">Mời chơi</span></button><button type="button" className={buttonInteraction} aria-label={`Nhắn tin ${friend.name}`} onClick={() => updateFeedback(`Đã mở trò chuyện với ${friend.name}.`)}><img src={chatButtonImage} alt="Nhắn tin" className="pointer-events-none h-[54px] w-[63px] object-contain" /></button></FriendRow>)}
            </ul>
          </div>}
          {tab === 'add' && <div className="flex h-full flex-col gap-3"><form className="flex gap-3" onSubmit={event => { event.preventDefault(); updateFeedback(query.trim() ? `Đã tìm người chơi “${query.trim()}”.` : 'Hãy nhập tên người chơi để tìm.') }}><label className="flex h-[54px] min-w-0 flex-1 items-center rounded-xl border-2 border-[#75421c] bg-[linear-gradient(#5e341b,#251307)] px-4 text-[#f6d27b] shadow-[inset_0_0_0_2px_#9b6734]"><SearchIcon /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Nhập tên người chơi..." className="ml-2 min-w-0 flex-1 bg-transparent font-['Times_New_Roman'] text-[21px] leading-none font-normal italic text-[#e5d8bc] outline-none placeholder:text-[#c2ae81]" /></label><button className={`${goldButton} h-[54px] min-w-[170px] gap-[9px] text-[21px]`} type="submit"><SearchIcon /><span>Tìm</span></button></form><h3 className={friendSectionTitle} style={friendSectionTitleStyle}>♟ Gợi ý cho bạn</h3><ul className="min-h-0 flex-1 overflow-auto rounded-[12px] border-[3px] border-double border-[#c3a371] bg-[#ecd3a3] shadow-[inset_0_0_0_2px_#f8e5bd,inset_0_0_12px_#b58b4d26]">{visibleSuggestions.map(friend => <FriendRow key={friend.name} friend={friend}><button type="button" disabled={sent.includes(friend.name)} className={sent.includes(friend.name) ? `${friendSecondaryActionButton} opacity-60` : friendActionButton} style={sent.includes(friend.name) ? friendSecondaryActionFrame : friendActionFrame} onClick={() => { setSent(current => [...current, friend.name]); updateFeedback(`Đã gửi lời mời kết bạn tới ${friend.name}.`) }}>{sent.includes(friend.name) ? <><SentIcon /><span>Đã gửi</span></> : <><AddFriendIcon /><span>Kết bạn</span></>}</button></FriendRow>)}</ul></div>}
          {tab === 'invites' && <div className="flex h-full flex-col gap-3"><div className="min-h-0 flex-[2] overflow-auto rounded-[12px] border-[3px] border-double border-[#c3a371] bg-[#ecd3a3] shadow-[inset_0_0_0_2px_#f8e5bd,inset_0_0_12px_#b58b4d26]"><h3 className={`${friendSectionTitle} sticky top-0 z-10`} style={friendSectionTitleStyle}>Lời mời đã nhận ({received.length})</h3>{received.map(friend => <FriendRow key={friend.name} friend={friend}><div className="flex items-center gap-[10px]"><button type="button" className={friendActionButton} style={{ ...friendActionFrame, width: 165, height: 52, paddingInline: 9, gap: 6 }} aria-label={`Chấp nhận lời mời của ${friend.name}`} onClick={() => { setReceived(current => current.filter(item => item.name !== friend.name)); updateFeedback(`Đã chấp nhận lời mời của ${friend.name}.`) }}><AddFriendIcon /><span className="whitespace-nowrap">Chấp nhận</span></button><button type="button" className={friendSecondaryActionButton} style={{ ...friendSecondaryActionFrame, width: 165, height: 52, paddingInline: 9, gap: 6 }} aria-label={`Từ chối lời mời của ${friend.name}`} onClick={() => { setReceived(current => current.filter(item => item.name !== friend.name)); updateFeedback(`Đã từ chối lời mời của ${friend.name}.`) }}><RemoveFriendIcon /><span>Từ chối</span></button></div></FriendRow>)}</div><div className="min-h-0 flex-1 overflow-auto rounded-[12px] border-[3px] border-double border-[#c3a371] bg-[#ecd3a3] shadow-[inset_0_0_0_2px_#f8e5bd,inset_0_0_12px_#b58b4d26]"><h3 className={`${friendSectionTitle} sticky top-0 z-10`} style={friendSectionTitleStyle}>Đã gửi lời mời ({sentInvites.length})</h3>{sentInvites.map(friend => <FriendRow key={friend.name} friend={friend}><button type="button" className={friendSecondaryActionButton} style={friendSecondaryActionFrame} aria-label={`Hủy lời mời tới ${friend.name}`} onClick={() => { setSentInvites(current => current.filter(item => item.name !== friend.name)); updateFeedback(`Đã hủy lời mời tới ${friend.name}.`) }}><RemoveFriendIcon /><span>Hủy lời mời</span></button></FriendRow>)}</div></div>}
          {feedback && <p role="status" className="absolute right-6 bottom-5 rounded-lg border border-[#88531e] bg-[#fff0c5] px-4 py-2 font-arial font-bold text-[#59300d] shadow-lg">{feedback}</p>}
        </section>
      </div>
      {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map(position => <svg key={position} aria-hidden="true" viewBox="0 0 90 90" className={`pointer-events-none absolute size-[76px] ${position}`} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#64320f" strokeWidth="11"/><path d="M7 79V20Q7 7 21 7h58M16 66V26q0-10 12-10h37M14 47c40 7 6-48 38-34 14 7-5 25-13 21S44 6 62 9M21 74c-8-24 22-9 19-28" stroke="#d8a34e" strokeWidth="6"/><path d="M7 74V20Q7 7 21 7h52M16 42c26 4 10-30 27-29" stroke="#ffe1a0" strokeWidth="2"/></svg>)}
    </div>
  </dialog>
}
