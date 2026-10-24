import { socialListScrollbarClass } from '../../../lib/uiClasses'
import { SocialDialogFrame, socialModeTabsClass, socialPlayerRowClass, socialPlayerListClass, getSocialRowStyle } from './SocialDialogFrame'
import { useRankingListInset } from '../hooks/useRankingListInset'
import { useSingleLineTextSize } from '../hooks/useSingleLineTextSize'
import { useDatabaseRanking } from '../hooks/useDatabaseRanking'
import { useState, type CSSProperties, type RefObject } from 'react'
import type { useRankingLayout } from '../hooks/useRankingLayout'
import rankingTitle from '../../../assets/rankings/ranking-title-transparent.png'
import xiangqiTab from '../../../assets/rankings/ranking-xiangqi-tab-user.png'
import hiddenTab from '../../../assets/rankings/ranking-hidden-tab-user.png'

import historyParchmentBackground from '../../../assets/history/history-parchment-background.png'
import { SocialPlayerName, socialPresenceTextClass, socialPanelClass } from './SocialUi'
import { RankingViewButton } from './RankingViewButton'
import { useRankingWatch } from '../hooks/useRankingWatch'
import { RoomPasswordDialog } from './RoomPasswordDialog'
import rankPlainFrame from '../../../assets/rankings/rank-plain-frame.png'
import rankNumberOne from '../../../assets/rankings/rank-gold-v2.png'
import rankNumberTwo from '../../../assets/rankings/rank-silver-v2.png'
import rankNumberThree from '../../../assets/rankings/rank-bronze-v2.png'
import topOneCrown from '../../../assets/rankings/top-one-crown.png'
import redGeneral from '../../../assets/pieces/red-general.png'
import concealedPiece from '../../../assets/history/history-hidden-user.png'
import eloFrame from '../../../assets/player/elo-frame.png'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { buttonInteraction, selectedImageTabGlow } from '../../../lib/uiClasses'
import { RankingRankBadge } from './RankingRankBadge'
import { AccountAvatar } from './AccountAvatar'

import { AvatarFrameOverlay } from '../../game/components/AvatarFrameOverlay'
import { getAvatarFrame } from '../../../lib/avatarFrames'

type Mode = 'xiangqi' | 'hidden'

const demoPlayers = [
  { name: 'ShopCoTuong', online: true, playing: 'Đang chơi Cờ Tướng', elo: '2719' },
  { name: 'Tu_CoTuong', online: false, playing: 'Offline', elo: '2719' },
  { name: 'Fonsida_', online: false, playing: 'Offline', elo: '2719' },
  { name: 'NgocLinhAnh', online: true, playing: 'Đang online', elo: '2719' },
  { name: 'FonGiaoSu', online: false, playing: 'Offline', elo: '2719' },
]

const rankNumberImages = [rankNumberOne, rankNumberTwo, rankNumberThree]

