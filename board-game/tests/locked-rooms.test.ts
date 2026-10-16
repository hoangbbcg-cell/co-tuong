import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { randomAvailableRoom } from '../src/lib/quickRoom'

it('chấp nhận tên khách Kỳ thủ và đúng sáu chữ số khi vào phòng online', () => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const room = service.create('Bàn khách')
  const snapshot = service.join(room.id, 'guest', 'Kỳ thủ000042')
  expect(snapshot.players[0].name).toBe('Kỳ thủ000042')
  expect(() => service.join(room.id, 'other', 'Kỳ thủ1234567')).toThrow()
})

it('khóa thật ở server: đúng mật khẩu mới vào được cả ghế và khán giả', () => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const room = service.create('Bàn khóa', 10, 60, 'Hà Nội', 'secret-123')
  expect(room.locked).toBe(true)
  expect(() => service.join(room.id, 'a', 'Người A')).toThrow('Mật khẩu')
  expect(() => service.join(room.id, 'a', 'Người A', 'sai')).toThrow('Mật khẩu')
  expect(service.list()[0].players).toBe(0)
  const snapshot = service.join(room.id, 'a', 'Người A', 'secret-123')
  service.join(room.id, 'b', 'Người B', 'secret-123')
  expect(() => service.join(room.id, 'c', 'Người C', 'sai')).toThrow('Mật khẩu')
  service.join(room.id, 'c', 'Người C', 'secret-123')
  expect(snapshot.viewers).toContainEqual(expect.objectContaining({ id: 'c' }))
  expect(JSON.stringify([snapshot, service.list()])).not.toMatch(/secret-123|hash|salt|password/)
  service.command('a', { type: 'reset' })
  expect(snapshot.locked).toBe(true)
  expect(() => service.join(room.id, 'd', 'Người D')).toThrow('Mật khẩu')
})
it.each(['', null, 123, 'a'.repeat(65)])('server từ chối mật khẩu không hợp lệ %s', password => {
  const service = new RoomService(new RoomRepository())
  expect(() => service.create('Bàn', 10, 60, undefined, password)).toThrow('Mật khẩu')
})
it('không khóa thì vào bình thường; Chơi nhanh luôn bỏ qua bàn khóa', () => {
  const service = new RoomService(new RoomRepository())
  const locked = service.create('Khóa', 10, 60, undefined, '123')
  const open = service.create('Mở')
  service.join(locked.id, 'a', 'Người A', '123')
  service.join(open.id, 'b', 'Người B')
  expect(randomAvailableRoom(service.list(), () => 0)?.id).toBe(open.id)
  expect(randomAvailableRoom(service.list().filter(room => room.locked))).toBeUndefined()
})
it('lệnh vào xem riêng bị chặn nếu ván chưa bắt đầu, khi đang đấu vào đúng khán giả', () => {
  const service = new RoomService(new RoomRepository())
  const room = service.create('Xem thật')
  const snapshot = service.join(room.id, 'a', 'Người A')
  service.join(room.id, 'b', 'Người B')
  expect(() => service.join(room.id, 'v', 'Người xem', undefined, true)).toThrow('không còn đang đấu')
  service.command('a', { type: 'ready' }); service.command('b', { type: 'ready' })
  service.join(room.id, 'v', 'Người xem', undefined, true)
  expect(snapshot.players.map(player => player.id)).toEqual(['a', 'b'])
  expect(snapshot.viewers).toContainEqual(expect.objectContaining({ id: 'v', queued: false }))
})
