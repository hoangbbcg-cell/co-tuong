import { expect, it } from 'vitest'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

function setup() {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const summary = service.create('Bàn riêng', 10, 60, undefined, '', 'xiangqi', 'owner-account')
  const room = service.join(summary.id, 'owner', 'Chủ phòng', undefined, false, 'owner-account')
  service.join(room.id, 'player', 'Người chơi')
  service.join(room.id, 'viewer', 'Người xem')
  return { service, room, advance: (ms: number) => { now += ms; service.tick() } }
}

it('không cho chủ đổi ghế trong ván, kể cả gọi trực tiếp sau khi mở menu từ trước', () => {
  const { service, room } = setup()
  service.command('owner', { type: 'ready' })
  service.command('player', { type: 'ready' })
  expect(room.game.phase).toBe('playing')
  const before = JSON.stringify(room)
  expect(() => service.command('owner', { type: 'moderate', targetId: 'player', action: 'demote' })).toThrow('kết thúc ván')
  expect(JSON.stringify(room)).toBe(before)
  expect(() => service.command('owner', { type: 'moderate', targetId: 'viewer', action: 'promote' })).toThrow('kết thúc ván')
  expect(JSON.stringify(room)).toBe(before)
})

it('bàn khóa không mật khẩu cho vào tự do và chỉ tài khoản tạo được nhận quyền chủ', () => {
  const service = new RoomService(new RoomRepository())
  const summary = service.create('Bàn', 10, 60, undefined, '', 'xiangqi', 'creator')
  expect(summary).toMatchObject({ locked: true, passwordRequired: false })
  const room = service.join(summary.id, 'intruder', 'Khách', undefined, false, 'other')
  expect(room.ownerId).toBeUndefined()
  service.join(summary.id, 'creator-socket', 'Chủ', undefined, false, 'creator')
  expect(room.ownerId).toBe('creator-socket')
  expect(() => service.command('intruder', { type: 'room-settings', queueBlocked: true, chatBlocked: true })).toThrow('Chỉ chủ')
})

it('chặn hàng giải phóng toàn bộ hàng chờ, chặn vào lại và giữ hai người trên bàn', () => {
  const { service, room } = setup()
  service.command('viewer', { type: 'join-queue' })
  const seats = room.players.map(p => p.id)
  service.command('owner', { type: 'room-settings', queueBlocked: true, chatBlocked: false })
  expect(room.viewers?.every(p => !p.queued)).toBe(true)
  expect(room.players.map(p => p.id)).toEqual(seats)
  expect(() => service.command('viewer', { type: 'join-queue' })).toThrow('Đã chặn vào hàng')
  service.command('owner', { type: 'room-settings', queueBlocked: false, chatBlocked: false })
  expect(() => service.command('viewer', { type: 'join-queue' })).not.toThrow()
})

it('bàn khóa đếm bắt đầu thay vì đẩy ghế chưa ready, sau ván chỉ đổi người thua khác chủ', () => {
  const { service, room, advance } = setup()
  service.command('viewer', { type: 'join-queue' })
  advance(10_000)
  expect(room.game.phase).toBe('ready')
  expect(room.readyCountdown).toBe(21)
  service.command('owner', { type: 'ready' })
  advance(19_999)
  expect(room.players.map(p => p.id)).toEqual(['owner', 'player'])
  service.command('player', { type: 'ready' })
  service.command('player', { type: 'resign' })
  for (const player of room.players) service.command(player.id, { type: 'result-presentation-complete', matchId: room.lastCompletedMatch!.id })
  advance(3000)
  expect(room.players.map(p => p.id)).toEqual(['owner', 'viewer'])
  expect(room.viewers?.find(p => p.id === 'player')?.queued).toBe(false)
})

it('chặn chat chung và riêng được xác thực ở server, chủ phòng vẫn nhắn được', () => {
  const { service, room } = setup()
  service.command('owner', { type: 'room-settings', queueBlocked: false, chatBlocked: true })
  expect(() => service.chat('player', 'abc')).toThrow('Đã chặn chat')
  expect(() => service.chat('viewer', 'abc')).toThrow('Đã chặn chat')
  expect(() => service.chat('owner', 'abc')).not.toThrow()
  service.command('owner', { type: 'room-settings', queueBlocked: false, chatBlocked: false })
  service.command('owner', { type: 'moderate', targetId: 'player', action: 'mute' })
  expect(() => service.chat('player', 'abc')).toThrow('Đã chặn chat')
  expect(() => service.chat('viewer', 'abc')).not.toThrow()
  service.command('owner', { type: 'moderate', targetId: 'player', action: 'unmute' })
  expect(() => service.chat('player', 'abc')).not.toThrow()
  expect(room.messages.at(-1)?.text).toBe('abc')
})

it('chủ phòng thua vẫn giữ ghế và người đang đợi chưa được thay người thắng', () => {
  const { service, room, advance } = setup()
  service.command('viewer', { type: 'join-queue' })
  service.command('owner', { type: 'ready' })
  service.command('player', { type: 'ready' })
  service.command('owner', { type: 'resign' })
  advance(10_000)
  expect(room.players.map(p => p.id)).toEqual(['owner', 'player'])
  expect(room.viewers?.find(p => p.id === 'viewer')?.queued).toBe(true)
})

