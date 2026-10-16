import { useEffect, useRef, useState } from 'react'
import { sendChallenge } from '../../../services/challenge'
import { errorMessage } from '../../../services/api'

export function useProfileChallenge(name: string, targetId: string | undefined, onFeedback: (message: string) => void) {
  const [pending, setPending] = useState(false)
  const requestVersion = useRef(0)
  useEffect(() => {
    requestVersion.current += 1
    setPending(false)
    return () => { requestVersion.current += 1 }
  }, [name, targetId])

  const invite = async () => {
    if (pending) return
    const version = ++requestVersion.current
    setPending(true)
    try {
      await sendChallenge(name, targetId)
      if (version === requestVersion.current) onFeedback(`Đã gửi lời mời So tài tới ${name}.`)
    } catch (error) {
      if (version === requestVersion.current) onFeedback(errorMessage(error))
    } finally {
      if (version === requestVersion.current) setPending(false)
    }
  }
  return { pending, invite }
}