function getRankingScaleStyle(scale: number): CSSProperties {
  return {
    '--spacing': `${4 * scale}px` ,
    '--ranking-1': `${Math.round(1 * scale)}px` ,
    '--ranking-10': `${Math.round(10 * scale)}px` ,
    '--ranking-100': `${Math.round(100 * scale)}px` ,
    '--ranking-11': `${Math.round(11 * scale)}px` ,
    '--ranking-12': `${Math.round(12 * scale)}px` ,
    '--ranking-122': `${Math.round(122 * scale)}px` ,
    '--ranking-125': `${Math.round(125 * scale)}px` ,
    '--ranking-132': `${Math.round(132 * scale)}px` ,
    '--ranking-138': `${Math.round(138 * scale)}px` ,
    '--ranking-14': `${Math.round(14 * scale)}px` ,
    '--ranking-156': `${Math.round(156 * scale)}px` ,
    '--ranking-173': `${Math.round(173 * scale)}px` ,
    '--ranking-15': `${Math.round(15 * scale)}px` ,
    '--ranking-17': `${Math.round(17 * scale)}px` ,
    '--ranking-170': `${Math.round(170 * scale)}px` ,
    '--ranking-18': `${Math.round(18 * scale)}px` ,
    '--ranking-19': `${Math.round(19 * scale)}px` ,
    '--ranking-20': `${Math.round(20 * scale)}px` ,
    '--ranking-21': `${Math.round(21 * scale)}px` ,
    '--ranking-22': `${Math.round(22 * scale)}px` ,
    '--ranking-24': `${Math.round(24 * scale)}px` ,
    '--ranking-25': `${Math.round(25 * scale)}px` ,
    '--ranking-264': `${Math.round(264 * scale)}px` ,
    '--ranking-28': `${Math.round(28 * scale)}px` ,
    '--ranking-3': `${Math.round(3 * scale)}px` ,
    '--ranking-34': `${Math.round(17 * scale) * 2}px` ,
    '--ranking-38': `${Math.round(38 * scale)}px` ,
    '--ranking-4': `${Math.round(4 * scale)}px` ,
    '--ranking-42': `${Math.round(42 * scale)}px` ,
    '--ranking-44': `${Math.round(44 * scale)}px` ,
    '--ranking-46': `${Math.round(46 * scale)}px` ,
    '--ranking-5': `${Math.round(5 * scale)}px` ,
    '--ranking-50': `${Math.round(50 * scale)}px` ,
    '--ranking-56': `${Math.round(56 * scale)}px` ,
    '--ranking-6': `${Math.round(6 * scale)}px` ,
    '--ranking-62': `${Math.round(62 * scale)}px` ,
    '--ranking-650': `${Math.round(650 * scale)}px` ,
    '--ranking-70': `${Math.round(70 * scale)}px` ,
    '--ranking-76': `${Math.round(76 * scale)}px` ,
    '--ranking-8': `${Math.round(8 * scale)}px` ,
    '--ranking-84': `${Math.round(84 * scale)}px` ,
    '--ranking-player-name-size': `calc(${Math.round(84 * scale)}px * 0.26190476)`,
    '--ranking-9': `${Math.round(9 * scale)}px` ,
    '--ranking-90': `${Math.round(90 * scale)}px` ,
    '--ranking-99': `${Math.round(99 * scale)}px` ,
  } as CSSProperties
}

function PresenceDot({ online }: { online: boolean }) {
  return <span aria-label={online ? 'Đang trực tuyến' : 'Ngoại tuyến'} className="block size-[var(--ranking-22)] shrink-0 rounded-full bg-[#8c6d42]/45 p-px shadow-[0_2px_3px_#4b2b1766]">
    <span className={`block size-full rounded-full border border-black/15 ${online ? 'bg-[radial-gradient(circle_at_35%_25%,#baff70_0_7%,#65e928_30%,#2ec10c_67%,#1b8d08_100%)] shadow-[inset_0_1px_1px_#e9ffd0,0_1px_1px_#176b0c88]' : 'bg-[radial-gradient(circle_at_35%_25%,#e1dfd5_0_7%,#b4b3aa_31%,#84857e_68%,#5f615d_100%)] shadow-[inset_0_1px_1px_#fffbe9,0_1px_1px_#403a3488]'}`} />
  </span>
}

