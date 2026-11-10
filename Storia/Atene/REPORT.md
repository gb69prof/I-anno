# Report di autonomia verificabile — immagini di Filone e carta della Grecia

Data: 10 novembre 2026

## Obiettivo
Aggiungere alla lezione di Atene una carta geografica iniziale e un'immagine per ciascuno degli undici capitoli dell'incontro con il vecchio ateniese.

## Operazioni e decisioni
- Analizzati i testi degli undici capitoli e prodotte undici scene fotorealistiche generate con IA, una per capitolo, dichiarate come ricostruzioni immaginarie, con didascalie e testi alternativi.
- Inserito un ritratto del personaggio e figure adattabili agli schermi, caricate progressivamente.
- Realizzata una carta che mostra Grecia, coste circostanti, Atene, Maratona, Sparta, Creta e mari. È indicato che la base geografica è moderna e non rappresenta i confini delle poleis.
- Fonte geografica Natural Earth 1:50m, pubblico dominio, https://www.naturalearthdata.com/about/terms-of-use/; dati ottenuti tramite https://github.com/AshKyd/geojson-regions.
- Tre agenti hanno realizzato le scene, uno la carta e uno l'integrazione; il coordinamento ha verificato i risultati e corretto una versione iniziale della carta che non mostrava le coste vicine.

## Verifiche
- Ispezione visiva delle undici scene e della carta; sintassi JavaScript controllata.
- Anteprima nel browser: carta presente, undici capitoli con undici immagini, apertura del capitolo e visualizzazione della prima scena.
- Pubblicazione nel ramo principale: commit cd3ead7f8d853773d3b02c0a52787a6962b6d895, aggiornamento dei riferimenti alle risorse nel commit bda91a17f68185f2b6bbbcad804bf6e0bd9e7e3f.
- Sincronizzazione verso il server riuscita: https://github.com/gb69prof/I-anno/actions/runs/42777984367.
- Verificato sul sito che la carta e tutti gli undici elementi immagine sono presenti e che il primo capitolo si apre. Le immagini caricate progressivamente non sono state aperte una a una sul sito pubblico.
- Nessun test su iPad fisico.

## Conservazione
Questo report è sul ramo report/atene-immagini-2026-11-10, nella cartella del progetto, escluso dal ramo distribuito sul sito. Il repository è pubblico, pertanto il report resta consultabile su GitHub.
