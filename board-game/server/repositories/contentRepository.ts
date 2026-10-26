import { randomUUID } from 'node:crypto'
import type { GameState } from '../../src/types/game'
import type { RecordedMatch } from '../../src/types/recordedMatch'
import { change, rows, transaction } from './accountRepository'
import { AccountError } from '../errors'

export class ContentRepository {
  async matchReward(user:string,match:string) {
    const result=await rows(`SELECT m.status,p.elo_delta eloDelta,
      COALESCE((SELECT SUM(e.delta) FROM resource_events e WHERE e.match_id=m.id AND e.user_id=p.user_id AND e.resource_type='gold' AND e.reason='online_match_win'),0) gold
      FROM matches m JOIN match_players p ON p.match_id=m.id WHERE m.id=? AND p.user_id=?`,[match,user])
    if(!result.length)throw new AccountError('Không tìm thấy ván đấu.',404)
    return { settled:result[0].status==='finished',gold:Number(result[0].gold),eloDelta:Number(result[0].eloDelta) }
  }
  async history(id:string,saved=false):Promise<RecordedMatch[]> {
    const list=await rows(`SELECT DISTINCT m.id,m.ended_at endedAt, ${saved ? 's.title savedTitle,s.note savedNote,' : ''}
      COALESCE(ru.display_name,r.name_snapshot) redName,COALESCE(bu.display_name,b.name_snapshot) blackName
      FROM matches m JOIN match_players r ON r.match_id=m.id AND r.side='red'
      JOIN match_players b ON b.match_id=m.id AND b.side='black'
      LEFT JOIN users ru ON ru.id=r.user_id LEFT JOIN users bu ON bu.id=b.user_id
      ${saved?'JOIN saved_matches s ON s.match_id=m.id AND s.user_id=?':'JOIN match_players mine ON mine.match_id=m.id AND mine.user_id=?'}
      WHERE m.status='finished' AND m.source='server_online' ${saved?'':'AND (m.history_expires_at IS NULL OR m.history_expires_at>UTC_TIMESTAMP(3))'} ORDER BY m.ended_at DESC LIMIT 100`,[id])
    const result:RecordedMatch[]=[]
    for(const item of list) {
      const m=await rows('SELECT initial_state,final_state FROM matches WHERE id=?',[String(item.id)])
      const moves=await rows('SELECT state_after FROM match_moves WHERE match_id=? ORDER BY ply',[String(item.id)])
      const states=[m[0].initial_state,...moves.map(r=>r.state_after)] as GameState[]
      const final=m[0].final_state as GameState
      if(JSON.stringify(states.at(-1)?.board)===JSON.stringify(final.board))states[states.length-1]=final
      else states.push(final)
      result.push({id:String(item.id),endedAt:new Date(item.endedAt as string).getTime(),redName:String(item.redName),blackName:String(item.blackName),states,...(saved ? {savedTitle:String(item.savedTitle??''),savedNote:String(item.savedNote??'')} : {})})
    }
    return result
  }
  async bookmark(id:string,match:string,enabled:boolean) {
    if(enabled) {
      const m=await rows("SELECT id FROM matches WHERE id=? AND status='finished' AND source='server_online'",[match])
      if(!m.length)throw new AccountError('Ván chưa tồn tại hoặc chưa kết thúc.')
    }
    await change(enabled?'INSERT INTO saved_matches(user_id,match_id) VALUES (?,?) ON DUPLICATE KEY UPDATE user_id=saved_matches.user_id':'DELETE FROM saved_matches WHERE user_id=? AND match_id=?',[id,match])
  }
  async updateBookmark(id:string,match:string,title:string,note:string) {
    const existing=await rows('SELECT match_id FROM saved_matches WHERE user_id=? AND match_id=?',[id,match])
    if(!existing.length)throw new AccountError('Không tìm thấy ván đã lưu.',404)
    await change('UPDATE saved_matches SET title=?,note=? WHERE user_id=? AND match_id=?',[title,note,id,match])
  }
  async positions(id:string) {
    return rows(`SELECT p.id,CAST(p.owner_id AS CHAR) owner,p.created_at savedAt,p.title,p.note,p.state boardState,p.move_number moveNumber,
      COALESCE(r.display_name,p.red_name_snapshot) redName,COALESCE(b.display_name,p.black_name_snapshot) blackName,p.source_match_id sourceMatchId
      FROM saved_positions p LEFT JOIN users r ON r.id=p.red_user_id LEFT JOIN users b ON b.id=p.black_user_id WHERE p.owner_id=? ORDER BY p.created_at DESC LIMIT 100`,[id])
  }
  async savePosition(id:string,input:{id:string;title:string;note:string;boardState:GameState;moveNumber:number;redName:string;blackName:string;sourceMatchId?:string}) {
    await transaction(async c=>{
      let red:string|null=null,black:string|null=null
      if(input.sourceMatchId){
        const players=await rows('SELECT side,CAST(user_id AS CHAR) id FROM match_players WHERE match_id=?',[input.sourceMatchId],c)
        red=players.find(p=>p.side==='red')?.id??null;black=players.find(p=>p.side==='black')?.id??null
      }
      else {
        const actor=await rows('SELECT display_name FROM users WHERE id=?',[id],c)
        if(actor[0]?.display_name===input.redName)red=id
        if(actor[0]?.display_name===input.blackName)black=id
      }
      const previous=await rows('SELECT CAST(owner_id AS CHAR) owner FROM saved_positions WHERE id=? FOR UPDATE',[input.id],c)
      if(previous[0] && String(previous[0].owner)!==id)throw new AccountError('Không sở hữu thế cờ.',403)
      await change(`INSERT INTO saved_positions(id,owner_id,title,note,variant,state,format_version,source_match_id,move_number,red_name_snapshot,black_name_snapshot,red_user_id,black_user_id)
        VALUES (?,?,?,?,?,?,1,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=VALUES(title),note=VALUES(note)`,[input.id,id,input.title,input.note,input.boardState.variant??'xiangqi',JSON.stringify(input.boardState),input.sourceMatchId??null,input.moveNumber,input.redName,input.blackName,red,black],c)
    })
  }
  async removePosition(id:string,position:string) { await change('DELETE FROM saved_positions WHERE owner_id=? AND id=?',[id,position]) }
  async catalog() { return rows("SELECT code,category,level,title,description,criteria,catalog_order catalogOrder FROM honors WHERE active=1 ORDER BY FIELD(category,'arena','awarded','streak','games','attendance'),level,catalog_order") }
  async honors(id:string) { return rows('SELECT honor_code code,selected FROM user_honors WHERE user_id=? AND revoked_at IS NULL',[id]) }
  async honorProfile(id:string,viewer:string) {
    return {owned:await this.honors(id),endorsements:await rows('SELECT honor_code code,COUNT(*) count,MAX(giver_id=?) granted FROM honor_endorsements WHERE recipient_id=? GROUP BY honor_code',[viewer,id])}
  }
  async selectHonors(id:string,codes:string[]) {
    await transaction(async c=>{
      await rows('SELECT id FROM users WHERE id=? FOR UPDATE',[id],c)
      const categories=new Map<string,number>()
      for(const code of codes) {
        const own=await rows('SELECT h.category FROM user_honors uh JOIN honors h ON h.code=uh.honor_code WHERE uh.user_id=? AND uh.honor_code=? AND uh.revoked_at IS NULL',[id,code],c)
        if(!own.length)throw new AccountError('Chưa sở hữu danh hiệu.')
        const category=String(own[0].category),count=(categories.get(category)??0)+1
        if(count>3)throw new AccountError('Mỗi nhóm chỉ chọn tối đa 3 danh hiệu.')
        categories.set(category,count)
      }
      await change('UPDATE user_honors SET selected=0 WHERE user_id=?',[id],c)
      for(const code of codes) await change('UPDATE user_honors SET selected=1 WHERE user_id=? AND honor_code=?',[id,code],c)
    })
  }
  async endorse(id:string,target:string,code:string,enabled:boolean) {
    await transaction(async c=>{
      await rows('SELECT id FROM users WHERE id=? FOR UPDATE',[target],c)
      const h=await rows("SELECT criteria FROM honors WHERE code=? AND category='awarded' AND active=1",[code],c)
      if(!h.length)throw new AccountError('Danh hiệu phong tặng không hợp lệ.')
      await change(enabled?'INSERT INTO honor_endorsements(giver_id,recipient_id,honor_code) VALUES (?,?,?) ON DUPLICATE KEY UPDATE giver_id=honor_endorsements.giver_id':'DELETE FROM honor_endorsements WHERE giver_id=? AND recipient_id=? AND honor_code=?',[id,target,code],c)
      const count=await rows('SELECT COUNT(*) n FROM honor_endorsements WHERE recipient_id=? AND honor_code=?',[target,code],c)
      if(Number(count[0].n)>=Number(h[0].criteria.threshold)) await change('INSERT INTO user_honors(user_id,honor_code) VALUES (?,?) ON DUPLICATE KEY UPDATE revoked_at=NULL',[target,code],c)
      else await change('UPDATE user_honors SET selected=0,revoked_at=UTC_TIMESTAMP(3) WHERE user_id=? AND honor_code=?',[target,code],c)
    })
  }
  async like(id:string,match:string,side:string,enabled:boolean) {
    if (!enabled) throw new AccountError('Không thể hủy lượt thích của ván đấu.')
    const m=await rows("SELECT id FROM matches WHERE id=? AND status IN ('playing','finished') AND source='server_online'",[match])
    if(!m.length)throw new AccountError('Ván đấu không hợp lệ.')
    await change('INSERT INTO match_likes(match_id,actor_id,target_side) VALUES (?,?,?) ON DUPLICATE KEY UPDATE target_side=match_likes.target_side',[match,id,side])
  }
  async activity(id:string) {
    await transaction(async c=>{
      await change('UPDATE users SET activity_days=activity_days+1,last_activity_date=UTC_DATE() WHERE id=? AND (last_activity_date IS NULL OR last_activity_date<>UTC_DATE())',[id],c)
      const r=await rows('SELECT activity_days FROM users WHERE id=? FOR UPDATE',[id],c)
      const honors=await rows("SELECT code,criteria FROM honors WHERE category='attendance' AND active=1",[],c)
      for(const h of honors) if(Number(r[0]?.activity_days)>=Number(h.criteria.threshold)) await change('INSERT INTO user_honors(user_id,honor_code) VALUES (?,?) ON DUPLICATE KEY UPDATE user_id=user_honors.user_id',[id,String(h.code)],c)
    })
  }
}
