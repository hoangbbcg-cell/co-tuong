import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const file = readFileSync(resolve(process.cwd(), 'src/features/lobby/components/EnergyDialog.tsx'), 'utf8')
describe('Energy ad placeholder', () => {
  it('offers an unavailable-ad notice and keeps the two paid products', () => {
    expect(file).toContain('function AdNotIntegratedNotice(')
    expect(file).toContain('showAdNotice && <AdNotIntegratedNotice')
    expect(file).toContain('Quảng cáo chưa được tích hợp')
    expect(file).toContain('energy_100')
    expect(file).toContain('energy_unlimited_30d')
    expect(file).toContain('PayosCheckoutPanel')
  })
  it('never exposes an energy grant action in the ads dialog', () => {
    expect(file).not.toContain('/api/account/free-energy')
    expect(file).not.toContain('Nhận miễn phí +1')
    expect(file).not.toContain('function FreeEnergyPanel(')
    expect(file).not.toContain('Nhận ngay 1 Năng lượng.')
  })
})