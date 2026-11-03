# REPORT — Autonomia verificabile

**Data:** 2 novembre 2026
**Obiettivo:** Pubblicare la lezione completa «Sparta — Una città. Molte vite.» nell'indice Storia del primo anno.
**Sorgente:** repository GitHub gb69prof/I-anno, branch main, percorsi Storia/index.html e Storia/Sparta/.

## Operazioni
- Trasferite nove illustrazioni originali WebP nel repository, mantenendo i nomi e la struttura degli asset.
- Inseriti index.html, assets/style.css, assets/app.js e intervista.md nella cartella Storia/Sparta/.
- Inserita una terza scheda nell'indice Storia/index.html, senza sostituire le due schede preesistenti.
- Aggiornato il codice tramite un solo commit per mantenere coerenti le dipendenze tra pagina, immagini, codice e indice.

## Contenuti e decisioni
- Nove nuclei storici, schemi e mappe concettuali, glossario, saperi irrinunciabili.
- Intervista narrativa integrale con finale concordato; espliciti i limiti documentari della krypteia, della sorte dei neonati, del controllo delle ferite e dell'epigramma finale.
- Test di 24 domande: 12 conoscenza e 12 comprensione; tre risposte per quesito con lunghezze bilanciate; ordine casuale; voto, giudizio, recupero delle risposte errate. Dati elaborati sul dispositivo dello studente, senza invio al server.

## Verifiche
- Controllo locale preliminare documentato: layout 1365/820/390 px; nessun overflow orizzontale; 23/24 corrette = 9,6/10; recupero 1/1 senza cancellare il voto originario.
- Controllo dopo commit: presenza dei percorsi su GitHub e del collegamento nell'indice, con tutti i relativi file.
- Il sito pubblico dipende dalla sincronizzazione GitHub → server; verificarne la propagazione separatamente perché non è possibile attestare un successo HTTP sul dominio con gli strumenti web disponibili in questa sessione.

## Fonti
Dispensa Sparta.pdf fornita dall'utente; trascrizioni e successive versioni concordate nella conversazione; riferimenti di approfondimento e cautele storiografiche riportati nella pagina.

## Pubblicazione effettiva — verifica del 2 novembre 2026
- Commit di pubblicazione: `d0127c332c77d14e0a5e2fa3a574ed933e984758` su `main`.
- GitHub Actions «Sincronizza I-anno sul server»: esecuzione [41516201210](https://github.com/gb69prof/I-anno/actions/runs/41516201210), **completata con successo**.
- Log della distribuzione: aggiornamento remoto `069af9e..d0127c3`, inclusi `Storia/index.html`, `Storia/Sparta/index.html`, codice, 9 immagini, intervista e report.
- Verifica GitHub: 9 immagini con dimensioni e hash corrispondenti agli originali, collegamento all'indice unico, lezioni già esistenti conservate.
- Limite: risposta HTTP della **nuova** pagina su `gbprof.it` non verificabile direttamente dal browser di questa sessione; il risultato del deploy sul server è comunque confermato dal job SSH.


## Aggiornamento del 3 novembre 2026 — immagini per «Incontro con un vecchio spartiate»
- Obiettivo: illustrare i passaggi narrativi pertinenti mantenendo l'unità stilistica della lezione.
- Partenza: revisione verificata di `Storia/Sparta/index.html` (`aaf7213814aafc1501228403d126e3869bff9671`) e del relativo CSS (`5001d205c4db33f2e724e2d07b149c83d4a41396`).
- Operazioni: aggiunte nove figure con didascalie e testi alternativi nei capitoli 1, 2, 3, 5, 6, 8, 9, 10 e 11; inseriti nove nuovi WebP in `assets/img/`; aggiunte regole responsive e di stampa.
- Contenuti preservati: undici capitoli, testo dell'intervista, schemi, bibliografia, motore della verifica, immagini preesistenti. I capitoli 4 e 7 non sono stati illustrati con immagini non pertinenti.
- Cautele: illustrazioni dichiarate ricostruzioni narrative; l'episodio della krypteia non è presentato come documento storiografico.
- Verifiche prima del commit: nove ancore univoche riscontrate nella versione GitHub in uso; nove riferimenti `intervista-capXX.webp`; pesi WebP e hash Git delle nove risorse verificati; nessuna sovrascrittura dei contenuti originari.
- Pubblicazione: commit atomico su `main` del repository `gb69prof/I-anno`, collegato al workflow «Sincronizza I-anno sul server»; l'effettivo successo del deploy deve essere verificato dalla relativa esecuzione.
