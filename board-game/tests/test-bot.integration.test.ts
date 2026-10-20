import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { createApplication } from '../server/app'
import { rows } from '../server/repositories/accountRepository'
import { getLegalMoves } from '../src/game/rules'
import type { GameState } from '../src/types/game'

describe.skipIf(process.env.DB_INTEGRATION !== '1')('test bot rewards on disposable MySQL', () => {
  let app: ReturnType<typeof createApplication>, base: string
  const request = async (path: string, body?: unknown, cookie='') => {
    const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Cookie:cookie,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)})
    return {status:response.status,data:await response.json(),cookie:response.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ')}
  }
  const move = (game: GameState) => {
    for(let row=0;row<10;row++)for(let col=0;col<9;col++)if(game.board[row][col]?.side==='red'){
      const to=getLegalMoves(row,col,game.board)[0];if(to)return {from:{row,col},to}
    }
    throw new Error('No move')
  }
  beforeAll(async()=>{
    app=createApplication();await new Promise<void>(resolve=>app.http.listen(0,'127.0.0.1',resolve))
    const address=app.http.address();if(!address||typeof address==='string')throw new Error('No server')
    base=`http://127.0.0.1:${address.port}/api/account`
  })
  afterAll(async()=>{vi.restoreAllMocks();await app?.close()})
  it.each(['xiangqi','jieqi'])('keeps %s gold unchanged after two moves with duplicate and identity protection',async variant=>{
    expect((await request('/test-bot',{variant})).status).toBe(401)
    const player=await request('/guest',{}),other=await request('/guest',{})
    const start=await request('/test-bot',{variant},player.cookie)
    expect(start.status).toBe(200)
    const path=`/test-bot/${start.data.id}/move`
    expect((await request(path,{move:move(start.data.game),requestId:crypto.randomUUID()},other.cookie)).status).toBe(404)
    const first=await request(path,{move:move(start.data.game),requestId:crypto.randomUUID()},player.cookie)
    expect(first.data.humanMoves).toBe(1)
    expect((await request('/me',undefined,player.cookie)).data.gold).toBe('0')
    const body={move:move(first.data.game),requestId:crypto.randomUUID(),gold:999999,winner:'red'}
    const [win,retry]=await Promise.all([request(path,body,player.cookie),request(path,body,player.cookie)])
    expect(win.status).toBe(200);expect(retry.status).toBe(200)
    expect(win.data.game.result.winner).toBe('black')
    const profile=(await request('/me',undefined,player.cookie)).data
    expect(Number(profile.gold)).toBe(win.data.goldAwarded)
    expect(Number(profile.gold)).toBe(0)
    expect(await rows("SELECT id FROM resource_events WHERE user_id=? AND reason='test_bot_win'",[String(player.data.id)])).toHaveLength(0)
    expect((await request(path,{...body,requestId:crypto.randomUUID()},player.cookie)).status).toBe(409)
  })
})
