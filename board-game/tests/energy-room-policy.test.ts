import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { finishGame } from '../src/game/moves/actions'
import { ChallengeRepository } from '../server/repositories/challengeRepository'
import { ChallengeService } from '../server/services/challengeService'

function setup(waiters = 1, locked = false) {
  let now = 0
  const exhausted = new Set<string>()
  const hasEnergy = (id: string) => !exhausted.has(id)
  const service = new RoomService(new RoomRepository(undefined, room => room.players.every(player => hasEnergy(player.id)), hasEnergy), () => now, () => 'red')
  const id = service.create('Bàn năng lượng', 10, 60, undefined, locked ? '' : undefined).id
  service.join(id, 'a', 'PlayerA')
  const room = service.join(id, 'b', 'PlayerB')
  for (const player of ['c', 'd'].slice(0, waiters)) {
    service.join(id, player, `Player${player.toUpperCase()}`)
    service.command(player, { type: 'join-queue' })
  }
  service.command('a', { type: 'ready' })
  service.command('b', { type: 'ready' })
  now = 2000
  return { service, room, id, exhausted, rotate: () => {
    if (room.game.phase === 'finished') for (const player of [...room.players]) service.command(player.id, { type: 'result-presentation-complete', matchId: room.lastCompletedMatch!.id })
    now += 2001; service.tick()
  } }
}

it('replaces an exhausted winner before a healthy loser and notifies only that winner', () => {
  const { service, room, exhausted, rotate } = setup()
  exhausted.add('a')
  service.command('b', { type: 'resign' })
  expect(room.players.map(player => player.id)).toEqual(['a', 'b'])
  rotate()
  expect(room.players.map(player => player.id)).toEqual(['c', 'b'])
  expect(room.viewers).toContainEqual({ id: 'a', name: 'PlayerA', queued: false })
  expect(service.takeEnergyNotices(room.id)).toEqual(['a'])
  expect(service.takeEnergyNotices(room.id)).toEqual([])
})

it('uses the losing player when everyone has energy', () => {
  const { service, room, rotate } = setup()
  service.command('b', { type: 'resign' })
  rotate()
  expect(room.players.map(player => player.id)).toEqual(['a', 'c'])
  expect(room.viewers).toContainEqual({ id: 'b', name: 'PlayerB', queued: false })
  expect(service.takeEnergyNotices(room.id)).toEqual([])
})

it.each([false, true])('keeps exhausted players seated without a queue; locked=%s', locked => {
  const { service, room, id, exhausted, rotate } = setup(0, locked)
  service.join(id, 'c', 'PlayerC')
  exhausted.add('a'); exhausted.add('b')
  service.command('b', { type: 'resign' })
  rotate()
  expect(room.players.map(player => player.id)).toEqual(['a', 'b'])
  expect(service.takeEnergyNotices(id)).toEqual([])
})

it('replaces both exhausted players when two eligible people are waiting', () => {
  const { service, room, exhausted, rotate } = setup(2)
  exhausted.add('a'); exhausted.add('b')
  service.command('b', { type: 'resign' })
  rotate()
  expect(room.players.map(player => player.id).sort()).toEqual(['c', 'd'])
  expect(room.viewers?.filter(viewer => viewer.queued)).toEqual([])
  expect(service.takeEnergyNotices(room.id).sort()).toEqual(['a', 'b'])
})

it('with one waiter, replaces the exhausted loser first when both players are exhausted', () => {
  const { service, room, exhausted, rotate } = setup()
  exhausted.add('a'); exhausted.add('b')
  service.command('b', { type: 'resign' })
  rotate()
  expect(room.players.map(player => player.id)).toEqual(['c'])
  expect(service.takeEnergyNotices(room.id).sort()).toEqual(['a','b'])
})

it('also replaces exhausted players after a draw', () => {
  const { service, room, exhausted, rotate } = setup()
  exhausted.add('a')
  room.game = finishGame(room.game, null, 'draw')
  service.tick()
  rotate()
  expect(room.players.map(player => player.id)).toEqual(['c', 'b'])
})

it('also replaces an exhausted remaining player after the opponent leaves if another waiter remains', () => {
  const { service, room, exhausted, rotate } = setup(2)
  exhausted.add('a')
  service.leave('b')
  rotate()
  expect(room.players.map(player => player.id).sort()).toEqual(['c', 'd'])
  expect(service.takeEnergyNotices(room.id)).toEqual(['a'])
})

it('applies energy priority before replacing a non-owner loser in locked rooms', () => {
  const healthy = setup(1, true)
  healthy.service.command('b', { type: 'resign' })
  healthy.rotate()
  expect(healthy.room.players.map(player => player.id)).toEqual(['a', 'c'])
  const depleted = setup(1, true)
  depleted.exhausted.add('a')
  depleted.service.command('b', { type: 'resign' })
  depleted.rotate()
  expect(depleted.room.players.map(player => player.id)).toEqual(['a', 'c'])
})

it('allows zero energy users to enter an unstarted room as viewers but rejects queueing', () => {
  const exhausted = new Set(['zero'])
  const service = new RoomService(new RoomRepository(undefined, undefined, id => !exhausted.has(id)))
  const id = service.create('Bàn').id
  const room = service.join(id, 'zero', 'PlayerZero')
  expect(room.players).toHaveLength(0)
  expect(room.viewers).toContainEqual({ id: 'zero', name: 'PlayerZero', queued: false })
  expect(() => service.command('zero', { type: 'join-queue' })).toThrow('Không đủ năng lượng.')
  exhausted.delete('zero')
  service.command('zero', { type: 'join-queue' })
  expect(room.players.map(player => player.id)).toEqual(['zero'])
})

