import gameBackground from '../../assets/backgrounds/home.png'
import { useRoomEntrance } from '../../features/game/hooks/useRoomEntrance'
import { OpeningCover } from '../../features/game/components/OpeningCover'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { GameTools } from '../../features/game/components/GameTools'
import { useGameTools } from '../../features/game/hooks/useGameTools'
import { useScreenshotRenderer } from '../../features/game/hooks/useScreenshotRenderer'
import { useMatchIntro } from '../../features/game/hooks/useMatchIntro'
import { MatchIntro } from '../../features/game/components/MatchIntro'
import { useGame } from '../../features/game/hooks/useGame'
import { useBoardLayout } from '../../features/game/hooks/useBoardLayout'
import { useChat } from '../../features/game/hooks/useChat'
import { useLobby } from '../../features/lobby/hooks/useLobby'
import { Board } from '../../features/game/components/Board'
import { PlayerCard } from '../../features/game/components/PlayerCard'
import { RoomQueueButton, RoomUsersPanel } from '../../features/game/components/RoomUsersPanel'
import { MatchActions } from '../../features/game/components/MatchActions'
import { Chat } from '../../features/game/components/Chat'
import { LobbyDialog } from '../../features/lobby/components/LobbyDialog'
import { ProfileDialog } from '../../features/lobby/components/ProfileDialog'
import { useProfileLayout } from '../../features/lobby/hooks/useProfileLayout'
import { useSessionStore } from '../../store/sessionStore'
import type { Side } from '../../types/game'
import { sideName } from '../../game/state/selectors'
import { buttonInteraction, gameUtilityButton, lobbyButton } from '../../lib/uiClasses'
import takebackDialog from '../../assets/takeback/takeback-dialog.png'
import takebackDecline from '../../assets/takeback/takeback-decline.png'
import takebackAccept from '../../assets/takeback/takeback-accept.png'
import roomCodeFrame from '../../assets/room-code/room-code-frame.png'

export const OPENING_MODE: 'clip' | 'cover-transform' = 'cover-transform'

