/** Shared result colors for player name frames in played and saved history. */
export function historyPlayerFrame(won: boolean) {
  return won
    ? 'border-[#c9a46b] bg-[linear-gradient(90deg,#efc45c_0%,#f5d273_34%,#f8df99_56%,#f7e8bf_76%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#fff1c8]'
    : 'border-[#9fbac5] bg-[linear-gradient(90deg,#b9dce7_0%,#cde6ed_28%,#e4eef0_46%,#f1e9d5_64%,#f4e5c8_100%)] shadow-[inset_0_1px_0_#f4fcff]'
}
