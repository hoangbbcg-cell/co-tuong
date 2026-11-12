import { describe, it, expect, vi, afterEach } from 'vitest'
import { notificationDeviceRouter } from '../server/controllers/notificationDeviceController'
import { createServer } from 'node:http'
import express from 'express'

const sample = { endpoint: 'https://push.example.org/abc', keys: { p256dh: 'A'.repeat(50), auth: 'B'.repeat(24) }, platform: 'web' }
const auth = { authenticate: vi.fn(async () => '7'), repository: { profile: vi.fn(async () => ({ id: '7' })) } }
const repo = { upsert: vi.fn(async () => {}), disable: vi.fn(async () => true) }

afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks() })
async function hit(path: string, method: string, body?: unknown, cookie = 'ct_guest_session=session', origin?: string) {
 const app = express(); app.use(express.json({limit:'4kb'})); app.use('/api/notifications', notificationDeviceRouter(auth as never, repo))
 app.use((err: {status?:number},_req:unknown,res: {status:(s:number)=>{json:(x:unknown)=>void}},_next:unknown)=> { res.status(err.status || 500).json({error:'test'}) })
 const server = createServer(app); await new Promise<void>(r=>server.listen(0,'127.0.0.1',r))
 try { const address=server.address(); if (!address || typeof address==='string') throw new Error('No address')
 const headers: Record<string,string> = { cookie, 'content-type':'application/json' }; if(origin)headers.origin=origin
 return await fetch(`http://127.0.0.1:${address.port}/api/notifications${path}`,{method,headers,body:body?JSON.stringify(body):undefined})
 } finally { await new Promise<void>(r=>server.close(()=>r())) }
}
describe('Notification device API safety', () => {
 it('is disabled by default',async()=>{ expect((await hit('/subscriptions','POST',sample)).status).toBe(503);expect(repo.upsert).not.toHaveBeenCalled() })
 it('rejects unauthenticated user',async()=>{vi.stubEnv('HOVANG_NOTIFICATION_DEVICE_API','enabled');auth.authenticate.mockResolvedValueOnce(null as never);expect((await hit('/subscriptions','POST',sample)).status).toBe(401)})
 it('rejects foreign origin',async()=>{vi.stubEnv('HOVANG_NOTIFICATION_DEVICE_API','enabled');expect((await hit('/subscriptions','POST',sample,undefined,'https://evil.example')).status).toBe(403)})
 it('registers for authenticated account',async()=>{vi.stubEnv('HOVANG_NOTIFICATION_DEVICE_API','enabled');expect((await hit('/subscriptions','POST',sample)).status).toBe(204);expect(repo.upsert).toHaveBeenCalledWith('7',expect.objectContaining({endpoint:sample.endpoint}))})
 it('disables only account device',async()=>{vi.stubEnv('HOVANG_NOTIFICATION_DEVICE_API','enabled');const hash='a'.repeat(64);expect((await hit('/subscriptions/'+hash,'DELETE')).status).toBe(204);expect(repo.disable).toHaveBeenCalledWith('7',hash)})
 it('rejects invalid device',async()=>{vi.stubEnv('HOVANG_NOTIFICATION_DEVICE_API','enabled');expect((await hit('/subscriptions','POST',{endpoint:'http://localhost'})).status).toBe(400)})
})
