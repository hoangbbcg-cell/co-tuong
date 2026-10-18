export const isMessageImage = (value:string) => /^\/media\/message-images\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.(jpg|png|webp|gif)$/.test(value)

export async function prepareMessageImage(file:File):Promise<string> {
  if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)||file.size>10*1024*1024)throw new Error('Ch?n ?nh PNG, JPEG, WebP ho?c GIF kh?ng qu? 10 MB.')
  return new Promise((resolve,reject)=>{
    const reader=new FileReader()
    reader.onload=()=>typeof reader.result==='string'?resolve(reader.result):reject(new Error('Kh?ng ??c ???c ?nh.'))
    reader.onerror=()=>reject(new Error('Kh?ng ??c ???c ?nh.'))
    reader.readAsDataURL(file)
  })
}
