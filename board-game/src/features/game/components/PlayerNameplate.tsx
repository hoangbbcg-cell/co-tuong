import nameFrame from '../../../assets/player/name-frame.webp'
import { NumberText } from '../../../lib/NumberText'

/** Home reference: width180, height38, font24, horizontal padding24. */
export function PlayerNameplate({ name, className = '', fullName = false, fitContent = false, fixedWidth = false }: { name: string; className?: string; fullName?: boolean; fitContent?: boolean; fixedWidth?: boolean }) {
  return <span className={`grid ${fixedWidth ? 'w-[var(--nameplate-width,180px)]! min-w-0! max-w-none!' : ''} ${fitContent ? 'w-max shrink-0 min-w-[140px]! compact:min-w-[100px]! max-w-none! px-[20px]!' : ''} ${fullName ? 'min-h-[calc(var(--nameplate-width,180px)*38/180)] h-auto w-max min-w-[90px] max-w-[min(90vw,260px)] bg-[length:100%_100%] px-[16px] py-[2px]' : 'h-[calc(var(--nameplate-width,180px)*38/180)] w-max min-w-[90px] max-w-[min(90vw,260px)] bg-[length:100%_100%] px-[calc(var(--nameplate-width,180px)*24/180)]'} place-items-center bg-center bg-no-repeat font-heading text-[length:calc(var(--nameplate-width,180px)*24/180)] leading-none font-normal text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008] ${className}`} style={{ backgroundImage: `url(${nameFrame})` }}>
    <span className={fitContent ? 'whitespace-nowrap text-center leading-[1.4]' : fullName ? 'min-w-0 max-w-full whitespace-normal break-words text-center leading-[1.25] compact:[&_.font-number]:text-[0.85em]!' : 'min-w-0 max-w-full truncate leading-[1.4]'}><NumberText text={name} compact weight="normal" soften={false} /></span>
  </span>
}
