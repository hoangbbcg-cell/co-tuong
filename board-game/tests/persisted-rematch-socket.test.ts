import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { Server } from 'socket.io'
import { io as connect, type Socket } from 'socket.io-client'
import { expect, it, vi } from 'vitest'
import { registerRoomSockets } from '../server/controllers/roomController'
import { RoomRepository } from '../server/repositories/roomRepository'
import { RoomService } from '../server/services/roomService'
import { readyCountdownForPlayer } from '../src/lib/roomReadiness'
import type { ClientEvents, RoomSnapshot, ServerEvents } from '../src/types/room'
it('publishes the rematch countdown to both real sockets after persistence assigns its match ID',async()=>{
  let now=0
  const service=new RoomService(new RoomRepository(room=>{if(room.game.phase==='finished'&&room.lastCompletedMatch)room.lastCompletedMatch.id='persisted-socket-match'}),()=>now,()=> 'red')
  const http=createServer(),io=new Server<ClientEvents,ServerEvents>(http)
  const interval=registerRoomSockets(io,service)
  const clients:Socket<ServerEvents,ClientEvents>[]=[]
  const latest=new Map<string,RoomSnapshot>()
  try{
    await new Promise<void>(resolve=>http.listen(0,'127.0.0.1',resolve))
    const url=`http://127.0.0.1:${(http.address() as AddressInfo).port}`
    const roomId=service.create('Socket rematch').id
    for(const name of ['An','Binh']){
      const client:Socket<ServerEvents,ClientEvents>=connect(url,{transports:['websocket'],reconnection:false})
      clients.push(client)
      client.on('room:state',room=>latest.set(client.id!,room))
      await new Promise<void>((resolve,reject)=>{client.once('connect',resolve);client.once('connect_error',reject)})
      expect((await client.timeout(3000).emitWithAck('room:join',{roomId,name})).ok).toBe(true)
    }
    for(const client of clients)expect((await client.timeout(3000).emitWithAck('game:command',{type:'ready'})).ok).toBe(true)
    now=2000
    expect((await clients[1].timeout(3000).emitWithAck('game:command',{type:'resign'})).ok).toBe(true)
    now=7000
    await vi.waitFor(()=>{for(const client of clients)expect(readyCountdownForPlayer(latest.get(client.id!),client.id)).toBe(30)},{timeout:3000})
    now=8000
    await vi.waitFor(()=>{for(const client of clients)expect(readyCountdownForPlayer(latest.get(client.id!),client.id)).toBe(29)},{timeout:3000})
  }finally{
    clients.forEach(client=>client.disconnect());clearInterval(interval)
    await new Promise<void>(resolve=>io.close(()=>resolve()))
  }
})
