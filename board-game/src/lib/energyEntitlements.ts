const unlimitedEnergyPublicIds = new Set(['29622295', '96161606'])

export function hasUnlimitedEnergyPublicId(publicId: string): boolean {
  return unlimitedEnergyPublicIds.has(publicId)
}
