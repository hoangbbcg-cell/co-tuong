import { describe, expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

describe('Ready starts immediately', () => {
  function setup() {
    let now = 0
    const service = new RoomService(
      new RoomRepository(),
      () => now,
      () => 'red',
    )
    const id = service.create('Ready immediate').id
    service.join(id, 'a', 'A')
    service.join(id, 'b', 'B')
    return {
      service,
      id,
      setTime: (time: number) => { now = time },
    }
  }

  it('starts on second Ready without waiting 31 seconds', () => {
    const { service, id } = setup()
    service.command('a', { type: 'ready' })
    expect(service.roomFor('a')!.game.phase).toBe('ready')
    service.command('b', { type: 'ready' })
    const room = service.roomFor('a')!
    expect(room.game.phase).toBe('playing')
    expect(room.readyCountdown).toBeNull()
    expect(room.players.map(p => p.id)).toEqual(['a', 'b'])
  })

  it('starts immediately when second Ready arrives at 15 seconds', () => {
    const { service, setTime } = setup()
    service.command('a', { type: 'ready' })
    setTime(15000)
    service.tick()
    expect(service.roomFor('a')!.game.phase).toBe('ready')
    service.command('b', { type: 'ready' })
    expect(service.roomFor('a')!.game.phase).toBe('playing')
  })

  it('one Ready does not start a game', () => {
    const { service, setTime } = setup()
    service.command('a', { type: 'ready' })
    setTime(1000)
    service.tick()
    expect(service.roomFor('a')!.game.phase).toBe('ready')
    expect(service.roomFor('a')!.readyCountdown).toBe(30)
  })
})