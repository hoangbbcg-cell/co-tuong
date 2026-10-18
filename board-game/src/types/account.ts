export interface AccountProfile {
  id: string; publicId: string; displayName: string; linked: boolean; renamed: boolean
  avatarCode: string; avatarFrameCode: string
  countryCode: string | null; provinceCode: string | null; provinceName: string | null
  wardCode: string | null; wardName: string | null; locationSet: boolean
  gold: string; energy: number; energyRecoveryAt: number | null
  friends:number;followers:number;likes:number
  stats: { variant: 'xiangqi' | 'jieqi'; elo: number; played: number; wins: number; draws: number; losses: number }[]
}
