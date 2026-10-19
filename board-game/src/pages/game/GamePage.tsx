import { useDemoReadyCountdown } from '../../features/game/hooks/useDemoReadyCountdown'
import { getComputerAvatar } from '../../lib/computerAvatar'
import { MatchResultDialog } from '../../features/game/components/MatchResultDialog'
import { useMatchResult } from '../../features/game/hooks/useMatchResult'
import { usePikafishHint } from '../../features/game/hooks/usePikafishHint'
import { useReplayTrial } from '../../features/game/hooks/useReplayTrial'
﻿import { savedMatchSide } from '../../lib/savedMatchPerspective'
import { useSavedPositions } from '../../store/savedPositionsStore'
import type { RecordedMatch } from '../../types/recordedMatch'
import { useReplayPlayback } from '../../features/game/hooks/useReplayPlayback'
import { ReplayControls, ReplayModeButton } from '../../features/game/components/ReplayControls'
import { useSavedMatches } from '../../store/savedMatchesStore'
import gameBackground from '../../assets/backgrounds/home.png'
import { useRoomEntrance, ROOM_OPENING_MODE } from '../../features/game/hooks/useRoomEntrance'
import { OpeningCover } from '../../features/game/components/OpeningCover'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { GameTools } from '../../features/game/components/GameTools'
import { useGameTools } from '../../features/game/hooks/useGameTools'
import { useScreenshotRenderer } from '../../features/game/hooks/useScreenshotRenderer'
import { useMatchIntro } from '../../features/game/hooks/useMatchIntro'
import { MatchIntro } from '../../features/game/components/MatchIntro'
import { useGame } from '../../features/game/hooks/useGame'
import { useMatchSaving } from '../../features/game/hooks/useMatchSaving'
import { useBoardLayout } from '../../features/game/hooks/useBoardLayout'
import { useChat } from '../../features/game/hooks/useChat'
import { useLobby } from '../../features/lobby/hooks/useLobby'
import { Board } from '../../features/game/components/Board'
import { PlayerCard } from '../../features/game/components/PlayerCard'
import { RoomQueueButton, RoomUsersPanel } from '../../features/game/components/RoomUsersPanel'
import { MatchActions } from '../../features/game/components/MatchActions'
import { Chat } from '../../features/game/components/Chat'
import { LobbyDialog } from '../../features/lobby/components/LobbyDialog'
import { AwardedHonorGrantPanel, ProfileDialog } from '../../features/lobby/components/ProfileDialog'
import { useHonorGrants } from '../../features/lobby/hooks/useHonorGrants'
import { useProfileLayout } from '../../features/lobby/hooks/useProfileLayout'
import { useFriendsLayout } from '../../features/lobby/hooks/useFriendsLayout'
import { FriendsDialog } from '../../features/lobby/components/FriendsDialog'
import { useRankingLayout } from '../../features/lobby/hooks/useRankingLayout'
import { MessagesDialog } from '../../features/lobby/components/MessagesDialog'
import type { MessageConversationRequest } from '../../features/lobby/components/MessagesDialog'
import { useSessionStore } from '../../store/sessionStore'
import { useGameStore } from '../../store/gameStore'
import type { Side } from '../../types/game'
import { sideName } from '../../game/state/selectors'
import { isInCheck } from '../../game/rules'
import { buttonInteraction, gameUtilityButton, lobbyButton } from '../../lib/uiClasses'
import { GameBackIcon } from '../../features/game/components/GameBackIcon'
import { createClientId } from '../../lib/clientId'
import takebackDialog from '../../assets/takeback/takeback-dialog.png'
import takebackDecline from '../../assets/takeback/takeback-decline.png'
import takebackAccept from '../../assets/takeback/takeback-accept.png'
import roomCodeFrame from '../../assets/room-code/room-code-frame.png'
import honorNoticeFrame from '../../assets/awarded-honors/grant-row.png'


export const OPENING_MODE = ROOM_OPENING_MODE

