import { useRef, useState } from 'react'
import { sendChallenge } from '../../../services/challenge'
import { errorMessage } from '../../../services/api'

export function useFriendChallenge(onFeedback: (name: string, message: string) => void) {
  const busy = useRef(false)
  const [pending, setPending] = useState(false)
  const invite = async (name: string) => {
    if (busy.current) return
    busy.current = true
    setPending(true)
    try {
      await sendChallenge(name)
      onFeedback(name, `Đã gửi lời mời chơi tới ${name}.`)
    } catch (error) {
      onFeedback(name, errorMessage(error))
    } finally {
      busy.current = false
      setPending(false)
    }
  }
  return { pending, invite }
}
