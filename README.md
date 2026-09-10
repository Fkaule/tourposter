# Tourposter

Radtour-Poster (A4 bis 70 × 100 cm, 300 dpi) aus FIT/GPX/TCX-Dateien und Fotos – **komplett im Browser**. Es gibt keinen Server: Tourdaten und Fotos verlassen den Rechner nicht. Einzige Netzwerkzugriffe sind die Kartenkacheln (OpenFreeMap, sieht nur die Region) und die Schrift Montserrat (Google Fonts).

**Live:** `https://<user>.github.io/tourposter/` (GitHub Pages, siehe unten) – oder lokal `npm run build` ausführen: erzeugt `Tourposter.html`, eine Datei mit allem drin, die per Doppelklick offline läuft (nicht im Repo, damit das Pages-Deployment klein bleibt).

## Funktionen

- FIT / GPX / TCX hineinziehen, mehrere Dateien = Etappen; Kennzahlen (km, Höhenmeter, Etappen) und Datumszeile automatisch.
- Karte: MapLibre GL mit Vektorkacheln (OpenFreeMap), Route, Marker für Start/Ziel/Übernachtungen; verschieben/zoomen, „auf Route einpassen“.
- Vier Stile: Nacht (dunkel/Koralle), Fjord (blau/Bernstein), Hell (Positron/Rot), Retro (Bright/Ziegel) – Karte, Farben und Druck wechseln zusammen.
- Läuft auch auf dem Smartphone (Poster oben, Bedienung als Tabs Tour · Fotos · Poster · Export darunter; Touch zum Verschieben/Skalieren).
- Ortsnamen für Start, Ziel und Übernachtungen automatisch aus den Kartendaten (Detail-Kachel Zoom 12; Städte bevorzugt); ziehen = verschieben, Doppelklick = Text ändern.
- Fotos hineinziehen (JPEG, PNG, HEIC – HEIC wird im Browser per libheif/WebAssembly umgewandelt): Ort (genauer Ort aus den Kartendaten) und Datum aus EXIF, Nummern-Pins auf der Route. Fotos ohne GPS: Pin-Icon im Foto bzw. „Ort setzen“ in der Fotoliste, dann auf die Karte klicken (rastet auf die Route ein), oder „Ort suchen“ – Live-Suche (alle Namen, die den Text enthalten) in den Kartenkacheln bis 15 km neben der Route: Zoom 12 entlang der ganzen Route (Orte, Gipfel, Gewässer, größere POIs), „Genauer“ lädt zusätzlich Zoom 14 (alle POIs, z. B. Hütten, Museen) rund um die Treffer und den Kartenausschnitt. Treffer beim Überfahren als Marker auf der Karte. Kein externer Geocoder, Daten bleiben lokal. Ziehen mit Einrasten an Kanten/gleichen Abständen, vier Ecken zum Skalieren (Shift = Seitenverhältnis), Kantengriffe für nur Breite/Höhe, Shift-Mehrfachauswahl mit Einrasten, „Fotos automatisch um die Route anordnen“ (Rastersuche: jedes Foto so nah wie möglich am Aufnahmeort, ohne Route, Titel, Ortsnamen, Höhenprofil oder andere Fotos zu überdecken; Größe nach Fotoanzahl, Seitenverhältnis bleibt); im Automatik-Modus (Standard) wird das Layout neu berechnet, sobald Fotos dazukommen/wegfallen, ein Ort gesetzt wird, die Karte verschoben/gezoomt, Format/Papier gewechselt oder das Höhenprofil in der Höhe geändert wird; von Hand bewegte oder skalierte Fotos gelten als fixiert (Schloss-Icon im Foto: gelb = fixiert, Klick löst bzw. fixiert), die übrigen weichen aus. Passen nicht alle Fotos, werden sie stufenweise verkleinert und zuletzt die Karte herausgezoomt. Reihenfolge entlang der Route ist Teil der Kostenfunktion (Foto n+1 soll auf der Route hinter Foto n liegen; Fotos ohne GPS werden zwischen ihren Nachbarn eingereiht). Klick auf die Nummer = Highlight ★ (≈ 1,6-fache Größe, wird zuerst platziert), Bildausschnitt mit Zoom/Verschieben (Doppelklick, Mausrad, Slider).
- Titel, Untertitel, Kennzahlen direkt im Poster tippen. Hoch- und Querformat; Papiergröße DIN A4–A1, die üblichen Posterdruck-Formate 20 × 30 bis 70 × 100 cm (300 dpi) sowie Bildschirmformate Handy 1080 × 1920 (9:16), Instagram 1080 × 1350 und Quadrat 1080 × 1080 (Texte dort stark vergrößert, weil das Bild auf ~360 CSS-px Breite dargestellt wird). Das Seitenverhältnis des Posters folgt dem Papier; Kleintexte (Bildunterschriften, Ortsnamen, Profilachsen) werden gedämpft mitskaliert (Faktor (kurze Seite / 297 mm)^−0,3, also A4 ≈ ×1,11, A2 ≈ ×0,90, 70 × 100 ≈ ×0,77), Titel und Kennzahlen nur leicht gedämpft ((kurze Seite / 297 mm)^−0,15, also A4 ≈ ×1,05, 70 × 100 ≈ ×0,88).
- Höhenprofil mit Etappengrenzen und km-Marken; Höhe automatisch nach Bergigkeit (Hm/km und höchster Punkt: flach ≈ 110–135 px, Mittelgebirge ≈ 180, Alpen ≈ 230), per Ziehen der Oberkante überschreibbar, abschaltbar. Gipfel und Pässe, über die die Route führt (Layer `mountain_peak` der Kacheln, ≤ 350 m neben der Route), werden mit Name und Höhe im Profil markiert – höchste zuerst, max. 6, Mindestabstand 5 % der Strecke; abschaltbar. Kennzahlen stehen direkt unter dem Untertitel. Standardstil Retro.
- Fotos mit Passepartout (Regler 0–14, Einheit relativ zur Postergröße; Posterfarbe mit Haarlinie, kantige Ecken) – Standard 9. Gesamtgröße aller Fotos per Regler „Fotos“ in der Kartenleiste (50–160 %): fixierte Fotos skalieren um ihre Mitte, die übrigen werden neu gelegt – bei Platzmangel zoomt die Karte bis 3× heraus, bevor verkleinert wird.
- Farbabstimmung der Fotos (Regler 0–100 %): Sättigung gedämpft, Tönung in der Themenfarbe (soft-light) und ein Hauch Kontrast – am Bildschirm per CSS-Filter, im Export per Canvas-Composite (saturation/soft-light/overlay), damit die Fotos zum Poster passen statt bunt herauszufallen. POI-Beschriftungen der Karte sind ausgeblendet, Vignette oben und ein Fade über dem Höhenprofil halten Titel/Untertitel und Profil auch auf den hellen Stilen lesbar.
- Export PNG und PDF in der gewählten Papiergröße (300 dpi; 70 × 100 cm ergibt ~100 Megapixel, das dauert einen Moment). Layout im Browser speichern – die Fotos werden dabei in Originalgröße in der Browser-Datenbank (IndexedDB) abgelegt und beim nächsten Öffnen wiederhergestellt. JSON-Sicherung enthält nur 360-px-Vorschauen (Fotos danach wieder hinzufügen, Zuordnung per Dateiname). Der Export warnt, wenn Originale fehlen.

