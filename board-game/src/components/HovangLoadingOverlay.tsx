import { HovangDataSpinner } from './HovangDataSpinner'

/** Visual loading stays above its region without taking space from content. */
export function HovangLoadingOverlay({ label = 'Đang tải', fullscreen = false }: { label?: string; fullscreen?: boolean }) {
  return <div role="status" aria-label={label} data-screenshot-exclude="true" className={`${fullscreen ? 'fixed' : 'absolute'} inset-0 z-[80] grid place-items-center pointer-events-none`}>
    <HovangDataSpinner />
  </div>
}
