import mainPlaque from '../../assets/shop/heading-main.png'
import subtitlePlaque from '../../assets/shop/heading-subtitle.png'
import clockPlaque from '../../assets/shop/heading-clock.png'

export function MarketHeading({ title = 'Phiên Chợ Hàng Ngày' }: { title?: string }) {
  const surface = 'bg-[length:100%_100%] bg-center bg-no-repeat'
  return <div className="relative -top-[10px] flex w-full flex-col items-center gap-[4px] text-center">
    <h2 className={`${surface} m-0 max-w-[96%] px-10 py-[4px] font-georgia text-[clamp(24px,3vw,44px)] font-bold leading-[1.2] compact:px-6 compact:text-[clamp(18px,5vw,26px)]`} style={{ backgroundImage: `url(${mainPlaque})` }}>
      <span className="block whitespace-nowrap bg-[linear-gradient(180deg,#F7ED96,#FBC12E)] bg-clip-text text-transparent [filter:drop-shadow(0_2px_1px_#210900)]">{title}</span>
    </h2>
    <p className={`${surface} m-0 px-10 py-[4px] font-georgia text-[clamp(12px,1.2vw,18px)] leading-tight text-[#fff0c7] compact:px-7 compact:text-xs`} style={{ backgroundImage: `url(${subtitlePlaque})` }}>Hàng thay mới mỗi ngày</p>
    <p className={`${surface} m-0 flex items-center justify-center gap-2 px-8 py-[4px] font-georgia text-[clamp(12px,1.1vw,16px)] leading-tight text-[#fff0ce] compact:px-6 compact:text-xs`} style={{ backgroundImage: `url(${clockPlaque})` }}>
      <svg viewBox="0 0 24 24" className="size-[1.4em] shrink-0 text-[#ffd178]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></svg>
      <span>Làm mới sau</span><span className="ml-1 font-number text-[1.3em] font-bold leading-none tabular-nums text-[#ffca63] [text-shadow:0_1px_2px_#672500]">--:--:--</span>
    </p>
  </div>
}