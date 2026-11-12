import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const energy = readFileSync(resolve(root, 'src/features/lobby/components/EnergyDialog.tsx'), 'utf8')
const profile = readFileSync(resolve(root, 'src/features/lobby/components/ProfileDialog.tsx'), 'utf8')
const styles = readFileSync(resolve(root, 'src/features/lobby/components/OneChoiceNoticeStyles.ts'), 'utf8')

describe('Energy advertising reuses So tai notice', () => {
  it('uses the exact shared notice panel and button styles', () => {
    expect(profile).toContain('className={oneChoiceNoticePanel}')
    expect(profile).toContain('className={oneChoiceNoticeButton}')
    expect(styles).toContain('export const oneChoiceNoticePanel')
    expect(styles).toContain('export const oneChoiceNoticeButton')
    expect(energy).toContain("from './OneChoiceNoticeStyles'")
    expect(energy).toContain('className={oneChoiceNoticePanel}')
    expect(energy).toContain('className={oneChoiceNoticeButton}')
  })

  it('shows only the unavailable advertisement notice', () => {
    expect(energy).toContain('Quảng cáo chưa được tích hợp')
    expect(energy).toContain('showAdNotice && <AdNotIntegratedNotice')
    expect(energy).toContain('onClick={onClose}')
    expect(energy).not.toContain('/api/account/free-energy')
    expect(energy).not.toContain('Nhận miễn phí +1')
    expect(energy).not.toContain('function FreeEnergyPanel(')
  })

  it('preserves paid energy packages', () => {
    expect(energy).toContain('energy_100')
    expect(energy).toContain('energy_unlimited_30d')
    expect(energy).toContain('PayosCheckoutPanel')
  })
})