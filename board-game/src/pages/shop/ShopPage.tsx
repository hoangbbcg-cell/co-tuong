import { ShopFilterTab } from './ShopFilterTab'
import { MarketHeading } from './MarketHeading'
import activeMarketTab from '../../assets/shop/tab-active.png'
import idleMarketTab from '../../assets/shop/tab-idle-v2.png'
import marketGold from '../../assets/shop/market-gold.png'
import marketBronze from '../../assets/shop/market-bronze.png'
import giftIcon from '../../assets/shop/gift.png'
import lockIcon from '../../assets/shop/lock.png'
import { homeResourceLayout } from '../../features/lobby/components/homeResourceLayout'
import { GameBackIcon } from '../../features/game/components/GameBackIcon'
import { ResourceAddButton } from '../../features/lobby/components/ResourceAddButton'
import { ResourceArtwork } from '../../features/lobby/components/ResourceArtwork'
import { useRef, useState } from 'react'
import background from '../../assets/shop/background.png'
import nameFrame from '../../assets/player/name-frame.png'
import resourceFrame from '../../assets/player/name-frame.png'
import energyIcon from '../../assets/home-actions/energy-icon-v2.png'
import goldIcon from '../../assets/home-actions/gold-icon-v2.png'
import wood from '../../assets/backgrounds/wood.svg'
import { AvatarPortrait } from '../../features/lobby/components/AvatarCustomization'
import { EnergyDialog } from '../../features/lobby/components/EnergyDialog'
import { useHome } from '../../features/lobby/hooks/useHome'
import { useSessionStore } from '../../store/sessionStore'
import { CrispUiImage } from '../../lib/CrispUiImage'
import { buttonInteraction, gameUtilityButton } from '../../lib/uiClasses'
import { useHomeLayout } from '../../features/lobby/hooks/useHomeLayout'
import { getCrispUiLayout } from '../../lib/crispUiRendering'

function EyeIcon() {
  return <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
}

const ornatePanel = 'border-2 border-[#a56c2c] bg-[linear-gradient(135deg,#45240d,#160c06_60%,#3a1b08)] shadow-[inset_0_0_0_2px_#241007,inset_0_0_0_3px_#bc8545,0_3px_5px_#000a]'

