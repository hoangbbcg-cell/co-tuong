export class LobbyPresenceRepository {
  private readonly provinces = new Map<string, string>()
  set(id: string, province: string) { this.provinces.set(id, province) }
  remove(id: string) { this.provinces.delete(id) }
  entries() { return this.provinces.entries() }
}
