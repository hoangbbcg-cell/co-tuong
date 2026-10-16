import positionStartButton from '../../assets/buttons/custom-position-dragon-start.png'
import { createPortal } from 'react-dom'
import { ChessPiece } from '../../features/game/components/ChessPiece'
import { usePositionDrag } from '../../features/game/hooks/usePositionDrag'
import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import background from '../../assets/backgrounds/home.png'
import { Board } from '../../features/game/components/Board'
import { GameBackIcon } from '../../features/game/components/GameBackIcon'
import { PositionPalette, positionPanelClass } from '../../features/game/components/PositionPalette'
import { PositionIcon } from '../../features/game/components/PositionIcon'
import { PositionImageDialog } from '../../features/game/components/PositionImageDialog'
import { useBoardLayout } from '../../features/game/hooks/useBoardLayout'
import { usePositionEditor } from '../../features/game/hooks/usePositionEditor'
import { useGameTools } from '../../features/game/hooks/useGameTools'
import { gameUtilityButton, buttonInteraction, selectionPalette } from '../../lib/uiClasses'
import { HomeIcon } from '../../features/lobby/components/HomeIcon'

export function CustomPositionPage() {
  const editor = usePositionEditor()
  const { ghost, ...dragHandlers } = usePositionDrag(editor)
  const layout = useBoardLayout()
  const tools = useGameTools(async () => {})
  const input = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File | null>(null)
  const icon = 'size-8 [filter:drop-shadow(1px_2px_1px_#392300)]'
  const sideButton = `${buttonInteraction} flex-1 rounded border px-2 py-1 font-heading text-lg`
  return <div className="flex h-dvh w-full items-center justify-center overflow-hidden bg-[#263a35]">
    <main {...dragHandlers} aria-label="Vị trí tùy chỉnh" className="[&_[data-testid=board-hit]]:touch-none [&_[data-position-type]]:touch-none relative h-[calc(100dvh-12px)] w-[calc(100%-240px)] overflow-hidden border-[5px] border-[#80582c] text-[#ffebbd] shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993] compact:w-[calc(100%-12px)]">
      <div className="relative isolate h-full px-[10px] py-1 compact:overflow-y-auto compact:overflow-x-hidden">
        <img src={background} alt="" className="pointer-events-none absolute -inset-[8%] -z-20 h-[116%] w-[116%] max-w-none object-cover object-center contrast-[1.08] saturate-[1.08]" />
        <header className="pointer-events-none absolute inset-x-3 top-3 z-20 flex h-12 items-center gap-3 compact:relative compact:inset-auto compact:top-auto compact:mt-2 compact:h-auto compact:min-h-12 compact:flex-wrap">
          <button type="button" className={gameUtilityButton} aria-label="Về chọn máy" onClick={editor.back}><GameBackIcon /></button>
          <fieldset className={`${positionPanelClass} pointer-events-auto absolute top-0 w-[224px] rounded-md px-2 py-1 text-center compact:static compact:order-3 compact:ml-0 compact:w-full`} style={{ left: `calc(25% - ${layout.frameWidth / 4}px - 88px)` }}>
            <legend className="sr-only">Chọn bên cầm quân</legend>
            <div className="flex items-center gap-1">
              <button type="button" aria-pressed={editor.side === 'red'} onClick={() => editor.changeSide('red')} className={`${sideButton} ${editor.side === 'red' ? `${selectionPalette.selected.border} bg-[#8b0910]` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}`}>Đỏ</button>
              <button type="button" title="Đổi bên cầm quân" aria-label="Đổi bên Đỏ/Đen" onClick={() => editor.changeSide(editor.side === 'red' ? 'black' : 'red')} className={`${buttonInteraction} grid size-8 shrink-0 place-items-center rounded-full border-2 border-[#d39a43] bg-[#241007] p-0 text-[#ffe5a6]`}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/></svg></button>
              <button type="button" aria-pressed={editor.side === 'black'} onClick={() => editor.changeSide('black')} className={`${sideButton} ${editor.side === 'black' ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface}` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}`}>Đen</button>
            </div>
            <div className="mt-[10px] flex items-center justify-center gap-2 font-heading text-xl">
              <span className="mr-2 whitespace-nowrap text-xl">Đi tiên</span><span>Đỏ</span>
              <button type="button" role="switch" aria-label="Đỏ đi tiên" aria-checked={editor.firstSide === 'red'} onClick={() => editor.setFirstSide(editor.firstSide === 'red' ? 'black' : 'red')} className={`${buttonInteraction} relative h-6 w-12 shrink-0 rounded-full border border-[#d39a43] ${editor.firstSide === 'red' ? 'bg-[#8b0910]' : 'bg-[#ffe5a6]'}`}>
                <span className={`absolute left-[2px] top-[2px] size-[18px] rounded-full border border-[#d39a43] bg-[#fff3cf] transition-transform ${editor.firstSide === 'red' ? 'translate-x-[24px]' : 'translate-x-0'}`} />
              </button><span>Đen</span>
            </div>
          </fieldset>
          <nav aria-label="Tiện ích vị trí tùy chỉnh" className="pointer-events-auto ml-auto flex shrink-0 gap-3 compact:gap-1">
            <button type="button" className={gameUtilityButton} title="Tạo bàn cờ từ ảnh" aria-label="Tạo bàn cờ từ ảnh" onClick={() => editor.setNotice('Đang trong quá trình phát triển')}><PositionIcon name="image" /></button>
            <button type="button" className={gameUtilityButton} aria-label={tools.playing ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-pressed={tools.playing} onClick={() => void tools.toggleMusic()}><HomeIcon name={tools.playing ? 'sound' : 'muted'} /></button>
            <button type="button" className={gameUtilityButton} aria-label="Toàn màn hình" onClick={() => void tools.fullscreen()}><svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12V5h7m8 0h7v7m0 8v7h-7m-8 0H5v-7M5 5l8 8m14-8-8 8m8 14-8-8M5 27l8-8" /></svg></button>
          </nav>
        </header>
        <div inert={editor.starting} ref={layout.arenaRef} className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-[10px] compact:h-auto compact:grid-cols-1 compact:grid-rows-[auto_auto]" style={{ '--board-height': `${layout.frameHeight}px` } as CSSProperties}>
          <aside className="col-start-3 row-start-1 flex h-full min-h-0 min-w-0 flex-col justify-center gap-[10px] pt-[72px] compact:col-start-1 compact:row-start-2 compact:h-auto compact:pb-4 compact:pt-0"><PositionPalette board={editor.board} piece={editor.piece} onChoose={editor.choose} onReset={editor.reset} onDelete={editor.clearPieces} /><button type="button" aria-label={editor.starting ? 'Đang chuẩn bị…' : 'Đấu ngay'} disabled={editor.starting} onClick={() => void editor.start()} className={`${buttonInteraction} block h-fit w-full shrink-0 border-0 bg-transparent p-0 leading-none disabled:opacity-60`}><img src={positionStartButton} alt="" className="m-0 block h-auto w-full border-0 p-0" /></button></aside>
          <div className="relative col-start-2 row-start-1 self-center compact:col-start-1 compact:row-start-1 compact:min-h-0">
            <Board board={editor.board} flipped={editor.side === 'black'} selected={editor.selected} legalMoves={[]} animation={null} frameWidth={layout.frameWidth} scale={layout.scale} disabled={editor.starting} showStart={false} startDisabled={editor.starting} startLabel={editor.starting ? 'Đang chuẩn bị…' : 'Đấu ngay'} onSelect={editor.select} onRemove={editor.removeAndChoose} onStart={() => void editor.start()} />
          </div>
        </div>
        {(editor.notice || tools.notice) && <div role="status" className="absolute bottom-3 left-1/2 z-30 max-w-[90%] -translate-x-1/2 rounded border border-[#dac086] bg-[#183f35] px-4 py-2 text-center text-sm text-[#ffe2a1] compact:fixed compact:bottom-3">{editor.notice || tools.notice}</div>}
      </div>
    </main>{ghost && createPortal(<div aria-hidden="true" className="pointer-events-none fixed z-[100] w-[64px] -translate-x-1/2 -translate-y-1/2" style={{ left: ghost.x, top: ghost.y }}><ChessPiece side={ghost.side} type={ghost.type} character="" scale={0.6} shadow={false} /></div>, document.body)}

  </div>
}
