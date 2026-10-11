"use client";
/* eslint-disable @next/next/no-img-element -- shared static GitHub Pages build uses licensed remote media with explicit responsive CSS */

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { deathVersions } from "./data/deathVersions";
import { glossary } from "./data/glossary";
import { images } from "./data/media";
import { sections, sectionBySlug } from "./data/sections";
import { sourceById, sources } from "./data/sources";
import { timeline } from "./data/timeline";
import { tombs } from "./data/tombs";
import type { ContentClaim, EvidenceLevel, Section } from "./types";
import "./styles.css";

const evidenceMeta: Record<EvidenceLevel, { short: string; label: string }> = {
  "archaeological-data": { short: "A", label: "Dato archeologico" },
  "ancient-source": { short: "F", label: "Fonte antica" },
  "modern-interpretation": { short: "I", label: "Interpretazione moderna" },
  "hypothesis-tradition": { short: "T", label: "Ipotesi o tradizione" },
};

const routeFromHash = () => {
  if (typeof window === "undefined") return "home";
  return window.location.hash.replace(/^#\/?/, "") || "home";
};

const navigate = (route: string) => {
  window.location.hash = route === "home" ? "#/" : `#/${route}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const meta = evidenceMeta[level];
  return (
    <span className={`evidence-badge evidence-${level}`} title={meta.label}>
      <span aria-hidden="true">{meta.short}</span>
      {meta.label}
    </span>
  );
}

function EvidenceLegend({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "evidence-legend compact" : "evidence-legend"} aria-label="Livelli di evidenza">
      {(Object.keys(evidenceMeta) as EvidenceLevel[]).map((level) => <EvidenceBadge key={level} level={level} />)}
    </div>
  );
}

function Header({
  route,
  menuOpen,
  setMenuOpen,
  onSearch,
  onNotes,
  studyMode,
  setStudyMode,
}: {
  route: string;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  onSearch: () => void;
  onNotes: () => void;
  studyMode: boolean;
  setStudyMode: (value: boolean) => void;
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="Agamennone, torna alla home" onClick={(event) => { event.preventDefault(); navigate("home"); setMenuOpen(false); }}>
        <span className="brand-mark" aria-hidden="true"><i /></span>
        <span><strong>AGAMENNONE</strong><small>Archeologia · mito · memoria</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Navigazione principale">
        <button className={route === "tesoro-di-atreo" ? "active" : ""} onClick={() => navigate("tesoro-di-atreo")}>La tomba</button>
        <button className={route === "storia-e-mito" ? "active" : ""} onClick={() => navigate("storia-e-mito")}>Il re</button>
        <button className={route === "chi-uccise-agamennone" ? "active" : ""} onClick={() => navigate("chi-uccise-agamennone")}>La morte</button>
        <button className={route === "atlante-fonti" ? "active" : ""} onClick={() => navigate("atlante-fonti")}>Le fonti</button>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={onSearch} aria-label="Cerca nel sito"><span aria-hidden="true">⌕</span></button>
        <button className={`mode-button ${studyMode ? "active" : ""}`} onClick={() => setStudyMode(!studyMode)} aria-pressed={studyMode}>Studio</button>
        <button className="icon-button" onClick={onNotes} aria-label="Apri taccuino"><span aria-hidden="true">✎</span></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu"><span aria-hidden="true">{menuOpen ? "×" : "☰"}</span><span className="sr-only">Menu</span></button>
      </div>
    </header>
  );
}

function SiteMenu({ open, route, close }: { open: boolean; route: string; close: () => void }) {
  return (
    <div id="site-menu" className={`site-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="menu-intro"><span>INDICE DEL PERCORSO</span><p>Dalla pietra al racconto, senza cancellare la distanza fra le due.</p></div>
      <nav aria-label="Indice completo">
        {sections.map((section, index) => (
          <button key={section.slug} className={route === section.slug ? "active" : ""} onClick={() => { navigate(section.slug); close(); }} tabIndex={open ? 0 : -1}>
            <span>{String(index + 1).padStart(2, "0")}</span>{section.nav}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero">
        <div className="hero-media" aria-hidden="true"><img src={images[1].src} alt="" fetchPriority="high" /></div>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="overline"><span /> Micene, XIV–XIII secolo a.C. <span /></p>
          <h1>Una tomba reale.<br /><em>Un nome senza prova.</em></h1>
          <p className="hero-subtitle">Dalla tomba monumentale di Micene alla morte del re nella tradizione greca</p>
          <button className="primary-cta" onClick={() => navigate("tesoro-di-atreo")}><span>Entrare nel monumento</span><b aria-hidden="true">↓</b></button>
        </div>
        <a className="hero-credit" href={images[1].page} target="_blank" rel="noreferrer">Foto: {images[1].author} · {images[1].license}</a>
      </section>

      <section className="truth-statement content-width">
        <p className="overline dark">LA PRIMA DISTINZIONE</p>
        <blockquote>Il monumento chiamato “Tomba di Agamennone” <strong>non può essere attribuito con certezza</strong> al sovrano dell’epica.</blockquote>
        <p>Il nome racconta soprattutto il lungo dialogo tra rovine, memoria e mito.</p>
        <EvidenceLegend />
      </section>

      <section className="gateways wide-width" aria-labelledby="gateways-title">
        <div className="section-heading"><p className="overline dark">TRE INGRESSI</p><h2 id="gateways-title">Da dove vuoi cominciare?</h2></div>
        <div className="gateway-grid">
          <Gateway number="01" title="Entrare nella tomba" text="Pietra, geometria, lavoro e memoria dinastica." image={images[2].src} route="tesoro-di-atreo" evidence="archaeological-data" />
          <Gateway number="02" title="Cercare il re storico" text="Tavolette, wanax e i limiti dell’identificazione." image={images[0].src} route="storia-e-mito" evidence="modern-interpretation" />
          <Gateway number="03" title="Seguire la morte nel mito" text="Omero, Eschilo e una colpa che cambia autore." image={images[7].src} route="chi-uccise-agamennone" evidence="ancient-source" />
        </div>
      </section>

      <section className="threshold-path">
        <div className="wide-width">
          <p className="overline">UN COLLEGAMENTO TRASVERSALE</p>
          <h2>La soglia cambia senso</h2>
          <div className="path-line" role="list" aria-label="Percorso dalla tomba al mito">
            {["Porta monumentale", "Soglia", "Ritorno del re", "Ingresso nella reggia", "Morte"].map((item, index) => (
              <button key={item} role="listitem" onClick={() => navigate(index < 2 ? "architettura-tholos" : index < 4 ? "agamennone-odissea" : "chi-uccise-agamennone")}><span>{index + 1}</span>{item}</button>
            ))}
          </div>
          <p className="path-note">Non è una ricostruzione storica: è una pista critica che rende visibile la trasformazione di un elemento concreto in figura narrativa.</p>
        </div>
      </section>

      <section className="home-feature content-width">
        <div><p className="overline dark">IN EVIDENZA</p><h2>Chi uccise Agamennone?</h2><p>La risposta cambia perché cambia la domanda: colpa individuale, vendetta dinastica, guerra fra i sessi, giustizia pubblica.</p><button className="text-link" onClick={() => navigate("chi-uccise-agamennone")}>Apri la matrice delle versioni <span>→</span></button></div>
        <div className="feature-stat"><strong>7</strong><span>tradizioni confrontate nella prima edizione</span><i /></div>
      </section>
    </main>
  );
}

function Gateway({ number, title, text, image, route, evidence }: { number: string; title: string; text: string; image: string; route: string; evidence: EvidenceLevel }) {
  return (
    <article className="gateway-card">
      <img src={image} alt="" loading="lazy" />
      <div className="gateway-overlay" />
      <div className="gateway-content"><span>{number}</span><EvidenceBadge level={evidence} /><h3>{title}</h3><p>{text}</p><button onClick={() => navigate(route)} aria-label={`Apri: ${title}`}>Esplora <b aria-hidden="true">→</b></button></div>
    </article>
  );
}

function ClaimCard({ claim, studyMode }: { claim: ContentClaim; studyMode: boolean }) {
  const [copied, setCopied] = useState(false);
  const citation = claim.sources.map((id) => sourceById[id]).filter(Boolean).map((source) => `${source.author}, ${source.title}${source.date ? ` (${source.date})` : ""}`).join("; ");
  const copy = async () => {
    await navigator.clipboard?.writeText(`${claim.title}. ${claim.text} — ${citation}`);
    setCopied(true); window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <aside className={`claim-card evidence-border-${claim.evidenceLevel}`}>
      <div className="claim-top"><EvidenceBadge level={claim.evidenceLevel} /><span className={`confidence confidence-${claim.confidence}`}>Confidenza {claim.confidence === "high" ? "alta" : claim.confidence === "medium" ? "media" : "bassa"}</span></div>
      <h4>{claim.title}</h4><p>{claim.text}</p>
      {claim.note && <p className="claim-note">Nota: {claim.note}</p>}
      {studyMode && <div className="claim-sources">Fonti: {citation}</div>}
      <button className="copy-button" onClick={copy}>{copied ? "Copiato" : "Copia con fonte"}</button>
    </aside>
  );
}

function SectionPage({ section, studyMode }: { section: Section; studyMode: boolean }) {
  return (
    <main id="main-content" className="article-page" tabIndex={-1}>
      <div className="article-hero wide-width">
        <div><p className="overline dark">{section.eyebrow}</p><h1>{section.title}</h1><p className="article-summary">{section.summary}</p></div>
        <div className="article-meta"><span>{section.readTime} min di lettura</span><span>Revisione: 3 agosto 2026</span><span className="verified">● {section.verification}</span></div>
      </div>
      <div className="article-layout wide-width">
        <aside className="article-aside"><p>IN QUESTA PAGINA</p>{section.blocks.map((block, index) => <button key={block.heading} onClick={() => document.getElementById(`block-${index}`)?.scrollIntoView({ behavior: "smooth" })}>{block.heading}</button>)}<EvidenceLegend compact /></aside>
        <article className="article-body">
          {section.blocks.map((block, index) => (
            <section key={block.heading} id={`block-${index}`}>
              <h2>{block.heading}</h2>
              {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {block.quote && <figure className="source-quote"><blockquote>“{block.quote.text}”</blockquote><figcaption>{block.quote.cite}</figcaption></figure>}
              {block.claims?.map((item) => <ClaimCard key={item.id} claim={item} studyMode={studyMode} />)}
              {block.links && <div className="cross-links">{block.links.map((link) => <button key={link.route} onClick={() => navigate(link.route)}>{link.label}<span>→</span></button>)}</div>}
            </section>
          ))}
          {section.slug === "chi-uccise-agamennone" && <DeathMatrix />}
          {section.slug === "cronologia" && <Timeline />}
          {section.slug === "glossario" && <Glossary />}
          {section.slug === "bibliografia" && <Bibliography sourceIds={section.sourceIds} />}
          {section.slug === "iconografia" && <Gallery />}
          {section.slug === "atlante-fonti" && <SourceAtlas />}
          {section.slug === "tombe-monumentali" && <TombsTable />}
          <PageSources sourceIds={section.sourceIds} />
        </article>
      </div>
    </main>
  );
}

function PageSources({ sourceIds }: { sourceIds: string[] }) {
  const pageSources = sourceIds.map((id) => sourceById[id]).filter(Boolean);
  if (!pageSources.length) return null;
  return <section className="page-sources"><p className="overline dark">RIFERIMENTI DELLA PAGINA</p><ol>{pageSources.map((source) => <li key={source.id}><strong>{source.author}</strong>, <cite>{source.title}</cite>{source.date ? `, ${source.date}` : ""}.{source.passage && <span> Passi: {source.passage}.</span>}{source.url && <a href={source.url} target="_blank" rel="noreferrer">Consulta la fonte ↗</a>}</li>)}</ol></section>;
}

function DeathMatrix() {
  const [selected, setSelected] = useState("all");
  const visible = selected === "all" ? deathVersions : deathVersions.filter((version) => version.id === selected);
  return (
    <section className="interactive-tool death-tool">
      <div className="tool-heading"><div><p className="overline dark">MATRICE COMPARATIVA</p><h2>La morte cambia autore</h2></div><span>Seleziona una tradizione</span></div>
      <div className="filter-row" role="group" aria-label="Filtra le versioni">{[{ id: "all", author: "Tutte" }, ...deathVersions].map((version) => <button key={version.id} className={selected === version.id ? "active" : ""} onClick={() => setSelected(version.id)}>{version.author}</button>)}</div>
      <div className="version-grid">{visible.map((version) => <article key={version.id} className="version-card"><div className="version-header"><span>{version.date}</span><h3>{version.author}</h3><p>{version.work}</p></div><dl><div><dt>Chi uccide</dt><dd>{version.killer}</dd></div><div><dt>Clitemnestra</dt><dd>{version.clytemnestra}</dd></div><div><dt>Egisto</dt><dd>{version.aegisthus}</dd></div><div><dt>Luogo e modo</dt><dd>{version.place}. {version.method}</dd></div><div><dt>Ifigenia</dt><dd>{version.iphigenia}</dd></div><div><dt>Funzione</dt><dd>{version.meaning}</dd></div></dl><a href={sourceById[version.sourceId]?.url} target="_blank" rel="noreferrer">Apri il testo di riferimento ↗</a></article>)}</div>
    </section>
  );
}

function Timeline() {
  const kinds = ["tutti", ...Array.from(new Set(timeline.map((item) => item.kind)))];
  const [kind, setKind] = useState("tutti");
  return <section className="interactive-tool"><div className="filter-row" role="group" aria-label="Filtra la cronologia">{kinds.map((item) => <button key={item} className={kind === item ? "active" : ""} onClick={() => setKind(item)}>{item}</button>)}</div><ol className="timeline">{timeline.filter((item) => kind === "tutti" || item.kind === kind).map((item) => <li key={`${item.date}-${item.title}`}><span className={`timeline-dot kind-${item.kind}`} /><time>{item.date}</time><div><small>{item.kind}</small><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></section>;
}

function Glossary() {
  const [query, setQuery] = useState("");
  const visible = glossary.filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="interactive-tool"><label className="field-label" htmlFor="glossary-search">Cerca nel glossario</label><input id="glossary-search" className="search-field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Es. tholos, wanax, nostos…" /><div className="glossary-grid">{visible.map((item) => <article key={item.term}><h3>{item.term}</h3><p>{item.definition}</p></article>)}</div></section>;
}

function Bibliography({ sourceIds }: { sourceIds: string[] }) {
  const [query, setQuery] = useState("");
  const visible = sources.filter((source) => sourceIds.includes(source.id)).filter((source) => JSON.stringify(source).toLowerCase().includes(query.toLowerCase()));
  return <section className="interactive-tool"><label className="field-label" htmlFor="bib-search">Filtra per autore, titolo o area</label><input id="bib-search" className="search-field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cerca nella bibliografia…" /><div className="bibliography-list">{visible.map((source) => <article key={source.id}><p className="overline dark">{source.area}</p><h3>{source.author}</h3><p><cite>{source.title}</cite>{source.publication && `, ${source.publication}`}{source.date && ` (${source.date})`}{source.pages && `, pp. ${source.pages}`}.</p><small>{source.reliability}{source.limits && ` Limite: ${source.limits}`}</small><div>{source.doi && <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noreferrer">DOI {source.doi}</a>}{source.url && <a href={source.url} target="_blank" rel="noreferrer">Consulta ↗</a>}</div></article>)}</div></section>;
}

function Gallery() {
  const [selected, setSelected] = useState<(typeof images)[number] | null>(null);
  return <section className="interactive-tool"><div className="gallery-grid">{images.map((item) => <figure key={item.id}><button onClick={() => setSelected(item)} aria-label={`Ingrandisci: ${item.title}`}><img src={item.src} alt={item.alt} loading="lazy" /></button><figcaption><span>{item.kind}</span><h3>{item.title}</h3><p>{item.caption}</p><small>{item.author} · {item.date} · <a href={item.licenseUrl} target="_blank" rel="noreferrer">{item.license}</a></small></figcaption></figure>)}</div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}><button onClick={() => setSelected(null)} aria-label="Chiudi immagine">×</button><figure onClick={(event) => event.stopPropagation()}><img src={selected.src} alt={selected.alt} /><figcaption><h2>{selected.title}</h2><p>{selected.caption}</p><a href={selected.page} target="_blank" rel="noreferrer">Scheda e file originale ↗</a></figcaption></figure></div>}</section>;
}

function SourceAtlas() {
  const ancient = sources.filter((source) => source.area.toLowerCase().includes("agamennone") || source.reliability.toLowerCase().includes("letteraria") || source.reliability.toLowerCase().includes("tragic") || source.reliability.toLowerCase().includes("mitograf"));
  return <section className="interactive-tool source-atlas"><div className="atlas-grid">{ancient.map((source) => <article key={source.id}><span>{source.date}</span><h3>{source.author}</h3><p><cite>{source.title}</cite></p>{source.passage && <p className="passage">Passi: {source.passage}</p>}<p>{source.area}</p>{source.limits && <small>Limite: {source.limits}</small>}{source.url && <a href={source.url} target="_blank" rel="noreferrer">Leggi il testo ↗</a>}</article>)}</div></section>;
}

function TombsTable() {
  return <section className="interactive-tool"><div className="table-scroll" tabIndex={0}><table><caption>Confronto prudente. Le misure ricostruite o non verificate sono dichiarate.</caption><thead><tr><th>Monumento</th><th>Luogo e fase</th><th>Diametro / altezza</th><th>Dromos e caratteri</th><th>Attribuzione</th></tr></thead><tbody>{tombs.map((tomb) => <tr key={tomb.name}><th>{tomb.name}<small>{tomb.state}</small></th><td>{tomb.place}<small>{tomb.date}</small></td><td>{tomb.diameter}<small>{tomb.height}</small></td><td>{tomb.dromos}<small>{tomb.feature}</small></td><td>{tomb.attribution}<small>Certezza dati: {tomb.certainty}</small></td></tr>)}</tbody></table></div></section>;
}

function MapPage() {
  return <main id="main-content" className="article-page" tabIndex={-1}><div className="article-hero wide-width"><div><p className="overline dark">MAPPA · SCHEMA NON METRICO</p><h1>Micene: cittadella e paesaggio funerario</h1><p className="article-summary">Orientarsi senza trasformare una relazione topografica in identificazione mitica.</p></div></div><section className="map-section wide-width"><div className="schematic-map" role="img" aria-label="Schema non metrico della cittadella di Micene e delle principali tombe a tholos"><svg viewBox="0 0 900 560"><path className="terrain" d="M160 95 C340 10 610 25 755 155 C870 260 785 448 596 499 C409 549 167 484 85 333 C27 226 55 145 160 95Z"/><path className="citadel" d="M302 89 L558 64 L700 171 L646 319 L500 385 L332 306 L258 188 Z"/><path className="road" d="M474 538 C465 447 474 371 463 301 C455 238 426 181 403 133"/><circle cx="398" cy="130" r="11"/><circle cx="440" cy="440" r="17"/><circle cx="248" cy="350" r="13"/><circle cx="660" cy="364" r="13"/><text x="414" y="124">Porta dei Leoni</text><text x="465" y="446">Tesoro di Atreo</text><text x="100" y="357">Tomba di Egisto</text><text x="678" y="372">Tomba di Clitemnestra</text><text x="498" y="286">Cittadella</text></svg><p>Le posizioni sono schematiche e non sostituiscono un rilievo GIS. Il Tesoro di Atreo è a sud della cittadella; il percorso visualizza una relazione spaziale, non una processione ricostruita.</p></div><div className="map-legend"><h2>Tre cautele</h2><ol><li><strong>Scala</strong><span>La forma è orientativa, non metrica.</span></li><li><strong>Fasi</strong><span>I monumenti non sono tutti contemporanei.</span></li><li><strong>Nomi</strong><span>Le attribuzioni eroiche sono convenzioni.</span></li></ol><button className="primary-dark" onClick={() => navigate("tombe-monumentali")}>Confronta le tombe</button></div></section></main>;
}

function SearchDialog({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => query.trim().length < 2 ? [] : sections.filter((section) => JSON.stringify(section).toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  if (!open) return null;
  return <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-label="Cerca nel sito" onClick={close}><div className="search-dialog" onClick={(event) => event.stopPropagation()}><button className="dialog-close" onClick={close} aria-label="Chiudi ricerca">×</button><p className="overline dark">RICERCA INTERNA</p><label htmlFor="site-search">Cerca monumenti, autori, temi e livelli di certezza</label><input autoFocus id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Es. Pausania, Clitemnestra, dromos…" />{query.length > 1 && <div className="search-results">{results.length ? results.map((section) => <button key={section.slug} onClick={() => { navigate(section.slug); close(); }}><span>{section.eyebrow}</span><strong>{section.title}</strong><p>{section.summary}</p></button>) : <p>Nessun risultato. Prova un termine più ampio.</p>}</div>}</div></div>;
}

function NotesDrawer({ open, close, route }: { open: boolean; close: () => void; route: string }) {
  const [notes, setNotes] = useState<Record<string, string>>(() => { try { return typeof window === "undefined" ? {} : JSON.parse(localStorage.getItem("agamennone-notes") || "{}"); } catch { return {}; } });
  const [favorites, setFavorites] = useState<string[]>(() => { try { return typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("agamennone-favorites") || "[]"); } catch { return []; } });
  const saveNote = (value: string) => { const next = { ...notes, [route]: value }; setNotes(next); localStorage.setItem("agamennone-notes", JSON.stringify(next)); };
  const toggleFavorite = () => { const next = favorites.includes(route) ? favorites.filter((item) => item !== route) : [...favorites, route]; setFavorites(next); localStorage.setItem("agamennone-favorites", JSON.stringify(next)); };
  const exportNotes = () => { const body = Object.entries(notes).filter(([, value]) => value.trim()).map(([key, value]) => `## ${sectionBySlug[key]?.title || key}\n\n${value}`).join("\n\n"); const url = URL.createObjectURL(new Blob([`# Taccuino — Agamennone\n\n${body}`], { type: "text/markdown" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "taccuino-agamennone.md"; anchor.click(); URL.revokeObjectURL(url); };
  return <aside className={`notes-drawer ${open ? "open" : ""}`} aria-hidden={!open}><div className="notes-header"><div><p>TACCUINO LOCALE</p><h2>{sectionBySlug[route]?.title || "Home"}</h2></div><button onClick={close} aria-label="Chiudi taccuino">×</button></div><p className="privacy-note">Le note restano su questo dispositivo.</p><textarea value={notes[route] || ""} onChange={(event) => saveNote(event.target.value)} placeholder="Scrivi una domanda, un collegamento, un dubbio…" tabIndex={open ? 0 : -1} /><button className={`favorite-button ${favorites.includes(route) ? "active" : ""}`} onClick={toggleFavorite} tabIndex={open ? 0 : -1}>{favorites.includes(route) ? "★ Pagina nei preferiti" : "☆ Aggiungi ai preferiti"}</button><div className="notes-footer"><span>{Object.values(notes).filter(Boolean).length} pagine annotate</span><button onClick={exportNotes} tabIndex={open ? 0 : -1}>Esporta .md</button></div></aside>;
}

function Footer() {
  return <footer><a className="back-to-micene" href="../Cnosso-Micene/">← Torna alla visita di Micene</a><div className="wide-width"><div><strong>AGAMENNONE</strong><p>Archeologia, mito e memoria</p></div><div><button onClick={() => navigate("metodo")}>Metodo</button><button onClick={() => navigate("bibliografia")}>Bibliografia</button><button onClick={() => navigate("crediti")}>Crediti</button></div><p>Un progetto culturale di gbprof e Libera · 2026</p></div></footer>;
}

export default function AgamemnonApp() {
  const route = useSyncExternalStore(
    (callback) => { window.addEventListener("hashchange", callback); return () => window.removeEventListener("hashchange", callback); },
    routeFromHash,
    () => "home",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [studyMode, setStudyMode] = useState(() => typeof window !== "undefined" && localStorage.getItem("agamennone-study") === "true");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? (window.scrollY / max) * 100 : 0); };
    window.addEventListener("scroll", scroll, { passive: true });
    if ("serviceWorker" in navigator && location.hostname !== "localhost") navigator.serviceWorker.register(new URL("./sw.js", document.baseURI).pathname).catch(() => undefined);
    return () => { window.removeEventListener("scroll", scroll); };
  }, []);
  useEffect(() => { try { localStorage.setItem("agamennone-study", String(studyMode)); } catch { /* private mode */ } }, [studyMode]);
  useEffect(() => { const handler = (event: KeyboardEvent) => { if (event.key === "Escape") { setSearchOpen(false); setMenuOpen(false); setNotesOpen(false); } if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); } }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);

  const section = sectionBySlug[route];
  return <div className={studyMode ? "app study-mode" : "app"}><a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Salta al contenuto</a><div className="reading-progress" style={{ width: `${progress}%` }} />
    <Header route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onSearch={() => setSearchOpen(true)} onNotes={() => setNotesOpen(true)} studyMode={studyMode} setStudyMode={setStudyMode} />
    <SiteMenu open={menuOpen} route={route} close={() => setMenuOpen(false)} />
    {route === "home" ? <Hero /> : route === "mappa" ? <MapPage /> : section ? <SectionPage section={section} studyMode={studyMode} /> : <main id="main-content" className="not-found" tabIndex={-1}><p className="overline dark">404</p><h1>Questa soglia non conduce a una pagina.</h1><button onClick={() => navigate("home")}>Torna all’ingresso</button></main>}
    <nav className="floating-tools" aria-label="Strumenti rapidi"><button onClick={() => setSearchOpen(true)}><span aria-hidden="true">⌕</span>Cerca</button><button onClick={() => setNotesOpen(true)}><span aria-hidden="true">✎</span>Note</button><button onClick={() => navigate("mappa")}><span aria-hidden="true">⌖</span>Mappa</button></nav>
    <SearchDialog open={searchOpen} close={() => setSearchOpen(false)} /><NotesDrawer open={notesOpen} close={() => setNotesOpen(false)} route={route} /><Footer />
  </div>;
}
