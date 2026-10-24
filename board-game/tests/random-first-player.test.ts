import { beforeEach, expect, it, vi } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

const draw = vi.hoisted(() => ({ value: 0, pick: vi.fn() }))
vi.mock('node:crypto', async importOriginal => {
  const crypto = await importOriginal<typeof import('node:crypto')>()
  return { ...crypto, randomInt: (min: number, max?: number) => {
    if (min === 0 && max === 2) { draw.pick(); return draw.value }
    return max === undefined ? crypto.randomInt(min) : crypto.randomInt(min, max)
  } }
})
beforeEach(() => { draw.value = 0; draw.pick.mockClear() })

function room() {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now)
  const { id } = service.create('Random first player')
  service.join(id, 'a', 'Player A')
  service.join(id, 'b', 'Player B')
  return { service, id, at: (time: number) => { now = time } }
}
const redMove = { type: 'move', move: { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } } } as const
const blackMove = { type: 'move', move: { from: { row: 3, col: 0 }, to: { row: 4, col: 0 } } } as const

it.each([0, 1])('draws player %i once at start and enforces that player as the first mover', value => {
  draw.value = value
  const { service, at } = room()
  service.command('a', { type: 'ready' })
  expect(draw.pick).not.toHaveBeenCalled()
  const snapshot = service.command('b', { type: 'ready' })
  expect(draw.pick).toHaveBeenCalledTimes(1)
  expect(snapshot.game.currentTurn).toBe('red')
  at(1300)
  const first = value === 0 ? 'a' : 'b', second = value === 0 ? 'b' : 'a'
  expect(snapshot.players.find(player => player.id === first)?.side).toBe('red')
  expect(snapshot.players.find(player => player.id === second)?.side).toBe('black')
  expect(() => service.command(second, blackMove)).toThrow()
  service.command(first, redMove)
  expect(snapshot.game.currentTurn).toBe('black')
  service.command(second, blackMove)
  service.tick()
  expect(draw.pick).toHaveBeenCalledTimes(1)
})

it('draws again for the next game instead of retaining the previous first player', () => {
  const { service } = room()
  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })
  service.command('a', { type: 'resign' })
  service.command('b', { type: 'reset' })
  draw.value = 1
  service.command('a', { type: 'ready' })
  const next = service.command('b', { type: 'ready' })
  expect(next.game.currentTurn).toBe('red')
  expect(next.players.find(player => player.id === 'b')?.side).toBe('red')
  expect(next.players.find(player => player.id === 'a')?.side).toBe('black')
  expect(draw.pick).toHaveBeenCalledTimes(2)
})

it('uses the same draw when a queued room starts automatically', () => {
  draw.value = 1
  const { service, id, at } = room()
  service.join(id, 'viewer', 'Viewer')
  service.command('viewer', { type: 'join-queue' })
  at(30000)
  service.tick()
  expect(service.roomFor('a')?.game.currentTurn).toBe('red')
  expect(service.roomFor('a')?.players.find(player => player.id === 'b')?.side).toBe('red')
  expect(service.roomFor('a')?.game.phase).toBe('playing')
  expect(draw.pick).toHaveBeenCalledTimes(1)
})
