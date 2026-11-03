import { getRankProgress } from '../../src/lib/rankProgression'
export function ratingDelta(elo:number,opponent:number,result:'win'|'loss'|'draw'):number {
  if(result==='draw')return 0
  const a=getRankProgress(elo),b=getRankProgress(opponent)
  const difference=(b.level-a.level)*3+b.stars-a.stars
  if(result==='loss')return difference>0?-10:-13
  if(Math.abs(difference)>3)return 20
  return difference===0?13:difference<0?10:15+difference
}