export function GamePage({ onEntranceComplete }: { onEntranceComplete?: () => void }) {
  const screenshotRoot = useRef<HTMLElement | null>(null)
  const entrance = useRoomEntrance(onEntranceComplete, OPENING_MODE)
  const match = useGame()
  const viewerPreviewRequested = !match.online
    && (import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    && new URLSearchParams(window.location.search).get('viewer') === '1'
  const { game } = match
  const viewerPreview = viewerPreviewRequested
  const layout = useBoardLayout()
  const profileLayout = useProfileLayout()
  const profileDialogRef = useRef<HTMLDialogElement>(null)
  const profileNoticeRef = useRef<HTMLDialogElement>(null)
  const [profileName, setProfileName] = useState('')
  const [profileNotice, setProfileNotice] = useState('')
  const chat = useChat()
  const lobby = useLobby()
  const name = useSessionStore(state => state.name)
  const [localLikeMatchId] = useState(() => 'local:' + crypto.randomUUID())
  const likeMatchId = match.online ? match.room?.id ?? 'online' : localLikeMatchId
  const likeActorId = match.player?.id ?? 'session:' + name.trim().toLocaleLowerCase()
  const clearMatchLikes = useSessionStore(state => state.clearMatchLikes)
  const previousLikeResult = useRef(game.result)
  const [previewQueued, setPreviewQueued] = useState(false)
  useEffect(() => {
    const previousResult = previousLikeResult.current
    previousLikeResult.current = game.result
    if (previousResult && !game.result) clearMatchLikes(likeMatchId)
  }, [clearMatchLikes, game.result, likeMatchId])
  const [showUsers, setShowUsers] = useState(false)
  const [resultReady, setResultReady] = useState(false)
  const [declineNotice, setDeclineNotice] = useState<{ side: Side; id: string | number } | null>(null)
  const previousLocalDeclineVersion = useRef(match.takebackDeclineVersion)
  const intro = useMatchIntro(game.phase, match.online ? match.room!.id : 'local')
  const openPlayerProfile = useCallback((playerName: string) => {
    setProfileName(playerName)
    if (!profileDialogRef.current?.open) profileDialogRef.current?.showModal()
  }, [])
  useEffect(() => {
    const dialog = profileNoticeRef.current
    if (!dialog) return
    if (profileNotice && !dialog.open) dialog.showModal()
    if (!profileNotice && dialog.open) dialog.close()
  }, [profileNotice])
  useEffect(() => {
    const notice = match.room?.takebackDecline
    if (!match.online || !notice || notice.requester !== match.player?.side) {
      setDeclineNotice(null)
      return
    }
    setDeclineNotice({ side: notice.declinedBy, id: notice.id })
    const timer = window.setTimeout(() => setDeclineNotice(null), 2200)
    return () => window.clearTimeout(timer)
  }, [match.online, match.player?.side, match.room?.takebackDecline?.id])
  useEffect(() => {
    const previousVersion = previousLocalDeclineVersion.current
    previousLocalDeclineVersion.current = match.takebackDeclineVersion
    if (match.takebackDeclineVersion < previousVersion) setDeclineNotice(null)
    if (!match.computer || match.takebackDeclineVersion <= previousVersion) return
    setDeclineNotice({ side: match.humanSide === 'red' ? 'black' : 'red', id: match.takebackDeclineVersion })
    const timer = window.setTimeout(() => setDeclineNotice(null), 2200)
    return () => window.clearTimeout(timer)
  }, [match.computer, match.humanSide, match.takebackDeclineVersion])
  useEffect(() => {
    setResultReady(false)
    if (!game.result) return
    const timer = window.setTimeout(() => setResultReady(true), 2000)
    return () => window.clearTimeout(timer)
  }, [game.result])
  const isRoomViewer = (match.online && !match.player) || viewerPreview
  const actions = <MatchActions visible={game.phase === 'playing' && !isRoomViewer} disabled={!!match.animation || match.pending} drawDisabled={!!match.room?.drawOffer} takebackDisabled={!match.canTakeback || !match.online && !match.computer || !!match.room?.takebackOffer || !!match.room?.drawOffer} takebacksLeft={match.takebacksLeft} onDraw={match.draw} onResign={match.resign} onTakeback={match.requestTakeback} />
  const playerName = (side: 'red' | 'black') => viewerPreview ? side === 'red' ? 'Picolozz' : 'Nguyễn Hoàng Minh Khôi' : match.online ? match.room?.players.find(player => player.side === side)?.name ?? 'Đang chờ đối thủ' : match.computer ? side === match.humanSide ? name : match.computerEngine === 'pikafish' ? 'Pikafish' : 'Máy · Cơ bản' : side === 'red' ? name : 'A31977844'
  const leftSide = match.computer ? match.humanSide : match.online ? match.player?.side ?? 'red' : 'red'
  const rightSide = leftSide === 'red' ? 'black' : 'red'
  const nextMatchOffer = match.room?.nextMatchOffer
  const nextMatchOpponentName = match.room?.viewers?.find(viewer => viewer.id === nextMatchOffer?.nextPlayerId)?.name
  const playerSide = match.player?.side ?? (match.computer ? match.humanSide : leftSide)
  const playCheckmateEffect = !!game.lastMove && match.moveCount === (match.online || playerSide === 'red' ? 1 : 2)
  const showLikeOnSide = (side: Side) => isRoomViewer || side !== playerSide
  const outcome = (side: 'red' | 'black') => game.result?.winner ? game.result.winner === side ? 'win' as const : 'loss' as const : undefined
  const timerExpired = (side: Side) => game.result?.reason === 'timeout' && game.currentTurn === side
  const isReady = (side: 'red' | 'black') => !!match.room?.players.find(player => player.side === side)?.ready
  const queuedViewers = match.room?.viewers?.filter(viewer => viewer.queued) ?? []
  const queueNumbers = new Map(queuedViewers.map((viewer, index) => [viewer.id, index + 1]))
  const roomUsers: { id: string; name: string; queued?: boolean; queueNumber?: number }[] = viewerPreview
    ? [{ id: 'preview-self', name: name || 'Bạn (viewer)', queued: previewQueued, queueNumber: previewQueued ? 1 : undefined }]
    : match.online
      ? (match.room?.viewers ?? []).map(viewer => ({ ...viewer, queueNumber: queueNumbers.get(viewer.id) }))
      : []
  const viewerQueueAction = viewerPreview
    ? { queued: previewQueued, disabled: false, onToggle: () => setPreviewQueued(queued => !queued) }
    : isRoomViewer && match.viewer
      ? { queued: !!match.viewer.queued, disabled: match.pending, onToggle: () => match.toggleQueue(!match.viewer?.queued) }
      : null
  const startLabel = match.online && match.player?.ready ? 'Đang chờ đối thủ…' : 'Sẵn sàng'
  const screenshotRenderer = useScreenshotRenderer(screenshotRoot)
  const tools = useGameTools(screenshotRenderer.camera)
  return <div id="gameScreen" className="relative h-dvh w-full">
    <MatchIntro intro={intro} redName={playerName('red')} blackName={playerName('black')} />
    <div data-testid="room-entrance" data-entering={entrance.entering} inert={entrance.entering} className="group/entrance flex h-dvh w-full items-center justify-center overflow-hidden bg-[#263a35] data-[entering=true]:bg-transparent">
    <main ref={screenshotRoot} data-screenshot-root="true" aria-label={game.variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'} className="relative h-[calc(100dvh-12px)] w-[calc(100%-240px)] overflow-hidden border-[5px] border-[#80582c] text-center shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa] compact:w-[calc(100%-12px)]">
    <div ref={entrance.sceneRef} className={`${OPENING_MODE === 'clip' ? 'will-change-[clip-path]' : ''} relative isolate grid h-full w-full grid-rows-[0px_0px_minmax(0,1fr)_0px] bg-[#3b2516] px-6 py-1 compact:grid-rows-[48px_0px_minmax(0,1fr)_32px] compact:gap-[3px] compact:p-3`}>
      <img src={gameBackground} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 size-full scale-[1.16] object-cover object-center contrast-[1.08] saturate-[1.08]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-15" style={{ maskImage: layout.backgroundMask, maskComposite: 'add', opacity: layout.backgroundMask ? 1 : 0 }}>
        <img src={gameBackground} alt="" className="absolute inset-0 size-full scale-[1.16] object-cover object-center contrast-[1.08] saturate-[1.08]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#2110061f,transparent_35%,transparent_65%,#2110061f)]" />
      {game.variant === 'jieqi' && <span className="pointer-events-none absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded border border-[#bd914e] bg-[#382717]/90 px-3 py-1 text-sm font-semibold text-[#f4d598]">Cờ Úp</span>}
      <header data-room-content className="pointer-events-none absolute inset-x-3 top-3 z-20 flex h-12 items-center justify-start gap-[15px] p-0 compact:static compact:border-b compact:border-[#c4b27940]">
        <button id="backButton" type="button" className={gameUtilityButton} aria-label="Rời phòng" onClick={() => void match.leave()}>
          <svg viewBox="0 0 28 28" className="size-[32px] [filter:drop-shadow(1px_2px_1px_#392300)]" aria-hidden="true">
            <path d="M13 4h11v20H13v-5h3v2h5V7h-5v2h-3Z" fill="currentColor" />
            <path d="m2 14 9-7v4h7v6h-7v4Z" fill="currentColor" />
            <path d="M14 5h9v18M4 14l6-5" fill="none" stroke="#fff49a" strokeWidth="0.8" />
          </svg>
        </button>
        <div role="img" aria-label="Mã phòng 123456" className="absolute top-0 h-[80px] w-[190px] shrink-0 -translate-y-2 compact:static compact:self-start" style={{ left: `calc(25% - ${layout.frameWidth / 4}px - 71px)` }}>
          <img src={roomCodeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0" />
          <span aria-hidden="true" className="absolute top-[44%] right-[22%] bottom-[22%] left-[22%] flex items-center justify-center overflow-hidden font-georgia text-[16px]/[1] font-bold lining-nums tabular-nums tracking-[0.06em] text-[#f6d696] [text-shadow:0_1px_2px_#160b04]">{Array.from('123456', (digit) => <span key={digit} className="inline-flex w-[1em] shrink-0 justify-center">{digit}</span>)}</span>
        </div>
        <GameTools playing={tools.playing} onCamera={() => void tools.camera()} onSound={() => void tools.toggleMusic()} onFullscreen={() => void tools.fullscreen()} />
      </header>
      <div className="relative z-10 row-start-2 m-0 flex min-h-0 items-center justify-center gap-3"><div id="turnText" className="sr-only">{game.phase === 'finished' ? 'Ván cờ kết thúc' : `Lượt: ${sideName(game.currentTurn)}`}</div><div id="statusText" data-screenshot-exclude="true" className="absolute top-1 m-0 rounded border border-[#dac086] bg-[#183f35] px-3 py-1.5 text-xs/[1.5] text-[#ffe2a1] empty:hidden" role="status">{screenshotRenderer.notice || tools.notice || (game.result ? '' : match.status)}</div></div>
      <div className="row-start-3 grid min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2 compact:relative compact:grid-cols-2 compact:grid-rows-[114px_minmax(0,1fr)]" ref={layout.arenaRef} style={{ '--board-height': `${layout.frameHeight}px` } as CSSProperties}>
        <div data-room-content className="relative h-full min-h-0 self-center pt-[72px] desktop:max-h-(--board-height) compact:pt-0"><PlayerCard fillHeight={leftSide === 'red'} side={leftSide} name={playerName(leftSide)} started={game.phase !== 'ready'} active={game.phase === 'playing' && game.currentTurn === leftSide} timerExpired={timerExpired(leftSide)} ready={isReady(leftSide)} remaining={game.remainingTime[leftSide]} turnElapsed={game.turnElapsed} outcome={outcome(leftSide)} takebackDeclineKey={declineNotice?.side === leftSide ? declineNotice.id : null} likeVisible={showLikeOnSide(leftSide)} likeMatchId={likeMatchId} likeActorId={likeActorId} likePosition="left" onAvatarClick={() => openPlayerProfile(playerName(leftSide))}>
          {actions}
        </PlayerCard>
          <div className="pointer-events-auto absolute inset-x-0 top-[449px] bottom-0 z-8 translate-y-[10px] short-desktop:top-[369px] compact:fixed compact:right-auto compact:bottom-[44px] compact:left-3 compact:top-auto compact:h-[min(220px,calc(100dvh-116px))] compact:w-[330px] compact:max-w-[calc(100vw-24px)]" hidden={!showUsers}><RoomUsersPanel users={roomUsers} queued={viewerQueueAction?.queued ?? false} queueDisabled={viewerQueueAction?.disabled ?? false} onToggleQueue={viewerQueueAction?.onToggle} onAvatarClick={openPlayerProfile} /></div>
        </div>
        <Board hiddenChess={game.variant === 'jieqi'} checkmateEffect={playCheckmateEffect} onCheckmateEffectStart={match.playCheckmateSound} flipped={leftSide === 'black'} board={game.board} selected={match.selected} legalMoves={match.legalMoves} animation={match.animation} lastMove={game.lastMove} frameWidth={layout.frameWidth} scale={layout.scale}
          disabled={isRoomViewer || match.computer && game.currentTurn !== match.humanSide || entrance.entering || intro.visible || game.phase !== 'playing' || !!match.animation || match.pending || match.online && match.player?.side !== game.currentTurn}
          showStart={!isRoomViewer && !nextMatchOffer && !entrance.entering && (game.phase === 'ready' || game.phase === 'finished' && resultReady)} startDisabled={match.pending || match.online && !!match.player?.ready} startLabel={startLabel} onSelect={match.select} onStart={match.start} />
        <div data-room-content className="relative flex h-full min-h-0 min-w-0 flex-col gap-[15px] self-center pt-[72px] desktop:max-h-(--board-height) compact:pt-0 compact:col-start-2 compact:row-start-1">
          <PlayerCard fillHeight={false} side={rightSide} name={playerName(rightSide)} started={game.phase !== 'ready'} active={game.phase === 'playing' && game.currentTurn === rightSide} timerExpired={timerExpired(rightSide)} ready={isReady(rightSide)} remaining={game.remainingTime[rightSide]} turnElapsed={game.turnElapsed} outcome={outcome(rightSide)} takebackDeclineKey={declineNotice?.side === rightSide ? declineNotice.id : null} likeVisible={showLikeOnSide(rightSide)} likeMatchId={likeMatchId} likeActorId={likeActorId} likePosition="right" onAvatarClick={() => openPlayerProfile(playerName(rightSide))} />
          <Chat chat={chat} onAvatarClick={openPlayerProfile} />
        </div>
      </div>
      <footer data-room-content className={`pointer-events-none absolute bottom-6 left-6 z-30 flex min-w-0 items-center gap-3 text-xs/[1.5] compact:relative compact:bottom-auto compact:left-auto compact:row-start-4 ${showUsers ? 'opacity-20' : ''}`}>
        <button id="viewersButton" className={`${buttonInteraction} pointer-events-auto inline-flex h-8 min-w-[62px] items-center justify-center gap-1.5 rounded-[3px] border border-[#d5b579] bg-[linear-gradient(#766448,#3a3022)] px-1.5 py-1 text-[#ffe2a1] shadow-[inset_0_0_0_1px_#ac8a55,inset_0_2px_3px_#e4cb9655,0_2px_3px_#0009]`} aria-label="Người trong phòng" aria-expanded={showUsers} aria-controls="roomUsers" onClick={() => setShowUsers(!showUsers)}>
          <svg viewBox="0 0 40 30" className="h-6 w-8 shrink-0 [filter:drop-shadow(0_2px_1px_#21190e)]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 15C7 8 13 5 20 5s13 3 18 10c-5 7-11 10-18 10S7 22 2 15Z" />
            <path d="M7 6 3 10M33 6l4 4M8 24l4 3m20-3-4 3" stroke="#ba8e50" strokeWidth="2" />
            <ellipse cx="20" cy="15" rx="7" ry="9" />
            <ellipse cx="20" cy="15" rx="2.5" ry="5" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-base/none font-bold tabular-nums [text-shadow:0_1px_2px_#21190e]">{roomUsers.length}</span>
        </button>
        {!showUsers && viewerQueueAction && <RoomQueueButton queued={viewerQueueAction.queued} disabled={viewerQueueAction.disabled} onToggleQueue={viewerQueueAction.onToggle} />}
      </footer>
    </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-[2px] z-10 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 z-10 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-0 -bottom-1 z-10 -scale-x-100 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
    </main>
    </div>
    {match.online && match.room?.drawOffer && match.room.drawOffer !== match.player?.side && <div className="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#d1ad65] bg-[#193932] p-6 shadow-[0_8px_40px_#000a]" role="alertdialog" aria-label="Đối thủ cầu hòa">
      <p>Đối thủ đề nghị hòa.</p><div className="mt-3 flex justify-center gap-3"><button className={lobbyButton} disabled={match.pending} onClick={() => match.replyDraw(true)}>Đồng ý</button><button className={lobbyButton} disabled={match.pending} onClick={() => match.replyDraw(false)}>Từ chối</button></div>
    </div>}
    {match.online && match.player && game.phase === 'finished' && nextMatchOffer?.winner === match.player.side && <div className="fixed inset-0 z-40 grid place-items-center bg-[#07171588] p-4" role="alertdialog" aria-modal="true" aria-labelledby="nextMatchPrompt">
      <div className="grid w-[min(380px,100%)] gap-4 rounded-md border border-[#d1ad65] bg-[#193932] p-6 text-center text-[#ffe3a0] shadow-[0_8px_40px_#000a]">
        <p id="nextMatchPrompt" className="m-0 text-lg">Đấu với {nextMatchOpponentName ?? 'người chơi tiếp theo'}?</p>
        <div className="flex justify-center gap-3"><button type="button" className={lobbyButton} disabled={match.pending} onClick={() => match.replyNextMatch(false)}>Từ chối</button><button type="button" className={lobbyButton} disabled={match.pending} onClick={() => match.replyNextMatch(true)}>Chấp nhận</button></div>
      </div>
    </div>}
    {match.online && match.room?.takebackOffer && match.room.takebackOffer.requester !== match.player?.side && <div className="fixed inset-0 z-50 grid place-items-center bg-[#07171526]" role="alertdialog" aria-label="Đối thủ yêu cầu đi lại">
      <div className="relative w-[min(520px,calc(100%-32px))] overflow-hidden shadow-[0_10px_35px_#0009]">
        <img src={takebackDialog} alt="Đối phương muốn đi lại" className="block h-auto w-full border-0" />
        <button type="button" aria-label="Đóng và từ chối đi lại" disabled={match.pending} onClick={() => match.replyTakeback(false)} className="absolute top-[11.5%] right-[2.5%] m-0 aspect-square w-[9.8%] rounded-full border-0 bg-transparent p-0 enabled:hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe290]" />
        <button type="button" aria-label="Từ chối đi lại" disabled={match.pending} onClick={() => match.replyTakeback(false)} className="absolute bottom-[10.45%] left-[11.85%] m-0 h-auto w-[36.6%] border-0 bg-transparent p-0 leading-none enabled:hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe290]"><img src={takebackDecline} alt="" className="block size-full border-0" /></button>
        <button type="button" aria-label="Cho phép đi lại" disabled={match.pending} onClick={() => match.replyTakeback(true)} className="absolute right-[12.63%] bottom-[10.45%] m-0 h-auto w-[36.6%] border-0 bg-transparent p-0 leading-none enabled:hover:brightness-110 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe290]"><img src={takebackAccept} alt="" className="block size-full border-0" /></button>
      </div>
    </div>}
    <LobbyDialog lobby={lobby} />
    <ProfileDialog layout={profileLayout} dialogRef={profileDialogRef} name={profileName} onClose={() => profileDialogRef.current?.close()} primaryActionLabel="Kết bạn" onPrimaryAction={() => {
      profileDialogRef.current?.close()
      setProfileNotice('Tính năng kết bạn sắp ra mắt.')
    }} />
    <dialog ref={profileNoticeRef} aria-label="Thông báo" className="m-auto w-[min(384px,90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#f7e6c1] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm" onCancel={() => setProfileNotice('')}>
      <p className="leading-relaxed">{profileNotice}</p>
      <button autoFocus className={`${lobbyButton} mx-auto mt-5 px-6`} onClick={() => setProfileNotice('')}>Đã hiểu</button>
    </dialog>
    {match.computerState.error && game.phase === 'playing' && <button className={`${lobbyButton} fixed bottom-5 left-1/2 z-40 -translate-x-1/2`} onClick={match.computerState.retry}>Thử lại lượt máy</button>}
    {entrance.entering && OPENING_MODE === 'cover-transform' && <OpeningCover onComplete={entrance.finishEntrance} />}
  </div>
}
