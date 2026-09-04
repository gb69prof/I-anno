/** Rasterize the exact SVG maps; optional development dependency: sharp. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'sharp'):'sharp');
const root=path.resolve(import.meta.dirname,'..');
for(const file of await fs.readdir(path.join(root,'assets/mappe'))){if(file.endsWith('.svg'))await sharp(path.join(root,'assets/mappe',file)).png().toFile(path.join(root,'assets/mappe',file.replace('.svg','.png')));}
console.log('PNG maps exported from SVG.');
