import { randomInt } from 'node:crypto'
import type { GameState, Side } from '../../src/types/game'
import type { RoomSnapshot } from '../../src/types/room'
import { ratingDelta } from '../services/rating'
import { AccountRepository, change, rows, transaction } from './accountRepository'
import { AccountError } from '../errors'

export interface MatchIdentity { red:string; black:string }
export class MatchRepository {
  private account=new AccountRepository()
  async start(id:string,room:RoomSnapshot,users:MatchIdentity) {
    await transaction(async c=>{
      const existing=await rows('SELECT id FROM matches WHERE id=?',[id],c)
      if(existing.length)return
      const ids=[users.red,users.black].sort((a,b)=>BigInt(a)<BigInt(b)?-1:1)
      const resources=new Map<string,Awaited<ReturnType<AccountRepository['resources']>>>()
      const unlimited=new Set<string>()
      for(const user of ids)resources.set(user,await this.account.resources(user,c))
      for(const user of ids)if(await this.account.hasUnlimitedEnergy(user,c))unlimited.add(user)
      for(const user of ids)if(!unlimited.has(user)&&resources.get(user)!.energy<1)throw new AccountError('Không đủ năng lượng để bắt đầu ván.')
      const friends=await rows("SELECT 1 FROM friendships WHERE user_low_id=? AND user_high_id=? AND status='accepted'",ids,c)
      const invited=(room.goldRewardExcludedPairs??[]).some(pair=>room.players.length===2&&room.players.every(player=>pair.includes(player.id)))
      const goldEligible=!friends.length&&!invited
      await change(`INSERT INTO matches(id,source,variant,status,rated,room_ref,room_name_snapshot,province_snapshot,initial_time_ms,turn_limit_ms,initial_state,gold_reward_eligible,rules_version,rating_rules_version,started_at)
        VALUES (?,'server_online',?,'playing',1,?,?,?,?,?,?,?,'game-v1','stars-v2',UTC_TIMESTAMP(3))`,[id,room.game.variant??'xiangqi',room.id,room.name,room.province??null,(room.minutes??10)*60000,(room.turnSeconds??60)*1000,JSON.stringify(room.game),Number(goldEligible)],c)
      for(const side of ['red','black'] as const) {
        const user=users[side],profile=await rows('SELECT display_name FROM users WHERE id=?',[user],c)
        const stats=await rows('SELECT elo FROM user_game_stats WHERE user_id=? AND variant=? FOR UPDATE',[user,room.game.variant??'xiangqi'],c)
        const elo=Number(stats[0].elo)
        await change('INSERT INTO match_players(match_id,side,user_id,name_snapshot,elo_before,elo_delta,elo_after) VALUES (?,?,?,?,?,0,?)',[id,side,user,String(profile[0].display_name),elo,elo],c)
        if(!unlimited.has(user)) {
          const energy=resources.get(user)!.energy-1
          await change('UPDATE user_resources SET energy=?,energy_recovery_at=IF(?<5,COALESCE(energy_recovery_at,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 7 MINUTE)),NULL),version=version+1 WHERE user_id=?',[energy,energy,user],c)
          await this.account.ledger(c,user,'energy',-1,'online_match_start',`start:${id}:${user}`,id)
        }
      }
    })
  }
  async complete(id:string,room:RoomSnapshot,states:GameState[]) {
    await transaction(async c=>{
      const m=await rows('SELECT status,variant,gold_reward_eligible FROM matches WHERE id=? FOR UPDATE',[id],c)
      if(!m.length||m[0].status!=='playing')return
      const final=states.at(-1)!,result=final.result
      if(!result||final.phase!=='finished')throw new Error('Missing authoritative result')
      const players=await rows('SELECT side,CAST(user_id AS CHAR) userId,elo_before FROM match_players WHERE match_id=? ORDER BY user_id FOR UPDATE',[id],c)
      const variant=String(m[0].variant)
      const userIds=players.map(player=>String(player.userId)).sort((a,b)=>BigInt(a)<BigInt(b)?-1:1)
      const friends=await rows("SELECT 1 FROM friendships WHERE user_low_id=? AND user_high_id=? AND status='accepted'",userIds,c)
      const goldEligible=Number(m[0].gold_reward_eligible)===1&&!friends.length
      for(const p of players) {
        const side=p.side as Side,won=result.winner===side,draw=result.winner===null
        const opponent=players.find(x=>x.side!==side)!
        const delta=ratingDelta(Number(p.elo_before),Number(opponent.elo_before),draw?'draw':won?'win':'loss')
        await change('UPDATE match_players SET elo_delta=?,elo_after=elo_before+? WHERE match_id=? AND side=?',[delta,delta,id,side],c)
        const stats=await rows('SELECT current_win_streak FROM user_game_stats WHERE user_id=? AND variant=? FOR UPDATE',[String(p.userId),variant],c)
        const streak=won?Number(stats[0].current_win_streak)+1:0
        await change('UPDATE user_game_stats SET elo=elo+?,played_count=played_count+1,win_count=win_count+?,draw_count=draw_count+?,loss_count=loss_count+?,current_win_streak=?,best_win_streak=GREATEST(best_win_streak,?) WHERE user_id=? AND variant=?',[delta,won?1:0,draw?1:0,!draw&&!won?1:0,streak,streak,String(p.userId),variant],c)
        if(won&&goldEligible) {
          const gold=randomInt(125,151)
          await change('UPDATE user_resources SET gold=gold+?,version=version+1 WHERE user_id=?',[gold,String(p.userId)],c)
          await this.account.ledger(c,String(p.userId),'gold',gold,'online_match_win',`win:${id}:${p.userId}`,id)
        }
        const totals=await rows('SELECT SUM(played_count) played,MAX(best_win_streak) streak FROM user_game_stats WHERE user_id=?',[String(p.userId)],c)
        const honors=await rows("SELECT code,category,criteria FROM honors WHERE category IN ('games','streak') AND active=1",[],c)
        for(const h of honors)if(Number(totals[0][h.category==='games'?'played':'streak'])>=Number(h.criteria.threshold))await change('INSERT INTO user_honors(user_id,honor_code,source_match_id) VALUES (?,?,?) ON DUPLICATE KEY UPDATE user_id=user_honors.user_id',[String(p.userId),String(h.code),id],c)
      }
      let ply=0
      for(let i=1;i<states.length;i++) {
        const after=states[i],before=states[i-1],move=after.lastMove
        if(!move||JSON.stringify(before.board)===JSON.stringify(after.board))continue
        const uci=String.fromCharCode(97+move.from.col)+(9-move.from.row)+String.fromCharCode(97+move.to.col)+(9-move.to.row)
        await change('INSERT INTO match_moves(match_id,ply,side,from_row,from_col,to_row,to_col,uci,state_after,accepted_at) VALUES (?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(3))',[id,++ply,before.currentTurn,move.from.row,move.from.col,move.to.row,move.to.col,uci,JSON.stringify(after)],c)
      }
      await change("UPDATE matches SET status='finished',final_state=?,winner_side=?,finish_reason=?,ended_at=UTC_TIMESTAMP(3),history_expires_at=DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 1 MONTH) WHERE id=?",[JSON.stringify(final),result.winner,result.reason,id],c)
    })
  }
}
