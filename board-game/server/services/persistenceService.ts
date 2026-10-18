import { AccountError } from '../errors'
import { SocialRepository } from '../repositories/socialRepository'
import { ContentRepository } from '../repositories/contentRepository'
import type { GameState } from '../../src/types/game'
import { isInsideBoard } from '../../src/game/rules'

export const userId=(value:unknown):string=>{
  if(typeof value!=='string'||! /^[1-9]\d{0,19}$/.test(value)||BigInt(value)>18446744073709551615n)throw new AccountError('User ID không hợp lệ.')
  return value
}
export const uuid=(value:unknown):string=>{
  if(typeof value!=='string'||! /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(value))throw new AccountError('ID không hợp lệ.')
  return value
}
export const text=(value:unknown,max:number):string=>{
  if(typeof value!=='string'||!value.trim()||Array.from(value.trim()).length>max)throw new AccountError(`Nội dung phải từ 1 đến ${max} ký tự.`)
  return value.trim().normalize('NFC')
}

export function groupAvatarBytes(value:unknown):Buffer {
  if(typeof value!=='string'||value.length>120_000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value))throw new AccountError('Ảnh không hợp lệ hoặc quá lớn.')
  const bytes=Buffer.from(value.slice(value.indexOf(',')+1),'base64')
  if(bytes.length<4||bytes[0]!==255||bytes[1]!==216||bytes[bytes.length-2]!==255||bytes[bytes.length-1]!==217)throw new AccountError('Ảnh phải là JPEG hợp lệ.')
  return bytes
}
export function messageImageData(value:unknown):{bytes:Buffer;extension:'jpg'|'png'|'webp'|'gif'} {
  if(typeof value!=='string'||value.length>14_000_000)throw new AccountError('?nh qu? l?n.')
  const match=/^data:image\/(jpeg|png|webp|gif);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value)
  if(!match)throw new AccountError('??nh d?ng ?nh kh?ng h?p l?.')
  const bytes=Buffer.from(match[2],'base64')
  if(!bytes.length||bytes.length>10*1024*1024)throw new AccountError('?nh qu? l?n.')
  const format=match[1]
  const valid=format==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    :format==='gif'?['GIF87a','GIF89a'].includes(bytes.subarray(0,6).toString('ascii'))
    :format==='webp'?bytes.subarray(0,4).toString('ascii')==='RIFF'&&bytes.subarray(8,12).toString('ascii')==='WEBP'
    :bytes.length>=4&&bytes[0]===255&&bytes[1]===216&&bytes[bytes.length-2]===255&&bytes[bytes.length-1]===217
  if(!valid)throw new AccountError('N?i dung ?nh kh?ng h?p l?.')
  return {bytes,extension:format==='jpeg'?'jpg':format as 'png'|'webp'|'gif'}
}
export function validatePosition(value:unknown):GameState {
  if(!value||typeof value!=='object')throw new AccountError('Thế cờ không hợp lệ.')
  const state=value as GameState
  const types=['rook','horse','elephant','advisor','general','cannon','soldier']
  if(!Array.isArray(state.board)||state.board.length!==10||!state.board.every(row=>Array.isArray(row)&&row.length===9&&row.every(piece=>piece===null||(typeof piece==='object'&&piece!==null&&typeof piece.id==='string'&&piece.id.length<=80&&types.includes(piece.type)&&['red','black'].includes(piece.side)&&typeof piece.name==='string'&&piece.name.length<=20))))throw new AccountError('Bàn cờ không hợp lệ.')
  if(!['red','black'].includes(state.currentTurn)||!['ready','playing','finished'].includes(state.phase)||!['xiangqi','jieqi'].includes(state.variant??'xiangqi'))throw new AccountError('Trạng thái không hợp lệ.')
  if(state.lastMove&&(!isInsideBoard(state.lastMove.from.row,state.lastMove.from.col)||!isInsideBoard(state.lastMove.to.row,state.lastMove.to.col)))throw new AccountError('Nước đi không hợp lệ.')
  if(!state.remainingTime||!Number.isFinite(state.remainingTime.red)||!Number.isFinite(state.remainingTime.black))throw new AccountError('Đồng hồ không hợp lệ.')
  return state
}
export class PersistenceService {
  readonly social=new SocialRepository()
  readonly content=new ContentRepository()
  target(actor:string,target:unknown){const id=userId(target);if(id===actor)throw new AccountError('Không thể thực hiện với chính mình.');return id}
  async socialAction(id:string,input:Record<string,unknown>) {
    const target=this.target(id,input.targetId),action=input.action
    if(action==='request'||action==='accept'||action==='remove')await this.social.friendship(id,target,action)
    else if(action==='follow')await this.social.relation(id,target,'follow',input.enabled===true)
    else if(action==='message-block')await this.social.block(id,target,input.enabled===true)
    else throw new AccountError('Thao tác không hợp lệ.')
  }
  async createConversation(id:string,input:Record<string,unknown>) {
    if(!Array.isArray(input.members)||input.members.length>50)throw new AccountError('Danh sách thành viên không hợp lệ (tối đa 50 người được thêm).')
    const members=[...new Set(input.members.map(x=>this.target(id,x)))]
    const title=input.title==null?null:text(input.title,80)
    if(title===null&&members.length!==1)throw new AccountError('Chat trực tiếp cần đúng một người nhận.')
    return this.social.createConversation(id,members,title)
  }
  async position(id:string,input:Record<string,unknown>) {
    if(!Number.isInteger(input.moveNumber)||Number(input.moveNumber)<0||Number(input.moveNumber)>100000)throw new AccountError('Số nước không hợp lệ.')
    await this.content.savePosition(id,{id:uuid(input.id),title:text(input.title,120),note:input.note===''?'':text(input.note,2000),boardState:validatePosition(input.boardState),moveNumber:Number(input.moveNumber),redName:text(input.redName,32),blackName:text(input.blackName,32),sourceMatchId:input.sourceMatchId?uuid(input.sourceMatchId):undefined})
  }
}

