# Tourposter

Radtour-Poster (A4 bis 70 × 100 cm, 300 dpi) aus FIT/GPX/TCX-Dateien und Fotos – **komplett im Browser**. Es gibt keinen Server: Tourdaten und Fotos verlassen den Rechner nicht. Einzige Netzwerkzugriffe sind die Kartenkacheln (OpenFreeMap, sieht nur die Region) und die Schrift Montserrat (Google Fonts).

**Live:** `https://<user>.github.io/tourposter/` (GitHub Pages, siehe unten) – oder `index.html` herunterladen und doppelklicken.

## Funktionen

- FIT / GPX / TCX hineinziehen, mehrere Dateien = Etappen; Kennzahlen (km, Höhenmeter, Etappen) und Datumszeile automatisch.
- Karte: MapLibre GL mit Vektorkacheln (OpenFreeMap), Route, Marker für Start/Ziel/Übernachtungen; verschieben/zoomen, „auf Route einpassen“.
- Vier Stile: Nacht (dunkel/Koralle), Fjord (blau/Bernstein), Hell (Positron/Rot), Retro (Bright/Ziegel) – Karte, Farben und Druck wechseln zusammen.
- Läuft auch auf dem Smartphone (Poster oben, Bedienung darunter; Touch zum Verschieben/Skalieren).
- Ortsnamen für Start, Ziel und Übernachtungen automatisch aus den Kartendaten (Detail-Kachel Zoom 12; Städte bevorzugt); ziehen = verschieben, Doppelklick = Text ändern.
- Fotos hineinziehen: Ort (genauer Ort aus den Kartendaten) und Datum aus EXIF, Nummern-Pins auf der Route. Ziehen mit Einrasten an Kanten/gleichen Abständen, vier Ecken zum Skalieren (Shift = Seitenverhältnis), Mehrfachauswahl + Ausrichten, Bildausschnitt mit Zoom/Verschieben (Doppelklick, Mausrad, Slider).
- Titel, Untertitel, Kennzahlen direkt im Poster tippen. Hoch- und Querformat; Papiergröße DIN A4–A1 und die üblichen Posterdruck-Formate 20 × 30 bis 70 × 100 cm (300 dpi). Das Seitenverhältnis des Posters folgt dem Papier; Kleintexte (Bildunterschriften, Ortsnamen, Profilachsen) werden gedämpft mitskaliert (Faktor (kurze Seite / 297 mm)^−0,3, also A4 ≈ ×1,11, A2 ≈ ×0,90, 70 × 100 ≈ ×0,77), Titel und Kennzahlen skalieren rein proportional.
- Höhenprofil mit Etappengrenzen und km-Marken; Höhe per Ziehen der Oberkante, Skala passt sich an.
- Export PNG und PDF in der gewählten Papiergröße (300 dpi; 70 × 100 cm ergibt ~100 Megapixel, das dauert einen Moment). Layout im Browser speichern oder als JSON sichern/laden (Fotos danach wieder hinzufügen, Zuordnung per Dateiname).

## Entwicklung

    npm install
    npm run build      # src/app.html + Bibliotheken -> index.html

`src/app.html` ist die App (HTML/CSS/JS), `src/entry.js` listet die gebündelten Bibliotheken (fit-file-parser, exifr, maplibre-gl, jspdf, @mapbox/vector-tile, pbf). `tools-mkfit.mjs` erzeugt eine Test-FIT-Datei.

## GitHub Pages

Repo-Einstellungen → Pages → Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`. Danach ist `index.html` unter `https://<user>.github.io/<repo>/` erreichbar.

## Lizenz

MIT. Karten © OpenFreeMap / OpenMapTiles / OpenStreetMap-Mitwirkende.
