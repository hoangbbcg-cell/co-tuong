import type { RefObject } from 'react'
import panel from '../../../assets/energy-shop/panel-no-count.png'
import close from '../../../assets/energy-shop/close.png'

export function EnergyDialog({dialogRef,onUnavailable}:{dialogRef:RefObject<HTMLDialogElement|null>;onUnavailable:()=>void}) {
  return <dialog ref={dialogRef} aria-label="Năng lượng" className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-black/65" style={{width:'min(68vw, calc(78dvh * 2.1), 980px)'}}>
    <div className="relative">
      <img src={panel} alt="Năng lượng: xem video, gói 100 năng lượng, năng lượng vô hạn" className="m-0 block h-auto w-full border-0 p-0" />
      <button type="button" aria-label="Đóng Năng lượng" onClick={()=>dialogRef.current?.close()} className="absolute right-[1%] top-[10%] m-0 h-fit w-[5.2%] cursor-pointer border-0 bg-transparent p-0 leading-none shadow-none hover:brightness-110"><img src={close} alt="" className="m-0 block h-auto w-full border-0 p-0" /></button>
      {[{label:'Xem video nhận năng lượng',left:'6.6%'},{label:'Mua gói 100 năng lượng',left:'37.8%'},{label:'Mua năng lượng vô hạn',left:'68.8%'}].map(item=><button key={item.label} type="button" aria-label={item.label} onClick={()=>{dialogRef.current?.close();onUnavailable()}} className="absolute top-[76.9%] h-[10.4%] w-[24.7%] cursor-pointer border-0 bg-transparent p-0 hover:bg-[#ffd34e]/20 active:bg-[#ffd34e]/30" style={{left:item.left,clipPath:'polygon(4% 0,96% 0,100% 17%,100% 83%,96% 100%,4% 100%,0 83%,0 17%)'}} />)}
    </div>
  </dialog>
}
