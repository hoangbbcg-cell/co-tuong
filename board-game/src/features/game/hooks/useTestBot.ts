import { useCallback, useRef, useState } from 'react'
import { getLegalMoves } from '../../../game/rules'
import type { GameVariant, Move, Position } from '../../../types/game'
import { accountApi } from '../../../services/accountApi'
import { applyAccount } from '../../../services/accountSession'
import { errorMessage } from '../../../services/api'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'

/** Test-only server opponent; never awards gold or determines a win on the client. */
export function useTestBot() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const busy = useRef(false)
  const retry = useRef<{ id: string; move: Move; requestId: string } | null>(null)
  const start = useCallback(async (variant: GameVariant) => {
    if (busy.current) return
    const session = useSessionStore.getState(), owner = session.account?.id
    busy.current = true; setPending(true); setError('')
    try {
      const snapshot = await accountApi.testBotStart(variant)
      if (useSessionStore.getState().account?.id !== owner || useSessionStore.getState().screen !== session.screen) return
      useGameStore.getState().reset(performance.now(), variant)
      useGameStore.setState({ game: { ...snapshot.game, lastClockUpdate: performance.now() }, animation: null })
      useSessionStore.setState({ screen: 'game', mode: 'computer', computerEngine: 'basic', humanSide: 'red', computerDemo: false, computerDemoQueued: false, customPositionTrial: false, lobbyOpen: false, room: null, testBotId: snapshot.id, testBotGold: 0 })
      retry.current = null
    } catch (failure) { setError(errorMessage(failure)) }
    finally { busy.current = false; setPending(false) }
  }, [])
  const select = useCallback(async (point: Position) => {
    const session = useSessionStore.getState(), local = useGameStore.getState()
    const id = session.testBotId, owner = session.account?.id
    if (!id || busy.current || local.game.phase !== 'playing') return
    if (local.game.board[point.row]?.[point.col]?.side === 'red') {
      useGameStore.setState({ selected: point }); return
    }
    const from = local.selected
    if (!from || !getLegalMoves(from.row, from.col, local.game.board).some(to => to.row === point.row && to.col === point.col)) return
    const move = { from, to: point }
    if (!retry.current || retry.current.id !== id || JSON.stringify(retry.current.move) !== JSON.stringify(move)) retry.current = { id, move, requestId: crypto.randomUUID() }
    busy.current = true; setPending(true); setError('')
    try {
      const snapshot = await accountApi.testBotMove(id, move, retry.current.requestId)
      if (useSessionStore.getState().testBotId !== id || useSessionStore.getState().account?.id !== owner) return
      if (snapshot.profile) applyAccount(snapshot.profile)
      useSessionStore.setState({ testBotGold: snapshot.goldAwarded })
      useGameStore.setState({ game: { ...snapshot.game, lastClockUpdate: performance.now() }, selected: null, animation: null, history: [...local.history, local.game] })
      retry.current = null
    } catch (failure) { setError(errorMessage(failure)) }
    finally { busy.current = false; setPending(false) }
  }, [])
  return { start, select, pending, error }
}