it('skips queued users whose energy ran out before promotion', () => {
  const { service, room, exhausted, rotate } = setup(2)
  exhausted.add('c')
  service.command('b', { type: 'resign' })
  rotate()
  expect(room.players.map(player => player.id)).toEqual(['a', 'd'])
  expect(room.viewers?.find(viewer => viewer.id === 'c')?.queued).toBe(false)
  expect(service.takeEnergyNotices(room.id)).toEqual(['c'])
})

it('does not allow an exhausted seated player to ready or a locked-room owner to promote an exhausted viewer', () => {
  const { service, room, id, exhausted } = setup(0, true)
  service.command('b', { type: 'resign' })
  exhausted.add('a')
  expect(() => service.command('a', { type: 'ready' })).toThrow('Không đủ năng lượng.')
  exhausted.add('c')
  service.join(id, 'c', 'PlayerC')
  expect(() => service.command('a', { type: 'moderate', targetId: 'c', action: 'promote' })).toThrow()
  expect(room.players.some(player => player.id === 'c')).toBe(false)
})

function challenges() {
  const exhausted = new Set<string>()
  const rooms = new RoomService(new RoomRepository(undefined, undefined, id => !exhausted.has(id)))
  const service = new ChallengeService(new ChallengeRepository(), rooms)
  for (const [id, name] of [['a', 'PlayerA'], ['b', 'PlayerB']]) service.update(id, { name, avatarIndex: 0, avatarFrameIndex: 0, elo: 1000, localBusy: false })
  return { exhausted, rooms, service }
}

it('blocks room creation through invitations if either participant has no energy', () => {
  const { exhausted, rooms, service } = challenges()
  exhausted.add('a')
  expect(() => service.send('a', { id: 'b', name: 'PlayerB' })).toThrow('Không đủ năng lượng.')
  exhausted.delete('a')
  const { invite } = service.send('a', { id: 'b', name: 'PlayerB' })
  exhausted.add('b')
  expect(() => service.reply('b', { id: invite.id, accepted: true })).toThrow('Không đủ năng lượng.')
  expect(rooms.list()).toEqual([])
  exhausted.delete('b'); exhausted.add('a')
  expect(() => service.reply('b', { id: invite.id, accepted: true })).toThrow('Không đủ năng lượng.')
  expect(rooms.list()).toEqual([])
})

it('permits an invitation into an existing room without creating another room for zero energy users', () => {
  const { exhausted, rooms, service } = challenges()
  const id = rooms.create('Bàn có sẵn').id
  rooms.join(id, 'a', 'PlayerA')
  exhausted.add('a'); exhausted.add('b')
  const { invite } = service.send('a', { id: 'b', name: 'PlayerB' })
  const { room } = service.reply('b', { id: invite.id, accepted: true })
  expect(room?.id).toBe(id)
  expect(room?.viewers).toContainEqual({ id: 'b', name: 'PlayerB', queued: false })
  expect(rooms.list()).toHaveLength(1)
})

it.each([false,true])('transfers the demoted owner to the winning opponent, not the queued newcomer; locked=%s', locked => {
  const {service,room,id,exhausted,rotate}=setup(1,locked)
  expect(room.ownerId).toBe('a')
  if(locked)exhausted.add('a')
  service.command('a',{type:'resign'})
  rotate()
  if(locked){
    expect(room.players.map(player=>player.id)).toEqual(['a','b'])
    expect(room.ownerId).toBe('a')
    return
  }
  expect(room.players.map(player=>player.id)).toEqual(['c','b'])
  expect(room.ownerId).toBe('b')
  expect(service.list().find(summary=>summary.id===id)).toMatchObject({ownerName:'PlayerB'})
  expect(room.viewers?.find(viewer=>viewer.id==='a')).toMatchObject({queued:false})
  if(locked){
    expect(()=>service.command('a',{type:'room-settings',queueBlocked:false,chatBlocked:false})).toThrow('Chỉ chủ')
    expect(()=>service.command('b',{type:'room-settings',queueBlocked:false,chatBlocked:false})).not.toThrow()
  }
})

it.each([false,true])('demotes depleted players after the game without a queue, except the locked owner; locked=%s',locked=>{
  let now=0
  const exhausted=new Set<string>()
  const service=new RoomService(new RoomRepository(undefined,()=>true,id=>!exhausted.has(id)),()=>now,()=> 'red')
  const id=service.create('Energy',10,60,undefined,locked?'':undefined).id
  service.join(id,'a','An');const room=service.join(id,'b','Binh')
  service.command('a',{type:'ready'});service.command('b',{type:'ready'})
  exhausted.add('a');exhausted.add('b')
  now=2000;service.command('b',{type:'resign'})
  now=6999;service.tick();expect(room.players).toHaveLength(2)
  now=7000;service.tick()
  expect(room.players.map(player=>player.id)).toEqual(locked?['a']:[])
  expect(room.viewers?.map(viewer=>viewer.id).sort()).toEqual(locked?['b']:['a','b'])
  expect(service.takeEnergyNotices(id).sort()).toEqual(locked?['b']:['a','b'])
  expect(room.readyCountdown).toBeNull()
})
