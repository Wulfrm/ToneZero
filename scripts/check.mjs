import {readFile,access,readdir} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {SourceTextModule} from 'node:vm';
import assert from 'node:assert/strict';
const project=fileURLToPath(new URL('../',import.meta.url)),root=resolve(project,'dist');
for(const directory of ['dist','worker','scripts','tests'])for(const file of await readdir(resolve(project,directory))){if(!['.js','.mjs'].includes(extname(file)))continue;new SourceTextModule(await readFile(resolve(project,directory,file),'utf8'),{identifier:file})}
const html=await readFile(resolve(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g))await access(resolve(root,match[1]));
const manifest=JSON.parse(await readFile(resolve(root,'manifest.webmanifest'),'utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons){const bytes=await readFile(resolve(root,icon.src));assert.equal(bytes.subarray(1,4).toString(),'PNG');const dimension=Number(icon.sizes.split('x')[0]);assert.equal(bytes.readUInt32BE(16),dimension);assert.equal(bytes.readUInt32BE(20),dimension)}
const sw=await readFile(resolve(root,'sw.js'),'utf8');const assets=sw.match(/const ASSETS=(\[[^;]+\]);/)[1].replaceAll("'",'"');for(const asset of JSON.parse(assets))await access(resolve(root,asset==='./'?'index.html':asset));
assert(!html.includes('https://fonts.googleapis.com'),'Offline shell must not depend on remote fonts.');
console.log('Checked JavaScript syntax, entrypoint assets, service-worker assets, subpath manifest and PNG icon sizes.');
