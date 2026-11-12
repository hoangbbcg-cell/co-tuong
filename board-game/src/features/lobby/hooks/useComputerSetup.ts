import { useEffect, useRef, useState } from 'react'
import { useSessionStore } from '../../../store/sessionStore'
import { useGameStore } from '../../../store/gameStore'
import { fairyStockfishApi } from '../../../services/fairyStockfish'
import { computerErrorMessage, isJieqiComputerPath, JIEQI_COMPUTER_PATH } from '../../../lib/computerPresentation'
import { playBoardEntryActionSound } from '../../../lib/uiActionSound'

export function useComputerSetup() {
  const name = useSessionStore(state => state.name)
  const [side, setSide] = useState<'red' | 'black' | 'random'>('red')
  const [variant, setVariant] = useState<'xiangqi' | 'jieqi'>('xiangqi')
  const level = useSessionStore(state => state.computerLevel)
  const engine = 'fairy' as const
  const setLevel = (next: number) => {
    if (Number.isInteger(next) && next >= 1 && next <= 10) useSessionStore.setState({ computerLevel: next })
  }
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
    name, side, setSide, variant, setVariant, level, setLevel, engine, starting, message, setMessage, messageRef,
    back: () => useSessionStore.setState({ screen: 'home' }),
    customPosition: () => useSessionStore.setState({ screen: 'position', humanSide: side === 'random' ? 'red' : side }),
    start: async () => {
      if (variant === 'jieqi') {
        if (typeof crossOriginIsolated === 'undefined' || !crossOriginIsolated) {
          if (isJieqiComputerPath(window.location.pathname)) {
            setMessage(computerErrorMessage('jieqi'))
            return
          }

          const humanSide = side === 'random'
            ? (Math.random() < .5 ? 'red' : 'black')
            : side

          try {
            window.sessionStorage.setItem(
              'hovang-jieqi-start-v1',
              JSON.stringify({
                humanSide,
                level,
                expires: Date.now() + 120000,
              }),
            )
            window.location.assign(JIEQI_COMPUTER_PATH)
          } catch {
            setMessage(computerErrorMessage('jieqi'))
          }
          return
        }
        if (request.current) return
        const humanSide = side === 'random' ? (Math.random() < .5 ? 'red' : 'black') : side
        useGameStore.getState().reset(performance.now(), 'jieqi')
        playBoardEntryActionSound()
        useSessionStore.getState().joinLocal()
        useSessionStore.setState({ mode: 'computer', humanSide, computerEngine: 'pikaJieqi', computerLevel: level })
        return
      }
      if (request.current) return
      const controller = new AbortController()
      request.current = controller
      setStarting(true)
      const humanSide = side === 'random' ? (Math.random() < .5 ? 'red' : 'black') : side
      const computerEngine = engine
      try {
        if (level >= 7) await fairyStockfishApi.ready(controller.signal)
        if (controller.signal.aborted || useSessionStore.getState().screen !== 'computer') return
        useGameStore.getState().reset(performance.now())
        playBoardEntryActionSound()
        useSessionStore.getState().joinLocal()
        useSessionStore.setState({ mode: 'computer', humanSide, computerEngine, computerLevel: level })
      } catch (error) {
        if (!controller.signal.aborted) setMessage(computerErrorMessage())
      } finally {
        request.current = null
        if (!controller.signal.aborted) setStarting(false)
      }
    },
  }
}
