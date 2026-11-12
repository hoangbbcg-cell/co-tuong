import { expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const read = (path: string) => readFileSync(resolve(path), 'utf8')

it('lịch sử/replay bỏ nút Phát và tap nằm ở khung số nước đi kiểu YouTube', () => {
  const controls = read('src/features/game/components/ReplayControls.tsx')
  expect(controls).not.toContain('controls-play-v2')
  expect(controls).not.toContain('Phát / Tạm dừng')
  // The tap layer sits on the move counter of the replay view only, not the practice board.
  expect(controls).toContain("ReplayTapOverlay")
  expect(controls).toMatch(/!practice && <ReplayTapOverlay/)
  const page = read('src/pages/game/GamePage.tsx')
  expect(page).not.toContain('ReplayTapOverlay')
  const overlay = read('src/features/game/components/ReplayTapOverlay.tsx')
  expect(overlay).toContain('onToggle()')
  expect(overlay).toContain('duration-[700ms]')
})

it('Back về trial chỉ cho chủ phòng custom; người vào qua mã/mời về home như phòng thường', () => {
  const lobby = read('src/features/lobby/hooks/useLobby.ts')
  expect(lobby).toMatch(/room\.customFen && room\.ownerId === socket\.id \? .*enterCustomRoom|room\.customFen && room\.ownerId === socket\.id\)/)
  expect(lobby).toContain('enterCustomRoom(room)')
  const session = read('src/store/sessionStore.ts')
  // Non-owner rooms route through enterOnline, which clears the custom return chain.
  expect(session).toMatch(/enterOnline: [^\n]*customRoomReturn: false/)
})
