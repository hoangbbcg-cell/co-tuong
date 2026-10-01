import { useEffect, useRef, useState } from 'react'
import { useSessionStore, type ComputerEngine } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { pikafishApi } from '../../../services/pikafish'
import { errorMessage } from '../../../services/api'

export function useComputerSetup() {
  const name = useSessionStore(state => state.name)
  const [side, setSide] = useState<'red' | 'black' | 'random'>('red')
  const [engines, setEngines] = useState<Record<'red' | 'black', ComputerEngine>>({ black: 'pikafish', red: 'pikafish' })
  const [starting, setStarting] = useState(false)
  const request = useRef<AbortController | null>(null)
  useEffect(() => () => request.current?.abort(), [])
  const [message, setMessage] = useState('')
  const messageRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (message && !messageRef.current?.open) messageRef.current?.showModal()
    if (!message && messageRef.current?.open) messageRef.current.close()
  }, [message])
  return {
    name, side, setSide, engines, setEngines, starting, message, setMessage, messageRef,
    back: () => useSessionStore.setState({ screen: 'home' }),
    start: async () => {
      if (request.current) return
      const controller = new AbortController()
      request.current = controller
      setStarting(true)
      const humanSide = side === 'random' ? (Math.random() < .5 ? 'red' : 'black') : side
      const computerEngine = engines[humanSide === 'red' ? 'black' : 'red']
      try {
        if (computerEngine === 'pikafish') await pikafishApi.ready(controller.signal)
        if (controller.signal.aborted || useSessionStore.getState().screen !== 'computer') return
        useGameStore.getState().reset(performance.now())
        useSessionStore.getState().joinLocal()
        useSessionStore.setState({ mode: 'computer', humanSide, computerEngine })
      } catch (error) {
        if (!controller.signal.aborted) setMessage(errorMessage(error))
      } finally {
        request.current = null
        if (!controller.signal.aborted) setStarting(false)
      }
    },
  }
}
