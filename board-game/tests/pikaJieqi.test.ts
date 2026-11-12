import { describe, expect, it } from 'vitest'
import { createHiddenGame } from '../src/game/state/hidden'
import { jieqiPublicFen, validateJieqiEngineMove } from '../src/services/pikaJieqi'

const createGame = () => createHiddenGame(0, Array(28).fill(0.5))

describe('PikaJieQi public bridge', () => {
  it('exports a valid initial public FEN without hidden identities', () => {
    const game = createGame()
    const fen = jieqiPublicFen(game)
    expect(fen).toContain(' w ')
    expect(fen).toContain('X')
    expect(fen).toContain('x')
    expect(fen.split(' ')[2]).toBe('R2A2C2P5N2B2r2a2c2p5n2b2')
  })

  it('does not expose concealed identities', () => {
    const game = createGame()
    const before = jieqiPublicFen(game)
    const piece = game.board.flat().find(item => item?.concealed)!
    piece.concealed = { type: 'rook', name: 'PRIVATE-SECRET' }
    expect(jieqiPublicFen(game)).toBe(before)
    expect(before).not.toContain('PRIVATE-SECRET')
  })

  it('rejects unknown captured identities', () => {
    const game = createGame()
    game.captures = [{
      id: 'captured', by: 'red', side: 'black',
      concealed: true, type: null, name: null,
    }]
    expect(() => jieqiPublicFen(game)).toThrow('Unknown captured identity')
  })

  it('rejects invalid engine moves', () => {
    const game = createGame()
    expect(() => validateJieqiEngineMove(game, 'invalid')).toThrow()
    expect(() => validateJieqiEngineMove(game, 'a9a8')).toThrow()
  })

  it('does not mutate the board during FEN export', () => {
    const game = createGame()
    const before = JSON.stringify(game.board)
    jieqiPublicFen(game)
    expect(JSON.stringify(game.board)).toBe(before)
  })
})