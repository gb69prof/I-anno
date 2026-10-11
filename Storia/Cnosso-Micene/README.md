# Micene 1250 a.C. · Il palazzo ritrovato

**Esperienza 3D didattica PWA** — progetto Storia I anno, gbprof.

## Avvio

URL previsto nella struttura del sito:
https://gbprof.it/I-anno/Storia/Cnosso-Micene/

Aprire \`index.html\` da un **server HTTP(S)** (non con \`file://\`); è richiesta una connessione al primo avvio per il motore Three.js distribuito da jsDelivr. La PWA salva poi i file principali e, una volta scaricato, il modulo grafico.

## Esperienza realizzata

- Ricostruzione **interpretativa** ispirata alla cittadella di Micene nel XIII sec. a.C., non replica metrico-georeferenziata del sito.
- Modello tridimensionale in tempo reale creato proceduralmente: mura ciclopiche, ingresso monumentale, cortile, portici, megaron con focolare e quattro colonne, magazzini, archivio interpretativo, terrazza panoramica.
- Materiali e affreschi sintetici disegnati via Canvas 2D, luci, ombre e paesaggio mediterraneo. Non richiede fotografie, immagini o modelli 3D di terzi.
- Figure umane schematiche animate, vento sonoro generato in Web Audio attivabile dall'utente, passi.
- Sei tappe con pannelli storici e chiara indicazione delle parti ipotetiche.
- Modalità «1250 a.C.» / «Rovine» con confronto visuale semplificato.
- Su PC: WASD/frecce, mouse trascinato, Shift per correre, E per leggere la tappa, M per la mappa.
- iPad/tablet: joystick a sinistra e trascinamento della visuale a destra. Selezione delle tappe dalla mappa o dal percorso.
- PWA installabile via menu del browser, UI responsive; cache offline dopo caricamento online.

## Nota di accuratezza

Questa esperienza è una **ricostruzione didattica plausibile**, non una restituzione scientifica certificata. Le strutture archeologiche possono essere rappresentate in forma semplificata e l'attribuzione funzionale delle stanze è in parte ipotetica. La modalità «Rovine» simula fondazioni e frammenti ma **non** riproduce la configurazione attuale esatta degli scavi. I personaggi sono figurine semplificate, non modelli realistici ad alta definizione.

Fonti per la discussione didattica:
- UNESCO, Archaeological Sites of Mycenae and Tiryns: https://whc.unesco.org/en/list/941
- National Archaeological Museum, Mycenaean Antiquities: https://www.namuseum.gr/en/permanent_exhibition/mykinaikes-archaiotites/
- Brown University, The Mycenaean Palaces (piante e ricostruzioni): https://webhelper.brown.edu/joukowsky/courses/mediterraneanbronzeage/files/3825875.pdf
- British School at Athens, Excavation Records: https://digital.bsa.ac.uk/

## Note tecniche

JavaScript ES Modules, Three.js 0.160.1 via CDN, WebGL, Web Audio e Service Worker. Nessun build step; hosting statico. Non viene raccolto alcun dato degli studenti. La qualità dei materiali e gli effetti sono ottimizzati per il browser e limitati dalla GPU del dispositivo. L'uso offline iniziale non è garantito finché tutte le risorse non sono state caricate con successo.

File: \`index.html\`, \`style.css\`, \`app.js\`, \`sw.js\`, \`manifest.webmanifest\`, \`icon.svg\`.
