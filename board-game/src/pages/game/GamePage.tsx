import { useAiControlsHidden } from '../../lib/aiControlsPreference'
import { uniqueRoomMembers } from '../../lib/roomMembers'
import { oneChoiceNoticeDialog, oneChoiceNoticeButton } from '../../features/lobby/components/OneChoiceNoticeStyles'
import { useTakebackDeclineNotice } from '../../features/game/hooks/useTakebackDeclineNotice'
import { hasReadyPlayerBetweenMatches, readyCountdownForPlayer, readyCountdownForViewer } from '../../lib/roomReadiness'
import { useDelayedResultReady } from '../../features/game/hooks/useDelayedResultReady'
import { useResultPresentationAck } from '../../features/game/hooks/useResultPresentationAck'
import { useRoomModeration } from '../../features/game/hooks/useRoomModeration'
import { RoomModerationDialogs } from '../../features/game/components/RoomModerationDialogs'
import { useGameViewportLock } from '../../features/game/hooks/useGameViewportLock'
import { useMobileChatOverlay } from '../../features/game/hooks/useMobileChatOverlay'
﻿import { useDemoReadyCountdown } from '../../features/game/hooks/useDemoReadyCountdown'
import { getComputerAvatar } from '../../lib/computerAvatar'
import { MatchResultDialog } from '../../features/game/components/MatchResultDialog'
import { useBetweenMatchClocks } from '../../features/game/hooks/useBetweenMatchClocks'
import { useMatchResult } from '../../features/game/hooks/useMatchResult'
import { useCelebrationSound } from '../../lib/useCelebrationSound'
import { useResultFaces } from '../../features/game/hooks/useResultFaces'
import { useOnlineMatchReward } from '../../features/game/hooks/useOnlineMatchReward'
import { usePikafishHint } from '../../features/game/hooks/usePikafishHint'
import { useReplayTrial } from '../../features/game/hooks/useReplayTrial'
﻿import { savedMatchSide } from '../../lib/savedMatchPerspective'
import { useSavedPositions } from '../../store/savedPositionsStore'
import type { RecordedMatch } from '../../types/recordedMatch'
import { useReplayPlayback } from '../../features/game/hooks/useReplayPlayback'
import { ReplayControls, ReplayModeButton } from '../../features/game/components/ReplayControls'
import { useSavedMatches } from '../../store/savedMatchesStore'
import gameBackground from '../../assets/backgrounds/home.png'
import { OuterSceneBackdrop } from '../../lib/OuterSceneBackdrop'
import { useRoomEntrance, ROOM_OPENING_MODE } from '../../features/game/hooks/useRoomEntrance'
import { OpeningCover } from '../../features/game/components/OpeningCover'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'

import { useEffect as useEnergyGraceEffect, useState as useEnergyGraceState } from 'react'
import { GameTools } from '../../features/game/components/GameTools'
import { GameEnergyControl } from '../../features/game/components/GameEnergyControl'
import { useGameTools } from '../../features/game/hooks/useGameTools'
import { useScreenshotRenderer } from '../../features/game/hooks/useScreenshotRenderer'
import { useMatchIntro } from '../../features/game/hooks/useMatchIntro'
import { MatchIntro } from '../../features/game/components/MatchIntro'
import { useGame } from '../../features/game/hooks/useGame'
import { useMatchSaving } from '../../features/game/hooks/useMatchSaving'
import { useBoardLayout } from '../../features/game/hooks/useBoardLayout'
import { useChat } from '../../features/game/hooks/useChat'
import { useLobby } from '../../features/lobby/hooks/useLobby'
import { MobileMatchSummary } from '../../features/game/components/MobileMatchSummary'
import { CapturedJieqiPieces } from '../../features/game/components/CapturedJieqiPieces'
import { Board } from '../../features/game/components/Board'
import { CustomRoomControls } from '../../features/game/components/CustomRoomControls'
import { positionFen } from '../../game/state/customPosition'
import { socket } from '../../services/socket'
import { PlayerCard } from '../../features/game/components/PlayerCard'
import { RoomQueueButton, RoomStandUpButton, RoomUsersPanel } from '../../features/game/components/RoomUsersPanel'
import { LeaveRoomDialog } from '../../features/game/components/LeaveRoomDialog'
import { ResignDialog } from '../../features/game/components/ResignDialog'
import { MatchActions } from '../../features/game/components/MatchActions'
import { RoomOfferDialog } from '../../features/game/components/RoomOfferDialog'
import { Chat } from '../../features/game/components/Chat'
import { LobbyDialog } from '../../features/lobby/components/LobbyDialog'
import { CreateRoomForm } from '../../features/lobby/components/CreateRoomForm'
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
import { buttonInteraction, gameUtilityButton, homeUtilityButton, lobbyButton } from '../../lib/uiClasses'
import { GameBackIcon } from '../../features/game/components/GameBackIcon'
import { HomeIcon } from '../../features/lobby/components/HomeIcon'
import { createClientId } from '../../lib/clientId'
import roomCodeFrame from '../../assets/room-code/room-code-frame.png'
import honorNoticeFrame from '../../assets/awarded-honors/grant-row.png'


export const OPENING_MODE = ROOM_OPENING_MODE

