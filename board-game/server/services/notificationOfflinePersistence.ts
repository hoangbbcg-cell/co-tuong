import type { AccountConnectionSnapshot } from './notificationConnectionTracker'

export interface OfflineCycleWriter {
  online(userId: string): Promise<void>
  offline(userId: string, at: number): Promise<void>
}

/** Serializes transitions per account; redundant tabs do not reset the offline clock. */
export class NotificationOfflinePersistence {
  private readonly pending = new Map<string, Promise<void>>()
  private readonly lastOnline = new Map<string, boolean>()
  constructor(private readonly writer: OfflineCycleWriter, private readonly report: (error: unknown) => void = () => {}) {}

  observe(userId: string, snapshot: AccountConnectionSnapshot): void {
    const isOnline = snapshot.onlineConnections > 0
    if (this.lastOnline.get(userId) === isOnline) return
    if (!isOnline && snapshot.offlineSince === null) return
    this.lastOnline.set(userId, isOnline)
    const previous = this.pending.get(userId) ?? Promise.resolve()
    const next = previous.catch(() => {}).then(() => isOnline
      ? this.writer.online(userId)
      : this.writer.offline(userId, snapshot.offlineSince!))
    this.pending.set(userId, next)
    void next.catch(this.report).finally(() => {
      if (this.pending.get(userId) === next) this.pending.delete(userId)
    })
  }

  async flush(): Promise<void> { await Promise.allSettled([...this.pending.values()]) }
}
