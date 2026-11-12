import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { createInitialBoard } from '../src/game/state/initial'
import { emptyPosition, positionFen, positionPiece } from '../src/game/state/customPosition'

function standardFen(turn: 'red' | 'black' = 'red') {
  return positionFen(createInitialBoard(), turn)
}

/** Red cannon checks the black general through one screen, so red must not move first. */
function checkPositionFen() {
  const board = emptyPosition()
  board[9][4] = positionPiece('red', 'general', 'red-general')
  board[5][4] = positionPiece('red', 'cannon', 'red-cannon')
  board[3][4] = positionPiece('red', 'soldier', 'red-screen')
  board[0][4] = positionPiece('black', 'general', 'black-general')
  return positionFen(board, 'black')
}

it('tạo phòng từ thế cờ riêng: game khởi tạo đúng FEN, ẩn khỏi danh sách nhưng tra được theo mã', () => {
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => 0)
  const summary = service.create('Thế cờ riêng', 10, 60, undefined, undefined, 'xiangqi', undefined, standardFen('red'))
  expect(summary.name).toBe('Thế cờ riêng')
  const room = repository.all().find(candidate => candidate.id === summary.id)!
  expect(room.customFen).toBe(standardFen('red'))
  expect(room.game.currentTurn).toBe('red')
  expect(room.game.phase).toBe('ready')
  expect(room.game.remainingTime).toEqual({ red: 600000, black: 600000 })
  expect(room.customFirstTurn).toBe('red')
  // Custom rooms stay out of the public list and quick play.
  expect(service.list()).toEqual([])
  expect(service.byCode(String(summary.code!) ).id).toBe(summary.id)
  expect(() => service.byCode('000001')).toThrow('Không tìm thấy phòng có số này.')
})

it('server từ chối FEN sai quy cách khi tạo phòng custom', () => {
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => 0)
  expect(() => service.create('Sai', 10, 60, undefined, undefined, 'xiangqi', undefined, 'khong-phai-fen')).toThrow()
  expect(() => service.create('Sai', 10, 60, undefined, undefined, 'jieqi', undefined, standardFen())).toThrow('chỉ hỗ trợ Cờ Tướng')
})

it('chỉ chủ phòng được đổi bên đi trước; đổi bên sai luật bị chặn', () => {
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => 0)
  const summary = service.create('Thế cờ riêng', 10, 60, undefined, undefined, 'xiangqi', undefined, checkPositionFen())
  service.join(summary.id, 'owner-socket', 'Người A')
  service.join(summary.id, 'guest-socket', 'Người B')
  const room = repository.all().find(candidate => candidate.id === summary.id)!
  expect(room.ownerId).toBe('owner-socket')
  // This position only allows black to move first.
  expect(() => service.command('guest-socket', { type: 'custom-first-turn', side: 'red' })).toThrow('Chỉ chủ phòng')
  expect(() => service.command('owner-socket', { type: 'custom-first-turn', side: 'red' })).toThrow('chưa tới lượt')
  service.command('owner-socket', { type: 'custom-first-turn', side: 'black' })
  expect(room.customFirstTurn).toBe('black')
  expect(room.game.currentTurn).toBe('black')
})

it('phòng custom không bốc thăm lại phe và ván bắt đầu từ bên đã chọn', () => {
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => 0)
  const summary = service.create('Thế cờ riêng', 10, 60, undefined, undefined, 'xiangqi', undefined, standardFen('red'))
  service.join(summary.id, 'owner-socket', 'Người A')
  service.join(summary.id, 'guest-socket', 'Người B')
  const room = repository.all().find(candidate => candidate.id === summary.id)!
  const sidesBefore = room.players.map(player => player.side).sort().join(':')
  service.command('owner-socket', { type: 'custom-first-turn', side: 'black' })
  service.command('owner-socket', { type: 'ready' })
  service.command('guest-socket', { type: 'ready' })
  expect(room.game.phase).toBe('playing')
  expect(room.game.currentTurn).toBe('black')
  expect(room.players.map(player => player.side).sort().join(':')).toBe(sidesBefore)
})

it('đổi bên là server chung: hai người cùng lật, chỉ chủ phòng, trước ván', () => {
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => 0)
  const summary = service.create('Thế cờ riêng', 10, 60, undefined, undefined, 'xiangqi', undefined, standardFen('red'))
  service.join(summary.id, 'owner-socket', 'Người A')
  service.join(summary.id, 'guest-socket', 'Người B')
  const room = repository.all().find(candidate => candidate.id === summary.id)!
  const sideOf = (name: string) => room.players.find(player => player.name === name)!.side
  expect(() => service.command('guest-socket', { type: 'custom-swap-sides' })).toThrow('Chỉ chủ phòng')
  expect(room.players.map(player => player.side).sort().join(':')).toBe('black:red')
  service.command('owner-socket', { type: 'custom-swap-sides' })
  // The swap changes the seated sides, so both boards flip: each player now sits the opposite colour.
  expect(sideOf('Người A')).toBe('black')
  expect(sideOf('Người B')).toBe('red')
  service.command('owner-socket', { type: 'custom-swap-sides' })
  expect(sideOf('Người A')).toBe('red')
  expect(sideOf('Người B')).toBe('black')
  service.command('owner-socket', { type: 'ready' })
  service.command('guest-socket', { type: 'ready' })
  expect(room.game.phase).toBe('playing')
  expect(() => service.command('owner-socket', { type: 'custom-swap-sides' })).toThrow('Ván đã bắt đầu.')
})

it('reset ván custom quay về đúng thế cờ nguồn', () => {
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => 0)
  const summary = service.create('Thế cờ riêng', 10, 60, undefined, undefined, 'xiangqi', undefined, standardFen('black'))
  service.join(summary.id, 'a', 'Người A')
  service.join(summary.id, 'b', 'Người B')
  const room = repository.all().find(candidate => candidate.id === summary.id)!
  service.command('a', { type: 'reset' })
  expect(room.game.phase).toBe('ready')
  expect(room.game.currentTurn).toBe('black')
  const shape = (board: ReturnType<typeof createInitialBoard>) => board.map(row => row.map(piece => piece ? `${piece.side}:${piece.type}` : null))
  expect(shape(room.game.board)).toEqual(shape(createInitialBoard()))
  expect(room.customFirstTurn).toBe('black')
})