export function GamePage({ onEntranceComplete, replayData, skipEntrance = false, initialResultSide, presentationKey = 'local' }: { onEntranceComplete?: () => void; replayData?: RecordedMatch; skipEntrance?: boolean; initialResultSide?: Side; presentationKey?: string }) {
  useGameViewportLock()
  const screenshotRoot = useRef<HTMLElement | null>(null)
  const trialTransitionVersion = useRef(0)
  const entrance = useRoomEntrance(onEntranceComplete, OPENING_MODE, !skipEntrance)
  const replayReturn = useSessionStore(state => state.customReplayReturn)
  const restoredReplay = replayData?.id === replayReturn?.recordingId ? replayReturn : null
  const playback = useReplayPlayback(replayData, !entrance.entering, restoredReplay?.step ?? 0)
  const replayMode = !!replayData
  const positionTrial = useSessionStore(state => state.customPositionTrial)
  // Custom rooms keep the position trial's hook state alive while the owner visits the room,
  // so Back returns to the exact trial board that created the room.
  const customRoomReturn = useSessionStore(state => state.customRoomReturn)
  const aiControlsHidden = useAiControlsHidden()
  const hideTrialAiControls = positionTrial && aiControlsHidden
  const trialScope = positionTrial || customRoomReturn
  const humanSide = useSessionStore(state => state.humanSide)
  const positionSource = useGameStore(state => state.game)
  const replayOwner = useSessionStore(state => state.name)
  const replaySavedMatch = useSavedMatches(state => !!replayData && state.entries.some(entry => entry.owner === replayOwner && entry.id === replayData.id))
  const trialSource = replayMode ? (restoredReplay?.trialGame ?? playback.game) : trialScope ? positionSource : undefined
  const trial = useReplayTrial(trialSource, replayData ? savedMatchSide(replayData, replayOwner) : humanSide, replayData?.id ?? (trialScope ? 'custom-position-trial' : undefined), positionTrial || !!restoredReplay?.trialGame, false, positionTrial)
  const [replayFlipped, setReplayFlipped] = useState(false)
  const flipReplayBoard = () => setReplayFlipped(value => !value)
  useEffect(() => { setReplayFlipped(false) }, [replayData?.id, positionTrial])

  const toggleTrial = () => {
    if (!replayData || entrance.entering) return
    trialTransitionVersion.current += 1
    playback.seek(playback.step)
    trial.toggle()
  }
  useEffect(() => {
    if (!replayMode && !positionTrial) return
    const handle = (event: KeyboardEvent) => {
      const arrow = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.code)
      const replayKey = ['Space', 'Enter', 'NumpadEnter'].includes(event.code)
      const trialKey = positionTrial && trial.active && (arrow || ['Enter', 'NumpadEnter'].includes(event.code))
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
  }, [replayMode, positionTrial, replayData, entrance.entering, playback.step, playback.playing, trial.active, trial.step, trial.total, trial.machine, trial.toggle])
  const replayGame = trial.active ? trial.game : playback.game
  const leaveReplay = () => { useSavedMatches.setState({ replay: null }); useSessionStore.setState({ screen: 'home', customReplayReturn: null }) }
  // Back from the position trial returns to the editor, which restores the composition at "Đấu ngay".
  const leavePositionTrial = () => {
    useSessionStore.getState().leave()
    useSessionStore.setState({ screen: 'position' })
  }
  const match = useGame(replayData && replayGame
    ? { game: replayGame, moveCount: (replayData.initialMoveCount ?? 0) + playback.step + (trial.active ? trial.step : 0), animation: trial.active ? trial.animation : playback.animation, silentTransitionKey: `${trialTransitionVersion.current}`, leave: leaveReplay }
    : positionTrial && trial.game
      ? { game: trial.game, moveCount: trial.step, animation: trial.animation, leave: leavePositionTrial }
      : undefined)
  const moderation = useRoomModeration(match.online ? match.room : null)
  const moderationOnSide = (side: Side) => { const member = match.room?.players.find(player => player.side === side); return moderation.owner && member && member.id !== match.room?.ownerId ? () => moderation.openTarget(member.id) : undefined }
  // Opening the custom-room dialog stores the trial board of that moment so Back from the
  // room restores exactly this position.
  const openCustomCreate = () => {
    const sourceGame = replayMode
      ? (trial.active ? trial.game : playback.game)
      : positionTrial && trial.active ? trial.game : null

    if (!sourceGame) return

    if (sourceGame.variant === 'jieqi') {
      setPositionSaveNotice('Tạo bàn từ thế cờ hiện chỉ hỗ trợ Cờ Tướng.')
      return
    }

    if (replayMode) playback.seek(playback.step)

    useSessionStore.setState({
      customRoomReturnFen: positionFen(sourceGame.board, sourceGame.currentTurn),
      customReplayReturn: replayData ? {
        recordingId: replayData.id,
        step: playback.step,
        trialGame: trial.active ? structuredClone(sourceGame) : null,
      } : null,
    })

    setCustomCreateOpen(true)
  }
  // The room owner may configure the custom room before the game starts, including alone.
  const customRoomOwner = !replayMode && !positionTrial && match.online
    && !!match.room?.customFen && match.room.ownerId === socket.id && !!match.player
  const [customCreateOpen, setCustomCreateOpen] = useState(false)
  useEffect(() => { if (customCreateOpen && match.online) setCustomCreateOpen(false) }, [customCreateOpen, match.online])
  const viewerPreviewRequested = !replayMode && !match.online
    && (import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    && new URLSearchParams(window.location.search).get('viewer') === '1'
  const { game } = match
  const customRoomLocked = game.phase === 'playing'
  const customFirstTurn: Side = match.room?.customFirstTurn ?? game.currentTurn
  const observedLiveSeats = useRef(game.phase === 'playing')
  const previousPresentation = useRef(presentationKey)
  if (previousPresentation.current !== presentationKey) {
    previousPresentation.current = presentationKey
    observedLiveSeats.current = game.phase === 'playing'
  }
  if (game.phase === 'playing') observedLiveSeats.current = true
  const testBotId = useSessionStore(state => state.testBotId)
  const testBotGold = useSessionStore(state => state.testBotGold)
  const checkedSide = useMemo(() => game.phase === 'playing' && isInCheck(game.currentTurn, game.board) ? game.currentTurn : null, [game.board, game.currentTurn, game.phase])
  const computerDemo = useSessionStore(state => state.computerDemo)
  const demoReadyCountdown = useDemoReadyCountdown(!replayMode && !positionTrial && !match.online && computerDemo && game.phase === 'ready')
  // HOVANG: audible tick for the online ready countdown.
  // A changing number, not the match clock, is the source of truth.
  const readyAudioRoomId = !replayMode && !positionTrial && match.online
    ? match.room?.id ?? null
    : null
  const readyAudioValue = readyAudioRoomId
    ? (match.viewer ? readyCountdownForViewer(match.room) : readyCountdownForPlayer(match.room, match.player?.id))
    : null

  const lastReadyAudio = useRef<{
    roomId: string | null
    value: number | null
  }>({ roomId: null, value: null })

  useEffect(() => {
    const last = lastReadyAudio.current

    const decreased =
      readyAudioRoomId !== null &&
      last.roomId === readyAudioRoomId &&
      last.value !== null &&
      readyAudioValue !== null &&
      readyAudioValue >= 0 &&
      readyAudioValue < last.value

    lastReadyAudio.current = {
      roomId: readyAudioRoomId,
      value: readyAudioValue,
    }

    if (decreased && document.visibilityState === 'visible') {
      window.dispatchEvent(new Event('hovang-ready-countdown-tick'))
    }
  }, [readyAudioRoomId, readyAudioValue])
  const computerDemoQueued = useSessionStore(state => state.computerDemoQueued)
  const viewerPreview = !replayMode && !positionTrial && (computerDemo || viewerPreviewRequested)
  const layout = useBoardLayout(true, `${entrance.entering}:${presentationKey}`)
  const profileLayout = useProfileLayout()
  const friendsLayout = useFriendsLayout()
  const friendsRef = useRef<HTMLDialogElement>(null)
  const profileDialogRef = useRef<HTMLDialogElement>(null)
  const messagesLayout = useRankingLayout()
  const [shareRoomId, setShareRoomId] = useState<string | null>(null)
  const messagesRef = useRef<HTMLDialogElement>(null)
  const messageRequestId = useRef(0)
  const [messageRequest, setMessageRequest] = useState<MessageConversationRequest | null>(null)
  const profileNoticeRef = useRef<HTMLDialogElement>(null)
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
  const closeMobileChat = useCallback(() => setMobileChatOpen(false), [])
  const mobileChatStyle = useMobileChatOverlay(mobileChatOpen, layout.frameHeight)
  const lobby = useLobby()
  const name = useSessionStore(state => state.name)
  const [localLikeMatchId] = useState(() => 'local:' + createClientId())
  const likeMatchId = match.online ? match.room?.activeMatchId ?? match.room?.lastCompletedMatch?.id ?? 'online' : localLikeMatchId
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
  useLayoutEffect(() => {
    setPreviewQueued(false)
  }, [presentationKey])
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
  useTakebackDeclineNotice({ scope: presentationKey, online: match.online, playerSide: match.player?.side, notice: match.room?.takebackDecline, computer: match.computer, localVersion: match.takebackDeclineVersion })
  const resultKey = game.result ? `${presentationKey}:${match.room?.lastCompletedMatch?.id ?? ''}:${game.result.winner}:${game.result.reason}:${match.moveCount}` : null
  const resultReady = useDelayedResultReady(resultKey)
  const isRoomViewer = replayMode || !positionTrial && ((match.online && !match.player) || viewerPreview)
  const [compactViewport, setCompactViewport] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 800px)')
    const update = () => setCompactViewport(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const actionProps = { showTakeback: match.online && game.variant !== 'jieqi', showDrawResign: match.online || computerMatch, visible: (match.online || computerMatch) && game.phase === 'playing' && !isRoomViewer, disabled: !!match.animation || match.pending, drawDisabled: !!match.room?.drawOffer, takebackDisabled: !match.canTakeback || !match.online && !match.computer || !!match.room?.takebackOffer || !!match.room?.drawOffer, takebacksLeft: match.takebacksLeft, onDraw: match.draw, onResign: match.resign, onTakeback: match.requestTakeback }
  const actions = compactViewport ? null : <MatchActions {...actionProps} />
  const mobileActions = compactViewport ? <MatchActions {...actionProps} className="desktop:hidden" /> : null
  // Custom-position orientation follows the first piece actually chosen, not the editor's flip button.
  const playerName = (side: 'red' | 'black') => replayData ? side === 'red' ? replayData.redName : replayData.blackName : computerDemo ? side === 'red' ? 'Máy · Đỏ' : 'Máy · Đen' : viewerPreview ? side === 'red' ? 'Picolozz' : 'Nguyễn Hoàng Minh Khôi' : positionTrial ? side === match.humanSide ? name : 'Ông Hoàng' : match.online ? match.room?.players.find(player => player.side === side)?.name ?? 'Đang chờ đối thủ' : match.computer ? side === match.humanSide ? name : testBotId ? 'Máy giả · 2 nước' : match.computerEngine === 'pikafish' || match.computerEngine === 'fairy' || match.computerEngine === 'pikaJieqi' ? 'Ông Hoàng' : 'Máy · Cơ bản' : side === 'red' ? name : 'A31977844'
  const leftSide = replayData ? savedMatchSide(replayData, name) : positionTrial || match.computer ? match.humanSide : match.online ? match.player?.side ?? 'red' : 'red'
  const rightSide = leftSide === 'red' ? 'black' : 'red'
  const playerSide = match.player?.side ?? (match.computer ? match.humanSide : leftSide)
  const mobileSelfSide = match.player?.side ?? (isRoomViewer && !replayData ? null : leftSide)
  const leftMobileEdge = leftSide === mobileSelfSide ? 'bottom' : 'top'
  const rightMobileEdge = rightSide === mobileSelfSide ? 'bottom' : 'top'
  const playCheckmateEffect = !(match.online && hasReadyPlayerBetweenMatches(match.room)) && observedLiveSeats.current && !replayMode && !!game.lastMove && (game.result?.reason === 'checkmate' || !!testBotId && !!game.result?.winner)
  const [facesCompletedMatch, setFacesCompletedMatch] = useState<string | undefined>()
  const resultDialog = useMatchResult({
    initialResultSide,
    game,
    roomKey: match.online ? match.room!.id : 'local',
    ready: match.online && hasReadyPlayerBetweenMatches(match.room),
    side: match.online ? match.player?.side ?? null : match.computer ? match.humanSide : 'red',
    enabled: !replayMode && !viewerPreview,
    waitForCheckmate: playCheckmateEffect,
    audioComplete: positionTrial ? true : match.checkmateAudioComplete,
    completed: match.online ? match.room?.lastCompletedMatch : undefined,
  })

  // A single Ready player clears the previous result for everyone.
  const anyOnlinePlayerReady =
    match.online && hasReadyPlayerBetweenMatches(match.room)

  // Reset display clocks only between matches.
  // The authoritative server clock is unchanged.
  const completedClockKey = match.room?.lastCompletedMatch?.id ?? resultKey
  const { remaining: visibleRemaining, reset: resetResultClocks } = useBetweenMatchClocks({
    enabled: match.online, roomKey: match.room?.id ?? 'local',
    seats: JSON.stringify(match.room?.players.map(player => player.id).sort() ?? []),
    completionKey: completedClockKey, game, minutes: match.room?.minutes ?? 10,
    ready: anyOnlinePlayerReady,
    complete: !!completedClockKey && facesCompletedMatch === completedClockKey && match.checkmateAudioComplete,
    popupVisible: !!resultDialog.outcome,
  })

  const trialCheckmateVictory = positionTrial && game.result?.reason === 'checkmate' && !!game.result.winner
  const displayedResultOutcome = trialCheckmateVictory && resultDialog.outcome === 'loss' ? 'win' : resultDialog.outcome
  useCelebrationSound('victory', displayedResultOutcome === 'win', { finishOnClose: true, resetKey: `${match.online ? match.room!.id : presentationKey}:${anyOnlinePlayerReady}:${game.phase === 'playing'}` })
  useCelebrationSound('defeat', displayedResultOutcome === 'loss', { finishOnClose: true, resetKey: `${match.online ? match.room!.id : presentationKey}:${anyOnlinePlayerReady}:${game.phase === 'playing'}` })
  useResultPresentationAck(match.online ? match.room : null, match.player?.id, anyOnlinePlayerReady || match.checkmateAudioComplete && (!game.result?.winner || game.result.reason === 'leave' || facesCompletedMatch === match.room?.lastCompletedMatch?.id) && (!game.result?.winner || game.result.reason === 'leave' || resultDialog.presentationReady))
  const onlineReward = useOnlineMatchReward(match.room?.lastCompletedMatch?.id, match.online && !replayMode && !positionTrial && !isRoomViewer && game.phase !== 'playing')
  const showLikeOnSide = (side: Side) => match.online && Boolean(match.room?.activeMatchId) && game.phase === 'playing' && Boolean(match.room?.players.some(player => player.side === side)) && (isRoomViewer || side !== playerSide)
  const canGrantOnSide = (side: Side) => {
    if (replayMode) return false
    if (!match.online) return isRoomViewer || side !== playerSide
    const target = match.room?.players.find(player => player.side === side)
    return !!target && (!!match.viewer || !!match.player && target.id !== match.player.id)
  }
  const outcome = useResultFaces(game, match.online ? match.room!.id : 'local', match.online
    ? JSON.stringify(['red', 'black'].map(side => match.room?.players.find(player => player.side === side)?.id ?? null))
    : JSON.stringify([playerName('red'), playerName('black')]), () => setFacesCompletedMatch(match.room?.lastCompletedMatch?.id))
  const timerExpired = (side: Side) => game.result?.reason === 'timeout' && game.currentTurn === side
  const isReady = (side: 'red' | 'black') => match.online && game.phase === 'ready' && !!match.room?.players.find(player => player.side === side)?.ready
  const onlineRoomUsers = uniqueRoomMembers([
    ...(match.room?.players ?? []).map(player => ({ id: player.id, userId: player.userId, name: player.name, queued: false })),
    ...(match.room?.viewers ?? []),
  ])
  const queuedViewers = onlineRoomUsers.filter(member => member.queued)
  const roomOccupantCount = match.online
    ? onlineRoomUsers.length
    : viewerPreview ? 1 : 0
  const queueNumbers = new Map(queuedViewers.map((viewer, index) => [viewer.id, index + 1]))
  const roomUsers: { id: string; userId?: string; name: string; queued?: boolean; queueNumber?: number }[] = viewerPreview
    ? [{ id: 'preview-self', name: name || 'Bạn (viewer)', queued: computerDemo ? computerDemoQueued : previewQueued, queueNumber: (computerDemo ? computerDemoQueued : previewQueued) ? 1 : undefined }]
    : match.online
      ? onlineRoomUsers.map(member => ({ ...member, queueNumber: queueNumbers.get(member.id) }))
      : []
  const canStandUp = match.online && (match.room?.players.length === 2 || !!(match.room?.locked || match.room?.customFen)) && !!match.player && !replayMode && !positionTrial && !viewerPreview
  const viewerQueueAction = viewerPreview
    ? { queued: computerDemo ? computerDemoQueued : previewQueued, disabled: false, onToggle: () => computerDemo
      ? useSessionStore.setState(state => ({ computerDemoQueued: !state.computerDemoQueued }))
      : setPreviewQueued(queued => !queued) }
    : isRoomViewer && match.viewer
      ? { queued: !!match.viewer.queued, disabled: match.pending, onToggle: () => match.toggleQueue(!match.viewer?.queued) }
      : null
  const [energyGraceNow, setEnergyGraceNow] = useEnergyGraceState(() => Date.now())
  const energyMatchEndedAt = match.room?.lastCompletedMatch?.endedAt

  useEnergyGraceEffect(() => {
    if (!match.online || game.phase !== 'finished') return
    const refresh = () => setEnergyGraceNow(Date.now())
    refresh()
    const timer = window.setInterval(refresh, 200)
    return () => window.clearInterval(timer)
  }, [match.online, game.phase, energyMatchEndedAt])

  const hidePostMatchReady =
    match.online &&
    game.phase === 'finished' &&
    (energyMatchEndedAt == null || energyGraceNow < energyMatchEndedAt + 3000)
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
  // Vị trí tùy chỉnh: ván đấu máy chạy trong bàn thử. Lưu ván chụp toàn bộ
  // nhánh hiện tại, bắt đầu từ thế gốc đúng lúc bấm Đấu ngay (states[0]).
  const trialStartedAt = useRef<number | null>(null)
  if (positionTrial && trial.active && trialStartedAt.current === null) trialStartedAt.current = Date.now()
  const positionTrialRecording = useMemo(() => {
    if (!positionTrial || !trial.active || !trial.game || trialStartedAt.current === null) return null
    return {
      id: createClientId(),
      startedAt: trialStartedAt.current,
      endedAt: Date.now(),
      redName: match.humanSide === 'red' ? name : 'Ông Hoàng',
      blackName: match.humanSide === 'black' ? name : 'Ông Hoàng',
      states: structuredClone((trial.revision ?? []).slice(0, trial.step + 1)),
    }
  }, [positionTrial, trial.active, trial.game, trial.step, trial.revision, match.humanSide, name])
  const saving = useMatchSaving(game, match.room?.lastCompletedMatch, match.online, name, playerName('red'), playerName('black'), !replayMode && !computerMatch, positionTrialRecording)
  const saveReplayMatch = async () => {
    if (!replayData) return
    const { replayRequiresSave: _replayRequiresSave, ...record } = replayData
    try { await useSavedMatches.getState().save(name, record, !!useSessionStore.getState().account && 'serverAccountId' in replayData && !!replayData.serverAccountId); setPositionSaveNotice('Đã lưu ván đấu.') }
    catch { setPositionSaveNotice('Không thể lưu ván đấu. Bộ nhớ có thể đã đầy.') }
  }
  const toggleMobileChat = () => {
    chat.inputRef.current?.blur()
    if (!mobileChatOpen && chat.collapsed) chat.toggle()
    setMobileChatOpen(open => !open)
    setMobileMenuOpen(false)
    setShowUsers(false)
  }
  const mobileChatButton = compactViewport && showRoomFeatures && !entrance.entering ? createPortal(
    <button data-ui-selection-sound type="button" disabled={entrance.entering} className={gameUtilityButton + ' fixed ' + (game.variant === 'jieqi' ? 'bottom-0' : 'bottom-[8px]') + ' right-[calc(8px+42px+clamp(4px,calc((100vw-352px)/2),8px))] z-[350] size-(--mobile-utility-size)! [&_svg]:size-(--mobile-utility-icon) disabled:opacity-100'} aria-label="Chat" aria-expanded={mobileChatOpen} aria-controls="mobile-room-chat" onClick={toggleMobileChat}><svg viewBox="0 0 24 24" className="size-7 [filter:drop-shadow(0_2px_1px_#674006)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path fill="currentColor" stroke="none" fillRule="evenodd" d="M4 3a2 2 0 0 0-2 2v17l6-5h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm2 4h12v2H6Zm0 4h9v2H6Z" /></svg></button>,
    document.body,
  ) : null
  const mobileChatPanel = compactViewport && showRoomFeatures ? createPortal(
    <>{mobileChatOpen && <button type="button" aria-label="Đóng tin nhắn" className="fixed inset-0 z-[499] m-0 touch-manipulation border-0 bg-transparent p-0" onPointerDown={event => event.stopPropagation()} onClick={event => { event.preventDefault(); event.stopPropagation(); chat.inputRef.current?.blur(); closeMobileChat() }} />}<div id="mobile-room-chat" style={{ ...mobileChatStyle, '--board-height': `${layout.frameHeight}px` } as CSSProperties} className={mobileChatOpen ? 'pointer-events-auto fixed inset-x-0 bottom-[var(--mobile-chat-bottom,0px)] z-[500] h-[var(--mobile-chat-height,calc((100dvh-var(--board-height))/2+var(--board-height)*0.45))]' : 'hidden'}><Chat chat={chat} onAvatarClick={openPlayerProfile} /></div></>,
    document.body,
  ) : null
  return <div id="gameScreen" onKeyDownCapture={event => { if (positionTrial && event.code === 'Space' && !(event.target as HTMLElement).closest('input,textarea,select,[contenteditable="true"]')) { event.preventDefault(); event.stopPropagation() } }} className="fixed inset-0 h-dvh w-full overflow-hidden overscroll-none">
    {mobileChatButton}
    {mobileChatPanel}
    {saving.error && <div data-screenshot-exclude="true" className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 text-center">
      {saving.error && <p role="alert" className="fixed left-1/2 top-1/2 z-[500] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded bg-[#241007] p-2 text-center text-[#ffe5a6]">{saving.error}</p>}
    </div>}
    {!replayMode && !match.computer && <MatchIntro intro={intro} redName={playerName('red')} blackName={playerName('black')} redId={match.room?.players.find(player => player.side === 'red')?.userId} blackId={match.room?.players.find(player => player.side === 'black')?.userId} variant={game.variant} />}
    <div data-testid="room-entrance" data-entering={entrance.entering} className="group/entrance relative isolate flex h-full compact:h-dvh w-full items-center justify-center overflow-hidden bg-[#17251f] data-[entering=true]:bg-transparent"><OuterSceneBackdrop />
    <main ref={screenshotRoot} data-screenshot-root="true" aria-label={game.variant === 'jieqi' ? 'Cờ Úp' : 'Cờ Tướng'} className="relative z-10 h-full w-[calc(100%_-_240px)] shrink-0 overflow-hidden border-[5px] border-[#80582c] text-center shadow-[0_0_0_7px_#170c07,0_0_52px_18px_#000d,0_8px_30px_#101d18aa] compact:h-dvh compact:w-full compact:border-0 compact:shadow-none compact:isolate compact:bg-[#3b2516]">
    <div ref={entrance.sceneRef} className={`${OPENING_MODE === 'clip' ? 'will-change-[clip-path]' : ''} relative isolate grid h-full w-full grid-rows-[0px_0px_minmax(0,1fr)_0px] bg-[#3b2516] px-6 py-1 compact:grid-rows-[0px_0px_minmax(0,1fr)_0px] compact:gap-0 compact:p-0 compact:[isolation:auto] compact:bg-transparent`}>
      <img src={gameBackground} alt="" aria-hidden="true" className="pointer-events-none absolute -inset-[8%] -z-20 h-[116%] w-[116%] max-w-none object-cover object-center contrast-[1.08] saturate-[1.08]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-15" style={{ maskImage: layout.backgroundMask, maskComposite: 'add', opacity: layout.backgroundMask ? 1 : 0 }}>
        <img src={gameBackground} alt="" className="absolute -inset-[8%] h-[116%] w-[116%] max-w-none object-cover object-center contrast-[1.08] saturate-[1.08]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#2110061f,transparent_35%,transparent_65%,#2110061f)]" />
      <header data-room-content className={`pointer-events-none absolute inset-x-3 top-3 z-20 flex h-12 items-center justify-start gap-[15px] p-0 compact:left-auto compact:right-[8px] compact:top-auto compact:bottom-[8px] compact:h-[42px] compact:items-start compact:flex-row-reverse compact:gap-[clamp(4px,calc((100vw-352px)/2),8px)] compact:justify-start ${mobileMenuOpen ? 'z-[300]' : 'compact:z-50'}`}>
        <button id="backButton" type="button" className={gameUtilityButton + ' pointer-events-auto desktop:mr-auto ' + 'compact:fixed compact:bottom-[8px]' + ' compact:left-[8px] compact:z-[250] compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Rời phòng" onClick={() => void match.leave()}>
          <GameBackIcon />
        </button>
        <div hidden={!showRoomFeatures || !match.room?.code} role="img" aria-label={`Mã phòng ${match.room?.code ?? ''}`} className="absolute top-0 h-[94px] w-[196px] shrink-0 -translate-y-2 compact:hidden compact:fixed compact:top-[6px] compact:right-[10px] compact:left-auto! compact:h-[71px] compact:w-[148px] compact:translate-y-0" style={{ left: `calc(25% - ${layout.frameWidth / 4}px - 74px)` }}>
          <img src={roomCodeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0" />
          <span aria-hidden="true" className="absolute top-[44%] right-[22%] bottom-[22%] left-[22%] flex items-center justify-center overflow-hidden font-number text-[18px]/[1] compact:text-[16px] font-bold lining-nums tabular-nums tracking-normal text-[#f6d696] [text-shadow:0_1px_2px_#160b04]">{Array.from(match.room?.code ?? '', (digit, index) => <span key={index} className="inline-flex w-[0.7em] shrink-0 justify-center">{digit}</span>)}</span>
        </div>
        {!computerMatch && !positionTrial && !replayMode && <GameEnergyControl variant={game.variant ?? 'xiangqi'} />}
        <button data-ui-selection-sound type="button" className={gameUtilityButton + ' pointer-events-auto desktop:order-2 compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon)'} aria-label="Menu bàn cờ" aria-expanded={mobileMenuOpen} aria-controls="mobile-game-tools" onClick={() => setMobileMenuOpen(open => !open)}><svg viewBox="0 0 32 32" className="size-8" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 8h20M6 16h20M6 24h20" /></svg></button>
        <span inert={entrance.entering} className="contents"><GameTools onMessages={computerMatch ? undefined : () => { setShareRoomId(null); setMobileMenuOpen(false); messagesRef.current?.showModal() }} onShare={!computerMatch && match.online && match.room ? () => { setShareRoomId(match.room!.id); setMobileMenuOpen(false); messagesRef.current?.showModal() } : undefined} onRoomSettings={!computerMatch && moderation.owner ? () => { setMobileMenuOpen(false); moderation.setSettingsOpen(true) } : undefined} showMobileChatSlot={compactViewport && showRoomFeatures} mobileMenuOpen={mobileMenuOpen} showMatchTools={!replayMode && !computerMatch} showSaveMatch={!computerMatch && (!replayMode || !!replayData?.replayRequiresSave)} showSavePosition={!computerMatch && (!replayMode || trial.active || replayData?.replayKind !== 'position')} onSave={replayMode ? saveReplayMatch : saving.save} saveDisabled={replayMode ? !replayData || replayData.replayKind === 'position' : !saving.recording} saved={replayMode ? replaySavedMatch : saving.saved} onFriends={() => friendsRef.current?.showModal()} playing={tools.playing} savePositionDisabled={!canSavePosition} onSavePosition={openPositionSave} onSound={() => void tools.toggleMusic()} onFullscreen={() => void tools.fullscreen()} /></span>
      </header>
      <div className="relative z-10 row-start-2 m-0 flex min-h-0 items-center justify-center gap-3"><div id="turnText" className="sr-only">{game.phase === 'finished' ? 'Ván cờ kết thúc' : `Lượt: ${sideName(game.currentTurn)}`}</div><div id="statusText" data-screenshot-exclude="true" className="fixed left-1/2 top-1/2 z-[500] m-0 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 whitespace-pre-line rounded border border-[#dac086] bg-[#183f35] px-3 py-1.5 text-xs/[1.5] text-[#ffe2a1] empty:hidden" role="status">{screenshotRenderer.notice || tools.notice || match.repetitionAttemptNotice || (replayMode || game.result ? '' : match.status)}</div></div>
      <div className="relative row-start-3 grid min-h-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2 compact:grid-cols-1 compact:grid-rows-[164px_auto_minmax(144px,1fr)] compact:gap-0" ref={layout.arenaRef} style={{ '--board-height': `${layout.frameHeight}px` } as CSSProperties}>
        {replayMode && <div className="pointer-events-auto absolute bottom-[18px] right-[8%] z-[90] hidden desktop:block"><ReplayModeButton active={trial.active} onClick={toggleTrial} /></div>}
        {(replayMode || positionTrial) && compactViewport && <div data-mobile-replay-tools className={`absolute left-1/2 z-[90] flex w-[240px] -translate-x-1/2 scale-[0.74] flex-col items-center gap-[6px] ${hideTrialAiControls ? 'top-[var(--mobile-replay-controls-top,calc(164px_+_var(--board-height)_+_5px))] origin-top' : 'top-[82px] origin-center -translate-y-1/2'}`}>
          {(positionTrial || (replayMode && trial.active)) && <ReplayControls hideAiControls={hideTrialAiControls} playback={playback} trial={trial} mobilePart="tools" onFlipBoard={flipReplayBoard} onCreateRoom={(positionTrial && trial.active) || (replayMode && trial.active) ? openCustomCreate : undefined} hintThinking={hints.thinking} onHint={() => void hints.request()} onNotice={setPositionSaveNotice} />}
          {replayMode && <ReplayModeButton active={trial.active} onClick={toggleTrial} className="compact:hidden" />}
        </div>}
        {compactViewport && !hideTrialAiControls && (replayMode || (positionTrial && trial.active)) && <div data-mobile-replay-navigation className="pointer-events-none absolute inset-x-0 top-[var(--mobile-replay-controls-top,calc(164px_+_var(--board-height)_+_5px))] bottom-0 z-[90] flex min-h-0 items-start justify-center">
          <div className="pointer-events-auto flex w-[220px] origin-top flex-col items-center scale-[0.78]"><ReplayControls hideAiControls={hideTrialAiControls} playback={playback} trial={trial} mobilePart="navigation" onFlipBoard={flipReplayBoard} onCreateRoom={(positionTrial && trial.active) || (replayMode && trial.active) ? openCustomCreate : undefined} hintThinking={hints.thinking} onHint={() => void hints.request()} onNotice={setPositionSaveNotice} />{replayMode && <ReplayModeButton active={trial.active} onClick={toggleTrial} className="mt-[8px]" />}</div>
        </div>}

        <div data-room-content className={`relative h-full min-h-0 self-center pt-[72px] desktop:max-h-(--board-height) compact:absolute compact:left-[2px] compact:top-[8px] compact:w-[calc((100%_-_160px)/2)] compact:z-[80] compact:pointer-events-none compact:h-auto compact:pt-0`}><PlayerCard incrementSeconds={(game.incrementMs ?? 0) / 1000} recordedClock={!compactViewport && replayMode && !trial.active && replayData?.replayKind !== 'position'} mobileHeader={compactViewport} mobileEdge={compactViewport ? undefined : leftMobileEdge} showClock={!replayMode && !positionTrial && !match.computer} fillHeight={leftSide === 'red'} side={leftSide} empty={match.online && !match.room?.players.some(p=>p.side===leftSide)} playerId={match.room?.players.find(p=>p.side===leftSide)?.userId} variant={game.variant} name={playerName(leftSide)} started={game.phase !== 'ready'} active={!replayMode && !positionTrial && game.phase === 'playing' && game.currentTurn === leftSide} timerExpired={timerExpired(leftSide)} ready={isReady(leftSide)} remaining={visibleRemaining[leftSide]} turnElapsed={game.turnElapsed} turnTimeLimitMs={game.turnTimeLimitMs} outcome={anyOnlinePlayerReady ? undefined : outcome(leftSide)} likeVisible={showLikeOnSide(leftSide)} likeMatchId={likeMatchId} likeActorId={likeActorId} likePosition="left" onAvatarClick={() => openPlayerProfile(playerName(leftSide))} onAvatarContextMenu={moderationOnSide(leftSide)} onAvatarHold={canGrantOnSide(leftSide) ? () => openGrantPanel(playerName(leftSide), leftSide) : undefined}>

          {customRoomOwner && !compactViewport && <CustomRoomControls pending={match.pending} disabled={customRoomLocked} firstTurn={customFirstTurn} onFlip={() => void match.command({ type: 'custom-swap-sides' })} onFirstTurn={side => void match.command({ type: 'custom-first-turn', side })} className={`relative z-20 mt-1 mb-5 ${customRoomLocked ? 'pointer-events-none opacity-70' : 'pointer-events-auto'}`} />}
          {!replayMode && !positionTrial && actions}
        </PlayerCard>

          {compactViewport ? showRoomFeatures && showUsers && createPortal(<><button type="button" aria-label="Đóng danh sách người trong phòng" className="fixed inset-0 z-[899] m-0 border-0 bg-transparent p-0" onClick={() => setShowUsers(false)} /><div className="pointer-events-auto fixed top-[155px] left-1/2 -translate-x-1/2 z-[900] h-[min(220px,calc(100dvh-165px))] w-[280px] max-w-[calc(100vw-20px)]"><RoomUsersPanel onStandUp={canStandUp ? match.standUp : undefined} onManage={moderation.owner ? moderation.openTarget : undefined} users={roomUsers} queued={viewerQueueAction?.queued ?? false} queueDisabled={match.pending || (viewerQueueAction?.disabled ?? false)} onToggleQueue={viewerQueueAction?.onToggle} onAvatarClick={openPlayerProfile} /></div></>, document.body) : <div className="pointer-events-auto absolute inset-x-0 top-[459px] bottom-0 z-[400] short-desktop:top-[379px]" hidden={!showRoomFeatures || !showUsers} onClickCapture={event => {
              const viewButton = document.getElementById('viewersButton')
              const bounds = viewButton?.getBoundingClientRect()
              if (!bounds) return
              if (
                event.clientX >= bounds.left &&
                event.clientX <= bounds.right &&
                event.clientY >= bounds.top &&
                event.clientY <= bounds.bottom
              ) {
                event.preventDefault()
                event.stopPropagation()
                setShowUsers(false)
              }
            }}><RoomUsersPanel onManage={moderation.owner ? moderation.openTarget : undefined} users={roomUsers} queued={viewerQueueAction?.queued ?? false} queueDisabled={match.pending || (viewerQueueAction?.disabled ?? false)} onAvatarClick={openPlayerProfile} /></div>}
        </div>
        {compactViewport && replayMode && !trial.active && replayData?.replayKind !== 'position' && <MobileMatchSummary incrementSeconds={(game.incrementMs ?? 0) / 1000} clockOnly leftSide={leftSide} remaining={game.remainingTime} activeSide={game.phase === 'playing' ? game.currentTurn : undefined} showClock />}
        {compactViewport && !positionTrial && !replayMode && <MobileMatchSummary incrementSeconds={(game.incrementMs ?? 0) / 1000} code={match.room?.code} leftSide={leftSide} remaining={visibleRemaining} activeSide={game.phase === 'playing' ? game.currentTurn : undefined} showClock={!replayMode && !positionTrial && !match.computer} showFallbackLabel={match.online}/>}
        {game.variant === 'jieqi' && !entrance.entering && !positionTrial && !replayMode && (
          <CapturedJieqiPieces board={game.board} ownSide={leftSide} captures={game.captures} viewerSide={isRoomViewer ? null : match.online ? match.player?.side ?? null : leftSide} />
        )}
                {customRoomOwner && compactViewport && <div className="compact:row-start-3 compact:justify-self-start compact:self-start compact:pointer-events-auto compact:relative compact:z-[95] compact:pl-[10px] compact:pt-[4px]"><CustomRoomControls pending={match.pending} disabled={customRoomLocked} firstTurn={customFirstTurn} onFlip={() => void match.command({ type: 'custom-swap-sides' })} onFirstTurn={side => void match.command({ type: 'custom-first-turn', side })} /></div>}
                <div className="relative self-start compact:row-start-2"><Board onCheckmateEffectComplete={resultDialog.complete} hintMove={hints.hint} hiddenChess={game.variant === 'jieqi'} checkmateEffect={playCheckmateEffect} checkSide={checkedSide} flipped={(leftSide === 'black') !== (!!((replayMode || positionTrial) && trial.active && replayFlipped))} board={game.board} selected={trial.active ? trial.selected : match.selected} legalMoves={trial.active ? trial.moves : match.legalMoves} forbiddenMoves={match.forbiddenMoves} animation={trial.active ? trial.animation : match.animation} lastMove={game.lastMove} suppressLastMoveMarkers={match.online && match.pending} frameWidth={layout.frameWidth} scale={layout.scale}
          disabled={trial.active ? entrance.entering || !!trial.animation || game.phase !== 'playing' : isRoomViewer || match.computer && game.currentTurn !== match.humanSide || entrance.entering || intro.visible || game.phase !== 'playing' || !!match.animation || match.pending || match.online && match.player?.side !== game.currentTurn}
          showStart={!isRoomViewer && !hidePostMatchReady && ((!match.online || (match.room?.players.length ?? 0) === 2) && ((isRoomViewer && readyAudioValue !== null && !replayMode && !positionTrial) || demoReadyCountdown !== null || !isRoomViewer && !(match.online && match.player?.ready) && (game.phase === 'ready' && !(match.computer && match.computerEngine !== 'basic') || game.phase === 'finished' && resultReady)))} startDisabled={isRoomViewer || entrance.entering || match.pending || match.online && !!match.player?.ready} startLabel={startLabel} readyCountdown={match.online ? (isRoomViewer ? readyCountdownForViewer(match.room) : readyCountdownForPlayer(match.room, match.player?.id)) : demoReadyCountdown} onSelect={trial.active ? trial.select : match.select} onStart={positionTrial && trial.active ? trial.reset : match.start} /></div>
        <div data-room-content className={`relative flex h-full min-h-0 min-w-0 flex-col gap-[15px] self-center pt-[72px] desktop:max-h-(--board-height) compact:absolute compact:right-[2px] compact:top-[8px] compact:w-[calc((100%_-_160px)/2)] compact:pointer-events-none compact:h-auto compact:pt-0 ${mobileChatOpen ? 'compact:z-[500]' : rightMobileEdge === 'top' ? 'compact:z-[80]' : 'compact:z-[100]'}`}>
          <PlayerCard incrementSeconds={(game.incrementMs ?? 0) / 1000} recordedClock={!compactViewport && replayMode && !trial.active && replayData?.replayKind !== 'position'} mobileHeader={compactViewport} mobileEdge={compactViewport ? undefined : rightMobileEdge} showClock={!replayMode && !positionTrial && !match.computer} fillHeight={false} side={rightSide} empty={match.online && !match.room?.players.some(p=>p.side===rightSide)} playerId={match.room?.players.find(p=>p.side===rightSide)?.userId} variant={game.variant} name={playerName(rightSide)} started={game.phase !== 'ready'} active={!replayMode && !positionTrial && game.phase === 'playing' && game.currentTurn === rightSide} timerExpired={timerExpired(rightSide)} ready={isReady(rightSide)} remaining={visibleRemaining[rightSide]} turnElapsed={game.turnElapsed} turnTimeLimitMs={game.turnTimeLimitMs} outcome={anyOnlinePlayerReady ? undefined : outcome(rightSide)} likeVisible={showLikeOnSide(rightSide)} likeMatchId={likeMatchId} likeActorId={likeActorId} likePosition="right" onAvatarClick={() => openPlayerProfile(playerName(rightSide))} onAvatarContextMenu={moderationOnSide(rightSide)} onAvatarHold={canGrantOnSide(rightSide) ? () => openGrantPanel(playerName(rightSide), rightSide) : undefined}>{positionTrial && !compactViewport && <ReplayControls hideAiControls={hideTrialAiControls} playback={playback} trial={trial} onFlipBoard={flipReplayBoard} onCreateRoom={(positionTrial && trial.active) || replayMode ? openCustomCreate : undefined} hintThinking={hints.thinking} onHint={() => void hints.request()} onNotice={setPositionSaveNotice} />}{replayMode && !compactViewport && (trial.active || replayData?.replayKind !== 'position') && <ReplayControls hideAiControls={hideTrialAiControls} playback={playback} trial={trial} onFlipBoard={flipReplayBoard} onCreateRoom={openCustomCreate} hintThinking={hints.thinking} onHint={() => void hints.request()} onNotice={setPositionSaveNotice} />}</PlayerCard>
          {!compactViewport && showRoomFeatures && <div id="mobile-room-chat" className="contents"><Chat chat={chat} onAvatarClick={openPlayerProfile} /></div>}
        </div>
      </div>
      {positionSaveNotice && <div role="status" data-screenshot-exclude="true" className="fixed left-1/2 top-1/2 z-[500] max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded border border-[#dac086] bg-[#183f35] px-4 py-2 text-center text-sm text-[#ffe2a1]">{positionSaveNotice}</div>}
      <footer hidden={!showRoomFeatures} inert={entrance.entering} data-room-content className="pointer-events-none absolute bottom-6 left-6 z-[300] flex min-w-0 items-center gap-3 text-xs/[1.5] compact:top-auto compact:right-auto compact:bottom-[164px] compact:left-[10px] compact:z-[90] compact:flex-wrap compact:justify-start compact:flex">
        <button data-ui-selection-sound id="viewersButton" className={`${buttonInteraction} pointer-events-auto inline-flex compact:fixed compact:top-[var(--mobile-view-elo-top,169px)] compact:bottom-auto compact:right-auto compact:left-1/2 compact:-translate-x-1/2 compact:z-[250] compact:h-[26px] compact:min-w-[48px] compact:gap-1 compact:px-1 compact:py-0 h-8 min-w-[62px] items-center justify-center gap-1.5 rounded-[3px] border border-[#d5b579] bg-[linear-gradient(#766448,#3a3022)] px-1.5 py-1 text-[#ffe2a1] shadow-[inset_0_0_0_1px_#ac8a55,inset_0_2px_3px_#e4cb9655,0_2px_3px_#0009]`} aria-label="Người trong phòng" aria-expanded={showUsers} aria-controls="roomUsers" onClick={() => { setShowUsers(open => !open); setMobileChatOpen(false); setMobileMenuOpen(false) }}>
          <svg viewBox="0 0 40 30" className="h-6 w-8 shrink-0 compact:h-[21px] compact:w-7 [filter:drop-shadow(0_2px_1px_#21190e)]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 15C7 8 13 5 20 5s13 3 18 10c-5 7-11 10-18 10S7 22 2 15Z" />
            <path d="M7 6 3 10M33 6l4 4M8 24l4 3m20-3-4 3" stroke="#ba8e50" strokeWidth="2" />
            <ellipse cx="20" cy="15" rx="7" ry="9" />
            <ellipse cx="20" cy="15" rx="2.5" ry="5" fill="currentColor" stroke="none" />
          </svg>
          <span className="font-number text-base/none compact:text-[13px] font-bold tabular-nums [text-shadow:0_1px_2px_#21190e]">{roomOccupantCount}</span>
        </button>
        {canStandUp && <span className="desktop:contents compact:hidden"><RoomStandUpButton disabled={match.pending} onStandUp={match.standUp}/></span>}
        {viewerQueueAction && <span className="desktop:contents compact:hidden"><RoomQueueButton queued={viewerQueueAction.queued} disabled={viewerQueueAction.disabled} onToggleQueue={viewerQueueAction.onToggle} /></span>}
      </footer>
    </div>
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 z-10 compact:hidden font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
      <span aria-hidden="true" className="pointer-events-none absolute right-0 -bottom-1 z-10 compact:hidden -scale-x-100 font-georgia text-[38px] leading-none text-[#c3953e] [text-shadow:1px_1px_#513515,-1px_-1px_#ffe5a0]">❧</span>
    {mobileActions}
    </main>
    </div>


    <RoomModerationDialogs control={moderation} room={match.room} />
    {match.repetitionNotice && <div data-screenshot-exclude="true" data-testid="repetition-notice-card" className="fixed inset-0 z-[1000] grid place-items-center">
      {(!match.online || !!match.player) && <button type="button" aria-label="Đóng thông báo lặp nước" onClick={match.dismissRepetitionNotice} className="absolute inset-0 m-0 border-0 bg-transparent p-0" />}
      <div role="status" className="pointer-events-auto relative z-10 m-0 grid aspect-[1340/290] w-[min(760px,94vw)] place-items-center border-0 bg-transparent p-0">
        <img src={honorNoticeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0 object-contain" />
        <p className="relative m-0 px-[12%] text-center font-cormorant text-[clamp(23px,3.5vw,31px)] font-bold leading-tight text-[#f3dda9]">{match.repetitionNotice}</p>
      </div>
    </div>}
    <RoomOfferDialog online={match.online} playerSide={match.player?.side} drawOffer={match.room?.drawOffer} takebackOffer={match.room?.takebackOffer} pending={match.pending} replyDraw={match.replyDraw} replyTakeback={match.replyTakeback} />
    <LobbyDialog lobby={lobby} />
    <FriendsDialog layout={friendsLayout} dialogRef={friendsRef} onClose={() => friendsRef.current?.close()} onOpenProfile={openPlayerProfile} onOpenMessages={(targetName, image, status) => { setMessageRequest({ id: ++messageRequestId.current, name: targetName, image, status }); if (!messagesRef.current?.open) messagesRef.current?.showModal() }} />
    <MessagesDialog shareRoomId={shareRoomId} layout={messagesLayout} dialogRef={messagesRef} openRequest={messageRequest} onViewInfo={openPlayerProfile} onClose={() => messagesRef.current?.close()} />
    <ProfileDialog layout={profileLayout} dialogRef={profileDialogRef} name={profileName} playerId={match.room?.players.find(member => member.name === profileName)?.id ?? match.room?.viewers?.find(member => member.name === profileName)?.id} challengeTargetId={match.room?.players.find(member => member.name === profileName)?.id ?? match.room?.viewers?.find(member => member.name === profileName)?.id} isOwnProfile={profileName === name} onOpenMessages={(targetName, playerId) => {
      setMessageRequest({ id: ++messageRequestId.current, name: targetName, playerId })
      if (!messagesRef.current?.open) messagesRef.current?.showModal()
    }} onClose={() => profileDialogRef.current?.close()} primaryActionLabel="Kết bạn" onPrimaryAction={() => {
      profileDialogRef.current?.close()
      setProfileNotice('Tính năng kết bạn sắp ra mắt.')
    }} />
    {grantTargetName && grantTargetSide && canGrantOnSide(grantTargetSide) && <AwardedHonorGrantPanel onSettings={compactViewport && grantTargetSide && moderationOnSide(grantTargetSide) ? () => {
      const openSettings = moderationOnSide(grantTargetSide)
      setGrantTargetName(null)
      openSettings?.()
    } : undefined} targetName={grantTargetName} anchor={grantAnchor} grantedHonorIds={getGrantedHonorIds(grantTargetName)} onGrant={async honor => {
      if (!canGrantOnSide(grantTargetSide)) return
      try {
        const granting = await toggleGrant(grantTargetName, honor.id)
        setGrantToast({ id: ++grantToastId.current, message: granting ? 'Đã phong danh hiệu' : 'Bạn đã bỏ phong danh hiệu', phase: 'visible' })
      } catch {
        setGrantToast({ id: ++grantToastId.current, message: 'Không thể lưu trạng thái phong danh hiệu. Vui lòng thử lại.', phase: 'visible' })
      }
    }} onClose={() => setGrantTargetName(null)} />}
    {grantToast && <div key={grantToast.id} className="pointer-events-none fixed top-1/2 left-1/2 z-[1100] -translate-x-1/2 -translate-y-1/2"><div role="status" onAnimationEnd={() => setGrantToast(current => current?.id === grantToast.id ? null : current)} className={`relative m-0 grid aspect-[1340/290] w-[min(420px,90vw)] place-items-center border-0 bg-transparent p-0 ${grantToast.phase === 'exiting' ? 'friend-request-sent-exit' : ''}`}><img src={honorNoticeFrame} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 m-0 block size-full border-0 p-0 object-contain" /><p className="relative m-0 px-[15%] text-center font-cormorant text-[clamp(18px,4.5vw,24px)] font-bold leading-tight text-[#f3dda9]">{grantToast.message}</p></div></div>}
    <dialog ref={profileNoticeRef} aria-label="Thông báo" className={`${oneChoiceNoticeDialog} backdrop:bg-black/60 backdrop:backdrop-blur-sm`} onCancel={() => setProfileNotice('')}>
      <p className="leading-relaxed">{profileNotice}</p>
      <button autoFocus className={oneChoiceNoticeButton} onClick={() => setProfileNotice('')}>Đã hiểu</button>
    </dialog>
    {match.leaveConfirmationOpen && <LeaveRoomDialog onCancel={match.cancelLeave} onConfirm={() => void match.confirmLeave()} />}
    {match.resignConfirmationOpen && <ResignDialog onCancel={match.cancelResign} onConfirm={match.confirmResign} />}
    {match.standUpConfirmationOpen && <ResignDialog standUp onCancel={match.cancelStandUp} onConfirm={match.confirmStandUp} />}
    {displayedResultOutcome && <MatchResultDialog winner={!match.online && (match.computer || positionTrial) ? game.result?.winner ?? undefined : undefined} outcome={displayedResultOutcome} rewardGold={testBotId ? testBotGold : onlineReward?.gold} eloDelta={testBotId ? 0 : onlineReward?.eloDelta} variant={game.variant} onClose={() => { resultDialog.dismiss(); resetResultClocks() }} />}
    {match.computerState.error && game.phase === 'playing' && <button className={`${lobbyButton} fixed bottom-5 left-1/2 z-40 -translate-x-1/2`} onClick={match.computerState.retry}>Thử lại lượt máy</button>}
    {customCreateOpen && useSessionStore.getState().customRoomReturnFen && createPortal(
      <div role="dialog" aria-modal="true" aria-label="Tạo phòng riêng từ thế cờ" className="fixed inset-0 z-[1300] grid place-items-center bg-black/65 p-5 compact:p-2">
        <CreateRoomForm lobby={lobby} sourceFen={useSessionStore.getState().customRoomReturnFen ?? undefined} province="" onCancel={() => { if (!lobby.pending) { setCustomCreateOpen(false); useSessionStore.setState({ customRoomReturnFen: null, customReplayReturn: null }) } }} />
      </div>,
      document.body,
    )}
    {entrance.entering && OPENING_MODE === 'cover-transform' && <OpeningCover onComplete={entrance.finishEntrance} waitForPieceImages={compactViewport && game.variant !== 'jieqi'} />}
  </div>
}



