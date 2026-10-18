import { afterAll,beforeAll,describe,expect,it,vi } from 'vitest'
import { io,type Socket } from 'socket.io-client'
import { randomUUID } from 'node:crypto'
import { createApplication } from '../server/app'
import { getMysqlPool } from '../server/repositories/mysqlPool'
import { createGame } from '../src/game/state/initial'
const googleTokens=vi.hoisted(()=>new Map<string,{sub:string;nonce:string;aud?:string}>())
vi.mock('google-auth-library',()=>({OAuth2Client:class {
  async verifyIdToken({idToken,audience}:{idToken:string;audience:string}){
    const claims=googleTokens.get(idToken)
    if(!claims||claims.aud&&claims.aud!==audience)throw new Error('Invalid token')
    return {getPayload:()=>({...claims,aud:claims.aud??audience,iss:'https://accounts.google.com',exp:Math.floor(Date.now()/1000)+3600})}
  }
}}))

// Run only against a disposable MySQL instance, never against an ordinary player's DB.
describe.skipIf(process.env.DB_INTEGRATION!=='1')('MySQL account/API/socket integration',()=>{
  let app:ReturnType<typeof createApplication>,base:string
  const sockets:Socket[]=[]
  beforeAll(async()=>{app=createApplication();await new Promise<void>(resolve=>app.http.listen(0,'127.0.0.1',resolve));const address=app.http.address();if(!address||typeof address==='string')throw Error('No port');base=`http://127.0.0.1:${address.port}`})
  afterAll(async()=>{sockets.forEach(s=>s.disconnect());await app?.close()})
  const request=async(path:string,method='GET',body?:unknown,cookie='')=>{
    const response=await fetch(`${base}/api${path}`,{method,headers:{'Content-Type':'application/json',Cookie:cookie},body:body===undefined?undefined:JSON.stringify(body)})
    const data=await response.json();return {status:response.status,data,cookie:response.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ')}
  }
  const guest=()=>request('/account/guest','POST')
  it('allows only one Guest to claim a Google sub during concurrent linking',async()=>{
    vi.stubEnv('GOOGLE_CLIENT_ID','integration-web-client')
    try{
      const a=await guest(),b=await guest()
      const prepare=async(cookie:string)=>{
        const challenge=await request('/account/google/nonce','POST',{},cookie)
        const token=randomUUID();googleTokens.set(token,{sub:'concurrent-google-sub',nonce:challenge.data.nonce})
        return ()=>request('/account/google','POST',{credential:token},`${cookie}; ${challenge.cookie}`)
      }
      const [first,second]=await Promise.all([prepare(a.cookie),prepare(b.cookie)])
      const results=await Promise.all([first(),second()])
      expect(results.map(r=>r.status).sort()).toEqual([200,409])
      const [identity]=await getMysqlPool().execute('SELECT CAST(id AS CHAR) id FROM users WHERE google_sub=?',['concurrent-google-sub'])
      expect(identity).toHaveLength(1)
    }finally{vi.unstubAllEnvs();googleTokens.clear()}
  })
  it('links Google without replacing Guest data, restores the user and revokes logout/session access',async()=>{
    vi.stubEnv('GOOGLE_CLIENT_ID','integration-web-client')
    try{
      const a=await guest(),b=await guest()
      await getMysqlPool().execute('UPDATE user_resources SET gold=777,energy=8 WHERE user_id=?',[a.data.id])
      await getMysqlPool().execute('UPDATE user_game_stats SET elo=1500 WHERE user_id=?',[a.data.id])
      await request('/account/social','POST',{targetId:b.data.id,action:'follow',enabled:true},a.cookie)
      const position={id:randomUUID(),title:'Thế của Guest',note:'',boardState:createGame(),moveNumber:0,redName:a.data.displayName,blackName:b.data.displayName}
      expect((await request('/account/positions','PUT',position,a.cookie)).status).toBe(200)
      await request('/account/honors/endorse','PUT',{targetId:a.data.id,code:'pt_5_ky-huu',enabled:true},b.cookie)
      const login=async(cookie:string,sub:string,aud?:string)=>{
        const challenge=await request('/account/google/nonce','POST',{},cookie)
        expect(challenge.status).toBe(200)
        const token=randomUUID();googleTokens.set(token,{sub,nonce:challenge.data.nonce,aud})
        return request('/account/google','POST',{credential:token,email:'ignored@example.com',user_id:b.data.id},[cookie,challenge.cookie].filter(Boolean).join('; '))
      }
      const linked=await login(a.cookie,'stable-google-sub')
      expect(linked.status).toBe(200)
      expect(linked.data).toMatchObject({id:a.data.id,publicId:a.data.publicId,displayName:a.data.displayName,linked:true,gold:'777',energy:8})
      expect(linked.data.stats.every((s:{elo:number})=>s.elo===1500)).toBe(true)
      expect((await request('/account/social','GET',undefined,linked.cookie)).data.follows).toEqual([{id:b.data.id}])
      expect((await request('/account/positions','GET',undefined,linked.cookie)).data[0].id).toBe(position.id)
      expect((await request('/account/honors','GET',undefined,linked.cookie)).data.map((h:{code:string})=>h.code)).toContain('pt_5_ky-huu')
      expect((await request('/account/me','GET',undefined,a.cookie)).status).toBe(401)
      expect((await request('/account/name','PATCH',{name:'Kỳ Hữu'},linked.cookie)).status).toBe(200)
      expect((await request('/account/name','PATCH',{name:'Đổi nữa'},linked.cookie)).status).toBe(400)
      const conflict=await login(b.cookie,'stable-google-sub')
      expect(conflict.status).toBe(409)
      expect((await request('/account/me','GET',undefined,b.cookie)).data.id).toBe(b.data.id)
      expect((await request('/account/me','GET',undefined,b.cookie)).data.linked).toBe(false)
      const sa=io(base,{extraHeaders:{Cookie:linked.cookie},transports:['websocket'],autoConnect:false});sockets.push(sa)
      await new Promise<void>((resolve,reject)=>{sa.once('connect',resolve);sa.once('connect_error',reject);sa.connect()})
      const room=await request('/rooms','POST',{name:'Google QA',minutes:10,turnSeconds:60},linked.cookie)
      expect((await sa.timeout(8000).emitWithAck('room:join',{roomId:room.data.id,name:'forged'})).ok).toBe(true)
      await request('/account/logout','POST',{},linked.cookie)
      expect((await request('/account/me','GET',undefined,linked.cookie)).status).toBe(401)
      expect((await sa.timeout(8000).emitWithAck('game:command',{type:'ready'})).ok).toBe(false)
      sa.disconnect()
      const guestAgain=await request('/account/guest','POST',{},a.cookie)
      expect(guestAgain.data.id).not.toBe(a.data.id)
      const returned=await login('','stable-google-sub')
      expect(returned.status).toBe(200);expect(returned.data.id).toBe(a.data.id);expect(returned.data.displayName).toBe('Kỳ Hữu')
      const forgedChallenge=await request('/account/google/nonce','POST')
      expect((await request('/account/google','POST',{credential:'forged'},forgedChallenge.cookie)).status).toBe(401)
      expect((await login('','another-google-sub','wrong-audience')).status).toBe(401)
      const fresh=await login('','new-google-sub')
      expect(fresh.status).toBe(200);expect(fresh.data.id).not.toBe(a.data.id);expect(fresh.data.linked).toBe(true)
      expect(fresh.data.publicId).toMatch(/^\d{8}$/);expect(fresh.data.displayName).toMatch(/^Kỳ Thủ \d{6}$/)
      expect((await login('','new-google-sub')).data.id).toBe(fresh.data.id)
      const replay=await request('/account/google/nonce','POST')
      const replayToken=randomUUID();googleTokens.set(replayToken,{sub:'new-google-sub',nonce:replay.data.nonce})
      expect((await request('/account/google','POST',{credential:replayToken},replay.cookie)).status).toBe(200)
      expect((await request('/account/google','POST',{credential:replayToken},replay.cookie)).status).toBe(401)
      const expired=await login('','new-google-sub')
      await getMysqlPool().execute('UPDATE users SET session_expires_at=DATE_SUB(UTC_TIMESTAMP(3),INTERVAL 1 SECOND) WHERE id=?',[expired.data.id])
      expect((await request('/account/me','GET',undefined,expired.cookie)).status).toBe(401)
      expect((await request('/account/google/nonce','POST',{link:true},expired.cookie)).status).toBe(401)
      const expiringGuest=await guest()
      const pendingLink=await request('/account/google/nonce','POST',{link:true},expiringGuest.cookie)
      const pendingToken=randomUUID();googleTokens.set(pendingToken,{sub:'must-not-create-new-user',nonce:pendingLink.data.nonce})
      await getMysqlPool().execute('UPDATE users SET session_expires_at=DATE_SUB(UTC_TIMESTAMP(3),INTERVAL 1 SECOND) WHERE id=?',[expiringGuest.data.id])
      expect((await request('/account/google','POST',{credential:pendingToken},`${expiringGuest.cookie}; ${pendingLink.cookie}`)).status).toBe(401)
      const [unlinked]=await getMysqlPool().execute('SELECT id FROM users WHERE google_sub=?',['must-not-create-new-user'])
      expect(unlinked).toHaveLength(0)
    }finally{vi.unstubAllEnvs();googleTokens.clear()}
  })
  it('creates real Guests, resumes the same user, protects ownership and locks profile location',async()=>{
    const a=await guest()
    expect(a.status).toBe(200);expect(a.data.displayName).toMatch(/^Kỳ Thủ \d{6}$/)
    expect(a.data.publicId).toMatch(/^\d{8}$/);expect(typeof a.data.id).toBe('string')
    expect(a.data.linked).toBe(false);expect(a.data.renamed).toBe(false)
    expect(a.data.stats).toHaveLength(2);expect(a.data.stats.every((s:{elo:number})=>s.elo===1000)).toBe(true)
    expect(a.data.gold).toBe('0');expect(a.data.energy).toBe(5)
    expect((await request('/account/me')).status).toBe(401)
    expect((await request('/account/name','PATCH',{name:'Hoàng'},a.cookie)).status).toBe(400)
    expect((await request('/account/location','PATCH',{countryCode:'JP'},a.cookie)).status).toBe(200)
    expect((await request('/account/location','PATCH',{countryCode:'VN'},a.cookie)).status).toBe(400)
    expect((await request('/account/location','PATCH',{countryCode:'US'},a.cookie)).status).toBe(409)
    await request('/account/logout','POST',{},a.cookie)
    expect((await request('/account/me','GET',undefined,a.cookie)).status).toBe(401)
    const resumed=await request('/account/guest','POST',{},a.cookie)
    expect(resumed.data.id).toBe(a.data.id);expect(resumed.data.publicId).toBe(a.data.publicId)
  })
  it('persists messaging, directional block and per-member deletion without changing friendships',async()=>{
    const a=await guest(),b=await guest()
    await request('/account/social','POST',{targetId:b.data.id,action:'request'},a.cookie)
    await request('/account/social','POST',{targetId:a.data.id,action:'accept'},b.cookie)
    const conv=await request('/account/conversations','POST',{members:[b.data.id]},a.cookie),id=conv.data.id
    expect(conv.status).toBe(200)
    const clientMessageId=randomUUID()
    const sent=await request(`/account/conversations/${id}/messages`,'POST',{body:'Xin chào',clientMessageId},a.cookie)
    expect(sent.status).toBe(200)
    const repeated=await request(`/account/conversations/${id}/messages`,'POST',{body:'Xin chào',clientMessageId},a.cookie)
    expect(repeated.data.id).toBe(sent.data.id)
    await request(`/account/conversations/${id}`,'PATCH',{action:'clear'},a.cookie)
    expect((await request(`/account/conversations/${id}/messages`,'GET',undefined,a.cookie)).data).toHaveLength(0)
    expect((await request(`/account/conversations/${id}/messages`,'GET',undefined,b.cookie)).data).toHaveLength(1)
    await request('/account/social','POST',{targetId:a.data.id,action:'message-block',enabled:true},b.cookie)
    expect((await request(`/account/conversations/${id}/messages`,'POST',{body:'Bị chặn',clientMessageId:randomUUID()},a.cookie)).status).toBe(403)
    expect((await request('/account/social','GET',undefined,b.cookie)).data.friends[0].status).toBe('accepted')
    expect((await request(`/account/conversations/${id}/messages`,'POST',{body:'B vẫn gửi được',clientMessageId:randomUUID()},b.cookie)).status).toBe(200)
    expect((await request(`/account/conversations/${id}/messages`,'GET',undefined,a.cookie)).data).toHaveLength(1)
    const group=await request('/account/conversations','POST',{members:[a.data.id],title:'Kỳ hữu'},b.cookie)
    expect((await request(`/account/conversations/${group.data.id}`,'PATCH',{action:'leave'},a.cookie)).status).toBe(200)
    expect((await request(`/account/conversations/${group.data.id}/messages`,'POST',{body:'Không còn thành viên',clientMessageId:randomUUID()},a.cookie)).status).toBe(403)
  })
  it('persists a creator-only group and allows messages after reloading it',async()=>{
    const a=await guest()
    const group=await request('/account/conversations','POST',{members:[],title:'Nhóm riêng'},a.cookie)
    expect(group.status).toBe(200)
    const id=group.data.id
    const list=await request('/account/conversations','GET',undefined,a.cookie)
    expect(list.data).toEqual(expect.arrayContaining([expect.objectContaining({id,title:'Nhóm riêng',type:'group'})]))
    const members=await request(`/account/conversations/${id}/members`,'GET',undefined,a.cookie)
    expect(members.data).toEqual([expect.objectContaining({id:a.data.id,role:'owner'})])
    expect((await request(`/account/conversations/${id}/messages`,'POST',{body:'Ghi chú',clientMessageId:randomUUID()},a.cookie)).status).toBe(200)
    expect((await request(`/account/conversations/${id}/messages`,'GET',undefined,a.cookie)).data).toHaveLength(1)
    expect((await request('/account/conversations','POST',{members:[]},a.cookie)).status).toBe(400)
  })
  it('resolves current names, saves positions and enforces honor ownership',async()=>{
    const a=await guest(),b=await guest()
    const position={id:randomUUID(),title:'Thế ban đầu',note:'',boardState:createGame(),moveNumber:0,redName:a.data.displayName,blackName:b.data.displayName}
    expect((await request('/account/positions','PUT',position,a.cookie)).status).toBe(200)
    expect((await request('/account/positions','PUT',position,b.cookie)).status).toBe(403)
    expect((await request('/account/positions','GET',undefined,a.cookie)).data).toHaveLength(1)
    expect((await request('/account/honors','PUT',{codes:['vqkd_1_1']},a.cookie)).status).toBe(400)
    await request('/account/honors/endorse','PUT',{targetId:a.data.id,code:'pt_5_ky-huu',enabled:true},b.cookie)
    expect((await request('/account/honors','GET',undefined,a.cookie)).data.map((h:{code:string})=>h.code)).toContain('pt_5_ky-huu')
    expect((await request('/account/honors','PUT',{codes:['pt_5_ky-huu']},a.cookie)).status).toBe(200)
  })
  it('records a zero-move started PvP resignation with Elo/gold once and replays it',async()=>{
    const a=await guest(),b=await guest()
    const connect=async(cookie:string)=>{const socket=io(base,{extraHeaders:{Cookie:cookie},transports:['websocket'],autoConnect:false});sockets.push(socket);await new Promise<void>((resolve,reject)=>{socket.once('connect',resolve);socket.once('connect_error',reject);socket.connect()});return socket}
    const sa=await connect(a.cookie),sb=await connect(b.cookie)
    const room=await request('/rooms','POST',{name:'DB QA',minutes:10,turnSeconds:60,province:'QA'},a.cookie)
    const command=async(socket:Socket,type:string)=>socket.timeout(8000).emitWithAck('game:command',{type})
    expect((await sa.timeout(8000).emitWithAck('room:join',{roomId:room.data.id,name:'forged'})).ok).toBe(true)
    expect((await sb.timeout(8000).emitWithAck('room:join',{roomId:room.data.id,name:'forged2'})).ok).toBe(true)
    expect((await command(sa,'ready')).ok).toBe(true)
    expect((await command(sb,'ready')).ok).toBe(true)
    expect((await command(sa,'resign')).ok).toBe(true)
    const history=await request('/account/history','GET',undefined,a.cookie)
    expect(history.data).toHaveLength(1);expect(history.data[0].states.at(-1).result.reason).toBe('resign')
    const pa=await request('/account/me','GET',undefined,a.cookie),pb=await request('/account/me','GET',undefined,b.cookie)
    expect(pa.data.stats.find((s:{variant:string})=>s.variant==='xiangqi').elo).toBe(987)
    expect(pb.data.stats.find((s:{variant:string})=>s.variant==='xiangqi').elo).toBe(1013)
    expect(Number(pb.data.gold)).toBeGreaterThanOrEqual(125);expect(Number(pb.data.gold)).toBeLessThanOrEqual(150)
    expect(pa.data.gold).toBe('0');expect(pa.data.energy).toBe(4)
    const match=history.data[0].id
    expect((await request(`/account/saved-matches/${match}`,'PUT',{},a.cookie)).status).toBe(200)
    await getMysqlPool().execute('UPDATE users SET linked_at=UTC_TIMESTAMP(3) WHERE id=?',[a.data.id])
    expect((await request('/account/name','PATCH',{name:'Hoàng'},a.cookie)).status).toBe(200)
    expect((await request('/account/name','PATCH',{name:'Tên mới'},a.cookie)).status).toBe(400)
    expect((await request('/account/history','GET',undefined,a.cookie)).data[0].redName).toBe('Hoàng')
    expect((await request('/account/saved-matches','GET',undefined,a.cookie)).data[0].redName).toBe('Hoàng')
    sa.disconnect();sb.disconnect()
  })
  it('preserves bonus energy and persists a played draw with zero Elo and zero gold',async()=>{
    const a=await guest(),b=await guest()
    await getMysqlPool().execute('UPDATE user_resources SET energy=8 WHERE user_id=?',[a.data.id])
    const connect=async(cookie:string)=>{const socket=io(base,{extraHeaders:{Cookie:cookie},transports:['websocket'],autoConnect:false});sockets.push(socket);await new Promise<void>((resolve,reject)=>{socket.once('connect',resolve);socket.once('connect_error',reject);socket.connect()});return socket}
    const sa=await connect(a.cookie),sb=await connect(b.cookie)
    const room=(await request('/rooms','POST',{name:'Draw QA',minutes:10,turnSeconds:60},a.cookie)).data
    for(const socket of [sa,sb])expect((await socket.timeout(8000).emitWithAck('room:join',{roomId:room.id,name:'forged'})).ok).toBe(true)
    expect((await request('/account/history','GET',undefined,a.cookie)).data).toHaveLength(0)
    await sa.timeout(8000).emitWithAck('game:command',{type:'ready'})
    await sb.timeout(8000).emitWithAck('game:command',{type:'ready'})
    await new Promise(resolve=>setTimeout(resolve,1400))
    expect((await sa.timeout(8000).emitWithAck('game:command',{type:'move',move:{from:{row:6,col:0},to:{row:5,col:0}}})).ok).toBe(true)
    await sa.timeout(8000).emitWithAck('game:command',{type:'offer-draw'})
    expect((await sb.timeout(8000).emitWithAck('game:command',{type:'reply-draw',accepted:true})).ok).toBe(true)
    const history=(await request('/account/history','GET',undefined,a.cookie)).data
    expect(history).toHaveLength(1);expect(history[0].states.at(-1).result.reason).toBe('draw')
    expect(history[0].states).toHaveLength(2)
    expect(history[0].states.some((s:{lastMove:unknown})=>s.lastMove)).toBe(true)
    for(const user of [a,b]){const profile=(await request('/account/me','GET',undefined,user.cookie)).data;expect(profile.gold).toBe('0');expect(profile.stats.find((s:{variant:string})=>s.variant==='xiangqi').elo).toBe(1000)}
    const profile=(await request('/account/me','GET',undefined,a.cookie)).data
    expect(profile.energy).toBe(7);expect(profile.energyRecoveryAt).toBeNull()
    sa.disconnect();sb.disconnect()
  },15000)
  it('persists disconnect losses after start and no history for an unstarted room',async()=>{
    const a=await guest(),b=await guest()
    const connect=async(cookie:string)=>{const socket=io(base,{extraHeaders:{Cookie:cookie},transports:['websocket'],autoConnect:false});sockets.push(socket);await new Promise<void>((resolve,reject)=>{socket.once('connect',resolve);socket.once('connect_error',reject);socket.connect()});return socket}
    const sa=await connect(a.cookie),sb=await connect(b.cookie)
    const room=(await request('/rooms','POST',{name:'Disconnect QA',minutes:10,turnSeconds:60},a.cookie)).data
    await sa.timeout(8000).emitWithAck('room:join',{roomId:room.id,name:'A'})
    await sa.timeout(8000).emitWithAck('room:leave')
    expect((await request('/account/history','GET',undefined,a.cookie)).data).toHaveLength(0)
    const nextRoom=(await request('/rooms','POST',{name:'Disconnect active QA',minutes:10,turnSeconds:60},a.cookie)).data
    for(const socket of [sa,sb])expect((await socket.timeout(8000).emitWithAck('room:join',{roomId:nextRoom.id,name:'unused'})).ok).toBe(true)
    expect((await sa.timeout(8000).emitWithAck('game:command',{type:'ready'})).ok).toBe(true)
    expect((await sb.timeout(8000).emitWithAck('game:command',{type:'ready'})).ok).toBe(true)
    sa.disconnect()
    let history:Record<string,unknown>[]=[]
    for(let attempt=0;attempt<40;attempt++){history=(await request('/account/history','GET',undefined,b.cookie)).data;if(history.length)break;await new Promise(resolve=>setTimeout(resolve,50))}
    expect(history).toHaveLength(1)
    expect((history[0].states as {result:{reason:string;winner:string}}[]).at(-1)?.result).toEqual({reason:'leave',winner:'black'})
    sb.disconnect()
  },10000)
})
