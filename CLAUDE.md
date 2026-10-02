# nucleus-cdn — pravila rada

**Javni** GitHub repo `Nucleus-Software-Solutions/nucleus-cdn`. Sa vlasnikom komuniciraj na bosanskom.

## ⚠️ Ovaj repo je runtime zavisnost objavljene aplikacije

**GitHub releases ovog repoa hostaju audio zipove po surama za aplikaciju quran-bs** (7 tagova, ~800 asseta,
~6,7 GB). Svaka instalacija quran-bs ih preuzima na zahtjev:

```
https://github.com/Nucleus-Software-Solutions/nucleus-cdn/releases/download/<tag>/<NNN>.zip
```

Aktivni tagovi: `audio-ar-v1`, `audio-bs-mehanovic-v2`, `audio-bs-korkut-v2`. Taj URL je zakucan u objavljenim
buildovima, pa su **imena tagova i fajlova (`001.zip` … `114.zip`) javni API**.

- **GitHub repo se NIKAD ne briše i NIKAD ne prebacuje u privatni** — asseti privatnog repoa nisu anonimno
  dostupni, pa bi preuzimanje u živoj aplikaciji vratilo 404. To se desilo 12.09.2026. (repo obrisan, vraćen isti
  dan) — zato ovaj fajl postoji.
- Ne preimenovati tagove ni assete. Novi audio set = novi tag; promjena URL-a traži novi build quran-bs.
- Ponovni upload: `../nucleus-mini/projects/quran-bs/code/tools/upload-audio-releases.sh` (izvorni audio je u
  `../nucleus-mini/projects/quran-bs/assets/audio/`, gitignorisano).
- Brisanje **lokalnog klona** je bezopasno — releases žive na GitHubu.

## Šta je još u repou
- `Arapski/` — **zamrznuta arhiva** starog web kursa arapskog. Kurs živi u
  `../nucleus-mini/projects/arabic-bs/content/` od 17.09.2026. **Ne mijenjati, ne sinhronizovati, ne
  referencirati** (vlasnikova direktiva).
- `Origin/` — stari podaci aplikacije origin; aplikacija ih više ne čita (podaci su u bundlu od 30.08.2026.).
- **GitHub Pages je isključen** (od 12.09.2026., stari URL je 404) i to je u redu — ništa ga ne koristi.

## Kontekst
- Detalji i historija: `../nucleus-mini/CLAUDE.md` → „Sibling repo + assets policy".
- Centralni hub (mapa svih repoa, prioriteti): `../nucleus-hq` → kartica `02 Projekti/nucleus-cdn.md`.
- Repo je javan — ovdje nikad ništa privatno (ključevi, lični podaci, interne bilješke).
- Commit i push samo kad vlasnik traži.
