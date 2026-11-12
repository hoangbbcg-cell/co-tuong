/** Stable account/socket identity, never display name. The first entry keeps its role/order. */
export function uniqueRoomMembers<T extends { id: string; userId?: string }>(members: readonly T[]): T[] {
  const sockets = new Set<string>()
  const accounts = new Set<string>()
  return members.filter(member => {
    if (sockets.has(member.id) || member.userId && accounts.has(member.userId)) return false
    sockets.add(member.id)
    if (member.userId) accounts.add(member.userId)
    return true
  })
}