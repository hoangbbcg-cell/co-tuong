import { afterEach, expect, it, vi } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { positionFen } from '../src/game/state/customPosition'
import { createInitialBoard } from '../src/game/state/initial'

afterEach(() => vi.restoreAllMocks())
for (const variant of ['xiangqi', 'jieqi'] as const) {
  it(`${variant}: hides an unjoined ordinary table without deleting it at sixty seconds`, () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(1000)
    const repository = new RoomRepository(), service = new RoomService(repository, () => 0)
    const id = service.create('Chua vao', 10, 60, undefined, undefined, variant).id
    expect(service.list().some(room => room.id === id)).toBe(false)
    now.mockReturnValue(60999)
    service.tick()
    expect(repository.get(id)).toBeTruthy()
    now.mockReturnValue(61000)
    service.tick()
    expect(repository.get(id)).toBeTruthy()
    now.mockReturnValue(301000)
    expect(service.join(id, 'late', 'Muon').players.map(player => player.id)).toEqual(['late'])
  })
  it(`${variant}: keeps a table once its owner sits, even if waiting alone`, () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(1000)
    const repository = new RoomRepository(), service = new RoomService(repository, () => 0)
    const id = service.create('Cho doi', 10, 60, undefined, undefined, variant).id
    now.mockReturnValue(60999)
    service.join(id, 'owner', 'Chu')
    now.mockReturnValue(3600000)
    service.tick()
    expect(repository.get(id)?.players.map(player => player.id)).toEqual(['owner'])
    expect(service.list().some(room => room.id === id)).toBe(true)
  })
}
it('does not delete locked/custom tables at sixty seconds either', () => {
  const now = vi.spyOn(Date, 'now').mockReturnValue(1000)
  const repository = new RoomRepository(), service = new RoomService(repository, () => 0)
  const locked = service.create('Khoa', 10, 60, undefined, '').id
  const custom = service.create('The rieng', 10, 60, undefined, undefined, 'xiangqi', undefined, positionFen(createInitialBoard(), 'red')).id
  now.mockReturnValue(61000)
  service.tick()
  expect(repository.get(locked)).toBeTruthy()
  expect(repository.get(custom)).toBeTruthy()
  expect(service.list().some(room => room.id === locked)).toBe(true)
})
it('keeps the previous thirty-minute empty cleanup and publishes it when observed by a lobby read', () => {
  const now = vi.spyOn(Date, 'now').mockReturnValue(1000)
  const repository = new RoomRepository(), service = new RoomService(repository, () => 0)
  const id = service.create('Bo do').id
  now.mockReturnValue(1801000)
  expect(service.list()).toEqual([])
  expect(repository.get(id)).toBeUndefined()
  expect(service.tick().map(room => room.id)).toContain(id)
  expect(service.tick()).toEqual([])
})
