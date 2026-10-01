import { expect, it } from 'vitest'
import { chooseComputerMove } from '../src/game/moves/computer'
import { createInitialBoard } from '../src/game/state/initial'
import { isMoveLegal } from '../src/game/rules'

it('máy chọn nước hợp lệ và không sửa bàn đầu vào', () => {
  const board = createInitialBoard()
  const before = structuredClone(board)
  const move = chooseComputerMove(board, 'black', 0.5)!
  expect(board[move.from.row][move.from.col]?.side).toBe('black')
  expect(isMoveLegal(move.from.row, move.from.col, move.to.row, move.to.col, board)).toBe(true)
  expect(board).toEqual(before)
})
