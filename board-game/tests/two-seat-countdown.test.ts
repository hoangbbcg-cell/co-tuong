import { expect,it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { MATCH_INTRO_MS } from '../src/game/moves/actions'
import { readyCountdownForPlayer } from '../src/lib/roomReadiness'

it.each([false,true])('two seats get30s without a queue; locked=%s',locked=>{
  let now=0
  const service=new RoomService(new RoomRepository(),()=>now,()=> 'red')
  const password=locked?'secret':undefined
  const id=service.create('Countdown',10,60,undefined,password).id
  service.join(id,'a','An',password)
  now=60_000;service.tick()
  expect(service.roomFor('a')!.game.phase).toBe('ready')
  expect(service.roomFor('a')!.readyCountdown).toBeNull()
  const room=service.join(id,'b','Bình',password)
  expect(room.locked).toBe(locked)
  expect(readyCountdownForPlayer(room,'a')).toBeNull()
  now=60_999;service.tick();expect(room.readyCountdown).toBeNull()
  now=61_000;service.tick()
  expect(readyCountdownForPlayer(room,'a')).toBe(30)
  expect(readyCountdownForPlayer(room,'b')).toBe(30)
  now=71_000;service.command('a',{type:'ready'})
  expect(room.readyCountdown).toBe(20)
  now=90_999;service.tick();expect(room.game.phase).toBe('ready');expect(room.readyCountdown).toBe(1)
  now=91_000;service.tick();expect(room.game.phase).toBe('playing')
  expect(room.game.lastClockUpdate).toBe(91_000+MATCH_INTRO_MS)
  expect(room.players.map(p=>p.id)).toEqual(['a','b'])
})
it('viewer arrivals and queue toggles never restart or cancel the seated-pair deadline',()=>{
  let now=0;const service=new RoomService(new RoomRepository(),()=>now)
  const id=service.create('Countdown').id
  service.join(id,'a','An');const room=service.join(id,'b','Bình')
  now=10_000;service.join(id,'v','View');service.command('v',{type:'join-queue'})
  expect(room.readyCountdown).toBe(21)
  expect(readyCountdownForPlayer(room,'v')).toBeNull()
  now=15_000;service.command('v',{type:'leave-queue'});service.leave('v')
  expect(room.readyCountdown).toBe(16)
  now=31_000;service.tick();expect(room.game.phase).toBe('playing')
})
it('losing a seat cancels the countdown and a new pair gets a fresh30s',()=>{
  let now=0;const service=new RoomService(new RoomRepository(),()=>now)
  const id=service.create('Countdown').id
  service.join(id,'a','An');const room=service.join(id,'b','Bình')
  now=10_000;service.leave('b');expect(room.readyCountdown).toBeNull()
  now=40_000;service.tick();expect(room.game.phase).toBe('ready')
  service.join(id,'c','Cường');expect(room.readyCountdown).toBeNull()
  now=41_000;service.tick();expect(room.readyCountdown).toBe(30)
  now=70_999;service.tick();expect(room.game.phase).toBe('ready')
  now=71_000;service.tick();expect(room.game.phase).toBe('playing')
})