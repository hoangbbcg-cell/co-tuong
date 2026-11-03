import { useEffect, useState } from 'react'

/** Socket copies of the same finished match must not restart the Ready delay. */
export function useDelayedResultReady(resultKey: string | null) {
  const [completedKey, setCompletedKey] = useState<string | null>(null)
  useEffect(() => {
    if (!resultKey) { setCompletedKey(null); return }
    const timer = setTimeout(() => setCompletedKey(resultKey), 2000)
    return () => clearTimeout(timer)
  }, [resultKey])
  return !!resultKey && completedKey === resultKey
}
