// ============================================================
// Generates MP3 audio files for every arapski <td class="ar"> cell in A0/gradivo.html.
//
// Source: ../A0/gradivo.html  (HTML je single source of truth; nema posebnog data fajla)
// Output: ../audio/a0-gradivo/<hash>.mp3
//
// Run:
//   cd tools
//   npm install              # samo prvi put
//   npm run gen:a0-gradivo
//
// Naming: ime fajla je FNV-1a hash sirovog arapskog teksta (8 heksadecimalnih znakova).
// Identičan hash i ekstrakcija u browseru — vidi <script> blok u A0/gradivo.html.
// Skip-existing: bezbjedno za ponovno pokretanje nakon dodavanja novih lekcija.
// ============================================================
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { readFile, mkdir, access, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(__dirname, '..', 'A0', 'gradivo.html');
const AUDIO_ROOT = resolve(__dirname, '..', 'audio', 'a0-gradivo');
const VOICE = 'ar-SA-HamedNeural';
const FORMAT = OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3;

// Identičan FNV-1a hash kao u A0/gradivo.html — ne mijenjati nezavisno.
function arabicHash(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h = (h ^ s.charCodeAt(i)) >>> 0;
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

// Iz `<td class="ar">...</td>` izvlači samo glavni arapski tekst.
// Cell-content može imati nested HTML (<strong>, <br><span>(pojašnjenje)</span>,
// ili inline <span class="meta">latin pojašnjenje</span>).
// Pravilo: uzmi dio prije prvog <br> ILI <span class="meta">, skini sve HTML tagove,
// normaliziraj whitespace. MORA biti identično ekstraktoru u browseru.
function extractArabicFromCell(inner) {
  let s = inner;
  let cutAt = s.length;
  const m1 = s.search(/<br\b/i);
  const m2 = s.search(/<span\s+class="meta"/i);
  if (m1 >= 0 && m1 < cutAt) cutAt = m1;
  if (m2 >= 0 && m2 < cutAt) cutAt = m2;
  s = s.slice(0, cutAt);
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/&nbsp;/g, ' ')
       .replace(/&amp;/g, '&')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"')
       .replace(/&#39;/g, "'");
  return s.replace(/\s+/g, ' ').trim();
}

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
  const html = await readFile(SOURCE, 'utf8');

  const re = /<td\s+class="ar">([\s\S]*?)<\/td>/g;
  const seen = new Map();
  let m;
  let totalCells = 0;
  while ((m = re.exec(html)) !== null) {
    totalCells++;
    const text = extractArabicFromCell(m[1]);
    if (!text) continue;
    const id = arabicHash(text);
    const prev = seen.get(id);
    if (prev) {
      if (prev.text !== text) {
        console.warn(`  ⚠ Hash collision ${id}: "${prev.text}" vs "${text}"`);
      }
      prev.count++;
    } else {
      seen.set(id, { text, count: 1 });
    }
  }

  console.log(`▶ A0/gradivo.html: ${totalCells} <td.ar> ćelija → ${seen.size} jedinstvenih arapskih tekstova`);
  console.log(`  Output: ${AUDIO_ROOT}`);
  console.log(`  Voice:  ${VOICE}`);

  await mkdir(AUDIO_ROOT, { recursive: true });

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, FORMAT);

  let generated = 0, skipped = 0, failed = 0;
  let i = 0;
  for (const [id, info] of seen) {
    i++;
    const file = resolve(AUDIO_ROOT, `${id}.mp3`);
    const label = `[${String(i).padStart(3)}/${seen.size}] ${id} ${info.text}`.padEnd(70);

    if (await exists(file)) {
      skipped++;
      if (skipped <= 3 || skipped % 50 === 0) {
        process.stdout.write(`  · ${label} skip (exists)\n`);
      }
      continue;
    }

    try {
      await synthesize(tts, info.text, file);
      generated++;
      process.stdout.write(`  ✓ ${label} ok\n`);
    } catch (e) {
      failed++;
      process.stdout.write(`  ✗ ${label} FAILED: ${e.message}\n`);
    }
  }

  console.log('');
  console.log(`Done: ${generated} generated, ${skipped} skipped, ${failed} failed (${seen.size} unique total)`);
  if (failed > 0) process.exitCode = 1;
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
