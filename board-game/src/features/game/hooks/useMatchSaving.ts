import { useEffect, useRef, useState } from 'react'
import type { GameState } from '../../../types/game'
import type { RecordedMatch } from '../../../types/recordedMatch'
import { useGameStore } from '../../../store/gameStore'
import { useSavedMatches } from '../../../store/savedMatchesStore'
import { createClientId } from '../../../lib/clientId'
import { usePlayedMatches } from '../../../store/playedMatchesStore'
import { useSessionStore } from '../../../store/sessionStore'
import { applyAccount, invalidateAccountHistory } from '../../../services/accountSession'
import { accountApi } from '../../../services/accountApi'

export function useMatchSaving(game: GameState, onlineMatch: RecordedMatch | undefined, online: boolean, owner: string, redName: string, blackName: string, enabled = true, override: RecordedMatch | null = null) {
  const [lastMatch, setLastMatch] = useState<RecordedMatch | null>(null)
  const [error, setError] = useState('')
  const entryMatchId = useRef(onlineMatch?.id)
  const entries = useSavedMatches(state => state.entries)
  useEffect(() => {
    if (!enabled) return
    // Custom-position trials supply their own recording snapshot: the saved
    // match always spans from the moment "Đấu ngay" was pressed, not just
    // through gameStore history at match end.
    if (override) {
      setLastMatch(override)
      setError('')
      return
    }
    if (online) {
      // Keep a previously observed result during the next game, but do not
      // offer an old room archive to someone arriving in the middle of play.
      if (game.phase !== 'playing' && onlineMatch && onlineMatch.id !== entryMatchId.current && onlineMatch.states.at(-1)?.phase === 'finished') {
        setLastMatch(onlineMatch)
        setError('')
      }
      return
    }
    if (game.phase === 'finished') {
      const local = useGameStore.getState()
      setLastMatch({ id: createClientId(), endedAt: Date.now(), redName, blackName, states: structuredClone([...local.history, game]) })
      setError('')
    }
  }, [enabled, online, onlineMatch, game.phase, game.result, override])
  const recording = lastMatch
  useEffect(()=>{const account=useSessionStore.getState().account;if(online&&recording&&account)void accountApi.me().then(profile => { if (useSessionStore.getState().account?.id !== account.id) return; invalidateAccountHistory(); applyAccount(profile) }).catch(()=>setError('Không tải được lịch sử ván đấu.'))},[online,recording?.id])
  useEffect(() => {
    if (!enabled || !online || !recording || useSessionStore.getState().account) return
    try { usePlayedMatches.getState().record(owner, recording) }
    catch { setError('Không thể lưu lịch sử ván đấu. Bộ nhớ có thể đã đầy.') }
  }, [enabled, online, owner, recording])
  const saved = !!recording && entries.some(item => item.owner === owner && item.id === recording.id)
  const save = async () => {
    if (!recording) return
    try { await useSavedMatches.getState().save(owner, recording, online && !!useSessionStore.getState().account); setError('') }
    catch (error) { setError(error instanceof Error ? error.message : 'Không thể lưu ván đấu.') }
  }
  return { recording, saved, error, save }
}
