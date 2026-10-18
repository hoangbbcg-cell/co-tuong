import { AccountError } from '../errors'
interface Province {name:string;wards:{code:number;name:string}[]}
const cache=new Map<string,{expires:number;province:Province}>()
export async function resolveVietnamLocation(provinceCode:string,wardCode:string) {
  if(!/^\d{1,3}$/.test(provinceCode)||!/^\d{1,6}$/.test(wardCode))throw new AccountError('Mã địa giới không hợp lệ.')
  let entry=cache.get(provinceCode)
  if(!entry||entry.expires<Date.now()) {
    try{
      const response=await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`,{signal:AbortSignal.timeout(10000)})
      if(!response.ok)throw new Error('Location service failed')
      const data:unknown=await response.json()
      if(!data||typeof data!=='object'||!('name' in data)||typeof data.name!=='string'||!('wards' in data)||!Array.isArray(data.wards))throw new Error('Invalid location response')
      const wards=data.wards.filter((v):v is {code:number;name:string}=>!!v&&typeof v==='object'&&typeof v.code==='number'&&typeof v.name==='string')
      entry={expires:Date.now()+86400000,province:{name:data.name,wards}}
      cache.set(provinceCode,entry)
    }catch{throw new AccountError('Không xác minh được địa giới. Vui lòng thử lại.',503)}
  }
  const ward=entry.province.wards.find(w=>String(w.code)===String(Number(wardCode)))
  if(!ward)throw new AccountError('Xã/phường không thuộc tỉnh/thành đã chọn.')
  return {provinceName:entry.province.name,wardName:ward.name}
}
