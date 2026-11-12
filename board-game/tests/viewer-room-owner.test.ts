import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { createInitialBoard } from '../src/game/state/initial'
import { positionFen } from '../src/game/state/customPosition'

const variants = [
  { label: 'locked xiangqi', password: '', variant: 'xiangqi' as const },
  { label: 'locked jieqi', password: '', variant: 'jieqi' as const },
  { label: 'unlocked custom', variant: 'xiangqi' as const, customFen: positionFen(createInitialBoard(), 'red') },
  { label: 'locked custom', password: '', variant: 'xiangqi' as const, customFen: positionFen(createInitialBoard(), 'red') },
]

for (const seats of [0, 1, 2]) {
  it.each(variants)(`$label sends every newcomer to View when queue blocked; seats=${seats}`, config => {
    const service = new RoomService(new RoomRepository(), () => 0)
    const id = service.create('Blocked entry', 10, 60, undefined, config.password, config.variant, undefined, config.customFen).id
    const room = service.join(id, 'owner', 'Chu phong')
    if (seats === 2) service.join(id, 'player', 'Doi thu')
    service.command('owner', { type: 'room-settings', queueBlocked: true, chatBlocked: false })
    if (seats === 0) service.command('owner', { type: 'stand-up' })
    const seatedIds = room.players.map(member => member.id)
    service.join(id, 'new', 'Nguoi moi')
    service.join(id, 'invited', 'Duoc moi', undefined, false, undefined, 'owner')
    expect(room.players.map(member => member.id)).toEqual(seatedIds)
    expect(room.viewers?.find(member => member.id === 'new')).toMatchObject({ queued: false })
    expect(room.viewers?.find(member => member.id === 'invited')).toMatchObject({ queued: false })
    expect(() => service.command('new', { type: 'join-queue' })).toThrow('Đã chặn vào hàng')
    expect(room.ownerId).toBe('owner')
    if (seats < 2) {
      service.command('owner', { type: 'moderate', targetId: 'invited', action: 'promote' })
      expect(room.players.some(member => member.id === 'invited')).toBe(true)
    }
    service.command('owner', { type: 'room-settings', queueBlocked: false, chatBlocked: false })
    const hasVacancy = room.players.length < 2
    service.join(id, 'after', 'Mo chan')
    expect(room.players.some(member => member.id === 'after')).toBe(hasVacancy)
  })
}

it.each(variants)('$label keeps both players watching and preserves owner authority until leaving', config => {
  let now = 0
  const repository = new RoomRepository()
  const service = new RoomService(repository, () => now, () => 'red')
  const id = service.create('View owner', 10, 60, undefined, config.password, config.variant, undefined, config.customFen).id
  service.join(id, 'a', 'An')
  const room = service.join(id, 'b', 'Binh')
  service.join(id, 'v', 'Viewer')
  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })
  service.command('a', { type: 'stand-up' })
  expect(room.game.result).toEqual({ winner: 'black', reason: 'leave' })
  const matchId = room.lastCompletedMatch!.id
  expect(room.ownerId).toBe('a')
  service.command('b', { type: 'stand-up' })
  now = 120_000
  service.tick()
  repository.pruneEmpty(Date.now() + 3_600_000)
  expect(repository.get(id)).toBe(room)
  expect(room.players).toEqual([])
  expect(room.viewers?.map(member => [member.id, member.queued])).toEqual([
    ['v', false], ['a', false], ['b', false],
  ])
  expect(room.lastCompletedMatch!.id).toBe(matchId)
  expect(service.roomFor('a')).toBe(room)
  if (!config.customFen) expect(service.list().find(summary => summary.id === id)?.ownerName).toBe('An')
  service.command('a', { type: 'room-settings', queueBlocked: true, chatBlocked: false })
  expect(() => service.command('b', { type: 'room-settings', queueBlocked: false, chatBlocked: false })).toThrow('Chỉ chủ phòng')
  service.join(id, 'new', 'Moi')
  expect(room.ownerId).toBe('a')
  service.leave('new')
  expect(room.players).toEqual([])
  service.command('a', { type: 'moderate', targetId: 'b', action: 'promote' })
  expect(room.players.map(member => member.id)).toEqual(['b'])
  expect(room.ownerId).toBe('a')
  service.leave('a')
  expect(room.ownerId).toBe('b')
  service.leave('b')
  expect(room.players).toEqual([])
  expect(room.ownerId).toBe('v')
  service.leave('v')
  expect(repository.get(id)).toBeUndefined()
})

it.each(variants)('$label lets a sole owner stand and voluntarily return through the queue', config => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const id = service.create('Solo owner', 10, 60, undefined, config.password, config.variant, undefined, config.customFen).id
  const room = service.join(id, 'a', 'An')
  service.command('a', { type: 'stand-up' })
  expect(room.players).toEqual([])
  expect(room.ownerId).toBe('a')
  service.command('a', { type: 'join-queue' })
  expect(room.players.map(member => member.id)).toEqual(['a'])
  expect(room.ownerId).toBe('a')
})

it.each([false, true])('custom owner retains authority after energy demotion; queued=%s', queued => {
  let now = 0
  let exhausted = false
  const service = new RoomService(new RoomRepository(undefined, () => true, id => id !== 'a' || !exhausted), () => now, () => 'red')
  const id = service.create('Energy owner', 10, 60, undefined, undefined, 'xiangqi', undefined, positionFen(createInitialBoard(), 'red')).id
  service.join(id, 'a', 'An')
  const room = service.join(id, 'b', 'Binh')
  if (queued) {
    service.join(id, 'v', 'Viewer')
    service.command('v', { type: 'join-queue' })
  }
  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })
  service.command('a', { type: 'resign' })
  exhausted = true
  now = 3000
  service.tick()
  expect(room.players.some(member => member.id === 'a')).toBe(false)
  expect(room.viewers?.find(member => member.id === 'a')?.queued).toBe(false)
  expect(room.ownerId).toBe('a')
  service.command('a', { type: 'room-settings', queueBlocked: true, chatBlocked: true })
  expect(room.chatBlocked).toBe(true)
})
