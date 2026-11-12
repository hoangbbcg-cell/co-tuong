import { expect, it } from 'vitest'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'
import { createInitialBoard } from '../src/game/state/initial'
import { positionFen } from '../src/game/state/customPosition'

const settings = {
  type: 'room-settings' as const,
  queueBlocked: true,
  chatBlocked: true,
}

function createRoom(password?: string, customFen?: string) {
  const service = new RoomService(new RoomRepository())
  const summary = service.create(
    'Phòng kiểm thử', 10, 60,
    undefined, password, 'xiangqi',
    undefined, customFen,
  )
  const room = service.join(summary.id, 'creator', 'Người tạo')
  service.join(summary.id, 'guest', 'Khách')
  return { service, room }
}

it('phòng công khai không có quyền quản lý chủ phòng', () => {
  const { service, room } = createRoom()
  expect(room.locked).toBe(false)
  expect(room.ownerId).toBe('creator')
  expect(() => service.command('creator', settings))
    .toThrow('Chỉ chủ phòng')
  expect(() => service.command('creator', {
    type: 'moderate', targetId: 'guest', action: 'mute',
  })).toThrow('Chỉ chủ phòng')
  expect(room.queueBlocked).toBeUndefined()
  expect(room.chatBlocked).toBeUndefined()
  expect(room.mutedMemberIds).toBeUndefined()
})

it('phòng khóa không mật khẩu vẫn có quyền chủ phòng', () => {
  const { service, room } = createRoom('')
  expect(room.locked).toBe(true)
  expect(room.passwordRequired).toBe(false)
  service.command('creator', settings)
  expect(room.queueBlocked).toBe(true)
  expect(room.chatBlocked).toBe(true)
  expect(() => service.command('guest', settings))
    .toThrow('Chỉ chủ phòng')
})

it('phòng khóa có mật khẩu vẫn có quyền chủ phòng', () => {
  const service = new RoomService(new RoomRepository())
  const summary = service.create(
    'Phòng khóa', 10, 60,
    undefined, '123abc', 'xiangqi',
  )
  const room = service.join(
    summary.id, 'creator', 'Chủ phòng', '123abc',
  )
  expect(room.locked).toBe(true)
  expect(room.passwordRequired).toBe(true)
  service.command('creator', settings)
  expect(room.queueBlocked).toBe(true)
})

it('phòng online từ Cờ thế vẫn có quyền chủ phòng', () => {
  const fen = positionFen(createInitialBoard(), 'red')
  const { service, room } = createRoom(undefined, fen)
  expect(room.customFen).toBe(fen)
  service.command('creator', settings)
  expect(room.queueBlocked).toBe(true)
  expect(() => service.command('guest', settings))
    .toThrow('Chỉ chủ phòng')
})