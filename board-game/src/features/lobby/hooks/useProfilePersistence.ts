import { accountApi } from '../../../services/accountApi'
import { refreshAccount } from '../../../services/accountSession'
export function useProfilePersistence(){
  return {
    location:async(input:unknown)=>{await accountApi.location(input);await refreshAccount()},
    avatar:async(index:number,frame:number)=>{await accountApi.avatar(`avatar-${index}`,`frame-${frame}`);await refreshAccount()},
  }
}
