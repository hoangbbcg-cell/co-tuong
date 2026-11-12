import { expect, it, vi } from 'vitest'
import express from 'express'
import type { AddressInfo } from 'node:net'
import { accountRouter } from '../server/controllers/accountController'
import { AccountService } from '../server/services/accountService'
import { PersistenceService } from '../server/services/persistenceService'
it('allows blocking a group member after polling exhausts the read quota',async()=>{
  const account=new AccountService(),persistence=new PersistenceService()
  vi.spyOn(account,'authenticate').mockResolvedValue('1')
  vi.spyOn(persistence.social,'conversations').mockResolvedValue([])
  vi.spyOn(persistence.content,'activity').mockResolvedValue(undefined)
  const member=vi.spyOn(persistence.social,'member').mockResolvedValue(undefined)
  const app=express();app.use(express.json());app.use('/api/account',accountRouter(account,persistence))
  app.use((error:Error & {status?:number},_req:express.Request,res:express.Response,_next:express.NextFunction)=>{res.status(error.status??500).json({error:error.message})})
  const server=app.listen(0,'127.0.0.1');await new Promise<void>(resolve=>server.once('listening',resolve))
  try {
    const base='http://127.0.0.1:'+(server.address() as AddressInfo).port+'/api/account'
    for(let i=0;i<600;i++)expect((await fetch(base+'/conversations')).status).toBe(200)
    expect((await fetch(base+'/conversations')).status).not.toBe(200)
    const response=await fetch(base+'/conversations/11111111-1111-4111-8111-111111111111',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'block-member',value:'2'})})
    expect({status:response.status,body:await response.json()}).toEqual({status:200,body:{ok:true}})
    expect(member).toHaveBeenCalledWith('1','11111111-1111-4111-8111-111111111111','block-member','2')
  } finally {await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));vi.restoreAllMocks()}
})
