import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Keep the previous smoke entry point; the assertions now live in typed Vitest suites.
export async function runTests(root) {
  const { stdout } = await promisify(execFile)(process.execPath,
    [path.join(root, 'node_modules/vitest/vitest.mjs'), 'run'],
    { cwd: root, maxBuffer: 4 * 1024 * 1024 })
  return stdout.trim()
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(await runTests(path.resolve(fileURLToPath(new URL('..', import.meta.url)))))
}
