# Dal modello Foscolo alla PWA Antologia

Modello esaminato: `gb69prof/IV-anno`, commit `e52644d28cf64f2570c6a94e69968f7420f1a448`, cartella `Letteratura/Foscolo`. Letti home, introduzione, CSS generale e lesson-focus, app.js, study-workspace.js, lesson-focus.js, galleria, manifest e service worker. Home, lezione, ripasso e appunti aperti nel browser; mappe aperte come immagini. La palette, le superfici carta, i caratteri serif e l’organizzazione degli strumenti derivano da questo riferimento; testi, immagini e componenti nuovi sono autonomi.

| Funzione del modello | Implementazione Antologia | Verifica prevista e documentata nel collaudo |
|---|---|---|
| Home illustrata e indice | Due ingressi Antologia/Cittadinanza, 15 schede con progressi | Navigazione degli indici e link locali |
| Indice e ricerca | Dialogo con sezioni e ricerca su tutti i testi | Ricerca per parola e apertura risultato |
| Aa | Scala del testo90–180%, salvata | Cambiamento, persistenza e responsive |
| Lezione in primo piano | Lettura indipendente, carta/blu/oro | Desktop e viewport tablet |
| Osserva | Immagine originale, mappa, testo equivalente | Apertura, zoom, download SVG/PNG |
| Appunti | Taccuino per lezione, scorrimento separato | Scrittura, ricarica e riapertura |
| Evidenziatore | Intervalli testuali persistenti, ripristino dopo reload | Selezione reale, creazione e persistenza |
| Aggiungi selezione / Incolla evidenziati | Citazioni nel taccuino senza duplicati identici | Interazione e rilettura appunti |
| Esportazione | Testo UTF-8 per lezione o intero corso | Click e evento di download |
| Ripassa | Essenziale, vocabolario, verifica | Tutte le sezioni aperte |
| Correzione e recupero |75 quesiti più75 nuovi recuperi, spiegazioni e ancore | Risposta sbagliata, feedback, recupero e ripetizione |
| Avanzamento / ripresa | Posizione, massimo letto e completamento esplicito | Uscita e ritorno, ponte fra aree |
| Precedente/successiva | Navigazione entro ciascun percorso | Tutti i link e15 pagine |
| Mappe ingrandibili |16 SVG, 16 PNG e equivalenti testuali | Controllo visivo e integrità |
| Installazione / offline | Manifest e cache di tutte le risorse locali | Primo caricamento e origine indisponibile |
| Aggiornamenti | Cache a impronta dei file, avviso e attivazione esplicita | Cambio versione e conservazione appunti |
| pwa-common | Nessuna dipendenza copiata: runtime proprio con percorsi relativi | Nessun riferimento esterno rotto |
| Fonti e materiali | Fonti collegate per lezione; riscritture e illustrazioni locali | Distinzione connessione richiesta/località |

La PWA non richiede account, backend, chiavi API o servizi a pagamento. Le azioni distruttive sui soli dati locali richiedono conferma nel prodotto. Non sono ereditati contatti, date o dichiarazioni di conformità del modello.
