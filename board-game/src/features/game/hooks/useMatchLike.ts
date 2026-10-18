import { accountApi } from '../../../services/accountApi'
import { useSessionStore } from '../../../store/sessionStore'
import type { Side } from '../../../types/game'
export async function saveMatchLike(matchId:string,actorId:string,targetSide:Side) {
  if(useSessionStore.getState().account)await accountApi.request.put(`/match-likes/${matchId}`,{side:targetSide,enabled:true})
  useSessionStore.getState().recordMatchLike({matchId,actorId,targetSide})
}
