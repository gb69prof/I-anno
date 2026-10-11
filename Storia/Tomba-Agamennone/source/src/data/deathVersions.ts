export type DeathVersion = {
  id: string;
  author: string;
  work: string;
  date: string;
  killer: string;
  clytemnestra: string;
  aegisthus: string;
  place: string;
  method: string;
  cassandra: string;
  iphigenia: string;
  meaning: string;
  sourceId: string;
};

export const deathVersions: DeathVersion[] = [
  {
    id: "odyssey",
    author: "Omero",
    work: "Odissea",
    date: "VIII–VII sec. a.C.",
    killer: "Egisto, con una responsabilità di Clitemnestra variamente accentuata nei racconti interni",
    clytemnestra: "Complice; nell’Ade Agamennone la accusa anche dell’uccisione di Cassandra",
    aegisthus: "Organizza l’agguato e uccide Agamennone durante un banchetto",
    place: "La casa di Egisto, nella versione di Proteo riferita da Menelao",
    method: "Agguato dopo un banchetto, con uomini appostati",
    cassandra: "Uccisa accanto ad Agamennone secondo il racconto dell’Ade",
    iphigenia: "Non è presentata come motivo dell’omicidio",
    meaning: "Paradigma del nostos fallito e contro-modello per Odisseo, Penelope e Telemaco",
    sourceId: "homer-odyssey",
  },
  {
    id: "pindar",
    author: "Pindaro",
    work: "Pitica 11",
    date: "V sec. a.C.",
    killer: "Clitemnestra manda Agamennone e Cassandra all’Acheronte",
    clytemnestra: "È al centro dell’azione letale",
    aegisthus: "Presente nella catena della vendetta, ma non domina il passo",
    place: "Amicle, variante geografica spartana",
    method: "Arma di bronzo; il dettaglio non va fuso con rete, bagno o banchetto",
    cassandra: "Uccisa insieme ad Agamennone",
    iphigenia: "Una delle due motivazioni che il poeta prende in esame",
    meaning: "Il canto formula come problema l’alternativa fra lutto materno e adulterio",
    sourceId: "pindar-pyth11",
  },
  {
    id: "aeschylus",
    author: "Eschilo",
    work: "Agamennone",
    date: "458 a.C.",
    killer: "Clitemnestra rivendica direttamente l’uccisione; Egisto appare dopo",
    clytemnestra: "Soggetto politico e materiale del delitto; invoca Ifigenia e le colpe degli Atridi",
    aegisthus: "Compagno e beneficiario; riconduce la vendetta alla storia di Tieste",
    place: "La reggia di Argo/Micene, dentro la casa degli Atridi",
    method: "Rete o veste avvolgente e colpi; il cadavere è esposto al pubblico",
    cassandra: "Profetizza e condivide la morte",
    iphigenia: "Motivo esplicito, ma inserito in una catena di colpe più ampia",
    meaning: "La vittoria militare ritorna come violenza domestica; la giustizia privata genera altra vendetta",
    sourceId: "aeschylus-ag",
  },
  {
    id: "sophocles",
    author: "Sofocle",
    work: "Elettra",
    date: "fine V sec. a.C.",
    killer: "Clitemnestra ed Egisto sono entrambi colpevoli; la memoria sostiene la vendetta dei figli",
    clytemnestra: "Difende l’omicidio attraverso il sacrificio di Ifigenia",
    aegisthus: "Usurpatore e bersaglio finale di Oreste",
    place: "La reggia degli Atridi",
    method: "Evocato retrospettivamente, non rappresentato",
    cassandra: "Non è il fulcro della rielaborazione",
    iphigenia: "Argomento centrale della difesa di Clitemnestra e della replica di Elettra",
    meaning: "Conflitto fra memoria filiale, giustificazione materna e restaurazione della casa",
    sourceId: "sophocles-electra",
  },
  {
    id: "euripides",
    author: "Euripide",
    work: "Elettra",
    date: "ca. 420–410 a.C.",
    killer: "Clitemnestra ed Egisto; la vendetta successiva è deliberatamente resa moralmente problematica",
    clytemnestra: "Ammette una colpa e offre ragioni che non cancellano la responsabilità",
    aegisthus: "Ucciso da Oreste durante un sacrificio",
    place: "Il passato della reggia è rievocato da una periferia rurale anti-eroica",
    method: "Allusione al telo e al bagno nelle tradizioni richiamate",
    cassandra: "Ricordata nel quadro delle offese coniugali",
    iphigenia: "Causa fondamentale del risentimento di Clitemnestra",
    meaning: "Smontaggio della certezza eroica: il matricidio non ricompone il mondo",
    sourceId: "euripides-electra",
  },
  {
    id: "apollodorus",
    author: "Pseudo-Apollodoro",
    work: "Epitome",
    date: "I–II sec. d.C. circa",
    killer: "Egisto e Clitemnestra",
    clytemnestra: "Partecipa alla congiura e all’uccisione",
    aegisthus: "Seduce Clitemnestra e prepara il delitto",
    place: "Micene, al ritorno dalla guerra",
    method: "Uccisione durante il ricevimento del re; il compendio armonizza tradizioni diverse",
    cassandra: "Condotta come prigioniera e uccisa",
    iphigenia: "Fa parte dell’antefatto della saga",
    meaning: "Sistemazione genealogica e narrativa di una tradizione ormai stratificata",
    sourceId: "apollodorus",
  },
  {
    id: "hyginus",
    author: "Pseudo-Igino",
    work: "Fabulae 117",
    date: "tradizione latina tarda",
    killer: "Clitemnestra ed Egisto",
    clytemnestra: "Partecipa alla preparazione e all’esecuzione",
    aegisthus: "Congiura e condivide la responsabilità",
    place: "Durante un sacrificio",
    method: "Ascia mentre Agamennone sacrifica",
    cassandra: "Uccisa",
    iphigenia: "Causa che si intreccia con la vendetta legata a Palamede e Oeax",
    meaning: "Variante mitografica concreta e tarda, trasmessa da un testo problematico",
    sourceId: "hyginus",
  },
];
