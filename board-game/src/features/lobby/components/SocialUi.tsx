import { CrispUiImage } from '../../../lib/CrispUiImage'
import defaultAvatar from '../../../assets/icons/avatar.svg'
import actionButtonFrame from '../../../assets/friends/friend-action-button-frame.png'
import { buttonInteraction } from '../../../lib/uiClasses'

export const socialActionButton = `${buttonInteraction} flex h-[var(--ui-p-60,60px)] w-[var(--ui-p-173,173px)] shrink-0 items-center justify-center gap-[var(--ui-p-9,9px)] border-0 bg-center bg-no-repeat px-[var(--ui-p-14,14px)] font-['Times_New_Roman'] text-[length:var(--ui-p-21,21px)] leading-none font-bold italic text-[#2b1909]`
export const socialActionStyle = { backgroundImage: `url(${actionButtonFrame})`, backgroundSize: '100% 100%' }
export const socialPanelClass = "relative min-h-0 flex-1 overflow-hidden rounded-[var(--ui-p-14,14px)] border-[length:var(--ui-p-3,3px)] border-[#b99560] bg-[radial-gradient(ellipse_at_15%_24%,#c39a5c22,transparent_45%),radial-gradient(ellipse_at_86%_76%,#b98b4f22,transparent_42%),linear-gradient(120deg,#ecd3a1,#f1ddb5_48%,#e7c995)] px-[var(--ui-p-20,20px)] py-3 shadow-[inset_0_0_0_2px_#f9e8c2,inset_0_0_0_5px_#c6a46b88,inset_0_0_20px_#a9773433]"

export function SocialAvatar({ src = defaultAvatar }: { src?: string }) {
  return <span className="block size-[var(--ui-p-76,76px)] shrink-0 cursor-pointer rounded-full bg-[linear-gradient(135deg,#fff9d9,#e9a244_42%,#8d541c_70%,#ffda88)] p-[var(--ui-p-4,4px)] shadow-[0_2px_3px_#432711] ring-1 ring-[#86511c]"><CrispUiImage src={src} alt="" className="size-full rounded-full object-cover" /></span>
}
