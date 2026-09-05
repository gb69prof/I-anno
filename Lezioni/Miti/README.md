# Miti — il cielo, la terra, il racconto

PWA didattica standalone per il primo anno del tecnico grafico. Percorso e materiali di gbprof; realizzazione digitale con assistenza IA. Destinazione: `I-anno/Lezioni/Miti/`.

## Aprire e pubblicare

Servire questa cartella in HTTPS e aprire `index.html`. Nessuna build, API, account, CDN o dipendenza di rete è necessaria al funzionamento delle lezioni. Non aprire da `file://` per provare il service worker. La pubblicazione nel repository non equivale da sola all’attivazione di un hosting: il server o GitHub Pages devono già servire il percorso.

Su iPad: Safari → Condividi → Aggiungi alla schermata Home. Prima di disconnettersi attendere il messaggio di disponibilità offline a fondo pagina.

## Contenuti

1. Il testo al centro: antefatto e contesto.
2. Edipo re: dal testo all’antefatto.
3. Hybris e nemesi: la legge del limite.
4. Antigone: legge, coscienza e diritti.
5. L’Iliade: l’ira di Achille e il mondo degli eroi.
6. Gli dèi e il Fato: il limite del potere divino.

Tutti i sei testi della cartella Drive indicata sono trasposti nelle lezioni; sette mappe originali sono incluse localmente. Le copie testuali originali sono in `fonti/`. Sintesi, cinque saperi e lessico per lezione; 30 domande con tre opzioni, spiegazioni e recuperi; ripasso finale con 12 domande; sei attività grafiche con rubrica.

## Strumenti

- Copertina Canvas originale in tre fasi, ciclo di 30 secondi, massimo circa 30 fotogrammi al secondo, risoluzione adattata al dispositivo (DPR limitato a 2).
- Pausa manuale, rispetto di `prefers-reduced-motion`, sospensione fuori schermo o con scheda nascosta.
- Lettura adattabile, dimensione e carattere regolabili, stampa delle lezioni.
- Mappe ingrandibili con dialogo nativo e spiegazioni testuali equivalenti.
- Taccuino locale, conservazione dei passi selezionati, progetto scritto, esportazione TXT e backup/ripristino JSON.
- Avanzamento, ultima lezione e tentativi dei test; recupero dei soli errori senza eliminare il tentativo precedente.
- Cache completa, autonoma e separata dalle altre PWA. Gli aggiornamenti sono atomici: il nuovo service worker si attiva soltanto dopo aver acquisito tutte le risorse.
- Privacy, accessibilità, contatti, fonti, crediti e cancellazione limitata ai dati di questa PWA.

## Modificare

I testi di lettura sono HTML statico in `lezioni/`; sintesi, saperi, lessico e progetti sono anch’essi presenti in HTML. I dati di ricerca, quiz e riepilogo esportato sono in `assets/data.js`: mantenere coerenti titolo, contenuti e slug quando si interviene. Le mappe sono i file originali in `assets/mappe/`.

Quando si modifica una risorsa cambiare `VERSION` in `service-worker.js`; quando si aggiunge o elimina un file essenziale aggiornare anche `FILES`. Non aggiungere al precache dipendenze di sviluppo o report di test. Nessuna chiamata esterna va aggiunta senza aggiornare informativa e gestione del caricamento.

## Verifiche

`tests/app.test.cjs` contiene test DOM e simulazioni del service worker. Per eseguirli: installare le sole dipendenze di sviluppo con `npm install`, poi `npm test`. Non occorre installare nulla per pubblicare il sito statico.

Dettagli, esiti e limiti: `COLLAUDO.md`. Le verifiche eseguite non costituiscono una certificazione legale né un collaudo su un iPad fisico. Le informazioni dell’hosting (log, tempi di conservazione e fornitori) devono corrispondere alla configurazione effettiva del sito che ospita i materiali.
