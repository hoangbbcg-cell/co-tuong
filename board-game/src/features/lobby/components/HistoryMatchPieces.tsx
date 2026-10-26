import type { GameVariant } from '../../../types/game'
import { CrispUiImage } from '../../../lib/CrispUiImage'
import redGeneral from '../../../assets/history/history-red-user.png'
import blackGeneral from '../../../assets/history/history-black-user.png'
import concealedPiece from '../../../assets/history/history-hidden-user.png'

export function HistoryMatchPieces({ variant, compact = false }: { variant?: GameVariant; compact?: boolean }) {
  const size = compact ? 'size-[var(--ui-p-90,90px)]' : 'size-[var(--ui-p-47,47px)]'
  return <span className="inline-flex shrink-0 items-center justify-center gap-0 self-center">
    <CrispUiImage src={redGeneral} alt="Quân đỏ" className={`${size} object-contain`} />
    <CrispUiImage src={variant === 'jieqi' ? concealedPiece : blackGeneral} alt={variant === 'jieqi' ? 'Quân úp' : 'Quân đen'} className={`${size} object-contain`} />
  </span>
}
