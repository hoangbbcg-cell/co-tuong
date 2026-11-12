import express from 'express'
import { createServer, type Server } from 'node:http'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { roomRouter } from '../server/controllers/roomController'
import { RoomService } from '../server/services/roomService'
import { RoomRepository } from '../server/repositories/roomRepository'

let server: Server
let base: string
const service = new RoomService(new RoomRepository())
beforeAll(async () => {
  const app = express()
  app.use(express.json())
  app.use('/rooms', roomRouter(service))
  app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => res.status(400).json({error:error.message}))
  server = createServer(app)
  await new Promise<void>(resolve => server.listen(0,'127.0.0.1',resolve))
  base = `http://127.0.0.1:${(server.address() as {port:number}).port}`
})
afterAll(() => new Promise<void>((resolve,reject) => { server.close(error => error?reject(error):resolve()); server.closeAllConnections() }))
it('HTTP forwards incrementSeconds into authoritative room state', async () => {
  const response = await fetch(base+'/rooms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Nhanh',minutes:1,turnSeconds:60,incrementSeconds:8})})
  expect(response.status).toBe(201)
  const {id} = await response.json() as {id:string}
  const room = service.join(id,'red','Đỏ')
  expect(room.incrementSeconds).toBe(8)
  expect(room.game.incrementMs).toBe(8000)
  expect(room.game.initialTimeMs).toBe(60000)
  expect(room.game.remainingTime.red).toBe(60000)
})
it('HTTP rejects a per-move limit longer than the initial game time', async () => {
  const response = await fetch(base+'/rooms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Sai',minutes:1,turnSeconds:90,incrementSeconds:5})})
  expect(response.status).toBe(400)
})
