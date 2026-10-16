import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createInitialBoard } from '../src/game/state/initial'
import { emptyPosition, gameFromPositionFen, positionError, positionFen, positionPiece, positionPlacementError } from '../src/game/state/customPosition'
import { useGameStore } from '../src/store/gameStore'
import { PikafishService } from '../server/services/pikafishService'
import { isMoveLegal } from '../src/game/rules'
import { applyMove, startGame } from '../src/game/moves/actions'
import { toUci } from '../src/game/moves/uci'

function sparsePosition() {
  const board = emptyPosition()
  board[0][4] = positionPiece('black', 'general', 'bk')
  board[9][4] = positionPiece('red', 'general', 'rk')
  board[5][4] = positionPiece('red', 'soldier', 'rp')
  board[1][0] = positionPiece('black', 'rook', 'br')
  board[8][8] = positionPiece('red', 'rook', 'rr')
  return board
}

describe('Vị trí tùy chỉnh', () => {
  it('giữ đủ quân và bên đi trước khi lưu/đọc FEN', () => {
    for (const side of ['red', 'black'] as const) {
      const board = createInitialBoard()
      const fen = positionFen(board, side)
      const restored = gameFromPositionFen(fen)
      expect(restored.currentTurn).toBe(side)
      expect(positionFen(restored.board, restored.currentTurn)).toBe(fen)
      expect(restored.board.flat().filter(Boolean)).toHaveLength(32)
    }
  })
  it('chặn thiếu Tướng, Tướng đối mặt, quân sai điểm và bên chưa đi đang bị chiếu', () => {
    expect(positionError(emptyPosition(), 'red')).toContain('Tướng')
    const board = sparsePosition()
    board[5][4] = null
    expect(positionError(board, 'red')).toContain('đối mặt')
    const invalid = sparsePosition()
    invalid[5][0] = positionPiece('red', 'advisor', 'bad')
    expect(positionError(invalid, 'red')).toContain('Sĩ')
    const checked = sparsePosition()
    checked[8][8] = null
    checked[1][3] = positionPiece('red', 'rook', 'check')
    checked[1][4] = positionPiece('red', 'rook', 'check2')
    expect(positionError(checked, 'red')).toContain('chưa tới lượt')
  })
  it('chỉ cho đặt đúng giới hạn quân và các ô quân có thể tới', () => {
    const board = sparsePosition()
    board[8][0] = positionPiece('red', 'rook', 'rr2')
    expect(positionPlacementError(board, 'red', 'rook', { row: 7, col: 0 })).toContain('hết số quân')
    const noGeneral = board.map(row => [...row])
    noGeneral[9][4] = null
    expect(positionPlacementError(noGeneral, 'red', 'general', { row: 9, col: 0 })).toContain('trong cung')
    expect(positionPlacementError(board, 'red', 'elephant', { row: 7, col: 3 })).toContain('đúng điểm')
    expect(positionPlacementError(board, 'red', 'elephant', { row: 7, col: 4 })).toBeNull()
    const facing = emptyPosition()
    facing[0][4] = positionPiece('black', 'general', 'bk')
    facing[9][4] = positionPiece('red', 'general', 'rk')
    expect(positionPlacementError(facing, 'red', 'rook', { row: 5, col: 0 })).toBeNull()
  })
  it('load thế cờ xóa lịch sử/callback cũ; reset thường không giữ FEN cũ', () => {
    const store = useGameStore.getState()
    const version = store.animationVersion
    const fen = positionFen(sparsePosition(), 'black')
    store.loadPosition(fen)
    expect(useGameStore.getState().initialFen).toBe(fen)
    expect(useGameStore.getState().game.currentTurn).toBe('black')
    expect(useGameStore.getState().animationVersion).toBeGreaterThan(version)
    expect(useGameStore.getState().moves).toEqual([])
    store.reset(0)
    expect(useGameStore.getState().initialFen).toBeNull()
  })
  it('API từ chối FEN chèn lệnh và FEN sai luật trước khi chạy process', async () => {
    const service = new PikafishService('missing', 'missing')
    for (const initialFen of [positionFen(sparsePosition(), 'red') + '\nquit', '9/9/9/9/9/9/9/9/9/9 w - - 0 1', '9/9 w - - 0 1']) {
      await expect(service.move({ moves: [], remainingMs: 15000, initialFen })).rejects.toMatchObject({ status: 400 })
    }
  })
  const installed = process.platform === 'win32' && existsSync(fileURLToPath(new URL('../engines/pikafish/Pikafish-Windows-x86-64-universal.exe', import.meta.url)))
  it.skipIf(!installed)('Pikafish đánh đúng thế tùy chỉnh Đen đi trước và lịch sử nối tiếp', async () => {
    const service = new PikafishService()
    try {
      const initialFen = positionFen(sparsePosition(), 'black')
      let game = startGame(gameFromPositionFen(initialFen), 0)
      const moves: string[] = []
      for (let i = 0; i < 2; i++) {
        const move = await service.move({ moves, remainingMs: 15000, level: 1, initialFen })
        expect(game.board[move.from.row][move.from.col]?.side).toBe(game.currentTurn)
        expect(isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, game.board)).toBe(true)
        game = applyMove(game, move, 0)
        moves.push(toUci(move))
      }
    } finally { service.close() }
  }, 15000)
})