export function ShopPage() {
  const home = useHome()
  const layout = useHomeLayout()
  const resources = homeResourceLayout(layout.scale, layout.compact)
  const [tab, setTab] = useState('Tất cả')
  const [message, setMessage] = useState('')
  const energyRef = useRef<HTMLDialogElement>(null)
  const previewRef = useRef<HTMLDialogElement>(null)
  const back = () => useSessionStore.setState({ screen: 'home' })
  return <main aria-label="Cửa Hàng" className="fixed inset-0 overflow-hidden bg-[#263a35] font-heading text-[#ffe6b0]">
    <div data-shop-frame className="absolute top-1/2 left-1/2 isolate flex flex-col overflow-hidden border-[length:var(--ui-p-5,5px)] border-[#80582c] bg-[#1d0c05] shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa]" style={{ ...getCrispUiLayout(layout.scale, layout.width, layout.height), transform: 'translate(-50%, -50%)' }}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-[var(--ui-p-2,2px)] z-40 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-center" />
    <header className="relative z-20 flex h-16 shrink-0 items-center gap-3 bg-transparent px-4 compact:h-auto compact:min-h-20 compact:flex-wrap compact:gap-2 compact:px-2 compact:py-2">
      <button type="button" aria-label="Trở về Home" onClick={back} className={`${gameUtilityButton} shrink-0`}><GameBackIcon /></button>
      <h1 className="grid h-12 w-[var(--ui-p-220,220px)] shrink-0 place-items-center bg-[length:100%_100%] bg-center bg-no-repeat px-6 text-2xl font-bold text-[#fff0ce] [text-shadow:0_2px_2px_#120600] compact:h-12 compact:w-[155px] compact:px-3 compact:text-2xl" style={{ backgroundImage: `url(${nameFrame})` }}>Cửa Hàng</h1>
      <div className="relative ml-auto shrink-0" style={{ width: resources.resourceWidth, height: resources.resourceHeight }}>
        {[{ name: 'Năng lượng', value: `${home.energy}/5`, icon: energyIcon, run: () => energyRef.current?.showModal() }, { name: 'Vàng', value: String(home.gold), icon: goldIcon, run: () => setMessage('Tính năng bổ sung vàng chưa được hỗ trợ.') }].map((item, index) => <div key={item.name} className="absolute" style={{ width: resources.resourceFrameWidth, height: resources.resourceFrameHeight, left: index === 0 ? 0 : resources.resourceWidth - resources.resourceFrameWidth, top: Math.round((resources.resourceHeight - resources.resourceFrameHeight) / 2) }}>
          <ResourceArtwork src={resourceFrame} alt="" className="pointer-events-none absolute inset-0 size-full" />
          <ResourceArtwork smooth src={item.icon} alt={item.name} className="absolute" style={{ height: resources.resourceIconHeight, width: Math.round(resources.resourceIconHeight * (index === 0 ? 169 / 218 : 222 / 219)), left: Math.round(resources.resourceWidth * 0.03 + 3), top: Math.round((resources.resourceFrameHeight - resources.resourceIconHeight) / 2) }} />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-number text-[length:var(--ui-p-20,20px)] leading-none tabular-nums">{item.value}</span>
          <ResourceAddButton type="button" aria-label={`Thêm ${item.name.toLowerCase()}`} onClick={item.run} className="absolute top-[calc(50%-var(--ui-p-1,1px))] size-[var(--ui-p-26,26px)] -translate-x-1/2 -translate-y-1/2 compact:size-[var(--ui-p-23,23px)]" style={{ left: Math.round(resources.resourceWidth * 0.41) }} />
        </div>)}
      </div>
    </header>
    <div className="relative flex min-h-0 flex-1 compact:flex-col">
      <aside aria-label="Khu chợ" className="relative z-10 flex w-[20%] min-w-[220px] shrink-0 flex-col gap-5 border-x-[5px] border-b-[5px] border-[#6e3d1b] bg-[#1d0d08ed] px-4 pt-[7dvh] shadow-[inset_0_0_0_2px_#bc8545,5px_0_12px_#0008] compact:w-full compact:min-w-0 compact:flex-row compact:gap-2 compact:border-0 compact:bg-[#1d0d08dd] compact:px-2 compact:py-2" style={{ backgroundImage: `linear-gradient(#180a06bb,#180a06dd),url(${wood})` }}>
        {[{ label: 'Phiên Chợ Hàng Ngày', lines: ['Phiên Chợ', 'Hàng Ngày'], locked: false }, { label: 'Cửa Hàng Cao Cấp', lines: ['Cửa Hàng', 'Cao Cấp'], locked: true }, { label: 'Sự Kiện', lines: ['Sự Kiện'], locked: true }].map((item, index) => <button key={item.label} type="button" aria-label={item.label} disabled={item.locked} aria-pressed={!item.locked} className="group relative isolate grid h-[102px] min-h-[102px] max-h-[102px] shrink-0 cursor-pointer grid-cols-[36px_minmax(0,1fr)_12px] items-center gap-[8px] border-0 bg-transparent px-[12px] py-2 text-center font-heading text-[clamp(16px,1.5vw,24px)] leading-tight text-[#fff0c4] transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px active:scale-[0.98] active:brightness-90 disabled:cursor-default disabled:text-[#c89a65] disabled:hover:brightness-100 disabled:active:translate-y-0 disabled:active:scale-100 disabled:active:brightness-100 motion-reduce:transition-none compact:h-16 compact:min-h-16 compact:max-h-none compact:min-w-0 compact:flex-1 compact:grid-cols-[24px_minmax(0,1fr)] compact:gap-2 compact:px-3 compact:text-xs">
          <CrispUiImage src={item.locked ? idleMarketTab : activeMarketTab} alt="" className="pointer-events-none absolute inset-0 -z-10 block size-full" />
          <CrispUiImage src={index === 2 ? giftIcon : item.locked ? marketBronze : marketGold} alt="" className="pointer-events-none block size-[36px] object-contain object-center compact:size-6" />
          <span className="flex min-w-0 flex-col items-center justify-center text-center">{item.lines.map(line => <span key={line} className="block whitespace-nowrap">{line}</span>)}</span>
          <span className="flex h-4 w-3 items-center justify-center compact:absolute compact:top-1 compact:right-1 compact:h-3 compact:w-2">{item.locked && <CrispUiImage src={lockIcon} alt="Chưa mở" className="pointer-events-none block max-h-full max-w-full object-contain" />}</span>
        </button>)}
      </aside>
      <section aria-label="Phiên Chợ Hàng Ngày" className="relative flex min-h-0 flex-1 flex-col px-[4%] pb-[4dvh] compact:px-3 compact:pb-3">
        <div className="flex h-[31dvh] shrink-0 flex-col items-center justify-center pt-6 text-center compact:h-[24dvh] compact:pt-2">
          <MarketHeading />
        </div>
        <div role="tablist" aria-label="Loại sản phẩm" className={`${ornatePanel} relative z-10 mx-auto grid h-[var(--ui-p-44,44px)] w-[calc(92%-120px)] shrink-0 grid-cols-3 gap-[20px] rounded-lg p-1 compact:h-10 compact:w-full compact:gap-[20px] compact:rounded-md`}>
          {['Tất cả', 'Avatar', 'Khung Viền'].map(label => <ShopFilterTab key={label} label={label} selected={tab === label} onClick={() => setTab(label)} />)}
        </div>
        <div role="tabpanel" aria-label={tab} className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-lg border border-[#825224] bg-[#1a0c06dc] p-[10px]">
          {tab !== 'Khung Viền' ? <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-[10px] compact:grid-cols-2">
            <article aria-label="Avatar demo" className={`${ornatePanel} relative flex min-h-0 flex-col overflow-hidden rounded-lg`}>
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[radial-gradient(ellipse_at_center,#753518,#241006_75%)] p-4 compact:p-3">
                <div className="aspect-square h-full max-w-full overflow-hidden rounded-full"><AvatarPortrait avatarIndex={0} className="size-full rounded-full" /></div>
              </div>
              <div className="flex h-10 shrink-0 items-center gap-2 border-t border-[#805021] bg-[#130a04] px-3 py-1 text-xl compact:h-9 compact:px-2 compact:text-base">
                <ResourceArtwork smooth src={goldIcon} alt="Vàng" className="h-7 w-auto compact:h-5" /><span className="font-number tabular-nums">500</span>
                <button type="button" aria-label="Xem trước sản phẩm demo" onClick={() => previewRef.current?.showModal()} className={`${buttonInteraction} ml-auto grid size-9 place-items-center rounded-full border border-[#b47528] bg-[#301305] text-[#ffc86c] compact:size-8`}><EyeIcon /></button>
              </div>
            </article>
          </div> : <p className="grid h-full min-h-28 place-items-center text-xl text-[#eac78d]">Chưa có khung viền.</p>}
          {tab !== 'Khung Viền' && <p className="mt-2 shrink-0 text-xs text-[#d6b48a]">Sản phẩm xem thử</p>}
        </div>
      </section>
    </div>
    <dialog ref={previewRef} aria-label="Xem trước Avatar" className={`${ornatePanel} m-auto w-[min(340px,90vw)] rounded-xl p-6 text-center text-[#ffe6b0] backdrop:bg-black/70`}>
      <h2 className="mb-5 text-2xl">Avatar</h2><AvatarPortrait avatarIndex={0} className="mx-auto size-40 rounded-full" />
      <p className="mt-4 text-lg">Sản phẩm xem thử · 500 vàng</p>
      <button type="button" className={`${buttonInteraction} mt-5 rounded border border-[#c88d3c] bg-[#532909] px-6 py-2 text-lg`} onClick={() => previewRef.current?.close()}>Đóng</button>
    </dialog>
    <EnergyDialog dialogRef={energyRef} onUnavailable={() => setMessage('Video và thanh toán chưa được tích hợp.')} />
    {message && <div role="alert" className="absolute inset-x-4 bottom-5 z-50 mx-auto flex max-w-lg items-center gap-4 rounded-lg border border-[#bc8545] bg-[#231107] p-4 text-lg"><span>{message}</span><button type="button" aria-label="Đóng thông báo" className="ml-auto px-2 text-2xl" onClick={() => setMessage('')}>×</button></div>}
    </div>
  </main>
}
