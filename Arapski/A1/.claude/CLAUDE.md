# Arapski A1 — Upute za Claude

## Struktura projekta

```
Arapski/
├── index.html              ← root navigacija (A0 / A1 / Vokabular)
├── vokabular.html          ← OBJEDINJENI vokabular (A0 + A1, dark theme)
├── A0/                     ← završeni A0 level
└── A1/
    ├── index.html          ← A1 navigacijska stranica
    ├── gradivo.html        ← gradivo (light theme, sekcije po lekcijama)
    ├── vjezbe.html         ← vježbe (dark theme, tabovi)
    ├── (vokabular.html obrisan — koristiti root vokabular.html)
    ├── .claude/
    │   └── CLAUDE.md       ← ovaj fajl
    └── DD.MM.YYYY/         ← folderi sa slikama table sa časa
```

## Kad korisnik doda novu lekciju

Korisnik će reći nešto kao: "Dodao sam novu lekciju", "Imam novi čas", ili "Ubaci lekciju DD.MM.YYYY".

### Koraci:

1. **Pronađi novi folder** — format `DD.MM.YYYY/` u `A1/` direktoriju
2. **Otvori sve JPG slike** iz tog foldera koristeći Read tool (slike su fotografije table)
3. **Analiziraj sadržaj** — zapamti svaki arapski pojam, prijevod, gramatičko pravilo i primjer
4. **Ažuriraj `gradivo.html`** — dodaj novu `<div class="lesson">` sekciju na dno fajla, ispred `footer-nav`:
   - Prati isti HTML šablon: `lesson-header` (klikabilno, s `::after` strelicom) + `lesson-body` + podsekcije (`sub-section`)
   - Dodaj `id` na `.lesson` div (npr. `id="lekcija-2"`) i na svaku `.sub-section` koja zaslužuje anchor
   - Ažuriraj nav chipove u `<nav class="nav">` da uključe novi link
   - **SAMO gramatika** — bez rječnika/vokabular tabela (one idu u vokabular.html)
   - **Bez datuma** u naslovima sekcija ili bilo gdje drugdje
5. **Ažuriraj `vjezbe.html`** — dodaj nove riječi/pravila u postojeće tabove ili kreiraj nove tabove:
   - `bsArWords[]` — riječi za BS→AR prevod
   - `arBsWords[]` — riječi za AR→BS prevod
   - `quizCards[]` — kartice za kviz
   - Za nova gramatička pravila možda treba novi tab
6. **Ažuriraj `../vokabular.html`** (root objedinjeni vokabular) — dodaj nove objekte u `const words = [...]`:
   - Format: `{ ar: 'عَرَبِيٌّ', tr: 'transliteracija', bs: 'bosanski', cat: 'kategorija', lvl: 'A1' }`
   - **OBAVEZNO** dodaj `lvl: 'A1'` na svaku novu riječ
   - Dodaj riječi na kraj A1 sekcije u nizu (označena komentarom `// ===== A1 =====`)
   - Provjeri da ne dodaješ duplikate
   - Ako treba nova kategorija, dodaj button u `<div class="controls">` i odgovarajući label

## Kad korisnik doda PDF

Korisnik će reći "dodao sam PDF" i navesti koji (gradivo, vokabular, ispit...).

Dodaj link u `A1/index.html`, u sekciju "PDF dokumenti" (dodaj `section-label` ako već nema):

```html
<div class="section-label">PDF dokumenti</div>
<a class="card" href="gradivo.pdf" target="_blank">
  <div class="card-icon">📄</div>
  <div class="card-text">
    <h2>Gradivo (PDF)</h2>
    <p>Kompletno gradivo u PDF formatu — za preuzimanje ili printanje</p>
  </div>
</a>
```

## Kad korisnik doda ispite

Kreiraj `A1/ispiti-vjezbe/` folder po uzoru na A0. Dodaj:
- `ispiti.html` — navigacijska stranica ispita
- `ispit-N.html` — interaktivni ispit
- Linkovi u `A1/index.html`

## Stilske konvencije

| Fajl | Tema | Pozadina | Akcent |
|------|------|----------|--------|
| `gradivo.html` | Light | `#f5f7fa → #e4e8ec` | `#1e40af` (plava) |
| `vjezbe.html` | Dark | `#0a0f1a` | `#c9a84c` (zlatna) |
| `vokabular.html` | Dark | `#0a0f1a` | `#c9a84c` (zlatna) |
| `index.html` | Dark | `#0a0f1a` | `#c9a84c` (zlatna) |

**Arapski font:** `'Traditional Arabic', 'Arabic Typesetting', 'Scheherazade', serif`
**Smjer:** `direction: rtl`

