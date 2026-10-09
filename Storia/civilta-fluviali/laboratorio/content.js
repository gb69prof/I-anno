/* Dati del laboratorio. Conseguenze SIMULATE, fatti DOCUMENTATI. */
'use strict';
const LAB_SOURCES={
 metUruk:['MET · Uruk e nascita della città','https://www.metmuseum.org/ko/essays/uruk-the-first-city'],
 metWriting:['MET · Origini della scrittura','https://www.metmuseum.org/pt/essays/the-origins-of-writing'],
 metSeal:['MET · Sigillo cilindrico di Uruk','https://www.metmuseum.org/art/collection/search/326721'],
 bmMeso:['British Museum · Mesopotamia','https://www.britishmuseum.org/collection/galleries/mesopotamia'],
 bmWriting:['British Museum · Come scrivere in cuneiforme','https://www.britishmuseum.org/blog/how-write-cuneiform'],
 bmEgypt:['British Museum · Origini dell’Egitto','https://www.britishmuseum.org/collection/galleries/early-egypt'],
 bmTimeline:['British Museum · Cronologia egizia','https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt/timeline-ancient-egypt'],
 egEarly:['Ministero egiziano · Prima età dinastica','https://egymonuments.gov.eg/historical-periods/early-dynastic-period/'],
 egPalette:['Ministero egiziano · Tavolozza di Narmer','https://egymonuments.gov.eg/collections/narmer-palette-1/']
};
const LAB_STAGES=[
{
 short:'Due territori',title:'Due mondi d’acqua',epoch:'Geografia · IV millennio a.C.',
 lead:'Prima di parlare di re, città o scrittura, osserviamo le condizioni di vita. Un fiume è una risorsa, ma non produce da solo una civiltà.',
 problem:'Dove fondare il villaggio?',scenario:'Una comunità immaginaria cerca acqua e campi coltivabili, ma teme le piene. Quale posizione preferisci?',
 choices:[
 ['Vicino al fiume, su terreni coltivabili, accettando il rischio delle piene.','Un’opportunità e un rischio','Le coltivazioni possono crescere, ma l’acqua va gestita: le piene minacciano campi e case.','Vivere vicino all’acqua non basta; serviranno organizzazione e capacità di adattamento.'],
 ['Lontano dal fiume, in terreno asciutto.','La sicurezza ha un prezzo','Le piene sono meno pericolose, ma reperire acqua per colture e persone diventa difficile.','Un territorio offre vantaggi e vincoli: nessuna scelta garantisce la sopravvivenza.'],
 ['Presso la foce, dove il fiume incontra altre vie di comunicazione.','Scambi e incertezze','Si aprono possibilità di trasporto e scambio, ma non tutti i terreni sono adatti alle stesse coltivazioni.','La presenza di un fiume non determina automaticamente un’organizzazione politica.']
 ],
 history:'Le comunità agricole del Vicino Oriente e del Nilo prosperarono in regioni fluviali differenti. Mesopotamia significa regione fra Tigri ed Eufrate; l’Egitto antico si concentrò lungo la valle e il delta del Nilo.',
 facts:['Mesopotamia: Tigri ed Eufrate, nell’Asia sud-occidentale.','Egitto: Nilo, nell’Africa nord-orientale.','L’ambiente pone problemi e opportunità: le società umane elaborano risposte differenti.'],
 limit:'L’ambiente non spiega da solo l’origine di re, Stati o scritture.',
 sources:['bmMeso','bmEgypt'],map:'cartina-civilta-fluviali.webp',mapCaption:'Localizza il Nilo e la regione tra Tigri ed Eufrate.',
 check:['Quali sono i due fiumi della Mesopotamia?',['Nilo e Giordano','Tigri ed Eufrate','Indo e Gange'],1,'Tigri ed Eufrate delimitano la regione mesopotamica.']
},
{
 short:'Governare l’acqua',title:'Il problema dei canali',epoch:'Mesopotamia meridionale · IV millennio a.C.',
 lead:'Il villaggio cresce. Un canale ostruito impedisce ad alcuni campi di ricevere acqua. Le tue decisioni cominciano a trasformare il mondo.',
 problem:'Chi si occuperà dell’acqua?',scenario:'Dopo una piena alcuni campi sono allagati, altri sono asciutti. Quale soluzione proponi alla comunità?',
 choices:[
 ['Organizzare turni comuni di manutenzione, concordati tra le famiglie.','Il lavoro coordinato','L’acqua viene distribuita meglio, ma nascono controversie su turni e decisioni.','La cooperazione risolve un problema tecnico e ne apre uno politico: chi stabilisce le regole?'],
 ['Lasciare ogni famiglia responsabile soltanto del proprio canale.','Autonomia e disuguaglianze','Alcuni canali sono riparati subito, altri restano inutilizzabili; le decisioni a monte possono danneggiare chi vive a valle.','Una risorsa condivisa solleva problemi che nessuna famiglia può affrontare del tutto da sola.'],
 ['Affidare la gestione a un capo con poteri molto ampi.','Il potere concentra decisioni','I lavori possono essere ordinati rapidamente, ma chi decide controlla anche l’accesso alle risorse.','Coordinare non equivale necessariamente a governare in modo equo.']
 ],
 history:'Nella Mesopotamia meridionale si svilupparono reti di irrigazione, comunità agricole e città. Opere e manutenzione richiedevano lavoro organizzato, ma non esiste una sola strada obbligata dall’irrigazione alla monarchia.',
 facts:['Le acque favorivano la coltivazione, ma le piene creavano rischi.','Canali e argini richiedevano progettazione, manutenzione e lavoro.','Il governo dell’acqua non dimostra che un re fosse inevitabile.'],
 limit:'Le persone, il dialogo e il singolo canale della simulazione non sono eventi storici attestati.',
 sources:['bmMeso','metUruk'],map:'cartina-mesopotamia.webp',mapCaption:'Osserva la pianura mesopotamica e il sistema dei due fiumi.',
 check:['Quale affermazione è storicamente corretta?',['I sistemi irrigui richiedevano spesso lavoro coordinato','I canali eliminavano il rischio di inondazioni','I fiumi impedirono la nascita delle città'],0,'La gestione dei canali richiedeva interventi coordinati, senza imporre una sola forma di governo.']
},
{
 short:'Dal raccolto alla città',title:'Chi vive del surplus?',epoch:'Uruk e la Mesopotamia · IV millennio a.C.',
 lead:'I campi possono produrre oltre il consumo immediato: l’eccedenza apre nuove possibilità, ma genera nuovi rapporti di potere.',
 problem:'Come utilizzare il raccolto in più?',scenario:'Una buona annata lascia cereali oltre il consumo delle famiglie. Come useresti l’eccedenza?',
 choices:[
 ['Conservare una parte in magazzini comuni.','Nasce una riserva','Si possono sostenere lavori collettivi e persone impegnate in attività non agricole. Ma chi controllerà il deposito?','Il surplus può alimentare la specializzazione e anche nuove disuguaglianze.'],
 ['Scambiare subito gran parte del raccolto con comunità vicine.','Gli scambi si allargano','Arrivano merci e materiali, ma rimangono meno riserve per affrontare un’annata difficile.','L’economia antica univa produzione agricola, artigianato e scambi.'],
 ['Distribuire tutta l’eccedenza immediatamente fra le famiglie.','Si soddisfano bisogni presenti','Le famiglie ricevono più risorse, ma diventa difficile creare riserve e sostenere stabilmente specialisti.','L’urbanizzazione richiese processi lunghi, non una singola decisione.']
 ],
 history:'Nel IV millennio a.C. Uruk diventò uno dei maggiori centri urbani della Mesopotamia meridionale. Nelle città convivevano coltivatori, artigiani, addetti al culto, responsabili amministrativi e altre figure.',
 facts:['Surplus significa produzione eccedente rispetto al consumo immediato.','Le riserve e gli scambi possono sostenere professioni specializzate.','Verso il 3200 a.C. Uruk era una delle maggiori città della regione.'],
 limit:'Non è noto un unico episodio in cui la scelta di un magazzino abbia fondato Uruk.',
 sources:['metUruk','metWriting'],map:'cartina-mesopotamia.webp',mapCaption:'Osserva dove sorsero i grandi centri urbani della Mesopotamia meridionale.',
 check:['Che cosa indica il termine «surplus»?',['Un periodo senza produzione','Una città-stato','Produzione oltre il consumo immediato'],2,'Il surplus è la produzione eccedente, che può essere conservata, distribuita o scambiata.']
},
{
 short:'Memoria e scrittura',title:'Il magazzino ha bisogno di memoria',epoch:'Uruk · fine IV millennio a.C.',
 lead:'Il villaggio è ormai parte di una società più complessa: le quantità circolano e non tutto può essere affidato alla memoria orale.',
 problem:'Come registrare beni e razioni?',scenario:'Nel magazzino arrivano 12 sacchi di orzo; ne vengono distribuiti 8. Come ricorderesti quanto resta e a chi sono state consegnate le razioni?',
 choices:[
 ['Usare segni condivisi su tavolette d’argilla.','La memoria si materializza','Rimangono 4 sacchi. Le registrazioni possono essere controllate, ma occorre formare persone capaci di usarle.','Il calcolo è inventato; le antiche tavolette amministrative sono invece documentate.'],
 ['Affidare tutti i conti alla memoria di una persona.','La memoria ha dei limiti','Con molti movimenti di merci diventa difficile verificare chi ha ricevuto che cosa.','Le città complesse svilupparono strumenti per registrare dati e distribuzioni.'],
 ['Contare usando oggetti e contrassegni materiali.','Un passo verso il controllo','I contrassegni aiutano a calcolare, ma non registrano facilmente ogni dettaglio degli scambi.','I modi di contare e rappresentare quantità hanno una storia anteriore alla scrittura matura.']
 ],
 history:'Alla fine del IV millennio a.C. Uruk offre alcune tra le più antiche tavolette con segni numerici e pittografici, spesso di carattere economico. Nel tempo da questi sistemi si sviluppò la scrittura cuneiforme.',
 facts:['Molte prime tavolette registravano beni, razioni e attività amministrative.','Forme precoci di scrittura sono attestate verso il 3200 a.C. in Mesopotamia.','Cuneiforme è un sistema di scrittura, non una singola lingua.'],
 limit:'I 12 e gli 8 sacchi non provengono da una specifica tavoletta antica; i segni antichi evolsero nel tempo.',
 sources:['metWriting','bmWriting','metSeal'],map:null,mapCaption:'',
 check:['Quale funzione ebbero molte delle prime tavolette di Uruk?',['Registrare beni, razioni e scambi','Annotare programmi televisivi','Descrivere piramidi romane'],0,'Le prime testimonianze scritte di Uruk sono in gran parte amministrative.']
},
{
 short:'La valle del Nilo',title:'La piena e il calendario',epoch:'Egitto · IV–III millennio a.C.',
 lead:'Cambi ambiente: la valle del Nilo forma una lunga fascia fertile fra terre in gran parte desertiche.',
 problem:'Come vivere con il ritmo delle piene?',scenario:'La comunità deve programmare il lavoro agricolo mentre il livello del fiume cresce e diminuisce nell’anno. Cosa proponi?',
 choices:[
 ['Osservare il ritmo delle piene e organizzare i lavori di conseguenza.','Una conoscenza utile','La comunità programma meglio semine e lavori, ma le piene non sono identiche ogni anno.','La regolarità relativa del ciclo non eliminò il rischio di annate difficili.'],
 ['Evitare collegamenti fra gli insediamenti e vivere completamente isolati.','Una risorsa trascurata','Le famiglie possono lavorare localmente, ma diventano più difficili scambi e trasporti lungo la valle.','Il Nilo era anche un’importante via di comunicazione.'],
 ['Coltivare sempre senza osservare il livello dell’acqua.','I limiti della routine','Quando le acque si comportano diversamente dal previsto, alcune coltivazioni soffrono.','Le comunità svilupparono conoscenze pratiche per adattarsi alle variazioni del fiume.']
 ],
 history:'Il Nilo depositava sedimenti fertili nelle aree inondate e collegava comunità a grandi distanze. Alto Egitto si trova a sud, a monte; Basso Egitto è a nord, presso il delta.',
 facts:['Alto Egitto = sud e monte del Nilo.','Basso Egitto = nord e delta del Nilo.','Le piene erano una risorsa per l’agricoltura e potevano anche causare difficoltà.'],
 limit:'Pratiche e tecnologie irrigue variarono molto: non tutte esistevano già nella più antica età dinastica.',
 sources:['bmEgypt','bmTimeline'],map:'cartina-egitto.webp',mapCaption:'Segui il Nilo da sud (Alto Egitto) a nord (Basso Egitto).',
 check:['Perché l’Alto Egitto si trova a sud?',['È più vicino al Mediterraneo','Si trova a monte del corso del Nilo','È più freddo'],1,'Alto e Basso si riferiscono al corso del fiume, che scorre verso nord.']
},
{
 short:'Nascita dello Stato',title:'Un regno lungo il fiume',epoch:'Egitto · circa 3100 a.C.',
 lead:'La valle ospita centri di potere diversi. I rapporti tra territori coinvolgono anche alleanze, conflitti e amministrazione.',
 problem:'Come affrontare la competizione politica?',scenario:'Immagina un consiglio locale in una fase di lotte e relazioni fra diversi centri del Nilo. Quale strada suggerisci?',
 choices:[
 ['Cercare accordi fra capi e territori.','Accordi e fragilità','Si facilitano alcuni scambi e lavori, ma rimangono dispute su chi debba comandare.','L’alleanza è plausibile; il consiglio della simulazione non è documentato.'],
 ['Usare la forza per conquistare i territori vicini.','Conquista e resistenza','Il potere si concentra, ma la violenza genera perdite e resistenze; servono poi funzionari per governare.','Le rappresentazioni della regalità antica valorizzano anche le vittorie del sovrano.'],
 ['Difendere l’autonomia dei diversi centri.','L’autonomia persiste','Le comunità conservano decisioni locali, ma conflitti e accordi continuano a trasformarsi.','L’unificazione non era un risultato imposto dal fiume.']
 ],
 history:'L’Egitto fu unificato attraverso un processo graduale, con una fase decisiva intorno al 3100 a.C. Narmer è tra i primi sovrani associati al dominio sull’Alto e sul Basso Egitto. La sua tavolozza rappresenta il potere regio.',
 facts:['La fase decisiva dell’unificazione viene collocata intorno al 3100 a.C.','Narmer è associato al consolidamento del potere sulle due regioni.','Le grandi piramidi di Giza sono molto successive, del III millennio a.C.'],
 limit:'La Tavolozza di Narmer non è la cronaca neutrale di una singola battaglia che da sola spiegherebbe l’unificazione.',
 sources:['egEarly','egPalette','bmEgypt'],map:'cartina-egitto.webp',mapCaption:'Il regno si estende lungo una valle che unisce aree distanti.',
 check:['Quale affermazione è fondata sulle fonti?',['Narmer inventò il Nilo','L’Egitto fu unificato nell’età romana','L’unificazione fu graduale, con Narmer tra i sovrani della fase decisiva'],2,'L’unificazione fu un processo storico graduale, con una fase decisiva verso il 3100 a.C.']
},
{
 short:'Due risposte storiche',title:'Stesso elemento, storie diverse',epoch:'Mesopotamia ed Egitto · confronto',
 lead:'Hai attraversato due storie. Le somiglianze ambientali non cancellano le differenze fra istituzioni e processi.',
 problem:'Come spiegheresti queste civiltà a un compagno?',scenario:'Un compagno sostiene: «Dove c’è un grande fiume nascono sempre, nello stesso modo, città e re». Come rispondi?',
 choices:[
 ['I fiumi offrono possibilità, ma le comunità sviluppano forme sociali e politiche differenti.','Una spiegazione storica','Riesci a collegare ambiente, lavoro, potere e fonti senza ridurre tutto a una causa unica.','Una spiegazione storica deve argomentare sia somiglianze sia differenze.'],
 ['Ha ragione: il fiume determina inevitabilmente lo stesso tipo di Stato.','Una conclusione troppo semplice','Non spieghi perché Mesopotamia ed Egitto abbiano conosciuto storie politiche diverse.','La geografia condiziona, ma non è un destino obbligato.'],
 ['L’ambiente non conta mai: è solo una coincidenza.','Un altro errore di interpretazione','Ignori i problemi di coltivazione, trasporto, piene, risorse e comunicazione.','La storia mette in relazione fattori ambientali e sociali.']
 ],
 history:'Mesopotamia ed Egitto ebbero fiumi, agricoltura, eccedenze, amministrazioni e scritture. Tuttavia, nella Mesopotamia meridionale si svilupparono molte città-stato e, in seguito, diversi regni e imperi; in Egitto emerse precocemente un regno esteso lungo il Nilo.',
 facts:['Mesopotamia: città-stato e successivi regni e imperi.','Egitto: unificazione intorno al 3100 a.C. e forte tradizione della regalità.','I primi documenti scritti delle due regioni testimoniano anche attività di amministrazione.'],
 limit:'«Civiltà fluviali» è una categoria utile per la didattica, non una spiegazione completa di tutte le società antiche.',
 sources:['bmMeso','bmEgypt','metWriting'],map:'cartina-civilta-fluviali.webp',mapCaption:'Metti a confronto la posizione dei due grandi ambienti fluviali.',
 check:['Qual è una differenza importante fra queste due civiltà?',['In Mesopotamia si svilupparono molte città-stato; in Egitto un regno unitario emerse presto','Solo l’Egitto aveva agricoltura','Solo la Mesopotamia conosceva la scrittura'],0,'Mesopotamia ed Egitto condividevano alcuni problemi, ma ebbero storie politiche differenti.']
}
];
const LAB_EXAM=[
['Geografia','Quali fiumi definiscono la Mesopotamia?',['Tigri ed Eufrate','Nilo e Giordano','Indo e Gange'],0,'La Mesopotamia si trova tra Tigri ed Eufrate.'],
['Geografia','Dove si trova il Basso Egitto?',['A sud presso le sorgenti del Nilo','A nord, presso il delta','In Mesopotamia'],1,'Basso Egitto indica la zona a valle verso il delta.'],
['Cronologia','Quando Uruk crebbe come grande centro urbano?',['IV millennio a.C.','XIV secolo d.C.','I secolo a.C.'],0,'Uruk era un’importante città già nel IV millennio a.C.'],
['Cronologia','A quando risale una fase decisiva dell’unificazione egizia?',['3100 a.C.','753 a.C.','476 d.C.'],0,'La fase decisiva viene datata intorno al 3100 a.C.'],
['Economia','Che cosa indica «surplus»?',['Un tipo di scrittura','Produzione oltre il consumo immediato','Un sovrano'],1,'Il surplus è la produzione eccedente.'],
['Economia','Perché l’eccedenza può favorire la specializzazione del lavoro?',['Può sostenere persone impegnate in attività non agricole','Impedisce gli scambi','Elimina il bisogno di coltivare'],0,'Le riserve permettono il sostegno di lavoratori specializzati.'],
['Politica','Quale forma politica è attestata nella Mesopotamia meridionale?',['Un unico Stato immutabile dalle origini','Molte città-stato','L’assenza di città'],1,'Numerose città-stato precedettero e coesistettero con forme di regno differenti.'],
['Politica','Chi era Narmer?',['Un mercante sumero','Un autore greco','Un sovrano egizio legato all’unificazione'],2,'Narmer è tra i primi sovrani egizi associati all’unificazione.'],
['Fonti','Che cosa registravano molte prime tavolette di Uruk?',['Beni e razioni','Atlanti moderni','Fotografie'],0,'Molte prime tavolette conservano dati amministrativi.'],
['Fonti','Che cosa testimonia la Tavolozza di Narmer?',['La rappresentazione del potere regio, da interpretare','La registrazione letterale di un discorso','La prova di un’unica battaglia risolutiva'],0,'Le fonti figurative richiedono interpretazione storica.'],
['Metodo','Quale rapporto esiste tra fiumi e organizzazione politica?',['I fiumi determinano sempre gli stessi re','Offrono opportunità e limiti; le risposte sociali variano','Non influenzano mai le società'],1,'Le condizioni geografiche non determinano un unico risultato.'],
['Metodo','Come vanno interpretate le scelte fatte in questo laboratorio?',['Come fatti realmente avvenuti','Come simulazioni da confrontare con le fonti','Come traduzioni letterali di testi antichi'],1,'Simulazione didattica e conoscenza documentata devono restare distinte.']
];
