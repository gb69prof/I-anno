# Collaudo browser — Antologia greca

Data: 4 settembre 2026, UTC.

Il collaudo è stato eseguito attraverso il runtime browser supportato di control-browser, con una sola connessione iniziale. È stata riutilizzata la scheda 2 del browser disponibile. Nessun driver esterno, nessuna modifica al codice del sito, nessuna alterazione della rete o del protocollo.

La preview supervisionata era già attiva. Sono state aperte la home, la lezione 01-racconto, il collegamento a c1-comunicare e la pagina di verifica degli orientamenti tablet. I riferimenti al server interno in questo rapporto servono al collaudo e non costituiscono URL da consegnare all’utente.

## Esiti funzionali osservati

| Prova | Esito ed evidenza |
| --- | --- |
| Home | Passata. Titolo, illustrazione, navigazione Antologia/Cittadinanza/Mappe e collegamenti alle dieci lezioni presenti. «Inizia il percorso» apre la lezione 01. |
| Indice | Passata. Il pulsante apre il dialogo «Indice e ricerca», con sezioni della lezione e lezioni dei due percorsi. |
| Ricerca | Passata. La ricerca «Edipo» restituisce quattro lezioni pertinenti e relativi estratti. |
| Aa | Passata. «Ingrandisci testo» porta l’indicatore da 100% a 110%. Dopo ricaricamento, il dialogo mostra ancora 110%. |
| Ripassa | Passata. «Essenziale» mostra sintesi e saperi; «Vocabolario» mostra le definizioni; «Verifica» mostra cinque quesiti a scelta singola. |
| Correzione | Passata. È stata scelta intenzionalmente una risposta errata nel primo quesito e quattro risposte corrette: risultato 4 nessi riconosciuti su 5, spiegazioni corrette e opzioni del tentativo disabilitate dopo la correzione. |
| Recupero | Passata. Il quesito errato offre «Rileggi il passaggio della lezione», una spiegazione e una domanda ulteriore. La risposta corretta al recupero produce «Il nesso è stato chiarito». |
| Riprova solo errori | Passata. «Riprova soltanto gli errori» ripresenta soltanto il primo quesito; la risposta corretta produce 1/1. È visibile la cronologia del tentativo precedente. |
| Illustrazione | Passata. Il comando apre il dialogo dedicato. L’immagine caricata è completa, 1200×800. Zoom da 100% a 125%; «Adatta» torna a 100%. |
| Mappa | Passata. Il comando apre la mappa nel dialogo. Immagine completa, 1440×1120. Sono visibili i collegamenti per scaricare l’immagine e il PNG; il download della mappa non è stato eseguito. La visualizzazione ingrandita è stata ispezionata tramite screenshot. |
| Appunti | Passata. Inserito il testo di prova «Prova QA studente: distinguere i fatti dal giudizio di Lea.». Lo stato passa da «Salvataggio…» a «Appunti salvati su questo dispositivo». |
| Selezione reale | Passata. Tramite trascinamento del mouse è stata selezionata la frase «Un rumore nel corridoio, un manifesto per terra, due persone che si allontanano: abbiamo alcuni elementi, ma non ancora una storia.». La toolbar offre «Evidenzia» e «Aggiungi agli appunti». |
| Evidenziazione | Passata. «Evidenzia» crea un elemento mark contenente esattamente la frase selezionata e porta a 1 il contatore del taccuino. |
| Incolla evidenziati | Passata. Il comando aggiunge la frase fra virgolette e il titolo della lezione al testo già presente nel taccuino. |
| Persistenza al reload | Passata. Dopo tab.reload(), il DOM mostra ancora il mark. Aprendo Appunti compaiono il testo di prova, la citazione e il titolo; il contatore resta 1. Aa resta al 110%. |
| Ponte Antologia/Cittadinanza | Passata. Il link della lezione 01 apre c1-comunicare. Il link «Torna alla lezione da cui sei arrivato» ritorna a 01-racconto con resume=1. |
| Ripristino posizione | Passata. In una prova con clic fisico sul link visibile, scrollTop dell’articolo è 5438 prima della partenza e 5438 dopo il ritorno. La prima prova con locator aveva scostato la lettura da 5120 a 5438 per rendere cliccabile il collegamento; questa differenza era dovuta al posizionamento automatico del test. |
| Riprendi lettura sulla home | Passata. Dopo il percorso di lettura, la home mostra «Riprendi la lettura» verso la lezione 01 con resume=1. |

## Viste tablet

