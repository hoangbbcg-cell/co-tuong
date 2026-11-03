import { eligibleOnlineExitAdId, recordOnlineAdMatch, queueAccumulatedOnlineAdOffer, updateOnlineAdMatchIdentity, type OnlineAdMatchIdentity } from '../../ads/onlineAdOffer'
import { isEnergyError } from '../../../lib/energy'
import { showRoomNotice } from '../../../lib/roomNotice'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useGameStore } from '../../../store/gameStore'
import { useShallow } from 'zustand/react/shallow'
import { useSessionStore } from '../../../store/sessionStore'
import { getMoveHints, REPETITION_WARNING_MESSAGE } from '../../../game/rules/repetition'
import { gameStatus, sideName } from '../../../game/state/selectors'
import { opposite, TURN_TIME_LIMIT_MS } from '../../../game/state/initial'
import { roomSocket, socket } from '../../../services/socket'
import { errorMessage } from '../../../services/api'
import type { Position, Move, GameState } from '../../../types/game'
import type { RoomCommand } from '../../../types/room'
import { useComputer } from './useComputer'
import { useTestBot } from './useTestBot'
import { hasReadyPlayerBetweenMatches } from '../../../lib/roomReadiness'
import { useMoveSound } from './useMoveSound'
import { shouldPlayClockTick } from '../audio/clockTickPolicy'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'
import { useOnlineMoveAnimation } from './useOnlineMoveAnimation'

