// Baut aus src/app.html + gebündelten Bibliotheken zwei Varianten:
//   index.html + vendor.js + heif.js  -> GitHub Pages (kleine HTML-Datei, Bibliotheken als eigene Dateien, Cache-Busting per Hash)
//   Tourposter.html                   -> eine Datei mit allem eingebettet, läuft offline vom Rechner (bis auf Kacheln/Schrift)
import { build } from 'esbuild';
import fs from 'fs';
import crypto from 'crypto';
await build({ entryPoints: ['src/entry.js'], bundle: true, minify: true, format: 'iife', target: ['es2020', 'safari15', 'chrome90', 'firefox90'], outfile: 'vendor.js', logLevel: 'error' });
const app = fs.readFileSync('src/app.html', 'utf8');
const css = fs.readFileSync('node_modules/maplibre-gl/dist/maplibre-gl.css', 'utf8');
const js = fs.readFileSync('vendor.js');
// HEIC-Decoder (libheif, WebAssembly) – wird erst geladen, wenn ein HEIC-Foto kommt
const heif = fs.readFileSync('node_modules/libheif-js/libheif-wasm/libheif-bundle.js');
fs.writeFileSync('heif.js', heif);
const h = b => crypto.createHash('md5').update(b).digest('hex').slice(0, 8);
const base0 = app.replace('/*MAPLIBRE_CSS*/', css);
// Schriften liegen als eigene Dateien im Repo (kein Google-CDN): gehostet unter fonts/, in der Einzeldatei eingebettet
// Schlüssel, Familienname, tatsächliche Gewichtsachse der variablen Schrift
const FONTS = [['montserrat', 'Montserrat', '100 900'], ['inter', 'Inter', '100 900'], ['oswald', 'Oswald', '200 700'], ['space-grotesk', 'Space Grotesk', '300 700'], ['playfair-display', 'Playfair Display', '400 900'], ['lora', 'Lora', '400 700']];
const faces = embed => FONTS.map(([key, fam, rng]) => {
  const url = embed ? `data:font/woff2;base64,${fs.readFileSync(`fonts/${key}.woff2`).toString('base64')}` : `fonts/${key}.woff2`;
  return `@font-face{font-family:'${fam}';font-style:normal;font-weight:${rng};font-display:swap;src:url(${url}) format('woff2')}`;
}).join('\n');
const fHead = base0.slice(0, base0.indexOf('/*FONTS*/')), fTail = base0.slice(base0.indexOf('/*FONTS_END*/') + '/*FONTS_END*/'.length);
const base = fHead + faces(false) + fTail, baseSingle = fHead + faces(true) + fTail;
// Einzeldatei: als data:-URL einbetten (das Bundle enthält "<!--" und "<script", was den HTML-Parser in einem Inline-Script aus dem Tritt bringt)
const single = baseSingle.replace('<script>/*VENDOR_JS*/</script>', `<script src="data:text/javascript;base64,${js.toString('base64')}" onerror="window.__vendorFail=true"></script>`).replace('/*HEIF_B64*/', heif.toString('base64'));
// Raumfotos für die Wandvorschau: Einzeldatei bettet sie als data:-URL ein, gehostet liegen sie unter rooms/
const rooms = fs.existsSync('rooms') ? fs.readdirSync('rooms').sort() : [];
let singleR = single;
for (const f of rooms) { const d = fs.readFileSync(`rooms/${f}`); const mt = f.endsWith('.png') ? 'image/png' : f.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
  singleR = singleR.replaceAll(`"rooms/${f}"`, `"data:${mt};base64,${d.toString('base64')}"`); }
fs.writeFileSync('Tourposter.html', singleR);
const hosted = base.replace('<script>/*VENDOR_JS*/</script>', `<script src="vendor.js?v=${h(js)}" onerror="window.__vendorFail=true"></script>`).replace('<script id="heifsrc" type="text/plain">/*HEIF_B64*/</script>', `<script id="heifsrc" type="text/plain" data-src="heif.js?v=${h(heif)}"></script>`);
fs.writeFileSync('index.html', hosted);
console.log('index.html', (hosted.length / 1024 | 0), 'KB · vendor.js', (js.length / 1024 | 0), 'KB · heif.js', (heif.length / 1024 | 0), 'KB · Tourposter.html', (single.length / 1024 | 0), 'KB');
