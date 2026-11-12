import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

for (const variant of ['xiangqi', 'jieqi'] as const) {
  const setup = () => {
    let now = 0
    const exhausted = new Set<string>()
    const repository = new RoomRepository(undefined, () => true, id => !exhausted.has(id))
    const service = new RoomService(repository, () => now)
    const id = service.create('Bàn thường', 10, 60, undefined, undefined, variant).id
    service.join(id, 'a', 'An')
    const room = service.join(id, 'b', 'Binh')
    return { repository, service, id, room, exhausted, tick: () => { now = 3000; service.tick() } }
  }
  it(`${variant}: promotes an eligible ordinary viewer only after the last seat leaves`, () => {
    const { repository, service, id, room, exhausted } = setup()
    service.join(id, 'empty-first', 'Het luc', undefined, false)
    service.join(id, 'c', 'Nguoi xem', undefined, false, 'account-c')
    exhausted.add('empty-first')
    service.leave('a')
    expect(room.players.map(p => p.id)).toEqual(['b'])
    service.leave('b')
    expect(repository.get(id)).toBe(room)
    expect(room.players).toEqual([expect.objectContaining({ id: 'c', userId: 'account-c', ready: false })])
    expect(room.ownerId).toBe('c')
  })
  it(`${variant}: deletes the ordinary room when nobody remains`, () => {
    const { repository, service, id } = setup()
    service.leave('a'); service.leave('b')
    expect(repository.get(id)).toBeUndefined()
    expect(service.list().some(room => room.id === id)).toBe(false)
  })
  it(`${variant}: closes an unseated ordinary room if all remaining viewers lack energy`, () => {
    const { repository, service, id, room, exhausted } = setup()
    service.join(id, 'empty-c', 'Chi', undefined, false)
    service.join(id, 'empty-d', 'Dung', undefined, false)
    exhausted.add('empty-c'); exhausted.add('empty-d')
    service.leave('a'); service.leave('b')
    expect(repository.get(id)).toBeUndefined()
    expect(room.players).toEqual([])
    expect(room.viewers).toEqual([])
    expect(service.roomFor('empty-c')).toBeUndefined()
    expect(service.roomFor('empty-d')).toBeUndefined()
    expect(service.takeEnergyRemovals(id)).toEqual(['empty-c', 'empty-d'])
    expect(service.takeEnergyNotices(id)).toEqual(['empty-c', 'empty-d'])
    expect(service.list().some(room => room.id === id)).toBe(false)
  })
  it(`${variant}: fills the last seat after the remaining player is demoted for exhausted energy`, () => {
    const { repository, service, id, room, exhausted, tick } = setup()
    service.join(id, 'c', 'Chi')
    service.command('a', { type: 'ready' }); service.command('b', { type: 'ready' })
    exhausted.add('b')
    service.leave('a')
    tick()
    expect(repository.get(id)).toBe(room)
    expect(room.players.map(player => player.id)).toEqual(['c'])
    expect(room.ownerId).toBe('c')
  })
}
