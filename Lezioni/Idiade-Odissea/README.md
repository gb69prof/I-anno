# Iliade e Odissea – I anno

PWA statica gbprof, pubblicata nel percorso intenzionale `Lezioni/Idiade-Odissea`.

## Materiali e struttura

11 lezioni autonome: quattro nell’Antefatto, due nel Fatto, quattro nei Ritorni e Hybris e Nemesi come chiave trasversale. Testi e vocabolari sono integralmente conservati dalle fonti Drive, con modifiche soltanto alla struttura HTML e agli spazi di separazione. Le intestazioni ripetute già presenti nelle fonti sono conservate. Le nove immagini originali sono convertite in WebP a qualità 92; l’immagine comune dei Ritorni accompagna Menelao, Agamennone e Diomede.

Le fonti lette il 22 settembre 2026 e i loro identificativi/versioni temporali sono in `data/sources/drive.json`. Cartella sorgente: https://drive.google.com/drive/folders/1BYFJsNRLfBkm-m_X95AaSYAqdKSvg8un.

## Test

126 domande, tre alternative e una risposta corretta. Dieci domande per ogni lezione breve; quattordici per Guerra di Troia, Iliade, Odissea e Hybris e Nemesi. Ogni domanda contiene recupero, ancora al paragrafo e citazione della fonte per la manutenzione. La correzione usa identificatori stabili, indipendenti dalla posizione.

Ogni avvio/riprova genera un nuovo ordine delle domande e delle opzioni di ciascuna domanda, diverso dal tentativo precedente. Le risposte corrette sono ripartite tra le tre posizioni con scarto massimo di una domanda. `localStorage` conserva solo l’ultima disposizione, senza nome, risposte o voto. Se il browser ne impedisce l’uso, la garanzia di confronto con l’ordine precedente vale finché la pagina resta aperta; il rimescolamento continua anche dopo il ricaricamento ma senza memoria del tentativo precedente.

## Offline e installazione

Il service worker ha ambito limitato alla cartella del modulo. Precaching completo delle 45 risorse necessarie, compresi tutti i test. Lo stato nel piè di pagina conferma quando il modulo è pronto offline. Un’installazione incompleta non sostituisce la cache funzionante precedente. Per aggiornare gli asset, rigenerare `sw.js`. Nessun servizio esterno, analytics, font remoto o account studente.

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
