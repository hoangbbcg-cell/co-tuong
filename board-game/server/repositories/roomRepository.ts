import type { RoomSnapshot } from '../../src/types/room'

// Ephemeral storage. Database access belongs in this layer when persistence is added.
export class RoomRepository {
  constructor(private readonly observer?: (room:RoomSnapshot)=>void,readonly canStart:(room:RoomSnapshot)=>boolean=()=>true, readonly hasEnergy: (socketId: string, room?:RoomSnapshot) => boolean = () => true) {}
  recordCompletion(room:RoomSnapshot) { this.observer?.(room) }
  private ownerAccounts = new Map<string, string>()
  reserveOwner(id: string, accountId: string) { this.ownerAccounts.set(id, accountId) }
  canClaimOwner(id: string, accountId?: string) { const reserved = this.ownerAccounts.get(id); return !reserved || reserved === accountId }
  private rooms = new Map<string, RoomSnapshot>()
  private updatedAt = new Map<string, number>()
  private passwords = new Map<string, { salt: Buffer; hash: Buffer }>()
  setPassword(id: string, password: { salt: Buffer; hash: Buffer }) { this.passwords.set(id, password) }
  getPassword(id: string) { return this.passwords.get(id) }
  all() { return [...this.rooms.values()] }
  get(id: string) { return this.rooms.get(id) }
  save(room: RoomSnapshot) { this.observer?.(room); this.rooms.set(room.id, room); this.updatedAt.set(room.id, Date.now()) }
  /** Startup-only hydration; the associated durable match row already exists. */
  restore(room: RoomSnapshot) { this.rooms.set(room.id, room); this.updatedAt.set(room.id, Date.now()) }
  delete(id: string) { this.rooms.delete(id); this.updatedAt.delete(id); this.passwords.delete(id); this.ownerAccounts.delete(id) }
  pruneEmpty(now = Date.now()) {
    for (const room of this.rooms.values()) {
      if (!room.players.length && !room.viewers?.length && now - (this.updatedAt.get(room.id) ?? 0) > 30 * 60_000) this.delete(room.id)
    }
  }
}
