// ============================================================
// Generates MP3 audio files for each namaz phrase + full prayer.
// Source: ../namaz-data.js   →   Output: ../audio/namaz/<id>/{full,p-N}.mp3
//
// Run:
//   cd tools
//   npm install
//   npm run gen
//
// Uses Microsoft Edge online TTS (free, no API key, high quality).
// Voice: ar-SA-HamedNeural (male, Saudi Arabia).
// Skips files that already exist — safe to re-run after adding sections.
// ============================================================
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { createRequire } from 'node:module';
import { mkdir, access, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const SECTIONS = require('../namaz-data.js');

const AUDIO_ROOT = resolve(__dirname, '..', 'audio', 'namaz');
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
  console.log(`▶ Generating audio for ${SECTIONS.length} sections → ${AUDIO_ROOT}`);
  console.log(`  Voice: ${VOICE}`);

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, FORMAT);

  let total = 0, generated = 0, skipped = 0, failed = 0;

  for (const s of SECTIONS) {
    const dir = resolve(AUDIO_ROOT, s.id);
    await mkdir(dir, { recursive: true });

    const targets = [
      { text: s.full.ar, file: resolve(dir, 'full.mp3'), label: `${s.id}/full` },
      ...s.phrases.map((p, i) => ({
        text: p.ar,
        file: resolve(dir, `p-${i}.mp3`),
        label: `${s.id}/p-${i}`
      }))
    ];

    for (const t of targets) {
      total++;
      if (await exists(t.file)) {
        skipped++;
        process.stdout.write(`  · ${t.label.padEnd(36)} skip (exists)\n`);
        continue;
      }
      try {
        await synthesize(tts, t.text, t.file);
        generated++;
        process.stdout.write(`  ✓ ${t.label.padEnd(36)} ok\n`);
      } catch (e) {
        failed++;
        process.stdout.write(`  ✗ ${t.label.padEnd(36)} FAILED: ${e.message}\n`);
      }
    }
  }

  console.log('');
  console.log(`Done: ${generated} generated, ${skipped} skipped, ${failed} failed (${total} total)`);
  if (failed > 0) process.exitCode = 1;
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
