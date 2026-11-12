import { expect, it } from 'vitest'
import { createGame } from '../src/game/state/initial'
import { startGame, applyMove } from '../src/game/moves/actions'
import { gameFromPositionFen } from '../src/game/state/customPosition'
import { isMoveLegal } from '../src/game/rules'
import { FairyStockfishService } from '../server/services/fairyStockfishService'
import { choosePracticeMove, PRACTICE_LEVELS } from '../server/services/practiceAi'
it.each([1,2,3,4,5,6])('level %i works without a native executable and returns a legal move',async level=>{
 const service=new FairyStockfishService('missing-practice-test-engine')
 const move=await service.move({moves:[],remainingMs:600000,level})
 const game=startGame(createGame(0),0)
 expect(applyMove(game,move,0).board).not.toBe(game.board)
 service.close()
})
it.each([7,8,9,10])('level %i requires Fairy',async level=>{
 const service=new FairyStockfishService('missing-practice-test-engine')
 await expect(service.move({moves:[],remainingMs:600000,level})).rejects.toThrow('Không tìm thấy Fairy')
 service.close()
})
it('searching level six takes the unprotected rook and preserves the position',async()=>{
 const game=gameFromPositionFen('4k4/9/9/9/r8/4p4/R8/9/9/4K4 w - - 0 1')
 const before=JSON.stringify(game)
 const move=await choosePracticeMove(startGame(game,0),6)
 expect(move).toEqual({from:{row:6,col:0},to:{row:4,col:0}})
 expect(JSON.stringify(game)).toBe(before)
})
it('supports black custom positions and yields so an in-flight request can abort',async()=>{
 const game=startGame(createGame(0),0)
 game.currentTurn='black'
 const move=await choosePracticeMove(game,4)
 expect(move).not.toBeNull()
 expect(isMoveLegal(move!.from.row,move!.from.col,move!.to.row,move!.to.col,game.board)).toBe(true)
 const controller=new AbortController()
 const task=choosePracticeMove(startGame(createGame(0),0),6,controller.signal)
 const timer=setTimeout(()=>controller.abort(),1)
 await expect(task).rejects.toThrow('hủy')
 clearTimeout(timer)
})
it('budgets increase from beginner to advanced practice levels',()=>{
 expect(PRACTICE_LEVELS.map(p=>p.depth)).toEqual([0,0,1,2,3,4])
 for(let i=2;i<6;i++)expect(PRACTICE_LEVELS[i].nodes).toBeGreaterThan(PRACTICE_LEVELS[i-1].nodes)
})
