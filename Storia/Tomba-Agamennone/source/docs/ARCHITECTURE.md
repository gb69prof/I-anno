# Architettura tecnica

`src/App.tsx` e i moduli `src/data/` costituiscono il nucleo condiviso. La route Sites importa lo stesso componente da `app/page.tsx`; `src/main.tsx` genera la PWA statica con Vite. Il routing hash evita errori sui deep link di GitHub Pages.

Lo stato persistente riguarda soltanto note, preferiti e modalità studio ed è salvato in `localStorage`. Non esistono database, chiavi, API a pagamento o tracciamento.

Il service worker applica una strategia cache-first per risorse già incontrate e fallback a `index.html` per le navigazioni. Le immagini remote vengono memorizzate progressivamente quando la risposta lo consente.

