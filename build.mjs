// Baut index.html aus src/app.html + gebündelten Bibliotheken (eine Datei, offline-fähig bis auf Kacheln/Schrift).
import { build } from 'esbuild';
import fs from 'fs';
await build({ entryPoints: ['src/entry.js'], bundle: true, minify: true, format: 'iife', target: ['es2020', 'safari15', 'chrome90', 'firefox90'], outfile: 'vendor.js', logLevel: 'error' });
const app = fs.readFileSync('src/app.html', 'utf8');
const css = fs.readFileSync('node_modules/maplibre-gl/dist/maplibre-gl.css', 'utf8');
const js = fs.readFileSync('vendor.js');
// HEIC-Decoder (libheif, WebAssembly) liegt als base64 in einem text/plain-Script und wird erst geladen, wenn ein HEIC-Foto kommt.
const heif = fs.readFileSync('node_modules/libheif-js/libheif-wasm/libheif-bundle.js');
// Als data:-URL einbetten: das Bundle enthält "<!--" und "<script", was den HTML-Parser in einem Inline-Script aus dem Tritt bringt.
const out = app.replace('/*MAPLIBRE_CSS*/', css).replace('<script>/*VENDOR_JS*/</script>', `<script src="data:text/javascript;base64,${js.toString('base64')}" onerror="window.__vendorFail=true"></script>`).replace('/*HEIF_B64*/', heif.toString('base64'));
fs.writeFileSync('index.html', out);
console.log('index.html', (out.length / 1024 | 0), 'KB');
