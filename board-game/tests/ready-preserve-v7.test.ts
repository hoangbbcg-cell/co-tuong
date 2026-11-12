import { expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

it.each([false, true])(
  'first Ready does not restart countdown; locked=%s',
  locked => {
    let now = 0
    const service = new RoomService(
      new RoomRepository(), () => now, () => 'red',
    )

    const id = service.create(
      'Ready Preserve V7',
      10, 60, undefined,
      locked ? '' : undefined,
    ).id

    service.join(id, 'a', 'Owner')
    const room = service.join(id, 'b', 'Opponent')

    if (locked) {
      service.command('a', {
        type: 'room-settings',
        queueBlocked: false,
        chatBlocked: false,
        keepOwnerSeat: true,
      })
    }

    service.command('a', { type: 'ready' })
    service.command('b', { type: 'ready' })
    expect(room.game.phase).toBe('playing')

    now = 2000
    service.command('b', { type: 'resign' })
    const matchId = room.lastCompletedMatch!.id

    for (const player of [...room.players]) {
      service.command(player.id, {
        type: 'result-presentation-complete',
        matchId,
      })
    }

    now = 5000
    service.tick()
    expect(room.readyCountdown).toBe(30)

    now = 12000
    service.tick()
    expect(room.readyCountdown).toBe(23)

    // Player A clicks when 23 seconds are left.
    service.command('a', { type: 'ready' })
    expect(room.game.phase).toBe('ready')
    expect(room.readyCountdown).toBe(23)

    now = 13000
    service.tick()
    expect(room.readyCountdown).toBe(22)

    // Player B confirms: existing immediate-start rule remains.
    service.command('b', { type: 'ready' })
    expect(room.game.phase).toBe('playing')
  },
)

it('Keep Seat helper note is removed but the toggle remains', () => {
  const ui = readFileSync(
    new URL(
      '../src/features/game/components/RoomModerationDialogs.tsx',
      import.meta.url,
    ),
    'utf8',
  )

  expect(ui).toContain('aria-label="Giữ ghế"')
  expect(ui).toContain('control.keepOwnerSeat')
  expect(ui).toContain('control.settings(')

  expect(ui).not.toContain(
    'Chủ bàn giữ ghế dù thắng, thua hoặc hòa.',
  )
  expect(ui).not.toContain(
    'Không miễn điều kiện năng lượng.',
  )
})

it('existing finish-time queue rules remain in source', () => {
  const source = readFileSync(
    new URL('../server/services/roomService.ts', import.meta.url),
    'utf8',
  )

  expect(source).toContain('queuedAtFinish')
  expect(source).toContain('notBefore: this.now() + 3000')
})