**Transliteracija:** DIN 31635 prilagođen bosanskom:
- š (ش), ž, č, ā (dugo a), ī (dugo i), ū (dugo u)
- ' = hamza/ajn, kh = خ, gh = غ, th = ث, dh = ذ

## gradivo.html — struktura i dizajn

### H1 naslov
```html
<h1>🕌 Kurs arapskog jezika — A1</h1>
```
Koristiti isti gradient stil kao A0 (`linear-gradient(90deg, #2563eb, #059669)` s `-webkit-background-clip: text`).

### Nav chipovi i collapse dugme
Na vrhu stranice (odmah ispod subtitlea) stoji `<nav class="nav">` s:
- `.nav-links` — linkovi na svaku lekciju/podsekciju + Vježbe + Vokabular + Početna
- `.toggle-all-btn` — dugme "▲ Skupi sve sekcije" / "▼ Proširi sve sekcije"

Stil dugmeta — **identičan A0** (svjetloplava tema, ne tamna):
```css
.toggle-all-btn {
  background: #eff6ff; color: #1e40af;
  border: 1px solid #bfdbfe; border-radius: 5px;
  font-weight: 600;
}
.toggle-all-btn:hover { background: #dbeafe; border-color: #3b82f6; }
```

### Kolapsibilne lekcije
Svaka lekcija ima:
```html
<div class="lesson" id="lekcija-N">
  <div class="lesson-header" onclick="toggleLesson(this)">
    <h2>Lekcija N</h2>
  </div>
  <div class="lesson-body">
    <!-- sub-sections -->
  </div>
</div>
```
Strelica se pokazuje via CSS `::after` na `h2` (rotira se kad je collapsed). JS funkcije: `toggleLesson(header)` i `toggleAllSections()`.

### Tabele u gradivo.html
Koristiti **isti stil kao A0** — svjetloplava zaglavlja, ne tamna:
```css
th, td { padding: 12px; text-align: center; border: 1px solid #e2e8f0; }
th { background: #eff6ff; color: #1e40af; font-weight: 600; }
tr:hover td { background: #f8fafc; }
```

### Što ide u gradivo.html
- **Da:** gramatička pravila, tabele zamjenica, sufiksa, glagolskih oblika, primjeri rečenica
- **Ne:** liste vokabulara / rječničke tabele — one idu isključivo u `vokabular.html`
- **Ne:** datumi u naslovima lekcija ili podsekcija

## index.html stranice (A0 i A1)

### "Svi nivoi kursa" kartica
Na vrhu svake `index.html` (i A0 i A1) mora biti back kartica s linkom na root `../index.html` (ili `index.html` za root):
```html
<a class="card back" href="../index.html">← Svi nivoi kursa</a>
```
S `margin-bottom: 32px` ispod nje, da postoji razmak prije naslova stranice.

### Bez statusnih oznaka
Na root `Arapski/index.html` kartice za nivoe **ne smiju** imati statusne tagove poput "Završen ✓", "Aktivan →", "— u toku" ili slične oznake.

## Navigacija na svim stranicama

### Bez back dugmeta u zaglavlju
Podstranice (`gradivo.html`, `vjezbe.html`, `vokabular.html`) **ne koriste** back dugme u gornjem lijevom kutu ili u zaglavlju.

### Samo footer navigacija
Na dnu svake podstranice (unutar `.footer-nav`) stoje linkovi na sve ostale stranice tog levela:
- A1: Početna · Gradivo · Vježbe · Vokabular
- A0: Početna · Gradivo · Vježbe · Vokabular · Ispiti

## Kategorije vokabulara (objedinjeni vokabular u `Arapski/vokabular.html`)

Fajl se nalazi u **`Arapski/vokabular.html`** (NE u A1/ folderu).
Svaka riječ ima `lvl` polje (`'A0'` ili `'A1'`) za filtriranje po nivou.

Postojeće kategorije:
- `vjera`, `ljudi`, `vlast`, `svakodnevno` — A0
- `glagoli`, `pridjevi`, `zamjenice` — A0 + A1
- `fraze`, `pozdravi` — A0
- `predmeti`, `porodica` — A0 + A1
- `hrana`, `zivotinje`, `odjeca`, `pojmovi`, `zanimanja` — A0
- `brojevi` — A0 + A1
- `mjesta`, `pitanja`, `vrijeme` — A1

Dodaj novu kategoriju po potrebi (nova lekcija može donijeti npr. `boje`, `tijelo`...).

## Slike lekcija

Slike se nalaze u `A1/DD.MM.YYYY/` i čitaju se direktno putem Read tool-a.
Uvijek pročitaj SVE slike u folderu, uključujući "Zadaca" slike jer sadrže korisne vježbe.
