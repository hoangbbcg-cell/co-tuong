import { useEffect, useState } from 'react'

const STORAGE_KEY = 'co-tuong-honor-grants-v1'
const GRANTS_CHANGED_EVENT = 'co-tuong-honor-grants-changed'
type HonorGrants = Record<string, string[]>

function loadGrants(): HonorGrants {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {}
    return Object.fromEntries(Object.entries(stored).filter(([, ids]) => Array.isArray(ids)).map(([name, ids]) => [name, [...new Set((ids as unknown[]).filter((id): id is string => typeof id === 'string' && /^pt_[1-5]_/.test(id)))]]))
  } catch {
    return {}
  }
}

const recipientKey = (name: string) => name.normalize('NFC').trim().toLocaleLowerCase('vi')

/** Local profile grants persist across room changes and browser reloads. */
export function useHonorGrants() {
  const [grants, setGrants] = useState(loadGrants)
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) setGrants(loadGrants()) }
    const syncCurrentPage = () => setGrants(loadGrants())
    window.addEventListener('storage', sync)
    window.addEventListener(GRANTS_CHANGED_EVENT, syncCurrentPage)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(GRANTS_CHANGED_EVENT, syncCurrentPage)
    }
  }, [])
  const getGrantedHonorIds = (name: string) => grants[recipientKey(name)] ?? []
  const toggleGrant = (name: string, honorId: string): boolean => {
    // Read storage at action time so reopened panels and other tabs cannot add duplicates.
    const current = loadGrants()
    const key = recipientKey(name)
    const ids = current[key] ?? []
    const granting = !ids.includes(honorId)
    const next = { ...current, [key]: granting ? [...ids, honorId] : ids.filter(id => id !== honorId) }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setGrants(next)
    window.dispatchEvent(new Event(GRANTS_CHANGED_EVENT))
    return granting
  }
  const getGrantCount = (name: string, honorId: string) => getGrantedHonorIds(name).includes(honorId) ? 1 : 0
  return { getGrantedHonorIds, getGrantCount, toggleGrant }
}
