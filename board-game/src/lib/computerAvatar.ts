import computerAvatar from '../assets/computer-setup/ong-hoang-avatar-full.png'

export { computerAvatar }

/** Includes older saved machine names so their portraits remain consistent. */
export function getComputerAvatar(name: string): string | undefined {
  return /^(?:Ông Hoàng|Pikafish|Máy)(?:$|[\s·])/.test(name.trim()) ? computerAvatar : undefined
}
