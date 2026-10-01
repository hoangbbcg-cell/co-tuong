import { createApplication } from './app'

const server = createApplication()
const port = Number(process.env.PORT || 3001)
server.http.listen(port, process.env.HOST || '127.0.0.1', () => {
  console.log(`Cờ Tướng API: http://${process.env.HOST || '127.0.0.1'}:${port}`)
})
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => { void server.close().then(() => process.exit(0)) })
}
