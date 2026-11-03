import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
import { AccountAvatar } from './AccountAvatar'
import { AvatarRankBadge } from '../../game/components/AvatarRankBadge'
import emblem from '../../../assets/match-intro/emblem.png'
import leftSword from '../../../assets/match-intro/sword-left.png'
import rightSword from '../../../assets/match-intro/sword-right.png'
import type { AccountProfile } from '../../../types/account'
import type { RoomSnapshot } from '../../../types/room'

type FrozenPlayer = [string, number, string, string]
type RoomShare = { ordered?: boolean; identities?: FrozenPlayer[]; id: string; players?: string[]; viewers?: number; gold?: number; variant?: 'xiangqi' | 'jieqi' }
const prefix = 'HOVANG_SHARE:'
export async function createRoomShare(room: RoomSnapshot): Promise<string> {
  const seats = ['red', 'black'].map(side => room.players.find(p => p.side === side))
  const sender = useSessionStore.getState()
  const senderIndex = seats.findIndex(p => p && (sender.account && p.userId ? p.userId === sender.account.id : p.name === sender.name))
  if (senderIndex === 1) seats.reverse()
  const viewers = new Set([...room.players, ...(room.viewers ?? [])].map(member => member.id)).size
  const variant = room.game.variant ?? 'xiangqi'
  const identities: FrozenPlayer[] = await Promise.all(seats.map(async player => {
    if (!player) return ['Chờ người chơi', 1000, 'avatar-0', 'frame-0'] as FrozenPlayer
    const own = useSessionStore.getState().account
    const id = player.userId ?? (await accountApi.search(player.name)).find(p => p.name === player.name)?.id
    const profile = own && own.id === id ? await accountApi.me() : id ? (await accountApi.request.get<AccountProfile>(`/profiles/${id}`)).data : null
    if (!profile) throw new Error('Không tải được hồ sơ để chốt dữ liệu chia sẻ.')
    const stat = profile.stats.find(s => s.variant === variant)
    if (!stat || !Number.isSafeInteger(stat.elo)) throw new Error('Không tải được Elo thật của người chơi. Vui lòng thử lại.')
    return [profile.displayName, stat.elo, profile.avatarCode, profile.avatarFrameCode] as FrozenPlayer
  }))
  if (senderIndex < 0) identities.sort((a,b) => b[1]-a[1])
  return prefix + JSON.stringify({ id: room.id, variant, identities, viewers, ordered: true })
}
export function parseRoomShare(text: string): RoomShare | null {
  const legacy = /^Mời vào bàn: HOVANG_ROOM:([A-Za-z0-9_-]+)$/.exec(text)
  if (legacy) return { id: legacy[1] }
  if (!text.startsWith(prefix)) return null
  try {
    const value: unknown = JSON.parse(text.slice(prefix.length))
    if (!value || typeof value !== 'object') return null
    const v = value as RoomShare
    if (typeof v.id !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(v.id)) return null
    if (v.ordered !== undefined && typeof v.ordered !== 'boolean') return null
    if (v.variant !== undefined && v.variant !== 'xiangqi' && v.variant !== 'jieqi') return null
    if (v.identities !== undefined && (!Array.isArray(v.identities) || v.identities.length !== 2 || !v.identities.every(p => Array.isArray(p) && p.length === 4 && typeof p[0] === 'string' && Number.isSafeInteger(p[1]) && p[1] >= 0 && typeof p[2] === 'string' && typeof p[3] === 'string'))) return null
    if (v.players !== undefined && (!Array.isArray(v.players) || v.players.length !== 2 || !v.players.every(p => typeof p === 'string'))) return null
    if (v.viewers !== undefined && (!Number.isSafeInteger(v.viewers) || v.viewers < 0)) return null
    if (v.gold !== undefined && (!Number.isSafeInteger(v.gold) || v.gold < 0)) return null
    return v
  } catch { return null }
}

