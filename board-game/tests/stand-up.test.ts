import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
function setup(locked=false){
  let now=0
  const service=new RoomService(new RoomRepository(),()=>now,()=> 'red')
  const id=service.create('Down',10,60,undefined,locked?'':undefined).id
  service.join(id,'a','An',undefined,false,'1');const room=service.join(id,'b','Binh',undefined,false,'2')
  return {service,room,setTime:(time:number)=>{now=time}}
}
it.each([false,true])('keeps a standing player inside the room as a non-queued viewer; locked=%s',locked=>{
  const {service,room}=setup(locked)
  service.join(room.id,'c','Cho');service.command('c',{type:'join-queue'})
  service.command('a',{type:'stand-up'})
  expect(room.players.map(p=>p.id)).toEqual(['b','c'])
  expect(room.viewers).toContainEqual({id:'a',userId:'1',name:'An',queued:false})
  expect(service.roomFor('a')?.id).toBe(room.id)
  expect(room.ownerId).toBe('b')
  expect(service.list()[0].ownerName).toBe('Binh')
})
it('finishes the real match as a loss before moving the participant to view',()=>{
  const {service,room,setTime}=setup()
  service.command('a',{type:'ready'});service.command('b',{type:'ready'})
  setTime(2500);service.command('a',{type:'stand-up'})
  expect(room.game.result).toEqual({winner:'black',reason:'leave'})
  expect(room.lastCompletedMatch?.redName).toBe('An')
  expect(room.lastCompletedMatch?.blackName).toBe('Binh')
  expect(room.players.map(p=>p.id)).toEqual(['b'])
  expect(room.viewers?.find(v=>v.id==='a')?.queued).toBe(false)
})
it('rejects spectators and duplicate stand-up requests without changing seats',()=>{
  const {service,room}=setup()
  service.join(room.id,'v','View')
  expect(()=>service.command('v',{type:'stand-up'})).toThrow('Chỉ người đang trên bàn')
  expect(room.players.map(p=>p.id)).toEqual(['a','b'])
  service.command('a',{type:'stand-up'})
  expect(()=>service.command('a',{type:'stand-up'})).toThrow('Chỉ người đang trên bàn')
  expect(room.viewers?.filter(v=>v.id==='a')).toHaveLength(1)
})
it('does not force the sole player back onto the seat or delete their room',()=>{
  const service=new RoomService(new RoomRepository(),()=>0)
  const id=service.create('Solo').id
  service.join(id,'a','An')
  expect(()=>service.command('a',{type:'stand-up'})).toThrow('Cần đủ hai người trên bàn')
  const room=service.roomFor('a')!
  expect(room.players.map(p=>p.id)).toEqual(['a'])
  expect(room.viewers).toEqual([])
  expect(service.list()).toHaveLength(1)
  expect(room.ownerId).toBe('a')
})
it('does not rewrite a finished result when standing up afterwards',()=>{
  const {service,room}=setup()
  service.command('a',{type:'ready'});service.command('b',{type:'ready'})
  service.command('a',{type:'resign'})
  const id=room.lastCompletedMatch!.id
  service.command('a',{type:'stand-up'})
  expect(room.lastCompletedMatch!.id).toBe(id)
})
