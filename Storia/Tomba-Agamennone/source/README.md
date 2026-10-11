# Agamennone — Archeologia, mito e memoria

PWA culturale e scientifica dedicata al cosiddetto Tesoro di Atreo e alle trasformazioni di Agamennone nella tradizione greca.

> Il monumento è una tomba a tholos micenea. La sua attribuzione ad Agamennone o Atreo è tradizionale, non archeologicamente dimostrata.

## Funzioni

- 19 nuclei tematici collegati tra archeologia, fonti e ricezione;
- quattro livelli di evidenza sempre espressi anche in testo;
- matrice delle versioni della morte e timeline filtrabile;
- galleria con provenienza, licenza, didascalia e alt text;
- ricerca, glossario, modalità studio e citazioni copiabili;
- taccuino e preferiti salvati soltanto sul dispositivo, con esportazione Markdown;
- PWA installabile, cache progressiva e routing hash compatibile con GitHub Pages;
- interfaccia touch, tastiera e layout ottimizzato per iPad.

## Sviluppo

```bash
npm ci
npm run lint
npm run typecheck
npm run test:unit
npm run build:pages
```

La build statica viene scritta in `github-pages-dist/`. Il workflow in `.github/workflows/deploy-pages.yml` pubblica automaticamente `main` su GitHub Pages con base path `/Tomba-Agamennone/`.

## Struttura

- `src/data/`: contenuti, fonti, immagini, timeline e matrici;
- `src/App.tsx`: esperienza React condivisa;
- `src/styles.css`: design system responsivo;
- `research/`: dossier e politiche di ricerca;
- `docs/`: architettura editoriale e documentazione;
- `public/`: manifest, service worker e icona.

Testi originali: CC BY-NC-SA 4.0. Codice: MIT. Materiali di terzi: licenze indicate nelle singole schede.

