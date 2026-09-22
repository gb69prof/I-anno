# Rapporto di consegna — 22 settembre 2026

## Risultato pubblicato

- PWA: https://gbprof.it/I-anno/Lezioni/Idiade-Odissea/
- Repository: https://github.com/gb69prof/I-anno/tree/main/Lezioni/Idiade-Odissea
- Indice: https://gbprof.it/#lezioni — voce **I anno – Iliade ed Odissea**, verificata nel browser e aperta fino alla PWA.
- Struttura: Antefatto → Fatto → Ritorni; Hybris e Nemesi come chiave trasversale. Accesso libero alle 11 lezioni.

## Lezioni e domande

| Sezione | Lezione | Domande |
|---|---|---:|
| Antefatto | Il matrimonio di Peleo e Teti | 10 |
| Antefatto | La gara tra le dee | 10 |
| Antefatto | La dinastia di Agamennone – Gli Atridi | 10 |
| Antefatto | La scelta di Achille | 10 |
| Fatto | La guerra di Troia | 14 |
| Fatto | L’Iliade | 14 |
| Ritorni | Il ritorno di Menelao ed Elena | 10 |
| Ritorni | Il ritorno di Agamennone | 10 |
| Ritorni | Il ritorno di Diomede e la fondazione di Arpi | 10 |
| Ritorni | L’Odissea | 14 |
| Chiave trasversale | Hybris e Nemesi | 14 |
| **Totale** | **11 lezioni** | **126** |

## Fonti e immagini

Esplorate la cartella Drive indicata e tutte le sue quattro sottocartelle: 11 Google Docs e 9 PNG. Nessuna sottocartella ulteriore presente. Testi e vocabolari conservati integralmente, verificati carattere per carattere al netto degli spazi. Le intestazioni ripetute o incollate al testo nei documenti originali sono state separate graficamente, senza eliminare parole.

Immagini usate: matrimonio-Teti-peleo, pomo-discordia, Dinastia-agamennone, scelta-achille, guerra-troia, iliade, ritorni, odissea, hybris-nemesi. Convertite da PNG a WebP qualità 92, conservando la risoluzione 1448 × 1086. Totale finale circa 5,27 MB, rispetto a circa 26,97 MB dei PNG. L’immagine comune dei Ritorni accompagna Menelao, Agamennone e Diomede; non erano presenti tre illustrazioni separate. Nessuna lezione o immagine fornita è stata omessa.

## Verifiche completate

- **Struttura e contenuto:** tutti gli 11 testi e vocabolari confrontati con le fonti; tutte le pagine, immagini, navigazioni, risorse e ancore interne controllate. Nel browser aperte home, quattro sezioni e tutte le lezioni.
- **Test strutturali:** almeno 10 domande per lezione, esattamente 3 alternative distinte, una sola risposta corretta, recupero di almeno 25 parole e ancora verificata per tutte le 126 domande.
- **Lunghezze:** rapporto massimo tra alternativa più lunga e più breve ≤ 1,5; risposta corretta fra le più lunghe in 43 domande su 126, quindi non sistematicamente riconoscibile dalla lunghezza. Distrattori e distinzione semantica rivisti in fase di scrittura; tali qualità non sono certificabili dal solo conteggio automatico.
- **Rimescolamento:** 11.000 tentativi automatici, senza ripetizione dell’ordine delle domande o delle opzioni rispetto al tentativo precedente. Corretta in A/B/C con scarto massimo di una domanda. Verificato anche il recupero dalle collisioni casuali. Nel browser confrontati due tentativi completi: cambiati ordine delle domande e ordine delle alternative di ogni domanda.
- **Punteggi:** 33 casi automatici, tutti corretti / tutti errati / misti per ciascuno degli 11 test. Nel browser svolti tutti gli 11 test con tutte le risposte corrette, ottenendo 10/10. Svolti inoltre due test da 10 domande con 5 errori e 10 errori: risultati 50% e 0%, voti 5,0 e 0,0, esattamente 5 e 10 recuperi.
- **Interazione:** verificati selezione, avanzamento, nuovo tentativo, report, apertura del recupero al paragrafo preciso; verificati Enter e barra spaziatrice per l’uso da tastiera.
- **Responsive:** verifica visiva desktop e viewport incorporati da smartphone/tablet. Larghezze interne effettive 375 e 805 px (390/820 meno la barra di scorrimento); nessun overflow orizzontale. Lettura e test controllati; selezione e avanzamento funzionanti anche nella vista stretta. Pagina tecnica di riproduzione: `tests/responsive.html`.
- **PWA:** manifest, icone, ambito e sintassi del worker controllati. Nel Chrome pubblico è comparso il pulsante “Installa l’app” e il messaggio “Modulo pronto offline”, che conferma la presenza di tutte le 45 risorse nella cache.
- **Offline:** il service worker di produzione è stato eseguito in un ambiente di test con rete resa indisponibile: tutte le 45 risorse, compresi gli 11 JSON dei test, sono state restituite dalla cache; verificati percorsi con slash/query, pagina di fallback e isolamento dagli altri progetti.
- **Pubblicazione:** 46 risorse pubbliche (45 risorse della PWA + service worker) scaricate da gbprof.it e confrontate tramite SHA-256 con i file locali: 46 corrispondenze, nessuna differenza. Workflow di deploy del modulo e della home completati con successo.
- **Errori JavaScript:** nessun errore dell’applicazione rilevato nel controllo dei log della scheda pubblica; gli avvisi dell’estensione del browser remoto sono esterni al progetto.

## File principali

Nel modulo: `index.html`, indici delle quattro sezioni, 11 pagine lezione, `css/style.css`, `js/app.js`, `js/quiz-core.js`, 11 JSON in `data/tests`, `manifest.webmanifest`, `sw.js`, `offline.html`, immagini e icone in `assets`, fonti in `data/sources`, script di costruzione e test riproducibili. Nella home: soltanto `lezioni.html` e `index.html`, rigenerato con lo script esistente.

Commit funzionale del modulo: `6b2b81a87f21ef4653d9042ae8d77517e17b6ad4`.
Commit della pagina di collaudo responsive: `8a25cedf8a53e19361fcd2e31d08abd65c6c0255`.
Commit della home: `856b8a6a39143a5afc64578b6535ce7471e1f950`.
Il rapporto e l’anteprima sono aggiunti con un successivo commit di documentazione.

## Limiti delle verifiche

Le prove interattive sono state eseguite in Chrome remoto. Non è stata effettuata una prova su iPad/Safari fisico, né un’installazione reale sulla schermata Home. La disconnessione è stata simulata nei test del service worker; nel browser pubblico sono stati verificati installabilità offerta e caching completo, senza attivare una modalità aereo del dispositivo.

Per garantire che l’ordine sia diverso anche dopo la chiusura o ricarica, il browser conserva la disposizione precedente in localStorage. Se l’utente blocca tale memoria, il rimescolamento resta attivo ma il confronto garantito con il tentativo precedente vale soltanto nella pagina ancora aperta. Nessun risultato viene trasmesso o registrato sul server.
