import { expect,it } from 'vitest'
import { ratingDelta } from '../server/services/rating'
import { recoverEnergy,ENERGY_RECOVERY_MS } from '../src/lib/energy'
it('uses the approved asymmetric Elo rules across rank boundaries, caps and draws',()=>{
  expect(ratingDelta(1200,1300,'win')).toBe(16)
  expect(ratingDelta(1200,1400,'win')).toBe(17)
  expect(ratingDelta(1200,1500,'win')).toBe(18)
  expect(ratingDelta(1500,1200,'win')).toBe(10)
  expect(ratingDelta(1000,2000,'win')).toBe(20)
  expect(ratingDelta(2000,1000,'win')).toBe(20)
  expect(ratingDelta(1200,1300,'loss')).toBe(-10)
  expect(ratingDelta(1300,1200,'loss')).toBe(-13)
  expect(ratingDelta(1000,1000,'win')).toBe(13)
  expect(ratingDelta(4000,5000,'win')).toBe(13)
  expect(ratingDelta(1000,5000,'draw')).toBe(0)
})
it('preserves purchased energy above 5 and only recovers below the natural cap',()=>{
  expect(recoverEnergy(8,1,100000000)).toEqual({energy:8,energyRecoveryAt:null})
  expect(recoverEnergy(5,null,0)).toEqual({energy:5,energyRecoveryAt:null})
  expect(recoverEnergy(4,null,0)).toEqual({energy:4,energyRecoveryAt:ENERGY_RECOVERY_MS})
  expect(recoverEnergy(3,1,ENERGY_RECOVERY_MS+1)).toEqual({energy:5,energyRecoveryAt:null})
})
