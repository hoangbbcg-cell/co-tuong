import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
const hook = readFileSync(resolve(process.cwd(), 'src/features/game/hooks/useReplayTrial.ts'), 'utf8')
const page = readFileSync(resolve(process.cwd(), 'src/pages/game/GamePage.tsx'), 'utf8')
describe('custom first move V8 wiring', () => {
  it('remembers selected colour without enabling AI automatically', () => {
    expect(hook).toContain('setOpeningSide(firstSide)')
    expect(hook).not.toContain('useSessionStore.setState({ humanSide: firstSide })')
    expect(hook).not.toContain("setMachineSides({ red: firstSide === 'black', black: firstSide === 'red' })")
  })
  it('requires explicit AI toggles for either side', () => {
    expect(hook).toContain('toggleMachineSide')
    expect(hook).not.toContain('Re-arm the opponent AI after the opening move')
    expect(hook).toContain('fairyStockfishApi.move(')
  })
  it('keeps board orientation independent of chosen first piece', () => {
    expect(page).not.toContain('positionTrial ? trial.openingSide ?? match.humanSide : match.humanSide')
    expect(page).toContain('positionTrial || match.computer ? match.humanSide')
  })
})