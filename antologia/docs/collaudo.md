# Collaudo finale e limiti di verifica

Percorso completo costruito nella sessione avviata il 4 settembre 2026. Sono separati i controlli eseguiti nel browser, i controlli automatici e le prove che richiedono il dispositivo reale.

## Contenuti e risorse

- 16 testi originali letti integralmente; duplicati collazionati; inventario e correzioni documentati.
- 15 lezioni complete: 10 Antologia e 5 Cittadinanza; circa 13.500 parole nei soli blocchi di spiegazione e lettura, oltre agli apparati.
- 75 quesiti, 75 recuperi diversi, ancore reali, opzioni e soluzioni coerenti; 15 laboratori con criteri osservabili.
- 15 illustrazioni distinte, 1200×800, circa 2,2 MB complessivi; integrità e impronte verificate.
- 16 mappe SVG e 16 PNG, 1440×1120: 465 righe di testo controllate rispetto alle cornici, senza fuoriuscite. Campioni aperti visivamente e mappa della prima lezione ingrandita nel browser.
- 21 pagine HTML, 456 riferimenti locali verificati senza errori, incluse ancore, ponti, fonti interne e risorse. Nessuna dipendenza mancante da pwa-common.
- Otto coppie cromatiche principali superano 4,5:1 per il testo normale; controllo puntuale, non certificazione completa di accessibilità.

Rapporti ripetibili: [controlli statici](static-checks.json), [mappe](map-checks.json), [contrasto](contrast-checks.json), [immagini](immagini.json).

## Percorso studente nel browser

Passati: home, ingresso in lezione, indice, ricerca, Aa, Essenziale, Vocabolario, Verifica, errore intenzionale, feedback, nuova domanda di recupero e ripetizione dei soli errori. Passati apertura di immagine e mappa, zoom 125% e ritorno 100%, scrittura nel taccuino, selezione reale col mouse, evidenziazione e Incolla evidenziati.

Dopo la ricarica restano appunti, citazione, evidenziazione e dimensione del testo. Il ponte 01→C1→01 ripristina esattamente la posizione misurata dopo il clic: scrollTop 5438. La home offre la ripresa della lettura.

Viste tablet: 768×1024 e 1024×768 mediante iframe con dimensioni confermate dal DOM. Impaginazione leggibile, senza sovrapposizioni osservate. Nel verticale il cambio pannello è verificato da tastiera; nell’orizzontale Appunti si apre anche tramite clic. I clic nel riquadro verticale non sono certificati a causa delle coordinate/scorrimento del wrapper di collaudo. Nessun difetto applicativo bloccante è stato accertato in quel flusso.

Il rapporto [collaudo browser](collaudo-browser.md) riporta prove, screenshot e limiti senza equiparare gli iframe a un iPad reale.

## Offline e aggiornamenti

Il service worker di produzione supera l’harness controllato sia alla radice sia in `/I-anno/antologia/`: installazione dell’intero elenco, caricamento di pagine e immagini dopo indisponibilità della rete simulata, parametri di ritorno/ripresa, pagina di ripiego, esclusione di richieste esterne e POST, nuova versione e conservazione delle cache appartenenti ad altre PWA. [Rapporto del worker](worker-checks.json).

**L’offline non è stato provato in un browser HTTPS.** La preview interna usa HTTP e il browser non espone il service worker su quell’host. Non sono stati aggirati i requisiti del contesto sicuro. L’harness verifica la logica del worker, non l’installazione e le politiche di memoria di Safari. Anche il pulsante di aggiornamento e il mantenimento degli appunti attraverso un vero aggiornamento installato devono essere provati sul sito HTTPS.

## Esportazione e correzioni durante il test

La richiesta di download degli appunti ha prodotto un timeout del runtime dopo 3 s; il file non è stato acquisito, quindi il download non è dichiarato verificato. Il codice è stato reso più robusto inserendo il link nel DOM e mantenendo l’URL Blob per 60 s; questa revisione richiede conferma in un browser reale. I file delle mappe SVG/PNG esistono e sono collegati correttamente; il gesto di download non è stato collaudato fino al salvataggio.

Corretto il testo «1 nessi» in «1 nesso», anche nella cronologia; corretta la ricerca a risultato unico. La revisione finale supera il controllo sintattico JavaScript. Ripristino e salvataggio degli appunti erano già stati verificati nel browser.

## Prova breve per il docente su Safari iPad

1. Dal sito HTTPS apri l’indice con una connessione attiva e attendi «Contenuti pronti anche offline».
2. Aggiungi alla schermata Home, apri una lezione e prova Osserva, Appunti, selezione tattile e Aa in entrambi gli orientamenti.
3. Scrivi ed esporta un appunto; controlla il file nell’app File o nei download. Scarica una mappa PNG.
4. Commetti un errore nella verifica, completa il recupero e torna al passaggio indicato. Prova un ponte verso Cittadinanza e il ritorno.
5. Chiudi e riapri l’app. Attiva la modalità aereo e apri una lezione diversa con immagine e mappa. A un successivo aggiornamento verifica il mantenimento degli appunti.

Lettore di schermo, selezione tattile e installazione sul dispositivo fisico restano da provare. Il controllo delle immagini incorporate negli originali Drive resta non svolto, come spiegato nella [nota docente](nota-docente.md). Nessun server è stato modificato e il deposito GitHub non viene presentato come pubblicazione su gbprof.it.
