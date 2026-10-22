import { useEffect, useRef, useState } from 'react'
import { accountApi } from '../../../services/accountApi'
import { errorMessage } from '../../../services/api'
import { loadGoogleIdentity } from '../../../services/googleIdentity'
import { useEntryStore } from '../../../store/entryStore'
import { googleOriginError } from '../../../lib/googleOrigin'

/** GIS renders the real popup button; do not simulate clicks or use One Tap as a chooser. */
export function GoogleSignInButton({onComplete,onError,link=false}:{onComplete?:()=>void;onError:(message:string)=>void;link?:boolean}){
  const container=useRef<HTMLDivElement>(null)
  const callbacks=useRef({onComplete,onError});callbacks.current={onComplete,onError}
  const [pending,setPending]=useState(false)
  const [retry,setRetry]=useState(0)
  const [ready,setReady]=useState(false)
  const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID as string|undefined
  const originError=googleOriginError(window.location)
  useEffect(()=>{
    if(!clientId)return
    if(originError){callbacks.current.onError(originError);return}
    let active=true
    setReady(false)
    void Promise.all([loadGoogleIdentity(),accountApi.googleNonce(link)]).then(([gis,nonce])=>{
      if(!active||!container.current)return
      gis.initialize({client_id:clientId,nonce,auto_select:false,ux_mode:'popup',callback:response=>{
        if(!active)return
        setPending(true)
        void useEntryStore.getState().enterGoogle(response.credential).then(()=>{callbacks.current.onComplete?.()}).catch(error=>{
          if(active){callbacks.current.onError(errorMessage(error));setRetry(value=>value+1)}
        }).finally(()=>{if(active)setPending(false)})
      }})
      container.current.replaceChildren()
      gis.renderButton(container.current,{type:'standard',theme:'outline',size:'large',text:'signin_with',width:Math.max(200,Math.min(400,container.current.clientWidth)),locale:'vi'})
      setReady(true)
    }).catch(error=>{if(active)callbacks.current.onError(errorMessage(error))})
    return()=>{active=false}
  },[clientId,retry,link,originError])
  return <div className="relative flex size-full items-center justify-center">
    <div ref={container} className={`flex w-full justify-center ${pending?'pointer-events-none opacity-50':''}`} />
    {!ready&&!pending&&!originError&&<button type="button" aria-label="Đăng nhập với Google" className="absolute inset-0 cursor-pointer font-bold" onClick={()=>{if(!clientId)callbacks.current.onError('Đăng nhập Google chưa được cấu hình.');else setRetry(value=>value+1)}}>{clientId?'Tải đăng nhập Google…':'Đăng nhập với Google'}</button>}
    {pending&&<span role="status" aria-label="Đang đăng nhập Google" className="absolute size-7 animate-spin rounded-full border-2 border-[#613014]/30 border-t-[#613014]" />}
  </div>
}