function SharedPlayer({ name, profile, right, elo }: { name: string; profile: Pick<AccountProfile, 'avatarCode' | 'avatarFrameCode'> | null; right?: boolean; elo: number }) {
  return <span className={`relative flex min-w-0 flex-1 items-center gap-[2cqw] compact:gap-[1.5cqw] py-[4cqw] ${right ? 'flex-row-reverse text-right' : ''}`}>
    <span aria-hidden="true" className={`absolute inset-x-0 inset-y-[5cqw] border-y-2 ${right ? 'rounded-l-full border-[#54cfff] bg-[linear-gradient(270deg,#082d53,#146393aa,#082137)] shadow-[0_0_12px_#20baff99,inset_0_0_12px_#40caff55]' : 'rounded-r-full border-[#ffa33c] bg-[linear-gradient(90deg,#54220b,#a64c15aa,#45200e)] shadow-[0_0_12px_#ff7a2099,inset_0_0_12px_#ffae4055]'}`} />
    <span className="relative z-10 block size-[18cqw] shrink-0"><AccountAvatar avatarCode={profile?.avatarCode} avatarFrameCode={profile?.avatarFrameCode}/><AvatarRankBadge elo={elo}/></span>
    <span className={`relative z-10 min-w-0 flex-1 ${right ? 'pl-[3cqw]' : 'pr-[3cqw]'}`}><span className="block break-words font-body text-[3.2cqw] desktop:text-[3.5cqw] compact:text-[3.6cqw] font-semibold leading-tight text-[#fff0c7] [text-shadow:0_2px_3px_#000]">{name}</span><span className={`mt-[1cqw] block rounded-full border-y px-1 font-number text-[2.8cqw] desktop:text-[3.4cqw] compact:text-[3.4cqw] text-[#ffe2a1] ${right ? 'border-[#449ccc]/60 bg-[#051e36]/70' : 'border-[#bd702c]/60 bg-[#391707]/70'}`}>ELO {elo}</span></span>
  </span>
}
export function RoomShareCard({ share }: { share: RoomShare }) {
  const frozen = share.identities ?? (share.players ?? ['Người chơi', 'Người chơi']).map(name => [name, 1000, 'avatar-0', 'frame-0'] as FrozenPlayer)
  const players = frozen.map(([name, elo, avatarCode, avatarFrameCode]) => ({ name, elo, profile: { avatarCode, avatarFrameCode } }))
  if (!share.ordered) players.sort((a,b) => b.elo-a.elo)
  if (players[0].name === 'Chờ người chơi' && players[1].name !== 'Chờ người chơi') players.reverse()
  return <span className="relative flex w-[min(720px,81vw)] min-w-[235px] desktop:w-full desktop:min-w-0 desktop:max-w-full desktop:box-border flex-col items-center gap-1 rounded-xl border border-[#ba7b39] bg-[radial-gradient(ellipse_at_center,#764623_0%,#28170e_58%,#130d09_100%)] px-2 pb-3 pt-3 compact:pb-[18px] desktop:pb-[19px] shadow-[inset_0_0_0_2px_#3b2010,0_3px_12px_#0006] [container-type:inline-size]">
    <span aria-label={`Vào bàn, ${share.viewers ?? 0} người trong phòng lúc gửi`} className="inline-flex h-8 min-w-[62px] compact:h-[23px] compact:py-0 compact:min-w-[42px] compact:gap-1 compact:px-1 items-center justify-center gap-1.5 rounded-[3px] border border-[#d5b579] bg-[linear-gradient(#766448,#3a3022)] px-1.5 py-1 text-[#ffe2a1] shadow-[inset_0_0_0_1px_#ac8a55,inset_0_2px_3px_#e4cb9655,0_2px_3px_#0009]">
      <svg viewBox="0 0 40 30" className="h-6 w-8 compact:h-[16px] compact:w-[22px] shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 15C7 8 13 5 20 5s13 3 18 10c-5 7-11 10-18 10S7 22 2 15Z"/><path d="M7 6 3 10M33 6l4 4M8 24l4 3m20-3-4 3" stroke="#ba8e50" strokeWidth="2"/><ellipse cx="20" cy="15" rx="7" ry="9"/><ellipse cx="20" cy="15" rx="2.5" ry="5" fill="currentColor" stroke="none"/></svg><span className="font-number text-base compact:text-[14px] compact:leading-none font-bold tabular-nums">{share.viewers ?? 0}</span>
    </span>
    <span className="relative flex w-full items-stretch gap-[10cqw] compact:gap-[7cqw] px-[1cqw] pb-[3cqw]">
      {players[0].name !== 'Chờ người chơi' ? <SharedPlayer {...players[0]}/> : <span className="flex-1"/>}{players[1].name !== 'Chờ người chơi' ? <SharedPlayer {...players[1]} right/> : <span className="flex-1"/>}
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-[23cqw] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_3px_8px_#0009]">{[emblem,leftSword,rightSword].map((src,i) => <img key={src} src={src} alt={i === 0 ? 'Chiến đấu' : ''} className="absolute inset-0 size-full object-contain"/>)}</span>
    </span>
    {share.gold !== undefined && <span className="font-number text-sm text-[#ffd36b]">🪙 {share.gold.toLocaleString('vi-VN')}</span>}
  </span>
}
