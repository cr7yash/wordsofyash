/**
 * Downloads the Gravatar for GRAVATAR_URL and regenerates every local icon
 * derived from it: the favicons, the apple-touch icon, the PWA manifest icons,
 * and the local fallback image the site shows if gravatar.com is slow or down.
 *
 * Run it again whenever the Gravatar changes:  npm run sync-avatar
 */
import { writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const GRAVATAR =
  'https://gravatar.com/avatar/cb0fe9004a490665203c6caeccfcc8acffd94eeef18884e50cb44c55ed68bee3'
const SOURCE_SIZE = 512

/**
 * Icons render between 16px and ~80px, where the full Gravatar shot leaves the
 * face just a few pixels wide. Crop to the head first. Coordinates are in the
 * 512px source; nudge them if the Gravatar photo changes.
 */
const FACE_CROP = { left: 135, top: 75, width: 230, height: 230 }

// Square, full-bleed: iOS rounds the touch icon itself, and maskable PWA icons
// must fill the whole canvas or the launcher crops into the face.
const SQUARE = [
  ['public/apple-touch-icon.png', 180],
  ['public/web-app-manifest-192x192.png', 192],
  ['public/web-app-manifest-512x512.png', 512],
]

// Circular: reads as a person rather than a logo in a browser tab.
const ROUND = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
]

/**
 * Local stand-ins shown while gravatar.com loads, or if it fails outright.
 * Uncropped so they are pixel-identical to the remote image and the swap is
 * invisible. WebP, and two sizes, because these ship on every page load — the
 * 24px header must not pull a half-megabyte PNG.
 */
const FALLBACK = [
  ['public/static/avatar-sm.webp', 64],
  ['public/static/avatar.webp', 256],
]

function circleMask(size) {
  const r = size / 2
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
  )
}

async function png(source, size, { round = false, crop = false } = {}) {
  const img = sharp(source)
  if (crop) img.extract(FACE_CROP)
  img.resize(size, size, { fit: 'cover' })
  if (round) {
    img.composite([{ input: circleMask(size), blend: 'dest-in' }])
  }
  // Lossless, just slower to encode — these are photos, so a palette would band.
  return img.png({ compressionLevel: 9, effort: 10 }).toBuffer()
}

/** Multi-size .ico with PNG payloads (supported by every current browser). */
function buildIco(entries) {
  const dir = Buffer.alloc(6)
  dir.writeUInt16LE(0, 0) // reserved
  dir.writeUInt16LE(1, 2) // type: icon
  dir.writeUInt16LE(entries.length, 4)

  let offset = 6 + 16 * entries.length
  const table = []
  for (const { data, size } of entries) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size < 256 ? size : 0, 0) // width  (0 means 256)
    e.writeUInt8(size < 256 ? size : 0, 1) // height
    e.writeUInt8(0, 2) // palette count
    e.writeUInt8(0, 3) // reserved
    e.writeUInt16LE(1, 4) // colour planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    table.push(e)
  }
  return Buffer.concat([dir, ...table, ...entries.map((e) => e.data)])
}

const res = await fetch(`${GRAVATAR}?size=${SOURCE_SIZE}`)
if (!res.ok) {
  console.error(`Gravatar fetch failed: ${res.status} ${res.statusText}`)
  process.exit(1)
}
const source = Buffer.from(await res.arrayBuffer())
console.log(`fetched gravatar (${source.length} bytes)`)

await mkdir('public/static', { recursive: true })

for (const [path, size] of FALLBACK) {
  const buf = await sharp(source)
    .resize(size, size, { fit: 'cover' })
    .webp({ quality: 82 })
    .toBuffer()
  await writeFile(path, buf)
  console.log(`  ${path} (${size}x${size}, fallback, ${buf.length}b)`)
}

for (const [path, size] of SQUARE) {
  await writeFile(path, await png(source, size, { crop: true }))
  console.log(`  ${path} (${size}x${size})`)
}
for (const [path, size] of ROUND) {
  await writeFile(path, await png(source, size, { round: true, crop: true }))
  console.log(`  ${path} (${size}x${size}, circular)`)
}

const ico = buildIco([
  { data: await png(source, 16, { round: true, crop: true }), size: 16 },
  { data: await png(source, 32, { round: true, crop: true }), size: 32 },
  { data: await png(source, 48, { round: true, crop: true }), size: 48 },
])
await writeFile('public/favicon.ico', ico)
console.log(`  public/favicon.ico (16+32+48, ${ico.length} bytes)`)
