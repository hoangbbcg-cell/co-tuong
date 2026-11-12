import { readyCountdownForPlayer } from '../src/lib/roomReadiness'
import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
function setup(locked=false) {
  let now=0
  const service=new RoomService(new RoomRepository(),()=>now,()=> 'red')
  const id=service.create('Rematch',10,60,undefined,locked?'':undefined).id
  service.join(id,'a','An');const room=service.join(id,'b','Binh')
  service.command('a',{type:'ready'});service.command('b',{type:'ready'})
  now=2000;service.command('a',{type:'resign'})
  const ack=(id:string)=>service.command(id,{type:'result-presentation-complete',matchId:room.lastCompletedMatch!.id})
  return {service,room,ack,setTime:(time:number)=>{now=time;service.tick()}}
}
it.each([false,true])('counts down from three seconds after match finish when the same pair remains; locked=%s',locked=>{
  const {service,room,ack,setTime}=setup(locked)
  ack('a');ack('b')
  setTime(6999);expect(room.game.phase).toBe('finished')
  setTime(7000);expect(room.game.phase).toBe('finished');expect(room.readyCountdown).toBe(28)
  expect(room.players.map(p=>p.id)).toEqual(['a','b'])
  expect(readyCountdownForPlayer(room,'a')).toBe(28)
  expect(readyCountdownForPlayer(room,'b')).toBe(28)
  expect(readyCountdownForPlayer(room,'viewer')).toBeNull()
  setTime(8000);expect(room.readyCountdown).toBe(27)
  setTime(37000);expect(room.game.phase).toBe('playing')
  expect(service.roomFor('a')!.lastCompletedMatch).toBeUndefined()
})
it('waits for actual presentation completion instead of cutting off audio at five seconds',()=>{
  const {room,ack,setTime}=setup()
  ack('a');setTime(10000);expect(room.game.phase).toBe('finished')
  expect(room.readyCountdown).toBe(25)
  setTime(37000);expect(room.game.phase).toBe('finished');expect(room.readyCountdown).toBe(0)
  ack('b');setTime(37001);expect(room.game.phase).toBe('playing')
})
it('does not restart after a participant leaves',()=>{
  const {service,room,ack,setTime}=setup()
  ack('a');ack('b');service.leave('b');setTime(10000)
  expect(room.readyCountdown).toBeNull();expect(room.players).toHaveLength(1)
})
it('late queue entry waits for the next completed match',()=>{
  const {service,room,ack,setTime}=setup()
  service.join(room.id,'c','Cho');service.command('c',{type:'join-queue'})
  ack('a');ack('b');setTime(7000)
  expect(room.players.map(p=>p.id)).toEqual(['a','b'])
  expect(room.viewers?.find(v=>v.id==='c')?.queued).toBe(true)
})

it('keeps the countdown keyed to the durable match ID assigned by persistence',()=>{
  let now=0
  const repo=new RoomRepository(room=>{if(room.game.phase==='finished'&&room.lastCompletedMatch)room.lastCompletedMatch.id='durable-match-id'})
  const service=new RoomService(repo,()=>now,()=> 'red')
  const id=service.create('Persisted').id
  service.join(id,'a','An');const room=service.join(id,'b','Binh')
  service.command('a',{type:'ready'});service.command('b',{type:'ready'})
  now=2000;service.command('a',{type:'resign'})
  expect(room.lastCompletedMatch!.id).toBe('durable-match-id')
  now=7000;service.tick()
  expect(room.readyCountdown).toBe(28)
  service.command('a',{type:'result-presentation-complete',matchId:'durable-match-id'})
  service.command('b',{type:'result-presentation-complete',matchId:'durable-match-id'})
  now=37000;service.tick();expect(room.game.phase).toBe('playing')
})
