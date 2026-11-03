import { createApplication } from './app'

const server = createApplication()
const port = Number(process.env.PORT || 3001)
const host = process.env.HOST || '0.0.0.0'
server.http.listen(port, host, () => {
  console.log(`Cờ Tướng API: http://${host}:${port}`)
})
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => { void server.close().then(() => process.exit(0)).catch(()=>{console.error('Không hoàn tất ghi dữ liệu khi tắt server.');process.exit(1)}) })
}