it('chỉ chủ được đưa xuống xem/lên ghế trống/đuổi và không được tác động chính mình', () => {
  const { service, room } = setup()
  expect(() => service.command('viewer', { type: 'moderate', targetId: 'player', action: 'kick' })).toThrow('Chỉ chủ')
  expect(() => service.command('owner', { type: 'moderate', targetId: 'owner', action: 'mute' })).toThrow('không hợp lệ')
  service.command('owner', { type: 'moderate', targetId: 'player', action: 'demote' })
  expect(room.viewers?.find(p => p.id === 'player')?.queued).toBe(false)
  expect(room.players).toHaveLength(1)
  service.command('owner', { type: 'moderate', targetId: 'viewer', action: 'promote' })
  expect(room.players.map(p => p.id)).toEqual(['owner', 'viewer'])
  service.command('owner', { type: 'moderate', targetId: 'player', action: 'kick' })
  expect(service.roomFor('player')).toBeUndefined()
  service.leave('owner')
  expect(room.ownerId).toBe('viewer')
})

it.each([false, true])('đưa người View thay đối thủ trên bàn kể cả khi đối thủ sẵn sàng=%s', ready => {
  const { service, room } = setup()
  service.command('viewer', { type: 'join-queue' })
  if (ready) service.command('player', { type: 'ready' })
  const side = room.players.find(player => player.id === 'player')!.side
  service.command('owner', { type: 'moderate', targetId: 'viewer', action: 'promote' })
  expect(room.players.map(player => player.id)).toEqual(['owner', 'viewer'])
  expect(room.players.find(player => player.id === 'viewer')).toMatchObject({ side, ready: false })
  expect(room.players.every(player => !player.ready)).toBe(true)
  expect(room.viewers).toContainEqual({ id: 'player', name: 'Người chơi', queued: true })
  expect(room.viewers?.some(viewer => viewer.id === 'viewer')).toBe(false)
  expect(room.game.phase).toBe('ready')
})

// HOST QUEUE V3 REGRESSION

it('owner promote puts displaced player at queue position one', () => {
  const { service, room } = setup()
  service.join(room.id, 'next', 'Minh')

  service.command('viewer', { type: 'join-queue' })
  service.command('next', { type: 'join-queue' })

  service.command('owner', {
    type: 'moderate',
    targetId: 'viewer',
    action: 'promote',
  })

  expect(room.players.map(p => p.id)).toEqual(['owner', 'viewer'])
  expect(room.viewers?.filter(v => v.queued).map(v => v.id))
    .toEqual(['player', 'next'])
  expect(room.viewers?.find(v => v.id === 'player')?.queued)
    .toBe(true)
  expect(room.viewers?.some(v => v.id === 'viewer')).toBe(false)
})

it('owner repeated promote always prioritizes last displaced player', () => {
  const { service, room } = setup()
  service.join(room.id, 'next', 'Minh')

  service.command('viewer', { type: 'join-queue' })
  service.command('next', { type: 'join-queue' })

  service.command('owner', {
    type: 'moderate',
    targetId: 'viewer',
    action: 'promote',
  })

  service.command('owner', {
    type: 'moderate',
    targetId: 'next',
    action: 'promote',
  })

  expect(room.players.map(p => p.id)).toEqual(['owner', 'next'])
  expect(room.viewers?.filter(v => v.queued).map(v => v.id))
    .toEqual(['viewer', 'player'])
  expect(room.viewers?.some(v => v.id === 'next')).toBe(false)
})

it('owner demote sends player to view but never to queue', () => {
  const { service, room } = setup()

  service.command('owner', {
    type: 'moderate',
    targetId: 'player',
    action: 'demote',
  })

  expect(room.players.map(p => p.id)).toEqual(['owner'])
  expect(room.viewers?.find(v => v.id === 'player')?.queued)
    .toBe(false)
})

it('non owner cannot promote a viewer', () => {
  const { service, room } = setup()

  expect(() => service.command('player', {
    type: 'moderate',
    targetId: 'viewer',
    action: 'promote',
  })).toThrow('Chỉ chủ')

  expect(room.players.map(p => p.id)).toEqual(['owner', 'player'])
  expect(room.viewers?.find(v => v.id === 'viewer')?.queued)
    .toBe(false)
})
it('không thay người đang đấu dở bằng thao tác đưa lên bàn', () => {
  const { service, room } = setup()
  service.command('owner', { type: 'ready' })
  service.command('player', { type: 'ready' })
  expect(() => service.command('owner', { type: 'moderate', targetId: 'viewer', action: 'promote' })).toThrow('kết thúc ván')
  expect(room.players.map(player => player.id)).toEqual(['owner', 'player'])
  expect(room.game.phase).toBe('playing')
})


it('chủ đưa người xuống View thì người đầu hàng lên sau 1 giây, giữ FIFO', () => {
  const { service, room, advance } = setup()
  service.join(room.id, 'next', 'Chờ sau')
  service.command('viewer', { type: 'join-queue' })
  service.command('next', { type: 'join-queue' })
  service.command('owner', { type: 'moderate', targetId: 'player', action: 'demote' })
  expect(room.players.map(p => p.id)).toEqual(['owner'])
  advance(999)
  expect(room.players.map(p => p.id)).toEqual(['owner'])
  advance(1)
  expect(room.players.map(p => p.id)).toEqual(['owner', 'viewer'])
  expect(room.viewers?.find(p => p.id === 'player')?.queued).toBe(false)
  expect(room.viewers?.find(p => p.id === 'next')?.queued).toBe(true)
})
