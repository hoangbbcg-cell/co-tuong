import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { Side } from '../../../types/game'
import { formatClock } from '../../../lib/format'
import { TURN_TIME_LIMIT_MS } from '../../../game/state/initial'
import { buttonInteraction } from '../../../lib/uiClasses'
import avatar from '../../../assets/icons/avatar.svg'
import defaultAvatarFrame from '../../../assets/30dfa56b-d9f3-4129-b9fd-aaf0ea884188.png'
import { AvatarFrameOverlay } from './AvatarFrameOverlay'
import { AvatarRankBadge } from './AvatarRankBadge'
import likeIcon from '../../../assets/icons/like-white.png'
import { useSessionStore } from '../../../store/sessionStore'
import readyRibbon from '../../../assets/buttons/ready-avatar-ribbon.png'
import nameFrame from '../../../assets/player/name-frame.png'
import eloFrame from '../../../assets/player/elo-frame.png'
import takebackDecline from '../../../assets/takeback/takeback-decline.png'

interface Props { entranceHidden?: boolean; fillHeight?: boolean; side: Side; name: string; started: boolean; active: boolean; timerExpired?: boolean; ready?: boolean; remaining: number; turnElapsed: number; outcome?: 'win' | 'loss'; takebackDeclineKey?: string | number | null; likeVisible?: boolean; likePosition?: 'left' | 'right'; likeMatchId: string; likeActorId: string; onAvatarClick?: () => void; children?: ReactNode }
const LIKE_BUBBLE_INTERVAL_MS = 100
const LIKE_PICKER_HOVER_DELAY_MS = 400
const LIKE_PICKER_REOPEN_DELAY_MS = 1000
const LIKE_REACTIONS = ['😛', '😂', '👍', '👏', '🤔', '❤️']
function PlayerLikeButton({ name, position, matchId, actorId, targetSide, avatarBubbleLayerRef }: { name: string; position: 'left' | 'right'; matchId: string; actorId: string; targetSide: Side; avatarBubbleLayerRef: { current: HTMLSpanElement | null } }) {
  const liked = useSessionStore(state => state.matchLikeRecords.some(record => record.matchId === matchId && record.actorId === actorId && record.targetSide === targetSide))
  const recordMatchLike = useSessionStore(state => state.recordMatchLike)
  const likeBubbleLayerRef = useRef<HTMLSpanElement>(null)
  const lastBubbleAt = useRef(Number.NEGATIVE_INFINITY)
  const pickerTimer = useRef<number | null>(null)
  const pointerInside = useRef(false)
  const likeButtonHovered = useRef(false)
  const waitForLikeButtonHover = useRef(false)
  const focusInside = useRef(false)
  const reopenAt = useRef(0)
  const [pickerVisible, setPickerVisible] = useState(false)
  const clearPickerTimer = () => {
    if (pickerTimer.current !== null) window.clearTimeout(pickerTimer.current)
    pickerTimer.current = null
  }
  const schedulePickerOpen = (afterReaction = false) => {
    clearPickerTimer()
    const delay = Math.max(0, reopenAt.current - Date.now()) + (afterReaction ? 0 : LIKE_PICKER_HOVER_DELAY_MS)
    pickerTimer.current = window.setTimeout(() => {
      pickerTimer.current = null
      if (waitForLikeButtonHover.current) {
        waitForLikeButtonHover.current = false
        if (!likeButtonHovered.current) return
      }
      if (pointerInside.current || focusInside.current) setPickerVisible(true)
    }, delay)
  }
  useEffect(() => () => clearPickerTimer(), [])
  const handleClick = (reaction = '👍', keepPickerOpen = false, fromPicker = false) => {
    recordMatchLike({ matchId, actorId, targetSide })
    if (!keepPickerOpen) {
      reopenAt.current = Date.now() + LIKE_PICKER_REOPEN_DELAY_MS
      waitForLikeButtonHover.current = true
      setPickerVisible(false)
      clearPickerTimer()
      if (likeButtonHovered.current) schedulePickerOpen(true)
    }
    const now = performance.now()
    if (now - lastBubbleAt.current < LIKE_BUBBLE_INTERVAL_MS) return
    lastBubbleAt.current = now
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const layer = (fromPicker ? avatarBubbleLayerRef : likeBubbleLayerRef).current
    if (!layer) return

    const drift = Math.round((Math.random() - 0.5) * 18)
    const bubble = document.createElement('span')
    bubble.setAttribute('aria-hidden', 'true')
    bubble.className = 'pointer-events-none absolute z-20 grid size-8 place-items-center rounded-full border border-[#fff4cb99] bg-[#233a32e6] shadow-[0_0_12px_#ffe2a188] compact:size-7'
    bubble.style.left = `calc(50% + ${drift}px)`
    bubble.style.top = '50%'

    if (reaction === '👍') {
      const image = document.createElement('img')
      image.src = likeIcon
      image.alt = ''
      image.className = 'block size-5 object-contain compact:size-4'
      bubble.append(image)
    } else {
      bubble.textContent = reaction
      bubble.classList.add('text-xl')
    }
    layer.append(bubble)

    const animation = bubble.animate([
      { opacity: 1, transform: 'translate(-50%, -50%) scale(.72)' },
      { opacity: 1, offset: 0.16, transform: 'translate(calc(-50% + ' + Math.round(drift * 0.35) + 'px), -75%) scale(1)' },
      { opacity: 0.85, offset: 0.62, transform: 'translate(calc(-50% - ' + Math.round(drift * 0.3) + 'px), -145%) scale(.9)' },
      { opacity: 0, transform: 'translate(calc(-50% + ' + Math.round(drift * 0.2) + 'px), -205%) scale(.75)' },
    ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' })
    animation.onfinish = () => bubble.remove()
  }
  return <div className={'group/like absolute top-1/2 z-6 -translate-y-1/2 ' + (position === 'left' ? 'right-[calc(100%+15px)]' : 'left-[calc(100%+15px)]')} onPointerEnter={() => { pointerInside.current = true; schedulePickerOpen() }} onPointerLeave={() => { pointerInside.current = false; if (!focusInside.current) { clearPickerTimer(); setPickerVisible(false) } }} onFocusCapture={() => { focusInside.current = true; schedulePickerOpen() }} onBlurCapture={event => { if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return; focusInside.current = false; if (!pointerInside.current) { clearPickerTimer(); setPickerVisible(false) } }}>
      <button type="button" aria-label={'Thích ' + name} aria-pressed={liked} onPointerEnter={event => { likeButtonHovered.current = event.pointerType === 'mouse' }} onPointerLeave={() => {
        likeButtonHovered.current = false
        if (waitForLikeButtonHover.current) {
          waitForLikeButtonHover.current = false
          clearPickerTimer()
          setPickerVisible(false)
        }
      }} onClick={() => handleClick()} className={buttonInteraction + ' relative z-0 grid size-10 place-items-center rounded-full border border-[#fff4cb] bg-[#233a32cc] p-0 shadow-[0_0_10px_#ffe2a1bb,inset_0_0_5px_#ffe2a166] compact:size-9'}>
      <img src={likeIcon} alt="" aria-hidden="true" className="block size-6 object-contain drop-shadow-[0_2px_2px_#000a] compact:size-5" />
      <span ref={likeBubbleLayerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" />
    </button>
    <div aria-label="Chọn biểu cảm" aria-hidden={!pickerVisible} className={`absolute top-1/2 left-1/2 z-10 flex h-[180px] w-[42px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-[14px] border border-[#b2945e] bg-[#0a211d] px-1 py-2 shadow-[0_6px_18px_#0009] transition-[opacity,visibility] duration-100 compact:h-[167px] ${pickerVisible ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none opacity-0'}`}>
      {LIKE_REACTIONS.map(reaction => <button key={reaction} tabIndex={pickerVisible ? 0 : -1} type="button" aria-label={'Gửi biểu cảm ' + reaction} onClick={() => handleClick(reaction, true, true)} className={`${buttonInteraction} grid size-6 shrink-0 place-items-center rounded-full border-0 bg-transparent p-0 text-[19px] leading-none hover:bg-[#436657] focus-visible:outline-1 focus-visible:outline-[#f0c995] compact:size-5 compact:text-base`}>{reaction}</button>)}
    </div>
  </div>
}
function remainingArcPath(radius: number, elapsedAngle: number): string {
  if (elapsedAngle >= 360) return ''
  const top = 50 - radius
  if (elapsedAngle <= 0) return `M 50 ${top} A ${radius} ${radius} 0 1 1 50 ${50 + radius} A ${radius} ${radius} 0 1 1 50 ${top}`
  const radians = elapsedAngle * Math.PI / 180
  const x = 50 + radius * Math.sin(radians)
  const y = 50 - radius * Math.cos(radians)
  return `M ${x} ${y} A ${radius} ${radius} 0 ${360 - elapsedAngle > 180 ? 1 : 0} 1 50 ${top}`
}
function ResultFace({ outcome }: { outcome: 'win' | 'loss' }) {
  const win = outcome === 'win'
  return <div role="img" aria-label={win ? 'Người thắng vui mừng' : 'Người thua khóc'} className={`pointer-events-none absolute top-1/2 left-1/2 z-[100] grid size-[122px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] shadow-[0_5px_18px_#071c1bcc] ${win ? 'animate-bounce border-[#ffe69a] bg-[#f5bd35]' : 'animate-pulse border-[#bce5ff] bg-[#70bce8]'} compact:size-[50px] compact:border-[3px] short-desktop:size-[78px]`}>
    <svg viewBox="0 0 100 100" className="size-[88%]" aria-hidden="true">
      <circle cx="50" cy="50" r="45" fill={win ? '#ffd75a' : '#8ed5f5'} />
      <path d="M30 38q8-8 16 0M54 38q8-8 16 0" fill="none" stroke="#493218" strokeWidth="6" strokeLinecap="round" />
      {win ? <path d="M27 58q23 25 46 0" fill="#fff5df" stroke="#493218" strokeWidth="5" strokeLinecap="round" /> : <><path d="M32 67q18-15 36 0" fill="none" stroke="#493218" strokeWidth="6" strokeLinecap="round" /><path d="M27 45c-9 13-9 21 0 21s9-8 0-21Zm46 0c-9 13-9 21 0 21s9-8 0-21Z" fill="#d9f5ff" /></>}
    </svg>
  </div>
}
export function PlayerCard({ entranceHidden = false, fillHeight = false, side, name, started, active, timerExpired = false, ready = false, remaining, turnElapsed, outcome, takebackDeclineKey, likeVisible = false, likePosition = 'left', likeMatchId, likeActorId, onAvatarClick, children }: Props) {
  const likeBubbleLayerRef = useRef<HTMLSpanElement>(null)
  const turnRatio = Math.max(0, Math.min(1, turnElapsed / TURN_TIME_LIMIT_MS))
  const turnAngle = turnRatio * 360
  const timerVisible = active || timerExpired
  return <section data-active={active} className={`mx-auto flex min-w-0 flex-col desktop:w-40 items-center pt-3 compact:grid compact:grid-cols-[60px_minmax(0,1fr)] compact:gap-x-2 compact:gap-y-[3px] compact:p-0 compact:text-left short-desktop:pt-0 ${fillHeight ? 'h-full compact:h-auto' : 'flex-none desktop:self-center'} ${side === 'red' ? 'compact:-translate-y-[10px]' : ''}`} id={`player-${side}`} aria-label={`Người chơi quân ${side === 'red' ? 'đỏ' : 'đen'}`} style={{ visibility: entranceHidden ? 'hidden' : undefined } as CSSProperties}>
    <div data-active={active} data-testid={`avatar-${side}`} className="relative size-[132px] shrink-0 rounded-full bg-transparent p-2 shadow-[0_5px_18px_#071c1b99] compact:size-[60px] compact:p-[5px] short-desktop:size-[88px]">
      {likeVisible && <PlayerLikeButton name={name} position={likePosition} matchId={likeMatchId} actorId={likeActorId} targetSide={side} avatarBubbleLayerRef={likeBubbleLayerRef} />}
      <button type="button" aria-label={`Xem hồ sơ ${name}`} onClick={onAvatarClick} className={`${buttonInteraction} relative block size-full rounded-full border-0 bg-transparent p-0`}>
        <img src={avatar} alt="" className="block size-full rounded-full object-cover" /><span aria-hidden="true" className={`pointer-events-none absolute inset-0 z-2 rounded-full transition-opacity duration-100 ${timerVisible ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `conic-gradient(from 0deg, transparent 0deg ${turnAngle}deg, #187b1299 ${turnAngle}deg 360deg)` }} />
        <AvatarFrameOverlay src={defaultAvatarFrame} dimmed={timerVisible} />
        <svg aria-hidden="true" viewBox="0 0 100 100" className={`pointer-events-none absolute top-1/2 left-1/2 z-[11] size-[107%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition-opacity duration-100 ${timerVisible ? 'opacity-100' : 'opacity-0'}`}>
          <path d={remainingArcPath(47, turnAngle)} fill="none" stroke="#48e600" strokeWidth="5.5" strokeLinecap="butt" />
          <path d={remainingArcPath(46.8, turnAngle)} fill="none" stroke="#d6d45a" strokeWidth="1.1" strokeLinecap="butt" />
        </svg><AvatarRankBadge />

      </button>
      <span ref={likeBubbleLayerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-8 overflow-visible" />
      {takebackDeclineKey != null && <span key={takebackDeclineKey} role="status" className="pointer-events-none absolute top-1/2 left-1/2 z-7 w-[126px] -translate-x-1/2 -translate-y-1/2 brightness-125 animate-[bounce_450ms_ease-in-out_2] motion-reduce:animate-none compact:w-[78px] short-desktop:w-[96px]"><img src={takebackDecline} alt="Từ chối" className="m-0 block h-auto w-full border-0 p-0" /></span>}
      {ready && <img src={readyRibbon} alt="Sẵn sàng" className="pointer-events-none absolute top-1/2 left-1/2 z-5 m-0 block h-auto w-[158px] -translate-x-1/2 -translate-y-1/2 border-0 p-0 drop-shadow-[0_2px_3px_#17200899] compact:w-[72px] short-desktop:w-[106px]" />}
      {outcome && <ResultFace outcome={outcome} />}
    </div>
    <div className="mt-[78px] w-full min-w-0 -translate-y-[28px] compact:mt-0 short-desktop:mt-[54px]">
      <h2 className="relative mx-auto my-0 grid h-[39px] w-[170px] place-items-center bg-contain bg-center bg-no-repeat px-5 font-georgia text-[20px] font-normal text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008] compact:h-[28px] compact:w-[120px] compact:px-4 compact:text-[14px]" style={{ backgroundImage: `url(${nameFrame})` }}><span className="max-w-full truncate">{name}</span></h2>
      <p hidden={started} className="relative mx-auto mt-2 mb-[9px] flex h-[37px] w-fit items-center justify-center gap-2 bg-[length:100%_100%] bg-center bg-no-repeat px-[14px] font-georgia leading-none text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008] compact:mx-0 compact:mt-1 compact:mb-0.5 compact:h-[30px] compact:gap-1.5 compact:px-[14px]" style={{ backgroundImage: `url(${eloFrame})` }}>
        <span role="img" aria-label="ELO · Quân Tướng đỏ" className="grid size-[20px] shrink-0 place-items-center rounded-full border border-[#a56b32] bg-[linear-gradient(#fff0c9,#e6b778)] shadow-[inset_0_0_0_1px_#fff3d0,0_1px_1px_#38200b80] compact:size-[15px]"><span aria-hidden="true" className="grid size-[16px] place-items-center rounded-full border border-[#b51f16] font-['DFKai-SB','BiauKai','KaiTi','STKaiti',serif] text-[12px] leading-none font-bold text-[#b51f16] compact:size-[12px] compact:text-[9px]">帥</span></span><strong className="grid h-[20px] place-items-center font-['Times_New_Roman',serif] text-[18px] font-normal leading-none text-[#ffe5a3] lining-nums tabular-nums compact:h-[15px] compact:text-[13px]">{side === 'red' ? '2069' : '1983'}</strong>
      </p>
    </div>
    <div hidden={!started} className={`mt-3 flex w-fit min-w-[70px] -translate-y-[23px] items-center justify-center gap-1 rounded-[3px] border py-0.5 pr-1 pl-[3px] transition-[background-color,border-color,box-shadow] duration-100 before:grid before:size-[18px] before:place-items-center before:rounded-full before:border-2 before:border-double before:border-[#70572c] before:bg-[#ebd39d] before:font-serif before:text-sm before:leading-[normal] before:outline before:outline-[#e6ce8a] compact:col-span-full compact:mt-1.5 compact:justify-self-center compact:px-[5px] compact:text-center ${active ? 'border-[#e8c479] bg-[#244b40] shadow-[0_0_0_1px_#e8c47933]' : 'border-[#c5ad6b] bg-[#503a23]'} ${side === 'red' ? "before:text-[#a11b11] before:content-['帥']" : "before:text-[#252419] before:content-['將']"}`}>
      <output className="block font-arial text-base/[1.1] text-[#e8b923] tabular-nums" id={`clock-${side}`} aria-label={`Thời gian quân ${side === 'red' ? 'đỏ' : 'đen'}`}>{formatClock(remaining)}</output>
    </div>
    {children}
  </section>
}