export function RankingDialog({ dialogRef, layout, onClose, onOpenProfile }: {
  dialogRef: RefObject<HTMLDialogElement | null>
  layout: Omit<ReturnType<typeof useRankingLayout>, 'compact'> & { compact?: boolean }
  onClose: () => void
  onOpenProfile: (name: string) => void
}) {
  const [mode, setMode] = useState<Mode>('xiangqi')
  const players = useDatabaseRanking(mode)
  const [previewNotice, setPreviewNotice] = useState('')
  const watch = useRankingWatch(dialogRef, onClose, mode)
  const renderingStyle = {
    width: Math.round(layout.width * layout.scale),
    height: Math.round(layout.height * layout.scale),
    '--ranking-row-slot-gap': `${Math.round(8 * layout.scale)}px`,
    '--ranking-title-width': `${Math.round(650 * layout.scale * (layout.compact ? 1.12 : 1))}px`,
    '--ranking-tab-width': `${Math.round(264 * layout.scale * (layout.compact ? 1.6 : 1))}px`,
    '--ranking-tab-height': `${Math.round(70 * layout.scale * (layout.compact ? 1.6 : 1))}px`,
    ...getRankingScaleStyle(layout.scale),
  } as CSSProperties
  const { listRef, inset: headerInset } = useRankingListInset(Boolean(layout.compact))
  const rowScale = layout.scale * (layout.compact ? 1.5 : 1)
  const headerScale = layout.scale * (layout.compact ? 1.5 : 1)
  const eloScale = layout.scale * (layout.compact ? 1.35 : 1)
  const eloOffset = Math.round(24 * layout.scale)
  const eloWidthExtension = Math.round(34 * layout.scale)
  const columnStyle: CSSProperties | undefined = layout.compact ? {
    gridTemplateColumns: `${Math.round(90 * rowScale)}px minmax(0, 1fr) ${Math.round(122 * eloScale)}px ${Math.round(173 * rowScale)}px`,
  } : undefined
  const rowStyle = layout.compact ? {
    flex: '0 0 calc(16.6667% - var(--ranking-row-slot-gap))',
    ...getRankingScaleStyle(rowScale), ...columnStyle,
    '--ranking-player-name-size': `${Math.round(28 * rowScale)}px`,
  } as CSSProperties : undefined

  const modes: { key: Mode; label: string; image: string }[] = [{ key: 'xiangqi', label: 'Cờ Tướng', image: xiangqiTab }, { key: 'hidden', label: 'Cờ Úp', image: hiddenTab }]

  return <dialog ref={dialogRef} aria-labelledby="ranking-title" onCancel={event => { event.preventDefault(); onClose() }} className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#43240f] backdrop:bg-black/45" style={renderingStyle}>
    <SocialDialogFrame layout={layout} titleImage={rankingTitle} titleId="ranking-title" title="Xếp hạng" onClose={onClose}>
        <div className={socialModeTabsClass} role="tablist" aria-label="Chế độ xếp hạng">
          {modes.map(item => <button key={item.key} type="button" role="tab" aria-selected={mode === item.key} onClick={() => setMode(item.key)} className={`${buttonInteraction} relative block h-[var(--ranking-tab-height)] w-[var(--ranking-tab-width)] shrink-0 isolate overflow-visible border-0 bg-transparent p-0 leading-none`}><img src={item.image} alt="" className={`pointer-events-none block h-full w-full object-contain transition-[filter] duration-200 motion-reduce:transition-none ${mode === item.key ? selectedImageTabGlow : ''}`} /><span className="sr-only">{item.label}</span></button>)}
        </div>
        <section aria-label={`Bảng xếp hạng ${mode === 'xiangqi' ? 'Cờ Tướng' : 'Cờ Úp'}`} className={`${socialPanelClass} ranking-panel flex flex-col gap-[var(--ranking-6)]`} style={{ paddingInline: Math.round(20 * layout.scale), borderWidth: Math.round(3 * layout.scale), borderRadius: Math.round(14 * layout.scale), backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div style={layout.compact ? { ...getRankingScaleStyle(headerScale), ...columnStyle, marginRight: headerInset } : undefined} className="relative z-10 isolate grid h-[var(--ranking-38)] shrink-0 grid-cols-[var(--ranking-90)_minmax(0,1fr)_var(--ranking-156)_var(--ranking-173)] items-center gap-3 overflow-hidden rounded-[var(--ranking-9)] border border-[#c3a371] bg-[#b68c53]/30 px-3 font-heading text-[length:var(--ranking-21)] font-extrabold italic text-[#43240f] [-webkit-text-stroke:0.35px_currentColor]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[var(--ranking-125)] bg-[linear-gradient(90deg,#4b271326_0%,#75451d1b_54%,transparent_100%)] shadow-[inset_8px_0_12px_-10px_#24100635]" />
            <span className="relative z-10 text-center">Hạng</span><span className="pl-[var(--ranking-100)]" style={layout.compact ? { paddingLeft: Math.round(84 * rowScale) + Math.round(20 * rowScale) + 8 * rowScale } : undefined}>Người chơi</span><span className="text-center" style={layout.compact ? { transform: `translateX(${eloOffset + eloWidthExtension / 2}px)` } : undefined}>Elo</span><span className="text-center">Thao tác</span>
          </div>
          <ol ref={listRef} className={`${socialPlayerListClass} ${socialListScrollbarClass}`}>
            {players.map((player, index) => <li key={player.name} style={{ ...getSocialRowStyle(layout.scale, Boolean(layout.compact)), ...rowStyle }} className={`${socialPlayerRowClass} grid-cols-[var(--ranking-90)_minmax(0,1fr)_var(--ranking-156)_var(--ranking-173)]`}>
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[var(--ranking-132)] bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]" />
              <span className="relative z-10 grid size-[var(--ranking-90)] place-items-center self-center justify-self-center" aria-label={`Hạng ${index + 1}`} style={layout.compact ? getRankingScaleStyle(rowScale) : undefined}>
                {index < 3
                  ? <><img src={rankNumberImages[index]} alt="" className="pointer-events-none absolute top-1/2 left-1/2 size-[var(--ranking-99)] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain brightness-110 drop-shadow-[0_0_5px_#ffe3a080]" /><span aria-hidden="true" className="pointer-events-none absolute top-[12%] left-[10%] text-[length:var(--ranking-20)] leading-none text-[#fff8df] drop-shadow-[0_0_4px_#fff0ad] motion-safe:animate-pulse">✦</span><span aria-hidden="true" className="pointer-events-none absolute right-[5%] bottom-[20%] text-[length:var(--ranking-15)] leading-none text-[#fff8df] drop-shadow-[0_0_4px_#fff0ad] motion-safe:animate-pulse [animation-delay:900ms]">✦</span></>
                  : <><img src={rankPlainFrame} alt="" className="pointer-events-none size-[var(--ranking-76)] object-contain" /><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Times_New_Roman'] text-[length:var(--ranking-46)] leading-none font-bold italic text-[#ffe0a0] [text-shadow:0_2px_2px_#391b0b]">{index + 1}</span></>}
              </span>
              <div className="flex min-w-0 items-center gap-[var(--ranking-20)]">
                <span className="ml-2 relative block w-[var(--ranking-84)] shrink-0" style={{ height: Math.round(124 * rowScale) }}>
                  <span className="relative block size-[var(--ranking-84)] overflow-visible" style={{ top: Math.round(6 * rowScale) }}>
                  {index === 0 && <svg aria-hidden="true" viewBox="0 0 157 119" className="pointer-events-none absolute top-[calc(0px-var(--ranking-5)-3px)] left-1/2 z-20 h-[var(--ranking-19)] w-[var(--ranking-25)] -translate-x-1/2 overflow-visible drop-shadow-[0_1px_1px_#4a250f]"><defs><clipPath id="top-one-crown-curve"><path d="M0 0H157V87Q78.5 126 0 87Z" /></clipPath></defs><image href={topOneCrown} width="157" height="119" clipPath="url(#top-one-crown-curve)" /></svg>}
                  <button type="button" onClick={() => onOpenProfile(player.name)} aria-label={`Mở hồ sơ của ${player.name}`} className={`${buttonInteraction} relative grid size-[var(--ranking-84)] place-items-center rounded-full border-0 bg-transparent p-0`}><AccountAvatar avatarCode={player.avatarCode} avatarFrameCode={player.avatarFrameCode} /></button>
                  <RankingRankBadge elo={Number(player.elo)} scale={rowScale} />
                  </span>
                </span>
                <div className="min-w-0 compact:flex-1"><h3 className="flex h-6 compact:h-[calc(var(--ranking-player-name-size)*1.4)] items-center font-heading text-[length:var(--ranking-player-name-size)] leading-6 text-[#251506]">{layout.compact ? <span className="block min-w-0 w-full flex-1 whitespace-nowrap font-heading font-extrabold leading-[1.4] lining-nums [-webkit-text-stroke:0.2px_currentColor]" style={layout.compact ? { fontSize: Math.round(26 * rowScale) } : undefined}>{player.name}</span> : <SocialPlayerName name={player.name} />}</h3><p className={`mt-2 flex items-center gap-3 compact:gap-1 ${socialPresenceTextClass} text-[length:var(--ranking-19)] compact:text-[length:var(--ranking-22)] compact:font-heading compact:leading-[1.2] leading-5 ${(watch.matchFor(player.name) || player.online) ? 'text-[#268523]' : 'text-[#5a5147]'}`}><PresenceDot online={!!watch.matchFor(player.name) || player.online} />{layout.compact ? (watch.matchFor(player.name) ? <span className="whitespace-nowrap" style={{ fontSize: Math.round(22 * rowScale) }}>{mode === 'hidden' ? 'Đang chơi Cờ Úp' : 'Đang chơi Cờ Tướng'}</span> : <span className="whitespace-nowrap" style={{ fontSize: Math.round(22 * rowScale) }}>{player.online ? 'Đang online' : 'Offline'}</span>) : <span className="truncate">{watch.matchFor(player.name) ? 'Đang chơi Cờ Tướng' : player.online ? 'Đang online' : 'Offline'}</span>}</p></div>
              </div>
              <div style={{ ...(layout.compact ? getRankingScaleStyle(eloScale) : {}), height: layout.compact ? 'calc(100% + 6px)' : `calc(100% - ${Math.round(28 * layout.scale)}px)`, width: `calc(100% + ${(layout.compact ? eloWidthExtension : 0) + Math.round((layout.compact ? 13 : 6) * layout.scale)}px)`, transform: `translateX(${layout.compact ? eloOffset : 0}px)` }} className="relative flex items-center justify-center">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 compact:-left-[3.5px] compact:-right-[3.5px] rounded-[var(--ranking-9)] compact:rounded-[var(--ranking-5)] bg-[#b68c53]/20" />
                <span className="relative flex h-[var(--ranking-46)] w-full min-w-0 items-center justify-center bg-center bg-no-repeat bg-[length:100%_100%] pl-[var(--ranking-34)] pr-[var(--ranking-10)] font-georgia text-[#ffe7ae] whitespace-nowrap [text-shadow:0_1px_2px_#2a1008]" style={{ backgroundImage: `url(${eloFrame})` }}><CrispUiImage src={mode === 'hidden' ? concealedPiece : redGeneral} alt={`Elo ${mode === 'xiangqi' ? 'Cờ Tướng' : 'Cờ Úp'}`} className="absolute left-[var(--ranking-8)] size-[var(--ranking-25)] shrink-0 object-contain" /><span className="font-number text-[length:var(--ranking-24)] leading-none lining-nums tabular-nums">{player.elo}</span></span>
              </div>
              {watch.matchFor(player.name) && <RankingViewButton name={player.name} scale={rowScale} onView={watch.watch} />}
            </li>)}
          </ol>
        </section>
    </SocialDialogFrame>
    {(watch.error || previewNotice) && !watch.passwordControls.passwordRoom && <p role={watch.error ? 'alert' : 'status'} onClick={() => setPreviewNotice('')} className="absolute bottom-3 left-1/2 z-30 max-w-[90%] -translate-x-1/2 rounded border border-[#c7a264] bg-[#f7e6c1] px-3 py-2 text-center text-[#43240f]">{watch.error || previewNotice}</p>}
    <RoomPasswordDialog lobby={watch.passwordControls}/>
  </dialog>
}

