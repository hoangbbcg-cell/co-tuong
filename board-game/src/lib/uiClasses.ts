// Complete class names let Tailwind detect shared styles at build time.
export const buttonInteraction = 'cursor-pointer disabled:cursor-default disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe2a1]'
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
export const gameUtilityButton = `${buttonInteraction} pointer-events-auto grid size-12 shrink-0 place-items-center rounded-[3px] border border-[#d3a51a] bg-[linear-gradient(135deg,#8d7215,#705009_55%,#4b3108)] p-0 text-[#ffe235] shadow-[inset_0_1px_0_#f4d64b,inset_0_0_0_1px_#ad7b12,0_2px_3px_#142018aa] hover:brightness-110 active:brightness-90`
export const iconButton = `${buttonInteraction} grid size-[34px] shrink-0 place-items-center rounded border border-[#b59754] bg-[#463713] p-0 text-2xl text-[#ffe094]`
export const lobbyButton = `${buttonInteraction} rounded border border-[#c6a563] bg-[#d1ad65] px-2.5 py-1.5 text-[13px] text-[#1c2924]`
export const homeUtilityButton = `${buttonInteraction} grid size-12 place-items-center rounded-[3px] border-2 border-[#d8ac35] bg-[linear-gradient(#ad7e08,#805100)] text-xl text-[#ffe535] shadow-[inset_0_1px_0_#ffec8d,inset_0_0_0_1px_#6f400b,0_3px_5px_#0005] transition-[border-color,color,box-shadow] duration-150 hover:border-[#ffe78b] hover:bg-[linear-gradient(#d49b12,#a16a08)] hover:text-[#fff7a5] active:bg-[linear-gradient(#886005,#654000)] motion-reduce:transition-none`
