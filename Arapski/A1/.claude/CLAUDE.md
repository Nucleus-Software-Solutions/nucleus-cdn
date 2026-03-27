# Arapski A1 — Upute za Claude

## Struktura projekta

```
Arapski/
├── index.html              ← root navigacija (A0 / A1)
├── A0/                     ← završeni A0 level
└── A1/
    ├── index.html          ← A1 navigacijska stranica
    ├── gradivo.html        ← gradivo (light theme, sekcije po lekcijama)
    ├── vjezbe.html         ← vježbe (dark theme, tabovi)
    ├── vokabular.html      ← vokabular (dark theme, filter + pretraga)
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
   - Prati isti HTML šablon: `lesson-header` + `lesson-date` + podsekcije (`sub-section`)
   - Podsekcija za svaku tematsku cjelinu lekcije (vokabular, gramatika, primjeri)
5. **Ažuriraj `vjezbe.html`** — dodaj nove riječi/pravila u postojeće tabove ili kreiraj nove tabove:
   - `bsArWords[]` — riječi za BS→AR prevod
   - `arBsWords[]` — riječi za AR→BS prevod
   - `quizCards[]` — kartice za kviz
   - Za nova gramatička pravila možda treba novi tab
6. **Ažuriraj `vokabular.html`** — dodaj nove objekte u `const words = [...]`:
   - Format: `{ ar: 'عَرَبِيٌّ', tr: 'transliteracija', bs: 'bosanski', cat: 'kategorija' }`
   - Provjeri da ne dodaješ duplikate
   - Ako treba nova kategorija, dodaj button u `<div class="controls">` i odgovarajući label u `catLabel()`

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

## Kategorije vokabulara (A1)

- `porodica` — Porodica
- `glagoli` — Glagoli
- `pridjevi` — Pridjevi
- `mjesta` — Mjesta
- `zamjenice` — Zamjenice
- `pitanja` — Pitanja/Prijedlozi
- `vrijeme` — Vrijeme

Dodaj novu kategoriju po potrebi (nova lekcija može donijeti npr. `hrana`, `boje`, `brojevi`...).

## Slike lekcija

Slike se nalaze u `A1/DD.MM.YYYY/` i čitaju se direktno putem Read tool-a.
Uvijek pročitaj SVE slike u folderu, uključujući "Zadaca" slike jer sadrže korisne vježbe.
