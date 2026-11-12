import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = readFileSync(resolve(process.cwd(), 'src/features/game/components/GameEnergyControl.tsx'), 'utf8')

describe('In-game energy recovery tooltip regression', () => {
  it('reads actual energy recovery epoch from session state and updates every second', () => {
    expect(source).toContain('state.energyRecoveryAt')
    expect(source).toContain('window.setInterval')
    expect(source).toContain('Hồi năng lượng sau:')
    expect(source).toContain('data-game-energy-recovery-tooltip')
  })
  it('uses browser timer numeric id instead of NodeJS Timeout', () => {
    expect(source).toContain('const holdTimer = useRef<number | null>(null)')
    expect(source).toContain('window.setTimeout(() => {')
    expect(source).toContain('window.clearTimeout(holdTimer.current)')
  })
  it('displays on hover and uses touch hold without opening the energy shop', () => {
    expect(source).toContain("window.matchMedia('(hover: hover)')")
    expect(source).toContain('onTouchStart')
    expect(source).toContain('onTouchEnd={closeHold}')
    expect(source).toContain('onTouchCancel={closeHold}')
    expect(source).toContain('longPressTriggered.current')
    expect(source).toContain('if (longPressTriggered.current)')
  })
  it('keeps the original energy shop action, and no reward API', () => {
    expect(source).toContain('dialogRef.current?.showModal()')
    expect(source).toContain('<EnergyDialog dialogRef={dialogRef} onUnavailable={() => {}} />')
    expect(source).not.toContain('/api/account/free-energy')
  })
})