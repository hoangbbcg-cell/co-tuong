import { describe, expect, it } from 'vitest'
import { createGame, createInitialBoard } from '../src/game/state/initial'
import { getLegalMoves, isBasicMoveAllowed, isInCheck, isMoveLegal, hasAnyLegalMove } from '../src/game/rules'
import { advanceClock, applyMove, startGame } from '../src/game/moves/actions'
import type { Board, Piece, PieceType, Side } from '../src/types/game'

const piece = (type: PieceType, side: Side = 'red'): Piece => ({ id: `${side}-${type}`, type, side, name: type })
function empty(): Board { return Array.from({ length: 10 }, () => Array<Piece | null>(9).fill(null)) }
describe('Luật cờ độc lập DOM', () => {
  it('khởi tạo 32 quân, đỏ đi trước, không thay đổi board khi preview', () => {
    const board = createInitialBoard(), before = structuredClone(board)
    expect(board.flat().filter(Boolean)).toHaveLength(32)
    expect(createGame().currentTurn).toBe('red')
    expect(getLegalMoves(6, 0, board)).toEqual([{ row: 5, col: 0 }])
    expect(board).toEqual(before)
    expect(isInCheck('red', board)).toBe(false)
    expect(hasAnyLegalMove('black', board)).toBe(true)
  })
  it.each([[-1, 0, 2, 0], [9, 1, 10, 1], [9, .5, 7, 1], [NaN, 1, 7, 1]])('từ chối tọa độ sai (%s,%s)', (fr, fc, tr, tc) => {
    expect(isMoveLegal(fr, fc, tr, tc, createInitialBoard())).toBe(false)
  })
  it('xe không xuyên quân hoặc ăn quân mình', () => {
    const board = createInitialBoard()
    expect(isMoveLegal(9, 0, 5, 0, board)).toBe(false)
    expect(isMoveLegal(9, 0, 9, 1, board)).toBe(false)
    expect(isMoveLegal(9, 0, 8, 0, board)).toBe(true)
  })
  it('mã bị cản chân', () => {
    const board = createInitialBoard()
    expect(isMoveLegal(9, 1, 7, 2, board)).toBe(true)
    board[8][1] = piece('soldier')
    expect(isMoveLegal(9, 1, 7, 2, board)).toBe(false)
  })
  it('tượng bị chặn mắt và không qua sông', () => {
    const board = empty(), elephant = piece('elephant')
    expect(isBasicMoveAllowed(elephant, 9, 2, 7, 4, board)).toBe(true)
    board[8][3] = piece('soldier')
    expect(isBasicMoveAllowed(elephant, 9, 2, 7, 4, board)).toBe(false)
    expect(isBasicMoveAllowed(elephant, 5, 2, 3, 4, board)).toBe(false)
  })
  it('pháo chỉ ăn với đúng một ngòi', () => {
    const board = empty(), cannon = piece('cannon')
    board[2][1] = piece('horse', 'black')
    expect(isBasicMoveAllowed(cannon, 7, 1, 2, 1, board)).toBe(false)
    board[5][1] = piece('soldier')
    expect(isBasicMoveAllowed(cannon, 7, 1, 2, 1, board)).toBe(true)
    board[4][1] = piece('soldier')
    expect(isBasicMoveAllowed(cannon, 7, 1, 2, 1, board)).toBe(false)
  })
  it('tốt qua sông mới được đi ngang và không đi lùi', () => {
    const board = empty()
    expect(isBasicMoveAllowed(piece('soldier'), 6, 0, 6, 1, board)).toBe(false)
    expect(isBasicMoveAllowed(piece('soldier'), 4, 0, 4, 1, board)).toBe(true)
    expect(isBasicMoveAllowed(piece('soldier'), 4, 0, 5, 0, board)).toBe(false)
    expect(isBasicMoveAllowed(piece('soldier', 'black'), 5, 0, 5, 1, board)).toBe(true)
  })
  it('sĩ và tướng không ra khỏi cung', () => {
    const board = empty()
    expect(isBasicMoveAllowed(piece('advisor'), 9, 3, 8, 4, board)).toBe(true)
    expect(isBasicMoveAllowed(piece('advisor'), 9, 3, 8, 2, board)).toBe(false)
    expect(isBasicMoveAllowed(piece('general'), 9, 3, 9, 2, board)).toBe(false)
  })
  it('không cho hai tướng đối mặt hoặc tự làm tướng bị chiếu', () => {
    const board = empty()
    board[0][4] = piece('general', 'black'); board[9][4] = piece('general'); board[5][4] = piece('rook')
    expect(isInCheck('red', board)).toBe(false)
    expect(isMoveLegal(5, 4, 5, 3, board)).toBe(false)
    board[5][4] = null
    expect(isInCheck('red', board)).toBe(true)
  })
  it('xử lý nước đi bất biến, ăn quân, đổi lượt và hết giờ', () => {
    let game = startGame(createGame(), 0)
    const initial = game.board
    game = applyMove(game, { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }, 1000)
    expect(initial[6][0]).not.toBeNull()
    expect(game.currentTurn).toBe('black')
    expect(game.remainingTime.red).toBe(599000)
    game = applyMove(game, { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } }, 1500)
    game = applyMove(game, { from: { row: 5, col: 0 }, to: { row: 4, col: 0 } }, 2000)
    expect(game.board.flat().filter(Boolean)).toHaveLength(31)
    expect(advanceClock(game, 602000).result).toEqual({ winner: 'red', reason: 'timeout' })
  })
  it('chặn nước sai lượt và nước sau khi hết giờ', () => {
    const game = startGame(createGame(), 0)
    const move = { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } }
    expect(applyMove(game, move, 0, 'black').board).toBe(game.board)
    expect(applyMove(game, move, 600001).result?.reason).toBe('timeout')
    expect(applyMove(game, move, 600001).board).toBe(game.board)
  })
  it('đồng bộ vòng một phút với đồng hồ, xử thua và dừng đúng lúc hết lượt', () => {
    const game = startGame(createGame(), 0)
    const almostExpired = advanceClock(game, 59_999)
    expect(almostExpired.phase).toBe('playing')
    expect(almostExpired.turnElapsed).toBe(59_999)
    expect(almostExpired.remainingTime.red).toBe(540_001)

    const expired = advanceClock(almostExpired, 60_000)
    expect(expired.result).toEqual({ winner: 'black', reason: 'timeout' })
    expect(expired.turnElapsed).toBe(60_000)
    expect(expired.remainingTime.red).toBe(540_000)
    expect(advanceClock(expired, 90_000)).toBe(expired)
  })
  it('chiếu bí và hết nước đi đều xử thua', () => {
    const board = empty()
    board[0][4] = piece('general', 'black'); board[9][4] = piece('general')
    board[1][3] = piece('rook'); board[1][5] = piece('rook'); board[2][4] = piece('rook')
    const game = { ...startGame(createGame(), 0), board }
    const mate = applyMove(game, { from: { row: 2, col: 4 }, to: { row: 1, col: 4 } }, 0)
    expect(mate.result).toEqual({ winner: 'red', reason: 'checkmate' })
    // Block the generals' file with a red soldier; black is boxed in, but not checked.
    board[2][4] = piece('soldier'); board[3][0] = piece('rook')
    const stale = applyMove({ ...game, board }, { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } }, 0)
    expect(stale.result).toEqual({ winner: 'red', reason: 'stalemate' })
  })
})
