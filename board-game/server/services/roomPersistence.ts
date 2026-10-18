import { randomUUID } from 'node:crypto'
import type { RoomSnapshot } from '../../src/types/room'
import { AccountRepository } from '../repositories/accountRepository'
import { MatchRepository } from '../repositories/matchRepository'
import { AccountError } from '../errors'
import { ContentRepository } from '../repositories/contentRepository'

/** Server snapshots only. Failed writes remain queued and block subsequent room commands until retry. */
export class RoomPersistence {
  waitForCommands:()=>Promise<void>=async()=>{}
  readonly identities=new Map<string,{id:string;name:string;credentialHash?:string}>()
  private energy=new Map<string,number>()
  private active=new Map<string,string>()
  private pending:(()=>Promise<void>)[]=[]
  private flushing:Promise<void>|null=null
  constructor(private matches=new MatchRepository(),private accounts=new AccountRepository()){}
  observe(room:RoomSnapshot) {
    if(room.game.phase==='playing'&&!this.active.has(room.id)) {
      const red=this.identities.get(room.players.find(p=>p.side==='red')?.id??''),black=this.identities.get(room.players.find(p=>p.side==='black')?.id??'')
      if(!red||!black||red.id===black.id)throw new AccountError('Cần hai tài khoản khác nhau để đấu.')
      const id=randomUUID(),snapshot=structuredClone(room)
      this.active.set(room.id,id)
      this.pending.push(()=>this.matches.start(id,snapshot,{red:red.id,black:black.id}))
    }
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
  async canPlay(socketId:string) {
    const identity=this.identities.get(socketId)
    if(!identity)throw new AccountError('Cần đăng nhập.',401)
    const profile=await this.accounts.profile(identity.id)
    this.energy.set(socketId,profile?.energy??0)
    if(!profile||profile.energy<1)throw new AccountError('Không đủ năng lượng.')
  }
  async authorize(socketId:string) {
    const identity=this.identities.get(socketId)
    if(!identity?.credentialHash||await this.accounts.byCredential(identity.credentialHash)!==identity.id)throw new AccountError('Phiên đăng nhập đã kết thúc.',401)
  }
  async activity(socketId:string){const identity=this.identities.get(socketId);if(identity)await new ContentRepository().activity(identity.id)}
  async prepareStarts(ids:string[]) {
    for(const id of [...new Set(ids)]){const identity=this.identities.get(id);const profile=identity?await this.accounts.profile(identity.id):null;this.energy.set(id,profile?.energy??0)}
  }
  canStart(room:RoomSnapshot) {
    const users=room.players.map(p=>this.identities.get(p.id)?.id)
    return room.players.length===2&&users[0]!==users[1]&&room.players.every(p=>(this.energy.get(p.id)??0)>0)
  }
}