export function GamePage({ onEntranceComplete, replayData }: { onEntranceComplete?: () => void; replayData?: RecordedMatch }) {
  const screenshotRoot = useRef<HTMLElement | null>(null)
  const entrance = useRoomEntrance(onEntranceComplete, OPENING_MODE)
  const playback = useReplayPlayback(replayData, !entrance.entering)
  const replayMode = !!replayData
  const positionTrial = useSessionStore(state => state.customPositionTrial)
  const humanSide = useSessionStore(state => state.humanSide)
  const positionSource = useGameStore(state => state.game)
  const replayOwner = useSessionStore(state => state.name)
  const replaySavedMatch = useSavedMatches(state => !!replayData && state.entries.some(entry => entry.owner === replayOwner && entry.id === replayData.id))
  const replaySavedPosition = useSavedPositions(state => !!replayData && state.entries.some(entry => entry.owner === replayOwner && entry.sourceMatchId === replayData.id))
  const trialAllowed = !replayData?.replayRequiresSave || replaySavedMatch || replaySavedPosition
  const trialSource = replayMode ? playback.game : positionTrial ? positionSource : undefined
  const trial = useReplayTrial(trialSource, replayData ? savedMatchSide(replayData, replayOwner) : humanSide, replayData?.id ?? (positionTrial ? 'custom-position-trial' : undefined), positionTrial, positionTrial)
  const toggleTrial = () => {
    if (!replayData || entrance.entering) return
    if (!trialAllowed) { setPositionSaveNotice('Vui lòng lưu ván hoặc lưu thế cờ để chuyển sang bàn thử.'); return }
    playback.seek(playback.step)
    trial.toggle()
  }
  useEffect(() => {
    if (!replayMode && !positionTrial) return
    const handle = (event: KeyboardEvent) => {
      const arrow = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.code)
      const replayKey = ['Space', 'Enter', 'NumpadEnter'].includes(event.code)
      const trialKey = trial.active && (arrow || positionTrial && ['Enter', 'NumpadEnter'].includes(event.code))
      if (!(replayMode && replayKey) && !trialKey || event.repeat || event.ctrlKey || event.altKey || event.metaKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input,textarea,select,[contenteditable="true"],dialog') || document.querySelector('dialog[open]')) return
      if (entrance.entering) return
      event.preventDefault()
      if (event.code === 'Space' && replayMode) toggleTrial()
      else if (trial.active) {
        if (event.code === 'ArrowLeft') trial.back()
        else if (event.code === 'ArrowRight') { if (trial.step < trial.total) trial.seek(trial.step + 1) }
        else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') trial.reset()
        else trial.toggleMachine()
      }
      else if (replayMode && !trial.active) playback.toggle()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [replayMode, positionTrial, replayData, entrance.entering, playback.step, playback.playing, trial.active, trial.step, trial.total, trial.machine, trial.toggle, trialAllowed])
  const replayGame = trial.active ? trial.game : playback.game
  const leaveReplay = () => { useSavedMatches.setState({ replay: null }); useSessionStore.setState({ screen: 'home' }) }
  const leavePositionTrial = () => useSessionStore.getState().leave()
  const match = useGame(replayData && replayGame
    ? { game: replayGame, moveCount: (replayData.initialMoveCount ?? 0) + playback.step + (trial.active ? trial.step : 0), animation: trial.active ? trial.animation : playback.animation, moveOnlySound: !trial.active || trial.moveOnlySound, leave: leaveReplay }
    : positionTrial && trial.game
      ? { game: trial.game, moveCount: trial.step, animation: trial.animation, moveOnlySound: trial.moveOnlySound, leave: leavePositionTrial }
      : undefined)
  const viewerPreviewRequested = !replayMode && !match.online
    && (import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    && new URLSearchParams(window.location.search).get('viewer') === '1'
  const { game } = match
  const testBotId = useSessionStore(state => state.testBotId)
  const testBotGold = useSessionStore(state => state.testBotGold)
  const checkedSide = useMemo(() => game.phase === 'playing' && isInCheck(game.currentTurn, game.board) ? game.currentTurn : null, [game.board, game.currentTurn, game.phase])
  const computerDemo = useSessionStore(state => state.computerDemo)
  const demoReadyCountdown = useDemoReadyCountdown(!replayMode && !positionTrial && !match.online && computerDemo && game.phase === 'ready')
  const computerDemoQueued = useSessionStore(state => state.computerDemoQueued)
  const viewerPreview = !replayMode && !positionTrial && (computerDemo || viewerPreviewRequested)
  const layout = useBoardLayout()
  const profileLayout = useProfileLayout()
  const friendsLayout = useFriendsLayout()
  const friendsRef = useRef<HTMLDialogElement>(null)
  const profileDialogRef = useRef<HTMLDialogElement>(null)
  const messagesLayout = useRankingLayout()
  const messagesRef = useRef<HTMLDialogElement>(null)
  const messageRequestId = useRef(0)
  const [messageRequest, setMessageRequest] = useState<MessageConversationRequest | null>(null)
  const profileNoticeRef = useRef<HTMLDialogElement>(null)
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [profileName, setProfileName] = useState('')
  const [grantTargetName, setGrantTargetName] = useState<string | null>(null)
  const [grantTargetSide, setGrantTargetSide] = useState<Side | null>(null)
  const { getGrantedHonorIds, toggleGrant } = useHonorGrants(grantTargetName??undefined)
  const [grantToast, setGrantToast] = useState<{ id: number; message: string; phase: 'visible' | 'exiting' } | null>(null)
  const grantToastId = useRef(0)
  useEffect(() => {
    if (!grantToast || grantToast.phase !== 'visible') return
    const timer = window.setTimeout(() => setGrantToast(current => current?.id === grantToast.id ? { ...current, phase: 'exiting' } : current), 500)
    return () => window.clearTimeout(timer)
  }, [grantToast])
  const [grantAnchor, setGrantAnchor] = useState<{ left: number; top: number; width: number }>()
  const openGrantPanel = (targetName: string, side: Side) => {
    if (!canGrantOnSide(side)) return
    const avatar = document.querySelector(`[data-testid="avatar-${side}"]`)?.getBoundingClientRect()
    if (avatar) setGrantAnchor({ left: avatar.left, top: avatar.bottom + 42, width: avatar.width })
    setGrantTargetName(targetName)
    setGrantTargetSide(side)
  }
  const [profileNotice, setProfileNotice] = useState('')
  const computerMatch = !replayMode && !positionTrial && match.computer
  const showRoomFeatures = !replayMode && !positionTrial && !computerMatch
  const chat = useChat(showRoomFeatures)
  const lobby = useLobby()
  const name = useSessionStore(state => state.name)
  const [localLikeMatchId] = useState(() => 'local:' + createClientId())
  const likeMatchId = match.online ? match.room?.lastCompletedMatch?.id ?? 'online' : localLikeMatchId
  const likeActorId = match.player?.id ?? 'session:' + name.trim().toLocaleLowerCase()
  const clearMatchLikes = useSessionStore(state => state.clearMatchLikes)
  const previousLikeResult = useRef(game.result)
  const [previewQueued, setPreviewQueued] = useState(false)
  useEffect(() => {
    const previousResult = previousLikeResult.current
    previousLikeResult.current = game.result
    if (!replayMode && previousResult && !game.result) clearMatchLikes(likeMatchId)
  }, [clearMatchLikes, game.result, likeMatchId])
  const [showUsers, setShowUsers] = useState(false)
  const [resultReady, setResultReady] = useState(false)
  const [declineNotice, setDeclineNotice] = useState<{ side: Side; id: string | number } | null>(null)
  const previousLocalDeclineVersion = useRef(match.takebackDeclineVersion)
  const intro = useMatchIntro(game.phase, match.online ? match.room!.id : 'local', !match.computer && !replayMode && !positionTrial)
  const openPlayerProfile = useCallback((playerName: string) => {
    if (getComputerAvatar(playerName)) return
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
  const isRoomViewer = replayMode || !positionTrial && ((match.online && !match.player) || viewerPreview)
  const actions = <MatchActions showDrawResign={!match.computer} visible={game.phase === 'playing' && !isRoomViewer && !match.computer} disabled={!!match.animation || match.pending} drawDisabled={!!match.room?.drawOffer} takebackDisabled={!match.canTakeback || !match.online && !match.computer || !!match.room?.takebackOffer || !!match.room?.drawOffer} takebacksLeft={match.takebacksLeft} onDraw={match.draw} onResign={match.resign} onTakeback={match.requestTakeback} />
  const playerName = (side: 'red' | 'black') => replayData ? side === 'red' ? replayData.redName : replayData.blackName : computerDemo ? side === 'red' ? 'Máy · Đỏ' : 'Máy · Đen' : viewerPreview ? side === 'red' ? 'Picolozz' : 'Nguyễn Hoàng Minh Khôi' : positionTrial ? side === match.humanSide ? name : 'Ông Hoàng' : match.online ? match.room?.players.find(player => player.side === side)?.name ?? 'Đang chờ đối thủ' : match.computer ? side === match.humanSide ? name : testBotId ? 'Máy giả · 2 nước' : match.computerEngine === 'pikafish' ? 'Ông Hoàng' : 'Máy · Cơ bản' : side === 'red' ? name : 'A31977844'
  const leftSide = replayData ? savedMatchSide(replayData, name) : positionTrial || match.computer ? match.humanSide : match.online ? match.player?.side ?? 'red' : 'red'
  const rightSide = leftSide === 'red' ? 'black' : 'red'
  const playerSide = match.player?.side ?? (match.computer ? match.humanSide : leftSide)
  const playCheckmateEffect = !replayMode && !!game.lastMove && (game.result?.reason === 'checkmate' || !!testBotId && !!game.result?.winner)
  const resultDialog = useMatchResult({
    game,
    roomKey: match.online ? match.room!.id : 'local',
    side: match.online ? match.player?.side ?? null : match.computer ? match.humanSide : 'red',
    enabled: !replayMode && !positionTrial && !viewerPreview,
    waitForCheckmate: playCheckmateEffect,
    audioComplete: match.checkmateAudioComplete,
    completed: match.online ? match.room?.lastCompletedMatch : undefined,
  })
  const showLikeOnSide = (side: Side) => match.online && Boolean(match.room?.players.some(player => player.side === side)) && (isRoomViewer || side !== playerSide)
  const canGrantOnSide = (side: Side) => !replayMode && (isRoomViewer || side !== playerSide) && (!match.online || Boolean(match.room?.players.some(player => player.side === side)))
  const outcome = (side: 'red' | 'black') => game.result?.winner ? game.result.winner === side ? 'win' as const : 'loss' as const : undefined
  const timerExpired = (side: Side) => game.result?.reason === 'timeout' && game.currentTurn === side
  const isReady = (side: 'red' | 'black') => match.online && game.phase === 'ready' && !!match.room?.players.find(player => player.side === side)?.ready
  const queuedViewers = match.room?.viewers?.filter(viewer => viewer.queued) ?? []
  const roomOccupantCount = match.online
    ? new Set([...(match.room?.players ?? []), ...(match.room?.viewers ?? [])].map(member => member.id)).size
    : viewerPreview ? 1 : 0
  const queueNumbers = new Map(queuedViewers.map((viewer, index) => [viewer.id, index + 1]))
  const roomUsers: { id: string; name: string; queued?: boolean; queueNumber?: number }[] = viewerPreview
    ? [{ id: 'preview-self', name: name || 'Bạn (viewer)', queued: computerDemo ? computerDemoQueued : previewQueued, queueNumber: (computerDemo ? computerDemoQueued : previewQueued) ? 1 : undefined }]
    : match.online
      ? [
          ...(match.room?.players ?? []).map(player => ({ id: player.id, name: player.name })),
          ...(match.room?.viewers ?? []).map(viewer => ({ ...viewer, queueNumber: queueNumbers.get(viewer.id) })),
        ]
      : []
  const viewerQueueAction = viewerPreview
    ? { queued: computerDemo ? computerDemoQueued : previewQueued, disabled: false, onToggle: () => computerDemo
      ? useSessionStore.setState(state => ({ computerDemoQueued: !state.computerDemoQueued }))
      : setPreviewQueued(queued => !queued) }
    : isRoomViewer && match.viewer
      ? { queued: !!match.viewer.queued, disabled: match.pending, onToggle: () => match.toggleQueue(!match.viewer?.queued) }
      : null
  const startLabel = 'Sẵn sàng'
  const screenshotRenderer = useScreenshotRenderer(screenshotRoot)
  const tools = useGameTools(screenshotRenderer.camera)
  const [positionSaveNotice, setPositionSaveNotice] = useState('')
  const hints = usePikafishHint(game, replayData ? savedMatchSide(replayData, replayOwner) : match.humanSide, trial.active && (replayMode || positionTrial), trial.revision, setPositionSaveNotice)
  const canSavePosition = match.moveCount > 0
  const openPositionSave = async () => {
    if (!canSavePosition) return
    try {
      await useSavedPositions.getState().save({ id: createClientId(), owner: name, savedAt: Date.now(), title: `Thế cờ nước ${match.moveCount}`, note: '', redName: playerName('red'), blackName: playerName('black'), moveNumber: match.moveCount, boardState: structuredClone(game), ...(replayData?.replayRequiresSave ? { sourceMatchId: replayData.id } : {}) })
      setPositionSaveNotice('Đã lưu thế cờ.')
    } catch { setPositionSaveNotice('Không thể lưu thế cờ. Bộ nhớ có thể đã đầy.') }
  }
  useEffect(() => {
    if (!positionSaveNotice) return
    const timer = window.setTimeout(() => setPositionSaveNotice(''), 3000)
    return () => window.clearTimeout(timer)
  }, [positionSaveNotice])
  const saving = useMatchSaving(game, match.room?.lastCompletedMatch, match.online, name, playerName('red'), playerName('black'), !replayMode && !positionTrial && !computerMatch)
  const saveReplayMatch = async () => {
    if (!replayData) return
    const { replayRequiresSave: _replayRequiresSave, ...record } = replayData
    try { await useSavedMatches.getState().save(name, record); setPositionSaveNotice('Đã lưu ván đấu.') }
    catch { setPositionSaveNotice('Không thể lưu ván đấu. Bộ nhớ có thể đã đầy.') }
  }
  return <div id="gameScreen" onKeyDownCapture={event => { if (positionTrial && event.code === 'Space' && !(event.target as HTMLElement).closest('input,textarea,select,[contenteditable="true"]')) { event.preventDefault(); event.stopPropagation() } }} className="relative h-dvh w-full">
    {saving.error && <div data-screenshot-exclude="true" className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 text-center">
      {saving.error && <p role="alert" className="rounded bg-[#241007] p-2 text-[#ffe5a6]">{saving.error}</p>}
    </div>}
    {!replayMode && !match.computer && <MatchIntro intro={intro} redName={playerName('red')} blackName={playerName('black')} />}
    <div data-testid="room-entrance" data-entering={entrance.entering} className="group/entrance flex h-dvh w-full items-center justify-center overflow-hidden bg-[#263a35] data-[entering=true]:bg-transparent">
    <main ref={screenshotRoot} data-screenshot-root="true" aria-label={game.variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'} className="relative h-[calc(100dvh-12px)] w-[calc(100%-240px)] overflow-hidden border-[5px] border-[#80582c] text-center shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa] compact:w-[calc(100%-12px)]">
    <div ref={entrance.sceneRef} className={`${OPENING_MODE === 'clip' ? 'will-change-[clip-path]' : ''} relative isolate grid h-full w-full grid-rows-[0px_0px_minmax(0,1fr)_0px] bg-[#3b2516] px-6 py-1 compact:grid-rows-[48px_0px_minmax(0,1fr)_92px] compact:gap-[3px] compact:p-1`}>
      <img src={gameBackground} alt="" aria-hidden="true" className="pointer-events-none absolute -inset-[8%] -z-20 h-[116%] w-[116%] max-w-none object-cover object-center contrast-[1.08] saturate-[1.08]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-15" style={{ maskImage: layout.backgroundMask, maskComposite: 'add', opacity: layout.backgroundMask ? 1 : 0 }}>
        <img src={gameBackground} alt="" className="absolute -inset-[8%] h-[116%] w-[116%] max-w-none object-cover object-center contrast-[1.08] saturate-[1.08]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#2110061f,transparent_35%,transparent_65%,#2110061f)]" />
      <header data-room-content className="pointer-events-none absolute inset-x-3 top-3 z-20 flex h-12 items-center justify-start gap-[15px] p-0 compact:static compact:border-b compact:border-[#c4b27940]">
        <button id="backButton" type="button" className={gameUtilityButton} aria-label="Rời phòng" onClick={() => void match.leave()}>
          <GameBackIcon />
        </button>
        <div hidden={!showRoomFeatures} role="img" aria-label="Mã phòng 123456" className="absolute top-0 h-[94px] w-[196px] shrink-0 -translate-y-2 compact:hidden" style={{ left: `calc(25% - ${layout.frameWidth / 4}px - 74px)` }}>
          <img src={roomCodeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0" />
          <span aria-hidden="true" className="absolute top-[44%] right-[22%] bottom-[22%] left-[22%] flex items-center justify-center overflow-hidden font-number text-[18px]/[1] font-bold lining-nums tabular-nums tracking-normal text-[#f6d696] [text-shadow:0_1px_2px_#160b04]">{Array.from('123456', (digit) => <span key={digit} className="inline-flex w-[0.7em] shrink-0 justify-center">{digit}</span>)}</span>
        </div>
        <span inert={entrance.entering} className="contents"><GameTools showMatchTools={!replayMode} showSaveMatch={!computerMatch && (!replayMode || !!replayData?.replayRequiresSave)} showSavePosition={!computerMatch && (!replayMode || trial.active || replayData?.replayKind !== 'position')} onSave={replayMode ? saveReplayMatch : saving.save} saveDisabled={replayMode ? !replayData || replayData.replayKind === 'position' : !saving.recording} saved={replayMode ? replaySavedMatch : saving.saved} onFriends={() => friendsRef.current?.showModal()} playing={tools.playing} savePositionDisabled={!canSavePosition} onSavePosition={openPositionSave} onSound={() => void tools.toggleMusic()} onFullscreen={() => void tools.fullscreen()} /></span>
      </header>
      <div className="relative z-10 row-start-2 m-0 flex min-h-0 items-center justify-center gap-3"><div id="turnText" className="sr-only">{game.phase === 'finished' ? 'Ván cờ kết thúc' : `Lượt: ${sideName(game.currentTurn)}`}</div><div id="statusText" data-screenshot-exclude="true" className="absolute top-1 m-0 whitespace-pre-line rounded border border-[#dac086] bg-[#183f35] px-3 py-1.5 text-xs/[1.5] text-[#ffe2a1] empty:hidden" role="status">{screenshotRenderer.notice || tools.notice || match.repetitionAttemptNotice || (replayMode || game.result ? '' : match.status)}</div></div>
      <div className="relative row-start-3 grid min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2 compact:relative compact:grid-cols-2 compact:grid-rows-[114px_minmax(0,1fr)]" ref={layout.arenaRef} style={{ '--board-height': `${layout.frameHeight}px` } as CSSProperties}>
        <div data-room-content className="relative h-full min-h-0 self-center pt-[72px] desktop:max-h-(--board-height) compact:pt-0"><PlayerCard showClock={!replayMode && !positionTrial && !match.computer} fillHeight={leftSide === 'red'} side={leftSide} empty={match.online && !match.room?.players.some(p=>p.side===leftSide)} playerId={match.room?.players.find(p=>p.side===leftSide)?.userId} variant={game.variant} name={playerName(leftSide)} started={game.phase !== 'ready'} active={!replayMode && !positionTrial && game.phase === 'playing' && game.currentTurn === leftSide} timerExpired={timerExpired(leftSide)} ready={isReady(leftSide)} remaining={game.remainingTime[leftSide]} turnElapsed={game.turnElapsed} turnTimeLimitMs={game.turnTimeLimitMs} outcome={outcome(leftSide)} takebackDeclineKey={declineNotice?.side === leftSide ? declineNotice.id : null} likeVisible={showLikeOnSide(leftSide)} likeMatchId={likeMatchId} likeActorId={likeActorId} likePosition="left" onAvatarClick={() => openPlayerProfile(playerName(leftSide))} onAvatarContextMenu={canGrantOnSide(leftSide) ? () => openGrantPanel(playerName(leftSide), leftSide) : undefined}>

          {!replayMode && !positionTrial && actions}
        </PlayerCard>

          <div className="pointer-events-auto absolute inset-x-0 top-[459px] -bottom-[10px] z-8 short-desktop:top-[379px] compact:fixed compact:right-auto compact:bottom-[34px] compact:left-3 compact:top-auto compact:h-[min(220px,calc(100dvh-116px))] compact:w-[330px] compact:max-w-[calc(100vw-24px)]" hidden={!showRoomFeatures || !showUsers}><RoomUsersPanel users={roomUsers} queued={viewerQueueAction?.queued ?? false} queueDisabled={viewerQueueAction?.disabled ?? false} onToggleQueue={viewerQueueAction?.onToggle} onAvatarClick={openPlayerProfile} /></div>
        </div>
        <Board onCheckmateEffectComplete={resultDialog.complete} hintMove={hints.hint} hiddenChess={game.variant === 'jieqi'} checkmateEffect={playCheckmateEffect} checkSide={checkedSide} flipped={leftSide === 'black'} board={game.board} selected={trial.active ? trial.selected : match.selected} legalMoves={trial.active ? trial.moves : match.legalMoves} forbiddenMoves={match.forbiddenMoves} animation={trial.active ? trial.animation : match.animation} lastMove={game.lastMove} frameWidth={layout.frameWidth} scale={layout.scale}
          disabled={trial.active ? entrance.entering || !!trial.animation || game.phase !== 'playing' : isRoomViewer || match.computer && game.currentTurn !== match.humanSide || entrance.entering || intro.visible || game.phase !== 'playing' || !!match.animation || match.pending || match.online && match.player?.side !== game.currentTurn}
          showStart={(!match.online || (match.room?.players.length ?? 0) === 2) && (demoReadyCountdown !== null || !isRoomViewer && !(match.online && match.player?.ready) && (game.phase === 'ready' && !(match.computer && match.computerEngine === 'pikafish') || game.phase === 'finished' && resultReady))} startDisabled={match.pending || match.online && !!match.player?.ready} startLabel={startLabel} readyCountdown={match.online ? match.room?.readyCountdown : demoReadyCountdown} onSelect={trial.active ? trial.select : match.select} onStart={match.start} />
        <div data-room-content className="relative flex h-full min-h-0 min-w-0 flex-col gap-[15px] self-center pt-[72px] desktop:max-h-(--board-height) compact:pt-0 compact:col-start-2 compact:row-start-1">
          <PlayerCard showClock={!replayMode && !positionTrial && !match.computer} fillHeight={false} side={rightSide} empty={match.online && !match.room?.players.some(p=>p.side===rightSide)} playerId={match.room?.players.find(p=>p.side===rightSide)?.userId} variant={game.variant} name={playerName(rightSide)} started={game.phase !== 'ready'} active={!replayMode && !positionTrial && game.phase === 'playing' && game.currentTurn === rightSide} timerExpired={timerExpired(rightSide)} ready={isReady(rightSide)} remaining={game.remainingTime[rightSide]} turnElapsed={game.turnElapsed} turnTimeLimitMs={game.turnTimeLimitMs} outcome={outcome(rightSide)} takebackDeclineKey={declineNotice?.side === rightSide ? declineNotice.id : null} likeVisible={showLikeOnSide(rightSide)} likeMatchId={likeMatchId} likeActorId={likeActorId} likePosition="right" onAvatarClick={() => openPlayerProfile(playerName(rightSide))} onAvatarContextMenu={canGrantOnSide(rightSide) ? () => openGrantPanel(playerName(rightSide), rightSide) : undefined}>{positionTrial && <ReplayControls playback={playback} trial={trial} hintThinking={hints.thinking} onHint={() => void hints.request()} onNotice={setPositionSaveNotice} />}{replayMode && (trial.active || replayData?.replayKind !== 'position') && <ReplayControls playback={playback} trial={trial} hintThinking={hints.thinking} onHint={() => void hints.request()} onToggleMode={trialAllowed ? toggleTrial : undefined} onNotice={setPositionSaveNotice} />}{replayMode && !trial.active && replayData?.replayKind === 'position' && <ReplayModeButton active={false} onClick={toggleTrial} className="mt-[50px] compact:col-span-full compact:justify-self-center" />}</PlayerCard>
          {showRoomFeatures && <div className={mobileChatOpen ? 'desktop:contents compact:fixed compact:inset-x-3 compact:bottom-28 compact:z-40 compact:h-[min(300px,50dvh)]' : 'desktop:contents compact:hidden'}><button onClick={()=>setMobileChatOpen(false)} className="absolute right-0 -top-11 z-40 h-11 rounded-t-lg border border-[#79501e] bg-[#241007] px-4 desktop:hidden">??ng chat</button><Chat chat={chat} onAvatarClick={openPlayerProfile} /></div>}
        </div>
      </div>
      {positionSaveNotice && <div role="status" data-screenshot-exclude="true" className="absolute bottom-3 left-1/2 z-30 max-w-[90%] -translate-x-1/2 rounded border border-[#dac086] bg-[#183f35] px-4 py-2 text-center text-sm text-[#ffe2a1] compact:fixed compact:bottom-3">{positionSaveNotice}</div>}
      <footer hidden={!showRoomFeatures} inert={entrance.entering} data-room-content className={`pointer-events-none absolute bottom-6 left-6 z-30 flex min-w-0 items-center gap-3 text-xs/[1.5] compact:relative compact:bottom-auto compact:left-auto compact:row-start-4 compact:self-start ${showUsers ? 'opacity-20' : ''}`}>
        <button className="pointer-events-auto h-10 rounded border border-[#79501e] bg-[#241007] px-3 desktop:hidden" onClick={()=>setMobileChatOpen(open=>!open)} aria-expanded={mobileChatOpen}>Chat</button>
        <button id="viewersButton" className={`${buttonInteraction} pointer-events-auto inline-flex h-8 min-w-[62px] items-center justify-center gap-1.5 rounded-[3px] border border-[#d5b579] bg-[linear-gradient(#766448,#3a3022)] px-1.5 py-1 text-[#ffe2a1] shadow-[inset_0_0_0_1px_#ac8a55,inset_0_2px_3px_#e4cb9655,0_2px_3px_#0009]`} aria-label="Người trong phòng" aria-expanded={showUsers} aria-controls="roomUsers" onClick={() => setShowUsers(!showUsers)}>
          <svg viewBox="0 0 40 30" className="h-6 w-8 shrink-0 [filter:drop-shadow(0_2px_1px_#21190e)]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 15C7 8 13 5 20 5s13 3 18 10c-5 7-11 10-18 10S7 22 2 15Z" />
            <path d="M7 6 3 10M33 6l4 4M8 24l4 3m20-3-4 3" stroke="#ba8e50" strokeWidth="2" />
            <ellipse cx="20" cy="15" rx="7" ry="9" />
            <ellipse cx="20" cy="15" rx="2.5" ry="5" fill="currentColor" stroke="none" />
          </svg>
          <span className="font-number text-base/none font-bold tabular-nums [text-shadow:0_1px_2px_#21190e]">{roomOccupantCount}</span>
        </button>
        {!showUsers && viewerQueueAction && <RoomQueueButton queued={viewerQueueAction.queued} disabled={viewerQueueAction.disabled} onToggleQueue={viewerQueueAction.onToggle} />}
      </footer>
    </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-[2px] z-10 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 z-10 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-0 -bottom-1 z-10 -scale-x-100 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
    </main>
    </div>
    {match.repetitionNotice && <div data-screenshot-exclude="true" data-testid="repetition-notice-card" className="fixed inset-0 z-[1000] grid place-items-center">
      {(!match.online || !!match.player) && <button type="button" aria-label="Đóng thông báo lặp nước" onClick={match.dismissRepetitionNotice} className="absolute inset-0 m-0 border-0 bg-transparent p-0" />}
      <div role="status" className="pointer-events-auto relative z-10 m-0 grid aspect-[1340/290] w-[min(760px,94vw)] place-items-center border-0 bg-transparent p-0">
        <img src={honorNoticeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0 object-contain" />
        <p className="relative m-0 px-[12%] text-center font-cormorant text-[clamp(23px,3.5vw,31px)] font-bold leading-tight text-[#f3dda9]">{match.repetitionNotice}</p>
      </div>
    </div>}
    {match.online && match.room?.drawOffer && match.room.drawOffer !== match.player?.side && <div className="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#d1ad65] bg-[#193932] p-6 shadow-[0_8px_40px_#000a]" role="alertdialog" aria-label="Đối thủ cầu hòa">
      <p>Đối thủ đề nghị hòa.</p><div className="mt-3 flex justify-center gap-3"><button className={lobbyButton} disabled={match.pending} onClick={() => match.replyDraw(true)}>Đồng ý</button><button className={lobbyButton} disabled={match.pending} onClick={() => match.replyDraw(false)}>Từ chối</button></div>
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
    <FriendsDialog layout={friendsLayout} dialogRef={friendsRef} onClose={() => friendsRef.current?.close()} onOpenProfile={openPlayerProfile} onOpenMessages={(targetName, image, status) => { setMessageRequest({ id: ++messageRequestId.current, name: targetName, image, status }); if (!messagesRef.current?.open) messagesRef.current?.showModal() }} />
    <MessagesDialog layout={messagesLayout} dialogRef={messagesRef} openRequest={messageRequest} onViewInfo={openPlayerProfile} onClose={() => messagesRef.current?.close()} />
    <ProfileDialog layout={profileLayout} dialogRef={profileDialogRef} name={profileName} playerId={match.room?.players.find(member => member.name === profileName)?.id ?? match.room?.viewers?.find(member => member.name === profileName)?.id} challengeTargetId={match.room?.players.find(member => member.name === profileName)?.id ?? match.room?.viewers?.find(member => member.name === profileName)?.id} isOwnProfile={profileName === name} onOpenMessages={(targetName, playerId) => {
      setMessageRequest({ id: ++messageRequestId.current, name: targetName, playerId })
      if (!messagesRef.current?.open) messagesRef.current?.showModal()
    }} onClose={() => profileDialogRef.current?.close()} primaryActionLabel="Kết bạn" onPrimaryAction={() => {
      profileDialogRef.current?.close()
      setProfileNotice('Tính năng kết bạn sắp ra mắt.')
    }} />
    {grantTargetName && grantTargetSide && canGrantOnSide(grantTargetSide) && <AwardedHonorGrantPanel targetName={grantTargetName} anchor={grantAnchor} grantedHonorIds={getGrantedHonorIds(grantTargetName)} onGrant={async honor => {
      if (!canGrantOnSide(grantTargetSide)) return
      try {
        const granting = await toggleGrant(grantTargetName, honor.id)
        setGrantToast({ id: ++grantToastId.current, message: granting ? 'Đã phong danh hiệu' : 'Bạn đã bỏ phong danh hiệu', phase: 'visible' })
      } catch {
        setGrantToast({ id: ++grantToastId.current, message: 'Không thể lưu trạng thái phong danh hiệu. Vui lòng thử lại.', phase: 'visible' })
      }
    }} onClose={() => setGrantTargetName(null)} />}
    {grantToast && <div key={grantToast.id} className="pointer-events-none fixed top-1/2 left-1/2 z-[1100] -translate-x-1/2 -translate-y-1/2"><div role="status" onAnimationEnd={() => setGrantToast(current => current?.id === grantToast.id ? null : current)} className={`relative m-0 grid aspect-[1340/290] w-[min(420px,90vw)] place-items-center border-0 bg-transparent p-0 ${grantToast.phase === 'exiting' ? 'friend-request-sent-exit' : ''}`}><img src={honorNoticeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0 object-contain" /><p className="relative m-0 px-[15%] text-center font-cormorant text-[clamp(18px,4.5vw,24px)] font-bold leading-tight text-[#f3dda9]">{grantToast.message}</p></div></div>}
    <dialog ref={profileNoticeRef} aria-label="Thông báo" className="m-auto w-[min(384px,90vw)] rounded-xl border border-[#c7a264] bg-[#30271e] p-6 text-center text-[#f7e6c1] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm" onCancel={() => setProfileNotice('')}>
      <p className="leading-relaxed">{profileNotice}</p>
      <button autoFocus className={`${lobbyButton} mx-auto mt-5 px-6`} onClick={() => setProfileNotice('')}>Đã hiểu</button>
    </dialog>
    {resultDialog.outcome && <MatchResultDialog outcome={resultDialog.outcome} rewardGold={testBotId ? testBotGold : undefined} onClose={resultDialog.dismiss} />}
    {match.computerState.error && game.phase === 'playing' && <button className={`${lobbyButton} fixed bottom-5 left-1/2 z-40 -translate-x-1/2`} onClick={match.computerState.retry}>Thử lại lượt máy</button>}
    {entrance.entering && OPENING_MODE === 'cover-transform' && <OpeningCover onComplete={entrance.finishEntrance} />}
  </div>
}



