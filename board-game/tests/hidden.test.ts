import { describe, expect, it } from 'vitest'
import { createHiddenGame } from '../src/game/state/hidden'
import { createInitialBoard } from '../src/game/state/initial'
import { applyMove, startGame } from '../src/game/moves/actions'
import { isMoveLegal, isInCheck } from '../src/game/rules'
import { chooseComputerMove } from '../src/game/moves/computer'
import type { Board, Piece } from '../src/types/game'

function sparse(): Board {
  const board: Board = Array.from({ length: 10 }, () => Array<Piece | null>(9).fill(null))
  board[0][4] = { id: 'b', type: 'general', side: 'black', name: '將' }
  board[9][3] = { id: 'r', type: 'general', side: 'red', name: '帥' }
  return board
}

describe('Cờ Úp', () => {
  it('30 quân úp, 2 tướng ngửa và đủ quân thật mỗi phe sau xáo', () => {
    const game = createHiddenGame(0, Array(28).fill(0.3))
    const pieces = game.board.flat().filter(piece => piece !== null)
    expect(pieces.filter(piece => piece.concealed)).toHaveLength(30)
    expect(pieces.filter(piece => !piece.concealed).map(piece => piece.type)).toEqual(['general', 'general'])
    for (const side of ['red', 'black'] as const) {
      const actual = pieces.filter(piece => piece.side === side).map(piece => piece.concealed?.type ?? piece.type).sort()
      expect(actual).toEqual(createInitialBoard().flat().filter(piece => piece?.side === side).map(piece => piece!.type).sort())
    }
    expect(game).toEqual(createHiddenGame(0, Array(28).fill(0.3)))
    expect(game.board).not.toEqual(createHiddenGame(0, Array(28).fill(0.8)).board)
  })
  it('đi theo vỏ tốt rồi lật đúng quân, không sửa state cũ', () => {
    const game = startGame(createHiddenGame(0, Array(28).fill(0.3)), 0)
    const piece = game.board[6][0]!
    const before = structuredClone(game)
    const next = applyMove(game, { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }, 0)
    expect(next.board[5][0]?.type).toBe(piece.concealed!.type)
    expect(next.board[5][0]?.name).toBe(piece.concealed!.name)
    expect(next.board[5][0]?.concealed).toBeUndefined()
    expect(next.currentTurn).toBe('black')
    expect(game).toEqual(before)
    expect(isMoveLegal(6, 0, 6, 1, game.board)).toBe(false)
  })
  it('sĩ đã lật ra cung, tượng qua sông vẫn chặn mắt; cờ tướng không đổi', () => {
    const board = sparse()
    board[5][2] = { id: 'a', type: 'advisor', side: 'red', name: '仕', jieqi: true }
    expect(isMoveLegal(5, 2, 4, 3, board)).toBe(true)
    board[5][2]!.jieqi = false
    expect(isMoveLegal(5, 2, 4, 3, board)).toBe(false)
    board[5][2] = { id: 'e', type: 'elephant', side: 'red', name: '相', jieqi: true }
    expect(isMoveLegal(5, 2, 3, 4, board)).toBe(true)
    board[4][3] = { id: 'block', type: 'soldier', side: 'red', name: '兵' }
    expect(isMoveLegal(5, 2, 3, 4, board)).toBe(false)
    board[4][3] = null
    board[5][2]!.jieqi = false
    expect(isMoveLegal(5, 2, 3, 4, board)).toBe(false)
  })
  it('lật quân chiếu ngay bằng loại thật, bắt quân úp và không để hai tướng đối mặt', () => {
    const game = startGame(createHiddenGame(0, Array(28).fill(0)), 0)
    game.board = sparse()
    game.board[6][4] = { id: 'hidden', type: 'soldier', side: 'red', name: 'Quân úp', jieqi: true, concealed: { type: 'rook', name: '車' } }
    game.board[5][4] = { id: 'target', type: 'soldier', side: 'black', name: 'Quân úp', jieqi: true, concealed: { type: 'cannon', name: '砲' } }
    const next = applyMove(game, { from: { row: 6, col: 4 }, to: { row: 5, col: 4 } }, 0)
    expect(next.board[5][4]?.name).toBe('車')
    expect(isInCheck('black', next.board)).toBe(true)
    const board = sparse()
    board[9][4] = board[9][3]; board[9][3] = null
    board[5][4] = { id: 'h', type: 'rook', side: 'red', name: 'Quân úp', jieqi: true, concealed: { type: 'soldier', name: '兵' } }
    expect(isMoveLegal(5, 4, 5, 3, board)).toBe(false)
  })
  it('máy không chọn khác vì biết danh tính quân chưa lật', () => {
    const a = createHiddenGame(0, Array(28).fill(0.1)).board
    const b = createHiddenGame(0, Array(28).fill(0.9)).board
    expect(chooseComputerMove(a, 'black', 0.5)).toEqual(chooseComputerMove(b, 'black', 0.5))
  })
})
