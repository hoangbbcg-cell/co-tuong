import { useRef, useState } from 'react'
import { sendChallenge } from '../../../services/challenge'
import { errorMessage } from '../../../services/api'
import { CHALLENGE_BLOCKED_MESSAGE } from '../../../types/challenge'
import { useChallengeCooldownStore } from '../../../store/challengeCooldownStore'

export function useFriendChallenge(onFeedback: (name: string, message: string) => void, onSent?: (message?: string) => void) {
  const busy = useRef(false)
  const [pending, setPending] = useState(false)
  const coolingDown = useChallengeCooldownStore(state => state.until !== 0)
  const invite = async (name: string, id?: string) => {
    if (busy.current || coolingDown) return
    busy.current = true
    setPending(true)
    try {
      await sendChallenge(name, id)
      if (onSent) onSent()
      else onFeedback(name, `Đã gửi lời mời chơi tới ${name}.`)
    } catch (error) {
      const message = errorMessage(error)
      if (message === CHALLENGE_BLOCKED_MESSAGE && onSent) onSent(message)
      else onFeedback(name, message)
    } finally {
      busy.current = false
      setPending(false)
    }
  }
  return { pending: pending || coolingDown, invite }
}
