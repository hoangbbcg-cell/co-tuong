import { buttonInteraction, selectionPalette } from '../../../lib/uiClasses'
import type { Side } from '../../../types/game'

/** Owner-only controls of a custom-position room: a server-side side swap so both boards flip, and the first mover. */
export function CustomRoomControls({ pending, disabled, firstTurn, onFlip, onFirstTurn, className = '' }: { pending: boolean; disabled: boolean; firstTurn: Side; onFlip: () => void; onFirstTurn: (side: Side) => void; className?: string }) {
  const chosen = selectionPalette.selected
  const idle = selectionPalette.unselected
  return <div role="group" aria-label="Cài đặt thế cờ riêng" className={`flex items-center gap-2 desktop:gap-2.5 ${className}`}>
    <button type="button" data-ui-selection-sound aria-label="Đổi bên bàn cờ" disabled={disabled || pending} onClick={onFlip} className={`${buttonInteraction} grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#d39a43] bg-[#241007] p-0 text-[#ffe5a6] disabled:opacity-100 desktop:size-11`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="block size-5 desktop:size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4" /></svg>
    </button>
    <button type="button" role="switch" data-ui-selection-sound aria-label={`${firstTurn === 'red' ? 'Đỏ' : 'Đen'} đi trước`} aria-checked={firstTurn === 'red'} disabled={disabled || pending} onClick={() => onFirstTurn(firstTurn === 'red' ? 'black' : 'red')} className={`${buttonInteraction} relative h-7 w-14 shrink-0 rounded-full border-2 ${firstTurn === 'red' ? 'border-[#e9a638] bg-[#8b0910]' : 'border-[#b78a47] bg-[#302014]'} shadow-[inset_0_0_0_1px_#79501e] disabled:opacity-100 desktop:h-8 desktop:w-16`}>
      <span className={`absolute top-1/2 size-5 -translate-y-1/2 rounded-full border border-[#ffe6a3] bg-[#ffe0a0] shadow-[0_1px_3px_#321306] transition-[left] desktop:size-6 ${firstTurn === 'red' ? 'left-[calc(100%-1.5rem)] desktop:left-[calc(100%-1.75rem)]' : 'left-1 desktop:left-1'}`} />
    </button>
  </div>
}
