import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { NumberText } from '../../../lib/NumberText'
import { XIANGQI_ELO_ICON as redGeneral } from '../../../lib/eloArtwork'
import concealedPiece from '../../../assets/history/history-hidden-user.png'

export interface PlayerInfoData {
  name: string
  xiangqiScore: number
  jieqiScore: number
  friends: number
  followers: number
  likes: string
  address: string
  playerId?: string
}

const playerInfoPanelClass = 'relative z-10 rounded-[var(--ui-p-14,14px)] border-2 border-[#c58a35] bg-[linear-gradient(90deg,#442815,#2a190e)] shadow-[inset_0_0_0_2px_#7d451b,inset_0_0_14px_#160b0566,0_2px_4px_#14080499]'

/** Shared brown information card; geometry follows the own-profile reference. */
export function PlayerInfoCard({ data, className, editControl, nameEditControl, idCopied, onCopyId, mobileExpanded = false }: {
  data: PlayerInfoData
  className: string
  editControl?: ReactNode
  nameEditControl?: ReactNode
  idCopied: boolean
  onCopyId: (id: string) => void
  mobileExpanded?: boolean
}) {
  const address = data.address.replace(/(^|,\s*)(?:Thành phố|TP\.?)\s+/gi, '$1Tp. ').replace(/(^|,\s*)Xã\s+/gi, '$1X. ')
  const addressRef = useRef<HTMLSpanElement>(null)
  const [addressOverflow, setAddressOverflow] = useState(false)
  const [expandedAddress, setExpandedAddress] = useState<string | null>(null)
  const addressExpanded = expandedAddress === address
  useEffect(() => {
    const dialog = addressRef.current?.closest('dialog')
    const collapse = () => setExpandedAddress(null)
    dialog?.addEventListener('close', collapse)
    return () => dialog?.removeEventListener('close', collapse)
  }, [])
  const statsRef = useRef<HTMLDivElement>(null)
  const statsMeasureRef = useRef<HTMLDivElement>(null)
  const [statsLabelsVisible, setStatsLabelsVisible] = useState(true)
  useEffect(() => {
    const measure = () => {
      if (statsRef.current && statsMeasureRef.current) setStatsLabelsVisible(statsMeasureRef.current.scrollWidth <= statsRef.current.clientWidth)
    }
    measure()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    if (statsRef.current) observer?.observe(statsRef.current)
    if (statsMeasureRef.current) observer?.observe(statsMeasureRef.current)
    window.addEventListener('resize', measure)
    let mounted = true
    void document.fonts?.ready?.then(() => { if (mounted) measure() })
    return () => { mounted = false; observer?.disconnect(); window.removeEventListener('resize', measure) }
  }, [data.friends, data.followers, data.likes])
  const renderStats = (labels: boolean) => [
    { label: 'Bạn bè', value: data.friends },
    { label: 'Theo dõi', value: data.followers },
    { label: 'Lượt thích', value: data.likes },
  ].map((stat, index) => <span key={stat.label} title={stat.label} aria-label={`${stat.label}: ${stat.value}`} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap desktop:items-baseline desktop:translate-y-[2px]">
    {labels && <span className="text-[length:var(--ui-p-22,22px)] compact:text-[length:var(--ui-p-26,26px)] desktop:text-[length:var(--ui-p-22,22px)] desktop:leading-none">{stat.label}:</span>}
    <b className="text-[length:calc(var(--ui-p-26,26px)*0.93)] font-medium lining-nums tabular-nums compact:text-[length:calc(var(--ui-p-28,28px)*0.93)] desktop:text-[length:var(--ui-p-22,22px)] desktop:leading-none">{stat.value}</b>
  </span>)
  useEffect(() => {
    const element = addressRef.current
    if (!element) return
    const measure = () => setAddressOverflow(element.scrollWidth > element.clientWidth + 1)
    measure()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(element)
    window.addEventListener('resize', measure)
    let mounted = true
    void document.fonts?.ready?.then(() => { if (mounted) measure() })
    return () => { mounted = false; observer?.disconnect(); window.removeEventListener('resize', measure) }
  }, [address])
  return <div className={`${playerInfoPanelClass} flex ${className} min-w-0 flex-col justify-between gap-y-2 px-[6px] py-2 text-[#f8dea6] compact:px-[9px] compact:pb-[calc(var(--spacing)*2+3px)] ${mobileExpanded ? 'compact:gap-y-2 compact:pt-2' : ''}`}>
    <div className="relative -top-[var(--ui-p-3,3px)] flex min-w-0 items-center gap-2">
      <h3 className={`min-w-0 w-fit max-w-full truncate font-cormorant text-[length:var(--ui-p-34,34px)] leading-tight font-semibold compact:text-[length:var(--ui-p-38,38px)]`}><NumberText text={data.name} compact weight="medium" soften={false} /></h3>
      {nameEditControl}
    </div>
    <div className="grid grid-cols-2 gap-3" aria-label="Chỉ số minh họa">
      {[{ alt: 'Quân Tướng đỏ', image: redGeneral, score: data.xiangqiScore }, { alt: 'Quân cờ úp', image: concealedPiece, score: data.jieqiScore }].map(rank => <div key={rank.alt} className={`flex flex-wrap items-center justify-start gap-2 rounded-lg border-2 border-[#bc893d] bg-[linear-gradient(120deg,#c4985d,#f3dba7,#b78343)] px-3 py-0 text-left shadow-[inset_0_0_0_1px_#fff2b9,0_2px_2px_#6b3a1244] ${mobileExpanded ? 'compact:min-h-[var(--ui-p-54,54px)] compact:flex-nowrap compact:gap-1 compact:px-2' : ''}`}>
        <span className="grid size-9 shrink-0 place-items-center"><CrispUiImage src={rank.image} alt={rank.alt} className={`${rank.alt === 'Quân cờ úp' ? 'size-8' : 'size-9'} object-contain`} /></span><span className="font-number text-[length:var(--ui-p-28,28px)] font-semibold text-[#ba191b] lining-nums tabular-nums">{rank.score}</span>
      </div>)}
    </div>
    <div ref={statsRef} className="relative w-full min-w-0 text-[length:var(--ui-p-22,22px)] leading-snug font-medium text-[#f8dea6] compact:text-[length:var(--ui-p-24,24px)]">
      <div ref={statsMeasureRef} aria-hidden="true" className="pointer-events-none invisible absolute left-0 top-0 flex w-max flex-nowrap items-center gap-3 desktop:gap-[8px]">{renderStats(true)}</div>
      <div className="flex flex-nowrap items-center justify-between gap-3 overflow-x-auto desktop:justify-start desktop:gap-[8px]">{renderStats(statsLabelsVisible)}</div>
    </div>
    <p className="flex w-full items-center gap-2 text-[length:var(--ui-p-22,22px)] leading-[1.5] font-medium text-[#f8dea6] compact:text-[length:var(--ui-p-26,26px)]"><svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 size-[var(--ui-p-26,26px)] -translate-y-[1px] shrink-0 fill-[#f1bd58] compact:size-[var(--ui-p-30,30px)]"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 10.25A3.25 3.25 0 1 1 12 5.75a3.25 3.25 0 0 1 0 6.5Z" /></svg>
      <span className="relative min-w-0 flex-1">
        <button type="button" aria-label={addressExpanded ? 'Thu gọn địa chỉ' : 'Hiển thị đầy đủ địa chỉ'} aria-expanded={addressExpanded} disabled={!addressOverflow && !addressExpanded} onClick={() => setExpandedAddress(current => current === address ? null : address)} className="block w-full min-w-0 border-0 bg-transparent p-0 text-left font-[inherit] text-[inherit] disabled:cursor-default">
          <span ref={addressRef} aria-hidden={addressExpanded} className={`block truncate py-[2px] leading-[1.5] ${addressExpanded ? 'pointer-events-none absolute inset-x-0 top-0 invisible' : ''}`}><NumberText text={address} soften={false} /></span>
          {addressExpanded && <span className="block whitespace-normal break-words py-[2px] leading-[1.5]"><NumberText text={address} soften={false} /></span>}
        </button>
      </span>
      {editControl}
    </p>
    <div className={`flex w-full items-center justify-end gap-1.5 text-[length:var(--ui-p-17,17px)] leading-5 text-[#aaa39a] ${mobileExpanded ? 'compact:text-[length:var(--ui-p-22,22px)] compact:text-[#d1c4a9]' : ''}`}>
      <span>ID:</span><span className="font-number tracking-wide lining-nums tabular-nums">{data.playerId ?? '—'}</span>
      <span className="relative grid size-5 shrink-0 place-items-center self-center -translate-y-1.5 desktop:translate-y-0 [&_svg]:size-[14px]">
        <button type="button" disabled={!/^\d+$/.test(data.playerId ?? '')} aria-label={idCopied ? 'Đã sao chép ID' : 'Sao chép ID'} onClick={() => onCopyId(data.playerId ?? '')} className={`grid size-full place-items-center p-0 transition-colors ${idCopied ? 'text-[#ffe8ad]' : 'text-[#a4a4a4] hover:text-[#dedede]'}`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="12" height="12" rx="2" fill={idCopied ? 'currentColor' : 'none'} /><rect x="8" y="8" width="12" height="12" rx="2" fill={idCopied ? 'currentColor' : 'none'} /></svg></button>
      </span>
    </div>
  </div>
}

