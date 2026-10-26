import { expect, it, vi } from 'vitest'
import express from 'express'
import type { RowDataPacket } from 'mysql2'
import type { AddressInfo } from 'node:net'
import { accountRouter } from '../server/controllers/accountController'
import { AccountService } from '../server/services/accountService'
import { PersistenceService } from '../server/services/persistenceService'
it('conversation presence follows connected account IDs on each poll, including non-friends', async () => {
  const account = new AccountService()
  const persistence = new PersistenceService()
  vi.spyOn(account, 'authenticate').mockResolvedValue('1')
  vi.spyOn(persistence.social, 'conversations').mockResolvedValue([
    { constructor: { name: 'RowDataPacket' }, id: 'direct', type: 'direct', peerId: '2' } as RowDataPacket,
    { constructor: { name: 'RowDataPacket' }, id: 'offline', type: 'direct', peerId: '3' } as RowDataPacket,
    { constructor: { name: 'RowDataPacket' }, id: 'group', type: 'group', peerId: '2' } as RowDataPacket,
  ])
  const connected = new Set(['2'])
  const app = express()
  app.use('/api/account', accountRouter(account, persistence, () => connected))
  const server = app.listen(0, '127.0.0.1')
  await new Promise<void>(resolve => server.once('listening', resolve))
  try {
    const url = 'http://127.0.0.1:' + (server.address() as AddressInfo).port + '/api/account/conversations'
    const first = await (await fetch(url)).json()
    expect(first.map((item: { online: boolean }) => item.online)).toEqual([true, false, false])
    connected.delete('2'); connected.add('3')
    const second = await (await fetch(url)).json()
    expect(second.map((item: { online: boolean }) => item.online)).toEqual([false, true, false])
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    vi.restoreAllMocks()
  }
})
