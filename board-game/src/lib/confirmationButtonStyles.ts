import { buttonInteraction } from './uiClasses'

// Match the Cancel/Create group frames without changing each dialog's layout.
const frame = `${buttonInteraction} rounded-[8px]! border-2 font-bold enabled:hover:brightness-110`
export const confirmationCancelButton = `${frame} border-[#c98b31] bg-[linear-gradient(#61300e,#2a1005)] text-[#fff0bd]`
export const confirmationAcceptButton = `${frame} border-[#ffe08b] bg-[linear-gradient(#ffe68b,#f2ab24,#c47412)] text-[#2c1405] shadow-[inset_0_0_0_2px_#a35810]`
