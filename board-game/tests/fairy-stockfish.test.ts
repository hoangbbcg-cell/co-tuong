import { describe, expect, it, vi } from 'vitest'
import { fairyMoveToGame, FairyStockfishService, gameMoveToFairy } from '../server/services/fairyStockfishService'
import { createGame } from '../src/game/state/initial'
import { applyMove, finishGame, startGame } from '../src/game/moves/actions'
import { toUci } from '../src/game/moves/uci'
import { positionFen } from '../src/game/state/customPosition'
import { fairyLevel } from '../server/services/fairyStockfishLevels'

describe('Fairy-Stockfish adapter', () => {
  it('keeps beginner random moves legal and rejects invalid history before choosing', async () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0)
    const service = new FairyStockfishService()
    try {
      for (let level = 1; level <= 6; level++) {
        const game = startGame(createGame(0), 0)
        const move = await service.move({ moves: [], remainingMs: 600000, level })
        expect(applyMove(game, move, 0).board).not.toBe(game.board)
      }
      await expect(service.move({ moves: ['a0a9'], remainingMs: 600000, level: 1 })).rejects.toThrow('sai luật')
      const abort = new AbortController(); abort.abort()
      await expect(service.move({ moves: [], remainingMs: 600000, level: 1 }, abort.signal)).rejects.toThrow('hủy')
    } finally { random.mockRestore(); service.close() }
  })
  it('reduces mistakes through levels 1–6 and removes all handicaps at 7–10', () => {
    for (let level = 1; level < 6; level++) {
      expect(fairyLevel(level).randomMoveChance).toBeGreaterThan(fairyLevel(level + 1).randomMoveChance)
      expect(fairyLevel(level).skill).toBeLessThan(fairyLevel(level + 1).skill)
      expect(fairyLevel(level).depth).toBeLessThan(fairyLevel(level + 1).depth!)
    }
    for (let level = 7; level <= 10; level++) expect(fairyLevel(level)).toEqual({ depth: null, skill: 20, randomMoveChance: 0 })
  })
  it('converts game ranks 0–9 to Fairy ranks 1–10 and back', () => {
    expect(gameMoveToFairy('a0a1')).toBe('a1a2')
    expect(gameMoveToFairy('a9a7')).toBe('a10a8')
    expect(fairyMoveToGame('a1a2')).toBe('a0a1')
    expect(fairyMoveToGame('a10a8')).toBe('a9a7')
  })

  it.skipIf(process.env.RUN_FAIRY_STOCKFISH_TESTS !== '1')('runs real UCI/NNUE searches as Red and Black and validates a complete game', async () => {
    const service = new FairyStockfishService()
    try {
      await service.ready()
      let game = startGame(createGame(0), 0)
      let moves: string[] = []
      for (let ply = 0; ply < 240 && game.phase === 'playing'; ply++) {
        const move = await service.move({ moves, remainingMs: 600_000, level: 1 }, undefined)
        expect(move).toBeTruthy()
        const next = applyMove(game, move, ply + 1)
        expect(next.board).not.toBe(game.board)
        moves = [...moves, toUci(move)]
        game = next
      }
      expect(moves.length).toBeGreaterThan(1)
      if (game.phase === 'playing') game = finishGame(game, null, 'resign')
      expect(game.phase).toBe('finished')
      const custom = createGame(0)
      const blackMove = await service.move({ moves: [], initialFen: positionFen(custom.board, 'black'), remainingMs: 600_000, level: 1 })
      expect(custom.board[blackMove.from.row][blackMove.from.col]?.side).toBe('black')
    } finally { service.close() }
  }, 180_000)
})
