import nameFrame from '../../../assets/player/name-frame.png'
import { NumberText } from '../../../lib/NumberText'

/** Home reference: width180, height38, font24, horizontal padding24. */
export function PlayerNameplate({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`grid h-[calc(var(--nameplate-width,180px)*38/180)] w-[var(--nameplate-width,180px)] place-items-center bg-contain bg-center bg-no-repeat px-[calc(var(--nameplate-width,180px)*24/180)] font-heading text-[length:calc(var(--nameplate-width,180px)*24/180)] leading-none font-normal text-[#ffe7ae] [text-shadow:0_1px_2px_#2a1008] ${className}`} style={{ backgroundImage: `url(${nameFrame})` }}>
    <span className="min-w-0 max-w-full truncate leading-[1.4]"><NumberText text={name} compact weight="normal" soften={false} /></span>
  </span>
}
