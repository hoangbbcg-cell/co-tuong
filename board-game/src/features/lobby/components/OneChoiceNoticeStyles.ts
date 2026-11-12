/** Shared appearance of the offline So tài notice, on both viewports. */
const noticeSurface = 'w-[min(360px,calc(100vw-48px))] max-w-none flex-col items-center justify-center gap-[20px] rounded-[12px] border border-[#c7a264] bg-[#30271e] p-[20px] text-center font-body text-[#f7e6c1] shadow-2xl [&_p]:m-0 [&_p]:text-[18px] [&_p]:leading-relaxed [&_h3]:text-[24px]'
export const oneChoiceNoticePanel = `flex ${noticeSurface}`
export const oneChoiceNoticeDialog = `m-auto open:flex ${noticeSurface}`
export const oneChoiceNoticeButton = 'mx-auto inline-flex min-h-[46px] min-w-[120px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border-2 border-[#d8ac35] bg-[linear-gradient(#ad7e08,#805100)] px-[20px] py-[8px] font-body text-[18px] text-[#ffe535] shadow-[inset_0_1px_0_#ffec8d,inset_0_0_0_1px_#6f400b,0_3px_5px_#0005] [text-shadow:none] hover:border-[#ffe78b] hover:bg-[linear-gradient(#d49b12,#a16a08)] hover:text-[#fff7a5]'
