import { ShopFilterTab } from './ShopFilterTab'
import { ShopPurchaseDialog } from './ShopPurchaseDialog'
import { SHOP_PRODUCTS, ownsCosmetic } from '../../lib/shopCatalog'
import purchasedStamp from '../../assets/shop/purchased.png'
import { useShopPurchase } from '../../features/lobby/hooks/useShopPurchase'
import strategistAvatar from '../../assets/shop/avatars/small/lao-quan-su-128.png'
import generalAvatar from '../../assets/shop/avatars/small/nam-tuong-quan-128.png'
import redShopFrame from '../../assets/shop/frames/vien_03_do.png'
import jadeShopFrame from '../../assets/shop/frames/vien_08_xanh_ngoc.png'
import purpleShopFrame from '../../assets/shop/frames/vien_09_tim.png'
import { MarketHeading } from './MarketHeading'
import { useShopDailyCountdown } from '../../features/lobby/hooks/useShopDailyCountdown'
import activeMarketTab from '../../assets/shop/tab-active.png'
import idleMarketTab from '../../assets/shop/tab-idle-v2.png'
import marketGold from '../../assets/shop/market-gold.png'
import marketBronze from '../../assets/shop/market-bronze.png'
import giftIcon from '../../assets/shop/gift.png'
import { homeResourceLayout } from '../../features/lobby/components/homeResourceLayout'
import { GameBackIcon } from '../../features/game/components/GameBackIcon'
import { ResourceAddButton } from '../../features/lobby/components/ResourceAddButton'
import { ResourceArtwork } from '../../features/lobby/components/ResourceArtwork'
import { useEffect, useRef, useState } from 'react'
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
import { buttonInteraction, gameUtilityButton, shopMobileDialogFrameClass } from '../../lib/uiClasses'
import { useHomeLayout } from '../../features/lobby/hooks/useHomeLayout'
import { getCrispUiLayout } from '../../lib/crispUiRendering'


const ornatePanel = 'border-2 border-[#a56c2c] bg-[linear-gradient(135deg,#45240d,#160c06_60%,#3a1b08)] shadow-[inset_0_0_0_2px_#241007,inset_0_0_0_3px_#bc8545,0_3px_5px_#000a]'

const shopArtwork: Record<string, string | null> = {
  'avatar-16': strategistAvatar,
  'avatar-17': generalAvatar,
  'frame-4': redShopFrame,
  'frame-5': jadeShopFrame,
  'frame-6': purpleShopFrame,
}
const shopProducts = SHOP_PRODUCTS.map(product => ({ ...product, image: shopArtwork[product.id] }))

