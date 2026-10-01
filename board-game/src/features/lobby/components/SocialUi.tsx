import defaultAvatar from '../../../assets/icons/avatar.svg'
import actionButtonFrame from '../../../assets/friends/friend-action-button-frame.png'
import { buttonInteraction } from '../../../lib/uiClasses'

export const socialActionButton = `${buttonInteraction} flex h-[60px] w-[173px] shrink-0 items-center justify-center gap-[9px] border-0 bg-center bg-no-repeat px-[14px] font-['Times_New_Roman'] text-[21px] leading-none font-bold italic text-[#2b1909]`
export const socialActionStyle = { backgroundImage: `url(${actionButtonFrame})`, backgroundSize: '100% 100%' }
export const socialPanelClass = "relative min-h-0 flex-1 overflow-hidden rounded-[14px] border-[3px] border-[#b99560] bg-[radial-gradient(ellipse_at_15%_24%,#c39a5c22,transparent_45%),radial-gradient(ellipse_at_86%_76%,#b98b4f22,transparent_42%),linear-gradient(120deg,#ecd3a1,#f1ddb5_48%,#e7c995)] px-[20px] py-3 shadow-[inset_0_0_0_2px_#f9e8c2,inset_0_0_0_5px_#c6a46b88,inset_0_0_20px_#a9773433]"

export function SocialAvatar({ src = defaultAvatar }: { src?: string }) {
  return <span className="block size-[76px] shrink-0 rounded-full bg-[linear-gradient(135deg,#fff9d9,#e9a244_42%,#8d541c_70%,#ffda88)] p-[4px] shadow-[0_2px_3px_#432711] ring-1 ring-[#86511c]"><img src={src} alt="" className="size-full rounded-full object-cover" /></span>
}
