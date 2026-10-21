import { expect, it } from 'vitest'
import type { AddressInfo } from 'node:net'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createApplication } from '../server/app'

it('serves the mobile preview entry from the production server', async () => {
  const staticDirectory = await mkdtemp(join(tmpdir(), 'mobile-preview-test-'))
  await writeFile(join(staticDirectory, 'index.html'), '<!doctype html><html><body><div id="root"></div></body></html>')
  const application = createApplication({ staticDirectory })
  try {
    await new Promise<void>(resolve => application.http.listen(0, '127.0.0.1', resolve))
    const port = (application.http.address() as AddressInfo).port
    for (const path of ['/mobile-preview', '/mobile-preview/']) {
      const response = await fetch(`http://127.0.0.1:${port}${path}`)
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('text/html')
      expect(await response.text()).toContain('id="root"')
    }
  } finally {
    await application.close()
    await rm(staticDirectory, { recursive: true, force: true })
  }
})