export function useGame(replay?: { game: GameState; moveCount: number; animation: Move | null; moveOnlySound?: boolean; silentTransitionKey?: string; leave: () => void }) {
  const computerState = useComputer(!replay)
  const localGame = useGameStore(state => state.game)
  const localSelected = useGameStore(state => state.selected)
  const localAnimation = useGameStore(state => state.animation)
  const localAnimationVersion = useGameStore(state => state.animationVersion)
  const localHistory = useGameStore(state => state.history)
  const localInitialFen = useGameStore(state => state.initialFen)
  const localTakebacksRemaining = useGameStore(state => state.takebacksRemaining)
  const localTakebackDeclineVersion = useGameStore(state => state.takebackDeclineVersion)
  const localActions = useRef({
    start: useGameStore.getState().start,
    reset: useGameStore.getState().reset,
    tick: useGameStore.getState().tick,
    freezeClock: useGameStore.getState().freezeClock,
    select: useGameStore.getState().select,
    completeAnimation: useGameStore.getState().completeAnimation,
    takeback: useGameStore.getState().takeback,
    declineTakeback: useGameStore.getState().declineTakeback,
    finish: useGameStore.getState().finish,
    loadPosition: useGameStore.getState().loadPosition,
  }).current
  const local = {
    ...localActions,
    game: localGame,
    selected: localSelected,
    animation: localAnimation,
    animationVersion: localAnimationVersion,
    history: localHistory,
    initialFen: localInitialFen,
    takebacksRemaining: localTakebacksRemaining,
    takebackDeclineVersion: localTakebackDeclineVersion,
  }
  const session = useSessionStore(useShallow(state => ({
    append: state.append,
    computerDemo: state.computerDemo,
    computerEngine: state.computerEngine,
    humanSide: state.humanSide,
    leave: state.leave,
    lobbyOpen: state.lobbyOpen,
    mode: state.mode,
    name: state.name,
    notice: state.notice,
    receiveRoom: state.receiveRoom,
    room: state.room,
    setNotice: state.setNotice,
    testBotId: state.testBotId,
  })))
  const testBot = useTestBot()
  const [onlineSelected, setOnlineSelected] = useState<Position | null>(null)
  const [pending, setPending] = useState(false)
  const [leaveConfirmationOpen, setLeaveConfirmationOpen] = useState(false)
  const [resignConfirmationOpen, setResignConfirmationOpen] = useState(false)
  const [repetitionNotice, setRepetitionNotice] = useState<{ message: string } | null>(null)
  const [repetitionAttemptNotice, setRepetitionAttemptNotice] = useState('')
  const warnedMove = useRef<string | null>(null)
  const seenRepetitionAttempt = useRef<string | null>(null)
  const repetitionPauseRequested = useRef(false)
  const repetitionPauseSeen = useRef(false)
  const online = !replay && session.mode === 'online' && !!session.room
  const onlineSessionKey = online ? JSON.stringify([session.room!.id, ...session.room!.players.map(player => player.id).sort()]) : undefined
  const computer = !replay && session.mode === 'computer'
  const game = replay?.game ?? (online ? session.room!.game : local.game)
  const moveCount = replay?.moveCount ?? (online ? session.room?.moveCount ?? 0 : local.history.length)
  const timeToTimeout = Math.min(game.remainingTime[game.currentTurn], (game.turnTimeLimitMs ?? TURN_TIME_LIMIT_MS) - game.turnElapsed)
  const clockWarningKey = !replay && !repetitionNotice && game.phase === 'playing' && timeToTimeout > 0 && timeToTimeout <= 10_000 ? `${game.currentTurn}:${moveCount}` : null
  const clockTickRunning = !replay && shouldPlayClockTick(
    game,
    online
      ? Boolean(session.room?.repetitionNoticePaused)
      : Boolean(repetitionNotice),
  )
  const soundResult = session.testBotId && game.result?.winner ? { ...game.result, reason: 'checkmate' as const } : game.result
  const { playMatchIntro, checkmateAudioComplete } = useMoveSound(game.lastMove, game.board, moveCount, replay ? 'finished' : game.phase, soundResult, clockWarningKey, !!replay, replay?.silentTransitionKey ?? (online ? JSON.stringify([session.room!.id, hasReadyPlayerBetweenMatches(session.room)]) : undefined), !computer || session.computerEngine === 'basic', clockTickRunning, online)
  const player = session.room?.players.find(player => player.id === socket.id)

  const onlineAdIdentityRef = useRef<OnlineAdMatchIdentity | null>(null)

  // Count a real online match once, including a match without server ID.
  useEffect(() => {
    const activePlayer = online && Boolean(player) && !replay
    const roomId = activePlayer ? session.room?.id ?? null : null

    onlineAdIdentityRef.current = updateOnlineAdMatchIdentity(
      onlineAdIdentityRef.current,
      roomId,
      game.phase,
      game.phase === 'playing'
        ? session.room?.activeMatchId
        : session.room?.lastCompletedMatch?.id,
      () => `local-ad-${roomId}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    )

    const identity = onlineAdIdentityRef.current

    if (activePlayer && identity && game.phase === 'playing') {
      recordOnlineAdMatch(identity.matchId)
    }
  }, [
    online,
    player?.id,
    replay,
    game.phase,
    session.room?.id,
    session.room?.activeMatchId,
    session.room?.lastCompletedMatch?.id,
  ])

  const viewer = session.room?.viewers?.find(viewer => viewer.id === socket.id)
  const selected = replay ? null : online ? onlineSelected : local.selected
  const moveHints = useMemo(() => selected ? getMoveHints(game, selected) : [], [selected, game.board, game.currentTurn, game.repetition])
  const legalMoves = useMemo(() => moveHints.filter(hint => hint.type === 'legal'), [moveHints])
  const forbiddenMoves = useMemo(() => moveHints.filter(hint => hint.type === 'repetition-forbidden'), [moveHints])
  const onlineAnimation = useOnlineMoveAnimation(onlineSessionKey ?? null, game, moveCount)
  useLayoutEffect(() => {
    setOnlineSelected(null)
    setPending(false)
    setLeaveConfirmationOpen(false)
    setResignConfirmationOpen(false)
    setRepetitionNotice(null)
    setRepetitionAttemptNotice('')
    warnedMove.current = null
    seenRepetitionAttempt.current = null
    repetitionPauseRequested.current = false
    repetitionPauseSeen.current = false
  }, [onlineSessionKey])
  const animation: Move | null = replay ? replay.animation : online ? onlineAnimation : local.animation
  useEffect(() => {
    if (replay) return
    const token = `${moveCount}:${game.repetition?.warningSide ?? ''}`
    if (game.repetition?.warning && !animation && warnedMove.current !== token) {
      warnedMove.current = token
      setRepetitionNotice({ message: REPETITION_WARNING_MESSAGE })
    }
  }, [!!replay, game.repetition?.warning, game.repetition?.warningSide, moveCount, animation])
  useEffect(() => {
    const notice = online && player && session.room?.repetitionAttemptNotice
    if (!notice || notice.recipient !== player.side || notice.id === seenRepetitionAttempt.current) return
    seenRepetitionAttempt.current = notice.id
    setRepetitionAttemptNotice(notice.message)
    const timer = window.setTimeout(() => setRepetitionAttemptNotice(''), 2000)
    return () => clearTimeout(timer)
  }, [online, player?.side, session.room?.repetitionAttemptNotice?.id])
  useEffect(() => {
    setRepetitionNotice(null)
    warnedMove.current = null
  }, [online, session.room?.id, game.phase === 'ready'])
  useEffect(() => {
    if (replay || online || session.lobbyOpen) return
    const timer = window.setInterval(() => useGameStore.getState().tick(performance.now()), 100)
    return () => clearInterval(timer)
  }, [!!replay, online, session.lobbyOpen])
  useEffect(() => {
    if (replay || !local.animation || online) return
    const timer = window.setTimeout(() => local.completeAnimation(local.animationVersion, performance.now()), PIECE_MOVE_DURATION_MS)
    return () => clearTimeout(timer)
  }, [!!replay, local.animation, local.animationVersion, local.completeAnimation, online])
  useEffect(() => { setOnlineSelected(null) }, [game.currentTurn, game.phase, session.room?.id, online])
  const command = useCallback(async (value: RoomCommand) => {
    if (replay || pending) return
    setPending(true)
    try {
      session.receiveRoom(await roomSocket.command(value))
      session.setNotice('')
    }
    catch (error) {
      const message = errorMessage(error)
      if (isEnergyError(message)) useSessionStore.getState().showEnergyNotice()
      else if (message === 'Đã chặn vào hàng') showRoomNotice(message)
      else session.setNotice(message)
    }
    finally { setPending(false) }
  }, [!!replay, pending, session.receiveRoom, session.setNotice])
  const setOnlineRepetitionPause = useCallback(async () => {
    if (replay) return
    try {
      session.receiveRoom(await roomSocket.command({ type: 'repetition-notice', action: 'close' }))
    }
    catch { /* Server's two-second failsafe still resumes the clock if the connection drops. */ }
  }, [session.receiveRoom])
  useEffect(() => {
    if (replay) return
    if (!repetitionNotice) {
      if (!repetitionPauseRequested.current) return
      repetitionPauseRequested.current = false
      if (online) void setOnlineRepetitionPause()
      else local.freezeClock(performance.now())
      return
    }
    if (repetitionPauseRequested.current) return
    repetitionPauseRequested.current = true
    if (!online) {
      local.freezeClock(Number.MAX_SAFE_INTEGER)
    }
  }, [!!replay, repetitionNotice, online, setOnlineRepetitionPause, local.freezeClock])
  useEffect(() => {
    if (!online) { repetitionPauseSeen.current = false; return }
    if (session.room?.repetitionNoticePaused) {
      repetitionPauseSeen.current = true
      const message = session.room.repetitionNoticeKind === 'warning' ? REPETITION_WARNING_MESSAGE : null
      if (message) setRepetitionNotice(current => current?.message === message ? current : { message })
    }
    else if (repetitionPauseSeen.current && repetitionPauseRequested.current) {
      repetitionPauseSeen.current = false
      repetitionPauseRequested.current = false
      setRepetitionNotice(null)
    }
  }, [online, session.room?.repetitionNoticePaused, session.room?.repetitionNoticeKind])
  const [standUpConfirmationOpen, setStandUpConfirmationOpen] = useState(false)
  useEffect(() => { setStandUpConfirmationOpen(false) }, [game.phase, session.room?.id, player?.id, session.room?.players.length])
  const confirmStandUp = () => {
    setStandUpConfirmationOpen(false)
    if (!replay && online && player && session.room?.players.length === 2) void command({ type: 'stand-up' })
  }
  const standUp = () => {
    if (replay || !online || !player || session.room?.players.length !== 2) return
    if (game.phase === 'playing') setStandUpConfirmationOpen(true)
    else confirmStandUp()
  }
  const toggleQueue = useCallback((queued: boolean) => {
    if (replay) return
    if (queued) useSessionStore.getState().recoverEnergy()
    if (queued && !useSessionStore.getState().account?.energyUnlimited && useSessionStore.getState().energy < 1) {
      useSessionStore.getState().showEnergyNotice()
      return
    }
    void command({ type: queued ? 'join-queue' : 'leave-queue' })
  }, [!!replay, command])
  const select = useCallback((point: Position) => {
    if (replay) return
    if (session.lobbyOpen) return
    if (session.computerDemo || computer && game.currentTurn !== session.humanSide) return
    if (forbiddenMoves.some(hint => hint.row === point.row && hint.col === point.col)) {
      if (online && selected) void command({ type: 'repetition-attempt', move: { from: selected, to: point } })
      return
    }
    if (!online) {
      if (session.testBotId) { void testBot.select(point); return }
      local.select(point, performance.now(), !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return
    }
    if (pending || !player || game.phase !== 'playing' || game.currentTurn !== player.side) return
    if (game.board[point.row][point.col]?.side === player.side) { setOnlineSelected(point); return }
    if (onlineSelected && legalMoves.some(hint => hint.row === point.row && hint.col === point.col)) {
      void command({ type: 'move', move: { from: onlineSelected, to: point } })
    }
    setOnlineSelected(null)
  }, [!!replay, session.testBotId, testBot.select, session.computerDemo, session.lobbyOpen, computer, game.currentTurn, session.humanSide, online, local.select, pending, player, game.phase, game.board, onlineSelected, command, legalMoves, forbiddenMoves])
  const dismissRepetitionNotice = () => {
    if (replay) return
    if (online && !player) return
    if (!online && repetitionNotice?.message === REPETITION_WARNING_MESSAGE) {
      useGameStore.setState(state => state.game.repetition
        ? { game: { ...state.game, repetition: { ...state.game.repetition, warning: false, warningSide: null } } }
        : state)
    }
    setRepetitionNotice(null)
  }
  const draw = () => {
    if (replay) return
    if (online) { void command({ type: 'offer-draw' }); return }
    local.tick(performance.now())
    if (useGameStore.getState().game.phase !== 'playing') return
    const accepted = computer || window.confirm(`${sideName(opposite(game.currentTurn))} có đồng ý lời cầu hòa không?`)
    if (accepted) local.finish(true, performance.now())
    else session.append(`${sideName(opposite(game.currentTurn))} từ chối cầu hòa.`, true)
  }
  const resign = () => {
    if (replay || game.phase !== 'playing' || pending || online && !player) return
    setResignConfirmationOpen(true)
  }
  const confirmResign = () => {
    if (!resignConfirmationOpen || replay || game.phase !== 'playing' || pending || online && !player) return
    setResignConfirmationOpen(false)
    if (online) void command({ type: 'resign' })
    else {
      local.tick(performance.now())
      if (useGameStore.getState().game.phase === 'playing') local.finish(false, performance.now(), computer ? session.humanSide : undefined)
    }
  }
  useEffect(() => { if (game.phase !== 'playing') setResignConfirmationOpen(false) }, [game.phase])
  const leaveImmediately = async () => {
    if (replay) { replay.leave(); return }
    // An active online match also qualifies when its player exits.
    const eligibleAdId = eligibleOnlineExitAdId(
      online,
      Boolean(player),
      game.phase,
      onlineAdIdentityRef.current?.matchId,
      onlineAdIdentityRef.current?.matchId,
    )
    if (online) {
      try { await roomSocket.leave() } catch { /* Disconnect still releases the server seat. */ }
    } else session.append(`${session.name} đã rời phòng.`, true)
    if (eligibleAdId) queueAccumulatedOnlineAdOffer(eligibleAdId)
    local.reset(performance.now())
    session.leave()
  }
  const leave = async () => {
    if (!replay && game.phase === 'playing' && (!online || player)) {
      setLeaveConfirmationOpen(true)
      return
    }
    await leaveImmediately()
  }
  const confirmLeave = async () => { setLeaveConfirmationOpen(false); await leaveImmediately() }
  useEffect(() => { if (game.phase !== 'playing') setLeaveConfirmationOpen(false) }, [game.phase])
  const phase = game.phase
  const variant = game.variant
  // Play intro only after the server-confirmed phase transition.
  const previousOnlinePhase = useRef(game.phase)
  useEffect(() => {
    const previous = previousOnlinePhase.current
    previousOnlinePhase.current = game.phase
    if (online && !replay && previous === 'ready' && game.phase === 'playing') {
      playMatchIntro(true)
    }
  }, [online, replay, game.phase, playMatchIntro])
  const start = useCallback(() => {
    if (replay) return
    if (session.testBotId) { void testBot.start(game.variant ?? 'xiangqi'); return }
    if (online) {
      useSessionStore.getState().recoverEnergy()
      if (!session.room?.friendEnergyExemptPair?.includes(socket.id ?? '') && !useSessionStore.getState().account?.energyUnlimited && useSessionStore.getState().energy < 1) {
        useSessionStore.getState().showEnergyNotice()
        return
      }
      void command({ type: 'ready' })
      return
    }
    const testComputerEnergy = computer && session.computerEngine === 'basic'
    if (testComputerEnergy) {
      useSessionStore.getState().recoverEnergy()
      if (!useSessionStore.getState().account?.energyUnlimited && useSessionStore.getState().energy < 1) {
        useSessionStore.getState().showEnergyNotice()
        return
      }
    }
    if (phase === 'ready' || phase === 'finished') playMatchIntro(true)
    if (phase === 'finished') {
      if (computer && local.initialFen) local.loadPosition(local.initialFen)
      else local.reset(performance.now(), variant)
    }
    if (computer && session.computerEngine === 'basic') useSessionStore.setState({ humanSide: 'black' })
    local.start(performance.now())
    if (testComputerEnergy && (phase === 'ready' || phase === 'finished')) useSessionStore.getState().consumeEnergy()
  }, [!!replay, session.testBotId, testBot.start, online, session.room, player, game.phase, playMatchIntro, command, phase, variant, computer, session.computerEngine, local.reset, local.start, local.initialFen, local.loadPosition])
  useEffect(() => {
    if (computer && session.computerEngine !== 'basic' && phase === 'ready') start()
  }, [computer, session.computerEngine, phase, start])
  const requestedTakebackPlies: 1 | 2 = game.currentTurn === (online ? player?.side : session.humanSide) ? 2 : 1
  const takebackPlies: 1 | 2 = requestedTakebackPlies === 2 && moveCount === 1 ? 1 : requestedTakebackPlies
  const computerHasMoved = computer && local.history.some(snapshot => snapshot.currentTurn === session.humanSide)
  const onlineHasMoved = !online || !!player && !session.room?.takebackBlocked?.[player.side] && (moveCount >= 2 || moveCount === 1 && game.currentTurn !== player.side)
  const canTakeback = !replay && game.phase === 'playing' && moveCount >= 1 && onlineHasMoved && (!computer || computerHasMoved)
  const takebacksLeft = online ? player ? session.room?.takebackRemaining?.[player.side] ?? 2 : 0 : computer ? local.takebacksRemaining : 0
  return {
    game, moveCount, online, computer, humanSide: session.humanSide, computerEngine: session.computerEngine, computerState, room: replay ? null : session.room, player: replay ? undefined : player, viewer: replay ? undefined : viewer, toggleQueue, standUp, standUpConfirmationOpen, confirmStandUp, cancelStandUp: () => setStandUpConfirmationOpen(false), selected, legalMoves, forbiddenMoves, repetitionNotice: replay ? '' : repetitionNotice?.message ?? '', repetitionAttemptNotice, dismissRepetitionNotice,
    animation, select, checkmateAudioComplete,
    animationVersion: local.animationVersion, canTakeback, takebacksLeft, takebackDeclineVersion: local.takebackDeclineVersion,
    status: testBot.error || computerState.error || session.notice || (testBot.pending ? 'Máy giả đang xử lý…' : session.testBotId && game.phase === 'playing' ? 'Máy giả: đi 2 nước hợp lệ để thử bảng thất bại.' : computerState.thinking ? '' : game.phase === 'playing' ? '' : gameStatus(game)), pending: pending || testBot.pending,
    start,
    reset: () => replay ? undefined : session.testBotId ? void testBot.start(game.variant ?? 'xiangqi') : online ? void command({ type: 'reset' }) : local.reset(performance.now(), game.variant),
    requestTakeback: () => {
      if (online && canTakeback) void command({ type: 'request-takeback' })
      else if (computer && canTakeback && local.takebacksRemaining > 0) local.declineTakeback()
    },
    replyTakeback: (accepted: boolean) => {
      if (online) void command({ type: 'reply-takeback', accepted })
    },
    draw, resign, leave, leaveConfirmationOpen, confirmLeave, cancelLeave: () => setLeaveConfirmationOpen(false),
    resignConfirmationOpen, confirmResign, cancelResign: () => setResignConfirmationOpen(false),
    replyDraw: (accepted: boolean) => void command({ type: 'reply-draw', accepted }),
  }
}
