// Complete class names let Tailwind detect shared styles at build time.
export const buttonInteraction = 'cursor-pointer disabled:cursor-default disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe2a1]'
// Scrollbar appearance is inherited globally from index.html, including portal content.
export const messageScrollbarClass = ''
export const selectedImageTabGlow = '[filter:brightness(1.1)_saturate(1.3)_drop-shadow(0_0_2px_#ffcf38)_drop-shadow(0_0_7px_#ffad16)]'
export const selectionPalette = {
  selected: {
    border: 'border-[#ffe08b]',
    surface: 'bg-[linear-gradient(145deg,#613014,#241007)]',
    text: 'text-[#ffe5a6]',
    glow: 'shadow-[0_0_9px_#f8b73c,inset_0_0_0_2px_#ab6a26]',
  },
  unselected: {
    border: 'border-[#79501e]',
    surface: 'bg-[linear-gradient(180deg,#3e200e,#1c0e07)]',
    text: 'text-[#d6b982]',
  },
} as const
export const mobileUtilityTokens = '[--mobile-utility-size:42px] [--mobile-utility-icon:24px]'
export const gameUtilityButton = `${buttonInteraction} ${mobileUtilityTokens} compact:size-(--mobile-utility-size) compact:[&_svg]:size-(--mobile-utility-icon) pointer-events-auto grid size-12 shrink-0 place-items-center rounded-[3px] border border-[#d3a51a] bg-[linear-gradient(135deg,#8d7215,#705009_55%,#4b3108)] p-0 text-[#ffe235] shadow-[inset_0_1px_0_#f4d64b,inset_0_0_0_1px_#ad7b12,0_2px_3px_#142018aa] hover:brightness-110 active:brightness-90`
export const iconButton = `${buttonInteraction} grid size-[34px] shrink-0 place-items-center rounded border border-[#b59754] bg-[#463713] p-0 text-2xl text-[#ffe094]`
export const lobbyButton = `${buttonInteraction} rounded border border-[#c6a563] bg-[#d1ad65] px-2.5 py-1.5 text-[13px] text-[#1c2924]`
export const homeUtilityButton = `${buttonInteraction} ${mobileUtilityTokens} grid size-12 place-items-center rounded-[3px] border-2 border-[#d8ac35] bg-[linear-gradient(#ad7e08,#805100)] text-xl text-[#ffe535] shadow-[inset_0_1px_0_#ffec8d,inset_0_0_0_1px_#6f400b,0_3px_5px_#0005] transition-[border-color,color,box-shadow] duration-150 hover:border-[#ffe78b] hover:bg-[linear-gradient(#d49b12,#a16a08)] hover:text-[#fff7a5] active:bg-[linear-gradient(#886005,#654000)] motion-reduce:transition-none`

export const messageSelectionHighlight = 'bg-[radial-gradient(ellipse_at_center,#724018_0%,#51280f_54%,#241007_100%)] shadow-[inset_0_0_9px_#f8b73c55,0_0_4px_#f8b73c]'

export const historyEmptyTextClass = 'text-center font-heading text-[length:var(--ui-p-28,28px)] compact:text-[22px] compact:font-semibold'

/** Preserve list gutter; scrollbar appearance is shared globally in index.html. */
export const socialListScrollbarClass = '[scrollbar-gutter:stable]'

export const shopMobileDialogFrameClass = "compact:rounded-2xl compact:border-2 compact:border-[#d5a657] compact:bg-[radial-gradient(ellipse_at_top,#85502466,transparent_70%),linear-gradient(145deg,#482910,#201007)] compact:shadow-[inset_0_0_0_3px_#3b1d0b,inset_0_0_0_4px_#a8753466,0_14px_40px_#0009]"

// Shared mobile notice appearance from the Home tournament notice; overlays keep their own dimming.
export const mobileNoticePanelStyle = 'compact:rounded-[12px]! compact:border compact:border-[#c7a264] compact:bg-none compact:bg-[#30271e] compact:text-[#f7e6c1] compact:shadow-2xl'
export const mobileNoticeButtonStyle = 'compact:rounded-[3px]! compact:border-2 compact:border-[#d8ac35] compact:bg-[linear-gradient(#ad7e08,#805100)] compact:text-[#ffe535] compact:shadow-[inset_0_1px_0_#ffec8d,inset_0_0_0_1px_#6f400b,0_3px_5px_#0005] compact:[text-shadow:none] compact:hover:border-[#ffe78b] compact:hover:bg-[linear-gradient(#d49b12,#a16a08)] compact:hover:text-[#fff7a5]'
