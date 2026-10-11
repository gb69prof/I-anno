import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';

for (const [name, file, stale, current] of [
  ['Agamennone', '../public/sw.js', 'i-anno-agamennone-v0', 'i-anno-agamennone-v1'],
  ['Micene', '../../../Cnosso-Micene/sw.js', 'micene-3d-v1.0.0', 'micene-3d-v1.1.0'],
]) test(`${name}: l’aggiornamento conserva le cache degli altri progetti`, async () => {
  const handlers = {}, removed = [];
  const foreign = ['gravity-lab-v1', 'antologia-v1', name === 'Micene' ? 'i-anno-agamennone-v1' : 'micene-3d-v1.1.0'];
  vm.runInNewContext(await readFile(new URL(file, import.meta.url), 'utf8'), {
    self: {addEventListener: (type, fn) => handlers[type] = fn, clients: {claim: async () => {}}},
    caches: {keys: async () => [stale, current, ...foreign], delete: async key => removed.push(key)},
  });
  let completion;
  handlers.activate({waitUntil: promise => completion = promise});
  await completion;
  assert.deepEqual(removed, [stale]);
});
