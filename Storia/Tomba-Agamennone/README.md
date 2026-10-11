# Agamennone — Archeologia, mito e memoria

Approfondimento di Micene collegato alla PWA `../Cnosso-Micene/`.

- Pubblicazione: https://gbprof.it/I-anno/Storia/Tomba-Agamennone/
- Progetto originale: https://tomba-agamennone.gbprof.chatgpt.site/
- Commit sorgente originale: `4fcb616d1117ab0178444d7c43b5f5702ccfda79` (versione Sites 3).

La cartella principale contiene la build statica pronta per Caddy e GitHub Pages. `source/` conserva codice, testi, test, bibliografia, documentazione e licenze del progetto originale. Il percorso relativo della build consente la pubblicazione in entrambi gli ambienti. Le immagini mantengono gli URL Wikimedia e i crediti originali.

Adattamenti della copia: collegamento di ritorno a Micene, percorsi relativi e cache PWA limitata al progetto. Contenuti e strumenti di studio sono conservati. La cache è progressiva: immagini e pagine devono essere visitate online prima di poter essere disponibili offline.

## Ricompilare la copia statica

Da questa cartella, in PowerShell:

```powershell
Set-Location source
npm ci --ignore-scripts --no-audit --no-fund
node --test tests/content-and-pwa.test.mjs
npm run build:pages
Copy-Item -Path github-pages-dist/* -Destination .. -Recurse -Force
```

I comandi cloud presenti nella documentazione originale di `source/` riguardano il sito Sites originale; per questa copia usare la build statica sopra.

Testi originali: CC BY-NC-SA 4.0. Codice: MIT. Materiali di terzi: licenze nelle singole schede e in `source/LICENSES.md` e `source/IMAGE_SOURCES.md`.