## Entwicklung

    npm install
    npm run build      # src/app.html + Bibliotheken -> index.html + vendor.js + heif.js (Pages) und Tourposter.html (Einzeldatei)

`src/app.html` ist die App (HTML/CSS/JS), `src/entry.js` listet die gebündelten Bibliotheken (fit-file-parser, exifr, maplibre-gl, jspdf, @mapbox/vector-tile, pbf). `tools-mkfit.mjs` erzeugt eine Test-FIT-Datei.

Bei jeder Änderung an der Bedienung auch das Hilfe-Overlay in `src/app.html` (`<div id="help">`, Karten mit Piktogrammen) und die Kurzzeile `#hint` anpassen.

## GitHub Pages

Repo-Einstellungen → Pages → Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`. Danach ist `index.html` unter `https://<user>.github.io/<repo>/` erreichbar. `.nojekyll` sorgt dafür, dass Pages die Dateien unverändert ausliefert. Die Bibliotheken liegen als eigene Dateien (`vendor.js`, `heif.js`) neben der kleinen `index.html` – eine einzelne 5-MB-HTML-Datei hatte das Pages-Deployment zum Hängen gebracht.

## Lizenz

MIT. Karten © OpenFreeMap / OpenMapTiles / OpenStreetMap-Mitwirkende.
