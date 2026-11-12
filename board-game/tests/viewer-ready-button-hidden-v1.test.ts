import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

const page = readFileSync(
  new URL('../src/pages/game/GamePage.tsx', import.meta.url),
  'utf8',
)

const board = readFileSync(
  new URL('../src/features/game/components/Board.tsx', import.meta.url),
  'utf8',
)

it('hides Ready for spectators before evaluating seated-player rules', () => {
  expect(page).toContain(
    'showStart={!isRoomViewer && !hidePostMatchReady && (',
  )
})

it('keeps the spectator countdown connected', () => {
  expect(page).toContain(
    'isRoomViewer ? readyCountdownForViewer(match.room)',
  )
})

it('renders countdown independently of the Ready button', () => {
  expect(board).toContain('props.readyCountdown != null')
  expect(board).toContain('props.showStart &&')
})

it('preserves the postmatch Ready grace period', () => {
  expect(page).toContain('!hidePostMatchReady')
})