Le dimensioni sono quelle degli iframe predisposti dalla pagina di QA; non si tratta di un iPad fisico né di emulazione completa di un dispositivo.

| Vista | Esito |
| --- | --- |
| Verticale, 768×1024 | Dimensioni confermate dal DOM dell’iframe. Layout a pannello singolo leggibile, senza sovrapposizioni osservate; footer con Osserva, Appunti e Ripassa. Attivazione di Aa e Osserva confermata da tastiera: Aa mostra 110%; Osserva cambia body[data-panel] da read a visual, lascia #visual-panel senza hidden e #notes-panel con hidden. Il DOM mostra quindi illustrazione e mappa nel pannello Osserva, con il comando Lezione per tornare alla lettura. |
| Orizzontale, 1024×768 | Dimensioni confermate dal DOM dell’iframe. Articolo e strumenti affiancati, leggibili, senza sovrapposizioni osservate. Il clic su Appunti tramite frameLocator apre il taccuino e porta body[data-panel] a notes. |

I clic nella vista verticale non sono stati certificati: l’iframe è più alto del viewport del browser e il wrapper conserva lo scorrimento esterno. In alcuni tentativi i comandi non si attivavano, pur essendo presenti nel DOM. L’iframe è stato osservato con top=-44 e scrollY=44; dopo aver riportato il wrapper a top=0, l’attivazione via tastiera ha confermato il funzionamento della logica e della visualizzazione responsive. Questo è registrato come limite del collaudo dei clic nel wrapper, non come difetto applicativo accertato. Non sono stati usati driver alternativi o manipolazioni degli eventi.

## Esportazione: non confermata

È stata eseguita una sola sequenza di esportazione:

```js
const downloadPromise = tab.playwright.waitForEvent('download');
await tab.playwright.getByRole('button', {
  name: 'Esporta appunti', exact: true
}).click();
const notesDownload = await downloadPromise;
const notesDownloadPath = await notesDownload.path();
nodeRepl.write(notesDownloadPath);
```

Il runtime ha risposto: `Timed out after 3000ms waiting for download.` Non ha restituito un percorso di download. Non è stato riportato un errore sul locator o sul clic. La UI è rimasta stabile, con gli appunti presenti; nei log osservati comparivano soltanto errori dell’estensione del browser relativi all’invio di metadati, senza un errore applicativo visibile.

Il proprietario del progetto ha successivamente reso più robusto il download, inserendo temporaneamente il collegamento nel DOM e differendo la revoca dell’URL Blob. Questa modifica non è stata ricollaudata qui. Il salvataggio del file non viene quindi dichiarato riuscito.

## Offline: non provato nel browser

La preview usa HTTP su un host interno e non è un contesto sicuro per il service worker. La home mostra «Per installare e usare offline, apri la PWA da un sito HTTPS». Non sono stati cambiati protocollo, flag del browser, driver o rete. Non è stata eseguita la proposta prova con risposta 503 dell’origine, perché non avrebbe misurato il funzionamento offline del service worker in questa preview.

I test separati del service worker eseguiti dal proprietario del progetto non fanno parte di questo rapporto di osservazioni browser.

## Difetti e limiti residui

- Durante il retry a quesito unico è stato osservato il testo «1 nessi riconosciuti su 1». Il proprietario ha comunicato la correzione al singolare; non è stato ripetuto il flusso di verifica dopo tale modifica.
- Esportazione non confermata dal runtime; modifica successiva non ricollaudata.
- Offline non provato nel browser per il limite HTTP.
- Interazione con clic nel wrapper verticale non certificata; layout e attivazione da tastiera verificati.
- Dopo alcune navigazioni, locator.evaluate è scaduto con deadline del runtime. Le letture DOM successive sono riuscite nella stessa connessione. Non è stata effettuata una nuova connessione o un reset.

Nessun altro difetto applicativo bloccante è stato osservato nei flussi completati. I dati QA inseriti nel taccuino della preview non sono stati cancellati.

## Screenshot salvati

- Home: [Home](anteprima-home.jpg)
- Mappa ingrandita: [Mappa](anteprima-mappa.jpg)
- Tablet verticale: [Tablet verticale](anteprima-tablet-verticale.jpg)
- Tablet orizzontale: [Tablet orizzontale](anteprima-tablet-orizzontale.jpg)

Gli screenshot delle viste tablet includono lo spazio grigio esterno all’iframe della pagina di QA. Il file verticale documenta il layout di lettura; l’attivazione di Osserva è documentata dagli stati DOM riportati sopra.
