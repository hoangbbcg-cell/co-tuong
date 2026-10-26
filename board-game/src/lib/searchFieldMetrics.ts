import type { CSSProperties } from 'react'

/** Friends search: height 60 × 1.17, placeholder 21, input 24, corner 10. */
export function searchFieldMetrics(height: string, compact = true): CSSProperties {
  const referenceHeight = compact ? 60 * 1.17 : 56
  const placeholder = compact ? 21 : 23
  return {
    '--search-input-size': `max(16px, calc(${height} * ${compact ? 24 : 23} / ${referenceHeight}))`,
    '--search-placeholder-size': compact ? `max(14px, calc(${height} * ${placeholder} / ${referenceHeight}))` : `calc(${height} * ${placeholder} / ${referenceHeight})`,
    borderRadius: `calc(${height} * 10 / ${referenceHeight})`,
  } as CSSProperties
}

export const searchFieldTextSize = 'text-[length:var(--search-input-size)] placeholder:text-[length:var(--search-placeholder-size)]'
