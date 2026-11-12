import innerBackground from '../../assets/backgrounds/home.png'
import { OuterSceneBackdrop } from '../../lib/OuterSceneBackdrop'
import { HovangLoadingOverlay } from '../../components/HovangLoadingOverlay'
import { ComputerActionButton } from '../../features/lobby/components/ComputerActionButton'
import { createPortal } from 'react-dom'
import { ChessPiece } from '../../features/game/components/ChessPiece'
import { usePositionDrag } from '../../features/game/hooks/usePositionDrag'
import { useCallback, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Board } from '../../features/game/components/Board'
import { GameBackIcon } from '../../features/game/components/GameBackIcon'
import { PositionPalette, MobilePositionPalette, positionPanelClass } from '../../features/game/components/PositionPalette'
import { PositionIcon } from '../../features/game/components/PositionIcon'
import { PositionImageDialog } from '../../features/game/components/PositionImageDialog'
import { useBoardLayout } from '../../features/game/hooks/useBoardLayout'
import { usePositionEditor } from '../../features/game/hooks/usePositionEditor'
import { useRoomEntrance } from '../../features/game/hooks/useRoomEntrance'
import { OpeningCover } from '../../features/game/components/OpeningCover'
import { useGameTools } from '../../features/game/hooks/useGameTools'
import { gameUtilityButton, buttonInteraction, selectionPalette } from '../../lib/uiClasses'
import { HomeIcon } from '../../features/lobby/components/HomeIcon'

