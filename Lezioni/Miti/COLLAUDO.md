# Collaudo — 5 settembre 2026

## Esito

13 test funzionali superati, nessun errore nei casi verificati. Sintassi JavaScript valida per `app.js`, `cosmos.js`, `data.js` e `service-worker.js`.

## Funzioni provate in ambiente DOM simulato (JSDOM)

- Per ciascuna delle sei lezioni: mancata risposta segnalata senza registrare il tentativo; 4/5 risposte corrette; recupero della sola domanda errata; aggiornamento a 5/5; conservazione delle due versioni; ricaricamento dei risultati.
- Note e progetto salvati, completamento modificabile, carattere ingrandito ed esportazioni TXT/JSON avviate.
- Selezione di un passo, aggiunta al taccuino e rimozione.
- Ripasso finale: dodici domande, 12/12 e voto orientativo 10/10.
- Ricerca con corrispondenze e senza risultati.
- Accesso con localStorage indisponibile: lettura e test ancora utilizzabili, messaggio esplicativo.
- Validazione backup: rifiuto di formato estraneo, esclusione chiavi non pertinenti e risposte non valide.
- Tutti i riferimenti interni HTML e gli ID di destinazione esistono; una sola intestazione H1, lingua italiana e main per pagina; alt delle immagini presenti.

## Offline (simulazione del service worker)

- Installazione dell’intero elenco di risorse prima dell’attivazione.
- Risposta delle lezioni dalla cache, nessun fallback HTML per immagini assenti.
- Nessuna intercettazione di servizi esterni.
- Cache di altre PWA preservate.
- Messaggio di disponibilità inviato solo quando tutte le risorse risultano presenti.

## Contenuti e grafica

- I sei file testuali originali corrispondono ai contenuti acquisiti da Drive, normalizzando soltanto i terminatori di riga nella lettura del controllo.
- 36 pannelli didattici nelle sei lezioni; 30 domande con tre opzioni e una risposta corretta.
- Sette mappe PNG originali leggibili e integre.
- Rendering delle tre fasi della copertina con motore Canvas nativo; ispezione dell’immagine risultante e verifica del comando pausa.
- Contrasti principali testo/sfondo: 15,28:1 per il testo sulla carta; 8,85:1 per oro su blu; 10,63:1 per testo introduttivo; 6,73:1 per etichette sulla carta; 8,72:1 per testo delle schede; 7,28:1 per link sulla carta.

## Limiti del collaudo

Non sono stati eseguiti un browser test visivo dell’intera impaginazione, prove su iPad fisico, VoiceOver o un’installazione PWA reale. La simulazione offline non misura le politiche di eliminazione della cache del browser. Il CSS prevede reflow e breakpoint per telefoni/tablet; l’effettiva resa su Safari e l’uso tattile richiedono una prova sul dispositivo.

Non è attestata la conformità complessiva del server ospitante. La PWA include informative e controlli tecnici; eventuali log, basi giuridiche del gestore, fornitori e tempi di conservazione dipendono dall’hosting. Non sono presenti analytics, cookie pubblicitari o contenuti esterni automatici nel codice di questa cartella.
