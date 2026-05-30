# Arapski kurs — CLAUDE.md

## Project layout

```
Arapski/
├── index.html             # Home — lista nivoa + alata
├── A0/                    # Nivo A0 (Osnove)
│   ├── index.html
│   ├── gradivo.html
│   ├── vjezbe.html
│   └── ispiti-vjezbe/
├── A1/                    # Nivo A1 (Lekcije)
│   └── ... (ista struktura kao A0)
├── vokabular.html         # Svi vokabular unosi (A0 + A1)
├── brzi-pregled.html      # Gramatika referenca
├── namaz.html             # Riječi i fraze iz namaza (interaktivno učenje)
├── namaz-data.js          # Sadržaj namaz.html (shared s generator skriptom)
├── vokabular-data.js      # Sadržaj vokabular.html (shared) + vokabularWordId()
├── audio/                 # Pre-generisani TTS MP3 fajlovi
│   ├── namaz/
│   │   └── <section-id>/
│   │       ├── full.mp3   # Cijeli ajet / sekcija
│   │       └── p-<i>.mp3  # Pojedinačne fraze
│   └── vokabular/
│       └── <wordId>.mp3   # Po riječi, ime = FNV-1a hash (vidi vokabularWordId)
├── tools/                 # Node skripte (audio generator itd.)
│   ├── package.json
│   ├── generate-namaz-audio.mjs
│   ├── generate-vokabular-audio.mjs
│   └── node_modules/      # gitignored
└── andalus.css            # Shared theme za sve stranice
```

Sve stranice koriste isti `andalus.css` i istu navigaciju (topbar + Nivoi dropdown). Kad praviš novu stranicu, koristi `namaz.html` ili `vokabular.html` kao šablon.

## Audio pipeline (TTS pre-generated MP3s)

Stranica koja koristi audio NE poziva runtime TTS u browseru. Umjesto toga, MP3 fajlovi se pre-generišu skriptom i serviraju kao statičan sadržaj. Razlozi:

- **Radi offline** i ne ovisi o trećoj strani (Google TTS je blokiran na nekim corporate mrežama).
- **Trenutna reprodukcija** — bez network latency.
- **Predvidiv kvalitet i glas** — sve fraze koriste isti `ar-SA-HamedNeural`.
- **Mala veličina** — 24 kHz mono @ 48 kbps; ~150 fraza ≈ 2-3 MB.

### Kako audio radi u browseru

Svako play dugme ima atribut `data-audio="audio/namaz/<id>/<file>.mp3"`. Klikom se izvršava `new Audio(url).play()`. Vizuelni feedback (pulsiranje / error stanje) je kroz CSS klase `.playing` i `.error` na dugmetu. Pogledaj kako je urađeno u `namaz.html`:

- CSS: `.nmz-ph-play`, `.nmz-ph-play.playing`, `.nmz-ph-play.error`
- Click handler + `playAudio()` funkcija na dnu `<script>` bloka

**Važno:** stranica mora biti servirana preko HTTP-a (ne otvorena preko `file://`), jer Chrome/Edge blokiraju Audio() load iz lokalnih fajlova. Projekt je dio nucleus-cdn — servira se preko CDN-a, pa to nije problem u produkciji.

### Generator skripta (`tools/generate-namaz-audio.mjs`)

Koristi `msedge-tts` npm paket koji se preko WebSocket-a spaja na Microsoft Edge online TTS endpoint. Besplatno, bez API ključa, visok kvalitet.

**Karakteristike:**
- Glas: `ar-SA-HamedNeural` (muški, Saudi Arabia). Alternative: `ar-SA-ZariyahNeural` (ženski), `ar-EG-SalmaNeural` (egipatski).
- Format: 24 kHz mono MP3, 48 kbps.
- **Idempotentno:** preskače već postojeće fajlove → kad dodaš novu frazu/sekciju, samo pokreni opet i generišu se samo novi.
- Učitava sadržaj iz `../namaz-data.js` preko CommonJS `require` (data fajl ima `module.exports` na dnu).

**Pokretanje:**

```powershell
cd Arapski/tools
npm install              # samo prvi put
npm run gen:namaz        # generiše namaz MP3-eve
npm run gen:vokabular    # generiše vokabular MP3-eve
npm run gen:all          # oba odjednom
```

