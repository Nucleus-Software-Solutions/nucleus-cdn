// ============================================================
// Generates MP3 audio files for each vokabular word (arapski izgovor).
// Source: ../vokabular-data.js   →   Output: ../audio/vokabular/<wordId>.mp3
//
// Run:
//   cd tools
//   npm install        # samo prvi put
//   npm run gen:vokabular
//
// Uses Microsoft Edge online TTS (free, no API key, high quality).
// Voice: ar-SA-HamedNeural (male, Saudi Arabia).
// Skips files that already exist — safe to re-run after dodavanja novih riječi.
// ============================================================
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { createRequire } from 'node:module';
import { mkdir, access, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { VOKABULAR_WORDS, vokabularWordId } = require('../vokabular-data.js');

const AUDIO_ROOT = resolve(__dirname, '..', 'audio', 'vokabular');
const VOICE = 'ar-SA-HamedNeural';
const FORMAT = OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3;

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

function synthesize(tts, text, outPath) {
  return new Promise((resolveP, rejectP) => {
    try {
      const { audioStream } = tts.toStream(text);
      const chunks = [];
      audioStream.on('data', c => chunks.push(c));
      audioStream.on('end', async () => {
        try {
          await writeFile(outPath, Buffer.concat(chunks));
          resolveP();
        } catch (e) { rejectP(e); }
      });
      audioStream.on('error', rejectP);
    } catch (e) {
      rejectP(e);
    }
  });
}

async function main() {
  console.log(`▶ Generating audio for ${VOKABULAR_WORDS.length} words → ${AUDIO_ROOT}`);
  console.log(`  Voice: ${VOICE}`);

  await mkdir(AUDIO_ROOT, { recursive: true });

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, FORMAT);

  let generated = 0, skipped = 0, failed = 0;
  // Detect any hash collisions (different words → same id) so we know to bump format
  const seenIds = new Map();

  for (let i = 0; i < VOKABULAR_WORDS.length; i++) {
    const w = VOKABULAR_WORDS[i];
    const id = vokabularWordId(w);

    // Collision detection
    const prev = seenIds.get(id);
    if (prev && (prev.ar !== w.ar || prev.cat !== w.cat || prev.lvl !== w.lvl)) {
      console.warn(`  ⚠ Hash collision on ${id}: "${prev.ar}" (${prev.cat}/${prev.lvl}) vs "${w.ar}" (${w.cat}/${w.lvl})`);
    }
    seenIds.set(id, w);

    const file = resolve(AUDIO_ROOT, `${id}.mp3`);
    const label = `[${String(i + 1).padStart(3)}/${VOKABULAR_WORDS.length}] ${id} ${w.ar}`.padEnd(60);

    if (await exists(file)) {
      skipped++;
      // Only print every 50th skip to keep output readable
      if (skipped % 50 === 1) process.stdout.write(`  · ${label} skip (exists)\n`);
      continue;
    }

    try {
      await synthesize(tts, w.ar, file);
      generated++;
      process.stdout.write(`  ✓ ${label} ok\n`);
    } catch (e) {
      failed++;
      process.stdout.write(`  ✗ ${label} FAILED: ${e.message}\n`);
    }
  }

  console.log('');
  console.log(`Done: ${generated} generated, ${skipped} skipped, ${failed} failed (${VOKABULAR_WORDS.length} total)`);
  if (failed > 0) process.exitCode = 1;
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
