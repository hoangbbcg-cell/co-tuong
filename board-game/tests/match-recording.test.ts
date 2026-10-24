import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
it('archives for late spectators and retains players through queue rotation', () => {
  let now = 0
  const service = new RoomService(new RoomRepository(), () => now, () => 'red')
  const { id } = service.create('Saved')
  service.join(id, 'red', 'Red'); service.join(id, 'black', 'Black')
  service.command('red', { type: 'ready' }); service.command('black', { type: 'ready' })
  now = 1300
  service.command('red', { type: 'move', move: { from: { row: 6, col: 0 }, to: { row: 5, col: 0 } } })
  service.join(id, 'viewer', 'Viewer')
  service.command('viewer', { type: 'join-queue' })
  const room = service.command('black', { type: 'resign' })
  const recording = room.lastCompletedMatch!
  expect(recording.states).toHaveLength(2)
  expect(recording.states[0].board[6][0]?.side).toBe('red')
  expect(recording.states[1].board[5][0]?.side).toBe('red')
  expect(recording.states[1].phase).toBe('finished')
  now += 3000; service.tick()
  expect(room.game.phase).toBe('ready')
  expect(room.lastCompletedMatch?.blackName).toBe('Black')
  expect(room.lastCompletedMatch?.id).toBe(recording.id)
  service.command('red', { type: 'ready' }); service.command('viewer', { type: 'ready' })
  expect(room.lastCompletedMatch).toBeUndefined()
})
