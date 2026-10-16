import { create } from 'zustand'
import { createGame, opposite } from '../game/state/initial'
import { advanceClock, applyMoveWithResult, finishGame, startGame, takebackSnapshot, MATCH_INTRO_MS } from '../game/moves/actions'
import { isInsideBoard } from '../game/rules'
import type { GameState, GameVariant, Move, Position, Side } from '../types/game'
import { createHiddenGame } from '../game/state/hidden'
import { toUci } from '../game/moves/uci'
import { DEBUG_SKIP_ENDGAME_MOVE_SCAN } from './gameDebug'
import { gameFromPositionFen, positionFen } from '../game/state/customPosition'

interface LocalGameStore {
  game: GameState
  initialFen: string | null
  loadPosition: (fen: string) => void
  selected: Position | null
  animation: Move | null
  animationVersion: number
  moves: string[]
  history: GameState[]
  takebacksRemaining: number
  takebackDeclineVersion: number
  start: (now: number) => void
  reset: (now: number, variant?: GameVariant) => void
  tick: (now: number) => void
  freezeClock: (now: number) => void
  select: (point: Position, now: number, animate?: boolean) => void
  completeAnimation: (version: number, now: number) => void
  takeback: (plies: 1 | 2, now: number, consume?: boolean) => void
  declineTakeback: () => void
  finish: (draw: boolean, now: number, resigningSide?: Side) => void
}
export const useGameStore = create<LocalGameStore>()((set, get) => ({
  initialFen: null,
  loadPosition: fen => {
    const game = gameFromPositionFen(fen)
    set(state => ({ game, initialFen: positionFen(game.board, game.currentTurn), selected: null, animation: null, animationVersion: state.animationVersion + 1, moves: [], history: [], takebacksRemaining: 2, takebackDeclineVersion: 0 }))
  },
  game: createGame(), selected: null, animation: null, animationVersion: 0, moves: [], history: [], takebacksRemaining: 2, takebackDeclineVersion: 0,
  start: now => {
    const previous = get().game
    const game = startGame(previous, now, MATCH_INTRO_MS)
    set({ game })
  },
  reset: (now, variant = 'xiangqi') => set(state => ({
    initialFen: null,
    game: variant === 'jieqi' ? createHiddenGame(now, Array.from({ length: 28 }, () => Math.random())) : createGame(now),
    selected: null, animation: null, animationVersion: state.animationVersion + 1, moves: [], history: [], takebacksRemaining: 2, takebackDeclineVersion: 0,
  })),
  tick: now => set(state => {
    const game = advanceClock(state.game, now)
    const selected = game.phase === 'finished' ? null : state.selected
    if (game === state.game && selected === state.selected) return state
    return { game, selected }
  }),
  freezeClock: now => set(state => ({ game: state.game.phase === 'playing' ? { ...state.game, lastClockUpdate: now } : state.game })),
  select: (point, now, animate = true) => {
    const { game, selected, animation, animationVersion } = get()
    if (game.phase !== 'playing' || now < game.lastClockUpdate || animation || !isInsideBoard(point.row, point.col)) return
    if (game.board[point.row][point.col]?.side === game.currentTurn) { set({ selected: point }); return }
    if (selected) {
      const move = { from: selected, to: point }
      const result = applyMoveWithResult(game, move, now, game.currentTurn, {
        skipEndgameMoveScan: DEBUG_SKIP_ENDGAME_MOVE_SCAN,

      })
      const next = result.game
      if (next.board === game.board) {
        if (result.rejection === 'repetition') return
        set({ game: next, selected: null })
        return
      }
      const state = get()
      set({
        game: next,
        selected: null,
        animation: animate ? move : null,
        animationVersion: animate ? animationVersion + 1 : animationVersion,
        moves: [...state.moves, toUci(move)],
        history: [...state.history, takebackSnapshot(game)],
      })
      return
    }
    set({ selected: null })
  },
  completeAnimation: (version, now) => {
    const state = get()
    if (state.animationVersion !== version || !state.animation) return
    set({ animation: null })
  },
  takeback: (plies, now, consume = true) => set(state => {
    const restored = state.history.at(-plies)
    if (!restored || state.takebacksRemaining <= 0) return state
    return {
      game: { ...restored, repetition: restored.repetition ? { ...restored.repetition, warning: false, warningSide: null } : undefined, lastClockUpdate: now },
      selected: null,
      animation: null,
      animationVersion: state.animationVersion + 1,
      moves: state.moves.slice(0, -plies),
      history: state.history.slice(0, -plies),
      takebacksRemaining: consume ? state.takebacksRemaining - 1 : state.takebacksRemaining,
    }
  }),
  declineTakeback: () => set(state => state.takebacksRemaining <= 0 ? state : {
    takebacksRemaining: state.takebacksRemaining - 1,
    takebackDeclineVersion: state.takebackDeclineVersion + 1,
  }),
  finish: (draw, now, resigningSide) => {
    get().tick(now)
    const { game, animation } = get()
    if (game.phase !== 'playing' || animation) return
    set({ game: finishGame(game, draw ? null : opposite(resigningSide ?? game.currentTurn), draw ? 'draw' : 'resign'), selected: null })
  },
}))
