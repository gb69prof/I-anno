export type EvidenceLevel =
  | "archaeological-data"
  | "ancient-source"
  | "modern-interpretation"
  | "hypothesis-tradition";

export type Confidence = "high" | "medium" | "low";

export type SourceReference = {
  id: string;
  author: string;
  title: string;
  date?: string;
  passage?: string;
  publication?: string;
  pages?: string;
  url?: string;
  doi?: string;
  isbn?: string;
  accessDate?: string;
  area: string;
  reliability: string;
  limits?: string;
};

export type ContentClaim = {
  id: string;
  title: string;
  text: string;
  evidenceLevel: EvidenceLevel;
  sources: string[];
  confidence: Confidence;
  note?: string;
};

export type ContentBlock = {
  heading: string;
  paragraphs: string[];
  claims?: ContentClaim[];
  quote?: { text: string; cite: string; sourceId: string };
  links?: { label: string; route: string }[];
};

export type Section = {
  slug: string;
  nav: string;
  title: string;
  eyebrow: string;
  summary: string;
  readTime: number;
  verification: "verificato" | "in revisione";
  blocks: ContentBlock[];
  sourceIds: string[];
};

