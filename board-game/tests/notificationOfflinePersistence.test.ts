import { describe, expect, it } from 'vitest'
import { NotificationOfflinePersistence, type OfflineCycleWriter } from '../server/services/notificationOfflinePersistence'

function fixture() {
  const calls: string[] = []
  const writer: OfflineCycleWriter = {
    online: async id => { calls.push(`online:${id}`) },
    offline: async (id, at) => { calls.push(`offline:${id}:${at}`) },
  }
  return { calls, subject: new NotificationOfflinePersistence(writer) }
}
describe('Durable offline transitions', () => {
  it('only stores when the last tab leaves', async () => {
    const {calls,subject}=fixture()
    subject.observe('12',{onlineConnections:2, offlineSince:null})
    subject.observe('12',{onlineConnections:1, offlineSince:null})
    subject.observe('12',{onlineConnections:0, offlineSince:1000})
    await subject.flush()
    expect(calls).toEqual(['online:12','offline:12:1000'])
  })
  it('reconnect closes the cycle and next exit begins a fresh one', async () => {
    const {calls,subject}=fixture()
    subject.observe('5',{onlineConnections:1,offlineSince:null})
    subject.observe('5',{onlineConnections:0,offlineSince:100})
    subject.observe('5',{onlineConnections:1,offlineSince:null})
    subject.observe('5',{onlineConnections:0,offlineSince:400})
    await subject.flush()
    expect(calls).toEqual(['online:5','offline:5:100','online:5','offline:5:400'])
  })
  it('does not infer an offline timestamp from missing presence after restart', async () => {
    const {calls,subject}=fixture()
    subject.observe('5',{onlineConnections:0,offlineSince:null})
    await subject.flush()
    expect(calls).toEqual([])
  })
  it('isolates account transitions', async () => {
    const {calls,subject}=fixture()
    subject.observe('a',{onlineConnections:1,offlineSince:null})
    subject.observe('b',{onlineConnections:1,offlineSince:null})
    subject.observe('a',{onlineConnections:0,offlineSince:7})
    await subject.flush()
    expect(calls).toContain('offline:a:7')
    expect(calls).not.toContain('offline:b:7')
  })
  it('does not create unhandled rejections on DB failure', async () => {
    const errors: unknown[]=[]
    const subject=new NotificationOfflinePersistence({online:async()=>{throw Error('db down')},offline:async()=>{}},e=>errors.push(e))
    subject.observe('5',{onlineConnections:1,offlineSince:null})
    await subject.flush()
    expect(errors).toHaveLength(1)
  })
})
