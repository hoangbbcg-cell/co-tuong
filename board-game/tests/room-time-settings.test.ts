import { describe, expect, it } from 'vitest'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

describe('Cấu hình thời gian khi tạo bàn', () => {
  it.each([30, 60, 90, 120])('hết lượt đúng %i giây và giữ cấu hình khi reset', seconds => {
    let now = 0
    const service = new RoomService(new RoomRepository(), () => now)
    const { id } = service.create('Bàn cờ', 15, seconds)
    service.join(id, 'red', 'Đỏ')
    service.join(id, 'black', 'Đen')
    service.command('red', { type: 'ready' })
    service.command('black', { type: 'ready' })
    now = 1300 + seconds * 1000 - 1
    service.tick()
    expect(service.roomFor('red')?.game.phase).toBe('playing')
    now++
    service.tick()
    expect(service.roomFor('red')?.game.result).toEqual({ winner: 'black', reason: 'timeout' })
    const reset = service.command('red', { type: 'reset' })
    expect(reset.turnSeconds).toBe(seconds)
    expect(reset.game.turnTimeLimitMs).toBe(seconds * 1000)
    expect(reset.game.remainingTime).toEqual({ red: 900000, black: 900000 })
  })
  it.each([15, 0, 61, '60', null])('server từ chối giới hạn lượt sai %s', seconds => {
    const service = new RoomService(new RoomRepository())
    expect(() => service.create('Bàn cờ', 10, seconds)).toThrow('Thời gian mỗi nước không hợp lệ.')
  })
})
