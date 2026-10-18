interface GoogleIdentity {
  initialize(options:{client_id:string;nonce:string;auto_select:boolean;ux_mode:'popup';callback:(response:{credential:string})=>void}):void
  renderButton(container:HTMLElement,options:{type:'standard';theme:'outline';size:'large';text:'signin_with';width:number;locale:string}):void
  disableAutoSelect():void
}
declare global { interface Window { google?:{accounts:{id:GoogleIdentity}} } }
let loading:Promise<GoogleIdentity>|undefined
export function loadGoogleIdentity():Promise<GoogleIdentity>{
  if(window.google)return Promise.resolve(window.google.accounts.id)
  return loading??=new Promise((resolve,reject)=>{
    const script=document.createElement('script')
    script.src='https://accounts.google.com/gsi/client'
    script.async=true
    const timer=window.setTimeout(()=>{script.remove();loading=undefined;reject(new Error('Tải Google quá lâu. Vui lòng thử lại.'))},15000)
    script.onload=()=>{clearTimeout(timer);if(window.google)resolve(window.google.accounts.id);else{loading=undefined;reject(new Error('Không tải được Google.'))}}
    script.onerror=()=>{clearTimeout(timer);script.remove();loading=undefined;reject(new Error('Không kết nối được Google.'))}
    document.head.append(script)
  })
}