export function ShopPage() {
  const account = useSessionStore(state => state.account)
  const home = useHome()
  const layout = useHomeLayout()
  const resources = layout.compact ? { resourceWidth: 116, resourceHeight: 56, resourceFrameWidth: 116, resourceFrameHeight: 26, resourceIconHeight: 18 } : homeResourceLayout(layout.scale, false)
  const [tab, setTab] = useState('Tất cả')
  const products = shopProducts.filter(item => tab === 'Tất cả' || item.kind === (tab === 'Avatar' ? 'avatar' : 'frame'))
  const [market, setMarket] = useState(0)
  const dailyCountdown = useShopDailyCountdown(market === 0 || market === 1, market === 1 ? 'weekly' : 'daily')
  const marketNames = ['Phiên Chợ Hàng Ngày', 'Cửa Hàng Cao Cấp', 'Sự Kiện']
  const [message, setMessage] = useState('')
  const insufficientFunds = layout.compact && message === 'Bạn không đủ vàng để mua sản phẩm này.'
  useEffect(() => {
    if (!insufficientFunds) return
    const timer = window.setTimeout(() => setMessage(''), 2000)
    return () => window.clearTimeout(timer)
  }, [message, insufficientFunds])
  const shop = useShopPurchase(setMessage, !layout.compact)
  const energyRef = useRef<HTMLDialogElement>(null)
  const back = () => useSessionStore.setState({ screen: 'home' })
  return <main aria-label="Cửa Hàng" className="fixed inset-0 overflow-hidden bg-[#263a35] font-heading text-[#ffe6b0]">
    <div data-shop-frame className="absolute top-1/2 left-1/2 isolate flex flex-col overflow-hidden border-[length:var(--ui-p-5,5px)] border-[#80582c] bg-[#1d0c05] shadow-[inset_0_0_0_2px_#efd397,0_0_0_1px_#e1c993,0_8px_30px_#101d18aa]" style={{ ...getCrispUiLayout(layout.scale, layout.width, layout.height), transform: 'translate(-50%, -50%)' }}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-[var(--ui-p-2,2px)] z-40 border border-[#e3bf78] shadow-[inset_0_0_0_2px_#63472055]" />
    <CrispUiImage src={background} alt="" className="pointer-events-none absolute inset-0 -z-20 size-full object-cover object-center" />
    <header className="relative z-20 flex h-16 shrink-0 items-center gap-3 bg-transparent px-4 compact:h-[72px] compact:min-h-[72px] compact:flex-nowrap compact:items-start compact:gap-1 compact:px-2 compact:py-2">
      <button type="button" aria-label="Trở về Home" onClick={back} className={`${gameUtilityButton} shrink-0 compact:size-9 compact:[&_svg]:size-5`}><GameBackIcon /></button>
      <h1 className="grid h-12 w-[var(--ui-p-220,220px)] shrink-0 place-items-center bg-[length:100%_100%] bg-center bg-no-repeat px-6 text-2xl font-bold text-[#fff0ce] [text-shadow:0_2px_2px_#120600] compact:h-9 compact:w-[110px] compact:px-2 compact:text-lg" style={{ backgroundImage: `url(${nameFrame})` }}>Cửa Hàng</h1>
      <div className="relative ml-auto shrink-0" style={{ width: resources.resourceWidth, height: resources.resourceHeight }}>
        {[{ name: 'Năng lượng', value: `${home.energy}/5`, icon: energyIcon, run: () => energyRef.current?.showModal() }, { name: 'Vàng', value: String(home.gold), icon: goldIcon, run: () => setMessage('Tính năng bổ sung vàng chưa được hỗ trợ.') }].map((item, index) => <div key={item.name} className="absolute" style={{ width: resources.resourceFrameWidth, height: resources.resourceFrameHeight, left: layout.compact ? 0 : index === 0 ? 0 : resources.resourceWidth - resources.resourceFrameWidth, top: layout.compact ? index * 30 : Math.round((resources.resourceHeight - resources.resourceFrameHeight) / 2) }}>
          <ResourceArtwork src={resourceFrame} alt="" className="pointer-events-none absolute inset-0 size-full" />
          <ResourceArtwork smooth src={item.icon} alt={item.name} className="absolute" style={{ height: resources.resourceIconHeight, width: Math.round(resources.resourceIconHeight * (index === 0 ? 169 / 218 : 222 / 219)), left: Math.round(resources.resourceWidth * (layout.compact ? 0.06 : 0.03) + 3), top: Math.round((resources.resourceFrameHeight - resources.resourceIconHeight) / 2) }} />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-number text-[length:var(--ui-p-20,20px)] compact:text-sm leading-none tabular-nums">{item.value}</span>
          <ResourceAddButton type="button" aria-label={`Thêm ${item.name.toLowerCase()}`} onClick={item.run} className="absolute top-[calc(50%-var(--ui-p-1,1px))] size-[var(--ui-p-26,26px)] -translate-x-1/2 -translate-y-1/2 compact:size-[18px]" style={{ left: Math.round(resources.resourceWidth * (layout.compact ? 0.87 : 0.41)) }} />
        </div>)}
      </div>
    </header>
    <div className="relative flex min-h-0 flex-1 compact:flex-col compact:px-2 compact:pb-2">
      <aside aria-label="Khu chợ" className="relative z-10 flex w-[20%] min-w-[220px] shrink-0 flex-col gap-5 border-x-[5px] border-b-[5px] border-[#6e3d1b] bg-[#1d0d08ed] px-4 pt-[7dvh] shadow-[inset_0_0_0_2px_#bc8545,5px_0_12px_#0008] compact:order-2 compact:w-full compact:min-w-0 compact:flex-row compact:gap-2 compact:border-0 compact:bg-[#1d0d08dd] compact:px-0 compact:pt-0 compact:pb-0 compact:shadow-none" style={{ backgroundImage: `linear-gradient(#180a06bb,#180a06dd),url(${wood})` }}>
        {[{ label: 'Phiên Chợ Hàng Ngày', lines: ['Phiên Chợ', 'Hàng Ngày'] }, { label: 'Cửa Hàng Cao Cấp', lines: ['Cửa Hàng', 'Cao Cấp'] }, { label: 'Sự Kiện', lines: ['Sự Kiện'] }].map((item, index) => <button key={item.label} type="button" aria-label={item.label} onClick={() => { setMarket(index); setTab('Tất cả'); setMessage('') }} aria-pressed={market === index} className="group relative isolate grid h-[102px] min-h-[102px] max-h-[102px] shrink-0 cursor-pointer grid-cols-[36px_minmax(0,1fr)_12px] items-center gap-[8px] border-0 bg-transparent px-[12px] py-2 text-center font-heading text-[clamp(16px,1.5vw,24px)] leading-tight text-[#fff0c4] aria-[pressed=false]:text-[#c89a65] transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px active:scale-[0.98] active:brightness-90 disabled:cursor-default disabled:text-[#c89a65] disabled:hover:brightness-100 disabled:active:translate-y-0 disabled:active:scale-100 disabled:active:brightness-100 motion-reduce:transition-none compact:h-16 compact:min-h-16 compact:max-h-none compact:min-w-0 compact:flex-1 compact:grid-cols-[24px_minmax(0,1fr)] compact:gap-1 compact:px-2 compact:text-[14px] compact:leading-[1.15]">
          <CrispUiImage src={market === index ? activeMarketTab : idleMarketTab} alt="" className="pointer-events-none absolute inset-0 -z-10 block size-full" />
          <CrispUiImage src={index === 2 ? giftIcon : market === index ? marketGold : marketBronze} alt="" className="pointer-events-none block size-[36px] object-contain object-center compact:size-6" />
          <span className="flex min-w-0 flex-col items-center justify-center text-center">{item.lines.map(line => <span key={line} className="block whitespace-nowrap">{line}</span>)}</span>
          <span aria-hidden="true" className="compact:hidden" />
        </button>)}
      </aside>
      <section aria-label={marketNames[market]} className="relative flex min-h-0 flex-1 flex-col px-[4%] pb-[4dvh] compact:contents">
        <div className="flex h-[31dvh] shrink-0 flex-col items-center justify-center pt-6 text-center compact:order-1 compact:h-[18dvh] compact:min-h-[130px] compact:justify-start compact:pt-1">
          <MarketHeading title={marketNames[market]} subtitle={market === 2 ? 'Chưa có sự kiện' : market === 1 ? 'Hàng thay thế mỗi tuần' : undefined} countdown={dailyCountdown} />
        </div>
        <div role="tablist" aria-label="Loại sản phẩm" className={`${ornatePanel} relative z-10 mx-auto grid h-[var(--ui-p-44,44px)] w-[calc(92%-120px)] shrink-0 grid-cols-3 gap-[20px] rounded-lg p-1 compact:order-3 compact:h-[42px] compact:w-full compact:gap-[6px] compact:rounded-xl compact:p-[5px]`}>
          {['Tất cả', 'Avatar', 'Khung Viền'].map(label => <ShopFilterTab key={label} label={label} selected={tab === label} onClick={() => setTab(label)} />)}
        </div>
        <div role="tabpanel" aria-label={tab} className="mt-0 flex min-h-0 flex-1 flex-col compact:order-4 overflow-y-auto rounded-lg border border-[#825224] bg-[#1a0c06dc] p-[10px] compact:p-1">
          {market === 0 ? <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-[10px] compact:grid-cols-3 compact:grid-rows-4 compact:gap-1">
            {products.map(avatar => <article key={avatar.name} aria-label={avatar.name} className={`${ornatePanel} relative flex min-h-0 flex-col overflow-hidden rounded-lg`}>
              {ownsCosmetic(account, avatar) && <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                <CrispUiImage src={purchasedStamp} alt="Đã mua" className="absolute top-1/2 left-1/2 m-0 block h-auto w-[60%] -translate-x-1/2 -translate-y-1/2 border-0 p-0 object-contain" />
              </div>}
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[radial-gradient(ellipse_at_center,#753518,#241006_75%)] p-1 compact:p-1">
                <div role={avatar.kind === 'avatar' ? 'img' : undefined} aria-label={avatar.kind === 'avatar' ? avatar.name : undefined} className={avatar.kind === 'frame' ? 'aspect-square h-full max-w-full' : 'aspect-square h-full max-w-full overflow-hidden rounded-full'}>{avatar.kind === 'frame' ? <CrispUiImage src={avatar.image ?? ''} alt={avatar.name} className="block size-full object-contain" /> : <AvatarPortrait avatarIndex={Number(avatar.code.replace('avatar-', ''))} className={`size-full rounded-full ${avatar.image ? '' : 'scale-[1.12]'}`} />}</div>
              </div>
              <div className="flex h-10 shrink-0 items-center gap-2 border-t border-[#805021] bg-[#130a04] px-3 py-1 text-xl compact:h-8 compact:gap-1 compact:px-1 compact:text-xs">
                <ResourceArtwork smooth src={goldIcon} alt="Vàng" className="h-7 w-auto compact:h-3.5" /><span className="font-number tabular-nums">{avatar.price}</span>
                <button type="button" aria-label={avatar.kind === 'frame' ? `Mua ${avatar.name}` : `Mua avatar ${avatar.name}`} onClick={() => shop.open(avatar)} className={`${buttonInteraction} ml-auto rounded border border-[#f4cc74] bg-[linear-gradient(#ffe6a0,#d99a31)] px-3 py-1 font-heading text-base font-bold leading-none text-[#3d1d06] hover:brightness-110 compact:px-1 compact:text-xs`}>Mua</button>
              </div>
            </article>)}
          </div> : <p className="grid h-full min-h-28 place-items-center text-xl text-[#eac78d]">Chưa có sản phẩm.</p>}
        </div>
      </section>
    </div>
    {shop.selected && <ShopPurchaseDialog name={shop.selected.name} price={shop.selected.price} buying={shop.buying} onCancel={shop.cancel} onConfirm={() => void shop.confirm()} />}
    <EnergyDialog dialogRef={energyRef} onUnavailable={() => setMessage('Video và thanh toán chưa được tích hợp.')} />
    {message && <div role="alert" className={`${insufficientFunds ? 'fixed left-1/2 top-1/2 min-h-[96px] w-[min(320px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 px-5 py-6' + ' ' + shopMobileDialogFrameClass : 'absolute inset-x-4 bottom-5 mx-auto max-w-lg rounded-lg border border-[#bc8545] bg-[#231107] p-4'} z-50 flex items-center gap-4 text-lg`}><span className={insufficientFunds ? 'flex-1 px-4 text-center font-body text-xl font-semibold text-[#ffe5ac] [text-shadow:0_1px_2px_#150904]' : undefined}>{insufficientFunds ? 'Không đủ tiền' : message}</span><button type="button" aria-label="Đóng thông báo" className={`${insufficientFunds ? 'absolute right-1 top-1 text-[#f2ce8d] hover:text-[#fff0ca]' : 'ml-auto'} px-2 text-2xl compact:grid compact:size-11 compact:shrink-0 compact:place-items-center compact:p-0 compact:text-[36px] compact:leading-none`} onClick={() => setMessage('')}>×</button></div>}
    </div>
  </main>
}
