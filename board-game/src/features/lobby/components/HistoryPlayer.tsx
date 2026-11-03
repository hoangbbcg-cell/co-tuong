import { historyPlayerFrame } from './HistoryPlayerFrame'
import { MessageAccountAvatar } from './MessageAccountAvatar'
import { AccountAvatar } from './AccountAvatar'
import { MatchResultBadge } from './MatchResultBadge'
import { buttonInteraction } from '../../../lib/uiClasses'
type MatchResult = 'Thắng' | 'Thua'

export function HistoryPlayer({ name, result, onOpenProfile, className = '', mirrored = false, avatarCode, avatarFrameCode }: { avatarCode?: string; avatarFrameCode?: string; mirrored?: boolean; className?: string; name: string; result: MatchResult | 'Hòa' | 'Đang đấu'; onOpenProfile: (name: string) => void }) {
  const win = result === 'Thắng'
  return <div className={`flex min-w-0 items-center ${mirrored ? 'compact:flex-row-reverse' : ''} ${className}`}>
    <button type="button" onClick={() => onOpenProfile(name)} className={`${buttonInteraction} relative z-10 grid size-[var(--ui-p-51,51px)] shrink-0 place-items-center rounded-full border-0 bg-transparent p-0 compact:size-[var(--ui-p-96,96px)] [&>span]:size-[var(--ui-p-51,51px)] compact:[&>span]:size-[var(--ui-p-96,96px)]`} aria-label={`Mở hồ sơ của ${name}`}>{avatarCode != null && avatarFrameCode != null ? <AccountAvatar avatarCode={avatarCode} avatarFrameCode={avatarFrameCode} /> : <MessageAccountAvatar name={name} />}</button>
    <span className={`-ml-2 flex h-[var(--ui-p-43,43px)] min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-r-[var(--ui-p-8,8px)] border-y border-r pl-4 compact:h-auto compact:min-h-[var(--ui-p-96,96px)] compact:py-[var(--ui-p-4,4px)] compact:gap-[var(--ui-p-3,3px)] ${mirrored ? '' : 'compact:-ml-[var(--ui-p-48,48px)] compact:pl-[var(--ui-p-60,60px)]'} ${mirrored ? 'compact:ml-0 compact:-mr-[var(--ui-p-48,48px)] compact:flex-row-reverse compact:rounded-r-none compact:rounded-l-[var(--ui-p-8,8px)] compact:border-r-0 compact:border-l compact:pl-[var(--ui-p-4,4px)] compact:pr-[var(--ui-p-60,60px)] compact:text-right compact:[background-position:right]' : ''} ${historyPlayerFrame(win)}`}>
      <strong className="min-w-0 flex-1 truncate font-heading text-[length:var(--ui-p-23,23px)] font-medium text-[#271608] compact:text-[length:var(--ui-p-48,48px)] compact:font-extrabold compact:lining-nums compact:[-webkit-text-stroke:0.2px_currentColor] compact:whitespace-nowrap compact:overflow-visible compact:text-clip compact:[overflow-wrap:anywhere] compact:leading-[1.4]"><span className="compact:hidden">{name.split(/(\d+)/).map((part, index) => index % 2 === 1 ? <span key={index} className="font-number text-[0.9em] lining-nums">{part}</span> : part)}</span><span className="hidden compact:inline">{name}</span></strong>
      {result === 'Hòa' || result === 'Đang đấu' ? <span className="font-heading">{result}</span> : <span className="contents compact:inline-flex compact:shrink-0 compact:[&>span]:h-[var(--ui-p-63,63px)] compact:[&>span]:w-[var(--ui-p-132,132px)]"><MatchResultBadge result={result} /></span>}
    </span>
  </div>
}
