import { expect, it } from 'vitest'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'

it('seats the queued viewer before a newcomer and keeps the newcomer watching', () => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const created = service.create('Queue priority')
  service.join(created.id,'a','An')
  const room = service.roomFor('a')!
  service.join(room.id,'b','Binh')
  service.join(room.id,'q','Cho')
  service.command('q',{type:'join-queue'})
  room.players = room.players.filter(player => player.id !== 'b')
  service.join(room.id,'new','Moi')
  expect(room.players.map(player => player.id)).toEqual(['a','q'])
  expect(room.viewers?.find(viewer => viewer.id === 'new')).toMatchObject({queued:false})
})
it('seats a newcomer immediately when no viewer is queued', () => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const created = service.create('No queue')
  service.join(created.id,'a','An')
  const room = service.roomFor('a')!
  service.join(room.id,'new','Moi')
  expect(room.players.map(player => player.id)).toEqual(['a','new'])
})
it('joining queue cannot bypass an existing queued viewer for a vacant seat', () => {
  const service = new RoomService(new RoomRepository(), () => 0)
  const created = service.create('Queue order')
  service.join(created.id,'a','An')
  const room = service.roomFor('a')!
  service.join(room.id,'b','Binh')
  service.join(room.id,'q','Cho'); service.command('q',{type:'join-queue'})
  service.join(room.id,'new','Moi')
  room.players = room.players.filter(player => player.id !== 'b')
  service.command('new',{type:'join-queue'})
  expect(room.players.map(player => player.id)).toEqual(['a','q'])
  expect(room.viewers?.find(viewer => viewer.id === 'new')).toMatchObject({queued:true})
})

it.each([false,true])('promotes the earliest ordinary viewer only after both seated players leave; locked=%s', locked => {
  const service = new RoomService(new RoomRepository(),()=>0)
  const id = service.create('Inheritance',10,60,undefined,locked?'':undefined).id
  service.join(id,'a','An'); const room=service.join(id,'b','Binh')
  service.join(id,'early','Dau tien',undefined,false,'account-early')
  service.join(id,'late','Den sau')
  service.leave('a')
  expect(room.players.map(p=>p.id)).toEqual(['b'])
  service.leave('b')
  expect(room.players).toEqual(locked ? [] : [expect.objectContaining({id:'early',userId:'account-early',ready:false})])
  expect(room.ownerId).toBe('early')
  expect(service.list().find(r=>r.id===id)?.ownerName).toBe('Dau tien')
  expect(room.viewers?.map(v=>v.id)).toEqual(locked ? ['early','late'] : ['late'])
})
it('keeps original viewing order after joining and leaving the queue',()=>{
  const service=new RoomService(new RoomRepository(),()=>0)
  const id=service.create('Arrival').id
  service.join(id,'a','An');const room=service.join(id,'b','Binh')
  service.join(id,'early','Dau');service.join(id,'late','Sau')
  service.command('early',{type:'join-queue'});service.command('early',{type:'leave-queue'})
  service.leave('a');service.leave('b')
  expect(room.ownerId).toBe('early')
})
