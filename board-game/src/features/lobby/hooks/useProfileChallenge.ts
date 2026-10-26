import { useEffect, useRef, useState } from 'react'
import { sendChallenge } from '../../../services/challenge'
import { errorMessage } from '../../../services/api'
import { CHALLENGE_BLOCKED_MESSAGE } from '../../../types/challenge'
import { useChallengeCooldownStore } from '../../../store/challengeCooldownStore'

export function useProfileChallenge(name: string, targetId: string | undefined, onFeedback: (message: string) => void, onSent?: (message?: string) => void) {
  const [pending, setPending] = useState(false)
  const coolingDown = useChallengeCooldownStore(state => state.until !== 0)
  const requestVersion = useRef(0)
  useEffect(() => {
    requestVersion.current += 1
    setPending(false)
    return () => { requestVersion.current += 1 }
  }, [name, targetId])

  const invite = async () => {
    if (pending || coolingDown) return
    const version = ++requestVersion.current
    setPending(true)
    try {
      await sendChallenge(name, targetId)
      if (version === requestVersion.current) { if (onSent) onSent(); else onFeedback(`Đã gửi lời mời So tài tới ${name}.`) }
    } catch (error) {
      if (version === requestVersion.current) {
        const message = errorMessage(error)
        if (message === CHALLENGE_BLOCKED_MESSAGE && onSent) onSent(message)
        else onFeedback(message)
      }
    } finally {
      if (version === requestVersion.current) setPending(false)
    }
  }
  return { pending: pending || coolingDown, invite }
}
