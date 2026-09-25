import { spawn, spawnSync } from 'node:child_process'
import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const isWin = process.platform === 'win32'
const webPort = process.env.WEB_PORT ?? 3033
const cmsPort = process.env.CMS_PORT ?? 3333
const skipDocker = process.argv.includes('--no-docker')

process.chdir(root)

const run = (cmd, args) => {
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: isWin })
  if (res.status !== 0) process.exit(res.status ?? 1)
}

if (!existsSync(resolve(root, '.env'))) {
  copyFileSync(resolve(root, '.env.example'), resolve(root, '.env'))
  console.log('env:    created .env from .env.example')
}

if (!existsSync(resolve(root, 'node_modules', '.modules.yaml'))) {
  console.log('deps:   pnpm install --frozen-lockfile')
  run('pnpm', ['install', '--frozen-lockfile'])
}

if (!skipDocker) {
  console.log('docker: mongo + minio')
  run('docker', ['compose', 'up', '-d', 'mongo', 'minio'])
  run('docker', ['compose', 'up', '--wait', 'mongo', 'minio'])
  run('docker', ['compose', 'up', 'mongo-init'])
  run('docker', ['compose', 'up', 'mongo-restore'])
  run('docker', ['compose', 'up', 'minio-init'])
}

console.log(`web:   http://127.0.0.1:${webPort}`)
console.log(`admin: http://127.0.0.1:${cmsPort}/admin`)

const procs = ['@iva360/cms', '@iva360/web'].map((name) =>
  spawn('pnpm', ['--filter', name, 'dev'], { stdio: 'inherit', shell: isWin }),
)

const stop = () => procs.forEach((p) => p.kill())
process.on('SIGINT', stop)
process.on('SIGTERM', stop)

let alive = procs.length
procs.forEach((p) => p.on('exit', () => --alive === 0 && process.exit(0)))
