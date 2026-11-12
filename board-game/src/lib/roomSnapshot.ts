import type { RoomSnapshot } from '../types/room'

/** Socket snapshots are plain JSON. Reuse equal live subtrees without mutating either snapshot. */
function share(previous: unknown, next: unknown): unknown {
  if (Object.is(previous, next)) return previous
  if (Array.isArray(previous) && Array.isArray(next)) {
    const items = next.map((value, index) => share(previous[index], value))
    return previous.length === items.length && items.every((value, index) => value === previous[index]) ? previous : items
  }
  if (previous && next && typeof previous === 'object' && typeof next === 'object' && !Array.isArray(previous) && !Array.isArray(next)) {
    const before = previous as Record<string, unknown>
    const entries = Object.entries(next).map(([key, value]) => [key, share(before[key], value)] as const)
    return Object.keys(before).length === entries.length && entries.every(([key, value]) => Object.hasOwn(before, key) && before[key] === value)
      ? previous : Object.fromEntries(entries)
  }
  return next
}

export function shareRoomSnapshot(previous: RoomSnapshot, next: RoomSnapshot): RoomSnapshot {
  // Completed archives may contain hundreds of boards; do not deep-walk them on every clock tick.
  const entries = Object.entries(next).map(([key, value]) => [key,
    key === 'lastCompletedMatch' ? value : share(previous[key as keyof RoomSnapshot], value),
  ] as const)
  return Object.keys(previous).length === entries.length && entries.every(([key, value]) => Object.hasOwn(previous, key) && previous[key as keyof RoomSnapshot] === value)
    ? previous : Object.fromEntries(entries) as unknown as RoomSnapshot
}