export function CustomPositionPage({ onEntranceComplete }: { onEntranceComplete: () => void }) {
  const entrance = useRoomEntrance(onEntranceComplete)
  const editor = usePositionEditor()
  const { ghost, ...dragHandlers } = usePositionDrag(editor)
  const layout = useBoardLayout(true)
  const tools = useGameTools(async () => {})
  const input = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File | null>(null)

  // Start custom-position trial immediately on current screen; App handles game screen/transition.
  const [starting, setStarting] = useState(false)
  const startMatch = useCallback(() => {
    if (starting) return
    setStarting(true)
    void editor.start().finally(() => setStarting(false))
  }, [editor, starting])

  const changeSide = () => { editor.changeSide(editor.side === 'red' ? 'black' : 'red') }

  const icon = 'size-8 [filter:drop-shadow(1px_2px_1px_#392300)]'
  const sideButton = `${buttonInteraction} flex-1 rounded border px-2 py-1 font-heading text-lg compact:text-sm compact:py-0.5`
  return <div onKeyDownCapture={event => { if (event.code === 'Space' && !(event.target as HTMLElement).closest('input,textarea,select,[contenteditable="true"]')) { event.preventDefault(); event.stopPropagation() } }} data-testid="position-entrance" data-entering={entrance.entering} className="relative isolate flex h-dvh w-full items-center justify-center overflow-hidden bg-[#17251f] data-[entering=true]:bg-transparent">
    <OuterSceneBackdrop />
    <div ref={entrance.sceneRef} className="relative h-dvh w-full overflow-hidden desktop:h-full desktop:w-[calc(100%-240px)] desktop:border-[5px] desktop:border-[#80582c] desktop:shadow-[0_0_0_7px_#170c07,0_0_52px_18px_#000d]">
      <main {...dragHandlers} aria-label="Vị trí tùy chỉnh" className="[&_[data-testid=board-hit]]:touch-none [&_[data-position-type]]:touch-none relative h-full w-full overflow-hidden text-[#ffebbd]">
        {(editor.starting || starting) && <HovangLoadingOverlay label="Đang chuẩn bị ván cờ" />}
        <div className="relative isolate h-full px-[10px] py-1 desktop:px-6 compact:overflow-hidden compact:px-0 compact:py-0">
          <img src={innerBackground} alt="" className="pointer-events-none absolute -inset-[8%] -z-20 h-[116%] w-[116%] max-w-none object-cover object-center contrast-[1.08] saturate-[1.08]" />
          <header className="pointer-events-none absolute inset-x-3 top-3 z-20 flex h-12 items-center gap-3 compact:inset-x-0 compact:top-0 compact:h-[76px]">
            <button type="button" className={`${gameUtilityButton} compact:fixed compact:left-[7px] compact:top-[7px] compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)`} aria-label="Về chọn máy" onClick={editor.back}><GameBackIcon /></button>
            <fieldset inert={entrance.entering} className={`${positionPanelClass} pointer-events-auto absolute top-0 w-[224px] compact:hidden rounded-md px-2 py-1 text-center compact:left-1/2! compact:top-[7px] compact:w-[180px] compact:-translate-x-1/2 compact:px-1 compact:py-0.5`} style={{ left: `calc(25% - ${layout.frameWidth / 4}px - 88px)` }}>
              <legend className="sr-only">Chọn bên cầm quân</legend>
              <div className="flex items-center gap-1">
                <button type="button" data-ui-selection-sound aria-pressed={editor.side === 'red'} onClick={() => editor.changeSide('red')} className={`${sideButton} ${editor.side === 'red' ? `${selectionPalette.selected.border} bg-[#8b0910]` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}`}>Đỏ</button>
                <button type="button" data-ui-selection-sound title="Đổi bên cầm quân" aria-label="Đổi bên Đỏ/Đen" onClick={changeSide} className={`${buttonInteraction} grid size-8 shrink-0 place-items-center rounded-full border-2 border-[#d39a43] bg-[#241007] p-0 text-[#ffe5a6]`}><svg aria-hidden="true" viewBox="0 0 24 24" className="block size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/></svg></button>
                <button type="button" data-ui-selection-sound aria-pressed={editor.side === 'black'} onClick={() => editor.changeSide('black')} className={`${sideButton} ${editor.side === 'black' ? `${selectionPalette.selected.border} ${selectionPalette.selected.surface}` : `${selectionPalette.unselected.border} ${selectionPalette.unselected.surface}`}`}>Đen</button>
              </div>
            </fieldset>
            <div className="pointer-events-auto fixed right-[56px] top-[7px] flex h-9 items-center gap-2 desktop:hidden"><button type="button" data-ui-selection-sound aria-label="Đổi bên Đỏ/Đen" onClick={changeSide} className={`${buttonInteraction} order-first grid size-9 place-items-center rounded-full border-2 border-[#d39a43] bg-[#241007] p-0 text-[#ffe5a6]`}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/></svg></button></div>
            <nav aria-label="Tiện ích vị trí tùy chỉnh" className="pointer-events-auto ml-auto flex shrink-0 gap-3 compact:fixed compact:right-[7px] compact:top-[7px] compact:gap-1">
              <button type="button" className={`${gameUtilityButton} hidden`} title="Tạo bàn cờ từ ảnh" aria-label="Tạo bàn cờ từ ảnh" onClick={() => editor.setNotice('Đang trong quá trình phát triển')}><PositionIcon name="image" /></button>
              <button type="button" className={`${gameUtilityButton} compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)`} aria-label={tools.playing ? 'Tắt âm thanh' : 'Bật âm thanh'} aria-pressed={tools.playing} onClick={() => void tools.toggleMusic()}><HomeIcon name={tools.playing ? 'sound' : 'muted'} /></button>
              <button type="button" className={`${gameUtilityButton} compact:hidden`} aria-label="Toàn màn hình" onClick={() => void tools.fullscreen()}><svg viewBox="0 0 32 32" className={icon} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12V5h7m8 0h7v7m0 8v7h-7m-8 0H5v-7M5 5l8 8m14-8-8 8m8 14-8-8M5 27l8-8" /></svg></button>
            </nav>
          </header>
          <div inert={entrance.entering || editor.starting || starting} ref={layout.arenaRef} className="grid h-full min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-[10px] desktop:gap-2 compact:h-auto compact:min-h-full compact:grid-cols-1 compact:grid-rows-[auto_auto_auto] compact:content-start compact:justify-items-center compact:pt-[52px]" style={{ '--board-height': `${layout.frameHeight}px` } as CSSProperties}>
            <div className="hidden compact:col-start-1 compact:row-start-1 compact:block compact:w-full"><MobilePositionPalette board={editor.board} piece={editor.piece} onChoose={editor.choose} /></div>
            <aside className="col-start-3 row-start-1 flex h-full min-h-0 min-w-0 flex-col justify-center gap-[10px] pt-[72px] compact:col-start-1 compact:row-start-3 compact:w-full compact:h-auto compact:mt-1 compact:px-3 compact:pb-2 compact:pt-0">
              <div className="compact:hidden"><PositionPalette board={editor.board} piece={editor.piece} onChoose={editor.choose} onReset={editor.reset} onDelete={editor.clearPieces} /></div>
              <div className="relative flex items-center justify-center gap-6 desktop:hidden">
                <div className="flex flex-col items-center gap-1"><button type="button" onClick={editor.clearPieces} aria-label="Xóa quân" title="Xóa tất cả quân, chỉ giữ Tướng" className={`${gameUtilityButton} size-(--mobile-utility-size)! [&_svg]:size-(--mobile-utility-icon)!`}><PositionIcon name="trash" /></button><span className="font-heading text-sm">Xóa quân</span></div>
                <div className="flex flex-col items-center gap-1"><button type="button" onClick={editor.reset} aria-label="Cài lại" className={`${gameUtilityButton} size-(--mobile-utility-size)! [&_svg]:size-(--mobile-utility-icon)!`}><PositionIcon name="restore" /></button><span className="font-heading text-sm">Cài lại</span></div>
                <div className="absolute right-0 top-0 h-10 w-[20%] [&_button>span]:justify-center [&_button>span]:gap-0 [&_button>span]:px-0 [&_button>span>span]:hidden [&_button>span>svg]:size-6!"><ComputerActionButton action="start" aria-label="Đấu ngay" disabled={editor.starting || starting} onClick={startMatch}>{editor.starting || starting ? 'Đang chuẩn bị…' : 'Đấu ngay'}</ComputerActionButton></div>
              </div>
              <div className="mx-auto aspect-[440/100] w-[80%] shrink-0 compact:hidden"><ComputerActionButton className="[&>span]:!gap-[3cqw] [&>span]:!px-[7cqw] [&>span>svg]:!size-[14cqw] [&>span>span]:!text-[9cqw]" action="start" aria-label={editor.starting || starting ? 'Đang chuẩn bị…' : 'Đấu ngay'} disabled={editor.starting || starting} onClick={startMatch}>{editor.starting || starting ? 'Đang chuẩn bị…' : 'Đấu ngay'}</ComputerActionButton></div>
            </aside>
            <div className="relative col-start-2 row-start-1 self-center desktop:self-start desktop:top-0 compact:col-start-1 compact:row-start-2 compact:min-h-0 compact:justify-self-center">
              <Board board={editor.board} flipped={editor.side === 'black'} selected={editor.selected} legalMoves={[]} animation={null} frameWidth={layout.frameWidth} scale={layout.scale} disabled={editor.starting || starting} showStart={false} startDisabled={editor.starting || starting} startLabel={editor.starting || starting ? 'Đang chuẩn bị…' : 'Đấu ngay'} onSelect={editor.select} onRemove={editor.removeAndChoose} onStart={startMatch} />
            </div>
          </div>
          {(editor.notice || tools.notice) && <div role="status" className="fixed left-1/2 top-1/2 z-[500] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded border border-[#dac086] bg-[#183f35] px-4 py-2 text-center text-sm text-[#ffe2a1]">{editor.notice || tools.notice}</div>}
        </div>
      </main>
    </div>
    {entrance.entering && <OpeningCover onComplete={entrance.finishEntrance} />}
    {ghost && createPortal(<div aria-hidden="true" className="pointer-events-none fixed z-[100] w-[64px] -translate-x-1/2 -translate-y-1/2" style={{ left: ghost.x, top: ghost.y }}><ChessPiece side={ghost.side} type={ghost.type} character="" scale={0.6} shadow={false} /></div>, document.body)}
  </div>
}
