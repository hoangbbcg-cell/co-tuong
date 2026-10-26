import { RANKING_PLAYER_LIMIT } from '../../src/lib/rankingLimits'
import { randomUUID } from 'node:crypto'
import type { PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import type { AccountProfile } from '../../src/types/account'
import { recoverEnergy } from '../../src/lib/energy'
import { hasUnlimitedEnergyPublicId } from '../../src/lib/energyEntitlements'
import { getMysqlConnection, getMysqlPool } from './mysqlPool'
import { AccountError } from '../errors'

export async function transaction<T>(action: (c: PoolConnection) => Promise<T>): Promise<T> {
  const c = await getMysqlConnection()
  try { await c.beginTransaction(); const result = await action(c); await c.commit(); return result }
  catch (error) { await c.rollback(); throw error } finally { c.release() }
}
export async function rows(sql: string, params: (string | number | null)[] = [], c?: PoolConnection) {
  if(c)return (await c.execute<RowDataPacket[]>(sql,params))[0]
  const connection=await getMysqlConnection()
  try{return (await connection.execute<RowDataPacket[]>(sql,params))[0]}finally{connection.release()}
}
export async function change(sql: string, params: (string | number | null)[], c?: PoolConnection) {
  if(c)return (await c.execute<ResultSetHeader>(sql,params))[0]
  const connection=await getMysqlConnection()
  try{return (await connection.execute<ResultSetHeader>(sql,params))[0]}finally{connection.release()}
}
export class AccountRepository {
  async byCredential(hash: string, device = false): Promise<string | null> {
    const r = await rows(`SELECT CAST(id AS CHAR) id FROM users WHERE ${device ? 'guest_device_hash' : 'guest_session_hash'}=? AND status='active' ${device ? 'AND linked_at IS NULL' : 'AND (session_expires_at IS NULL OR session_expires_at>UTC_TIMESTAMP(3))'}`, [hash])
    return r[0] ? String(r[0].id) : null
  }
  async create(code: string, publicId: string, device: string, session: string) {
    return transaction(async c => {
      const name = `Guest${code.slice(-5)}`
      await change('INSERT INTO users(public_id,guest_code,display_name,search_name,guest_device_hash,guest_session_hash,session_expires_at) VALUES (?,?,?,?,?,?,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 30 DAY))', [publicId,code,name,name.toLocaleLowerCase('vi'),device,session], c)
      const r = await rows('SELECT CAST(LAST_INSERT_ID() AS CHAR) id', [], c)
      const id = String(r[0].id)
      await change("INSERT INTO user_game_stats(user_id,variant) VALUES (?,'xiangqi'),(?,'jieqi')", [id,id], c)
      // No starting gold reward has been approved: zero is the absence of a grant.
      await change('INSERT INTO user_resources(user_id,gold) VALUES (?,0)', [id], c)
      return id
    })
  }
  async session(id: string, hash: string | null) { await change('UPDATE users SET guest_session_hash=?,session_expires_at=IF(? IS NULL,NULL,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 30 DAY)) WHERE id=?', [hash,hash,id]) }
  async resumeGuest(id:string,deviceHash:string,sessionHash:string){
    const result=await change("UPDATE users SET guest_session_hash=?,session_expires_at=DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 30 DAY) WHERE id=? AND guest_device_hash=? AND linked_at IS NULL AND status='active'",[sessionHash,id,deviceHash])
    return result.affectedRows===1
  }
  async google(sub:string, actor:string|null, code:string, publicId:string, sessionHash:string) {
    return transaction(async c=>{
      // Lock the current user before attaching an identity. A unique subject index arbitrates races.
      const current=actor?(await rows('SELECT google_sub,status FROM users WHERE id=? FOR UPDATE',[actor],c))[0]:null
      const existing=(await rows('SELECT CAST(id AS CHAR) id,status FROM users WHERE google_sub=? FOR UPDATE',[sub],c))[0]
      if(actor&&(!current||current.status!=='active'))throw new AccountError('Phiên tài khoản không hợp lệ.',401)
      if(existing&&existing.status!=='active')throw new AccountError('Tài khoản không hoạt động.',403)
      if((existing&&actor&&String(existing.id)!==actor)||(current?.google_sub&&current.google_sub!==sub))
        throw new AccountError('Google này đã thuộc tài khoản khác.',409)
      let id=existing?String(existing.id):actor
      if(!id){
        const name=`Guest${code.slice(-5)}`
        await change('INSERT INTO users(public_id,guest_code,display_name,search_name) VALUES (?,?,?,?)',[publicId,code,name,name.toLocaleLowerCase('vi')],c)
        id=String((await rows('SELECT CAST(LAST_INSERT_ID() AS CHAR) id',[],c))[0].id)
        await change("INSERT INTO user_game_stats(user_id,variant) VALUES (?,'xiangqi'),(?,'jieqi')",[id,id],c)
        await change('INSERT INTO user_resources(user_id,gold) VALUES (?,0)',[id],c)
      }
      await change('UPDATE users SET google_sub=?,linked_at=COALESCE(linked_at,UTC_TIMESTAMP(3)),guest_device_hash=NULL,guest_session_hash=?,session_expires_at=DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 30 DAY) WHERE id=?',[sub,sessionHash,id],c)
      return id
    })
  }
  async consumeDemoEnergy(id:string,key:string) {
    await transaction(async c=>{
      if(await this.hasUnlimitedEnergy(id,c))return
      const resource=await this.resources(id,c)
      if((await rows('SELECT id FROM resource_events WHERE idempotency_key=?',[`demo:${id}:${key}`],c)).length)return
      if(resource.energy<1)throw new Error('Not enough energy')
      const energy=resource.energy-1
      await change('UPDATE user_resources SET energy=?,energy_recovery_at=IF(?<5,COALESCE(energy_recovery_at,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 7 MINUTE)),NULL),version=version+1 WHERE user_id=?',[energy,energy,id],c)
      await this.ledger(c,id,'energy',-1,'basic_computer_demo',`demo:${id}:${key}`)
    })
  }
  async profile(id: string): Promise<AccountProfile | null> {
    return transaction(async c => {
      const r = await rows(`SELECT CAST(id AS CHAR) id,CAST(public_id AS CHAR) publicId,display_name displayName,
        linked_at IS NOT NULL linked,name_changed_at IS NOT NULL renamed,avatar_code avatarCode,avatar_frame_code avatarFrameCode,
        country_code countryCode,province_code provinceCode,province_name provinceName,ward_code wardCode,ward_name wardName,
        location_set_at IS NOT NULL locationSet FROM users WHERE id=? AND status='active'`, [id], c)
      if (!r[0]) return null
      const resource = await this.resources(id,c)
      const stats = await rows('SELECT variant,elo,played_count played,win_count wins,draw_count draws,loss_count losses FROM user_game_stats WHERE user_id=? ORDER BY variant', [id], c)
      const counts=await rows(`SELECT (SELECT COUNT(*) FROM friendships WHERE status='accepted' AND (user_low_id=? OR user_high_id=?)) friends,
        (SELECT COUNT(*) FROM user_follows WHERE followed_id=?) followers,
        (SELECT COUNT(*) FROM match_likes l JOIN match_players p ON p.match_id=l.match_id AND p.side=l.target_side WHERE p.user_id=?) likes`,[id,id,id,id],c)
      const cosmetics = await rows('SELECT kind,code FROM user_cosmetics WHERE user_id=?', [id], c)
      const publicId=String(r[0].publicId)
      return { ...r[0], cosmetics, id:String(r[0].id), publicId, energyUnlimited:hasUnlimitedEnergyPublicId(publicId), linked:Number(r[0].linked)===1,renamed:Number(r[0].renamed)===1,locationSet:Number(r[0].locationSet)===1,...resource, stats,friends:Number(counts[0].friends),followers:Number(counts[0].followers),likes:Number(counts[0].likes) } as AccountProfile
    })
  }
  async hasUnlimitedEnergy(id:string,c?:PoolConnection):Promise<boolean> {
    const result=await rows('SELECT CAST(public_id AS CHAR) publicId FROM users WHERE id=?',[id],c)
    return !!result[0]&&hasUnlimitedEnergyPublicId(String(result[0].publicId))
  }
  async resources(id: string, c: PoolConnection) {
    const r=await rows('SELECT CAST(gold AS CHAR) gold,energy,energy_recovery_at recovery FROM user_resources WHERE user_id=? FOR UPDATE',[id],c)
    if(!r[0]) throw new Error('Missing user resources')
    const previous=Number(r[0].energy), at=r[0].recovery ? new Date(r[0].recovery as string).getTime():null
    const recovered=recoverEnergy(previous,at,Date.now())
    if(recovered.energy!==previous || recovered.energyRecoveryAt!==at) {
      await change('UPDATE user_resources SET energy=?,energy_recovery_at=?,version=version+1 WHERE user_id=?',[recovered.energy,recovered.energyRecoveryAt===null?null:new Date(recovered.energyRecoveryAt).toISOString().slice(0,23).replace('T',' '),id],c)
      if(recovered.energy>previous) await this.ledger(c,id,'energy',recovered.energy-previous,'natural_recovery',`recovery:${id}:${at}`)
    }
    return {gold:String(r[0].gold),energy:recovered.energy,energyRecoveryAt:recovered.energyRecoveryAt}
  }
  async ledger(c: PoolConnection,id: string,kind:string,delta:number,reason:string,key:string,match:string|null=null) {
    await change('INSERT INTO resource_events(id,user_id,resource_type,delta,reason,match_id,idempotency_key) VALUES (?,?,?,?,?,?,?)',[randomUUID(),id,kind,delta,reason,match,key],c)
  }
  async location(id: string, country: string, provinceCode: string | null, provinceName: string | null, wardCode: string | null, wardName: string | null) {
    const r=await change('UPDATE users SET country_code=?,province_code=?,province_name=?,ward_code=?,ward_name=?,location_set_at=UTC_TIMESTAMP(3) WHERE id=? AND location_set_at IS NULL',[country,provinceCode,provinceName,wardCode,wardName,id])
    return r.affectedRows===1
  }
  async avatar(id:string,avatar:string,frame:string) { await change('UPDATE users SET avatar_code=?,avatar_frame_code=? WHERE id=?',[avatar,frame,id]) }
  async search(query:string) {
    return rows("SELECT CAST(u.id AS CHAR) id,CAST(u.public_id AS CHAR) publicId,u.display_name name,u.avatar_code avatarCode,u.avatar_frame_code avatarFrameCode,s.elo FROM users u LEFT JOIN user_game_stats s ON s.user_id=u.id AND s.variant='xiangqi' WHERE u.status='active' AND (CAST(u.public_id AS CHAR)=? OR u.display_name LIKE ?) ORDER BY u.id LIMIT 30",[query,`%${query.replace(/[\\%_]/g,'\\$&')}%`])
  }
  async ranking(variant:string,country?:string,province?:string,ward?:string) {
    const conditions=['s.variant=?',"u.status='active'"]
    const params:string[]=[variant]
    for(const [column,value] of [['country_code',country],['province_code',province],['ward_code',ward]]) if(value){conditions.push(`u.${column}=?`);params.push(value)}
    return rows(`SELECT CAST(u.id AS CHAR) id,CAST(u.public_id AS CHAR) publicId,u.display_name name,u.avatar_code avatarCode,u.avatar_frame_code avatarFrameCode,s.elo FROM user_game_stats s JOIN users u ON u.id=s.user_id WHERE ${conditions.join(' AND ')} ORDER BY s.elo DESC,u.id LIMIT ${RANKING_PLAYER_LIMIT}`,params)
  }
}


