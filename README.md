# nucleus-cdn

Public file hosting for Nucleus apps via **GitHub releases**.

**Do not delete this repository and do not make it private.** The published app *quran-bs* downloads its
per-surah audio from this repo's releases at runtime
(`releases/download/<tag>/<NNN>.zip`, tags `audio-ar-v1`, `audio-bs-mehanovic-v2`, `audio-bs-korkut-v2`).
Tag and asset names are a public API — never rename them.

- `Arapski/` — frozen archive (not used).
- `Origin/` — legacy data (not used).
- GitHub Pages is off; nothing depends on it.
