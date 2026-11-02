# REPORT.md — Iliade in otto tappe

Data: 2 novembre 2026

## Obiettivo
Sostituire l’atlante narrativo in dieci tappe con otto episodi fedeli all’ordine dell’Iliade, completi di lettura guidata, immagine o illustrazione simbolica, mappa concettuale e test breve.

## Operazioni
- Creato `data/iliade-otto-tappe.json` con otto episodi, citazioni da Vincenzo Monti, otto mappe e 32 domande a scelta multipla.
- Aggiornati `fatto/iliade-linea-tempo.html`, `js/iliade-timeline.js` e `css/iliade-linea-tempo.css`.
- Aggiornati i riferimenti in `fatto/iliade.html` e `fatto/index.html`.
- Aggiornata la versione della cache offline di `sw.js`.

## Fonti e decisioni
- Fonte primaria: Omero, *Iliade*, libri I, II, III, VI, XVI, XXII, XXIII, XXIV.
- Citazioni controllate sull’edizione Monti del 1825 in Wikisource.
- I giochi funebri per Patroclo sono collocati nel libro XXIII, prima della supplica di Priamo (XXIV).
- Riutilizzati i cinque dipinti pertinenti già presenti nel progetto; per i restanti episodi restano illustrazioni simboliche. Ogni episodio include comunque una nuova mappa concettuale.
- Nessuna modifica al test finale già presente nella lezione integrale, che rimane indipendente dai test delle otto tappe.

## Verifiche
- Otto episodi, otto mappe, quattro domande per episodio: 32 quesiti.
- Contenuti in pagina compilati come testo, senza immettere codice esterno; test correggibili e ripetibili.
- Controllo statico del codice JavaScript e dei riferimenti HTML; verifica da ripetere su pagina pubblica dopo il deploy.
- Compatibilità prevista con navigazione tastiera e layout iPad; nessun risultato viene trasmesso a server.
- Adeguato il collaudo della cache alle 60 risorse, inclusa la nuova banca delle otto tappe.

## Problemi e limiti
- Le illustrazioni simboliche non sono ricostruzioni archeologiche.
- Le opere esistenti illustrano il contesto dell’episodio; la scena di Patroclo mostra la lotta per il corpo, successiva alla morte.
- Il deploy automatico sul server e la cache dei dispositivi possono rendere visibili gli aggiornamenti in momenti diversi.

## Revisione approfondita — 2 novembre 2026
- Riscritti tutti gli otto episodi, circa 480–540 parole ciascuno, in sei scene narrative titolate.
- Corretta la successione fra duello Menelao-Paride (libro III), ferimento di Menelao per opera di Pandaro (IV) e duello Ettore-Aiace (VII, dopo l’addio di Ettore e Andromaca nel VI).
- Aggiunti i dettagli di Calcante e Crise, del sogno e dell’assemblea, della famiglia di Ettore, della morte di Sarpedonte e Patroclo, della fuga di Ettore, dei giochi funebri e dell’incontro con Priamo.
- Ampliati i collegamenti a Wikisource per gli episodi che attraversano più libri; le citazioni di Vincenzo Monti restano distinte dalla parafrasi didattica.
- Aumentate a quattro le domande per tappa, mantenendo la spiegazione delle risposte e le quattro diramazioni delle mappe.
- Inserito un dossier narrativo a colonna di lettura, separato dal pannello visuale e dalla sintesi, per evitare lunghissimi testi accanto a un’unica immagine.
- Incrementata la versione della cache offline e aggiunte asserzioni automatiche sui nuovi contenuti al collaudo esistente.
- Fonti primarie di verifica: Omero, *Iliade*, libri I, II, III, IV, VI, VII, XVI, XVIII, XIX, XXI, XXII, XXIII e XXIV, edizione Monti (1825) su it.wikisource.org.

