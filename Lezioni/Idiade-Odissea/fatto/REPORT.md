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
