import { shopMobileDialogFrameClass } from './uiClasses'

// Shared mobile typography and controls on both desktop and compact dialogs.
export const confirmationDialogFrame = `${shopMobileDialogFrameClass} [--spacing:4px] [--text-lg:18px] [--text-xl:20px] [--text-2xl:24px] [--text-3xl:30px] [--radius-xl:12px] [--radius-2xl:16px] w-[min(440px,90vw)] max-w-full rounded-2xl border-2 border-[#d5a657] bg-[radial-gradient(ellipse_at_top,#85502466,transparent_70%),linear-gradient(145deg,#482910,#201007)] p-[24px] font-body text-[#ffe6b0] shadow-[inset_0_0_0_3px_#3b1d0b,inset_0_0_0_4px_#a8753466,0_14px_40px_#0009]`
export const confirmationDialogTitle = 'm-0 text-center text-[24px] leading-[32px] font-bold'
export const confirmationDialogDescription = 'mt-[16px] text-center text-[18px] leading-[29px]'
export const confirmationDialogActions = 'mt-[24px] grid w-full grid-cols-2 gap-[12px] [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:text-center [&_button]:h-[44px] [&_button]:min-w-0 [&_button]:px-[12px] [&_button]:py-[8px] [&_button]:text-[18px] [&_button]:leading-[24px]'
export const confirmationDialogOverlay = 'flex items-center justify-center bg-black/60 p-[20px]'
