// Render an HTML file to a tagged PDF with headless Chromium over CDP (same method as ~/aiib-docs).
// The text layer follows the HTML source order, so parsers read the CV the way a person does.
// usage: node cv/print.mjs <input.html> <output.pdf>   (pnpm cv renders both languages)
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const [inArg, outArg] = process.argv.slice(2)
if (!inArg || !outArg) {
  console.error('usage: node cv/print.mjs <input.html> <output.pdf>')
  process.exit(2)
}
const input = resolve(inArg)
const output = resolve(outArg)

// snap-confined chromium refuses /tmp and hidden dirs; keep the profile next to this script (gitignored)
const profile = mkdtempSync(`${dirname(fileURLToPath(import.meta.url))}/prof-`)
// port 0: chromium picks a free port and writes it to DevToolsActivePort
const chrome = spawn('chromium-browser', [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--font-render-hinting=none',
  `--user-data-dir=${profile}`,
  '--remote-debugging-port=0',
  'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] })

// pids of every process whose command line names our profile: the spawned pid is only the snap wrapper's
function profileUsers() {
  const pids = []
  for (const p of readdirSync('/proc')) {
    if (!/^\d+$/.test(p)) continue
    try { if (readFileSync(`/proc/${p}/cmdline`, 'latin1').includes(profile)) pids.push(Number(p)) } catch {}
  }
  return pids
}

async function endpoint() {
  for (let i = 0; i < 120; i++) {
    try {
      const [port, path] = readFileSync(`${profile}/DevToolsActivePort`, 'utf8').trim().split('\n')
      if (port && path) return `ws://127.0.0.1:${port}${path}`
    } catch {}
    await sleep(250)
  }
  throw new Error('chromium devtools endpoint never came up')
}

let ws
let nextId = 1
const pending = new Map()
const events = []

function send(method, params = {}, sessionId) {
  const id = nextId++
  return new Promise((res, rej) => {
    pending.set(id, { resolve: res, reject: rej })
    ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }))
  })
}

// everything after the spawn is inside the try, so a failure anywhere still closes chromium
try {
  ws = new WebSocket(await endpoint())
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve: res, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(JSON.stringify(msg.error)))
      else res(msg.result)
    } else if (msg.method) {
      events.push(msg.method)
    }
  })
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true })
    ws.addEventListener('error', rej, { once: true })
  })

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })

  await send('Page.enable', {}, sessionId)
  await send('Runtime.enable', {}, sessionId)
  await send('Page.navigate', { url: `file://${input}` }, sessionId)

  for (let i = 0; i < 300; i++) {
    await sleep(100)
    if (events.includes('Page.loadEventFired')) break
  }
  await sleep(1200)
  await send('Runtime.evaluate', {
    expression: 'document.fonts ? document.fonts.ready.then(() => 1) : 1',
    awaitPromise: true,
  }, sessionId)

  const { data } = await send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    generateDocumentOutline: true,
    generateTaggedPDF: true,
  }, sessionId)

  const pdf = Buffer.from(data, 'base64')
  writeFileSync(output, pdf)
  // the CV must stay within two pages: count page objects (not the /Pages tree node)
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length
  console.log(`wrote ${output} (${pages} page${pages === 1 ? '' : 's'})`)
  if (pages > 2) {
    console.error('error: the CV runs past two pages; shorten it')
    process.exitCode = 1
  }
} finally {
  const gone = new Promise((res) => chrome.once('exit', res))
  // the snap wrapper can exit before the browser behind it: ask the browser itself to close first
  await Promise.race([send('Browser.close').catch(() => {}), sleep(2000)])
  ws?.close()
  chrome.kill()
  await Promise.race([gone, sleep(5000)])
  // wait for the real browser and its helpers to exit (they write into the profile until then), kill stragglers
  for (let i = 0; i < 50 && profileUsers().length; i++) await sleep(100)
  for (const pid of profileUsers()) try { process.kill(pid, 'SIGKILL') } catch {}
  rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
}
process.exit(process.exitCode ?? 0)
