import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const hook = readFileSync(
  resolve(process.cwd(), 'src/features/game/hooks/useReplayTrial.ts'),
  'utf8',
)

const page = readFileSync(
  resolve(process.cwd(), 'src/pages/game/GamePage.tsx'),
  'utf8',
)

describe('V13: first-move-only change', () => {
  it('allows either colour at the first move', () => {
    expect(hook).toContain('setOpeningSide(firstSide)')
    expect(hook).toContain('currentTurn: firstSide')
    expect(hook).toContain('setSelected(point)')
  })

  it('does not change player identity', () => {
    expect(hook).not.toContain(
      'useSessionStore.setState({ humanSide: firstSide })'
    )
  })

  it('does not turn AI on automatically', () => {
    expect(hook).not.toContain(
      "setMachineSides({ red: firstSide === 'black', black: firstSide === 'red' })"
    )
    expect(hook).not.toContain(
      'Re-arm the opponent AI after the opening move'
    )
    expect(hook).toContain('toggleMachineSide')
  })

  it('keeps player and AI labels attached to original sides', () => {
    expect(page).toContain(
      "positionTrial ? side === match.humanSide ? name : 'Ông Hoàng'"
    )
    expect(page).toContain(
      'positionTrial || match.computer ? match.humanSide'
    )
    expect(page).not.toContain('positionHumanSide')
    expect(page).not.toContain('positionViewSide')
  })

  it('does not reset manual orientation on piece selection', () => {
    expect(page).not.toContain(
      'if (positionTrial && trial.openingSide) setReplayFlipped(false)'
    )
    expect(page).toContain(
      'const flipReplayBoard = () => setReplayFlipped(value => !value)'
    )
  })

  it('retains initial orientation reset on session entry', () => {
    expect(page).toContain(
      'useEffect(() => { setReplayFlipped(false) }, [replayData?.id, positionTrial])'
    )
  })
})