import { beforeEach, describe, expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

describe('Service phòng và server là nguồn sự thật', () => {
  let now: number, service: RoomService, id: string
  beforeEach(() => {
    now = 0; service = new RoomService(new RoomRepository(), () => now)
    id = service.create('Phòng test').id
    service.join(id, 'a', 'Đỏ'); service.join(id, 'b', 'Đen')
  })
  const move = { type: 'move', move: { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } } }
  const start = () => { service.command('a', { type: 'ready' }); service.command('b', { type: 'ready' }) }
  it.each([3, 5, 10, 15, 30])('áp dụng %i phút cho clock và giữ khi reset', minutes => {
    const created = service.create('Có thời gian', minutes)
    expect(created.minutes).toBe(minutes)
    const room = service.join(created.id, 'timed', 'Người chơi')
    expect(room.game.remainingTime).toEqual({ red: minutes * 60_000, black: minutes * 60_000 })
    expect(service.list().find(item => item.id === created.id)?.minutes).toBe(minutes)
    expect(service.command('timed', { type: 'reset' }).game.remainingTime.red).toBe(minutes * 60_000)
  })
  it.each([0, -3, 7, '5', null])('từ chối thời gian không hợp lệ %s', minutes => {
    expect(() => service.create('Sai giờ', minutes)).toThrow('Thời gian không hợp lệ')
  })
  it('server khóa nước đi và giữ giờ trong 1,3 giây khai cuộc', () => {
    start()
    now = 1299
    expect(() => service.command('a', move)).toThrow()
    expect(service.tick()[0].game.remainingTime.red).toBe(600000)
    now = 1300
    const room = service.command('a', move)
    expect(room.game.board[5][0]?.side).toBe('red')
    expect(room.game.remainingTime.red).toBe(600000)
  })
  it('cần cả hai sẵn sàng và chặn người thứ ba', () => {
    expect(service.command('a', { type: 'ready' }).game.phase).toBe('ready')
    expect(() => service.command('a', move)).toThrow()
    expect(() => service.join(id, 'c', 'Khách')).toThrow()
    expect(service.command('b', { type: 'ready' }).game.phase).toBe('playing')
  })
  it('không tin phe do client gửi, chặn tọa độ giả, chỉ cập nhật nước hợp lệ', () => {
    start()
    expect(() => service.command('b', { ...move, side: 'red' })).toThrow()
    expect(() => service.command('a', { type: 'move', move: { from: { row: -1, col: 0 }, to: { row: 5, col: 0 } } })).toThrow()
    expect(() => service.command('outsider', move)).toThrow()
    expect(() => service.command('a', { type: 'teleport' })).toThrow()
    now = 1500
    const room = service.command('a', move)
    expect(room.game.board[5][0]?.side).toBe('red')
    expect(room.game.remainingTime.red).toBe(599800)
    expect(() => service.command('a', move)).toThrow()
    expect(() => service.command('a', { type: 'reset' })).toThrow()
  })
  it('cầu hòa phải có đối thủ chấp nhận; có thể từ chối', () => {
    start(); service.command('a', { type: 'offer-draw' })
    expect(() => service.command('a', { type: 'reply-draw', accepted: true })).toThrow()
    expect(service.command('b', { type: 'reply-draw', accepted: false }).game.phase).toBe('playing')
    service.command('b', { type: 'offer-draw' })
    expect(service.command('a', { type: 'reply-draw', accepted: true }).game.result?.reason).toBe('draw')
    const reset = service.command('a', { type: 'reset' })
    expect(reset.game.phase).toBe('ready')
    expect(reset.players.every(player => !player.ready)).toBe(true)
  })
  it('đi lại cần đối thủ đồng ý, hoàn tác một hoặc hai nước và giới hạn hai yêu cầu', () => {
    start(); now = 1300
    let room = service.command('a', move)
    expect(room.game.currentTurn).toBe('black')
    room = service.command('a', { type: 'request-takeback' })
    expect(room.takebackOffer).toEqual({ requester: 'red', plies: 1 })
    expect(room.takebackRemaining?.red).toBe(1)
    now = 1350
    room = service.tick()[0]
    expect(room.game.remainingTime.black).toBe(600000)
    expect(room.game.turnElapsed).toBe(0)
    expect(() => service.command('b', { type: 'move', move: { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } } })).toThrow('trả lời yêu cầu')
    room = service.command('b', { type: 'reply-takeback', accepted: true })
    expect(room.game.board[6][0]?.side).toBe('red')
    expect(room.game.currentTurn).toBe('red')
    expect(room.takebackRemaining?.red).toBe(2)
    now = 1400; service.command('a', move)
    now = 1500; service.command('b', { type: 'move', move: { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } } })
    room = service.command('a', { type: 'request-takeback' })
    expect(room.takebackOffer?.plies).toBe(2)
    room = service.command('b', { type: 'reply-takeback', accepted: true })
    expect(room.game.board[6][0]?.side).toBe('red')
    expect(room.game.board[3][0]?.side).toBe('black')
    expect(room.game.remainingTime).toEqual({ red: 600000, black: 600000 })
    expect(room.game.turnElapsed).toBe(0)
    expect(room.takebackRemaining?.red).toBe(2)
    now = 1600; service.command('a', move)
    room = service.command('a', { type: 'request-takeback' })
    room = service.command('b', { type: 'reply-takeback', accepted: false })
    expect(room.takebackRemaining?.red).toBe(1)
    room = service.command('a', { type: 'request-takeback' })
    room = service.command('b', { type: 'reply-takeback', accepted: false })
    expect(room.takebackRemaining?.red).toBe(0)
    expect(() => service.command('a', { type: 'request-takeback' })).toThrow('hết 2 lần')
  })
  it('đồng hồ server hết giờ, rời phòng xử thua và giải phóng ghế', () => {
    start(); now = 601301
    expect(service.tick()[0].game.result).toEqual({ winner: 'black', reason: 'timeout' })
    let room = service.command('a', { type: 'ready' })
    expect(room.game.phase).toBe('ready')
    expect(room.players.find(player => player.id === 'a')?.ready).toBe(true)
    room = service.command('b', { type: 'ready' })
    expect(room.game.phase).toBe('playing')
    expect(service.leave('a')?.game.result).toEqual({ winner: 'black', reason: 'leave' })
    expect(service.join(id, 'c', 'Mới').players.find(player => player.id === 'c')?.side).toBe('red')
    service.leave('b'); service.leave('c')
    expect(service.list()).toHaveLength(0)
  })
  it('chat giới hạn độ dài, giữ 100 tin, danh tính từ server', () => {
    expect(() => service.chat('a', 'x'.repeat(301))).toThrow()
    expect(() => service.chat('a', {})).toThrow()
    expect(() => service.create(' ')).toThrow()
    for (let i = 0; i < 105; i++) service.chat('a', `<b>${i}</b>`)
    const room = service.roomFor('a')!
    expect(room.messages).toHaveLength(100)
    expect(room.messages.at(-1)?.name).toBe('Đỏ')
    expect(room.messages.at(-1)?.text).toBe('<b>104</b>')
  })
})
