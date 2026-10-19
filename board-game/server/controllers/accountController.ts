import { Router } from 'express'
import { AccountService } from '../services/accountService'
import { AccountError } from '../errors'
import { PersistenceService, text, uuid, userId, groupAvatarBytes, messageImageData } from '../services/persistenceService'
import { randomBytes } from 'node:crypto'
import { hashCredential } from '../services/accountService'
import { ADMIN_AVATARS, ADMIN_FRAMES, DEFAULT_AVATARS } from '../../src/types/admin'
import { ShopService } from '../services/shopService'
import { SHOP_PRODUCTS } from '../../src/lib/shopCatalog'
import { TestBotService } from '../services/testBotService'

export function cookieValue(header:string|undefined,name:string):string|undefined {
  return header?.split(';').map(s=>s.trim()).find(s=>s.startsWith(`${name}=`))?.slice(name.length+1)
}
export function accountRouter(account:AccountService,persistence=new PersistenceService(),online:()=>Set<string>=()=>new Set()) {
  const router=Router()
  const throttles=new Map<string,{at:number;count:number}>()
  const googleNonces=new Map<string,{expires:number;sessionHash:string;actor:string|null}>()
  router.use((req,_res,next)=>{
    const key=req.ip??'local',now=Date.now(),current=throttles.get(key)
    const entry=current&&now-current.at<60000?current:{at:now,count:0}
    if(throttles.size>10000)for(const [ip,item]of throttles)if(now-item.at>60000)throttles.delete(ip)
    entry.count++;throttles.set(key,entry)
    if(entry.count>600)return next(new AccountError('Thao tác quá nhanh.',429))
    if(!['GET','HEAD'].includes(req.method) && req.headers.origin && new URL(req.headers.origin).host!==req.headers.host)return next(new AccountError('Nguồn yêu cầu không hợp lệ.',403))
    next()
  })
  router.post('/google/nonce',async(req,res)=>{
    if(!process.env.GOOGLE_CLIENT_ID)throw new AccountError('Google chưa được cấu hình trên máy chủ.',503)
    for(const [key,value]of googleNonces)if(value.expires<Date.now())googleNonces.delete(key)
    if(googleNonces.size>=10000)throw new AccountError('Vui lòng thử lại sau.',429)
    const actor=await account.authenticate(cookieValue(req.headers.cookie,'ct_guest_session'))
    if(req.body?.link===true&&!actor)throw new AccountError('Phiên Guest hết hạn. Hãy đăng nhập khách lại trước khi liên kết.',401)
    const nonce=randomBytes(32).toString('hex')
    googleNonces.set(hashCredential(nonce),{expires:Date.now()+5*60000,sessionHash:hashCredential(cookieValue(req.headers.cookie,'ct_guest_session')??''),actor})
    res.cookie('ct_google_nonce',nonce,{httpOnly:true,sameSite:'strict',secure:req.secure||process.env.NODE_ENV==='production',maxAge:5*60000,path:'/api/account/google'})
    res.setHeader('Cache-Control','no-store')
    res.json({nonce})
  })
  router.post('/google',async(req,res)=>{
    const nonce=cookieValue(req.headers.cookie,'ct_google_nonce')??''
    const key=hashCredential(nonce),challenge=googleNonces.get(key)
    googleNonces.delete(key)
    res.clearCookie('ct_google_nonce',{path:'/api/account/google'})
    if(!challenge||challenge.expires<Date.now()||challenge.sessionHash!==hashCredential(cookieValue(req.headers.cookie,'ct_guest_session')??''))throw new AccountError('Phiên đăng nhập Google hết hạn. Vui lòng thử lại.',401)
    const {profile,session}=await account.google(req.body?.credential,nonce,cookieValue(req.headers.cookie,'ct_guest_session'),challenge.actor)
    res.cookie('ct_guest_session',session,{httpOnly:true,sameSite:'strict',secure:req.secure||process.env.NODE_ENV==='production',maxAge:30*24*60*60*1000,path:'/'})
    // The repository revokes the linked user's device hash. Preserve the browser's
    // device cookie: it may belong to a different, signed-out Guest whose data must survive.
    res.setHeader('Cache-Control','no-store')
    res.json(profile)
  })
  router.post(['/guest','/guest/restore'],async(req,res)=>{
    const {profile,device,session}=await account.guest(cookieValue(req.headers.cookie,'ct_guest_device'),req.path!=='/guest/restore')
    if(profile)await persistence.content.activity(profile.id)
    const options={httpOnly:true,sameSite:'strict' as const,secure:req.secure||process.env.NODE_ENV==='production',maxAge:365*24*60*60*1000}
    res.cookie('ct_guest_device',device,{...options,path:'/api/account/guest'})
    res.cookie('ct_guest_session',session,{...options,path:'/'})
    res.json(profile)
  })
  router.use(async(req,res,next)=>{
    const id=await account.authenticate(cookieValue(req.headers.cookie,'ct_guest_session'))
    if(!id)throw new AccountError('Bạn cần đăng nhập.',401)
    res.locals.userId=id
    if(req.method!=='GET')await persistence.content.activity(id)
    next()
  })
  router.get('/me',async(_req,res)=>res.json(await account.repository.profile(String(res.locals.userId))))
  const shop = new ShopService()
  const testBot = new TestBotService()
  router.post('/test-bot', (req,res)=>res.json(testBot.start(String(res.locals.userId),req.body?.variant)))
  router.post('/test-bot/:id/move', async(req,res)=>res.json(await testBot.move(String(res.locals.userId),uuid(req.params.id),req.body?.move,uuid(req.body?.requestId))))
  router.get('/shop', (_req,res)=>res.json(SHOP_PRODUCTS))
  router.post('/shop/purchase', async(req,res)=>res.json(await shop.purchase(String(res.locals.userId),req.body)))
  router.post('/logout',async(req,res)=>{await account.repository.session(String(res.locals.userId),null);res.clearCookie('ct_guest_session',{path:'/'});res.json({ok:true})})
  router.patch('/name',async(req,res)=>{await account.rename(String(res.locals.userId),req.body?.name);res.json({ok:true})})
  router.post('/demo-energy',async(req,res)=>{await account.repository.consumeDemoEnergy(String(res.locals.userId),uuid(req.body?.id));res.json({ok:true})})
  router.patch('/location',async(req,res)=>{await account.location(String(res.locals.userId),req.body??{});res.json({ok:true})})
  router.patch('/avatar',async(req,res)=>{
    const avatar=text(req.body?.avatarCode,40),frame=text(req.body?.avatarFrameCode,40)
    // Existing default artwork remains available; new items require DB ownership.
    if(!ADMIN_AVATARS.some(item=>item.code===avatar)||!ADMIN_FRAMES.some(item=>item.code===frame))throw new AccountError('Avatar/khung không hợp lệ.')
    if(!DEFAULT_AVATARS.some(index=>`avatar-${index}`===avatar)) {
      const profile=await account.repository.profile(String(res.locals.userId))
      if(!profile?.cosmetics?.some(item=>item.kind==='avatar'&&item.code===avatar))throw new AccountError('Bạn chưa sở hữu avatar này.',403)
    }
    if(!/^frame-[0-3]$/.test(frame)) {
      const profile=await account.repository.profile(String(res.locals.userId))
      if(!profile?.cosmetics?.some(item=>item.kind==='frame'&&item.code===frame))throw new AccountError('Bạn chưa sở hữu viền này.',403)
    }
    await account.repository.avatar(String(res.locals.userId),avatar,frame);res.json({ok:true})
  })
  router.get('/search',async(req,res)=>res.json(await account.repository.search(text(req.query.q,50))))
  router.get('/profiles/:id',async(req,res)=>{
    const profile=await account.repository.profile(userId(req.params.id));if(!profile)throw new AccountError('Không tìm thấy người chơi.',404)
    const {gold:_gold,energy:_energy,energyRecoveryAt:_at,...publicProfile}=profile;res.json(publicProfile)
  })
  router.get('/ranking',async(req,res)=>{
    const variant=req.query.variant??'xiangqi';if(variant!=='xiangqi'&&variant!=='jieqi')throw new AccountError('Variant không hợp lệ.')
    const filter=(v:unknown)=>typeof v==='string'?text(v,16):undefined
    const current=online()
    res.json((await account.repository.ranking(variant,filter(req.query.country),filter(req.query.province),filter(req.query.ward))).map(p=>({...p,online:current.has(String(p.id))})))
  })
  router.get('/social',async(_req,res)=>{const data=await persistence.social.list(String(res.locals.userId)),current=online();res.json({...data,friends:data.friends.map(f=>({...f,online:current.has(String(f.id))}))})})
  router.post('/social',async(req,res)=>{await persistence.socialAction(String(res.locals.userId),req.body??{});res.json({ok:true})})
  router.get('/conversations',async(_req,res)=>res.json(await persistence.social.conversations(String(res.locals.userId))))
  router.post('/conversations',async(req,res)=>res.json({id:await persistence.createConversation(String(res.locals.userId),req.body??{})}))
  router.get('/conversations/:id/messages',async(req,res)=>res.json(await persistence.social.messages(String(res.locals.userId),uuid(req.params.id))))
  router.post('/conversations/:id/read',async(req,res)=>{await persistence.social.read(String(res.locals.userId),uuid(req.params.id),userId(req.body?.messageId));res.json({ok:true})})
  router.get('/conversations/:id/members',async(req,res)=>res.json(await persistence.social.members(String(res.locals.userId),uuid(req.params.id))))
  router.patch('/conversations/:id/mute',async(req,res)=>{const hours=req.body?.hours;if(hours!==null&&(!Number.isInteger(hours)||hours<0||hours>8760))throw new AccountError('Thời gian tắt thông báo không hợp lệ.');await persistence.social.mute(String(res.locals.userId),uuid(req.params.id),hours);res.json({ok:true})})
  router.patch('/conversations/:id/title',async(req,res)=>{await persistence.social.renameGroup(String(res.locals.userId),uuid(req.params.id),text(req.body?.title,80));res.json({ok:true})})
  router.patch('/conversations/:id/avatar',async(req,res)=>{const url=await persistence.social.groupAvatar(String(res.locals.userId),uuid(req.params.id),groupAvatarBytes(req.body?.image));res.json({url})})
  router.post('/conversations/:id/images',async(req,res)=>{const image=messageImageData(req.body?.image);const id=await persistence.social.imageMessage(String(res.locals.userId),uuid(req.params.id),image.bytes,uuid(req.body?.clientMessageId),image.extension);res.json({id})})
  router.post('/conversations/:id/messages',async(req,res)=>res.json({id:await persistence.social.send(String(res.locals.userId),uuid(req.params.id),text(req.body?.body,300),uuid(req.body?.clientMessageId))}))
  router.patch('/conversations/:id',async(req,res)=>{
    const action=req.body?.action;if(!['clear','nickname','leave','add'].includes(action))throw new AccountError('Thao tác không hợp lệ.')
    const value=action==='nickname'?(req.body.value?text(req.body.value,80):null):action==='add'?userId(req.body.value):null
    await persistence.social.member(String(res.locals.userId),uuid(req.params.id),action,value);res.json({ok:true})
  })
  router.get('/history',async(_req,res)=>res.json(await persistence.content.history(String(res.locals.userId))))
  router.get('/saved-matches',async(_req,res)=>res.json(await persistence.content.history(String(res.locals.userId),true)))
  router.put('/saved-matches/:id',async(req,res)=>{await persistence.content.bookmark(String(res.locals.userId),uuid(req.params.id),req.body?.enabled!==false);res.json({ok:true})})
  router.get('/positions',async(_req,res)=>res.json(await persistence.content.positions(String(res.locals.userId))))
  router.put('/positions',async(req,res)=>{await persistence.position(String(res.locals.userId),req.body??{});res.json({ok:true})})
  router.delete('/positions/:id',async(req,res)=>{await persistence.content.removePosition(String(res.locals.userId),uuid(req.params.id));res.json({ok:true})})
  router.get('/honors/catalog',async(_req,res)=>res.json(await persistence.content.catalog()))
  router.get('/honors',async(_req,res)=>res.json(await persistence.content.honors(String(res.locals.userId))))
  router.get('/honors/:id',async(req,res)=>res.json(await persistence.content.honorProfile(userId(req.params.id),String(res.locals.userId))))
  router.put('/honors',async(req,res)=>{
    if(!Array.isArray(req.body?.codes)||req.body.codes.length>39)throw new AccountError('Danh hiệu không hợp lệ.')
    await persistence.content.selectHonors(String(res.locals.userId),req.body.codes.map((code:unknown)=>text(code,64)));res.json({ok:true})
  })
  router.put('/honors/endorse',async(req,res)=>{const id=String(res.locals.userId);await persistence.content.endorse(id,persistence.target(id,req.body?.targetId),text(req.body?.code,64),req.body?.enabled===true);res.json({ok:true})})
  router.put('/match-likes/:id',async(req,res)=>{
    if(req.body?.side!=='red'&&req.body?.side!=='black')throw new AccountError('Phe không hợp lệ.')
    await persistence.content.like(String(res.locals.userId),uuid(req.params.id),req.body.side,req.body?.enabled===true);res.json({ok:true})
  })
  return router
}
