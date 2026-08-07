/**
 * Minimal Node adapter for the production build.
 *
 * `vite build` emits a web-standard `fetch` handler at `dist/server/server.js`
 * plus hashed client assets in `dist/client`. This script wires those two
 * together behind `node:http` so `npm start` works with zero extra
 * dependencies. Swap it for a platform preset (Vercel, Netlify, Cloudflare,
 * Bun) at deploy time — the handler it wraps is the same either way.
 */
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const PORT = Number(process.env.PORT ?? 3000)
const HOST = process.env.HOST ?? '0.0.0.0'
const ROOT = resolve(process.cwd(), 'dist')
const CLIENT_DIR = join(ROOT, 'client')
const SERVER_ENTRY = join(ROOT, 'server', 'server.js')

if (!existsSync(SERVER_ENTRY)) {
  console.error('Build output missing. Run `npm run build` first.')
  process.exit(1)
}

const { default: handler } = await import(pathToFileURL(SERVER_ENTRY).href)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

/** Resolve a request path to a file inside dist/client, or null. */
function resolveStatic(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  // Block path traversal before touching the filesystem.
  const candidate = join(CLIENT_DIR, normalize(decoded))
  if (!candidate.startsWith(CLIENT_DIR)) return null
  if (!existsSync(candidate)) return null
  const stats = statSync(candidate)
  return stats.isFile() ? candidate : null
}

function toWebRequest(req) {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((entry) => headers.append(key, entry))
    else if (value != null) headers.set(key, value)
  }

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
  return new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? req : undefined,
    duplex: hasBody ? 'half' : undefined,
  })
}

async function sendWebResponse(res, response) {
  res.statusCode = response.status
  response.headers.forEach((value, key) => res.setHeader(key, value))

  if (!response.body) {
    res.end()
    return
  }

  const reader = response.body.getReader()
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    res.write(value)
  }
  res.end()
}

const server = createServer(async (req, res) => {
  try {
    const staticFile = resolveStatic(req.url ?? '/')
    if (staticFile) {
      const ext = extname(staticFile)
      res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
      // Hashed assets are immutable; everything else revalidates.
      res.setHeader(
        'Cache-Control',
        staticFile.includes(`${join('assets')}`)
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=0, must-revalidate',
      )
      createReadStream(staticFile).pipe(res)
      return
    }

    const response = await handler.fetch(toWebRequest(req))
    await sendWebResponse(res, response)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Man Authority running at http://localhost:${PORT}`)
})
