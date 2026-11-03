import { useEffect,useRef,useState } from 'react'
import { GoogleSignInButton } from './GoogleSignInButton'
export function GoogleLinkDialog({onClose}:{onClose:()=>void}){
  const dialog=useRef<HTMLDialogElement>(null)
  const [error,setError]=useState('')
  useEffect(()=>{dialog.current?.showModal()},[])
  return <dialog ref={dialog} aria-label="Liên kết Google" onCancel={event=>{event.preventDefault();onClose()}} className="m-auto w-[min(440px,calc(100vw-24px))] rounded-xl border-2 border-[#d29a43] bg-[#241007] p-5 text-[#ffe5a6] backdrop:bg-black/60">
    <p className="mb-4 text-center">Liên kết Google để bảo vệ tài khoản hiện tại</p>
    <div className="h-12"><GoogleSignInButton link onComplete={onClose} onError={setError}/></div>
    {error&&<p role="alert" className="mt-3">{error}</p>}
    <button type="button" onClick={onClose} className="mt-4 block w-full text-right">Thoát</button>
  </dialog>
}

