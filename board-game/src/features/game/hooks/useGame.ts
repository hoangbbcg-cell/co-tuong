import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGameStore } from '../../../store/gameStore'
import { useSessionStore } from '../../../store/sessionStore'
import { getLegalMoves, isMoveLegal } from '../../../game/rules'
import { gameStatus, sideName } from '../../../game/state/selectors'
import { opposite } from '../../../game/state/initial'
import { roomSocket, socket } from '../../../services/socket'
import { errorMessage } from '../../../services/api'
import type { Position, Move } from '../../../types/game'
import type { RoomCommand } from '../../../types/room'
import { useComputer } from './useComputer'
import { useMoveSound } from './useMoveSound'
import { PIECE_MOVE_DURATION_MS } from '../moveAnimation'

export function useGame() {
  const computerState = useComputer()
  const local = useGameStore()
  const session = useSessionStore()
  const [onlineSelected, setOnlineSelected] = useState<Position | null>(null)
  const [pending, setPending] = useState(false)
  const online = session.mode === 'online' && !!session.room
  const computer = session.mode === 'computer'
  const game = online ? session.room!.game : local.game
  const moveCount = online ? session.room?.moveCount ?? 0 : local.history.length
  const { playMatchIntro, playCheckmateSound } = useMoveSound(game.lastMove, game.board, moveCount, game.phase, game.result)
  const player = session.room?.players.find(player => player.id === socket.id)
  const viewer = session.room?.viewers?.find(viewer => viewer.id === socket.id)
  const selected = online ? onlineSelected : local.selected
  const legalMoves = useMemo(() => selected ? getLegalMoves(selected.row, selected.col, game.board) : [], [selected, game.board])
  useEffect(() => {
    if (online || session.lobbyOpen) return
    const timer = window.setInterval(() => useGameStore.getState().tick(performance.now()), 100)
    return () => clearInterval(timer)
  }, [online, session.lobbyOpen])
  useEffect(() => {
    if (!local.animation || online) return
    const timer = window.setTimeout(() => local.completeAnimation(local.animationVersion, performance.now()), PIECE_MOVE_DURATION_MS)
    return () => clearTimeout(timer)
  }, [local.animation, local.animationVersion, local.completeAnimation, online])
  useEffect(() => { setOnlineSelected(null) }, [game.currentTurn, game.phase, session.room?.id, online])
  const command = useCallback(async (value: RoomCommand) => {
    if (pending) return
    setPending(true)
    try { session.receiveRoom(await roomSocket.command(value)); session.setNotice('') }
    catch (error) { session.setNotice(errorMessage(error)) }
    finally { setPending(false) }
  }, [pending, session.receiveRoom, session.setNotice])
  const toggleQueue = useCallback((queued: boolean) => {
    void command({ type: queued ? 'join-queue' : 'leave-queue' })
  }, [command])
  const select = useCallback((point: Position) => {
    if (session.lobbyOpen) return
    if (computer && game.currentTurn !== session.humanSide) return
    if (!online) {
      const localPlayerSide = computer ? session.humanSide : 'red'
      const forceFirstMoveCheckmate = game.currentTurn === localPlayerSide
        && moveCount === (localPlayerSide === 'red' ? 0 : 1)
      local.select(point, performance.now(), !window.matchMedia('(prefers-reduced-motion: reduce)').matches, forceFirstMoveCheckmate)
      return
    }
    if (pending || !player || game.phase !== 'playing' || game.currentTurn !== player.side) return
    if (game.board[point.row][point.col]?.side === player.side) { setOnlineSelected(point); return }
    if (onlineSelected && isMoveLegal(onlineSelected.row, onlineSelected.col, point.row, point.col, game.board)) {
      void command({ type: 'move', move: { from: onlineSelected, to: point } })
    }
    setOnlineSelected(null)
  }, [session.lobbyOpen, computer, game.currentTurn, session.humanSide, online, local.select, pending, player, game.phase, game.board, onlineSelected, command, selected, moveCount])
  const draw = () => {
    if (online) { void command({ type: 'offer-draw' }); return }
    local.tick(performance.now())
    if (useGameStore.getState().game.phase !== 'playing') return
    const accepted = computer || window.confirm(`${sideName(opposite(game.currentTurn))} có đồng ý lời cầu hòa không?`)
    if (accepted) local.finish(true, performance.now())
    else session.append(`${sideName(opposite(game.currentTurn))} từ chối cầu hòa.`, true)
  }
  const resign = () => {
    if (!window.confirm('Xác nhận xin thua?')) return
    if (online) void command({ type: 'resign' })
    else local.finish(false, performance.now(), computer ? session.humanSide : undefined)
  }
  const leave = async () => {
    if (online && player && game.phase === 'playing' && !window.confirm('Rời phòng sẽ xử thua ván đang chơi. Bạn muốn rời phòng?')) return
    if (online) {
      try { await roomSocket.leave() } catch { /* Disconnect still releases the server seat. */ }
    } else session.append(`${session.name} đã rời phòng.`, true)
    local.reset(performance.now())
    session.leave()
  }
  const animation: Move | null = online ? null : local.animation
  const phase = game.phase
  const variant = game.variant
  const start = useCallback(() => {
    if (online) {
      const otherPlayers = session.room?.players.filter(roomPlayer => roomPlayer.id !== player?.id) ?? []
      if (game.phase === 'ready' && otherPlayers.length > 0 && otherPlayers.every(roomPlayer => roomPlayer.ready)) playMatchIntro(true)
      void command({ type: 'ready' })
      return
    }
    if (phase === 'ready' || phase === 'finished') playMatchIntro(true)
    if (phase === 'finished') local.reset(performance.now(), variant)
    if (computer && session.computerEngine === 'basic') useSessionStore.setState({ humanSide: 'black' })
    local.start(performance.now())
  }, [online, session.room, player, game.phase, playMatchIntro, command, phase, variant, computer, session.computerEngine, local.reset, local.start])
  const requestedTakebackPlies: 1 | 2 = game.currentTurn === (online ? player?.side : session.humanSide) ? 2 : 1
  const takebackPlies: 1 | 2 = requestedTakebackPlies === 2 && moveCount === 1 ? 1 : requestedTakebackPlies
  const computerHasMoved = computer && local.history.some(snapshot => snapshot.currentTurn === session.humanSide)
  const canTakeback = game.phase === 'playing' && moveCount >= 1 && (!computer || computerHasMoved)
  const takebacksLeft = online ? player ? session.room?.takebackRemaining?.[player.side] ?? 2 : 0 : computer ? local.takebacksRemaining : 0
  return {
    game, moveCount, online, computer, humanSide: session.humanSide, computerEngine: session.computerEngine, computerState, room: session.room, player, viewer, toggleQueue, selected, legalMoves, animation, select, playCheckmateSound,
    animationVersion: local.animationVersion, canTakeback, takebacksLeft, takebackDeclineVersion: local.takebackDeclineVersion,
    status: computerState.error || session.notice || (computerState.thinking ? `${session.computerEngine === 'pikafish' ? 'Pikafish' : 'Máy'} đang suy nghĩ…` : gameStatus(game)), pending,
    start,
    reset: () => online ? void command({ type: 'reset' }) : local.reset(performance.now(), game.variant),
    requestTakeback: () => {
      if (online) void command({ type: 'request-takeback' })
      else if (computer && canTakeback && local.takebacksRemaining > 0) local.declineTakeback()
    },
    replyTakeback: (accepted: boolean) => {
      if (online) void command({ type: 'reply-takeback', accepted })
    },
    replyNextMatch: (accepted: boolean) => {
      if (online) void command({ type: 'reply-next-match', accepted })
    },
    draw, resign, leave,
    replyDraw: (accepted: boolean) => void command({ type: 'reply-draw', accepted }),
  }
}
