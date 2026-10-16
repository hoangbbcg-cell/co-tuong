import { LobbyPresenceRepository } from '../repositories/lobbyPresenceRepository'

export class LobbyPresenceService {
  constructor(private readonly repository: LobbyPresenceRepository) {}
  update(id: string, province: unknown) {
    if (province === null) this.repository.remove(id)
    else if (typeof province === 'string' && province.trim().length > 0 && province.length <= 100) {
      this.repository.set(id, province.trim().normalize('NFC'))
    }
  }
  remove(id: string) { this.repository.remove(id) }
  counts() {
    const entries = [...this.repository.entries()]
    const totals = new Map<string, number>()
    for (const [, province] of entries) totals.set(province, (totals.get(province) ?? 0) + 1)
    return entries.map(([id, province]) => ({ id, count: totals.get(province)! }))
  }
  countsByProvince() {
    const totals: Record<string, number> = {}
    for (const [, province] of this.repository.entries()) totals[province] = (totals[province] ?? 0) + 1
    return totals
  }
}
