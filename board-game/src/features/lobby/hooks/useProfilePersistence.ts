import { accountApi } from '../../../services/accountApi'
import { loadAccountData, refreshAccount } from '../../../services/accountSession'
export function useProfilePersistence(){
  return {
    rename:async(name:string)=>{await accountApi.rename(name);await loadAccountData(await accountApi.me())},
    location:async(input:unknown)=>{await accountApi.location(input);await refreshAccount()},
    avatar:async(index:number,frame:number)=>{await accountApi.avatar(`avatar-${index}`,`frame-${frame}`);await refreshAccount()},
  }
}
