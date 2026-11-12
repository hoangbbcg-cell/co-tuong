import battleEmblem from '../../../assets/match-intro/emblem.png'
import leftSword from '../../../assets/match-intro/sword-left.png'
import rightSword from '../../../assets/match-intro/sword-right.png'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import type { useMatchIntro } from '../hooks/useMatchIntro'
import { createPortal } from 'react-dom'
import { useLayoutEffect, useState } from 'react'
import { useDatabaseProfile } from '../../lobby/hooks/useDatabaseProfile'
import { useSessionStore } from '../../../store/sessionStore'
import { AvatarPortrait } from '../../lobby/components/AvatarCustomization'
import { AvatarFrameOverlay } from './AvatarFrameOverlay'
import { getAvatarFrame } from '../../../lib/avatarFrames'
import { NumberText } from '../../../lib/NumberText'
import type { AccountProfile } from '../../../types/account'
import type { GameVariant } from '../../../types/game'
import { AvatarRankBadge } from './AvatarRankBadge'
import { sharedRankEloFromStats } from '../../../lib/rankProgression'

interface Props {
  intro: ReturnType<typeof useMatchIntro>
  redName: string
  blackName: string
  redId?: string
  blackId?: string
  variant?: GameVariant
}
export function introPlayer(name: string, profile: AccountProfile | null, variant: GameVariant) {
  return { name: profile?.displayName ?? name, loaded: !!profile, elo: profile?.stats.find(item => item.variant === variant)?.elo ?? 1000,
    rankElo: sharedRankEloFromStats(profile?.stats),
    avatarIndex: Number(profile?.avatarCode.replace('avatar-', '')) || 0,
    frameIndex: Number(profile?.avatarFrameCode.replace('frame-', '')) || 0 }
}
type IntroPlayer = ReturnType<typeof introPlayer>
function IntroPortrait({ player }: { player: IntroPlayer }) {
  return <div className="relative size-[clamp(56px,12vw,88px)] compact:size-[clamp(72px,20vw,96px)] mb-7 shrink-0 rounded-full bg-[#201309] shadow-[0_5px_20px_#0008]">
    {player.loaded && <><AvatarPortrait avatarIndex={player.avatarIndex} className="size-full rounded-full" />
    <AvatarFrameOverlay src={getAvatarFrame(player.frameIndex).image} />
    <AvatarRankBadge elo={player.rankElo}/></>}
  </div>
}
export function MatchIntro({ intro, redName, blackName, redId, blackId, variant = 'xiangqi' }: Props) {
  const ownName = useSessionStore(state => state.name)
  const redProfile = useDatabaseProfile(redName, redName === ownName, redId)
  const blackProfile = useDatabaseProfile(blackName, blackName === ownName, blackId)
  const red = introPlayer(redName, redProfile, variant)
  const black = introPlayer(blackName, blackProfile, variant)
  const [redFirst, setRedFirst] = useState(true)
  const players = redFirst ? [red, black] : [black, red]
  // Freeze band order while allowing real profiles to finish loading.
  useLayoutEffect(() => {
    if (intro.visible) setRedFirst(red.elo >= black.elo)
  }, [intro.visible])
  return createPortal(<div ref={intro.panelRef} hidden={!intro.visible} data-testid="match-intro" className="pointer-events-none fixed inset-0 z-[600] overflow-hidden" role="status" aria-label="Khai cuộc">
    <div className="absolute inset-0 bg-[#080d17]/55 backdrop-blur-[4px]" aria-hidden="true" />
    <div className="absolute left-1/2 top-1/2 h-[clamp(210px,38vh,300px)] compact:h-[clamp(300px,48dvh,380px)] w-[min(92vw,880px)] -translate-x-1/2 -translate-y-1/2">
      {players.map((player, index) => <div key={index} ref={index === 0 ? intro.redRef : intro.blackRef} data-intro-position={index === 0 ? 'top' : 'bottom'} data-intro-elo={player.elo}
        className={`absolute inset-x-0 flex h-[46%] items-center gap-[clamp(18px,5vw,52px)] rounded-[4px] border px-[clamp(22px,6vw,64px)] compact:px-5 compact:gap-5 shadow-[0_12px_48px_#0006,inset_0_1px_0_#fff5] ${index === 0 ? 'top-0 border-[#ffc979]/75 bg-[linear-gradient(110deg,#5c1d08_0%,#d26718_45%,#ffad43_100%)]' : 'bottom-0 flex-row-reverse border-[#8ce9ff]/75 bg-[linear-gradient(110deg,#38bfe8_0%,#13659a_55%,#082f5d_100%)]'}`}>
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[4px] bg-[linear-gradient(125deg,transparent_35%,#ffffff1a_36%,transparent_65%)]" />
        <span aria-hidden="true" className="absolute left-1 top-1/2 h-[38%] w-[18px] -translate-y-1/2 bg-white/30" style={{ clipPath: 'polygon(0 0,100% 50%,0 100%)' }} />
        <span aria-hidden="true" className="absolute right-1 top-1/2 h-[38%] w-[18px] -translate-y-1/2 bg-white/30" style={{ clipPath: 'polygon(100% 0,0 50%,100% 100%)' }} />
        <IntroPortrait player={player} />
        <div className={`relative min-w-0 flex-1 ${index === 0 ? 'text-left' : 'text-right'}`}>
          <p className="m-0 font-heading text-[clamp(23px,5.4vw,42px)] font-bold leading-tight text-[#fff5da] [overflow-wrap:anywhere] [text-shadow:0_2px_6px_#0008]"><NumberText text={player.name} weight="normal" /></p>
          <p className="mt-2 font-number text-[clamp(14px,3vw,20px)] tracking-wide text-white/85">ELO {player.loaded ? player.elo : '…'}</p>
        </div>
      </div>)}
      <div aria-hidden="true" data-intro-battle className="absolute left-1/2 top-1/2 z-20 size-[clamp(110px,22vw,180px)] -translate-x-1/2 -translate-y-1/2 [perspective:600px] [filter:drop-shadow(0_4px_12px_#100b0699)]">
        <div ref={intro.crossRef} data-intro-emblem className="absolute inset-[7%] [transform-style:preserve-3d]"><CrispUiImage src={battleEmblem} alt="" className="block size-full object-contain" /></div>
        <div ref={intro.leftSwordRef} data-intro-sword="left" className="absolute inset-0"><CrispUiImage src={leftSword} alt="" className="block size-full object-contain" /></div>
        <div ref={intro.rightSwordRef} data-intro-sword="right" className="absolute inset-0"><CrispUiImage src={rightSword} alt="" className="block size-full object-contain" /></div>
      </div>
    </div>
  </div>, document.body)
}
