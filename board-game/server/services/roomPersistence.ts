import { randomUUID } from 'node:crypto'
import type { RoomSnapshot } from '../../src/types/room'
import { AccountRepository } from '../repositories/accountRepository'
import { MatchRepository } from '../repositories/matchRepository'
import { AccountError } from '../errors'
import { ContentRepository } from '../repositories/contentRepository'
import { recoverEnergy } from '../../src/lib/energy'

export class RoomPersistence {
  waitForCommands:()=>Promise<void>=async()=>{}
  readonly identities=new Map<string,{id:string;name:string;credentialHash?:string}>()
  private energy=new Map<string,{ value: number; recoveryAt: number | null; unlimited: boolean }>()
  private active=new Map<string,string>()
  private pending:(()=>Promise<void>)[]=[]
  private flushing:Promise<void>|null=null
  constructor(private matches=new MatchRepository(),private accounts=new AccountRepository()){}
  observe(room:RoomSnapshot) {
    if(room.game.phase==='playing'&&!this.active.has(room.id)) {
      const red=this.identities.get(room.players.find(p=>p.side==='red')?.id??'')
      const black=this.identities.get(room.players.find(p=>p.side==='black')?.id??'')
      if(!red||!black||red.id===black.id)throw new AccountError('Cáº§n hai tÃ i khoáº£n khÃ¡c nhau Ä‘á»ƒ Ä‘áº¥u.')
      const id=randomUUID(),snapshot=structuredClone(room)
      this.active.set(room.id,id)
      room.activeMatchId=id
      this.pending.push(async()=>{
        await this.matches.start(id,snapshot,{red:red.id,black:black.id})
        await this.prepareStarts(snapshot.players.map(player=>player.id))
      })
    }
    if(room.game.phase==='playing') room.activeMatchId=this.active.get(room.id)
    else delete room.activeMatchId
    if(room.game.phase==='finished'&&room.lastCompletedMatch&&this.active.has(room.id)) {
      const id=this.active.get(room.id)!
      room.lastCompletedMatch.id=id
      const snapshot=structuredClone(room),states=structuredClone(room.lastCompletedMatch.states)
      this.active.delete(room.id)
      this.pending.push(()=>this.matches.complete(id,snapshot,states))
    }
  }
  async flush() {
    if(this.flushing)return this.flushing
    this.flushing=(async()=>{while(this.pending.length){await this.pending[0]();this.pending.shift()}})()
    try {await this.flushing} finally{this.flushing=null}
  }
  async canPlay(socketId:string,room?:RoomSnapshot) {
    const identity=this.identities.get(socketId)
    if(!identity)throw new AccountError('Cần đăng nhập.',401)
    const profile=await this.accounts.profile(identity.id)
    this.energy.set(socketId,{ value: profile?.energy ?? 0, recoveryAt: profile?.energyRecoveryAt ?? null, unlimited: !!profile?.energyUnlimited })
    if(room)await this.prepareStarts([socketId],[room])
    if(!profile||!this.hasEnergy(socketId,room))throw new AccountError('Không đủ năng lượng.')
  }
  async authorize(socketId:string) {
    const identity=this.identities.get(socketId)
    if(!identity?.credentialHash||await this.accounts.byCredential(identity.credentialHash)!==identity.id)throw new AccountError('Phiên đăng nhập đã kết thúc.',401)
  }
  async activity(socketId:string){const identity=this.identities.get(socketId);if(identity)await new ContentRepository().activity(identity.id)}
  async prepareStarts(ids:string[],rooms:RoomSnapshot[]=[]) {
    for(const id of [...new Set(ids)]){const identity=this.identities.get(id);const profile=identity?await this.accounts.profile(identity.id):null;this.energy.set(id,{ value: profile?.energy ?? 0, recoveryAt: profile?.energyRecoveryAt ?? null, unlimited: !!profile?.energyUnlimited })}
    for(const room of rooms) {
      delete room.friendEnergyExemptPair
      const players = room.players.map(player=>player.id)
      if(players.length===1) {
        const candidates=ids.filter(id=>!players.includes(id))
        if(candidates.length===1)players.push(candidates[0])
      }
      if(players.length!==2)continue
      const first=this.identities.get(players[0])?.id,second=this.identities.get(players[1])?.id
      if(first&&second&&await this.matches.areFriends(first,second))room.friendEnergyExemptPair=[players[0],players[1]]
    }
  }
  private friendEnergyEligible(socketId: string, room?: RoomSnapshot) {
    const pair = room?.friendEnergyExemptPair
    return !!pair && pair.includes(socketId) && room!.players.length > 0 && room!.players.length <= 2
      && room!.players.every(player => pair.includes(player.id))
  }
  hasEnergy(socketId: string, room?:RoomSnapshot) {
    const cached = this.energy.get(socketId)
    return !!cached && (this.friendEnergyEligible(socketId, room) || cached.unlimited || recoverEnergy(cached.value, cached.recoveryAt, Date.now()).energy > 0)
  }
  canStart(room:RoomSnapshot) {
    const users=room.players.map(p=>this.identities.get(p.id)?.id)
    return room.players.length===2&&users[0]!==users[1]&&room.players.every(p=>this.hasEnergy(p.id,room))
  }
}
