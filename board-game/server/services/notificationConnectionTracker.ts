/** Tracks authenticated live game Socket.IO connections by account across tabs and devices. */
export type AccountConnectionSnapshot = Readonly<{
  onlineConnections: number
  offlineSince: number | null
}>

export class NotificationConnectionTracker {
  private readonly accountSockets = new Map<string, Set<string>>()
  private readonly socketAccounts = new Map<string, string>()
  private readonly offlineSince = new Map<string, number>()

  connect(accountId: string, socketId: string, now = Date.now()): AccountConnectionSnapshot {
    if (!accountId || !socketId || !Number.isFinite(now)) throw new Error('Invalid account connection')
    const current = this.socketAccounts.get(socketId)
    if (current && current !== accountId) this.disconnect(socketId, now)
    const sockets = this.accountSockets.get(accountId) ?? new Set<string>()
    sockets.add(socketId)
    this.accountSockets.set(accountId, sockets)
    this.socketAccounts.set(socketId, accountId)
    this.offlineSince.delete(accountId)
    return { onlineConnections: sockets.size, offlineSince: null }
  }

  disconnect(socketId: string, now = Date.now()): AccountConnectionSnapshot | null {
    const accountId = this.socketAccounts.get(socketId)
    if (!accountId) return null
    if (!Number.isFinite(now)) throw new Error('Invalid disconnection timestamp')
    this.socketAccounts.delete(socketId)
    const sockets = this.accountSockets.get(accountId)
    sockets?.delete(socketId)
    if (sockets?.size) return { onlineConnections: sockets.size, offlineSince: null }
    this.accountSockets.delete(accountId)
    this.offlineSince.set(accountId, now)
    return { onlineConnections: 0, offlineSince: now }
  }

  get(accountId: string): AccountConnectionSnapshot {
    return {
      onlineConnections: this.accountSockets.get(accountId)?.size ?? 0,
      offlineSince: this.offlineSince.get(accountId) ?? null,
    }
  }
}
