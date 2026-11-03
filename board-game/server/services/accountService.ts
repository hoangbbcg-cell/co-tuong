import { createHash, randomBytes, randomInt } from 'node:crypto'
import { AccountRepository } from '../repositories/accountRepository'
import { UserService } from './userService'
import { UserRepository } from '../repositories/userRepository'
import { COUNTRY_CODES } from '../../src/lib/profileLocation'
import { resolveVietnamLocation } from './administrativeLocation'

import { AccountError } from '../errors'
import { verifyGoogleCredential } from './googleIdentity'
export const hashCredential = (token:string) => createHash('sha256').update(token).digest('hex')
export class AccountService {
  constructor(readonly repository=new AccountRepository()) {}
  async google(credential:unknown,nonce:string,sessionToken:unknown,expectedActor:string|null) {
    const sub=await verifyGoogleCredential(credential,nonce)
    const actor=await this.authenticate(sessionToken)
    if(actor!==expectedActor)throw new AccountError('Phiên tài khoản đã thay đổi hoặc hết hạn. Vui lòng thử lại.',401)
    const session=randomBytes(32).toString('hex')
    for(let attempt=0;attempt<30;attempt++){
      try{
        const id=await this.repository.google(sub,actor,String(randomInt(0,1_000_000)).padStart(6,'0'),String(randomInt(10_000_000,100_000_000)),hashCredential(session))
        return {profile:await this.repository.profile(id),session}
      }catch(error){if(!error||typeof error!=='object'||!('code'in error)||!['ER_DUP_ENTRY','ER_LOCK_DEADLOCK'].includes(String(error.code)))throw error}
    }
    throw new AccountError('Không thể liên kết Google lúc này. Vui lòng thử lại.',409)
  }
  async authenticate(token:unknown,device=false) {
    return typeof token==='string' && /^[a-f0-9]{64}$/.test(token) ? this.repository.byCredential(hashCredential(token),device):null
  }
  async guest(deviceToken:unknown, allowCreate=true) {
    let id=await this.authenticate(deviceToken,true)
    if(!id&&!allowCreate)throw new AccountError('Thiết bị chưa có tài khoản khách.',401)
    const device=typeof deviceToken==='string' && id ? deviceToken:randomBytes(32).toString('hex')
    const session=randomBytes(32).toString('hex')
    if(id&&!await this.repository.resumeGuest(id,hashCredential(device),hashCredential(session)))id=null
    if(!id&&!allowCreate)throw new AccountError('Không thể khôi phục tài khoản khách trên thiết bị này.',401)
    if(!id) for(let attempt=0;attempt<30;attempt++) {
      try { id=await this.repository.create(String(randomInt(0,1_000_000)).padStart(6,'0'),String(randomInt(10_000_000,100_000_000)),hashCredential(device),hashCredential(session));break }
      catch(error){if(!error || typeof error!=='object' || !('code' in error) || error.code!=='ER_DUP_ENTRY')throw error}
    }
    if(!id) throw new AccountError('Không cấp được mã khách. Vui lòng thử lại.',503)
    return {profile:await this.repository.profile(id),device,session}
  }
  async rename(id:string,name:unknown) {
    if(typeof name!=='string') throw new AccountError('Tên không hợp lệ.')
    try { await new UserService(new UserRepository()).rename(id,name) } catch { throw new AccountError('Chỉ tài khoản đã liên kết và chưa đổi tên được đổi tên.') }
  }
  async location(id:string,input:Record<string,unknown>) {
    const country=input.countryCode
    if(typeof country!=='string' || !COUNTRY_CODES.includes(country))throw new AccountError('Quốc gia không hợp lệ.')
    const field=(key:string,limit:number) => { const v=input[key]; if(v==null || v==='') return null; if(typeof v!=='string'||v.length>limit)throw new AccountError('Địa giới không hợp lệ.');return v.trim() }
    let provinceCode=field('provinceCode',16),provinceName=field('provinceName',100),wardCode=field('wardCode',16),wardName=field('wardName',100)
    if(country==='VN' && (!provinceCode||!provinceName||!wardCode||!wardName))throw new AccountError('Cần chọn tỉnh/thành và xã/phường.')
    if(country==='VN'){const verified=await resolveVietnamLocation(provinceCode!,wardCode!);provinceName=verified.provinceName;wardName=verified.wardName}
    else {provinceCode=null;provinceName=null;wardCode=null;wardName=null}
    if(!await this.repository.location(id,country,provinceCode,provinceName,wardCode,wardName))throw new AccountError('Quốc gia/địa chỉ đã lưu và không thể đổi.',409)
  }
}
