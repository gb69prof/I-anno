# Civiltà fluviali · Laboratorio storico

Percorso integrato nella PWA originale di **Storia, I anno**.

## Percorsi
- [Lezione originale](../index.html): Testo → Antefatto → Contesto → Ricomponi, cartine, test.
- [Laboratorio](./index.html): sette esperienze interattive, conseguenze simulate, fonti, controlli storici e verifica finale.
- [Guida docente](./GUIDA-DOCENTE.md): sequenza di lezioni, competenze, criteri di valutazione e fonti.

## Componenti
- `index.html` — interfaccia semantica, ambiente simbolico SVG e dialogo taccuino.
- `style.css` — palette e tipografia in linea con la PWA madre, responsive e print.
- `content.js` — tutti i contenuti storici: sette tappe, 21 scelte, 21 voci immaginarie (le voci si trovano in app.js), domande, riferimenti museali.
- `app.js` — logica della simulazione, persistenza locale, percorso, verifica, esportazione.

## Principi
1. **Nessun determinismo ambientale**: il fiume non causa automaticamente Stato o scrittura.
2. **Distinzione netta** tra conseguenze simulate, micro-voci inventate e dati documentati.
3. **Hard skills**: sette checkpoint sulle conoscenze + dodici domande finali; le scelte del gioco non attribuiscono voti.
4. **Continuità del mondo**: decisioni su canali e surplus modificano contenuti delle tappe successive; elementi visivi e prospettive cambiano lungo il percorso.
5. **Privacy**: nessun server per appunti o punteggi; `localStorage` solo sul dispositivo.
6. **Nessuna libreria JS** o servizio esterno richiesti per il funzionamento; le fonti online possono richiedere rete.

## Test da eseguire su un browser reale
- [ ] Chrome/Edge desktop; Firefox desktop; Safari iPad.
- [ ] Navigazione con tastiera, radio button, focus e contrasto.
- [ ] Percorso completo fino a 7/7, con un errore corretto in una tappa.
- [ ] Verifica finale 12/12, feedback e «Ricomincia la verifica».
- [ ] Prova scelte alternative al canale e verifica lo scenario successivo.
- [ ] Chiudi/riapri la scheda per controllare la persistenza.
- [ ] Salva/esporta il percorso; prova «Azzera tutto».
- [ ] Prova offline dopo un primo caricamento con rete; le fonti esterne restano online.

## File cache
La PWA principale registra `../sw.js`, con cache separata `civilta-fluviali-v9`. Le risorse del laboratorio vengono precaricate quando disponibili. Il service worker non elimina le cache delle altre PWA ospitate nello stesso dominio.

## Manutenzione
Per variare le domande o i contenuti, modifica `content.js`, mantenendo il formato delle scelte e dei controlli. Se rinomini file o asset, aggiorna la cache in `../sw.js`. In caso di modifica del formato dei progressi, incrementa la chiave di persistenza in `app.js`.
