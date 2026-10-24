import type { CSSProperties, RefObject } from 'react'
import panel from '../../../assets/energy-shop/panel-no-count.png'
import close from '../../../assets/energy-shop/close.png'
import { useProfileLayout } from '../hooks/useProfileLayout'
import { buttonInteraction } from '../../../lib/uiClasses'

const offers = [
  {label:'Xem video nhận năng lượng',left:'6.6%',title:'Xem video',description:'Nhận ngay 1 Năng lượng.',action:'XEM',iconX:170,iconHeight:268,surface:'bg-[linear-gradient(135deg,#613512,#281307)]'},
  {label:'Mua gói 100 năng lượng',left:'37.8%',title:'Gói 100 năng lượng',description:'Mua gói để nhận 100 Năng lượng. Dùng thoải mái cho các ván đấu.',action:'19.000đ',iconX:700,iconHeight:268,surface:'bg-[linear-gradient(135deg,#123c5b,#071c2d)]'},
  {label:'Mua năng lượng vô hạn',left:'68.8%',title:'Năng lượng vô hạn',description:'Chơi không giới hạn Năng lượng trong 30 ngày.',action:'39.000đ',iconX:1220,iconHeight:257,surface:'bg-[linear-gradient(135deg,#174827,#061f11)]'},
] as const

function EnergyArtworkCrop({x,y,width,height}:{x:number;y:number;width:number;height:number}) {
  return <span aria-hidden="true" className="relative block w-full overflow-hidden" style={{aspectRatio:`${width}/${height}`}}><img src={panel} alt="" className="pointer-events-none absolute block h-auto max-w-none" style={{width:`${1690/width*100}%`,left:`${-x/width*100}%`,top:`${-y/height*100}%`}} /></span>
}

export function EnergyDialog({dialogRef,onUnavailable}:{dialogRef:RefObject<HTMLDialogElement|null>;onUnavailable:()=>void}) {
  const layout = useProfileLayout()
  const chooseOffer = () => {dialogRef.current?.close();onUnavailable()}
  return <dialog ref={dialogRef} aria-label="Năng lượng" className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-black/65 compact:landscape:!w-[min(80vw,calc(78dvh_*_2.1),1160px)] compact:portrait:!w-[var(--energy-mobile-width)] compact:portrait:!h-[var(--energy-mobile-height)] compact:portrait:-translate-y-[6px]" style={{width:'min(68vw, calc(78dvh * 2.1), 980px)','--energy-mobile-width':`${layout.width*layout.scale}px`,'--energy-mobile-height':`${layout.height*layout.scale}px`} as CSSProperties}>
    <div className="relative compact:portrait:hidden">
      <img src={panel} alt="Năng lượng: xem video, gói 100 năng lượng, năng lượng vô hạn" className="m-0 block h-auto w-full border-0 p-0" />
      <button type="button" aria-label="Đóng Năng lượng" onClick={()=>dialogRef.current?.close()} className="absolute right-[1%] top-[10%] m-0 h-fit w-[5.2%] cursor-pointer border-0 bg-transparent p-0 leading-none shadow-none hover:brightness-110"><img src={close} alt="" className="m-0 block h-auto w-full border-0 p-0" /></button>
      {offers.map(item=><button key={item.label} type="button" aria-label={item.label} onClick={chooseOffer} className="absolute top-[76.9%] h-[10.4%] w-[24.7%] cursor-pointer border-0 bg-transparent p-0 hover:bg-[#ffd34e]/20 active:bg-[#ffd34e]/30" style={{left:item.left,clipPath:'polygon(4% 0,96% 0,100% 17%,100% 83%,96% 100%,4% 100%,0 83%,0 17%)'}} />)}
    </div>
    <div className="relative hidden h-full flex-col rounded-xl border-[3px] border-[#5e3014] bg-[linear-gradient(135deg,#7a431c,#2d160a)] p-3 text-[#fff0cf] shadow-[inset_0_0_0_2px_#e0b466,inset_0_0_0_5px_#875026,inset_0_0_0_7px_#160904] [container-type:inline-size] compact:portrait:flex">
      <header className="relative flex shrink-0 items-center justify-center pb-2">
        <div className="w-[88%]"><EnergyArtworkCrop x={340} y={0} width={1010} height={195} /></div>
        <button type="button" aria-label="Đóng Năng lượng" onClick={()=>dialogRef.current?.close()} className={`${buttonInteraction} absolute right-0 top-0 m-0 w-[9cqw] border-0 bg-transparent p-0 hover:brightness-110`}><img src={close} alt="" className="block h-auto w-full" /></button>
      </header>
      <div className="grid min-h-0 flex-1 grid-rows-3 gap-2">
        {offers.map(item=><section key={item.label} className={`${item.surface} grid min-h-0 grid-cols-[38%_1fr] items-center gap-2 rounded-lg border-2 border-[#c69a48] p-2 shadow-[inset_0_0_0_1px_#5c3514]`}>
          <EnergyArtworkCrop x={item.iconX} y={330} width={300} height={item.iconHeight} />
          <div className="flex min-w-0 flex-col items-center gap-[2cqw] text-center">
            <h3 className="m-0 font-heading text-[5.3cqw] font-bold leading-tight text-[#ffe5a6]">{item.title}</h3>
            <p className="m-0 text-[4.2cqw] leading-snug">{item.description}</p>
            <button type="button" aria-label={item.label} onClick={chooseOffer} className={`${buttonInteraction} flex w-full items-center justify-center whitespace-nowrap rounded border-2 border-[#ffe4a0] bg-[linear-gradient(#ffe485,#e6a51d)] px-2 py-[1.5cqw] font-number text-[5cqw] font-bold not-italic leading-none text-[#281708] lining-nums tabular-nums shadow-[inset_0_0_0_1px_#a46b16] hover:brightness-110`}>{item.action}</button>
          </div>
        </section>)}
      </div>
    </div>
  </dialog>
}
