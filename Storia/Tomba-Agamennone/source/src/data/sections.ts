import type { ContentClaim, Section } from "../types";

const claim = (
  id: string,
  title: string,
  text: string,
  evidenceLevel: ContentClaim["evidenceLevel"],
  sources: string[],
  confidence: ContentClaim["confidence"] = "high",
  note?: string,
): ContentClaim => ({ id, title, text, evidenceLevel, sources, confidence, note });

export const sections: Section[] = [
  {
    slug: "tesoro-di-atreo",
    nav: "Il Tesoro di Atreo",
    title: "Il Tesoro di Atreo",
    eyebrow: "Archeologia · Il monumento",
    summary: "Una tomba a tholos monumentale, costruita per rendere visibile il potere dei vivi attraverso la memoria dei morti.",
    readTime: 9,
    verification: "verificato",
    sourceIds: ["gr-ministry-atreus", "unesco-941", "cavanagh-mee-1999", "wace-1923", "nam-mycenaean"],
    blocks: [
      {
        heading: "Prima del nome, la pietra",
        paragraphs: [
          "Il monumento si apre sul versante della collina di Panagitsa, a sud della cittadella di Micene. Un lungo corridoio scoperto, il dromos, conduce alla facciata; oltre la soglia, lo stomion introduce nella vasta camera circolare coperta da una volta a corsi aggettanti. Una seconda camera, scavata lateralmente nella roccia, completa l’impianto.",
          "La denominazione «Tesoro» nasce dall’idea antica e moderna che edifici tanto imponenti dovessero custodire ricchezze. La funzione funeraria, invece, è stabilita dal confronto con l’architettura delle tombe a tholos micenee. Il nome di Atreo o di Agamennone non deriva da un’iscrizione né da un corredo conservato.",
        ],
        claims: [
          claim("atreus-date", "Cronologia", "La scheda del Ministero greco colloca la costruzione circa al 1250 a.C.; la discussione scientifica ammette una fascia più ampia fra XIV e XIII secolo a.C.", "archaeological-data", ["gr-ministry-atreus", "cavanagh-mee-1999"], "medium", "La cronologia relativa delle ultime tholoi di Micene è stata più volte riesaminata."),
          claim("atreus-identity", "Identità del defunto", "Non possediamo un dato archeologico che permetta di attribuire la tomba ad Agamennone, Atreo o a un individuo nominabile.", "archaeological-data", ["unesco-icomos", "gr-ministry-atreus"]),
        ],
        links: [{ label: "Perché allora la chiamiamo Tomba di Agamennone?", route: "perche-agamennone" }],
      },
      {
        heading: "Misure che costruiscono autorità",
        paragraphs: [
          "La camera principale misura circa 14,5 metri di diametro e oltre 13 metri di altezza; il dromos è lungo circa 36 metri. I numeri non sono semplici record: descrivono una macchina spaziale. Avvicinandosi, il visitatore vede crescere le pareti; attraversando l’ingresso, passa dalla luce aperta alla penombra di un volume che concentra lo sguardo verso l’alto.",
          "L’architrave monolitico, la lavorazione dei blocchi, il trasporto dei materiali e il controllo geometrico della volta implicano organizzazione, manodopera e competenze. Il monumento comunica che una élite era capace di mobilitare risorse su scala eccezionale. Dire «regale» è plausibile; dire quale re vi fosse sepolto non lo è.",
        ],
        claims: [
          claim("atreus-scale", "Scala monumentale", "La monumentalità può essere interpretata come esibizione di capacità organizzativa e di memoria dinastica.", "modern-interpretation", ["cavanagh-mee-1999", "fitzsimons-2011"], "medium"),
        ],
      },
      {
        heading: "Prima e dopo Schliemann",
        paragraphs: [
          "Il Tesoro di Atreo non fu ‘scoperto’ da Schliemann. Era noto ai viaggiatori e venne esplorato e spogliato di elementi architettonici già all’inizio dell’Ottocento. Gli interventi di Schliemann e Panagiotis Stamatakis negli anni Settanta del XIX secolo appartengono a una storia più lunga; nel Novecento Alan Wace ricostruì la sequenza delle tholoi attraverso scavo, ceramica e confronto architettonico.",
          "Tre oggetti della memoria vanno tenuti distinti: il Tesoro di Atreo è una tholos del XIV–XIII secolo a.C.; il Circolo A contiene tombe a fossa del XVI secolo a.C.; la cosiddetta Maschera di Agamennone proviene dalla tomba V del Circolo A. Nessuna di queste denominazioni dimostra il legame con l’individuo epico.",
        ],
        claims: [
          claim("atreus-not-discovered", "Un monumento già noto", "Schliemann intervenne in un edificio conosciuto da tempo; la sua scoperta del 1876 riguarda invece le tombe a fossa del Circolo A.", "archaeological-data", ["wace-1923", "nam-mycenaean"]),
          claim("mask-distinction", "La maschera non viene dalla tholos", "La cosiddetta Maschera di Agamennone proviene dal Circolo A, più antico di diversi secoli rispetto al Tesoro di Atreo.", "archaeological-data", ["nam-mycenaean"]),
        ],
        links: [{ label: "Seguire la storia del nome", route: "perche-agamennone" }],
      },
    ],
  },
  {
    slug: "architettura-tholos",
    nav: "Architettura della tholos",
    title: "Costruire una cupola senza cupola",
    eyebrow: "Archeologia · Forma e tecnica",
    summary: "Dromos, stomion, thalamos e camera laterale: la tomba è un percorso costruito, non soltanto un vano.",
    readTime: 8,
    verification: "verificato",
    sourceIds: ["gr-ministry-atreus", "wace-1923", "cavanagh-mee-1999"],
    blocks: [
      {
        heading: "La falsa cupola",
        paragraphs: [
          "La copertura non è una cupola a conci radiali. Ogni corso anulare di pietre sporge leggermente rispetto a quello inferiore; restringendo progressivamente il diametro, i corsi si chiudono in alto. La superficie interna fu poi accuratamente regolarizzata. Per questo è più preciso parlare di volta a mensola o a corsi aggettanti.",
          "Il triangolo di scarico sopra l’architrave devia parte del peso laterale; la sua forma richiama, senza coincidere con essa, la soluzione della Porta dei Leoni. La facciata era molto più ricca di quanto oggi appaia: colonne e fregi in pietre colorate articolavano la soglia. Le proposte di ricostruzione non concordano in ogni dettaglio e devono restare dichiarate come tali.",
        ],
        claims: [
          claim("corbel", "Sistema statico", "I corsi aggettanti riducono progressivamente il vano fino alla chiusura sommitale; non costituiscono una cupola romana.", "archaeological-data", ["gr-ministry-atreus", "wace-1923"]),
          claim("facade", "Facciata perduta", "Frammenti architettonici attestano un apparato decorativo; la disposizione completa resta ricostruita dagli studiosi.", "modern-interpretation", ["wace-1923"], "medium"),
        ],
      },
      {
        heading: "Una soglia che cambia significato",
        paragraphs: [
          "In termini archeologici, la soglia separa dromos e camera funeraria. Nel percorso del sito diventa anche un connettore critico: dalla porta monumentale passiamo al ritorno del re, dall’ingresso nella terra all’ingresso nella casa, dalla memoria dinastica alla morte raccontata dai poeti.",
        ],
        links: [
          { label: "Seguire la soglia fino all’Odissea", route: "agamennone-odissea" },
          { label: "Entrare nella reggia di Eschilo", route: "orestea" },
        ],
      },
    ],
  },
  {
    slug: "tombe-monumentali",
    nav: "Le tombe monumentali",
    title: "Nove tholoi, molti nomi, nessun eroe identificato",
    eyebrow: "Archeologia · Paesaggio funerario",
    summary: "Le denominazioni moderne formano una genealogia seducente; la sequenza archeologica racconta invece trasformazioni di lunga durata.",
    readTime: 10,
    verification: "verificato",
    sourceIds: ["wace-1923", "unesco-icomos", "shelmerdine-2008"],
    blocks: [
      {
        heading: "Una serie, non una famiglia nominata",
        paragraphs: [
          "Micene conserva nove tombe a tholos distribuite sulle pendici e nelle necropoli esterne alla cittadella. Le etichette «Egisto», «Clitemnestra», «Leoni» o «Geni» aiutano a orientarsi, ma non sono epigrafi antiche: sono convenzioni create e stabilizzate dalla storia degli studi.",
          "Dimensioni, murature, trattamento del dromos e soluzioni dell’ingresso permettono di costruire una cronologia relativa. La crescente monumentalità non procede però come una linea semplice e non dimostra che ogni tholos appartenesse a un sovrano nel senso moderno del termine.",
        ],
        claims: [
          claim("nine-tholoi", "Corpus di Micene", "A Micene sono note nove tombe a tholos, costruite in fasi differenti del Tardo Elladico.", "archaeological-data", ["wace-1923", "unesco-icomos"]),
          claim("heroic-names", "Nomi eroici", "Le attribuzioni a personaggi della saga sono tradizionali e non sostenute da prove archeologiche individualizzanti.", "hypothesis-tradition", ["unesco-icomos"]),
        ],
      },
      {
        heading: "Confrontare senza forzare",
        paragraphs: [
          "Il Tesoro di Minia a Orcomeno presenta una scala e una camera laterale comparabili; il cosiddetto tholos IV di Pilo appartiene invece a un diverso paesaggio politico e funerario. I confronti chiariscono tecniche e gerarchie, ma non trasformano una somiglianza architettonica in identità di funzione o committenza.",
        ],
      },
    ],
  },
  {
    slug: "perche-agamennone",
    nav: "Perché “Agamennone”?",
    title: "Perché “Tomba di Agamennone”?",
    eyebrow: "Metodo · Archeologia e memoria",
    summary: "Il nome è storicamente importante proprio perché non è archeologicamente dimostrato.",
    readTime: 7,
    verification: "verificato",
    sourceIds: ["pausanias", "unesco-icomos", "wace-1923"],
    blocks: [
      {
        heading: "Un’identificazione senza prova non è un errore inutile",
        paragraphs: [
          "Pausania vide a Micene tombe associate ad Agamennone, Cassandra e ai compagni uccisi con lui, mentre collocò fuori dalle mura Clitemnestra ed Egisto. La descrizione testimonia che nel II secolo d.C. il paesaggio era letto attraverso la saga. Non fornisce però le coordinate necessarie per equiparare la tomba di Agamennone da lui menzionata al Tesoro di Atreo.",
          "Viaggiatori, antiquari e archeologi dell’Ottocento cercarono nel terreno gli eroi dei testi. Schliemann trasferì l’identificazione alle tombe a fossa del Circolo A e alla celebre maschera d’oro. La storia è scientificamente feconda se viene studiata come storia della ricezione; diventa ingannevole se il nome viene presentato come risultato dello scavo.",
        ],
        claims: [
          claim("pausanias-topography", "Pausania", "La Periegesi attesta una topografia eroica antica, ma non consente di sovrapporla senza residui alla nomenclatura archeologica moderna.", "ancient-source", ["pausanias"], "high"),
          claim("modern-name", "La denominazione", "«Tomba di Agamennone» appartiene alla storia culturale del monumento; non identifica il defunto.", "hypothesis-tradition", ["unesco-icomos"]),
        ],
      },
    ],
  },
  {
    slug: "storia-e-mito",
    nav: "Esistette Agamennone?",
    title: "Esistette un Agamennone storico?",
    eyebrow: "Storia · Limiti della prova",
    summary: "L’epica può conservare strutture e memorie trasformate; non consegna la carta d’identità di un wanax.",
    readTime: 11,
    verification: "verificato",
    sourceIds: ["shelmerdine-2008", "benet-1999", "homer-iliad"],
    blocks: [
      {
        heading: "Quello che le tavolette dicono",
        paragraphs: [
          "Le tavolette in Lineare B registrano soprattutto beni, personale, offerte, terre e obblighi amministrativi. Il termine wanax indica il vertice dell’ordine palaziale; altri titoli e funzioni mostrano società complesse, diverse da una monarchia nazionale unitaria. I documenti non nominano l’Agamennone dei poemi come signore di Micene e comandante di tutti gli Achei.",
          "Che l’Iliade conservi e trasformi parole, oggetti, luoghi e istituzioni dell’età del Bronzo è possibile e in alcuni casi dimostrabile. Ma una memoria culturale attraversa secoli di esecuzioni, oblii e riusi. Somiglianza strutturale non equivale a identificazione individuale.",
        ],
        claims: [
          claim("wanax", "Wanax", "Il titolo wa-na-ka è attestato nelle tavolette micenee come posizione apicale del sistema palaziale.", "archaeological-data", ["shelmerdine-2008", "benet-1999"]),
          claim("historic-ag", "Un individuo storico", "Nessuna fonte contemporanea oggi nota permette di identificare il personaggio epico con un sovrano miceneo specifico.", "archaeological-data", ["shelmerdine-2008"], "high"),
          claim("cultural-memory", "Memoria trasformata", "L’epica può conservare tracce di strutture dell’età del Bronzo, ma le riorganizza secondo le esigenze poetiche e sociali di epoche successive.", "modern-interpretation", ["shelmerdine-2008", "homer-iliad"], "medium"),
        ],
      },
    ],
  },
  {
    slug: "agamennone-iliade",
    nav: "Agamennone nell’Iliade",
    title: "Il re più potente non è un re assoluto",
    eyebrow: "Omero · Iliade",
    summary: "Agamennone guida la coalizione perché possiede rango e risorse; deve però convincere uomini che restano re nelle proprie comunità.",
    readTime: 12,
    verification: "verificato",
    sourceIds: ["homer-iliad"],
    blocks: [
      {
        heading: "La crisi dell’autorità",
        paragraphs: [
          "Nel primo libro, la contesa su Criseide e Briseide non è un litigio privato: mette in collisione onore, bottino, autorità e utilità collettiva. Agamennone restituisce Criseide per fermare la peste, ma compensa la perdita sottraendo il premio di Achille. Dimostra il proprio primato e, nello stesso atto, priva l’esercito del guerriero decisivo.",
          "Ridurre Agamennone a un tiranno incapace cancella il problema politico del poema. Egli convoca assemblee, ascolta consiglieri, può essere rimproverato da Nestore e Odisseo, offre compensazioni, combatte con valore nel libro XI e riconosce infine il proprio accecamento. La sua autorità è reale ma negoziata.",
        ],
        claims: [
          claim("iliad-coalition", "Coalizione achea", "Agamennone occupa la posizione più alta, ma non annulla l’autonomia e il prestigio degli altri capi.", "ancient-source", ["homer-iliad"]),
          claim("iliad-error", "Responsabilità", "Il poema rappresenta l’errore del re come crisi pubblica che redistribuisce morte e onore nell’intero campo acheo.", "modern-interpretation", ["homer-iliad"], "medium"),
        ],
        quote: {
          text: "Non io sono il colpevole, ma Zeus, la Moira e l’Erinni che cammina nel buio.",
          cite: "Iliade 19.86–87, traduzione originale dal greco",
          sourceId: "homer-iliad",
        },
      },
    ],
  },
  {
    slug: "agamennone-odissea",
    nav: "Agamennone nell’Odissea",
    title: "Il ritorno che non deve ripetersi",
    eyebrow: "Omero · Odissea",
    summary: "Agamennone muore più volte nel poema, raccontato da voci diverse: la sua fine orienta il destino degli altri.",
    readTime: 12,
    verification: "verificato",
    sourceIds: ["homer-odyssey"],
    blocks: [
      {
        heading: "Un paradigma mobile",
        paragraphs: [
          "Zeus apre l’Odissea ricordando Egisto: avvertito dagli dèi, egli seduce Clitemnestra, uccide Agamennone e viene poi ucciso da Oreste. Nestore e Menelao ricompongono altri segmenti; nell’Ade, la vittima racconta l’agguato e attribuisce a Clitemnestra un ruolo ancora più oscuro. Non è una contraddizione da cancellare: è una polifonia narrativa.",
          "La morte del comandante vittorioso funziona da minaccia per Odisseo, da modello positivo per Telemaco attraverso Oreste e da strumento di confronto fra Clitemnestra e Penelope. Nel libro XXIV Agamennone riconosce la fama imperitura della fedeltà di Penelope: la sua tragedia diventa misura della riuscita altrui.",
        ],
        claims: [
          claim("odyssey-aegisthus", "Egisto", "Nel quadro morale enunciato da Zeus, Egisto disobbedisce all’avvertimento divino e diventa responsabile esemplare della propria rovina.", "ancient-source", ["homer-odyssey"]),
          claim("odyssey-variants", "Voci diverse", "I racconti interni accentuano in modo diverso Egisto e Clitemnestra; armonizzarli in una sola deposizione impoverisce il poema.", "modern-interpretation", ["homer-odyssey"], "high"),
        ],
      },
    ],
  },
  {
    slug: "chi-uccise-agamennone",
    nav: "Chi uccise Agamennone?",
    title: "Chi uccise Agamennone? Anatomia di un mito",
    eyebrow: "Atlante · Varianti della morte",
    summary: "La domanda sembra chiedere un nome. Le fonti rispondono costruendo, ogni volta, un diverso sistema di colpa.",
    readTime: 14,
    verification: "verificato",
    sourceIds: ["homer-odyssey", "pindar-pyth11", "aeschylus-ag", "sophocles-electra", "euripides-electra", "apollodorus", "hyginus"],
    blocks: [
      {
        heading: "Non una versione originaria, ma una tradizione in movimento",
        paragraphs: [
          "Nell’Odissea Egisto domina il primo racconto morale; altrove il ruolo di Clitemnestra cresce. Nell’Agamennone di Eschilo è lei a organizzare e rivendicare materialmente il delitto, mentre Egisto entra dopo l’uccisione. Sofocle ed Euripide spostano il centro sui figli e sul costo della vendetta.",
          "Cambiano l’assassino in primo piano, il luogo, la tecnica, il peso di Cassandra, il ricordo di Ifigenia e soprattutto la domanda etica. La matrice interattiva non serve a scegliere la versione ‘vera’: rende visibili le operazioni dei poeti.",
        ],
        claims: [
          claim("death-no-single", "Pluralità", "Le fonti antiche non tramandano una versione unica e immutata della morte di Agamennone.", "ancient-source", ["homer-odyssey", "pindar-pyth11", "aeschylus-ag", "sophocles-electra", "euripides-electra", "hyginus"]),
        ],
      },
    ],
  },
  {
    slug: "orestea",
    nav: "L’Orestea",
    title: "Dalla rete al tribunale",
    eyebrow: "Tragedia · Eschilo",
    summary: "La casa degli Atridi concentra guerra, sacrificio, adulterio e vendetta; la trilogia cerca una forma politica capace di interrompere la catena.",
    readTime: 15,
    verification: "verificato",
    sourceIds: ["aeschylus-ag", "aeschylus-orestia"],
    blocks: [
      {
        heading: "Il vincitore entra sconfitto",
        paragraphs: [
          "Agamennone torna da Troia portando Cassandra come prigioniera e un’enorme scia di distruzione. Clitemnestra gli offre i tessuti purpurei: calpestarli significa accettare una rappresentazione quasi sovrumana della vittoria. Il re resiste, poi cede. L’ingresso nella reggia è già una cattura simbolica.",
          "Cassandra vede ciò che il coro non riesce a fermare: la casa è un archivio vivente di violenza. Quando Clitemnestra mostra i cadaveri, non si presenta come strumento passivo di Egisto. Costruisce un discorso di giustizia che somma Ifigenia, le infedeltà, la guerra e le colpe ereditarie; il dramma lascia però visibile il sangue che quel discorso vorrebbe legittimare.",
        ],
        claims: [
          claim("aeschylus-killer", "Clitemnestra", "Nel dramma eschileo Clitemnestra rivendica l’azione omicida; Egisto compare dopo e propone la propria genealogia della vendetta.", "ancient-source", ["aeschylus-ag"]),
          claim("aeschylus-politics", "Giustizia", "La trilogia non cancella la vendetta con una formula: la trasferisce in una procedura pubblica, contestata dalle Erinni e garantita da un nuovo patto civico-religioso.", "modern-interpretation", ["aeschylus-orestia"], "medium"),
        ],
      },
      {
        heading: "Una conclusione politica, non pacificata",
        paragraphs: [
          "Oreste obbedisce ad Apollo e uccide la madre; le Erinni lo perseguitano perché il sangue materno non può essere cancellato dall’ordine del dio. Ad Atene, il voto e l’intervento di Atena evitano che una sola parte si proclami giusta. Le Erinni non vengono distrutte: ricevono un posto e una funzione. L’istituzione nasce includendo la forza che minaccia di eccedere la città.",
        ],
      },
    ],
  },
  {
    slug: "sofocle-euripide",
    nav: "Sofocle ed Euripide",
    title: "Dopo Eschilo: la vendetta perde la sua evidenza",
    eyebrow: "Tragedia · V secolo a.C.",
    summary: "Quando Elettra diventa il centro, Agamennone sopravvive come ferita, argomento e mandato controverso.",
    readTime: 11,
    verification: "verificato",
    sourceIds: ["sophocles-electra", "euripides-electra"],
    blocks: [
      {
        heading: "Due Elettra, due dispositivi tragici",
        paragraphs: [
          "Sofocle concentra il dramma sull’esperienza di Elettra: il lutto prolungato preserva la verità del delitto ma rischia di diventare l’unica forma possibile di vita. Il riconoscimento di Oreste riattiva la vendetta come restaurazione attesa, senza eliminare tutte le zone d’ombra.",
          "Euripide sposta l’eroina fuori dalla reggia, sposata a un contadino che non la tocca. La distanza fra grande mito e ambiente quotidiano produce una verifica corrosiva. Dopo il matricidio, Oreste ed Elettra non appaiono ricomposti: comprendono troppo tardi che una vendetta giustificabile può restare un atto insostenibile.",
        ],
        claims: [
          claim("electra-memory", "Agamennone assente", "Nelle due Elettra il re morto agisce attraverso la memoria e la legittimazione della vendetta, non come personaggio presente.", "modern-interpretation", ["sophocles-electra", "euripides-electra"], "medium"),
        ],
      },
    ],
  },
  {
    slug: "pausania",
    nav: "Le tombe secondo Pausania",
    title: "Pausania: vedere il mito nel paesaggio",
    eyebrow: "Fonte antica · Topografia della memoria",
    summary: "Una guida del II secolo d.C. descrive tombe eroiche reali per i suoi contemporanei, ma non consegna una mappa archeologica moderna.",
    readTime: 9,
    verification: "verificato",
    sourceIds: ["pausanias"],
    blocks: [
      {
        heading: "Dentro e fuori le mura",
        paragraphs: [
          "Pausania distingue la tomba di Atreo e dei suoi figli, dove sarebbero custoditi i tesori, dalle tombe di Agamennone, del suo auriga Eurimedonte, di Elettra e dei compagni uccisi al banchetto. Cassandra è associata al gruppo. Clitemnestra ed Egisto, invece, sarebbero fuori dalle mura perché ritenuti indegni di riposare accanto al re.",
          "La distinzione spaziale costruisce un giudizio morale. È una fonte preziosa per comprendere la memoria locale in età romana; non basta a identificare il Tesoro di Atreo con una delle tombe nominate. Il passaggio da testo a rovina richiede dati topografici e archeologici indipendenti.",
        ],
        claims: [
          claim("paus-inside", "Topografia morale", "Pausania colloca Clitemnestra ed Egisto fuori dal circuito murario e altri membri della saga all’interno o in relazione alla città.", "ancient-source", ["pausanias"]),
          claim("paus-no-match", "Nessuna equivalenza automatica", "Le denominazioni moderne delle tholoi non possono essere ricavate direttamente dal testo di Pausania.", "modern-interpretation", ["pausanias"], "high"),
        ],
      },
    ],
  },
  {
    slug: "iconografia",
    nav: "Iconografia",
    title: "Immagini come documenti, non come arredamento",
    eyebrow: "Galleria · Provenienza e licenze",
    summary: "Ogni fotografia dice qualcosa sul monumento e qualcosa sul modo in cui è stato guardato.",
    readTime: 6,
    verification: "verificato",
    sourceIds: ["gr-ministry-atreus", "unesco-941"],
    blocks: [
      {
        heading: "Tre regole di lettura",
        paragraphs: [
          "Una fotografia attuale documenta lo stato visibile, non l’aspetto del XIII secolo a.C. Una sezione ottocentesca è una fonte per la storia del rilievo e deve essere controllata sulle misure contemporanee. Una ricostruzione museale rende esplicita un’ipotesi: non può sostituire il reperto.",
          "La galleria registra autore, data, licenza, provenienza, didascalia e testo alternativo. Le immagini prive di licenza compatibile restano nel registro delle risorse desiderate, non nel sito pubblico.",
        ],
      },
    ],
  },
  {
    slug: "cronologia",
    nav: "Cronologia",
    title: "Tre millenni di costruzioni, racconti e identificazioni",
    eyebrow: "Strumento · Timeline interattiva",
    summary: "La stessa linea del tempo ospita eventi archeologici, composizioni poetiche, visite antiquarie e pratiche di tutela — senza confonderli.",
    readTime: 5,
    verification: "verificato",
    sourceIds: ["gr-ministry-atreus", "homer-odyssey", "aeschylus-ag", "pausanias", "wace-1923", "unesco-941"],
    blocks: [{ heading: "Come usare la cronologia", paragraphs: ["Filtra per archeologia, fonte, memoria e ricezione. Le date letterarie indicano il periodo di composizione o rappresentazione, non quello degli eventi narrati. Le date archeologiche sono spesso intervalli e non anni puntuali."] }],
  },
  {
    slug: "atlante-fonti",
    nav: "Atlante delle fonti",
    title: "Atlante delle fonti antiche",
    eyebrow: "Ricerca · Testi e varianti",
    summary: "Ogni fonte risponde a domande proprie. L’atlante conserva le differenze invece di fabbricare un racconto uniforme.",
    readTime: 8,
    verification: "verificato",
    sourceIds: ["homer-iliad", "homer-odyssey", "pindar-pyth11", "aeschylus-ag", "aeschylus-orestia", "sophocles-electra", "euripides-electra", "pausanias", "apollodorus", "hyginus"],
    blocks: [
      { heading: "Regola del corpus", paragraphs: ["Il testo della fonte viene distinto dall’inferenza e dalla tradizione successiva. Un dettaglio attestato soltanto in un mitografo di età imperiale non viene proiettato automaticamente su Omero o sull’età micenea. Ogni scheda riporta passi, funzione narrativa, limiti e collegamenti alle edizioni consultabili."] },
    ],
  },
  {
    slug: "glossario",
    nav: "Glossario",
    title: "Glossario essenziale",
    eyebrow: "Strumento · Parole da non appiattire",
    summary: "Le parole tecniche diventano comprensibili senza perdere precisione.",
    readTime: 4,
    verification: "verificato",
    sourceIds: ["shelmerdine-2008", "gr-ministry-atreus"],
    blocks: [{ heading: "Dal dromos al wanax", paragraphs: ["Cerca un termine o selezionalo nelle pagine. Le definizioni distinguono uso archeologico, parola greca antica e convenzione storiografica moderna."] }],
  },
  {
    slug: "bibliografia",
    nav: "Bibliografia",
    title: "Bibliografia verificabile",
    eyebrow: "Ricerca · Fonti e studi",
    summary: "Non un elenco ornamentale: ogni voce dichiara ambito, attendibilità e limiti d’uso.",
    readTime: 5,
    verification: "verificato",
    sourceIds: ["gr-ministry-atreus", "unesco-941", "unesco-icomos", "wace-1923", "cavanagh-mee-1999", "fitzsimons-2011", "shelmerdine-2008", "benet-1999"],
    blocks: [{ heading: "Politica bibliografica", paragraphs: ["Le pagine istituzionali fissano tutela e descrizione di base; le pubblicazioni archeologiche sostengono misure, cronologie e interpretazioni; le fonti antiche documentano le tradizioni letterarie. Wikipedia può orientare una ricerca, ma non compare come autorità finale."] }],
  },
  {
    slug: "metodo",
    nav: "Metodo e certezza",
    title: "Quattro livelli per non mentire con eleganza",
    eyebrow: "Metodo · Trasparenza epistemica",
    summary: "Il colore aiuta; il testo decide. Nessuna informazione dipende dal solo codice cromatico.",
    readTime: 7,
    verification: "verificato",
    sourceIds: ["unesco-icomos", "pausanias"],
    blocks: [
      {
        heading: "Dato, fonte, interpretazione, tradizione",
        paragraphs: [
          "Dato archeologico indica ciò che deriva da resti, rilievi, materiali e confronti controllabili. Fonte antica registra ciò che un testo effettivamente afferma, senza trasformarlo in fatto storico. Interpretazione moderna espone una proposta argomentata degli studiosi. Ipotesi o tradizione raccoglie attribuzioni, denominazioni e ricostruzioni non dimostrate.",
          "Ogni affermazione importante collega le fonti che la sostengono e dichiara un grado di confidenza. Quando le posizioni divergono, la divergenza è contenuto del sito, non un difetto da nascondere.",
        ],
      },
    ],
  },
  {
    slug: "crediti",
    nav: "Crediti e licenze",
    title: "Crediti, licenze e responsabilità editoriale",
    eyebrow: "Progetto · Trasparenza",
    summary: "Testi originali, fonti collegate, immagini riutilizzate soltanto quando la licenza è compatibile.",
    readTime: 4,
    verification: "verificato",
    sourceIds: [],
    blocks: [
      { heading: "A cura di gbprof e Libera", paragraphs: ["Progetto culturale e didattico ideato da Gianfranco, gbprof. Ricerca, architettura editoriale e sviluppo realizzati con Libera. I testi del sito sono originali e citano le fonti utilizzate. Le traduzioni dichiarate come originali sono state prodotte direttamente dal greco per questo progetto.", "Il codice è predisposto per licenza MIT; testi e apparati originali per CC BY-NC-SA 4.0, salvo materiali di terzi indicati singolarmente. Le fotografie mantengono la licenza della pagina sorgente."] },
    ],
  },
];

export const sectionBySlug = Object.fromEntries(sections.map((section) => [section.slug, section]));

export const additionalNav = [
  { slug: "mappa", nav: "Mappa di Micene" },
  { slug: "tombe-comparazione", nav: "Confronto delle tholoi" },
];