## Aggiornamento delle immagini — 2 novembre 2026
- **Oggetto dell'intervento:** modifica esclusivamente visiva del percorso in otto tappe; nessun racconto, mappa o test è stato riscritto.
- Inserite otto tavole a fumetti originali nei file `assets/images/iliade-otto-fumetto/tappa-01.webp`–`tappa-08.webp`.
- La prima tavola è l'immagine precedentemente presentata e approvata; le successive sette scene sono tratte da tavole originali create nello stesso stile fumettistico e rifinite singolarmente per il sito.
- Sostituita nel renderer JavaScript la selezione dei dipinti preesistenti con le otto nuove tavole. I dipinti e le rispettive attribuzioni restano nel repository come risorse storiche, ma non sono più mostrati in questo percorso.
- Aggiornata la resa CSS per conservare l'inquadratura quadrata completa, senza tagli alle figure.
- Versione cache PWA aggiornata e immagini registrate nel precache offline, con controlli su file e formato WebP.
- Verifica richiesta: navigazione di tutte le tappe e visualizzazione offline da iPad dopo il ricambio della cache.

## Edizione libro illustrato — 2 novembre 2026
- Obiettivo: trasformare le otto tappe già scritte in un libro A4 seguendo il modello tipografico fornito (titoli blu, due colonne, tavole illustrate, callout, schemi, verifiche e numerazione).
- Fonte dei contenuti: `data/iliade-otto-tappe.json`; testi narrativi, mappe e domande non modificati.
- Prodotto: `fatto/iliade-libro-illustrato.pdf` (27 pagine: copertina, indice, otto capitoli di tre pagine, conclusione).
- Illustrazioni: le otto immagini originali in `assets/images/iliade-otto-fumetto/`, incorporate in PDF con compressione JPEG di alta qualità per un peso di circa 2,6 MB.
- Procedimento: `tools/build_iliade_book.py` genera il PDF; workflow `.github/workflows/iliade-libro.yml` esegue controlli e salva il documento in repository.
- Verifiche: 27 pagine, 48 sezioni narrative presenti integralmente, almeno un'illustrazione per capitolo, schemi, 32 domande di verifica, controllo delle posizioni in pagina.
- Controllo visivo: prodotta `fatto/iliade-libro-anteprima.png`, anteprima della prima pagina del capitolo 1.
- Accessibilità: aggiunti collegamenti al PDF nella lezione principale, nell'atlante delle otto tappe e nell'indice della sezione.
- Limite: il PDF è una pubblicazione statica con risposte da segnare, mentre la correzione automatica resta disponibile nella versione web.

## Aggiornamento della pagina indice — 2 novembre 2026
- **Obiettivo:** ridurre a due i collegamenti principali della fase «Fatto» nella home del modulo: «La guerra di Troia» e «L’Iliade».
- **Operazioni:** modificati `index.html` e `fatto/index.html` per eliminare il doppio ingresso all’Iliade e rendere centrale `fatto/iliade-linea-tempo.html`, il percorso completo delle otto tappe.
- **Presentazione:** utilizzata la prima immagine a fumetti dell’Iliade nella scheda; il collegamento al PDF illustrato rimane un materiale di studio, non una terza lezione.
- **Fonti e decisioni:** riutilizzate le lezioni pubblicate in `data/iliade-otto-tappe.json`; non modificati `fatto/guerra-troia.html`, il contenuto delle otto tappe, le mappe e le verifiche. La lezione generale `fatto/iliade.html` rimane disponibile come approfondimento ma non è più l’ingresso principale.
- **Cache:** aggiornata la versione di `sw.js` per rendere visibili le nuove pagine anche a chi usa la PWA sull’iPad.
- **Verifiche:** da controllare due sole voci in «Fatto», entrambi i collegamenti funzionanti, scheda con fumetto, PDF accessibile e sincronizzazione sul server. Il catalogo tecnico rimane invariato perché conserva il riferimento alla lezione completa e alle relative verifiche originali.
