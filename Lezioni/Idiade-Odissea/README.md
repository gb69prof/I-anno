# Iliade e Odissea – I anno

PWA statica gbprof, pubblicata nel percorso intenzionale `Lezioni/Idiade-Odissea`.

## Materiali e struttura

11 lezioni autonome: quattro nell’Antefatto, due nel Fatto, quattro nei Ritorni e Hybris e Nemesi come chiave trasversale. Testi e vocabolari sono integralmente conservati dalle fonti Drive, con modifiche soltanto alla struttura HTML e agli spazi di separazione. Le intestazioni ripetute già presenti nelle fonti sono conservate. Le nove immagini originali sono convertite in WebP a qualità 92; l’immagine comune dei Ritorni accompagna Menelao, Agamennone e Diomede.

Le fonti lette il 22 settembre 2026 e i loro identificativi/versioni temporali sono in `data/sources/drive.json`. Cartella sorgente: https://drive.google.com/drive/folders/1BYFJsNRLfBkm-m_X95AaSYAqdKSvg8un.

## Linea del tempo dell’Iliade\n\nIl percorso interattivo `fatto/iliade-linea-tempo.html` precede la lettura integrale. Comprende 10 tappe in ordine narrativo, illustrazioni simboliche originali realizzate con SVG inline, citazioni verificate della traduzione di Vincenzo Monti (1825) con rimandi diretti ai libri su Wikisource, connessioni ai paragrafi della lezione e domande di riflessione. Non richiede servizi esterni per funzionare offline. I file specifici sono `css/iliade-linea-tempo.css` e `js/iliade-timeline.js`. Le 11 lezioni e i test non sono stati modificati.\n\n## Galleria pittorica dell’Iliade (8 ottobre 2026)

Dieci composizioni tratte da opere pittoriche storiche, adattate in WebP per la linea del tempo; attribuzione, condizioni di licenza e note sull'accuratezza iconografica sono documentate in `data/iliade-art-sources.json`. Le opere sono raffigurazioni artistiche del mito, **non fotografie né ricostruzioni archeologicamente fedeli**. Tre tappe (ritiro di Achille, colloquio con Patroclo, morte di Patroclo) si avvalgono di opere che richiamano il tema o l'immediata conseguenza, come indicato nelle didascalie. La fotografia del dipinto romano di Ercolano (tappa 6) è di ArchaiOptix ed è CC BY-SA 4.0; conservare il credito, collegamento alla fonte e la licenza.\n\nGli asset locali si trovano in `assets/images/iliade-timeline/tappa-01.webp` fino a `tappa-10.webp`. Sono inclusi nel precaching offline. Per ricrearli: `python tools/prepare-iliade-art.py` (richiede Pillow e connessione Internet). Il workflow `.github/workflows/iliade-art.yml` aggiorna automaticamente le immagini quando cambia il catalogo delle fonti.\n\n## Test

126 domande, tre alternative e una risposta corretta. Dieci domande per ogni lezione breve; quattordici per Guerra di Troia, Iliade, Odissea e Hybris e Nemesi. Ogni domanda contiene recupero, ancora al paragrafo e citazione della fonte per la manutenzione. La correzione usa identificatori stabili, indipendenti dalla posizione.

Ogni avvio/riprova genera un nuovo ordine delle domande e delle opzioni di ciascuna domanda, diverso dal tentativo precedente. Le risposte corrette sono ripartite tra le tre posizioni con scarto massimo di una domanda. `localStorage` conserva solo l’ultima disposizione, senza nome, risposte o voto. Se il browser ne impedisce l’uso, la garanzia di confronto con l’ordine precedente vale finché la pagina resta aperta; il rimescolamento continua anche dopo il ricaricamento ma senza memoria del tentativo precedente.

## Offline e installazione

Il service worker ha ambito limitato alla cartella del modulo. Precaching completo delle 59 risorse necessarie, compresi tutti i test. Lo stato nel piè di pagina conferma quando il modulo è pronto offline. Un’installazione incompleta non sostituisce la cache funzionante precedente. Per aggiornare gli asset, rigenerare `sw.js`. Nessun servizio esterno, analytics, font remoto o account studente.

## Manutenzione e verifiche

Python 3, Pillow per ricostruire le icone; BeautifulSoup per il controllo HTML. Node.js per il controllo dei test.

```
python tools/build.py
python tools/build-tests.py
python tools/build-sw.py
python tests/check.py
node tests/quiz.test.cjs
```

I testi sono separati dalla banca dei test. `tools/questions.txt` conserva le domande autoriali con la prima alternativa corretta e un frammento univoco di paragrafo; il generatore produce le alternative in ordine variato anche nei JSON. La plausibilità e la distinzione semantica delle alternative richiedono revisione didattica, non possono essere certificate da soli controlli strutturali.

La pubblicazione utilizza il workflow GitHub → server già presente, senza modifiche infrastrutturali.
