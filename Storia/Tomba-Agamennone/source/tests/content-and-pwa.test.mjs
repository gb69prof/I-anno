import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("i quattro livelli di evidenza sono presenti e testuali", async () => {
  const source = await read("src/types.ts");
  for (const level of ["archaeological-data", "ancient-source", "modern-interpretation", "hypothesis-tradition"]) assert.match(source, new RegExp(level));
});

test("la home dichiara che l'attribuzione non è certa", async () => {
  const app = await read("src/App.tsx");
  assert.match(app, /non può essere attribuito con certezza/i);
});

test("manifest e service worker supportano il funzionamento installabile", async () => {
  const manifest = JSON.parse(await read("public/manifest.webmanifest"));
  const worker = await read("public/sw.js");
  assert.equal(manifest.display, "standalone");
  assert.match(manifest.start_url, /#\//);
  assert.match(worker, /caches\.open/);
});

test("il base path relativo supporta gbprof.it e GitHub Pages", async () => {
  const config = await read("vite.pages.config.ts");
  assert.match(config, /base: "\.\/"/);
});

test("ogni immagine pubblicata dichiara licenza e pagina sorgente", async () => {
  const media = await read("src/data/media.ts");
  const count = (media.match(/licenseUrl:/g) || []).length;
  const pages = (media.match(/page:/g) || []).length;
  assert.ok(count >= 8);
  assert.equal(count, pages);
});

