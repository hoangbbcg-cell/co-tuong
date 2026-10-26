import nameFrame from '../../../assets/player/name-frame.png'
import { NumberText } from '../../../lib/NumberText'

/** Home reference: width180, height38, font24, horizontal padding24. */
export function PlayerNameplate({ name, className = '', fullName = false }: { name: string; className?: string; fullName?: boolean }) {
  return <span className={`grid ${fullName ? 'min-h-[calc(var(--nameplate-width,180px)*38/180)] h-auto bg-[length:100%_100%] px-[4px] py-[2px]' : 'h-[calc(var(--nameplate-width,180px)*38/180)] bg-contain px-[calc(var(--nameplate-width,180px)*24/180)]'} w-[var(--nameplate-width,180px)] place-items-center bg-center bg-no-repeat font-heading text-[length:calc(var(--nameplate-width,180px)*24/180)] leading-none font-normal text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008] ${className}`} style={{ backgroundImage: `url(${nameFrame})` }}>
    <span className={fullName ? 'min-w-0 w-full whitespace-normal break-words text-center leading-[1.25] compact:[&_.font-number]:text-[0.85em]!' : 'min-w-0 max-w-full truncate leading-[1.4]'}><NumberText text={name} compact weight="normal" soften={false} /></span>
  </span>
}