Trenutno generisano:
- **namaz/** — 111 fajlova, 2.4 MB
- **vokabular/** — 650 fajlova, 7.8 MB

### Kako proširiti audio na druge dijelove kursa (A0, A1, vjezbe, itd.)

Imamo dva dokazana patterna — biraj prema strukturi sadržaja:

#### Pattern A: hijerarhijski sadržaj (vidi `namaz.html`)

Kad podaci imaju **prirodnu hijerarhiju** (sekcija → fraza), kao u namazu. Path: `audio/<page>/<section-id>/<file>.mp3`.

- Section i phrase index su stabilni (zadani u podacima).
- Generator radi `<section.id>/full.mp3` + `<section.id>/p-<i>.mp3`.

#### Pattern B: ravan spisak (vidi `vokabular.html` + `vokabular-data.js`)

Kad imaš **dugu listu individualnih unosa** (riječi, fraze) bez hijerarhije. Path: `audio/<page>/<hashId>.mp3` (flat dir).

- Svaki unos dobije stabilan ID preko deterministic hash funkcije (FNV-1a od `ar+cat+lvl`).
- Funkcija je identična u browseru i Node-u (koristi `Math.imul` za 32-bit unsigned množenje).
- Reordering, dodavanje ili brisanje unosa NE utiče na već generisane fajlove — samo izmjena samog arapskog teksta mijenja hash (pa stari fajl postaje orphan).

```js
// vokabular-data.js
const VOKABULAR_WORDS = [
  { ar: '...', tr: '...', bs: '...', cat: '...', lvl: 'A0' },
  // ...
];

function vokabularWordId(w) {
  const s = w.ar + '|' + w.cat + '|' + w.lvl;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h = (h ^ s.charCodeAt(i)) >>> 0;
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VOKABULAR_WORDS, vokabularWordId };
}
```

Generator skripta detektuje i prijavljuje slučajne hash kolizije (vrlo malo vjerovatno, ali ako se desi — promijeni hash u širi prostor).

#### Koraci za novu stranicu (npr. A0 vjezbe)

1. **Izdvoji podatke** u zaseban `*-data.js` fajl po jednom od pattern-a iznad.
2. **HTML stranica:** `<script src="<page>-data.js"></script>` u `<head>`, pa u glavnom JS koristi globalni naziv (npr. `A0_VJEZBE_DATA`).
3. **Generator:** kopiraj `tools/generate-vokabular-audio.mjs` (za pattern B) ili `generate-namaz-audio.mjs` (za pattern A), prilagodi paths i naziv data fajla.
4. **package.json:** dodaj script `"gen:<page>": "node generate-<page>-audio.mjs"`. Ažuriraj `gen:all` da uključuje novi.
5. **UI:** u HTML-u dodaj play dugme (`<button data-audio="...">`) + copy-paste `playVokAudio` / `playAudio` funkciju (vidi `vokabular.html` ili `namaz.html`). Razmisli da izdvojiš u shared `audio-player.js` ako pattern bude na 3+ stranica.
6. **Pokreni** `npm run gen:<page>` — generišu se samo novi MP3-evi (postojeći se preskaču).

### Naming convention za audio fajlove

Strogo se drži ovog patterna da generator ostane idempotentan:

```
audio/<page>/<group-id>/<item-id>.mp3
```

- `<page>` = `namaz`, `vokabular`, `a0-vjezbe`, itd.
- `<group-id>` = sekcija ili kategorija (npr. `tekbir`, `vjera`, `lekcija-3`)
- `<item-id>` = stabilan, kratak (`full`, `p-0`, `w-001`)

Nikad ne baziraj ime fajla na samom arapskom tekstu — promjena teksta bi razbila reference.

### Voice options & tuning

- Mijenjaj `VOICE` konstantu u generator skripti ako želiš drugi glas
- `OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3` je dobar default; za bolji kvalitet (i ~3x veće fajlove) koristi `AUDIO_48KHZ_96KBITRATE_MONO_MP3`
- Brzina/ton se podešavaju preko `ProsodyOptions` drugog argumenta `tts.toStream(text, opts)` — vidi `node_modules/msedge-tts/dist/Prosody.d.ts`

### Troubleshooting

- **"No matching version found for msedge-tts@..."** — provjeri trenutnu verziju s `npm view msedge-tts versions --json`. v2.x ima drugačiji API od v1.x (`toStream` više nije async u v2). Naša skripta koristi v2.
- **WebSocket greška / timeout** — testiraj endpoint: `curl -sS -o /dev/null -w "%{http_code}\n" "https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4"` — treba vratiti 200. Ako 403/blocked, mreža blokira MS endpoint.
- **Audio se ne pušta u browseru** — provjeri da li stranica radi preko HTTP-a, ne `file://`. Otvori DevTools → Network → klik dugme — treba vidjeti GET `audio/...mp3` sa 200 statusom.
- **CORS error** — događa se samo kad servirаš audio s drugog domena. Lokalni audio iz istog projektnog foldera ne treba CORS headers.

## Stylesheet (`andalus.css`)

Sve stranice koriste isti theme:
- Boje: `--paper` (cream), `--ink` (deep), `--emerald` (akcent), `--terracotta` (sekundarni akcent), `--gold` (highlight)
- Fontovi: Fraunces (serif headings), Inter (UI), Amiri / Noto Naskh Arabic (arapski), JetBrains Mono (meta tekst)
- Helper klase: `.serif`, `.arabic`, `.mono`

Page-specific stilovi idu u `<style>` blok u toj stranici, ne u `andalus.css` (vidi `vokabular.html` i `namaz.html` kao primjere).

## Navigacija

Topbar/nav je copy-paste blok u svakoj stranici (nema build sistema). Kad se mijenja nav struktura, treba ažurirati sve stranice. Pattern: trenutna stranica ima `class="active"` na svom linku.
