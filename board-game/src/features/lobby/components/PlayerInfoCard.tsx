import type { ReactNode } from 'react'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import { NumberText } from '../../../lib/NumberText'
import redGeneral from '../../../assets/pieces/red-general.png'
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
export function PlayerInfoCard({ data, className, editControl, idCopied, onCopyId }: {
  data: PlayerInfoData
  className: string
  editControl?: ReactNode
  idCopied: boolean
  onCopyId: () => void
}) {
  return <div className={`${playerInfoPanelClass} flex ${className} min-w-0 flex-col justify-center gap-y-1.5 px-4 py-2 text-[#f8dea6]`}>
    <div className="flex min-w-0 items-center gap-2">
      <h3 className="min-w-0 flex-1 truncate font-cormorant text-[length:var(--ui-p-34,34px)] leading-tight font-semibold"><NumberText text={data.name} compact weight="medium" soften={false} /></h3>
    </div>
    <div className="grid grid-cols-2 gap-3" aria-label="Chỉ số minh họa">
      {[{ alt: 'Quân Tướng đỏ', image: redGeneral, score: data.xiangqiScore }, { alt: 'Quân cờ úp', image: concealedPiece, score: data.jieqiScore }].map(rank => <div key={rank.alt} className="flex flex-wrap items-center justify-start gap-2 rounded-lg border-2 border-[#bc893d] bg-[linear-gradient(120deg,#c4985d,#f3dba7,#b78343)] px-3 py-0 text-left shadow-[inset_0_0_0_1px_#fff2b9,0_2px_2px_#6b3a1244]">
        <span className="grid size-9 shrink-0 place-items-center"><CrispUiImage src={rank.image} alt={rank.alt} className={`${rank.alt === 'Quân cờ úp' ? 'size-8' : 'size-9'} object-contain`} /></span><span className="font-number text-2xl font-semibold text-[#ba191b] lining-nums tabular-nums">{rank.score}</span>
      </div>)}
    </div>
    <div className="relative top-[var(--ui-p-3,3px)] flex w-full items-center gap-5 text-[length:var(--ui-p-19,19px)] leading-6 font-medium text-[#f8dea6]">
      <span className="whitespace-nowrap">Bạn bè: <b className="ml-1 font-number text-[length:var(--ui-p-22,22px)] font-medium lining-nums tabular-nums">{data.friends}</b></span>
      <span className="whitespace-nowrap">Theo dõi: <b className="ml-1 font-number text-[length:var(--ui-p-22,22px)] font-medium lining-nums tabular-nums">{data.followers}</b></span>
      <span className="flex whitespace-nowrap items-center gap-1"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-22,22px)] fill-[#e74343]"><path d="M12 21.1 10.55 19.8C5.4 15.15 2 12.05 2 8.25 2 5.15 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.15 22 8.25c0 3.8-3.4 6.9-8.55 11.56L12 21.1Z" /></svg>Lượt thích: <b className="font-number text-[length:var(--ui-p-22,22px)] font-medium lining-nums tabular-nums">{data.likes}</b></span>
    </div>
    <p className="flex w-full items-center gap-2 text-[length:var(--ui-p-19,19px)] leading-6 font-medium text-[#f8dea6]"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-[var(--ui-p-22,22px)] shrink-0 fill-[#f1bd58]"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 10.25A3.25 3.25 0 1 1 12 5.75a3.25 3.25 0 0 1 0 6.5Z" /></svg>
      <span className="min-w-0 flex-1 truncate"><NumberText text={data.address} soften={false} /></span>
      {editControl}
    </p>
    <div className="flex w-full items-center justify-end gap-1.5 text-[length:var(--ui-p-15,15px)] leading-5 text-[#aaa39a]">
      <span>ID:</span><span className="font-number tracking-wide lining-nums tabular-nums">{data.playerId ?? '—'}</span>
      <span className="relative grid size-5 shrink-0 place-items-center">
        <button type="button" disabled={!data.playerId} aria-label={idCopied ? 'Đã sao chép ID' : 'Sao chép ID'} onClick={onCopyId} className={`grid size-5 place-items-center transition-colors ${idCopied ? 'text-[#ffe8ad]' : 'text-[#a4a4a4] hover:text-[#dedede]'}`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="12" height="12" rx="2" fill={idCopied ? 'currentColor' : 'none'} /><rect x="8" y="8" width="12" height="12" rx="2" fill={idCopied ? 'currentColor' : 'none'} /></svg></button>
        {idCopied && <span role="status" className="pointer-events-none absolute right-0 bottom-full z-50 mb-1 whitespace-nowrap rounded-[var(--ui-p-3,3px)] border border-[#b9ad91] bg-[#fff9e9] px-2 py-1 font-sans text-xs font-medium text-[#2c2417] shadow-[0_1px_3px_#0006]">Đã sao chép</span>}
      </span>
    </div>
  </div>
}
