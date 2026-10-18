import { accountApi } from './accountApi'
import { useSessionStore } from '../store/sessionStore'
import { useSavedMatches } from '../store/savedMatchesStore'
import { useSavedPositions } from '../store/savedPositionsStore'
import { usePlayedMatches } from '../store/playedMatchesStore'
import type { AccountProfile } from '../types/account'
import { countryNames } from '../lib/profileLocation'
import { useSocialStore } from '../store/socialStore'

export function applyAccount(profile:AccountProfile) {
  useSessionStore.setState({account:profile,name:profile.displayName,elo:profile.stats.find(s=>s.variant==='xiangqi')?.elo??1000,
    gold:Number(profile.gold),energy:profile.energy,energyRecoveryAt:profile.energyRecoveryAt,countryCode:profile.countryCode,
    province:profile.provinceName??'',address:[profile.wardName,profile.provinceName].filter(Boolean).join(', ')||(profile.countryCode?countryNames.of(profile.countryCode):'Chưa chọn địa chỉ'),
    avatarIndex:Number(profile.avatarCode.replace('avatar-',''))||0,avatarFrameIndex:Number(profile.avatarFrameCode.replace('frame-',''))||0})
}
export async function refreshAccount(){applyAccount(await accountApi.me())}
export async function loadAccountData(profile:AccountProfile) {
  applyAccount(profile)
  const [history,saved,positions]=await Promise.all([accountApi.history(),accountApi.history(true),accountApi.positions(),useSocialStore.getState().refresh()])
  const owner=profile.displayName
  usePlayedMatches.setState({entries:history.map(m=>({...m,owner,isOnline:true as const}))})
  useSavedMatches.setState({entries:saved.map(m=>({...m,owner}))})
  useSavedPositions.setState({entries:positions.map(p=>({...p,owner,savedAt:new Date(p.savedAt).getTime()}))})
}
